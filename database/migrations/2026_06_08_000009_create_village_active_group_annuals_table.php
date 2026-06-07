<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_active_group_annuals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->string('active_category')->nullable();
            $table->integer('year');
            $table->integer('value');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('village_id');
            $table->index('year');
            $table->unique(['village_id', 'year'], 'village_active_year_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('village_active_group_annuals');
    }
};
