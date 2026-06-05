<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUmkmSurveyAssignmentRequest extends FormRequest
{
    private const CATEGORY_OPTIONS = [
        'kuliner',
        'tekstil_dan_kerajinan',
        'fashion_dan_aksesoris',
        'kecantikan_dan_kesehatan',
        'jasa',
        'pertanian',
        'peternakan',
        'perikanan',
        'produk_digital_dan_kreatif',
    ];

    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'business_owner_name' => ['nullable', 'string', 'max:150'],
            'name' => ['required', 'string', 'max:150'],
            'legal_business_name' => ['nullable', 'string', 'max:180'],
            'established_year' => ['nullable', 'integer', 'min:1800', 'max:'.now()->year],
            'company_website_url' => ['nullable', 'url', 'max:2048'],
            'production_address' => ['nullable', 'string'],
            'product_category' => ['nullable', 'string', 'max:150'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => ['required', 'string', Rule::in(self::CATEGORY_OPTIONS)],
            'brand_name' => ['nullable', 'string', 'max:150'],
            'annual_revenue' => ['nullable', 'numeric', 'min:0'],
            'monthly_production_capacity' => ['nullable', 'string', 'max:150'],
            'current_obstacles' => ['nullable', 'string'],
            'certifications' => ['nullable', 'string'],
            'has_business_legality_and_certification' => ['nullable', 'string', 'max:255'],
            'is_umkm_participant' => ['nullable', 'string', 'max:255'],
            'is_production_capacity_participant' => ['nullable', 'string', 'max:255'],
            'annual_production_capacity' => ['nullable', 'string', 'max:255'],
            'factory_location_feasibility' => ['nullable', 'string'],
            'instagram_url' => ['nullable', 'url', 'max:2048'],
            'facebook_url' => ['nullable', 'url', 'max:2048'],
            'twitter_url' => ['nullable', 'url', 'max:2048'],
            'marketing_website_url' => ['nullable', 'url', 'max:2048'],
            'ecommerce_profile_url' => ['nullable', 'url', 'max:2048'],
            'marketing_notes' => ['nullable', 'string'],
            'sustainability_notes' => ['nullable', 'string'],
            'bank_name' => ['nullable', 'string', 'max:150'],
            'bank_account_number' => ['nullable', 'string', 'max:100'],
            'has_qris' => ['nullable', 'boolean'],
            'qris_provider' => ['nullable', 'string', 'max:150'],
            'has_edc' => ['nullable', 'boolean'],
            'edc_provider' => ['nullable', 'string', 'max:150'],
            'has_credit_card' => ['nullable', 'boolean'],
            'banking_notes' => ['nullable', 'string'],
            'has_exported' => ['nullable', 'boolean'],
            'export_destination_countries' => ['nullable', 'string'],
            'product_photo' => ['nullable', 'image', 'max:5120'],
        ];
    }
}
