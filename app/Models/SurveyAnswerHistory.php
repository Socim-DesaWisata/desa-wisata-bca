<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'survey_answer_id', 'village_survey_assignment_id', 'survey_question_id', 'actor_id',
    'action', 'old_survey_question_option_id', 'new_survey_question_option_id',
    'old_score', 'new_score', 'old_option_label', 'new_option_label',
])]
class SurveyAnswerHistory extends Model
{
    use HasFactory;

    public const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'old_score' => 'decimal:2',
            'new_score' => 'decimal:2',
            'created_at' => 'datetime',
        ];
    }

    public function answer(): BelongsTo
    {
        return $this->belongsTo(SurveyAnswer::class, 'survey_answer_id');
    }

    public function assignment(): BelongsTo
    {
        return $this->belongsTo(VillageSurveyAssignment::class, 'village_survey_assignment_id');
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(SurveyQuestion::class, 'survey_question_id');
    }

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    public function oldOption(): BelongsTo
    {
        return $this->belongsTo(SurveyQuestionOption::class, 'old_survey_question_option_id');
    }

    public function newOption(): BelongsTo
    {
        return $this->belongsTo(SurveyQuestionOption::class, 'new_survey_question_option_id');
    }
}
