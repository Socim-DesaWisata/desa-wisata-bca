<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['survey_template_id', 'aspect', 'code', 'question_text', 'document_hint', 'sort_order'])]
class SurveyQuestion extends Model
{
    use HasFactory, SoftDeletes;

    public function template(): BelongsTo
    {
        return $this->belongsTo(SurveyTemplate::class, 'survey_template_id');
    }

    public function options(): HasMany
    {
        return $this->hasMany(SurveyQuestionOption::class, 'survey_question_id');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(SurveyAnswer::class, 'survey_question_id');
    }

    public function histories(): HasMany
    {
        return $this->hasMany(SurveyAnswerHistory::class, 'survey_question_id');
    }
}
