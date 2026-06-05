<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_umkm_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_umkm_id')->constrained('village_umkms')->cascadeOnDelete();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('document_name', 180);
            $table->string('file_path');
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->timestamps();

            $table->index('village_umkm_id');
            $table->index('uploaded_by');
            $table->index('document_name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('village_umkm_documents');
    }
};
