<?php

namespace App\Services;

use App\Models\AnnualTurnover;
use App\Models\AnnualWorkerStat;
use App\Models\AnnualWorkerTrainingStat;
use App\Models\PariwisataAnnualVisitor;
use App\Models\PariwisataPackage;
use App\Models\PariwisataVillage;
use App\Models\PariwisataVisitorTypeAnnual;
use App\Models\User;
use App\Models\VillageSurveyAssignment;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PariwisataSurveyAssignmentService
{
    /**
     * @return array<string, mixed>
     */
    public function getCreateData(VillageSurveyAssignment $assignment): array
    {
        $assignment->loadMissing([
            'village:id,code,name,city,province,district,subdistrict',
            'assignedBy:id,name,email',
        ]);

        return [
            'assignment' => [
                'id' => $assignment->id,
                'code' => $assignment->code,
                'status' => $assignment->status,
                'village' => [
                    'id' => $assignment->village?->id,
                    'code' => $assignment->village?->code,
                    'name' => $assignment->village?->name ?? '-',
                    'location' => collect([
                        $assignment->village?->subdistrict,
                        $assignment->village?->district,
                        $assignment->village?->city,
                        $assignment->village?->province,
                    ])->filter()->implode(', ') ?: '-',
                ],
                'assigned_by' => [
                    'id' => $assignment->assignedBy?->id,
                    'name' => $assignment->assignedBy?->name ?? '-',
                    'email' => $assignment->assignedBy?->email,
                ],
            ],
            'category_options' => $this->categoryOptions(),
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, User $user, VillageSurveyAssignment $assignment): PariwisataVillage
    {
        $assignment->loadMissing('village:id,name');

        if (! $assignment->village) {
            throw ValidationException::withMessages([
                'name' => 'Desa pada assignment tidak ditemukan.',
            ]);
        }

        return DB::transaction(function () use ($data, $user, $assignment): PariwisataVillage {
            $pariwisataVillage = PariwisataVillage::query()->create([
                ...$this->normalizePariwisataData($data),
                'village_id' => $assignment->village_id,
                'operational_schedule' => filled($data['operational_schedule_notes'] ?? null)
                    ? ['notes' => $data['operational_schedule_notes']]
                    : null,
                'is_active' => (bool) $data['is_active'],
            ]);

            foreach (array_unique($data['categories']) as $category) {
                $pariwisataVillage->categories()->create([
                    'category' => $category,
                ]);
            }

            $this->createAnnualTurnovers($pariwisataVillage, $data['annual_turnovers'] ?? [], $user);
            $this->createAnnualVisitors($pariwisataVillage, $data['annual_visitors'] ?? [], $user);
            $this->createVisitorTypeAnnuals($pariwisataVillage, $data['visitor_type_annuals'] ?? [], $user);
            $this->createPackages($pariwisataVillage, $data['packages'] ?? [], $user);
            $this->createAnnualWorkerStats($pariwisataVillage, $data['annual_worker_stats'] ?? [], $user);
            $this->createAnnualWorkerTrainingStats($pariwisataVillage, $data['annual_worker_training_stats'] ?? [], $user);

            return $pariwisataVillage;
        });
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(array $data, User $user, VillageSurveyAssignment $assignment, PariwisataVillage $pariwisata): PariwisataVillage
    {
        if ($assignment->village_id !== $pariwisata->village_id) {
            abort(404);
        }

        return DB::transaction(function () use ($data, $user, $pariwisata): PariwisataVillage {
            $pariwisata->update([
                ...$this->normalizePariwisataData($data),
                'operational_schedule' => filled($data['operational_schedule_notes'] ?? null)
                    ? ['notes' => $data['operational_schedule_notes']]
                    : null,
                'is_active' => (bool) $data['is_active'],
            ]);

            $pariwisata->categories()->delete();

            foreach (array_unique($data['categories']) as $category) {
                $pariwisata->categories()->create([
                    'category' => $category,
                ]);
            }

            $this->forceDeleteAnnualData($pariwisata);
            $this->forceDeletePariwisataChildren($pariwisata);

            $this->createAnnualTurnovers($pariwisata, $data['annual_turnovers'] ?? [], $user);
            $this->createAnnualVisitors($pariwisata, $data['annual_visitors'] ?? [], $user);
            $this->createVisitorTypeAnnuals($pariwisata, $data['visitor_type_annuals'] ?? [], $user);
            $this->createPackages($pariwisata, $data['packages'] ?? [], $user);
            $this->createAnnualWorkerStats($pariwisata, $data['annual_worker_stats'] ?? [], $user);
            $this->createAnnualWorkerTrainingStats($pariwisata, $data['annual_worker_training_stats'] ?? [], $user);

            return $pariwisata->refresh();
        });
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function getCategoryOptions(): array
    {
        return $this->categoryOptions();
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function normalizePariwisataData(array $data): array
    {
        return collect(Arr::only($data, $this->pariwisataColumns()))
            ->map(fn (mixed $value): mixed => $value === '' ? null : $value)
            ->all();
    }

    /**
     * @return array<int, string>
     */
    private function pariwisataColumns(): array
    {
        return [
            'name',
            'operational_days',
            'operational_hours',
            'entrance_ticket_price',
            'entrance_ticket_description',
            'address',
            'person_in_charge_name',
            'person_in_charge_phone',
            'person_in_charge_address',
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function categoryOptions(): array
    {
        return [
            ['value' => 'wisata_alam', 'label' => 'Wisata Alam'],
            ['value' => 'wisata_buatan', 'label' => 'Wisata Buatan'],
            ['value' => 'wisata_religi', 'label' => 'Wisata Religi'],
            ['value' => 'wisata_budaya', 'label' => 'Wisata Budaya'],
            ['value' => 'wisata_kuliner', 'label' => 'Wisata Kuliner'],
            ['value' => 'wisata_edukasi', 'label' => 'Wisata Edukasi'],
        ];
    }

    /**
     * @param  array<int, array<string, mixed>>  $rows
     */
    private function createAnnualTurnovers(PariwisataVillage $pariwisata, array $rows, User $user): void
    {
        foreach ($rows as $row) {
            AnnualTurnover::query()->create([
                'entity_type' => 'pariwisata',
                'umkm_id' => null,
                'pariwisata_id' => $pariwisata->id,
                'entity_key' => $this->pariwisataEntityKey($pariwisata),
                'year' => $row['year'],
                'value' => $row['value'],
                'notes' => $row['notes'] ?? null,
                'created_by' => $user->id,
            ]);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $rows
     */
    private function createAnnualVisitors(PariwisataVillage $pariwisata, array $rows, User $user): void
    {
        foreach ($rows as $row) {
            PariwisataAnnualVisitor::query()->create([
                'pariwisata_id' => $pariwisata->id,
                'year' => $row['year'],
                'value' => $row['value'],
                'notes' => $row['notes'] ?? null,
                'created_by' => $user->id,
            ]);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $rows
     */
    private function createVisitorTypeAnnuals(PariwisataVillage $pariwisata, array $rows, User $user): void
    {
        foreach ($rows as $row) {
            PariwisataVisitorTypeAnnual::query()->create([
                'pariwisata_id' => $pariwisata->id,
                'year' => $row['year'],
                'visitor_type' => $row['visitor_type'],
                'value' => $row['value'],
                'notes' => $row['notes'] ?? null,
                'created_by' => $user->id,
            ]);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $rows
     */
    private function createPackages(PariwisataVillage $pariwisata, array $rows, User $user): void
    {
        foreach ($rows as $row) {
            PariwisataPackage::query()->create([
                'pariwisata_id' => $pariwisata->id,
                'name' => $row['name'],
                'package_type' => $row['package_type'] ?? null,
                'duration' => $row['duration'] ?? null,
                'facilities' => $row['facilities'] ?? null,
                'description' => $row['description'] ?? null,
                'price' => $row['price'] ?? null,
                'is_active' => (bool) ($row['is_active'] ?? true),
                'created_by' => $user->id,
            ]);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $rows
     */
    private function createAnnualWorkerStats(PariwisataVillage $pariwisata, array $rows, User $user): void
    {
        foreach ($rows as $row) {
            AnnualWorkerStat::query()->create([
                'entity_type' => 'pariwisata',
                'umkm_id' => null,
                'pariwisata_id' => $pariwisata->id,
                'entity_key' => $this->pariwisataEntityKey($pariwisata),
                'year' => $row['year'],
                'dimension' => $row['dimension'],
                'category_value' => $row['category_value'],
                'total_people' => $row['total_people'],
                'notes' => $row['notes'] ?? null,
                'created_by' => $user->id,
            ]);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $rows
     */
    private function createAnnualWorkerTrainingStats(PariwisataVillage $pariwisata, array $rows, User $user): void
    {
        foreach ($rows as $row) {
            AnnualWorkerTrainingStat::query()->create([
                'entity_type' => 'pariwisata',
                'umkm_id' => null,
                'pariwisata_id' => $pariwisata->id,
                'entity_key' => $this->pariwisataEntityKey($pariwisata),
                'year' => $row['year'],
                'training_name' => $row['training_name'] ?? null,
                'total_people' => $row['total_people'],
                'notes' => $row['notes'] ?? null,
                'created_by' => $user->id,
            ]);
        }
    }


    private function forceDeleteAnnualData(PariwisataVillage $pariwisata): void
    {
        $entityKey = $this->pariwisataEntityKey($pariwisata);

        AnnualTurnover::withTrashed()
            ->where('entity_key', $entityKey)
            ->forceDelete();
        AnnualWorkerStat::withTrashed()
            ->where('entity_key', $entityKey)
            ->forceDelete();
        AnnualWorkerTrainingStat::withTrashed()
            ->where('entity_key', $entityKey)
            ->forceDelete();
    }

    private function forceDeletePariwisataChildren(PariwisataVillage $pariwisata): void
    {
        PariwisataAnnualVisitor::withTrashed()
            ->where('pariwisata_id', $pariwisata->id)
            ->forceDelete();
        PariwisataVisitorTypeAnnual::withTrashed()
            ->where('pariwisata_id', $pariwisata->id)
            ->forceDelete();
        PariwisataPackage::withTrashed()
            ->where('pariwisata_id', $pariwisata->id)
            ->forceDelete();
    }

    private function pariwisataEntityKey(PariwisataVillage $pariwisata): string
    {
        return "pariwisata:{$pariwisata->id}";
    }
}

