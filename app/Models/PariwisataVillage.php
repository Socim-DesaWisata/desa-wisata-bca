<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
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

    public function surveyAnswers(): HasManyThrough
    {
        return $this->hasManyThrough(
            PariwisataSurveyAnswer::class,
            VillageSurveyAssignment::class,
            'village_id',
            'village_survey_assignment_id',
            'village_id',
            'id',
        );
    }

    public function annualTurnovers(): HasMany
    {
        return $this->hasMany(AnnualTurnover::class, 'pariwisata_id');
    }

    public function annualVisitors(): HasMany
    {
        return $this->hasMany(PariwisataAnnualVisitor::class, 'pariwisata_id');
    }

    public function visitorTypeAnnuals(): HasMany
    {
        return $this->hasMany(PariwisataVisitorTypeAnnual::class, 'pariwisata_id');
    }

    public function packages(): HasMany
    {
        return $this->hasMany(PariwisataPackage::class, 'pariwisata_id');
    }

    public function annualWorkerStats(): HasMany
    {
        return $this->hasMany(AnnualWorkerStat::class, 'pariwisata_id');
    }

    public function annualWorkerTrainingStats(): HasMany
    {
        return $this->hasMany(AnnualWorkerTrainingStat::class, 'pariwisata_id');
    }
}
