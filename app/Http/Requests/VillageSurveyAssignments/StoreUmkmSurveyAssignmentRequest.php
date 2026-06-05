<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use App\Models\SurveyTemplate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreUmkmSurveyAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'business_owner_name' => ['nullable', 'string', 'max:150'],
            'name' => ['required', 'string', 'max:150'],
            'legal_business_name' => ['nullable', 'string', 'max:180'],
            'established_year' => ['nullable', 'integer', 'min:1800', 'max:'.now()->year],
            'company_website_url' => ['nullable', 'url', 'max:2048'],
            'production_address' => ['nullable', 'string'],
            'product_category' => ['nullable', 'string', 'max:150'],
            'brand_name' => ['nullable', 'string', 'max:150'],
            'annual_revenue' => ['nullable', 'numeric', 'min:0'],
            'monthly_production_capacity' => ['nullable', 'string', 'max:150'],
            'current_obstacles' => ['nullable', 'string'],
            'certifications' => ['nullable', 'string'],
            'has_business_legality_and_certification' => ['nullable', 'string', 'max:255'],
            'is_umkm_participant' => ['nullable', 'string', 'max:255'],
            'is_production_capacity_participant' => ['nullable', 'string', 'max:255'],
            'annual_production_capacity' => ['nullable', 'string', 'max:255'],
            'factory_location_feasibility' => ['nullable', 'string'],
            'instagram_url' => ['nullable', 'url', 'max:2048'],
            'facebook_url' => ['nullable', 'url', 'max:2048'],
            'twitter_url' => ['nullable', 'url', 'max:2048'],
            'marketing_website_url' => ['nullable', 'url', 'max:2048'],
            'ecommerce_profile_url' => ['nullable', 'url', 'max:2048'],
            'marketing_notes' => ['nullable', 'string'],
            'sustainability_notes' => ['nullable', 'string'],
            'bank_name' => ['nullable', 'string', 'max:150'],
            'bank_account_number' => ['nullable', 'string', 'max:100'],
            'has_qris' => ['nullable', 'boolean'],
            'qris_provider' => ['nullable', 'string', 'max:150'],
            'has_edc' => ['nullable', 'boolean'],
            'edc_provider' => ['nullable', 'string', 'max:150'],
            'has_credit_card' => ['nullable', 'boolean'],
            'banking_notes' => ['nullable', 'string'],
            'has_exported' => ['nullable', 'boolean'],
            'export_destination_countries' => ['nullable', 'string'],
            'product_photo' => ['nullable', 'image', 'max:5120'],
            'documents' => ['nullable', 'array', 'max:20'],
            'documents.*.document_name' => ['nullable', 'string', 'max:180'],
            'documents.*.file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,pdf', 'max:5120'],
            'answers' => ['required', 'array'],
            'answers.*.question_id' => [
                'required',
                'integer',
                Rule::exists('umkm_survey_questions', 'id')->whereNull('deleted_at'),
            ],
            'answers.*.score' => ['required', 'numeric', 'min:0', 'max:100'],
        ];
    }

    /**
     * @return array<int, callable(Validator): void>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                $template = SurveyTemplate::query()
                    ->where('title', 'Assessment Pelaku UMKM')
                    ->where('status', 'published')
                    ->with(['umkmSurveyQuestions' => fn ($query) => $query
                        ->select(['id', 'survey_template_id'])
                        ->where('is_active', true)
                        ->orderBy('sort_order')])
                    ->latest('published_at')
                    ->latest('id')
                    ->first();

                if (! $template || $template->umkmSurveyQuestions->isEmpty()) {
                    $validator->errors()->add('answers', 'Template assessment UMKM aktif belum tersedia.');

                    return;
                }

                $requiredIds = $template->umkmSurveyQuestions->pluck('id')->sort()->values();
                $submittedIds = collect($this->input('answers', []))
                    ->pluck('question_id')
                    ->filter()
                    ->map(fn (mixed $id): int => (int) $id)
                    ->sort()
                    ->values();

                if ($submittedIds->duplicates()->isNotEmpty()) {
                    $validator->errors()->add('answers', 'Pertanyaan assessment UMKM tidak boleh duplikat.');
                }

                if ($requiredIds->diff($submittedIds)->isNotEmpty() || $submittedIds->diff($requiredIds)->isNotEmpty()) {
                    $validator->errors()->add('answers', 'Semua pertanyaan assessment UMKM wajib diisi.');
                }

                foreach ($this->input('documents', []) as $index => $document) {
                    $hasName = filled($document['document_name'] ?? null);
                    $hasFile = $this->hasFile("documents.{$index}.file");

                    if ($hasName && ! $hasFile) {
                        $validator->errors()->add("documents.{$index}.file", 'File dokumen wajib diunggah.');
                    }

                    if (! $hasName && $hasFile) {
                        $validator->errors()->add("documents.{$index}.document_name", 'Nama dokumen wajib diisi.');
                    }
                }
            },
        ];
    }
}
