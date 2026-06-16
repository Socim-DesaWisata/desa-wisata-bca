<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataSuveyOption;
use App\Models\VillageSurveyAssignment;
use App\Services\ActiveSurveyTemplateResolver;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StorePariwisataSurveyDraftRequest extends FormRequest
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
            'answers.*.question_id' => ['required', 'integer', 'exists:pariwisata_survey_questions,id'],
            'answers.*.pariwisata_suvey_option_id' => ['required', 'integer', 'exists:pariwisata_suvey_options,id'],
            'answers.*.notes' => ['nullable', 'string', 'max:5000'],
            'answers.*.documents' => ['nullable', 'array', 'max:10'],
            'answers.*.documents.*' => ['file', 'mimes:jpg,jpeg,png,webp,pdf', 'max:51200'],
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

                $template = app(ActiveSurveyTemplateResolver::class)->resolve('pariwisata', ['pariwisataSurveyQuestions:id,survey_template_id']);

                if (! $template) {
                    $validator->errors()->add('answers', 'Template survey pariwisata aktif belum tersedia.');

                    return;
                }

                foreach ($this->input('answers', []) as $index => $answer) {
                    $question = PariwisataSurveyQuestion::query()
                        ->whereKey($answer['question_id'] ?? null)
                        ->where('survey_template_id', $template->id)
                        ->where('is_active', true)
                        ->first();

                    if (! $question) {
                        $validator->errors()->add("answers.{$index}.question_id", 'Pertanyaan tidak sesuai dengan template survey pariwisata.');

                        continue;
                    }

                    $optionExists = PariwisataSuveyOption::query()
                        ->whereKey($answer['pariwisata_suvey_option_id'] ?? null)
                        ->where('pariwisata_survey_question_id', $question->id)
                        ->exists();

                    if (! $optionExists) {
                        $validator->errors()->add("answers.{$index}.pariwisata_suvey_option_id", 'Pilihan skor tidak sesuai dengan pertanyaan.');
                    }
                }
            },
        ];
    }
}
