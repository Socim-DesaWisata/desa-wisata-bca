<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'village_survey_assignment_id', 'survey_question_id', 'survey_question_option_id',
    'score', 'aspect_snapshot', 'question_text_snapshot', 'option_label_snapshot',
    'answered_by', 'last_edited_by', 'answered_at', 'last_edited_at',
])]
class SurveyAnswer extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'answered_at' => 'datetime',
            'last_edited_at' => 'datetime',
        ];
    }

    public function assignment(): BelongsTo
    {
        return $this->belongsTo(VillageSurveyAssignment::class, 'village_survey_assignment_id');
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(SurveyQuestion::class, 'survey_question_id');
    }

    public function option(): BelongsTo
    {
        return $this->belongsTo(SurveyQuestionOption::class, 'survey_question_option_id');
    }

    public function answeredBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'answered_by');
    }

    public function lastEditedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'last_edited_by');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(SurveyAnswerDocument::class, 'survey_answer_id');
    }

    public function histories(): HasMany
    {
        return $this->hasMany(SurveyAnswerHistory::class, 'survey_answer_id');
    }
}
