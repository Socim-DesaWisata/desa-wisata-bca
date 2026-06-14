<?php

use App\Models\AnnualTurnover;
use App\Models\PariwisataAnnualVisitor;
use App\Models\PariwisataSurveyAnswer;
use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataSuveyOption;
use App\Models\PariwisataVillage;
use App\Models\PariwisataVillageCategory;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\UmkmSurveyAnswer;
use App\Models\UmkmSurveyQuestion;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageUmkm;
use App\Models\VillageUmkmCategory;
use App\Models\VillageUmkmDocument;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('survey assignment can be soft deleted and restored from trash index', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'status' => 'published',
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);

    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-DEL-001',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);

    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-001',
        'question_text' => 'Bagaimana fasilitas?',
        'sort_order' => 1,
    ]);

    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 3,
        'label' => 'Baik',
        'sort_order' => 1,
    ]);

    $answer = SurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'survey_question_id' => $question->id,
        'survey_question_option_id' => $option->id,
        'score' => 3,
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->delete(route('survey-assignments.destroy', $assignment))
        ->assertRedirect();

    $this->assertSoftDeleted('village_survey_assignments', ['id' => $assignment->id]);
    $this->assertSoftDeleted('survey_answers', ['id' => $answer->id]);

    $this->actingAs($user)
        ->get(route('survey-assignments', ['view' => 'trash']))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/index')
            ->where('filters.view', 'trash')
            ->where('assignments.data.0.id', $assignment->id)
            ->where('assignments.data.0.is_trashed', true)
        );

    $this->actingAs($user)
        ->patch(route('survey-assignments.restore', $assignment->code))
        ->assertRedirect();

    expect($assignment->fresh()->trashed())->toBeFalse();
    expect($answer->fresh()->trashed())->toBeFalse();
});

test('umkm can be soft deleted and restored from trash index', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'status' => 'published',
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);

    $umkm = VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'data_collector_id' => $user->id,
        'business_owner_name' => 'Pemilik UMKM',
        'name' => 'UMKM Hapus',
        'product_category' => 'Kuliner',
        'has_exported' => true,
    ]);

    $question = UmkmSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'criteria_code' => 'UMKM-1',
        'criteria_name' => 'Kriteria 1',
        'criteria_weight_percent' => 100,
        'question_number' => 1,
        'question_text' => 'Bagaimana UMKM?',
        'question_weight_percent' => 100,
        'max_score' => 4,
        'sort_order' => 1,
    ]);

    $document = VillageUmkmDocument::query()->create([
        'village_umkm_id' => $umkm->id,
        'uploaded_by' => $user->id,
        'document_name' => 'NIB',
        'file_path' => 'umkm/nib.pdf',
        'mime_type' => 'application/pdf',
        'file_size' => 1024,
    ]);

    $category = VillageUmkmCategory::query()->create([
        'village_umkm_id' => $umkm->id,
        'category' => 'Makanan',
    ]);

    $answer = UmkmSurveyAnswer::query()->create([
        'umkm_id' => $umkm->id,
        'umkm_assessment_question_id' => $question->id,
        'answered_by' => $user->id,
        'score' => 4,
    ]);

    $turnover = AnnualTurnover::query()->create([
        'entity_type' => 'umkm',
        'entity_key' => 'umkm-' . $umkm->id,
        'umkm_id' => $umkm->id,
        'year' => 2025,
        'value' => 1000000,
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->delete(route('umkm.destroy', $umkm))
        ->assertRedirect();

    $this->assertSoftDeleted('village_umkms', ['id' => $umkm->id]);
    $this->assertSoftDeleted('village_umkm_documents', ['id' => $document->id]);
    $this->assertSoftDeleted('village_umkm_categories', ['id' => $category->id]);
    $this->assertSoftDeleted('umkm_survey_answers', ['id' => $answer->id]);
    $this->assertSoftDeleted('annual_turnovers', ['id' => $turnover->id]);

    $this->actingAs($user)
        ->get(route('umkm', ['view' => 'trash']))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('umkm/index')
            ->where('filters.view', 'trash')
            ->where('umkms.data.0.id', $umkm->id)
            ->where('umkms.data.0.is_trashed', true)
        );

    $this->actingAs($user)
        ->patch(route('umkm.restore', $umkm->id))
        ->assertRedirect();

    expect($umkm->fresh()->trashed())->toBeFalse();
    expect($document->fresh()->trashed())->toBeFalse();
    expect($category->fresh()->trashed())->toBeFalse();
    expect($answer->fresh()->trashed())->toBeFalse();
    expect($turnover->fresh()->trashed())->toBeFalse();
});

test('pariwisata can be soft deleted and restored from trash index', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'status' => 'published',
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-PAR-DEL-001',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);

    $pariwisata = PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'Wisata Hapus',
        'operational_days' => 'Senin-Minggu',
        'operational_hours' => '08.00-17.00',
        'address' => 'Jl. Wisata',
        'person_in_charge_name' => 'PIC Wisata',
        'person_in_charge_phone' => '08123',
        'is_active' => true,
    ]);

    $question = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'indicator_code' => 'PRW-1',
        'indicator_name' => 'Indikator 1',
        'sort_order' => 1,
    ]);

    $option = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $question->id,
        'score' => 5,
        'level' => 'A',
        'label' => 'Sangat Baik',
        'description' => 'Deskripsi',
        'sort_order' => 1,
    ]);

    $category = PariwisataVillageCategory::query()->create([
        'pariwisata_village_id' => $pariwisata->id,
        'category' => 'wisata_alam',
    ]);

    $answer = PariwisataSurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'pariwisata_survey_question_id' => $question->id,
        'pariwisata_suvey_option_id' => $option->id,
        'score' => 5,
        'answered_by' => $user->id,
    ]);

    $visitor = PariwisataAnnualVisitor::query()->create([
        'pariwisata_id' => $pariwisata->id,
        'year' => 2025,
        'value' => 120,
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->delete(route('pariwisata.destroy', $pariwisata))
        ->assertRedirect();

    $this->assertSoftDeleted('pariwisata_village_table', ['id' => $pariwisata->id]);
    $this->assertSoftDeleted('pariwisata_village_category', ['id' => $category->id]);
    $this->assertSoftDeleted('pariwisata_annual_visitors', ['id' => $visitor->id]);
    expect($answer->fresh()->trashed())->toBeFalse();

    $this->actingAs($user)
        ->get(route('pariwisata', ['view' => 'trash']))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('pariwisata/index')
            ->where('filters.view', 'trash')
            ->where('pariwisata.data.0.id', $pariwisata->id)
            ->where('pariwisata.data.0.is_trashed', true)
        );

    $this->actingAs($user)
        ->patch(route('pariwisata.restore', $pariwisata->id))
        ->assertRedirect();

    expect($pariwisata->fresh()->trashed())->toBeFalse();
    expect($category->fresh()->trashed())->toBeFalse();
    expect($answer->fresh()->trashed())->toBeFalse();
    expect($visitor->fresh()->trashed())->toBeFalse();
});


