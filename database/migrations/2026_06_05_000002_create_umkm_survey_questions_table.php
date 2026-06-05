<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('umkm_survey_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_template_id')->constrained('survey_templates')->cascadeOnDelete();
            $table->string('criteria_code', 10);
            $table->string('criteria_name', 150);
            $table->decimal('criteria_weight_percent', 6, 2);
            $table->integer('question_number');
            $table->text('question_text');
            $table->decimal('question_weight_percent', 6, 2);
            $table->decimal('max_score', 6, 2)->default(4.00);
            $table->text('help_text')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index('survey_template_id');
            $table->index('criteria_code');
            $table->index(['criteria_code', 'question_number'], 'umkm_q_criteria_number_idx');
            $table->unique(['survey_template_id', 'criteria_code', 'question_number'], 'umkm_q_template_criteria_number_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('umkm_survey_questions');
    }
};
