<?php

namespace App\Http\Requests\SurveyQuestions;

use Illuminate\Foundation\Http\FormRequest;

class StoreSurveyQuestionRequest extends FormRequest
{
    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'survey_template_id' => ['required', 'integer', 'exists:survey_templates,id'],
            'aspect' => ['required', 'string', 'max:150'],
            'code' => ['nullable', 'string', 'max:50'],
            'question_text' => ['required', 'string'],
            'document_hint' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:1'],
            'options' => ['required', 'array', 'size:4'],
            'options.*' => ['required', 'string'],
        ];
    }
}
