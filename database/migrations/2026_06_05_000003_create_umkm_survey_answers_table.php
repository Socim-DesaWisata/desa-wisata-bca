<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('umkm_survey_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('umkm_id')->constrained('village_umkms')->cascadeOnDelete();
            $table->foreignId('umkm_assessment_question_id');
            $table->foreignId('answered_by')->constrained('users');
            $table->decimal('score', 6, 2);
            $table->string('criteria_code_snapshot', 10)->nullable();
            $table->string('criteria_name_snapshot', 150)->nullable();
            $table->decimal('criteria_weight_percent_snapshot', 6, 2)->nullable();
            $table->text('question_text_snapshot')->nullable();
            $table->decimal('question_weight_percent_snapshot', 6, 2)->nullable();
            $table->decimal('max_score_snapshot', 6, 2)->nullable();
            $table->decimal('normalized_score', 8, 4)->nullable();
            $table->decimal('weighted_score', 8, 4)->nullable();
            $table->timestamp('answered_at')->nullable();
            $table->timestamp('last_edited_at')->nullable();
            $table->timestamps();

            $table->foreign('umkm_assessment_question_id', 'umkm_a_question_fk')->references('id')->on('umkm_survey_questions');
            $table->index('umkm_id');
            $table->index('umkm_assessment_question_id', 'umkm_a_question_idx');
            $table->index('answered_by');
            $table->unique(['umkm_id', 'umkm_assessment_question_id'], 'umkm_a_umkm_question_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('umkm_survey_answers');
    }
};
