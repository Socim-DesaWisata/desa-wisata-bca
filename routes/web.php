<?php

use App\Http\Controllers\SurveyQuestionController;
use App\Http\Controllers\TourismVillageController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/users', [UserController::class, 'index'])->name('users');
Route::post('/users', [UserController::class, 'store'])->name('users.store');
Route::patch('/users/{user}/password', [UserController::class, 'resetPassword'])->name('users.password.update');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/villages', [TourismVillageController::class, 'index'])->name('villages');
    Route::post('/villages', [TourismVillageController::class, 'store'])->name('villages.store');
});
Route::get('/questions', SurveyQuestionController::class)->name('questions');
Route::patch('/questions/templates/{template}', [SurveyQuestionController::class, 'updateTemplate'])
    ->name('questions.templates.update');
Route::post('/questions', [SurveyQuestionController::class, 'store'])->name('questions.store');
Route::patch('/questions/{question}', [SurveyQuestionController::class, 'update'])->name('questions.update');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
