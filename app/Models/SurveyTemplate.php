<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['title', 'description', 'type', 'status', 'created_by', 'published_at'])]
class SurveyTemplate extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function questions(): HasMany
    {
        return $this->hasMany(SurveyQuestion::class, 'survey_template_id');
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(VillageSurveyAssignment::class, 'survey_template_id');
    }

    public function umkmSurveyQuestions(): HasMany
    {
        return $this->hasMany(UmkmSurveyQuestion::class, 'survey_template_id');
    }

    public function pariwisataSurveyQuestions(): HasMany
    {
        return $this->hasMany(PariwisataSurveyQuestion::class, 'survey_template_id');
    }
}
