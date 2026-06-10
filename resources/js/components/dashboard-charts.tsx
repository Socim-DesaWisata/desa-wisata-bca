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
} from 'recharts';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
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

const areaData = [
    { name: 'Jan', score: 65 },
    { name: 'Feb', score: 68 },
    { name: 'Mar', score: 72 },
    { name: 'Apr', score: 70 },
    { name: 'May', score: 78.4 },
];

const barData = [
    { name: '24 Apr', selesai: 10, proses: 5, belum: 3 },
    { name: '1 Mei', selesai: 12, proses: 8, belum: 2 },
    { name: '8 Mei', selesai: 8, proses: 12, belum: 4 },
    { name: '15 Mei', selesai: 15, proses: 10, belum: 1 },
    { name: '22 Mei', selesai: 18, proses: 5, belum: 2 },
];

const pieData = [
    { name: 'Selesai', value: 2, color: '#0066AE' },
    { name: 'Dalam Proses', value: 2, color: '#2FA6FC' },
    { name: 'Belum Dimulai', value: 1, color: '#DCE3EA' },
];

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
    const [generalReportFilter, setGeneralReportFilter] = useState('Bulan Ini');
    const [activityFilter, setActivityFilter] = useState('30 Hari Terakhir');

    return (
        <div className="mb-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Panel className="flex flex-col p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-[#303030]">
                        General Report
                    </h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-1 rounded-md border border-[#EFEFEF] px-2 py-1 text-xs font-semibold text-[#7C7C7C] outline-none hover:bg-gray-50 cursor-pointer">
                                {generalReportFilter} <ChevronDown className="size-3" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[130px]">
                            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => setGeneralReportFilter('Hari Ini')}>Hari Ini</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => setGeneralReportFilter('Bulan Ini')}>Bulan Ini</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => setGeneralReportFilter('Tahun Ini')}>Tahun Ini</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                                    78.4
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
                            <ArrowUpRight className="size-3" /> 6.4%{' '}
                            <span className="font-medium text-[#7C7C7C]">
                                dibanding bulan lalu
                            </span>
                        </p>
                        <Link href={surveyAssignments.url()} className="mt-4 flex justify-center w-full rounded-lg border border-[#0066AE] py-2 text-xs font-bold text-[#0066AE] transition hover:bg-[#F8FBFE]">
                            Lihat Detail Laporan <ChevronRight className="inline size-3 ml-1" />
                        </Link>
                    </div>

                    <div className="flex w-[130px] flex-col justify-between border-l border-[#EFEFEF] py-1 pl-4">
                        <div>
                            <p className="text-[10px] text-[#7C7C7C]">
                                Total Assessment
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-[#303030]">
                                    5
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
                                    2
                                </p>
                                <span className="text-[10px] font-semibold text-[#7C7C7C]">
                                    40%
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#7C7C7C]">
                                Dalam Proses
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-[#303030]">
                                    2
                                </p>
                                <span className="text-[10px] font-semibold text-[#7C7C7C]">
                                    40%
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#7C7C7C]">
                                Belum Dimulai
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-[#303030]">
                                    1
                                </p>
                                <span className="text-[10px] font-semibold text-[#7C7C7C]">
                                    20%
                                </span>
                            </div>
                        </div>
                        <div className="border-t border-[#EFEFEF] pt-2">
                            <p className="text-[10px] text-[#7C7C7C]">
                                Total Program CSR
                            </p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-[#303030]">
                                    3
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
                                    Rp120.000.000
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
                            <button className="flex items-center gap-1 rounded-md border border-[#EFEFEF] px-2 py-1 text-xs font-semibold text-[#7C7C7C] outline-none hover:bg-gray-50 cursor-pointer">
                                {activityFilter} <ChevronDown className="size-3" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[140px]">
                            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => setActivityFilter('7 Hari Terakhir')}>7 Hari Terakhir</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => setActivityFilter('30 Hari Terakhir')}>30 Hari Terakhir</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => setActivityFilter('Tahun Ini')}>Tahun Ini</DropdownMenuItem>
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
                <Link href={surveyAssignments.url()} className="mt-4 flex justify-center w-full rounded-lg border border-[#EFEFEF] py-2 text-xs font-bold text-[#0066AE] transition hover:bg-[#F8FBFE]">
                    Lihat Semua Aktivitas{' '}
                    <ChevronRight className="inline size-3 ml-1" />
                </Link>
            </Panel>

            <Panel className="flex flex-col p-4">
                <div className="mb-4">
                    <h2 className="text-sm font-bold text-[#303030]">
                        Status Survey
                    </h2>
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
                                    {pieData.map((entry, index) => (
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
                                5
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 space-y-3">
                    {pieData.map((item) => (
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
                                    ({(item.value / 5) * 100}%)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <Link href={surveyAssignments.url()} className="mt-6 flex w-full items-center justify-between border-t border-[#EFEFEF] pt-3 text-xs font-bold text-[#0066AE] transition hover:text-[#093967]">
                    Lihat Detail <ChevronRight className="size-4" />
                </Link>
            </Panel>
        </div>
    );
}
