<?php

use App\Models\PariwisataSurveyAnswer;
use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataSuveyOption;
use App\Models\PariwisataVillage;
use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\UmkmSurveyQuestion;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('create umkm page uses latest published umkm template by type not title', function () {
    $user = User::factory()->create();
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-UMKM-TYPE-001',
        'village_id' => $village->id,
        'survey_template_id' => SurveyTemplate::factory()->create([
            'created_by' => $user->id,
            'type' => 'village',
        ])->id,
        'assigned_by' => $user->id,
    ]);

    SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'type' => 'umkm',
        'title' => 'Assessment Pelaku UMKM',
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);

    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'type' => 'umkm',
        'title' => 'Template UMKM Revisi Baru',
        'status' => 'published',
        'published_at' => now(),
    ]);

    UmkmSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'criteria_code' => 'A',
        'criteria_name' => 'Kriteria A',
        'criteria_weight_percent' => 100,
        'question_number' => 1,
        'question_text' => 'Pertanyaan UMKM terbaru',
        'question_weight_percent' => 100,
        'max_score' => 100,
        'sort_order' => 1,
        'is_active' => true,
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.create-umkm', $assignment))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/create-umkm')
            ->where('template.id', $template->id)
            ->where('template.title', 'Template UMKM Revisi Baru')
            ->where('criteria_groups.0.questions.0.question_text', 'Pertanyaan UMKM terbaru')
        );
});

test('take pariwisata survey page uses latest published pariwisata template by type not title', function () {
    $user = User::factory()->create();
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-PAR-TYPE-001',
        'village_id' => $village->id,
        'survey_template_id' => SurveyTemplate::factory()->create([
            'created_by' => $user->id,
            'type' => 'village',
        ])->id,
        'assigned_by' => $user->id,
    ]);

    SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'type' => 'pariwisata',
        'title' => 'Matrix Sertifikasi Desa Wisata Berkelanjutan - Pariwisata',
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);

    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'type' => 'pariwisata',
        'title' => 'Template Pariwisata Revisi Baru',
        'status' => 'published',
        'published_at' => now(),
    ]);

    $question = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'category_code' => 'A',
        'category_name' => 'Kategori A',
        'sub_category_code' => 'A.a',
        'sub_category_name' => 'Sub A',
        'criteria_code' => 'A.1',
        'criteria_name' => 'Kriteria A1',
        'indicator_code' => 'A.1.a',
        'indicator_name' => 'Indikator Pariwisata Terbaru',
        'input_type' => 'single_choice',
        'sort_order' => 1,
        'is_active' => true,
    ]);
    PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $question->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Sangat Baik',
        'description' => 'Desc',
        'sort_order' => 1,
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.pariwisata.take-survey', $assignment))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/take-survey-pariwisata')
            ->where('template.id', $template->id)
            ->where('template.title', 'Template Pariwisata Revisi Baru')
            ->where('sub_categories.0.questions.0.indicator_name', 'Indikator Pariwisata Terbaru')
        );
});

test('store umkm survey request validates against active umkm template by type', function () {
    $user = User::factory()->create();
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-UMKM-TYPE-002',
        'village_id' => $village->id,
        'survey_template_id' => SurveyTemplate::factory()->create([
            'created_by' => $user->id,
            'type' => 'village',
        ])->id,
        'assigned_by' => $user->id,
    ]);

    $legacyTemplate = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'type' => 'umkm',
        'title' => 'Assessment Pelaku UMKM',
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);
    $legacyQuestion = UmkmSurveyQuestion::query()->create([
        'survey_template_id' => $legacyTemplate->id,
        'criteria_code' => 'A',
        'criteria_name' => 'Legacy',
        'criteria_weight_percent' => 100,
        'question_number' => 1,
        'question_text' => 'Pertanyaan lama',
        'question_weight_percent' => 100,
        'max_score' => 100,
        'sort_order' => 1,
        'is_active' => true,
    ]);

    $activeTemplate = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'type' => 'umkm',
        'title' => 'Template UMKM Aktif Baru',
        'status' => 'published',
        'published_at' => now(),
    ]);
    UmkmSurveyQuestion::query()->create([
        'survey_template_id' => $activeTemplate->id,
        'criteria_code' => 'A',
        'criteria_name' => 'Aktif',
        'criteria_weight_percent' => 100,
        'question_number' => 1,
        'question_text' => 'Pertanyaan aktif',
        'question_weight_percent' => 100,
        'max_score' => 100,
        'sort_order' => 1,
        'is_active' => true,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.create-umkm.store', $assignment), [
            'name' => 'UMKM Baru',
            'business_owner_name' => 'Pemilik',
            'categories' => ['kuliner'],
            'answers' => [
                ['question_id' => $legacyQuestion->id, 'score' => 80],
            ],
            'annual_turnovers' => [],
            'annual_worker_stats' => [],
            'annual_worker_training_stats' => [],
        ])
        ->assertInvalid(['answers']);
});

test('pariwisata index score uses active pariwisata template by type not title', function () {
    $user = User::factory()->create();
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-PAR-TYPE-002',
        'village_id' => $village->id,
        'survey_template_id' => SurveyTemplate::factory()->create([
            'created_by' => $user->id,
            'type' => 'village',
        ])->id,
        'assigned_by' => $user->id,
    ]);
    $pariwisata = PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'Wisata Type',
        'is_active' => true,
    ]);

    SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'type' => 'pariwisata',
        'title' => 'Matrix Sertifikasi Desa Wisata Berkelanjutan - Pariwisata',
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);

    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'type' => 'pariwisata',
        'title' => 'Template Pariwisata Aktif Baru',
        'status' => 'published',
        'published_at' => now(),
    ]);

    $question = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'indicator_code' => 'A.1.a',
        'indicator_name' => 'Indikator Baru',
        'input_type' => 'single_choice',
        'sort_order' => 1,
        'is_active' => true,
    ]);
    $option = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $question->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Sangat Baik',
        'description' => 'Desc',
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
        ->get(route('pariwisata'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('pariwisata/index')
            ->where('pariwisata.data.0.id', $pariwisata->id)
            ->where('pariwisata.data.0.total_score', 100)
        );
});
