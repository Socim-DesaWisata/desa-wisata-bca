<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pariwisata_annual_visitors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pariwisata_id')->constrained('pariwisata_village_table')->cascadeOnDelete();
            $table->integer('year');
            $table->integer('value');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('pariwisata_id');
            $table->index('year');
            $table->unique(['pariwisata_id', 'year'], 'pariwisata_visitors_year_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pariwisata_annual_visitors');
    }
};
