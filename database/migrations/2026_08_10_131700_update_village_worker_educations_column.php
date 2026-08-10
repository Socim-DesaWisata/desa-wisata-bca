<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('village_worker_educations', function (Blueprint $table) {
            $table->string('education', 50)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('village_worker_educations', function (Blueprint $table) {
            $table->enum('education', ['sd', 'smp', 'sma', 'd3', 's1/d4', 's2', 's3'])->change();
        });
    }
};
