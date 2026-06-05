<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pariwisata_village_table', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->string('name', 150);
            $table->string('operational_days', 150)->nullable();
            $table->string('operational_hours', 150)->nullable();
            $table->json('operational_schedule')->nullable();
            $table->decimal('entrance_ticket_price', 12, 2)->nullable();
            $table->string('entrance_ticket_description', 150)->nullable();
            $table->text('address')->nullable();
            $table->string('person_in_charge_name', 150)->nullable();
            $table->string('person_in_charge_phone', 30)->nullable();
            $table->text('person_in_charge_address')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index('village_id');
            $table->index('name');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pariwisata_village_table');
    }
};
