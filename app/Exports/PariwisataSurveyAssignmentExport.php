<?php

namespace App\Exports;

use App\Models\PariwisataSurveyAnswer;
use App\Models\PariwisataSurveyAnswerDocument;
use App\Models\PariwisataSurveyQuestion;
use App\Models\VillageSurveyAssignment;
use App\Services\ActiveSurveyTemplateResolver;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class PariwisataSurveyAssignmentExport
{
    public function __construct(private ActiveSurveyTemplateResolver $templateResolver) {}

    /**
     * @return array{path: string, filename: string}
     */
    public function export(VillageSurveyAssignment $assignment): array
    {
        $assignment->loadMissing([
            'village:id,code,name,province,city,district,subdistrict,address,postal_code',
            'pariwisataSurveyAnswers' => fn ($query) => $query
                ->select([
                    'id',
                    'village_survey_assignment_id',
                    'pariwisata_survey_question_id',
                    'pariwisata_suvey_option_id',
                    'score',
                    'notes',
                    'category_code_snapshot',
                    'category_name_snapshot',
                    'sub_category_code_snapshot',
                    'sub_category_name_snapshot',
                    'criteria_code_snapshot',
                    'criteria_name_snapshot',
                    'criteria_description_snapshot',
                    'indicator_code_snapshot',
                    'indicator_name_snapshot',
                    'indicator_description_snapshot',
                    'supporting_evidence_snapshot',
                    'option_label_snapshot',
                    'option_description_snapshot',
                    'answered_by',
                    'last_edited_by',
                    'answered_at',
                    'last_edited_at',
                    'created_at',
                    'updated_at',
                    'deleted_at',
                ])
                ->with([
                    'question:id,survey_template_id,category_code,category_name,sub_category_code,sub_category_name,criteria_code,criteria_name,criteria_description,indicator_code,indicator_name,indicator_description,supporting_evidence,document_required,document_hint,sort_order',
                    'option:id,pariwisata_survey_question_id,score,level,label,description,sort_order',
                    'answeredBy:id,name,email',
                    'lastEditedBy:id,name,email',
                    'documents:id,pariwisata_survey_answer_id,uploaded_by,file_name,file_path,mime_type,file_size,caption,created_at,updated_at,deleted_at',
                    'documents.uploadedBy:id,name,email',
                ]),
        ]);

        $template = $this->templateResolver->resolve('pariwisata', [
            'pariwisataSurveyQuestions' => fn ($query) => $query
                ->select([
                    'id',
                    'survey_template_id',
                    'category_code',
                    'category_name',
                    'sub_category_code',
                    'sub_category_name',
                    'criteria_code',
                    'criteria_name',
                    'criteria_description',
                    'indicator_code',
                    'indicator_name',
                    'indicator_description',
                    'supporting_evidence',
                    'document_required',
                    'document_hint',
                    'sort_order',
                    'is_active',
                ])
                ->where('is_active', true)
                ->with(['options:id,pariwisata_survey_question_id,score,level,label,description,sort_order'])
                ->orderBy('sort_order')
                ->orderBy('id'),
        ]);

        $questions = $this->sortQuestions($template?->pariwisataSurveyQuestions ?? collect());
        $answers = $this->sortAnswers($assignment->pariwisataSurveyAnswers);
        $spreadsheet = new Spreadsheet;
        $this->buildSummarySheet($spreadsheet, $assignment, $template?->title, $questions, $answers);
        $this->buildAnswersSheet($spreadsheet, $answers);
        $this->buildDocumentsSheet($spreadsheet, $answers);
        $spreadsheet->setActiveSheetIndex(0);

        $directory = storage_path('app/exports');
        File::ensureDirectoryExists($directory);

        $filename = $this->filename($assignment);
        $path = $directory.DIRECTORY_SEPARATOR.$filename;

        (new Xlsx($spreadsheet))->save($path);
        $spreadsheet->disconnectWorksheets();

        return compact('path', 'filename');
    }

    /**
     * @param  Collection<int, PariwisataSurveyQuestion>  $questions
     * @param  Collection<int, PariwisataSurveyAnswer>  $answers
     */
    private function buildSummarySheet(Spreadsheet $spreadsheet, VillageSurveyAssignment $assignment, ?string $templateTitle, Collection $questions, Collection $answers): void
    {
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Ringkasan');

        $maxScore = $questions->sum(fn (PariwisataSurveyQuestion $question): int => (int) $question->options->max('score'));
        $totalScore = $answers->sum(fn (PariwisataSurveyAnswer $answer): int => (int) $answer->score);
        $finalScore = $maxScore > 0 ? round(($totalScore / $maxScore) * 100, 1) : 0;
        $documentCount = $answers->sum(fn (PariwisataSurveyAnswer $answer): int => $answer->documents->count());

        $rows = [
            ['Ringkasan Survey Pariwisata', ''],
            ['Kode Assignment', $assignment->code],
            ['Desa', $assignment->village?->name ?? '-'],
            ['Lokasi', $this->villageLocation($assignment)],
            ['Template Pariwisata Aktif', $templateTitle ?? 'Template tidak ditemukan'],
            ['', ''],
            ['Ringkasan Jawaban', ''],
            ['Total Pertanyaan', $questions->count()],
            ['Terjawab', $answers->count()],
            ['Belum Dijawab', max($questions->count() - $answers->count(), 0)],
            ['Total Dokumen', $documentCount],
            ['Total Skor', $totalScore],
            ['Skor Maksimal', $maxScore],
            ['Nilai Akhir (%)', $finalScore],
        ];

        $sheet->fromArray($rows);
        $sheet->getColumnDimension('A')->setWidth(28);
        $sheet->getColumnDimension('B')->setWidth(70);
        $sheet->getStyle('A:B')->getAlignment()->setVertical(Alignment::VERTICAL_TOP)->setWrapText(true);

        foreach ([1, 7] as $row) {
            $sheet->mergeCells("A{$row}:B{$row}");
            $sheet->getStyle("A{$row}:B{$row}")->applyFromArray($this->sectionStyle('0066AE'));
        }
    }

    /**
     * @param  Collection<int, PariwisataSurveyAnswer>  $answers
     */
    private function buildAnswersSheet(Spreadsheet $spreadsheet, Collection $answers): void
    {
        $sheet = $spreadsheet->createSheet();
        $sheet->setTitle('Jawaban Pariwisata');

        $headings = [
            'id',
            'village_survey_assignment_id',
            'pariwisata_survey_question_id',
            'pariwisata_suvey_option_id',
            'score',
            'notes',
            'category_code_snapshot',
            'category_name_snapshot',
            'sub_category_code_snapshot',
            'sub_category_name_snapshot',
            'criteria_code_snapshot',
            'criteria_name_snapshot',
            'criteria_description_snapshot',
            'indicator_code_snapshot',
            'indicator_name_snapshot',
            'indicator_description_snapshot',
            'supporting_evidence_snapshot',
            'option_label_snapshot',
            'option_description_snapshot',
            'answered_by',
            'last_edited_by',
            'answered_at',
            'last_edited_at',
            'created_at',
            'updated_at',
            'deleted_at',
            'answered_by_name',
            'last_edited_by_name',
            'document_count',
        ];

        $rows = $answers->map(fn (PariwisataSurveyAnswer $answer): array => [
            $answer->id,
            $answer->village_survey_assignment_id,
            $answer->pariwisata_survey_question_id,
            $answer->pariwisata_suvey_option_id,
            $answer->score,
            $answer->notes,
            $answer->category_code_snapshot,
            $answer->category_name_snapshot,
            $answer->sub_category_code_snapshot,
            $answer->sub_category_name_snapshot,
            $answer->criteria_code_snapshot,
            $answer->criteria_name_snapshot,
            $answer->criteria_description_snapshot,
            $answer->indicator_code_snapshot,
            $answer->indicator_name_snapshot,
            $answer->indicator_description_snapshot,
            $answer->supporting_evidence_snapshot,
            $answer->option_label_snapshot,
            $answer->option_description_snapshot,
            $answer->answered_by,
            $answer->last_edited_by,
            $this->formatDate($answer->answered_at),
            $this->formatDate($answer->last_edited_at),
            $this->formatDate($answer->created_at),
            $this->formatDate($answer->updated_at),
            $this->formatDate($answer->deleted_at),
            $answer->answeredBy?->name,
            $answer->lastEditedBy?->name,
            $answer->documents->count(),
        ])->all();

        $this->populateSheet($sheet, $headings, $rows, '093967');
    }

    /**
     * @param  Collection<int, PariwisataSurveyAnswer>  $answers
     */
    private function buildDocumentsSheet(Spreadsheet $spreadsheet, Collection $answers): void
    {
        $sheet = $spreadsheet->createSheet();
        $sheet->setTitle('Dokumen');

        $headings = [
            'id',
            'pariwisata_survey_answer_id',
            'uploaded_by',
            'uploaded_by_name',
            'file_name',
            'file_path',
            'file_url',
            'mime_type',
            'file_size',
            'caption',
            'created_at',
            'updated_at',
            'deleted_at',
        ];

        $rows = $answers
            ->flatMap(fn (PariwisataSurveyAnswer $answer) => $answer->documents)
            ->values()
            ->map(fn (PariwisataSurveyAnswerDocument $document): array => [
                $document->id,
                $document->pariwisata_survey_answer_id,
                $document->uploaded_by,
                $document->uploadedBy?->name,
                $document->file_name,
                $document->file_path,
                Storage::disk('public')->url($document->file_path),
                $document->mime_type,
                $document->file_size,
                $document->caption,
                $this->formatDate($document->created_at),
                $this->formatDate($document->updated_at),
                $this->formatDate($document->deleted_at),
            ])
            ->all();

        $this->populateSheet($sheet, $headings, $rows, '0B6AAE');
    }

    /**
     * @param  list<string>  $headings
     * @param  list<array<int, mixed>>  $rows
     */
    private function populateSheet(\PhpOffice\PhpSpreadsheet\Worksheet\Worksheet $sheet, array $headings, array $rows, string $headerColor): void
    {
        array_unshift($rows, $headings);
        $sheet->fromArray($rows);
        $sheet->freezePane('A2');

        $lastColumnIndex = count($headings);
        $lastColumn = Coordinate::stringFromColumnIndex($lastColumnIndex);
        $lastRow = max(count($rows), 1);

        $sheet->getStyle("A1:{$lastColumn}1")->applyFromArray($this->sectionStyle($headerColor));
        $sheet->getStyle("A:{$lastColumn}")->getAlignment()->setVertical(Alignment::VERTICAL_TOP)->setWrapText(true);
        $sheet->getStyle("A1:{$lastColumn}{$lastRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN)->setColor(new Color('FFE2E8F0'));

        foreach ($headings as $index => $heading) {
            $column = Coordinate::stringFromColumnIndex($index + 1);
            $width = in_array($heading, ['notes', 'criteria_description_snapshot', 'indicator_description_snapshot', 'supporting_evidence_snapshot', 'option_description_snapshot', 'file_url', 'file_path', 'caption'], true) ? 36 : 22;
            $sheet->getColumnDimension($column)->setWidth($width);
        }
    }

    private function filename(VillageSurveyAssignment $assignment): string
    {
        $villageCode = Str::slug($assignment->village?->code ?: 'desa');

        return "survey-pariwisata-assignment-{$assignment->id}-{$villageCode}.xlsx";
    }

    private function villageLocation(VillageSurveyAssignment $assignment): string
    {
        return collect([
            $assignment->village?->subdistrict,
            $assignment->village?->district,
            $assignment->village?->city,
            $assignment->village?->province,
        ])->filter()->implode(', ') ?: '-';
    }

    private function formatDate(mixed $date): string
    {
        return $date ? $date->timezone(config('app.timezone'))->format('d M Y H:i') : '';
    }

    /**
     * @param  Collection<int, PariwisataSurveyQuestion>  $questions
     * @return Collection<int, PariwisataSurveyQuestion>
     */
    private function sortQuestions(Collection $questions): Collection
    {
        return $questions->sort(function (PariwisataSurveyQuestion $left, PariwisataSurveyQuestion $right): int {
            foreach ([
                $this->compareHierarchicalCodes($left->category_code, $right->category_code),
                $this->compareHierarchicalCodes($left->sub_category_code, $right->sub_category_code),
                $this->compareHierarchicalCodes($left->criteria_code, $right->criteria_code),
                ((int) $left->sort_order) <=> ((int) $right->sort_order),
                $this->compareHierarchicalCodes($left->indicator_code, $right->indicator_code),
                $left->id <=> $right->id,
            ] as $comparison) {
                if ($comparison !== 0) {
                    return $comparison;
                }
            }

            return 0;
        })->values();
    }

    /**
     * @param  Collection<int, PariwisataSurveyAnswer>  $answers
     * @return Collection<int, PariwisataSurveyAnswer>
     */
    private function sortAnswers(Collection $answers): Collection
    {
        return $answers->sort(function (PariwisataSurveyAnswer $left, PariwisataSurveyAnswer $right): int {
            foreach ([
                $this->compareHierarchicalCodes($left->category_code_snapshot, $right->category_code_snapshot),
                $this->compareHierarchicalCodes($left->sub_category_code_snapshot, $right->sub_category_code_snapshot),
                $this->compareHierarchicalCodes($left->criteria_code_snapshot, $right->criteria_code_snapshot),
                $this->compareHierarchicalCodes($left->indicator_code_snapshot, $right->indicator_code_snapshot),
                $left->id <=> $right->id,
            ] as $comparison) {
                if ($comparison !== 0) {
                    return $comparison;
                }
            }

            return 0;
        })->values();
    }

    private function compareHierarchicalCodes(?string $left, ?string $right): int
    {
        $left = trim((string) $left);
        $right = trim((string) $right);

        if ($left === '' && $right === '') {
            return 0;
        }

        if ($left === '') {
            return 1;
        }

        if ($right === '') {
            return -1;
        }

        $leftSegments = preg_split('/\./', mb_strtolower($left)) ?: [];
        $rightSegments = preg_split('/\./', mb_strtolower($right)) ?: [];
        $segmentCount = max(count($leftSegments), count($rightSegments));

        for ($index = 0; $index < $segmentCount; $index++) {
            $leftSegment = $leftSegments[$index] ?? null;
            $rightSegment = $rightSegments[$index] ?? null;

            if ($leftSegment === null) {
                return -1;
            }

            if ($rightSegment === null) {
                return 1;
            }

            $comparison = $this->compareCodeSegments($leftSegment, $rightSegment);
            if ($comparison !== 0) {
                return $comparison;
            }
        }

        return 0;
    }

    private function compareCodeSegments(string $leftSegment, string $rightSegment): int
    {
        preg_match_all('/\d+|\D+/', $leftSegment, $leftParts);
        preg_match_all('/\d+|\D+/', $rightSegment, $rightParts);

        $leftParts = $leftParts[0] ?? [];
        $rightParts = $rightParts[0] ?? [];
        $partsCount = max(count($leftParts), count($rightParts));

        for ($index = 0; $index < $partsCount; $index++) {
            $leftPart = $leftParts[$index] ?? null;
            $rightPart = $rightParts[$index] ?? null;

            if ($leftPart === null) {
                return -1;
            }

            if ($rightPart === null) {
                return 1;
            }

            $leftIsNumeric = ctype_digit($leftPart);
            $rightIsNumeric = ctype_digit($rightPart);
            $comparison = $leftIsNumeric && $rightIsNumeric
                ? ((int) $leftPart) <=> ((int) $rightPart)
                : strcmp($leftPart, $rightPart);

            if ($comparison !== 0) {
                return $comparison;
            }
        }

        return 0;
    }

    /**
     * @return array<string, mixed>
     */
    private function sectionStyle(string $background): array
    {
        return [
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => $background]],
        ];
    }
}
