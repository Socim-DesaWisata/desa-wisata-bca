<?php

namespace App\Exports;

use App\Models\UmkmSurveyAnswer;
use App\Models\UmkmSurveyQuestion;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageUmkm;
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

class UmkmSurveyExport
{
    /**
     * @return array{path: string, filename: string}
     */
    public function export(VillageSurveyAssignment $assignment, VillageUmkm $umkm): array
    {
        abort_unless((int) $assignment->village_id === (int) $umkm->village_id, 404);

        $assignment->loadMissing([
            'village:id,code,name,province,city,district,subdistrict,address,postal_code',
            'template:id,title,type,status',
            'assignedBy:id,name,email',
            'submittedBy:id,name,email',
            'reviewedBy:id,name,email',
        ]);

        $umkm->load([
            'village:id,code,name,province,city,district,subdistrict,address,postal_code',
            'creator:id,name,email',
            'dataCollector:id,name,email',
            'categories:id,village_umkm_id,category',
            'documents:id,village_umkm_id,uploaded_by,document_name,file_path,mime_type,file_size,created_at,updated_at',
            'documents.uploadedBy:id,name,email',
            'annualTurnovers:id,umkm_id,year,value,notes,created_by,created_at',
            'annualTurnovers.creator:id,name,email',
            'annualWorkerStats:id,umkm_id,year,dimension,category_value,total_people,notes,created_by,created_at',
            'annualWorkerStats.creator:id,name,email',
            'annualWorkerTrainingStats:id,umkm_id,year,training_name,total_people,notes,created_by,created_at',
            'annualWorkerTrainingStats.creator:id,name,email',
            'surveyAnswers:id,umkm_id,umkm_assessment_question_id,answered_by,score,criteria_code_snapshot,criteria_name_snapshot,criteria_weight_percent_snapshot,question_text_snapshot,question_weight_percent_snapshot,max_score_snapshot,normalized_score,weighted_score,answered_at,last_edited_at',
            'surveyAnswers.answeredBy:id,name,email',
            'surveyAnswers.question:id,survey_template_id,criteria_code,criteria_name,criteria_weight_percent,question_number,question_text,question_weight_percent,max_score,help_text,sort_order,is_active',
        ]);

        $spreadsheet = new Spreadsheet;
        $this->buildSummarySheet($spreadsheet, $assignment, $umkm);
        $this->buildMasterSheet($spreadsheet, $umkm);
        $this->buildMarketingBankingSheet($spreadsheet, $umkm);
        $this->buildAnnualDataSheet($spreadsheet, $umkm);
        $this->buildDocumentSheet($spreadsheet, $umkm);
        $this->buildSurveySheet($spreadsheet, $assignment, $umkm);
        $spreadsheet->setActiveSheetIndex(0);

        $directory = storage_path('app/exports');
        File::ensureDirectoryExists($directory);

        $filename = $this->filename($assignment, $umkm);
        $path = $directory.DIRECTORY_SEPARATOR.$filename;

        (new Xlsx($spreadsheet))->save($path);
        $spreadsheet->disconnectWorksheets();

        return compact('path', 'filename');
    }

    private function buildSummarySheet(Spreadsheet $spreadsheet, VillageSurveyAssignment $assignment, VillageUmkm $umkm): void
    {
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Ringkasan');

        $questions = $this->questions($assignment, $umkm);
        $answers = $umkm->surveyAnswers;
        $totalScore = $answers->sum(fn (UmkmSurveyAnswer $answer): float => (float) $answer->score);
        $weightedScore = $answers->sum(fn (UmkmSurveyAnswer $answer): float => (float) $answer->weighted_score);

        $rows = [
            ['Survey Assignment', ''],
            ['Kode Assignment', $assignment->code],
            ['Status Assignment', Str::headline($assignment->status)],
            ['Template', $assignment->template?->title ?? '-'],
            ['Assigned By', $assignment->assignedBy?->name ?? '-'],
            ['Submitted By', $assignment->submittedBy?->name ?? '-'],
            ['Reviewed By', $assignment->reviewedBy?->name ?? '-'],
            ['', ''],
            ['Informasi Desa', ''],
            ['Nama Desa', $assignment->village?->name ?? '-'],
            ['Kode Desa', $assignment->village?->code ?? '-'],
            ['Lokasi', $this->villageLocation($assignment)],
            ['Alamat', $assignment->village?->address ?? '-'],
            ['', ''],
            ['Informasi UMKM', ''],
            ['Nama UMKM', $umkm->name],
            ['Nama Pemilik', $umkm->business_owner_name ?? '-'],
            ['Nama Legal Usaha', $umkm->legal_business_name ?? '-'],
            ['Kategori', $this->categories($umkm)],
            ['Brand', $umkm->brand_name ?? '-'],
            ['Collector', $umkm->dataCollector?->name ?? $umkm->collector_name ?? '-'],
            ['', ''],
            ['Ringkasan Survey UMKM', ''],
            ['Total Pertanyaan', max($questions->count(), $answers->pluck('umkm_assessment_question_id')->unique()->count())],
            ['Terjawab', $answers->count()],
            ['Belum Dijawab', max($questions->count() - $answers->count(), 0)],
            ['Total Skor', $totalScore],
            ['Weighted Score', round($weightedScore, 4)],
        ];

        $this->writeKeyValueSheet($sheet, $rows, [1, 9, 15, 23]);
    }

    private function buildMasterSheet(Spreadsheet $spreadsheet, VillageUmkm $umkm): void
    {
        $sheet = $spreadsheet->createSheet();
        $sheet->setTitle('Master UMKM');

        $rows = [
            ['Data Utama', ''],
            ['Nama UMKM', $umkm->name],
            ['Nama Pemilik', $umkm->business_owner_name ?? '-'],
            ['Nama Legal Usaha', $umkm->legal_business_name ?? '-'],
            ['Tahun Berdiri', $umkm->established_year ?? '-'],
            ['Website Perusahaan', $umkm->company_website_url ?? '-'],
            ['Alamat Produksi', $umkm->production_address ?? '-'],
            ['Kategori Produk', $umkm->product_category ?? '-'],
            ['Kategori Tambahan', $this->categories($umkm)],
            ['Brand', $umkm->brand_name ?? '-'],
            ['Foto Produk', $umkm->product_photo_path ? Storage::disk('public')->url($umkm->product_photo_path) : '-'],
            ['', ''],
            ['Produksi & Legalitas', ''],
            ['Omzet Tahunan', $umkm->annual_revenue],
            ['Kapasitas Produksi Bulanan', $umkm->monthly_production_capacity ?? '-'],
            ['Kendala Saat Ini', $umkm->current_obstacles ?? '-'],
            ['Sertifikasi', $umkm->certifications ?? '-'],
            ['Legalitas/Sertifikasi', $umkm->has_business_legality_and_certification ?? '-'],
            ['Peserta UMKM', $umkm->is_umkm_participant ?? '-'],
            ['Peserta Kapasitas Produksi', $umkm->is_production_capacity_participant ?? '-'],
            ['Kapasitas Produksi Tahunan', $umkm->annual_production_capacity ?? '-'],
            ['Kelayakan Lokasi Pabrik', $umkm->factory_location_feasibility ?? '-'],
        ];

        $this->writeKeyValueSheet($sheet, $rows, [1, 13]);
    }

    private function buildMarketingBankingSheet(Spreadsheet $spreadsheet, VillageUmkm $umkm): void
    {
        $sheet = $spreadsheet->createSheet();
        $sheet->setTitle('Marketing Banking');

        $rows = [
            ['Marketing', ''],
            ['Instagram', $umkm->instagram_url ?? '-'],
            ['Facebook', $umkm->facebook_url ?? '-'],
            ['Twitter', $umkm->twitter_url ?? '-'],
            ['Website Marketing', $umkm->marketing_website_url ?? '-'],
            ['Profil Ecommerce', $umkm->ecommerce_profile_url ?? '-'],
            ['Catatan Marketing', $umkm->marketing_notes ?? '-'],
            ['Catatan Sustainability', $umkm->sustainability_notes ?? '-'],
            ['', ''],
            ['Banking & Export', ''],
            ['Bank', $umkm->bank_name ?? '-'],
            ['Nomor Rekening', $umkm->bank_account_number ?? '-'],
            ['Memiliki QRIS', $this->booleanLabel($umkm->has_qris)],
            ['Provider QRIS', $umkm->qris_provider ?? '-'],
            ['Memiliki EDC', $this->booleanLabel($umkm->has_edc)],
            ['Provider EDC', $umkm->edc_provider ?? '-'],
            ['Memiliki Kartu Kredit', $this->booleanLabel($umkm->has_credit_card)],
            ['Catatan Banking', $umkm->banking_notes ?? '-'],
            ['Pernah Ekspor', $this->booleanLabel($umkm->has_exported)],
            ['Negara Tujuan Ekspor', $umkm->export_destination_countries ?? '-'],
        ];

        $this->writeKeyValueSheet($sheet, $rows, [1, 10]);
    }

    private function buildAnnualDataSheet(Spreadsheet $spreadsheet, VillageUmkm $umkm): void
    {
        $sheet = $spreadsheet->createSheet();
        $sheet->setTitle('Data Tahunan');

        $rows = [[
            'Tipe Data', 'Tahun', 'Dimensi/Pelatihan', 'Kategori', 'Nilai/Jumlah', 'Catatan', 'Dibuat Oleh', 'Dibuat Pada',
        ]];

        foreach ($umkm->annualTurnovers->sortBy('year') as $turnover) {
            $rows[] = ['Omzet', $turnover->year, '', '', $turnover->value, $turnover->notes, $turnover->creator?->name, $this->formatDate($turnover->created_at)];
        }

        foreach ($umkm->annualWorkerStats->sortBy('year') as $stat) {
            $rows[] = ['Pekerja', $stat->year, $stat->dimension, $stat->category_value, $stat->total_people, $stat->notes, $stat->creator?->name, $this->formatDate($stat->created_at)];
        }

        foreach ($umkm->annualWorkerTrainingStats->sortBy('year') as $training) {
            $rows[] = ['Pelatihan Pekerja', $training->year, $training->training_name, '', $training->total_people, $training->notes, $training->creator?->name, $this->formatDate($training->created_at)];
        }

        $this->writeTableSheet($sheet, $rows, [22, 12, 28, 24, 18, 34, 24, 20]);
    }

    private function buildDocumentSheet(Spreadsheet $spreadsheet, VillageUmkm $umkm): void
    {
        $sheet = $spreadsheet->createSheet();
        $sheet->setTitle('Dokumen');

        $rows = [[
            'No', 'Nama Dokumen', 'URL Dokumen', 'Path File', 'MIME Type', 'Ukuran File', 'Uploader', 'Dibuat Pada', 'Diperbarui Pada',
        ]];

        foreach ($umkm->documents->values() as $index => $document) {
            $rows[] = [
                $index + 1,
                $document->document_name,
                Storage::disk('public')->url($document->file_path),
                $document->file_path,
                $document->mime_type,
                $document->file_size,
                $document->uploadedBy?->name,
                $this->formatDate($document->created_at),
                $this->formatDate($document->updated_at),
            ];
        }

        $this->writeTableSheet($sheet, $rows, [8, 28, 46, 34, 24, 16, 24, 20, 20]);
    }

    private function buildSurveySheet(Spreadsheet $spreadsheet, VillageSurveyAssignment $assignment, VillageUmkm $umkm): void
    {
        $sheet = $spreadsheet->createSheet();
        $sheet->setTitle('Survey UMKM');

        $headings = [
            'No', 'Kode Kriteria', 'Nama Kriteria', 'Bobot Kriteria (%)', 'Nomor Pertanyaan',
            'Pertanyaan', 'Bobot Pertanyaan (%)', 'Skor Maksimal', 'Status Jawaban', 'Skor',
            'Normalized Score', 'Weighted Score', 'Dijawab Oleh', 'Tanggal Dijawab', 'Terakhir Edit',
        ];
        $answers = $umkm->surveyAnswers
            ->sortBy([
                fn (UmkmSurveyAnswer $answer): string => (string) ($answer->criteria_code_snapshot ?? $answer->question?->criteria_code ?? ''),
                fn (UmkmSurveyAnswer $answer): int => (int) ($answer->question?->sort_order ?? $answer->question?->question_number ?? $answer->umkm_assessment_question_id),
            ])
            ->values();
        $answeredQuestionIds = $answers->pluck('umkm_assessment_question_id')->filter()->unique();
        $rows = [$headings];
        $rowNumber = 1;

        foreach ($answers as $answer) {
            $question = $answer->question;
            $rows[] = [
                $rowNumber++,
                $answer->criteria_code_snapshot ?? $question?->criteria_code,
                $answer->criteria_name_snapshot ?? $question?->criteria_name,
                $answer->criteria_weight_percent_snapshot ?? $question?->criteria_weight_percent,
                $question?->question_number,
                $answer->question_text_snapshot ?? $question?->question_text,
                $answer->question_weight_percent_snapshot ?? $question?->question_weight_percent,
                $answer->max_score_snapshot ?? $question?->max_score,
                'Terjawab',
                $answer->score,
                $answer->normalized_score,
                $answer->weighted_score,
                $answer->answeredBy?->name,
                $this->formatDate($answer->answered_at),
                $this->formatDate($answer->last_edited_at),
            ];
        }

        foreach ($this->questions($assignment, $umkm)->whereNotIn('id', $answeredQuestionIds)->values() as $question) {
            $rows[] = [
                $rowNumber++,
                $question->criteria_code,
                $question->criteria_name,
                $question->criteria_weight_percent,
                $question->question_number,
                $question->question_text,
                $question->question_weight_percent,
                $question->max_score,
                'Belum dijawab',
                null,
                null,
                null,
                null,
                '',
                '',
            ];
        }

        $this->writeTableSheet($sheet, $rows, [8, 16, 28, 18, 18, 46, 20, 16, 18, 12, 18, 18, 24, 20, 20]);
    }

    private function writeKeyValueSheet($sheet, array $rows, array $sectionRows): void
    {
        $sheet->fromArray($rows);
        $sheet->getColumnDimension('A')->setWidth(32);
        $sheet->getColumnDimension('B')->setWidth(78);
        $sheet->getStyle('A:B')->getAlignment()->setVertical(Alignment::VERTICAL_TOP)->setWrapText(true);

        foreach ($sectionRows as $row) {
            $sheet->mergeCells("A{$row}:B{$row}");
            $sheet->getStyle("A{$row}:B{$row}")->applyFromArray($this->sectionStyle());
        }
    }

    private function writeTableSheet($sheet, array $rows, array $widths): void
    {
        $sheet->fromArray($rows);
        $sheet->freezePane('A2');

        $lastColumn = Coordinate::stringFromColumnIndex(count($rows[0]));
        $lastRow = max(count($rows), 1);

        $sheet->getStyle("A1:{$lastColumn}1")->applyFromArray($this->headerStyle());
        $sheet->getStyle("A:{$lastColumn}")->getAlignment()->setVertical(Alignment::VERTICAL_TOP)->setWrapText(true);
        $sheet->getStyle("A1:{$lastColumn}{$lastRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN)->setColor(new Color('FFE2E8F0'));

        foreach ($widths as $index => $width) {
            $sheet->getColumnDimension(Coordinate::stringFromColumnIndex($index + 1))->setWidth($width);
        }
    }

    private function questions(VillageSurveyAssignment $assignment, VillageUmkm $umkm)
    {
        $templateIds = $umkm->surveyAnswers
            ->map(fn (UmkmSurveyAnswer $answer): mixed => $answer->question?->survey_template_id)
            ->filter()
            ->unique()
            ->values();

        return UmkmSurveyQuestion::query()
            ->when(
                $templateIds->isNotEmpty(),
                fn ($query) => $query->whereIn('survey_template_id', $templateIds),
                fn ($query) => $query->where('survey_template_id', $assignment->survey_template_id),
            )
            ->orderBy('criteria_code')
            ->orderBy('sort_order')
            ->orderBy('question_number')
            ->orderBy('id')
            ->get();
    }

    private function filename(VillageSurveyAssignment $assignment, VillageUmkm $umkm): string
    {
        $villageCode = Str::slug($assignment->village?->code ?: 'desa');
        $umkmName = Str::slug($umkm->name ?: 'umkm');

        return "survey-umkm-{$assignment->id}-{$villageCode}-{$umkmName}.xlsx";
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

    private function categories(VillageUmkm $umkm): string
    {
        return $umkm->categories->pluck('category')->filter()->implode(', ') ?: '-';
    }

    private function booleanLabel(mixed $value): string
    {
        return is_null($value) ? '-' : ((bool) $value ? 'Ya' : 'Tidak');
    }

    private function formatDate(mixed $date): string
    {
        return $date ? $date->timezone(config('app.timezone'))->format('d M Y H:i') : '';
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
