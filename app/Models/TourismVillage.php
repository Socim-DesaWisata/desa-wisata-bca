<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'code', 'name', 'slug', 'description', 'province', 'city', 'district', 'subdistrict',
    'address', 'postal_code', 'latitude', 'longitude', 'maps_url', 'manager_name',
    'manager_phone', 'manager_email', 'status', 'created_by',
])]
class TourismVillage extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function programVillages(): HasMany
    {
        return $this->hasMany(ProgramVillage::class, 'village_id');
    }

    public function programs(): BelongsToMany
    {
        return $this->belongsToMany(CsrProgram::class, 'program_villages', 'village_id', 'program_id')
            ->withPivot(['joined_at', 'status'])
            ->withTimestamps();
    }

    public function enumeratorAssignments(): HasMany
    {
        return $this->hasMany(VillageEnumeratorAssignment::class, 'village_id');
    }

    public function enumerators(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'village_enumerator_assignments', 'village_id', 'enumerator_id')
            ->withPivot(['assigned_by', 'is_active', 'assigned_at'])
            ->withTimestamps();
    }

    public function media(): HasMany
    {
        return $this->hasMany(VillageMedia::class, 'village_id');
    }

    public function profileItems(): HasMany
    {
        return $this->hasMany(VillageProfileItem::class, 'village_id');
    }

    public function umkms(): HasMany
    {
        return $this->hasMany(VillageUmkm::class, 'village_id');
    }

    public function pariwisataVillages(): HasMany
    {
        return $this->hasMany(PariwisataVillage::class, 'village_id');
    }

    public function surveyAssignment(): HasOne
    {
        return $this->hasOne(VillageSurveyAssignment::class, 'village_id');
    }

    public function surveyAnswers(): HasManyThrough
    {
        return $this->hasManyThrough(
            SurveyAnswer::class,
            VillageSurveyAssignment::class,
            'village_id',
            'village_survey_assignment_id',
            'id',
            'id'
        );
    }

    public function pariwisataSurveyAnswers(): HasManyThrough
    {
        return $this->hasManyThrough(
            PariwisataSurveyAnswer::class,
            VillageSurveyAssignment::class,
            'village_id',
            'village_survey_assignment_id',
            'id',
            'id'
        );
    }

    public function annualPopulationStats(): HasMany
    {
        return $this->hasMany(VillageAnnualPopulationStat::class, 'village_id');
    }

    public function vulnerableGroupAnnuals(): HasMany
    {
        return $this->hasMany(VillageVulnerableGroupAnnual::class, 'village_id');
    }

    public function activeGroupAnnuals(): HasMany
    {
        return $this->hasMany(VillageActiveGroupAnnual::class, 'village_id');
    }
}
