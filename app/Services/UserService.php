<?php

namespace App\Services;

use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class UserService
{
    /**
     * @param  array<string, mixed>  $filters
     * @return array<string, mixed>
     */
    public function getIndexData(array $filters): array
    {
        $perPage = (int) Arr::get($filters, 'per_page', 10);

        if (! in_array($perPage, [5, 10, 15, 25, 50], true)) {
            $perPage = 10;
        }

        $normalizedFilters = [
            'search' => trim((string) Arr::get($filters, 'search', '')),
            'role' => Arr::get($filters, 'role'),
            'status' => Arr::get($filters, 'status'),
            'per_page' => $perPage,
        ];

        $paginator = User::query()
            ->select(['id', 'name', 'email', 'phone', 'role', 'status', 'created_at', 'updated_at'])
            ->with(['assignedVillages:id,name,city,province'])
            ->withCount(['assignedSurveyAssignments', 'villageEnumeratorAssignments'])
            ->when($normalizedFilters['search'] !== '', function ($query) use ($normalizedFilters): void {
                $search = $normalizedFilters['search'];

                $query->where(function ($query) use ($search): void {
                    $query
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
                });
            })
            ->when($normalizedFilters['role'], fn ($query, string $role) => $query->where('role', $role))
            ->when($normalizedFilters['status'], fn ($query, string $status) => $query->where('status', $status))
            ->latest('updated_at')
            ->paginate($normalizedFilters['per_page'])
            ->withQueryString();

        $paginator->through(fn (User $user): array => $this->formatUser($user));

        return [
            'stats' => $this->getStats(),
            'users' => $paginator,
            'filters' => $normalizedFilters,
            'role_options' => $this->roleOptions(),
            'status_options' => $this->statusOptions(),
            'per_page_options' => [5, 10, 15, 25, 50],
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): User
    {
        return User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'role' => $data['role'],
            'status' => $data['status'],
            'password' => $data['password'],
        ]);
    }

    public function resetPassword(User $user, string $password): void
    {
        $user->forceFill([
            'password' => $password,
        ])->save();
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function roleOptions(): array
    {
        return [
            ['value' => 'admin', 'label' => 'Admin'],
            ['value' => 'enumerator', 'label' => 'Enumerator'],
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function statusOptions(): array
    {
        return [
            ['value' => 'active', 'label' => 'Aktif'],
            ['value' => 'inactive', 'label' => 'Nonaktif'],
            ['value' => 'pending', 'label' => 'Pending Invitation'],
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function getStats(): array
    {
        return [
            [
                'label' => 'Total User',
                'value' => (string) User::query()->count(),
                'description' => 'Seluruh akun terdaftar',
                'icon' => 'users',
            ],
            [
                'label' => 'Admin',
                'value' => (string) User::query()->where('role', 'admin')->count(),
                'description' => 'Pengelola internal platform',
                'icon' => 'shield',
            ],
            [
                'label' => 'Enumerator Aktif',
                'value' => (string) User::query()->where('role', 'enumerator')->where('status', 'active')->count(),
                'description' => 'Sedang terlibat assignment',
                'icon' => 'briefcase',
            ],
            [
                'label' => 'User Nonaktif',
                'value' => (string) User::query()->where('status', 'inactive')->count(),
                'description' => 'Diarsipkan / dinonaktifkan',
                'icon' => 'user',
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatUser(User $user): array
    {
        $villages = $user->assignedVillages
            ->map(fn ($village): string => collect([$village->city, $village->province])->filter()->implode(', '))
            ->filter()
            ->unique()
            ->values();

        $assignmentCount = $user->role === 'enumerator'
            ? $user->village_enumerator_assignments_count
            : $user->assigned_survey_assignments_count;

        return [
            'id' => $user->id,
            'initials' => Str::of($user->name)->explode(' ')->filter()->take(2)->map(fn (string $word): string => Str::substr($word, 0, 1))->implode(''),
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone ?: '-',
            'role' => $user->role,
            'role_label' => $this->labelFor($user->role, $this->roleOptions()),
            'status' => $user->status,
            'status_label' => $this->labelFor($user->status, $this->statusOptions()),
            'region' => $villages->isNotEmpty() ? $villages->join('; ') : 'Pusat',
            'assignments' => $assignmentCount.' assignment',
            'last_login' => '-',
            'updated_at' => $this->formatDate($user->updated_at),
        ];
    }

    /**
     * @param  array<int, array<string, string>>  $options
     */
    private function labelFor(?string $value, array $options): string
    {
        return collect($options)->firstWhere('value', $value)['label'] ?? Str::headline((string) $value);
    }

    private function formatDate(?CarbonInterface $date): string
    {
        return $date?->translatedFormat('d M Y') ?? '-';
    }
}
