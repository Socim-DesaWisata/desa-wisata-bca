<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('csr_programs', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('sponsor_name', 150)->default('BCA');
            $table->text('description')->nullable();
            $table->integer('year')->nullable();
            $table->string('status')->default('active');
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('csr_programs');
    }
};
