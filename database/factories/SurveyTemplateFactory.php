<?php

namespace Database\Factories;

use App\Models\SurveyTemplate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SurveyTemplate>
 */
class SurveyTemplateFactory extends Factory
{
    protected $model = SurveyTemplate::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => 'Template '.fake()->unique()->words(3, true),
            'description' => fake()->sentence(),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
            'created_by' => User::factory(),
            'published_at' => null,
        ];
    }
}
