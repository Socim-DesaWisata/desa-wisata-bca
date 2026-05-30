<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('survey_answers', function (Blueprint $table) {
            $table->text('option_label_snapshot')->nullable()->change();
        });

        Schema::table('survey_answer_histories', function (Blueprint $table) {
            $table->text('old_option_label')->nullable()->change();
            $table->text('new_option_label')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('survey_answers', function (Blueprint $table) {
            $table->string('option_label_snapshot')->nullable()->change();
        });

        Schema::table('survey_answer_histories', function (Blueprint $table) {
            $table->string('old_option_label')->nullable()->change();
            $table->string('new_option_label')->nullable()->change();
        });
    }
};
