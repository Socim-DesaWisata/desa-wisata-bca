<?php

use App\Exports\TourismVillageExport;
use App\Models\TourismVillage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PhpOffice\PhpSpreadsheet\IOFactory;

uses(RefreshDatabase::class);

test('village export includes all active villages and excludes trash', function () {
    $user = User::factory()->create();
    $activeVillage = TourismVillage::factory()->create([
        'name' => 'Desa Aktif Export',
        'created_by' => $user->id,
    ]);
    $trashedVillage = TourismVillage::factory()->create([
        'name' => 'Desa Trash Export',
        'created_by' => $user->id,
    ]);
    $trashedVillage->delete();

    $file = app(TourismVillageExport::class)->export();
    $rows = IOFactory::load($file['path'])->getActiveSheet()->toArray();

    expect($rows[0])->toContain('No', 'Nama Desa', 'Tipe Desa', 'Skor KEMENPAR', 'Skor ISTC')
        ->and(collect($rows)->flatten())->toContain($activeVillage->name)
        ->not->toContain($trashedVillage->name);

    @unlink($file['path']);
});

test('viewer can download village export', function () {
    $viewer = User::factory()->create(['role' => 'viewer']);

    $this->actingAs($viewer)
        ->get(route('villages.export'))
        ->assertOk()
        ->assertDownload();
});
