<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pariwisata_village_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pariwisata_village_id');
            $table->string('category')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('pariwisata_village_id', 'pv_category_village_fk')->references('id')->on('pariwisata_village_table')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pariwisata_village_category');
    }
};
