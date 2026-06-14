<?php

namespace App\Services;

use App\Models\AnnualTurnover;
use App\Models\AnnualWorkerStat;
use App\Models\AnnualWorkerTrainingStat;
use App\Models\PariwisataAnnualVisitor;
use App\Models\PariwisataPackage;
use App\Models\PariwisataVillage;
use App\Models\PariwisataVillageCategory;
use App\Models\PariwisataVisitorTypeAnnual;
use App\Models\ProgramVillage;
use App\Models\SurveyAnswer;
use App\Models\SurveyAnswerDocument;
use App\Models\SurveyAnswerHistory;
use App\Models\TourismVillage;
use App\Models\UmkmSurveyAnswer;
use App\Models\User;
use App\Models\VillageActiveGroupAnnual;
use App\Models\VillageAnnualPopulationStat;
use App\Models\VillageEnumeratorAssignment;
use App\Models\VillageMedia;
use App\Models\VillageProfileItem;
use App\Models\VillageProfileItemCategory;
use App\Models\VillageProfileItemMedia;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageSurveyAssignmentLog;
use App\Models\VillageUmkm;
use App\Models\VillageUmkmCategory;
use App\Models\VillageUmkmDocument;
use App\Models\VillageVulnerableGroupAnnual;
use Carbon\CarbonInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
            'view' => Arr::get($filters, 'view', 'active') === 'trash' ? 'trash' : 'active',
            'per_page' => (int) Arr::get($filters, 'per_page', 10),
        ];

        $query = TourismVillage::query()
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
                'deleted_at',
            ])
            ->with(['creator:id,name'])
            ->withCount(['enumeratorAssignments', 'media', 'profileItems'])
            ->withSum('surveyAnswers as total_score', 'score');

        if ($normalizedFilters['view'] === 'trash') {
            $query->onlyTrashed();
        }

        $paginator = $query
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

    public function getDetailData(TourismVillage $village): array
    {
        $village->load([
            'creator:id,name',
            'media' => fn ($query) => $query->orderByDesc('is_cover')->orderBy('sort_order')->orderBy('id'),
            'profileItems' => fn ($query) => $query->where('is_active', true)->orderBy('sort_order')->orderBy('name'),
            'profileItems.category:id,name,slug',
            'profileItems.media' => fn ($query) => $query->orderByDesc('is_cover')->orderBy('sort_order')->orderBy('id'),
            'surveyAssignment.template:id,title,status',
            'surveyAssignment.assignedBy:id,name',
            'surveyAssignment.submittedBy:id,name',
            'surveyAssignment.reviewedBy:id,name',
            'enumerators:id,name,email',
            'pariwisataVillages' => fn ($query) => $query->where('is_active', true)->latest('id'),
            'pariwisataVillages.categories:id,pariwisata_village_id,category',
        ])->loadCount(['enumeratorAssignments', 'media', 'profileItems']);

        return [
            'village' => $this->formatVillageDetail($village),
        ];
    }

    public function getEditData(TourismVillage $village): array
    {
        $village->load([
            'creator:id,name',
            'media' => fn ($query) => $query->orderByDesc('is_cover')->orderBy('sort_order')->orderBy('id'),
            'profileItems' => fn ($query) => $query->orderBy('sort_order')->orderBy('name'),
            'profileItems.category:id,name,slug',
            'profileItems.media' => fn ($query) => $query->orderByDesc('is_cover')->orderBy('sort_order')->orderBy('id'),
        ]);

        return [
            'village' => $this->formatVillageForm($village),
            'status_options' => $this->statusOptions(),
            'profile_category_options' => $this->profileCategoryOptions(),
            'media_type_options' => $this->mediaTypeOptions(),
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(TourismVillage $village, array $data, User $actor): TourismVillage
    {
        DB::transaction(function () use ($village, $data, $actor): void {
            $village->update([
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
            ]);

            $this->syncVillageMedia($village, $data['media'] ?? [], $actor);
            $this->syncProfileItems($village, $data['profile_items'] ?? [], $actor);
        });

        return $village;
    }

    public function delete(TourismVillage $village): void
    {
        DB::transaction(function () use ($village): void {
            $this->deleteVillageSurveyAssignmentTree($village->id);
            $this->deleteVillageUmkmTree($village->id);
            $this->deleteVillagePariwisataTree($village->id);
            $this->deleteVillageProfileTree($village->id);
            $this->deleteVillageAnnualData($village->id);

            ProgramVillage::query()->where('village_id', $village->id)->delete();
            VillageEnumeratorAssignment::query()->where('village_id', $village->id)->delete();

            $village->delete();
        });
    }

    public function restore(int $villageId): TourismVillage
    {
        $village = TourismVillage::withTrashed()->findOrFail($villageId);

        DB::transaction(function () use ($village): void {
            $village->restore();

            VillageMedia::withTrashed()->where('village_id', $village->id)->restore();
            VillageProfileItem::withTrashed()->where('village_id', $village->id)->restore();

            $profileItemIds = VillageProfileItem::withTrashed()
                ->where('village_id', $village->id)
                ->pluck('id');

            VillageProfileItemMedia::withTrashed()
                ->whereIn('village_profile_item_id', $profileItemIds)
                ->restore();

            $this->restoreVillageSurveyAssignmentTree($village->id);
            $this->restoreVillageUmkmTree($village->id);
            $this->restoreVillagePariwisataTree($village->id);
            $this->restoreVillageAnnualData($village->id);
        });

        return $village->refresh();
    }

    private function deleteVillageProfileTree(int $villageId): void
    {
        $profileItemIds = VillageProfileItem::query()
            ->where('village_id', $villageId)
            ->pluck('id');

        VillageProfileItemMedia::query()
            ->whereIn('village_profile_item_id', $profileItemIds)
            ->delete();

        VillageMedia::query()->where('village_id', $villageId)->delete();
        VillageProfileItem::query()->where('village_id', $villageId)->delete();
    }

    private function deleteVillageSurveyAssignmentTree(int $villageId): void
    {
        $assignmentIds = VillageSurveyAssignment::query()
            ->where('village_id', $villageId)
            ->pluck('id');

        $answerIds = SurveyAnswer::query()
            ->whereIn('village_survey_assignment_id', $assignmentIds)
            ->pluck('id');

        SurveyAnswerDocument::query()->whereIn('survey_answer_id', $answerIds)->delete();
        SurveyAnswerHistory::query()->whereIn('village_survey_assignment_id', $assignmentIds)->delete();
        VillageSurveyAssignmentLog::query()->whereIn('village_survey_assignment_id', $assignmentIds)->delete();
        SurveyAnswer::query()->whereIn('village_survey_assignment_id', $assignmentIds)->delete();
        VillageSurveyAssignment::query()->whereIn('id', $assignmentIds)->delete();
    }

    private function deleteVillageUmkmTree(int $villageId): void
    {
        $umkmIds = VillageUmkm::query()->where('village_id', $villageId)->pluck('id');

        VillageUmkmDocument::query()->whereIn('village_umkm_id', $umkmIds)->delete();
        VillageUmkmCategory::query()->whereIn('village_umkm_id', $umkmIds)->delete();
        UmkmSurveyAnswer::query()->whereIn('umkm_id', $umkmIds)->delete();
        AnnualTurnover::query()->whereIn('umkm_id', $umkmIds)->delete();
        AnnualWorkerStat::query()->whereIn('umkm_id', $umkmIds)->delete();
        AnnualWorkerTrainingStat::query()->whereIn('umkm_id', $umkmIds)->delete();
        VillageUmkm::query()->whereIn('id', $umkmIds)->delete();
    }

    private function deleteVillagePariwisataTree(int $villageId): void
    {
        $pariwisataIds = PariwisataVillage::query()->where('village_id', $villageId)->pluck('id');
        PariwisataVillageCategory::query()->whereIn('pariwisata_village_id', $pariwisataIds)->delete();
        AnnualTurnover::query()->whereIn('pariwisata_id', $pariwisataIds)->delete();
        PariwisataAnnualVisitor::query()->whereIn('pariwisata_id', $pariwisataIds)->delete();
        PariwisataVisitorTypeAnnual::query()->whereIn('pariwisata_id', $pariwisataIds)->delete();
        PariwisataPackage::query()->whereIn('pariwisata_id', $pariwisataIds)->delete();
        AnnualWorkerStat::query()->whereIn('pariwisata_id', $pariwisataIds)->delete();
        AnnualWorkerTrainingStat::query()->whereIn('pariwisata_id', $pariwisataIds)->delete();
        PariwisataVillage::query()->whereIn('id', $pariwisataIds)->delete();
    }

    private function deleteVillageAnnualData(int $villageId): void
    {
        VillageAnnualPopulationStat::query()->where('village_id', $villageId)->delete();
        VillageVulnerableGroupAnnual::query()->where('village_id', $villageId)->delete();
        VillageActiveGroupAnnual::query()->where('village_id', $villageId)->delete();
    }

    private function restoreVillageSurveyAssignmentTree(int $villageId): void
    {
        $assignmentIds = VillageSurveyAssignment::withTrashed()
            ->where('village_id', $villageId)
            ->pluck('id');

        VillageSurveyAssignment::withTrashed()->whereIn('id', $assignmentIds)->restore();
        SurveyAnswer::withTrashed()->whereIn('village_survey_assignment_id', $assignmentIds)->restore();

        $answerIds = SurveyAnswer::withTrashed()
            ->whereIn('village_survey_assignment_id', $assignmentIds)
            ->pluck('id');

        SurveyAnswerDocument::withTrashed()->whereIn('survey_answer_id', $answerIds)->restore();
        SurveyAnswerHistory::withTrashed()->whereIn('village_survey_assignment_id', $assignmentIds)->restore();
        VillageSurveyAssignmentLog::withTrashed()->whereIn('village_survey_assignment_id', $assignmentIds)->restore();
    }

    private function restoreVillageUmkmTree(int $villageId): void
    {
        $umkmIds = VillageUmkm::withTrashed()->where('village_id', $villageId)->pluck('id');

        VillageUmkm::withTrashed()->whereIn('id', $umkmIds)->restore();
        VillageUmkmDocument::withTrashed()->whereIn('village_umkm_id', $umkmIds)->restore();
        VillageUmkmCategory::withTrashed()->whereIn('village_umkm_id', $umkmIds)->restore();
        UmkmSurveyAnswer::withTrashed()->whereIn('umkm_id', $umkmIds)->restore();
        AnnualTurnover::withTrashed()->whereIn('umkm_id', $umkmIds)->restore();
        AnnualWorkerStat::withTrashed()->whereIn('umkm_id', $umkmIds)->restore();
        AnnualWorkerTrainingStat::withTrashed()->whereIn('umkm_id', $umkmIds)->restore();
    }

    private function restoreVillagePariwisataTree(int $villageId): void
    {
        $pariwisataIds = PariwisataVillage::withTrashed()->where('village_id', $villageId)->pluck('id');

        PariwisataVillage::withTrashed()->whereIn('id', $pariwisataIds)->restore();
        PariwisataVillageCategory::withTrashed()->whereIn('pariwisata_village_id', $pariwisataIds)->restore();
        AnnualTurnover::withTrashed()->whereIn('pariwisata_id', $pariwisataIds)->restore();
        PariwisataAnnualVisitor::withTrashed()->whereIn('pariwisata_id', $pariwisataIds)->restore();
        PariwisataVisitorTypeAnnual::withTrashed()->whereIn('pariwisata_id', $pariwisataIds)->restore();
        PariwisataPackage::withTrashed()->whereIn('pariwisata_id', $pariwisataIds)->restore();
        AnnualWorkerStat::withTrashed()->whereIn('pariwisata_id', $pariwisataIds)->restore();
        AnnualWorkerTrainingStat::withTrashed()->whereIn('pariwisata_id', $pariwisataIds)->restore();
    }

    private function restoreVillageAnnualData(int $villageId): void
    {
        VillageAnnualPopulationStat::withTrashed()->where('village_id', $villageId)->restore();
        VillageVulnerableGroupAnnual::withTrashed()->where('village_id', $villageId)->restore();
        VillageActiveGroupAnnual::withTrashed()->where('village_id', $villageId)->restore();
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
     * @return array<int, array<string, string>>
     */
    public function profileCategoryOptions(): array
    {
        return [
            ['slug' => 'fasilitas', 'name' => 'Fasilitas'],
            ['slug' => 'atraksi', 'name' => 'Atraksi'],
            ['slug' => 'suvenir', 'name' => 'Suvenir'],
            ['slug' => 'homestay', 'name' => 'Homestay'],
            ['slug' => 'paket-wisata', 'name' => 'Paket Wisata'],
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function mediaTypeOptions(): array
    {
        return [
            ['value' => 'image', 'label' => 'Gambar'],
            ['value' => 'video', 'label' => 'Video'],
            ['value' => 'document', 'label' => 'Dokumen'],
            ['value' => 'url', 'label' => 'URL Eksternal'],
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
            'total_score' => $village->total_score ?? 0,
            'score' => $progress >= 100 ? 'Siap review' : 'Belum final',
            'is_trashed' => $village->trashed(),
            'deleted_at' => $this->formatDate($village->deleted_at),
            'created_by' => $village->creator?->name ?? '-',
            'updated_at' => $this->formatDate($village->updated_at),
            'media' => $village->media->map(fn (VillageMedia $media): array => $this->formatMedia($media))->values(),
            'profile_items' => $village->profileItems->map(fn (VillageProfileItem $item): array => $this->formatProfileItemForForm($item))->values(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatVillageDetail(TourismVillage $village): array
    {
        return [
            ...$this->formatVillage($village),
            'address' => $village->address ?: '-',
            'postal_code' => $village->postal_code ?: '-',
            'manager_phone' => $village->manager_phone ?: '-',
            'manager_email' => $village->manager_email ?: '-',
            'created_at' => $this->formatDate($village->created_at),
            'media' => $village->media->map(fn (VillageMedia $media): array => $this->formatMedia($media))->values(),
            'cover' => $village->media->firstWhere('is_cover', true)
                ? $this->formatMedia($village->media->firstWhere('is_cover', true))
                : null,
            'profile_items' => $village->profileItems
                ->groupBy(fn (VillageProfileItem $item): string => $item->category?->name ?? 'Lainnya')
                ->map(fn ($items, string $category): array => [
                    'category' => $category,
                    'items' => $items->map(fn (VillageProfileItem $item): array => $this->formatProfileItem($item))->values(),
                ])
                ->values(),
            'survey_assignment' => $village->surveyAssignment
                ? $this->formatSurveyAssignment($village->surveyAssignment)
                : null,
            'enumerator_list' => $village->enumerators
                ->map(fn (User $user): array => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ])
                ->values(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatVillageForm(TourismVillage $village): array
    {
        return [
            'id' => $village->id,
            'code' => $village->code,
            'name' => $village->name,
            'slug' => $village->slug,
            'description' => $village->description ?? '',
            'province' => $village->province ?? '',
            'city' => $village->city ?? '',
            'district' => $village->district ?? '',
            'subdistrict' => $village->subdistrict ?? '',
            'address' => $village->address ?? '',
            'postal_code' => $village->postal_code ?? '',
            'latitude' => (string) ($village->latitude ?? ''),
            'longitude' => (string) ($village->longitude ?? ''),
            'maps_url' => $village->maps_url ?? '',
            'manager_name' => $village->manager_name ?? '',
            'manager_phone' => $village->manager_phone ?? '',
            'manager_email' => $village->manager_email ?? '',
            'status' => $village->status,
            'created_by' => $village->creator?->name ?? '-',
            'updated_at' => $this->formatDate($village->updated_at),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatMedia(object $media): array
    {
        return [
            'id' => $media->id,
            'type' => $media->type,
            'title' => $media->title,
            'caption' => $media->caption,
            'file_path' => $media->file_path,
            'file' => null,
            'external_url' => $media->external_url,
            'mime_type' => $media->mime_type,
            'file_size' => $media->file_size,
            'url' => $this->mediaUrl($media->file_path, $media->external_url),
            'is_cover' => $media->is_cover,
            'sort_order' => $media->sort_order,
        ];
    }

    private function mediaUrl(?string $filePath, ?string $externalUrl): ?string
    {
        if ($externalUrl) {
            return $externalUrl;
        }

        if (! $filePath) {
            return null;
        }

        return Str::startsWith($filePath, ['http://', 'https://', '/storage/'])
            ? $filePath
            : Storage::url($filePath);
    }

    /**
     * @return array<string, mixed>
     */
    private function formatProfileItem(VillageProfileItem $item): array
    {
        return [
            'id' => $item->id,
            'name' => $item->name,
            'description' => $item->description,
            'address' => $item->address,
            'maps_url' => $item->maps_url,
            'price_text' => $item->price_text,
            'opening_hours' => $item->opening_hours,
            'contact_name' => $item->contact_name,
            'contact_phone' => $item->contact_phone,
            'media' => $item->media->map(fn ($media): array => $this->formatMedia($media))->values(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatProfileItemForForm(VillageProfileItem $item): array
    {
        return [
            'id' => $item->id,
            'category_slug' => $item->category?->slug ?? 'fasilitas',
            'category_name' => $item->category?->name ?? 'Fasilitas',
            'name' => $item->name,
            'description' => $item->description ?? '',
            'address' => $item->address ?? '',
            'latitude' => (string) ($item->latitude ?? ''),
            'longitude' => (string) ($item->longitude ?? ''),
            'maps_url' => $item->maps_url ?? '',
            'price_min' => (string) ($item->price_min ?? ''),
            'price_max' => (string) ($item->price_max ?? ''),
            'price_text' => $item->price_text ?? '',
            'opening_hours' => $item->opening_hours ?? '',
            'contact_name' => $item->contact_name ?? '',
            'contact_phone' => $item->contact_phone ?? '',
            'metadata' => $item->metadata ? json_encode($item->metadata, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) : '',
            'is_active' => $item->is_active,
            'sort_order' => $item->sort_order,
            'media' => $item->media->map(fn ($media): array => $this->formatMedia($media))->values(),
        ];
    }

    /**
     * @param  array<int, array<string, mixed>>  $mediaItems
     */
    private function syncVillageMedia(TourismVillage $village, array $mediaItems, User $actor): void
    {
        $keptIds = collect($mediaItems)->pluck('id')->filter()->map(fn ($id): int => (int) $id)->all();

        $village->media()
            ->when($keptIds !== [], fn ($query) => $query->whereNotIn('id', $keptIds))
            ->when($keptIds === [], fn ($query) => $query)
            ->delete();

        foreach ($mediaItems as $index => $media) {
            $payload = $this->mediaPayload($media, $actor, $index);

            if (! empty($media['id'])) {
                $village->media()->whereKey($media['id'])->update($payload);

                continue;
            }

            $village->media()->create($payload);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $items
     */
    private function syncProfileItems(TourismVillage $village, array $items, User $actor): void
    {
        $keptIds = collect($items)->pluck('id')->filter()->map(fn ($id): int => (int) $id)->all();

        $village->profileItems()
            ->when($keptIds !== [], fn ($query) => $query->whereNotIn('id', $keptIds))
            ->when($keptIds === [], fn ($query) => $query)
            ->delete();

        foreach ($items as $index => $item) {
            $category = $this->resolveProfileCategory($item);
            $payload = [
                'category_id' => $category->id,
                'created_by' => $actor->id,
                'name' => $item['name'],
                'description' => $item['description'] ?? null,
                'address' => $item['address'] ?? null,
                'latitude' => $item['latitude'] ?? null,
                'longitude' => $item['longitude'] ?? null,
                'maps_url' => $item['maps_url'] ?? null,
                'price_min' => $item['price_min'] ?? null,
                'price_max' => $item['price_max'] ?? null,
                'price_text' => $item['price_text'] ?? null,
                'opening_hours' => $item['opening_hours'] ?? null,
                'contact_name' => $item['contact_name'] ?? null,
                'contact_phone' => $item['contact_phone'] ?? null,
                'metadata' => $this->metadataPayload($item['metadata'] ?? null),
                'is_active' => (bool) ($item['is_active'] ?? true),
                'sort_order' => (int) ($item['sort_order'] ?? $index),
            ];

            $profileItem = ! empty($item['id'])
                ? $village->profileItems()->whereKey($item['id'])->first()
                : null;

            if ($profileItem) {
                $profileItem->update($payload);
            } else {
                $profileItem = $village->profileItems()->create($payload);
            }

            $this->syncProfileItemMedia($profileItem, $item['media'] ?? [], $actor);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $mediaItems
     */
    private function syncProfileItemMedia(VillageProfileItem $profileItem, array $mediaItems, User $actor): void
    {
        $keptIds = collect($mediaItems)->pluck('id')->filter()->map(fn ($id): int => (int) $id)->all();

        $profileItem->media()
            ->when($keptIds !== [], fn ($query) => $query->whereNotIn('id', $keptIds))
            ->when($keptIds === [], fn ($query) => $query)
            ->delete();

        foreach ($mediaItems as $index => $media) {
            $payload = $this->mediaPayload($media, $actor, $index);

            if (! empty($media['id'])) {
                $profileItem->media()->whereKey($media['id'])->update($payload);

                continue;
            }

            $profileItem->media()->create($payload);
        }
    }

    /**
     * @param  array<string, mixed>  $media
     * @return array<string, mixed>
     */
    private function mediaPayload(array $media, User $actor, int $index): array
    {
        return [
            'uploaded_by' => $actor->id,
            'type' => $media['type'],
            'title' => $media['title'] ?? null,
            'caption' => $media['caption'] ?? null,
            'file_path' => $this->storedFilePath($media, $media['file_path'] ?? null),
            'external_url' => $media['external_url'] ?? null,
            'mime_type' => $this->uploadedMimeType($media, $media['mime_type'] ?? null),
            'file_size' => $this->uploadedFileSize($media),
            'is_cover' => (bool) ($media['is_cover'] ?? false),
            'sort_order' => (int) ($media['sort_order'] ?? $index),
        ];
    }

    private function metadataPayload(?string $metadata): ?array
    {
        if (! $metadata) {
            return null;
        }

        return json_decode($metadata, true);
    }

    /**
     * @param  array<string, mixed>  $media
     */
    private function storedFilePath(array $media, ?string $fallback): ?string
    {
        $file = $media['file'] ?? null;

        return $file instanceof UploadedFile
            ? $file->store('villages', 'public')
            : $fallback;
    }

    /**
     * @param  array<string, mixed>  $media
     */
    private function uploadedMimeType(array $media, ?string $fallback): ?string
    {
        $file = $media['file'] ?? null;

        return $file instanceof UploadedFile ? $file->getMimeType() : $fallback;
    }

    /**
     * @param  array<string, mixed>  $media
     */
    private function uploadedFileSize(array $media): ?int
    {
        $file = $media['file'] ?? null;

        return $file instanceof UploadedFile ? $file->getSize() : null;
    }

    /**
     * @param  array<string, mixed>  $item
     */
    private function resolveProfileCategory(array $item): VillageProfileItemCategory
    {
        return VillageProfileItemCategory::query()->firstOrCreate(
            ['slug' => $item['category_slug']],
            [
                'name' => $item['category_name'],
                'description' => null,
                'is_active' => true,
                'sort_order' => collect($this->profileCategoryOptions())->search(fn ($category) => $category['slug'] === $item['category_slug']) ?: 0,
            ]
        );
    }

    /**
     * @return array<string, mixed>
     */
    private function formatSurveyAssignment(VillageSurveyAssignment $assignment): array
    {
        return [
            'id' => $assignment->id,
            'status' => $assignment->status,
            'template' => $assignment->template?->title ?? '-',
            'assigned_by' => $assignment->assignedBy?->name ?? '-',
            'submitted_by' => $assignment->submittedBy?->name ?? '-',
            'reviewed_by' => $assignment->reviewedBy?->name ?? '-',
            'assigned_at' => $this->formatDate($assignment->assigned_at),
            'submitted_at' => $this->formatDate($assignment->submitted_at),
            'reviewed_at' => $this->formatDate($assignment->reviewed_at),
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

    /**
     * @return array<string, mixed>
     */
    private function formatPariwisataVillage(object $pariwisata): array
    {
        return [
            'id' => $pariwisata->id,
            'name' => $pariwisata->name,
            'operational_days' => $pariwisata->operational_days,
            'operational_hours' => $pariwisata->operational_hours,
            'entrance_ticket_price' => $pariwisata->entrance_ticket_price !== null ? $this->formatCurrency((float) $pariwisata->entrance_ticket_price) : null,
            'address' => $pariwisata->address,
            'status_label' => $pariwisata->is_active ? 'Aktif' : 'Nonaktif',
            'categories' => $pariwisata->categories
                ->map(fn ($category): array => [
                    'id' => $category->id,
                    'value' => $category->category,
                    'label' => $this->pariwisataCategoryLabel($category->category),
                ])
                ->values(),
        ];
    }

    private function pariwisataCategoryLabel(?string $value): string
    {
        return match ($value) {
            'alam' => 'Nature',
            'budaya' => 'Culture',
            'kuliner' => 'Culinary',
            'edukasi' => 'Education',
            'keluarga' => 'Family',
            default => Str::headline((string) $value),
        };
    }

    private function formatCurrency(float $value): string
    {
        return 'Rp '.number_format($value, 0, ',', '.');
    }

    private function formatDate(?CarbonInterface $date): string
    {
        return $date?->translatedFormat('d M Y') ?? '-';
    }
}
