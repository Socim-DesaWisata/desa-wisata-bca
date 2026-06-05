<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin',
                'password' => 'admin123',
                'role' => 'admin',
                'status' => 'active',
            ],
        );

        $this->call([
            TemplateQuestionSeeder::class,
            UMKMSurveySeeder::class,
            PariwisataSurveySeeder::class,
        ]);
    }
}
