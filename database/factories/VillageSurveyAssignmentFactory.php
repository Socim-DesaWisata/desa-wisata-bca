<?php

namespace Database\Factories;

use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VillageSurveyAssignment>
 */
class VillageSurveyAssignmentFactory extends Factory
{
    protected $model = VillageSurveyAssignment::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $assignedAt = fake()->dateTimeBetween('-1 month', '-1 week');

        return [
            'village_id' => TourismVillage::factory(),
            'survey_template_id' => SurveyTemplate::factory(),
            'status' => fake()->randomElement(['assigned', 'in_progress', 'submitted', 'approved', 'need_revision', 'rejected']),
            'assigned_by' => User::factory(),
            'submitted_by' => null,
            'reviewed_by' => null,
            'assigned_at' => $assignedAt,
            'started_at' => fake()->optional()->dateTimeBetween($assignedAt, 'now'),
            'last_saved_at' => fake()->optional()->dateTimeBetween($assignedAt, 'now'),
            'submitted_at' => null,
            'reviewed_at' => null,
        ];
    }
}
