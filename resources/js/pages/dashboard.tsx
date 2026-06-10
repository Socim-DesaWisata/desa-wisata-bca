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
    X,
} from 'lucide-react';

import {
    dashboard,
    surveyAssignments,
    umkm,
    villages as villagesRoute,
} from '@/routes';
import { show as showSurveyAssignment } from '@/routes/survey-assignments';
import DashboardVillageMap from '@/components/dashboard-village-map';
import { DashboardCharts } from '@/components/dashboard-charts';

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

type VillageMapPoint = {
    id: number;
    code: string;
    name: string;
    city: string | null;
    province: string | null;
    district: string | null;
    subdistrict: string | null;
    latitude: number;
    longitude: number;
    status: string;
    manager_name: string | null;
    manager_phone: string | null;
    manager_email: string | null;
    umkm_count: number;
    pariwisata_count: number;
    location: string;
    url: string;
};

type DashboardProps = {
    dashboard_mode?: 'admin' | 'enumerator';
    kpis?: Kpi[];
    village_map_points?: VillageMapPoint[];
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
    const [mounted, setMounted] = useState(false);
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        setMounted(true);
        const timer = window.setInterval(() => setNow(new Date()), 1000);

        return () => window.clearInterval(timer);
    }, []);

    const time = new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).format(mounted ? now : new Date('2026-06-10T09:17:49'));
    const date = new Intl.DateTimeFormat('id-ID', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(mounted ? now : new Date('2026-06-10T09:17:49'));

    return (
        <section className="rounded-xl border border-[#0066AE] bg-[#0066AE] p-3.5 shadow-[0_4px_14px_rgba(0,102,174,0.3)] sm:p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm leading-5 font-semibold text-[#AAD2F8]">
                        Jam Sekarang
                    </p>
                    <p className="mt-2 font-tight text-[22px] leading-7 font-bold tracking-[-0.02em] text-white sm:text-[28px] sm:leading-8">
                        {time}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#EAF3FF]">
                        {date}
                    </p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white shadow-inner sm:size-11">
                    <Timer className="size-6" strokeWidth={1.9} />
                </span>
            </div>
        </section>
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
        <Panel className="flex h-full flex-col p-3.5 sm:p-4">
            <div className="mb-3">
                <h2 className="text-sm leading-6 font-bold text-[#303030]">
                    {title}
                </h2>
                <p className="text-xs leading-5 text-[#7C7C7C]">
                    {description}
                </p>
            </div>

            <div className="flex-1 overflow-x-auto rounded-lg border border-[#EFEFEF]">
                <table className="w-full border-collapse text-left text-xs">
                    <thead className="bg-[#F1F5F8] text-[10px] tracking-wider text-[#7C7C7C] uppercase">
                        <tr>
                            {['Survey', 'Skor'].map((head) => (
                                <th
                                    key={head}
                                    className="h-8 px-3 font-bold whitespace-nowrap"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEFEF] bg-white">
                        {rows.slice(0, 3).map((row) => (
                            <tr
                                key={row.id}
                                className="h-10 hover:bg-[#F7F7F7]"
                            >
                                <td className="px-3 font-semibold text-[#303030]">
                                    <div className="max-w-[150px] truncate">
                                        {row.name}
                                    </div>
                                </td>
                                <td className="px-3">
                                    <span className="inline-flex h-5 items-center justify-center rounded-full bg-[#EAF3FF] px-2 text-[10px] font-bold text-[#0066AE]">
                                        {row.score}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={2}
                                    className="px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]"
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
    village_map_points = [],
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
                                        Jika membutuhkan akses tambahan, hubungi
                                        admin platform.
                                    </p>
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
            </>
        );
    }

    const [showBanner, setShowBanner] = useState(true);

    return (
        <>
            <Head title="Dashboard Admin" />
            <div className="min-w-0 bg-[#F7F7F7] px-4 py-4 text-[#303030] sm:px-5 lg:px-6">
                <div className="mx-auto flex max-w-[1500px] flex-col gap-4">
                    <header className="mb-2 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                            <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-[#7C7C7C]">
                                <span>Dashboard</span>
                                <ChevronRight
                                    className="size-3.5"
                                    strokeWidth={2}
                                />
                                <span>Admin</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:shrink-0">
                            {/* Actions moved or removed to match reference */}
                        </div>
                    </header>

                    {showBanner && (
                        <div className="mb-2 flex items-center justify-between rounded-lg bg-[#0066AE] px-4 py-3 text-sm font-semibold text-white shadow-sm">
                            <div className="flex items-center gap-2">
                                <Info className="size-5" />
                                <span>
                                    Pantau assessment desa wisata dan program
                                    CSR BCA secara real-time dalam satu
                                    platform.
                                </span>
                            </div>
                            <button
                                onClick={() => setShowBanner(false)}
                                className="text-white hover:text-gray-200"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    )}

                    <section className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                            { type: 'time' },
                            { type: 'kpi', data: kpis[0] },
                            { type: 'kpi', data: kpis[1] },
                            { type: 'kpi', data: kpis[2] },
                        ].map((item, index) => {
                            if (item.type === 'time') {
                                return <CurrentTimeCard key="time" />;
                            }

                            const kpi = item.data!;
                            const Icon = kpiIcons[kpi.icon];
                            const trendColor =
                                kpi.tone === 'success'
                                    ? 'text-[#00893D]'
                                    : 'text-[#FF944C]';

                            return (
                                <Panel key={kpi.title} className="p-3.5 sm:p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="flex items-center gap-2 text-sm leading-5 font-bold text-[#303030]">
                                                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0066AE] text-white">
                                                    <Icon
                                                        className="size-4"
                                                        strokeWidth={2}
                                                    />
                                                </span>
                                                {kpi.title}
                                            </p>
                                            <p className="mt-3 text-[28px] leading-7 font-bold tracking-[-0.02em] text-[#303030] sm:text-[32px] sm:leading-8">
                                                {kpi.value}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between text-xs">
                                        <p className="font-medium text-[#7C7C7C]">
                                            {kpi.desc}
                                        </p>
                                        <p
                                            className={`flex items-center gap-1 font-bold ${trendColor}`}
                                        >
                                            <ArrowUpRight
                                                className="size-3.5"
                                                strokeWidth={2.2}
                                            />
                                            {kpi.trend}
                                        </p>
                                    </div>
                                </Panel>
                            );
                        })}
                    </section>

                    <DashboardCharts />

                    <div className="mb-2 grid grid-cols-1 gap-4 xl:grid-cols-3">
                        <div className="xl:col-span-2">
                            <DashboardVillageMap points={village_map_points} />
                        </div>
                        <div className="space-y-4 xl:col-span-1">
                            <Panel className="flex h-full flex-col p-4">
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <div>
                                        <h2 className="text-sm leading-6 font-bold text-[#303030]">
                                            Top Kategori UMKM
                                        </h2>
                                    </div>
                                    <select className="h-8 rounded-lg border border-[#EFEFEF] bg-white px-2 text-xs font-semibold text-[#7C7C7C] outline-none">
                                        <option>Minggu Ini</option>
                                        <option>Bulan Ini</option>
                                    </select>
                                </div>
                                <div className="flex flex-1 flex-col justify-center space-y-3">
                                    {top_umkm_categories.length > 0 ? (
                                        top_umkm_categories
                                            .slice(0, 4)
                                            .map((item, index) => (
                                                <div
                                                    key={item.category}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-3 text-center text-xs font-bold text-[#303030]">
                                                            {index + 1}
                                                        </span>
                                                        <span className="flex size-8 items-center justify-center rounded-full bg-[#F1F5F8] text-[#0066AE]">
                                                            <Store className="size-4" />
                                                        </span>
                                                        <span className="text-sm font-semibold text-[#303030]">
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm font-bold text-[#303030]">
                                                        {item.total}
                                                    </span>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="rounded-xl border border-dashed border-[#DCE3EA] bg-[#F8FBFE] px-3 py-6 text-center text-sm font-semibold text-[#7C7C7C]">
                                            Belum ada kategori UMKM.
                                        </div>
                                    )}
                                </div>
                                <Link href={umkm.url()} className="mt-4 flex w-full items-center justify-between rounded-lg bg-[#F8FBFE] px-4 py-2 text-xs font-bold text-[#0066AE] transition hover:bg-[#EAF3FF]">
                                    Lihat Semua Kategori{' '}
                                    <ChevronRight className="size-4" />
                                </Link>
                            </Panel>
                        </div>
                    </div>

                    <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Panel className="flex items-center overflow-hidden border-none bg-gradient-to-r from-[#F1F5F8] to-[#E2EEF8] p-0">
                            <div className="flex-1 p-5 pl-6">
                                <h3 className="mb-1 text-[17px] font-bold text-[#0066AE]">
                                    Dukung Desa Wisata, Dukung Indonesia
                                </h3>
                                <p className="mb-4 text-xs font-medium text-[#7C7C7C]">
                                    Kelola program CSR BCA dan bantu desa wisata
                                    tumbuh berkelanjutan.
                                </p>
                                <Link href={surveyAssignments.url()} className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#0066AE] px-5 text-xs font-bold text-white transition hover:bg-[#093967]">
                                    Kelola Program CSR{' '}
                                    <ArrowUpRight className="size-3.5" />
                                </Link>
                            </div>
                            <div className="w-1/3 max-w-[200px] min-w-[120px] opacity-90 mix-blend-multiply">
                                <img
                                    src="https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?q=80&w=600&auto=format&fit=crop"
                                    className="h-full w-full object-cover object-left"
                                    alt="CSR"
                                    onError={(e) =>
                                        (e.currentTarget.style.display = 'none')
                                    }
                                />
                            </div>
                        </Panel>

                        <Panel className="flex items-center overflow-hidden border-none bg-gradient-to-r from-[#F2FBF6] to-[#E1F6EB] p-0">
                            <div className="flex-1 p-5 pl-6">
                                <h3 className="mb-1 text-[17px] font-bold text-[#00893D]">
                                    Buat Assignment Survey Baru
                                </h3>
                                <p className="mb-4 text-xs font-medium text-[#7C7C7C]">
                                    Undang enumerator dan mulai assessment
                                    dengan mudah dan terstruktur.
                                </p>
                                <Link href={surveyAssignments.url()} className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#00893D] px-5 text-xs font-bold text-white transition hover:bg-[#006E31]">
                                    Buat Assignment{' '}
                                    <Plus className="size-3.5" />
                                </Link>
                            </div>
                            <div className="w-1/3 max-w-[200px] min-w-[120px] opacity-90 mix-blend-multiply">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
                                    className="h-full w-full object-cover object-left"
                                    alt="Survey"
                                    onError={(e) =>
                                        (e.currentTarget.style.display = 'none')
                                    }
                                />
                            </div>
                        </Panel>
                    </div>

                    <div className="mb-4 space-y-4">
                        <Panel className="p-3.5 sm:p-4">
                            <div className="mb-3 flex items-center justify-between gap-4">
                                <h2 className="text-base leading-6 font-bold text-[#303030]">
                                    Assignment Survey Terbaru
                                </h2>
                                <div className="flex gap-2">
                                    <button onClick={() => alert('Fitur Export segera hadir')} className="flex h-8 items-center gap-2 rounded-lg border border-[#EFEFEF] px-3 text-xs font-semibold text-[#303030] transition hover:bg-[#F7F7F7]">
                                        <ArrowDownToLine className="size-3.5" />{' '}
                                        Export Excel
                                    </button>
                                    <button onClick={() => alert('Fitur Export segera hadir')} className="flex h-8 items-center gap-2 rounded-lg border border-[#EFEFEF] px-3 text-xs font-semibold text-[#303030] transition hover:bg-[#F7F7F7]">
                                        <ArrowDownToLine className="size-3.5" />{' '}
                                        Export PDF
                                    </button>
                                    <Link
                                        href={surveyAssignments.url()}
                                        className="inline-flex h-8 items-center justify-center rounded-lg bg-[#F8FBFE] px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#EAF3FF]"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[880px] border-collapse text-left text-sm">
                                    <thead className="border-b border-[#EFEFEF] text-[11px] font-bold tracking-wider text-[#7C7C7C] uppercase">
                                        <tr>
                                            {[
                                                'Desa Wisata',
                                                'Lokasi',
                                                'Progress',
                                                'Status',
                                                'Enumerator',
                                                'Update Terakhir',
                                                'Aksi',
                                            ].map((head) => (
                                                <th
                                                    key={head}
                                                    className="h-10 px-2 font-bold whitespace-nowrap first:pl-0 last:pr-0"
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
                                                className="h-14 transition-colors hover:bg-[#F8FBFE]"
                                            >
                                                <td className="px-2 py-2 whitespace-nowrap first:pl-0">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                                                            <img
                                                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.village)}&background=random`}
                                                                alt={
                                                                    row.village
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <span className="font-bold text-[#303030]">
                                                            {row.village}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap">
                                                    <p className="text-xs text-[#303030]">
                                                        {row.location}
                                                    </p>
                                                </td>
                                                <td className="px-2 py-2">
                                                    <div className="flex w-24 flex-col gap-1">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            {row.progress}%
                                                        </span>
                                                        <span className="h-1.5 w-full overflow-hidden rounded-full bg-[#E6EEF5]">
                                                            <span
                                                                className="block h-full rounded-full bg-[#0066AE]"
                                                                style={{
                                                                    width: `${row.progress}%`,
                                                                }}
                                                            />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-2">
                                                    <span
                                                        className={`inline-flex h-6 min-w-20 items-center justify-center rounded-md px-2 text-[10px] font-bold ${statusClass(row.status)}`}
                                                    >
                                                        {row.status_label}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex -space-x-2">
                                                            <div className="z-20 size-6 rounded-full border-2 border-white bg-gray-300"></div>
                                                            <div className="z-10 size-6 rounded-full border-2 border-white bg-gray-400"></div>
                                                        </div>
                                                        {row.enumerators >
                                                            2 && (
                                                            <span className="ml-1 text-[10px] font-bold text-[#7C7C7C]">
                                                                +
                                                                {row.enumerators -
                                                                    2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-2 py-2 text-xs whitespace-nowrap text-[#303030]">
                                                    {row.updated_at}
                                                </td>
                                                <td className="px-2 py-2 text-center last:pr-0">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Link
                                                            href={showSurveyAssignment.url(
                                                                row.code,
                                                            )}
                                                            className="inline-flex size-7 items-center justify-center rounded hover:bg-[#F1F5F8]"
                                                            aria-label={`Detail ${row.village}`}
                                                        >
                                                            <Info className="size-4 text-[#7C7C7C]" />
                                                        </Link>
                                                        <button className="inline-flex size-7 items-center justify-center rounded hover:bg-[#F1F5F8]">
                                                            <MoreVertical className="size-4 text-[#7C7C7C]" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Panel>

                        <div className="flex items-start gap-3 rounded-xl border border-[#EAF3FF] bg-[#F8FBFE] p-4">
                            <Info
                                className="mt-0.5 size-5 shrink-0 text-[#0066AE]"
                                strokeWidth={2}
                            />
                            <div>
                                <h3 className="text-sm font-bold text-[#0066AE]">
                                    Important Notes
                                </h3>
                                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs font-medium text-[#0066AE]/80">
                                    <li>
                                        Pastikan setiap assignment survey
                                        memiliki minimal 2 enumerator.
                                    </li>
                                    <li>
                                        Update data desa dan UMKM secara berkala
                                        untuk menjaga akurasi laporan.
                                    </li>
                                    <li>
                                        Perhatikan status survey yang belum
                                        dimulai agar program berjalan tepat
                                        waktu.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
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
                                description="Skor tertinggi assessment Pariwisata."
                                rows={top_pariwisata_surveys}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <Panel className="p-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#303030]">
                                    Schedules
                                </h2>
                                <button className="flex items-center gap-1 text-xs font-bold text-[#0066AE]">
                                    <Plus className="size-3" /> Tambah Jadwal
                                </button>
                            </div>
                            <div className="mb-4">
                                <div className="mb-2 flex items-center justify-between px-2 text-sm font-bold text-[#303030]">
                                    <ChevronRight className="size-4 rotate-180 cursor-pointer" />
                                    Mei 2025
                                    <ChevronRight className="size-4 cursor-pointer" />
                                </div>
                                <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#7C7C7C]">
                                    <div>Su</div>
                                    <div>Mo</div>
                                    <div>Tu</div>
                                    <div>We</div>
                                    <div>Th</div>
                                    <div>Fr</div>
                                    <div>Sa</div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-[#303030]">
                                    <div className="text-[#DDE4EC]">27</div>
                                    <div className="text-[#DDE4EC]">28</div>
                                    <div className="text-[#DDE4EC]">29</div>
                                    <div className="text-[#DDE4EC]">30</div>
                                    <div>1</div>
                                    <div>2</div>
                                    <div>3</div>
                                    <div>4</div>
                                    <div>5</div>
                                    <div>6</div>
                                    <div>7</div>
                                    <div>8</div>
                                    <div>9</div>
                                    <div>10</div>
                                    <div>11</div>
                                    <div>12</div>
                                    <div>13</div>
                                    <div>14</div>
                                    <div>15</div>
                                    <div>16</div>
                                    <div>17</div>
                                    <div>18</div>
                                    <div>19</div>
                                    <div>20</div>
                                    <div>21</div>
                                    <div>22</div>
                                    <div className="rounded bg-[#0066AE] font-bold text-white">
                                        23
                                    </div>
                                    <div>24</div>
                                    <div>25</div>
                                    <div>26</div>
                                    <div>27</div>
                                    <div>28</div>
                                    <div>29</div>
                                    <div>30</div>
                                    <div>31</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs font-semibold text-[#303030]">
                                    <div className="flex items-center gap-2">
                                        <span className="size-2 rounded-full bg-[#00893D]"></span>
                                        Training Enumerator Batch 3
                                    </div>
                                    <span>09:00</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-semibold text-[#303030]">
                                    <div className="flex items-center gap-2">
                                        <span className="size-2 rounded-full bg-[#0066AE]"></span>
                                        Visitasi Desa Mulyosari
                                    </div>
                                    <span>11:00</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-semibold text-[#303030]">
                                    <div className="flex items-center gap-2">
                                        <span className="size-2 rounded-full bg-[#FF944C]"></span>
                                        Review Laporan CSR Q2
                                    </div>
                                    <span>14:00</span>
                                </div>
                            </div>
                        </Panel>

                        <Panel className="p-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#303030]">
                                    Recent Activities
                                </h2>
                                <Link href={surveyAssignments.url()} className="text-xs font-bold text-[#0066AE]">
                                    Lihat Semua
                                </Link>
                            </div>
                            <div className="space-y-4">
                                <div className="relative flex gap-3">
                                    <div className="absolute top-8 bottom-[-16px] left-[15px] w-[2px] bg-[#EFEFEF]"></div>
                                    <img
                                        src="/placeholder-avatar.jpg"
                                        className="z-10 size-8 rounded-full border-2 border-white object-cover"
                                        onError={(e) =>
                                            (e.currentTarget.src =
                                                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3ciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLXJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiLz48cGF0aCBkPSJNMjAgMjFhOCA4IDAgMCAwLTE2IDAiLz48L3N2Zz4=')
                                        }
                                    />
                                    <div className="flex-1 text-xs">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-bold text-[#303030]">
                                                    Budi Santoso
                                                </p>
                                                <p className="mt-0.5 leading-4 text-[#7C7C7C]">
                                                    menyelesaikan survey di
                                                    <br />
                                                    Desa Lontar
                                                </p>
                                            </div>
                                            <span className="flex size-5 items-center justify-center rounded-full bg-[#00893D] text-white">
                                                <CheckCircle2 className="size-3" />
                                            </span>
                                        </div>
                                        <p className="mt-1 text-[10px] text-[#A0A0A0]">
                                            23 Mei 2025, 16:10
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex gap-3">
                                    <div className="absolute top-8 bottom-[-16px] left-[15px] w-[2px] bg-[#EFEFEF]"></div>
                                    <img
                                        src="/placeholder-avatar.jpg"
                                        className="z-10 size-8 rounded-full border-2 border-white object-cover"
                                        onError={(e) =>
                                            (e.currentTarget.src =
                                                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3ciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLXJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiLz48cGF0aCBkPSJNMjAgMjFhOCA4IDAgMCAwLTE2IDAiLz48L3N2Zz4=')
                                        }
                                    />
                                    <div className="flex-1 text-xs">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-bold text-[#303030]">
                                                    Siti Nurhaliza
                                                </p>
                                                <p className="mt-0.5 leading-4 text-[#7C7C7C]">
                                                    mengupdate data UMKM
                                                    <br />
                                                    Desa Mulyosari
                                                </p>
                                            </div>
                                            <span className="flex size-5 items-center justify-center rounded-full bg-[#2FA6FC] text-white">
                                                <span className="size-2 rounded-full border border-current"></span>
                                            </span>
                                        </div>
                                        <p className="mt-1 text-[10px] text-[#A0A0A0]">
                                            23 Mei 2025, 14:35
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex gap-3">
                                    <div className="absolute top-8 bottom-[-16px] left-[15px] w-[2px] bg-[#EFEFEF]"></div>
                                    <img
                                        src="/placeholder-avatar.jpg"
                                        className="z-10 size-8 rounded-full border-2 border-white object-cover"
                                        onError={(e) =>
                                            (e.currentTarget.src =
                                                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3ciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLXJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiLz48cGF0aCBkPSJNMjAgMjFhOCA4IDAgMCAwLTE2IDAiLz48L3N2Zz4=')
                                        }
                                    />
                                    <div className="flex-1 text-xs">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-bold text-[#303030]">
                                                    Andi Pratama
                                                </p>
                                                <p className="mt-0.5 leading-4 text-[#7C7C7C]">
                                                    menambahkan program CSR
                                                    <br />
                                                    Pelatihan Digital UMKM
                                                </p>
                                            </div>
                                            <span className="flex size-5 items-center justify-center rounded-full bg-[#00893D] text-white">
                                                <Plus className="size-3" />
                                            </span>
                                        </div>
                                        <p className="mt-1 text-[10px] text-[#A0A0A0]">
                                            23 Mei 2025, 10:20
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex gap-3">
                                    <img
                                        src="/placeholder-avatar.jpg"
                                        className="z-10 size-8 rounded-full border-2 border-white object-cover"
                                        onError={(e) =>
                                            (e.currentTarget.src =
                                                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3ciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLXJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiLz48cGF0aCBkPSJNMjAgMjFhOCA4IDAgMCAwLTE2IDAiLz48L3N2Zz4=')
                                        }
                                    />
                                    <div className="flex-1 text-xs">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-bold text-[#303030]">
                                                    Dewi Anggraini
                                                </p>
                                                <p className="mt-0.5 leading-4 text-[#7C7C7C]">
                                                    mengunggah laporan
                                                    <br />
                                                    Assessment Desa Asri
                                                </p>
                                            </div>
                                            <span className="flex size-5 items-center justify-center rounded-full bg-[#0066AE] text-white">
                                                <ArrowUpRight className="size-3" />
                                            </span>
                                        </div>
                                        <p className="mt-1 text-[10px] text-[#A0A0A0]">
                                            22 Mei 2025, 17:45
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Panel>

                        <Panel className="p-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#303030]">
                                    Aktivitas Program
                                </h2>
                                <Link href={surveyAssignments.url()} className="text-xs font-bold text-[#0066AE]">
                                    Lihat Semua
                                </Link>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F8] text-[#0066AE]">
                                            <Store className="size-4" />
                                        </span>
                                        <div>
                                            <p className="text-xs font-bold text-[#303030]">
                                                Pelatihan Digital UMKM
                                            </p>
                                            <p className="text-[11px] text-[#7C7C7C]">
                                                Desa Mulyosari
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-[#00893D]">
                                            + Rp30.000.000
                                        </p>
                                        <span className="mt-0.5 inline-block rounded bg-[#EAF8F0] px-1.5 py-0.5 text-[9px] font-bold text-[#00893D]">
                                            Berjalan
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F8] text-[#0066AE]">
                                            <Store className="size-4" />
                                        </span>
                                        <div>
                                            <p className="text-xs font-bold text-[#303030]">
                                                Pengembangan Homestay
                                            </p>
                                            <p className="text-[11px] text-[#7C7C7C]">
                                                Keputih Desa Asri
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-[#00893D]">
                                            + Rp40.000.000
                                        </p>
                                        <span className="mt-0.5 inline-block rounded bg-[#EAF8F0] px-1.5 py-0.5 text-[9px] font-bold text-[#00893D]">
                                            Berjalan
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F8] text-[#0066AE]">
                                            <Ticket className="size-4" />
                                        </span>
                                        <div>
                                            <p className="text-xs font-bold text-[#303030]">
                                                Festival Kuliner Nusantara
                                            </p>
                                            <p className="text-[11px] text-[#7C7C7C]">
                                                Desa Lontar
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-[#0066AE]">
                                            - Rp15.000.000
                                        </p>
                                        <span className="mt-0.5 inline-block rounded bg-[#EAF3FF] px-1.5 py-0.5 text-[9px] font-bold text-[#0066AE]">
                                            Selesai
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F8] text-[#00893D]">
                                            <Store className="size-4" />
                                        </span>
                                        <div>
                                            <p className="text-xs font-bold text-[#303030]">
                                                Pengelolaan Sampah Desa
                                            </p>
                                            <p className="text-[11px] text-[#7C7C7C]">
                                                Desa Pakal
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-[#00893D]">
                                            + Rp25.000.000
                                        </p>
                                        <span className="mt-0.5 inline-block rounded bg-[#EAF8F0] px-1.5 py-0.5 text-[9px] font-bold text-[#00893D]">
                                            Berjalan
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#FDECEC] text-[#D81313]">
                                            <Store className="size-4" />
                                        </span>
                                        <div>
                                            <p className="text-xs font-bold text-[#303030]">
                                                Promosi Desa Wisata
                                            </p>
                                            <p className="text-[11px] text-[#7C7C7C]">
                                                Lidah Wetan
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-[#D81313]">
                                            - Rp10.000.000
                                        </p>
                                        <span className="mt-0.5 inline-block rounded bg-[#FDECEC] px-1.5 py-0.5 text-[9px] font-bold text-[#D81313]">
                                            Dibatalkan
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Panel>
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
