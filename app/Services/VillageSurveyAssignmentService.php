<?php

namespace App\Services;

use App\Models\SurveyQuestion;
use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use Carbon\CarbonInterface;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class VillageSurveyAssignmentService
{
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
            'per_page' => (int) Arr::get($filters, 'per_page', 10),
        ];

        $paginator = VillageSurveyAssignment::query()
            ->select([
                'id',
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
            ])
            ->with([
                'village:id,code,name,city,province',
                'template:id,title,status',
                'assignedBy:id,name,email',
                'submittedBy:id,name,email',
                'reviewedBy:id,name,email',
            ])
            ->withCount(['answers', 'documents'])
            ->when($normalizedFilters['search'] !== '', function ($query) use ($normalizedFilters): void {
                $search = $normalizedFilters['search'];

                $query->where(function ($query) use ($search): void {
                    $query
                        ->where('id', $search)
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
    public function create(array $data): VillageSurveyAssignment
    {
        return VillageSurveyAssignment::query()->create($data);
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
            'assignedBy:id,name,email',
        ]);

        $questions = $assignment->template?->questions ?? collect();
        $aspects = $this->formatSurveyAspects($questions);

        return [
            'assignment' => [
                'id' => $assignment->id,
                'code' => 'ASG-'.str_pad((string) $assignment->id, 3, '0', STR_PAD_LEFT),
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
            'answers_count' => $assignment->answers_count,
            'documents_count' => $assignment->documents_count,
        ];
    }

    /**
     * @param  Collection<int, SurveyQuestion>  $questions
     * @return array<int, array<string, mixed>>
     */
    private function formatSurveyAspects(Collection $questions): array
    {
        return $questions
            ->groupBy('aspect')
            ->map(fn (Collection $aspectQuestions, string $aspect): array => [
                'name' => $aspect,
                'questions' => $aspectQuestions
                    ->values()
                    ->map(fn ($question): array => [
                        'id' => $question->id,
                        'code' => $question->code,
                        'question_text' => $question->question_text,
                        'document_hint' => $question->document_hint,
                        'sort_order' => $question->sort_order,
                        'options' => $question->options
                            ->map(fn ($option): array => [
                                'id' => $option->id,
                                'score' => (int) $option->score,
                                'label' => $option->label,
                                'sort_order' => $option->sort_order,
                            ])
                            ->values()
                            ->all(),
                    ])
                    ->all(),
            ])
            ->values()
            ->all();
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
}
