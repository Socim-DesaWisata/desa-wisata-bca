<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'village_profile_item_id', 'uploaded_by', 'type', 'title', 'caption', 'file_path',
    'external_url', 'mime_type', 'file_size', 'is_cover', 'sort_order',
])]
class VillageProfileItemMedia extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'file_size' => 'integer',
            'is_cover' => 'boolean',
        ];
    }

    public function profileItem(): BelongsTo
    {
        return $this->belongsTo(VillageProfileItem::class, 'village_profile_item_id');
    }

    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
