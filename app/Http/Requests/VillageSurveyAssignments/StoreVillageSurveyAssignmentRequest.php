<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVillageSurveyAssignmentRequest extends FormRequest
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
            'village_id' => [
                'required',
                'integer',
                'exists:tourism_villages,id',
                Rule::unique('village_survey_assignments', 'village_id'),
            ],
            'started_at' => ['nullable', 'date'],
        ];
    }
}
