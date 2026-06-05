<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'pariwisata_survey_question_id', 'score', 'level', 'label', 'description', 'sort_order',
])]
class PariwisataSuveyOption extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pariwisata_suvey_options';

    protected function casts(): array
    {
        return [
            'score' => 'integer',
            'sort_order' => 'integer',
        ];
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(PariwisataSurveyQuestion::class, 'pariwisata_survey_question_id');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(PariwisataSurveyAnswer::class, 'pariwisata_suvey_option_id');
    }
}
