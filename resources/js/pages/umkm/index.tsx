import { Head, Link, router } from '@inertiajs/react';
import {
    CreditCard,
    Eye,
    MoreHorizontal,
    RotateCcw,
    Search,
    Send,
    Store,
    Tag,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

import {
    destroy as destroyUmkm,
    index as umkmIndex,
    restore as restoreUmkm,
} from '@/actions/App/Http/Controllers/UmkmController';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { dashboard, umkm as umkmRoute } from '@/routes';

type IconKey = 'store' | 'tag' | 'send' | 'credit-card';

type StatCard = {
    label: string;
    value: string;
    description: string;
    icon: IconKey;
};

type UmkmRow = {
    id: number;
    name: string;
    legal_business_name: string;
    business_owner_name: string;
    brand_name: string;
    product_category: string;
    total_score: number;
    has_exported: boolean;
    export_label: string;
    payment_label: string;
    photo_url: string | null;
    village_name: string;
    village_code: string;
    village_location: string;
    collector_name: string;
    documents_count: number;
    survey_answers_count: number;
    updated_at: string;
    is_trashed: boolean;
    detail_url: string | null;
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

type PaginatedUmkm = {
    data: UmkmRow[];
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
};

type UmkmFilters = {
    search: string;
    product_category: string | null;
    has_exported: string | null;
    view?: 'active' | 'trash' | null;
    per_page: number;
};

type UmkmIndexProps = {
    stats: StatCard[];
    umkms: PaginatedUmkm;
    filters: UmkmFilters;
    category_options: Option[];
    export_options: Option[];
    per_page_options: number[];
};

const statIcons = {
    store: Store,
    tag: Tag,
    send: Send,
    'credit-card': CreditCard,
} satisfies Record<IconKey, typeof Store>;

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

function exportClass(value: boolean) {
    return value
        ? 'bg-[#EAF8F0] text-[#00893D]'
        : 'bg-[#F1F5F8] text-[#7C7C7C]';
}

function paginationLabel(label: string) {
    return label
        .replace('&laquo; Previous', 'Previous')
        .replace('Next &raquo;', 'Next');
}

export default function UmkmIndex({
    stats,
    umkms,
    filters,
    category_options,
    export_options,
    per_page_options,
}: UmkmIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.product_category ?? '');
    const [hasExported, setHasExported] = useState(filters.has_exported ?? '');
    const [view, setView] = useState(filters.view ?? 'active');
    const [perPage, setPerPage] = useState(String(filters.per_page ?? 10));

    function visitWithFilters(overrides: Partial<UmkmFilters> = {}) {
        router.get(
            umkmIndex.url({
                query: {
                    search: (overrides.search ?? search) || undefined,
                    product_category:
                        (overrides.product_category ?? category) || undefined,
                    has_exported:
                        (overrides.has_exported ?? hasExported) || undefined,
                    view: overrides.view ?? view,
                    per_page: overrides.per_page ?? Number(perPage),
                },
            }),
            {},
            { preserveState: true },
        );
    }

    function submitFilters(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        visitWithFilters();
    }

    function resetFilters() {
        setSearch('');
        setCategory('');
        setHasExported('');
        setView('active');
        setPerPage('10');
        router.get(umkmIndex.url(), {}, { preserveState: true });
    }

    function changeView(nextView: 'active' | 'trash') {
        setView(nextView);
        visitWithFilters({ view: nextView });
    }

    function handleDelete(umkmId: number) {
        if (!window.confirm('Pindahkan data UMKM ini ke trash?')) {
            return;
        }

        router.delete(destroyUmkm.url(umkmId), { preserveScroll: true });
    }

    function handleRestore(umkmId: number) {
        if (!window.confirm('Pulihkan data UMKM ini dari trash?')) {
            return;
        }

        router.patch(restoreUmkm.url(umkmId), {}, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Manajemen UMKM" />
            <main className="min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-4 text-[#303030] sm:px-5 lg:px-6">
                <div className="mx-auto max-w-[1500px] space-y-4">
                    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <nav className="mb-1.5 flex items-center gap-2 text-xs font-bold">
                                <span className="text-[#0066AE]">
                                    Dashboard
                                </span>
                                <span className="text-[#7C7C7C]">/</span>
                                <span className="text-[#7C7C7C]">UMKM</span>
                            </nav>
                            <h1 className="text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]">
                                Manajemen UMKM
                            </h1>
                            <p className="mt-1 text-sm leading-5 text-[#7C7C7C]">
                                Pantau data pelaku UMKM, kategori produk,
                                pembayaran digital, dokumen, dan progress
                                assessment.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="inline-flex rounded-lg border border-[#DDE4EC] bg-white p-1">
                                <button
                                    type="button"
                                    onClick={() => changeView('active')}
                                    className={`rounded-md px-4 py-2 text-sm font-bold ${view === 'active' ? 'bg-[#0066AE] text-white' : 'text-[#0066AE]'}`}
                                >
                                    Data Aktif
                                </button>
                                <button
                                    type="button"
                                    onClick={() => changeView('trash')}
                                    className={`rounded-md px-4 py-2 text-sm font-bold ${view === 'trash' ? 'bg-[#093967] text-white' : 'text-[#7C7C7C]'}`}
                                >
                                    Trash
                                </button>
                            </div>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = statIcons[stat.icon] ?? Store;

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
                            className="grid items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(300px,1fr)_190px_170px_auto_auto]"
                        >
                            <label className="flex h-11 min-w-0 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-[#7C7C7C]">
                                <Search className="size-4" />
                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7C7C7C]"
                                    placeholder="Cari UMKM, pemilik, brand, kategori, atau desa..."
                                />
                            </label>

                            <label className="space-y-1">
                                <span className="block text-[11px] font-semibold text-[#7C7C7C]">
                                    Kategori
                                </span>
                                <Select
                                    value={category || 'all'}
                                    onValueChange={(value) =>
                                        setCategory(
                                            value === 'all' ? '' : value,
                                        )
                                    }
                                >
                                    <SelectTrigger className="h-11 w-full rounded-lg border-[#DDE4EC] bg-white text-sm font-semibold text-[#303030]">
                                        <SelectValue placeholder="Semua Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Semua Kategori
                                        </SelectItem>
                                        {category_options.map((option) => (
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
                                    Export
                                </span>
                                <Select
                                    value={hasExported || 'all'}
                                    onValueChange={(value) =>
                                        setHasExported(
                                            value === 'all' ? '' : value,
                                        )
                                    }
                                >
                                    <SelectTrigger className="h-11 w-full rounded-lg border-[#DDE4EC] bg-white text-sm font-semibold text-[#303030]">
                                        <SelectValue placeholder="Semua Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Semua Status
                                        </SelectItem>
                                        {export_options.map((option) => (
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

                    <section className="overflow-hidden rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_12px_rgba(3,17,32,0.06)]">
                        <div className="border-b border-[#EFEFEF] px-5 py-4">
                            <h2 className="text-lg font-bold text-[#303030]">
                                Daftar UMKM
                            </h2>
                            <p className="mt-0.5 text-sm text-[#7C7C7C]">
                                Data UMKM desa wisata dan status kelengkapan
                                assessment.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
                                <thead className="bg-[#F8FBFF] text-[12px] text-[#093967]">
                                    <tr>
                                        {[
                                            'UMKM',
                                            'Desa',
                                            'Kategori / Brand',
                                            'Total Skor',
                                            'Payment',
                                            'Export',
                                            'Dokumen',
                                            'Updated At',
                                            'Aksi',
                                        ].map((head) => (
                                            <th
                                                key={head}
                                                className={
                                                    head === 'Total Skor'
                                                        ? 'px-5 py-4 font-bold whitespace-nowrap bg-[#EAF3FF] text-[#0066AE] text-sm text-center'
                                                        : 'px-3 py-3 font-bold whitespace-nowrap'
                                                }
                                            >
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#EFEFEF]">
                                    {umkms.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={9}
                                                className="px-4 py-10 text-center text-sm font-semibold text-[#7C7C7C]"
                                            >
                                                Belum ada UMKM yang sesuai
                                                filter.
                                            </td>
                                        </tr>
                                    ) : (
                                        umkms.data.map((umkm) => (
                                            <tr
                                                key={umkm.id}
                                                className="hover:bg-[#FAFCFF]"
                                            >
                                                <td className="px-3 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#EAF3FF] text-[#0066AE]">
                                                            {umkm.photo_url ? (
                                                                <img
                                                                    src={
                                                                        umkm.photo_url
                                                                    }
                                                                    alt={
                                                                        umkm.name
                                                                    }
                                                                    className="size-full object-cover"
                                                                />
                                                            ) : (
                                                                <Store className="size-5" />
                                                            )}
                                                        </span>
                                                        <span className="min-w-0">
                                                            <span className="block font-bold text-[#303030]">
                                                                {umkm.name}
                                                            </span>
                                                            <span className="block text-[12px] text-[#7C7C7C]">
                                                                Pemilik:{' '}
                                                                {
                                                                    umkm.business_owner_name
                                                                }
                                                            </span>
                                                            <span className="block text-[12px] text-[#7C7C7C]">
                                                                Collector:{' '}
                                                                {
                                                                    umkm.collector_name
                                                                }
                                                            </span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span className="block font-bold text-[#303030]">
                                                        {umkm.village_name}
                                                    </span>
                                                    <span className="block text-[12px] text-[#093967]">
                                                        {umkm.village_code}
                                                    </span>
                                                    <span className="block text-[12px] text-[#7C7C7C]">
                                                        {umkm.village_location}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span className="block font-bold text-[#303030]">
                                                        {umkm.product_category}
                                                    </span>
                                                    <span className="block text-[12px] text-[#7C7C7C]">
                                                        Brand: {umkm.brand_name}
                                                    </span>
                                                </td>
                                                <td className="bg-[#F8FBFE] px-5 py-4 text-center text-sm font-black text-[#0066AE]">
                                                    {umkm.total_score.toLocaleString(
                                                        'id-ID',
                                                        {
                                                            maximumFractionDigits: 2,
                                                        },
                                                    )}
                                                </td>
                                                <td className="px-3 py-3 text-xs font-semibold text-[#303030]">
                                                    {umkm.payment_label}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <Badge
                                                        className={exportClass(
                                                            umkm.has_exported,
                                                        )}
                                                    >
                                                        {umkm.export_label}
                                                    </Badge>
                                                </td>
                                                <td className="px-3 py-3 text-xs font-semibold text-[#303030]">
                                                    {umkm.documents_count}{' '}
                                                    dokumen
                                                    <br />
                                                    {
                                                        umkm.survey_answers_count
                                                    }{' '}
                                                    jawaban
                                                </td>
                                                <td className="px-3 py-3 text-xs font-semibold text-[#7C7C7C]">
                                                    {umkm.updated_at}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white text-[#303030] hover:bg-[#F1F5F8]">
                                                            <MoreHorizontal className="size-4" />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            align="end"
                                                            className="w-44 rounded-lg"
                                                        >
                                                            {umkm.detail_url ? (
                                                                <DropdownMenuItem
                                                                    asChild
                                                                    className="gap-2 text-xs"
                                                                >
                                                                    <Link
                                                                        href={
                                                                            umkm.detail_url
                                                                        }
                                                                    >
                                                                        <Eye className="size-4" />
                                                                        Lihat
                                                                        Detail
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                            ) : (
                                                                <DropdownMenuItem
                                                                    disabled
                                                                    className="gap-2 text-xs"
                                                                >
                                                                    <Eye className="size-4" />
                                                                    Lihat Detail
                                                                </DropdownMenuItem>
                                                            )}
                                                            {umkm.is_trashed ? (
                                                                <DropdownMenuItem
                                                                    className="gap-2 text-xs font-bold text-[#00893D]"
                                                                    onSelect={(
                                                                        event,
                                                                    ) => {
                                                                        event.preventDefault();
                                                                        handleRestore(
                                                                            umkm.id,
                                                                        );
                                                                    }}
                                                                >
                                                                    <RotateCcw className="size-4 text-[#00893D]" />
                                                                    Pulihkan
                                                                </DropdownMenuItem>
                                                            ) : (
                                                                <DropdownMenuItem
                                                                    className="gap-2 text-xs font-bold text-[#D81313]"
                                                                    onSelect={(
                                                                        event,
                                                                    ) => {
                                                                        event.preventDefault();
                                                                        handleDelete(
                                                                            umkm.id,
                                                                        );
                                                                    }}
                                                                >
                                                                    <Trash2 className="size-4 text-[#D81313]" />
                                                                    Hapus
                                                                </DropdownMenuItem>
                                                            )}
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
                                    Menampilkan {umkms.from ?? 0}-
                                    {umkms.to ?? 0} dari {umkms.total} UMKM
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
                                {umkms.links.map((link, index) => (
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
                                        className={`h-9 rounded-lg border px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${link.active ? 'border-[#0066AE] bg-[#0066AE] text-white' : 'border-[#DDE4EC] bg-white text-[#303030]'}`}
                                    >
                                        {paginationLabel(link.label)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

UmkmIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'UMKM', href: umkmRoute() },
    ],
};
