<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pariwisata_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pariwisata_id')->constrained('pariwisata_village_table')->cascadeOnDelete();
            $table->string('name', 150);
            $table->string('package_type', 100)->nullable();
            $table->string('duration', 100)->nullable();
            $table->text('facilities')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 12, 2)->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('pariwisata_id');
            $table->index('name');
            $table->index('package_type');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pariwisata_packages');
    }
};
