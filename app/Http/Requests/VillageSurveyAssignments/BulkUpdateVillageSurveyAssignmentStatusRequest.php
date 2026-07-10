<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BulkUpdateVillageSurveyAssignmentStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'assignment_ids' => ['required', 'array', 'min:1'],
            'assignment_ids.*' => ['required', 'integer', 'distinct', 'exists:village_survey_assignments,id'],
            'status' => [
                'required',
                'string',
                Rule::in(['assigned', 'in_progress', 'submitted', 'approved', 'need_revision', 'rejected']),
            ],
        ];
    }
}
