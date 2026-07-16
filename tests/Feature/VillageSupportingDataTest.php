<?php

use App\Models\TourismVillage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;

uses(RefreshDatabase::class);

test('village supporting data can be created through village relations', function () {
    $village = TourismVillage::factory()->create();

    $worker = $village->workers()->create(['type' => 'full-time', 'gender' => 'male', 'age_min' => 18, 'age_max' => 30, 'amount' => 12]);
    $administrator = $village->administrators()->create(['amount' => 4, 'education' => 's1/d4']);
    $institutional = $village->institutionals()->create([
        'title' => 'Pokdarwis',
        'description' => 'Lembaga pengelola desa wisata',
    ]);
    $language = $village->administratorLanguages()->create([
        'language_name' => 'Inggris',
        'proficiency_level' => 'fluent',
        'amount' => 2,
    ]);
    $stakeholder = $village->stakeholders()->create([
        'name' => 'Siti Aminah',
        'position' => 'Ketua Pokdarwis',
    ]);

    expect($worker->village->is($village))->toBeTrue()
        ->and($administrator->village->is($village))->toBeTrue()
        ->and($institutional->village->is($village))->toBeTrue()
        ->and($language->village->is($village))->toBeTrue()
        ->and($stakeholder->village->is($village))->toBeTrue()
        ->and($worker->amount)->toBe(12)
        ->and($administrator->amount)->toBe(4);
});

test('village supporting data is deleted when village is force deleted', function () {
    $village = TourismVillage::factory()->create();

    $worker = $village->workers()->create(['type' => 'part-time', 'gender' => 'female', 'amount' => 3]);
    $administrator = $village->administrators()->create(['amount' => 2, 'education' => 'sma']);
    $institutional = $village->institutionals()->create([
        'title' => 'BUMDes',
        'description' => 'Badan usaha milik desa',
    ]);
    $language = $village->administratorLanguages()->create(['language_name' => 'Jepang', 'proficiency_level' => 'basic', 'amount' => 1]);
    $stakeholder = $village->stakeholders()->create(['name' => 'Budi', 'position' => 'Mitra']);

    $village->forceDelete();

    $this->assertDatabaseMissing('village_workers', ['id' => $worker->id]);
    $this->assertDatabaseMissing('village_administrators', ['id' => $administrator->id]);
    $this->assertDatabaseMissing('village_institutional', ['id' => $institutional->id]);
    $this->assertDatabaseMissing('village_administrator_languages', ['id' => $language->id]);
    $this->assertDatabaseMissing('village_stakeholders', ['id' => $stakeholder->id]);
});

test('village stakeholders only keep name and position as domain fields', function () {
    expect(Schema::getColumnListing('village_stakeholders'))
        ->toBe(['id', 'village_id', 'name', 'position', 'created_at', 'updated_at']);
});
