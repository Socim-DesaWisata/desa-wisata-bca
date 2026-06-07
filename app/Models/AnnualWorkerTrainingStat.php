<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'entity_type', 'umkm_id', 'pariwisata_id', 'entity_key', 'year', 'training_name',
    'total_people', 'notes', 'created_by',
])]
class AnnualWorkerTrainingStat extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'total_people' => 'integer',
        ];
    }

    public function umkm(): BelongsTo
    {
        return $this->belongsTo(VillageUmkm::class, 'umkm_id');
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
