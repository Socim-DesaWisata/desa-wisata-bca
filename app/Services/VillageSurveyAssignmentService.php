<?php

namespace App\Services;

use App\Models\SurveyAnswer;
use App\Models\SurveyAnswerDocument;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use Carbon\CarbonInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
    public function getShowData(VillageSurveyAssignment $assignment): array
    {
        $assignment->load([
            'village:id,code,name,description,province,city,district,subdistrict,address,postal_code,latitude,longitude,maps_url,manager_name,manager_phone,manager_email,status',
            'village.media' => fn ($query) => $query
                ->select(['id', 'village_id', 'type', 'title', 'file_path', 'external_url', 'mime_type', 'file_size', 'is_cover', 'sort_order'])
                ->orderByDesc('is_cover')
                ->orderBy('sort_order')
                ->orderBy('id'),
            'template:id,title,description,status,published_at',
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
        $assignment->loadCount(['answers', 'documents']);

        $questions = $assignment->template?->questions ?? collect();
        $answersByQuestion = $assignment->answers->keyBy('survey_question_id');
        $aspects = $this->formatAssignmentDetailAspects($questions, $answersByQuestion);
        $summary = $this->buildAssignmentSummary($questions, $answersByQuestion, $aspects);
        $cover = $assignment->village?->media->first();

        return [
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
            'aspects' => $aspects,
            'activities' => $this->formatAssignmentActivities($assignment),
        ];
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
     * @param  array{answers: array<int, array<string, mixed>>}  $data
     */
    public function saveSurveyDraft(VillageSurveyAssignment $assignment, array $data, User $user): void
    {
        DB::transaction(function () use ($assignment, $data, $user): void {
            foreach ($data['answers'] as $answerData) {
                $option = SurveyQuestionOption::query()
                    ->with('question:id,aspect,question_text')
                    ->findOrFail($answerData['survey_question_option_id']);

                $answer = SurveyAnswer::query()->updateOrCreate(
                    [
                        'village_survey_assignment_id' => $assignment->id,
                        'survey_question_id' => $answerData['question_id'],
                    ],
                    [
                        'survey_question_option_id' => $option->id,
                        'score' => (int) $option->score,
                        'aspect_snapshot' => $option->question?->aspect,
                        'question_text_snapshot' => $option->question?->question_text,
                        'option_label_snapshot' => $option->label,
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
     * @param  Collection<int, SurveyAnswer>  $answersByQuestion
     * @return array<int, array<string, mixed>>
     */
    private function formatSurveyAspects(Collection $questions, Collection $answersByQuestion): array
    {
        return $questions
            ->groupBy('aspect')
            ->map(fn (Collection $aspectQuestions, string $aspect): array => [
                'name' => $aspect,
                'questions' => $aspectQuestions
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
                            'max_score' => $maxScore,
                            'answer' => $answer ? [
                                'id' => $answer->id,
                                'survey_question_option_id' => $answer->survey_question_option_id,
                                'score' => (int) $answer->score,
                                'score_label' => $answer->option_label_snapshot ?? $answer->option?->label ?? '-',
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

                return [
                    'name' => $aspect,
                    'question_count' => $questionRows->count(),
                    'answered_count' => $answeredCount,
                    'documents_count' => $documentsCount,
                    'score' => $score,
                    'max_score' => $maxScore,
                    'score_percent' => $percent,
                    'questions' => $questionRows->values()->all(),
                ];
            })
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
     * @return array<int, array<string, string>>
     */
    private function formatAssignmentActivities(VillageSurveyAssignment $assignment): array
    {
        $logs = $assignment->logs
            ->map(fn ($log): array => [
                'date' => $this->formatDate($log->created_at),
                'title' => $log->description ?: Str::headline($log->action),
                'actor' => $log->actor?->name ?? '-',
                'type' => 'assignment',
            ]);

        $histories = $assignment->answerHistories
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
