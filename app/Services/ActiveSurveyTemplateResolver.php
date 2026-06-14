<?php

namespace App\Services;

use App\Models\SurveyTemplate;

class ActiveSurveyTemplateResolver
{
    /**
     * @param  array<string, mixed>  $with
     * @param  array<int, string>  $columns
     */
    public function resolve(string $type, array $with = [], array $columns = ['id', 'title', 'description', 'status', 'published_at', 'type']): ?SurveyTemplate
    {
        return SurveyTemplate::query()
            ->select($columns)
            ->where('type', $type)
            ->where('status', 'published')
            ->with($with)
            ->latest('published_at')
            ->latest('id')
            ->first();
    }
}
