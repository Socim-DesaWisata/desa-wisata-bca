<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('village_vulnerable_group_annuals', function (Blueprint $table) {
            $table->dropUnique('village_vulnerable_year_unique');
            $table->unique(['village_id', 'year', 'vulnerable_category'], 'village_vulnerable_year_category_unique');
        });

        Schema::table('village_active_group_annuals', function (Blueprint $table) {
            $table->dropUnique('village_active_year_unique');
            $table->unique(['village_id', 'year', 'active_category'], 'village_active_year_category_unique');
        });
    }

    public function down(): void
    {
        Schema::table('village_active_group_annuals', function (Blueprint $table) {
            $table->dropUnique('village_active_year_category_unique');
            $table->unique(['village_id', 'year'], 'village_active_year_unique');
        });

        Schema::table('village_vulnerable_group_annuals', function (Blueprint $table) {
            $table->dropUnique('village_vulnerable_year_category_unique');
            $table->unique(['village_id', 'year'], 'village_vulnerable_year_unique');
        });
    }
};
