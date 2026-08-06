<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VillageWorkerType extends Model
{
    use HasFactory;

    protected $table = 'village_worker_types';
    protected $guarded = ['id'];

    public function village(): BelongsTo
    {
        return $this->belongsTo(TourismVillage::class, 'village_id');
    }
}
