<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pariwisata\IndexPariwisataRequest;
use App\Models\PariwisataVillage;
use App\Services\PariwisataService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PariwisataController extends Controller
{
    public function index(IndexPariwisataRequest $request, PariwisataService $service): Response
    {
        return Inertia::render('pariwisata/index', $service->getIndexData($request->validated()));
    }

    public function destroy(PariwisataVillage $pariwisata, PariwisataService $service): RedirectResponse
    {
        $service->delete($pariwisata);

        return back()->with('success', 'Data pariwisata berhasil dipindahkan ke trash.');
    }

    public function restore(int $pariwisata, PariwisataService $service): RedirectResponse
    {
        $service->restore($pariwisata);

        return redirect()->route('pariwisata', ['view' => 'trash'])->with('success', 'Data pariwisata berhasil dipulihkan.');
    }
}
