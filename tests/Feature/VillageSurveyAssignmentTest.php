<?php

use App\Exports\UmkmSurveyExport;
use App\Models\AnnualTurnover;
use App\Models\AnnualWorkerStat;
use App\Models\AnnualWorkerTrainingStat;
use App\Models\PariwisataSurveyAnswer;
use App\Models\PariwisataSurveyAnswerDocument;
use App\Models\PariwisataSurveyQuestion;
use App\Models\PariwisataSuveyOption;
use App\Models\PariwisataVillage;
use App\Models\SurveyAnswer;
use App\Models\SurveyAnswerDocument;
use App\Models\SurveyAnswerHistory;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyTemplate;
use App\Models\TourismVillage;
use App\Models\UmkmSurveyAnswer;
use App\Models\UmkmSurveyQuestion;
use App\Models\User;
use App\Models\VillageActiveGroupAnnual;
use App\Models\VillageAnnualPopulationStat;
use App\Models\VillageSurveyAssignment;
use App\Models\VillageSurveyAssignmentLog;
use App\Models\VillageUmkm;
use App\Models\VillageUmkmCategory;
use App\Models\VillageUmkmDocument;
use App\Models\VillageVulnerableGroupAnnual;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\IOFactory;

uses(RefreshDatabase::class);

test('authenticated users can view survey assignments from database', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Survey Utama',
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'name' => 'Desa Assignment Testing',
        'created_by' => $user->id,
    ]);

    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
        'status' => 'assigned',
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/index')
            ->where('assignments.data.0.id', $assignment->id)
            ->where('assignments.data.0.village_name', $village->name)
            ->where('assignments.data.0.template_title', $template->title)
        );
});

test('authenticated users can create survey assignments', function () {
    $user = User::factory()->create();
    $submitter = User::factory()->create();
    $reviewer = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);

    $payload = [
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'status' => 'submitted',
        'assigned_by' => $user->id,
        'submitted_by' => $submitter->id,
        'reviewed_by' => $reviewer->id,
        'assigned_at' => '2026-05-28 09:00:00',
        'started_at' => '2026-05-28 10:00:00',
        'last_saved_at' => '2026-05-28 11:00:00',
        'submitted_at' => '2026-05-28 12:00:00',
        'reviewed_at' => '2026-05-28 13:00:00',
    ];

    $this->actingAs($user)
        ->post(route('survey-assignments.store'), $payload)
        ->assertRedirect();

    $this->assertDatabaseHas('village_survey_assignments', [
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'status' => 'submitted',
        'assigned_by' => $user->id,
        'submitted_by' => $submitter->id,
        'reviewed_by' => $reviewer->id,
    ]);
});

test('survey assignment village must be unique', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);

    VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.store'), [
            'village_id' => $village->id,
            'survey_template_id' => $template->id,
            'status' => 'assigned',
            'assigned_by' => $user->id,
        ])
        ->assertInvalid(['village_id']);
});

test('authenticated users can take survey with template questions grouped by aspect', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Assessment Desa',
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'name' => 'Desa Survey Testing',
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
        'status' => 'in_progress',
    ]);

    $amenitasQuestion = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-001',
        'question_text' => 'Bagaimana kondisi fasilitas umum?',
        'document_hint' => 'Unggah foto toilet dan parkir.',
        'sort_order' => 1,
    ]);
    SurveyQuestionOption::query()->create([
        'survey_question_id' => $amenitasQuestion->id,
        'score' => 1,
        'label' => 'Kurang tersedia',
        'sort_order' => 1,
    ]);
    SurveyQuestionOption::query()->create([
        'survey_question_id' => $amenitasQuestion->id,
        'score' => 2,
        'label' => 'Tersedia sebagian',
        'sort_order' => 2,
    ]);

    SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Atraksi',
        'code' => 'AT-001',
        'question_text' => 'Bagaimana kualitas atraksi utama?',
        'document_hint' => null,
        'sort_order' => 2,
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.take-survey', $assignment))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey/take-survey')
            ->where('assignment.id', $assignment->id)
            ->where('assignment.village.name', $village->name)
            ->where('template.id', $template->id)
            ->where('template.title', 'Template Assessment Desa')
            ->where('summary.total_aspects', 2)
            ->where('summary.total_questions', 2)
            ->where('summary.total_options', 2)
            ->where('aspects.0.name', 'Amenitas')
            ->where('aspects.0.questions.0.code', 'AM-001')
            ->where('aspects.0.questions.0.options.0.label', 'Kurang tersedia')
            ->where('aspects.1.name', 'Atraksi')
        );
});

test('authenticated users can view survey assignment detail from database', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Detail Desa',
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'name' => 'Desa Detail Testing',
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
        'status' => 'in_progress',
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-001',
        'question_text' => 'Bagaimana kondisi fasilitas umum?',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'Baik dan terdokumentasi',
        'sort_order' => 4,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.take-survey.store', $assignment), [
            'answers' => [
                [
                    'question_id' => $question->id,
                    'survey_question_option_id' => $option->id,
                    'notes' => 'Catatan detail desa',
                    'documents' => [
                        UploadedFile::fake()->create('lampiran.pdf', 256, 'application/pdf'),
                    ],
                ],
            ],
        ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.show', $assignment))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/show')
            ->where('assignment.id', $assignment->id)
            ->where('assignment.village.name', $village->name)
            ->where('assignment.template.title', $template->title)
            ->where('summary.total_questions', 1)
            ->where('summary.answered_questions', 1)
            ->where('summary.total_documents', 1)
            ->where('aspects.0.name', 'Amenitas')
            ->where('aspects.0.questions.0.answer.score_label', 'Baik dan terdokumentasi')
            ->where('aspects.0.questions.0.answer.notes', 'Catatan detail desa')
            ->where('aspects.0.questions.0.answer.documents.0.file_name', 'lampiran.pdf')
        );
});

test('survey assignment detail merges assignment logs and answer histories', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Aktivitas Desa',
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'name' => 'Desa Aktivitas Testing',
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
        'status' => 'in_progress',
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-ACT-001',
        'question_text' => 'Bagaimana aktivitas tercatat?',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'Baik',
        'sort_order' => 1,
    ]);
    VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'name' => 'UMKM Count',
    ]);
    PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'ISTC Count',
        'is_active' => true,
    ]);
    $answer = SurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'survey_question_id' => $question->id,
        'survey_question_option_id' => $option->id,
        'score' => 4,
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
        'answered_at' => now(),
        'last_edited_at' => now(),
    ]);

    VillageSurveyAssignmentLog::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'actor_id' => $user->id,
        'action' => 'assignment_updated',
        'description' => 'Survey assignment diperbarui.',
    ]);
    SurveyAnswerHistory::query()->create([
        'survey_answer_id' => $answer->id,
        'village_survey_assignment_id' => $assignment->id,
        'survey_question_id' => $question->id,
        'actor_id' => $user->id,
        'action' => 'answer_updated',
        'old_score' => 2,
        'new_score' => 4,
        'old_option_label' => 'Kurang',
        'new_option_label' => 'Baik',
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.show', $assignment))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/show')
            ->has('activities', 2)
            ->where('activities.0.actor', $user->name)
        );
});

test('survey assignment show defaults invalid tab to desa payload', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Detail Desa',
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'name' => 'Desa Tab Testing',
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
        'status' => 'in_progress',
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-001',
        'question_text' => 'Pertanyaan desa',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'Baik',
        'sort_order' => 1,
    ]);
    VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'name' => 'UMKM Count',
    ]);
    PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'ISTC Count',
        'is_active' => true,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.take-survey.store', $assignment), [
            'answers' => [[
                'question_id' => $question->id,
                'survey_question_option_id' => $option->id,
            ]],
        ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.show', $assignment).'?tab=invalid')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/show')
            ->where('active_tab', 'desa')
            ->where('summary.total_questions', 1)
            ->where('tab_counts.kemenpar', 1)
            ->where('tab_counts.umkm', 1)
            ->where('tab_counts.istc', 1)
            ->where('umkms', [])
            ->where('pariwisata', [])
            ->where('pariwisata_survey_groups', [])
        );
});

test('survey assignment show umkm tab only sends umkm payload', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create(['created_by' => $user->id]);
    $umkmTemplate = SurveyTemplate::factory()->create(['created_by' => $user->id, 'type' => 'umkm']);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'question_text' => 'Pertanyaan Kemenpar Count',
        'sort_order' => 1,
    ]);
    $umkm = VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'data_collector_id' => $user->id,
        'business_owner_name' => 'Pemilik UMKM',
        'name' => 'UMKM Tab',
        'product_category' => 'Kuliner',
    ]);
    PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'ISTC Count',
        'is_active' => true,
    ]);
    $question = UmkmSurveyQuestion::query()->create([
        'survey_template_id' => $umkmTemplate->id,
        'criteria_code' => 'A',
        'criteria_name' => 'Kriteria A',
        'criteria_weight_percent' => 100,
        'question_number' => 1,
        'question_text' => 'Pertanyaan UMKM',
        'question_weight_percent' => 100,
        'max_score' => 100,
    ]);
    UmkmSurveyAnswer::query()->create([
        'umkm_id' => $umkm->id,
        'umkm_assessment_question_id' => $question->id,
        'answered_by' => $user->id,
        'score' => 80,
        'criteria_code_snapshot' => 'A',
        'criteria_name_snapshot' => 'Kriteria A',
        'criteria_weight_percent_snapshot' => 100,
        'question_text_snapshot' => 'Pertanyaan UMKM',
        'question_weight_percent_snapshot' => 100,
        'max_score_snapshot' => 100,
        'weighted_score' => 80,
        'last_edited_at' => now(),
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.show', $assignment).'?tab=umkm')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/show')
            ->where('active_tab', 'umkm')
            ->where('summary.total_questions', 0)
            ->where('tab_counts.kemenpar', 1)
            ->where('tab_counts.umkm', 1)
            ->where('tab_counts.istc', 1)
            ->where('aspects', [])
            ->where('umkms.0.name', 'UMKM Tab')
            ->where('pariwisata', [])
            ->where('pariwisata_survey_groups', [])
        );
});

test('authenticated users can export umkm detail as excel', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create(['created_by' => $user->id, 'type' => 'umkm']);
    $village = TourismVillage::factory()->create(['created_by' => $user->id, 'name' => 'Desa Export UMKM']);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $umkm = VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'data_collector_id' => $user->id,
        'business_owner_name' => 'Pemilik Export',
        'name' => 'UMKM Export',
        'legal_business_name' => 'CV Export',
        'product_category' => 'Kuliner',
        'brand_name' => 'Brand Export',
        'annual_revenue' => 12000000,
        'instagram_url' => 'https://instagram.test/umkm-export',
        'bank_name' => 'BCA',
        'has_qris' => true,
        'has_exported' => true,
        'export_destination_countries' => 'Malaysia',
    ]);

    VillageUmkmCategory::query()->create(['village_umkm_id' => $umkm->id, 'category' => 'Makanan']);
    VillageUmkmDocument::query()->create([
        'village_umkm_id' => $umkm->id,
        'uploaded_by' => $user->id,
        'document_name' => 'NIB',
        'file_path' => 'umkm/nib.pdf',
        'mime_type' => 'application/pdf',
        'file_size' => 2048,
    ]);
    AnnualTurnover::query()->create([
        'entity_type' => 'umkm',
        'umkm_id' => $umkm->id,
        'entity_key' => 'umkm:'.$umkm->id,
        'year' => 2026,
        'value' => 12000000,
        'created_by' => $user->id,
    ]);
    AnnualWorkerStat::query()->create([
        'entity_type' => 'umkm',
        'umkm_id' => $umkm->id,
        'entity_key' => 'umkm:'.$umkm->id,
        'year' => 2026,
        'dimension' => 'gender',
        'category_value' => 'Perempuan',
        'total_people' => 4,
        'created_by' => $user->id,
    ]);
    AnnualWorkerTrainingStat::query()->create([
        'entity_type' => 'umkm',
        'umkm_id' => $umkm->id,
        'entity_key' => 'umkm:'.$umkm->id,
        'year' => 2026,
        'training_name' => 'Digital Marketing',
        'total_people' => 2,
        'created_by' => $user->id,
    ]);
    $question = UmkmSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'criteria_code' => 'K1',
        'criteria_name' => 'Kelembagaan',
        'criteria_weight_percent' => 20,
        'question_number' => 1,
        'question_text' => 'Apakah UMKM memiliki legalitas?',
        'question_weight_percent' => 100,
        'max_score' => 100,
        'sort_order' => 1,
        'is_active' => true,
    ]);
    UmkmSurveyAnswer::query()->create([
        'umkm_id' => $umkm->id,
        'umkm_assessment_question_id' => $question->id,
        'answered_by' => $user->id,
        'score' => 80,
        'criteria_code_snapshot' => 'K1',
        'criteria_name_snapshot' => 'Kelembagaan',
        'criteria_weight_percent_snapshot' => 20,
        'question_text_snapshot' => 'Apakah UMKM memiliki legalitas?',
        'question_weight_percent_snapshot' => 100,
        'max_score_snapshot' => 100,
        'normalized_score' => 80,
        'weighted_score' => 16,
        'answered_at' => now(),
        'last_edited_at' => now(),
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.umkm.export', [$assignment, $umkm]))
        ->assertOk()
        ->assertHeader('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
});

test('umkm export includes survey answers when assignment uses village template', function () {
    $user = User::factory()->create();
    $villageTemplate = SurveyTemplate::factory()->create(['created_by' => $user->id, 'type' => 'village']);
    $umkmTemplate = SurveyTemplate::factory()->create(['created_by' => $user->id, 'type' => 'umkm']);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $villageTemplate->id,
        'assigned_by' => $user->id,
    ]);
    $umkm = VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'name' => 'UMKM Template Terpisah',
    ]);
    $question = UmkmSurveyQuestion::query()->create([
        'survey_template_id' => $umkmTemplate->id,
        'criteria_code' => 'K2',
        'criteria_name' => 'Pemasaran',
        'criteria_weight_percent' => 30,
        'question_number' => 7,
        'question_text' => 'Apakah UMKM menjual produk secara online?',
        'question_weight_percent' => 50,
        'max_score' => 100,
        'sort_order' => 1,
        'is_active' => true,
    ]);
    UmkmSurveyAnswer::query()->create([
        'umkm_id' => $umkm->id,
        'umkm_assessment_question_id' => $question->id,
        'answered_by' => $user->id,
        'score' => 90,
        'criteria_code_snapshot' => 'K2',
        'criteria_name_snapshot' => 'Pemasaran',
        'criteria_weight_percent_snapshot' => 30,
        'question_text_snapshot' => 'Apakah UMKM menjual produk secara online?',
        'question_weight_percent_snapshot' => 50,
        'max_score_snapshot' => 100,
        'normalized_score' => 90,
        'weighted_score' => 45,
        'answered_at' => now(),
        'last_edited_at' => now(),
    ]);

    $file = app(UmkmSurveyExport::class)->export($assignment, $umkm);

    try {
        $spreadsheet = IOFactory::load($file['path']);
        $sheet = $spreadsheet->getSheetByName('Survey UMKM');

        expect($sheet)->not->toBeNull()
            ->and($sheet->getCell('B2')->getValue())->toBe('K2')
            ->and($sheet->getCell('F2')->getValue())->toBe('Apakah UMKM menjual produk secara online?')
            ->and((float) $sheet->getCell('J2')->getValue())->toBe(90.0)
            ->and((float) $sheet->getCell('L2')->getValue())->toBe(45.0);

        $spreadsheet->disconnectWorksheets();
    } finally {
        if (is_file($file['path'])) {
            unlink($file['path']);
        }
    }
});

test('umkm export returns not found when umkm is outside assignment village', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create(['created_by' => $user->id, 'type' => 'umkm']);
    $assignmentVillage = TourismVillage::factory()->create(['created_by' => $user->id]);
    $otherVillage = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $assignmentVillage->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $umkm = VillageUmkm::query()->create([
        'village_id' => $otherVillage->id,
        'created_by' => $user->id,
        'name' => 'UMKM Desa Lain',
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.umkm.export', [$assignment, $umkm]))
        ->assertNotFound();
});

test('survey assignment show pariwisata tab only sends pariwisata payload', function () {
    $user = User::factory()->create();
    $assignmentTemplate = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
    ]);
    $pariwisataTemplate = SurveyTemplate::factory()->create([
        'title' => 'Matrix Sertifikasi Desa Wisata Berkelanjutan - Pariwisata',
        'type' => 'pariwisata',
        'created_by' => $user->id,
        'status' => 'published',
        'published_at' => now(),
    ]);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $assignmentTemplate->id,
        'assigned_by' => $user->id,
    ]);
    SurveyQuestion::query()->create([
        'survey_template_id' => $assignmentTemplate->id,
        'aspect' => 'Amenitas',
        'question_text' => 'Pertanyaan Kemenpar Count',
        'sort_order' => 1,
    ]);
    VillageUmkm::query()->create([
        'village_id' => $village->id,
        'created_by' => $user->id,
        'name' => 'UMKM Count',
    ]);
    PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'ISTC Tab',
        'is_active' => true,
    ]);
    $question = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $pariwisataTemplate->id,
        'category_code' => 'A',
        'category_name' => 'Amenitas',
        'criteria_code' => 'A.1',
        'criteria_name' => 'Kriteria A1',
        'indicator_code' => 'A.1.1',
        'indicator_name' => 'Indikator A1',
        'input_type' => 'single_choice',
        'sort_order' => 1,
        'is_active' => true,
    ]);
    $option = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $question->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Sangat Baik',
        'description' => 'Sangat Baik',
        'sort_order' => 1,
    ]);
    PariwisataSurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'pariwisata_survey_question_id' => $question->id,
        'pariwisata_suvey_option_id' => $option->id,
        'score' => 4,
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
        'last_edited_at' => now(),
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.show', $assignment).'?tab=pariwisata')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/show')
            ->where('active_tab', 'pariwisata')
            ->where('summary.total_questions', 0)
            ->where('tab_counts.kemenpar', 1)
            ->where('tab_counts.umkm', 1)
            ->where('tab_counts.istc', 1)
            ->where('aspects', [])
            ->where('umkms', [])
            ->where('pariwisata.0.name', 'ISTC Tab')
            ->where('pariwisata_survey_summary.total_score', 4)
            ->where('pariwisata_survey_groups.0.category_name', 'Amenitas')
        );
});

test('survey assignment show includes pariwisata survey analytics summary', function () {
    $user = User::factory()->create();
    $assignmentTemplate = SurveyTemplate::factory()->create([
        'title' => 'Template Detail Desa',
        'created_by' => $user->id,
    ]);
    $pariwisataTemplate = SurveyTemplate::factory()->create([
        'title' => 'Matrix Sertifikasi Desa Wisata Berkelanjutan - Pariwisata',
        'type' => 'pariwisata',
        'created_by' => $user->id,
        'status' => 'published',
        'published_at' => now(),
    ]);
    $village = TourismVillage::factory()->create([
        'name' => 'Desa Pariwisata Testing',
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $assignmentTemplate->id,
        'assigned_by' => $user->id,
        'status' => 'in_progress',
    ]);

    PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'ISTC Utama',
        'is_active' => true,
    ]);

    $amenitasQuestion = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $pariwisataTemplate->id,
        'category_code' => 'A',
        'category_name' => 'Amenitas',
        'criteria_code' => 'A.1',
        'criteria_name' => 'Kriteria A1',
        'indicator_code' => 'A.1.1',
        'indicator_name' => 'Indikator Amenitas',
        'input_type' => 'single_choice',
        'sort_order' => 1,
        'is_active' => true,
    ]);
    PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $amenitasQuestion->id,
        'score' => 2,
        'level' => 'B',
        'label' => 'Baik',
        'description' => 'Baik',
        'sort_order' => 1,
    ]);
    $amenitasOption = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $amenitasQuestion->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Sangat Baik',
        'description' => 'Sangat Baik',
        'sort_order' => 2,
    ]);

    $aksesibilitasQuestion = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $pariwisataTemplate->id,
        'category_code' => 'B',
        'category_name' => 'Aksesibilitas',
        'criteria_code' => 'B.1',
        'criteria_name' => 'Kriteria B1',
        'indicator_code' => 'B.1.1',
        'indicator_name' => 'Indikator Aksesibilitas',
        'input_type' => 'single_choice',
        'sort_order' => 2,
        'is_active' => true,
    ]);
    $aksesibilitasOption = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $aksesibilitasQuestion->id,
        'score' => 2,
        'level' => 'C',
        'label' => 'Cukup',
        'description' => 'Cukup',
        'sort_order' => 1,
    ]);
    PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $aksesibilitasQuestion->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Sangat Baik',
        'description' => 'Sangat Baik',
        'sort_order' => 2,
    ]);

    PariwisataSurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'pariwisata_survey_question_id' => $amenitasQuestion->id,
        'pariwisata_suvey_option_id' => $amenitasOption->id,
        'score' => 4,
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
        'last_edited_at' => now(),
    ]);
    PariwisataSurveyAnswer::query()->create([
        'village_survey_assignment_id' => $assignment->id,
        'pariwisata_survey_question_id' => $aksesibilitasQuestion->id,
        'pariwisata_suvey_option_id' => $aksesibilitasOption->id,
        'score' => 2,
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
        'last_edited_at' => now(),
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.show', $assignment).'?tab=pariwisata')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/show')
            ->where('active_tab', 'pariwisata')
            ->where('pariwisata_survey_summary.total_score', 6)
            ->where('pariwisata_survey_summary.max_score', 8)
            ->where('pariwisata_survey_summary.final_score', 75)
            ->where('pariwisata_survey_summary.highest_aspect.name', 'Amenitas')
            ->where('pariwisata_survey_summary.lowest_aspect.name', 'Aksesibilitas')
            ->where('pariwisata_survey_summary.aspects.0.name', 'Amenitas')
            ->where('pariwisata_survey_summary.aspects.0.score_percent', 100)
            ->where('pariwisata_survey_summary.aspects.1.name', 'Aksesibilitas')
            ->where('pariwisata_survey_summary.aspects.1.score_percent', 50)
            ->where('pariwisata_survey_summary.distribution.0.score', 1)
            ->where('pariwisata_survey_summary.distribution.0.count', 0)
            ->where('pariwisata_survey_summary.distribution.1.score', 2)
            ->where('pariwisata_survey_summary.distribution.1.count', 1)
            ->where('pariwisata_survey_summary.distribution.3.score', 4)
            ->where('pariwisata_survey_summary.distribution.3.count', 1)
            ->where('pariwisata_survey_groups.0.category_name', 'Amenitas')
            ->where('pariwisata_survey_groups.0.questions.0.criteria_code', 'A.1')
            ->where('pariwisata_survey_groups.0.questions.0.answer.score_label', 'Sangat Baik')
            ->where('pariwisata_survey_groups.0.questions.0.answer.last_edited_by.name', $user->name)
            ->where('pariwisata_survey_groups.0.questions.0.answer.last_edited_at', now()->timezone(config('app.timezone'))->format('d M Y H:i'))
            ->where('pariwisata_survey_groups.1.category_name', 'Aksesibilitas')
        );
});

test('authenticated users can save survey notes on village draft', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create(['created_by' => $user->id]);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'question_text' => 'Ada catatan?',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'Ya',
        'sort_order' => 1,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.take-survey.store', $assignment), [
            'answers' => [[
                'question_id' => $question->id,
                'survey_question_option_id' => $option->id,
                'notes' => 'Catatan desa',
            ]],
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('survey_answers', [
        'village_survey_assignment_id' => $assignment->id,
        'survey_question_id' => $question->id,
        'survey_question_option_id' => $option->id,
        'notes' => 'Catatan desa',
    ]);
});

test('updating only notes on village survey does not create history', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create(['created_by' => $user->id]);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'question_text' => 'Update notes?',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 3,
        'label' => 'Cukup',
        'sort_order' => 1,
    ]);

    $this->actingAs($user)->post(route('survey-assignments.take-survey.store', $assignment), [
        'answers' => [[
            'question_id' => $question->id,
            'survey_question_option_id' => $option->id,
            'notes' => 'Catatan awal',
        ]],
    ]);

    $this->actingAs($user)->post(route('survey-assignments.take-survey.store', $assignment), [
        'answers' => [[
            'question_id' => $question->id,
            'survey_question_option_id' => $option->id,
            'notes' => 'Catatan revisi',
        ]],
    ]);

    $this->assertDatabaseHas('survey_answers', [
        'village_survey_assignment_id' => $assignment->id,
        'survey_question_id' => $question->id,
        'notes' => 'Catatan revisi',
    ]);
    $this->assertDatabaseCount('survey_answer_histories', 0);
});

test('updating village survey option creates history', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create(['created_by' => $user->id]);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'question_text' => 'Ganti jawaban?',
        'sort_order' => 1,
    ]);
    $firstOption = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 2,
        'label' => 'Kurang',
        'sort_order' => 1,
    ]);
    $secondOption = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'Baik',
        'sort_order' => 2,
    ]);

    $this->actingAs($user)->post(route('survey-assignments.take-survey.store', $assignment), [
        'answers' => [[
            'question_id' => $question->id,
            'survey_question_option_id' => $firstOption->id,
            'notes' => 'Catatan awal',
        ]],
    ]);

    $this->actingAs($user)->post(route('survey-assignments.take-survey.store', $assignment), [
        'answers' => [[
            'question_id' => $question->id,
            'survey_question_option_id' => $secondOption->id,
            'notes' => 'Catatan revisi',
        ]],
    ]);

    $answer = SurveyAnswer::query()->firstOrFail();
    $history = SurveyAnswerHistory::query()->firstOrFail();

    expect($history->survey_answer_id)->toBe($answer->id)
        ->and($history->old_survey_question_option_id)->toBe($firstOption->id)
        ->and($history->new_survey_question_option_id)->toBe($secondOption->id)
        ->and((float) $history->old_score)->toBe(2.0)
        ->and((float) $history->new_score)->toBe(4.0)
        ->and($history->old_option_label)->toBe('Kurang')
        ->and($history->new_option_label)->toBe('Baik');
});

test('survey assignment draft rejects array shaped scalar ids', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create(['created_by' => $user->id]);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'question_text' => 'Invalid scalar ids?',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'Ya',
        'sort_order' => 1,
    ]);

    $this->actingAs($user)
        ->from(route('survey-assignments.take-survey', $assignment))
        ->post(route('survey-assignments.take-survey.store', $assignment), [
            'answers' => [[
                'question_id' => [$question->id],
                'survey_question_option_id' => [$option->id],
                'notes' => 'Broken payload',
            ]],
        ])
        ->assertRedirect(route('survey-assignments.take-survey', $assignment))
        ->assertSessionHasErrors([
            'answers.0.question_id',
            'answers.0.survey_question_option_id',
        ]);
});

test('authenticated users can delete survey answer documents', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'question_text' => 'Bagaimana kondisi fasilitas umum?',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'Baik',
        'sort_order' => 4,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.take-survey.store', $assignment), [
            'answers' => [
                [
                    'question_id' => $question->id,
                    'survey_question_option_id' => $option->id,
                    'documents' => [
                        UploadedFile::fake()->image('toilet.jpg'),
                    ],
                ],
            ],
        ]);

    $document = SurveyAnswerDocument::query()->firstOrFail();
    Storage::disk('public')->assertExists($document->file_path);

    $this->actingAs($user)
        ->delete(route('survey-assignments.take-survey.documents.destroy', [$assignment, $document]))
        ->assertRedirect();

    Storage::disk('public')->assertMissing($document->file_path);
    $this->assertSoftDeleted('survey_answer_documents', [
        'id' => $document->id,
    ]);
});

test('authenticated users can save pariwisata survey answers scoped by assignment', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Matrix Sertifikasi Desa Wisata Berkelanjutan - Pariwisata',
        'type' => 'pariwisata',
        'created_by' => $user->id,
        'status' => 'published',
        'published_at' => now(),
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-PAR-001',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
        'status' => 'assigned',
    ]);
    PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'Wisata A',
        'is_active' => true,
    ]);

    $question = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'category_code' => 'A',
        'category_name' => 'Kategori A',
        'sub_category_code' => 'A1',
        'sub_category_name' => 'Sub A1',
        'criteria_code' => 'A.1',
        'criteria_name' => 'Kriteria A1',
        'indicator_code' => 'A.1.1',
        'indicator_name' => 'Indikator A1',
        'input_type' => 'single_choice',
        'sort_order' => 1,
        'is_active' => true,
    ]);
    $option = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $question->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Sangat Baik',
        'description' => 'Deskripsi jawaban',
        'sort_order' => 1,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.pariwisata.take-survey.store', $assignment), [
            'answers' => [
                [
                    'question_id' => $question->id,
                    'pariwisata_suvey_option_id' => $option->id,
                    'notes' => 'Catatan assignment-level',
                    'documents' => [
                        UploadedFile::fake()->image('bukti.jpg'),
                    ],
                ],
            ],
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('pariwisata_survey_answers', [
        'village_survey_assignment_id' => $assignment->id,
        'pariwisata_survey_question_id' => $question->id,
        'pariwisata_suvey_option_id' => $option->id,
        'score' => 4,
        'notes' => 'Catatan assignment-level',
        'answered_by' => $user->id,
        'last_edited_by' => $user->id,
    ]);
    $this->assertDatabaseCount('pariwisata_survey_answer_documents', 1);

    PariwisataSurveyAnswerDocument::query()
        ->pluck('file_path')
        ->each(fn (string $path) => Storage::disk('public')->assertExists($path));

    expect($assignment->fresh()->status)->toBe('in_progress');
});

test('authenticated users can delete pariwisata survey documents scoped by assignment', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Matrix Sertifikasi Desa Wisata Berkelanjutan - Pariwisata',
        'type' => 'pariwisata',
        'created_by' => $user->id,
        'status' => 'published',
        'published_at' => now(),
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-PAR-002',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);

    $question = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'indicator_code' => 'A.1.1',
        'indicator_name' => 'Indikator A1',
        'input_type' => 'single_choice',
        'sort_order' => 1,
        'is_active' => true,
    ]);
    $option = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $question->id,
        'score' => 3,
        'level' => 'B',
        'label' => 'Baik',
        'description' => 'Deskripsi',
        'sort_order' => 1,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.pariwisata.take-survey.store', $assignment), [
            'answers' => [
                [
                    'question_id' => $question->id,
                    'pariwisata_suvey_option_id' => $option->id,
                    'documents' => [
                        UploadedFile::fake()->create('bukti.pdf', 128, 'application/pdf'),
                    ],
                ],
            ],
        ]);

    $document = PariwisataSurveyAnswerDocument::query()->firstOrFail();
    Storage::disk('public')->assertExists($document->file_path);

    $this->actingAs($user)
        ->delete(route('survey-assignments.pariwisata.take-survey.documents.destroy', [$assignment, $document]))
        ->assertRedirect();

    Storage::disk('public')->assertMissing($document->file_path);
    $this->assertSoftDeleted('pariwisata_survey_answer_documents', [
        'id' => $document->id,
    ]);
});

test('show pariwisata page no longer exposes survey payload', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'created_by' => $user->id,
        'status' => 'published',
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-PAR-003',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $pariwisata = PariwisataVillage::query()->create([
        'village_id' => $village->id,
        'name' => 'Wisata Detail',
        'is_active' => true,
    ]);

    $this->actingAs($user)
        ->get(route('survey-assignments.pariwisata.show', [$assignment, $pariwisata]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('survey-assignment/show-pariwisata')
            ->where('assignment.id', $assignment->id)
            ->where('pariwisata.id', $pariwisata->id)
            ->missing('survey_template')
            ->missing('survey_summary')
            ->missing('survey_groups')
        );
});

test('survey assignment draft accepts documents up to 50 mb per file', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Batas Upload Desa',
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-LIMIT-001',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-050',
        'question_text' => 'Apakah dokumen 50 MB diterima?',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'Ya',
        'sort_order' => 1,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.take-survey.store', $assignment), [
            'answers' => [
                [
                    'question_id' => $question->id,
                    'survey_question_option_id' => $option->id,
                    'documents' => [
                        UploadedFile::fake()->create('batas-50mb.pdf', 51200, 'application/pdf'),
                    ],
                ],
            ],
        ])
        ->assertRedirect()
        ->assertSessionHasNoErrors();

    $this->assertDatabaseCount('survey_answer_documents', 1);
});

test('survey assignment draft rejects documents above 50 mb per file', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Template Batas Upload Desa',
        'created_by' => $user->id,
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-LIMIT-002',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $question = SurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'aspect' => 'Amenitas',
        'code' => 'AM-051',
        'question_text' => 'Apakah dokumen > 50 MB ditolak?',
        'sort_order' => 1,
    ]);
    $option = SurveyQuestionOption::query()->create([
        'survey_question_id' => $question->id,
        'score' => 4,
        'label' => 'Ya',
        'sort_order' => 1,
    ]);

    $this->actingAs($user)
        ->from(route('survey-assignments.take-survey', $assignment))
        ->post(route('survey-assignments.take-survey.store', $assignment), [
            'answers' => [
                [
                    'question_id' => $question->id,
                    'survey_question_option_id' => $option->id,
                    'documents' => [
                        UploadedFile::fake()->create('lebih-50mb.pdf', 51201, 'application/pdf'),
                    ],
                ],
            ],
        ])
        ->assertRedirect(route('survey-assignments.take-survey', $assignment))
        ->assertSessionHasErrors(['answers.0.documents.0']);

    $this->assertDatabaseCount('survey_answer_documents', 0);
});

test('pariwisata survey draft accepts documents up to 50 mb per file', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Matrix Sertifikasi Desa Wisata Berkelanjutan - Pariwisata',
        'type' => 'pariwisata',
        'created_by' => $user->id,
        'status' => 'published',
        'published_at' => now(),
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-PAR-LIMIT-001',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $question = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'indicator_code' => 'A.5.0',
        'indicator_name' => 'Batas upload pariwisata 50 MB',
        'input_type' => 'single_choice',
        'sort_order' => 1,
        'is_active' => true,
    ]);
    $option = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $question->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Ya',
        'description' => 'Valid',
        'sort_order' => 1,
    ]);

    $this->actingAs($user)
        ->post(route('survey-assignments.pariwisata.take-survey.store', $assignment), [
            'answers' => [
                [
                    'question_id' => $question->id,
                    'pariwisata_suvey_option_id' => $option->id,
                    'documents' => [
                        UploadedFile::fake()->create('batas-50mb.pdf', 51200, 'application/pdf'),
                    ],
                ],
            ],
        ])
        ->assertRedirect()
        ->assertSessionHasNoErrors();

    $this->assertDatabaseCount('pariwisata_survey_answer_documents', 1);
});

test('pariwisata survey draft rejects documents above 50 mb per file', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create([
        'title' => 'Matrix Sertifikasi Desa Wisata Berkelanjutan - Pariwisata',
        'type' => 'pariwisata',
        'created_by' => $user->id,
        'status' => 'published',
        'published_at' => now(),
    ]);
    $village = TourismVillage::factory()->create([
        'created_by' => $user->id,
    ]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'code' => 'ASG-PAR-LIMIT-002',
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);
    $question = PariwisataSurveyQuestion::query()->create([
        'survey_template_id' => $template->id,
        'indicator_code' => 'A.5.1',
        'indicator_name' => 'Batas upload pariwisata > 50 MB',
        'input_type' => 'single_choice',
        'sort_order' => 1,
        'is_active' => true,
    ]);
    $option = PariwisataSuveyOption::query()->create([
        'pariwisata_survey_question_id' => $question->id,
        'score' => 4,
        'level' => 'A',
        'label' => 'Ya',
        'description' => 'Invalid',
        'sort_order' => 1,
    ]);

    $this->actingAs($user)
        ->from(route('survey-assignments.pariwisata.take-survey', $assignment))
        ->post(route('survey-assignments.pariwisata.take-survey.store', $assignment), [
            'answers' => [
                [
                    'question_id' => $question->id,
                    'pariwisata_suvey_option_id' => $option->id,
                    'documents' => [
                        UploadedFile::fake()->create('lebih-50mb.pdf', 51201, 'application/pdf'),
                    ],
                ],
            ],
        ])
        ->assertRedirect(route('survey-assignments.pariwisata.take-survey', $assignment))
        ->assertSessionHasErrors(['answers.0.documents.0']);

    $this->assertDatabaseCount('pariwisata_survey_answer_documents', 0);
});

test('village annual data allows same year for different categories only', function () {
    $user = User::factory()->create();
    $template = SurveyTemplate::factory()->create(['created_by' => $user->id]);
    $village = TourismVillage::factory()->create(['created_by' => $user->id]);
    $assignment = VillageSurveyAssignment::factory()->create([
        'village_id' => $village->id,
        'survey_template_id' => $template->id,
        'assigned_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->patch(route('survey-assignments.village-annual-data.update', $assignment), [
            'annual_population_stats' => [
                ['year' => 2026, 'category_value' => 'Laki-laki', 'total_people' => 10, 'notes' => null],
                ['year' => 2026, 'category_value' => 'Perempuan', 'total_people' => 12, 'notes' => null],
            ],
            'vulnerable_group_annuals' => [
                ['year' => 2026, 'vulnerable_category' => 'Lansia', 'total_people' => 3, 'notes' => null],
                ['year' => 2026, 'vulnerable_category' => 'Disabilitas', 'total_people' => 2, 'notes' => null],
            ],
            'active_group_annuals' => [
                ['year' => 2026, 'active_category' => 'Pokdarwis', 'value' => 4, 'notes' => null],
                ['year' => 2026, 'active_category' => 'Karang Taruna', 'value' => 5, 'notes' => null],
            ],
        ])
        ->assertRedirect()
        ->assertSessionHasNoErrors();

    expect(VillageAnnualPopulationStat::query()->where('village_id', $village->id)->count())->toBe(2);
    expect(VillageVulnerableGroupAnnual::query()->where('village_id', $village->id)->count())->toBe(2);
    expect(VillageActiveGroupAnnual::query()->where('village_id', $village->id)->count())->toBe(2);

    $duplicatePayload = [
        'annual_population_stats' => [],
        'vulnerable_group_annuals' => [],
        'active_group_annuals' => [],
    ];

    $this->actingAs($user)
        ->from(route('survey-assignments.show', $assignment))
        ->patch(route('survey-assignments.village-annual-data.update', $assignment), [
            ...$duplicatePayload,
            'annual_population_stats' => [
                ['year' => 2026, 'category_value' => 'Total', 'total_people' => 22, 'notes' => null],
                ['year' => 2026, 'category_value' => ' total ', 'total_people' => 22, 'notes' => null],
            ],
        ])
        ->assertRedirect(route('survey-assignments.show', $assignment))
        ->assertSessionHasErrors('annual_population_stats');

    $this->actingAs($user)
        ->from(route('survey-assignments.show', $assignment))
        ->patch(route('survey-assignments.village-annual-data.update', $assignment), [
            ...$duplicatePayload,
            'vulnerable_group_annuals' => [
                ['year' => 2026, 'vulnerable_category' => 'Lansia', 'total_people' => 3, 'notes' => null],
                ['year' => 2026, 'vulnerable_category' => ' lansia ', 'total_people' => 4, 'notes' => null],
            ],
        ])
        ->assertRedirect(route('survey-assignments.show', $assignment))
        ->assertSessionHasErrors('vulnerable_group_annuals');

    $this->actingAs($user)
        ->from(route('survey-assignments.show', $assignment))
        ->patch(route('survey-assignments.village-annual-data.update', $assignment), [
            ...$duplicatePayload,
            'active_group_annuals' => [
                ['year' => 2026, 'active_category' => 'Pokdarwis', 'value' => 4, 'notes' => null],
                ['year' => 2026, 'active_category' => ' pokdarwis ', 'value' => 5, 'notes' => null],
            ],
        ])
        ->assertRedirect(route('survey-assignments.show', $assignment))
        ->assertSessionHasErrors('active_group_annuals');
});
