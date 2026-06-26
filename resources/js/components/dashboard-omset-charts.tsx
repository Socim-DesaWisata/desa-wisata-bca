import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';

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

export function DashboardOmsetCharts() {
    const { props } = usePage();
    const omsetCharts = (props as any).omset_charts || { 
        umkm: { data: [], trend: '+0%', total: 0, current_year: 2026 }, 
        wisata: { data: [], trend: '+0%', total: 0, current_year: 2026 } 
    };

    const umkm = omsetCharts.umkm;
    const wisata = omsetCharts.wisata;
    const filters = (props as any).filters || {};
    const umkmYears = (umkm.available_years || [umkm.current_year]).map((year: number | string) => String(year));
    const wisataYears = (wisata.available_years || [wisata.current_year]).map((year: number | string) => String(year));

    const [umkmYear, setUmkmYear] = useState(String(umkm.current_year));
    const [wisataYear, setWisataYear] = useState(String(wisata.current_year));

    useEffect(() => {
        setUmkmYear(String(umkm.current_year));
    }, [umkm.current_year]);

    useEffect(() => {
        setWisataYear(String(wisata.current_year));
    }, [wisata.current_year]);

    const updateYear = (type: 'umkm' | 'wisata', year: string) => {
        if (type === 'umkm') setUmkmYear(year);
        if (type === 'wisata') setWisataYear(year);

        router.get(
            // @ts-ignore
            route('dashboard'),
            {
                ...filters,
                umkm_year: type === 'umkm' ? year : String(umkm.current_year),
                wisata_year: type === 'wisata' ? year : String(wisata.current_year),
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['omset_charts', 'filters'],
            }
        );
    };

    const formatTotal = (val: number) => {
        if (val >= 1000000000) return `Rp${(val / 1000000000).toFixed(2)} Miliar`;
        if (val >= 1000000) return `Rp${(val / 1000000).toFixed(2)} Juta`;
        return `Rp${val.toLocaleString('id-ID')}`;
    };

    const formatAxis = (val: number) => {
        if (val === 0) return 'Rp0';
        if (val >= 1000000000) return `Rp${(val / 1000000000).toFixed(0)}M`;
        if (val >= 1000000) return `Rp${(val / 1000000).toFixed(0)}Jt`;
        if (val >= 1000) return `Rp${(val / 1000).toFixed(0)}Rb`;
        return `Rp${val}`;
    };

    const formatTooltip = (value: number) => {
        if (value >= 1000000000) return [`Rp${(value / 1000000000).toFixed(2)} Miliar`, 'Omset'];
        if (value >= 1000000) return [`Rp${(value / 1000000).toFixed(2)} Juta`, 'Omset'];
        return [`Rp${value.toLocaleString('id-ID')}`, 'Omset'];
    };

    const TrendIconUmkm = umkm.trend.startsWith('-') ? TrendingDown : TrendingUp;
    const TrendIconWisata = wisata.trend.startsWith('-') ? TrendingDown : TrendingUp;

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* UMKM Omset Chart */}
            <Panel className="flex flex-col p-4">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-[#303030]">
                            Omset UMKM
                        </h2>
                        <p className="text-[10px] text-[#7C7C7C]">
                            Pertumbuhan total omset UMKM desa per tahun
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex cursor-pointer items-center gap-1 rounded-md border border-[#0066AE] bg-[#0066AE] px-2 py-1 text-xs font-semibold text-white outline-none hover:bg-[#005a9c]">
                                {umkmYear} <ChevronDown className="size-3" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[100px]">
                            {umkmYears.map((year: string) => (
                                <DropdownMenuItem key={year} className="cursor-pointer text-xs" onSelect={() => updateYear('umkm', year)}>
                                    {year}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
                <div className="mb-2 flex items-end gap-2">
                    <span className="text-2xl leading-none font-bold text-[#303030]">{formatTotal(umkm.total)}</span>
                    <span className={`flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold ${umkm.trend.startsWith('-') ? 'bg-[#FDECEC] text-[#D81313]' : 'bg-[#EAF8F0] text-[#00893D]'}`}>
                        <TrendIconUmkm className="size-2.5" /> {umkm.trend}
                    </span>
                </div>

                <div className="mt-2 h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={umkm.data}
                            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorUmkm" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF944C" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#FF944C" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEFEF" />
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
                                cursor={{ stroke: '#FF944C', strokeWidth: 1, strokeDasharray: '3 3', fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 14px rgba(3,17,32,0.08)', fontSize: '12px' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="omset"
                                stroke="#FF944C"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorUmkm)"
                                activeDot={{ r: 4, fill: '#FF944C', stroke: '#fff', strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Panel>

            {/* Wisata Omset Chart */}
            <Panel className="flex flex-col p-4">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-[#303030]">
                            Omset Pariwisata
                        </h2>
                        <p className="text-[10px] text-[#7C7C7C]">
                            Pertumbuhan total pendapatan tiket & layanan wisata per tahun
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex cursor-pointer items-center gap-1 rounded-md border border-[#0066AE] bg-[#0066AE] px-2 py-1 text-xs font-semibold text-white outline-none hover:bg-[#005a9c]">
                                {wisataYear} <ChevronDown className="size-3" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[100px]">
                            {wisataYears.map((year: string) => (
                                <DropdownMenuItem key={year} className="cursor-pointer text-xs" onSelect={() => updateYear('wisata', year)}>
                                    {year}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
                <div className="mb-2 flex items-end gap-2">
                    <span className="text-2xl leading-none font-bold text-[#303030]">{formatTotal(wisata.total)}</span>
                    <span className={`flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold ${wisata.trend.startsWith('-') ? 'bg-[#FDECEC] text-[#D81313]' : 'bg-[#EAF8F0] text-[#00893D]'}`}>
                        <TrendIconWisata className="size-2.5" /> {wisata.trend}
                    </span>
                </div>

                <div className="mt-2 h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={wisata.data}
                            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorWisata" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0066AE" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#0066AE" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEFEF" />
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
                                cursor={{ stroke: '#0066AE', strokeWidth: 1, strokeDasharray: '3 3', fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 14px rgba(3,17,32,0.08)', fontSize: '12px' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="omset"
                                stroke="#0066AE"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorWisata)"
                                activeDot={{ r: 4, fill: '#0066AE', stroke: '#fff', strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Panel>
        </div>
    );
}

