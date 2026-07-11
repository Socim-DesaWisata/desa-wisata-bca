<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:30'],
            'role' => ['required', 'string', Rule::in(['admin', 'enumerator', 'viewer'])],
            'status' => ['required', 'string', Rule::in(['active', 'inactive', 'pending'])],
            'password' => ['required', 'confirmed', 'min:8'],
        ];
    }
}
