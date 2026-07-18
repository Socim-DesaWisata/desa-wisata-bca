<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_workers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->enum('type', ['full-time', 'part-time']);
            $table->unsignedInteger('amount');
            $table->timestamps();
        });

        Schema::create('village_administrators', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->unsignedInteger('amount');
            $table->enum('education', ['sd', 'smp', 'sma', 'd3', 's1/d4', 's2', 's3']);
            $table->timestamps();
        });

        Schema::create('village_institutional', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->string('title');
            $table->string('description');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('village_institutional');
        Schema::dropIfExists('village_administrators');
        Schema::dropIfExists('village_workers');
    }
};
