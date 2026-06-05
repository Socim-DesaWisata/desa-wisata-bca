<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pariwisata_survey_answer_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pariwisata_survey_answer_id');
            $table->foreignId('uploaded_by')->constrained('users');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('mime_type', 100)->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->text('caption')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('pariwisata_survey_answer_id', 'ps_doc_answer_fk')->references('id')->on('pariwisata_survey_answers')->cascadeOnDelete();
            $table->index('pariwisata_survey_answer_id', 'ps_doc_answer_idx');
            $table->index('uploaded_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pariwisata_survey_answer_documents');
    }
};
