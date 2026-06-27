import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    ArrowUpRight,
    ChevronRight,
    ClipboardCheck,
    FileSearch,
    Eye,
    Info,
    MapPin,
    Store,
    Ticket,
    Timer,
    TrendingUp,
    X,
    ArrowRight,
} from 'lucide-react';

import {
    dashboard,
    surveyAssignments,
    umkm,
    villages as villagesRoute,
} from '@/routes';
import { show as showSurveyAssignment } from '@/routes/survey-assignments';
import DashboardVillageMap from '@/components/dashboard-village-map';
import {
    DashboardCharts,
    AssessmentRadarChart,
} from '@/components/dashboard-charts';
import { DashboardOmsetCharts } from '@/components/dashboard-omset-charts';

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
    status: string;
    status_label: string;
    updated_at: string;
    aspect_scores?: { aspect: string; score: number }[];
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
    status_label?: string;
    url: string | null;
    aspect_scores?: { aspect: string; score: number }[];
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
    top_umkm_turnovers?: TopSurveyRow[];
    top_pariwisata_turnovers?: TopSurveyRow[];
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
    style,
}: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <section
            className={`rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.06)] ${className}`}
            style={style}
        >
            {children}
        </section>
    );
}

function TopStatisticList({
    title,
    icon: Icon,
    data,
    linkHref,
    linkLabel,
}: {
    title: string;
    icon: any;
    data: { label: string; value: number | string }[];
    linkHref: string;
    linkLabel: string;
}) {
    return (
        <Panel className="flex h-full flex-col p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-sm leading-6 font-bold text-[#303030]">
                    {title}
                </h2>
            </div>
            <div className="flex flex-1 flex-col space-y-3">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-4 text-left text-xs font-bold text-[#303030]">
                                    {index + 1}
                                </span>
                                <span className="flex size-8 items-center justify-center rounded-full bg-[#F1F5F8] text-[#0066AE]">
                                    <Icon className="size-4" strokeWidth={2} />
                                </span>
                                <span className="line-clamp-1 max-w-[120px] text-sm font-semibold text-[#303030]">
                                    {item.label}
                                </span>
                            </div>
                            <span className="text-sm font-bold text-[#303030]">
                                {item.value}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="rounded-xl border border-dashed border-[#DCE3EA] bg-[#F8FBFE] px-3 py-6 text-center text-sm font-semibold text-[#7C7C7C]">
                        Belum ada data.
                    </div>
                )}
            </div>
            <Link
                href={linkHref}
                className="mt-4 flex w-full justify-between rounded-lg bg-[#F8FBFE] px-4 py-2.5 text-xs font-bold text-[#0066AE] transition hover:bg-[#EAF3FF]"
            >
                {linkLabel} <ChevronRight className="size-4" />
            </Link>
        </Panel>
    );
}

function TopVillageSurveyTable({ rows }: { rows: TopSurveyRow[] }) {
    return (
        <Panel className="p-3.5 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-base leading-6 font-bold text-[#303030]">
                    Top Desa dengan Skor Survey Tertinggi
                </h2>
                <span className="rounded-lg bg-[#F8FBFE] px-3 py-2 text-xs font-bold text-[#0066AE]">
                    Top 5
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[920px] border-collapse text-left text-sm">
                    <thead className="border-b border-[#EFEFEF] text-[11px] font-bold tracking-wider text-[#7C7C7C] uppercase">
                        <tr>
                            {[
                                'Peringkat',
                                'Desa Wisata',
                                'Lokasi',
                                'Total Skor',
                                'Jawaban',
                                'Status',
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
                        {rows.length > 0 ? (
                            rows.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className="h-14 transition-colors hover:bg-[#F8FBFE]"
                                >
                                    <td className="px-2 py-2 whitespace-nowrap first:pl-0">
                                        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#EAF3FF] text-xs font-black text-[#0066AE]">
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=random`}
                                                    alt={row.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <span className="font-bold text-[#303030]">
                                                {row.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <p className="text-xs text-[#303030]">
                                            {row.meta}
                                        </p>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <span className="font-black text-[#303030] tabular-nums">
                                            {Number(row.score).toLocaleString(
                                                'id-ID',
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2 text-xs whitespace-nowrap text-[#303030]">
                                        {row.answers}
                                    </td>
                                    <td className="px-2 py-2">
                                        <span
                                            className={`inline-flex h-6 min-w-20 items-center justify-center rounded-md px-2 text-[10px] font-bold ${statusClass(row.status)}`}
                                        >
                                            {row.status_label ?? row.status}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2 text-center last:pr-0">
                                        {row.url ? (
                                            <Link
                                                href={row.url}
                                                className="inline-flex size-8 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#F1F5F8]"
                                                aria-label={`Detail ${row.name}`}
                                            >
                                                <Eye className="size-4" />
                                            </Link>
                                        ) : (
                                            <span className="inline-flex size-8 items-center justify-center rounded-lg text-[#B0B0B0]">
                                                <Eye className="size-4" />
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-2 py-8 text-center text-sm font-semibold text-[#7C7C7C]"
                                >
                                    Belum ada data skor survey desa.
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
    top_umkm_turnovers = [],
    top_pariwisata_turnovers = [],
    top_umkm_categories = [],
    recent_assignments = [],
    filters = {},
}: DashboardProps & { filters?: Record<string, string | null> }) {
    const { auth } = usePage().props;

    const programType = filters.program_type || 'Semua Program';

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
                            ...kpis
                                .slice(0, 3)
                                .map((kpi) => ({ type: 'kpi', data: kpi })),
                        ].map((item, index) => {
                            if (item.type === 'time') {
                                return <CurrentTimeCard key="time" />;
                            }

                            if (!('data' in item) || !item.data) return null;
                            const kpi = item.data;
                            const Icon = kpiIcons[kpi.icon];
                            if (!Icon) return null;
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

                    <div className="mb-2">
                        <DashboardVillageMap points={village_map_points} />
                    </div>

                    <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Panel
                            className="flex items-center overflow-hidden border-none p-0"
                            style={{ backgroundColor: '#EAF2FE' }}
                        >
                            <div className="z-10 flex-[1.5] p-5 pl-6">
                                <h3 className="mb-1 text-[17px] font-bold text-[#0039A6]">
                                    Dukung Desa Wisata, Dukung Indonesia
                                </h3>
                                <p className="mb-4 text-xs font-medium text-[#4D6B99]">
                                    Kelola program CSR BCA dan bantu desa wisata
                                    tumbuh berkelanjutan.
                                </p>
                                <Link
                                    href={surveyAssignments.url()}
                                    className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#0039A6] pr-1 pl-4 text-xs font-bold text-white transition hover:bg-[#002B7F]"
                                >
                                    Kelola Program CSR
                                    <span className="flex size-7 items-center justify-center rounded-full bg-white text-[#0039A6]">
                                        <ArrowRight
                                            className="size-3.5"
                                            strokeWidth={3}
                                        />
                                    </span>
                                </Link>
                            </div>
                            <div className="flex-1 shrink-0 bg-[#EAF2FE]">
                                <img
                                    src="/images/desa-wisata-illustration.png"
                                    className="h-[140px] w-full object-cover object-left mix-blend-multiply"
                                    alt="CSR"
                                />
                            </div>
                        </Panel>

                        <Panel
                            className="flex items-center overflow-hidden border-none p-0"
                            style={{ backgroundColor: '#E8F5E9' }}
                        >
                            <div className="z-10 flex-[1.5] p-5 pl-6">
                                <h3 className="mb-1 text-[17px] font-bold text-[#1B5E20]">
                                    Buat Assignment Survey Baru
                                </h3>
                                <p className="mb-4 text-xs font-medium text-[#4CAF50]">
                                    Undang enumerator dan mulai assessment
                                    dengan mudah dan terstruktur.
                                </p>
                                <Link
                                    href={surveyAssignments.url()}
                                    className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#4CAF50] pr-1 pl-4 text-xs font-bold text-white transition hover:bg-[#388E3C]"
                                >
                                    Buat Assignment
                                    <span className="flex size-7 items-center justify-center rounded-full bg-white text-[#4CAF50]">
                                        <ArrowRight
                                            className="size-3.5"
                                            strokeWidth={3}
                                        />
                                    </span>
                                </Link>
                            </div>
                            <div className="flex-1 shrink-0 bg-[#E8F5E9]">
                                <img
                                    src="/images/survey-clipboard-illustration.png"
                                    className="h-[140px] w-full object-cover object-left mix-blend-multiply"
                                    alt="Survey"
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
                                <Link
                                    href={surveyAssignments.url()}
                                    className="inline-flex h-8 items-center justify-center rounded-lg bg-[#F8FBFE] px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#EAF3FF]"
                                >
                                    Lihat Semua
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[880px] border-collapse text-left text-sm">
                                    <thead className="border-b border-[#EFEFEF] text-[11px] font-bold tracking-wider text-[#7C7C7C] uppercase">
                                        <tr>
                                            {[
                                                'Desa Wisata',
                                                'Lokasi',
                                                'Status',
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
                                                    <span
                                                        className={`inline-flex h-6 min-w-20 items-center justify-center rounded-md px-2 text-[10px] font-bold ${statusClass(row.status)}`}
                                                    >
                                                        {row.status_label}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-2 text-xs whitespace-nowrap text-[#303030]">
                                                    {row.updated_at}
                                                </td>
                                                <td className="px-2 py-2 text-center last:pr-0">
                                                    <Link
                                                        href={showSurveyAssignment.url(
                                                            row.code,
                                                        )}
                                                        className="inline-flex size-8 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#F1F5F8]"
                                                        aria-label={`Detail ${row.village}`}
                                                    >
                                                        <Eye className="size-4" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Panel>

                        <TopVillageSurveyTable
                            rows={top_village_surveys.slice(0, 5)}
                        />

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                            <TopStatisticList
                                title="Top 3 Omset UMKM"
                                icon={Store}
                                data={top_umkm_turnovers
                                    .slice(0, 3)
                                    .map((item) => ({
                                        label: item.name,
                                        value: `Rp${Number(item.score).toLocaleString('id-ID')}`,
                                    }))}
                                linkHref={umkm.url()}
                                linkLabel="Lihat Semua UMKM"
                            />
                            <TopStatisticList
                                title="Top 3 Omset Wisata"
                                icon={MapPin}
                                data={top_pariwisata_turnovers
                                    .slice(0, 3)
                                    .map((item) => ({
                                        label: item.name,
                                        value: `Rp${Number(item.score).toLocaleString('id-ID')}`,
                                    }))}
                                linkHref={villagesRoute.url()}
                                linkLabel="Lihat Semua Wisata"
                            />
                            <TopStatisticList
                                title="Top 3 Kategori UMKM"
                                icon={Store}
                                data={top_umkm_categories
                                    .slice(0, 3)
                                    .map((c) => ({
                                        label: c.label,
                                        value: c.total,
                                    }))}
                                linkHref={umkm.url()}
                                linkLabel="Lihat Semua Kategori"
                            />
                        </div>
                    </div>

                    <div className="mt-2 mb-4">
                        <DashboardOmsetCharts />
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
