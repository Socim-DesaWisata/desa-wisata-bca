<?php

namespace App\Services;

use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class SurveyQuestionService
{
    /**
     * @param  array{template_id?: int|null, search?: string|null, aspect?: string|null, per_page?: int|null}  $filters
     * @return array<string, mixed>
     */
    public function getIndexData(array $filters): array
    {
        $template = $this->resolveTemplate($filters['template_id'] ?? null);

        return [
            'template' => $template ? $this->formatTemplate($template) : null,
            'templates' => $this->templates(),
            'aspects' => $this->aspects($template),
            'questions' => $this->questions($template, $filters),
            'filters' => [
                'template_id' => $template?->id,
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

    private function resolveTemplate(?int $templateId): ?SurveyTemplate
    {
        $query = SurveyTemplate::query()
            ->with(['creator:id,name'])
            ->withCount(['questions', 'assignments']);

        if ($templateId) {
            return $query->find($templateId);
        }

        return $query
            ->whereHas('questions')
            ->latest('published_at')
            ->latest('id')
            ->first();
    }

    /**
     * @return array<int, array{id: int, title: string}>
     */
    private function templates(): array
    {
        return SurveyTemplate::query()
            ->whereHas('questions')
            ->orderBy('title')
            ->get(['id', 'title'])
            ->map(fn (SurveyTemplate $template): array => [
                'id' => $template->id,
                'title' => $template->title,
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<int, string>
     */
    private function aspects(?SurveyTemplate $template): array
    {
        if (! $template) {
            return [];
        }

        return SurveyQuestion::query()
            ->whereBelongsTo($template, 'template')
            ->distinct()
            ->orderBy('aspect')
            ->pluck('aspect')
            ->all();
    }

    /**
     * @param  array{search?: string|null, aspect?: string|null, per_page?: int|null}  $filters
     */
    private function questions(?SurveyTemplate $template, array $filters): LengthAwarePaginator
    {
        $perPage = min(max((int) ($filters['per_page'] ?? 10), 5), 50);

        return SurveyQuestion::query()
            ->with(['options' => fn ($query) => $query->orderBy('sort_order')])
            ->withCount('options')
            ->when($template, fn (Builder $query) => $query->whereBelongsTo($template, 'template'))
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
                'required' => true,
                'options' => $question->options
                    ->map(fn (SurveyQuestionOption $option): array => [
                        'id' => $option->id,
                        'score' => (int) $option->score,
                        'label' => $option->label,
                    ])
                    ->values()
                    ->all(),
                'options_count' => $question->options_count,
                'updated_at' => $question->updated_at?->diffForHumans(),
                'updated_date' => $question->updated_at?->format('d/m/Y'),
            ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function formatTemplate(SurveyTemplate $template): array
    {
        $aspectCount = SurveyQuestion::query()
            ->whereBelongsTo($template, 'template')
            ->distinct()
            ->count('aspect');

        return [
            'id' => $template->id,
            'title' => $template->title,
            'description' => $template->description,
            'status' => $template->status,
            'created_by' => $template->creator?->name ?? '-',
            'published_at' => $template->published_at?->format('d M Y'),
            'updated_at' => $template->updated_at?->diffForHumans(),
            'questions_count' => $template->questions_count,
            'aspects_count' => $aspectCount,
            'assignments_count' => $template->assignments_count,
        ];
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
}
