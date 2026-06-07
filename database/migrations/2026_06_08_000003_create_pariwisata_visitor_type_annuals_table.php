<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pariwisata_visitor_type_annuals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pariwisata_id')->constrained('pariwisata_village_table')->cascadeOnDelete();
            $table->integer('year');
            $table->string('visitor_type', 50);
            $table->integer('value');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('pariwisata_id');
            $table->index('year');
            $table->index('visitor_type');
            $table->unique(['pariwisata_id', 'year', 'visitor_type'], 'pariwisata_visitor_type_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pariwisata_visitor_type_annuals');
    }
};
