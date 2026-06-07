<?php

namespace App\Exports;

use App\Models\PariwisataSurveyAnswer;
use App\Models\PariwisataSurveyAnswerDocument;
use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataVillage;
use App\Models\VillageSurveyAssignment;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class PariwisataSurveyExport
{
    /**
     * @return array{path: string, filename: string}
     */
    public function export(VillageSurveyAssignment $assignment, PariwisataVillage $pariwisata): array
    {
        $assignment->loadMissing([
            'village:id,code,name,province,city,district,subdistrict,address,postal_code',
        ]);

        $pariwisata->load([
            'surveyAnswers' => fn ($query) => $query->select([
                'id',
                'pariwisata_village_id',
                'pariwisata_survey_question_id',
                'pariwisata_suvey_option_id',
                'score',
                'option_label_snapshot',
                'answered_by',
                'last_edited_by',
                'answered_at',
                'last_edited_at',
            ]),
            'surveyAnswers.answeredBy:id,name,email',
            'surveyAnswers.lastEditedBy:id,name,email',
            'surveyAnswers.option:id,score,label',
            'surveyAnswers.documents:id,pariwisata_survey_answer_id,file_name,file_path,mime_type,file_size,created_at',
        ]);

        $spreadsheet = new Spreadsheet;
        $this->buildSummarySheet($spreadsheet, $assignment, $pariwisata);
        $this->buildQuestionSheet($spreadsheet, $pariwisata);
        $spreadsheet->setActiveSheetIndex(0);

        $directory = storage_path('app/exports');
        File::ensureDirectoryExists($directory);

        $filename = $this->filename($assignment, $pariwisata);
        $path = $directory.DIRECTORY_SEPARATOR.$filename;

        (new Xlsx($spreadsheet))->save($path);
        $spreadsheet->disconnectWorksheets();

        return compact('path', 'filename');
    }

    private function buildSummarySheet(Spreadsheet $spreadsheet, VillageSurveyAssignment $assignment, PariwisataVillage $pariwisata): void
    {
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Ringkasan');

        $questions = PariwisataSurveyQuestion::query()->with('options:id,pariwisata_survey_question_id,score')->get();
        $answers = $pariwisata->surveyAnswers->keyBy('pariwisata_survey_question_id');
        $maxScore = $questions->sum(fn (PariwisataSurveyQuestion $question): int => (int) $question->options->max('score'));
        $totalScore = $answers->sum(fn (PariwisataSurveyAnswer $answer): int => (int) $answer->score);
        $finalScore = $maxScore > 0 ? round(($totalScore / $maxScore) * 100, 1) : 0;

        $rows = [
            ['Informasi Pariwisata', ''],
            ['Nama Pariwisata', $pariwisata->name],
            ['Desa', $assignment->village?->name ?? '-'],
            ['Lokasi', $this->villageLocation($assignment)],
            ['Hari Operasional', $pariwisata->operational_days ?? '-'],
            ['Jam Operasional', $pariwisata->operational_hours ?? '-'],
            ['Harga Tiket Masuk', $pariwisata->entrance_ticket_price ? 'Rp ' . number_format((float) $pariwisata->entrance_ticket_price, 0, ',', '.') : '-'],
            ['Deskripsi Tiket', $pariwisata->entrance_ticket_description ?? '-'],
            ['Alamat', $pariwisata->address ?? '-'],
            ['Nama PIC', $pariwisata->person_in_charge_name ?? '-'],
            ['Telepon PIC', $pariwisata->person_in_charge_phone ?? '-'],
            ['Status Aktif', $pariwisata->is_active ? 'Aktif' : 'Nonaktif'],
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

        foreach ([1, 14] as $row) {
            $sheet->mergeCells("A{$row}:B{$row}");
            $sheet->getStyle("A{$row}:B{$row}")->applyFromArray($this->sectionStyle());
        }
    }

    private function buildQuestionSheet(Spreadsheet $spreadsheet, PariwisataVillage $pariwisata): void
    {
        $sheet = $spreadsheet->createSheet();
        $sheet->setTitle('Pertanyaan Jawaban');

        $headings = [
            'No',
            'Kategori',
            'Sub Kategori',
            'Kriteria',
            'Indikator',
            'Status Jawaban',
            'Skor',
            'Jawaban/Opsi Dipilih',
            'Dijawab Oleh',
            'Terakhir Diedit Oleh',
            'Tanggal Dijawab',
            'Tanggal Terakhir Edit',
            'Jumlah Dokumen',
        ];

        $questions = PariwisataSurveyQuestion::query()->orderBy('category_code')->orderBy('id')->get();
        $answers = $pariwisata->surveyAnswers->keyBy('pariwisata_survey_question_id');
        
        $maxDocuments = 0;
        $rows = $questions
            ->map(function (PariwisataSurveyQuestion $question, int $index) use ($answers): array {
                /** @var PariwisataSurveyAnswer|null $answer */
                $answer = $answers->get($question->id);
                $documents = $answer?->documents ?? collect();

                $baseRow = [
                    $index + 1,
                    $question->category_name,
                    $question->sub_category_name,
                    $question->criteria_name,
                    $question->indicator_name,
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
                    ->map(fn (PariwisataSurveyAnswerDocument $document): string => $this->documentUrl($document))
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

        foreach ([8, 22, 22, 26, 36, 18, 14, 30, 22, 22, 20, 20, 14] as $index => $width) {
            $sheet->getColumnDimension(Coordinate::stringFromColumnIndex($index + 1))->setWidth($width);
        }
        
        for ($i = 13; $i < $lastColumnIndex; $i++) {
            $sheet->getColumnDimension(Coordinate::stringFromColumnIndex($i + 1))->setWidth(40);
        }

        $lastRow = max(count($rows), 1);
        $sheet->getStyle("A1:{$lastColumn}{$lastRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN)->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('FFE2E8F0'));
    }

    private function filename(VillageSurveyAssignment $assignment, PariwisataVillage $pariwisata): string
    {
        $villageCode = Str::slug($assignment->village?->code ?: 'desa');
        $pariwisataName = Str::slug($pariwisata->name);

        return "survey-pariwisata-{$assignment->id}-{$villageCode}-{$pariwisataName}.xlsx";
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

    private function documentUrl(PariwisataSurveyAnswerDocument $document): string
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
