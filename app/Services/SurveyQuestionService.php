<?php

namespace App\Services;

use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataSuveyOption;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use App\Models\UmkmSurveyQuestion;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class SurveyQuestionService
{
    /**
     * @return array<string, mixed>
     */
    public function getTemplateIndexData(): array
    {
        $templates = SurveyTemplate::query()
            ->with(['creator:id,name'])
            ->withCount(['assignments'])
            ->latest('updated_at')
            ->get()
            ->map(fn (SurveyTemplate $template): array => $this->formatTemplate($template))
            ->values()
            ->all();

        return [
            'templates' => $templates,
            'summary' => [
                'total_templates' => count($templates),
                'published_templates' => collect($templates)->where('status', 'published')->count(),
                'draft_templates' => collect($templates)->where('status', 'draft')->count(),
                'total_questions' => collect($templates)->sum('questions_count'),
            ],
        ];
    }

    /**
     * @param  array{search?: string|null, aspect?: string|null, per_page?: int|null}  $filters
     * @return array<string, mixed>
     */
    public function getIndexData(SurveyTemplate $template, array $filters): array
    {
        $template->loadMissing('creator:id,name')->loadCount(['assignments']);

        return [
            'template' => $this->formatTemplate($template),
            'aspects' => $this->aspects($template),
            'questions' => $this->questions($template, $filters),
            'filters' => [
                'search' => $filters['search'] ?? '',
                'aspect' => $filters['aspect'] ?? '',
                'per_page' => $filters['per_page'] ?? 10,
            ],
        ];
    }

    /**
     * @param  array{title: string, description?: string|null, status: string}  $data
     */
    public function updateTemplate(SurveyTemplate $template, array $data): SurveyTemplate
    {
        $template->update([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
            'published_at' => $data['status'] === 'published'
                ? ($template->published_at ?? now())
                : null,
        ]);

        return $template;
    }

    /**
     * @param  array{survey_template_id: int, aspect: string, code?: string|null, question_text: string, document_hint?: string|null, sort_order?: int|null, options: array<int, string>}  $data
     */
    public function createQuestion(array $data): SurveyQuestion
    {
        return DB::transaction(function () use ($data): SurveyQuestion {
            $sortOrder = $data['sort_order'] ?? $this->nextSortOrder($data['survey_template_id']);

            $question = SurveyQuestion::query()->create([
                'survey_template_id' => $data['survey_template_id'],
                'aspect' => $data['aspect'],
                'code' => $data['code'] ?? null,
                'question_text' => $data['question_text'],
                'document_hint' => $data['document_hint'] ?? null,
                'sort_order' => $sortOrder,
            ]);

            $this->syncOptions($question, $data['options']);

            return $question;
        });
    }

    /**
     * @param  array{aspect: string, code?: string|null, question_text: string, document_hint?: string|null, sort_order?: int|null, options: array<int, string>}  $data
     */
    public function updateQuestion(SurveyQuestion $question, array $data): SurveyQuestion
    {
        return DB::transaction(function () use ($question, $data): SurveyQuestion {
            $question->update([
                'aspect' => $data['aspect'],
                'code' => $data['code'] ?? null,
                'question_text' => $data['question_text'],
                'document_hint' => $data['document_hint'] ?? null,
                'sort_order' => $data['sort_order'] ?? $question->sort_order,
            ]);

            $this->syncOptions($question, $data['options']);

            return $question;
        });
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function updateUmkmQuestion(UmkmSurveyQuestion $question, array $data): UmkmSurveyQuestion
    {
        $question->update([
            'criteria_code' => $data['criteria_code'],
            'criteria_name' => $data['criteria_name'],
            'criteria_weight_percent' => $data['criteria_weight_percent'],
            'question_number' => $data['question_number'],
            'question_text' => $data['question_text'],
            'question_weight_percent' => $data['question_weight_percent'],
            'max_score' => $data['max_score'],
            'help_text' => $data['help_text'] ?? null,
            'sort_order' => $data['sort_order'] ?? $question->sort_order,
            'is_active' => (bool) ($data['is_active'] ?? false),
        ]);

        return $question;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function updatePariwisataQuestion(PariwisataSurveyQuestion $question, array $data): PariwisataSurveyQuestion
    {
        return DB::transaction(function () use ($question, $data): PariwisataSurveyQuestion {
            $question->update([
                'category_code' => $data['category_code'],
                'category_name' => $data['category_name'],
                'sub_category_code' => $data['sub_category_code'],
                'sub_category_name' => $data['sub_category_name'],
                'criteria_code' => $data['criteria_code'],
                'criteria_name' => $data['criteria_name'],
                'criteria_description' => $data['criteria_description'] ?? null,
                'indicator_code' => $data['indicator_code'],
                'indicator_name' => $data['indicator_name'],
                'indicator_description' => $data['indicator_description'] ?? null,
                'supporting_evidence' => $data['supporting_evidence'] ?? null,
                'input_type' => $data['input_type'],
                'document_required' => (bool) ($data['document_required'] ?? false),
                'document_hint' => $data['document_hint'] ?? null,
                'sort_order' => $data['sort_order'] ?? $question->sort_order,
                'is_active' => (bool) ($data['is_active'] ?? false),
            ]);

            $this->syncPariwisataOptions($question, $data['options']);

            return $question;
        });
    }

    /**
     * @return array<int, string>
     */
    private function aspects(?SurveyTemplate $template): array
    {
        if (! $template) {
            return [];
        }

        return match ($this->templateType($template)) {
            'umkm' => UmkmSurveyQuestion::query()
                ->whereBelongsTo($template, 'template')
                ->whereNotNull('criteria_name')
                ->distinct()
                ->orderBy('criteria_name')
                ->pluck('criteria_name')
                ->filter()
                ->values()
                ->all(),
            'pariwisata' => PariwisataSurveyQuestion::query()
                ->whereBelongsTo($template, 'template')
                ->get(['category_name', 'sub_category_name', 'criteria_name'])
                ->map(fn (PariwisataSurveyQuestion $question): ?string => $this->pariwisataAspect($question))
                ->filter()
                ->unique()
                ->sort()
                ->values()
                ->all(),
            default => SurveyQuestion::query()
                ->whereBelongsTo($template, 'template')
                ->whereNotNull('aspect')
                ->distinct()
                ->orderBy('aspect')
                ->pluck('aspect')
                ->filter()
                ->values()
                ->all(),
        };
    }

    /**
     * @param  array{search?: string|null, aspect?: string|null, per_page?: int|null}  $filters
     */
    private function questions(SurveyTemplate $template, array $filters): LengthAwarePaginator
    {
        $perPage = min(max((int) ($filters['per_page'] ?? 10), 5), 50);

        return match ($this->templateType($template)) {
            'umkm' => $this->umkmQuestions($template, $filters, $perPage),
            'pariwisata' => $this->pariwisataQuestions($template, $filters, $perPage),
            default => $this->villageQuestions($template, $filters, $perPage),
        };
    }

    /**
     * @param  array{search?: string|null, aspect?: string|null, per_page?: int|null}  $filters
     */
    private function villageQuestions(SurveyTemplate $template, array $filters, int $perPage): LengthAwarePaginator
    {
        return SurveyQuestion::query()
            ->with(['options' => fn ($query) => $query->orderBy('sort_order')])
            ->withCount('options')
            ->whereBelongsTo($template, 'template')
            ->when($filters['search'] ?? null, function (Builder $query, string $search): void {
                $query->where(function (Builder $query) use ($search): void {
                    $query
                        ->where('code', 'like', "%{$search}%")
                        ->orWhere('question_text', 'like', "%{$search}%")
                        ->orWhere('document_hint', 'like', "%{$search}%")
                        ->orWhereHas('options', fn (Builder $query) => $query->where('label', 'like', "%{$search}%"));
                });
            })
            ->when($filters['aspect'] ?? null, fn (Builder $query, string $aspect) => $query->where('aspect', $aspect))
            ->orderBy('sort_order')
            ->orderBy('id')
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn (SurveyQuestion $question): array => [
                'id' => $question->id,
                'no' => $question->sort_order,
                'code' => $question->code,
                'question_text' => $question->question_text,
                'document_hint' => $question->document_hint,
                'aspect' => $question->aspect,
                'type' => 'Skor 1-4',
                'raw_type' => 'village',
                'required' => true,
                'options' => $question->options
                    ->map(fn (SurveyQuestionOption $option): array => [
                        'id' => $option->id,
                        'score' => (int) $option->score,
                        'label' => $option->label,
                        'description' => null,
                    ])
                    ->values()
                    ->all(),
                'options_count' => $question->options_count,
                'description' => null,
                'supporting_evidence' => null,
                'weight_label' => null,
                'max_score_label' => '4',
                'updated_at' => $question->updated_at?->diffForHumans(),
                'updated_date' => $question->updated_at?->format('d/m/Y'),
                'editable' => [
                    'aspect' => $question->aspect,
                    'code' => $question->code,
                    'question_text' => $question->question_text,
                    'document_hint' => $question->document_hint,
                    'sort_order' => $question->sort_order,
                    'options' => $question->options
                        ->map(fn (SurveyQuestionOption $option): array => [
                            'id' => $option->id,
                            'score' => (int) $option->score,
                            'label' => $option->label,
                        ])
                        ->values()
                        ->all(),
                ],
            ]);
    }

    /**
     * @param  array{search?: string|null, aspect?: string|null, per_page?: int|null}  $filters
     */
    private function umkmQuestions(SurveyTemplate $template, array $filters, int $perPage): LengthAwarePaginator
    {
        return UmkmSurveyQuestion::query()
            ->whereBelongsTo($template, 'template')
            ->when($filters['search'] ?? null, function (Builder $query, string $search): void {
                $query->where(function (Builder $query) use ($search): void {
                    $query
                        ->where('criteria_code', 'like', "%{$search}%")
                        ->orWhere('criteria_name', 'like', "%{$search}%")
                        ->orWhere('question_text', 'like', "%{$search}%")
                        ->orWhere('help_text', 'like', "%{$search}%");
                });
            })
            ->when($filters['aspect'] ?? null, fn (Builder $query, string $aspect) => $query->where('criteria_name', $aspect))
            ->orderBy('sort_order')
            ->orderBy('criteria_code')
            ->orderBy('question_number')
            ->orderBy('id')
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn (UmkmSurveyQuestion $question): array => [
                'id' => $question->id,
                'no' => $question->question_number ?: $question->sort_order,
                'code' => trim(implode('.', array_filter([$question->criteria_code, $question->question_number]))),
                'question_text' => $question->question_text,
                'document_hint' => $question->help_text,
                'aspect' => $question->criteria_name ?? '-',
                'type' => 'Skor 0-100',
                'raw_type' => 'umkm',
                'required' => true,
                'options' => [],
                'options_count' => 0,
                'description' => $this->percentLabel($question->criteria_weight_percent, 'bobot kriteria'),
                'supporting_evidence' => null,
                'weight_label' => $this->percentLabel($question->question_weight_percent),
                'max_score_label' => $this->numberLabel($question->max_score),
                'updated_at' => $question->updated_at?->diffForHumans(),
                'updated_date' => $question->updated_at?->format('d/m/Y'),
                'editable' => [
                    'criteria_code' => $question->criteria_code,
                    'criteria_name' => $question->criteria_name,
                    'criteria_weight_percent' => $question->criteria_weight_percent,
                    'question_number' => $question->question_number,
                    'question_text' => $question->question_text,
                    'question_weight_percent' => $question->question_weight_percent,
                    'max_score' => $question->max_score,
                    'help_text' => $question->help_text,
                    'sort_order' => $question->sort_order,
                    'is_active' => (bool) $question->is_active,
                ],
            ]);
    }

    /**
     * @param  array{search?: string|null, aspect?: string|null, per_page?: int|null}  $filters
     */
    private function pariwisataQuestions(SurveyTemplate $template, array $filters, int $perPage): LengthAwarePaginator
    {
        return PariwisataSurveyQuestion::query()
            ->with(['options' => fn ($query) => $query->orderBy('sort_order')])
            ->whereBelongsTo($template, 'template')
            ->when($filters['search'] ?? null, function (Builder $query, string $search): void {
                $query->where(function (Builder $query) use ($search): void {
                    $query
                        ->where('category_code', 'like', "%{$search}%")
                        ->orWhere('category_name', 'like', "%{$search}%")
                        ->orWhere('sub_category_code', 'like', "%{$search}%")
                        ->orWhere('sub_category_name', 'like', "%{$search}%")
                        ->orWhere('criteria_code', 'like', "%{$search}%")
                        ->orWhere('criteria_name', 'like', "%{$search}%")
                        ->orWhere('indicator_code', 'like', "%{$search}%")
                        ->orWhere('indicator_name', 'like', "%{$search}%")
                        ->orWhere('indicator_description', 'like', "%{$search}%")
                        ->orWhere('supporting_evidence', 'like', "%{$search}%")
                        ->orWhere('document_hint', 'like', "%{$search}%")
                        ->orWhereHas('options', function (Builder $query) use ($search): void {
                            $query
                                ->where('label', 'like', "%{$search}%")
                                ->orWhere('description', 'like', "%{$search}%");
                        });
                });
            })
            ->when($filters['aspect'] ?? null, function (Builder $query, string $aspect): void {
                $query->where(function (Builder $query) use ($aspect): void {
                    $query
                        ->where('category_name', $aspect)
                        ->orWhere('sub_category_name', $aspect)
                        ->orWhere('criteria_name', $aspect);
                });
            })
            ->orderBy('sort_order')
            ->orderBy('category_code')
            ->orderBy('sub_category_code')
            ->orderBy('criteria_code')
            ->orderBy('indicator_code')
            ->orderBy('id')
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn (PariwisataSurveyQuestion $question): array => [
                'id' => $question->id,
                'no' => $question->sort_order,
                'code' => $question->indicator_code,
                'question_text' => $question->indicator_name,
                'document_hint' => $question->document_hint ?: $question->supporting_evidence,
                'aspect' => $this->pariwisataAspect($question) ?? '-',
                'type' => $question->input_type ?? 'Pilihan skor',
                'raw_type' => 'pariwisata',
                'required' => (bool) $question->document_required,
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
                'options_count' => $question->options->count(),
                'description' => $question->indicator_description,
                'supporting_evidence' => $question->supporting_evidence,
                'weight_label' => null,
                'max_score_label' => $question->options->max('score') ? (string) $question->options->max('score') : null,
                'updated_at' => $question->updated_at?->diffForHumans(),
                'updated_date' => $question->updated_at?->format('d/m/Y'),
                'editable' => [
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
                    'input_type' => $question->input_type,
                    'document_required' => (bool) $question->document_required,
                    'document_hint' => $question->document_hint,
                    'sort_order' => $question->sort_order,
                    'is_active' => (bool) $question->is_active,
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
                ],
            ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function formatTemplate(SurveyTemplate $template): array
    {
        $type = $this->templateType($template);

        return [
            'id' => $template->id,
            'title' => $template->title,
            'description' => $template->description,
            'type' => $type,
            'type_label' => $this->typeLabel($type),
            'status' => $template->status,
            'created_by' => $template->creator?->name ?? '-',
            'published_at' => $template->published_at?->format('d M Y'),
            'updated_at' => $template->updated_at?->diffForHumans(),
            'questions_count' => $this->questionCount($template, $type),
            'aspects_count' => count($this->aspects($template)),
            'assignments_count' => $template->assignments_count,
        ];
    }

    private function templateType(SurveyTemplate $template): string
    {
        return in_array($template->type, ['village', 'umkm', 'pariwisata'], true)
            ? $template->type
            : 'village';
    }

    private function typeLabel(string $type): string
    {
        return match ($type) {
            'umkm' => 'UMKM',
            'pariwisata' => 'Pariwisata',
            default => 'Desa',
        };
    }

    private function questionCount(SurveyTemplate $template, string $type): int
    {
        return match ($type) {
            'umkm' => UmkmSurveyQuestion::query()->whereBelongsTo($template, 'template')->count(),
            'pariwisata' => PariwisataSurveyQuestion::query()->whereBelongsTo($template, 'template')->count(),
            default => SurveyQuestion::query()->whereBelongsTo($template, 'template')->count(),
        };
    }

    private function pariwisataAspect(PariwisataSurveyQuestion $question): ?string
    {
        return $question->category_name ?: $question->sub_category_name ?: $question->criteria_name;
    }

    private function percentLabel(mixed $value, ?string $suffix = null): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        $label = rtrim(rtrim(number_format((float) $value, 2, ',', '.'), '0'), ',').'%';

        return $suffix ? "{$label} {$suffix}" : $label;
    }

    private function numberLabel(mixed $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        return rtrim(rtrim(number_format((float) $value, 2, ',', '.'), '0'), ',');
    }

    private function nextSortOrder(int $templateId): int
    {
        return ((int) SurveyQuestion::query()
            ->where('survey_template_id', $templateId)
            ->max('sort_order')) + 1;
    }

    /**
     * @param  array<int, string>  $options
     */
    private function syncOptions(SurveyQuestion $question, array $options): void
    {
        $question->options()->withTrashed()->forceDelete();

        foreach (array_values($options) as $index => $label) {
            $question->options()->create([
                'score' => $index + 1,
                'label' => $label,
                'sort_order' => $index + 1,
            ]);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $options
     */
    private function syncPariwisataOptions(PariwisataSurveyQuestion $question, array $options): void
    {
        $keptIds = [];

        foreach (array_values($options) as $index => $optionData) {
            $score = (int) $optionData['score'];
            $option = PariwisataSuveyOption::withTrashed()
                ->where('pariwisata_survey_question_id', $question->id)
                ->when(
                    $optionData['id'] ?? null,
                    fn (Builder $query, mixed $id) => $query->where('id', $id),
                    fn (Builder $query) => $query->where('score', $score),
                )
                ->first();

            if (! $option) {
                $option = new PariwisataSuveyOption([
                    'pariwisata_survey_question_id' => $question->id,
                ]);
            }

            if ($option->trashed()) {
                $option->restore();
            }

            $option->fill([
                'pariwisata_survey_question_id' => $question->id,
                'score' => $score,
                'level' => $optionData['level'],
                'label' => $optionData['label'],
                'description' => $optionData['description'],
                'sort_order' => $optionData['sort_order'] ?? ($index + 1),
            ])->save();

            $keptIds[] = $option->id;
        }

        PariwisataSuveyOption::query()
            ->where('pariwisata_survey_question_id', $question->id)
            ->whereNotIn('id', $keptIds)
            ->delete();
    }
}
