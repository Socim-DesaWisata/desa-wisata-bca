<?php

namespace App\Http\Requests\TourismVillages;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTourismVillageRequest extends FormRequest
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
        $village = $this->route('village');

        return [
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('tourism_villages', 'code')->ignore($village),
            ],
            'name' => ['required', 'string', 'max:150'],
            'slug' => [
                'required',
                'string',
                'max:180',
                'alpha_dash:ascii',
                Rule::unique('tourism_villages', 'slug')->ignore($village),
            ],
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
            'media' => ['nullable', 'array'],
            'media.*.id' => ['nullable', 'integer'],
            'media.*.type' => ['required_with:media', 'string', Rule::in(['image', 'video'])],
            'media.*.title' => ['nullable', 'string', 'max:150'],
            'media.*.caption' => ['nullable', 'string'],
            'media.*.file_path' => ['nullable', 'string', 'max:255'],
            'media.*.file' => ['nullable', 'file', 'max:10240'],
            'media.*.external_url' => ['nullable', 'url'],
            'media.*.mime_type' => ['nullable', 'string', 'max:100'],
            'media.*.is_cover' => ['boolean'],
            'media.*.sort_order' => ['nullable', 'integer'],
            'profile_items' => ['nullable', 'array'],
            'profile_items.*.id' => ['nullable', 'integer'],
            'profile_items.*.category_slug' => ['required_with:profile_items', 'string', Rule::in(['fasilitas', 'atraksi', 'suvenir', 'homestay', 'paket-wisata'])],
            'profile_items.*.category_name' => ['required_with:profile_items', 'string', 'max:100'],
            'profile_items.*.name' => ['required_with:profile_items', 'string', 'max:150'],
            'profile_items.*.description' => ['nullable', 'string'],
            'profile_items.*.address' => ['nullable', 'string'],
            'profile_items.*.latitude' => ['nullable', 'numeric'],
            'profile_items.*.longitude' => ['nullable', 'numeric'],
            'profile_items.*.maps_url' => ['nullable', 'url'],
            'profile_items.*.price_min' => ['nullable', 'numeric', 'min:0'],
            'profile_items.*.price_max' => ['nullable', 'numeric', 'min:0'],
            'profile_items.*.price_text' => ['nullable', 'string', 'max:100'],
            'profile_items.*.opening_hours' => ['nullable', 'string', 'max:150'],
            'profile_items.*.contact_name' => ['nullable', 'string', 'max:150'],
            'profile_items.*.contact_phone' => ['nullable', 'string', 'max:30'],
            'profile_items.*.metadata' => ['nullable', 'json'],
            'profile_items.*.is_active' => ['boolean'],
            'profile_items.*.sort_order' => ['nullable', 'integer'],
            'profile_items.*.media' => ['nullable', 'array'],
            'profile_items.*.media.*.id' => ['nullable', 'integer'],
            'profile_items.*.media.*.type' => ['required', 'string', 'max:50'],
            'profile_items.*.media.*.title' => ['nullable', 'string', 'max:150'],
            'profile_items.*.media.*.caption' => ['nullable', 'string'],
            'profile_items.*.media.*.file_path' => ['nullable', 'string', 'max:255'],
            'profile_items.*.media.*.file' => ['nullable', 'file', 'max:10240'],
            'profile_items.*.media.*.external_url' => ['nullable', 'url'],
            'profile_items.*.media.*.mime_type' => ['nullable', 'string', 'max:100'],
            'profile_items.*.media.*.is_cover' => ['boolean'],
            'profile_items.*.media.*.sort_order' => ['nullable', 'integer'],
        ];
    }
}
