<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('survey_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_survey_assignment_id');
            $table->foreignId('survey_question_id');
            $table->foreignId('survey_question_option_id');
            $table->integer('score');
            $table->text('aspect_snapshot')->nullable();
            $table->text('question_text_snapshot')->nullable();
            $table->text('option_label_snapshot')->nullable();
            $table->foreignId('answered_by')->constrained('users');
            $table->foreignId('last_edited_by')->constrained('users');
            $table->timestamp('answered_at')->nullable();
            $table->timestamp('last_edited_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('village_survey_assignment_id', 'sa_assignment_fk')
                ->references('id')->on('village_survey_assignments')->cascadeOnDelete();
            $table->foreign('survey_question_id', 'sa_question_fk')
                ->references('id')->on('survey_questions');
            $table->foreign('survey_question_option_id', 'sa_option_fk')
                ->references('id')->on('survey_question_options');
            $table->unique(['village_survey_assignment_id', 'survey_question_id'], 'sa_assignment_question_unique');
            $table->index('answered_by', 'sa_answered_by_index');
            $table->index('last_edited_by', 'sa_last_edited_by_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('survey_answers');
    }
};
