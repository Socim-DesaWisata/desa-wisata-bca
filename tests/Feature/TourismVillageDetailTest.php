<?php

use App\Models\PariwisataVillage;
use App\Models\PariwisataVillageCategory;
use App\Models\TourismVillage;
use App\Models\User;
use App\Models\VillageAdministrator;
use App\Models\VillageAdministratorLanguage;
use App\Models\VillageInstitutional;
use App\Models\VillageMedia;
use App\Models\VillageProfileItem;
use App\Models\VillageProfileItemCategory;
use App\Models\VillageProfileItemMedia;
use App\Models\VillageStakeholder;
use App\Models\VillageUmkm;
use App\Models\VillageUmkmCategory;
use App\Models\VillageWorker;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('village detail page exposes real backend profile media umkm and pariwisata data', function () {
    $user = User::factory()->create();
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
        'name' => 'Desa Nyata',
        'city' => 'Sleman',
        'province' => 'DI Yogyakarta',
        'manager_name' => 'Pengelola Desa',
        'manager_phone' => '08123456789',
        'manager_email' => 'desa@example.com',
        'address' => 'Jl. Desa Wisata 1',
    ]);

    VillageMedia::query()->create([
        'village_id' => $village->id,
        'uploaded_by' => $user->id,
        'type' => 'image',
        'title' => 'Cover Desa',
        'file_path' => 'villages/cover.jpg',
        'is_cover' => true,
        'sort_order' => 0,
    ]);

    $category = VillageProfileItemCategory::query()->create([
        'name' => 'Paket Wisata',
        'slug' => 'paket-wisata',
        'is_active' => true,
        'sort_order' => 1,
    ]);

    $profileItem = VillageProfileItem::query()->create([
        'village_id' => $village->id,
        'category_id' => $category->id,
        'created_by' => $user->id,
        'name' => 'Paket Sunrise',
        'description' => 'Paket wisata pagi.',
        'price_text' => 'Rp250.000',
        'is_active' => true,
        'sort_order' => 1,
    ]);

    VillageProfileItemMedia::query()->create([
        'village_profile_item_id' => $profileItem->id,
        'uploaded_by' => $user->id,
        'type' => 'image',
        'title' => 'Foto Paket',
        'file_path' => 'villages/paket.jpg',
        'is_cover' => true,
        'sort_order' => 0,
    ]);

    $umkm = VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'data_collector_id' => $user->id,
        'name' => 'UMKM Kopi Desa',
        'brand_name' => 'Kopi Desa',
        'business_owner_name' => 'Ibu Sari',
        'product_category' => 'kopi',
        'production_address' => 'Dusun Tengah',
        'annual_revenue' => 12500000,
        'has_exported' => true,
        'export_destination_countries' => 'Singapura',
        'product_photo_path' => 'villages/umkm.jpg',
    ]);

    VillageUmkmCategory::query()->create([
        'village_umkm_id' => $umkm->id,
        'category' => 'makanan-minuman',
    ]);

    $pariwisata = PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'Spot Bukit Desa',
        'operational_days' => 'Senin-Minggu',
        'operational_hours' => '08:00-17:00',
        'entrance_ticket_price' => 15000,
        'address' => 'Bukit Atas',
        'person_in_charge_name' => 'Pak Budi',
        'person_in_charge_phone' => '0811000000',
        'is_active' => true,
    ]);

    PariwisataVillageCategory::query()->create([
        'pariwisata_village_id' => $pariwisata->id,
        'category' => 'alam',
    ]);

    VillageWorker::query()->create([
        'village_id' => $village->id,
        'type' => 'full-time',
        'gender' => 'female',
        'age_min' => 21,
        'age_max' => 35,
        'amount' => 8,
        'notes' => 'Pemandu wisata',
    ]);

    VillageAdministrator::query()->create([
        'village_id' => $village->id,
        'education' => 's1/d4',
        'amount' => 3,
    ]);

    VillageAdministratorLanguage::query()->create([
        'village_id' => $village->id,
        'language_name' => 'Inggris',
        'proficiency_level' => 'advanced',
        'amount' => 2,
        'notes' => 'Pemandu tamu asing',
    ]);

    VillageStakeholder::query()->create([
        'village_id' => $village->id,
        'name' => 'Siti Aminah',
        'position' => 'Ketua Pokdarwis',
    ]);

    VillageInstitutional::query()->create([
        'village_id' => $village->id,
        'title' => 'BUMDes Nyata',
        'description' => 'Mengelola unit usaha desa.',
    ]);

    $this->actingAs($user)
        ->get(route('villages.show', $village))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('villages/show')
            ->where('village.name', 'Desa Nyata')
            ->where('village.cover.title', 'Cover Desa')
            ->where('village.profile_items.0.category', 'Paket Wisata')
            ->where('village.profile_items.0.items.0.name', 'Paket Sunrise')
            ->where('village.umkms.0.name', 'UMKM Kopi Desa')
            ->where('village.umkms.0.categories.0.label', 'Makanan Minuman')
            ->where('village.pariwisata.0.name', 'Spot Bukit Desa')
            ->where('village.pariwisata.0.categories.0.label', 'Nature')
            ->where('village.workers.0.amount', 8)
            ->where('village.administrators.0.education', 's1/d4')
            ->where('village.administrator_languages.0.language_name', 'Inggris')
            ->where('village.stakeholders.0.name', 'Siti Aminah')
            ->missing('village.stakeholders.0.organization')
            ->where('village.institutionals.0.title', 'BUMDes Nyata')
        );
});
