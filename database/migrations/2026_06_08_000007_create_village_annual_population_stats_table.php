<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_annual_population_stats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->integer('year');
            $table->string('category_value', 150);
            $table->integer('total_people');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('village_id');
            $table->index('year');
            $table->index('category_value');
            $table->unique(['village_id', 'year', 'category_value'], 'village_population_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('village_annual_population_stats');
    }
};
