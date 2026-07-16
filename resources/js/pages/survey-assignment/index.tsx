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
    ExternalLink,
    ArrowRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    bulkUpdateStatus,
    destroy as destroySurveyAssignment,
    restore as restoreSurveyAssignment,
} from '@/actions/App/Http/Controllers/VillageSurveyAssignmentController';
import { dashboard, surveyAssignments } from '@/routes';
import {
    show as showSurveyAssignment,
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
    answers_count: number;
    documents_count: number;
    village_description: string | null;
    village_image_url: string | null;
    village_score_total: number;
    village_score_max: number;
    village_score_percent: number;
    village_category: string;
    village_category_label: string;
    village_category_description: string;
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
    jenis_desa?: string | null;
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

type BulkStatusForm = {
    assignment_ids: number[];
    status: string;
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

function ViewerVillageCarousel({
    assignments,
}: {
    assignments: AssignmentRow[];
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const villages = assignments.filter((assignment) => !assignment.is_trashed);

    useEffect(() => {
        if (villages.length <= 1 || isPaused) return;
        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % villages.length);
        }, 5000);
        return () => window.clearInterval(timer);
    }, [isPaused, villages.length]);

    useEffect(() => {
        if (activeIndex >= villages.length && villages.length > 0) {
            setActiveIndex(0);
        }
    }, [activeIndex, villages.length]);

    if (villages.length === 0) {
        return (
            <section className="flex min-h-[220px] items-center rounded-2xl border border-[#E1E7EE] bg-white px-6 shadow-[0_10px_24px_rgba(3,17,32,0.06)]">
                <div>
                    <p className="text-sm font-bold text-[#303030]">
                        Belum ada data desa wisata.
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                        Data desa akan tampil setelah assignment tersedia.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative overflow-hidden rounded-2xl border border-[#DDE4EC] bg-white shadow-[0_12px_30px_rgba(3,17,32,0.10)]"
        >
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {villages.map((assignment) => {
                        const progress = Math.min(
                            Math.max(assignment.village_score_percent, 0),
                            100,
                        );

                        return (
                            <article
                                key={assignment.id}
                                className="grid min-h-[220px] min-w-full lg:grid-cols-[44%_56%]"
                            >
                                <div className="relative min-h-[220px] overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#D9EAF7,#8AA5B8_55%,#17324F)]">
                                    {assignment.village_image_url && (
                                        <img
                                            src={assignment.village_image_url}
                                            alt={assignment.village_name}
                                            className="absolute inset-0 size-full object-cover"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#071C32]/65 via-[#071C32]/10 to-transparent" />
                                    <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-[#006F67] px-4 py-2 text-xs font-bold text-white shadow-lg">
                                        <span className="text-base">✦</span>{' '}
                                        Desa Wisata
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-col justify-between p-5 sm:p-6">
                                    <div>
                                        <h2 className="truncate text-2xl leading-tight font-bold tracking-[-0.02em] text-[#102A43] sm:text-3xl">
                                            {assignment.village_name}
                                        </h2>
                                        <div className="mt-4 grid gap-5 sm:grid-cols-[1.2fr_.8fr]">
                                            <div>
                                                <p className="text-xs font-bold text-[#526174]">
                                                    Skor Assessment Kemenpar
                                                </p>
                                                <p className="mt-2 text-4xl leading-none font-bold text-[#102A43]">
                                                    {
                                                        assignment.village_score_total
                                                    }
                                                    <span className="text-xl text-[#7C8795]">
                                                        {' '}
                                                        /{' '}
                                                        {
                                                            assignment.village_score_max
                                                        }
                                                    </span>
                                                </p>
                                                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#E1E6EB]">
                                                    <div
                                                        className="h-full rounded-full bg-[#149B75]"
                                                        style={{
                                                            width: `${progress}%`,
                                                        }}
                                                    />
                                                </div>
                                                <p className="mt-2 text-xs font-bold text-[#149B75]">
                                                    {progress}% dari skor
                                                    maksimum
                                                </p>
                                                <Link
                                                    href={
                                                        assignment.code
                                                            ? showSurveyAssignment.url(
                                                                  assignment.code,
                                                              )
                                                            : '#'
                                                    }
                                                    className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#102A43] px-5 text-xs font-bold text-white transition hover:bg-[#173E61]"
                                                >
                                                    Lihat Detail{' '}
                                                    <ArrowRight className="size-4" />
                                                </Link>
                                            </div>
                                            <div className="border-l border-[#E4E8ED] pl-5">
                                                <p className="text-xs font-bold text-[#526174]">
                                                    Kategori
                                                </p>
                                                <span className="mt-3 inline-flex rounded-lg bg-[#149B75] px-4 py-2 text-sm font-bold text-white">
                                                    {
                                                        assignment.village_category_label
                                                    }
                                                </span>
                                                <p className="mt-3 text-xs leading-5 text-[#526174]">
                                                    {
                                                        assignment.village_category_description
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
            {villages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {villages.map((village, index) => (
                        <button
                            key={village.id}
                            type="button"
                            aria-label={`Tampilkan ${village.village_name}`}
                            onClick={() => setActiveIndex(index)}
                            className={classNames(
                                'h-1.5 rounded-full transition-all',
                                index === activeIndex
                                    ? 'w-6 bg-white'
                                    : 'w-1.5 bg-white/60',
                            )}
                        />
                    ))}
                </div>
            )}
        </section>
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
    const isViewer = auth.user?.role === 'viewer';
    console.log(isViewer);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isBulkStatusOpen, setIsBulkStatusOpen] = useState(false);
    const [selectedAssignmentIds, setSelectedAssignmentIds] = useState<
        number[]
    >([]);
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
        jenis_desa: filters.jenis_desa ?? '',
    });
    const canBulkUpdate =
        !isEnumerator && !isViewer && filterForm.view !== 'trash';
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<AssignmentForm>(defaultForm);
    const {
        data: bulkData,
        setData: setBulkData,
        patch: patchBulkStatus,
        processing: isBulkProcessing,
        errors: bulkErrors,
        reset: resetBulkData,
        clearErrors: clearBulkErrors,
    } = useForm<BulkStatusForm>({ assignment_ids: [], status: '' });

    const visibleAssignmentIds = assignments.data.map(
        (assignment) => assignment.id,
    );
    const isAllVisibleSelected =
        visibleAssignmentIds.length > 0 &&
        visibleAssignmentIds.every((id) => selectedAssignmentIds.includes(id));

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
            jenis_desa: next.jenis_desa || undefined,
        };
    }

    function submitFilters(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSelectedAssignmentIds([]);

        router.get(surveyAssignments.url(), filterQuery(), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function resetFilters() {
        setSelectedAssignmentIds([]);
        setFilterForm({
            search: '',
            status: '',
            template_id: '',
            view: 'active',
            per_page: '10',
            sort_by: '',
            sort_direction: '',
            jenis_desa: '',
        });

        router.get(surveyAssignments.url(), {}, { preserveScroll: true });
    }

    function changeView(view: 'active' | 'trash') {
        setSelectedAssignmentIds([]);
        setFilterForm((current) => ({
            ...current,
            view,
        }));

        router.get(surveyAssignments.url(), filterQuery({ view }), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function toggleScoreSort() {
        setSelectedAssignmentIds([]);
        const sort_direction =
            filterForm.sort_by === 'total_score' &&
            filterForm.sort_direction === 'desc'
                ? 'asc'
                : 'desc';

        setFilterForm((current) => ({
            ...current,
            sort_by: 'total_score',
            sort_direction,
        }));

        router.get(
            surveyAssignments.url(),
            filterQuery({ sort_by: 'total_score', sort_direction }),
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    function scoreSortLabel() {
        if (filterForm.sort_by !== 'total_score') {
            return '↕';
        }

        return filterForm.sort_direction === 'asc' ? '↑' : '↓';
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
        setSelectedAssignmentIds([]);
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

    function toggleAssignmentSelection(assignmentId: number, checked: boolean) {
        setSelectedAssignmentIds((current) =>
            checked
                ? [...new Set([...current, assignmentId])]
                : current.filter((id) => id !== assignmentId),
        );
    }

    function toggleVisibleSelection(checked: boolean) {
        setSelectedAssignmentIds(checked ? visibleAssignmentIds : []);
    }

    function openBulkStatusModal() {
        if (selectedAssignmentIds.length === 0) {
            return;
        }

        resetBulkData();
        clearBulkErrors();
        setBulkData('assignment_ids', selectedAssignmentIds);
        setIsBulkStatusOpen(true);
    }

    function closeBulkStatusModal(open: boolean) {
        setIsBulkStatusOpen(open);

        if (!open) {
            resetBulkData();
            clearBulkErrors();
        }
    }

    function submitBulkStatus(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        patchBulkStatus(bulkUpdateStatus.url(), {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedAssignmentIds([]);
                closeBulkStatusModal(false);
            },
        });
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
                                    Assessment KEMENPAR
                                </span>
                            </nav>
                            <h1 className="text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]">
                                Assessment KEMENPAR
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
                            {!isEnumerator &&
                                !isViewer &&
                                filterForm.view !== 'trash' && (
                                    <button
                                        type="button"
                                        onClick={openCreateModal}
                                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-xs font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.2)] transition hover:bg-[#093967]"
                                    >
                                        <Plus className="size-4" />
                                        Tambah Assignment
                                    </button>
                                )}
                        </div>
                    </header>

                    {isViewer ? (
                        <ViewerVillageCarousel assignments={assignments.data} />
                    ) : (
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
                    )}

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
                                            : isViewer
                                              ? 'Nama, ID, Kode desa wisata..'
                                              : 'Cari ID assignment, desa, kode desa, atau template...'
                                    }
                                />
                            </label>

                            {!isViewer && (
                                <>
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
                                            <option value="">
                                                Semua Status
                                            </option>
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
                                                    template_id:
                                                        event.target.value,
                                                }))
                                            }
                                            className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none"
                                        >
                                            <option value="">
                                                Semua Template
                                            </option>
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
                                </>
                            )}
                            {isViewer && (
                                <label className="space-y-1">
                                    <span className="block text-[11px] font-semibold text-[#7C7C7C]">
                                        Kategori Desa
                                    </span>
                                    <select
                                        value={filterForm.jenis_desa}
                                        onChange={(event) =>
                                            setFilterForm((current) => ({
                                                ...current,
                                                jenis_desa: event.target.value,
                                            }))
                                        }
                                        className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none"
                                    >
                                        <option value="">Semua Kategori</option>
                                        <option value="mandiri">Mandiri</option>
                                        <option value="maju">Maju</option>
                                        <option value="berkembang">
                                            Berkembang
                                        </option>
                                        <option value="rintisan">
                                            Rintisan
                                        </option>
                                    </select>
                                </label>
                            )}

                            <button className="h-11 rounded-lg bg-[#0066AE] px-4 text-xs font-bold text-white shadow-[0_5px_12px_rgba(0,102,174,0.16)]">
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
                        <div className="flex flex-col gap-3 border-b border-[#EFEFEF] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-[#303030]">
                                    Daftar Desa Wisata Tools Assessment Kemenpar
                                </h2>
                                <p className="mt-0.5 text-sm text-[#7C7C7C]">
                                    Ringkasan assignment survey desa wisata dan
                                    progress pengisiannya.
                                </p>
                            </div>
                            {canBulkUpdate &&
                                selectedAssignmentIds.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={openBulkStatusModal}
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white"
                                    >
                                        Ubah Status (
                                        {selectedAssignmentIds.length})
                                    </button>
                                )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                                <thead className="bg-[#F8FBFF] text-[12px] text-[#093967]">
                                    <tr>
                                        {canBulkUpdate && (
                                            <th className="w-12 px-3 py-3 text-center">
                                                <Checkbox
                                                    checked={
                                                        isAllVisibleSelected
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        toggleVisibleSelection(
                                                            checked === true,
                                                        )
                                                    }
                                                    aria-label="Pilih semua assignment pada halaman ini"
                                                />
                                            </th>
                                        )}
                                        {[
                                            'ID',
                                            'Desa',
                                            ...(!isViewer
                                                ? ['Status', 'Created At']
                                                : []),
                                            'Total Skor',
                                            ...(!isViewer
                                                ? ['Progress', 'Aksi']
                                                : []),
                                        ].map((head) => (
                                            <th
                                                key={head}
                                                className={
                                                    head === 'Total Skor'
                                                        ? 'bg-[#EAF3FF] px-5 py-4 text-center text-sm font-bold whitespace-nowrap text-[#0066AE]'
                                                        : 'px-3 py-3 font-bold whitespace-nowrap'
                                                }
                                            >
                                                {head === 'Total Skor' ? (
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            toggleScoreSort
                                                        }
                                                        className="inline-flex items-center justify-center gap-1 font-bold text-[#0066AE]"
                                                    >
                                                        {head}
                                                        <span aria-hidden="true">
                                                            {scoreSortLabel()}
                                                        </span>
                                                    </button>
                                                ) : (
                                                    head
                                                )}
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
                                            {canBulkUpdate && (
                                                <td className="px-3 py-3 text-center">
                                                    <Checkbox
                                                        checked={selectedAssignmentIds.includes(
                                                            assignment.id,
                                                        )}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) =>
                                                            toggleAssignmentSelection(
                                                                assignment.id,
                                                                checked ===
                                                                    true,
                                                            )
                                                        }
                                                        aria-label={`Pilih ${assignment.village_name}`}
                                                    />
                                                </td>
                                            )}
                                            <td className="px-3 py-3 font-bold text-[#0066AE]">
                                                {isEnumerator
                                                    ? `#${assignment.id}`
                                                    : (assignment.code ??
                                                      `#${assignment.id}`)}
                                            </td>
                                            <td className="px-3 py-3">
                                                <Link
                                                    href={
                                                        assignment.code
                                                            ? showSurveyAssignment.url(
                                                                  assignment.code,
                                                              )
                                                            : '#'
                                                    }
                                                    className="flex items-center gap-2 font-bold text-[#0066AE] hover:text-[#093967]"
                                                >
                                                    {assignment.village_name}
                                                    {isViewer && (
                                                        <ExternalLink className="size-3 text-[#0066AE]" />
                                                    )}
                                                </Link>
                                                <span className="block text-[12px] leading-4 text-[#7C7C7C]">
                                                    {
                                                        assignment.village_location
                                                    }
                                                </span>
                                            </td>
                                            {!isViewer && (
                                                <>
                                                    <td className="px-3 py-3">
                                                        <Badge
                                                            className={statusClass(
                                                                assignment.status,
                                                            )}
                                                        >
                                                            {
                                                                assignment.status_label
                                                            }
                                                        </Badge>
                                                    </td>
                                                    <td className="px-3 py-3 font-medium text-[#303030]">
                                                        {assignment.created_at}
                                                    </td>
                                                </>
                                            )}
                                            <td className="bg-[#F8FBFE] px-5 py-4 text-center text-sm font-black text-[#0066AE]">
                                                {assignment.total_score.toFixed(
                                                    1,
                                                )}
                                            </td>
                                            {!isViewer && (
                                                <>
                                                    <td className="px-3 py-3">
                                                        <span className="block font-bold text-[#0066AE]">
                                                            {
                                                                assignment.answers_count
                                                            }{' '}
                                                            jawaban
                                                        </span>
                                                        <span className="block text-[12px] text-[#7C7C7C]">
                                                            {
                                                                assignment.documents_count
                                                            }{' '}
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
                                                                <DropdownMenuItem
                                                                    className="gap-2 text-xs"
                                                                    onSelect={(
                                                                        event,
                                                                    ) => {
                                                                        event.preventDefault();
                                                                        openAccessModal(
                                                                            assignment,
                                                                            'detail',
                                                                        );
                                                                    }}
                                                                >
                                                                    <Eye className="size-4 text-[#303030]" />
                                                                    Lihat Detail
                                                                </DropdownMenuItem>
                                                                {!isViewer && (
                                                                    <DropdownMenuItem
                                                                        className="gap-2 text-xs"
                                                                        onSelect={(
                                                                            event,
                                                                        ) => {
                                                                            event.preventDefault();
                                                                            openAccessModal(
                                                                                assignment,
                                                                                'take-survey',
                                                                            );
                                                                        }}
                                                                    >
                                                                        <ClipboardList className="size-4 text-[#303030]" />
                                                                        Take
                                                                        Survey
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {!isEnumerator &&
                                                                    !isViewer && (
                                                                        <>
                                                                            <DropdownMenuSeparator />
                                                                            {assignment.is_trashed ? (
                                                                                <DropdownMenuItem
                                                                                    className="gap-2 text-xs font-bold text-[#00893D]"
                                                                                    onSelect={(
                                                                                        event,
                                                                                    ) => {
                                                                                        event.preventDefault();
                                                                                        handleRestore(
                                                                                            assignment,
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <ClipboardCheck className="size-4 text-[#00893D]" />
                                                                                    Pulihkan
                                                                                    Assignment
                                                                                </DropdownMenuItem>
                                                                            ) : (
                                                                                <DropdownMenuItem
                                                                                    className="gap-2 text-xs font-bold text-[#D81313]"
                                                                                    onSelect={(
                                                                                        event,
                                                                                    ) => {
                                                                                        event.preventDefault();
                                                                                        handleDelete(
                                                                                            assignment,
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <Trash2 className="size-4 text-[#D81313]" />
                                                                                    Hapus
                                                                                    Assignment
                                                                                </DropdownMenuItem>
                                                                            )}
                                                                        </>
                                                                    )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </>
                                            )}
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
                                    Belum ada desa dengan pencarian / kategori
                                    tersebut
                                </h3>
                                {!isEnumerator && !isViewer && (
                                    <button
                                        type="button"
                                        onClick={openCreateModal}
                                        className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white"
                                    >
                                        <Plus className="size-4" />
                                        Tambah Assignment
                                    </button>
                                )}
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
                                                (setSelectedAssignmentIds([]),
                                                router.visit(link.url, {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                }))
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
                                className="h-11 rounded-lg bg-[#0066AE] px-4 text-xs font-bold text-white disabled:opacity-60"
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Assignment'}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isBulkStatusOpen} onOpenChange={closeBulkStatusModal}>
                <DialogContent className="rounded-2xl sm:max-w-[460px]">
                    <DialogHeader>
                        <DialogTitle>Ubah Status Survey</DialogTitle>
                        <DialogDescription>
                            Status baru akan diterapkan pada{' '}
                            {selectedAssignmentIds.length} survey assignment
                            yang dipilih.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submitBulkStatus} className="space-y-4">
                        <label className="space-y-1.5">
                            <span className="text-sm font-bold text-[#303030]">
                                Status Baru
                            </span>
                            <select
                                value={bulkData.status}
                                onChange={(event) =>
                                    setBulkData('status', event.target.value)
                                }
                                className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm outline-none focus:border-[#2FA6FC]"
                            >
                                <option value="">Pilih status</option>
                                {status_options.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <FieldError message={bulkErrors.status} />
                        </label>
                        <FieldError message={bulkErrors.assignment_ids} />

                        <DialogFooter>
                            <button
                                type="button"
                                onClick={() => closeBulkStatusModal(false)}
                                className="h-11 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#303030]"
                            >
                                Batal
                            </button>
                            <button
                                disabled={
                                    isBulkProcessing || bulkData.status === ''
                                }
                                className="h-11 rounded-lg bg-[#0066AE] px-4 text-xs font-bold text-white disabled:opacity-60"
                            >
                                {isBulkProcessing
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
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
                                className="h-11 rounded-lg bg-[#0066AE] px-4 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
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
