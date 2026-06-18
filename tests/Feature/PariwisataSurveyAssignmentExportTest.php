<?php

use App\Models\PariwisataSurveyAnswer;
use App\Models\PariwisataSurveyAnswerDocument;
use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataSuveyOption;
use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PhpOffice\PhpSpreadsheet\IOFactory;

uses(RefreshDatabase::class);

test('admin can export assignment level pariwisata survey answers to excel', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $assignmentTemplate = SurveyTemplate::factory()->create([
        'title' => 'Template Assignment Desa',
        'type' => 'village',
        'created_by' => $admin->id,
    ]);

    $pariwisataTemplate = SurveyTemplate::factory()->create([
        'title' => 'Template Pariwisata Export Assignment',
        'type' => 'pariwisata',
        'status' => 'published',
        'created_by' => $admin->id,
        'published_at' => now(),
    ]);

    $village = TourismVillage::factory()->create([
        'code' => 'DS-EXPORT-01',
        'name' => 'Desa Export Pariwisata',
        'created_by' => $admin->id,
    ]);

    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-EXP-PAR-001',
        'village_id' => $village->id,
        'survey_template_id' => $assignmentTemplate->id,
        'assigned_by' => $admin->id,
    ]);

    $question = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $pariwisataTemplate->id,
        'category_code' => 'A',
        'category_name' => 'Pengelolaan',
        'sub_category_code' => 'A.8.a',
        'sub_category_name' => 'Sub A8',
        'criteria_code' => 'A.8',
        'criteria_name' => 'Kriteria A8',
        'criteria_description' => 'Deskripsi kriteria A8',
        'indicator_code' => 'A.8.a',
        'indicator_name' => 'Indikator A8',
        'indicator_description' => 'Deskripsi indikator A8',
        'supporting_evidence' => 'Dokumen A8',
        'input_type' => 'single_choice',
        'document_required' => true,
        'document_hint' => 'Upload dokumen A8',
        'sort_order' => 1,
        'is_active' => true,
    ]);

    $option = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $question->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Lengkap',
        'description' => 'Dokumen lengkap',
        'sort_order' => 1,
    ]);

    $answer = PariwisataSurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'pariwisata_survey_question_id' => $question->id,
        'pariwisata_suvey_option_id' => $option->id,
        'score' => 4,
        'notes' => 'Catatan ekspor pariwisata',
        'category_code_snapshot' => 'A',
        'category_name_snapshot' => 'Pengelolaan',
        'sub_category_code_snapshot' => 'A.8.a',
        'sub_category_name_snapshot' => 'Sub A8',
        'criteria_code_snapshot' => 'A.8',
        'criteria_name_snapshot' => 'Kriteria A8',
        'criteria_description_snapshot' => 'Deskripsi kriteria A8',
        'indicator_code_snapshot' => 'A.8.a',
        'indicator_name_snapshot' => 'Indikator A8',
        'indicator_description_snapshot' => 'Deskripsi indikator A8',
        'supporting_evidence_snapshot' => 'Dokumen A8',
        'option_label_snapshot' => 'Lengkap',
        'option_description_snapshot' => 'Dokumen lengkap',
        'answered_by' => $admin->id,
        'last_edited_by' => $admin->id,
        'answered_at' => now(),
        'last_edited_at' => now(),
    ]);

    PariwisataSurveyAnswerDocument::query()->create([
        'pariwisata_survey_answer_id' => $answer->id,
        'uploaded_by' => $admin->id,
        'file_name' => 'bukti-a8.pdf',
        'file_path' => 'pariwisata-survey-answers/export/bukti-a8.pdf',
        'mime_type' => 'application/pdf',
        'file_size' => 102400,
        'caption' => 'Dokumen pendukung A8',
    ]);

    $response = $this->actingAs($admin)->get(route('survey-assignments.pariwisata.export-survey', $assignment));

    $response->assertOk();
    $response->assertDownload('survey-pariwisata-assignment-'.$assignment->id.'-ds-export-01.xlsx');

    $filePath = $response->baseResponse->getFile()->getPathname();
    $spreadsheet = IOFactory::load($filePath);
    $summarySheet = $spreadsheet->getSheetByName('Ringkasan');
    $answerSheet = $spreadsheet->getSheetByName('Jawaban Pariwisata');
    $documentSheet = $spreadsheet->getSheetByName('Dokumen');

    expect($spreadsheet->getSheetNames())->toBe(['Ringkasan', 'Jawaban Pariwisata', 'Dokumen'])
        ->and($summarySheet?->getCell('B2')->getValue())->toBe('ASG-EXP-PAR-001')
        ->and($summarySheet?->getCell('B5')->getValue())->toBe('Template Pariwisata Export Assignment')
        ->and($summarySheet?->getCell('B8')->getValue())->toBe(1)
        ->and($summarySheet?->getCell('B12')->getValue())->toBe(4)
        ->and($summarySheet?->getCell('B14')->getValue())->toBe(100.0)
        ->and($answerSheet?->getCell('A2')->getValue())->toBe($answer->id)
        ->and($answerSheet?->getCell('E2')->getValue())->toBe(4)
        ->and($answerSheet?->getCell('F2')->getValue())->toBe('Catatan ekspor pariwisata')
        ->and($answerSheet?->getCell('I2')->getValue())->toBe('A.8.a')
        ->and($answerSheet?->getCell('O2')->getValue())->toBe('Indikator A8')
        ->and($answerSheet?->getCell('R2')->getValue())->toBe('Lengkap')
        ->and($answerSheet?->getCell('AA2')->getValue())->toBe($admin->name)
        ->and($answerSheet?->getCell('AC2')->getValue())->toBe(1)
        ->and($documentSheet?->getCell('B2')->getValue())->toBe($answer->id)
        ->and($documentSheet?->getCell('E2')->getValue())->toBe('bukti-a8.pdf')
        ->and($documentSheet?->getCell('G2')->getValue())->toContain('pariwisata-survey-answers/export/bukti-a8.pdf');
});
