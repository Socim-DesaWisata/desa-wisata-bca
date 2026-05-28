<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'village_id', 'category_id', 'created_by', 'name', 'description', 'address', 'latitude',
    'longitude', 'maps_url', 'price_min', 'price_max', 'price_text', 'opening_hours',
    'contact_name', 'contact_phone', 'metadata', 'is_active', 'sort_order',
])]
class VillageProfileItem extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'price_min' => 'decimal:2',
            'price_max' => 'decimal:2',
            'metadata' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(TourismVillage::class, 'village_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(VillageProfileItemCategory::class, 'category_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function media(): HasMany
    {
        return $this->hasMany(VillageProfileItemMedia::class, 'village_profile_item_id');
    }
}
