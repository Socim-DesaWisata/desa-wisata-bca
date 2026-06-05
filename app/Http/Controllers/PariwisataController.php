<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pariwisata\IndexPariwisataRequest;
use App\Services\PariwisataService;
use Inertia\Inertia;
use Inertia\Response;

class PariwisataController extends Controller
{
    public function index(IndexPariwisataRequest $request, PariwisataService $service): Response
    {
        return Inertia::render('pariwisata/index', $service->getIndexData($request->validated()));
    }
}
