<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['name', 'sponsor_name', 'description', 'year', 'status', 'created_by'])]
class CsrProgram extends Model
{
    use HasFactory, SoftDeletes;

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function programVillages(): HasMany
    {
        return $this->hasMany(ProgramVillage::class, 'program_id');
    }

    public function villages(): BelongsToMany
    {
        return $this->belongsToMany(TourismVillage::class, 'program_villages', 'program_id', 'village_id')
            ->withPivot(['joined_at', 'status'])
            ->withTimestamps();
    }
}
