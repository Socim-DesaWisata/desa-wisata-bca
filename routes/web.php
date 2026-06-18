<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PariwisataController;
use App\Http\Controllers\SurveyQuestionController;
use App\Http\Controllers\TourismVillageController;
use App\Http\Controllers\UmkmController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VillageSurveyAssignmentController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/', '/dashboard')->name('home');
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::middleware('role:admin')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::patch('/users/{user}/password', [UserController::class, 'resetPassword'])->name('users.password.update');
        Route::patch('/users/{user}/role', [UserController::class, 'updateRole'])->name('users.role.update');

        Route::get('/questions', SurveyQuestionController::class)->name('questions');
        Route::patch('/questions/templates/{template}', [SurveyQuestionController::class, 'updateTemplate'])
            ->name('questions.templates.update');
        Route::get('/questions/{template}/export', [SurveyQuestionController::class, 'export'])->name('questions.export');
        Route::get('/questions/{template}', [SurveyQuestionController::class, 'show'])->name('questions.show');
        Route::patch('/questions/umkm/{question}', [SurveyQuestionController::class, 'updateUmkm'])
            ->name('questions.umkm.update');
        Route::patch('/questions/pariwisata/{question}', [SurveyQuestionController::class, 'updatePariwisata'])
            ->name('questions.pariwisata.update');
        Route::patch('/questions/{question}', [SurveyQuestionController::class, 'update'])->name('questions.update');
    });

    Route::get('/villages', [TourismVillageController::class, 'index'])->name('villages');
    Route::post('/villages', [TourismVillageController::class, 'store'])->name('villages.store');
    Route::get('/villages/{village}', [TourismVillageController::class, 'show'])->name('villages.show');
    Route::get('/villages/{village}/edit', [TourismVillageController::class, 'edit'])->name('villages.edit');
    Route::patch('/villages/{village}', [TourismVillageController::class, 'update'])->name('villages.update');
    Route::delete('/villages/{village}', [TourismVillageController::class, 'destroy'])->name('villages.destroy');
    Route::patch('/villages/{village}/restore', [TourismVillageController::class, 'restore'])->name('villages.restore');

    Route::get('/umkm', [UmkmController::class, 'index'])->name('umkm');
    Route::delete('/umkm/{umkm}', [UmkmController::class, 'destroy'])->name('umkm.destroy');
    Route::patch('/umkm/{umkm}/restore', [UmkmController::class, 'restore'])->name('umkm.restore');

    Route::get('/pariwisata', [PariwisataController::class, 'index'])->name('pariwisata');
    Route::delete('/pariwisata/{pariwisata}', [PariwisataController::class, 'destroy'])->name('pariwisata.destroy');
    Route::patch('/pariwisata/{pariwisata}/restore', [PariwisataController::class, 'restore'])->name('pariwisata.restore');

    Route::get('/survey-assignments', [VillageSurveyAssignmentController::class, 'index'])->name('survey-assignments');
    Route::post('/survey-assignments', [VillageSurveyAssignmentController::class, 'store'])->name('survey-assignments.store');
    Route::delete('/survey-assignments/{assignment}', [VillageSurveyAssignmentController::class, 'destroy'])->name('survey-assignments.destroy');
    Route::patch('/survey-assignments/{assignment}/restore', [VillageSurveyAssignmentController::class, 'restore'])->name('survey-assignments.restore');
    Route::get('/survey-assignments/{assignment}/create/umkm', [VillageSurveyAssignmentController::class, 'createUmkm'])
        ->name('survey-assignments.create-umkm');
    Route::post('/survey-assignments/{assignment}/create/umkm', [VillageSurveyAssignmentController::class, 'storeUmkm'])
        ->name('survey-assignments.create-umkm.store');
    Route::get('/survey-assignments/{assignment}/create/pariwisata', [VillageSurveyAssignmentController::class, 'createPariwisata'])
        ->name('survey-assignments.create-pariwisata');
    Route::post('/survey-assignments/{assignment}/create/pariwisata', [VillageSurveyAssignmentController::class, 'storePariwisata'])
        ->name('survey-assignments.create-pariwisata.store');
    Route::get('/survey-assignments/{assignment}/pariwisata/take-survey', [VillageSurveyAssignmentController::class, 'takePariwisataSurvey'])
        ->name('survey-assignments.pariwisata.take-survey');
    Route::post('/survey-assignments/{assignment}/pariwisata/take-survey', [VillageSurveyAssignmentController::class, 'storePariwisataSurveyDraft'])
        ->name('survey-assignments.pariwisata.take-survey.store');
    Route::delete('/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}', [VillageSurveyAssignmentController::class, 'destroyPariwisataSurveyDocument'])
        ->name('survey-assignments.pariwisata.take-survey.documents.destroy');
    Route::get('/survey-assignments/{assignment}/pariwisata/export-survey', [VillageSurveyAssignmentController::class, 'downloadPariwisataSurveyExport'])
        ->name('survey-assignments.pariwisata.export-survey');
    Route::get('/survey-assignments/{assignment}/pariwisata/{pariwisata}', [VillageSurveyAssignmentController::class, 'showPariwisata'])
        ->name('survey-assignments.pariwisata.show');
    Route::get('/survey-assignments/{assignment}/pariwisata/{pariwisata}/export', [VillageSurveyAssignmentController::class, 'exportPariwisata'])
        ->name('survey-assignments.pariwisata.export');
    Route::patch('/survey-assignments/{assignment}/pariwisata/{pariwisata}', [VillageSurveyAssignmentController::class, 'updatePariwisata'])
        ->name('survey-assignments.pariwisata.update');
    Route::get('/survey-assignments/{assignment}/umkm/{umkm}/export', [VillageSurveyAssignmentController::class, 'exportUmkm'])
        ->name('survey-assignments.umkm.export');
    Route::get('/survey-assignments/{assignment}/umkm/{umkm}', [VillageSurveyAssignmentController::class, 'showUmkm'])
        ->name('survey-assignments.umkm.show');
    Route::patch('/survey-assignments/{assignment}/umkm/{umkm}', [VillageSurveyAssignmentController::class, 'updateUmkm'])
        ->name('survey-assignments.umkm.update');
    Route::patch('/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}', [VillageSurveyAssignmentController::class, 'updateUmkmSurveyAnswer'])
        ->name('survey-assignments.umkm.answers.update');
    Route::post('/survey-assignments/{assignment}/umkm/{umkm}/documents', [VillageSurveyAssignmentController::class, 'storeUmkmDocument'])
        ->name('survey-assignments.umkm.documents.store');
    Route::patch('/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}', [VillageSurveyAssignmentController::class, 'updateUmkmDocument'])
        ->name('survey-assignments.umkm.documents.update');
    Route::delete('/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}', [VillageSurveyAssignmentController::class, 'destroyUmkmDocument'])
        ->name('survey-assignments.umkm.documents.destroy');
    Route::get('/survey-assignments/{assignment}/export', [VillageSurveyAssignmentController::class, 'export'])
        ->name('survey-assignments.export');
    Route::patch('/survey-assignments/{assignment}/village-annual-data', [VillageSurveyAssignmentController::class, 'updateVillageAnnualData'])
        ->name('survey-assignments.village-annual-data.update');
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

    Route::get('/chatbot', function () {
        return Inertia\Inertia::render('chatbot/index');
    })->name('chatbot');
});

require __DIR__.'/settings.php';
