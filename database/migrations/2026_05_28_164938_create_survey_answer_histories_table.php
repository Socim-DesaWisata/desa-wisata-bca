<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('survey_answer_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_answer_id');
            $table->foreignId('village_survey_assignment_id');
            $table->foreignId('survey_question_id')->constrained('survey_questions');
            $table->foreignId('actor_id')->constrained('users');
            $table->string('action');
            $table->foreignId('old_survey_question_option_id')->nullable();
            $table->foreignId('new_survey_question_option_id')->nullable();
            $table->decimal('old_score', 6, 2)->nullable();
            $table->decimal('new_score', 6, 2)->nullable();
            $table->string('old_option_label')->nullable();
            $table->string('new_option_label')->nullable();
            $table->timestamp('created_at')->nullable();

            $table->foreign('survey_answer_id', 'sah_answer_fk')
                ->references('id')->on('survey_answers')->cascadeOnDelete();
            $table->foreign('village_survey_assignment_id', 'sah_assignment_fk')
                ->references('id')->on('village_survey_assignments')->cascadeOnDelete();
            $table->foreign('old_survey_question_option_id', 'sah_old_option_fk')
                ->references('id')->on('survey_question_options')->nullOnDelete();
            $table->foreign('new_survey_question_option_id', 'sah_new_option_fk')
                ->references('id')->on('survey_question_options')->nullOnDelete();
            $table->index('survey_answer_id', 'sah_answer_index');
            $table->index('village_survey_assignment_id', 'sah_assignment_index');
            $table->index('survey_question_id', 'sah_question_index');
            $table->index('actor_id', 'sah_actor_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('survey_answer_histories');
    }
};
