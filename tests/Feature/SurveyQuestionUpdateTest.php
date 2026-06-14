<?php

use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin can update village question options without deleting referenced options', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $template = SurveyTemplate::factory()->create([
        'type' => 'village',
        'status' => 'published',
        'created_by' => $admin->id,
    ]);

    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-001',
        'question_text' => 'Apakah fasilitas umum tersedia?',
        'document_hint' => 'Lampirkan foto fasilitas.',
        'sort_order' => 1,
    ]);

    $options = collect([
        1 => 'Tidak ada',
        2 => 'Kurang',
        3 => 'Baik',
        4 => 'Sangat baik',
    ])->map(function (string $label, int $score) use ($question) {
        return SurveyQuestionOption::query()->create([
            'survey_question_id' => $question->id,
            'score' => $score,
            'label' => $label,
            'sort_order' => $score,
        ]);
    });

    $village = TourismVillage::factory()->create([
        'created_by' => $admin->id,
    ]);

    $assignment = VillageSurveyAssignment::query()->create([
        'code' => 'ASG-DESA-001',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'status' => 'in_progress',
        'assigned_by' => $admin->id,
        'assigned_at' => now(),
    ]);

    $selectedOption = $options->firstWhere('score', 2);

    $answer = SurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'survey_question_id' => $question->id,
        'survey_question_option_id' => $selectedOption->id,
        'score' => $selectedOption->score,
        'aspect_snapshot' => $question->aspect,
        'question_text_snapshot' => $question->question_text,
        'option_label_snapshot' => $selectedOption->label,
        'answered_by' => $admin->id,
        'last_edited_by' => $admin->id,
        'answered_at' => now(),
        'last_edited_at' => now(),
    ]);

    $this->actingAs($admin)
        ->patch(route('questions.update', $question), [
            'aspect' => 'Amenitas Baru',
            'code' => 'AM-001',
            'question_text' => 'Apakah fasilitas umum tersedia dan terawat?',
            'document_hint' => 'Lampirkan foto terbaru fasilitas.',
            'sort_order' => 1,
            'options' => [
                'Tidak tersedia',
                'Kurang memadai',
                'Baik',
                'Sangat baik',
            ],
        ])
        ->assertRedirect();

    expect($answer->fresh()->survey_question_option_id)->toBe($selectedOption->id)
        ->and($selectedOption->fresh()->label)->toBe('Kurang memadai')
        ->and($selectedOption->fresh()->deleted_at)->toBeNull()
        ->and(SurveyQuestionOption::query()->where('survey_question_id', $question->id)->count())->toBe(4)
        ->and($question->fresh()->question_text)->toBe('Apakah fasilitas umum tersedia dan terawat?');
});
