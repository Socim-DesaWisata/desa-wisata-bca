<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('village_stakeholders', function (Blueprint $table) {
            $table->dropIndex('village_stakeholders_filter_index');
            $table->dropColumn([
                'organization',
                'category',
                'stakeholder_type',
                'phone',
                'email',
                'collaboration_scope',
                'notes',
                'is_active',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('village_stakeholders', function (Blueprint $table) {
            $table->string('organization', 150)->nullable()->after('position');
            $table->enum('category', ['government', 'academic', 'business', 'community', 'media', 'other'])->default('other')->after('organization');
            $table->enum('stakeholder_type', ['internal', 'external'])->default('external')->after('category');
            $table->string('phone', 30)->nullable()->after('stakeholder_type');
            $table->string('email', 150)->nullable()->after('phone');
            $table->text('collaboration_scope')->nullable()->after('email');
            $table->text('notes')->nullable()->after('collaboration_scope');
            $table->boolean('is_active')->default(true)->after('notes');
            $table->index(['village_id', 'category', 'stakeholder_type', 'is_active'], 'village_stakeholders_filter_index');
        });
    }
};
