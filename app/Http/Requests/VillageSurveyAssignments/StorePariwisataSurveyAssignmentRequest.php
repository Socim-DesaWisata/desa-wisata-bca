<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePariwisataSurveyAssignmentRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:150'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => [
                'required',
                'string',
                Rule::in([
                    'wisata_alam',
                    'wisata_buatan',
                    'wisata_religi',
                    'wisata_budaya',
                    'wisata_kuliner',
                    'wisata_edukasi',
                ]),
            ],
            'operational_days' => ['nullable', 'string', 'max:150'],
            'operational_hours' => ['nullable', 'string', 'max:150'],
            'operational_schedule_notes' => ['nullable', 'string'],
            'entrance_ticket_price' => ['nullable', 'numeric', 'min:0'],
            'entrance_ticket_description' => ['nullable', 'string', 'max:150'],
            'address' => ['nullable', 'string'],
            'person_in_charge_name' => ['nullable', 'string', 'max:150'],
            'person_in_charge_phone' => ['nullable', 'string', 'max:30'],
            'person_in_charge_address' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
