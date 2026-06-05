<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['village_umkm_id', 'category'])]
class VillageUmkmCategory extends Model
{
    use HasFactory;

    public function umkm(): BelongsTo
    {
        return $this->belongsTo(VillageUmkm::class, 'village_umkm_id');
    }
}
