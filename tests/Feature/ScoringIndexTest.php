<?php

use App\Models\PariwisataSurveyAnswer;
use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataSuveyOption;
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

uses(RefreshDatabase::class);

test('survey assignment index score uses total answer score divided by total max score', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'status' => 'published',
    ]);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-SCORE-001',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);

    $firstQuestion = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-001',
        'question_text' => 'Pertanyaan pertama',
        'sort_order' => 1,
    ]);
    $firstOption = SurveyQuestionOption::query()->create([
        'survey_question_id' => $firstQuestion->id,
        'score' => 2,
        'label' => 'Cukup',
        'sort_order' => 1,
    ]);
    SurveyQuestionOption::query()->create([
        'survey_question_id' => $firstQuestion->id,
        'score' => 4,
        'label' => 'Baik',
        'sort_order' => 2,
    ]);

    $secondQuestion = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Atraksi',
        'code' => 'AT-001',
        'question_text' => 'Pertanyaan kedua',
        'sort_order' => 2,
    ]);
    $secondOption = SurveyQuestionOption::query()->create([
        'survey_question_id' => $secondQuestion->id,
        'score' => 5,
        'label' => 'Sangat Baik',
        'sort_order' => 1,
    ]);

    SurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'survey_question_id' => $firstQuestion->id,
        'survey_question_option_id' => $firstOption->id,
        'score' => 2,
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
    ]);
    SurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'survey_question_id' => $secondQuestion->id,
        'survey_question_option_id' => $secondOption->id,
        'score' => 5,
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/index')
            ->where('assignments.data.0.id', $assignment->id)
            ->where('assignments.data.0.total_score', 77.8)
        );
});

test('umkm index score uses stored weighted score', function () {
    $user = User::factory()->create();
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $umkm = VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'data_collector_id' => $user->id,
        'business_owner_name' => 'Pemilik UMKM',
        'name' => 'UMKM Skor',
        'product_category' => 'Kuliner',
    ]);
    $firstQuestion = UmkmSurveyQuestion::query()->create([
        'survey_template_id' => SurveyTemplate::factory()->create(['created_by' => $user->id])->id,
        'criteria_code' => 'A',
        'criteria_name' => 'Kriteria A',
        'criteria_weight_percent' => 40,
        'question_number' => 1,
        'question_text' => 'Pertanyaan A',
        'question_weight_percent' => 40,
        'max_score' => 100,
    ]);
    $secondQuestion = UmkmSurveyQuestion::query()->create([
        'survey_template_id' => $firstQuestion->survey_template_id,
        'criteria_code' => 'B',
        'criteria_name' => 'Kriteria B',
        'criteria_weight_percent' => 60,
        'question_number' => 2,
        'question_text' => 'Pertanyaan B',
        'question_weight_percent' => 60,
        'max_score' => 100,
    ]);

    UmkmSurveyAnswer::query()->create([
        'umkm_id' => $umkm->id,
        'umkm_assessment_question_id' => $firstQuestion->id,
        'score' => 80,
        'max_score_snapshot' => 100,
        'question_weight_percent_snapshot' => 40,
        'weighted_score' => 31,
        'answered_by' => $user->id,
    ]);
    UmkmSurveyAnswer::query()->create([
        'umkm_id' => $umkm->id,
        'umkm_assessment_question_id' => $secondQuestion->id,
        'score' => 50,
        'max_score_snapshot' => 100,
        'question_weight_percent_snapshot' => 60,
        'weighted_score' => 30,
        'answered_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get(route('umkm'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('umkm/index')
            ->where('umkms.data.0.id', $umkm->id)
            ->where('umkms.data.0.total_score', 61)
        );
});

test('pariwisata index score uses total answer score divided by active template max score', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Matrix Sertifikasi Desa Wisata Berkelanjutan - Pariwisata',
        'created_by' => $user->id,
        'status' => 'published',
    ]);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $pariwisata = PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'Wisata Skor',
        'created_by' => $user->id,
        'is_active' => true,
    ]);

    $firstQuestion = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'category_code' => 'A',
        'category_name' => 'Kategori A',
        'criteria_code' => 'A.1',
        'criteria_name' => 'Kriteria A1',
        'indicator_code' => 'A.1.a',
        'indicator_name' => 'Indikator A',
        'input_type' => 'single_choice',
        'sort_order' => 1,
        'is_active' => true,
    ]);
    $firstOption = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $firstQuestion->id,
        'score' => 3,
        'level' => 'B',
        'label' => 'Baik',
        'description' => 'Baik',
        'sort_order' => 1,
    ]);
    PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $firstQuestion->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Sangat Baik',
        'description' => 'Sangat Baik',
        'sort_order' => 2,
    ]);

    $secondQuestion = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'category_code' => 'B',
        'category_name' => 'Kategori B',
        'criteria_code' => 'B.1',
        'criteria_name' => 'Kriteria B1',
        'indicator_code' => 'B.1.a',
        'indicator_name' => 'Indikator B',
        'input_type' => 'single_choice',
        'sort_order' => 2,
        'is_active' => true,
    ]);
    $secondOption = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $secondQuestion->id,
        'score' => 1,
        'level' => 'D',
        'label' => 'Kurang',
        'description' => 'Kurang',
        'sort_order' => 1,
    ]);
    PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $secondQuestion->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Sangat Baik',
        'description' => 'Sangat Baik',
        'sort_order' => 2,
    ]);

    PariwisataSurveyAnswer::query()->create([
        'pariwisata_village_id' => $pariwisata->id,
        'pariwisata_survey_question_id' => $firstQuestion->id,
        'pariwisata_suvey_option_id' => $firstOption->id,
        'score' => 3,
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
    ]);
    PariwisataSurveyAnswer::query()->create([
        'pariwisata_village_id' => $pariwisata->id,
        'pariwisata_survey_question_id' => $secondQuestion->id,
        'pariwisata_suvey_option_id' => $secondOption->id,
        'score' => 1,
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get(route('pariwisata'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('pariwisata/index')
            ->where('pariwisata.data.0.id', $pariwisata->id)
            ->where('pariwisata.data.0.total_score', 50)
        );
});
