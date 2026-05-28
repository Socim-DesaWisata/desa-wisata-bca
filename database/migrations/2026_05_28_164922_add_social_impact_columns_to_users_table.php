<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('enumerator')->after('password');
            $table->string('status')->default('active')->after('role');
            $table->string('phone', 30)->nullable()->after('status');
            $table->string('avatar_path')->nullable()->after('phone');
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn(['role', 'status', 'phone', 'avatar_path']);
        });
    }
};
