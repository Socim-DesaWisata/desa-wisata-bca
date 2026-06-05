<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'pariwisata_survey_answer_id', 'uploaded_by', 'file_name', 'file_path', 'mime_type',
    'file_size', 'caption',
])]
class PariwisataSurveyAnswerDocument extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'file_size' => 'integer',
        ];
    }

    public function answer(): BelongsTo
    {
        return $this->belongsTo(PariwisataSurveyAnswer::class, 'pariwisata_survey_answer_id');
    }

    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
