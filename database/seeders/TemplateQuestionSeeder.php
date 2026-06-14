<?php

namespace Database\Seeders;

use App\Models\SurveyQuestion;
use App\Models\SurveyTemplate;
use App\Models\User;
use Database\Seeders\Concerns\ReadsExcelWorksheetRows;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TemplateQuestionSeeder extends Seeder
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
                ],
            );

            $template = SurveyTemplate::withTrashed()->firstOrNew([
                'title' => 'Survey Desa Wisata KEMENPAR',
                'type' => 'village',
            ]);
            $shouldRestore = $template->exists && $template->trashed();

            $template->fill([
                'description' => 'Template pertanyaan hasil impor dari final-revisi-desa.xlsx.',
                'status' => 'published',
                'created_by' => $user->id,
                'published_at' => now(),
            ]);
            $template->save();

            if ($shouldRestore) {
                $template->restore();
            }

            $template->questions()
                ->withTrashed()
                ->get()
                ->each(function (SurveyQuestion $question): void {
                    $question->options()->withTrashed()->forceDelete();
                    $question->forceDelete();
                });

            foreach ($this->rows() as $index => $row) {
                $question = $template->questions()->create([
                    'aspect' => $this->stringValue($row['Aspek']),
                    'code' => $this->stringValue($row['Kode']),
                    'question_text' => $this->stringValue($row['Pertanyaan']),
                    'document_hint' => $this->nullableStringValue($row['Dokumen Pendukung']),
                    'sort_order' => $this->intValue($row['No'], $index + 1),
                ]);

                foreach (range(1, 4) as $optionNumber) {
                    $question->options()->create([
                        'score' => $optionNumber,
                        'label' => $this->stringValue($row["Opsi {$optionNumber}"]),
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
        return $this->readWorksheetRows('data/final-revisi-desa.xlsx', [
            'No',
            'Aspek',
            'Kode',
            'Pertanyaan',
            'Dokumen Pendukung',
            'Opsi 1',
            'Opsi 2',
            'Opsi 3',
            'Opsi 4',
        ]);
    }
}
