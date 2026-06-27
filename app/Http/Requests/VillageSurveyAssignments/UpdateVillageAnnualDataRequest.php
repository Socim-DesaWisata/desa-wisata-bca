<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Collection;
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
                $populationKeys = $this->duplicateKeys(
                    $this->input('annual_population_stats', []),
                    'category_value'
                );

                if ($populationKeys->isNotEmpty()) {
                    $validator->errors()->add('annual_population_stats', 'Kombinasi tahun dan kategori penduduk tidak boleh duplikat.');
                }

                $vulnerableKeys = $this->duplicateKeys(
                    $this->input('vulnerable_group_annuals', []),
                    'vulnerable_category'
                );

                if ($vulnerableKeys->isNotEmpty()) {
                    $validator->errors()->add('vulnerable_group_annuals', 'Kombinasi tahun dan kategori kelompok rentan tidak boleh duplikat.');
                }

                $activeKeys = $this->duplicateKeys(
                    $this->input('active_group_annuals', []),
                    'active_category'
                );

                if ($activeKeys->isNotEmpty()) {
                    $validator->errors()->add('active_group_annuals', 'Kombinasi tahun dan kategori kelompok aktif tidak boleh duplikat.');
                }
            },
        ];
    }

    /**
     * @return Collection<int, string>
     */
    private function duplicateKeys(mixed $rows, string $categoryKey): Collection
    {
        if (! is_array($rows)) {
            return collect();
        }

        return collect($rows)
            ->map(fn (array $row): string => implode('|', [
                $row['year'] ?? '',
                str((string) ($row[$categoryKey] ?? ''))->trim()->lower()->toString(),
            ]))
            ->filter(fn (string $key): bool => trim(str_replace('|', '', $key)) !== '')
            ->duplicates()
            ->values();
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
