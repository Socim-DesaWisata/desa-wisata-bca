<?php

namespace App\Http\Requests\TourismVillages;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTourismVillageRequest extends FormRequest
{
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
            'code' => ['required', 'string', 'max:50', 'unique:tourism_villages,code'],
            'name' => ['required', 'string', 'max:150'],
            'slug' => ['required', 'string', 'max:180', 'alpha_dash:ascii', 'unique:tourism_villages,slug'],
            'description' => ['nullable', 'string'],
            'province' => ['nullable', 'string', 'max:100'],
            'city' => ['nullable', 'string', 'max:100'],
            'district' => ['nullable', 'string', 'max:100'],
            'subdistrict' => ['nullable', 'string', 'max:100'],
            'address' => ['nullable', 'string'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'maps_url' => ['nullable', 'url'],
            'manager_name' => ['nullable', 'string', 'max:150'],
            'manager_phone' => ['nullable', 'string', 'max:30'],
            'manager_email' => ['nullable', 'email', 'max:150'],
            'status' => ['required', 'string', Rule::in(['draft', 'active', 'verified', 'review', 'archived'])],
        ];
    }
}
