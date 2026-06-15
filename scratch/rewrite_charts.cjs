const fs = require('fs');

let content = fs.readFileSync('resources/js/components/dashboard-charts.tsx', 'utf-8');

// 1. imports
content = content.replace(
    /import \{ useState \} from 'react';\r?\nimport \{ Link \} from '@inertiajs\/react';/,
    `import { useState } from 'react';\nimport { Link, usePage, router } from '@inertiajs/react';`
);

// 2. remove dummy data
content = content.replace(/const areaData = \[\s*\{ name: 'Jan', score: 65 \},[\s\S]*?const pieData = \[\s*\{ name: 'Selesai', value: 2, color: '#0066AE' \},[\s\S]*?\];/m, '// Data is now fetched dynamically from backend');

// 3. update DashboardCharts signature
content = content.replace(
    /export function DashboardCharts\(\) \{\r?\n    const \[generalReportFilter, setGeneralReportFilter\] = useState\('Bulan Ini'\);\r?\n    const \[activityFilter, setActivityFilter\] = useState\('30 Hari Terakhir'\);\r?\n    const \[statusFilter, setStatusFilter\] = useState\('Tahun Ini'\);\r?\n\r?\n    return \(/,
    `export function DashboardCharts() {
    const { props } = usePage();
    const generalReport = (props as any).general_report || {};
    const aktivitasSurvey = (props as any).aktivitas_survey || {};
    const statusSurvey = (props as any).status_survey || {};
    const filters = (props as any).filters || {};

    const [generalReportFilter, setGeneralReportFilter] = useState(filters.general_report_filter || 'Bulan Ini');
    const [activityFilter, setActivityFilter] = useState(filters.activity_filter || '30 Hari Terakhir');
    const [statusFilter, setStatusFilter] = useState(filters.status_filter || 'Tahun Ini');

    const updateFilter = (key: string, value: string) => {
        if (key === 'general_report_filter') setGeneralReportFilter(value);
        if (key === 'activity_filter') setActivityFilter(value);
        if (key === 'status_filter') setStatusFilter(value);

        router.get(
            // @ts-ignore
            route('dashboard'),
            {
                general_report_filter: key === 'general_report_filter' ? value : generalReportFilter,
                activity_filter: key === 'activity_filter' ? value : activityFilter,
                status_filter: key === 'status_filter' ? value : statusFilter,
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['general_report', 'aktivitas_survey', 'status_survey', 'filters'],
            }
        );
    };

    const areaData = generalReport.area_data || [];
    const barData = aktivitasSurvey.bar_data || [];
    const pieData = statusSurvey.pie_data || [];

    return (`
);

// 4. Update dropdowns replacing set...Filter('...') with updateFilter('...', '...')
content = content.replace(/setGeneralReportFilter\((.*?)\)/g, "updateFilter('general_report_filter', $1)");
content = content.replace(/setActivityFilter\((.*?)\)/g, "updateFilter('activity_filter', $1)");
content = content.replace(/setStatusFilter\((.*?)\)/g, "updateFilter('status_filter', $1)");

// Fix the initial useState calls that were incorrectly replaced by the above regex
content = content.replace(/const \[generalReportFilter, updateFilter\('general_report_filter', (.*?)\)\] = useState/g, "const [generalReportFilter, setGeneralReportFilter] = useState");
content = content.replace(/const \[activityFilter, updateFilter\('activity_filter', (.*?)\)\] = useState/g, "const [activityFilter, setActivityFilter] = useState");
content = content.replace(/const \[statusFilter, updateFilter\('status_filter', (.*?)\)\] = useState/g, "const [statusFilter, setStatusFilter] = useState");

// 5. Update static values with generalReport properties
content = content.replace(
    /<span className="text-3xl leading-none font-bold text-\[#303030\]">\s*78\.4\s*<\/span>/,
    `<span className="text-3xl leading-none font-bold text-[#303030]">{generalReport.average_score ?? 0}</span>`
);

content = content.replace(
    /<ArrowUpRight className="size-3" \/> 6\.4%\{' '\}/,
    `<ArrowUpRight className="size-3" /> {generalReport.trend ?? '+0%'}{' '}`
);

content = content.replace(
    /Total Assessment[\s\S]*?<p className="text-sm font-bold text-\[#303030\]">\s*5\s*<\/p>/m,
    `Total Assessment\n                            </p>\n                            <div className="flex items-center justify-between">\n                                <p className="text-sm font-bold text-[#303030]">\n                                    {generalReport.total_assessment ?? 0}\n                                </p>`
);

content = content.replace(
    /Selesai\s*<\/p>\s*<div className="flex items-center justify-between">\s*<p className="text-sm font-bold text-\[#303030\]">\s*2\s*<\/p>\s*<span className="text-\[10px\] font-semibold text-\[#7C7C7C\]">\s*40%\s*<\/span>/m,
    `Selesai\n                            </p>\n                            <div className="flex items-center justify-between">\n                                <p className="text-sm font-bold text-[#303030]">\n                                    {generalReport.selesai ?? 0}\n                                </p>\n                                <span className="text-[10px] font-semibold text-[#7C7C7C]">\n                                    {generalReport.total_assessment > 0 ? Math.round((generalReport.selesai / generalReport.total_assessment) * 100) : 0}%\n                                </span>`
);

content = content.replace(
    /Dalam Proses\s*<\/p>\s*<div className="flex items-center justify-between">\s*<p className="text-sm font-bold text-\[#303030\]">\s*2\s*<\/p>\s*<span className="text-\[10px\] font-semibold text-\[#7C7C7C\]">\s*40%\s*<\/span>/m,
    `Dalam Proses\n                            </p>\n                            <div className="flex items-center justify-between">\n                                <p className="text-sm font-bold text-[#303030]">\n                                    {generalReport.dalam_proses ?? 0}\n                                </p>\n                                <span className="text-[10px] font-semibold text-[#7C7C7C]">\n                                    {generalReport.total_assessment > 0 ? Math.round((generalReport.dalam_proses / generalReport.total_assessment) * 100) : 0}%\n                                </span>`
);

content = content.replace(
    /Belum Dimulai\s*<\/p>\s*<div className="flex items-center justify-between">\s*<p className="text-sm font-bold text-\[#303030\]">\s*1\s*<\/p>\s*<span className="text-\[10px\] font-semibold text-\[#7C7C7C\]">\s*20%\s*<\/span>/m,
    `Belum Dimulai\n                            </p>\n                            <div className="flex items-center justify-between">\n                                <p className="text-sm font-bold text-[#303030]">\n                                    {generalReport.belum_dimulai ?? 0}\n                                </p>\n                                <span className="text-[10px] font-semibold text-[#7C7C7C]">\n                                    {generalReport.total_assessment > 0 ? Math.round((generalReport.belum_dimulai / generalReport.total_assessment) * 100) : 0}%\n                                </span>`
);

content = content.replace(
    /Total Program CSR\s*<\/p>\s*<div className="flex items-center justify-between">\s*<p className="text-sm font-bold text-\[#303030\]">\s*3\s*<\/p>/m,
    `Total Program CSR\n                            </p>\n                            <div className="flex items-center justify-between">\n                                <p className="text-sm font-bold text-[#303030]">\n                                    {generalReport.total_program_csr ?? 0}\n                                </p>`
);

content = content.replace(
    /Total Anggaran\s*<\/p>\s*<div className="flex items-center justify-between">\s*<p className="text-xs font-bold text-\[#303030\]">\s*Rp120\.000\.000\s*<\/p>/m,
    `Total Anggaran\n                            </p>\n                            <div className="flex items-center justify-between">\n                                <p className="text-xs font-bold text-[#303030]">\n                                    Rp{(generalReport.total_anggaran ?? 0).toLocaleString('id-ID')}\n                                </p>`
);

// Update Status Survey pie chart total
content = content.replace(
    /<span className="text-2xl font-bold text-\[#303030\]">\s*5\s*<\/span>/,
    `<span className="text-2xl font-bold text-[#303030]">{statusSurvey.total ?? 0}</span>`
);

// Update the pieData loop text to avoid divide by zero 
content = content.replace(
    /\(item\.value \/ 5\) \* 100/g,
    `statusSurvey.total > 0 ? (item.value / statusSurvey.total) * 100 : 0`
);

fs.writeFileSync('resources/js/components/dashboard-charts.tsx', content);
console.log('dashboard-charts.tsx updated');
