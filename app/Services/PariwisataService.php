<?php

namespace App\Services;

use App\Models\PariwisataVillage;
use App\Models\PariwisataVillageCategory;
use Carbon\CarbonInterface;
use Illuminate\Support\Arr;

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
            'per_page' => $perPage,
        ];

        $paginator = PariwisataVillage::query()
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
            ])
            ->with([
                'village:id,code,name,city,province',
                'village.surveyAssignment:id,code,village_id',
                'categories:id,pariwisata_village_id,category',
            ])
            ->withCount('surveyAnswers')
            ->when($normalizedFilters['search'] !== '', function ($query) use ($normalizedFilters): void {
                $search = $normalizedFilters['search'];

                $query->where(function ($query) use ($search): void {
                    $query
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%")
                        ->orWhere('person_in_charge_name', 'like', "%{$search}%")
                        ->orWhereHas('village', function ($query) use ($search): void {
                            $query
                                ->where('name', 'like', "%{$search}%")
                                ->orWhere('code', 'like', "%{$search}%");
                        });
                });
            })
            ->when($normalizedFilters['category'], fn ($query, string $category) => $query->whereHas('categories', fn ($query) => $query->where('category', $category)))
            ->when($normalizedFilters['is_active'] !== null, fn ($query) => $query->where('is_active', $normalizedFilters['is_active'] === '1'))
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
            'category_label' => $pariwisata->categories->pluck('category')->filter()->join(', ') ?: '-',
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
            'detail_url' => $pariwisata->village?->surveyAssignment
                ? route('survey-assignments.pariwisata.show', [$pariwisata->village->surveyAssignment, $pariwisata])
                : null,
        ];
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
