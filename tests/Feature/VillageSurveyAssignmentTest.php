<?php

use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authenticated users can view survey assignments from database', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Survey Utama',
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'name' => 'Desa Assignment Testing',
        'created_by' => $user->id,
    ]);

    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
        'status' => 'assigned',
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/index')
            ->where('assignments.data.0.id', $assignment->id)
            ->where('assignments.data.0.village_name', $village->name)
            ->where('assignments.data.0.template_title', $template->title)
        );
});

test('authenticated users can create survey assignments', function () {
    $user = User::factory()->create();
    $submitter = User::factory()->create();
    $reviewer = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);

    $payload = [
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'status' => 'submitted',
        'assigned_by' => $user->id,
        'submitted_by' => $submitter->id,
        'reviewed_by' => $reviewer->id,
        'assigned_at' => '2026-05-28 09:00:00',
        'started_at' => '2026-05-28 10:00:00',
        'last_saved_at' => '2026-05-28 11:00:00',
        'submitted_at' => '2026-05-28 12:00:00',
        'reviewed_at' => '2026-05-28 13:00:00',
    ];

    $this->actingAs($user)
        ->post(route('survey-assignments.store'), $payload)
        ->assertRedirect();

    $this->assertDatabaseHas('village_survey_assignments', [
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'status' => 'submitted',
        'assigned_by' => $user->id,
        'submitted_by' => $submitter->id,
        'reviewed_by' => $reviewer->id,
    ]);
});

test('survey assignment village must be unique', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);

    VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.store'), [
            'village_id' => $village->id,
            'survey_template_id' => $template->id,
            'status' => 'assigned',
            'assigned_by' => $user->id,
        ])
        ->assertInvalid(['village_id']);
});

test('authenticated users can take survey with template questions grouped by aspect', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Assessment Desa',
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'name' => 'Desa Survey Testing',
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
        'status' => 'in_progress',
    ]);

    $amenitasQuestion = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-001',
        'question_text' => 'Bagaimana kondisi fasilitas umum?',
        'document_hint' => 'Unggah foto toilet dan parkir.',
        'sort_order' => 1,
    ]);
    SurveyQuestionOption::query()->create([
        'survey_question_id' => $amenitasQuestion->id,
        'score' => 1,
        'label' => 'Kurang tersedia',
        'sort_order' => 1,
    ]);
    SurveyQuestionOption::query()->create([
        'survey_question_id' => $amenitasQuestion->id,
        'score' => 2,
        'label' => 'Tersedia sebagian',
        'sort_order' => 2,
    ]);

    SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Atraksi',
        'code' => 'AT-001',
        'question_text' => 'Bagaimana kualitas atraksi utama?',
        'document_hint' => null,
        'sort_order' => 2,
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.take-survey', $assignment))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey/take-survey')
            ->where('assignment.id', $assignment->id)
            ->where('assignment.village.name', $village->name)
            ->where('template.id', $template->id)
            ->where('template.title', 'Template Assessment Desa')
            ->where('summary.total_aspects', 2)
            ->where('summary.total_questions', 2)
            ->where('summary.total_options', 2)
            ->where('aspects.0.name', 'Amenitas')
            ->where('aspects.0.questions.0.code', 'AM-001')
            ->where('aspects.0.questions.0.options.0.label', 'Kurang tersedia')
            ->where('aspects.1.name', 'Atraksi')
        );
});
