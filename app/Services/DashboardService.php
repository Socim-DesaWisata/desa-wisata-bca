<?php

namespace App\Services;

use App\Models\SurveyAnswer;
use App\Models\TourismVillage;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageSurveyAssignmentLog;
use Carbon\CarbonInterface;
use Illuminate\Support\Str;

class DashboardService
{
    /**
     * @return array<string, mixed>
     */
    public function getData(): array
    {
        return [
            'kpis' => $this->kpis(),
            'status_bars' => $this->statusBars(),
            'score_trend' => $this->scoreTrend(),
            'recent_assignments' => $this->recentAssignments(),
            'priorities' => $this->priorities(),
            'activities' => $this->activities(),
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
        $inProgressAssignments = VillageSurveyAssignment::query()
            ->where('status', 'in_progress')
            ->count();
        $currentWeekInProgress = VillageSurveyAssignment::query()
            ->where('status', 'in_progress')
            ->where('updated_at', '>=', now()->startOfWeek())
            ->count();
        $submittedAssignments = VillageSurveyAssignment::query()
            ->where('status', 'submitted')
            ->count();
        $currentWeekSubmitted = VillageSurveyAssignment::query()
            ->where('status', 'submitted')
            ->where('submitted_at', '>=', now()->startOfWeek())
            ->count();
        $averageScore = $this->averageScore();

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
                'title' => 'Survey Berjalan',
                'value' => (string) $inProgressAssignments,
                'desc' => 'Assignment aktif',
                'trend' => '+'.$currentWeekInProgress.' minggu ini',
                'icon' => 'clipboard',
                'tone' => 'success',
            ],
            [
                'title' => 'Menunggu Review',
                'value' => (string) $submittedAssignments,
                'desc' => 'Siap ditinjau reviewer',
                'trend' => '+'.$currentWeekSubmitted.' minggu ini',
                'icon' => 'search',
                'tone' => 'warning',
            ],
            [
                'title' => 'Rata-rata Skor',
                'value' => number_format($averageScore, 1),
                'desc' => 'Skor jawaban terkumpul',
                'trend' => $this->scoreTrendText(),
                'icon' => 'trending',
                'tone' => $averageScore >= 75 ? 'success' : 'warning',
            ],
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function statusBars(): array
    {
        $statuses = [
            'assigned' => ['label' => 'Assigned', 'color' => '#AAD2F8'],
            'in_progress' => ['label' => 'Progress', 'color' => '#0066AE'],
            'submitted' => ['label' => 'Submitted', 'color' => '#2FA6FC'],
            'approved' => ['label' => 'Approved', 'color' => '#00893D'],
            'need_revision' => ['label' => 'Revision', 'color' => '#FF944C'],
            'rejected' => ['label' => 'Rejected', 'color' => '#D81313'],
        ];

        $counts = VillageSurveyAssignment::query()
            ->selectRaw('status, count(*) as aggregate')
            ->groupBy('status')
            ->pluck('aggregate', 'status');

        return collect($statuses)
            ->map(fn (array $meta, string $status): array => [
                'label' => $meta['label'],
                'value' => (int) ($counts[$status] ?? 0),
                'color' => $meta['color'],
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<int, array<string, string|float>>
     */
    private function scoreTrend(): array
    {
        return collect(range(5, 0))
            ->map(function (int $monthsAgo): array {
                $date = now()->subMonths($monthsAgo);

                return [
                    'label' => $date->translatedFormat('M'),
                    'value' => $this->averageScoreForMonth($date),
                ];
            })
            ->values()
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

                return [
                    'id' => $assignment->id,
                    'village' => $assignment->village?->name ?? '-',
                    'location' => collect([
                        $assignment->village?->city,
                        $assignment->village?->province,
                    ])->filter()->implode(', ') ?: '-',
                    'progress' => min($progress, 100),
                    'status' => $assignment->status,
                    'status_label' => $this->statusLabel($assignment->status),
                    'enumerators' => $assignment->answers()
                        ->distinct('answered_by')
                        ->count('answered_by'),
                    'updated_at' => $assignment->updated_at?->diffForHumans() ?? '-',
                ];
            })
            ->all();
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

    private function averageScore(): float
    {
        return round(((float) SurveyAnswer::query()->avg('score')) * 20, 1);
    }

    private function averageScoreForMonth(CarbonInterface $month): float
    {
        return round(((float) SurveyAnswer::query()
            ->whereBetween('created_at', [
                $month->copy()->startOfMonth(),
                $month->copy()->endOfMonth(),
            ])
            ->avg('score')) * 20, 1);
    }

    private function scoreTrendText(): string
    {
        $thisMonth = $this->averageScoreForMonth(now());
        $lastMonth = $this->averageScoreForMonth(now()->subMonth());
        $delta = round($thisMonth - $lastMonth, 1);

        if ($delta === 0.0) {
            return 'stabil bulan ini';
        }

        return ($delta > 0 ? '+' : '').number_format($delta, 1).' poin';
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
}
