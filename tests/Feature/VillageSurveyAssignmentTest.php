<?php

use App\Models\SurveyAnswerDocument;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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

test('authenticated users can view survey assignment detail from database', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Detail Desa',
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'name' => 'Desa Detail Testing',
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
        'status' => 'in_progress',
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-001',
        'question_text' => 'Bagaimana kondisi fasilitas umum?',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'Baik dan terdokumentasi',
        'sort_order' => 4,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.take-survey.store', $assignment), [
            'answers' => [
                [
                    'question_id' => $question->id,
                    'survey_question_option_id' => $option->id,
                    'documents' => [
                        UploadedFile::fake()->create('lampiran.pdf', 256, 'application/pdf'),
                    ],
                ],
            ],
        ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.show', $assignment))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/show')
            ->where('assignment.id', $assignment->id)
            ->where('assignment.village.name', $village->name)
            ->where('assignment.template.title', $template->title)
            ->where('summary.total_questions', 1)
            ->where('summary.answered_questions', 1)
            ->where('summary.total_documents', 1)
            ->where('aspects.0.name', 'Amenitas')
            ->where('aspects.0.questions.0.answer.score_label', 'Baik dan terdokumentasi')
            ->where('aspects.0.questions.0.answer.documents.0.file_name', 'lampiran.pdf')
        );
});

test('authenticated users can save survey answers with multiple documents', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
        'status' => 'assigned',
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-001',
        'question_text' => 'Bagaimana kondisi fasilitas umum?',
        'document_hint' => 'Unggah dokumen pendukung.',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => str_repeat('Label jawaban panjang. ', 20),
        'sort_order' => 4,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.take-survey.store', $assignment), [
            'answers' => [
                [
                    'question_id' => $question->id,
                    'survey_question_option_id' => $option->id,
                    'documents' => [
                        UploadedFile::fake()->image('toilet.jpg'),
                        UploadedFile::fake()->create('lampiran.pdf', 256, 'application/pdf'),
                    ],
                ],
            ],
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('survey_answers', [
        'village_survey_assignment_id' => $assignment->id,
        'survey_question_id' => $question->id,
        'survey_question_option_id' => $option->id,
        'option_label_snapshot' => $option->label,
        'score' => 4,
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
    ]);
    $this->assertDatabaseCount('survey_answer_documents', 2);

    SurveyAnswerDocument::query()
        ->pluck('file_path')
        ->each(fn (string $path) => Storage::disk('public')->assertExists($path));
    expect($assignment->fresh()->status)->toBe('in_progress');
});

test('authenticated users can delete survey answer documents', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'question_text' => 'Bagaimana kondisi fasilitas umum?',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'Baik',
        'sort_order' => 4,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.take-survey.store', $assignment), [
            'answers' => [
                [
                    'question_id' => $question->id,
                    'survey_question_option_id' => $option->id,
                    'documents' => [
                        UploadedFile::fake()->image('toilet.jpg'),
                    ],
                ],
            ],
        ]);

    $document = SurveyAnswerDocument::query()->firstOrFail();
    Storage::disk('public')->assertExists($document->file_path);

    $this->actingAs($user)
        ->delete(route('survey-assignments.take-survey.documents.destroy', [$assignment, $document]))
        ->assertRedirect();

    Storage::disk('public')->assertMissing($document->file_path);
    $this->assertSoftDeleted('survey_answer_documents', [
        'id' => $document->id,
    ]);
});
