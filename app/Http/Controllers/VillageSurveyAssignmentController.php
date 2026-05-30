<?php

namespace App\Http\Controllers;

use App\Http\Requests\VillageSurveyAssignments\IndexVillageSurveyAssignmentRequest;
use App\Http\Requests\VillageSurveyAssignments\StoreSurveyAnswerDraftRequest;
use App\Http\Requests\VillageSurveyAssignments\StoreVillageSurveyAssignmentRequest;
use App\Http\Requests\VillageSurveyAssignments\UpdateVillageSurveyAssignmentRequest;
use App\Models\SurveyAnswerDocument;
use App\Models\VillageSurveyAssignment;
use App\Services\VillageSurveyAssignmentService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class VillageSurveyAssignmentController extends Controller
{
    public function index(
        IndexVillageSurveyAssignmentRequest $request,
        VillageSurveyAssignmentService $service
    ): Response {
        return Inertia::render('survey-assignment/index', $service->getIndexData($request->validated()));
    }

    public function store(
        StoreVillageSurveyAssignmentRequest $request,
        VillageSurveyAssignmentService $service
    ): RedirectResponse {
        $service->create($request->validated(), $request->user());

        return back()->with('success', 'Survey assignment berhasil dibuat.');
    }

    public function show(
        VillageSurveyAssignment $assignment,
        VillageSurveyAssignmentService $service
    ): Response {
        return Inertia::render('survey-assignment/show', $service->getShowData($assignment));
    }

    public function update(
        UpdateVillageSurveyAssignmentRequest $request,
        VillageSurveyAssignment $assignment,
        VillageSurveyAssignmentService $service
    ): RedirectResponse {
        $service->update($assignment, $request->validated(), $request->user());

        return back()->with('success', 'Survey assignment berhasil diperbarui.');
    }

    public function takeSurvey(
        VillageSurveyAssignment $assignment,
        VillageSurveyAssignmentService $service
    ): Response {
        return Inertia::render('survey/take-survey', $service->getTakeSurveyData($assignment));
    }

    public function storeSurveyDraft(
        StoreSurveyAnswerDraftRequest $request,
        VillageSurveyAssignment $assignment,
        VillageSurveyAssignmentService $service
    ): RedirectResponse {
        $service->saveSurveyDraft($assignment, $request->validated(), $request->user());

        return back()->with('success', 'Draft survey berhasil disimpan.');
    }

    public function destroySurveyDocument(
        VillageSurveyAssignment $assignment,
        SurveyAnswerDocument $document,
        VillageSurveyAssignmentService $service
    ): RedirectResponse {
        $service->deleteSurveyDocument($assignment, $document);

        return back()->with('success', 'Dokumen survey berhasil dihapus.');
    }
}
