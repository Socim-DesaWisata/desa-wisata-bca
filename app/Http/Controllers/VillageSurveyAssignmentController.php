<?php

namespace App\Http\Controllers;

use App\Http\Requests\VillageSurveyAssignments\IndexVillageSurveyAssignmentRequest;
use App\Http\Requests\VillageSurveyAssignments\StoreVillageSurveyAssignmentRequest;
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
        $service->create($request->validated());

        return back()->with('success', 'Survey assignment berhasil dibuat.');
    }

    public function takeSurvey(
        VillageSurveyAssignment $assignment,
        VillageSurveyAssignmentService $service
    ): Response {
        return Inertia::render('survey/take-survey', $service->getTakeSurveyData($assignment));
    }
}
