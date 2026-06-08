<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\IndexUserRequest;
use App\Http\Requests\Users\ResetUserPasswordRequest;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRoleRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(IndexUserRequest $request, UserService $userService): Response
    {
        return Inertia::render('users/index', $userService->getIndexData($request->validated()));
    }

    public function store(StoreUserRequest $request, UserService $userService): RedirectResponse
    {
        $userService->create($request->validated());

        return back()->with('success', 'User berhasil dibuat.');
    }

    public function resetPassword(
        ResetUserPasswordRequest $request,
        User $user,
        UserService $userService
    ): RedirectResponse {
        $userService->resetPassword($user, $request->validated('password'));

        return back()->with('success', 'Password user berhasil direset.');
    }

    public function updateRole(
        UpdateUserRoleRequest $request,
        User $user,
        UserService $userService
    ): RedirectResponse {
        $userService->updateRole($user, $request->validated('role'));

        return back()->with('success', 'Role user berhasil diubah.');
    }
}
