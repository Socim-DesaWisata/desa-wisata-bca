<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'pariwisata_village_id', 'pariwisata_survey_question_id', 'pariwisata_suvey_option_id',
    'score', 'notes', 'category_code_snapshot', 'category_name_snapshot',
    'sub_category_code_snapshot', 'sub_category_name_snapshot', 'criteria_code_snapshot',
    'criteria_name_snapshot', 'criteria_description_snapshot', 'indicator_code_snapshot',
    'indicator_name_snapshot', 'indicator_description_snapshot', 'supporting_evidence_snapshot',
    'option_label_snapshot', 'option_description_snapshot', 'answered_by', 'last_edited_by',
    'answered_at', 'last_edited_at',
])]
class PariwisataSurveyAnswer extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'score' => 'integer',
            'answered_at' => 'datetime',
            'last_edited_at' => 'datetime',
        ];
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(PariwisataSurveyQuestion::class, 'pariwisata_survey_question_id');
    }

    public function pariwisataVillage(): BelongsTo
    {
        return $this->belongsTo(PariwisataVillage::class, 'pariwisata_village_id');
    }

    public function option(): BelongsTo
    {
        return $this->belongsTo(PariwisataSuveyOption::class, 'pariwisata_suvey_option_id');
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
        return $this->hasMany(PariwisataSurveyAnswerDocument::class, 'pariwisata_survey_answer_id');
    }
}
