<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('village_workers', function (Blueprint $table) {
            $table->enum('gender', ['male', 'female', 'unspecified'])->default('unspecified')->after('type');
            $table->unsignedTinyInteger('age_min')->nullable()->after('gender');
            $table->unsignedTinyInteger('age_max')->nullable()->after('age_min');
            $table->text('notes')->nullable()->after('amount');
            $table->index(['village_id', 'type', 'gender', 'age_min', 'age_max'], 'village_workers_demographic_index');
        });

        Schema::create('village_administrator_languages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->string('language_name', 100);
            $table->enum('proficiency_level', ['basic', 'intermediate', 'advanced', 'fluent']);
            $table->unsignedInteger('amount');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->unique(['village_id', 'language_name', 'proficiency_level'], 'village_admin_languages_unique');
        });

        Schema::create('village_stakeholders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->string('name', 150);
            $table->string('position', 150);
            $table->string('organization', 150)->nullable();
            $table->enum('category', ['government', 'academic', 'business', 'community', 'media', 'other']);
            $table->enum('stakeholder_type', ['internal', 'external']);
            $table->string('phone', 30)->nullable();
            $table->string('email', 150)->nullable();
            $table->text('collaboration_scope')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['village_id', 'category', 'stakeholder_type', 'is_active'], 'village_stakeholders_filter_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('village_stakeholders');
        Schema::dropIfExists('village_administrator_languages');

        Schema::table('village_workers', function (Blueprint $table) {
            $table->dropIndex('village_workers_demographic_index');
            $table->dropColumn(['gender', 'age_min', 'age_max', 'notes']);
        });
    }
};
