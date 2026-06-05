<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pariwisata_survey_answers', function (Blueprint $table) {
            $table->dropUnique('ps_answer_question_unique');

            $table->foreignId('pariwisata_village_id')
                ->nullable()
                ->after('id');

            $table->foreign('pariwisata_village_id', 'ps_answer_pariwisata_fk')
                ->references('id')
                ->on('pariwisata_village_table')
                ->cascadeOnDelete();

            $table->unique(
                ['pariwisata_village_id', 'pariwisata_survey_question_id'],
                'ps_answer_village_question_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::table('pariwisata_survey_answers', function (Blueprint $table) {
            $table->dropUnique('ps_answer_village_question_unique');
            $table->dropForeign('ps_answer_pariwisata_fk');
            $table->dropColumn('pariwisata_village_id');

            $table->unique('pariwisata_survey_question_id', 'ps_answer_question_unique');
        });
    }
};
