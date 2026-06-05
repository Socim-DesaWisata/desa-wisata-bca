<?php

namespace App\Services;

use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataVillage;
use App\Models\SurveyAnswer;
use App\Models\TourismVillage;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageSurveyAssignmentLog;
use App\Models\VillageUmkm;
use App\Models\VillageUmkmCategory;
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
            'top_village_surveys' => $this->topVillageSurveys(),
            'top_umkm_surveys' => $this->topUmkmSurveys(),
            'top_pariwisata_surveys' => $this->topPariwisataSurveys(),
            'top_umkm_categories' => $this->topUmkmCategories(),
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
        $totalUmkms = VillageUmkm::query()->count();
        $currentMonthUmkms = VillageUmkm::query()
            ->where('created_at', '>=', now()->startOfMonth())
            ->count();
        $totalPariwisata = PariwisataVillage::query()->count();
        $currentMonthPariwisata = PariwisataVillage::query()
            ->where('created_at', '>=', now()->startOfMonth())
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
    private function topVillageSurveys(): array
    {
        return VillageSurveyAssignment::query()
            ->select(['id', 'village_id', 'survey_template_id', 'status', 'updated_at'])
            ->whereHas('answers')
            ->with(['village:id,name,city,province', 'template:id,title'])
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

                return [
                    'id' => $assignment->id,
                    'name' => $assignment->village?->name ?? '-',
                    'meta' => collect([$assignment->village?->city, $assignment->village?->province])->filter()->implode(', ') ?: '-',
                    'score' => $score,
                    'progress' => $totalQuestions > 0 ? min((int) round(($assignment->answers_count / $totalQuestions) * 100), 100) : 0,
                    'answers' => $assignment->answers_count.'/'.$totalQuestions,
                    'status' => $this->statusLabel($assignment->status),
                    'url' => route('survey-assignments.show', $assignment),
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

    private function latestAssignmentForVillage(int $villageId): ?VillageSurveyAssignment
    {
        return VillageSurveyAssignment::query()
            ->select(['id', 'village_id'])
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
}
