<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('village_survey_assignments', function (Blueprint $table) {
            $table->string('code', 20)->nullable()->after('id');
        });

        // Backfill existing rows
        DB::table('village_survey_assignments')->orderBy('id')->each(function (object $row): void {
            DB::table('village_survey_assignments')
                ->where('id', $row->id)
                ->update(['code' => 'ASG-'.str_pad((string) $row->id, 3, '0', STR_PAD_LEFT)]);
        });

        Schema::table('village_survey_assignments', function (Blueprint $table) {
            $table->string('code', 20)->nullable(false)->unique()->change();
        });
    }

    public function down(): void
    {
        Schema::table('village_survey_assignments', function (Blueprint $table) {
            $table->dropColumn('code');
        });
    }
};
