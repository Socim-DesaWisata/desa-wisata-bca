<?php

namespace App\Http\Requests\Umkm;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexUmkmRequest extends FormRequest
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
            'product_category' => ['nullable', 'string', 'max:150'],
            'has_exported' => ['nullable', 'string', Rule::in(['1', '0'])],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:50'],
        ];
    }
}
