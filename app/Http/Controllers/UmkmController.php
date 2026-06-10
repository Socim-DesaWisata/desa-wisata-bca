<?php

namespace App\Http\Controllers;

use App\Http\Requests\Umkm\IndexUmkmRequest;
use App\Models\VillageUmkm;
use App\Services\UmkmService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UmkmController extends Controller
{
    public function index(IndexUmkmRequest $request, UmkmService $service): Response
    {
        return Inertia::render('umkm/index', $service->getIndexData($request->validated()));
    }

    public function destroy(VillageUmkm $umkm, UmkmService $service): RedirectResponse
    {
        $service->delete($umkm);

        return back()->with('success', 'Data UMKM berhasil dipindahkan ke trash.');
    }

    public function restore(int $umkm, UmkmService $service): RedirectResponse
    {
        $service->restore($umkm);

        return redirect()->route('umkm', ['view' => 'trash'])->with('success', 'Data UMKM berhasil dipulihkan.');
    }
}
