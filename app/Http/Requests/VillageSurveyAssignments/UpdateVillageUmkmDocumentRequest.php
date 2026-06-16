<?php

namespace App\Http\Requests\VillageSurveyAssignments;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVillageUmkmDocumentRequest extends FormRequest
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
            'document_name' => ['required', 'string', 'max:180'],
            'file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,pdf', 'max:51200'],
        ];
    }
}
