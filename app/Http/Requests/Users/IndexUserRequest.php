<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexUserRequest extends FormRequest
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
            'role' => ['nullable', 'string', Rule::in(['admin', 'enumerator'])],
            'status' => ['nullable', 'string', Rule::in(['active', 'inactive', 'pending'])],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:50'],
        ];
    }
}
