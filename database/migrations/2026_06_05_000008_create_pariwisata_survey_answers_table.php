<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pariwisata_survey_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_survey_assignment_id');
            $table->foreignId('pariwisata_survey_question_id');
            $table->foreignId('pariwisata_suvey_option_id');
            $table->integer('score');
            $table->text('notes')->nullable();
            $table->string('category_code_snapshot')->nullable();
            $table->string('category_name_snapshot')->nullable();
            $table->string('sub_category_code_snapshot')->nullable();
            $table->string('sub_category_name_snapshot')->nullable();
            $table->string('criteria_code_snapshot')->nullable();
            $table->string('criteria_name_snapshot')->nullable();
            $table->text('criteria_description_snapshot')->nullable();
            $table->string('indicator_code_snapshot')->nullable();
            $table->string('indicator_name_snapshot')->nullable();
            $table->text('indicator_description_snapshot')->nullable();
            $table->text('supporting_evidence_snapshot')->nullable();
            $table->text('option_label_snapshot')->nullable();
            $table->text('option_description_snapshot')->nullable();
            $table->foreignId('answered_by')->constrained('users');
            $table->foreignId('last_edited_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('answered_at')->nullable();
            $table->timestamp('last_edited_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('village_survey_assignment_id', 'ps_answer_assignment_fk')
                ->references('id')
                ->on('village_survey_assignments')
                ->cascadeOnDelete();
            $table->foreign('pariwisata_survey_question_id', 'ps_answer_question_fk')
                ->references('id')
                ->on('pariwisata_survey_questions');
            $table->foreign('pariwisata_suvey_option_id', 'ps_answer_option_fk')
                ->references('id')
                ->on('pariwisata_suvey_options');
            $table->index('village_survey_assignment_id', 'ps_answer_pariwisata_idx');
            $table->index('pariwisata_survey_question_id', 'ps_answer_question_idx');
            $table->index('pariwisata_suvey_option_id', 'ps_answer_option_idx');
            $table->index('answered_by', 'pariwisata_survey_answers_answered_by_index');
            $table->unique(
                ['village_survey_assignment_id', 'pariwisata_survey_question_id'],
                'ps_answer_village_question_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pariwisata_survey_answers');
    }
};
