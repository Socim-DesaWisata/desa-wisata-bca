<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyQuestionController;
use App\Http\Controllers\TourismVillageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VillageSurveyAssignmentController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/users', [UserController::class, 'index'])->name('users');
Route::post('/users', [UserController::class, 'store'])->name('users.store');
Route::patch('/users/{user}/password', [UserController::class, 'resetPassword'])->name('users.password.update');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/villages', [TourismVillageController::class, 'index'])->name('villages');
    Route::post('/villages', [TourismVillageController::class, 'store'])->name('villages.store');
    Route::get('/villages/{village}', [TourismVillageController::class, 'show'])->name('villages.show');
    Route::get('/villages/{village}/edit', [TourismVillageController::class, 'edit'])->name('villages.edit');
    Route::patch('/villages/{village}', [TourismVillageController::class, 'update'])->name('villages.update');
    Route::get('/survey-assignments', [VillageSurveyAssignmentController::class, 'index'])->name('survey-assignments');
    Route::post('/survey-assignments', [VillageSurveyAssignmentController::class, 'store'])->name('survey-assignments.store');
    Route::get('/survey-assignments/{assignment}', [VillageSurveyAssignmentController::class, 'show'])
        ->name('survey-assignments.show');
    Route::patch('/survey-assignments/{assignment}', [VillageSurveyAssignmentController::class, 'update'])
        ->name('survey-assignments.update');
    Route::get('/survey-assignments/{assignment}/take-survey', [VillageSurveyAssignmentController::class, 'takeSurvey'])
        ->name('survey-assignments.take-survey');
    Route::post('/survey-assignments/{assignment}/take-survey', [VillageSurveyAssignmentController::class, 'storeSurveyDraft'])
        ->name('survey-assignments.take-survey.store');
    Route::delete('/survey-assignments/{assignment}/take-survey/documents/{document}', [VillageSurveyAssignmentController::class, 'destroySurveyDocument'])
        ->name('survey-assignments.take-survey.documents.destroy');
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
});
Route::get('/questions', SurveyQuestionController::class)->name('questions');
Route::patch('/questions/templates/{template}', [SurveyQuestionController::class, 'updateTemplate'])
    ->name('questions.templates.update');
Route::post('/questions', [SurveyQuestionController::class, 'store'])->name('questions.store');
Route::patch('/questions/{question}', [SurveyQuestionController::class, 'update'])->name('questions.update');

require __DIR__.'/settings.php';
