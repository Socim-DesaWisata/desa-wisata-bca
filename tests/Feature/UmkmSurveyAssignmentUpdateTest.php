<?php

use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageUmkm;
use App\Models\VillageUmkmCategory;
use App\Models\VillageUmkmDocument;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

test('umkm update can replace product photo without duplicating existing categories', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'status' => 'published',
        'title' => 'Assessment Pelaku UMKM',
        'type' => 'umkm',
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::query()->create([
        'code' => 'ASG-UMKM-001',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'status' => 'in_progress',
        'assigned_by' => $user->id,
        'assigned_at' => now(),
    ]);
    $umkm = VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'data_collector_id' => $user->id,
        'business_owner_name' => 'Pemilik Tani',
        'name' => 'UMKM Tani',
        'product_category' => 'Pertanian',
        'product_photo_path' => 'umkms/1/products/old-photo.jpg',
    ]);
    VillageUmkmCategory::query()->create([
        'village_umkm_id' => $umkm->id,
        'category' => 'pertanian',
    ]);

    $this->actingAs($user)
        ->patch(route('survey-assignments.umkm.update', [$assignment, $umkm]), [
            'name' => 'UMKM Tani',
            'business_owner_name' => 'Pemilik Tani',
            'categories' => ['pertanian'],
            'annual_turnovers' => [],
            'annual_worker_stats' => [],
            'annual_worker_training_stats' => [],
            'product_photo' => UploadedFile::fake()->image('new-photo.jpg'),
        ])
        ->assertRedirect();

    expect(VillageUmkmCategory::query()
        ->where('village_umkm_id', $umkm->id)
        ->pluck('category')
        ->all())
        ->toBe(['pertanian']);

    expect(VillageUmkmCategory::withTrashed()
        ->where('village_umkm_id', $umkm->id)
        ->count())
        ->toBe(1);

    expect($umkm->fresh()->product_photo_path)->not->toBe('umkms/1/products/old-photo.jpg');
    Storage::disk('public')->assertExists($umkm->fresh()->product_photo_path);
});


test('umkm show edit values annual revenue is normalized without decimal suffix', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'status' => 'published',
        'title' => 'Assessment Pelaku UMKM',
        'type' => 'umkm',
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::query()->create([
        'code' => 'ASG-UMKM-002',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'status' => 'in_progress',
        'assigned_by' => $user->id,
        'assigned_at' => now(),
    ]);
    $umkm = VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'data_collector_id' => $user->id,
        'business_owner_name' => 'Pemilik Omset',
        'name' => 'UMKM Omset',
        'annual_revenue' => 15000000,
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.umkm.show', [$assignment, $umkm]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/show-umkm')
            ->where('edit_values.annual_revenue', '15000000')
        );
});

test('umkm document upload accepts files larger than five megabytes up to fifty megabytes', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'status' => 'published',
        'title' => 'Assessment Pelaku UMKM',
        'type' => 'umkm',
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::query()->create([
        'code' => 'ASG-UMKM-003',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'status' => 'in_progress',
        'assigned_by' => $user->id,
        'assigned_at' => now(),
    ]);
    $umkm = VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'data_collector_id' => $user->id,
        'business_owner_name' => 'Pemilik Dokumen',
        'name' => 'UMKM Dokumen',
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.umkm.documents.store', [$assignment, $umkm]), [
            'document_name' => 'Dokumen Legalitas',
            'file' => UploadedFile::fake()->create('legalitas.pdf', 6000, 'application/pdf'),
        ])
        ->assertRedirect()
        ->assertSessionHasNoErrors();

    $document = VillageUmkmDocument::query()->firstOrFail();

    expect($document->document_name)->toBe('Dokumen Legalitas');
    Storage::disk('public')->assertExists($document->file_path);
});
