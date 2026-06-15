<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'status' => 'active',
            ],
        );

        User::query()->firstOrCreate(
            ['email' => 'enum@gmail.com'],
            [
                'name' => 'Enum SOCIM',
                'password' => Hash::make('enum12345'),
                'role' => 'enumerator',
                'status' => 'active',
            ],
        );

        $this->call([
            // SQLSurveyQuestionSeeder::class
            TemplateQuestionSeeder::class,
            UMKMSurveySeeder::class,
            PariwisataSurveySeeder::class,
        ]);
    }
}
