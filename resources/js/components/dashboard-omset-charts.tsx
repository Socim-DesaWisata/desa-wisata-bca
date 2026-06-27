import { usePage } from '@inertiajs/react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import type { ReactNode } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

function Panel({
    children,
    className = '',
}: {
    children: ReactNode;
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

type OmsetChartRow = {
    year: string;
    omset: number;
};

type OmsetChartData = {
    data: OmsetChartRow[];
    trend: string;
    total: number;
};

const emptyChart: OmsetChartData = {
    data: [],
    trend: '+0%',
    total: 0,
};

function formatTotal(value: number) {
    if (value >= 1000000000) {
        return `Rp${(value / 1000000000).toFixed(2)} Miliar`;
    }

    if (value >= 1000000) {
        return `Rp${(value / 1000000).toFixed(2)} Juta`;
    }

    return `Rp${value.toLocaleString('id-ID')}`;
}

function formatAxis(value: number) {
    if (value === 0) {
        return 'Rp0';
    }

    if (value >= 1000000000) {
        return `Rp${(value / 1000000000).toFixed(0)}M`;
    }

    if (value >= 1000000) {
        return `Rp${(value / 1000000).toFixed(0)}Jt`;
    }

    if (value >= 1000) {
        return `Rp${(value / 1000).toFixed(0)}Rb`;
    }

    return `Rp${value}`;
}

function formatTooltip(value: number) {
    if (value >= 1000000000) {
        return [`Rp${(value / 1000000000).toFixed(2)} Miliar`, 'Omset'];
    }

    if (value >= 1000000) {
        return [`Rp${(value / 1000000).toFixed(2)} Juta`, 'Omset'];
    }

    return [`Rp${value.toLocaleString('id-ID')}`, 'Omset'];
}

function OmsetChartPanel({
    title,
    description,
    chart,
    color,
    gradientId,
}: {
    title: string;
    description: string;
    chart: OmsetChartData;
    color: string;
    gradientId: string;
}) {
    const TrendIcon = chart.trend.startsWith('-') ? TrendingDown : TrendingUp;

    return (
        <Panel className="flex flex-col p-4">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-bold text-[#303030]">
                        {title}
                    </h2>
                    <p className="text-[10px] text-[#7C7C7C]">
                        {description}
                    </p>
                </div>
            </div>

            <div className="mb-2 flex items-end gap-2">
                <span className="text-2xl leading-none font-bold text-[#303030]">
                    {formatTotal(chart.total)}
                </span>
                <span
                    className={`flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        chart.trend.startsWith('-')
                            ? 'bg-[#FDECEC] text-[#D81313]'
                            : 'bg-[#EAF8F0] text-[#00893D]'
                    }`}
                >
                    <TrendIcon className="size-2.5" /> {chart.trend}
                </span>
            </div>

            <div className="mt-2 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chart.data}
                        margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id={gradientId}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={color}
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={color}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#EFEFEF"
                        />
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#7C7C7C' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#7C7C7C' }}
                            tickFormatter={formatAxis}
                        />
                        <Tooltip
                            formatter={formatTooltip}
                            cursor={{
                                stroke: color,
                                strokeWidth: 1,
                                strokeDasharray: '3 3',
                                fill: 'transparent',
                            }}
                            contentStyle={{
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 4px 14px rgba(3,17,32,0.08)',
                                fontSize: '12px',
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="omset"
                            stroke={color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill={`url(#${gradientId})`}
                            activeDot={{
                                r: 4,
                                fill: color,
                                stroke: '#fff',
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Panel>
    );
}

export function DashboardOmsetCharts() {
    const { props } = usePage();
    const omsetCharts = (props as any).omset_charts || {
        umkm: emptyChart,
        wisata: emptyChart,
    };

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <OmsetChartPanel
                title="Omset UMKM"
                description="Pertumbuhan total omset UMKM desa per tahun"
                chart={omsetCharts.umkm || emptyChart}
                color="#FF944C"
                gradientId="colorUmkm"
            />
            <OmsetChartPanel
                title="Omset Pariwisata"
                description="Pertumbuhan total pendapatan tiket & layanan wisata per tahun"
                chart={omsetCharts.wisata || emptyChart}
                color="#0066AE"
                gradientId="colorWisata"
            />
        </div>
    );
}
