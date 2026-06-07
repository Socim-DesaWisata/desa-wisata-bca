<?php

namespace App\Http\Controllers;

use App\Exports\VillageSurveyAssignmentExport;
use App\Http\Requests\VillageSurveyAssignments\IndexVillageSurveyAssignmentRequest;
use App\Http\Requests\VillageSurveyAssignments\StorePariwisataSurveyAssignmentRequest;
use App\Http\Requests\VillageSurveyAssignments\StorePariwisataSurveyDraftRequest;
use App\Http\Requests\VillageSurveyAssignments\StoreSurveyAnswerDraftRequest;
use App\Http\Requests\VillageSurveyAssignments\StoreUmkmSurveyAssignmentRequest;
use App\Http\Requests\VillageSurveyAssignments\StoreVillageSurveyAssignmentRequest;
use App\Http\Requests\VillageSurveyAssignments\StoreVillageUmkmDocumentRequest;
use App\Http\Requests\VillageSurveyAssignments\UpdatePariwisataSurveyAssignmentRequest;
use App\Http\Requests\VillageSurveyAssignments\UpdateUmkmSurveyAnswerRequest;
use App\Http\Requests\VillageSurveyAssignments\UpdateUmkmSurveyAssignmentRequest;
use App\Http\Requests\VillageSurveyAssignments\UpdateVillageAnnualDataRequest;
use App\Http\Requests\VillageSurveyAssignments\UpdateVillageSurveyAssignmentRequest;
use App\Http\Requests\VillageSurveyAssignments\UpdateVillageUmkmDocumentRequest;
use App\Models\PariwisataSurveyAnswerDocument;
use App\Models\PariwisataVillage;
use App\Models\SurveyAnswerDocument;
use App\Models\UmkmSurveyAnswer;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageUmkm;
use App\Models\VillageUmkmDocument;
use App\Services\PariwisataSurveyAssignmentService;
use App\Services\UmkmSurveyAssignmentService;
use App\Services\VillageSurveyAssignmentService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

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

    public function createUmkm(
        VillageSurveyAssignment $assignment,
        UmkmSurveyAssignmentService $service
    ): Response {
        return Inertia::render('survey-assignment/create-umkm', $service->getCreateData($assignment));
    }

    public function storeUmkm(
        StoreUmkmSurveyAssignmentRequest $request,
        VillageSurveyAssignment $assignment,
        UmkmSurveyAssignmentService $service
    ): RedirectResponse {
        $service->createWithSurvey($request->validated(), $request->user(), $assignment);

        return redirect()
            ->route('survey-assignments.show', $assignment)
            ->with('success', 'Data UMKM dan assessment berhasil disimpan.');
    }

    public function createPariwisata(
        VillageSurveyAssignment $assignment,
        PariwisataSurveyAssignmentService $service
    ): Response {
        return Inertia::render('survey-assignment/create-pariwisata', $service->getCreateData($assignment));
    }

    public function storePariwisata(
        StorePariwisataSurveyAssignmentRequest $request,
        VillageSurveyAssignment $assignment,
        PariwisataSurveyAssignmentService $service
    ): RedirectResponse {
        $service->create($request->validated(), $request->user(), $assignment);

        return redirect()
            ->route('survey-assignments.show', $assignment)
            ->with('success', 'Data pariwisata berhasil disimpan.');
    }

    public function show(
        VillageSurveyAssignment $assignment,
        VillageSurveyAssignmentService $service
    ): Response {
        return Inertia::render('survey-assignment/show', $service->getShowData($assignment));
    }

    public function export(
        VillageSurveyAssignment $assignment,
        VillageSurveyAssignmentExport $export
    ): BinaryFileResponse {
        $file = $export->export($assignment);

        return response()->download($file['path'], $file['filename'])->deleteFileAfterSend(true);
    }

    public function showPariwisata(
        VillageSurveyAssignment $assignment,
        PariwisataVillage $pariwisata,
        VillageSurveyAssignmentService $service
    ): Response {
        return Inertia::render('survey-assignment/show-pariwisata', $service->getPariwisataShowData($assignment, $pariwisata));
    }

    public function updatePariwisata(
        UpdatePariwisataSurveyAssignmentRequest $request,
        VillageSurveyAssignment $assignment,
        PariwisataVillage $pariwisata,
        PariwisataSurveyAssignmentService $service
    ): RedirectResponse {
        $service->update($request->validated(), $request->user(), $assignment, $pariwisata);

        return back()->with('success', 'Data pariwisata berhasil diperbarui.');
    }

    public function showUmkm(
        VillageSurveyAssignment $assignment,
        VillageUmkm $umkm,
        VillageSurveyAssignmentService $service
    ): Response {
        return Inertia::render('survey-assignment/show-umkm', $service->getUmkmShowData($assignment, $umkm));
    }

    public function updateUmkm(
        UpdateUmkmSurveyAssignmentRequest $request,
        VillageSurveyAssignment $assignment,
        VillageUmkm $umkm,
        UmkmSurveyAssignmentService $service
    ): RedirectResponse {
        $service->updateMaster($request->validated(), $assignment, $umkm);

        return back()->with('success', 'Data master UMKM berhasil diperbarui.');
    }

    public function updateUmkmSurveyAnswer(
        UpdateUmkmSurveyAnswerRequest $request,
        VillageSurveyAssignment $assignment,
        VillageUmkm $umkm,
        UmkmSurveyAnswer $answer,
        UmkmSurveyAssignmentService $service
    ): RedirectResponse {
        $service->updateAnswer($request->validated(), $request->user(), $assignment, $umkm, $answer);

        return back()->with('success', 'Jawaban survey UMKM berhasil diperbarui.');
    }

    public function storeUmkmDocument(
        StoreVillageUmkmDocumentRequest $request,
        VillageSurveyAssignment $assignment,
        VillageUmkm $umkm,
        UmkmSurveyAssignmentService $service
    ): RedirectResponse {
        $service->createDocument($request->validated(), $request->user(), $assignment, $umkm);

        return back()->with('success', 'Dokumen UMKM berhasil ditambahkan.');
    }

    public function updateUmkmDocument(
        UpdateVillageUmkmDocumentRequest $request,
        VillageSurveyAssignment $assignment,
        VillageUmkm $umkm,
        VillageUmkmDocument $document,
        UmkmSurveyAssignmentService $service
    ): RedirectResponse {
        $service->updateDocument($request->validated(), $assignment, $umkm, $document);

        return back()->with('success', 'Dokumen UMKM berhasil diperbarui.');
    }

    public function destroyUmkmDocument(
        VillageSurveyAssignment $assignment,
        VillageUmkm $umkm,
        VillageUmkmDocument $document,
        UmkmSurveyAssignmentService $service
    ): RedirectResponse {
        $service->deleteDocument($assignment, $umkm, $document);

        return back()->with('success', 'Dokumen UMKM berhasil dihapus.');
    }

    public function takePariwisataSurvey(
        VillageSurveyAssignment $assignment,
        PariwisataVillage $pariwisata,
        VillageSurveyAssignmentService $service
    ): Response {
        return Inertia::render('survey-assignment/take-survey-pariwisata', $service->getTakePariwisataSurveyData($assignment, $pariwisata));
    }

    public function storePariwisataSurveyDraft(
        StorePariwisataSurveyDraftRequest $request,
        VillageSurveyAssignment $assignment,
        PariwisataVillage $pariwisata,
        VillageSurveyAssignmentService $service
    ): RedirectResponse {
        $service->savePariwisataSurveyDraft($assignment, $pariwisata, $request->validated(), $request->user());

        return back()->with('success', 'Draft survey pariwisata berhasil disimpan.');
    }

    public function destroyPariwisataSurveyDocument(
        VillageSurveyAssignment $assignment,
        PariwisataVillage $pariwisata,
        PariwisataSurveyAnswerDocument $document,
        VillageSurveyAssignmentService $service
    ): RedirectResponse {
        $service->deletePariwisataSurveyDocument($assignment, $pariwisata, $document);

        return back()->with('success', 'Dokumen survey pariwisata berhasil dihapus.');
    }

    public function update(
        UpdateVillageSurveyAssignmentRequest $request,
        VillageSurveyAssignment $assignment,
        VillageSurveyAssignmentService $service
    ): RedirectResponse {
        $service->update($assignment, $request->validated(), $request->user());

        return back()->with('success', 'Survey assignment berhasil diperbarui.');
    }

    public function updateVillageAnnualData(
        UpdateVillageAnnualDataRequest $request,
        VillageSurveyAssignment $assignment,
        VillageSurveyAssignmentService $service
    ): RedirectResponse {
        $service->updateVillageAnnualData($assignment, $request->validated(), $request->user());

        return back()->with('success', 'Data tahunan desa berhasil diperbarui.');
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
