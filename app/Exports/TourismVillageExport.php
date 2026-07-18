<?php

namespace App\Exports;

use App\Models\TourismVillage;
use App\Services\ActiveSurveyTemplateResolver;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class TourismVillageExport
{
    public function __construct(private ActiveSurveyTemplateResolver $templateResolver) {}

    /**
     * @return array{path: string, filename: string}
     */
    public function export(): array
    {
        $villages = TourismVillage::query()
            ->select(['id', 'name'])
            ->with([
                'surveyAssignment:id,village_id,survey_template_id',
                'surveyAssignment.template.questions' => fn ($query) => $query
                    ->select(['id', 'survey_template_id', 'aspect'])
                    ->with('options:id,survey_question_id,score')
                    ->orderBy('sort_order'),
                'surveyAssignment.answers:id,village_survey_assignment_id,survey_question_id,score',
                'surveyAssignment.pariwisataSurveyAnswers:id,village_survey_assignment_id,pariwisata_survey_question_id,score',
            ])
            ->withSum('surveyAnswers as kemenpar_score', 'score')
            ->withSum('pariwisataSurveyAnswers as istc_score', 'score')
            ->orderBy('name')
            ->get();

        $istcTemplate = $this->templateResolver->resolve('pariwisata', [
            'pariwisataSurveyQuestions' => fn ($query) => $query
                ->where('is_active', true)
                ->with('options:id,pariwisata_survey_question_id,score')
                ->orderBy('sort_order'),
        ]);
        $istcQuestions = $istcTemplate?->pariwisataSurveyQuestions ?? collect();
        $kemenparAspects = $this->kemenparAspects($villages);
        $istcAspects = $istcQuestions
            ->map(fn ($question): string => (string) ($question->category_name ?: 'Lainnya'))
            ->unique()
            ->values();

        $spreadsheet = new Spreadsheet;
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Data Desa');

        $headers = [
            'No',
            'Nama Desa',
            'Tipe Desa',
            'Skor KEMENPAR',
            'Skor ISTC',
            ...$kemenparAspects->map(fn (string $aspect): string => 'KEMENPAR - '.$aspect)->all(),
            ...$istcAspects->map(fn (string $aspect): string => 'ISTC - '.$aspect)->all(),
        ];
        $sheet->fromArray([$headers], null, 'A1');

        foreach ($villages as $index => $village) {
            $kemenparScores = $this->kemenparScores($village);
            $istcScores = $this->istcScores($village, $istcQuestions);
            $row = [
                $index + 1,
                (string) $village->name,
                $this->villageType((int) ($village->kemenpar_score ?? 0)),
                (int) ($village->kemenpar_score ?? 0),
                (int) ($village->istc_score ?? 0),
                ...$kemenparAspects->map(fn (string $aspect): int => $kemenparScores[$aspect] ?? 0)->all(),
                ...$istcAspects->map(fn (string $aspect): int => $istcScores[$aspect] ?? 0)->all(),
            ];
            $sheet->fromArray([$row], null, 'A'.($index + 2));
        }

        $lastColumn = $sheet->getHighestColumn();
        $lastRow = max(1, $sheet->getHighestRow());
        $sheet->getStyle('A1:'.$lastColumn.$lastRow)->getAlignment()->setVertical(Alignment::VERTICAL_TOP);
        $sheet->getStyle('A1:'.$lastColumn.'1')->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '0066AE']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER, 'wrapText' => true],
            'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN, 'color' => ['rgb' => 'DDE4EC']]],
        ]);
        $sheet->freezePane('A2');
        $sheet->setAutoFilter('A1:'.$lastColumn.$lastRow);
        foreach (range(1, count($headers)) as $column) {
            $sheet->getColumnDimensionByColumn($column)->setAutoSize(true);
        }

        $directory = storage_path('app/exports');
        File::ensureDirectoryExists($directory);
        $filename = 'export-data-desa-'.now()->format('Ymd-His').'.xlsx';
        $path = $directory.DIRECTORY_SEPARATOR.$filename;
        (new Xlsx($spreadsheet))->save($path);
        $spreadsheet->disconnectWorksheets();

        return compact('path', 'filename');
    }

    /** @return Collection<int, string> */
    private function kemenparAspects(Collection $villages): Collection
    {
        return $villages
            ->flatMap(fn ($village) => $village->surveyAssignment?->template?->questions?->map(fn ($question) => (string) $question->aspect) ?? collect())
            ->filter()
            ->unique()
            ->values();
    }

    /** @return array<string, int> */
    private function kemenparScores(TourismVillage $village): array
    {
        $assignment = $village->surveyAssignment;
        if (! $assignment?->template) {
            return [];
        }

        $answers = $assignment->answers->keyBy('survey_question_id');
        return $assignment->template->questions
            ->groupBy('aspect')
            ->mapWithKeys(fn ($questions, string $aspect): array => [
                $aspect => (int) $questions->sum(fn ($question): int => (int) ($answers->get($question->id)?->score ?? 0)),
            ])
            ->all();
    }

    /** @return array<string, int> */
    private function istcScores(TourismVillage $village, Collection $questions): array
    {
        $answers = $village->surveyAssignment?->pariwisataSurveyAnswers?->keyBy('pariwisata_survey_question_id') ?? collect();
        return $questions
            ->groupBy(fn ($question): string => (string) ($question->category_name ?: 'Lainnya'))
            ->mapWithKeys(fn ($aspectQuestions, string $aspect): array => [
                $aspect => (int) $aspectQuestions->sum(fn ($question): int => (int) ($answers->get($question->id)?->score ?? 0)),
            ])
            ->all();
    }

    private function villageType(int $score): string
    {
        return match (true) {
            $score >= 199 && $score <= 244 => 'Mandiri',
            $score >= 153 && $score <= 198 => 'Maju',
            $score >= 107 && $score <= 152 => 'Berkembang',
            $score >= 61 && $score <= 106 => 'Rintisan',
            default => '-',
        };
    }
}
