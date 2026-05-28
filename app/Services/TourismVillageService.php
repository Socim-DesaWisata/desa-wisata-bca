<?php

namespace App\Services;

use App\Models\TourismVillage;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;
use Carbon\CarbonInterface;
use Illuminate\Support\Str;

class TourismVillageService
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
            'province' => Arr::get($filters, 'province'),
            'per_page' => (int) Arr::get($filters, 'per_page', 10),
        ];

        $paginator = TourismVillage::query()
            ->select([
                'id',
                'code',
                'name',
                'slug',
                'description',
                'province',
                'city',
                'district',
                'subdistrict',
                'address',
                'postal_code',
                'latitude',
                'longitude',
                'maps_url',
                'manager_name',
                'manager_phone',
                'manager_email',
                'status',
                'created_by',
                'created_at',
                'updated_at',
            ])
            ->with(['creator:id,name'])
            ->withCount(['enumeratorAssignments', 'media', 'profileItems'])
            ->when($normalizedFilters['search'] !== '', function ($query) use ($normalizedFilters): void {
                $search = $normalizedFilters['search'];

                $query->where(function ($query) use ($search): void {
                    $query
                        ->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%")
                        ->orWhere('province', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('manager_name', 'like', "%{$search}%");
                });
            })
            ->when($normalizedFilters['status'], fn ($query, string $status) => $query->where('status', $status))
            ->when($normalizedFilters['province'], fn ($query, string $province) => $query->where('province', $province))
            ->latest('updated_at')
            ->paginate($normalizedFilters['per_page'])
            ->withQueryString();

        $paginator->through(fn (TourismVillage $village): array => $this->formatVillage($village));

        return [
            'stats' => $this->getStats(),
            'villages' => $paginator,
            'filters' => $normalizedFilters,
            'status_options' => $this->statusOptions(),
            'province_options' => $this->provinceOptions(),
            'per_page_options' => [5, 10, 15, 25, 50],
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, User $creator): TourismVillage
    {
        return TourismVillage::query()->create([
            'code' => $data['code'],
            'name' => $data['name'],
            'slug' => $data['slug'],
            'description' => $data['description'] ?? null,
            'province' => $data['province'] ?? null,
            'city' => $data['city'] ?? null,
            'district' => $data['district'] ?? null,
            'subdistrict' => $data['subdistrict'] ?? null,
            'address' => $data['address'] ?? null,
            'postal_code' => $data['postal_code'] ?? null,
            'latitude' => $data['latitude'] ?? null,
            'longitude' => $data['longitude'] ?? null,
            'maps_url' => $data['maps_url'] ?? null,
            'manager_name' => $data['manager_name'] ?? null,
            'manager_phone' => $data['manager_phone'] ?? null,
            'manager_email' => $data['manager_email'] ?? null,
            'status' => $data['status'],
            'created_by' => $creator->id,
        ]);
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function statusOptions(): array
    {
        return [
            ['value' => 'draft', 'label' => 'Draft'],
            ['value' => 'active', 'label' => 'Aktif'],
            ['value' => 'verified', 'label' => 'Terverifikasi'],
            ['value' => 'review', 'label' => 'Perlu Review'],
            ['value' => 'archived', 'label' => 'Diarsipkan'],
        ];
    }

    /**
     * @return array<int, string>
     */
    private function provinceOptions(): array
    {
        return TourismVillage::query()
            ->whereNotNull('province')
            ->distinct()
            ->orderBy('province')
            ->pluck('province')
            ->values()
            ->all();
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function getStats(): array
    {
        return [
            [
                'label' => 'Total Desa Wisata',
                'value' => (string) TourismVillage::query()->count(),
                'description' => 'Desa binaan terdaftar',
                'icon' => 'map',
            ],
            [
                'label' => 'Desa Aktif',
                'value' => (string) TourismVillage::query()->where('status', 'active')->count(),
                'description' => 'Siap diproses assessment',
                'icon' => 'clipboard',
            ],
            [
                'label' => 'Sudah Terverifikasi',
                'value' => (string) TourismVillage::query()->where('status', 'verified')->count(),
                'description' => 'Data profil lengkap',
                'icon' => 'check',
            ],
            [
                'label' => 'Perlu Review',
                'value' => (string) TourismVillage::query()->where('status', 'review')->count(),
                'description' => 'Menunggu tindak lanjut',
                'icon' => 'file',
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatVillage(TourismVillage $village): array
    {
        $profileItemsCount = (int) $village->profile_items_count;
        $mediaCount = (int) $village->media_count;
        $progress = min(100, ($profileItemsCount * 12) + ($mediaCount * 8));

        return [
            'id' => $village->id,
            'code' => $village->code,
            'name' => $village->name,
            'slug' => $village->slug,
            'description' => $village->description,
            'location' => collect([$village->city, $village->province])->filter()->implode(', ') ?: '-',
            'province' => $village->province,
            'city' => $village->city,
            'district' => $village->district,
            'subdistrict' => $village->subdistrict,
            'address' => $village->address,
            'postal_code' => $village->postal_code,
            'latitude' => $village->latitude,
            'longitude' => $village->longitude,
            'maps_url' => $village->maps_url,
            'manager_name' => $village->manager_name ?: '-',
            'manager_phone' => $village->manager_phone,
            'manager_email' => $village->manager_email,
            'status' => $village->status,
            'status_label' => $this->labelFor($village->status, $this->statusOptions()),
            'category_label' => $this->categoryFor($progress),
            'enumerators' => $village->enumerator_assignments_count.' enumerator',
            'survey_progress' => $progress,
            'score' => $progress >= 100 ? 'Siap review' : 'Belum final',
            'created_by' => $village->creator?->name ?? '-',
            'updated_at' => $this->formatDate($village->updated_at),
        ];
    }

    /**
     * @param  array<int, array<string, string>>  $options
     */
    private function labelFor(?string $value, array $options): string
    {
        return collect($options)->firstWhere('value', $value)['label'] ?? Str::headline((string) $value);
    }

    private function categoryFor(int $progress): string
    {
        return match (true) {
            $progress >= 85 => 'Mandiri',
            $progress >= 60 => 'Maju',
            $progress >= 35 => 'Berkembang',
            default => 'Rintisan',
        };
    }

    private function formatDate(?CarbonInterface $date): string
    {
        return $date?->translatedFormat('d M Y') ?? '-';
    }
}
