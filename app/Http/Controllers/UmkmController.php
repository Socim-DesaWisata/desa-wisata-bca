<?php

namespace App\Http\Controllers;

use App\Http\Requests\Umkm\IndexUmkmRequest;
use App\Services\UmkmService;
use Inertia\Inertia;
use Inertia\Response;

class UmkmController extends Controller
{
    public function index(IndexUmkmRequest $request, UmkmService $service): Response
    {
        return Inertia::render('umkm/index', $service->getIndexData($request->validated()));
    }
}
