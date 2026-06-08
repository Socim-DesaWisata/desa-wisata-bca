<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EnumeratorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $enumerators = [
            'triapriansyah@socialimpact.id',
            'indrimariska78@gmail.com',
            'sabrinaagistia@gmail.com',
            'azizahnraulia@gmail.com',
            'alfina.workmail@gmail.com',
            'irfan@socialimpact.id',
            'ptrdhea02@gmail.com',
            'ahmadsahrir20@gmail.com',
        ];

        $password = Hash::make('password');

        foreach ($enumerators as $email) {
            User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => ucwords(explode('@', $email)[0]),
                    'password' => $password,
                    'role' => 'enumerator',
                    'status' => 'active',
                    'phone' => null,
                ]
            );
        }
    }
}
