<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_survey_assignments', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20)->unique();
            $table->foreignId('village_id')->unique()->constrained('tourism_villages')->cascadeOnDelete();
            $table->foreignId('survey_template_id')->constrained('survey_templates');
            $table->string('status')->default('assigned');
            $table->foreignId('assigned_by')->constrained('users');
            $table->foreignId('submitted_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('assigned_at')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('last_saved_at')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('survey_template_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('village_survey_assignments');
    }
};
