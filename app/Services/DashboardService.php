<?php

namespace App\Services;

use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataVillage;
use App\Models\TourismVillage;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageSurveyAssignmentLog;
use App\Models\VillageUmkm;
use App\Models\VillageUmkmCategory;
use Illuminate\Support\Str;

class DashboardService
{
    /**
     * @return array<string, mixed>
     */
    public function getData(array $filters = []): array
    {
        return [
            'filters' => $filters,
            'kpis' => $this->kpis(),
            'village_map_points' => $this->villageMapPoints(),
            'top_village_surveys' => $this->topVillageSurveys(),
            'top_umkm_surveys' => $this->topUmkmSurveys(),
            'top_pariwisata_surveys' => $this->topPariwisataSurveys(),
            'top_umkm_categories' => $this->topUmkmCategories(),
            'recent_assignments' => $this->recentAssignments(),
            'priorities' => $this->priorities(),
            'activities' => $this->activities(),
            'general_report' => $this->generalReportData($filters['general_report_filter'] ?? 'Bulan Ini', $filters['program_type'] ?? 'Semua Program'),
            'aktivitas_survey' => $this->aktivitasSurveyData($filters['activity_filter'] ?? '30 Hari Terakhir'),
            'status_survey' => $this->statusSurveyData($filters['status_filter'] ?? 'Tahun Ini'),
            'omset_charts' => [
                'umkm' => $this->omsetChartsDataFor('umkm', $filters['umkm_year'] ?? null),
                'wisata' => $this->omsetChartsDataFor('pariwisata', $filters['wisata_year'] ?? null),
            ],
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function kpis(): array
    {
        $totalVillages = TourismVillage::query()->count();
        $currentMonthVillages = TourismVillage::query()
            ->where('created_at', '>=', now()->startOfMonth())
            ->count();
        $totalUmkms = VillageUmkm::query()->count();
        $currentMonthUmkms = VillageUmkm::query()
            ->where('created_at', '>=', now()->startOfMonth())
            ->count();
        $totalPariwisata = PariwisataVillage::query()->count();
        $currentMonthPariwisata = PariwisataVillage::query()
            ->where('created_at', '>=', now()->startOfMonth())
            ->count();

        return [
            [
                'title' => 'Total Desa Wisata',
                'value' => (string) $totalVillages,
                'desc' => 'Desa binaan terdaftar',
                'trend' => '+'.$currentMonthVillages.' bulan ini',
                'icon' => 'map',
                'tone' => 'success',
            ],
            [
                'title' => 'Total UMKM',
                'value' => (string) $totalUmkms,
                'desc' => 'Pelaku UMKM terdata',
                'trend' => '+'.$currentMonthUmkms.' bulan ini',
                'icon' => 'store',
                'tone' => 'success',
            ],
            [
                'title' => 'Total Pariwisata',
                'value' => (string) $totalPariwisata,
                'desc' => 'Master ISTC terdaftar',
                'trend' => '+'.$currentMonthPariwisata.' bulan ini',
                'icon' => 'ticket',
                'tone' => 'warning',
            ],
        ];
    }

    /**
     * @return array<int, array<string, int|string|null>>
     */
    private function villageMapPoints(): array
    {
        return TourismVillage::query()
            ->select([
                'id',
                'code',
                'name',
                'city',
                'province',
                'district',
                'subdistrict',
                'latitude',
                'longitude',
                'status',
                'manager_name',
                'manager_phone',
                'manager_email',
            ])
            ->withCount([
                'umkms as umkm_count',
                'pariwisataVillages as pariwisata_count',
            ])
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->orderBy('name')
            ->get()
            ->map(function (TourismVillage $village): array {
                return [
                    'id' => $village->id,
                    'code' => $village->code,
                    'name' => $village->name,
                    'city' => $village->city,
                    'province' => $village->province,
                    'district' => $village->district,
                    'subdistrict' => $village->subdistrict,
                    'latitude' => (float) $village->latitude,
                    'longitude' => (float) $village->longitude,
                    'status' => $village->status,
                    'manager_name' => $village->manager_name,
                    'manager_phone' => $village->manager_phone,
                    'manager_email' => $village->manager_email,
                    'umkm_count' => (int) ($village->umkm_count ?? 0),
                    'pariwisata_count' => (int) ($village->pariwisata_count ?? 0),
                    'location' => collect([
                        $village->subdistrict,
                        $village->district,
                        $village->city,
                        $village->province,
                    ])->filter()->implode(', ') ?: '-',
                    'url' => route('villages.show', $village),
                ];
            })
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function topVillageSurveys(): array
    {
        return VillageSurveyAssignment::query()
            ->select(['id', 'code', 'village_id', 'survey_template_id', 'status', 'updated_at'])
            ->whereHas('answers')
            ->with(['village:id,name,city,province', 'template:id,title', 'answers:id,village_survey_assignment_id,aspect_snapshot,score'])
            ->withCount('answers')
            ->withAvg('answers as average_score', 'score')
            ->orderByDesc('average_score')
            ->limit(3)
            ->get()
            ->map(function (VillageSurveyAssignment $assignment): array {
                $totalQuestions = $assignment->template
                    ? $assignment->template->questions()->count()
                    : 0;
                $score = round(((float) ($assignment->average_score ?? 0)) * 20, 1);

                $aspectScores = collect($assignment->answers)
                    ->groupBy('aspect_snapshot')
                    ->map(function ($answers, $aspect) {
                        return [
                            'aspect' => $aspect ?: 'Umum',
                            'score' => round($answers->avg('score') * 20, 1)
                        ];
                    })->values()->all();

                return [
                    'id' => $assignment->id,
                    'name' => $assignment->village?->name ?? '-',
                    'meta' => collect([$assignment->village?->city, $assignment->village?->province])->filter()->implode(', ') ?: '-',
                    'score' => $score,
                    'progress' => $totalQuestions > 0 ? min((int) round(($assignment->answers_count / $totalQuestions) * 100), 100) : 0,
                    'answers' => $assignment->answers_count.'/'.$totalQuestions,
                    'status' => $this->statusLabel($assignment->status),
                    'url' => route('survey-assignments.show', $assignment),
                    'aspect_scores' => $aspectScores,
                ];
            })
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function topUmkmSurveys(): array
    {
        return VillageUmkm::query()
            ->select(['id', 'village_id', 'name', 'product_category', 'updated_at'])
            ->whereHas('surveyAnswers')
            ->with(['village:id,name,city,province'])
            ->withCount('surveyAnswers')
            ->withSum('surveyAnswers as total_score', 'weighted_score')
            ->orderByDesc('total_score')
            ->limit(3)
            ->get()
            ->map(function (VillageUmkm $umkm): array {
                $assignment = $this->latestAssignmentForVillage((int) $umkm->village_id);

                return [
                    'id' => $umkm->id,
                    'name' => $umkm->name,
                    'meta' => $umkm->product_category ?: ($umkm->village?->name ?? '-'),
                    'score' => round((float) ($umkm->total_score ?? 0), 1),
                    'progress' => null,
                    'answers' => $umkm->survey_answers_count.' jawaban',
                    'status' => $umkm->village?->name ?? '-',
                    'url' => $assignment ? route('survey-assignments.umkm.show', [$assignment, $umkm]) : null,
                ];
            })
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function topPariwisataSurveys(): array
    {
        $maxScore = $this->pariwisataMaxScore();

        return PariwisataVillage::query()
            ->select(['id', 'village_id', 'name', 'is_active', 'updated_at'])
            ->whereHas('surveyAnswers')
            ->with(['village:id,name,city,province', 'categories:id,pariwisata_village_id,category'])
            ->withCount('surveyAnswers')
            ->withSum('surveyAnswers as total_score', 'score')
            ->orderByDesc('total_score')
            ->limit(3)
            ->get()
            ->map(function (PariwisataVillage $pariwisata) use ($maxScore): array {
                $assignment = $this->latestAssignmentForVillage((int) $pariwisata->village_id);
                $totalScore = (float) ($pariwisata->total_score ?? 0);

                return [
                    'id' => $pariwisata->id,
                    'name' => $pariwisata->name,
                    'meta' => $pariwisata->categories->pluck('category')->map(fn (string $category): string => Str::headline($category))->implode(', ') ?: ($pariwisata->village?->name ?? '-'),
                    'score' => $maxScore > 0 ? round(($totalScore / $maxScore) * 100, 1) : 0,
                    'progress' => null,
                    'answers' => $pariwisata->survey_answers_count.' jawaban',
                    'status' => $pariwisata->is_active ? 'Aktif' : 'Nonaktif',
                    'url' => $assignment ? route('survey-assignments.pariwisata.show', [$assignment, $pariwisata]) : null,
                ];
            })
            ->all();
    }

    /**
     * @return array<int, array<string, string|int>>
     */
    private function topUmkmCategories(): array
    {
        return VillageUmkmCategory::query()
            ->selectRaw('category, COUNT(*) as total')
            ->groupBy('category')
            ->orderByDesc('total')
            ->orderBy('category')
            ->limit(4)
            ->get()
            ->map(fn (VillageUmkmCategory $category): array => [
                'category' => (string) $category->category,
                'label' => $this->umkmCategoryLabel((string) $category->category),
                'total' => (int) $category->total,
            ])
            ->all();
    }

    /**
     * @return array<int, array<string, string|int>>
     */
    private function recentAssignments(): array
    {
        return VillageSurveyAssignment::query()
            ->select([
                'id',
                'code',
                'village_id',
                'survey_template_id',
                'status',
                'updated_at',
                'last_saved_at',
                'submitted_at',
                'reviewed_at',
            ])
            ->with([
                'village:id,name,city,province',
                'template:id,title',
                'answers:id,village_survey_assignment_id,aspect_snapshot,score,answered_by',
            ])
            ->withCount(['answers'])
            ->latest('updated_at')
            ->limit(5)
            ->get()
            ->map(function (VillageSurveyAssignment $assignment): array {
                $totalQuestions = $assignment->template
                    ? $assignment->template->questions()->count()
                    : 0;
                $progress = $totalQuestions > 0
                    ? (int) round(($assignment->answers_count / $totalQuestions) * 100)
                    : 0;

                $aspectScores = collect($assignment->answers)
                    ->groupBy('aspect_snapshot')
                    ->map(function ($answers, $aspect) {
                        return [
                            'aspect' => $aspect ?: 'Umum',
                            'score' => round($answers->avg('score') * 20, 1)
                        ];
                    })->values()->all();

                return [
                    'id' => $assignment->id,
                    'code' => $assignment->code,
                    'village' => $assignment->village?->name ?? '-',
                    'location' => collect([
                        $assignment->village?->city,
                        $assignment->village?->province,
                    ])->filter()->implode(', ') ?: '-',
                    'progress' => min($progress, 100),
                    'status' => $assignment->status,
                    'status_label' => $this->statusLabel($assignment->status),
                    'enumerators' => collect($assignment->answers)
                        ->pluck('answered_by')
                        ->filter()
                        ->unique()
                        ->count(),
                    'updated_at' => $assignment->updated_at?->diffForHumans() ?? '-',
                    'aspect_scores' => $aspectScores,
                ];
            })
            ->all();
    }

    private function latestAssignmentForVillage(int $villageId): ?VillageSurveyAssignment
    {
        return VillageSurveyAssignment::query()
            ->select(['id', 'code', 'village_id'])
            ->where('village_id', $villageId)
            ->latest('updated_at')
            ->first();
    }

    private function pariwisataMaxScore(): int
    {
        return PariwisataSurveyQuestion::query()
            ->where('is_active', true)
            ->with(['options:id,pariwisata_survey_question_id,score'])
            ->get(['id'])
            ->sum(fn (PariwisataSurveyQuestion $question): int => (int) $question->options->max('score'));
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function priorities(): array
    {
        $submittedToday = VillageSurveyAssignment::query()
            ->where('status', 'submitted')
            ->whereDate('submitted_at', today())
            ->count();
        $documentsUnreviewed = VillageSurveyAssignment::query()
            ->whereIn('status', ['submitted', 'need_revision'])
            ->withCount('documents')
            ->get()
            ->sum('documents_count');
        $staleAssignments = VillageSurveyAssignment::query()
            ->whereIn('status', ['assigned', 'in_progress'])
            ->where('updated_at', '<', now()->subDays(7))
            ->count();

        return [
            [
                'value' => (string) $submittedToday,
                'text' => 'Survey butuh review hari ini',
                'icon' => 'clipboard',
                'tone' => 'blue',
            ],
            [
                'value' => (string) $documentsUnreviewed,
                'text' => 'Dokumen menunggu review',
                'icon' => 'file',
                'tone' => 'warning',
            ],
            [
                'value' => (string) $staleAssignments,
                'text' => 'Assignment belum diperbarui 7 hari',
                'icon' => 'calendar',
                'tone' => 'danger',
            ],
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function activities(): array
    {
        $logs = VillageSurveyAssignmentLog::query()
            ->with(['actor:id,name', 'assignment.village:id,name'])
            ->latest('created_at')
            ->limit(4)
            ->get()
            ->map(fn (VillageSurveyAssignmentLog $log): array => [
                'title' => $log->description
                    ?: trim(($log->actor?->name ? $log->actor->name.' ' : '').Str::headline($log->action)),
                'time' => $log->created_at?->diffForHumans() ?? '-',
                'icon' => $this->activityIcon($log->action),
                'tone' => $this->activityTone($log->action),
            ]);

        if ($logs->isNotEmpty()) {
            return $logs->all();
        }

        return VillageSurveyAssignment::query()
            ->with(['village:id,name'])
            ->latest('updated_at')
            ->limit(4)
            ->get()
            ->map(fn (VillageSurveyAssignment $assignment): array => [
                'title' => $assignment->village?->name
                    ? 'Assignment '.$assignment->village->name.' diperbarui'
                    : 'Assignment diperbarui',
                'time' => $assignment->updated_at?->diffForHumans() ?? '-',
                'icon' => 'clipboard',
                'tone' => 'blue',
            ])
            ->all();
    }

    private function statusLabel(string $status): string
    {
        return [
            'assigned' => 'Assigned',
            'in_progress' => 'In Progress',
            'submitted' => 'Submitted',
            'approved' => 'Approved',
            'need_revision' => 'Need Revision',
            'rejected' => 'Rejected',
        ][$status] ?? Str::headline($status);
    }

    private function umkmCategoryLabel(string $value): string
    {
        return [
            'kuliner' => 'Kuliner',
            'tekstil_dan_kerajinan' => 'Tekstil dan Kerajinan',
            'fashion_dan_aksesoris' => 'Fashion dan Aksesoris',
            'kecantikan_dan_kesehatan' => 'Kecantikan dan Kesehatan',
            'jasa' => 'Jasa',
            'pertanian' => 'Pertanian',
            'peternakan' => 'Peternakan',
            'perikanan' => 'Perikanan',
            'produk_digital_dan_kreatif' => 'Produk Digital dan Kreatif',
        ][$value] ?? Str::headline($value);
    }

    private function activityIcon(?string $action): string
    {
        return match ($action) {
            'approved', 'submitted' => 'check',
            'document_uploaded' => 'file',
            'created' => 'plus',
            default => 'user',
        };
    }

    private function activityTone(?string $action): string
    {
        return match ($action) {
            'approved' => 'success',
            'submitted' => 'blue',
            'document_uploaded' => 'warning',
            default => 'blue',
        };
    }

    private function applyTimeFilter($query, string $filter, string $column = 'created_at')
    {
        return match ($filter) {
            'Hari Ini' => $query->whereDate($column, today()),
            '7 Hari Terakhir' => $query->where($column, '>=', now()->subDays(7)),
            '30 Hari Terakhir' => $query->where($column, '>=', now()->subDays(30)),
            'Bulan Ini' => $query->whereYear($column, now()->year)->whereMonth($column, now()->month),
            'Tahun Ini' => $query->whereYear($column, now()->year),
            '2025' => $query->whereYear($column, 2025),
            '2024' => $query->whereYear($column, 2024),
            default => $query,
        };
    }

    private function generalReportData(string $filter, string $programType): array
    {
        $query = VillageSurveyAssignment::query();
        $query = $this->applyTimeFilter($query, $filter, 'created_at');
        
        $typeCode = match($programType) {
            'KEMENPAR' => 'village',
            'UMKM' => 'umkm',
            'ISTC' => 'pariwisata',
            default => null,
        };

        if ($typeCode) {
            $query->whereHas('template', function ($q) use ($typeCode) {
                $q->where('type', $typeCode);
            });
        }
        
        $total = $query->count();
        $selesai = (clone $query)->whereIn('status', ['submitted', 'approved'])->count();
        $dalamProses = (clone $query)->whereIn('status', ['in_progress', 'need_revision'])->count();
        $belumDimulai = (clone $query)->whereIn('status', ['assigned', 'rejected'])->count();
        
        $csrTotal = class_exists(\App\Models\CsrProgram::class) ? \App\Models\CsrProgram::count() : 0;
        
        $averageScoreRaw = \App\Models\SurveyAnswer::whereHas('assignment', function ($q) use ($filter, $typeCode) {
            $this->applyTimeFilter($q, $filter, 'created_at');
            if ($typeCode) {
                $q->whereHas('template', function ($tq) use ($typeCode) {
                    $tq->where('type', $typeCode);
                });
            }
        })->avg('score') ?? 0;
        
        $averageScore = round($averageScoreRaw * 20, 1);
        
        $lastMonthScoreRaw = \App\Models\SurveyAnswer::whereHas('assignment', function ($q) use ($filter, $typeCode) {
            $q->whereYear('created_at', now()->subMonth()->year)->whereMonth('created_at', now()->subMonth()->month);
            if ($typeCode) {
                $q->whereHas('template', function ($tq) use ($typeCode) {
                    $tq->where('type', $typeCode);
                });
            }
        })->avg('score') ?? 0;
        $lastMonthScore = round($lastMonthScoreRaw * 20, 1);

        $trendPercentage = 0;
        if ($lastMonthScore > 0) {
            $trendPercentage = round((($averageScore - $lastMonthScore) / $lastMonthScore) * 100);
        } elseif ($averageScore > 0) {
            $trendPercentage = 100;
        }
        $trendStr = ($trendPercentage >= 0 ? '+' : '') . $trendPercentage . '%';
        
        $areaData = [];
        for ($i = 4; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $monthScore = \App\Models\SurveyAnswer::whereHas('assignment', function ($q) use ($month, $typeCode) {
                $q->whereYear('created_at', $month->year)->whereMonth('created_at', $month->month);
                if ($typeCode) {
                    $q->whereHas('template', function ($tq) use ($typeCode) {
                        $tq->where('type', $typeCode);
                    });
                }
            })->avg('score') ?? 0;
            $areaData[] = [
                'name' => $month->format('M'),
                'score' => round((float) $monthScore * 20, 1)
            ];
        }

        return [
            'average_score' => $averageScore,
            'trend' => $trendStr,
            'total_assessment' => $total,
            'selesai' => $selesai,
            'dalam_proses' => $dalamProses,
            'belum_dimulai' => $belumDimulai,
            'total_program_csr' => $csrTotal,
            'total_anggaran' => 0,
            'area_data' => $areaData,
        ];
    }

    private function aktivitasSurveyData(string $filter): array
    {
        $query = VillageSurveyAssignment::query();
        $query = $this->applyTimeFilter($query, $filter, 'created_at');
        
        // Group by month
        $barData = [];
        for ($i = 4; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $q = (clone $query)->whereYear('created_at', $date->year)->whereMonth('created_at', $date->month);
            $barData[] = [
                'name' => $date->format('M'),
                'selesai' => (clone $q)->whereIn('status', ['submitted', 'approved'])->count(),
                'proses' => (clone $q)->whereIn('status', ['in_progress', 'need_revision'])->count(),
                'belum' => (clone $q)->whereIn('status', ['assigned', 'rejected'])->count(),
            ];
        }

        return [
            'bar_data' => $barData,
        ];
    }

    private function statusSurveyData(string $filter): array
    {
        $query = VillageSurveyAssignment::query();
        $query = $this->applyTimeFilter($query, $filter, 'created_at');
        
        $selesai = (clone $query)->whereIn('status', ['submitted', 'approved'])->count();
        $dalamProses = (clone $query)->whereIn('status', ['in_progress', 'need_revision'])->count();
        $belumDimulai = (clone $query)->whereIn('status', ['assigned', 'rejected'])->count();

        return [
            'pie_data' => [
                ['name' => 'Selesai', 'value' => $selesai, 'color' => '#0066AE'],
                ['name' => 'Dalam Proses', 'value' => $dalamProses, 'color' => '#2FA6FC'],
                ['name' => 'Belum Dimulai', 'value' => $belumDimulai, 'color' => '#DCE3EA'],
            ],
            'total' => $selesai + $dalamProses + $belumDimulai,
        ];
    }

    private function omsetChartsDataFor(string $type, ?string $filterYear = null): array
    {
        $currentYear = $filterYear ? (int) $filterYear : (int) now()->year;
        $years = [
            $currentYear - 2,
            $currentYear - 1,
            $currentYear,
            $currentYear + 1,
        ];

        $column = $type === 'umkm' ? 'umkm_id' : 'pariwisata_id';

        $turnovers = \App\Models\AnnualTurnover::query()
            ->selectRaw('year, SUM(value) as total_omset')
            ->whereNotNull($column)
            ->whereIn('year', $years)
            ->groupBy('year')
            ->pluck('total_omset', 'year');

        $data = [];
        foreach ($years as $year) {
            $data[] = [
                'year' => (string) $year,
                'omset' => (float) ($turnovers[$year] ?? 0),
            ];
        }

        $prev = (float) ($turnovers[$currentYear - 1] ?? 0);
        $curr = (float) ($turnovers[$currentYear] ?? 0);

        if ($prev == 0) {
            $trend = $curr > 0 ? '+100%' : '+0%';
        } else {
            $diff = $curr - $prev;
            $percent = ($diff / $prev) * 100;
            $sign = $percent > 0 ? '+' : '';
            $trend = $sign . round($percent, 1) . '%';
        }

        return [
            'data' => $data,
            'trend' => $trend,
            'total' => $curr,
            'current_year' => $currentYear,
        ];
    }
}