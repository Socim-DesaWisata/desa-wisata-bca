<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'village_umkm_id',
    'uploaded_by',
    'document_name',
    'file_path',
    'mime_type',
    'file_size',
])]
class VillageUmkmDocument extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'file_size' => 'integer',
        ];
    }

    public function umkm(): BelongsTo
    {
        return $this->belongsTo(VillageUmkm::class, 'village_umkm_id');
    }

    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
