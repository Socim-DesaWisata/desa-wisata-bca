<?php

namespace App\Http\Controllers;

use App\Http\Requests\SurveyQuestions\IndexSurveyQuestionRequest;
use App\Http\Requests\SurveyQuestions\UpdatePariwisataSurveyQuestionRequest;
use App\Http\Requests\SurveyQuestions\StoreSurveyQuestionRequest;
use App\Http\Requests\SurveyQuestions\UpdateSurveyQuestionRequest;
use App\Http\Requests\SurveyQuestions\UpdateSurveyTemplateRequest;
use App\Http\Requests\SurveyQuestions\UpdateUmkmSurveyQuestionRequest;
use App\Models\PariwisataSurveyQuestion;
use App\Models\SurveyQuestion;
use App\Models\SurveyTemplate;
use App\Models\UmkmSurveyQuestion;
use App\Services\SurveyQuestionService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SurveyQuestionController extends Controller
{
    public function __invoke(SurveyQuestionService $service): Response
    {
        return Inertia::render('questions/templates', $service->getTemplateIndexData());
    }

    public function show(
        IndexSurveyQuestionRequest $request,
        SurveyTemplate $template,
        SurveyQuestionService $service
    ): Response {
        return Inertia::render('questions/index', $service->getIndexData($template, $request->validated()));
    }

    public function updateTemplate(
        UpdateSurveyTemplateRequest $request,
        SurveyTemplate $template,
        SurveyQuestionService $service
    ): RedirectResponse {
        $service->updateTemplate($template, $request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Template berhasil diperbarui.']);

        return back();
    }

    public function store(StoreSurveyQuestionRequest $request, SurveyQuestionService $service): RedirectResponse
    {
        $service->createQuestion($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pertanyaan berhasil ditambahkan.']);

        return back();
    }

    public function update(
        UpdateSurveyQuestionRequest $request,
        SurveyQuestion $question,
        SurveyQuestionService $service
    ): RedirectResponse {
        $service->updateQuestion($question, $request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pertanyaan berhasil diperbarui.']);

        return back();
    }

    public function updateUmkm(
        UpdateUmkmSurveyQuestionRequest $request,
        UmkmSurveyQuestion $question,
        SurveyQuestionService $service
    ): RedirectResponse {
        $service->updateUmkmQuestion($question, $request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pertanyaan UMKM berhasil diperbarui.']);

        return back();
    }

    public function updatePariwisata(
        UpdatePariwisataSurveyQuestionRequest $request,
        PariwisataSurveyQuestion $question,
        SurveyQuestionService $service
    ): RedirectResponse {
        $service->updatePariwisataQuestion($question, $request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pertanyaan ISTC berhasil diperbarui.']);

        return back();
    }
}
