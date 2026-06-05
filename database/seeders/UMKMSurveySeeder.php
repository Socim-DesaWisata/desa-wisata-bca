<?php

namespace Database\Seeders;

use App\Models\SurveyTemplate;
use App\Models\UmkmSurveyQuestion;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UMKMSurveySeeder extends Seeder
{
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
                'title' => 'Assessment Pelaku UMKM',
            ]);
            $shouldRestore = $template->exists && $template->trashed();

            $template->fill([
                'description' => 'Template assessment pelaku UMKM berdasarkan tabel biru Assessment Pelaku UMKM.',
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

            foreach ($this->questions() as $index => $question) {
                $template->umkmSurveyQuestions()->create([
                    'criteria_code' => $question['criteria_code'],
                    'criteria_name' => $question['criteria_name'],
                    'criteria_weight_percent' => $question['criteria_weight_percent'],
                    'question_number' => $question['question_number'],
                    'question_text' => $question['question_text'],
                    'question_weight_percent' => $question['question_weight_percent'],
                    'max_score' => 100.00,
                    'help_text' => $this->scoreHelpText($question['question_weight_percent']),
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]);
            }
        });
    }

    /**
     * @return array<int, array{criteria_code: string, criteria_name: string, criteria_weight_percent: float, question_number: int, question_text: string, question_weight_percent: float}>
     */
    private function questions(): array
    {
        return [
            [
                'criteria_code' => 'A',
                'criteria_name' => 'Kualitas Produk',
                'criteria_weight_percent' => 25.00,
                'question_number' => 1,
                'question_text' => 'Standar kualitas: Apakah produk telah memenuhi standar kualitas yang ditetapkan, baik secara nasional maupun internasional?',
                'question_weight_percent' => 10.00,
            ],
            [
                'criteria_code' => 'A',
                'criteria_name' => 'Kualitas Produk',
                'criteria_weight_percent' => 25.00,
                'question_number' => 2,
                'question_text' => 'Konsistensi kualitas: Apakah kualitas produk terjaga secara konsisten dari setiap produksi?',
                'question_weight_percent' => 8.00,
            ],
            [
                'criteria_code' => 'A',
                'criteria_name' => 'Kualitas Produk',
                'criteria_weight_percent' => 25.00,
                'question_number' => 3,
                'question_text' => 'Kemasan: Apakah kemasan produk menarik, informatif, dan aman untuk pengiriman?',
                'question_weight_percent' => 3.00,
            ],
            [
                'criteria_code' => 'A',
                'criteria_name' => 'Kualitas Produk',
                'criteria_weight_percent' => 25.00,
                'question_number' => 4,
                'question_text' => 'Inovasi: Apakah produk memiliki nilai tambah atau inovasi yang unik?',
                'question_weight_percent' => 4.00,
            ],
            [
                'criteria_code' => 'B',
                'criteria_name' => 'Kapasitas Produksi',
                'criteria_weight_percent' => 15.00,
                'question_number' => 1,
                'question_text' => 'Peralatan produksi: Apakah peralatan produksi yang digunakan memadai dan terawat dengan baik?',
                'question_weight_percent' => 5.00,
            ],
            [
                'criteria_code' => 'B',
                'criteria_name' => 'Kapasitas Produksi',
                'criteria_weight_percent' => 15.00,
                'question_number' => 2,
                'question_text' => 'Kapasitas produksi: Apakah kapasitas produksi saat ini sudah cukup untuk memenuhi permintaan pasar ekspor yang potensial?',
                'question_weight_percent' => 5.00,
            ],
            [
                'criteria_code' => 'B',
                'criteria_name' => 'Kapasitas Produksi',
                'criteria_weight_percent' => 15.00,
                'question_number' => 3,
                'question_text' => 'Efisiensi produksi: Apakah proses produksi sudah berjalan efisien dan efektif?',
                'question_weight_percent' => 5.00,
            ],
            [
                'criteria_code' => 'C',
                'criteria_name' => 'Sumber Daya Manusia',
                'criteria_weight_percent' => 10.00,
                'question_number' => 1,
                'question_text' => 'Keahlian tenaga kerja: Apakah tenaga kerja memiliki keahlian yang relevan dengan proses produksi?',
                'question_weight_percent' => 5.00,
            ],
            [
                'criteria_code' => 'C',
                'criteria_name' => 'Sumber Daya Manusia',
                'criteria_weight_percent' => 10.00,
                'question_number' => 2,
                'question_text' => 'Jumlah tenaga kerja: Apakah jumlah tenaga kerja sudah cukup untuk memenuhi kebutuhan produksi?',
                'question_weight_percent' => 5.00,
            ],
            [
                'criteria_code' => 'D',
                'criteria_name' => 'Fasilitas Produksi',
                'criteria_weight_percent' => 15.00,
                'question_number' => 1,
                'question_text' => 'Keamanan dan kebersihan: Apakah fasilitas produksi bersih, aman, dan memenuhi standar kesehatan?',
                'question_weight_percent' => 8.00,
            ],
            [
                'criteria_code' => 'D',
                'criteria_name' => 'Fasilitas Produksi',
                'criteria_weight_percent' => 15.00,
                'question_number' => 2,
                'question_text' => 'Lingkungan kerja: Apakah lingkungan kerja kondusif untuk meningkatkan produktivitas?',
                'question_weight_percent' => 7.00,
            ],
            [
                'criteria_code' => 'E',
                'criteria_name' => 'Sistem Manajemen',
                'criteria_weight_percent' => 15.00,
                'question_number' => 1,
                'question_text' => 'Sistem pengendalian kualitas: Apakah terdapat sistem pengendalian kualitas yang efektif untuk menjaga kualitas produk?',
                'question_weight_percent' => 5.00,
            ],
            [
                'criteria_code' => 'E',
                'criteria_name' => 'Sistem Manajemen',
                'criteria_weight_percent' => 15.00,
                'question_number' => 2,
                'question_text' => 'Sistem dokumentasi: Apakah terdapat sistem dokumentasi yang baik untuk mencatat semua aktivitas produksi?',
                'question_weight_percent' => 6.00,
            ],
            [
                'criteria_code' => 'E',
                'criteria_name' => 'Sistem Manajemen',
                'criteria_weight_percent' => 15.00,
                'question_number' => 3,
                'question_text' => 'Keuangan: Apakah keuangan UMKM sehat dan mampu membiayai kegiatan ekspor?',
                'question_weight_percent' => 4.00,
            ],
            [
                'criteria_code' => 'F',
                'criteria_name' => 'Potensi Pasar',
                'criteria_weight_percent' => 10.00,
                'question_number' => 1,
                'question_text' => 'Analisis pasar: Apakah UMKM telah melakukan analisis pasar yang mendalam untuk menentukan target pasar ekspor?',
                'question_weight_percent' => 5.00,
            ],
            [
                'criteria_code' => 'F',
                'criteria_name' => 'Potensi Pasar',
                'criteria_weight_percent' => 10.00,
                'question_number' => 2,
                'question_text' => 'Strategi pemasaran: Apakah UMKM memiliki strategi pemasaran yang jelas untuk memasuki pasar ekspor?',
                'question_weight_percent' => 5.00,
            ],
            [
                'criteria_code' => 'G',
                'criteria_name' => 'Komitmen terhadap Ekspor',
                'criteria_weight_percent' => 10.00,
                'question_number' => 1,
                'question_text' => 'Pengalaman ekspor: Apakah UMKM memiliki pengalaman sebelumnya dalam melakukan ekspor?',
                'question_weight_percent' => 5.00,
            ],
            [
                'criteria_code' => 'G',
                'criteria_name' => 'Komitmen terhadap Ekspor',
                'criteria_weight_percent' => 10.00,
                'question_number' => 2,
                'question_text' => 'Keseriusan dalam mengembangkan bisnis: Apakah UMKM memiliki komitmen yang kuat untuk mengembangkan bisnisnya di pasar global?',
                'question_weight_percent' => 5.00,
            ],
        ];
    }

    private function scoreHelpText(float $questionWeightPercent): string
    {
        return sprintf(
            'Kolom Nilai diisi skor 0-100 sesuai hasil assessment. Bobot pertanyaan: %.0f%%.',
            $questionWeightPercent,
        );
    }
}
