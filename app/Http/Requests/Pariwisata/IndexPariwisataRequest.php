<?php

namespace App\Http\Requests\Pariwisata;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexPariwisataRequest extends FormRequest
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
            'category' => ['nullable', 'string', 'max:150'],
            'is_active' => ['nullable', 'string', Rule::in(['1', '0'])],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:50'],
        ];
    }
}
