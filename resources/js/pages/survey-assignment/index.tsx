import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Activity,
    CheckCircle2,
    ClipboardCheck,
    ClipboardList,
    Eye,
    FileSearch,
    MoreHorizontal,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';
import { useState, useMemo } from 'react';
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
import {
    destroy as destroySurveyAssignment,
    restore as restoreSurveyAssignment,
} from '@/actions/App/Http/Controllers/VillageSurveyAssignmentController';
import { dashboard, surveyAssignments } from '@/routes';
import {
    show as showSurveyAssignment,
    store as storeSurveyAssignment,
    takeSurvey,
} from '@/routes/survey-assignments';
import { SurveyAspectList } from '@/components/survey-aspect-list';
import { SortDropdown } from '@/components/sort-dropdown';

type StatCard = {
    label: string;
    value: string;
    description: string;
    icon: 'clipboard' | 'activity' | 'search' | 'check';
};

type AssignmentRow = {
    id: number;
    code: string | null;
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
    is_trashed: boolean;
    total_score: number;
    aspect_scores?: { aspect: string; score: number; max_score: number; raw_score: number }[];
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
    view?: 'active' | 'trash' | null;
    per_page: number;
    sort_by?: 'total_score' | null;
    sort_direction?: 'asc' | 'desc' | null;
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
    code: string;
    village_id: string;
    started_at: string;
};

type AccessAction = 'detail' | 'take-survey';

const statIcons = {
    clipboard: ClipboardCheck,
    activity: Activity,
    search: FileSearch,
    check: CheckCircle2,
};

const defaultForm: AssignmentForm = {
    code: '',
    village_id: '',
    started_at: '',
};

function normalizeAssignmentCode(value: string) {
    return value.trim().toUpperCase();
}

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
    per_page_options,
}: SurveyAssignmentIndexProps) {
    const { auth } = usePage().props;
    const isEnumerator = auth.user?.role === 'enumerator';
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isAccessOpen, setIsAccessOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] =
        useState<AssignmentRow | null>(null);
    const [selectedAction, setSelectedAction] =
        useState<AccessAction>('detail');
    const [accessCode, setAccessCode] = useState('');
    const [accessError, setAccessError] = useState('');
    const [filterForm, setFilterForm] = useState({
        search: filters.search ?? '',
        status: filters.status ?? '',
        template_id: filters.template_id ? String(filters.template_id) : '',
        view: filters.view ?? 'active',
        per_page: String(filters.per_page ?? 10),
        sort_by: filters.sort_by ?? '',
        sort_direction: filters.sort_direction ?? '',
    });
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<AssignmentForm>(defaultForm);

    const availableAspects = useMemo(() => {
        const aspects = new Set<string>();
        for (const assignment of assignments.data) {
            if (assignment.aspect_scores) {
                for (const aspect of assignment.aspect_scores) {
                    aspects.add(aspect.aspect);
                }
            }
        }
        return Array.from(aspects);
    }, [assignments.data]);

    function filterQuery(overrides: Partial<typeof filterForm> = {}) {
        const next = { ...filterForm, ...overrides };

        return {
            search: next.search || undefined,
            status: next.status || undefined,
            template_id: next.template_id || undefined,
            view: next.view || undefined,
            per_page: next.per_page || undefined,
            sort_by: next.sort_by || undefined,
            sort_direction: next.sort_direction || undefined,
        };
    }

    function submitFilters(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        router.get(surveyAssignments.url(), filterQuery(), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function resetFilters() {
        setFilterForm({
            search: '',
            status: '',
            template_id: '',
            view: 'active',
            per_page: '10',
            sort_by: '',
            sort_direction: '',
        });

        router.get(surveyAssignments.url(), {}, { preserveScroll: true });
    }

    function changeView(view: 'active' | 'trash') {
        setFilterForm((current) => ({
            ...current,
            view,
        }));

        router.get(surveyAssignments.url(), filterQuery({ view }), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function handleSort(sort_by: string, sort_direction: string) {
        setFilterForm((current) => ({
            ...current,
            sort_by,
            sort_direction,
        }));

        router.get(
            surveyAssignments.url(),
            filterQuery({ sort_by, sort_direction }),
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }
    function handleDelete(assignment: AssignmentRow) {
        if (
            !assignment.code ||
            !window.confirm('Pindahkan survey assignment ini ke trash?')
        ) {
            return;
        }

        router.delete(destroySurveyAssignment.url(assignment.code), {
            preserveScroll: true,
        });
    }

    function handleRestore(assignment: AssignmentRow) {
        if (
            !assignment.code ||
            !window.confirm('Pulihkan survey assignment ini dari trash?')
        ) {
            return;
        }

        router.patch(
            restoreSurveyAssignment.url(assignment.code),
            {},
            {
                preserveScroll: true,
            },
        );
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
            filterQuery({ per_page: perPage }),
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    function openAccessModal(assignment: AssignmentRow, action: AccessAction) {
        if (!isEnumerator) {
            if (!assignment.code) {
                setSelectedAssignment(assignment);
                setSelectedAction(action);
                setAccessCode('');
                setAccessError(
                    'Kode assignment belum tersedia. Hubungi admin.',
                );
                setIsAccessOpen(true);
                return;
            }

            router.visit(
                action === 'detail'
                    ? showSurveyAssignment.url(assignment.code)
                    : takeSurvey.url(assignment.code),
            );

            return;
        }

        setSelectedAssignment(assignment);
        setSelectedAction(action);
        setAccessCode('');
        setAccessError('');
        setIsAccessOpen(true);
    }

    function closeAccessModal(open: boolean) {
        setIsAccessOpen(open);

        if (!open) {
            setSelectedAssignment(null);
            setAccessCode('');
            setAccessError('');
        }
    }

    function submitAccess(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!selectedAssignment?.code) {
            setAccessError('Kode assignment belum tersedia. Hubungi admin.');
            return;
        }

        if (
            normalizeAssignmentCode(accessCode) !==
            normalizeAssignmentCode(selectedAssignment.code)
        ) {
            setAccessError('Kode assignment tidak sesuai.');
            return;
        }

        router.visit(
            selectedAction === 'detail'
                ? showSurveyAssignment.url(selectedAssignment.code)
                : takeSurvey.url(selectedAssignment.code),
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
                                    Survey KEMENPAR
                                </span>
                            </nav>
                            <h1 className="text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]">
                                Manajemen Survey KEMENPAR
                            </h1>
                            <p className="mt-1 text-sm leading-5 text-[#7C7C7C]">
                                Pantau KEMENPAR survey desa wisata, status
                                pengerjaan, reviewer, dan riwayat waktu dari
                                database.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="inline-flex rounded-lg border border-[#DDE4EC] bg-white p-1">
                                <button
                                    type="button"
                                    onClick={() => changeView('active')}
                                    className={`rounded-md px-4 py-2 text-sm font-bold ${filterForm.view === 'active' ? 'bg-[#0066AE] text-white' : 'text-[#0066AE]'}`}
                                >
                                    Data Aktif
                                </button>
                                <button
                                    type="button"
                                    onClick={() => changeView('trash')}
                                    className={`rounded-md px-4 py-2 text-sm font-bold ${filterForm.view === 'trash' ? 'bg-[#093967] text-white' : 'text-[#7C7C7C]'}`}
                                >
                                    Trash
                                </button>
                            </div>
                            {!isEnumerator && filterForm.view !== 'trash' && (
                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.2)] transition hover:bg-[#093967]"
                                >
                                    <Plus className="size-4" />
                                    Tambah Assignment
                                </button>
                            )}
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
                                    placeholder={
                                        isEnumerator
                                            ? 'Cari desa, kode desa, atau template...'
                                            : 'Cari ID assignment, desa, kode desa, atau template...'
                                    }
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

                    <div className="mb-4">
                        <SortDropdown
                            currentSort={filterForm.sort_by}
                            currentDirection={filterForm.sort_direction}
                            onSort={handleSort}
                            aspects={availableAspects}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        {assignments.data.map((assignment) => (
                            <section
                                key={assignment.id}
                                className="group relative overflow-hidden rounded-xl border border-[#EFEFEF] bg-white p-5 shadow-[0_4px_16px_rgba(3,17,32,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(3,17,32,0.08)]"
                            >
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                    {/* Left: Village Details */}
                                    <div className="flex flex-1 flex-col gap-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="inline-flex items-center rounded bg-[#F1F5F8] px-2 py-0.5 text-xs font-bold text-[#0066AE]">
                                                        {isEnumerator ? `#${assignment.id}` : (assignment.code ?? `#${assignment.id}`)}
                                                    </span>
                                                    <Badge className={statusClass(assignment.status)}>
                                                        {assignment.status_label}
                                                    </Badge>
                                                </div>
                                                <h3 className="text-lg font-black text-[#303030] group-hover:text-[#0066AE] transition-colors">
                                                    {assignment.village_name}
                                                </h3>
                                                <p className="mt-0.5 text-[13px] font-medium text-[#7C7C7C]">
                                                    {assignment.village_location}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 text-xs">
                                            <div className="flex items-center gap-1.5 text-[#667085]">
                                                <span className="font-semibold">Diperbarui:</span>
                                                <span>{assignment.updated_at}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[#667085]">
                                                <span className="font-semibold">Dibuat:</span>
                                                <span>{assignment.created_at}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle: Survey Aspects */}
                                    <div className="w-full lg:w-[380px] shrink-0">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-[13px] font-bold text-[#303030]">Aspek Survey</span>
                                            <span className="text-[12px] font-semibold text-[#0066AE] bg-[#EAF7FF] px-2 py-0.5 rounded-full">
                                                {assignment.answers_count} Jawaban
                                            </span>
                                        </div>
                                        <SurveyAspectList aspects={assignment.aspect_scores || []} />
                                    </div>

                                    {/* Right: Score & Actions */}
                                    <div className="flex flex-row items-center justify-between gap-4 border-t border-[#EFEFEF] pt-4 lg:w-[200px] lg:shrink-0 lg:flex-col lg:items-end lg:justify-start lg:border-t-0 lg:border-l lg:pl-5 lg:pt-0">
                                        <div className="flex flex-col lg:items-end">
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7C7C]">Total Skor</span>
                                            <div className="mt-1 text-3xl font-black text-[#0066AE]">
                                                {assignment.total_score.toFixed(1)}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 w-full mt-auto">
                                            <button
                                                onClick={() => openAccessModal(assignment, 'take-survey')}
                                                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0066AE] px-3 py-2 text-xs font-bold text-white shadow-[0_4px_10px_rgba(0,102,174,0.18)] transition-all hover:bg-[#093967] active:scale-95"
                                            >
                                                <ClipboardList className="size-4" />
                                                Isi Survey
                                            </button>
                                            
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white text-[#667085] hover:bg-[#F8FAFC] active:scale-95 transition-all">
                                                        <MoreHorizontal className="size-4" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 rounded-lg border-[#EFEFEF] bg-white text-xs shadow-[0_12px_30px_rgba(3,17,32,0.14)]">
                                                    <DropdownMenuItem className="gap-2 text-xs" onSelect={(e) => { e.preventDefault(); openAccessModal(assignment, 'detail'); }}>
                                                        <Eye className="size-4 text-[#303030]" />
                                                        Lihat Detail
                                                    </DropdownMenuItem>
                                                    {!isEnumerator && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            {assignment.is_trashed ? (
                                                                <DropdownMenuItem className="gap-2 text-xs font-bold text-[#00893D]" onSelect={(e) => { e.preventDefault(); handleRestore(assignment); }}>
                                                                    <ClipboardCheck className="size-4 text-[#00893D]" />
                                                                    Pulihkan Assignment
                                                                </DropdownMenuItem>
                                                            ) : (
                                                                <DropdownMenuItem className="gap-2 text-xs font-bold text-[#D81313]" onSelect={(e) => { e.preventDefault(); handleDelete(assignment); }}>
                                                                    <Trash2 className="size-4 text-[#D81313]" />
                                                                    Hapus Assignment
                                                                </DropdownMenuItem>
                                                            )}
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}

                        {assignments.data.length === 0 && (
                            <div className="flex flex-col items-center rounded-xl border border-[#EFEFEF] bg-white px-6 py-14 text-center shadow-[0_4px_12px_rgba(3,17,32,0.06)]">
                                <span className="flex size-16 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]">
                                    <ClipboardCheck className="size-8" />
                                </span>
                                <h3 className="mt-5 text-lg font-bold text-[#303030]">
                                    Belum ada survey assignment
                                </h3>
                                <p className="mt-1.5 max-w-md text-sm leading-5 text-[#7C7C7C]">
                                    Assignment survey desa yang dibuat akan muncul di sini.
                                </p>
                                {!isEnumerator && (
                                    <button
                                        type="button"
                                        onClick={openCreateModal}
                                        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_5px_14px_rgba(0,102,174,0.18)] hover:bg-[#093967] transition-all"
                                    >
                                        <Plus className="size-4" />
                                        Tambah Assignment
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                        <div className="flex flex-col gap-3 rounded-xl border border-[#EFEFEF] bg-white px-5 py-4 text-sm text-[#303030] lg:flex-row lg:items-center lg:justify-between shadow-[0_4px_12px_rgba(3,17,32,0.06)]">
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
                </div>
            </main>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl sm:max-w-[860px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Survey Assignment</DialogTitle>
                        <DialogDescription>
                            Isi kode assignment, pilih desa, dan jadwal mulai.
                            Template aktif terbaru, status, assigned by, dan
                            assigned at diisi otomatis oleh sistem.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submitAssignment} className="space-y-5">
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="space-y-1.5">
                                <span className="text-sm font-bold text-[#303030]">
                                    Kode Assignment
                                </span>
                                <input
                                    value={data.code}
                                    onChange={(event) =>
                                        setData(
                                            'code',
                                            event.target.value.toUpperCase(),
                                        )
                                    }
                                    placeholder="Contoh: ASG-001"
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                />
                                <p className="text-[11px] font-semibold text-[#7C7C7C]">
                                    Gunakan huruf kapital, angka, dan tanda
                                    hubung.
                                </p>
                                <FieldError message={errors.code} />
                            </label>

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
                                    Started At
                                </span>
                                <input
                                    type="datetime-local"
                                    value={data.started_at}
                                    onChange={(event) =>
                                        setData(
                                            'started_at',
                                            event.target.value,
                                        )
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                />
                                <FieldError message={errors.started_at} />
                            </label>
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

            <Dialog open={isAccessOpen} onOpenChange={closeAccessModal}>
                <DialogContent className="rounded-2xl sm:max-w-[460px]">
                    <DialogHeader>
                        <DialogTitle>Verifikasi Kode Assignment</DialogTitle>
                        <DialogDescription>
                            Masukkan kode survey assignment untuk mengakses{' '}
                            {selectedAction === 'detail'
                                ? 'detail assignment'
                                : 'halaman take survey'}
                            .
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submitAccess} className="space-y-4">
                        <div className="rounded-xl border border-[#EFEFEF] bg-[#F8FBFF] p-4">
                            <p className="text-sm font-bold text-[#303030]">
                                {selectedAssignment?.village_name ?? '-'}
                            </p>
                            <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                {selectedAssignment?.village_code ?? '-'} ·{' '}
                                {selectedAssignment?.village_location ?? '-'}
                            </p>
                        </div>

                        <label className="space-y-1.5">
                            <span className="text-sm font-bold text-[#303030]">
                                Kode Assignment
                            </span>
                            <input
                                autoFocus
                                value={accessCode}
                                onChange={(event) => {
                                    setAccessCode(
                                        event.target.value.toUpperCase(),
                                    );
                                    setAccessError('');
                                }}
                                placeholder="Contoh: ASG-001"
                                className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm outline-none focus:border-[#2FA6FC]"
                            />
                            {accessError && (
                                <p className="text-xs font-semibold text-[#D81313]">
                                    {accessError}
                                </p>
                            )}
                        </label>

                        <DialogFooter>
                            <button
                                type="button"
                                onClick={() => closeAccessModal(false)}
                                className="h-11 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#303030]"
                            >
                                Batal
                            </button>
                            <button
                                disabled={accessCode.trim() === ''}
                                className="h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Masuk
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
