<?php

namespace App\Http\Controllers;

use App\Exports\TourismVillageExport;
use App\Http\Requests\TourismVillages\IndexTourismVillageRequest;
use App\Http\Requests\TourismVillages\StoreTourismVillageRequest;
use App\Http\Requests\TourismVillages\UpdateTourismVillageRequest;
use App\Models\TourismVillage;
use App\Services\TourismVillageService;
use Illuminate\Http\RedirectResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Inertia\Inertia;
use Inertia\Response;

class TourismVillageController extends Controller
{
    public function index(IndexTourismVillageRequest $request, TourismVillageService $service): Response
    {
        return Inertia::render('villages/index', $service->getIndexData($request->validated()));
    }

    public function export(TourismVillageExport $export): BinaryFileResponse
    {
        $file = $export->export();

        return response()->download($file['path'], $file['filename'])->deleteFileAfterSend(true);
    }

    public function store(StoreTourismVillageRequest $request, TourismVillageService $service): RedirectResponse
    {
        $service->create($request->validated(), $request->user());

        return back()->with('success', 'Desa wisata berhasil dibuat.');
    }

    public function show(TourismVillage $village, TourismVillageService $service): Response
    {
        return Inertia::render('villages/show', $service->getDetailData($village));
    }

    public function edit(TourismVillage $village, TourismVillageService $service): Response
    {
        return Inertia::render('villages/edit', $service->getEditData($village));
    }

    public function update(
        UpdateTourismVillageRequest $request,
        TourismVillage $village,
        TourismVillageService $service
    ): RedirectResponse {
        $service->update($village, $request->validated(), $request->user());

        return back()->with('success', 'Desa wisata berhasil diperbarui.');
    }

    public function destroy(
        TourismVillage $village,
        TourismVillageService $service
    ): RedirectResponse {
        $service->delete($village);

        return back()->with('success', 'Desa wisata berhasil dipindahkan ke trash.');
    }

    public function restore(
        int $village,
        TourismVillageService $service
    ): RedirectResponse {
        $service->restore($village);

        return redirect()
            ->route('villages', ['view' => 'trash'])
            ->with('success', 'Desa wisata berhasil dipulihkan.');
    }
}
