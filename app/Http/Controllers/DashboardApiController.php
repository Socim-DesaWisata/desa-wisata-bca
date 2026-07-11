<?php

namespace App\Http\Controllers;

use App\Models\PariwisataVillage;
use App\Models\VillageSurveyAssignment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardApiController extends Controller
{
    public function getDesa(): JsonResponse
    {
        $assignments = VillageSurveyAssignment::query()
            ->with('village:id,code,name')
            ->get()
            ->map(function ($assignment): array {
                return [
                    'code' => $assignment->code,
                    'name' => $assignment->village ? $assignment->village->name : $assignment->code,
                ];
            })
            ->sortBy('name')
            ->values();

        return response()->json($assignments);
    }

    public function getPariwisata(Request $request, string $code): JsonResponse
    {
        $assignment = VillageSurveyAssignment::where('code', $code)->firstOrFail();

        $pariwisata = PariwisataVillage::where('village_id', $assignment->village_id)
            ->select('id', 'name')
            ->get()
            ->map(function ($p): array {
                return [
                    'id' => $p->id,
                    'name' => $p->name,
                ];
            })
            ->sortBy('name')
            ->values();

        return response()->json($pariwisata);
    }
}