import { Head } from '@inertiajs/react';
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
    TrendingUp,
    UserRound,
} from 'lucide-react';

import { dashboard } from '@/routes';

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

const kpis = [
    {
        title: 'Total Desa Wisata',
        value: '128',
        desc: 'Desa binaan terdaftar',
        trend: '+12 bulan ini',
        icon: MapPin,
        trendColor: 'text-[#00893D]',
    },
    {
        title: 'Survey Berjalan',
        value: '42',
        desc: 'Assignment aktif',
        trend: '+8 minggu ini',
        icon: ClipboardCheck,
        trendColor: 'text-[#00893D]',
    },
    {
        title: 'Menunggu Review',
        value: '18',
        desc: 'Siap ditinjau reviewer',
        trend: '+5 minggu ini',
        icon: FileSearch,
        trendColor: 'text-[#FF944C]',
    },
    {
        title: 'Rata-rata Skor',
        value: '82.4',
        desc: 'Naik dari periode lalu',
        trend: '+4.2 poin',
        icon: TrendingUp,
        trendColor: 'text-[#00893D]',
    },
];

const bars = [
    { label: 'Draft', value: 12, color: '#B0B0B0' },
    { label: 'Assigned', value: 20, color: '#AAD2F8' },
    { label: 'Progress', value: 42, color: '#0066AE' },
    { label: 'Submitted', value: 28, color: '#2FA6FC' },
    { label: 'Approved', value: 16, color: '#00893D' },
    { label: 'Revision', value: 10, color: '#FF944C' },
];

const tableRows = [
    [
        'Desa Wisata Sade',
        'Lombok Tengah',
        '86%',
        'In Progress',
        '3 enumerator',
        '2 jam lalu',
    ],
    [
        'Desa Wisata Nglanggeran',
        'Gunungkidul',
        '100%',
        'Submitted',
        '2 enumerator',
        'Hari ini',
    ],
    [
        'Desa Wisata Penglipuran',
        'Bangli',
        '100%',
        'Approved',
        '4 enumerator',
        'Kemarin',
    ],
    [
        'Desa Wisata Osing',
        'Banyuwangi',
        '64%',
        'Need Revision',
        '2 enumerator',
        '3 hari lalu',
    ],
    [
        'Desa Wisata Wae Rebo',
        'Manggarai',
        '32%',
        'Draft',
        '1 enumerator',
        '5 hari lalu',
    ],
];

const priorities = [
    {
        value: '6',
        text: 'Survey butuh review hari ini',
        icon: ClipboardCheck,
        color: colors.blue500,
    },
    {
        value: '3',
        text: 'Dokumen belum diverifikasi',
        icon: FileText,
        color: colors.warning,
    },
    {
        value: '2',
        text: 'Assignment melewati deadline',
        icon: CalendarDays,
        color: colors.danger,
    },
];

const activities = [
    {
        title: 'Enumerator Rani menyimpan draft survey Desa Sade',
        time: '10 menit lalu',
        icon: UserRound,
        color: colors.success,
    },
    {
        title: 'Reviewer menyetujui survey Desa Penglipuran',
        time: '1 jam lalu',
        icon: CheckCircle2,
        color: colors.blue500,
    },
    {
        title: 'Dokumen pendukung baru diunggah untuk Desa Osing',
        time: 'Hari ini',
        icon: FileText,
        color: colors.warning,
    },
    {
        title: 'Assignment baru dibuat untuk Desa Wae Rebo',
        time: 'Hari ini',
        icon: Plus,
        color: colors.blue500,
    },
];

const quickActions = [
    { label: 'Tambah Desa', icon: MapPin },
    { label: 'Buat Survey', icon: ClipboardCheck },
    { label: 'Review Jawaban', icon: Search },
    { label: 'Export Laporan', icon: ArrowDownToLine },
];

function statusClass(status: string) {
    if (status === 'Submitted') return 'bg-[#EAF7FF] text-[#0066AE]';
    if (status === 'Approved') return 'bg-[#EAF8F0] text-[#00893D]';
    if (status === 'Need Revision') return 'bg-[#FFF4EA] text-[#C9681E]';
    if (status === 'Draft') return 'bg-[#F7F7F7] text-[#7C7C7C]';

    return 'bg-[#F1F5F8] text-[#0066AE]';
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

export default function Dashboard() {
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
                            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] active:translate-y-[1px] sm:w-auto">
                                <Plus className="size-4" strokeWidth={2} />
                                Buat Assignment
                            </button>
                            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#AAD2F8] bg-white px-4 text-sm font-semibold text-[#0066AE] transition hover:bg-[#F1F5F8] active:translate-y-[1px] sm:w-auto">
                                <ArrowDownToLine
                                    className="size-4"
                                    strokeWidth={2}
                                />
                                Export Laporan
                            </button>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {kpis.map((kpi) => {
                            const Icon = kpi.icon;

                            return (
                                <Panel key={kpi.title} className="p-3.5 sm:p-4">
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
                                        className={`mt-3 flex items-center gap-1 text-xs font-semibold ${kpi.trendColor}`}
                                    >
                                        <ArrowUpRight
                                            className="size-3.5"
                                            strokeWidth={2.2}
                                        />
                                        {kpi.trend}
                                    </p>
                                </Panel>
                            );
                        })}
                    </section>

                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                        <main className="min-w-0 space-y-4 xl:col-span-8 2xl:col-span-9">
                            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                                <Panel className="p-3.5 sm:p-4">
                                    <div className="mb-4">
                                        <h2 className="text-base leading-6 font-bold text-[#303030]">
                                            Progress Survey Desa
                                        </h2>
                                        <p className="text-xs leading-5 text-[#7C7C7C]">
                                            Distribusi status assignment aktif.
                                        </p>
                                    </div>

                                    <div className="relative h-[220px] pl-8 md:h-[240px] xl:h-[260px]">
                                        {[80, 60, 40, 20, 0].map((line) => (
                                            <div
                                                key={line}
                                                className="absolute right-0 left-8 border-t border-dashed border-[#EFEFEF]"
                                                style={{
                                                    top: `${((80 - line) / 80) * 170}px`,
                                                }}
                                            >
                                                <span className="absolute -top-2.5 -left-8 text-[11px] leading-none text-[#7C7C7C]">
                                                    {line}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="absolute right-0 bottom-7 left-10 flex h-[170px] items-end justify-between gap-1.5 sm:gap-2">
                                            {bars.map((bar) => (
                                                <div
                                                    key={bar.label}
                                                    className="flex min-w-0 flex-1 flex-col items-center"
                                                >
                                                    <span className="mb-1 text-xs font-bold text-[#303030]">
                                                        {bar.value}
                                                    </span>
                                                    <span
                                                        className="w-full max-w-10 rounded-t-md"
                                                        style={{
                                                            height: `${Math.max((bar.value / 80) * 170, 14)}px`,
                                                            backgroundColor:
                                                                bar.color,
                                                        }}
                                                    />
                                                    <span className="mt-2 max-w-[64px] text-center text-[11px] leading-4 text-[#7C7C7C]">
                                                        {bar.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Panel>

                                <Panel className="p-3.5 sm:p-4">
                                    <div className="mb-4">
                                        <h2 className="text-base leading-6 font-bold text-[#303030]">
                                            Tren Skor Assessment
                                        </h2>
                                        <p className="text-xs leading-5 text-[#7C7C7C]">
                                            Rata-rata skor assessment per bulan.
                                        </p>
                                    </div>

                                    <div className="h-[220px] overflow-hidden md:h-[240px] xl:h-[260px]">
                                        <svg
                                            viewBox="0 0 520 210"
                                            className="h-full w-full"
                                        >
                                            {[100, 90, 80, 70, 60].map(
                                                (line, index) => (
                                                    <g key={line}>
                                                        <line
                                                            x1="38"
                                                            x2="510"
                                                            y1={index * 36 + 14}
                                                            y2={index * 36 + 14}
                                                            stroke="#EFEFEF"
                                                            strokeDasharray="4 4"
                                                        />
                                                        <text
                                                            x="2"
                                                            y={index * 36 + 18}
                                                            fontSize="11"
                                                            fill="#7C7C7C"
                                                        >
                                                            {line}
                                                        </text>
                                                    </g>
                                                ),
                                            )}
                                            <path
                                                d="M58 150 L140 138 L222 128 L304 120 L386 108 L468 96"
                                                fill="none"
                                                stroke="#0066AE"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M58 150 L140 138 L222 128 L304 120 L386 108 L468 96 L468 184 L58 184 Z"
                                                fill="#2FA6FC"
                                                opacity="0.10"
                                            />
                                            {[
                                                ['74.1', 58, 150],
                                                ['76.8', 140, 138],
                                                ['79.2', 222, 128],
                                                ['80.3', 304, 120],
                                                ['81.6', 386, 108],
                                                ['82.4', 468, 96],
                                            ].map(([label, x, y]) => (
                                                <g key={label}>
                                                    <circle
                                                        cx={x}
                                                        cy={y}
                                                        r="4.5"
                                                        fill="#0066AE"
                                                    />
                                                    <text
                                                        x={Number(x) - 12}
                                                        y={Number(y) - 12}
                                                        fontSize="11"
                                                        fontWeight="700"
                                                        fill="#303030"
                                                    >
                                                        {label}
                                                    </text>
                                                </g>
                                            ))}
                                            {[
                                                'Jan',
                                                'Feb',
                                                'Mar',
                                                'Apr',
                                                'Mei',
                                                'Jun',
                                            ].map((label, index) => (
                                                <text
                                                    key={label}
                                                    x={54 + index * 82}
                                                    y="205"
                                                    fontSize="11"
                                                    fill="#7C7C7C"
                                                >
                                                    {label}
                                                </text>
                                            ))}
                                        </svg>
                                    </div>
                                </Panel>
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
                                    <button className="hidden h-9 items-center gap-2 rounded-lg border border-[#AAD2F8] px-3 text-xs font-semibold text-[#0066AE] hover:bg-[#F1F5F8] md:inline-flex">
                                        Lihat Semua
                                        <ChevronRight className="size-4" />
                                    </button>
                                </div>

                                <div className="space-y-3 md:hidden">
                                    {tableRows.map((row) => (
                                        <article
                                            key={row[0]}
                                            className="rounded-2xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_14px_rgba(3,17,32,0.05)]"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="truncate text-sm leading-5 font-bold text-[#303030]">
                                                        {row[0]}
                                                    </h3>
                                                    <p className="mt-0.5 text-xs leading-5 text-[#7C7C7C]">
                                                        {row[1]}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-[11px] font-bold ${statusClass(row[3])}`}
                                                >
                                                    {row[3]}
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                <div className="mb-2 flex items-center justify-between text-xs">
                                                    <span className="font-semibold text-[#303030]">
                                                        Progress
                                                    </span>
                                                    <span className="font-bold text-[#0066AE]">
                                                        {row[2]}
                                                    </span>
                                                </div>
                                                <div className="h-2 overflow-hidden rounded-full bg-[#E6EEF5]">
                                                    <div
                                                        className="h-full rounded-full bg-[#0066AE]"
                                                        style={{
                                                            width: row[2],
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4 grid grid-cols-2 gap-3 text-xs leading-5 text-[#7C7C7C]">
                                                <div>
                                                    <span className="block font-semibold text-[#303030]">
                                                        {row[4]}
                                                    </span>
                                                    Enumerator
                                                </div>
                                                <div>
                                                    <span className="block font-semibold text-[#303030]">
                                                        {row[5]}
                                                    </span>
                                                    Diperbarui
                                                </div>
                                            </div>
                                            <div className="mt-4 flex gap-2">
                                                <button className="h-9 flex-1 rounded-lg bg-[#0066AE] px-3 text-xs font-semibold text-white">
                                                    Lihat Detail
                                                </button>
                                                <button
                                                    className="flex size-9 items-center justify-center rounded-lg border border-[#EFEFEF] text-[#7C7C7C]"
                                                    aria-label={`Aksi ${row[0]}`}
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
                                            {tableRows.map((row) => (
                                                <tr
                                                    key={row[0]}
                                                    className="h-12 hover:bg-[#F7F7F7]"
                                                >
                                                    <td className="px-4 font-semibold whitespace-nowrap text-[#303030]">
                                                        {row[0]}
                                                    </td>
                                                    <td className="px-4 whitespace-nowrap text-[#303030]">
                                                        {row[1]}
                                                    </td>
                                                    <td className="px-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-9 text-xs font-semibold text-[#303030]">
                                                                {row[2]}
                                                            </span>
                                                            <span className="h-2 w-24 overflow-hidden rounded-full bg-[#E6EEF5]">
                                                                <span
                                                                    className="block h-full rounded-full bg-[#0066AE]"
                                                                    style={{
                                                                        width: row[2],
                                                                    }}
                                                                />
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4">
                                                        <span
                                                            className={`inline-flex h-6 min-w-24 items-center justify-center rounded-full px-3 text-xs font-bold ${statusClass(row[3])}`}
                                                        >
                                                            {row[3]}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 whitespace-nowrap text-[#303030]">
                                                        {row[4]}
                                                    </td>
                                                    <td className="px-4 whitespace-nowrap text-[#303030]">
                                                        {row[5]}
                                                    </td>
                                                    <td className="px-4 text-center">
                                                        <button
                                                            className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-[#F1F5F8]"
                                                            aria-label={`Aksi ${row[0]}`}
                                                        >
                                                            <MoreVertical className="size-4 text-[#7C7C7C]" />
                                                        </button>
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
                                <h2 className="mb-3 text-base leading-6 font-bold text-[#303030]">
                                    Prioritas Review
                                </h2>
                                <div className="divide-y divide-[#EFEFEF]">
                                    {priorities.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <button
                                                key={item.text}
                                                className="flex w-full items-center gap-3 py-3 text-left"
                                            >
                                                <span
                                                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F1F5F8]"
                                                    style={{
                                                        color: item.color,
                                                    }}
                                                >
                                                    <Icon
                                                        className="size-5"
                                                        strokeWidth={2}
                                                    />
                                                </span>
                                                <span
                                                    className="text-xl leading-none font-bold"
                                                    style={{
                                                        color: item.color,
                                                    }}
                                                >
                                                    {item.value}
                                                </span>
                                                <span className="min-w-0 flex-1 text-xs leading-5 font-semibold text-[#303030]">
                                                    {item.text}
                                                </span>
                                                <ChevronRight className="size-4 shrink-0 text-[#7C7C7C]" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </Panel>

                            <Panel className="p-3.5 sm:p-4">
                                <h2 className="mb-3 text-base leading-6 font-bold text-[#303030]">
                                    Aktivitas Terbaru
                                </h2>
                                <div className="space-y-4">
                                    {activities.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={item.title}
                                                className="flex gap-3"
                                            >
                                                <span
                                                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F1F5F8]"
                                                    style={{
                                                        color: item.color,
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
                                            <button
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
                                            </button>
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
