<?php

namespace App\Services;

use App\Models\PariwisataSurveyAnswer;
use App\Models\PariwisataSurveyAnswerDocument;
use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataSuveyOption;
use App\Models\PariwisataVillage;
use App\Models\SurveyAnswer;
use App\Models\SurveyAnswerDocument;
use App\Models\SurveyAnswerHistory;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\UmkmSurveyAnswer;
use App\Models\User;
use App\Models\VillageActiveGroupAnnual;
use App\Models\VillageAnnualPopulationStat;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageUmkm;
use App\Models\VillageUmkmDocument;
use App\Models\VillageVulnerableGroupAnnual;
use Carbon\CarbonInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class VillageSurveyAssignmentService
{
    public function __construct(private ActiveSurveyTemplateResolver $templateResolver) {}

    /**
     * @param  array<string, mixed>  $filters
     * @return array<string, mixed>
     */
    public function getIndexData(array $filters): array
    {
        $normalizedFilters = [
            'search' => trim((string) Arr::get($filters, 'search', '')),
            'status' => Arr::get($filters, 'status'),
            'template_id' => Arr::get($filters, 'template_id'),
            'view' => Arr::get($filters, 'view', 'active') === 'trash' ? 'trash' : 'active',
            'per_page' => (int) Arr::get($filters, 'per_page', 10),
        ];

        $query = VillageSurveyAssignment::query()
            ->select([
                'id',
                'code',
                'village_id',
                'survey_template_id',
                'status',
                'assigned_by',
                'submitted_by',
                'reviewed_by',
                'assigned_at',
                'started_at',
                'last_saved_at',
                'submitted_at',
                'reviewed_at',
                'created_at',
                'updated_at',
                'deleted_at',
            ])
            ->with([
                'village:id,code,name,city,province',
                'template:id,title,status',
                'template.questions' => fn ($query) => $query
                    ->select(['id', 'survey_template_id'])
                    ->with(['options:id,survey_question_id,score']),
                'assignedBy:id,name,email',
                'submittedBy:id,name,email',
                'reviewedBy:id,name,email',
                'answers:id,village_survey_assignment_id,score',
            ])
            ->withCount(['answers', 'documents']);

        if ($normalizedFilters['view'] === 'trash') {
            $query->onlyTrashed();
        }

        $paginator = $query
            ->when($normalizedFilters['search'] !== '', function ($query) use ($normalizedFilters): void {
                $search = $normalizedFilters['search'];

                $query->where(function ($query) use ($search): void {
                    $query
                        ->where('id', $search)
                        ->orWhere('code', 'like', "%{$search}%")
                        ->orWhereHas('village', function ($query) use ($search): void {
                            $query
                                ->where('name', 'like', "%{$search}%")
                                ->orWhere('code', 'like', "%{$search}%");
                        })
                        ->orWhereHas('template', function ($query) use ($search): void {
                            $query->where('title', 'like', "%{$search}%");
                        });
                });
            })
            ->when($normalizedFilters['status'], fn ($query, string $status) => $query->where('status', $status))
            ->when($normalizedFilters['template_id'], fn ($query, int $templateId) => $query->where('survey_template_id', $templateId))
            ->latest('updated_at')
            ->paginate($normalizedFilters['per_page'])
            ->withQueryString();

        $paginator->through(fn (VillageSurveyAssignment $assignment): array => $this->formatAssignment($assignment));

        return [
            'stats' => $this->getStats(),
            'assignments' => $paginator,
            'filters' => $normalizedFilters,
            'status_options' => $this->statusOptions(),
            'template_options' => $this->templateOptions(),
            'village_options' => $this->villageOptions(),
            'user_options' => $this->userOptions(),
            'per_page_options' => [5, 10, 15, 25, 50],
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, User $user): VillageSurveyAssignment
    {
        $template = isset($data['survey_template_id'])
            ? SurveyTemplate::query()->select(['id'])->find($data['survey_template_id'])
            : SurveyTemplate::query()
                ->select(['id'])
                ->where('status', 'published')
                ->where('type', 'village')
                ->latest('id')
                ->first();

        if (! $template) {
            throw ValidationException::withMessages([
                'village_id' => 'Template survey aktif belum tersedia.',
            ]);
        }

        return DB::transaction(function () use ($data, $user, $template): VillageSurveyAssignment {
            $assignment = VillageSurveyAssignment::query()->create([
                'village_id' => $data['village_id'],
                'survey_template_id' => $data['survey_template_id'] ?? $template->id,
                'code' => $data['code'] ?? null,
                'status' => $data['status'] ?? 'assigned',
                'assigned_by' => $data['assigned_by'] ?? $user->id,
                'submitted_by' => $data['submitted_by'] ?? null,
                'reviewed_by' => $data['reviewed_by'] ?? null,
                'assigned_at' => $data['assigned_at'] ?? now(),
                'started_at' => $data['started_at'] ?? null,
                'last_saved_at' => $data['last_saved_at'] ?? null,
                'submitted_at' => $data['submitted_at'] ?? null,
                'reviewed_at' => $data['reviewed_at'] ?? null,
            ]);

            return $assignment->refresh();
        });
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(VillageSurveyAssignment $assignment, array $data, User $user): VillageSurveyAssignment
    {
        return DB::transaction(function () use ($assignment, $data, $user): VillageSurveyAssignment {
            $fromStatus = $assignment->status;

            $assignment->update([
                'village_id' => $data['village_id'],
                'survey_template_id' => $data['survey_template_id'],
                'status' => $data['status'],
                'assigned_by' => $data['assigned_by'],
                'submitted_by' => $data['submitted_by'] ?? null,
                'reviewed_by' => $data['reviewed_by'] ?? null,
                'assigned_at' => $data['assigned_at'] ?? null,
                'started_at' => $data['started_at'] ?? null,
                'last_saved_at' => $data['last_saved_at'] ?? null,
                'submitted_at' => $data['submitted_at'] ?? null,
                'reviewed_at' => $data['reviewed_at'] ?? null,
            ]);

            $assignment->logs()->create([
                'actor_id' => $user->id,
                'action' => 'assignment_updated',
                'from_status' => $fromStatus,
                'to_status' => $assignment->status,
                'description' => 'Survey assignment diperbarui.',
                'metadata' => [
                    'changed' => array_keys($assignment->getChanges()),
                ],
                'created_at' => now(),
            ]);

            return $assignment;
        });
    }

    public function delete(VillageSurveyAssignment $assignment): void
    {
        DB::transaction(function () use ($assignment): void {
            $answerIds = $assignment->answers()->pluck('id');
            $pariwisataAnswerIds = $assignment->pariwisataSurveyAnswers()->pluck('id');

            SurveyAnswerDocument::query()
                ->whereIn('survey_answer_id', $answerIds)
                ->delete();
            PariwisataSurveyAnswerDocument::query()
                ->whereIn('pariwisata_survey_answer_id', $pariwisataAnswerIds)
                ->delete();

            $assignment->answerHistories()->delete();
            $assignment->logs()->delete();
            $assignment->answers()->delete();
            $assignment->pariwisataSurveyAnswers()->delete();
            $assignment->delete();
        });
    }

    public function restore(string $assignmentCode): void
    {
        $assignment = VillageSurveyAssignment::withTrashed()
            ->where('code', $assignmentCode)
            ->firstOrFail();

        if (! $assignment->trashed()) {
            throw ValidationException::withMessages([
                'assignment' => 'Survey assignment tidak berada di trash.',
            ]);
        }

        DB::transaction(function () use ($assignment): void {
            $assignment->restore();
            SurveyAnswer::withTrashed()
                ->where('village_survey_assignment_id', $assignment->id)
                ->restore();
            PariwisataSurveyAnswer::withTrashed()
                ->where('village_survey_assignment_id', $assignment->id)
                ->restore();

            $answerIds = SurveyAnswer::withTrashed()
                ->where('village_survey_assignment_id', $assignment->id)
                ->pluck('id');
            $pariwisataAnswerIds = PariwisataSurveyAnswer::withTrashed()
                ->where('village_survey_assignment_id', $assignment->id)
                ->pluck('id');

            SurveyAnswerDocument::withTrashed()
                ->whereIn('survey_answer_id', $answerIds)
                ->restore();
            PariwisataSurveyAnswerDocument::withTrashed()
                ->whereIn('pariwisata_survey_answer_id', $pariwisataAnswerIds)
                ->restore();

            $assignment->answerHistories()->withTrashed()->restore();
            $assignment->logs()->withTrashed()->restore();
        });
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function updateVillageAnnualData(VillageSurveyAssignment $assignment, array $data, User $user): void
    {
        $assignment->loadMissing('village:id');

        abort_unless($assignment->village, 404);

        DB::transaction(function () use ($assignment, $data, $user): void {
            $villageId = $assignment->village_id;

            VillageAnnualPopulationStat::withTrashed()
                ->where('village_id', $villageId)
                ->forceDelete();
            VillageVulnerableGroupAnnual::withTrashed()
                ->where('village_id', $villageId)
                ->forceDelete();
            VillageActiveGroupAnnual::withTrashed()
                ->where('village_id', $villageId)
                ->forceDelete();

            foreach ($data['annual_population_stats'] ?? [] as $row) {
                VillageAnnualPopulationStat::query()->create([
                    'village_id' => $villageId,
                    'year' => $row['year'],
                    'category_value' => $row['category_value'],
                    'total_people' => $row['total_people'],
                    'notes' => $row['notes'] ?? null,
                    'created_by' => $user->id,
                ]);
            }

            foreach ($data['vulnerable_group_annuals'] ?? [] as $row) {
                VillageVulnerableGroupAnnual::query()->create([
                    'village_id' => $villageId,
                    'vulnerable_category' => $row['vulnerable_category'] ?? null,
                    'year' => $row['year'],
                    'total_people' => $row['total_people'],
                    'notes' => $row['notes'] ?? null,
                    'created_by' => $user->id,
                ]);
            }

            foreach ($data['active_group_annuals'] ?? [] as $row) {
                VillageActiveGroupAnnual::query()->create([
                    'village_id' => $villageId,
                    'active_category' => $row['active_category'] ?? null,
                    'year' => $row['year'],
                    'value' => $row['value'],
                    'notes' => $row['notes'] ?? null,
                    'created_by' => $user->id,
                ]);
            }
        });
    }

    /**
     * @return array<string, mixed>
     */
    public function getShowData(VillageSurveyAssignment $assignment, string $activeTab = 'desa'): array
    {
        $activeTab = in_array($activeTab, ['desa', 'umkm', 'pariwisata'], true) ? $activeTab : 'desa';

        $assignment->load([
            'village:id,code,name,description,province,city,district,subdistrict,address,postal_code,latitude,longitude,maps_url,manager_name,manager_phone,manager_email,status',
            'village.media' => fn ($query) => $query
                ->select(['id', 'village_id', 'type', 'title', 'file_path', 'external_url', 'mime_type', 'file_size', 'is_cover', 'sort_order'])
                ->orderByDesc('is_cover')
                ->orderBy('sort_order')
                ->orderBy('id'),
            'village.annualPopulationStats' => fn ($query) => $query
                ->select(['id', 'village_id', 'year', 'category_value', 'total_people', 'notes'])
                ->orderByDesc('year')
                ->orderBy('category_value'),
            'village.vulnerableGroupAnnuals' => fn ($query) => $query
                ->select(['id', 'village_id', 'vulnerable_category', 'year', 'total_people', 'notes'])
                ->orderByDesc('year'),
            'village.activeGroupAnnuals' => fn ($query) => $query
                ->select(['id', 'village_id', 'active_category', 'year', 'value', 'notes'])
                ->orderByDesc('year'),
            'template:id,title,description,status,published_at',
            'assignedBy:id,name,email',
            'submittedBy:id,name,email',
            'reviewedBy:id,name,email',
            'logs' => fn ($query) => $query
                ->with('actor:id,name,email')
                ->latest('created_at')
                ->limit(10),
            'answerHistories' => fn ($query) => $query
                ->with(['actor:id,name,email', 'question:id,code,question_text'])
                ->latest('created_at')
                ->limit(10),
        ]);

        if ($activeTab === 'desa') {
            $assignment->load([
                'template.questions' => fn ($query) => $query
                    ->select(['id', 'survey_template_id', 'aspect', 'code', 'question_text', 'document_hint', 'sort_order'])
                    ->orderBy('aspect')
                    ->orderBy('sort_order')
                    ->orderBy('id'),
                'template.questions.options' => fn ($query) => $query
                    ->select(['id', 'survey_question_id', 'score', 'label', 'sort_order'])
                    ->orderBy('sort_order')
                    ->orderBy('score')
                    ->orderBy('id'),
                'answers' => fn ($query) => $query->select([
                    'id',
                    'village_survey_assignment_id',
                    'survey_question_id',
                    'survey_question_option_id',
                    'score',
                    'aspect_snapshot',
                    'question_text_snapshot',
                    'option_label_snapshot',
                    'notes',
                    'answered_by',
                    'last_edited_by',
                    'answered_at',
                    'last_edited_at',
                ]),
                'answers.answeredBy:id,name,email',
                'answers.lastEditedBy:id,name,email',
                'answers.option:id,score,label',
                'answers.documents:id,survey_answer_id,uploaded_by,file_name,file_path,mime_type,file_size,created_at',
                'answers.documents.uploadedBy:id,name,email',
                'answers.histories' => fn ($query) => $query
                    ->select([
                        'id',
                        'survey_answer_id',
                        'village_survey_assignment_id',
                        'survey_question_id',
                        'actor_id',
                        'action',
                        'old_score',
                        'new_score',
                        'old_option_label',
                        'new_option_label',
                        'created_at',
                    ])
                    ->with('actor:id,name,email')
                    ->latest('created_at'),
            ]);

            $assignment->loadCount(['answers', 'documents']);
        }

        if ($activeTab === 'umkm') {
            $assignment->load([
                'village.umkms' => fn ($query) => $query
                    ->with([
                        'categories:id,village_umkm_id,category',
                        'dataCollector:id,name,email',
                        'surveyAnswers' => fn ($query) => $query
                            ->select([
                                'id',
                                'umkm_id',
                                'umkm_assessment_question_id',
                                'answered_by',
                                'score',
                                'criteria_code_snapshot',
                                'criteria_name_snapshot',
                                'criteria_weight_percent_snapshot',
                                'question_text_snapshot',
                                'question_weight_percent_snapshot',
                                'max_score_snapshot',
                                'normalized_score',
                                'weighted_score',
                                'answered_at',
                                'last_edited_at',
                            ])
                            ->with(['question:id,criteria_code,criteria_name,question_number,question_text,question_weight_percent,max_score', 'answeredBy:id,name,email'])
                            ->orderBy('criteria_code_snapshot')
                            ->orderBy('umkm_assessment_question_id'),
                    ])
                    ->latest('updated_at'),
            ]);
        }

        if ($activeTab === 'pariwisata') {
            $assignment->load([
                'village.pariwisataVillages' => fn ($query) => $query
                    ->with([
                        'categories:id,pariwisata_village_id,category',
                    ])
                    ->latest('updated_at'),
                'pariwisataSurveyAnswers' => fn ($query) => $query->select([
                    'id',
                    'village_survey_assignment_id',
                    'pariwisata_survey_question_id',
                    'pariwisata_suvey_option_id',
                    'score',
                    'notes',
                    'answered_by',
                    'last_edited_by',
                    'answered_at',
                    'last_edited_at',
                    'option_label_snapshot',
                    'option_description_snapshot',
                ]),
                'pariwisataSurveyAnswers.answeredBy:id,name,email',
                'pariwisataSurveyAnswers.lastEditedBy:id,name,email',
                'pariwisataSurveyAnswers.option:id,score,label,description',
                'pariwisataSurveyAnswers.documents:id,pariwisata_survey_answer_id,uploaded_by,file_name,file_path,mime_type,file_size,created_at',
                'pariwisataSurveyAnswers.documents.uploadedBy:id,name,email',
            ]);
        }

        $tabCounts = $this->buildAssignmentTabCounts($assignment);

        $summary = $this->emptyAssignmentSummary();
        $aspects = [];

        if ($activeTab === 'desa') {
            $questions = $assignment->template?->questions ?? collect();
            $answersByQuestion = $assignment->answers->keyBy('survey_question_id');
            $aspects = $this->formatAssignmentDetailAspects($questions, $answersByQuestion);
            $summary = $this->buildAssignmentSummary($questions, $answersByQuestion, $aspects);
        }

        $pariwisataSurveyGroups = [];
        $pariwisataSurveySummary = $this->emptyPariwisataSurveySummary();

        if ($activeTab === 'pariwisata') {
            $pariwisataQuestions = $this->pariwisataQuestionsForSummary();
            $pariwisataAnswersByQuestion = $assignment->pariwisataSurveyAnswers->keyBy('pariwisata_survey_question_id');
            $pariwisataSurveyGroups = $this->formatPariwisataSurveyGroups($pariwisataQuestions, $pariwisataAnswersByQuestion);
            $pariwisataSurveySummary = $this->buildPariwisataSurveySummary($pariwisataQuestions, $pariwisataAnswersByQuestion, $pariwisataSurveyGroups);
        }

        $cover = $assignment->village?->media->first();

        return [
            'active_tab' => $activeTab,
            'assignment' => [
                ...$this->formatAssignment($assignment),
                'village' => [
                    'id' => $assignment->village?->id,
                    'code' => $assignment->village?->code,
                    'name' => $assignment->village?->name ?? '-',
                    'description' => $assignment->village?->description,
                    'status' => $assignment->village?->status,
                    'address' => $assignment->village?->address,
                    'postal_code' => $assignment->village?->postal_code,
                    'latitude' => $assignment->village?->latitude,
                    'longitude' => $assignment->village?->longitude,
                    'maps_url' => $assignment->village?->maps_url,
                    'manager_name' => $assignment->village?->manager_name,
                    'manager_phone' => $assignment->village?->manager_phone,
                    'manager_email' => $assignment->village?->manager_email,
                    'location' => collect([
                        $assignment->village?->subdistrict,
                        $assignment->village?->district,
                        $assignment->village?->city,
                        $assignment->village?->province,
                    ])->filter()->implode(', ') ?: '-',
                    'cover_url' => $cover ? $this->mediaUrl($cover->file_path, $cover->external_url) : null,
                ],
                'template' => [
                    'id' => $assignment->template?->id,
                    'title' => $assignment->template?->title ?? '-',
                    'description' => $assignment->template?->description,
                    'status' => $assignment->template?->status,
                    'published_at' => $this->formatDate($assignment->template?->published_at),
                ],
                'assigned_by_user' => $this->formatUser($assignment->assignedBy),
                'submitted_by_user' => $this->formatUser($assignment->submittedBy),
                'reviewed_by_user' => $this->formatUser($assignment->reviewedBy),
            ],
            'summary' => $summary,
            'tab_counts' => $tabCounts,
            'aspects' => $aspects,
            'desa_survey' => [
                'summary' => $summary,
                'aspects' => $aspects,
            ],
            'umkms' => $activeTab === 'umkm'
                ? ($assignment->village?->umkms
                    ->map(fn (VillageUmkm $umkm): array => $this->formatUmkmForAssignment($umkm))
                    ->values()
                    ->all() ?? [])
                : [],
            'pariwisata' => $activeTab === 'pariwisata'
                ? ($assignment->village?->pariwisataVillages
                    ->map(fn (PariwisataVillage $pariwisata): array => $this->formatPariwisataForAssignment($assignment, $pariwisata))
                    ->values()
                    ->all() ?? [])
                : [],
            'pariwisata_survey_summary' => $pariwisataSurveySummary,
            'pariwisata_survey_groups' => $pariwisataSurveyGroups,
            'activities' => $this->formatAssignmentActivities($assignment),
            'edit_options' => [
                'status_options' => $this->statusOptions(),
                'template_options' => $this->templateOptions(),
                'village_options' => $this->villageOptionsForAssignment($assignment),
                'user_options' => $this->userOptions(),
            ],
            'edit_values' => [
                'village_id' => (string) $assignment->village_id,
                'survey_template_id' => (string) $assignment->survey_template_id,
                'status' => $assignment->status,
                'assigned_by' => (string) $assignment->assigned_by,
                'submitted_by' => $assignment->submitted_by ? (string) $assignment->submitted_by : '',
                'reviewed_by' => $assignment->reviewed_by ? (string) $assignment->reviewed_by : '',
                'assigned_at' => $this->formatDateTimeLocal($assignment->assigned_at),
                'started_at' => $this->formatDateTimeLocal($assignment->started_at),
                'last_saved_at' => $this->formatDateTimeLocal($assignment->last_saved_at),
                'submitted_at' => $this->formatDateTimeLocal($assignment->submitted_at),
                'reviewed_at' => $this->formatDateTimeLocal($assignment->reviewed_at),
            ],
            'village_annual_edit_values' => $this->formatVillageAnnualEditValues($assignment->village),
        ];
    }

    /**
     * @return array{kemenpar: int, umkm: int, istc: int}
     */
    private function buildAssignmentTabCounts(VillageSurveyAssignment $assignment): array
    {
        $villageId = $assignment->village_id;

        return [
            'kemenpar' => SurveyQuestion::query()
                ->where('survey_template_id', $assignment->survey_template_id)
                ->count(),
            'umkm' => VillageUmkm::query()
                ->where('village_id', $villageId)
                ->count(),
            'istc' => PariwisataVillage::query()
                ->where('village_id', $villageId)
                ->count(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function emptyAssignmentSummary(): array
    {
        return [
            'total_questions' => 0,
            'answered_questions' => 0,
            'unanswered_questions' => 0,
            'total_documents' => 0,
            'total_score' => 0,
            'max_score' => 0,
            'final_score' => 0.0,
            'highest_aspect' => null,
            'lowest_aspect' => null,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function emptyPariwisataSurveySummary(): array
    {
        return [
            'total_questions' => 0,
            'answered_questions' => 0,
            'unanswered_questions' => 0,
            'total_documents' => 0,
            'total_score' => 0,
            'max_score' => 0,
            'final_score' => 0.0,
            'last_answered_at' => '-',
            'highest_aspect' => null,
            'lowest_aspect' => null,
            'aspects' => [],
            'distribution' => [],
        ];
    }

    /**
     * @return array<string, array<int, array<string, string>>>
     */
    private function formatVillageAnnualEditValues(?TourismVillage $village): array
    {
        return [
            'annual_population_stats' => $village?->annualPopulationStats
                ->map(fn (VillageAnnualPopulationStat $row): array => [
                    'year' => (string) $row->year,
                    'category_value' => $row->category_value,
                    'total_people' => (string) $row->total_people,
                    'notes' => $row->notes ?? '',
                ])
                ->values()
                ->all() ?? [],
            'vulnerable_group_annuals' => $village?->vulnerableGroupAnnuals
                ->map(fn (VillageVulnerableGroupAnnual $row): array => [
                    'vulnerable_category' => $row->vulnerable_category ?? '',
                    'year' => (string) $row->year,
                    'total_people' => (string) $row->total_people,
                    'notes' => $row->notes ?? '',
                ])
                ->values()
                ->all() ?? [],
            'active_group_annuals' => $village?->activeGroupAnnuals
                ->map(fn (VillageActiveGroupAnnual $row): array => [
                    'active_category' => $row->active_category ?? '',
                    'year' => (string) $row->year,
                    'value' => (string) $row->value,
                    'notes' => $row->notes ?? '',
                ])
                ->values()
                ->all() ?? [],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function getUmkmShowData(VillageSurveyAssignment $assignment, VillageUmkm $umkm): array
    {
        $assignment->loadMissing([
            'village:id,code,name,province,city,district,subdistrict,address,status',
        ]);

        abort_unless($assignment->village_id === $umkm->village_id, 404);

        $umkm->loadMissing([
            'categories:id,village_umkm_id,category',
            'dataCollector:id,name,email',
            'creator:id,name,email',
            'documents:id,village_umkm_id,uploaded_by,document_name,file_path,mime_type,file_size,created_at,updated_at',
            'documents.uploadedBy:id,name,email',
            'annualTurnovers:id,umkm_id,year,value,notes',
            'annualWorkerStats:id,umkm_id,year,dimension,category_value,total_people,notes',
            'annualWorkerTrainingStats:id,umkm_id,year,training_name,total_people,notes',
            'surveyAnswers' => fn ($query) => $query
                ->select([
                    'id',
                    'umkm_id',
                    'umkm_assessment_question_id',
                    'answered_by',
                    'score',
                    'criteria_code_snapshot',
                    'criteria_name_snapshot',
                    'criteria_weight_percent_snapshot',
                    'question_text_snapshot',
                    'question_weight_percent_snapshot',
                    'max_score_snapshot',
                    'normalized_score',
                    'weighted_score',
                    'answered_at',
                    'last_edited_at',
                ])
                ->with(['question:id,criteria_code,criteria_name,question_number,question_text,question_weight_percent,max_score', 'answeredBy:id,name,email'])
                ->orderBy('criteria_code_snapshot')
                ->orderBy('umkm_assessment_question_id'),
        ]);

        $formattedUmkm = $this->formatUmkmForAssignment($umkm);

        return [
            'assignment' => [
                ...$this->formatAssignment($assignment),
                'village' => [
                    'id' => $assignment->village?->id,
                    'code' => $assignment->village?->code,
                    'name' => $assignment->village?->name ?? '-',
                    'status' => $assignment->village?->status,
                    'address' => $assignment->village?->address,
                    'location' => collect([
                        $assignment->village?->subdistrict,
                        $assignment->village?->district,
                        $assignment->village?->city,
                        $assignment->village?->province,
                    ])->filter()->implode(', ') ?: '-',
                ],
            ],
            'umkm' => $formattedUmkm,
            'survey_summary' => $formattedUmkm['survey_summary'],
            'survey_groups' => $formattedUmkm['survey_groups'],
            'edit_values' => $this->formatUmkmEditValues($umkm),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function getPariwisataShowData(VillageSurveyAssignment $assignment, PariwisataVillage $pariwisata): array
    {
        $assignment->loadMissing([
            'village:id,code,name,province,city,district,subdistrict,address,status',
        ]);

        abort_unless($assignment->village_id === $pariwisata->village_id, 404);

        $pariwisata->loadMissing([
            'categories:id,pariwisata_village_id,category',
            'annualTurnovers:id,pariwisata_id,year,value,notes',
            'annualVisitors:id,pariwisata_id,year,value,notes',
            'visitorTypeAnnuals:id,pariwisata_id,year,visitor_type,value,notes',
            'packages:id,pariwisata_id,name,package_type,duration,facilities,description,price,is_active',
            'annualWorkerStats:id,pariwisata_id,year,dimension,category_value,total_people,notes',
            'annualWorkerTrainingStats:id,pariwisata_id,year,training_name,total_people,notes',
        ]);

        return [
            'assignment' => [
                ...$this->formatAssignment($assignment),
                'village' => [
                    'id' => $assignment->village?->id,
                    'code' => $assignment->village?->code,
                    'name' => $assignment->village?->name ?? '-',
                    'status' => $assignment->village?->status,
                    'address' => $assignment->village?->address,
                    'location' => collect([
                        $assignment->village?->subdistrict,
                        $assignment->village?->district,
                        $assignment->village?->city,
                        $assignment->village?->province,
                    ])->filter()->implode(', ') ?: '-',
                ],
            ],
            'pariwisata' => $this->formatPariwisataForAssignment($assignment, $pariwisata),
            'category_options' => $this->pariwisataCategoryOptions(),
            'edit_values' => $this->formatPariwisataEditValues($pariwisata),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function getTakePariwisataSurveyData(VillageSurveyAssignment $assignment): array
    {
        $assignment->loadMissing([
            'village:id,code,name,province,city,district,subdistrict',
            'assignedBy:id,name,email',
        ]);

        $template = $this->activePariwisataTemplate([
            'pariwisataSurveyQuestions' => fn ($query) => $query
                ->select([
                    'id',
                    'survey_template_id',
                    'category_code',
                    'category_name',
                    'sub_category_code',
                    'sub_category_name',
                    'criteria_code',
                    'criteria_name',
                    'criteria_description',
                    'indicator_code',
                    'indicator_name',
                    'indicator_description',
                    'supporting_evidence',
                    'document_required',
                    'document_hint',
                    'sort_order',
                ])
                ->where('is_active', true)
                ->with(['options' => fn ($query) => $query
                    ->select(['id', 'pariwisata_survey_question_id', 'score', 'level', 'label', 'description', 'sort_order'])
                    ->orderBy('sort_order')
                    ->orderBy('score')])
                ->orderBy('sort_order')
                ->orderBy('id'),
        ]);

        $questions = $this->sortTakePariwisataQuestions($template?->pariwisataSurveyQuestions ?? collect());
        // dd($questions);
        $answers = $assignment->pariwisataSurveyAnswers()
            ->select([
                'id',
                'village_survey_assignment_id',
                'pariwisata_survey_question_id',
                'pariwisata_suvey_option_id',
                'score',
                'notes',
                'answered_by',
                'last_edited_by',
                'answered_at',
                'last_edited_at',
            ])
            ->with([
                'documents:id,pariwisata_survey_answer_id,uploaded_by,file_name,file_path,mime_type,file_size,caption,created_at',
                'documents.uploadedBy:id,name,email',
            ])
            ->get()
            ->keyBy('pariwisata_survey_question_id');

        return [
            'assignment' => [
                'id' => $assignment->id,
                'code' => $assignment->code,
                'status' => $assignment->status,
                'status_label' => $this->labelFor($assignment->status, $this->statusOptions()),
                'assigned_at' => $this->formatDate($assignment->assigned_at),
                'started_at' => $this->formatDate($assignment->started_at),
                'last_saved_at' => $this->formatDate($assignment->last_saved_at),
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
                'assigned_by' => $this->formatUser($assignment->assignedBy),
            ],
            'template' => $template ? [
                'id' => $template->id,
                'title' => $template->title,
                'description' => $template->description,
                'status' => $template->status,
                'published_at' => $this->formatDate($template->published_at),
            ] : null,
            'sub_categories' => $this->formatTakePariwisataSubCategories($questions, $answers),
            'summary' => [
                'total_sub_categories' => $questions->groupBy(fn (PariwisataSurveyQuestion $question): string => $question->sub_category_code ?: 'uncategorized')->count(),
                'total_questions' => $questions->count(),
                'answered_questions' => $answers->count(),
                'total_options' => $questions->sum(fn (PariwisataSurveyQuestion $question): int => $question->options->count()),
            ],
        ];
    }

    /**
     * @param  array{answers: array<int, array<string, mixed>>}  $data
     */
    public function savePariwisataSurveyDraft(VillageSurveyAssignment $assignment, array $data, User $user): void
    {
        DB::transaction(function () use ($assignment, $data, $user): void {
            foreach ($data['answers'] as $answerData) {
                $option = PariwisataSuveyOption::query()
                    ->with('question:id,category_code,category_name,sub_category_code,sub_category_name,criteria_code,criteria_name,criteria_description,indicator_code,indicator_name,indicator_description,supporting_evidence')
                    ->findOrFail($answerData['pariwisata_suvey_option_id']);
                $question = $option->question;

                $answer = PariwisataSurveyAnswer::query()->updateOrCreate(
                    [
                        'village_survey_assignment_id' => $assignment->id,
                        'pariwisata_survey_question_id' => $answerData['question_id'],
                    ],
                    [
                        'pariwisata_suvey_option_id' => $option->id,
                        'score' => $option->score,
                        'notes' => $answerData['notes'] ?? null,
                        'category_code_snapshot' => $question?->category_code,
                        'category_name_snapshot' => $question?->category_name,
                        'sub_category_code_snapshot' => $question?->sub_category_code,
                        'sub_category_name_snapshot' => $question?->sub_category_name,
                        'criteria_code_snapshot' => $question?->criteria_code,
                        'criteria_name_snapshot' => $question?->criteria_name,
                        'criteria_description_snapshot' => $question?->criteria_description,
                        'indicator_code_snapshot' => $question?->indicator_code,
                        'indicator_name_snapshot' => $question?->indicator_name,
                        'indicator_description_snapshot' => $question?->indicator_description,
                        'supporting_evidence_snapshot' => $question?->supporting_evidence,
                        'option_label_snapshot' => $option->label,
                        'option_description_snapshot' => $option->description,
                        'answered_by' => $user->id,
                        'last_edited_by' => $user->id,
                        'answered_at' => now(),
                        'last_edited_at' => now(),
                    ]
                );

                foreach (Arr::wrap($answerData['documents'] ?? []) as $document) {
                    if (! $document instanceof UploadedFile) {
                        continue;
                    }

                    $path = $document->storePublicly("pariwisata-survey-answers/{$assignment->id}/{$answer->id}", 'public');

                    $answer->documents()->create([
                        'uploaded_by' => $user->id,
                        'file_name' => $document->getClientOriginalName(),
                        'file_path' => $path,
                        'mime_type' => $document->getClientMimeType(),
                        'file_size' => $document->getSize(),
                    ]);
                }
            }

            $assignment->update([
                'status' => $assignment->status === 'assigned' ? 'in_progress' : $assignment->status,
                'started_at' => $assignment->started_at ?? now(),
                'last_saved_at' => now(),
            ]);
        });
    }

    public function deletePariwisataSurveyDocument(VillageSurveyAssignment $assignment, PariwisataSurveyAnswerDocument $document): void
    {
        $document->loadMissing('answer:id,village_survey_assignment_id');
        abort_unless($document->answer?->village_survey_assignment_id === $assignment->id, 404);

        Storage::disk('public')->delete($document->file_path);
        $document->delete();
    }

    /**
     * @return array<string, mixed>
     */
    public function getTakeSurveyData(VillageSurveyAssignment $assignment): array
    {
        $assignment->load([
            'village:id,code,name,province,city,district,subdistrict',
            'template' => fn ($query) => $query->select(['id', 'title', 'description', 'status', 'published_at']),
            'template.questions' => fn ($query) => $query
                ->select(['id', 'survey_template_id', 'aspect', 'code', 'question_text', 'document_hint', 'sort_order'])
                ->orderBy('aspect')
                ->orderBy('sort_order')
                ->orderBy('id'),
            'template.questions.options' => fn ($query) => $query
                ->select(['id', 'survey_question_id', 'score', 'label', 'sort_order'])
                ->orderBy('sort_order')
                ->orderBy('score')
                ->orderBy('id'),
            'answers' => fn ($query) => $query->select([
                'id',
                'village_survey_assignment_id',
                'survey_question_id',
                'survey_question_option_id',
                'score',
                'notes',
                'answered_at',
                'last_edited_at',
            ]),
            'answers.option:id,score,label',
            'answers.documents:id,survey_answer_id,file_name,file_path,mime_type,file_size,created_at',
            'assignedBy:id,name,email',
        ]);

        $questions = $assignment->template?->questions ?? collect();
        $aspects = $this->formatSurveyAspects($questions, $assignment->answers->keyBy('survey_question_id'));

        return [
            'assignment' => [
                'id' => $assignment->id,
                'code' => $assignment->code,
                'status' => $assignment->status,
                'status_label' => $this->labelFor($assignment->status, $this->statusOptions()),
                'assigned_at' => $this->formatDate($assignment->assigned_at),
                'started_at' => $this->formatDate($assignment->started_at),
                'last_saved_at' => $this->formatDate($assignment->last_saved_at),
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
            'template' => [
                'id' => $assignment->template?->id,
                'title' => $assignment->template?->title ?? '-',
                'description' => $assignment->template?->description,
                'status' => $assignment->template?->status,
                'published_at' => $this->formatDate($assignment->template?->published_at),
            ],
            'aspects' => $aspects,
            'summary' => [
                'total_aspects' => count($aspects),
                'total_questions' => $questions->count(),
                'total_options' => $questions->sum(fn ($question): int => $question->options->count()),
            ],
        ];
    }

    /**
     * @param  array{answers: array<int, array<string, mixed>>}  $data
     */
    public function saveSurveyDraft(VillageSurveyAssignment $assignment, array $data, User $user): void
    {
        DB::transaction(function () use ($assignment, $data, $user): void {
            foreach ($data['answers'] as $answerData) {
                $questionId = (int) Arr::get($answerData, 'question_id');
                $optionId = (int) Arr::get($answerData, 'survey_question_option_id');

                $option = SurveyQuestionOption::query()
                    ->with('question:id,aspect,question_text')
                    ->findOrFail($optionId);
                $existingAnswer = SurveyAnswer::query()
                    ->with('option:id,score,label')
                    ->where([
                        'village_survey_assignment_id' => $assignment->id,
                        'survey_question_id' => $questionId,
                    ])
                    ->first();
                $notes = trim((string) Arr::get($answerData, 'notes', ''));
                $answeredAt = $existingAnswer?->answered_at ?? now();
                $oldOptionId = $existingAnswer?->survey_question_option_id;
                $oldScore = $existingAnswer?->score;
                $oldLabel = $existingAnswer?->option_label_snapshot ?? $existingAnswer?->option?->label;

                $answer = $existingAnswer ?? new SurveyAnswer([
                    'village_survey_assignment_id' => $assignment->id,
                    'survey_question_id' => $questionId,
                    'answered_by' => $user->id,
                    'answered_at' => $answeredAt,
                ]);

                $answer->fill([
                    'survey_question_option_id' => $option->id,
                    'score' => (int) $option->score,
                    'aspect_snapshot' => $option->question?->aspect,
                    'question_text_snapshot' => $option->question?->question_text,
                    'option_label_snapshot' => $option->label,
                    'notes' => $notes !== '' ? $notes : null,
                    'last_edited_by' => $user->id,
                    'last_edited_at' => now(),
                ]);
                $answer->answered_by ??= $user->id;
                $answer->answered_at ??= $answeredAt;
                $answer->save();

                if ($existingAnswer && (
                    (int) $oldOptionId !== (int) $option->id
                    || (float) $oldScore !== (float) $option->score
                )) {
                    SurveyAnswerHistory::query()->create([
                        'survey_answer_id' => $answer->id,
                        'village_survey_assignment_id' => $assignment->id,
                        'survey_question_id' => $answer->survey_question_id,
                        'actor_id' => $user->id,
                        'action' => 'updated',
                        'old_survey_question_option_id' => $oldOptionId,
                        'new_survey_question_option_id' => $option->id,
                        'old_score' => $oldScore,
                        'new_score' => $option->score,
                        'old_option_label' => $oldLabel,
                        'new_option_label' => $option->label,
                        'created_at' => now(),
                    ]);
                }

                foreach (Arr::wrap($answerData['documents'] ?? []) as $document) {
                    if (! $document instanceof UploadedFile) {
                        continue;
                    }

                    $path = $document->storePublicly("survey-answers/{$assignment->id}/{$answer->id}", 'public');

                    $answer->documents()->create([
                        'uploaded_by' => $user->id,
                        'file_name' => $document->getClientOriginalName(),
                        'file_path' => $path,
                        'mime_type' => $document->getClientMimeType(),
                        'file_size' => $document->getSize(),
                    ]);
                }
            }

            $assignment->update([
                'status' => $assignment->status === 'assigned' ? 'in_progress' : $assignment->status,
                'started_at' => $assignment->started_at ?? now(),
                'last_saved_at' => now(),
            ]);
        });
    }

    public function deleteSurveyDocument(VillageSurveyAssignment $assignment, SurveyAnswerDocument $document): void
    {
        $document->loadMissing('answer:id,village_survey_assignment_id');

        abort_unless($document->answer?->village_survey_assignment_id === $assignment->id, 404);

        Storage::disk('public')->delete($document->file_path);
        $document->delete();
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function statusOptions(): array
    {
        return [
            ['value' => 'assigned', 'label' => 'Assigned'],
            ['value' => 'in_progress', 'label' => 'In Progress'],
            ['value' => 'submitted', 'label' => 'Submitted'],
            ['value' => 'approved', 'label' => 'Approved'],
            ['value' => 'need_revision', 'label' => 'Need Revision'],
            ['value' => 'rejected', 'label' => 'Rejected'],
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function templateOptions(): array
    {
        return SurveyTemplate::query()
            ->select(['id', 'title'])
            ->orderBy('title')
            ->get()
            ->map(fn (SurveyTemplate $template): array => [
                'value' => (string) $template->id,
                'label' => $template->title,
            ])
            ->all();
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function villageOptions(): array
    {
        return TourismVillage::query()
            ->select(['id', 'code', 'name', 'city', 'province'])
            ->whereDoesntHave('surveyAssignment')
            ->orderBy('name')
            ->get()
            ->map(fn (TourismVillage $village): array => [
                'value' => (string) $village->id,
                'label' => "{$village->name} ({$village->code})",
                'description' => collect([$village->city, $village->province])->filter()->implode(', '),
            ])
            ->all();
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function villageOptionsForAssignment(VillageSurveyAssignment $assignment): array
    {
        return TourismVillage::query()
            ->select(['id', 'code', 'name', 'city', 'province'])
            ->where(function ($query) use ($assignment): void {
                $query
                    ->whereDoesntHave('surveyAssignment')
                    ->orWhere('id', $assignment->village_id);
            })
            ->orderBy('name')
            ->get()
            ->map(fn (TourismVillage $village): array => [
                'value' => (string) $village->id,
                'label' => "{$village->name} ({$village->code})",
                'description' => collect([$village->city, $village->province])->filter()->implode(', '),
            ])
            ->all();
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function userOptions(): array
    {
        return User::query()
            ->select(['id', 'name', 'email'])
            ->orderBy('name')
            ->get()
            ->map(fn (User $user): array => [
                'value' => (string) $user->id,
                'label' => $user->name,
                'description' => $user->email,
            ])
            ->all();
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function getStats(): array
    {
        return [
            [
                'label' => 'Total Assignment',
                'value' => (string) VillageSurveyAssignment::query()->count(),
                'description' => 'Seluruh assignment survey desa',
                'icon' => 'clipboard',
            ],
            [
                'label' => 'Sedang Berjalan',
                'value' => (string) VillageSurveyAssignment::query()->where('status', 'in_progress')->count(),
                'description' => 'Enumerator sedang mengisi survey',
                'icon' => 'activity',
            ],
            [
                'label' => 'Menunggu Review',
                'value' => (string) VillageSurveyAssignment::query()->where('status', 'submitted')->count(),
                'description' => 'Survey sudah dikirim',
                'icon' => 'search',
            ],
            [
                'label' => 'Selesai',
                'value' => (string) VillageSurveyAssignment::query()->where('status', 'approved')->count(),
                'description' => 'Survey disetujui reviewer',
                'icon' => 'check',
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatAssignment(VillageSurveyAssignment $assignment): array
    {
        return [
            'id' => $assignment->id,
            'code' => $assignment->code,
            'village_id' => $assignment->village_id,
            'village_name' => $assignment->village?->name ?? '-',
            'village_code' => $assignment->village?->code ?? '-',
            'village_location' => collect([$assignment->village?->city, $assignment->village?->province])->filter()->implode(', ') ?: '-',
            'survey_template_id' => $assignment->survey_template_id,
            'template_title' => $assignment->template?->title ?? '-',
            'template_status' => $assignment->template?->status ?? '-',
            'status' => $assignment->status,
            'status_label' => $this->labelFor($assignment->status, $this->statusOptions()),
            'assigned_by' => $assignment->assigned_by,
            'assigned_by_name' => $assignment->assignedBy?->name ?? '-',
            'submitted_by' => $assignment->submitted_by,
            'submitted_by_name' => $assignment->submittedBy?->name ?? '-',
            'reviewed_by' => $assignment->reviewed_by,
            'reviewed_by_name' => $assignment->reviewedBy?->name ?? '-',
            'assigned_at' => $this->formatDate($assignment->assigned_at),
            'started_at' => $this->formatDate($assignment->started_at),
            'last_saved_at' => $this->formatDate($assignment->last_saved_at),
            'submitted_at' => $this->formatDate($assignment->submitted_at),
            'reviewed_at' => $this->formatDate($assignment->reviewed_at),
            'created_at' => $this->formatDate($assignment->created_at),
            'updated_at' => $this->formatDate($assignment->updated_at),
            'is_trashed' => $assignment->trashed(),
            'total_score' => $this->assignmentFinalScore($assignment),
            'answers_count' => $assignment->answers_count,
            'documents_count' => $assignment->documents_count,
        ];
    }

    private function assignmentFinalScore(VillageSurveyAssignment $assignment): float
    {
        $totalScore = $assignment->answers->sum(fn (SurveyAnswer $answer): int => (int) $answer->score);
        $maxScore = $assignment->template?->questions
            ->sum(fn (SurveyQuestion $question): int => (int) $question->options->max('score')) ?? 0;

        return $maxScore > 0 ? round(($totalScore / $maxScore) * 100, 1) : 0.0;
    }

    /**
     * @param  Collection<int, SurveyQuestion>  $questions
     * @param  Collection<int, SurveyAnswer>  $answersByQuestion
     * @return array<int, array<string, mixed>>
     */
    private function formatSurveyAspects(Collection $questions, Collection $answersByQuestion): array
    {
        return $questions
            ->groupBy('aspect')
            ->map(fn (Collection $aspectQuestions, string $aspect): array => [
                'name' => $aspect,
                'min_sort_order' => $aspectQuestions->min('sort_order'),
                'questions' => $aspectQuestions
                    ->sortBy('sort_order')
                    ->values()
                    ->map(function (SurveyQuestion $question) use ($answersByQuestion): array {
                        $answer = $answersByQuestion->get($question->id);

                        return [
                            'id' => $question->id,
                            'code' => $question->code,
                            'question_text' => $question->question_text,
                            'document_hint' => $question->document_hint,
                            'sort_order' => $question->sort_order,
                            'answer' => $answer ? [
                                'id' => $answer->id,
                                'selected_option_id' => $answer->survey_question_option_id,
                                'score' => (int) $answer->score,
                                'notes' => $answer->notes,
                                'documents' => $answer->documents
                                    ->map(fn ($document): array => [
                                        'id' => $document->id,
                                        'file_name' => $document->file_name,
                                        'file_url' => Storage::disk('public')->url($document->file_path),
                                        'mime_type' => $document->mime_type,
                                        'file_size' => $document->file_size,
                                    ])
                                    ->values()
                                    ->all(),
                            ] : null,
                            'options' => $question->options
                                ->map(fn ($option): array => [
                                    'id' => $option->id,
                                    'score' => (int) $option->score,
                                    'label' => $option->label,
                                    'sort_order' => $option->sort_order,
                                ])
                                ->values()
                                ->all(),
                        ];
                    })
                    ->all(),
            ])
            ->sortBy('min_sort_order')
            ->values()
            ->all();
    }

    /**
     * @param  Collection<int, SurveyQuestion>  $questions
     * @param  Collection<int, SurveyAnswer>  $answersByQuestion
     * @return array<int, array<string, mixed>>
     */
    private function formatAssignmentDetailAspects(Collection $questions, Collection $answersByQuestion): array
    {
        return $questions
            ->groupBy('aspect')
            ->map(function (Collection $aspectQuestions, string $aspect) use ($answersByQuestion): array {
                $questionRows = $aspectQuestions
                    ->sortBy('sort_order')
                    ->values()
                    ->map(function (SurveyQuestion $question, int $index) use ($answersByQuestion): array {
                        $answer = $answersByQuestion->get($question->id);
                        $maxScore = (int) $question->options->max('score');

                        return [
                            'id' => $question->id,
                            'number' => $index + 1,
                            'code' => $question->code ?? 'Q-'.$question->id,
                            'question_text' => $question->question_text,
                            'document_hint' => $question->document_hint,
                            'sort_order' => $question->sort_order,
                            'max_score' => $maxScore,
                            'answer' => $answer ? [
                                'id' => $answer->id,
                                'survey_question_option_id' => $answer->survey_question_option_id,
                                'score' => (int) $answer->score,
                                'score_label' => $answer->option_label_snapshot ?? $answer->option?->label ?? '-',
                                'notes' => $answer->notes,
                                'answered_at' => $this->formatDate($answer->answered_at),
                                'last_edited_at' => $this->formatDate($answer->last_edited_at),
                                'answered_by' => $this->formatUser($answer->answeredBy),
                                'last_edited_by' => $this->formatUser($answer->lastEditedBy),
                                'documents' => $answer->documents
                                    ->map(fn (SurveyAnswerDocument $document): array => $this->formatDocument($document))
                                    ->values()
                                    ->all(),
                                'histories' => $answer->histories
                                    ->map(fn ($history): array => [
                                        'id' => $history->id,
                                        'action' => Str::headline($history->action),
                                        'actor' => $this->formatUser($history->actor),
                                        'old_score' => $history->old_score ? (string) $history->old_score : null,
                                        'new_score' => $history->new_score ? (string) $history->new_score : null,
                                        'old_option_label' => $history->old_option_label,
                                        'new_option_label' => $history->new_option_label,
                                        'created_at' => $this->formatDate($history->created_at),
                                    ])
                                    ->values()
                                    ->all(),
                            ] : null,
                            'options' => $question->options
                                ->map(fn ($option): array => [
                                    'id' => $option->id,
                                    'score' => (int) $option->score,
                                    'label' => $option->label,
                                    'sort_order' => $option->sort_order,
                                ])
                                ->values()
                                ->all(),
                        ];
                    });

                $answeredCount = $questionRows->whereNotNull('answer')->count();
                $documentsCount = $questionRows->sum(fn (array $question): int => count($question['answer']['documents'] ?? []));
                $score = $questionRows->sum(fn (array $question): int => (int) ($question['answer']['score'] ?? 0));
                $maxScore = $questionRows->sum(fn (array $question): int => (int) $question['max_score']);
                $percent = $maxScore > 0 ? round(($score / $maxScore) * 100, 1) : 0.0;
                $minSortOrder = $questionRows->min('sort_order') ?? 999;

                return [
                    'name' => $aspect,
                    'min_sort_order' => $minSortOrder,
                    'question_count' => $questionRows->count(),
                    'answered_count' => $answeredCount,
                    'documents_count' => $documentsCount,
                    'score' => $score,
                    'max_score' => $maxScore,
                    'score_percent' => $percent,
                    'questions' => $questionRows->values()->all(),
                ];
            })
            ->sortBy('min_sort_order')
            ->values()
            ->all();
    }

    /**
     * @param  Collection<int, SurveyQuestion>  $questions
     * @param  Collection<int, SurveyAnswer>  $answersByQuestion
     * @param  array<int, array<string, mixed>>  $aspects
     * @return array<string, mixed>
     */
    private function buildAssignmentSummary(Collection $questions, Collection $answersByQuestion, array $aspects): array
    {
        $totalScore = $answersByQuestion->sum(fn (SurveyAnswer $answer): int => (int) $answer->score);
        $maxScore = $questions->sum(fn (SurveyQuestion $question): int => (int) $question->options->max('score'));
        $finalScore = $maxScore > 0 ? round(($totalScore / $maxScore) * 100, 1) : 0.0;
        $rankedAspects = collect($aspects)->filter(fn (array $aspect): bool => (int) $aspect['max_score'] > 0);
        $highestAspect = $rankedAspects->sortByDesc('score_percent')->first();
        $lowestAspect = $rankedAspects->sortBy('score_percent')->first();

        return [
            'total_questions' => $questions->count(),
            'answered_questions' => $answersByQuestion->count(),
            'unanswered_questions' => max($questions->count() - $answersByQuestion->count(), 0),
            'total_documents' => $answersByQuestion->sum(fn (SurveyAnswer $answer): int => $answer->documents->count()),
            'total_score' => $totalScore,
            'max_score' => $maxScore,
            'final_score' => $finalScore,
            'highest_aspect' => $highestAspect ? [
                'name' => $highestAspect['name'],
                'score_percent' => $highestAspect['score_percent'],
            ] : null,
            'lowest_aspect' => $lowestAspect ? [
                'name' => $lowestAspect['name'],
                'score_percent' => $lowestAspect['score_percent'],
            ] : null,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatUmkmForAssignment(VillageUmkm $umkm): array
    {
        $answers = $umkm->surveyAnswers;
        $documents = $umkm->relationLoaded('documents') ? $umkm->documents : collect();
        $categories = $umkm->relationLoaded('categories') ? $umkm->categories : collect();
        $weightedScore = round((float) $answers->sum(fn (UmkmSurveyAnswer $answer): float => (float) $answer->weighted_score), 2);
        $averageScore = $answers->count() > 0
            ? round((float) $answers->avg(fn (UmkmSurveyAnswer $answer): float => (float) $answer->score), 2)
            : 0.0;

        return [
            'id' => $umkm->id,
            'name' => $umkm->name,
            'business_owner_name' => $umkm->business_owner_name,
            'village_name' => $umkm->village_name,
            'collector_name' => $umkm->collector_name,
            'legal_business_name' => $umkm->legal_business_name,
            'established_year' => $umkm->established_year,
            'company_website_url' => $umkm->company_website_url,
            'production_address' => $umkm->production_address,
            'product_category' => $umkm->product_category,
            'categories' => $categories
                ->map(fn ($category): array => [
                    'value' => $category->category,
                    'label' => $this->umkmCategoryLabel((string) $category->category),
                ])
                ->values()
                ->all(),
            'category_labels' => $categories->isNotEmpty()
                ? $categories->map(fn ($category): string => $this->umkmCategoryLabel((string) $category->category))->implode(', ')
                : $umkm->product_category,
            'brand_name' => $umkm->brand_name,
            'annual_revenue' => $umkm->annual_revenue ? $this->formatCurrency((float) $umkm->annual_revenue) : '-',
            'monthly_production_capacity' => $umkm->monthly_production_capacity,
            'annual_production_capacity' => $umkm->annual_production_capacity,
            'factory_location_feasibility' => $umkm->factory_location_feasibility,
            'certifications' => $umkm->certifications,
            'current_obstacles' => $umkm->current_obstacles,
            'has_business_legality_and_certification' => $umkm->has_business_legality_and_certification,
            'is_umkm_participant' => $umkm->is_umkm_participant,
            'is_production_capacity_participant' => $umkm->is_production_capacity_participant,
            'instagram_url' => $umkm->instagram_url,
            'facebook_url' => $umkm->facebook_url,
            'twitter_url' => $umkm->twitter_url,
            'marketing_website_url' => $umkm->marketing_website_url,
            'ecommerce_profile_url' => $umkm->ecommerce_profile_url,
            'marketing_notes' => $umkm->marketing_notes,
            'sustainability_notes' => $umkm->sustainability_notes,
            'bank_name' => $umkm->bank_name,
            'bank_account_number' => $umkm->bank_account_number,
            'has_qris' => $this->formatBoolean($umkm->has_qris),
            'qris_provider' => $umkm->qris_provider,
            'has_edc' => $this->formatBoolean($umkm->has_edc),
            'edc_provider' => $umkm->edc_provider,
            'has_credit_card' => $this->formatBoolean($umkm->has_credit_card),
            'banking_notes' => $umkm->banking_notes,
            'has_exported' => $this->formatBoolean($umkm->has_exported),
            'export_destination_countries' => $umkm->export_destination_countries,
            'collector' => $this->formatUser($umkm->dataCollector),
            'creator' => $this->formatUser($umkm->creator),
            'product_photo_url' => $umkm->product_photo_path ? Storage::disk('public')->url($umkm->product_photo_path) : null,
            'documents' => $documents
                ->map(fn (VillageUmkmDocument $document): array => $this->formatUmkmDocument($document))
                ->values()
                ->all(),
            'created_at' => $this->formatDate($umkm->created_at),
            'updated_at' => $this->formatDate($umkm->updated_at),
            'survey_summary' => [
                'answered_questions' => $answers->count(),
                'average_score' => $averageScore,
                'weighted_score' => $weightedScore,
                'last_answered_at' => $this->formatDate($answers->max('last_edited_at')),
            ],
            'survey_groups' => $answers
                ->groupBy(fn (UmkmSurveyAnswer $answer): string => $answer->criteria_code_snapshot ?? $answer->question?->criteria_code ?? '-')
                ->map(fn (Collection $criteriaAnswers, string $criteriaCode): array => [
                    'criteria_code' => $criteriaCode,
                    'criteria_name' => $criteriaAnswers->first()?->criteria_name_snapshot
                        ?? $criteriaAnswers->first()?->question?->criteria_name
                        ?? '-',
                    'criteria_weight_percent' => (float) ($criteriaAnswers->first()?->criteria_weight_percent_snapshot ?? 0),
                    'answered_questions' => $criteriaAnswers->count(),
                    'weighted_score' => round((float) $criteriaAnswers->sum(fn (UmkmSurveyAnswer $answer): float => (float) $answer->weighted_score), 2),
                    'answers' => $criteriaAnswers
                        ->values()
                        ->map(fn (UmkmSurveyAnswer $answer): array => [
                            'id' => $answer->id,
                            'question_id' => $answer->umkm_assessment_question_id,
                            'question_number' => $answer->question?->question_number,
                            'question_text' => $answer->question_text_snapshot ?? $answer->question?->question_text ?? '-',
                            'question_weight_percent' => (float) ($answer->question_weight_percent_snapshot ?? 0),
                            'score' => (float) $answer->score,
                            'max_score' => (float) ($answer->max_score_snapshot ?? 100),
                            'weighted_score' => (float) $answer->weighted_score,
                            'answered_by' => $this->formatUser($answer->answeredBy),
                            'answered_at' => $this->formatDate($answer->answered_at),
                            'last_edited_at' => $this->formatDate($answer->last_edited_at),
                        ])
                        ->all(),
                ])
                ->values()
                ->all(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatUmkmEditValues(VillageUmkm $umkm): array
    {
        return [
            'business_owner_name' => (string) ($umkm->business_owner_name ?? ''),
            'name' => (string) ($umkm->name ?? ''),
            'legal_business_name' => (string) ($umkm->legal_business_name ?? ''),
            'established_year' => $umkm->established_year ? (string) $umkm->established_year : '',
            'company_website_url' => (string) ($umkm->company_website_url ?? ''),
            'production_address' => (string) ($umkm->production_address ?? ''),
            'product_category' => (string) ($umkm->product_category ?? ''),
            'categories' => $umkm->categories->pluck('category')->values()->all(),
            'brand_name' => (string) ($umkm->brand_name ?? ''),
            'annual_revenue' => $umkm->annual_revenue !== null
                ? (string) (int) round((float) $umkm->annual_revenue)
                : '',
            'monthly_production_capacity' => (string) ($umkm->monthly_production_capacity ?? ''),
            'current_obstacles' => (string) ($umkm->current_obstacles ?? ''),
            'certifications' => (string) ($umkm->certifications ?? ''),
            'has_business_legality_and_certification' => (string) ($umkm->has_business_legality_and_certification ?? ''),
            'is_umkm_participant' => (string) ($umkm->is_umkm_participant ?? ''),
            'is_production_capacity_participant' => (string) ($umkm->is_production_capacity_participant ?? ''),
            'annual_production_capacity' => (string) ($umkm->annual_production_capacity ?? ''),
            'factory_location_feasibility' => (string) ($umkm->factory_location_feasibility ?? ''),
            'instagram_url' => (string) ($umkm->instagram_url ?? ''),
            'facebook_url' => (string) ($umkm->facebook_url ?? ''),
            'twitter_url' => (string) ($umkm->twitter_url ?? ''),
            'marketing_website_url' => (string) ($umkm->marketing_website_url ?? ''),
            'ecommerce_profile_url' => (string) ($umkm->ecommerce_profile_url ?? ''),
            'marketing_notes' => (string) ($umkm->marketing_notes ?? ''),
            'sustainability_notes' => (string) ($umkm->sustainability_notes ?? ''),
            'bank_name' => (string) ($umkm->bank_name ?? ''),
            'bank_account_number' => (string) ($umkm->bank_account_number ?? ''),
            'has_qris' => $this->formatBooleanValue($umkm->has_qris),
            'qris_provider' => (string) ($umkm->qris_provider ?? ''),
            'has_edc' => $this->formatBooleanValue($umkm->has_edc),
            'edc_provider' => (string) ($umkm->edc_provider ?? ''),
            'has_credit_card' => $this->formatBooleanValue($umkm->has_credit_card),
            'banking_notes' => (string) ($umkm->banking_notes ?? ''),
            'has_exported' => $this->formatBooleanValue($umkm->has_exported),
            'export_destination_countries' => (string) ($umkm->export_destination_countries ?? ''),
            'annual_turnovers' => collect($umkm->annualTurnovers)->map(fn ($item) => [
                'year' => (string) $item->year,
                'value' => (string) $item->value,
                'notes' => $item->notes ?? '',
            ])->values()->all(),
            'annual_worker_stats' => collect($umkm->annualWorkerStats)->map(fn ($item) => [
                'year' => (string) $item->year,
                'dimension' => $item->dimension,
                'category_value' => $item->category_value,
                'total_people' => (string) $item->total_people,
                'notes' => $item->notes ?? '',
            ])->values()->all(),
            'annual_worker_training_stats' => collect($umkm->annualWorkerTrainingStats)->map(fn ($item) => [
                'year' => (string) $item->year,
                'training_name' => $item->training_name ?? '',
                'total_people' => (string) $item->total_people,
                'notes' => $item->notes ?? '',
            ])->values()->all(),
        ];
    }

    private function umkmCategoryLabel(string $value): string
    {
        return [
            'kuliner' => 'Kuliner',
            'tekstil_dan_kerajinan' => 'Tekstil dan Kerajinan',
            'fashion_dan_aksesoris' => 'Fashion dan Aksesoris',
            'kecantikan_dan_kesehatan' => 'Kecantikan dan Kesehatan',
            'jasa' => 'Jasa',
            'pertanian' => 'Pertanian',
            'peternakan' => 'Peternakan',
            'perikanan' => 'Perikanan',
            'produk_digital_dan_kreatif' => 'Produk Digital dan Kreatif',
        ][$value] ?? Str::headline($value);
    }

    /**
     * @return array<string, mixed>
     */
    private function formatPariwisataForAssignment(VillageSurveyAssignment $assignment, PariwisataVillage $pariwisata): array
    {
        return [
            'id' => $pariwisata->id,
            'name' => $pariwisata->name,
            'operational_days' => $pariwisata->operational_days,
            'operational_hours' => $pariwisata->operational_hours,
            'operational_schedule' => $pariwisata->operational_schedule,
            'entrance_ticket_price' => $pariwisata->entrance_ticket_price ? $this->formatCurrency((float) $pariwisata->entrance_ticket_price) : '-',
            'entrance_ticket_description' => $pariwisata->entrance_ticket_description,
            'address' => $pariwisata->address,
            'person_in_charge_name' => $pariwisata->person_in_charge_name,
            'person_in_charge_phone' => $pariwisata->person_in_charge_phone,
            'person_in_charge_address' => $pariwisata->person_in_charge_address,
            'is_active' => (bool) $pariwisata->is_active,
            'status_label' => $pariwisata->is_active ? 'Aktif' : 'Nonaktif',
            'categories' => $pariwisata->categories
                ->map(fn ($category): array => [
                    'id' => $category->id,
                    'value' => $category->category,
                    'label' => $this->categoryLabel($category->category),
                ])
                ->values()
                ->all(),
            'created_at' => $this->formatDate($pariwisata->created_at),
            'updated_at' => $this->formatDate($pariwisata->updated_at),
            'detail_url' => route('survey-assignments.pariwisata.show', [$assignment, $pariwisata]),
        ];
    }

    /**
     * @param  Collection<int, PariwisataSurveyQuestion>  $questions
     * @param  Collection<int, PariwisataSurveyAnswer>  $answersByQuestion
     * @return array<int, array<string, mixed>>
     */
    private function formatPariwisataSurveyGroups(Collection $questions, Collection $answersByQuestion): array
    {
        return $questions
            ->groupBy('category_name')
            ->map(function (Collection $categoryQuestions, string $categoryName) use ($answersByQuestion): array {
                $questionRows = $categoryQuestions
                    ->sortBy('sort_order')
                    ->values()
                    ->map(function (PariwisataSurveyQuestion $question) use ($answersByQuestion): array {
                        $answer = $answersByQuestion->get($question->id);
                        $maxScore = (int) $question->options->max('score');

                        return [
                            'id' => $question->id,
                            'category_code' => $question->category_code,
                            'category_name' => $question->category_name,
                            'sub_category_code' => $question->sub_category_code,
                            'sub_category_name' => $question->sub_category_name,
                            'criteria_code' => $question->criteria_code,
                            'criteria_name' => $question->criteria_name,
                            'indicator_code' => $question->indicator_code,
                            'indicator_name' => $question->indicator_name,
                            'indicator_description' => $question->indicator_description,
                            'supporting_evidence' => $question->supporting_evidence,
                            'document_required' => (bool) $question->document_required,
                            'document_hint' => $question->document_hint,
                            'max_score' => $maxScore,
                            'answer' => $answer ? [
                                'id' => $answer->id,
                                'pariwisata_suvey_option_id' => $answer->pariwisata_suvey_option_id,
                                'score' => (int) $answer->score,
                                'score_label' => $answer->option_label_snapshot ?? $answer->option?->label ?? '-',
                                'notes' => $answer->notes,
                                'option_description' => $answer->option_description_snapshot ?? $answer->option?->description,
                                'notes' => $answer->notes,
                                'answered_at' => $this->formatDate($answer->answered_at),
                                'last_edited_at' => $this->formatDate($answer->last_edited_at),
                                'answered_by' => $this->formatUser($answer->answeredBy),
                                'last_edited_by' => $this->formatUser($answer->lastEditedBy),
                                'documents' => $answer->documents
                                    ->map(fn (PariwisataSurveyAnswerDocument $document): array => $this->formatPariwisataDocument($document))
                                    ->values()
                                    ->all(),
                            ] : null,
                            'options' => $question->options
                                ->map(fn (PariwisataSuveyOption $option): array => [
                                    'id' => $option->id,
                                    'score' => (int) $option->score,
                                    'level' => $option->level,
                                    'label' => $option->label,
                                    'description' => $option->description,
                                    'sort_order' => $option->sort_order,
                                ])
                                ->values()
                                ->all(),
                        ];
                    });

                return [
                    'category_name' => $categoryName,
                    'min_sort_order' => $categoryQuestions->min('sort_order') ?? 999,
                    'question_count' => $questionRows->count(),
                    'answered_count' => $questionRows->whereNotNull('answer')->count(),
                    'documents_count' => $questionRows->sum(fn (array $question): int => count($question['answer']['documents'] ?? [])),
                    'score' => $questionRows->sum(fn (array $question): int => (int) ($question['answer']['score'] ?? 0)),
                    'max_score' => $questionRows->sum(fn (array $question): int => (int) $question['max_score']),
                    'questions' => $questionRows->all(),
                ];
            })
            ->sortBy('min_sort_order')
            ->values()
            ->all();
    }

    /**
     * @param  Collection<int, PariwisataSurveyQuestion>  $questions
     * @param  Collection<int, PariwisataSurveyAnswer>  $answersByQuestion
     * @param  array<int, array<string, mixed>>  $groups
     * @return array<string, mixed>
     */
    private function buildPariwisataSurveySummary(Collection $questions, Collection $answersByQuestion, array $groups): array
    {
        $totalScore = $answersByQuestion->sum(fn (PariwisataSurveyAnswer $answer): int => (int) $answer->score);
        $maxScore = $questions->sum(fn (PariwisataSurveyQuestion $question): int => (int) $question->options->max('score'));
        $finalScore = $maxScore > 0 ? round(($totalScore / $maxScore) * 100, 1) : 0.0;
        $aspects = $this->formatPariwisataSummaryAspects($groups);
        $rankedAspects = collect($aspects)->filter(fn (array $aspect): bool => (int) $aspect['max_score'] > 0);
        $highestAspect = $rankedAspects->sortByDesc('score_percent')->first();
        $lowestAspect = $rankedAspects->sortBy('score_percent')->first();

        return [
            'total_questions' => $questions->count(),
            'answered_questions' => $answersByQuestion->count(),
            'unanswered_questions' => max($questions->count() - $answersByQuestion->count(), 0),
            'total_documents' => $answersByQuestion->sum(fn (PariwisataSurveyAnswer $answer): int => $answer->relationLoaded('documents') ? $answer->documents->count() : 0),
            'total_score' => $totalScore,
            'max_score' => $maxScore,
            'final_score' => $finalScore,
            'last_answered_at' => $this->formatDate($answersByQuestion->max('last_edited_at')),

            'highest_aspect' => $highestAspect ? [
                'name' => $highestAspect['name'],
                'score_percent' => $highestAspect['score_percent'],
            ] : null,
            'lowest_aspect' => $lowestAspect ? [
                'name' => $lowestAspect['name'],
                'score_percent' => $lowestAspect['score_percent'],
            ] : null,
            'aspects' => $aspects,
            'distribution' => $this->formatPariwisataScoreDistribution($answersByQuestion),
        ];
    }

    /**
     * @param  array<int, array<string, mixed>>  $groups
     * @return array<int, array<string, mixed>>
     */
    private function formatPariwisataSummaryAspects(array $groups): array
    {
        return collect($groups)
            ->map(fn (array $group): array => [
                'name' => $group['category_name'],
                'question_count' => $group['question_count'],
                'answered_count' => $group['answered_count'],
                'documents_count' => $group['documents_count'],
                'score' => $group['score'],
                'max_score' => $group['max_score'],
                'score_percent' => (int) $group['max_score'] > 0 ? round(((float) $group['score'] / (float) $group['max_score']) * 100, 1) : 0.0,
            ])
            ->values()
            ->all();
    }

    /**
     * @param  Collection<int, PariwisataSurveyAnswer>  $answersByQuestion
     * @return array<int, array<string, int>>
     */
    private function formatPariwisataScoreDistribution(Collection $answersByQuestion): array
    {
        return collect(range(1, 4))
            ->map(fn (int $score): array => [
                'score' => $score,
                'count' => $answersByQuestion->filter(fn (PariwisataSurveyAnswer $answer): bool => (int) $answer->score === $score)->count(),
            ])
            ->all();
    }

    /**
     * @return Collection<int, PariwisataSurveyQuestion>
     */
    private function pariwisataQuestionsForSummary(): Collection
    {
        return once(fn (): Collection => $this->activePariwisataTemplate([
            'pariwisataSurveyQuestions' => fn ($query) => $query
                ->select(['id', 'survey_template_id', 'category_code', 'category_name', 'sub_category_code', 'sub_category_name', 'criteria_code', 'criteria_name', 'indicator_code', 'indicator_name', 'indicator_description', 'supporting_evidence', 'document_required', 'document_hint', 'sort_order'])
                ->where('is_active', true)
                ->orderBy('sort_order'),
            'pariwisataSurveyQuestions.options' => fn ($query) => $query
                ->select(['id', 'pariwisata_survey_question_id', 'score', 'level', 'label', 'description', 'sort_order'])
                ->orderBy('sort_order'),
        ])?->pariwisataSurveyQuestions ?? collect());
    }

    /**
     * @param  array<string, mixed>  $with
     */
    private function activePariwisataTemplate(array $with = []): ?SurveyTemplate
    {
        return $this->templateResolver->resolve('pariwisata', $with);
    }

    /**
     * @param  Collection<int, PariwisataSurveyQuestion>  $questions
     * @return Collection<int, PariwisataSurveyQuestion>
     */
    private function sortTakePariwisataQuestions(Collection $questions): Collection
    {
        return $questions
            ->sort(function (PariwisataSurveyQuestion $left, PariwisataSurveyQuestion $right): int {
                $comparisons = [
                    $this->compareHierarchicalCodes($left->category_code, $right->category_code),
                    $this->compareHierarchicalCodes($left->sub_category_code, $right->sub_category_code),
                    $this->compareHierarchicalCodes($left->criteria_code, $right->criteria_code),
                    ((int) $left->sort_order) <=> ((int) $right->sort_order),
                    $this->compareHierarchicalCodes($left->indicator_code, $right->indicator_code),
                    $left->id <=> $right->id,
                ];

                foreach ($comparisons as $comparison) {
                    if ($comparison !== 0) {
                        return $comparison;
                    }
                }

                return 0;
            })
            ->values();
    }

    private function compareHierarchicalCodes(?string $left, ?string $right): int
    {
        $left = trim((string) $left);
        $right = trim((string) $right);

        if ($left === '' && $right === '') {
            return 0;
        }

        if ($left === '') {
            return 1;
        }

        if ($right === '') {
            return -1;
        }

        $leftSegments = preg_split('/\./', mb_strtolower($left)) ?: [];
        $rightSegments = preg_split('/\./', mb_strtolower($right)) ?: [];
        $segmentCount = max(count($leftSegments), count($rightSegments));

        for ($index = 0; $index < $segmentCount; $index++) {
            $leftSegment = $leftSegments[$index] ?? null;
            $rightSegment = $rightSegments[$index] ?? null;

            if ($leftSegment === null) {
                return -1;
            }

            if ($rightSegment === null) {
                return 1;
            }

            $comparison = $this->compareCodeSegments($leftSegment, $rightSegment);

            if ($comparison !== 0) {
                return $comparison;
            }
        }

        return 0;
    }

    private function compareCodeSegments(string $leftSegment, string $rightSegment): int
    {
        preg_match_all('/\d+|\D+/', $leftSegment, $leftParts);
        preg_match_all('/\d+|\D+/', $rightSegment, $rightParts);

        $leftParts = $leftParts[0] ?? [];
        $rightParts = $rightParts[0] ?? [];
        $partsCount = max(count($leftParts), count($rightParts));

        for ($index = 0; $index < $partsCount; $index++) {
            $leftPart = $leftParts[$index] ?? null;
            $rightPart = $rightParts[$index] ?? null;

            if ($leftPart === null) {
                return -1;
            }

            if ($rightPart === null) {
                return 1;
            }

            $leftIsNumeric = ctype_digit($leftPart);
            $rightIsNumeric = ctype_digit($rightPart);

            if ($leftIsNumeric && $rightIsNumeric) {
                $comparison = ((int) $leftPart) <=> ((int) $rightPart);
            } else {
                $comparison = strcmp($leftPart, $rightPart);
            }

            if ($comparison !== 0) {
                return $comparison;
            }
        }

        return 0;
    }

    /**
     * @param  Collection<int, PariwisataSurveyQuestion>  $questions
     * @param  Collection<int, PariwisataSurveyAnswer>  $answersByQuestion
     * @return array<int, array<string, mixed>>
     */
    private function formatTakePariwisataSubCategories(Collection $questions, Collection $answersByQuestion): array
    {
        return $questions
            ->groupBy(fn (PariwisataSurveyQuestion $question): string => $question->sub_category_code ?: 'uncategorized')
            ->map(function (Collection $subCategoryQuestions, string $subCategoryCode) use ($answersByQuestion): array {
                $firstQuestion = $subCategoryQuestions->first();

                return [
                    'sub_category_code' => $subCategoryCode,
                    'sub_category_name' => $firstQuestion?->sub_category_name ?? 'Tanpa Sub Kategori',
                    'category_code' => $firstQuestion?->category_code,
                    'category_name' => $firstQuestion?->category_name,
                    'question_count' => $subCategoryQuestions->count(),
                    'answered_count' => $subCategoryQuestions
                        ->filter(fn (PariwisataSurveyQuestion $question): bool => $answersByQuestion->has($question->id))
                        ->count(),
                    'questions' => $subCategoryQuestions
                        ->values()
                        ->map(function (PariwisataSurveyQuestion $question) use ($answersByQuestion): array {
                            $answer = $answersByQuestion->get($question->id);

                            return [
                                'id' => $question->id,
                                'category_code' => $question->category_code,
                                'category_name' => $question->category_name,
                                'sub_category_code' => $question->sub_category_code,
                                'sub_category_name' => $question->sub_category_name,
                                'criteria_code' => $question->criteria_code,
                                'criteria_name' => $question->criteria_name,
                                'criteria_description' => $question->criteria_description,
                                'indicator_code' => $question->indicator_code,
                                'indicator_name' => $question->indicator_name,
                                'indicator_description' => $question->indicator_description,
                                'supporting_evidence' => $question->supporting_evidence,
                                'document_required' => (bool) $question->document_required,
                                'document_hint' => $question->document_hint,
                                'sort_order' => $question->sort_order,
                                'answer' => $answer ? [
                                    'id' => $answer->id,
                                    'selected_option_id' => $answer->pariwisata_suvey_option_id,
                                    'score' => (int) $answer->score,
                                    'notes' => $answer->notes,
                                    'documents' => $answer->documents
                                        ->map(fn (PariwisataSurveyAnswerDocument $document): array => $this->formatPariwisataDocument($document))
                                        ->values()
                                        ->all(),
                                ] : null,
                                'options' => $question->options
                                    ->map(fn (PariwisataSuveyOption $option): array => [
                                        'id' => $option->id,
                                        'score' => (int) $option->score,
                                        'level' => $option->level,
                                        'label' => $option->label,
                                        'description' => $option->description,
                                        'sort_order' => $option->sort_order,
                                    ])
                                    ->values()
                                    ->all(),
                            ];
                        })
                        ->all(),
                ];
            })
            ->values()
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    private function formatPariwisataDocument(PariwisataSurveyAnswerDocument $document): array
    {
        return [
            'id' => $document->id,
            'file_name' => $document->file_name,
            'file_url' => Storage::disk('public')->url($document->file_path),
            'mime_type' => $document->mime_type,
            'file_size' => $document->file_size,
            'file_size_label' => $this->formatFileSize($document->file_size),
            'uploaded_at' => $this->formatDate($document->created_at),
            'uploaded_by' => $this->formatUser($document->uploadedBy),
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function formatAssignmentActivities(VillageSurveyAssignment $assignment): array
    {
        $logs = collect($assignment->logs)
            ->map(fn ($log): array => [
                'date' => $this->formatDate($log->created_at),
                'title' => $log->description ?: Str::headline($log->action),
                'actor' => $log->actor?->name ?? '-',
                'type' => 'assignment',
            ]);

        $histories = collect($assignment->answerHistories)
            ->map(fn ($history): array => [
                'date' => $this->formatDate($history->created_at),
                'title' => trim(($history->question?->code ? "{$history->question->code} - " : '').Str::headline($history->action)),
                'actor' => $history->actor?->name ?? '-',
                'type' => 'answer',
            ]);

        return $logs
            ->merge($histories)
            ->sortByDesc('date')
            ->values()
            ->take(10)
            ->all();
    }

    /**
     * @return array<string, string|null>
     */
    private function formatUser(?User $user): array
    {
        return [
            'id' => $user?->id ? (string) $user->id : null,
            'name' => $user?->name ?? '-',
            'email' => $user?->email,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatDocument(SurveyAnswerDocument $document): array
    {
        return [
            'id' => $document->id,
            'file_name' => $document->file_name,
            'file_url' => Storage::disk('public')->url($document->file_path),
            'mime_type' => $document->mime_type,
            'file_size' => $document->file_size,
            'file_size_label' => $this->formatFileSize($document->file_size),
            'uploaded_at' => $this->formatDate($document->created_at),
            'uploaded_by' => $this->formatUser($document->uploadedBy),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatUmkmDocument(VillageUmkmDocument $document): array
    {
        return [
            'id' => $document->id,
            'document_name' => $document->document_name,
            'file_path' => $document->file_path,
            'file_url' => Storage::disk('public')->url($document->file_path),
            'mime_type' => $document->mime_type,
            'file_size' => $document->file_size,
            'file_size_label' => $this->formatFileSize($document->file_size),
            'uploaded_by' => $this->formatUser($document->uploadedBy),
            'created_at' => $this->formatDate($document->created_at),
            'updated_at' => $this->formatDate($document->updated_at),
        ];
    }

    private function mediaUrl(?string $filePath, ?string $externalUrl): ?string
    {
        if ($externalUrl) {
            return $externalUrl;
        }

        return $filePath ? Storage::disk('public')->url($filePath) : null;
    }

    private function formatFileSize(?int $bytes): string
    {
        if (! $bytes) {
            return '-';
        }

        if ($bytes < 1024 * 1024) {
            return round($bytes / 1024, 1).' KB';
        }

        return round($bytes / (1024 * 1024), 1).' MB';
    }

    private function formatCurrency(float $value): string
    {
        return 'Rp '.number_format($value, 0, ',', '.');
    }

    private function formatBoolean(?bool $value): string
    {
        return is_null($value) ? '-' : ($value ? 'Ya' : 'Tidak');
    }

    private function formatBooleanValue(?bool $value): string
    {
        return is_null($value) ? '' : ($value ? '1' : '0');
    }

    private function categoryLabel(?string $value): string
    {
        return [
            'wisata_alam' => 'Wisata Alam',
            'wisata_buatan' => 'Wisata Buatan',
            'wisata_religi' => 'Wisata Religi',
            'wisata_budaya' => 'Wisata Budaya',
            'wisata_kuliner' => 'Wisata Kuliner',
            'wisata_edukasi' => 'Wisata Edukasi',
        ][$value ?? ''] ?? Str::headline((string) $value);
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function pariwisataCategoryOptions(): array
    {
        return collect([
            'wisata_alam',
            'wisata_buatan',
            'wisata_religi',
            'wisata_budaya',
            'wisata_kuliner',
            'wisata_edukasi',
        ])->map(fn (string $value): array => [
            'value' => $value,
            'label' => $this->categoryLabel($value),
        ])->all();
    }

    /**
     * @return array<string, mixed>
     */
    private function formatPariwisataEditValues(PariwisataVillage $pariwisata): array
    {
        return [
            'name' => (string) ($pariwisata->name ?? ''),
            'categories' => $pariwisata->categories->pluck('category')->values()->all(),
            'operational_days' => (string) ($pariwisata->operational_days ?? ''),
            'operational_hours' => (string) ($pariwisata->operational_hours ?? ''),
            'operational_schedule_notes' => (string) data_get($pariwisata->operational_schedule, 'notes', ''),
            'entrance_ticket_price' => $pariwisata->entrance_ticket_price ? (string) $pariwisata->entrance_ticket_price : '',
            'entrance_ticket_description' => (string) ($pariwisata->entrance_ticket_description ?? ''),
            'address' => (string) ($pariwisata->address ?? ''),
            'person_in_charge_name' => (string) ($pariwisata->person_in_charge_name ?? ''),
            'person_in_charge_phone' => (string) ($pariwisata->person_in_charge_phone ?? ''),
            'person_in_charge_address' => (string) ($pariwisata->person_in_charge_address ?? ''),
            'is_active' => (bool) $pariwisata->is_active,
            'annual_turnovers' => $pariwisata->annualTurnovers->map(fn ($item) => [
                'year' => (string) $item->year,
                'value' => (string) round($item->value),
                'notes' => $item->notes ?? '',
            ])->values()->all(),
            'annual_visitors' => $pariwisata->annualVisitors->map(fn ($item) => [
                'year' => (string) $item->year,
                'value' => (string) $item->value,
                'notes' => $item->notes ?? '',
            ])->values()->all(),
            'visitor_type_annuals' => $pariwisata->visitorTypeAnnuals->map(fn ($item) => [
                'year' => (string) $item->year,
                'visitor_type' => $item->visitor_type,
                'value' => (string) $item->value,
                'notes' => $item->notes ?? '',
            ])->values()->all(),
            'packages' => $pariwisata->packages->map(fn ($item) => [
                'name' => $item->name,
                'package_type' => $item->package_type ?? '',
                'duration' => $item->duration ?? '',
                'facilities' => $item->facilities ?? '',
                'description' => $item->description ?? '',
                'price' => $item->price ? (string) round($item->price) : '',
                'is_active' => $item->is_active,
            ])->values()->all(),
            'annual_worker_stats' => $pariwisata->annualWorkerStats->map(fn ($item) => [
                'year' => (string) $item->year,
                'dimension' => $item->dimension,
                'category_value' => $item->category_value,
                'total_people' => (string) $item->total_people,
                'notes' => $item->notes ?? '',
            ])->values()->all(),
            'annual_worker_training_stats' => $pariwisata->annualWorkerTrainingStats->map(fn ($item) => [
                'year' => (string) $item->year,
                'training_name' => $item->training_name ?? '',
                'total_people' => (string) $item->total_people,
                'notes' => $item->notes ?? '',
            ])->values()->all(),
        ];
    }

    /**
     * @param  array<int, array<string, string>>  $options
     */
    private function labelFor(?string $value, array $options): string
    {
        return collect($options)->firstWhere('value', $value)['label'] ?? Str::headline((string) $value);
    }

    private function formatDate(?CarbonInterface $date): string
    {
        return $date?->translatedFormat('d M Y H:i') ?? '-';
    }

    private function formatDateTimeLocal(?CarbonInterface $date): string
    {
        return $date?->format('Y-m-d\TH:i') ?? '';
    }
}
