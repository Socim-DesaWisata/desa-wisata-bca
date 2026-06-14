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
                'nullable',
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
            'survey_template_id' => ['nullable', 'integer', 'exists:survey_templates,id'],
            'status' => ['nullable', 'string', Rule::in(['assigned', 'in_progress', 'submitted', 'approved', 'need_revision', 'rejected'])],
            'assigned_by' => ['nullable', 'integer', 'exists:users,id'],
            'submitted_by' => ['nullable', 'integer', 'exists:users,id'],
            'reviewed_by' => ['nullable', 'integer', 'exists:users,id'],
            'assigned_at' => ['nullable', 'date'],
            'started_at' => ['nullable', 'date'],
            'last_saved_at' => ['nullable', 'date'],
            'submitted_at' => ['nullable', 'date'],
            'reviewed_at' => ['nullable', 'date'],
        ];
    }
}
