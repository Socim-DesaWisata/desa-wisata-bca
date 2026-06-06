<?php

namespace App\Http\Requests\SurveyQuestions;

use Illuminate\Foundation\Http\FormRequest;

class IndexSurveyQuestionRequest extends FormRequest
{
    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:150'],
            'aspect' => ['nullable', 'string', 'max:150'],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:50'],
        ];
    }
}
