<?php

namespace App\Http\Requests\SurveyQuestions;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePariwisataSurveyQuestionRequest extends FormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $question = $this->route('question');

        return [
            'category_code' => ['required', 'string', 'max:20'],
            'category_name' => ['required', 'string', 'max:150'],
            'sub_category_code' => ['required', 'string', 'max:20'],
            'sub_category_name' => ['required', 'string', 'max:150'],
            'criteria_code' => ['required', 'string', 'max:20'],
            'criteria_name' => ['required', 'string', 'max:150'],
            'criteria_description' => ['nullable', 'string'],
            'indicator_code' => [
                'required',
                'string',
                'max:20',
                Rule::unique('pariwisata_survey_questions', 'indicator_code')
                    ->where('survey_template_id', $question->survey_template_id)
                    ->ignore($question->id),
            ],
            'indicator_name' => ['required', 'string'],
            'indicator_description' => ['nullable', 'string'],
            'supporting_evidence' => ['nullable', 'string'],
            'input_type' => ['required', 'string', 'max:50'],
            'document_required' => ['boolean'],
            'document_hint' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:1'],
            'is_active' => ['boolean'],
            'options' => ['required', 'array', 'min:1'],
            'options.*.id' => ['nullable', 'integer', 'exists:pariwisata_suvey_options,id'],
            'options.*.score' => ['required', 'integer', 'min:0', 'max:100', 'distinct'],
            'options.*.level' => ['required', 'string', 'max:100'],
            'options.*.label' => ['required', 'string', 'max:150'],
            'options.*.description' => ['required', 'string'],
            'options.*.sort_order' => ['nullable', 'integer', 'min:1'],
        ];
    }
}
