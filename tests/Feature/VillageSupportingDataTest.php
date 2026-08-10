<?php

use App\Models\TourismVillage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;

uses(RefreshDatabase::class);

test('village supporting data can be created through village relations', function () {
    $village = TourismVillage::factory()->create(['total_personnel' => 20]);

    $workerType = $village->workerTypes()->create(['type' => 'full-time', 'amount' => 12]);
    $workerGender = $village->workerGenders()->create(['gender' => 'male', 'amount' => 12]);
    $workerAge = $village->workerAges()->create(['age_min' => 18, 'age_max' => 30, 'amount' => 12]);
    $workerEdu = $village->workerEducations()->create(['education' => 's1/d4', 'amount' => 4]);
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

    expect($workerType->village->is($village))->toBeTrue()
        ->and($workerGender->village->is($village))->toBeTrue()
        ->and($workerAge->village->is($village))->toBeTrue()
        ->and($workerEdu->village->is($village))->toBeTrue()
        ->and($institutional->village->is($village))->toBeTrue()
        ->and($language->village->is($village))->toBeTrue()
        ->and($stakeholder->village->is($village))->toBeTrue()
        ->and($workerType->amount)->toBe(12)
        ->and($workerEdu->amount)->toBe(4);
});

test('village supporting data is deleted when village is force deleted', function () {
    $village = TourismVillage::factory()->create();

    $workerType = $village->workerTypes()->create(['type' => 'part-time', 'amount' => 3]);
    $workerGender = $village->workerGenders()->create(['gender' => 'female', 'amount' => 3]);
    $workerAge = $village->workerAges()->create(['age_min' => 20, 'age_max' => 30, 'amount' => 3]);
    $workerEdu = $village->workerEducations()->create(['education' => 'sma', 'amount' => 2]);
    $institutional = $village->institutionals()->create([
        'title' => 'BUMDes',
        'description' => 'Badan usaha milik desa',
    ]);
    $language = $village->administratorLanguages()->create(['language_name' => 'Jepang', 'proficiency_level' => 'basic', 'amount' => 1]);
    $stakeholder = $village->stakeholders()->create(['name' => 'Budi', 'position' => 'Mitra']);

    $village->forceDelete();

    $this->assertDatabaseMissing('village_worker_types', ['id' => $workerType->id]);
    $this->assertDatabaseMissing('village_worker_genders', ['id' => $workerGender->id]);
    $this->assertDatabaseMissing('village_worker_ages', ['id' => $workerAge->id]);
    $this->assertDatabaseMissing('village_worker_educations', ['id' => $workerEdu->id]);
    $this->assertDatabaseMissing('village_institutional', ['id' => $institutional->id]);
    $this->assertDatabaseMissing('village_administrator_languages', ['id' => $language->id]);
    $this->assertDatabaseMissing('village_stakeholders', ['id' => $stakeholder->id]);
});

test('village stakeholders only keep name and position as domain fields', function () {
    expect(Schema::getColumnListing('village_stakeholders'))
        ->toBe(['id', 'village_id', 'name', 'position', 'created_at', 'updated_at']);
});
