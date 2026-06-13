<?php

use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataSuveyOption;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use App\Models\UmkmSurveyQuestion;
use App\Models\User;
use Database\Seeders\SQLSurveyQuestionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('sql survey question seeder imports question data from sql dump', function () {
    $this->seed(SQLSurveyQuestionSeeder::class);

    expect(User::query()->find(3))->not->toBeNull()
        ->and(SurveyTemplate::query()->count())->toBe(3)
        ->and(SurveyTemplate::query()->orderBy('id')->pluck('type')->all())->toBe(['village', 'umkm', 'pariwisata'])
        ->and(SurveyQuestion::query()->count())->toBeGreaterThan(0)
        ->and(SurveyQuestionOption::query()->count())->toBeGreaterThan(0)
        ->and(UmkmSurveyQuestion::query()->count())->toBeGreaterThan(0)
        ->and(PariwisataSurveyQuestion::query()->count())->toBeGreaterThan(0)
        ->and(PariwisataSuveyOption::query()->count())->toBeGreaterThan(0);
});
