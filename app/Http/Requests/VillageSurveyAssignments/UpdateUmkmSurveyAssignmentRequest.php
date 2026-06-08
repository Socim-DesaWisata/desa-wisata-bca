<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Illuminate\Validation\Validator;

class UpdateUmkmSurveyAssignmentRequest extends StoreUmkmSurveyAssignmentRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $rules = parent::rules();

        unset(
            $rules['documents'],
            $rules['documents.*.document_name'],
            $rules['documents.*.file'],
            $rules['answers'],
            $rules['answers.*.question_id'],
            $rules['answers.*.score'],
        );

        return $rules;
    }

    /**
     * @return array<int, callable(Validator): void>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                $turnoverYears = collect($this->input('annual_turnovers', []))
                    ->pluck('year')
                    ->filter()
                    ->map(fn (mixed $year): int => (int) $year);

                if ($turnoverYears->duplicates()->isNotEmpty()) {
                    $validator->errors()->add('annual_turnovers', 'Tahun omset tahunan tidak boleh duplikat.');
                }

                $workerKeys = collect($this->input('annual_worker_stats', []))
                    ->map(fn (array $row): string => implode('|', [
                        $row['year'] ?? '',
                        $row['dimension'] ?? '',
                        $row['category_value'] ?? '',
                    ]))
                    ->filter(fn (string $key): bool => trim(str_replace('|', '', $key)) !== '');

                if ($workerKeys->duplicates()->isNotEmpty()) {
                    $validator->errors()->add('annual_worker_stats', 'Kombinasi tahun, dimensi, dan kategori pekerja tidak boleh duplikat.');
                }
            },
        ];
    }
}
