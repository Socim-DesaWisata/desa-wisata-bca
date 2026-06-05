<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_umkms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('village_id')->constrained('tourism_villages')->cascadeOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('data_collector_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('business_owner_name', 150)->nullable();
            $table->string('village_name', 150)->nullable();
            $table->string('collector_name', 150)->nullable();
            $table->string('name', 150);
            $table->string('legal_business_name', 180)->nullable();
            $table->integer('established_year')->nullable();
            $table->text('company_website_url')->nullable();
            $table->text('production_address')->nullable();
            $table->string('product_category', 150)->nullable();
            $table->string('brand_name', 150)->nullable();
            $table->decimal('annual_revenue', 18, 2)->nullable();
            $table->string('monthly_production_capacity', 150)->nullable();
            $table->text('current_obstacles')->nullable();
            $table->text('certifications')->nullable();
            $table->string('has_business_legality_and_certification')->nullable();
            $table->string('is_umkm_participant')->nullable();
            $table->string('is_production_capacity_participant')->nullable();
            $table->string('annual_production_capacity')->nullable();
            $table->text('factory_location_feasibility')->nullable();
            $table->text('instagram_url')->nullable();
            $table->text('facebook_url')->nullable();
            $table->text('twitter_url')->nullable();
            $table->text('marketing_website_url')->nullable();
            $table->text('ecommerce_profile_url')->nullable();
            $table->text('marketing_notes')->nullable();
            $table->text('sustainability_notes')->nullable();
            $table->string('bank_name', 150)->nullable();
            $table->string('bank_account_number', 100)->nullable();
            $table->boolean('has_qris')->nullable();
            $table->string('qris_provider', 150)->nullable();
            $table->boolean('has_edc')->nullable();
            $table->string('edc_provider', 150)->nullable();
            $table->boolean('has_credit_card')->nullable();
            $table->text('banking_notes')->nullable();
            $table->boolean('has_exported')->nullable();
            $table->text('export_destination_countries')->nullable();
            $table->string('product_photo_path')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('village_id');
            $table->index('name');
            $table->index('business_owner_name');
            $table->index('product_category');
            $table->index('has_exported');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('village_umkms');
    }
};
