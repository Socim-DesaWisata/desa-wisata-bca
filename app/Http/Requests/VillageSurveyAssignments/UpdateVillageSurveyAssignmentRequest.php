<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVillageSurveyAssignmentRequest extends FormRequest
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
        $assignment = $this->route('assignment');

        return [
            'village_id' => [
                'required',
                'integer',
                'exists:tourism_villages,id',
                Rule::unique('village_survey_assignments', 'village_id')->ignore($assignment),
            ],
            'survey_template_id' => ['required', 'integer', 'exists:survey_templates,id'],
            'status' => ['required', 'string', Rule::in(['assigned', 'in_progress', 'submitted', 'approved', 'need_revision', 'rejected'])],
            'assigned_by' => ['required', 'integer', 'exists:users,id'],
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
