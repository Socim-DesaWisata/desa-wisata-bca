<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\VillageSurveyAssignment;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreSurveyAnswerDraftRequest extends FormRequest
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
            'answers' => ['required', 'array', 'min:1'],
            'answers.*.question_id' => ['required', 'integer', 'exists:survey_questions,id'],
            'answers.*.survey_question_option_id' => ['required', 'integer', 'exists:survey_question_options,id'],
            'answers.*.documents' => ['nullable', 'array', 'max:10'],
            'answers.*.documents.*' => ['file', 'mimes:jpg,jpeg,png,webp,pdf', 'max:5120'],
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator): void {
                /** @var VillageSurveyAssignment|null $assignment */
                $assignment = $this->route('assignment');

                if (! $assignment) {
                    return;
                }

                foreach ($this->input('answers', []) as $index => $answer) {
                    $question = SurveyQuestion::query()
                        ->whereKey($answer['question_id'] ?? null)
                        ->where('survey_template_id', $assignment->survey_template_id)
                        ->first();

                    if (! $question) {
                        $validator->errors()->add("answers.{$index}.question_id", 'Pertanyaan tidak sesuai dengan template assignment.');

                        continue;
                    }

                    $optionExists = SurveyQuestionOption::query()
                        ->whereKey($answer['survey_question_option_id'] ?? null)
                        ->where('survey_question_id', $question->id)
                        ->exists();

                    if (! $optionExists) {
                        $validator->errors()->add("answers.{$index}.survey_question_option_id", 'Pilihan skor tidak sesuai dengan pertanyaan.');
                    }
                }
            },
        ];
    }
}
