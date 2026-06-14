<?php

namespace Database\Seeders;

use App\Models\SurveyTemplate;
use App\Models\UmkmSurveyQuestion;
use App\Models\User;
use Database\Seeders\Concerns\ReadsExcelWorksheetRows;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UMKMSurveySeeder extends Seeder
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
                'title' => 'Survey UMKM',
                'type' => 'umkm',
            ]);
            $shouldRestore = $template->exists && $template->trashed();

            $template->fill([
                'description' => 'Template assessment pelaku UMKM hasil impor dari revisi-umkm.xlsx.',
                'status' => 'published',
                'created_by' => $user->id,
                'published_at' => now(),
            ]);
            $template->save();

            if ($shouldRestore) {
                $template->restore();
            }

            $questionIds = $template->umkmSurveyQuestions()
                ->withTrashed()
                ->pluck('id');

            if ($questionIds->isNotEmpty()) {
                DB::table('umkm_survey_answers')
                    ->whereIn('umkm_assessment_question_id', $questionIds)
                    ->delete();
            }

            $template->umkmSurveyQuestions()
                ->withTrashed()
                ->get()
                ->each(fn (UmkmSurveyQuestion $question) => $question->forceDelete());

            foreach ($this->rows() as $index => $row) {
                $template->umkmSurveyQuestions()->create([
                    'criteria_code' => $this->stringValue($row['Kode Kriteria']),
                    'criteria_name' => $this->stringValue($row['Nama Kriteria']),
                    'criteria_weight_percent' => $this->floatValue($row['Bobot Kriteria (%)']),
                    'question_number' => $this->intValue($row['Nomor Pertanyaan']),
                    'question_text' => $this->stringValue($row['Pertanyaan']),
                    'question_weight_percent' => $this->floatValue($row['Bobot Pertanyaan (%)']),
                    'max_score' => $this->floatValue($row['Skor Maksimum']),
                    'help_text' => $this->nullableStringValue($row['Petunjuk Dokumen']),
                    'sort_order' => $this->intValue($row['Urutan'], $index + 1),
                    'is_active' => true,
                ]);
            }
        });
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function rows(): array
    {
        return collect($this->readWorksheetRows('data/revisi-umkm.xlsx', [
            'No',
            'Urutan',
            'Kode Kriteria',
            'Nama Kriteria',
            'Bobot Kriteria (%)',
            'Nomor Pertanyaan',
            'Pertanyaan',
            'Bobot Pertanyaan (%)',
            'Skor Maksimum',
            'Petunjuk Dokumen',
            'Status',
        ]))
            ->filter(fn (array $row): bool => strcasecmp($this->stringValue($row['Status']), 'Aktif') === 0)
            ->values()
            ->all();
    }
}
