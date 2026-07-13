<?php

namespace App\Http\Requests\TourismVillages;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexTourismVillageRequest extends FormRequest
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
            'search' => ['nullable', 'string', 'max:150'],
            'status' => ['nullable', 'string', Rule::in(['draft', 'active', 'verified', 'review', 'archived'])],
            'province' => ['nullable', 'string', 'max:100'],
            'view' => ['nullable', 'string', Rule::in(['active', 'trash'])],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:50'],
            'sort_by' => ['nullable', 'string', Rule::in(['total_score', 'istc_score'])],
            'sort_direction' => ['nullable', 'string', Rule::in(['asc', 'desc'])],
            'jenis_desa' => ['nullable', 'string', Rule::in(['rintisan', 'berkembang', 'maju', 'mandiri'])],
        ];
    }
}
