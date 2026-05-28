<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['survey_question_id', 'score', 'label', 'sort_order'])]
class SurveyQuestionOption extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'score' => 'decimal:2',
        ];
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(SurveyQuestion::class, 'survey_question_id');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(SurveyAnswer::class, 'survey_question_option_id');
    }

    public function oldAnswerHistories(): HasMany
    {
        return $this->hasMany(SurveyAnswerHistory::class, 'old_survey_question_option_id');
    }

    public function newAnswerHistories(): HasMany
    {
        return $this->hasMany(SurveyAnswerHistory::class, 'new_survey_question_option_id');
    }
}
