<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexVillageSurveyAssignmentRequest extends FormRequest
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
            'search' => ['nullable', 'string', 'max:150'],
            'status' => ['nullable', 'string', Rule::in(['assigned', 'in_progress', 'submitted', 'approved', 'need_revision', 'rejected'])],
            'template_id' => ['nullable', 'integer', 'exists:survey_templates,id'],
            'view' => ['nullable', 'string', Rule::in(['active', 'trash'])],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:50'],
            'sort_by' => ['nullable', 'string', Rule::in(['total_score'])],
            'sort_direction' => ['nullable', 'string', Rule::in(['asc', 'desc'])],
            'jenis_desa' => ['nullable', 'string'],
        ];
    }
}
