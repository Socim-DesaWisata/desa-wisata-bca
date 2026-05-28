<?php

namespace Database\Factories;

use App\Models\TourismVillage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<TourismVillage>
 */
class TourismVillageFactory extends Factory
{
    protected $model = TourismVillage::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = 'Desa Wisata '.fake()->unique()->city();

        return [
            'code' => 'DW-'.fake()->unique()->bothify('??-###'),
            'name' => $name,
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(100, 999),
            'description' => fake()->paragraph(),
            'province' => fake()->state(),
            'city' => fake()->city(),
            'district' => fake()->city(),
            'subdistrict' => fake()->streetName(),
            'address' => fake()->address(),
            'postal_code' => fake()->postcode(),
            'latitude' => fake()->latitude(-8, 6),
            'longitude' => fake()->longitude(95, 141),
            'maps_url' => fake()->url(),
            'manager_name' => fake()->company(),
            'manager_phone' => fake()->phoneNumber(),
            'manager_email' => fake()->companyEmail(),
            'status' => fake()->randomElement(['draft', 'active', 'verified', 'review', 'archived']),
            'created_by' => User::factory(),
        ];
    }
}
