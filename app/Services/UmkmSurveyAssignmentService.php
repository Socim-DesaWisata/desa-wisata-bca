<?php

namespace App\Services;

use App\Models\SurveyTemplate;
use App\Models\UmkmSurveyAnswer;
use App\Models\UmkmSurveyQuestion;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageUmkm;
use App\Models\VillageUmkmDocument;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class UmkmSurveyAssignmentService
{
    private const CATEGORY_OPTIONS = [
        ['value' => 'kuliner', 'label' => 'Kuliner'],
        ['value' => 'tekstil_dan_kerajinan', 'label' => 'Tekstil dan Kerajinan'],
        ['value' => 'fashion_dan_aksesoris', 'label' => 'Fashion dan Aksesoris'],
        ['value' => 'kecantikan_dan_kesehatan', 'label' => 'Kecantikan dan Kesehatan'],
        ['value' => 'jasa', 'label' => 'Jasa'],
        ['value' => 'pertanian', 'label' => 'Pertanian'],
        ['value' => 'peternakan', 'label' => 'Peternakan'],
        ['value' => 'perikanan', 'label' => 'Perikanan'],
        ['value' => 'produk_digital_dan_kreatif', 'label' => 'Produk Digital dan Kreatif'],
    ];

    /**
     * @return array<string, mixed>
     */
    public function getCreateData(VillageSurveyAssignment $assignment): array
    {
        $assignment->loadMissing([
            'village:id,code,name,city,province,district,subdistrict',
            'assignedBy:id,name,email',
        ]);

        $template = $this->activeTemplate();
        $questions = $template?->umkmSurveyQuestions ?? collect();

        return [
            'assignment' => [
                'id' => $assignment->id,
                'code' => 'ASG-'.str_pad((string) $assignment->id, 3, '0', STR_PAD_LEFT),
                'status' => $assignment->status,
                'village' => [
                    'id' => $assignment->village?->id,
                    'code' => $assignment->village?->code,
                    'name' => $assignment->village?->name ?? '-',
                    'location' => collect([
                        $assignment->village?->subdistrict,
                        $assignment->village?->district,
                        $assignment->village?->city,
                        $assignment->village?->province,
                    ])->filter()->implode(', ') ?: '-',
                ],
                'assigned_by' => [
                    'id' => $assignment->assignedBy?->id,
                    'name' => $assignment->assignedBy?->name ?? '-',
                    'email' => $assignment->assignedBy?->email,
                ],
            ],
            'template' => $template ? [
                'id' => $template->id,
                'title' => $template->title,
                'description' => $template->description,
                'question_count' => $questions->count(),
                'total_weight' => (float) $questions->sum('question_weight_percent'),
            ] : null,
            'criteria_groups' => $questions
                ->groupBy('criteria_code')
                ->map(fn ($criteriaQuestions, string $criteriaCode): array => [
                    'criteria_code' => $criteriaCode,
                    'criteria_name' => $criteriaQuestions->first()->criteria_name,
                    'criteria_weight_percent' => (float) $criteriaQuestions->first()->criteria_weight_percent,
                    'question_count' => $criteriaQuestions->count(),
                    'questions' => $criteriaQuestions
                        ->values()
                        ->map(fn (UmkmSurveyQuestion $question): array => [
                            'id' => $question->id,
                            'question_number' => $question->question_number,
                            'question_text' => $question->question_text,
                            'question_weight_percent' => (float) $question->question_weight_percent,
                            'max_score' => 100,
                            'help_text' => $question->help_text,
                        ])
                        ->all(),
                ])
                ->values()
                ->all(),
            'boolean_options' => [
                ['value' => '1', 'label' => 'Ya'],
                ['value' => '0', 'label' => 'Tidak'],
            ],
            'category_options' => self::CATEGORY_OPTIONS,
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function createWithSurvey(array $data, User $user, VillageSurveyAssignment $assignment): VillageUmkm
    {
        $template = $this->activeTemplate();

        if (! $template) {
            throw ValidationException::withMessages([
                'answers' => 'Template assessment UMKM aktif belum tersedia.',
            ]);
        }

        return DB::transaction(function () use ($data, $user, $template, $assignment): VillageUmkm {
            $assignment->loadMissing('village:id,name');
            $village = $assignment->village;

            if (! $village) {
                throw ValidationException::withMessages([
                    'name' => 'Desa pada assignment tidak ditemukan.',
                ]);
            }

            $umkm = VillageUmkm::query()->create([
                ...$this->normalizeUmkmData($data),
                'village_id' => $village->id,
                'created_by' => $user->id,
                'data_collector_id' => $user->id,
                'village_name' => $village->name,
                'collector_name' => $user->name,
                'has_qris' => $this->nullableBoolean($data['has_qris'] ?? null),
                'has_edc' => $this->nullableBoolean($data['has_edc'] ?? null),
                'has_credit_card' => $this->nullableBoolean($data['has_credit_card'] ?? null),
                'has_exported' => $this->nullableBoolean($data['has_exported'] ?? null),
                'product_category' => $this->categoryLabels($data['categories'] ?? []),
                'product_photo_path' => $this->storeProductPhoto($data['product_photo'] ?? null, $village->id),
            ]);

            $this->syncCategories($umkm, $data['categories'] ?? []);

            $questions = $template->umkmSurveyQuestions->keyBy('id');

            foreach ($data['answers'] as $answerData) {
                $question = $questions->get((int) $answerData['question_id']);

                if (! $question) {
                    continue;
                }

                $score = (float) $answerData['score'];
                $normalizedScore = round($score, 4);
                $weightedScore = round(($score / 100) * (float) $question->question_weight_percent, 4);

                UmkmSurveyAnswer::query()->create([
                    'umkm_id' => $umkm->id,
                    'umkm_assessment_question_id' => $question->id,
                    'answered_by' => $user->id,
                    'score' => $score,
                    'criteria_code_snapshot' => $question->criteria_code,
                    'criteria_name_snapshot' => $question->criteria_name,
                    'criteria_weight_percent_snapshot' => $question->criteria_weight_percent,
                    'question_text_snapshot' => $question->question_text,
                    'question_weight_percent_snapshot' => $question->question_weight_percent,
                    'max_score_snapshot' => 100,
                    'normalized_score' => $normalizedScore,
                    'weighted_score' => $weightedScore,
                    'answered_at' => now(),
                    'last_edited_at' => now(),
                ]);
            }

            $this->storeDocuments($umkm, $data['documents'] ?? [], $user, (int) $village->id);

            return $umkm;
        });
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function createDocument(
        array $data,
        User $user,
        VillageSurveyAssignment $assignment,
        VillageUmkm $umkm
    ): VillageUmkmDocument {
        $this->ensureUmkmBelongsToAssignment($assignment, $umkm);

        return DB::transaction(fn (): VillageUmkmDocument => $this->storeDocument($umkm, $data, $user, (int) $assignment->village_id));
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function updateDocument(
        array $data,
        VillageSurveyAssignment $assignment,
        VillageUmkm $umkm,
        VillageUmkmDocument $document
    ): VillageUmkmDocument {
        $this->ensureDocumentBelongsToUmkm($assignment, $umkm, $document);

        return DB::transaction(function () use ($data, $assignment, $document): VillageUmkmDocument {
            $oldPath = $document->file_path;
            $payload = [
                'document_name' => $data['document_name'],
            ];

            if (($data['file'] ?? null) instanceof UploadedFile) {
                $payload['file_path'] = $this->storeDocumentFile($data['file'], (int) $assignment->village_id);
                $payload['mime_type'] = $data['file']->getMimeType();
                $payload['file_size'] = $data['file']->getSize();
            }

            $document->update($payload);

            if (isset($payload['file_path']) && $oldPath) {
                Storage::disk('public')->delete($oldPath);
            }

            return $document->refresh();
        });
    }

    public function deleteDocument(
        VillageSurveyAssignment $assignment,
        VillageUmkm $umkm,
        VillageUmkmDocument $document
    ): void {
        $this->ensureDocumentBelongsToUmkm($assignment, $umkm, $document);

        DB::transaction(function () use ($document): void {
            $path = $document->file_path;
            $document->delete();

            if ($path) {
                Storage::disk('public')->delete($path);
            }
        });
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function updateMaster(array $data, VillageSurveyAssignment $assignment, VillageUmkm $umkm): VillageUmkm
    {
        $assignment->loadMissing('village:id,name');

        if ($assignment->village_id !== $umkm->village_id) {
            abort(404);
        }

        return DB::transaction(function () use ($data, $assignment, $umkm): VillageUmkm {
            $payload = [
                ...$this->normalizeUmkmData($data),
                'has_qris' => $this->nullableBoolean($data['has_qris'] ?? null),
                'has_edc' => $this->nullableBoolean($data['has_edc'] ?? null),
                'has_credit_card' => $this->nullableBoolean($data['has_credit_card'] ?? null),
                'has_exported' => $this->nullableBoolean($data['has_exported'] ?? null),
                'product_category' => $this->categoryLabels($data['categories'] ?? []),
            ];

            $photoPath = $this->storeProductPhoto($data['product_photo'] ?? null, (int) $assignment->village_id);

            if ($photoPath) {
                $payload['product_photo_path'] = $photoPath;
            }

            $umkm->update($payload);
            $this->syncCategories($umkm, $data['categories'] ?? []);

            return $umkm->refresh();
        });
    }

    /**
     * @param  array{score: mixed}  $data
     */
    public function updateAnswer(
        array $data,
        User $user,
        VillageSurveyAssignment $assignment,
        VillageUmkm $umkm,
        UmkmSurveyAnswer $answer
    ): UmkmSurveyAnswer {
        if ($assignment->village_id !== $umkm->village_id || $answer->umkm_id !== $umkm->id) {
            abort(404);
        }

        $score = (float) $data['score'];
        $maxScore = (float) ($answer->max_score_snapshot ?: 100);
        $questionWeight = (float) ($answer->question_weight_percent_snapshot ?: 0);

        $answer->update([
            'answered_by' => $user->id,
            'score' => $score,
            'normalized_score' => round($score, 4),
            'weighted_score' => $maxScore > 0 ? round(($score / $maxScore) * $questionWeight, 4) : 0,
            'last_edited_at' => now(),
        ]);

        return $answer->refresh();
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function normalizeUmkmData(array $data): array
    {
        return collect(Arr::only($data, $this->umkmColumns()))
            ->map(fn (mixed $value): mixed => $value === '' ? null : $value)
            ->all();
    }

    private function activeTemplate(): ?SurveyTemplate
    {
        return SurveyTemplate::query()
            ->where('title', 'Assessment Pelaku UMKM')
            ->where('status', 'published')
            ->with(['umkmSurveyQuestions' => fn ($query) => $query
                ->where('is_active', true)
                ->orderBy('criteria_code')
                ->orderBy('question_number')
                ->orderBy('sort_order')])
            ->latest('published_at')
            ->latest('id')
            ->first();
    }

    /**
     * @return array<int, string>
     */
    private function umkmColumns(): array
    {
        return [
            'business_owner_name',
            'name',
            'legal_business_name',
            'established_year',
            'company_website_url',
            'production_address',
            'brand_name',
            'annual_revenue',
            'monthly_production_capacity',
            'current_obstacles',
            'certifications',
            'has_business_legality_and_certification',
            'is_umkm_participant',
            'is_production_capacity_participant',
            'annual_production_capacity',
            'factory_location_feasibility',
            'instagram_url',
            'facebook_url',
            'twitter_url',
            'marketing_website_url',
            'ecommerce_profile_url',
            'marketing_notes',
            'sustainability_notes',
            'bank_name',
            'bank_account_number',
            'qris_provider',
            'edc_provider',
            'banking_notes',
            'export_destination_countries',
        ];
    }

    private function storeProductPhoto(mixed $file, int $villageId): ?string
    {
        if (! $file instanceof UploadedFile) {
            return null;
        }

        return $file->storePublicly("umkms/{$villageId}/products", 'public');
    }

    /**
     * @param  array<int, string>  $categories
     */
    private function syncCategories(VillageUmkm $umkm, array $categories): void
    {
        $uniqueCategories = collect($categories)
            ->filter()
            ->unique()
            ->values();

        $umkm->categories()->delete();

        $uniqueCategories->each(fn (string $category): mixed => $umkm->categories()->create([
            'category' => $category,
        ]));
    }

    /**
     * @param  array<int, string>  $categories
     */
    private function categoryLabels(array $categories): ?string
    {
        $labels = collect($categories)
            ->map(function (string $category): ?string {
                $option = collect(self::CATEGORY_OPTIONS)->firstWhere('value', $category);

                return $option['label'] ?? null;
            })
            ->filter()
            ->values();

        return $labels->isEmpty() ? null : $labels->implode(', ');
    }

    /**
     * @param  array<int, array<string, mixed>>  $documents
     */
    private function storeDocuments(VillageUmkm $umkm, array $documents, User $user, int $villageId): void
    {
        foreach ($documents as $document) {
            if (! ($document['file'] ?? null) instanceof UploadedFile || blank($document['document_name'] ?? null)) {
                continue;
            }

            $this->storeDocument($umkm, $document, $user, $villageId);
        }
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function storeDocument(VillageUmkm $umkm, array $data, User $user, int $villageId): VillageUmkmDocument
    {
        /** @var UploadedFile $file */
        $file = $data['file'];

        return $umkm->documents()->create([
            'uploaded_by' => $user->id,
            'document_name' => $data['document_name'],
            'file_path' => $this->storeDocumentFile($file, $villageId),
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
        ]);
    }

    private function storeDocumentFile(UploadedFile $file, int $villageId): string
    {
        return $file->storePublicly("umkms/{$villageId}/documents", 'public');
    }

    private function ensureUmkmBelongsToAssignment(VillageSurveyAssignment $assignment, VillageUmkm $umkm): void
    {
        if ($assignment->village_id !== $umkm->village_id) {
            abort(404);
        }
    }

    private function ensureDocumentBelongsToUmkm(
        VillageSurveyAssignment $assignment,
        VillageUmkm $umkm,
        VillageUmkmDocument $document
    ): void {
        $this->ensureUmkmBelongsToAssignment($assignment, $umkm);

        if ($document->village_umkm_id !== $umkm->id) {
            abort(404);
        }
    }

    private function nullableBoolean(mixed $value): ?bool
    {
        if ($value === null || $value === '') {
            return null;
        }

        return filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
    }
}
