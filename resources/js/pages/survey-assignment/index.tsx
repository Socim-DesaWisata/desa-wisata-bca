import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Activity,
    CheckCircle2,
    ClipboardCheck,
    ClipboardList,
    Download,
    Eye,
    FileSearch,
    MoreHorizontal,
    Pencil,
    Plus,
    RefreshCcw,
    Search,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

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
import { dashboard, surveyAssignments } from '@/routes';
import {
    store as storeSurveyAssignment,
    takeSurvey,
} from '@/routes/survey-assignments';

type StatCard = {
    label: string;
    value: string;
    description: string;
    icon: 'clipboard' | 'activity' | 'search' | 'check';
};

type AssignmentRow = {
    id: number;
    village_id: number;
    village_name: string;
    village_code: string;
    village_location: string;
    survey_template_id: number;
    template_title: string;
    template_status: string;
    status: string;
    status_label: string;
    assigned_by: number;
    assigned_by_name: string;
    submitted_by: number | null;
    submitted_by_name: string;
    reviewed_by: number | null;
    reviewed_by_name: string;
    assigned_at: string;
    started_at: string;
    last_saved_at: string;
    submitted_at: string;
    reviewed_at: string;
    created_at: string;
    updated_at: string;
    answers_count: number;
    documents_count: number;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedAssignments = {
    data: AssignmentRow[];
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
};

type Option = {
    value: string;
    label: string;
    description?: string;
};

type AssignmentFilters = {
    search: string;
    status: string | null;
    template_id: number | null;
    per_page: number;
};

type SurveyAssignmentIndexProps = {
    stats: StatCard[];
    assignments: PaginatedAssignments;
    filters: AssignmentFilters;
    status_options: Option[];
    template_options: Option[];
    village_options: Option[];
    user_options: Option[];
    per_page_options: number[];
};

type AssignmentForm = {
    village_id: string;
    survey_template_id: string;
    status: string;
    assigned_by: string;
    submitted_by: string;
    reviewed_by: string;
    assigned_at: string;
    started_at: string;
    last_saved_at: string;
    submitted_at: string;
    reviewed_at: string;
};

const statIcons = {
    clipboard: ClipboardCheck,
    activity: Activity,
    search: FileSearch,
    check: CheckCircle2,
};

const defaultForm: AssignmentForm = {
    village_id: '',
    survey_template_id: '',
    status: 'assigned',
    assigned_by: '',
    submitted_by: '',
    reviewed_by: '',
    assigned_at: '',
    started_at: '',
    last_saved_at: '',
    submitted_at: '',
    reviewed_at: '',
};

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function statusClass(status: string) {
    return (
        {
            assigned: 'bg-[#F1F5F8] text-[#0066AE]',
            in_progress: 'bg-[#EAF7FF] text-[#0066AE]',
            submitted: 'bg-[#EAF3FF] text-[#093967]',
            approved: 'bg-[#EAF8F0] text-[#00893D]',
            need_revision: 'bg-[#FFF4EA] text-[#C9681E]',
            rejected: 'bg-[#FDECEC] text-[#D81313]',
        }[status] ?? 'bg-[#F1F5F8] text-[#7C7C7C]'
    );
}

function paginationLabel(label: string) {
    return label
        .replace('&laquo; Previous', 'Previous')
        .replace('Next &raquo;', 'Next');
}

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

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return (
        <p className="mt-1 text-xs font-semibold text-[#D81313]">{message}</p>
    );
}

export default function SurveyAssignmentIndex({
    stats,
    assignments,
    filters,
    status_options,
    template_options,
    village_options,
    user_options,
    per_page_options,
}: SurveyAssignmentIndexProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [filterForm, setFilterForm] = useState({
        search: filters.search ?? '',
        status: filters.status ?? '',
        template_id: filters.template_id ? String(filters.template_id) : '',
        per_page: String(filters.per_page ?? 10),
    });
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<AssignmentForm>(defaultForm);

    function submitFilters(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        router.get(
            surveyAssignments.url(),
            {
                search: filterForm.search || undefined,
                status: filterForm.status || undefined,
                template_id: filterForm.template_id || undefined,
                per_page: filterForm.per_page || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    function resetFilters() {
        setFilterForm({
            search: '',
            status: '',
            template_id: '',
            per_page: '10',
        });

        router.get(surveyAssignments.url(), {}, { preserveScroll: true });
    }

    function openCreateModal() {
        reset();
        clearErrors();
        setIsCreateOpen(true);
    }

    function submitAssignment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post(storeSurveyAssignment.url(), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
                setIsCreateOpen(false);
            },
        });
    }

    function changePerPage(perPage: string) {
        setFilterForm((current) => ({
            ...current,
            per_page: perPage,
        }));

        router.get(
            surveyAssignments.url(),
            {
                search: filterForm.search || undefined,
                status: filterForm.status || undefined,
                template_id: filterForm.template_id || undefined,
                per_page: perPage,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    return (
        <>
            <Head title="Survey Assignment" />
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
                                    Survey Assignment
                                </span>
                            </nav>
                            <h1 className="text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]">
                                Survey Assignment
                            </h1>
                            <p className="mt-1 text-sm leading-5 text-[#7C7C7C]">
                                Pantau assignment survey desa wisata, status
                                pengerjaan, reviewer, dan riwayat waktu dari
                                database.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={openCreateModal}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.2)] transition hover:bg-[#093967]"
                            >
                                <Plus className="size-4" />
                                Tambah Assignment
                            </button>
                            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-5 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]">
                                <Download className="size-4" />
                                Export Data
                            </button>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = statIcons[stat.icon];

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

                    <form
                        onSubmit={submitFilters}
                        className="rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_12px_rgba(3,17,32,0.05)]"
                    >
                        <div className="grid items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(300px,1fr)_180px_minmax(230px,0.8fr)_auto_auto]">
                            <label className="flex h-11 min-w-0 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-[#7C7C7C]">
                                <Search className="size-4" />
                                <input
                                    value={filterForm.search}
                                    onChange={(event) =>
                                        setFilterForm((current) => ({
                                            ...current,
                                            search: event.target.value,
                                        }))
                                    }
                                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7C7C7C]"
                                    placeholder="Cari ID assignment, desa, kode desa, atau template..."
                                />
                            </label>

                            <label className="space-y-1">
                                <span className="block text-[11px] font-semibold text-[#7C7C7C]">
                                    Status
                                </span>
                                <select
                                    value={filterForm.status}
                                    onChange={(event) =>
                                        setFilterForm((current) => ({
                                            ...current,
                                            status: event.target.value,
                                        }))
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none"
                                >
                                    <option value="">Semua Status</option>
                                    {status_options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="space-y-1">
                                <span className="block text-[11px] font-semibold text-[#7C7C7C]">
                                    Template Survey
                                </span>
                                <select
                                    value={filterForm.template_id}
                                    onChange={(event) =>
                                        setFilterForm((current) => ({
                                            ...current,
                                            template_id: event.target.value,
                                        }))
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none"
                                >
                                    <option value="">Semua Template</option>
                                    {template_options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <button className="h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_5px_12px_rgba(0,102,174,0.16)]">
                                Terapkan
                            </button>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="h-11 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#0066AE]"
                            >
                                Reset
                            </button>
                        </div>
                    </form>

                    <section className="overflow-hidden rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_12px_rgba(3,17,32,0.06)]">
                        <div className="border-b border-[#EFEFEF] px-5 py-4">
                            <h2 className="text-lg font-bold text-[#303030]">
                                Daftar Survey Assignment
                            </h2>
                            <p className="mt-0.5 text-sm text-[#7C7C7C]">
                                Semua kolom utama dari tabel
                                village_survey_assignments ditampilkan di daftar
                                ini.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1680px] border-collapse text-left text-sm">
                                <thead className="bg-[#F8FBFF] text-[12px] text-[#093967]">
                                    <tr>
                                        {[
                                            'ID',
                                            'Desa',
                                            'Village ID',
                                            'Template',
                                            'Template ID',
                                            'Status',
                                            'Assigned By',
                                            'Submitted By',
                                            'Reviewed By',
                                            'Assigned At',
                                            'Started At',
                                            'Last Saved At',
                                            'Submitted At',
                                            'Reviewed At',
                                            'Created At',
                                            'Updated At',
                                            'Progress',
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
                                    {assignments.data.map((assignment) => (
                                        <tr
                                            key={assignment.id}
                                            className="hover:bg-[#FAFCFF]"
                                        >
                                            <td className="px-3 py-3 font-bold text-[#0066AE]">
                                                #{assignment.id}
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className="block font-bold text-[#303030]">
                                                    {assignment.village_name}
                                                </span>
                                                <span className="block text-[12px] leading-4 text-[#093967]">
                                                    {assignment.village_code}
                                                </span>
                                                <span className="block text-[12px] leading-4 text-[#7C7C7C]">
                                                    {
                                                        assignment.village_location
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 font-medium text-[#303030]">
                                                {assignment.village_id}
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className="block font-bold text-[#303030]">
                                                    {assignment.template_title}
                                                </span>
                                                <span className="block text-[12px] leading-4 text-[#7C7C7C]">
                                                    Status template:{' '}
                                                    {assignment.template_status}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 font-medium text-[#303030]">
                                                {assignment.survey_template_id}
                                            </td>
                                            <td className="px-3 py-3">
                                                <Badge
                                                    className={statusClass(
                                                        assignment.status,
                                                    )}
                                                >
                                                    {assignment.status_label}
                                                </Badge>
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className="block font-medium text-[#303030]">
                                                    {
                                                        assignment.assigned_by_name
                                                    }
                                                </span>
                                                <span className="block text-[12px] text-[#7C7C7C]">
                                                    ID {assignment.assigned_by}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className="block font-medium text-[#303030]">
                                                    {
                                                        assignment.submitted_by_name
                                                    }
                                                </span>
                                                <span className="block text-[12px] text-[#7C7C7C]">
                                                    {assignment.submitted_by
                                                        ? `ID ${assignment.submitted_by}`
                                                        : '-'}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className="block font-medium text-[#303030]">
                                                    {
                                                        assignment.reviewed_by_name
                                                    }
                                                </span>
                                                <span className="block text-[12px] text-[#7C7C7C]">
                                                    {assignment.reviewed_by
                                                        ? `ID ${assignment.reviewed_by}`
                                                        : '-'}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 font-medium text-[#303030]">
                                                {assignment.assigned_at}
                                            </td>
                                            <td className="px-3 py-3 font-medium text-[#303030]">
                                                {assignment.started_at}
                                            </td>
                                            <td className="px-3 py-3 font-medium text-[#303030]">
                                                {assignment.last_saved_at}
                                            </td>
                                            <td className="px-3 py-3 font-medium text-[#303030]">
                                                {assignment.submitted_at}
                                            </td>
                                            <td className="px-3 py-3 font-medium text-[#303030]">
                                                {assignment.reviewed_at}
                                            </td>
                                            <td className="px-3 py-3 font-medium text-[#303030]">
                                                {assignment.created_at}
                                            </td>
                                            <td className="px-3 py-3 font-medium text-[#303030]">
                                                {assignment.updated_at}
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className="block font-bold text-[#0066AE]">
                                                    {assignment.answers_count}{' '}
                                                    jawaban
                                                </span>
                                                <span className="block text-[12px] text-[#7C7C7C]">
                                                    {assignment.documents_count}{' '}
                                                    dokumen
                                                </span>
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
                                                        <DropdownMenuItem className="gap-2 text-xs">
                                                            <Eye className="size-4 text-[#303030]" />
                                                            Lihat Detail
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            asChild
                                                            className="gap-2 text-xs"
                                                        >
                                                            <Link
                                                                href={takeSurvey.url(
                                                                    assignment.id,
                                                                )}
                                                            >
                                                                <ClipboardList className="size-4 text-[#303030]" />
                                                                Take Survey
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="gap-2 text-xs">
                                                            <Pencil className="size-4 text-[#303030]" />
                                                            Edit Assignment
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="gap-2 text-xs">
                                                            <RefreshCcw className="size-4 text-[#303030]" />
                                                            Reset Status
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="gap-2 text-xs font-bold text-[#D81313]">
                                                            <Trash2 className="size-4 text-[#D81313]" />
                                                            Hapus Assignment
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {assignments.data.length === 0 && (
                            <div className="flex flex-col items-center px-6 py-14 text-center">
                                <span className="flex size-14 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]">
                                    <ClipboardCheck className="size-7" />
                                </span>
                                <h3 className="mt-4 text-lg font-bold text-[#303030]">
                                    Belum ada survey assignment
                                </h3>
                                <p className="mt-1 max-w-md text-sm leading-5 text-[#7C7C7C]">
                                    Assignment survey desa yang dibuat akan
                                    muncul di halaman ini.
                                </p>
                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white"
                                >
                                    <Plus className="size-4" />
                                    Tambah Assignment
                                </button>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 border-t border-[#EFEFEF] px-5 py-4 text-sm text-[#303030] lg:flex-row lg:items-center lg:justify-between">
                            <span>
                                Menampilkan {assignments.from ?? 0}-
                                {assignments.to ?? 0} dari {assignments.total}{' '}
                                assignment
                            </span>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <label className="flex items-center gap-2 text-sm font-semibold text-[#303030]">
                                    <span>Per page</span>
                                    <select
                                        value={filterForm.per_page}
                                        onChange={(event) =>
                                            changePerPage(event.target.value)
                                        }
                                        className="h-9 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030] outline-none"
                                    >
                                        {per_page_options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {assignments.links.map((link, index) => (
                                        <button
                                            key={`${link.label}-${index}`}
                                            type="button"
                                            disabled={!link.url}
                                            onClick={() =>
                                                link.url &&
                                                router.visit(link.url, {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                })
                                            }
                                            className={classNames(
                                                'h-9 rounded-lg border px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45',
                                                link.active
                                                    ? 'border-[#0066AE] bg-[#0066AE] text-white'
                                                    : 'border-[#DDE4EC] bg-white text-[#303030]',
                                            )}
                                        >
                                            {paginationLabel(link.label)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl sm:max-w-[860px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Survey Assignment</DialogTitle>
                        <DialogDescription>
                            Buat assignment survey untuk desa yang belum
                            memiliki assignment. Semua field mengikuti tabel
                            database.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submitAssignment} className="space-y-5">
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="space-y-1.5">
                                <span className="text-sm font-bold text-[#303030]">
                                    Desa
                                </span>
                                <select
                                    value={data.village_id}
                                    onChange={(event) =>
                                        setData(
                                            'village_id',
                                            event.target.value,
                                        )
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                >
                                    <option value="">Pilih Desa</option>
                                    {village_options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.description
                                                ? `${option.label} - ${option.description}`
                                                : option.label}
                                        </option>
                                    ))}
                                </select>
                                <FieldError message={errors.village_id} />
                            </label>

                            <label className="space-y-1.5">
                                <span className="text-sm font-bold text-[#303030]">
                                    Template Survey
                                </span>
                                <select
                                    value={data.survey_template_id}
                                    onChange={(event) =>
                                        setData(
                                            'survey_template_id',
                                            event.target.value,
                                        )
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                >
                                    <option value="">Pilih Template</option>
                                    {template_options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <FieldError
                                    message={errors.survey_template_id}
                                />
                            </label>

                            <label className="space-y-1.5">
                                <span className="text-sm font-bold text-[#303030]">
                                    Status
                                </span>
                                <select
                                    value={data.status}
                                    onChange={(event) =>
                                        setData('status', event.target.value)
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                >
                                    {status_options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <FieldError message={errors.status} />
                            </label>

                            <label className="space-y-1.5">
                                <span className="text-sm font-bold text-[#303030]">
                                    Assigned By
                                </span>
                                <select
                                    value={data.assigned_by}
                                    onChange={(event) =>
                                        setData(
                                            'assigned_by',
                                            event.target.value,
                                        )
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                >
                                    <option value="">Pilih User</option>
                                    {user_options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.description
                                                ? `${option.label} - ${option.description}`
                                                : option.label}
                                        </option>
                                    ))}
                                </select>
                                <FieldError message={errors.assigned_by} />
                            </label>

                            {[
                                ['submitted_by', 'Submitted By'],
                                ['reviewed_by', 'Reviewed By'],
                            ].map(([key, label]) => (
                                <label key={key} className="space-y-1.5">
                                    <span className="text-sm font-bold text-[#303030]">
                                        {label}
                                    </span>
                                    <select
                                        value={
                                            data[key as keyof AssignmentForm]
                                        }
                                        onChange={(event) =>
                                            setData(
                                                key as keyof AssignmentForm,
                                                event.target.value,
                                            )
                                        }
                                        className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                    >
                                        <option value="">Tidak Ada</option>
                                        {user_options.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.description
                                                    ? `${option.label} - ${option.description}`
                                                    : option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <FieldError
                                        message={
                                            errors[key as keyof AssignmentForm]
                                        }
                                    />
                                </label>
                            ))}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {[
                                ['assigned_at', 'Assigned At'],
                                ['started_at', 'Started At'],
                                ['last_saved_at', 'Last Saved At'],
                                ['submitted_at', 'Submitted At'],
                                ['reviewed_at', 'Reviewed At'],
                            ].map(([key, label]) => (
                                <label key={key} className="space-y-1.5">
                                    <span className="text-sm font-bold text-[#303030]">
                                        {label}
                                    </span>
                                    <input
                                        type="datetime-local"
                                        value={
                                            data[key as keyof AssignmentForm]
                                        }
                                        onChange={(event) =>
                                            setData(
                                                key as keyof AssignmentForm,
                                                event.target.value,
                                            )
                                        }
                                        className="h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                    />
                                    <FieldError
                                        message={
                                            errors[key as keyof AssignmentForm]
                                        }
                                    />
                                </label>
                            ))}
                        </div>

                        <DialogFooter>
                            <button
                                type="button"
                                onClick={() => setIsCreateOpen(false)}
                                className="h-11 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#303030]"
                            >
                                Batal
                            </button>
                            <button
                                disabled={processing}
                                className="h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white disabled:opacity-60"
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Assignment'}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

SurveyAssignmentIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Survey Assignment', href: surveyAssignments() },
    ],
};
