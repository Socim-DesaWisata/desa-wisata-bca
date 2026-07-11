<?php

use App\Http\Controllers\DashboardApiController;
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
    Route::inertia('/detail', 'villages/detail');
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::prefix('api/dashboard')->group(function () {
        Route::get('/desa', [DashboardApiController::class, 'getDesa'])->name('api.dashboard.desa');
        Route::get('/desa/{code}/pariwisata', [DashboardApiController::class, 'getPariwisata'])->name('api.dashboard.pariwisata');
    });
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
    Route::post('/villages', [TourismVillageController::class, 'store'])->middleware('role:admin,enumerator')->name('villages.store');
    Route::get('/villages/{village}', [TourismVillageController::class, 'show'])->name('villages.show');
    Route::get('/villages/{village}/edit', [TourismVillageController::class, 'edit'])->middleware('role:admin,enumerator')->name('villages.edit');
    Route::patch('/villages/{village}', [TourismVillageController::class, 'update'])->middleware('role:admin,enumerator')->name('villages.update');
    Route::delete('/villages/{village}', [TourismVillageController::class, 'destroy'])->middleware('role:admin,enumerator')->name('villages.destroy');
    Route::patch('/villages/{village}/restore', [TourismVillageController::class, 'restore'])->middleware('role:admin,enumerator')->name('villages.restore');

    Route::get('/umkm', [UmkmController::class, 'index'])->name('umkm');
    Route::delete('/umkm/{umkm}', [UmkmController::class, 'destroy'])->middleware('role:admin,enumerator')->name('umkm.destroy');
    Route::patch('/umkm/{umkm}/restore', [UmkmController::class, 'restore'])->middleware('role:admin,enumerator')->name('umkm.restore');

    Route::get('/pariwisata', [PariwisataController::class, 'index'])->name('pariwisata');
    Route::delete('/pariwisata/{pariwisata}', [PariwisataController::class, 'destroy'])->middleware('role:admin,enumerator')->name('pariwisata.destroy');
    Route::patch('/pariwisata/{pariwisata}/restore', [PariwisataController::class, 'restore'])->middleware('role:admin,enumerator')->name('pariwisata.restore');

    Route::get('/survey-assignments', [VillageSurveyAssignmentController::class, 'index'])->name('survey-assignments');
    Route::post('/survey-assignments', [VillageSurveyAssignmentController::class, 'store'])->middleware('role:admin,enumerator')->name('survey-assignments.store');
    Route::patch('/survey-assignments/bulk-status', [VillageSurveyAssignmentController::class, 'bulkUpdateStatus'])
        ->middleware('role:admin')
        ->name('survey-assignments.bulk-status');

    Route::delete('/survey-assignments/{assignment}', [VillageSurveyAssignmentController::class, 'destroy'])->middleware('role:admin,enumerator')->name('survey-assignments.destroy');
    Route::patch('/survey-assignments/{assignment}/restore', [VillageSurveyAssignmentController::class, 'restore'])->middleware('role:admin,enumerator')->name('survey-assignments.restore');

    Route::get('/survey-assignments/{assignment}/create/umkm', [VillageSurveyAssignmentController::class, 'createUmkm'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.create-umkm');
    Route::post('/survey-assignments/{assignment}/create/umkm', [VillageSurveyAssignmentController::class, 'storeUmkm'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.create-umkm.store');

    Route::get('/survey-assignments/{assignment}/create/pariwisata', [VillageSurveyAssignmentController::class, 'createPariwisata'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.create-pariwisata');
    Route::post('/survey-assignments/{assignment}/create/pariwisata', [VillageSurveyAssignmentController::class, 'storePariwisata'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.create-pariwisata.store');

    Route::get('/survey-assignments/{assignment}/pariwisata/take-survey', [VillageSurveyAssignmentController::class, 'takePariwisataSurvey'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.pariwisata.take-survey');
    Route::post('/survey-assignments/{assignment}/pariwisata/take-survey', [VillageSurveyAssignmentController::class, 'storePariwisataSurveyDraft'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.pariwisata.take-survey.store');
    Route::delete('/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}', [VillageSurveyAssignmentController::class, 'destroyPariwisataSurveyDocument'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.pariwisata.take-survey.documents.destroy');
    Route::get('/survey-assignments/{assignment}/pariwisata/export-survey', [VillageSurveyAssignmentController::class, 'downloadPariwisataSurveyExport'])
        ->middleware('role:admin,enumerator,viewer')
        ->name('survey-assignments.pariwisata.export-survey');
    Route::get('/survey-assignments/{assignment}/pariwisata/{pariwisata}', [VillageSurveyAssignmentController::class, 'showPariwisata'])
        ->name('survey-assignments.pariwisata.show');
    Route::get('/survey-assignments/{assignment}/pariwisata/{pariwisata}/export', [VillageSurveyAssignmentController::class, 'exportPariwisata'])
        ->middleware('role:admin,enumerator,viewer')
        ->name('survey-assignments.pariwisata.export');
    Route::patch('/survey-assignments/{assignment}/pariwisata/{pariwisata}', [VillageSurveyAssignmentController::class, 'updatePariwisata'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.pariwisata.update');
    Route::get('/survey-assignments/{assignment}/umkm/{umkm}/export', [VillageSurveyAssignmentController::class, 'exportUmkm'])
        ->middleware('role:admin,enumerator,viewer')
        ->name('survey-assignments.umkm.export');
    Route::get('/survey-assignments/{assignment}/umkm/{umkm}', [VillageSurveyAssignmentController::class, 'showUmkm'])
        ->name('survey-assignments.umkm.show');
    Route::patch('/survey-assignments/{assignment}/umkm/{umkm}', [VillageSurveyAssignmentController::class, 'updateUmkm'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.umkm.update');
    Route::patch('/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}', [VillageSurveyAssignmentController::class, 'updateUmkmSurveyAnswer'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.umkm.answers.update');
    Route::post('/survey-assignments/{assignment}/umkm/{umkm}/documents', [VillageSurveyAssignmentController::class, 'storeUmkmDocument'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.umkm.documents.store');
    Route::patch('/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}', [VillageSurveyAssignmentController::class, 'updateUmkmDocument'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.umkm.documents.update');
    Route::delete('/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}', [VillageSurveyAssignmentController::class, 'destroyUmkmDocument'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.umkm.documents.destroy');
    Route::get('/survey-assignments/{assignment}/export', [VillageSurveyAssignmentController::class, 'export'])
        ->middleware('role:admin,enumerator,viewer')
        ->name('survey-assignments.export');
    Route::patch('/survey-assignments/{assignment}/village-annual-data', [VillageSurveyAssignmentController::class, 'updateVillageAnnualData'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.village-annual-data.update');

    Route::get('/survey-assignments/{assignment}', [VillageSurveyAssignmentController::class, 'show'])
        ->name('survey-assignments.show');
    Route::patch('/survey-assignments/{assignment}', [VillageSurveyAssignmentController::class, 'update'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.update');
    Route::get('/survey-assignments/{assignment}/take-survey', [VillageSurveyAssignmentController::class, 'takeSurvey'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.take-survey');
    Route::post('/survey-assignments/{assignment}/take-survey', [VillageSurveyAssignmentController::class, 'storeSurveyDraft'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.take-survey.store');
    Route::delete('/survey-assignments/{assignment}/take-survey/documents/{document}', [VillageSurveyAssignmentController::class, 'destroySurveyDocument'])
        ->middleware('role:admin,enumerator')
        ->name('survey-assignments.take-survey.documents.destroy');

    Route::get('/chatbot', function () {
        return Inertia\Inertia::render('chatbot/index');
    })->name('chatbot');
});

require __DIR__.'/settings.php';
