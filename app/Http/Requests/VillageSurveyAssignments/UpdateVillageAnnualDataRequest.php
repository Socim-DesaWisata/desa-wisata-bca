<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UpdateVillageAnnualDataRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'annual_population_stats' => $this->filledRows($this->input('annual_population_stats', [])),
            'vulnerable_group_annuals' => $this->filledRows($this->input('vulnerable_group_annuals', [])),
            'active_group_annuals' => $this->filledRows($this->input('active_group_annuals', [])),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'annual_population_stats' => ['nullable', 'array', 'max:100'],
            'annual_population_stats.*.year' => ['required', 'integer', 'min:1900', 'max:'.(now()->year + 1)],
            'annual_population_stats.*.category_value' => ['required', 'string', 'max:150'],
            'annual_population_stats.*.total_people' => ['required', 'integer', 'min:0'],
            'annual_population_stats.*.notes' => ['nullable', 'string'],
            'vulnerable_group_annuals' => ['nullable', 'array', 'max:100'],
            'vulnerable_group_annuals.*.vulnerable_category' => ['nullable', 'string', 'max:150'],
            'vulnerable_group_annuals.*.year' => ['required', 'integer', 'min:1900', 'max:'.(now()->year + 1)],
            'vulnerable_group_annuals.*.total_people' => ['required', 'integer', 'min:0'],
            'vulnerable_group_annuals.*.notes' => ['nullable', 'string'],
            'active_group_annuals' => ['nullable', 'array', 'max:100'],
            'active_group_annuals.*.active_category' => ['nullable', 'string', 'max:150'],
            'active_group_annuals.*.year' => ['required', 'integer', 'min:1900', 'max:'.(now()->year + 1)],
            'active_group_annuals.*.value' => ['required', 'integer', 'min:0'],
            'active_group_annuals.*.notes' => ['nullable', 'string'],
        ];
    }

    /**
     * @return array<int, callable(Validator): void>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                $populationKeys = collect($this->input('annual_population_stats', []))
                    ->map(fn (array $row): string => implode('|', [
                        $row['year'] ?? '',
                        $row['category_value'] ?? '',
                    ]))
                    ->filter(fn (string $key): bool => trim(str_replace('|', '', $key)) !== '');

                if ($populationKeys->duplicates()->isNotEmpty()) {
                    $validator->errors()->add('annual_population_stats', 'Kombinasi tahun dan kategori penduduk tidak boleh duplikat.');
                }

                $vulnerableYears = collect($this->input('vulnerable_group_annuals', []))
                    ->pluck('year')
                    ->filter()
                    ->map(fn (mixed $year): int => (int) $year);

                if ($vulnerableYears->duplicates()->isNotEmpty()) {
                    $validator->errors()->add('vulnerable_group_annuals', 'Tahun kelompok rentan tidak boleh duplikat.');
                }

                $activeYears = collect($this->input('active_group_annuals', []))
                    ->pluck('year')
                    ->filter()
                    ->map(fn (mixed $year): int => (int) $year);

                if ($activeYears->duplicates()->isNotEmpty()) {
                    $validator->errors()->add('active_group_annuals', 'Tahun kelompok aktif tidak boleh duplikat.');
                }
            },
        ];
    }

    /**
     * @param  mixed  $rows
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
