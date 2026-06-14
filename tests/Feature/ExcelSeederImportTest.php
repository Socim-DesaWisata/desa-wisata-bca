<?php

use App\Models\PariwisataSurveyQuestion;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use App\Models\UmkmSurveyQuestion;
use Database\Seeders\PariwisataSurveySeeder;
use Database\Seeders\TemplateQuestionSeeder;
use Database\Seeders\UMKMSurveySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PhpOffice\PhpSpreadsheet\IOFactory;

uses(RefreshDatabase::class);

test('template question seeder imports village questions from desa workbook', function () {
    $sheet = IOFactory::load(database_path('data/final-revisi-desa.xlsx'))->getSheet(0);
    $rows = $sheet->toArray(null, true, true, false);
    $header = array_shift($rows);

    expect($header)->toBe([
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

    $this->seed(TemplateQuestionSeeder::class);

    $template = SurveyTemplate::query()->where('type', 'village')->firstOrFail();
    $thirdRow = $rows[2];
    $question = SurveyQuestion::query()
        ->where('survey_template_id', $template->id)
        ->where('code', $thirdRow[2])
        ->firstOrFail();

    expect(SurveyQuestion::query()->where('survey_template_id', $template->id)->count())->toBe(61)
        ->and($question->aspect)->toBe($thirdRow[1])
        ->and($question->question_text)->toBe($thirdRow[3])
        ->and($question->document_hint)->toBe($thirdRow[4])
        ->and($question->sort_order)->toBe((int) $thirdRow[0])
        ->and(SurveyQuestionOption::query()->where('survey_question_id', $question->id)->orderBy('sort_order')->pluck('label')->all())
        ->toBe(array_slice($thirdRow, 5, 4));
});

test('umkm survey seeder imports active rows and workbook metadata', function () {
    $sheet = IOFactory::load(database_path('data/revisi-umkm.xlsx'))->getSheet(0);
    $rows = $sheet->toArray(null, true, true, false);
    array_shift($rows);

    $this->seed(UMKMSurveySeeder::class);

    $template = SurveyTemplate::query()->where('type', 'umkm')->firstOrFail();
    $firstRow = $rows[0];
    $question = UmkmSurveyQuestion::query()
        ->where('survey_template_id', $template->id)
        ->where('criteria_code', $firstRow[2])
        ->where('question_number', (int) $firstRow[5])
        ->firstOrFail();

    expect(UmkmSurveyQuestion::query()->where('survey_template_id', $template->id)->count())->toBe(18)
        ->and($question->sort_order)->toBe((int) $firstRow[1])
        ->and((float) $question->criteria_weight_percent)->toBe((float) $firstRow[4])
        ->and((float) $question->question_weight_percent)->toBe((float) $firstRow[7])
        ->and((float) $question->max_score)->toBe((float) $firstRow[8])
        ->and($question->help_text)->toBe($firstRow[9])
        ->and($question->is_active)->toBeTrue();
});

test('pariwisata survey seeder imports workbook fields and option metadata', function () {
    $sheet = IOFactory::load(database_path('data/final-revisi-pariwisata.xlsx'))->getSheet(0);
    $rows = $sheet->toArray(null, true, true, false);
    array_shift($rows);

    $this->seed(PariwisataSurveySeeder::class);

    $template = SurveyTemplate::query()->where('type', 'pariwisata')->firstOrFail();
    $firstRow = $rows[0];
    $question = PariwisataSurveyQuestion::query()
        ->where('survey_template_id', $template->id)
        ->where('indicator_code', $firstRow[8])
        ->firstOrFail();
    $options = $question->options()->orderBy('sort_order')->get();

    expect(PariwisataSurveyQuestion::query()->where('survey_template_id', $template->id)->count())->toBe(174)
        ->and($question->indicator_name)->toBe($firstRow[9])
        ->and($question->indicator_description)->toBe($firstRow[10])
        ->and($question->supporting_evidence)->toBe($firstRow[11])
        ->and($question->document_hint)->toBe($firstRow[12])
        ->and($question->document_required)->toBeTrue()
        ->and($question->sort_order)->toBe((int) $firstRow[0])
        ->and($options->count())->toBe(4)
        ->and($options[0]->level)->toBe($firstRow[16])
        ->and($options[0]->label)->toBe($firstRow[17])
        ->and($options[0]->description)->toBe($firstRow[18])
        ->and($options[0]->score)->toBe((int) $firstRow[19]);
});
