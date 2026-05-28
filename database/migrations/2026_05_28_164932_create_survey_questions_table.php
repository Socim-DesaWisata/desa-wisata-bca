<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('survey_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_template_id')->constrained('survey_templates')->cascadeOnDelete();
            $table->string('aspect', 150);
            $table->string('code', 50)->nullable();
            $table->text('question_text');
            $table->text('document_hint')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['survey_template_id', 'aspect']);
            $table->index(['survey_template_id', 'code']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('survey_questions');
    }
};
