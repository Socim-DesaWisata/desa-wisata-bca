<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'survey_template_id', 'category_code', 'category_name', 'sub_category_code',
    'sub_category_name', 'criteria_code', 'criteria_name', 'criteria_description',
    'indicator_code', 'indicator_name', 'indicator_description', 'supporting_evidence',
    'input_type', 'document_required', 'document_hint', 'sort_order', 'is_active',
])]
class PariwisataSurveyQuestion extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'document_required' => 'boolean',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(SurveyTemplate::class, 'survey_template_id');
    }

    public function options(): HasMany
    {
        return $this->hasMany(PariwisataSuveyOption::class, 'pariwisata_survey_question_id');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(PariwisataSurveyAnswer::class, 'pariwisata_survey_question_id');
    }
}
