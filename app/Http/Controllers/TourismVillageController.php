<?php

namespace App\Http\Controllers;

use App\Http\Requests\TourismVillages\IndexTourismVillageRequest;
use App\Http\Requests\TourismVillages\StoreTourismVillageRequest;
use App\Services\TourismVillageService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TourismVillageController extends Controller
{
    public function index(IndexTourismVillageRequest $request, TourismVillageService $service): Response
    {
        return Inertia::render('villages/index', $service->getIndexData($request->validated()));
    }

    public function store(StoreTourismVillageRequest $request, TourismVillageService $service): RedirectResponse
    {
        $service->create($request->validated(), $request->user());

        return back()->with('success', 'Desa wisata berhasil dibuat.');
    }
}
