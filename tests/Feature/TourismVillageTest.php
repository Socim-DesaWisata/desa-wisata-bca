<?php

use App\Models\PariwisataSurveyAnswer;
use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataSuveyOption;
use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\User;
use App\Models\VillageAdministrator;
use App\Models\VillageAdministratorLanguage;
use App\Models\VillageInstitutional;
use App\Models\VillageMedia;
use App\Models\VillageProfileItem;
use App\Models\VillageProfileItemCategory;
use App\Models\VillageStakeholder;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageWorker;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authenticated users can view villages from database', function () {
    $user = User::factory()->create();
    $village = TourismVillage::factory()->create([
        'name' => 'Desa Wisata Testing',
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get(route('villages'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('villages/index')
            ->where('villages.data.0.name', $village->name)
        );
});

test('village detail exposes ISTC aspect scores and assignment code', function () {
    $user = User::factory()->create();
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignmentTemplate = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'status' => 'published',
    ]);
    $istcTemplate = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'type' => 'pariwisata',
        'status' => 'published',
        'published_at' => now(),
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'KPT',
        'village_id' => $village->id,
        'survey_template_id' => $assignmentTemplate->id,
        'assigned_by' => $user->id,
    ]);
    $question = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $istcTemplate->id,
        'category_code' => 'A',
        'category_name' => 'Amenitas',
        'criteria_code' => 'A.1',
        'criteria_name' => 'Kriteria',
        'indicator_code' => 'A.1.1',
        'indicator_name' => 'Indikator',
        'input_type' => 'single_choice',
        'sort_order' => 1,
        'is_active' => true,
    ]);
    $option = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $question->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Sangat Baik',
        'description' => 'Sangat Baik',
        'sort_order' => 1,
    ]);
    PariwisataSurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'pariwisata_survey_question_id' => $question->id,
        'pariwisata_suvey_option_id' => $option->id,
        'score' => 4,
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get(route('villages.show', $village))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('village.survey_assignment.code', 'KPT')
            ->where('village.istc_aspect_scores.0.name', 'Amenitas')
            ->where('village.istc_aspect_scores.0.score', 4)
            ->where('village.istc_aspect_scores.0.max_score', 4)
        );
});

test('authenticated users can create a tourism village', function () {
    $user = User::factory()->create();

    $payload = [
        'code' => 'DW-TEST-001',
        'name' => 'Desa Wisata Baru',
        'slug' => 'desa-wisata-baru',
        'description' => 'Desa wisata untuk pengujian.',
        'province' => 'DI Yogyakarta',
        'city' => 'Gunungkidul',
        'district' => 'Patuk',
        'subdistrict' => 'Nglanggeran',
        'address' => 'Jl. Desa Wisata No. 1',
        'postal_code' => '55862',
        'latitude' => '-7.8412000',
        'longitude' => '110.5430000',
        'maps_url' => 'https://maps.google.com/example',
        'manager_name' => 'Pokdarwis Baru',
        'manager_phone' => '081234567890',
        'manager_email' => 'pengelola@example.com',
        'status' => 'active',
    ];

    $this->actingAs($user)
        ->post(route('villages.store'), $payload)
        ->assertRedirect();

    $this->assertDatabaseHas('tourism_villages', [
        'code' => 'DW-TEST-001',
        'name' => 'Desa Wisata Baru',
        'slug' => 'desa-wisata-baru',
        'created_by' => $user->id,
    ]);
});

test('edit page exposes village media from database', function () {
    $user = User::factory()->create();
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);

    VillageMedia::query()->create([
        'village_id' => $village->id,
        'uploaded_by' => $user->id,
        'type' => 'image',
        'title' => 'Foto Cover Desa',
        'file_path' => 'villages/cover.jpg',
        'mime_type' => 'image/jpeg',
        'file_size' => 12345,
        'is_cover' => true,
        'sort_order' => 0,
    ]);

    $this->actingAs($user)
        ->get(route('villages.edit', $village))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('villages/edit')
            ->where('village.media.0.title', 'Foto Cover Desa')
            ->where('village.media.0.url', '/storage/villages/cover.jpg')
            ->where('village.media.0.is_cover', true)
        );
});

test('updating village without profile items preserves existing profile data', function () {
    $user = User::factory()->create();
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
        'code' => 'DW-PRESERVE-001',
        'slug' => 'desa-preserve-profile',
    ]);
    $category = VillageProfileItemCategory::query()->create([
        'name' => 'Paket Wisata',
        'slug' => 'paket-wisata',
        'is_active' => true,
        'sort_order' => 0,
    ]);
    $profileItem = VillageProfileItem::query()->create([
        'village_id' => $village->id,
        'category_id' => $category->id,
        'created_by' => $user->id,
        'name' => 'Paket Lama',
        'description' => 'Tetap tersimpan.',
        'is_active' => true,
        'sort_order' => 0,
    ]);

    $this->actingAs($user)
        ->patch(route('villages.update', $village), [
            'code' => 'DW-PRESERVE-001',
            'name' => 'Desa Preserve Updated',
            'slug' => 'desa-preserve-profile',
            'description' => 'Updated.',
            'province' => $village->province,
            'city' => $village->city,
            'district' => $village->district,
            'subdistrict' => $village->subdistrict,
            'address' => $village->address,
            'postal_code' => $village->postal_code,
            'latitude' => (string) $village->latitude,
            'longitude' => (string) $village->longitude,
            'maps_url' => $village->maps_url,
            'manager_name' => $village->manager_name,
            'manager_phone' => $village->manager_phone,
            'manager_email' => $village->manager_email,
            'status' => 'active',
            'media' => [],
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('village_profile_items', [
        'id' => $profileItem->id,
        'village_id' => $village->id,
        'name' => 'Paket Lama',
        'deleted_at' => null,
    ]);
});

test('edit village supports updating supporting data', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $otherVillage = TourismVillage::factory()->create(['created_by' => $user->id]);
    $worker = VillageWorker::query()->create([
        'village_id' => $village->id,
        'type' => 'full-time',
        'amount' => 5,
    ]);
    $administrator = VillageAdministrator::query()->create([
        'village_id' => $village->id,
        'education' => 'sma',
        'amount' => 2,
    ]);
    $institutional = VillageInstitutional::query()->create([
        'village_id' => $village->id,
        'title' => 'Lembaga Lama',
        'description' => 'Deskripsi lama',
    ]);
    $otherWorker = VillageWorker::query()->create([
        'village_id' => $otherVillage->id,
        'type' => 'part-time',
        'amount' => 99,
    ]);

    $this->actingAs($user)
        ->get(route('villages.edit', $village))
        ->assertInertia(fn ($page) => $page
            ->where('village.workers.0.id', $worker->id)
            ->where('village.administrators.0.id', $administrator->id)
            ->where('village.institutionals.0.id', $institutional->id)
        );

    $this->actingAs($user)
        ->patch(route('villages.update', $village), [
            'code' => $village->code,
            'name' => $village->name,
            'slug' => $village->slug,
            'description' => $village->description,
            'province' => $village->province,
            'city' => $village->city,
            'district' => $village->district,
            'subdistrict' => $village->subdistrict,
            'address' => $village->address,
            'postal_code' => $village->postal_code,
            'latitude' => (string) $village->latitude,
            'longitude' => (string) $village->longitude,
            'maps_url' => $village->maps_url,
            'manager_name' => $village->manager_name,
            'manager_phone' => $village->manager_phone,
            'manager_email' => $village->manager_email,
            'status' => 'active',
            'media' => [],
            'workers' => [
                ['id' => $worker->id, 'type' => 'part-time', 'gender' => 'female', 'age_min' => 20, 'age_max' => 35, 'amount' => 8, 'notes' => 'Tim operasional'],
            ],
            'administrators' => [
                ['id' => $administrator->id, 'education' => 's1/d4', 'amount' => 4],
            ],
            'institutionals' => [
                ['id' => $institutional->id, 'title' => 'Pokdarwis', 'description' => 'Deskripsi baru'],
                ['id' => null, 'title' => 'BUMDes', 'description' => 'Lembaga ekonomi desa'],
            ],
            'administrator_languages' => [
                ['id' => null, 'language_name' => 'Inggris', 'proficiency_level' => 'advanced', 'amount' => 3, 'notes' => 'Pelayanan wisatawan'],
            ],
            'stakeholders' => [
                ['id' => null, 'name' => 'Budi Santoso', 'position' => 'Kepala Bidang'],
            ],
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('village_workers', [
        'id' => $worker->id,
        'type' => 'part-time',
        'gender' => 'female',
        'age_min' => 20,
        'age_max' => 35,
        'amount' => 8,
    ]);
    $this->assertDatabaseHas('village_administrators', [
        'id' => $administrator->id,
        'education' => 's1/d4',
        'amount' => 4,
    ]);
    $this->assertDatabaseHas('village_institutional', [
        'id' => $institutional->id,
        'title' => 'Pokdarwis',
    ]);
    $this->assertDatabaseCount('village_institutional', 2);
    $this->assertDatabaseHas('village_administrator_languages', [
        'village_id' => $village->id,
        'language_name' => 'Inggris',
        'proficiency_level' => 'advanced',
        'amount' => 3,
    ]);
    $this->assertDatabaseHas('village_stakeholders', [
        'village_id' => $village->id,
        'name' => 'Budi Santoso',
        'position' => 'Kepala Bidang',
    ]);
    $this->assertDatabaseHas('village_workers', [
        'id' => $otherWorker->id,
        'amount' => 99,
    ]);
});

test('edit village rejects supporting data from another village', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $otherVillage = TourismVillage::factory()->create(['created_by' => $user->id]);
    $otherWorker = VillageWorker::query()->create([
        'village_id' => $otherVillage->id,
        'type' => 'part-time',
        'amount' => 99,
    ]);

    $this->actingAs($user)
        ->patch(route('villages.update', $village), [
            'code' => $village->code,
            'name' => $village->name,
            'slug' => $village->slug,
            'status' => 'active',
            'workers' => [['id' => $otherWorker->id, 'type' => 'full-time', 'gender' => 'male', 'age_min' => 18, 'age_max' => 30, 'amount' => 1, 'notes' => null]],
        ])
        ->assertSessionHasErrors('workers');

    $this->assertDatabaseHas('village_workers', [
        'id' => $otherWorker->id,
        'amount' => 99,
    ]);
});

test('edit village rejects invalid worker age range', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);

    $this->actingAs($user)
        ->patch(route('villages.update', $village), [
            'code' => $village->code,
            'name' => $village->name,
            'slug' => $village->slug,
            'status' => 'active',
            'workers' => [[
                'id' => null,
                'type' => 'full-time',
                'gender' => 'male',
                'age_min' => 40,
                'age_max' => 20,
                'amount' => 2,
                'notes' => null,
            ]],
        ])
        ->assertSessionHasErrors('workers.0.age_max');
});

test('edit village rejects language and stakeholder ids from another village', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $otherVillage = TourismVillage::factory()->create(['created_by' => $user->id]);
    $language = VillageAdministratorLanguage::query()->create([
        'village_id' => $otherVillage->id,
        'language_name' => 'Jepang',
        'proficiency_level' => 'basic',
        'amount' => 1,
    ]);
    $stakeholder = VillageStakeholder::query()->create([
        'village_id' => $otherVillage->id,
        'name' => 'Stakeholder Lain',
        'position' => 'Ketua',
    ]);

    $this->actingAs($user)
        ->patch(route('villages.update', $village), [
            'code' => $village->code,
            'name' => $village->name,
            'slug' => $village->slug,
            'status' => 'active',
            'administrator_languages' => [[
                'id' => $language->id,
                'language_name' => 'Jepang',
                'proficiency_level' => 'basic',
                'amount' => 1,
                'notes' => null,
            ]],
        ])
        ->assertSessionHasErrors('administrator_languages');

    $this->actingAs($user)
        ->patch(route('villages.update', $village), [
            'code' => $village->code,
            'name' => $village->name,
            'slug' => $village->slug,
            'status' => 'active',
            'stakeholders' => [[
                'id' => $stakeholder->id,
                'name' => 'Stakeholder Lain',
                'position' => 'Ketua',
            ]],
        ])
        ->assertSessionHasErrors('stakeholders');
});
