<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_enumerator_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->foreignId('enumerator_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('assigned_by')->constrained('users');
            $table->boolean('is_active')->default(true);
            $table->timestamp('assigned_at')->nullable();
            $table->timestamps();

            $table->unique(['village_id', 'enumerator_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('village_enumerator_assignments');
    }
};
