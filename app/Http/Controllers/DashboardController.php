<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(DashboardService $service): Response
    {
        if (auth()->user()?->role === 'enumerator') {
            return Inertia::render('dashboard', [
                'dashboard_mode' => 'enumerator',
                ...$service->getVillageStatusData(),
            ]);
        }

        $filters = request()->only(['general_report_filter', 'activity_filter', 'status_filter', 'umkm_year', 'wisata_year', 'program_type']);

        return Inertia::render('dashboard', [
            'dashboard_mode' => 'admin',
            ...$service->getData($filters),
        ]);
    }
}
