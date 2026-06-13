<?php

use App\Models\PariwisataSurveyAnswer;
use App\Models\VillageSurveyAssignment;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

it('defines pariwisata survey answers migration with village survey assignment foreign key', function () {
    $contents = file_get_contents(database_path('migrations/2026_06_05_000008_create_pariwisata_survey_answers_table.php'));

    expect($contents)->toContain("\$table->foreignId('village_survey_assignment_id');");
    expect($contents)->toContain("\$table->foreign('village_survey_assignment_id', 'ps_answer_assignment_fk')");
    expect($contents)->toContain("\$table->index('village_survey_assignment_id', 'ps_answer_pariwisata_idx');");
    expect($contents)->toContain("['village_survey_assignment_id', 'pariwisata_survey_question_id']");
    expect($contents)->toContain("'ps_answer_village_question_unique'");

    expect($contents)->not->toContain('pariwisata_village_id');
});

it('defines pariwisata survey answer model around village survey assignments', function () {
    $answer = new PariwisataSurveyAnswer();

    expect($answer->getFillable())
        ->toContain('village_survey_assignment_id')
        ->not->toContain('pariwisata_village_id');

    $assignmentRelation = $answer->assignment();

    expect($assignmentRelation)->toBeInstanceOf(BelongsTo::class);
    expect($assignmentRelation->getForeignKeyName())->toBe('village_survey_assignment_id');
    expect($assignmentRelation->getRelated()::class)->toBe(VillageSurveyAssignment::class);

    $assignment = new VillageSurveyAssignment();
    $answersRelation = $assignment->pariwisataSurveyAnswers();

    expect($answersRelation)->toBeInstanceOf(HasMany::class);
    expect($answersRelation->getForeignKeyName())->toBe('village_survey_assignment_id');
    expect($answersRelation->getRelated()::class)->toBe(PariwisataSurveyAnswer::class);
});
