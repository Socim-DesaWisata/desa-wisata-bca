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
            ]);
        }

        return Inertia::render('dashboard', [
            'dashboard_mode' => 'admin',
            ...$service->getData(),
        ]);
    }
}
