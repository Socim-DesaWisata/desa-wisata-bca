<?php

namespace App\Services;

use App\Models\AnnualTurnover;
use App\Models\AnnualWorkerStat;
use App\Models\AnnualWorkerTrainingStat;
use App\Models\PariwisataAnnualVisitor;
use App\Models\PariwisataPackage;
use App\Models\PariwisataSurveyAnswer;
use App\Models\PariwisataSurveyAnswerDocument;
use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataVillage;
use App\Models\PariwisataVillageCategory;
use App\Models\PariwisataVisitorTypeAnnual;
use App\Models\SurveyTemplate;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PariwisataService
{
    /**
     * @param  array<string, mixed>  $filters
     * @return array<string, mixed>
     */
    public function getIndexData(array $filters): array
    {
        $perPage = (int) Arr::get($filters, 'per_page', 10);

        if (! in_array($perPage, [5, 10, 15, 25, 50], true)) {
            $perPage = 10;
        }

        $normalizedFilters = [
            'search' => trim((string) Arr::get($filters, 'search', '')),
            'category' => Arr::get($filters, 'category'),
            'is_active' => Arr::get($filters, 'is_active'),
            'view' => Arr::get($filters, 'view', 'active') === 'trash' ? 'trash' : 'active',
            'per_page' => $perPage,
        ];

        $query = PariwisataVillage::query()
            ->select([
                'id',
                'village_id',
                'name',
                'operational_days',
                'operational_hours',
                'entrance_ticket_price',
                'entrance_ticket_description',
                'address',
                'person_in_charge_name',
                'person_in_charge_phone',
                'is_active',
                'updated_at',
                'deleted_at',
            ])
            ->with([
                'village:id,code,name,city,province',
                'village.surveyAssignment:id,code,village_id',
                'categories:id,pariwisata_village_id,category',
                'surveyAnswers:id,pariwisata_village_id,pariwisata_survey_question_id,score',
            ])
            ->withCount('surveyAnswers');

        if ($normalizedFilters['view'] === 'trash') {
            $query->onlyTrashed();
        }

        $paginator = $query
            ->when($normalizedFilters['search'] !== '', function (Builder $query) use ($normalizedFilters): void {
                $search = $normalizedFilters['search'];

                $query->where(function (Builder $query) use ($search): void {
                    $query
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%")
                        ->orWhere('person_in_charge_name', 'like', "%{$search}%")
                        ->orWhereHas('village', function (Builder $query) use ($search): void {
                            $query
                                ->where('name', 'like', "%{$search}%")
                                ->orWhere('code', 'like', "%{$search}%");
                        });
                });
            })
            ->when($normalizedFilters['category'], fn (Builder $query, string $category) => $query->whereHas('categories', fn (Builder $query) => $query->where('category', $category)))
            ->when($normalizedFilters['is_active'] !== null, fn (Builder $query) => $query->where('is_active', $normalizedFilters['is_active'] === '1'))
            ->latest('updated_at')
            ->paginate($normalizedFilters['per_page'])
            ->withQueryString();

        $paginator->through(fn (PariwisataVillage $pariwisata): array => $this->formatPariwisata($pariwisata));

        return [
            'stats' => $this->getStats(),
            'pariwisata' => $paginator,
            'filters' => $normalizedFilters,
            'category_options' => $this->categoryOptions(),
            'status_options' => $this->statusOptions(),
            'per_page_options' => [5, 10, 15, 25, 50],
        ];
    }

    public function delete(PariwisataVillage $pariwisata): void
    {
        DB::transaction(function () use ($pariwisata): void {
            $answerIds = $pariwisata->surveyAnswers()->pluck('id');

            PariwisataSurveyAnswerDocument::query()
                ->whereIn('pariwisata_survey_answer_id', $answerIds)
                ->delete();

            $pariwisata->categories()->delete();
            $pariwisata->surveyAnswers()->delete();
            $pariwisata->annualTurnovers()->delete();
            $pariwisata->annualVisitors()->delete();
            $pariwisata->visitorTypeAnnuals()->delete();
            $pariwisata->packages()->delete();
            $pariwisata->annualWorkerStats()->delete();
            $pariwisata->annualWorkerTrainingStats()->delete();
            $pariwisata->delete();
        });
    }

    public function restore(int $pariwisataId): void
    {
        $pariwisata = PariwisataVillage::withTrashed()->findOrFail($pariwisataId);

        if (! $pariwisata->trashed()) {
            throw ValidationException::withMessages([
                'pariwisata' => 'Data pariwisata tidak berada di trash.',
            ]);
        }

        DB::transaction(function () use ($pariwisata): void {
            $pariwisata->restore();
            PariwisataVillageCategory::withTrashed()->where('pariwisata_village_id', $pariwisata->id)->restore();
            PariwisataSurveyAnswer::withTrashed()->where('pariwisata_village_id', $pariwisata->id)->restore();

            $answerIds = PariwisataSurveyAnswer::withTrashed()
                ->where('pariwisata_village_id', $pariwisata->id)
                ->pluck('id');

            PariwisataSurveyAnswerDocument::withTrashed()
                ->whereIn('pariwisata_survey_answer_id', $answerIds)
                ->restore();

            AnnualTurnover::withTrashed()->where('pariwisata_id', $pariwisata->id)->restore();
            PariwisataAnnualVisitor::withTrashed()->where('pariwisata_id', $pariwisata->id)->restore();
            PariwisataVisitorTypeAnnual::withTrashed()->where('pariwisata_id', $pariwisata->id)->restore();
            PariwisataPackage::withTrashed()->where('pariwisata_id', $pariwisata->id)->restore();
            AnnualWorkerStat::withTrashed()->where('pariwisata_id', $pariwisata->id)->restore();
            AnnualWorkerTrainingStat::withTrashed()->where('pariwisata_id', $pariwisata->id)->restore();
        });
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function getStats(): array
    {
        return [
            [
                'label' => 'Total Pariwisata',
                'value' => (string) PariwisataVillage::query()->count(),
                'description' => 'Seluruh destinasi pariwisata',
                'icon' => 'map',
            ],
            [
                'label' => 'Aktif',
                'value' => (string) PariwisataVillage::query()->where('is_active', true)->count(),
                'description' => 'Destinasi aktif dikunjungi',
                'icon' => 'check',
            ],
            [
                'label' => 'Kategori',
                'value' => (string) PariwisataVillageCategory::query()->whereNotNull('category')->distinct('category')->count('category'),
                'description' => 'Kategori wisata unik',
                'icon' => 'tag',
            ],
            [
                'label' => 'Jawaban Assessment',
                'value' => (string) PariwisataVillage::query()->withCount('surveyAnswers')->get()->sum('survey_answers_count'),
                'description' => 'Total jawaban survey pariwisata',
                'icon' => 'clipboard',
            ],
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function categoryOptions(): array
    {
        return PariwisataVillageCategory::query()
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->distinct()
            ->orderBy('category')
            ->pluck('category')
            ->map(fn (string $category): array => [
                'value' => $category,
                'label' => $category,
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function statusOptions(): array
    {
        return [
            ['value' => '1', 'label' => 'Aktif'],
            ['value' => '0', 'label' => 'Nonaktif'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatPariwisata(PariwisataVillage $pariwisata): array
    {
        return [
            'id' => $pariwisata->id,
            'name' => $pariwisata->name,
            'categories' => $pariwisata->categories->pluck('category')->filter()->values()->all(),
            'total_score' => $this->pariwisataFinalScore($pariwisata),
            'operational_days' => $pariwisata->operational_days ?: '-',
            'operational_hours' => $pariwisata->operational_hours ?: '-',
            'ticket_price' => $this->formatCurrency($pariwisata->entrance_ticket_price),
            'ticket_description' => $pariwisata->entrance_ticket_description ?: '-',
            'address' => $pariwisata->address ?: '-',
            'person_in_charge_name' => $pariwisata->person_in_charge_name ?: '-',
            'person_in_charge_phone' => $pariwisata->person_in_charge_phone ?: '-',
            'is_active' => (bool) $pariwisata->is_active,
            'status_label' => $pariwisata->is_active ? 'Aktif' : 'Nonaktif',
            'village_name' => $pariwisata->village?->name ?? '-',
            'village_code' => $pariwisata->village?->code ?? '-',
            'village_location' => collect([$pariwisata->village?->city, $pariwisata->village?->province])->filter()->implode(', ') ?: '-',
            'survey_answers_count' => $pariwisata->survey_answers_count,
            'updated_at' => $this->formatDate($pariwisata->updated_at),
            'is_trashed' => $pariwisata->trashed(),
            'detail_url' => $pariwisata->trashed()
                ? null
                : ($pariwisata->village?->surveyAssignment
                    ? route('survey-assignments.pariwisata.show', [$pariwisata->village->surveyAssignment, $pariwisata])
                    : null),
        ];
    }

    private function pariwisataFinalScore(PariwisataVillage $pariwisata): float
    {
        $questions = $this->pariwisataQuestionsForSummary();
        $totalScore = $pariwisata->surveyAnswers->sum(fn (PariwisataSurveyAnswer $answer): int => (int) $answer->score);
        $maxScore = $questions->sum(fn (PariwisataSurveyQuestion $question): int => (int) $question->options->max('score'));

        return $maxScore > 0 ? round(($totalScore / $maxScore) * 100, 1) : 0.0;
    }

    /**
     * @return Collection<int, PariwisataSurveyQuestion>
     */
    private function pariwisataQuestionsForSummary(): Collection
    {
        return once(fn (): Collection => SurveyTemplate::query()
            ->select(['id', 'title', 'description', 'status', 'published_at'])
            ->where('title', 'Matrix Sertifikasi Desa Wisata Berkelanjutan - Pariwisata')
            ->where('status', 'published')
            ->with([
                'pariwisataSurveyQuestions' => fn ($query) => $query
                    ->select(['id', 'survey_template_id'])
                    ->where('is_active', true)
                    ->orderBy('sort_order'),
                'pariwisataSurveyQuestions.options' => fn ($query) => $query
                    ->select(['id', 'pariwisata_survey_question_id', 'score'])
                    ->orderBy('sort_order'),
            ])
            ->latest('published_at')
            ->latest('id')
            ->first()?->pariwisataSurveyQuestions ?? collect());
    }

    private function formatCurrency(mixed $value): string
    {
        if ($value === null || $value === '') {
            return '-';
        }

        return 'Rp '.number_format((float) $value, 0, ',', '.');
    }

    private function formatDate(?CarbonInterface $date): string
    {
        return $date?->translatedFormat('d M Y') ?? '-';
    }
}
