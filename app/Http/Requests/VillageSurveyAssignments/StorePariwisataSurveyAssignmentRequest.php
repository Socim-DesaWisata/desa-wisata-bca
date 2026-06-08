<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StorePariwisataSurveyAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'annual_turnovers' => $this->filledRows($this->input('annual_turnovers', [])),
            'annual_visitors' => $this->filledRows($this->input('annual_visitors', [])),
            'visitor_type_annuals' => $this->filledRows($this->input('visitor_type_annuals', [])),
            'packages' => $this->filledRows($this->input('packages', [])),
            'annual_worker_stats' => $this->filledRows($this->input('annual_worker_stats', [])),
            'annual_worker_training_stats' => $this->filledRows($this->input('annual_worker_training_stats', [])),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => [
                'required',
                'string',
                Rule::in([
                    'wisata_alam',
                    'wisata_buatan',
                    'wisata_religi',
                    'wisata_budaya',
                    'wisata_kuliner',
                    'wisata_edukasi',
                ]),
            ],
            'operational_days' => ['nullable', 'string', 'max:150'],
            'operational_hours' => ['nullable', 'string', 'max:150'],
            'operational_schedule_notes' => ['nullable', 'string'],
            'entrance_ticket_price' => ['nullable', 'numeric', 'min:0'],
            'entrance_ticket_description' => ['nullable', 'string', 'max:150'],
            'address' => ['nullable', 'string'],
            'person_in_charge_name' => ['nullable', 'string', 'max:150'],
            'person_in_charge_phone' => ['nullable', 'string', 'max:30'],
            'person_in_charge_address' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
            'annual_turnovers' => ['nullable', 'array', 'max:50'],
            'annual_turnovers.*.year' => ['required', 'integer'],
            'annual_turnovers.*.value' => ['required', 'numeric', 'min:0'],
            'annual_turnovers.*.notes' => ['nullable', 'string'],
            'annual_visitors' => ['nullable', 'array', 'max:50'],
            'annual_visitors.*.year' => ['required', 'integer'],
            'annual_visitors.*.value' => ['required', 'integer', 'min:0'],
            'annual_visitors.*.notes' => ['nullable', 'string'],
            'visitor_type_annuals' => ['nullable', 'array', 'max:100'],
            'visitor_type_annuals.*.year' => ['required', 'integer'],
            'visitor_type_annuals.*.visitor_type' => ['required', 'string', Rule::in(['domestik', 'mancanegara', 'pelajar', 'rombongan'])],
            'visitor_type_annuals.*.value' => ['required', 'integer', 'min:0'],
            'visitor_type_annuals.*.notes' => ['nullable', 'string'],
            'packages' => ['nullable', 'array', 'max:100'],
            'packages.*.name' => ['required', 'string', 'max:150'],
            'packages.*.package_type' => ['nullable', 'string', 'max:100'],
            'packages.*.duration' => ['nullable', 'string', 'max:100'],
            'packages.*.facilities' => ['nullable', 'string'],
            'packages.*.description' => ['nullable', 'string'],
            'packages.*.price' => ['nullable', 'numeric', 'min:0'],
            'packages.*.is_active' => ['required', 'boolean'],
            'annual_worker_stats' => ['nullable', 'array', 'max:100'],
            'annual_worker_stats.*.year' => ['required', 'integer'],
            'annual_worker_stats.*.dimension' => ['required', 'string', Rule::in(['age', 'gender', 'education'])],
            'annual_worker_stats.*.category_value' => ['required', 'string', 'max:150'],
            'annual_worker_stats.*.total_people' => ['required', 'integer', 'min:0'],
            'annual_worker_stats.*.notes' => ['nullable', 'string'],
            'annual_worker_training_stats' => ['nullable', 'array', 'max:100'],
            'annual_worker_training_stats.*.year' => ['required', 'integer'],
            'annual_worker_training_stats.*.training_name' => ['nullable', 'string', 'max:150'],
            'annual_worker_training_stats.*.total_people' => ['required', 'integer', 'min:0'],
            'annual_worker_training_stats.*.notes' => ['nullable', 'string'],
        ];
    }

    /**
     * @return array<int, Closure(Validator): void>
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

                $visitorYears = collect($this->input('annual_visitors', []))
                    ->pluck('year')
                    ->filter()
                    ->map(fn (mixed $year): int => (int) $year);

                if ($visitorYears->duplicates()->isNotEmpty()) {
                    $validator->errors()->add('annual_visitors', 'Tahun pengunjung tahunan tidak boleh duplikat.');
                }

                $visitorTypeKeys = collect($this->input('visitor_type_annuals', []))
                    ->map(fn (array $row): string => implode('|', [
                        $row['year'] ?? '',
                        $row['visitor_type'] ?? '',
                    ]))
                    ->filter(fn (string $key): bool => trim(str_replace('|', '', $key)) !== '');

                if ($visitorTypeKeys->duplicates()->isNotEmpty()) {
                    $validator->errors()->add('visitor_type_annuals', 'Kombinasi tahun dan jenis pengunjung tidak boleh duplikat.');
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

    /**
     * @return array<int, array<string, mixed>>
     */
    private function filledRows(mixed $rows): array
    {
        if (! is_array($rows)) {
            return [];
        }

        return collect($rows)
            ->filter(fn (mixed $row): bool => is_array($row) && collect($row)->contains(fn (mixed $value): bool => filled($value)))
            ->values()
            ->all();
    }
}
