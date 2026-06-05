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
        Schema::create('village_umkm_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_umkm_id')->constrained('village_umkms')->cascadeOnDelete();
            $table->string('category', 100);
            $table->timestamps();

            $table->unique(['village_umkm_id', 'category'], 'village_umkm_categories_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('village_umkm_categories');
    }
};
