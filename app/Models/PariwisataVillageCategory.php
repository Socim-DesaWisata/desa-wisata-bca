<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['pariwisata_village_id', 'category'])]
class PariwisataVillageCategory extends Model
{
    use HasFactory;

    protected $table = 'pariwisata_village_category';

    public function pariwisataVillage(): BelongsTo
    {
        return $this->belongsTo(PariwisataVillage::class, 'pariwisata_village_id');
    }
}
