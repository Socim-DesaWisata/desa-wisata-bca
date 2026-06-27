<?php

namespace App\Services;

use App\Models\AnnualTurnover;
use App\Models\CsrProgram;
use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataVillage;
use App\Models\SurveyAnswer;
use App\Models\TourismVillage;
use App\Models\UmkmSurveyAnswer;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageSurveyAssignmentLog;
use App\Models\VillageUmkm;
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
            'top_umkm_turnovers' => $this->topUmkmTurnovers(),
            'top_pariwisata_turnovers' => $this->topPariwisataTurnovers(),
            'top_umkm_categories' => $this->topUmkmCategories(),
            'recent_assignments' => $this->recentAssignments(),
            'priorities' => $this->priorities(),
            'activities' => $this->activities(),
            'general_report' => $this->generalReportData($filters['general_report_filter'] ?? 'Bulan Ini', $filters['program_type'] ?? 'Semua Program'),
            'aktivitas_survey' => $this->aktivitasSurveyData($filters['activity_filter'] ?? '30 Hari Terakhir'),
            'status_survey' => $this->statusSurveyData($filters['status_filter'] ?? 'Tahun Ini'),
            'omset_charts' => [
                'umkm' => $this->omsetChartsDataFor('umkm'),
                'wisata' => $this->omsetChartsDataFor('pariwisata'),
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
            ->with([
                'village:id,name,city,province',
                'template' => fn ($query) => $query
                    ->select(['id', 'title'])
                    ->withCount('questions'),
            ])
            ->withCount('answers')
            ->withSum('answers as total_score', 'score')
            ->orderByDesc('total_score')
            ->limit(5)
            ->get()
            ->map(function (VillageSurveyAssignment $assignment): array {
                $totalQuestions = (int) ($assignment->template?->questions_count ?? 0);
                $score = (int) ($assignment->total_score ?? 0);

                return [
                    'id' => $assignment->id,
                    'name' => $assignment->village?->name ?? '-',
                    'meta' => collect([$assignment->village?->city, $assignment->village?->province])->filter()->implode(', ') ?: '-',
                    'score' => $score,
                    'progress' => $totalQuestions > 0 ? min((int) round(($assignment->answers_count / $totalQuestions) * 100), 100) : 0,
                    'answers' => $assignment->answers_count.'/'.$totalQuestions,
                    'status' => $assignment->status,
                    'status_label' => $this->statusLabel($assignment->status),
                    'url' => route('survey-assignments.show', $assignment),
                    'aspect_scores' => [],
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
            ->with(['village:id,name,city,province', 'surveyAnswers:id,umkm_id,weighted_score,criteria_name_snapshot'])
            ->withCount('surveyAnswers')
            ->withSum('surveyAnswers as total_score', 'weighted_score')
            ->orderByDesc('total_score')
            ->limit(3)
            ->get()
            ->map(function (VillageUmkm $umkm): array {
                $assignment = $this->latestAssignmentForVillage((int) $umkm->village_id);

                $aspectScores = collect($umkm->surveyAnswers)
                    ->groupBy('criteria_name_snapshot')
                    ->map(function ($answers, $criteria) {
                        return [
                            'aspect' => $criteria ?: 'Umum',
                            'score' => round($answers->sum('weighted_score'), 1),
                        ];
                    })->values()->all();

                return [
                    'id' => $umkm->id,
                    'name' => $umkm->name,
                    'meta' => $umkm->product_category ?: ($umkm->village?->name ?? '-'),
                    'score' => round((float) ($umkm->total_score ?? 0), 1),
                    'progress' => null,
                    'answers' => $umkm->survey_answers_count.' jawaban',
                    'status' => $umkm->village?->name ?? '-',
                    'url' => $assignment ? route('survey-assignments.umkm.show', [$assignment, $umkm]) : null,
                    'aspect_scores' => $aspectScores,
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
            ->with(['village:id,name,city,province', 'categories:id,pariwisata_village_id,category', 'surveyAnswers:pariwisata_survey_answers.id,village_survey_assignment_id,score,category_name_snapshot'])
            ->withCount('surveyAnswers')
            ->withSum('surveyAnswers as total_score', 'score')
            ->orderByDesc('total_score')
            ->limit(3)
            ->get()
            ->map(function (PariwisataVillage $pariwisata) use ($maxScore): array {
                $assignment = $this->latestAssignmentForVillage((int) $pariwisata->village_id);
                $totalScore = (float) ($pariwisata->total_score ?? 0);

                $aspectScores = collect($pariwisata->surveyAnswers)
                    ->groupBy('category_name_snapshot')
                    ->map(function ($answers, $category) {
                        return [
                            'aspect' => $category ?: 'Umum',
                            'score' => round($answers->avg('score') * 20, 1),
                        ];
                    })->values()->all();

                return [
                    'id' => $pariwisata->id,
                    'name' => $pariwisata->name,
                    'meta' => $pariwisata->categories->pluck('category')->map(fn (string $category): string => Str::headline($category))->implode(', ') ?: ($pariwisata->village?->name ?? '-'),
                    'score' => $maxScore > 0 ? round(($totalScore / $maxScore) * 100, 1) : 0,
                    'progress' => null,
                    'answers' => $pariwisata->survey_answers_count.' jawaban',
                    'status' => $pariwisata->is_active ? 'Aktif' : 'Nonaktif',
                    'url' => $assignment ? route('survey-assignments.pariwisata.show', [$assignment, $pariwisata]) : null,
                    'aspect_scores' => $aspectScores,
                ];
            })
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function topUmkmTurnovers(): array
    {
        return VillageUmkm::query()
            ->select(['id', 'village_id', 'name', 'product_category'])
            ->whereHas('annualTurnovers')
            ->with(['village:id,name,city,province'])
            ->withCount('annualTurnovers')
            ->withSum('annualTurnovers as total_turnover', 'value')
            ->orderByDesc('total_turnover')
            ->limit(3)
            ->get()
            ->map(function (VillageUmkm $umkm): array {
                return [
                    'id' => $umkm->id,
                    'name' => $umkm->name,
                    'meta' => $umkm->product_category ?: ($umkm->village?->name ?? '-'),
                    'score' => round((float) ($umkm->total_turnover ?? 0), 2),
                    'progress' => null,
                    'answers' => $umkm->annual_turnovers_count.' tahun data',
                    'status' => $umkm->village?->name ?? '-',
                    'url' => null,
                    'aspect_scores' => [],
                ];
            })
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function topPariwisataTurnovers(): array
    {
        return PariwisataVillage::query()
            ->select(['id', 'village_id', 'name', 'is_active'])
            ->whereHas('annualTurnovers')
            ->with(['village:id,name,city,province', 'categories:id,pariwisata_village_id,category'])
            ->withCount('annualTurnovers')
            ->withSum('annualTurnovers as total_turnover', 'value')
            ->orderByDesc('total_turnover')
            ->limit(3)
            ->get()
            ->map(function (PariwisataVillage $pariwisata): array {
                return [
                    'id' => $pariwisata->id,
                    'name' => $pariwisata->name,
                    'meta' => $pariwisata->categories->pluck('category')->map(fn (string $category): string => Str::headline($category))->implode(', ') ?: ($pariwisata->village?->name ?? '-'),
                    'score' => round((float) ($pariwisata->total_turnover ?? 0), 2),
                    'progress' => null,
                    'answers' => $pariwisata->annual_turnovers_count.' tahun data',
                    'status' => $pariwisata->is_active ? 'Aktif' : 'Nonaktif',
                    'url' => null,
                    'aspect_scores' => [],
                ];
            })
            ->all();
    }

    /**
     * @return array<int, array<string, int|string>>
     */
    private function topUmkmCategories(): array
    {
        return VillageUmkm::query()
            ->selectRaw('product_category, COUNT(*) as total')
            ->whereNotNull('product_category')
            ->where('product_category', '!=', '')
            ->groupBy('product_category')
            ->orderByDesc('total')
            ->orderBy('product_category')
            ->limit(3)
            ->get()
            ->map(fn (VillageUmkm $umkm): array => [
                'category' => (string) $umkm->product_category,
                'label' => (string) $umkm->product_category,
                'total' => (int) $umkm->total,
            ])
            ->all();
    }

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
                $aspectScores = collect($assignment->answers)
                    ->groupBy('aspect_snapshot')
                    ->map(function ($answers, $aspect) {
                        return [
                            'aspect' => $aspect ?: 'Umum',
                            'score' => round($answers->avg('score') * 20, 1),
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
                    'status' => $assignment->status,
                    'status_label' => $this->statusLabel($assignment->status),
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
        [$start, $end] = $this->filterRange($filter);

        if ($start && $end) {
            return $query->whereBetween($column, [$start, $end]);
        }

        return $query;
    }

    private function generalReportData(string $filter, string $programType): array
    {
        if ($programType === 'UMKM') {
            $query = VillageUmkm::query();
            $query = $this->applyTimeFilter($query, $filter, 'created_at');

            $total = (clone $query)->count();
            $selesai = (clone $query)->whereHas('surveyAnswers')->count();
            $dalamProses = 0;
            $belumDimulai = (clone $query)->whereDoesntHave('surveyAnswers')->count();
            $averageScore = $this->averageUmkmScoreForQuery(clone $query);
            $lastScore = $this->averageUmkmScoreForComparison($filter);
            $trendStr = $this->trendFromScores($averageScore, $lastScore);
            $areaData = collect($this->chartBucketsForFilter($filter))
                ->map(fn (array $bucket): array => [
                    'name' => $bucket['label'],
                    'score' => $this->averageUmkmScoreForRange($bucket['start'], $bucket['end']),
                ])
                ->all();

            return [
                'average_score' => $averageScore,
                'trend' => $trendStr,
                'total_assessment' => $total,
                'selesai' => $selesai,
                'dalam_proses' => $dalamProses,
                'belum_dimulai' => $belumDimulai,
                'total_program_csr' => class_exists(CsrProgram::class) ? CsrProgram::count() : 0,
                'total_anggaran' => 0,
                'area_data' => $areaData,
            ];
        }

        $typeCode = match ($programType) {
            'KEMENPAR' => 'village',
            'ISTC' => 'pariwisata',
            default => null,
        };

        $query = VillageSurveyAssignment::query();
        $query = $this->applyTimeFilter($query, $filter, 'created_at');
        $query = $this->applyProgramTypeFilter($query, $typeCode);

        $total = (clone $query)->count();
        $selesai = (clone $query)->whereIn('status', ['submitted', 'approved'])->count();
        $dalamProses = (clone $query)->whereIn('status', ['in_progress', 'need_revision'])->count();
        $belumDimulai = (clone $query)->whereIn('status', ['assigned', 'rejected'])->count();
        $averageScore = $this->averageVillageScoreForQuery(clone $query, $typeCode);
        $lastScore = $this->averageVillageScoreForComparison($filter, $typeCode);
        $trendStr = $this->trendFromScores($averageScore, $lastScore);
        $areaData = collect($this->chartBucketsForFilter($filter))
            ->map(fn (array $bucket): array => [
                'name' => $bucket['label'],
                'score' => $this->averageVillageScoreForRange($bucket['start'], $bucket['end'], $typeCode),
            ])
            ->all();

        return [
            'average_score' => $averageScore,
            'trend' => $trendStr,
            'total_assessment' => $total,
            'selesai' => $selesai,
            'dalam_proses' => $dalamProses,
            'belum_dimulai' => $belumDimulai,
            'total_program_csr' => class_exists(CsrProgram::class) ? CsrProgram::count() : 0,
            'total_anggaran' => 0,
            'area_data' => $areaData,
        ];
    }

    private function aktivitasSurveyData(string $filter): array
    {
        $barData = collect($this->chartBucketsForFilter($filter))
            ->map(function (array $bucket): array {
                $query = VillageSurveyAssignment::query()->whereBetween('created_at', [$bucket['start'], $bucket['end']]);

                return [
                    'name' => $bucket['label'],
                    'selesai' => (clone $query)->whereIn('status', ['submitted', 'approved'])->count(),
                    'proses' => (clone $query)->whereIn('status', ['in_progress', 'need_revision'])->count(),
                    'belum' => (clone $query)->whereIn('status', ['assigned', 'rejected'])->count(),
                ];
            })
            ->all();

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

    private function omsetChartsDataFor(string $type): array
    {
        $column = $type === 'umkm' ? 'umkm_id' : 'pariwisata_id';

        $turnovers = AnnualTurnover::query()
            ->selectRaw('year, SUM(value) as total_omset')
            ->whereNotNull($column)
            ->groupBy('year')
            ->orderBy('year')
            ->pluck('total_omset', 'year');

        $data = $turnovers
            ->map(fn ($total, int|string $year): array => [
                'year' => (string) $year,
                'omset' => (float) $total,
            ])
            ->values()
            ->all();

        $latestTotals = $turnovers->values()->take(-2)->values();
        $prev = (float) ($latestTotals->get(0) ?? 0);
        $curr = (float) ($latestTotals->get(1) ?? $latestTotals->get(0) ?? 0);

        return [
            'data' => $data,
            'trend' => $latestTotals->count() >= 2 ? $this->trendFromTotals($curr, $prev) : '+0%',
            'total' => (float) $turnovers->sum(),
        ];
    }

    private function applyProgramTypeFilter($query, ?string $typeCode)
    {
        if (! $typeCode) {
            return $query;
        }

        return $query->whereHas('template', function ($templateQuery) use ($typeCode) {
            $templateQuery->where('type', $typeCode);
        });
    }

    private function averageVillageScoreForQuery($query, ?string $typeCode): float
    {
        $assignmentIds = (clone $this->applyProgramTypeFilter($query, $typeCode))->pluck('id');

        if ($assignmentIds->isEmpty()) {
            return 0.0;
        }

        $average = SurveyAnswer::query()
            ->whereIn('village_survey_assignment_id', $assignmentIds)
            ->avg('score') ?? 0;

        return round((float) $average * 20, 1);
    }

    private function averageVillageScoreForRange($start, $end, ?string $typeCode): float
    {
        $query = VillageSurveyAssignment::query()->whereBetween('created_at', [$start, $end]);

        return $this->averageVillageScoreForQuery($query, $typeCode);
    }

    private function averageVillageScoreForComparison(string $filter, ?string $typeCode): float
    {
        [$start, $end] = $this->comparisonRange($filter);

        return $this->averageVillageScoreForRange($start, $end, $typeCode);
    }

    private function averageUmkmScoreForQuery($query): float
    {
        $umkmIds = (clone $query)->pluck('id');

        if ($umkmIds->isEmpty()) {
            return 0.0;
        }

        $completedCount = (clone $query)->whereHas('surveyAnswers')->count();

        if ($completedCount === 0) {
            return 0.0;
        }

        $totalWeightedScore = UmkmSurveyAnswer::query()
            ->whereIn('umkm_id', $umkmIds)
            ->sum('weighted_score');

        return round((float) ($totalWeightedScore / $completedCount), 1);
    }

    private function averageUmkmScoreForRange($start, $end): float
    {
        $query = VillageUmkm::query()->whereBetween('created_at', [$start, $end]);

        return $this->averageUmkmScoreForQuery($query);
    }

    private function averageUmkmScoreForComparison(string $filter): float
    {
        [$start, $end] = $this->comparisonRange($filter);

        return $this->averageUmkmScoreForRange($start, $end);
    }

    private function filterRange(string $filter): array
    {
        $now = now();

        return match ($filter) {
            'Hari Ini' => [$now->copy()->startOfDay(), $now->copy()->endOfDay()],
            '7 Hari Terakhir' => [$now->copy()->subDays(6)->startOfDay(), $now->copy()->endOfDay()],
            '30 Hari Terakhir' => [$now->copy()->subDays(29)->startOfDay(), $now->copy()->endOfDay()],
            'Bulan Ini' => [$now->copy()->startOfMonth(), $now->copy()->endOfDay()],
            'Tahun Ini' => [$now->copy()->startOfYear(), $now->copy()->endOfYear()],
            default => preg_match('/^\d{4}$/', $filter)
                ? [now()->setYear((int) $filter)->startOfYear(), now()->setYear((int) $filter)->endOfYear()]
                : [null, null],
        };
    }

    private function comparisonRange(string $filter): array
    {
        $now = now();

        return match ($filter) {
            'Hari Ini' => [$now->copy()->subDay()->startOfDay(), $now->copy()->subDay()->endOfDay()],
            '7 Hari Terakhir' => [$now->copy()->subDays(13)->startOfDay(), $now->copy()->subDays(7)->endOfDay()],
            '30 Hari Terakhir' => [$now->copy()->subDays(59)->startOfDay(), $now->copy()->subDays(30)->endOfDay()],
            'Bulan Ini' => [$now->copy()->subMonthNoOverflow()->startOfMonth(), $now->copy()->subMonthNoOverflow()->endOfMonth()],
            'Tahun Ini' => [$now->copy()->subYear()->startOfYear(), $now->copy()->subYear()->endOfYear()],
            default => preg_match('/^\d{4}$/', $filter)
                ? [now()->setYear(((int) $filter) - 1)->startOfYear(), now()->setYear(((int) $filter) - 1)->endOfYear()]
                : [$now->copy()->subDays(29)->startOfDay(), $now->copy()->subDay()->endOfDay()],
        };
    }

    private function chartBucketsForFilter(string $filter): array
    {
        if ($filter === 'Tahun Ini' || preg_match('/^\d{4}$/', $filter)) {
            $year = $filter === 'Tahun Ini' ? (int) now()->year : (int) $filter;

            return collect(range(1, 12))
                ->map(function (int $month) use ($year): array {
                    $date = now()->copy()->setYear($year)->setMonth($month)->startOfMonth();

                    return [
                        'label' => $date->format('M'),
                        'start' => $date->copy()->startOfMonth(),
                        'end' => $date->copy()->endOfMonth(),
                    ];
                })
                ->all();
        }

        if ($filter === 'Bulan Ini') {
            return collect(range(1, (int) now()->day))
                ->map(function (int $day): array {
                    $date = now()->copy()->startOfMonth()->setDay($day);

                    return [
                        'label' => $date->format('d'),
                        'start' => $date->copy()->startOfDay(),
                        'end' => $date->copy()->endOfDay(),
                    ];
                })
                ->all();
        }

        $days = match ($filter) {
            'Hari Ini' => 1,
            '7 Hari Terakhir' => 7,
            default => 30,
        };

        return collect(range($days - 1, 0))
            ->map(function (int $offset): array {
                $date = now()->copy()->subDays($offset);

                return [
                    'label' => $date->format('d M'),
                    'start' => $date->copy()->startOfDay(),
                    'end' => $date->copy()->endOfDay(),
                ];
            })
            ->all();
    }

    private function trendFromScores(float $current, float $previous): string
    {
        if ($previous == 0.0) {
            return $current > 0 ? '+100%' : '+0%';
        }

        $percent = (($current - $previous) / $previous) * 100;
        $sign = $percent > 0 ? '+' : '';

        return $sign.round($percent, 1).'%';
    }

    private function trendFromTotals(float $current, float $previous): string
    {
        if ($previous == 0.0) {
            return $current > 0 ? '+100%' : '+0%';
        }

        $percent = (($current - $previous) / $previous) * 100;
        $sign = $percent > 0 ? '+' : '';

        return $sign.round($percent, 1).'%';
    }
}
