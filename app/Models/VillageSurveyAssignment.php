<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'village_id', 'survey_template_id', 'code', 'status', 'assigned_by', 'submitted_by',
    'reviewed_by', 'assigned_at', 'started_at', 'last_saved_at', 'submitted_at', 'reviewed_at',
])]
class VillageSurveyAssignment extends Model
{
    use HasFactory, SoftDeletes;

    public function getRouteKeyName(): string
    {
        return 'code';
    }

    protected function casts(): array
    {
        return [
            'assigned_at' => 'datetime',
            'started_at' => 'datetime',
            'last_saved_at' => 'datetime',
            'submitted_at' => 'datetime',
            'reviewed_at' => 'datetime',
        ];
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(TourismVillage::class, 'village_id');
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(SurveyTemplate::class, 'survey_template_id');
    }

    public function assignedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function submittedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    public function reviewedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(SurveyAnswer::class, 'village_survey_assignment_id');
    }

    public function documents(): HasManyThrough
    {
        return $this->hasManyThrough(
            SurveyAnswerDocument::class,
            SurveyAnswer::class,
            'village_survey_assignment_id',
            'survey_answer_id'
        );
    }

    public function logs(): HasMany
    {
        return $this->hasMany(VillageSurveyAssignmentLog::class, 'village_survey_assignment_id');
    }

    public function answerHistories(): HasMany
    {
        return $this->hasMany(SurveyAnswerHistory::class, 'village_survey_assignment_id');
    }
}
