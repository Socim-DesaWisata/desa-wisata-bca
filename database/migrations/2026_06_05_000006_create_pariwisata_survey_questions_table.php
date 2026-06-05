<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pariwisata_survey_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_template_id')->constrained('survey_templates')->cascadeOnDelete();
            $table->string('category_code', 20)->nullable();
            $table->string('category_name')->nullable();
            $table->string('sub_category_code', 20)->nullable();
            $table->string('sub_category_name')->nullable();
            $table->string('criteria_code', 20)->nullable();
            $table->string('criteria_name')->nullable();
            $table->text('criteria_description')->nullable();
            $table->string('indicator_code', 20);
            $table->string('indicator_name');
            $table->text('indicator_description')->nullable();
            $table->text('supporting_evidence')->nullable();
            $table->string('input_type')->default('single_choice');
            $table->boolean('document_required')->default(false);
            $table->text('document_hint')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index('survey_template_id');
            $table->index('category_code');
            $table->index('sub_category_code');
            $table->index('criteria_code');
            $table->index('indicator_code');
            $table->unique(['survey_template_id', 'indicator_code'], 'pariwisata_q_template_indicator_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pariwisata_survey_questions');
    }
};
