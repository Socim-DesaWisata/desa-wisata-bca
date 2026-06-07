<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'pariwisata_id', 'name', 'package_type', 'duration', 'facilities', 'description', 'price',
    'is_active', 'created_by',
])]
class PariwisataPackage extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function pariwisata(): BelongsTo
    {
        return $this->belongsTo(PariwisataVillage::class, 'pariwisata_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
