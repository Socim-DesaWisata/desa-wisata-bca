<?php

namespace App\Exports;

use App\Models\PariwisataSurveyQuestion;
use App\Models\SurveyQuestion;
use App\Models\SurveyTemplate;
use App\Models\UmkmSurveyQuestion;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class SurveyQuestionTemplateExport
{
    /**
     * @return array{path: string, filename: string}
     */
    public function export(SurveyTemplate $template): array
    {
        match ($this->templateType($template)) {
            'umkm' => $template->loadMissing([
                'umkmSurveyQuestions' => fn ($query) => $query
                    ->orderBy('sort_order')
                    ->orderBy('criteria_code')
                    ->orderBy('question_number')
                    ->orderBy('id'),
            ]),
            'pariwisata' => $template->loadMissing([
                'pariwisataSurveyQuestions' => fn ($query) => $query
                    ->with(['options' => fn ($optionQuery) => $optionQuery
                        ->orderBy('sort_order')
                        ->orderBy('score')
                        ->orderBy('id')])
                    ->orderBy('sort_order')
                    ->orderBy('category_code')
                    ->orderBy('sub_category_code')
                    ->orderBy('criteria_code')
                    ->orderBy('indicator_code')
                    ->orderBy('id'),
            ]),
            default => $template->loadMissing([
                'questions' => fn ($query) => $query
                    ->with(['options' => fn ($optionQuery) => $optionQuery
                        ->orderBy('sort_order')
                        ->orderBy('score')
                        ->orderBy('id')])
                    ->orderBy('sort_order')
                    ->orderBy('aspect')
                    ->orderBy('id'),
            ]),
        };

        $spreadsheet = new Spreadsheet;
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Pertanyaan');

        match ($this->templateType($template)) {
            'umkm' => $this->buildUmkmRows($sheet, $template),
            'pariwisata' => $this->buildPariwisataRows($sheet, $template),
            default => $this->buildVillageRows($sheet, $template),
        };

        $spreadsheet->setActiveSheetIndex(0);

        $directory = storage_path('app/exports');
        File::ensureDirectoryExists($directory);

        $filename = $this->filename($template);
        $path = $directory.DIRECTORY_SEPARATOR.$filename;

        (new Xlsx($spreadsheet))->save($path);
        $spreadsheet->disconnectWorksheets();

        return compact('path', 'filename');
    }

    private function buildVillageRows(Worksheet $sheet, SurveyTemplate $template): void
    {
        $rows = [[
            'No', 'Aspek', 'Kode', 'Pertanyaan', 'Dokumen Pendukung', 'Opsi 1', 'Opsi 2', 'Opsi 3', 'Opsi 4',
        ]];

        foreach ($template->questions as $index => $question) {
            /** @var SurveyQuestion $question */
            $options = $question->options->sortBy('score')->values();

            $rows[] = [
                $index + 1,
                $question->aspect,
                $question->code,
                $question->question_text,
                $question->document_hint,
                $options->get(0)?->label,
                $options->get(1)?->label,
                $options->get(2)?->label,
                $options->get(3)?->label,
            ];
        }

        $sheet->fromArray($rows);
        $this->styleSheet($sheet, count($rows[0]), [8, 18, 16, 48, 32, 18, 18, 18, 18]);
    }

    private function buildUmkmRows(Worksheet $sheet, SurveyTemplate $template): void
    {
        $rows = [[
            'No', 'Urutan', 'Kode Kriteria', 'Nama Kriteria', 'Bobot Kriteria (%)', 'Nomor Pertanyaan', 'Pertanyaan', 'Bobot Pertanyaan (%)', 'Skor Maksimum', 'Petunjuk Dokumen', 'Status',
        ]];

        foreach ($template->umkmSurveyQuestions as $index => $question) {
            /** @var UmkmSurveyQuestion $question */
            $rows[] = [
                $index + 1,
                $question->sort_order,
                $question->criteria_code,
                $question->criteria_name,
                (float) $question->criteria_weight_percent,
                (int) $question->question_number,
                $question->question_text,
                (float) $question->question_weight_percent,
                (float) $question->max_score,
                $question->help_text,
                $question->is_active ? 'Aktif' : 'Nonaktif',
            ];
        }

        $sheet->fromArray($rows);
        $this->styleSheet($sheet, count($rows[0]), [8, 10, 14, 22, 18, 18, 42, 20, 16, 28, 14]);
    }

    private function buildPariwisataRows(Worksheet $sheet, SurveyTemplate $template): void
    {
        $maxOptionCount = max(1, $template->pariwisataSurveyQuestions->max(fn (PariwisataSurveyQuestion $question) => $question->options->count()));

        $headers = [
            'No', 'Kode Kategori', 'Nama Kategori', 'Kode Sub Kategori', 'Nama Sub Kategori', 'Kode Kriteria', 'Nama Kriteria', 'Deskripsi Kriteria', 'Kode Indikator', 'Nama Indikator', 'Deskripsi Indikator', 'Bukti Pendukung', 'Petunjuk Dokumen', 'Tipe Input', 'Dokumen Wajib', 'Status',
        ];

        for ($index = 1; $index <= $maxOptionCount; $index++) {
            $headers[] = "Opsi {$index} Level";
            $headers[] = "Opsi {$index} Label";
            $headers[] = "Opsi {$index} Deskripsi";
            $headers[] = "Opsi {$index} Skor";
        }

        $rows = [$headers];

        foreach ($template->pariwisataSurveyQuestions as $questionIndex => $question) {
            /** @var PariwisataSurveyQuestion $question */
            $row = [
                $questionIndex + 1,
                $question->category_code,
                $question->category_name,
                $question->sub_category_code,
                $question->sub_category_name,
                $question->criteria_code,
                $question->criteria_name,
                $question->criteria_description,
                $question->indicator_code,
                $question->indicator_name,
                $question->indicator_description,
                $question->supporting_evidence,
                $question->document_hint,
                $question->input_type,
                $question->document_required ? 'Ya' : 'Tidak',
                $question->is_active ? 'Aktif' : 'Nonaktif',
            ];

            $options = $question->options->sortBy('sort_order')->values();

            for ($index = 0; $index < $maxOptionCount; $index++) {
                $option = $options->get($index);
                $row[] = $option?->level;
                $row[] = $option?->label;
                $row[] = $option?->description;
                $row[] = $option?->score;
            }

            $rows[] = $row;
        }

        $sheet->fromArray($rows);

        $widths = [8, 16, 24, 18, 24, 16, 22, 24, 18, 28, 28, 24, 24, 14, 14, 14];
        for ($index = 0; $index < $maxOptionCount; $index++) {
            array_push($widths, 14, 20, 32, 10);
        }

        $this->styleSheet($sheet, count($rows[0]), $widths);
    }

    private function filename(SurveyTemplate $template): string
    {
        return 'template-soal-'.Str::slug($this->templateType($template)).'-'.Str::slug($template->title).'.xlsx';
    }

    private function templateType(SurveyTemplate $template): string
    {
        return in_array($template->type, ['village', 'umkm', 'pariwisata'], true)
            ? $template->type
            : 'village';
    }

    private function styleSheet(Worksheet $sheet, int $columnCount, array $widths): void
    {
        $lastColumn = Coordinate::stringFromColumnIndex($columnCount);
        $lastRow = max($sheet->getHighestRow(), 1);

        $sheet->freezePane('A2');
        $sheet->getStyle("A1:{$lastColumn}1")->applyFromArray($this->headerStyle());
        $sheet->getStyle("A:{$lastColumn}")->getAlignment()->setVertical(Alignment::VERTICAL_TOP)->setWrapText(true);
        $sheet->getStyle("A1:{$lastColumn}{$lastRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN)->setColor(new Color('FFE2E8F0'));

        foreach ($widths as $index => $width) {
            $sheet->getColumnDimension(Coordinate::stringFromColumnIndex($index + 1))->setWidth($width);
        }
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
