<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['village_id', 'amount', 'education'])]
class VillageAdministrator extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return ['amount' => 'integer'];
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(TourismVillage::class, 'village_id');
    }
}
