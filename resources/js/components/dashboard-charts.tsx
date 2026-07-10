import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
    PieChart,
    Pie,
    Cell,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from 'recharts';
import { useEffect, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { surveyAssignments } from '@/routes';
import {
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight,
    ChevronDown,
} from 'lucide-react';

// Data is now fetched dynamically from backend

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

export function DashboardCharts() {
    const { props } = usePage();
    const generalReport = (props as any).general_report || {};
    const aktivitasSurvey = (props as any).aktivitas_survey || {};
    const statusSurvey = (props as any).status_survey || {};
    const filters = (props as any).filters || {};

    const [generalReportFilter, setGeneralReportFilter] = useState(
        filters.general_report_filter || 'Bulan Ini',
    );
    const [programTypeFilter, setProgramTypeFilter] = useState(
        filters.program_type || 'Semua Program',
    );
    const [activityFilter, setActivityFilter] = useState(
        filters.activity_filter || '30 Hari Terakhir',
    );
    const [statusFilter, setStatusFilter] = useState(
        filters.status_filter || 'Tahun Ini',
    );

    useEffect(() => {
        setGeneralReportFilter(filters.general_report_filter || 'Bulan Ini');
        setProgramTypeFilter(filters.program_type || 'Semua Program');
        setActivityFilter(filters.activity_filter || '30 Hari Terakhir');
        setStatusFilter(filters.status_filter || 'Tahun Ini');
    }, [
        filters.activity_filter,
        filters.general_report_filter,
        filters.program_type,
        filters.status_filter,
    ]);

    const updateFilter = (key: string, value: string) => {
        if (key === 'general_report_filter') setGeneralReportFilter(value);
        if (key === 'program_type') setProgramTypeFilter(value);
        if (key === 'activity_filter') setActivityFilter(value);
        if (key === 'status_filter') setStatusFilter(value);

        router.get(
            // @ts-ignore
            route('dashboard'),
            {
                ...filters,
                [key]: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: [
                    'general_report',
                    'aktivitas_survey',
                    'status_survey',
                    'filters',
                ],
            },
        );
    };

    const areaData = generalReport.area_data || [];
    const barData = aktivitasSurvey.bar_data || [];
    const pieData = statusSurvey.pie_data || [];

    return (
        <div className="mb-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Panel className="flex flex-col p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-[#303030]">
                        General Report
                    </h2>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex cursor-pointer items-center gap-1 rounded-md border border-[#0066AE] bg-[#0066AE] px-2 py-1 text-xs font-semibold text-white outline-none hover:bg-[#005a9c]">
                                    {programTypeFilter}{' '}
                                    <ChevronDown className="size-3" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-[140px]"
                            >
                                <DropdownMenuItem
                                    className="cursor-pointer text-xs"
                                    onSelect={() =>
                                        updateFilter(
                                            'program_type',
                                            'Semua Program',
                                        )
                                    }
                                >
                                    Semua Program
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-xs"
                                    onSelect={() =>
                                        updateFilter('program_type', 'KEMENPAR')
                                    }
                                >
                                    KEMENPAR
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-xs"
                                    onSelect={() =>
                                        updateFilter('program_type', 'UMKM')
                                    }
                                >
                                    UMKM
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-xs"
                                    onSelect={() =>
                                        updateFilter('program_type', 'ISTC')
                                    }
                                >
                                    ISTC
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex cursor-pointer items-center gap-1 rounded-md border border-[#0066AE] bg-[#0066AE] px-2 py-1 text-xs font-semibold text-white outline-none hover:bg-[#005a9c]">
                                    {generalReportFilter}{' '}
                                    <ChevronDown className="size-3" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-[130px]"
                            >
                                <DropdownMenuItem
                                    className="cursor-pointer text-xs"
                                    onSelect={() =>
                                        updateFilter(
                                            'general_report_filter',
                                            'Hari Ini',
                                        )
                                    }
                                >
                                    Hari Ini
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-xs"
                                    onSelect={() =>
                                        updateFilter(
                                            'general_report_filter',
                                            'Bulan Ini',
                                        )
                                    }
                                >
                                    Bulan Ini
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-xs"
                                    onSelect={() =>
                                        updateFilter(
                                            'general_report_filter',
                                            'Tahun Ini',
                                        )
                                    }
                                >
                                    Tahun Ini
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-xs"
                                    onSelect={() =>
                                        updateFilter(
                                            'general_report_filter',
                                            '2025',
                                        )
                                    }
                                >
                                    2025
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-xs"
                                    onSelect={() =>
                                        updateFilter(
                                            'general_report_filter',
                                            '2024',
                                        )
                                    }
                                >
                                    2024
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="flex flex-1 gap-4">
                    <div className="flex flex-1 flex-col justify-between">
                        <div>
                            <p className="mb-1 text-xs font-semibold text-[#303030]">
                                Ringkasan Assessment
                            </p>
                            <p className="text-[10px] text-[#7C7C7C]">
                                Rata-rata Total Skor
                            </p>
                            <div className="mt-1 flex items-end gap-2">
                                <span className="text-3xl leading-none font-bold text-[#303030]">
                                    {generalReport.average_score ?? 0}
                                </span>
                                <span className="pb-0.5 text-xs font-semibold text-[#7C7C7C]">
                                    / 100
                                </span>
                                <span className="ml-1 rounded bg-[#EAF8F0] px-1.5 py-0.5 text-[10px] font-bold text-[#00893D]">
                                    Baik
                                </span>
                            </div>
                        </div>
                        <div className="mt-2 h-24 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={areaData}
                                    margin={{
                                        top: 5,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="colorScore"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#0066AE"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#0066AE"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#0066AE"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorScore)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-[#00893D]">
                            <ArrowUpRight className="size-3" />{' '}
                            {generalReport.trend ?? '+0%'}{' '}
                            <span className="font-medium text-[#7C7C7C]">
                                dibanding bulan lalu
                            </span>
                        </p>
                        <Link
                            href={surveyAssignments.url()}
                            className="mt-4 flex w-full justify-center rounded-lg border border-[#0066AE] py-2 text-xs font-bold text-[#0066AE] transition hover:bg-[#F8FBFE]"
                        >
                            Lihat Detail Laporan{' '}
                            <ChevronRight className="ml-1 inline size-3" />
                        </Link>
                    </div>

                    <div className="flex w-[130px] flex-col justify-between border-l border-[#EFEFEF] py-1 pl-4">
                        <div>
                            <p className="text-[10px] text-[#7C7C7C]">
                                Total Assessment
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-[#303030]">
                                    {generalReport.total_assessment ?? 0}
                                </p>
                                <span className="flex items-center text-[10px] font-bold text-[#00893D]">
                                    <ArrowUpRight className="size-2.5" /> 2
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#7C7C7C]">
                                Selesai
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-[#303030]">
                                    {generalReport.selesai ?? 0}
                                </p>
                                <span className="text-[10px] font-semibold text-[#7C7C7C]">
                                    {generalReport.total_assessment > 0
                                        ? Math.round(
                                              (generalReport.selesai /
                                                  generalReport.total_assessment) *
                                                  100,
                                          )
                                        : 0}
                                    %
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#7C7C7C]">
                                Dalam Proses
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-[#303030]">
                                    {generalReport.dalam_proses ?? 0}
                                </p>
                                <span className="text-[10px] font-semibold text-[#7C7C7C]">
                                    {generalReport.total_assessment > 0
                                        ? Math.round(
                                              (generalReport.dalam_proses /
                                                  generalReport.total_assessment) *
                                                  100,
                                          )
                                        : 0}
                                    %
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#7C7C7C]">
                                Belum Dimulai
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-[#303030]">
                                    {generalReport.belum_dimulai ?? 0}
                                </p>
                                <span className="text-[10px] font-semibold text-[#7C7C7C]">
                                    {generalReport.total_assessment > 0
                                        ? Math.round(
                                              (generalReport.belum_dimulai /
                                                  generalReport.total_assessment) *
                                                  100,
                                          )
                                        : 0}
                                    %
                                </span>
                            </div>
                        </div>
                        <div className="border-t border-[#EFEFEF] pt-2">
                            <p className="text-[10px] text-[#7C7C7C]">
                                Total Program CSR
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-[#303030]">
                                    {generalReport.total_program_csr ?? 0}
                                </p>
                                <span className="flex items-center text-[10px] font-bold text-[#00893D]">
                                    <ArrowUpRight className="size-2.5" /> 1
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#7C7C7C]">
                                Total Anggaran
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-bold text-[#303030]">
                                    Rp
                                    {(
                                        generalReport.total_anggaran ?? 0
                                    ).toLocaleString('id-ID')}
                                </p>
                            </div>
                            <span className="mt-0.5 flex items-center text-[10px] font-bold text-[#00893D]">
                                <ArrowUpRight className="size-2.5" /> 15%
                            </span>
                        </div>
                    </div>
                </div>
            </Panel>

            <Panel className="flex flex-col p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-[#303030]">
                        Aktivitas Survey
                    </h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex cursor-pointer items-center gap-1 rounded-md border border-[#0066AE] bg-[#0066AE] px-2 py-1 text-xs font-semibold text-white outline-none hover:bg-[#005a9c]">
                                {activityFilter}{' '}
                                <ChevronDown className="size-3" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[140px]">
                            <DropdownMenuItem
                                className="cursor-pointer text-xs"
                                onSelect={() =>
                                    updateFilter(
                                        'activity_filter',
                                        '7 Hari Terakhir',
                                    )
                                }
                            >
                                7 Hari Terakhir
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer text-xs"
                                onSelect={() =>
                                    updateFilter(
                                        'activity_filter',
                                        '30 Hari Terakhir',
                                    )
                                }
                            >
                                30 Hari Terakhir
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer text-xs"
                                onSelect={() =>
                                    updateFilter('activity_filter', 'Tahun Ini')
                                }
                            >
                                Tahun Ini
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer text-xs"
                                onSelect={() =>
                                    updateFilter('activity_filter', '2025')
                                }
                            >
                                2025
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer text-xs"
                                onSelect={() =>
                                    updateFilter('activity_filter', '2024')
                                }
                            >
                                2024
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="mb-4 flex items-center gap-4 text-[10px] font-semibold text-[#7C7C7C]">
                    <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#0066AE]" />{' '}
                        Selesai
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#2FA6FC]" />{' '}
                        Dalam Proses
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#DCE3EA]" />{' '}
                        Belum Dimulai
                    </div>
                </div>
                <div className="min-h-[180px] flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={barData}
                            margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#EFEFEF"
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#7C7C7C' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#7C7C7C' }}
                            />
                            <Tooltip
                                cursor={{ fill: '#F8FBFE' }}
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 14px rgba(3,17,32,0.08)',
                                    fontSize: '12px',
                                }}
                            />
                            <Bar
                                dataKey="selesai"
                                fill="#0066AE"
                                radius={[2, 2, 0, 0]}
                                barSize={8}
                            />
                            <Bar
                                dataKey="proses"
                                fill="#2FA6FC"
                                radius={[2, 2, 0, 0]}
                                barSize={8}
                            />
                            <Bar
                                dataKey="belum"
                                fill="#DCE3EA"
                                radius={[2, 2, 0, 0]}
                                barSize={8}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <Link
                    href={surveyAssignments.url()}
                    className="mt-4 flex w-full justify-center rounded-lg border border-[#EFEFEF] py-2 text-xs font-bold text-[#0066AE] transition hover:bg-[#F8FBFE]"
                >
                    Lihat Semua Aktivitas{' '}
                    <ChevronRight className="ml-1 inline size-3" />
                </Link>
            </Panel>

            <Panel className="flex flex-col p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-[#303030]">
                        Status Survey
                    </h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex cursor-pointer items-center gap-1 rounded-md border border-[#0066AE] bg-[#0066AE] px-2 py-1 text-xs font-semibold text-white outline-none hover:bg-[#005a9c]">
                                {statusFilter}{' '}
                                <ChevronDown className="size-3" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[140px]">
                            <DropdownMenuItem
                                className="cursor-pointer text-xs"
                                onSelect={() =>
                                    updateFilter('status_filter', 'Bulan Ini')
                                }
                            >
                                Bulan Ini
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer text-xs"
                                onSelect={() =>
                                    updateFilter('status_filter', 'Tahun Ini')
                                }
                            >
                                Tahun Ini
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer text-xs"
                                onSelect={() =>
                                    updateFilter('status_filter', '2025')
                                }
                            >
                                2025
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer text-xs"
                                onSelect={() =>
                                    updateFilter('status_filter', '2024')
                                }
                            >
                                2024
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="relative flex flex-1 flex-col items-center justify-center">
                    <div className="relative flex h-[140px] w-[140px] items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((entry: any, index: any) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-semibold text-[#7C7C7C]">
                                Total
                            </span>
                            <span className="text-2xl font-bold text-[#303030]">
                                {statusSurvey.total ?? 0}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 space-y-3">
                    {pieData.map((item: any) => (
                        <div
                            key={item.name}
                            className="flex items-center justify-between text-xs"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="size-2.5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="font-semibold text-[#7C7C7C]">
                                    {item.name}
                                </span>
                            </div>
                            <div className="font-bold text-[#303030]">
                                {item.value}{' '}
                                <span className="font-medium text-[#7C7C7C]">
                                    (
                                    {statusSurvey.total > 0
                                        ? (item.value / statusSurvey.total) *
                                          100
                                        : 0}
                                    %)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <Link
                    href={surveyAssignments.url()}
                    className="mt-6 flex w-full items-center justify-between border-t border-[#EFEFEF] pt-3 text-xs font-bold text-[#0066AE] transition hover:text-[#093967]"
                >
                    Lihat Detail <ChevronRight className="size-4" />
                </Link>
            </Panel>
        </div>
    );
}

export function AssessmentRadarChart({
    data,
    className = '',
}: {
    data: { aspect: string; score: number }[];
    className?: string;
}) {
    if (!data || data.length === 0) {
        return (
            <div
                className={`flex items-center justify-center text-xs font-medium text-[#7C7C7C] ${className}`}
            >
                Tidak ada data aspek
            </div>
        );
    }

    // Pad data to ensure at least 3 points for a proper polygon
    let chartData = data.map((item) => ({
        ...item,
        aspectLabel:
            item.aspect.length > 15
                ? item.aspect.substring(0, 15) + '...'
                : item.aspect,
    }));

    if (chartData.length === 1) {
        chartData.push({ aspect: ' ', score: 0, aspectLabel: ' ' });
        chartData.push({ aspect: '  ', score: 0, aspectLabel: '  ' });
    } else if (chartData.length === 2) {
        chartData.push({ aspect: ' ', score: 0, aspectLabel: ' ' });
    }

    return (
        <div className={`relative ${className}`}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    data={chartData}
                >
                    <PolarGrid stroke="#EFEFEF" />
                    <PolarAngleAxis
                        dataKey="aspectLabel"
                        tick={{
                            fill: '#7C7C7C',
                            fontSize: 10,
                            fontWeight: 600,
                        }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fill: '#7C7C7C', fontSize: 8 }}
                        tickCount={5}
                    />
                    <Radar
                        name="Skor"
                        dataKey="score"
                        stroke="#0066AE"
                        strokeWidth={2}
                        fill="#0066AE"
                        fillOpacity={0.3}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 14px rgba(3,17,32,0.08)',
                            fontSize: '12px',
                        }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
