<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('annual_worker_training_stats', function (Blueprint $table) {
            $table->id();
            $table->string('entity_type', 30);
            $table->foreignId('umkm_id')->nullable()->constrained('village_umkms')->nullOnDelete();
            $table->foreignId('pariwisata_id')->nullable()->constrained('pariwisata_village_table')->nullOnDelete();
            $table->string('entity_key', 100);
            $table->integer('year');
            $table->string('training_name', 150)->nullable();
            $table->integer('total_people');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('entity_type');
            $table->index('entity_key');
            $table->index('umkm_id');
            $table->index('pariwisata_id');
            $table->index('year');
            $table->index('training_name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('annual_worker_training_stats');
    }
};
