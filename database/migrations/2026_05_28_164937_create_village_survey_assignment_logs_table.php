<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_survey_assignment_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_survey_assignment_id');
            $table->foreignId('actor_id')->constrained('users');
            $table->string('action');
            $table->string('from_status')->nullable();
            $table->string('to_status')->nullable();
            $table->text('description')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamp('created_at')->nullable();

            $table->foreign('village_survey_assignment_id', 'vsal_assignment_fk')
                ->references('id')->on('village_survey_assignments')->cascadeOnDelete();
            $table->index('village_survey_assignment_id', 'vsal_assignment_index');
            $table->index('actor_id', 'vsal_actor_index');
            $table->index('action', 'vsal_action_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('village_survey_assignment_logs');
    }
};
