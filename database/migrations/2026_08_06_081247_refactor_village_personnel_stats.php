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
        // 1. Drop old tables
        Schema::dropIfExists('village_workers');
        Schema::dropIfExists('village_administrators');

        // 2. Add total_personnel to tourism_villages
        Schema::table('tourism_villages', function (Blueprint $table) {
            $table->unsignedInteger('total_personnel')->default(0)->after('status');
        });

        // 3. Create new tables
        Schema::create('village_worker_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->enum('type', ['full-time', 'part-time']);
            $table->unsignedInteger('amount');
            $table->timestamps();
        });

        Schema::create('village_worker_genders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->enum('gender', ['male', 'female', 'unspecified']);
            $table->unsignedInteger('amount');
            $table->timestamps();
        });

        Schema::create('village_worker_ages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->unsignedTinyInteger('age_min')->nullable();
            $table->unsignedTinyInteger('age_max')->nullable();
            $table->unsignedInteger('amount');
            $table->timestamps();
        });

        Schema::create('village_worker_educations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->enum('education', ['sd', 'smp', 'sma', 'd3', 's1/d4', 's2', 's3']);
            $table->unsignedInteger('amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('village_worker_educations');
        Schema::dropIfExists('village_worker_ages');
        Schema::dropIfExists('village_worker_genders');
        Schema::dropIfExists('village_worker_types');

        Schema::table('tourism_villages', function (Blueprint $table) {
            $table->dropColumn('total_personnel');
        });

        Schema::create('village_workers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->enum('type', ['full-time', 'part-time']);
            $table->enum('gender', ['male', 'female', 'unspecified'])->default('unspecified');
            $table->unsignedTinyInteger('age_min')->nullable();
            $table->unsignedTinyInteger('age_max')->nullable();
            $table->unsignedInteger('amount');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->index(['village_id', 'type', 'gender', 'age_min', 'age_max'], 'village_workers_demographic_index');
        });

        Schema::create('village_administrators', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->unsignedInteger('amount');
            $table->enum('education', ['sd', 'smp', 'sma', 'd3', 's1/d4', 's2', 's3']);
            $table->timestamps();
        });
    }
};
