<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program_villages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('csr_programs')->cascadeOnDelete();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->date('joined_at')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();

            $table->unique(['program_id', 'village_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_villages');
    }
};
