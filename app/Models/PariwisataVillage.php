<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'village_id', 'name', 'operational_days', 'operational_hours', 'operational_schedule',
    'entrance_ticket_price', 'entrance_ticket_description', 'address', 'person_in_charge_name',
    'person_in_charge_phone', 'person_in_charge_address', 'is_active',
])]
class PariwisataVillage extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pariwisata_village_table';

    protected function casts(): array
    {
        return [
            'operational_schedule' => 'array',
            'entrance_ticket_price' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(TourismVillage::class, 'village_id');
    }

    public function categories(): HasMany
    {
        return $this->hasMany(PariwisataVillageCategory::class, 'pariwisata_village_id');
    }

    public function surveyAnswers(): HasMany
    {
        return $this->hasMany(PariwisataSurveyAnswer::class, 'pariwisata_village_id');
    }
}
