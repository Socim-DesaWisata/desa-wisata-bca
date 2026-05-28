<?php

use App\Models\TourismVillage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authenticated users can view villages from database', function () {
    $user = User::factory()->create();
    $village = TourismVillage::factory()->create([
        'name' => 'Desa Wisata Testing',
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get(route('villages'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('villages/index')
            ->where('villages.data.0.name', $village->name)
        );
});

test('authenticated users can create a tourism village', function () {
    $user = User::factory()->create();

    $payload = [
        'code' => 'DW-TEST-001',
        'name' => 'Desa Wisata Baru',
        'slug' => 'desa-wisata-baru',
        'description' => 'Desa wisata untuk pengujian.',
        'province' => 'DI Yogyakarta',
        'city' => 'Gunungkidul',
        'district' => 'Patuk',
        'subdistrict' => 'Nglanggeran',
        'address' => 'Jl. Desa Wisata No. 1',
        'postal_code' => '55862',
        'latitude' => '-7.8412000',
        'longitude' => '110.5430000',
        'maps_url' => 'https://maps.google.com/example',
        'manager_name' => 'Pokdarwis Baru',
        'manager_phone' => '081234567890',
        'manager_email' => 'pengelola@example.com',
        'status' => 'active',
    ];

    $this->actingAs($user)
        ->post(route('villages.store'), $payload)
        ->assertRedirect();

    $this->assertDatabaseHas('tourism_villages', [
        'code' => 'DW-TEST-001',
        'name' => 'Desa Wisata Baru',
        'slug' => 'desa-wisata-baru',
        'created_by' => $user->id,
    ]);
});
