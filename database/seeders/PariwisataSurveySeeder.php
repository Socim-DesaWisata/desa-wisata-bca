<?php

namespace Database\Seeders;

use App\Models\PariwisataSurveyQuestion;
use App\Models\SurveyTemplate;
use App\Models\User;
use Database\Seeders\Concerns\ReadsExcelWorksheetRows;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PariwisataSurveySeeder extends Seeder
{
    use ReadsExcelWorksheetRows;

    public function run(): void
    {
        DB::transaction(function (): void {
            $user = User::query()->firstOrCreate(
                ['email' => 'admin@desa-wisata-bca.test'],
                [
                    'name' => 'Admin CSR',
                    'password' => 'password',
                    'role' => 'admin',
                    'status' => 'active',
                ],
            );

            $template = SurveyTemplate::withTrashed()->firstOrNew([
                'title' => 'Survey Pariwisata ISTC',
                'type' => 'pariwisata',
            ]);
            $shouldRestore = $template->exists && $template->trashed();

            $template->fill([
                'description' => 'Template survey pariwisata hasil impor dari final-revisi-pariwisata.xlsx.',
                'status' => 'published',
                'created_by' => $user->id,
                'published_at' => now(),
            ]);
            $template->save();

            if ($shouldRestore) {
                $template->restore();
            }

            $template->pariwisataSurveyQuestions()
                ->withTrashed()
                ->get()
                ->each(function (PariwisataSurveyQuestion $question): void {
                    $question->options()->withTrashed()->forceDelete();
                    $question->forceDelete();
                });

            foreach ($this->rows() as $index => $row) {
                $question = $template->pariwisataSurveyQuestions()->create([
                    'category_code' => $this->nullableStringValue($row['Kode Kategori']),
                    'category_name' => $this->nullableStringValue($row['Nama Kategori']),
                    'sub_category_code' => $this->nullableStringValue($row['Kode Sub Kategori']),
                    'sub_category_name' => $this->nullableStringValue($row['Nama Sub Kategori']),
                    'criteria_code' => $this->nullableStringValue($row['Kode Kriteria']),
                    'criteria_name' => $this->nullableStringValue($row['Nama Kriteria']),
                    'criteria_description' => $this->nullableStringValue($row['Deskripsi Kriteria']),
                    'indicator_code' => $this->stringValue($row['Kode Indikator']),
                    'indicator_name' => $this->stringValue($row['Nama Indikator']),
                    'indicator_description' => $this->nullableStringValue($row['Deskripsi Indikator']),
                    'supporting_evidence' => $this->nullableStringValue($row['Bukti Pendukung']),
                    'input_type' => $this->stringValue($row['Tipe Input']),
                    'document_required' => $this->yesNoBoolean($row['Dokumen Wajib']),
                    'document_hint' => $this->nullableStringValue($row['Petunjuk Dokumen']),
                    'sort_order' => $this->intValue($row['No'], $index + 1),
                    'is_active' => true,
                ]);

                foreach (range(1, 4) as $optionNumber) {
                    $question->options()->create([
                        'level' => $this->stringValue($row["Opsi {$optionNumber} Level"]),
                        'label' => $this->stringValue($row["Opsi {$optionNumber} Label"]),
                        'description' => $this->nullableStringValue($row["Opsi {$optionNumber} Deskripsi"]),
                        'score' => $this->intValue($row["Opsi {$optionNumber} Skor"]),
                        'sort_order' => $optionNumber,
                    ]);
                }
            }
        });
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function rows(): array
    {
        return collect($this->readWorksheetRows('data/final-revisi-pariwisata.xlsx', [
            'No',
            'Kode Kategori',
            'Nama Kategori',
            'Kode Sub Kategori',
            'Nama Sub Kategori',
            'Kode Kriteria',
            'Nama Kriteria',
            'Deskripsi Kriteria',
            'Kode Indikator',
            'Nama Indikator',
            'Deskripsi Indikator',
            'Bukti Pendukung',
            'Petunjuk Dokumen',
            'Tipe Input',
            'Dokumen Wajib',
            'Status',
            'Opsi 1 Level',
            'Opsi 1 Label',
            'Opsi 1 Deskripsi',
            'Opsi 1 Skor',
            'Opsi 2 Level',
            'Opsi 2 Label',
            'Opsi 2 Deskripsi',
            'Opsi 2 Skor',
            'Opsi 3 Level',
            'Opsi 3 Label',
            'Opsi 3 Deskripsi',
            'Opsi 3 Skor',
            'Opsi 4 Level',
            'Opsi 4 Label',
            'Opsi 4 Deskripsi',
            'Opsi 4 Skor',
        ]))
            ->filter(fn (array $row): bool => strcasecmp($this->stringValue($row['Status']), 'Aktif') === 0)
            ->values()
            ->all();
    }
}
