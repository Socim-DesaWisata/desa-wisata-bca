<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'survey_template_id', 'criteria_code', 'criteria_name', 'criteria_weight_percent',
    'question_number', 'question_text', 'question_weight_percent', 'max_score', 'help_text',
    'sort_order', 'is_active',
])]
class UmkmSurveyQuestion extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'criteria_weight_percent' => 'decimal:2',
            'question_number' => 'integer',
            'question_weight_percent' => 'decimal:2',
            'max_score' => 'decimal:2',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(SurveyTemplate::class, 'survey_template_id');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(UmkmSurveyAnswer::class, 'umkm_assessment_question_id');
    }
}
