<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVillageSurveyAssignmentRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        if ($this->has('code')) {
            $this->merge([
                'code' => strtoupper(trim((string) $this->input('code'))),
            ]);
        }
    }

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
            'code' => [
                'required',
                'string',
                'max:50',
                'regex:/^[A-Z0-9-]+$/',
                Rule::unique('village_survey_assignments', 'code'),
            ],
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
