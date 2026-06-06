import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import {
    BriefcaseBusiness,
    Info,
    KeyRound,
    MoreHorizontal,
    Plus,
    Search,
    Shield,
    Trash2,
    UserRound,
    Users,
} from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    index as usersIndex,
    resetPassword as resetUserPassword,
    store as storeUser,
} from '@/actions/App/Http/Controllers/UserController';
import { dashboard } from '@/routes';

type IconKey = 'briefcase' | 'shield' | 'user' | 'users';

type StatCard = {
    label: string;
    value: string;
    description: string;
    icon: IconKey;
};

type UserRow = {
    id: number;
    initials: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    role_label: string;
    region: string;
    status: string;
    status_label: string;
    assignments: string;
    last_login: string;
    updated_at: string;
};

type Option = {
    value: string;
    label: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedUsers = {
    data: UserRow[];
    current_page: number;
    from: number | null;
    to: number | null;
    total: number;
    per_page: number;
    links: PaginationLink[];
};

type UserFilters = {
    search: string;
    role: string | null;
    status: string | null;
    per_page: number;
};

type UsersIndexProps = {
    stats: StatCard[];
    users: PaginatedUsers;
    filters: UserFilters;
    role_options: Option[];
    status_options: Option[];
    per_page_options: number[];
};

type CreateUserForm = {
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    password: string;
    password_confirmation: string;
};

type ResetPasswordForm = {
    password: string;
    password_confirmation: string;
};

const statIcons = {
    users: Users,
    shield: Shield,
    briefcase: BriefcaseBusiness,
    user: UserRound,
} satisfies Record<IconKey, typeof Users>;

function Badge({
    children,
    className,
}: {
    children: string;
    className: string;
}) {
    return (
        <span
            className={`inline-flex h-6 items-center rounded-md px-2 text-[11px] font-bold ${className}`}
        >
            {children}
        </span>
    );
}

function roleClass(role: string) {
    return role === 'admin'
        ? 'bg-[#EAF3FF] text-[#0066AE]'
        : 'bg-[#E8FAFA] text-[#0B7778]';
}

function statusClass(status: string) {
    return status === 'active'
        ? 'bg-[#EAF8F0] text-[#00893D]'
        : status === 'pending'
          ? 'bg-[#FFF4EA] text-[#C9681E]'
          : 'bg-[#F1F5F8] text-[#7C7C7C]';
}

function avatarClass(role: string) {
    return role === 'admin'
        ? 'bg-[#DDEBFF] text-[#0066AE]'
        : 'bg-[#DDF8F9] text-[#0B7778]';
}

function errorText(error?: string) {
    if (!error) {
        return null;
    }

    return <p className="text-xs font-semibold text-[#D81313]">{error}</p>;
}

export default function UsersIndex({
    stats,
    users,
    filters,
    role_options,
    status_options,
    per_page_options,
}: UsersIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [role, setRole] = useState(filters.role ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [perPage, setPerPage] = useState(String(filters.per_page ?? 10));
    const [createOpen, setCreateOpen] = useState(false);
    const [resetUser, setResetUser] = useState<UserRow | null>(null);

    const createForm = useForm<CreateUserForm>({
        name: '',
        email: '',
        phone: '',
        role: 'enumerator',
        status: 'active',
        password: '',
        password_confirmation: '',
    });

    const resetForm = useForm<ResetPasswordForm>({
        password: '',
        password_confirmation: '',
    });

    function visitWithFilters(overrides: Partial<UserFilters> = {}) {
        const query = {
            search: overrides.search ?? search,
            role: overrides.role ?? role,
            status: overrides.status ?? status,
            per_page: overrides.per_page ?? Number(perPage),
        };

        router.get(usersIndex.url({ query }), {}, { preserveState: true });
    }

    function submitFilters(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        visitWithFilters();
    }

    function resetFilters() {
        setSearch('');
        setRole('');
        setStatus('');
        setPerPage('10');
        router.get(usersIndex.url(), {}, { preserveState: true });
    }

    function submitCreate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        createForm.post(storeUser.url(), {
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                setCreateOpen(false);
            },
        });
    }

    function openResetModal(user: UserRow) {
        resetForm.reset();
        resetForm.clearErrors();
        setResetUser(user);
    }

    function submitResetPassword(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!resetUser) {
            return;
        }

        resetForm.patch(resetUserPassword.url(resetUser.id), {
            preserveScroll: true,
            onSuccess: () => {
                resetForm.reset();
                setResetUser(null);
            },
        });
    }

    return (
        <>
            <Head title="Manajemen User" />
            <main className="min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-4 text-[#303030] sm:px-5 lg:px-6">
                <div className="mx-auto max-w-[1500px] space-y-4">
                    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <nav className="mb-1.5 flex items-center gap-2 text-xs font-bold">
                                <span className="text-[#0066AE]">
                                    Dashboard
                                </span>
                                <span className="text-[#7C7C7C]">/</span>
                                <span className="text-[#7C7C7C]">
                                    User Management
                                </span>
                            </nav>
                            <h1 className="text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]">
                                Manajemen User
                            </h1>
                            <p className="mt-1 text-sm leading-5 text-[#7C7C7C]">
                                Kelola akun admin dan enumerator yang terlibat
                                dalam program assessment desa wisata.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => setCreateOpen(true)}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.2)] transition hover:bg-[#093967]"
                            >
                                <Plus className="size-4" />
                                Tambah User
                            </button>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = statIcons[stat.icon] ?? Users;

                            return (
                                <article
                                    key={stat.label}
                                    className="flex min-h-[116px] items-center gap-4 rounded-xl border border-[#EFEFEF] bg-white p-5 shadow-[0_4px_12px_rgba(3,17,32,0.06)]"
                                >
                                    <div className="flex size-[58px] shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0066AE]">
                                        <Icon
                                            className="size-8"
                                            strokeWidth={1.9}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#303030]">
                                            {stat.label}
                                        </p>
                                        <p className="text-[32px] leading-9 font-bold text-[#0066AE]">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs leading-4 text-[#7C7C7C]">
                                            {stat.description}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </section>

                    <section className="rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_12px_rgba(3,17,32,0.05)]">
                        <form
                            onSubmit={submitFilters}
                            className="grid items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(300px,1fr)_170px_170px_auto_auto]"
                        >
                            <label className="flex h-11 min-w-0 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-[#7C7C7C]">
                                <Search className="size-4" />
                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7C7C7C]"
                                    placeholder="Cari nama user, email, atau nomor telepon..."
                                />
                            </label>

                            <label className="space-y-1">
                                <span className="block text-[11px] font-semibold text-[#7C7C7C]">
                                    Role
                                </span>
                                <Select
                                    value={role || 'all'}
                                    onValueChange={(value) =>
                                        setRole(value === 'all' ? '' : value)
                                    }
                                >
                                    <SelectTrigger className="h-11 w-full rounded-lg border-[#DDE4EC] bg-white text-sm font-semibold text-[#303030]">
                                        <SelectValue placeholder="Semua Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Semua Role
                                        </SelectItem>
                                        {role_options.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </label>

                            <label className="space-y-1">
                                <span className="block text-[11px] font-semibold text-[#7C7C7C]">
                                    Status
                                </span>
                                <Select
                                    value={status || 'all'}
                                    onValueChange={(value) =>
                                        setStatus(value === 'all' ? '' : value)
                                    }
                                >
                                    <SelectTrigger className="h-11 w-full rounded-lg border-[#DDE4EC] bg-white text-sm font-semibold text-[#303030]">
                                        <SelectValue placeholder="Semua Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Semua Status
                                        </SelectItem>
                                        {status_options.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </label>

                            <button className="h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_5px_12px_rgba(0,102,174,0.16)]">
                                Terapkan Filter
                            </button>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="h-11 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#0066AE]"
                            >
                                Reset
                            </button>
                        </form>
                    </section>

                    <div>
                        <section className="overflow-hidden rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_12px_rgba(3,17,32,0.06)]">
                            <div className="border-b border-[#EFEFEF] px-5 py-4">
                                <h2 className="text-lg font-bold text-[#303030]">
                                    Daftar User
                                </h2>
                                <p className="mt-0.5 text-sm text-[#7C7C7C]">
                                    Kelola akun pengguna yang memiliki akses ke
                                    platform CSR dan assessment desa wisata.
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                                    <thead className="bg-[#F8FBFF] text-[12px] text-[#093967]">
                                        <tr>
                                            {[
                                                'User',
                                                'Role',
                                                'Status',
                                                'Terakhir Diperbarui',
                                                'Aksi',
                                            ].map((head) => (
                                                <th
                                                    key={head}
                                                    className="px-3 py-3 font-bold whitespace-nowrap"
                                                >
                                                    {head}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#EFEFEF]">
                                        {users.data.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-4 py-10 text-center text-sm font-semibold text-[#7C7C7C]"
                                                >
                                                    Belum ada user yang sesuai
                                                    filter.
                                                </td>
                                            </tr>
                                        ) : (
                                            users.data.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="hover:bg-[#FAFCFF]"
                                                >
                                                    <td className="px-3 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                className={`flex size-9 items-center justify-center rounded-full text-sm font-bold ${avatarClass(user.role)}`}
                                                            >
                                                                {user.initials}
                                                            </span>
                                                            <span>
                                                                <span className="block font-bold text-[#303030]">
                                                                    {user.name}
                                                                </span>
                                                                <span className="block text-[12px] leading-4 text-[#093967]">
                                                                    {user.email}
                                                                </span>
                                                                <span className="block text-[12px] leading-4 text-[#7C7C7C]">
                                                                    {user.phone}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-3">
                                                        <Badge
                                                            className={roleClass(
                                                                user.role,
                                                            )}
                                                        >
                                                            {user.role_label}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-3 py-3">
                                                        <Badge
                                                            className={statusClass(
                                                                user.status,
                                                            )}
                                                        >
                                                            {user.status_label}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-3 py-3 font-medium text-[#303030]">
                                                        {user.updated_at}
                                                    </td>
                                                    <td className="px-3 py-3">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <button className="flex size-8 items-center justify-center rounded-md border border-[#DDE4EC] bg-[#F1F5F8] text-[#093967]">
                                                                    <MoreHorizontal className="size-4" />
                                                                </button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent
                                                                align="end"
                                                                className="w-48 rounded-lg border-[#EFEFEF] bg-white text-xs shadow-[0_12px_30px_rgba(3,17,32,0.14)]"
                                                            >
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        openResetModal(
                                                                            user,
                                                                        )
                                                                    }
                                                                    className="gap-2 text-xs"
                                                                >
                                                                    <KeyRound className="size-4 text-[#303030]" />
                                                                    Reset
                                                                    Password
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="gap-2 text-xs">
                                                                    <UserRound className="size-4 text-[#303030]" />
                                                                    Nonaktifkan
                                                                    User
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="gap-2 text-xs font-bold text-[#D81313]">
                                                                    <Trash2 className="size-4 text-[#D81313]" />
                                                                    Hapus User
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex flex-col gap-3 border-t border-[#EFEFEF] px-5 py-4 text-sm text-[#303030] lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <span>
                                        Menampilkan {users.from ?? 0}-
                                        {users.to ?? 0} dari {users.total} user
                                    </span>
                                    <Select
                                        value={perPage}
                                        onValueChange={(value) => {
                                            setPerPage(value);
                                            visitWithFilters({
                                                per_page: Number(value),
                                            });
                                        }}
                                    >
                                        <SelectTrigger className="h-9 w-[120px] rounded-lg border-[#DDE4EC] bg-white text-xs font-bold">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {per_page_options.map((option) => (
                                                <SelectItem
                                                    key={option}
                                                    value={String(option)}
                                                >
                                                    {option} / halaman
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {users.links.map((link, index) => (
                                        <button
                                            key={`${link.label}-${index}`}
                                            type="button"
                                            disabled={!link.url}
                                            onClick={() =>
                                                link.url &&
                                                router.get(
                                                    link.url,
                                                    {},
                                                    { preserveState: true },
                                                )
                                            }
                                            className={`h-9 rounded-lg border px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${
                                                link.active
                                                    ? 'border-[#0066AE] bg-[#0066AE] text-white'
                                                    : 'border-[#DDE4EC] bg-white text-[#303030]'
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-w-[560px] rounded-xl border-[#EFEFEF] bg-white p-0">
                    <form onSubmit={submitCreate}>
                        <DialogHeader className="border-b border-[#EFEFEF] px-5 py-4">
                            <DialogTitle className="text-lg font-bold text-[#303030]">
                                Tambah User
                            </DialogTitle>
                            <DialogDescription>
                                Buat akun baru untuk admin atau enumerator.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
                            <label className="space-y-1.5 sm:col-span-2">
                                <span className="text-xs font-bold text-[#303030]">
                                    Nama
                                </span>
                                <Input
                                    value={createForm.data.name}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'name',
                                            event.target.value,
                                        )
                                    }
                                    className="h-10 border-[#DDE4EC] text-sm"
                                    placeholder="Nama user"
                                />
                                {errorText(createForm.errors.name)}
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs font-bold text-[#303030]">
                                    Email
                                </span>
                                <Input
                                    type="email"
                                    value={createForm.data.email}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'email',
                                            event.target.value,
                                        )
                                    }
                                    className="h-10 border-[#DDE4EC] text-sm"
                                    placeholder="nama@email.com"
                                />
                                {errorText(createForm.errors.email)}
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs font-bold text-[#303030]">
                                    Telepon
                                </span>
                                <Input
                                    value={createForm.data.phone}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'phone',
                                            event.target.value,
                                        )
                                    }
                                    className="h-10 border-[#DDE4EC] text-sm"
                                    placeholder="08xx"
                                />
                                {errorText(createForm.errors.phone)}
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs font-bold text-[#303030]">
                                    Role
                                </span>
                                <Select
                                    value={createForm.data.role}
                                    onValueChange={(value) =>
                                        createForm.setData('role', value)
                                    }
                                >
                                    <SelectTrigger className="h-10 w-full border-[#DDE4EC]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {role_options.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errorText(createForm.errors.role)}
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs font-bold text-[#303030]">
                                    Status
                                </span>
                                <Select
                                    value={createForm.data.status}
                                    onValueChange={(value) =>
                                        createForm.setData('status', value)
                                    }
                                >
                                    <SelectTrigger className="h-10 w-full border-[#DDE4EC]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {status_options.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errorText(createForm.errors.status)}
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs font-bold text-[#303030]">
                                    Password
                                </span>
                                <Input
                                    type="password"
                                    value={createForm.data.password}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'password',
                                            event.target.value,
                                        )
                                    }
                                    className="h-10 border-[#DDE4EC] text-sm"
                                />
                                {errorText(createForm.errors.password)}
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs font-bold text-[#303030]">
                                    Konfirmasi Password
                                </span>
                                <Input
                                    type="password"
                                    value={
                                        createForm.data.password_confirmation
                                    }
                                    onChange={(event) =>
                                        createForm.setData(
                                            'password_confirmation',
                                            event.target.value,
                                        )
                                    }
                                    className="h-10 border-[#DDE4EC] text-sm"
                                />
                            </label>
                        </div>
                        <DialogFooter className="border-t border-[#EFEFEF] px-5 py-4">
                            <button
                                type="button"
                                onClick={() => setCreateOpen(false)}
                                className="h-10 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030]"
                            >
                                Batal
                            </button>
                            <button
                                disabled={createForm.processing}
                                className="h-10 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white disabled:opacity-60"
                            >
                                Simpan User
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog
                open={Boolean(resetUser)}
                onOpenChange={() => setResetUser(null)}
            >
                <DialogContent className="max-w-[460px] rounded-xl border-[#EFEFEF] bg-white p-0">
                    <form onSubmit={submitResetPassword}>
                        <DialogHeader className="border-b border-[#EFEFEF] px-5 py-4">
                            <DialogTitle className="text-lg font-bold text-[#303030]">
                                Reset Password
                            </DialogTitle>
                            <DialogDescription>
                                Ubah password untuk {resetUser?.name ?? 'user'}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 px-5 py-4">
                            <label className="space-y-1.5">
                                <span className="text-xs font-bold text-[#303030]">
                                    Password Baru
                                </span>
                                <Input
                                    type="password"
                                    value={resetForm.data.password}
                                    onChange={(event) =>
                                        resetForm.setData(
                                            'password',
                                            event.target.value,
                                        )
                                    }
                                    className="h-10 border-[#DDE4EC] text-sm"
                                />
                                {errorText(resetForm.errors.password)}
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-xs font-bold text-[#303030]">
                                    Konfirmasi Password
                                </span>
                                <Input
                                    type="password"
                                    value={resetForm.data.password_confirmation}
                                    onChange={(event) =>
                                        resetForm.setData(
                                            'password_confirmation',
                                            event.target.value,
                                        )
                                    }
                                    className="h-10 border-[#DDE4EC] text-sm"
                                />
                            </label>
                        </div>
                        <DialogFooter className="border-t border-[#EFEFEF] px-5 py-4">
                            <button
                                type="button"
                                onClick={() => setResetUser(null)}
                                className="h-10 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030]"
                            >
                                Batal
                            </button>
                            <button
                                disabled={resetForm.processing}
                                className="h-10 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white disabled:opacity-60"
                            >
                                Reset Password
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

UsersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'User Management', href: '#' },
    ],
};
