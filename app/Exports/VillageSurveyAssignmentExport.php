<?php

namespace App\Exports;

use App\Models\SurveyAnswer;
use App\Models\SurveyAnswerDocument;
use App\Models\SurveyQuestion;
use App\Models\VillageSurveyAssignment;
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

class VillageSurveyAssignmentExport
{
    /**
     * @return array{path: string, filename: string}
     */
    public function export(VillageSurveyAssignment $assignment): array
    {
        $assignment->load([
            'village:id,code,name,province,city,district,subdistrict,address,postal_code,manager_name,manager_phone,manager_email',
            'template:id,title,description,status,published_at',
            'template.questions' => fn ($query) => $query
                ->select(['id', 'survey_template_id', 'aspect', 'code', 'question_text', 'document_hint', 'sort_order'])
                ->orderBy('sort_order')
                ->orderBy('id'),
            'template.questions.options' => fn ($query) => $query
                ->select(['id', 'survey_question_id', 'score', 'label', 'sort_order'])
                ->orderBy('sort_order')
                ->orderBy('score')
                ->orderBy('id'),
            'answers' => fn ($query) => $query->select([
                'id',
                'village_survey_assignment_id',
                'survey_question_id',
                'survey_question_option_id',
                'score',
                'option_label_snapshot',
                'answered_by',
                'last_edited_by',
                'answered_at',
                'last_edited_at',
            ]),
            'answers.answeredBy:id,name,email',
            'answers.lastEditedBy:id,name,email',
            'answers.option:id,score,label',
            'answers.documents:id,survey_answer_id,file_name,file_path,mime_type,file_size,created_at',
            'assignedBy:id,name,email',
            'submittedBy:id,name,email',
            'reviewedBy:id,name,email',
        ]);

        $spreadsheet = new Spreadsheet;
        $this->buildSummarySheet($spreadsheet, $assignment);
        $this->buildQuestionSheet($spreadsheet, $assignment);
        $spreadsheet->setActiveSheetIndex(0);

        $directory = storage_path('app/exports');
        File::ensureDirectoryExists($directory);

        $filename = $this->filename($assignment);
        $path = $directory.DIRECTORY_SEPARATOR.$filename;

        (new Xlsx($spreadsheet))->save($path);
        $spreadsheet->disconnectWorksheets();

        return compact('path', 'filename');
    }

    private function buildSummarySheet(Spreadsheet $spreadsheet, VillageSurveyAssignment $assignment): void
    {
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Ringkasan');

        $questions = $assignment->template?->questions ?? collect();
        $answers = $assignment->answers->keyBy('survey_question_id');
        $maxScore = $questions->sum(fn (SurveyQuestion $question): int => (int) $question->options->max('score'));
        $totalScore = $answers->sum(fn (SurveyAnswer $answer): int => (int) $answer->score);
        $finalScore = $maxScore > 0 ? round(($totalScore / $maxScore) * 100, 1) : 0;

        $rows = [
            ['Survey Assignment', ''],
            ['Kode Assignment', $assignment->code],
            ['Status', Str::headline($assignment->status)],
            ['Template', $assignment->template?->title ?? '-'],
            ['Assigned By', $assignment->assignedBy?->name ?? '-'],
            ['Submitted By', $assignment->submittedBy?->name ?? '-'],
            ['Reviewed By', $assignment->reviewedBy?->name ?? '-'],
            ['Assigned At', $this->formatDate($assignment->assigned_at)],
            ['Started At', $this->formatDate($assignment->started_at)],
            ['Last Saved At', $this->formatDate($assignment->last_saved_at)],
            ['Submitted At', $this->formatDate($assignment->submitted_at)],
            ['Reviewed At', $this->formatDate($assignment->reviewed_at)],
            ['', ''],
            ['Informasi Desa', ''],
            ['Nama Desa', $assignment->village?->name ?? '-'],
            ['Kode Desa', $assignment->village?->code ?? '-'],
            ['Alamat', $assignment->village?->address ?? '-'],
            ['Lokasi', $this->villageLocation($assignment)],
            ['Kode Pos', $assignment->village?->postal_code ?? '-'],
            ['Pengelola', $assignment->village?->manager_name ?? '-'],
            ['Telepon Pengelola', $assignment->village?->manager_phone ?? '-'],
            ['Email Pengelola', $assignment->village?->manager_email ?? '-'],
            ['', ''],
            ['Ringkasan Jawaban', ''],
            ['Total Pertanyaan', $questions->count()],
            ['Terjawab', $answers->count()],
            ['Belum Dijawab', max($questions->count() - $answers->count(), 0)],
            ['Total Skor', $totalScore],
            ['Skor Maksimal', $maxScore],
            ['Nilai Akhir (%)', $finalScore],
        ];

        $sheet->fromArray($rows);
        $sheet->getColumnDimension('A')->setWidth(28);
        $sheet->getColumnDimension('B')->setWidth(70);
        $sheet->getStyle('A:B')->getAlignment()->setVertical(Alignment::VERTICAL_TOP)->setWrapText(true);

        foreach ([1, 14, 24] as $row) {
            $sheet->mergeCells("A{$row}:B{$row}");
            $sheet->getStyle("A{$row}:B{$row}")->applyFromArray($this->sectionStyle());
        }
    }

    private function buildQuestionSheet(Spreadsheet $spreadsheet, VillageSurveyAssignment $assignment): void
    {
        $sheet = $spreadsheet->createSheet();
        $sheet->setTitle('Pertanyaan Jawaban');

        $headings = [
            'No',
            'Aspek',
            'Kode Pertanyaan',
            'Pertanyaan',
            'Dokumen Hint',
            'Status Jawaban',
            'Skor',
            'Jawaban/Opsi Dipilih',
            'Dijawab Oleh',
            'Terakhir Diedit Oleh',
            'Tanggal Dijawab',
            'Tanggal Terakhir Edit',
            'Jumlah Dokumen',
        ];

        $answers = $assignment->answers->keyBy('survey_question_id');

        $maxDocuments = 0;
        $rows = ($assignment->template?->questions ?? collect())
            ->values()
            ->map(function (SurveyQuestion $question, int $index) use ($answers): array {
                /** @var SurveyAnswer|null $answer */
                $answer = $answers->get($question->id);
                $documents = $answer?->documents ?? collect();

                $baseRow = [
                    $index + 1,
                    $question->aspect,
                    $question->code ?? 'Q-'.$question->id,
                    $question->question_text,
                    $question->document_hint,
                    $answer ? 'Terjawab' : 'Belum dijawab',
                    $answer?->score,
                    $answer?->option_label_snapshot ?? $answer?->option?->label,
                    $answer?->answeredBy?->name,
                    $answer?->lastEditedBy?->name,
                    $this->formatDate($answer?->answered_at),
                    $this->formatDate($answer?->last_edited_at),
                    $documents->count(),
                ];

                $documentLinks = $documents
                    ->map(fn (SurveyAnswerDocument $document): string => $this->documentUrl($document))
                    ->toArray();

                return array_merge($baseRow, $documentLinks);
            })
            ->all();

        foreach ($rows as $row) {
            $docCount = count($row) - 13;
            if ($docCount > $maxDocuments) {
                $maxDocuments = $docCount;
            }
        }

        for ($i = 1; $i <= $maxDocuments; $i++) {
            $headings[] = "Dokumen {$i}";
        }

        array_unshift($rows, $headings);

        $sheet->fromArray($rows);
        $sheet->freezePane('A2');
        $lastColumnIndex = count($headings);
        $lastColumn = Coordinate::stringFromColumnIndex($lastColumnIndex);

        $sheet->getStyle("A1:{$lastColumn}1")->applyFromArray($this->headerStyle());
        $sheet->getStyle("A:{$lastColumn}")->getAlignment()->setVertical(Alignment::VERTICAL_TOP)->setWrapText(true);

        foreach ([8, 12, 14, 18, 22, 36, 22, 18, 22, 22, 20, 20, 14, 30] as $index => $width) {
            $sheet->getColumnDimension(Coordinate::stringFromColumnIndex($index + 1))->setWidth($width);
        }

        for ($i = 14; $i < $lastColumnIndex; $i++) {
            $sheet->getColumnDimension(Coordinate::stringFromColumnIndex($i + 1))->setWidth(40);
        }

        $lastRow = max(count($rows), 1);
        $sheet->getStyle("A1:{$lastColumn}{$lastRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN)->setColor(new Color('FFE2E8F0'));
    }

    private function filename(VillageSurveyAssignment $assignment): string
    {
        $villageCode = Str::slug($assignment->village?->code ?: 'desa');

        return "survey-assignment-{$assignment->id}-{$villageCode}.xlsx";
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

    private function documentUrl(SurveyAnswerDocument $document): string
    {
        return Storage::disk('public')->url($document->file_path);
    }

    /**
     * @return array<string, mixed>
     */
    private function sectionStyle(): array
    {
        return [
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '0066AE']],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function headerStyle(): array
    {
        return [
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '093967']],
        ];
    }
}
