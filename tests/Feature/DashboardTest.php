<?php

use App\Models\AnnualTurnover;
use App\Models\PariwisataVillage;
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
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

function setModelTimestamp($model, Carbon $createdAt, ?Carbon $updatedAt = null)
{
    $model->timestamps = false;
    $model->forceFill([
        'created_at' => $createdAt,
        'updated_at' => $updatedAt ?? $createdAt,
    ])->save();
    $model->timestamps = true;

    return $model->refresh();
}

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('dashboard top turnovers use annual turnover data and recent assignments omit removed columns', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create(['created_by' => $user->id]);

    $villageA = TourismVillage::factory()->create(['name' => 'Desa A', 'created_by' => $user->id]);
    $villageB = TourismVillage::factory()->create(['name' => 'Desa B', 'created_by' => $user->id]);
    $villageC = TourismVillage::factory()->create(['name' => 'Desa C', 'created_by' => $user->id]);

    $umkmA = VillageUmkm::query()->create(['village_id' => $villageA->id, 'created_by' => $user->id, 'name' => 'UMKM A', 'product_category' => 'Kuliner']);
    $umkmB = VillageUmkm::query()->create(['village_id' => $villageB->id, 'created_by' => $user->id, 'name' => 'UMKM B', 'product_category' => 'Kerajinan']);
    $umkmC = VillageUmkm::query()->create(['village_id' => $villageC->id, 'created_by' => $user->id, 'name' => 'UMKM C', 'product_category' => 'Fashion']);

    AnnualTurnover::query()->create(['entity_type' => 'umkm', 'umkm_id' => $umkmA->id, 'pariwisata_id' => null, 'entity_key' => 'umkm-'.$umkmA->id, 'year' => 2024, 'value' => 15000000, 'created_by' => $user->id]);
    AnnualTurnover::query()->create(['entity_type' => 'umkm', 'umkm_id' => $umkmA->id, 'pariwisata_id' => null, 'entity_key' => 'umkm-'.$umkmA->id, 'year' => 2025, 'value' => 5000000, 'created_by' => $user->id]);
    AnnualTurnover::query()->create(['entity_type' => 'umkm', 'umkm_id' => $umkmB->id, 'pariwisata_id' => null, 'entity_key' => 'umkm-'.$umkmB->id, 'year' => 2025, 'value' => 12000000, 'created_by' => $user->id]);
    AnnualTurnover::query()->create(['entity_type' => 'umkm', 'umkm_id' => $umkmC->id, 'pariwisata_id' => null, 'entity_key' => 'umkm-'.$umkmC->id, 'year' => 2025, 'value' => 7000000, 'created_by' => $user->id]);

    $pariwisataA = PariwisataVillage::query()->create(['village_id' => $villageA->id, 'name' => 'Wisata A', 'is_active' => true]);
    $pariwisataB = PariwisataVillage::query()->create(['village_id' => $villageB->id, 'name' => 'Wisata B', 'is_active' => true]);
    $pariwisataC = PariwisataVillage::query()->create(['village_id' => $villageC->id, 'name' => 'Wisata C', 'is_active' => false]);

    AnnualTurnover::query()->create(['entity_type' => 'pariwisata', 'umkm_id' => null, 'pariwisata_id' => $pariwisataA->id, 'entity_key' => 'pariwisata-'.$pariwisataA->id, 'year' => 2025, 'value' => 25000000, 'created_by' => $user->id]);
    AnnualTurnover::query()->create(['entity_type' => 'pariwisata', 'umkm_id' => null, 'pariwisata_id' => $pariwisataB->id, 'entity_key' => 'pariwisata-'.$pariwisataB->id, 'year' => 2025, 'value' => 10000000, 'created_by' => $user->id]);
    AnnualTurnover::query()->create(['entity_type' => 'pariwisata', 'umkm_id' => null, 'pariwisata_id' => $pariwisataC->id, 'entity_key' => 'pariwisata-'.$pariwisataC->id, 'year' => 2025, 'value' => 9000000, 'created_by' => $user->id]);

    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $villageA->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
        'status' => 'assigned',
    ]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('top_umkm_turnovers.0.name', 'UMKM A')
            ->where('top_umkm_turnovers.0.score', 20000000)
            ->where('top_umkm_turnovers.1.name', 'UMKM B')
            ->where('top_pariwisata_turnovers.0.name', 'Wisata A')
            ->where('top_pariwisata_turnovers.0.score', 25000000)
            ->where('recent_assignments.0.code', $assignment->code)
            ->missing('recent_assignments.0.progress')
            ->missing('recent_assignments.0.enumerators')
        );
});

test('dashboard filters village report activity and status by selected year', function () {
    $user = User::factory()->create();
    $templateVillage = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'type' => 'village',
    ]);

    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $templateVillage->id,
        'aspect' => 'Atraksi',
        'code' => 'ATR-1',
        'question_text' => 'Q1',
        'sort_order' => 1,
    ]);
    $option4 = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'A',
        'sort_order' => 1,
    ]);
    $option2 = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 2,
        'label' => 'B',
        'sort_order' => 2,
    ]);

    $village2024 = TourismVillage::factory()->create([
        'name' => 'Desa Filter 2024',
        'created_by' => $user->id,
    ]);
    $village2025 = TourismVillage::factory()->create([
        'name' => 'Desa Filter 2025',
        'created_by' => $user->id,
    ]);

    $assignment2024 = VillageSurveyAssignment::factory()->create([
        'village_id' => $village2024->id,
        'survey_template_id' => $templateVillage->id,
        'assigned_by' => $user->id,
        'status' => 'approved',
    ]);
    setModelTimestamp($assignment2024, Carbon::create(2024, 2, 10, 10, 0, 0));

    $assignment2025 = VillageSurveyAssignment::factory()->create([
        'village_id' => $village2025->id,
        'survey_template_id' => $templateVillage->id,
        'assigned_by' => $user->id,
        'status' => 'in_progress',
    ]);
    setModelTimestamp($assignment2025, Carbon::create(2025, 3, 12, 10, 0, 0));

    SurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment2024->id,
        'survey_question_id' => $question->id,
        'survey_question_option_id' => $option4->id,
        'score' => 4,
        'aspect_snapshot' => 'Atraksi',
        'question_text_snapshot' => 'Q1',
        'option_label_snapshot' => 'A',
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
        'answered_at' => Carbon::create(2024, 2, 10, 12, 0, 0),
    ]);

    SurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment2025->id,
        'survey_question_id' => $question->id,
        'survey_question_option_id' => $option2->id,
        'score' => 2,
        'aspect_snapshot' => 'Atraksi',
        'question_text_snapshot' => 'Q2',
        'option_label_snapshot' => 'B',
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
        'answered_at' => Carbon::create(2025, 3, 12, 12, 0, 0),
    ]);

    $this->actingAs($user)
        ->get(route('dashboard', [
            'program_type' => 'KEMENPAR',
            'general_report_filter' => '2024',
            'activity_filter' => '2024',
            'status_filter' => '2024',
        ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('filters.program_type', 'KEMENPAR')
            ->where('filters.general_report_filter', '2024')
            ->where('general_report.total_assessment', 1)
            ->where('general_report.selesai', 1)
            ->where('general_report.dalam_proses', 0)
            ->where('general_report.belum_dimulai', 0)
            ->where('general_report.average_score', 80)
            ->where('aktivitas_survey.bar_data.1.name', 'Feb')
            ->where('aktivitas_survey.bar_data.1.selesai', 1)
            ->where('status_survey.total', 1)
            ->where('status_survey.pie_data.0.value', 1)
        );
});

test('dashboard filters umkm report and omset charts by selected year using annual turnover only', function () {
    $user = User::factory()->create();
    $templateUmkm = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'type' => 'umkm',
    ]);

    $village = TourismVillage::factory()->create([
        'name' => 'Desa UMKM',
        'created_by' => $user->id,
    ]);

    $question = UmkmSurveyQuestion::query()->create([
        'survey_template_id' => $templateUmkm->id,
        'criteria_code' => 'PROD',
        'criteria_name' => 'Produksi',
        'criteria_weight_percent' => 100,
        'question_number' => 1,
        'question_text' => 'Q1',
        'question_weight_percent' => 100,
        'max_score' => 4,
        'sort_order' => 1,
        'is_active' => true,
    ]);

    $umkm2024 = VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'name' => 'UMKM 2024',
        'product_category' => 'Kuliner',
        'annual_revenue' => 999999999,
    ]);
    setModelTimestamp($umkm2024, Carbon::create(2024, 4, 5, 10, 0, 0));

    $umkm2025 = VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'name' => 'UMKM 2025',
        'product_category' => 'Kerajinan',
        'annual_revenue' => 888888888,
    ]);
    setModelTimestamp($umkm2025, Carbon::create(2025, 5, 8, 10, 0, 0));

    UmkmSurveyAnswer::query()->create([
        'umkm_id' => $umkm2024->id,
        'umkm_assessment_question_id' => $question->id,
        'answered_by' => $user->id,
        'score' => 4,
        'criteria_code_snapshot' => 'PROD',
        'criteria_name_snapshot' => 'Produksi',
        'criteria_weight_percent_snapshot' => 100,
        'question_text_snapshot' => 'Q1',
        'question_weight_percent_snapshot' => 100,
        'max_score_snapshot' => 4,
        'normalized_score' => 1,
        'weighted_score' => 18,
        'answered_at' => Carbon::create(2024, 4, 5, 12, 0, 0),
    ]);

    UmkmSurveyAnswer::query()->create([
        'umkm_id' => $umkm2025->id,
        'umkm_assessment_question_id' => $question->id,
        'answered_by' => $user->id,
        'score' => 4,
        'criteria_code_snapshot' => 'PROD',
        'criteria_name_snapshot' => 'Produksi',
        'criteria_weight_percent_snapshot' => 100,
        'question_text_snapshot' => 'Q2',
        'question_weight_percent_snapshot' => 100,
        'max_score_snapshot' => 4,
        'normalized_score' => 1,
        'weighted_score' => 5,
        'answered_at' => Carbon::create(2025, 5, 8, 12, 0, 0),
    ]);

    $pariwisata = PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'Wisata Tahunan',
        'is_active' => true,
    ]);

    AnnualTurnover::query()->create([
        'entity_type' => 'umkm',
        'umkm_id' => $umkm2024->id,
        'pariwisata_id' => null,
        'entity_key' => 'umkm-'.$umkm2024->id,
        'year' => 2024,
        'value' => 1500000,
        'created_by' => $user->id,
    ]);
    AnnualTurnover::query()->create([
        'entity_type' => 'umkm',
        'umkm_id' => $umkm2025->id,
        'pariwisata_id' => null,
        'entity_key' => 'umkm-'.$umkm2025->id,
        'year' => 2025,
        'value' => 2000000,
        'created_by' => $user->id,
    ]);
    AnnualTurnover::query()->create([
        'entity_type' => 'pariwisata',
        'umkm_id' => null,
        'pariwisata_id' => $pariwisata->id,
        'entity_key' => 'pariwisata-'.$pariwisata->id,
        'year' => 2023,
        'value' => 4000000,
        'created_by' => $user->id,
    ]);
    AnnualTurnover::query()->create([
        'entity_type' => 'pariwisata',
        'umkm_id' => null,
        'pariwisata_id' => $pariwisata->id,
        'entity_key' => 'pariwisata-'.$pariwisata->id,
        'year' => 2025,
        'value' => 3000000,
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get(route('dashboard', [
            'program_type' => 'UMKM',
            'general_report_filter' => '2024',
            'umkm_year' => '2025',
            'wisata_year' => '2025',
        ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('general_report.total_assessment', 1)
            ->where('general_report.selesai', 1)
            ->where('general_report.average_score', 18)
            ->where('omset_charts.umkm.total', 2000000)
            ->where('omset_charts.wisata.total', 3000000)
            ->where('omset_charts.umkm.current_year', 2025)
            ->where('omset_charts.wisata.current_year', 2025)
            ->where('omset_charts.umkm.available_years.0', 2025)
            ->where('omset_charts.umkm.available_years.1', 2024)
            ->where('omset_charts.wisata.available_years.0', 2025)
            ->where('omset_charts.wisata.available_years.1', 2023)
        );
});
