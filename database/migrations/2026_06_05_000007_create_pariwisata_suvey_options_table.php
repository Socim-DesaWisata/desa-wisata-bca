<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pariwisata_suvey_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pariwisata_survey_question_id');
            $table->integer('score');
            $table->string('level');
            $table->string('label', 100);
            $table->text('description');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('pariwisata_survey_question_id', 'ps_option_question_fk')->references('id')->on('pariwisata_survey_questions')->cascadeOnDelete();
            $table->index('pariwisata_survey_question_id', 'ps_option_question_idx');
            $table->unique(['pariwisata_survey_question_id', 'score'], 'ps_option_question_score_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pariwisata_suvey_options');
    }
};
