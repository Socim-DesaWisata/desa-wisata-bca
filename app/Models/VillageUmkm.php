<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'village_id', 'created_by', 'data_collector_id', 'business_owner_name', 'village_name',
    'collector_name', 'name', 'legal_business_name', 'established_year', 'company_website_url',
    'production_address', 'product_category', 'brand_name', 'annual_revenue',
    'monthly_production_capacity', 'current_obstacles', 'certifications',
    'has_business_legality_and_certification', 'is_umkm_participant',
    'is_production_capacity_participant', 'annual_production_capacity',
    'factory_location_feasibility', 'instagram_url', 'facebook_url', 'twitter_url',
    'marketing_website_url', 'ecommerce_profile_url', 'marketing_notes', 'sustainability_notes',
    'bank_name', 'bank_account_number', 'has_qris', 'qris_provider', 'has_edc', 'edc_provider',
    'has_credit_card', 'banking_notes', 'has_exported', 'export_destination_countries',
    'product_photo_path',
])]
class VillageUmkm extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'established_year' => 'integer',
            'annual_revenue' => 'decimal:2',
            'has_qris' => 'boolean',
            'has_edc' => 'boolean',
            'has_credit_card' => 'boolean',
            'has_exported' => 'boolean',
        ];
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(TourismVillage::class, 'village_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function dataCollector(): BelongsTo
    {
        return $this->belongsTo(User::class, 'data_collector_id');
    }

    public function surveyAnswers(): HasMany
    {
        return $this->hasMany(UmkmSurveyAnswer::class, 'umkm_id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(VillageUmkmDocument::class, 'village_umkm_id');
    }

    public function categories(): HasMany
    {
        return $this->hasMany(VillageUmkmCategory::class, 'village_umkm_id');
    }

    public function annualTurnovers(): HasMany
    {
        return $this->hasMany(AnnualTurnover::class, 'umkm_id');
    }

    public function annualWorkerStats(): HasMany
    {
        return $this->hasMany(AnnualWorkerStat::class, 'umkm_id');
    }

    public function annualWorkerTrainingStats(): HasMany
    {
        return $this->hasMany(AnnualWorkerTrainingStat::class, 'umkm_id');
    }
}
