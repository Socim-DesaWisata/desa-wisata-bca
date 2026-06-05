<?php

namespace App\Services;

use App\Models\PariwisataVillage;
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
                'code' => 'ASG-'.str_pad((string) $assignment->id, 3, '0', STR_PAD_LEFT),
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
    public function create(array $data, VillageSurveyAssignment $assignment): PariwisataVillage
    {
        $assignment->loadMissing('village:id,name');

        if (! $assignment->village) {
            throw ValidationException::withMessages([
                'name' => 'Desa pada assignment tidak ditemukan.',
            ]);
        }

        return DB::transaction(function () use ($data, $assignment): PariwisataVillage {
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

            return $pariwisataVillage;
        });
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
}
