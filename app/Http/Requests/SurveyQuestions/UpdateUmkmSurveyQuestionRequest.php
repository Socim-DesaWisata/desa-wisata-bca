<?php

namespace App\Http\Requests\SurveyQuestions;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUmkmSurveyQuestionRequest extends FormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $question = $this->route('question');
        $templateId = $question->survey_template_id;

        return [
            'criteria_code' => [
                'required',
                'string',
                'max:20',
                Rule::unique('umkm_survey_questions', 'criteria_code')
                    ->where('survey_template_id', $templateId)
                    ->where('question_number', $this->integer('question_number'))
                    ->ignore($question->id),
            ],
            'criteria_name' => ['required', 'string', 'max:150'],
            'criteria_weight_percent' => ['required', 'numeric', 'min:0', 'max:100'],
            'question_number' => ['required', 'integer', 'min:1'],
            'question_text' => ['required', 'string'],
            'question_weight_percent' => ['required', 'numeric', 'min:0', 'max:100'],
            'max_score' => ['required', 'numeric', 'min:0', 'max:100'],
            'help_text' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:1'],
            'is_active' => ['boolean'],
        ];
    }
}
