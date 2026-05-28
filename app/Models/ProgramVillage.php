<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['program_id', 'village_id', 'joined_at', 'status'])]
class ProgramVillage extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'joined_at' => 'date',
        ];
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(CsrProgram::class, 'program_id');
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(TourismVillage::class, 'village_id');
    }
}
