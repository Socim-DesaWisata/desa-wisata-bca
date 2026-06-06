import { Head, Link, usePage } from '@inertiajs/react';
import { Fragment, useEffect, useState } from 'react';
import {
    ArrowDownToLine,
    ArrowUpRight,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    ClipboardCheck,
    FileSearch,
    FileText,
    Info,
    MapPin,
    MoreVertical,
    Plus,
    Search,
    Store,
    Ticket,
    Timer,
    TrendingUp,
    UserRound,
} from 'lucide-react';

import {
    dashboard,
    surveyAssignments,
    villages as villagesRoute,
} from '@/routes';
import { show as showSurveyAssignment } from '@/routes/survey-assignments';

const colors = {
    blue100: '#F1F5F8',
    blue200: '#AAD2F8',
    blue400: '#2FA6FC',
    blue500: '#0066AE',
    blue700: '#093967',
    text: '#303030',
    muted: '#7C7C7C',
    border: '#EFEFEF',
    success: '#00893D',
    warning: '#FF944C',
    danger: '#D81313',
};

type Kpi = {
    title: string;
    value: string;
    desc: string;
    trend: string;
    icon: 'map' | 'clipboard' | 'search' | 'trending' | 'store' | 'ticket';
    tone: 'success' | 'warning';
};

type RecentAssignment = {
    id: number;
    code: string;
    village: string;
    location: string;
    progress: number;
    status: string;
    status_label: string;
    enumerators: number;
    updated_at: string;
};

type Priority = {
    value: string;
    text: string;
    icon: 'clipboard' | 'file' | 'calendar';
    tone: 'blue' | 'warning' | 'danger';
};

type TopUmkmCategory = {
    category: string;
    label: string;
    total: number;
};

type Activity = {
    title: string;
    time: string;
    icon: 'user' | 'check' | 'file' | 'plus' | 'clipboard';
    tone: 'success' | 'blue' | 'warning';
};

type TopSurveyRow = {
    id: number;
    name: string;
    meta: string;
    score: number;
    progress: number | null;
    answers: string;
    status: string;
    url: string | null;
};

type DashboardProps = {
    dashboard_mode?: 'admin' | 'enumerator';
    kpis?: Kpi[];
    top_village_surveys?: TopSurveyRow[];
    top_umkm_surveys?: TopSurveyRow[];
    top_pariwisata_surveys?: TopSurveyRow[];
    top_umkm_categories?: TopUmkmCategory[];
    recent_assignments?: RecentAssignment[];
    priorities?: Priority[];
    activities?: Activity[];
};

const kpiIcons = {
    map: MapPin,
    clipboard: ClipboardCheck,
    search: FileSearch,
    trending: TrendingUp,
    store: Store,
    ticket: Ticket,
};

const activityIcons = {
    user: UserRound,
    check: CheckCircle2,
    file: FileText,
    plus: Plus,
    clipboard: ClipboardCheck,
};

const toneColors = {
    success: colors.success,
    blue: colors.blue500,
    warning: colors.warning,
    danger: colors.danger,
};

const quickActions = [
    { label: 'Tambah Desa', icon: MapPin, href: villagesRoute.url() },
    {
        label: 'Buat Survey',
        icon: ClipboardCheck,
        href: surveyAssignments.url(),
    },
    {
        label: 'Review Jawaban',
        icon: Search,
        href: surveyAssignments.url({ query: { status: 'submitted' } }),
    },
    {
        label: 'Export Laporan',
        icon: ArrowDownToLine,
        href: surveyAssignments.url(),
    },
];

function statusClass(status: string) {
    if (status === 'submitted' || status === 'Submitted')
        return 'bg-[#EAF7FF] text-[#0066AE]';
    if (status === 'approved' || status === 'Approved')
        return 'bg-[#EAF8F0] text-[#00893D]';
    if (status === 'need_revision' || status === 'Need Revision')
        return 'bg-[#FFF4EA] text-[#C9681E]';
    if (status === 'rejected' || status === 'Rejected')
        return 'bg-[#FDECEC] text-[#D81313]';
    if (status === 'assigned' || status === 'Draft')
        return 'bg-[#F7F7F7] text-[#7C7C7C]';

    return 'bg-[#F1F5F8] text-[#0066AE]';
}

function CurrentTimeCard() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 1000);

        return () => window.clearInterval(timer);
    }, []);

    const time = new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).format(now);
    const date = new Intl.DateTimeFormat('id-ID', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(now);

    return (
        <Panel className="p-3.5 sm:p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm leading-5 font-semibold text-[#303030]">
                        Jam Sekarang
                    </p>
                    <p className="mt-2 font-tight text-[22px] leading-7 font-bold tracking-[-0.02em] text-[#303030] sm:text-[28px] sm:leading-8">
                        {time}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#7C7C7C]">
                        {date}
                    </p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F8] text-[#0066AE] sm:size-11">
                    <Timer className="size-6" strokeWidth={1.9} />
                </span>
            </div>
        </Panel>
    );
}

function Panel({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.06)] ${className}`}
        >
            {children}
        </section>
    );
}

function TopSurveyTable({
    title,
    description,
    rows,
}: {
    title: string;
    description: string;
    rows: TopSurveyRow[];
}) {
    return (
        <Panel className="p-3.5 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-base leading-6 font-bold text-[#303030]">
                        {title}
                    </h2>
                    <p className="text-xs leading-5 text-[#7C7C7C]">
                        {description}
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#EFEFEF]">
                <table className="w-full min-w-[880px] border-collapse text-left text-sm">
                    <thead className="bg-[#F1F5F8] text-xs text-[#303030]">
                        <tr>
                            {[
                                'Nama Survey',
                                'Info',
                                'Jawaban',
                                'Skor',
                                'Status',
                                'Aksi',
                            ].map((head) => (
                                    <th
                                        key={head}
                                        className="h-10 px-4 font-bold whitespace-nowrap"
                                    >
                                        {head}
                                    </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEFEF] bg-white">
                        {rows.map((row) => (
                            <tr key={row.id} className="h-12 hover:bg-[#F7F7F7]">
                                <td className="px-4 font-semibold whitespace-nowrap text-[#303030]">
                                    {row.name}
                                </td>
                                <td className="px-4 whitespace-nowrap text-[#303030]">
                                    {row.meta}
                                </td>
                                <td className="px-4 whitespace-nowrap text-[#303030]">
                                    {row.answers}
                                </td>
                                <td className="px-4 whitespace-nowrap text-[#303030]">
                                    <span className="inline-flex h-6 min-w-16 items-center justify-center rounded-full bg-[#EAF3FF] px-3 text-xs font-bold text-[#0066AE]">
                                        {row.score}
                                    </span>
                                </td>
                                <td className="px-4">
                                    <span className="inline-flex h-6 min-w-24 items-center justify-center rounded-full bg-[#F1F5F8] px-3 text-xs font-bold text-[#0066AE]">
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 text-center">
                                    {row.url ? (
                                        <Link
                                            href={row.url}
                                            className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-[#F1F5F8]"
                                            aria-label={`Detail ${row.name}`}
                                        >
                                            <MoreVertical className="size-4 text-[#7C7C7C]" />
                                        </Link>
                                    ) : (
                                        <span className="text-xs font-semibold text-[#B0B0B0]">
                                            -
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-8 text-center text-sm font-semibold text-[#7C7C7C]"
                                >
                                    Belum ada data.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Panel>
    );
}

export default function Dashboard({
    dashboard_mode = 'admin',
    kpis = [],
    top_village_surveys = [],
    top_umkm_surveys = [],
    top_pariwisata_surveys = [],
    top_umkm_categories = [],
    recent_assignments = [],
    activities = [],
}: DashboardProps) {
    const { auth } = usePage().props;

    if (dashboard_mode === 'enumerator') {
        return (
            <>
                <Head title="Dashboard Enumerator" />
                <div className="min-w-0 bg-[#F7F7F7] px-4 py-4 text-[#303030] sm:px-5 lg:px-6">
                    <div className="mx-auto flex max-w-[1500px] flex-col gap-4">
                        <header className="rounded-xl border border-[#EFEFEF] bg-white p-5 shadow-[0_4px_14px_rgba(3,17,32,0.06)] sm:p-6">
                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#7C7C7C]">
                                <span>Dashboard</span>
                                <ChevronRight
                                    className="size-3.5"
                                    strokeWidth={2}
                                />
                                <span>Enumerator</span>
                            </div>
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-[#0066AE]">
                                        Selamat datang,
                                    </p>
                                    <h1 className="mt-1 text-[24px] leading-8 font-bold tracking-[-0.01em] text-[#303030] sm:text-[30px] sm:leading-9">
                                        {auth.user.name}
                                    </h1>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7C7C7C]">
                                        Anda masuk sebagai enumerator. Gunakan
                                        menu Survey Assignment untuk melihat dan
                                        mengisi data assessment yang ditugaskan.
                                    </p>
                                </div>
                                <Link
                                    href={surveyAssignments.url()}
                                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] sm:w-auto"
                                >
                                    <ClipboardCheck
                                        className="size-4"
                                        strokeWidth={2}
                                    />
                                    Lihat Assignment
                                </Link>
                            </div>
                        </header>

                        <Panel className="p-5 sm:p-6">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F8] text-[#0066AE]">
                                    <Info className="size-5" strokeWidth={2} />
                                </span>
                                <div>
                                    <h2 className="text-base leading-6 font-bold text-[#303030]">
                                        Akses Enumerator
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-[#7C7C7C]">
                                        Menu dashboard admin, template survey,
                                        dan manajemen user dibatasi untuk admin.
                                        Jika membutuhkan akses tambahan,
                                        hubungi admin platform.
                                    </p>
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Dashboard Admin" />
            <div className="min-w-0 bg-[#F7F7F7] px-4 py-4 text-[#303030] sm:px-5 lg:px-6">
                <div className="mx-auto flex max-w-[1500px] flex-col gap-4">
                    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                            <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-[#7C7C7C]">
                                <span>Dashboard</span>
                                <ChevronRight
                                    className="size-3.5"
                                    strokeWidth={2}
                                />
                                <span>Admin</span>
                            </div>
                            <h1 className="text-[23px] leading-8 font-bold tracking-[-0.01em] text-[#303030] sm:text-[26px]">
                                Dashboard Admin
                            </h1>
                            <p className="mt-1 max-w-3xl text-sm leading-6 text-[#7C7C7C]">
                                Pantau perkembangan assessment, desa wisata
                                binaan, dan aktivitas program CSR.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:shrink-0">
                            <Link
                                href={surveyAssignments.url()}
                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] active:translate-y-[1px] sm:w-auto"
                            >
                                <Plus className="size-4" strokeWidth={2} />
                                Buat Assignment
                            </Link>
                            <Link
                                href={surveyAssignments.url()}
                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#AAD2F8] bg-white px-4 text-sm font-semibold text-[#0066AE] transition hover:bg-[#F1F5F8] active:translate-y-[1px] sm:w-auto"
                            >
                                <ArrowDownToLine
                                    className="size-4"
                                    strokeWidth={2}
                                />
                                Export Laporan
                            </Link>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {kpis.map((kpi, index) => {
                            const Icon = kpiIcons[kpi.icon];
                            const trendColor =
                                kpi.tone === 'success'
                                    ? 'text-[#00893D]'
                                    : 'text-[#FF944C]';

                            return (
                                <Fragment key={kpi.title}>
                                    <Panel className="p-3.5 sm:p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-sm leading-5 font-semibold text-[#303030]">
                                                    {kpi.title}
                                                </p>
                                                <p className="mt-2 text-[22px] leading-7 font-bold tracking-[-0.02em] text-[#303030] sm:text-[28px] sm:leading-8">
                                                    {kpi.value}
                                                </p>
                                                <p className="mt-1 text-xs leading-5 text-[#7C7C7C]">
                                                    {kpi.desc}
                                                </p>
                                            </div>
                                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F8] text-[#0066AE] sm:size-11">
                                                <Icon
                                                    className="size-6"
                                                    strokeWidth={1.9}
                                                />
                                            </span>
                                        </div>
                                        <p
                                            className={`mt-3 flex items-center gap-1 text-xs font-semibold ${trendColor}`}
                                        >
                                            <ArrowUpRight
                                                className="size-3.5"
                                                strokeWidth={2.2}
                                            />
                                            {kpi.trend}
                                        </p>
                                    </Panel>
                                    {index === 0 && <CurrentTimeCard />}
                                </Fragment>
                            );
                        })}
                    </section>

                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                        <main className="min-w-0 space-y-4 xl:col-span-8 2xl:col-span-9">
                            <div className="space-y-4">
                                <TopSurveyTable
                                    title="Top 3 Survey Desa"
                                    description="Skor tertinggi survey Kemenpar."
                                    rows={top_village_surveys}
                                />
                                <TopSurveyTable
                                    title="Top 3 Survey UMKM"
                                    description="Skor tertinggi assessment UMKM."
                                    rows={top_umkm_surveys}
                                />
                                <TopSurveyTable
                                    title="Top 3 Survey Pariwisata"
                                    description="Skor tertinggi survey ISTC."
                                    rows={top_pariwisata_surveys}
                                />
                            </div>

                            <Panel className="p-3.5 sm:p-4">
                                <div className="mb-3 flex items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-base leading-6 font-bold text-[#303030]">
                                            Assignment Survey Terbaru
                                        </h2>
                                        <p className="text-xs leading-5 text-[#7C7C7C]">
                                            Daftar progress assessment terbaru.
                                        </p>
                                    </div>
                                    <Link
                                        href={surveyAssignments.url()}
                                        className="hidden h-9 items-center gap-2 rounded-lg border border-[#AAD2F8] px-3 text-xs font-semibold text-[#0066AE] hover:bg-[#F1F5F8] md:inline-flex"
                                    >
                                        Lihat Semua
                                        <ChevronRight className="size-4" />
                                    </Link>
                                </div>

                                <div className="space-y-3 md:hidden">
                                    {recent_assignments.map((row) => (
                                        <article
                                            key={row.id}
                                            className="rounded-2xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_14px_rgba(3,17,32,0.05)]"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="truncate text-sm leading-5 font-bold text-[#303030]">
                                                        {row.village}
                                                    </h3>
                                                    <p className="mt-0.5 text-xs leading-5 text-[#7C7C7C]">
                                                        {row.location}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-[11px] font-bold ${statusClass(row.status)}`}
                                                >
                                                    {row.status_label}
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                <div className="mb-2 flex items-center justify-between text-xs">
                                                    <span className="font-semibold text-[#303030]">
                                                        Progress
                                                    </span>
                                                    <span className="font-bold text-[#0066AE]">
                                                        {row.progress}%
                                                    </span>
                                                </div>
                                                <div className="h-2 overflow-hidden rounded-full bg-[#E6EEF5]">
                                                    <div
                                                        className="h-full rounded-full bg-[#0066AE]"
                                                        style={{
                                                            width: `${row.progress}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4 grid grid-cols-2 gap-3 text-xs leading-5 text-[#7C7C7C]">
                                                <div>
                                                    <span className="block font-semibold text-[#303030]">
                                                        {row.enumerators}{' '}
                                                        enumerator
                                                    </span>
                                                    Enumerator
                                                </div>
                                                <div>
                                                    <span className="block font-semibold text-[#303030]">
                                                        {row.updated_at}
                                                    </span>
                                                    Diperbarui
                                                </div>
                                            </div>
                                            <div className="mt-4 flex gap-2">
                                                <Link
                                                    href={showSurveyAssignment.url(
                                                        row.code,
                                                    )}
                                                    className="inline-flex h-9 flex-1 items-center justify-center rounded-lg bg-[#0066AE] px-3 text-xs font-semibold text-white"
                                                >
                                                    Lihat Detail
                                                </Link>
                                                <button
                                                    className="flex size-9 items-center justify-center rounded-lg border border-[#EFEFEF] text-[#7C7C7C]"
                                                    aria-label={`Aksi ${row.village}`}
                                                >
                                                    <MoreVertical className="size-4" />
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                <div className="hidden overflow-x-auto rounded-lg border border-[#EFEFEF] md:block">
                                    <table className="w-full min-w-[880px] border-collapse text-left text-sm">
                                        <thead className="bg-[#F1F5F8] text-xs text-[#303030]">
                                            <tr>
                                                {[
                                                    'Desa Wisata',
                                                    'Lokasi',
                                                    'Progress',
                                                    'Status',
                                                    'Enumerator',
                                                    'Update',
                                                    'Aksi',
                                                ].map((head) => (
                                                    <th
                                                        key={head}
                                                        className="h-10 px-4 font-bold whitespace-nowrap"
                                                    >
                                                        {head}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#EFEFEF] bg-white">
                                            {recent_assignments.map((row) => (
                                                <tr
                                                    key={row.id}
                                                    className="h-12 hover:bg-[#F7F7F7]"
                                                >
                                                    <td className="px-4 font-semibold whitespace-nowrap text-[#303030]">
                                                        {row.village}
                                                    </td>
                                                    <td className="px-4 whitespace-nowrap text-[#303030]">
                                                        {row.location}
                                                    </td>
                                                    <td className="px-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-9 text-xs font-semibold text-[#303030]">
                                                                {row.progress}%
                                                            </span>
                                                            <span className="h-2 w-24 overflow-hidden rounded-full bg-[#E6EEF5]">
                                                                <span
                                                                    className="block h-full rounded-full bg-[#0066AE]"
                                                                    style={{
                                                                        width: `${row.progress}%`,
                                                                    }}
                                                                />
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4">
                                                        <span
                                                            className={`inline-flex h-6 min-w-24 items-center justify-center rounded-full px-3 text-xs font-bold ${statusClass(row.status)}`}
                                                        >
                                                            {row.status_label}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 whitespace-nowrap text-[#303030]">
                                                        {row.enumerators}{' '}
                                                        enumerator
                                                    </td>
                                                    <td className="px-4 whitespace-nowrap text-[#303030]">
                                                        {row.updated_at}
                                                    </td>
                                                    <td className="px-4 text-center">
                                                        <Link
                                                            href={showSurveyAssignment.url(
                                                                row.code,
                                                            )}
                                                            className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-[#F1F5F8]"
                                                            aria-label={`Detail ${row.village}`}
                                                        >
                                                            <MoreVertical className="size-4 text-[#7C7C7C]" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Panel>
                        </main>

                        <aside className="space-y-4 xl:col-span-4 2xl:col-span-3">
                            <Panel className="p-3.5 sm:p-4">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <div>
                                        <h2 className="text-base leading-6 font-bold text-[#303030]">
                                            Top Kategori UMKM
                                        </h2>
                                        <p className="text-xs leading-5 text-[#7C7C7C]">
                                            4 kategori terbanyak terdata
                                        </p>
                                    </div>
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]">
                                        <Store className="size-4" />
                                    </span>
                                </div>
                                {top_umkm_categories.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        {top_umkm_categories.map((item) => (
                                            <div
                                                key={item.category}
                                                className="min-w-0 rounded-xl border border-[#EFEFEF] bg-[#F8FBFE] p-3"
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <span className="min-w-0 text-xs leading-5 font-bold text-[#303030]">
                                                        {item.label}
                                                    </span>
                                                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-[#0066AE] ring-1 ring-[#AAD2F8]/50">
                                                        #{
                                                            top_umkm_categories.findIndex(
                                                                (category) =>
                                                                    category.category ===
                                                                    item.category,
                                                            ) + 1
                                                        }
                                                    </span>
                                                </div>
                                                <div className="mt-3 flex items-end gap-1">
                                                    <span className="text-2xl leading-none font-bold text-[#0066AE]">
                                                        {item.total}
                                                    </span>
                                                    <span className="text-xs font-semibold text-[#7C7C7C]">
                                                        UMKM
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-dashed border-[#DCE3EA] bg-[#F8FBFE] px-3 py-6 text-center text-sm font-semibold text-[#7C7C7C]">
                                        Belum ada kategori UMKM.
                                    </div>
                                )}
                            </Panel>

                            <Panel className="p-3.5 sm:p-4">
                                <h2 className="mb-3 text-base leading-6 font-bold text-[#303030]">
                                    Aktivitas Terbaru
                                </h2>
                                <div className="space-y-4">
                                    {activities.map((item) => {
                                        const Icon = activityIcons[item.icon];
                                        const color = toneColors[item.tone];
                                        return (
                                            <div
                                                key={item.title}
                                                className="flex gap-3"
                                            >
                                                <span
                                                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F1F5F8]"
                                                    style={{
                                                        color,
                                                    }}
                                                >
                                                    <Icon
                                                        className="size-4.5"
                                                        strokeWidth={2}
                                                    />
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="text-xs leading-5 font-semibold text-[#303030]">
                                                        {item.title}
                                                    </p>
                                                    <p className="mt-0.5 text-[11px] leading-4 text-[#7C7C7C]">
                                                        {item.time}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Panel>

                            <Panel className="p-3.5 sm:p-4">
                                <h2 className="mb-3 text-base leading-6 font-bold text-[#303030]">
                                    Quick Actions
                                </h2>
                                <div className="grid grid-cols-2 gap-2">
                                    {quickActions.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                href={item.href}
                                                key={item.label}
                                                className="flex min-h-16 flex-col items-start justify-between rounded-lg border border-[#EFEFEF] bg-white p-3 text-left transition hover:border-[#AAD2F8] hover:bg-[#F1F5F8]"
                                            >
                                                <Icon
                                                    className="size-5 text-[#0066AE]"
                                                    strokeWidth={2}
                                                />
                                                <span className="mt-2 text-xs leading-4 font-bold text-[#303030]">
                                                    {item.label}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </Panel>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
