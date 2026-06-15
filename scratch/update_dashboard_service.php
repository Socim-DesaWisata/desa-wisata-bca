<?php

$content = file_get_contents('app/Services/DashboardService.php');

$newGetData = <<<EOT
    public function getData(array \$filters = []): array
    {
        return [
            'filters' => \$filters,
            'kpis' => \$this->kpis(),
            'village_map_points' => \$this->villageMapPoints(),
            'top_village_surveys' => \$this->topVillageSurveys(),
            'top_umkm_surveys' => \$this->topUmkmSurveys(),
            'top_pariwisata_surveys' => \$this->topPariwisataSurveys(),
            'top_umkm_categories' => \$this->topUmkmCategories(),
            'recent_assignments' => \$this->recentAssignments(),
            'priorities' => \$this->priorities(),
            'activities' => \$this->activities(),
            'general_report' => \$this->generalReportData(\$filters['general_report_filter'] ?? 'Bulan Ini'),
            'aktivitas_survey' => \$this->aktivitasSurveyData(\$filters['activity_filter'] ?? '30 Hari Terakhir'),
            'status_survey' => \$this->statusSurveyData(\$filters['status_filter'] ?? 'Tahun Ini'),
        ];
    }
EOT;

$content = preg_replace('/public function getData\(\): array\s+\{\s+return \[(.*?)\];/s', $newGetData, $content);

$newMethods = <<<EOT

    private function applyTimeFilter(\$query, string \$filter, string \$column = 'created_at')
    {
        return match (\$filter) {
            'Hari Ini' => \$query->whereDate(\$column, today()),
            '7 Hari Terakhir' => \$query->where(\$column, '>=', now()->subDays(7)),
            '30 Hari Terakhir' => \$query->where(\$column, '>=', now()->subDays(30)),
            'Bulan Ini' => \$query->whereYear(\$column, now()->year)->whereMonth(\$column, now()->month),
            'Tahun Ini' => \$query->whereYear(\$column, now()->year),
            '2025' => \$query->whereYear(\$column, 2025),
            '2024' => \$query->whereYear(\$column, 2024),
            default => \$query,
        };
    }

    private function generalReportData(string \$filter): array
    {
        \$query = VillageSurveyAssignment::query();
        \$query = \$this->applyTimeFilter(\$query, \$filter, 'created_at');
        
        \$total = \$query->count();
        \$selesai = (clone \$query)->whereIn('status', ['submitted', 'approved'])->count();
        \$dalamProses = (clone \$query)->whereIn('status', ['in_progress', 'need_revision'])->count();
        \$belumDimulai = (clone \$query)->whereIn('status', ['assigned', 'rejected'])->count();
        
        \$csrTotal = class_exists(\App\Models\CsrProgram::class) ? \App\Models\CsrProgram::count() : 0;
        
        \$averageScoreRaw = \App\Models\SurveyAnswer::whereHas('assignment', function (\$q) use (\$filter) {
            \$this->applyTimeFilter(\$q, \$filter, 'created_at');
        })->avg('score') ?? 0;
        
        \$averageScore = round(\$averageScoreRaw * 20, 1);
        
        \$areaData = [];
        for (\$i = 4; \$i >= 0; \$i--) {
            \$month = now()->subMonths(\$i);
            \$monthScore = \App\Models\SurveyAnswer::whereHas('assignment', function (\$q) use (\$month) {
                \$q->whereYear('created_at', \$month->year)->whereMonth('created_at', \$month->month);
            })->avg('score') ?? 0;
            \$areaData[] = [
                'name' => \$month->format('M'),
                'score' => round((float) \$monthScore * 20, 1)
            ];
        }

        return [
            'average_score' => \$averageScore,
            'trend' => '+0%', // static for now
            'total_assessment' => \$total,
            'selesai' => \$selesai,
            'dalam_proses' => \$dalamProses,
            'belum_dimulai' => \$belumDimulai,
            'total_program_csr' => \$csrTotal,
            'total_anggaran' => 120000000,
            'area_data' => \$areaData,
        ];
    }

    private function aktivitasSurveyData(string \$filter): array
    {
        \$query = VillageSurveyAssignment::query();
        \$query = \$this->applyTimeFilter(\$query, \$filter, 'created_at');
        
        // Group by month
        \$barData = [];
        for (\$i = 4; \$i >= 0; \$i--) {
            \$date = now()->subMonths(\$i);
            \$q = (clone \$query)->whereYear('created_at', \$date->year)->whereMonth('created_at', \$date->month);
            \$barData[] = [
                'name' => \$date->format('M'),
                'selesai' => (clone \$q)->whereIn('status', ['submitted', 'approved'])->count(),
                'proses' => (clone \$q)->whereIn('status', ['in_progress', 'need_revision'])->count(),
                'belum' => (clone \$q)->whereIn('status', ['assigned', 'rejected'])->count(),
            ];
        }

        return [
            'bar_data' => \$barData,
        ];
    }

    private function statusSurveyData(string \$filter): array
    {
        \$query = VillageSurveyAssignment::query();
        \$query = \$this->applyTimeFilter(\$query, \$filter, 'created_at');
        
        \$selesai = (clone \$query)->whereIn('status', ['submitted', 'approved'])->count();
        \$dalamProses = (clone \$query)->whereIn('status', ['in_progress', 'need_revision'])->count();
        \$belumDimulai = (clone \$query)->whereIn('status', ['assigned', 'rejected'])->count();

        return [
            'pie_data' => [
                ['name' => 'Selesai', 'value' => \$selesai, 'color' => '#0066AE'],
                ['name' => 'Dalam Proses', 'value' => \$dalamProses, 'color' => '#2FA6FC'],
                ['name' => 'Belum Dimulai', 'value' => \$belumDimulai, 'color' => '#DCE3EA'],
            ],
            'total' => \$selesai + \$dalamProses + \$belumDimulai,
        ];
    }
}
EOT;

$content = preg_replace('/}\s*$/', $newMethods, $content);
file_put_contents('app/Services/DashboardService.php', $content);

echo "DashboardService.php updated.\n";
