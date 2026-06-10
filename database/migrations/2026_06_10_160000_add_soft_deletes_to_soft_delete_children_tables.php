<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('survey_answers', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('village_survey_assignment_logs', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('survey_answer_histories', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('umkm_survey_answers', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('village_umkm_documents', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('village_umkm_categories', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('pariwisata_survey_answers', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('pariwisata_village_category', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('pariwisata_village_category', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('pariwisata_survey_answers', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('village_umkm_categories', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('village_umkm_documents', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('umkm_survey_answers', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('survey_answer_histories', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('village_survey_assignment_logs', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('survey_answers', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
