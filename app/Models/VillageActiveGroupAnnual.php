<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'village_id', 'active_category', 'year', 'value', 'notes', 'created_by',
])]
class VillageActiveGroupAnnual extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'value' => 'integer',
        ];
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(TourismVillage::class, 'village_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
