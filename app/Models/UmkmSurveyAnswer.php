<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'umkm_id', 'umkm_assessment_question_id', 'answered_by', 'score', 'criteria_code_snapshot',
    'criteria_name_snapshot', 'criteria_weight_percent_snapshot', 'question_text_snapshot',
    'question_weight_percent_snapshot', 'max_score_snapshot', 'normalized_score', 'weighted_score',
    'answered_at', 'last_edited_at',
])]
class UmkmSurveyAnswer extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'score' => 'decimal:2',
            'criteria_weight_percent_snapshot' => 'decimal:2',
            'question_weight_percent_snapshot' => 'decimal:2',
            'max_score_snapshot' => 'decimal:2',
            'normalized_score' => 'decimal:4',
            'weighted_score' => 'decimal:4',
            'answered_at' => 'datetime',
            'last_edited_at' => 'datetime',
        ];
    }

    public function umkm(): BelongsTo
    {
        return $this->belongsTo(VillageUmkm::class, 'umkm_id');
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(UmkmSurveyQuestion::class, 'umkm_assessment_question_id');
    }

    public function answeredBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'answered_by');
    }
}
