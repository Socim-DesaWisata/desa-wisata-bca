<?php

namespace App\Services;

use App\Models\AnnualTurnover;
use App\Models\AnnualWorkerStat;
use App\Models\AnnualWorkerTrainingStat;
use App\Models\UmkmSurveyAnswer;
use App\Models\VillageUmkm;
use App\Models\VillageUmkmCategory;
use App\Models\VillageUmkmDocument;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class UmkmService
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
            'product_category' => Arr::get($filters, 'product_category'),
            'has_exported' => Arr::get($filters, 'has_exported'),
            'view' => Arr::get($filters, 'view', 'active') === 'trash' ? 'trash' : 'active',
            'per_page' => $perPage,
        ];

        $query = VillageUmkm::query()
            ->select([
                'id',
                'village_id',
                'data_collector_id',
                'business_owner_name',
                'collector_name',
                'name',
                'legal_business_name',
                'product_category',
                'brand_name',
                'annual_revenue',
                'has_qris',
                'has_edc',
                'has_credit_card',
                'has_exported',
                'product_photo_path',
                'updated_at',
                'deleted_at',
            ])
            ->with([
                'village:id,code,name,city,province',
                'village.surveyAssignment:id,code,village_id',
                'dataCollector:id,name,email',
                'surveyAnswers:id,umkm_id,score,max_score_snapshot,question_weight_percent_snapshot',
            ])
            ->withCount(['documents', 'surveyAnswers']);

        if ($normalizedFilters['view'] === 'trash') {
            $query->onlyTrashed();
        }

        $paginator = $query
            ->when($normalizedFilters['search'] !== '', function (Builder $query) use ($normalizedFilters): void {
                $search = $normalizedFilters['search'];

                $query->where(function (Builder $query) use ($search): void {
                    $query
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('business_owner_name', 'like', "%{$search}%")
                        ->orWhere('brand_name', 'like', "%{$search}%")
                        ->orWhere('product_category', 'like', "%{$search}%")
                        ->orWhereHas('village', function (Builder $query) use ($search): void {
                            $query
                                ->where('name', 'like', "%{$search}%")
                                ->orWhere('code', 'like', "%{$search}%");
                        });
                });
            })
            ->when($normalizedFilters['product_category'], fn (Builder $query, string $category) => $query->where('product_category', $category))
            ->when($normalizedFilters['has_exported'] !== null, fn (Builder $query) => $query->where('has_exported', $normalizedFilters['has_exported'] === '1'))
            ->latest('updated_at')
            ->paginate($normalizedFilters['per_page'])
            ->withQueryString();

        $paginator->through(fn (VillageUmkm $umkm): array => $this->formatUmkm($umkm));

        return [
            'stats' => $this->getStats(),
            'umkms' => $paginator,
            'filters' => $normalizedFilters,
            'category_options' => $this->categoryOptions(),
            'export_options' => $this->exportOptions(),
            'per_page_options' => [5, 10, 15, 25, 50],
        ];
    }

    public function delete(VillageUmkm $umkm): void
    {
        DB::transaction(function () use ($umkm): void {
            $umkm->documents()->delete();
            $umkm->categories()->delete();
            $umkm->surveyAnswers()->delete();
            $umkm->annualTurnovers()->delete();
            $umkm->annualWorkerStats()->delete();
            $umkm->annualWorkerTrainingStats()->delete();
            $umkm->delete();
        });
    }

    public function restore(int $umkmId): void
    {
        $umkm = VillageUmkm::withTrashed()->findOrFail($umkmId);

        if (! $umkm->trashed()) {
            throw ValidationException::withMessages([
                'umkm' => 'Data UMKM tidak berada di trash.',
            ]);
        }

        DB::transaction(function () use ($umkm): void {
            $umkm->restore();
            VillageUmkmDocument::withTrashed()->where('village_umkm_id', $umkm->id)->restore();
            VillageUmkmCategory::withTrashed()->where('village_umkm_id', $umkm->id)->restore();
            UmkmSurveyAnswer::withTrashed()->where('umkm_id', $umkm->id)->restore();
            AnnualTurnover::withTrashed()->where('umkm_id', $umkm->id)->restore();
            AnnualWorkerStat::withTrashed()->where('umkm_id', $umkm->id)->restore();
            AnnualWorkerTrainingStat::withTrashed()->where('umkm_id', $umkm->id)->restore();
        });
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function getStats(): array
    {
        return [
            [
                'label' => 'Total UMKM',
                'value' => (string) VillageUmkm::query()->count(),
                'description' => 'Seluruh UMKM desa wisata',
                'icon' => 'store',
            ],
            [
                'label' => 'Kategori Produk',
                'value' => (string) VillageUmkm::query()->whereNotNull('product_category')->distinct('product_category')->count('product_category'),
                'description' => 'Ragam kategori produk',
                'icon' => 'tag',
            ],
            [
                'label' => 'Sudah Export',
                'value' => (string) VillageUmkm::query()->where('has_exported', true)->count(),
                'description' => 'UMKM dengan riwayat export',
                'icon' => 'send',
            ],
            [
                'label' => 'Digital Payment',
                'value' => (string) VillageUmkm::query()
                    ->where(fn (Builder $query) => $query->where('has_qris', true)->orWhere('has_edc', true)->orWhere('has_credit_card', true))
                    ->count(),
                'description' => 'Memiliki QRIS, EDC, atau kartu',
                'icon' => 'credit-card',
            ],
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function categoryOptions(): array
    {
        return VillageUmkm::query()
            ->whereNotNull('product_category')
            ->where('product_category', '!=', '')
            ->distinct()
            ->orderBy('product_category')
            ->pluck('product_category')
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
    private function exportOptions(): array
    {
        return [
            ['value' => '1', 'label' => 'Sudah Export'],
            ['value' => '0', 'label' => 'Belum Export'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatUmkm(VillageUmkm $umkm): array
    {
        $totalScore = $umkm->surveyAnswers->sum(function ($answer) {
            $score = (float) $answer->score;
            $maxScore = (float) ($answer->max_score_snapshot ?: 100);
            $weight = (float) ($answer->question_weight_percent_snapshot ?: 0);

            return $maxScore > 0 ? round(($score / $maxScore) * $weight, 4) : 0;
        });

        return [
            'id' => $umkm->id,
            'name' => $umkm->name,
            'legal_business_name' => $umkm->legal_business_name ?: '-',
            'business_owner_name' => $umkm->business_owner_name ?: '-',
            'brand_name' => $umkm->brand_name ?: '-',
            'product_category' => $umkm->product_category ?: '-',
            'total_score' => round($totalScore, 2),
            'has_qris' => (bool) $umkm->has_qris,
            'has_edc' => (bool) $umkm->has_edc,
            'has_credit_card' => (bool) $umkm->has_credit_card,
            'has_exported' => (bool) $umkm->has_exported,
            'export_label' => $umkm->has_exported ? 'Sudah Export' : 'Belum Export',
            'payment_label' => $this->paymentLabel($umkm),
            'photo_url' => $umkm->product_photo_path ? Storage::disk('public')->url($umkm->product_photo_path) : null,
            'village_name' => $umkm->village?->name ?? '-',
            'village_code' => $umkm->village?->code ?? '-',
            'village_location' => collect([$umkm->village?->city, $umkm->village?->province])->filter()->implode(', ') ?: '-',
            'collector_name' => $umkm->dataCollector?->name ?? $umkm->collector_name ?? '-',
            'documents_count' => $umkm->documents_count,
            'survey_answers_count' => $umkm->survey_answers_count,
            'updated_at' => $this->formatDate($umkm->updated_at),
            'is_trashed' => $umkm->trashed(),
            'detail_url' => $umkm->trashed()
                ? null
                : ($umkm->village?->surveyAssignment
                    ? route('survey-assignments.umkm.show', [$umkm->village->surveyAssignment, $umkm])
                    : null),
        ];
    }

    private function paymentLabel(VillageUmkm $umkm): string
    {
        $payments = collect([
            $umkm->has_qris ? 'QRIS' : null,
            $umkm->has_edc ? 'EDC' : null,
            $umkm->has_credit_card ? 'Kartu Kredit' : null,
        ])->filter();

        return $payments->isNotEmpty() ? $payments->join(', ') : '-';
    }

    private function formatDate(?CarbonInterface $date): string
    {
        return $date?->translatedFormat('d M Y') ?? '-';
    }
}
