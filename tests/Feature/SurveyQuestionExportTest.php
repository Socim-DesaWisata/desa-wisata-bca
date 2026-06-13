<?php

use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataSuveyOption;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use App\Models\UmkmSurveyQuestion;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PhpOffice\PhpSpreadsheet\IOFactory;

uses(RefreshDatabase::class);

test('admin can export village question template with complete questions and options in one sheet', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Desa Export',
        'type' => 'village',
        'status' => 'published',
        'created_by' => $admin->id,
        'published_at' => now(),
    ]);

    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-001',
        'question_text' => 'Apakah fasilitas umum tersedia?',
        'document_hint' => 'Lampirkan foto fasilitas.',
        'sort_order' => 1,
    ]);

    foreach ([1 => 'Tidak ada', 2 => 'Kurang', 3 => 'Baik', 4 => 'Sangat baik'] as $score => $label) {
        SurveyQuestionOption::query()->create([
            'survey_question_id' => $question->id,
            'score' => $score,
            'label' => $label,
            'sort_order' => $score,
        ]);
    }

    $response = $this->actingAs($admin)->get(route('questions.export', $template));

    $response->assertOk();
    $response->assertDownload('template-soal-village-template-desa-export.xlsx');

    $filePath = $response->baseResponse->getFile()->getPathname();
    $spreadsheet = IOFactory::load($filePath);
    $questionSheet = $spreadsheet->getSheetByName('Pertanyaan');

    expect($spreadsheet->getSheetNames())->toBe(['Pertanyaan'])
        ->and($questionSheet?->getCell('C2')->getValue())->toBe('AM-001')
        ->and($questionSheet?->getCell('D2')->getValue())->toBe('Apakah fasilitas umum tersedia?')
        ->and($questionSheet?->getCell('F2')->getValue())->toBe('Tidak ada')
        ->and($questionSheet?->getCell('I2')->getValue())->toBe('Sangat baik');
});

test('admin can export umkm question template in one sheet', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template UMKM Export',
        'type' => 'umkm',
        'status' => 'published',
        'created_by' => $admin->id,
        'published_at' => now(),
    ]);

    UmkmSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'criteria_code' => 'A',
        'criteria_name' => 'Kelembagaan',
        'criteria_weight_percent' => 25,
        'question_number' => 1,
        'question_text' => 'Apakah usaha memiliki legalitas?',
        'question_weight_percent' => 10,
        'max_score' => 100,
        'help_text' => 'Lampirkan NIB jika ada.',
        'sort_order' => 1,
        'is_active' => true,
    ]);

    $response = $this->actingAs($admin)->get(route('questions.export', $template));

    $response->assertOk();
    $response->assertDownload('template-soal-umkm-template-umkm-export.xlsx');

    $filePath = $response->baseResponse->getFile()->getPathname();
    $spreadsheet = IOFactory::load($filePath);
    $questionSheet = $spreadsheet->getSheetByName('Pertanyaan');

    expect($spreadsheet->getSheetNames())->toBe(['Pertanyaan'])
        ->and($questionSheet?->getCell('C2')->getValue())->toBe('A')
        ->and($questionSheet?->getCell('D2')->getValue())->toBe('Kelembagaan')
        ->and($questionSheet?->getCell('F2')->getValue())->toBe(1)
        ->and($questionSheet?->getCell('G2')->getValue())->toBe('Apakah usaha memiliki legalitas?')
        ->and($questionSheet?->getCell('J2')->getValue())->toBe('Lampirkan NIB jika ada.');
});

test('admin can export pariwisata question template with options in one sheet', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Pariwisata Export',
        'type' => 'pariwisata',
        'status' => 'published',
        'created_by' => $admin->id,
        'published_at' => now(),
    ]);
    $question = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'category_code' => 'A',
        'category_name' => 'Pengelolaan',
        'sub_category_code' => 'A.1',
        'sub_category_name' => 'Perencanaan',
        'criteria_code' => 'A.1.1',
        'criteria_name' => 'Dokumen Strategi',
        'criteria_description' => 'Ada dokumen strategi.',
        'indicator_code' => 'A.1.1.a',
        'indicator_name' => 'Strategi tertulis',
        'indicator_description' => 'Strategi tersedia tertulis.',
        'supporting_evidence' => 'Dokumen rencana kerja.',
        'input_type' => 'single_choice',
        'document_required' => true,
        'document_hint' => 'Upload dokumen strategi.',
        'sort_order' => 1,
        'is_active' => true,
    ]);

    PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $question->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Lengkap',
        'description' => 'Dokumen lengkap dan terbaru.',
        'sort_order' => 1,
    ]);

    $response = $this->actingAs($admin)->get(route('questions.export', $template));

    $response->assertOk();
    $response->assertDownload('template-soal-pariwisata-template-pariwisata-export.xlsx');

    $filePath = $response->baseResponse->getFile()->getPathname();
    $spreadsheet = IOFactory::load($filePath);
    $questionSheet = $spreadsheet->getSheetByName('Pertanyaan');

    expect($spreadsheet->getSheetNames())->toBe(['Pertanyaan'])
        ->and($questionSheet?->getCell('B2')->getValue())->toBe('A')
        ->and($questionSheet?->getCell('I2')->getValue())->toBe('A.1.1.a')
        ->and($questionSheet?->getCell('L2')->getValue())->toBe('Dokumen rencana kerja.')
        ->and($questionSheet?->getCell('Q2')->getValue())->toBe('A')
        ->and($questionSheet?->getCell('R2')->getValue())->toBe('Lengkap')
        ->and($questionSheet?->getCell('S2')->getValue())->toBe('Dokumen lengkap dan terbaru.')
        ->and($questionSheet?->getCell('T2')->getValue())->toBe(4);
});
