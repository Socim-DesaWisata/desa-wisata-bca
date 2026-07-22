import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeft,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ClipboardCheck,
    ClipboardList,
    Clock3,
    Download,
    Eye,
    FileText,
    Flag,
    Folder,
    MapPin,
    PanelRightOpen,
    Plus,
    RefreshCcw,
    Save,
    Search,
    ShieldCheck,
    Star,
    Trash2,
    Trophy,
    UserRound,
    X,
} from 'lucide-react';
import { EditableFileName } from '@/components/editable-filename';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { dashboard, surveyAssignments } from '@/routes';
import {
    createPariwisata,
    createUmkm,
    exportMethod as exportSurveyAssignment,
    show as showSurveyAssignment,
    takeSurvey,
    update as updateSurveyAssignment,
} from '@/routes/survey-assignments';
import { update as updateVillageAnnualData } from '@/routes/survey-assignments/village-annual-data';
import {
    exportSurvey as exportPariwisataSurvey,
    show as showPariwisata,
    takeSurvey as takePariwisataSurvey,
} from '@/routes/survey-assignments/pariwisata';
import { store as storePariwisataSurveyDraft } from '@/routes/survey-assignments/pariwisata/take-survey';
import { store as storeSurveyDraft } from '@/routes/survey-assignments/take-survey';
import {
    destroy as destroySurveyDocument,
    update as updateSurveyDocument,
} from '@/routes/survey-assignments/take-survey/documents';
import { show as showUmkm } from '@/routes/survey-assignments/umkm';

type UserSummary = {
    id: string | null;
    name: string;
    email: string | null;
};

type SurveyDocument = {
    id: number;
    file_name: string;
    file_url: string;
    mime_type: string | null;
    file_size: number | null;
    file_size_label: string;
    uploaded_at: string;
    uploaded_by: UserSummary;
};

type SurveyOption = {
    id: number;
    score: number;
    label: string;
    sort_order: number;
};

type SurveyAnswerHistory = {
    id: number;
    action: string;
    actor: UserSummary;
    old_score: string | null;
    new_score: string | null;
    old_option_label: string | null;
    new_option_label: string | null;
    created_at: string;
};

type SurveyQuestion = {
    id: number;
    number: number;
    code: string;
    question_text: string;
    document_hint: string | null;
    sort_order: number;
    max_score: number;
    answer: {
        id: number;
        survey_question_option_id: number;
        score: number;
        score_label: string;
        notes: string | null;
        answered_at: string;
        last_edited_at: string;
        answered_by: UserSummary;
        last_edited_by: UserSummary;
        documents: SurveyDocument[];
        histories: SurveyAnswerHistory[];
    } | null;
    options: SurveyOption[];
};

type SurveyAspect = {
    name: string;
    question_count: number;
    answered_count: number;
    documents_count: number;
    score: number;
    max_score: number;
    score_percent: number;
    questions: SurveyQuestion[];
};

type ScoreAspectSummary = {
    name: string;
    score: number;
    max_score: number;
    score_percent: number;
};

type ScoreDistributionSummary = {
    score: number;
    count: number;
};

type SurveyAssignmentShowProps = {
    assignment: {
        id: number;
        code: string;
        status: string;
        status_label: string;
        assigned_at: string;
        started_at: string;
        last_saved_at: string;
        submitted_at: string;
        reviewed_at: string;
        created_at: string;
        updated_at: string;
        documents_count: number;
        village: {
            code: string | null;
            name: string;
            description: string | null;
            status: string | null;
            location: string;
            address: string | null;
            postal_code: string | null;
            latitude: string | null;
            longitude: string | null;
            maps_url: string | null;
            manager_name: string | null;
            manager_phone: string | null;
            manager_email: string | null;
            cover_url: string | null;
        };
        template: {
            id: number | null;
            title: string;
            description: string | null;
            status: string | null;
            published_at: string;
        };
        assigned_by_user: UserSummary;
        submitted_by_user: UserSummary;
        reviewed_by_user: UserSummary;
    };
    active_tab: 'desa' | 'umkm' | 'pariwisata';
    summary: {
        total_questions: number;
        answered_questions: number;
        unanswered_questions: number;
        total_documents: number;
        total_score: number;
        max_score: number;
        final_score: number;
        highest_aspect: {
            name: string;
            score: number;
            max_score: number;
            score_percent: number;
        } | null;
        lowest_aspect: {
            name: string;
            score: number;
            max_score: number;
            score_percent: number;
        } | null;
    };
    aspects: SurveyAspect[];
    tab_counts: {
        kemenpar: number;
        umkm: number;
        istc: number;
    };
    umkms: UmkmData[];
    pariwisata: PariwisataData[];
    pariwisata_survey_groups: PariwisataSurveyGroup[];
    pariwisata_survey_summary: {
        total_questions: number;
        answered_questions: number;
        unanswered_questions: number;
        total_documents: number;
        total_score: number;
        max_score: number;
        final_score: number;
        last_answered_at: string;
        highest_aspect: { name: string; score_percent: number } | null;
        lowest_aspect: { name: string; score_percent: number } | null;
        aspects: Array<{
            name: string;
            question_count: number;
            answered_count: number;
            documents_count: number;
            score: number;
            max_score: number;
            score_percent: number;
        }>;
        distribution: ScoreDistributionSummary[];
    };
    activities: Array<{
        date: string;
        title: string;
        actor: string;
        type: string;
    }>;
    edit_options: {
        status_options: Option[];
        template_options: Option[];
        village_options: Option[];
        user_options: Option[];
    };
    edit_values: AssignmentEditForm;
    village_annual_edit_values: VillageAnnualEditForm;
};

type Option = {
    value: string;
    label: string;
    description?: string;
};

type AssignmentEditForm = {
    village_id: string;
    survey_template_id: string;
    status: string;
    assigned_by: string;
    submitted_by: string;
    reviewed_by: string;
    assigned_at: string;
    started_at: string;
    last_saved_at: string;
    submitted_at: string;
    reviewed_at: string;
};

type VillageAnnualPopulationStatForm = {
    year: string;
    category_value: string;
    total_people: string;
    notes: string;
};

type VillageVulnerableGroupAnnualForm = {
    vulnerable_category: string;
    year: string;
    total_people: string;
    notes: string;
};

type VillageActiveGroupAnnualForm = {
    active_category: string;
    year: string;
    value: string;
    notes: string;
};

type VillageAnnualEditForm = {
    annual_population_stats: VillageAnnualPopulationStatForm[];
    vulnerable_group_annuals: VillageVulnerableGroupAnnualForm[];
    active_group_annuals: VillageActiveGroupAnnualForm[];
};

type UmkmSurveyAnswer = {
    id: number;
    question_id: number;
    question_number: number | null;
    question_text: string;
    question_weight_percent: number;
    score: number;
    max_score: number;
    weighted_score: number;
    answered_by: UserSummary;
    answered_at: string;
    last_edited_at: string;
};

type UmkmSurveyGroup = {
    criteria_code: string;
    criteria_name: string;
    criteria_weight_percent: number;
    answered_questions: number;
    weighted_score: number;
    answers: UmkmSurveyAnswer[];
};

type UmkmData = {
    id: number;
    name: string;
    business_owner_name: string | null;
    legal_business_name: string | null;
    established_year: number | null;
    production_address: string | null;
    product_category: string | null;
    brand_name: string | null;
    annual_revenue: string;
    monthly_production_capacity: string | null;
    certifications: string | null;
    current_obstacles: string | null;
    has_qris: string;
    has_edc: string;
    has_credit_card: string;
    has_exported: string;
    export_destination_countries: string | null;
    collector: UserSummary;
    product_photo_url: string | null;
    created_at: string;
    updated_at: string;
    survey_summary: {
        answered_questions: number;
        average_score: number;
        weighted_score: number;
        last_answered_at: string;
    };
    survey_groups: UmkmSurveyGroup[];
};

type PariwisataData = {
    id: number;
    name: string;
    image_url: string | null;
    operational_days: string | null;
    operational_hours: string | null;
    operational_schedule: Record<string, string> | null;
    entrance_ticket_price: string;
    entrance_ticket_description: string | null;
    address: string | null;
    person_in_charge_name: string | null;
    person_in_charge_phone: string | null;
    person_in_charge_address: string | null;
    is_active: boolean;
    status_label: string;
    categories: Array<{ id: number; value: string; label: string }>;
    created_at: string;
    updated_at: string;
    detail_url: string;
};

type PariwisataSurveyOption = {
    id: number;
    score: number;
    level: string | null;
    label: string;
    description: string | null;
    sort_order: number;
};

type PariwisataSurveyQuestion = {
    id: number;
    category_code: string | null;
    category_name: string;
    sub_category_code: string | null;
    sub_category_name: string | null;
    criteria_code: string | null;
    criteria_name: string | null;
    indicator_code: string | null;
    indicator_name: string | null;
    indicator_description: string | null;
    supporting_evidence: string | null;
    document_required: boolean;
    document_hint: string | null;
    max_score: number;
    answer: {
        id: number;
        pariwisata_suvey_option_id: number;
        score: number;
        score_label: string;
        option_description: string | null;
        notes: string | null;
        answered_at: string;
        last_edited_at: string;
        answered_by: UserSummary;
        last_edited_by: UserSummary;
        documents: SurveyDocument[];
    } | null;
    options: PariwisataSurveyOption[];
};

type PariwisataSurveyGroup = {
    category_name: string;
    min_sort_order: number;
    question_count: number;
    answered_count: number;
    documents_count: number;
    score: number;
    max_score: number;
    questions: PariwisataSurveyQuestion[];
};

type PariwisataAnswerEditForm = {
    answers: Array<{
        question_id: number;
        pariwisata_suvey_option_id: string;
        notes: string;
        documents: File[];
    }>;
};

type SurveyAnswerEditForm = {
    answers: Array<{
        question_id: number;
        survey_question_option_id: string;
        notes: string;
        documents: File[];
    }>;
};

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function currentYearString() {
    return String(new Date().getFullYear());
}

function cloneVillageAnnualForm(
    values: VillageAnnualEditForm,
): VillageAnnualEditForm {
    return {
        annual_population_stats: values.annual_population_stats.map((row) => ({
            ...row,
        })),
        vulnerable_group_annuals: values.vulnerable_group_annuals.map(
            (row) => ({ ...row }),
        ),
        active_group_annuals: values.active_group_annuals.map((row) => ({
            ...row,
        })),
    };
}

function emptyPopulationStat(): VillageAnnualPopulationStatForm {
    return {
        year: currentYearString(),
        category_value: '',
        total_people: '',
        notes: '',
    };
}

function emptyVulnerableGroupAnnual(): VillageVulnerableGroupAnnualForm {
    return {
        vulnerable_category: '',
        year: currentYearString(),
        total_people: '',
        notes: '',
    };
}

function emptyActiveGroupAnnual(): VillageActiveGroupAnnualForm {
    return {
        active_category: '',
        year: currentYearString(),
        value: '',
        notes: '',
    };
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

function Card({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={classNames(
                'rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_16px_rgba(9,57,103,0.06)]',
                className,
            )}
        >
            {children}
        </section>
    );
}

function Button({
    children,
    variant = 'white',
    className,
}: {
    children: React.ReactNode;
    variant?: 'white' | 'primary';
    className?: string;
}) {
    return (
        <span
            className={classNames(
                'inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition active:scale-[0.98]',
                variant === 'white' &&
                    'border border-[#DDE4EC] bg-white text-[#303030] hover:bg-[#F1F5F8]',
                variant === 'primary' &&
                    'bg-[#0066AE] text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] hover:bg-[#093967]',
                className,
            )}
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

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex min-w-0 gap-3">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center text-[#0066AE]">
                {icon}
            </span>
            <div className="min-w-0">
                <p className="text-xs font-semibold text-[#7C7C7C]">{label}</p>
                <p className="truncate text-sm font-bold text-[#303030]">
                    {value || '-'}
                </p>
            </div>
        </div>
    );
}

function MetricCard({
    label,
    value,
    helper,
    icon,
    tone = 'blue',
    compact = false,
}: {
    label: string;
    value: string;
    helper: string;
    icon: React.ReactNode;
    tone?: 'blue' | 'green' | 'orange';
    compact?: boolean;
}) {
    if (compact) {
        return (
            <Card
                className={classNames(
                    'rounded-xl border p-3 shadow-[0_6px_18px_rgba(15,23,42,0.04)]',
                    tone === 'blue'
                        ? '!border-[#0066AE] !bg-[#0066AE]'
                        : 'border-[#EEF2F7] bg-white',
                )}
            >
                <div className="flex items-center gap-3">
                    <span
                        className={classNames(
                            'flex size-9 shrink-0 items-center justify-center rounded-lg text-white shadow-[0_6px_14px_rgba(0,102,174,0.22)]',
                            tone === 'blue' && 'bg-[#0066AE]',
                            tone === 'green' && 'bg-[#00893D]',
                            tone === 'orange' && 'bg-[#F97316]',
                        )}
                    >
                        {icon}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p
                            className={classNames(
                                'line-clamp-2 text-[11px] leading-snug font-semibold text-wrap break-words',
                                tone === 'blue'
                                    ? 'text-white/80'
                                    : 'text-[#667085]',
                            )}
                        >
                            {label}
                        </p>
                        <div className="mt-1 flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-1.5">
                            <p
                                className={classNames(
                                    'line-clamp-2 text-sm leading-tight font-black text-wrap break-words tabular-nums sm:text-base',
                                    tone === 'blue'
                                        ? 'text-white'
                                        : 'text-[#111827]',
                                )}
                            >
                                {value}
                            </p>
                            <p
                                className={classNames(
                                    'shrink-0 text-[10px] leading-tight font-bold tabular-nums sm:text-xs',
                                    tone === 'blue' && 'text-white/90',
                                    tone === 'green' && 'text-[#00893D]',
                                    tone === 'orange' && 'text-[#F97316]',
                                )}
                            >
                                {helper}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-bold text-[#303030]">{label}</p>
                    <p className="mt-2 text-2xl leading-7 font-bold text-[#303030]">
                        {value}
                    </p>
                    <p
                        className={classNames(
                            'mt-1 text-xs font-bold',
                            tone === 'blue' && 'text-[#0066AE]',
                            tone === 'green' && 'text-[#00893D]',
                            tone === 'orange' && 'text-[#FF944C]',
                        )}
                    >
                        {helper}
                    </p>
                </div>
                <span
                    className={classNames(
                        'flex size-10 shrink-0 items-center justify-center rounded-full',
                        tone === 'blue' && 'bg-[#EAF7FF] text-[#0066AE]',
                        tone === 'green' && 'bg-[#EAF8F0] text-[#00893D]',
                        tone === 'orange' && 'bg-[#FFF4EA] text-[#FF944C]',
                    )}
                >
                    {icon}
                </span>
            </div>
        </Card>
    );
}

function clampScore(value: number) {
    if (!Number.isFinite(value)) {
        return 0;
    }

    return Math.min(100, Math.max(0, value));
}

function formatStatScore(value: number) {
    return clampScore(value).toLocaleString('id-ID', {
        maximumFractionDigits: 1,
    });
}

function formatPointScore(score: number, maxScore: number) {
    return `${score.toLocaleString('id-ID')}/${maxScore.toLocaleString('id-ID')}`;
}

function SurveyStatistics({ aspects }: { aspects: SurveyAspect[] }) {
    const totalScore = aspects.reduce(
        (total, aspect) => total + aspect.score,
        0,
    );
    const maxScore = aspects.reduce(
        (total, aspect) => total + aspect.max_score,
        0,
    );
    const finalScore = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    const scoreAspects = aspects.map((aspect) => ({
        name: aspect.name,
        score: aspect.score,
        max_score: aspect.max_score,
        score_percent: aspect.score_percent,
    }));

    return (
        <VillageStatisticsCards
            aspects={scoreAspects}
            finalScore={finalScore}
        />
    );
}

function parseAnnualNumber(value: string) {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : 0;
}

type VillageAnnualChartSeries = {
    key: string;
    name: string;
    color: string;
};

type VillageAnnualChartRow = {
    year: string;
} & Record<string, string | number>;

const villageAnnualBluePalette = [
    '#003F73',
    '#0066AE',
    '#1B7FC4',
    '#2F99D6',
    '#5BB3E5',
    '#8BCDF0',
    '#0F5D9C',
    '#3A78B8',
    '#64A6D9',
];

function annualSeriesKey(prefix: string, category: string) {
    return `${prefix}_${category}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
}

function annualCategoryLabel(value: string, fallback: string) {
    return value.trim() || fallback;
}

function buildVillageAnnualChartData(values: VillageAnnualEditForm) {
    const rows = new Map<string, VillageAnnualChartRow>();
    const series = new Map<string, VillageAnnualChartSeries>();

    const ensureRow = (year: string) => {
        if (!rows.has(year)) {
            rows.set(year, { year });
        }

        return rows.get(year)!;
    };

    const addValue = (
        year: string,
        prefix: string,
        category: string,
        value: string,
    ) => {
        if (!year) {
            return;
        }

        const label = annualCategoryLabel(category, 'Tanpa Kategori');
        const key = annualSeriesKey(prefix, label);

        if (!series.has(key)) {
            series.set(key, {
                key,
                name: `${prefix} - ${label}`,
                color: villageAnnualBluePalette[
                    series.size % villageAnnualBluePalette.length
                ],
            });
        }

        const row = ensureRow(year);
        row[key] = Number(row[key] ?? 0) + parseAnnualNumber(value);
    };

    values.annual_population_stats.forEach((row) => {
        addValue(row.year, 'Penduduk', row.category_value, row.total_people);
    });

    values.vulnerable_group_annuals.forEach((row) => {
        addValue(
            row.year,
            'Kelompok Rentan',
            row.vulnerable_category,
            row.total_people,
        );
    });

    values.active_group_annuals.forEach((row) => {
        addValue(row.year, 'Kelompok Aktif', row.active_category, row.value);
    });

    return {
        rows: Array.from(rows.values()).sort(
            (first, second) => Number(first.year) - Number(second.year),
        ),
        series: Array.from(series.values()),
    };
}

function VillageAnnualTooltip({
    active,
    label,
    payload,
}: {
    active?: boolean;
    label?: string;
    payload?: Array<{
        color?: string;
        name?: string;
        value?: number | string;
    }>;
}) {
    const items = (payload ?? []).filter((item) => Number(item.value ?? 0) > 0);

    if (!active || items.length === 0) {
        return null;
    }

    return (
        <div className="rounded-xl border border-[#D6E4F2] bg-white p-3 text-xs shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
            <p className="mb-2 font-black text-black">Tahun {label}</p>
            <div className="space-y-1.5">
                {items.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center justify-between gap-4 font-bold text-black"
                    >
                        <span className="inline-flex items-center gap-2">
                            <span
                                className="size-2.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            {item.name}
                        </span>
                        <span className="tabular-nums">
                            {Number(item.value).toLocaleString('id-ID')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function VillageAnnualMultipleBarChart({
    values,
}: {
    values: VillageAnnualEditForm;
}) {
    const chartData = buildVillageAnnualChartData(values);
    const hasData = chartData.rows.some((row) =>
        chartData.series.some((item) => Number(row[item.key] ?? 0) > 0),
    );

    return (
        <Card className="rounded-2xl border border-[#E5EDF6] bg-white p-6 shadow-none">
            <div>
                <h2 className="text-base font-bold text-[#111827]">
                    Statistik Tahunan Desa
                </h2>
                <p className="mt-1 text-sm font-medium text-[#8A97A8]">
                    Populasi, kelompok rentan, dan kelompok aktif per tahun.
                </p>
            </div>

            <div className="mt-5 h-[340px]">
                {!hasData ? (
                    <div className="flex h-full items-center justify-center rounded-xl bg-[#F8FBFE] text-sm font-semibold text-[#8A97A8]">
                        Belum ada data tahunan desa
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData.rows}
                            margin={{
                                top: 12,
                                right: 18,
                                bottom: 0,
                                left: 0,
                            }}
                        >
                            <CartesianGrid
                                stroke="#E4EAF2"
                                strokeDasharray="4 4"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="year"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: '#667085',
                                    fontSize: 11,
                                    fontWeight: 700,
                                }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) =>
                                    Number(value).toLocaleString('id-ID')
                                }
                                tick={{
                                    fill: '#98A2B3',
                                    fontSize: 10,
                                    fontWeight: 600,
                                }}
                            />
                            <Tooltip
                                content={<VillageAnnualTooltip />}
                                cursor={{ fill: 'rgba(0, 102, 174, 0.08)' }}
                            />
                            <Legend
                                wrapperStyle={{
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    color: '#000000',
                                }}
                            />
                            {chartData.series.map((item) => (
                                <Bar
                                    key={item.key}
                                    dataKey={item.key}
                                    name={item.name}
                                    fill={item.color}
                                    radius={[8, 8, 0, 0]}
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </Card>
    );
}
function SurveyFinalScoreGauge({ score }: { score: number }) {
    const normalizedScore = clampScore(score);

    return (
        <Card className="flex min-h-[360px] flex-col rounded-2xl border border-[#E5EDF6] bg-white p-6 shadow-none">
            <div>
                <h2 className="text-base font-bold text-[#111827]">
                    Skor Akhir Survey
                </h2>
                <p className="mt-1 text-sm font-medium text-[#8A97A8]">
                    Nilai kesiapan keseluruhan
                </p>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center pt-4">
                <div className="relative h-40 w-full max-w-[280px]">
                    <svg
                        viewBox="0 0 240 140"
                        className="h-full w-full"
                        aria-label={`Skor akhir ${formatStatScore(normalizedScore)} persen`}
                    >
                        <path
                            d="M 30 115 A 90 90 0 0 1 210 115"
                            fill="none"
                            stroke="#E9EEF5"
                            strokeLinecap="round"
                            strokeWidth="20"
                            pathLength={100}
                        />
                        <path
                            d="M 30 115 A 90 90 0 0 1 210 115"
                            fill="none"
                            stroke="#0066AE"
                            strokeLinecap="round"
                            strokeWidth="20"
                            pathLength={100}
                            strokeDasharray={`${normalizedScore} ${100 - normalizedScore}`}
                        />
                    </svg>
                    <div className="absolute inset-x-0 bottom-0 text-center">
                        <p className="text-4xl font-black tracking-[-0.04em] text-[#111827]">
                            {formatStatScore(normalizedScore)}%
                        </p>
                    </div>
                </div>

                <div className="mt-7 flex w-full max-w-[260px] justify-between text-xs font-bold text-[#9AA7B6]">
                    <span>0%</span>
                    <span>100%</span>
                </div>
            </div>
        </Card>
    );
}

function AspectScoreBars({ aspects }: { aspects: ScoreAspectSummary[] }) {
    return (
        <Card className="min-h-[360px] rounded-2xl border border-[#E5EDF6] bg-white p-6 shadow-none">
            <h2 className="text-base font-bold text-[#111827]">
                Skor per Aspek
            </h2>
            <p className="mt-1 text-sm font-medium text-[#8A97A8]">
                Total skor per aspek
            </p>

            <div className="mt-6 space-y-4">
                {aspects.length === 0 ? (
                    <div className="flex h-52 items-center justify-center rounded-xl bg-[#F8FBFE] text-sm font-semibold text-[#8A97A8]">
                        Belum ada data aspek
                    </div>
                ) : (
                    aspects.map((aspect) => (
                        <div
                            key={aspect.name}
                            className="grid gap-2 md:grid-cols-[160px_minmax(0,1fr)_72px] md:items-center"
                        >
                            <p className="truncate text-xs font-semibold text-[#344256]">
                                {aspect.name}
                            </p>
                            <div className="relative h-4 overflow-hidden rounded-full bg-[#EAF0F7]">
                                <div
                                    className="h-full rounded-full bg-[#0066AE]"
                                    style={{
                                        width: `${clampScore(aspect.score_percent)}%`,
                                    }}
                                />
                            </div>
                            <p className="text-right text-xs font-black text-[#111827] tabular-nums">
                                {formatPointScore(
                                    aspect.score,
                                    aspect.max_score,
                                )}
                            </p>
                        </div>
                    ))
                )}
            </div>

            <p className="mt-5 text-[11px] font-bold text-[#9AA7B6] md:ml-[160px]">
                Total skor aktual / skor maksimal per aspek
            </p>
        </Card>
    );
}

function AspectRadarComparison({ aspects }: { aspects: ScoreAspectSummary[] }) {
    const chartData = aspects.map((aspect) => ({
        aspect:
            aspect.name.length > 18
                ? `${aspect.name.slice(0, 18)}…`
                : aspect.name,
        fullAspect: aspect.name,
        score: Number(clampScore(aspect.score_percent).toFixed(1)),
    }));

    if (chartData.length === 1) {
        chartData.push({ aspect: ' ', fullAspect: ' ', score: 0 });
        chartData.push({ aspect: '  ', fullAspect: '  ', score: 0 });
    } else if (chartData.length === 2) {
        chartData.push({ aspect: ' ', fullAspect: ' ', score: 0 });
    }

    return (
        <Card className="min-h-[360px] rounded-2xl border border-[#E5EDF6] bg-white p-6 shadow-none">
            <h2 className="text-base font-bold text-[#111827]">
                Perbandingan Aspek (Radar)
            </h2>
            <p className="mt-1 text-sm font-medium text-[#8A97A8]">
                Visualisasi nilai antar aspek
            </p>

            <div className="mt-4 h-[265px]">
                {aspects.length === 0 ? (
                    <div className="flex h-full items-center justify-center rounded-xl bg-[#F8FBFE] text-sm font-semibold text-[#8A97A8]">
                        Belum ada data aspek
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                            cx="50%"
                            cy="50%"
                            outerRadius="66%"
                            data={chartData}
                        >
                            <PolarGrid stroke="#E4EAF2" />
                            <PolarAngleAxis
                                dataKey="aspect"
                                tick={{
                                    fill: '#667085',
                                    fontSize: 10,
                                    fontWeight: 700,
                                }}
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, 100]}
                                tick={{
                                    fill: '#98A2B3',
                                    fontSize: 9,
                                    fontWeight: 600,
                                }}
                                tickCount={5}
                                axisLine={false}
                            />
                            <Radar
                                dataKey="score"
                                stroke="#0066AE"
                                strokeWidth={2}
                                fill="#0066AE"
                                fillOpacity={0.22}
                                dot={{
                                    r: 3,
                                    fill: '#0066AE',
                                    stroke: '#FFFFFF',
                                    strokeWidth: 1.5,
                                }}
                            />
                            <Tooltip
                                formatter={(value) => [
                                    `${formatStatScore(Number(value))}%`,
                                    'Skor',
                                ]}
                                labelFormatter={(label) => {
                                    const item = chartData.find(
                                        (data) => data.aspect === label,
                                    );

                                    return item?.fullAspect ?? label;
                                }}
                                contentStyle={{
                                    border: '1px solid #E5EDF6',
                                    borderRadius: '12px',
                                    boxShadow:
                                        '0 12px 32px rgba(15, 23, 42, 0.08)',
                                    fontSize: '12px',
                                }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </Card>
    );
}

function VillageStatisticsCards({
    aspects,
    finalScore,
}: {
    aspects: ScoreAspectSummary[];
    finalScore: number;
}) {
    return (
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.25fr_1fr]">
            <SurveyFinalScoreGauge score={finalScore} />
            <AspectScoreBars aspects={aspects} />
            <AspectRadarComparison aspects={aspects} />
        </div>
    );
}
function DocumentBadge({ document }: { document: SurveyDocument }) {
    const { assignment } = usePage<any>().props;
    const isPdf = document.mime_type?.includes('pdf');

    return (
        <div className="flex min-w-0 items-center gap-3">
            <span
                className={classNames(
                    'flex size-8 shrink-0 items-center justify-center rounded',
                    isPdf
                        ? 'bg-[#FDECEC] text-[#D81313]'
                        : 'bg-[#EAF8F0] text-[#00893D]',
                )}
            >
                <FileText size={16} strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
                <EditableFileName
                    fileName={document.file_name}
                    updateUrl={updateSurveyDocument.url({
                        assignment: assignment.id,
                        document: document.id,
                    })}
                    className="text-xs font-bold text-[#303030]"
                />
                <p className="text-[11px] font-semibold text-[#7C7C7C]">
                    {document.file_size_label} · {document.uploaded_by.name}
                </p>
            </div>
            <a
                href={document.file_url}
                target="_blank"
                rel="noreferrer"
                className="flex size-7 shrink-0 items-center justify-center rounded border border-[#DDE4EC] text-[#0066AE]"
                aria-label={`Lihat ${document.file_name}`}
            >
                <Eye size={14} />
            </a>
            <a
                href={document.file_url}
                download
                className="flex size-7 shrink-0 items-center justify-center rounded border border-[#DDE4EC] text-[#0066AE]"
                aria-label={`Unduh ${document.file_name}`}
            >
                <Download size={14} />
            </a>
        </div>
    );
}

function QuestionRow({
    question,
    number,
    onViewDetail,
    onViewHistory,
    onEditData,
    isViewer,
}: {
    question: SurveyQuestion;
    number: number;
    onViewDetail: (question: SurveyQuestion) => void;
    onViewHistory: (question: SurveyQuestion) => void;
    onEditData: (question: SurveyQuestion) => void;
    isViewer: boolean;
}) {
    const answered = Boolean(question.answer);

    return (
        <div
            className={classNames(
                'grid gap-3 border-b border-[#EFEFEF] px-4 py-4 last:border-b-0',
                isViewer
                    ? 'xl:grid-cols-[38px_minmax(220px,1.25fr)_170px_minmax(240px,.95fr)]'
                    : 'xl:grid-cols-[38px_minmax(220px,1.25fr)_170px_minmax(240px,.95fr)_130px_130px_112px]',
            )}
        >
            <div className="flex size-8 items-center justify-center rounded-full border border-[#CAD7E6] text-xs font-bold text-[#7C7C7C]">
                {String(number).padStart(2, '0')}
            </div>

            <div className="min-w-0">
                <p className="text-sm leading-5 font-semibold text-[#303030]">
                    {question.question_text}
                </p>
                {question.document_hint && (
                    <p className="mt-2 text-xs font-semibold text-[#7C7C7C]">
                        {question.document_hint}
                    </p>
                )}
            </div>

            <div className="flex items-center">
                <div
                    className={classNames(
                        'w-full rounded-lg px-4 py-3 text-center shadow-[0_6px_12px_rgba(0,102,174,0.10)]',
                        answered
                            ? 'bg-[#0066AE] text-white'
                            : 'bg-[#F1F5F8] text-[#7C7C7C]',
                    )}
                >
                    <p className="text-sm font-bold">
                        Skor {question.answer?.score ?? '-'} /{' '}
                        {question.max_score || '-'}
                    </p>
                    <p className="line-clamp-2 text-[11px] font-semibold opacity-80">
                        {question.answer?.score_label ?? 'Belum dijawab'}
                    </p>
                </div>
            </div>

            <div className="flex min-w-0 flex-col justify-center text-center">
                <p className="mb-2 text-xs font-bold text-[#303030]">
                    Dokumen Pendukung ({question.answer?.documents.length ?? 0})
                </p>
                <div className="space-y-2">
                    {question.answer?.documents.map((document) => (
                        <DocumentBadge key={document.id} document={document} />
                    ))}
                    {(question.answer?.documents.length ?? 0) === 0 && (
                        <p className="rounded-lg bg-[#F7F7F7] px-3 py-2 text-center text-xs font-semibold text-[#7C7C7C]">
                            Tidak ada dokumen
                        </p>
                    )}
                </div>
            </div>

            {!isViewer && (
                <div className="flex min-w-0 flex-col justify-center text-center text-xs">
                    <p className="flex items-center justify-center gap-2 font-semibold text-[#7C7C7C]">
                        <UserRound size={14} className="text-[#0066AE]" />
                        Dijawab oleh
                    </p>
                    <p className="mt-1 font-bold text-[#303030]">
                        {question.answer?.answered_by.name ?? '-'}
                    </p>
                </div>
            )}

            {!isViewer && (
                <div className="flex min-w-0 flex-col justify-center text-center text-xs">
                    <p className="flex items-center justify-center gap-2 font-semibold text-[#7C7C7C]">
                        <Clock3 size={14} className="text-[#0066AE]" />
                        Terakhir diedit
                    </p>
                    <p className="mt-1 font-bold text-[#303030]">
                        {question.answer?.last_edited_at ?? '-'}
                    </p>
                </div>
            )}

            {!isViewer && (
                <div className="flex items-center justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                            >
                                Action
                                <ChevronDown size={14} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-44 rounded-lg border-[#EFEFEF] bg-white text-xs shadow-[0_12px_30px_rgba(3,17,32,0.14)]"
                        >
                            <DropdownMenuItem
                                className="gap-2 text-xs"
                                onClick={() => onViewDetail(question)}
                            >
                                <Eye className="size-4 text-[#303030]" />
                                Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2 text-xs"
                                onClick={() => onEditData(question)}
                            >
                                <PanelRightOpen className="size-4 text-[#303030]" />
                                Edit Jawaban
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2 text-xs"
                                onClick={() => onViewHistory(question)}
                            >
                                <Clock3 className="size-4 text-[#303030]" />
                                Lihat Riwayat
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    );
}

function PariwisataQuestionRow({
    question,
    number,
    onViewDetail,
    onEditData,
    isViewer,
}: {
    question: PariwisataSurveyQuestion;
    number: number;
    onViewDetail: (question: PariwisataSurveyQuestion) => void;
    onEditData: (question: PariwisataSurveyQuestion) => void;
    isViewer: boolean;
}) {
    const answered = Boolean(question.answer);
    const title = question.indicator_name ?? question.criteria_name ?? '-';
    const meta = [
        question.criteria_code
            ? `${question.criteria_code}  ${question.criteria_name ?? '-'}`
            : null,
        question.indicator_code ? `${question.indicator_code}` : null,
    ].filter(Boolean);

    return (
        <div
            className={classNames(
                'grid gap-3 border-b border-[#EFEFEF] px-4 py-4 last:border-b-0',
                isViewer
                    ? 'xl:grid-cols-[38px_minmax(220px,1.25fr)_170px_minmax(240px,.95fr)]'
                    : 'xl:grid-cols-[38px_minmax(220px,1.25fr)_170px_minmax(240px,.95fr)_130px_130px_112px]',
            )}
        >
            <div className="flex size-8 items-center justify-center rounded-full border border-[#CAD7E6] text-xs font-bold text-[#7C7C7C]">
                {String(number).padStart(2, '0')}
            </div>

            <div className="min-w-0">
                <p className="text-sm leading-5 font-semibold text-[#303030]">
                    {title}
                </p>
                {meta.length > 0 && (
                    <p className="mt-1 text-xs font-semibold text-[#0066AE]">
                        {meta.join('  ')}
                    </p>
                )}
                {(question.indicator_description || question.document_hint) && (
                    <p className="mt-2 text-xs font-semibold text-[#7C7C7C]">
                        {question.indicator_description ??
                            question.document_hint}
                    </p>
                )}
            </div>

            <div className="flex items-center">
                <div
                    className={classNames(
                        'w-full rounded-lg px-4 py-3 text-center shadow-[0_6px_12px_rgba(0,102,174,0.10)]',
                        answered
                            ? 'bg-[#0066AE] text-white'
                            : 'bg-[#F1F5F8] text-[#7C7C7C]',
                    )}
                >
                    <p className="text-sm font-bold">
                        Skor {question.answer?.score ?? '-'} /{' '}
                        {question.max_score || '-'}
                    </p>
                    <p className="line-clamp-2 text-[11px] font-semibold opacity-80">
                        {question.answer?.score_label ?? 'Belum dijawab'}
                    </p>
                </div>
            </div>

            <div className="flex min-w-0 flex-col justify-center text-center">
                <p className="mb-2 text-xs font-bold text-[#303030]">
                    Dokumen Pendukung ({question.answer?.documents.length ?? 0})
                </p>
                <div className="space-y-2">
                    {question.answer?.documents.map((document) => (
                        <DocumentBadge key={document.id} document={document} />
                    ))}
                    {(question.answer?.documents.length ?? 0) === 0 && (
                        <p className="rounded-lg bg-[#F7F7F7] px-3 py-2 text-center text-xs font-semibold text-[#7C7C7C]">
                            Tidak ada dokumen
                        </p>
                    )}
                </div>
            </div>

            {!isViewer && (
                <div className="flex min-w-0 flex-col justify-center text-center text-xs">
                    <p className="flex items-center justify-center gap-2 font-semibold text-[#7C7C7C]">
                        <UserRound size={14} className="text-[#0066AE]" />
                        Dijawab oleh
                    </p>
                    <p className="mt-1 font-bold text-[#303030]">
                        {question.answer?.answered_by.name ?? '-'}
                    </p>
                </div>
            )}

            {!isViewer && (
                <div className="flex min-w-0 flex-col justify-center text-center text-xs">
                    <p className="flex items-center justify-center gap-2 font-semibold text-[#7C7C7C]">
                        <Clock3 size={14} className="text-[#0066AE]" />
                        Terakhir diedit
                    </p>
                    <p className="mt-1 font-bold text-[#303030]">
                        {question.answer?.last_edited_at ?? '-'}
                    </p>
                </div>
            )}

            {!isViewer && (
                <div className="flex items-center justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                            >
                                Action
                                <ChevronDown size={14} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-44 rounded-lg border-[#EFEFEF] bg-white text-xs shadow-[0_12px_30px_rgba(3,17,32,0.14)]"
                        >
                            <DropdownMenuItem
                                className="gap-2 text-xs"
                                onClick={() => onViewDetail(question)}
                            >
                                <Eye className="size-4 text-[#303030]" />
                                Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2 text-xs"
                                onClick={() => onEditData(question)}
                            >
                                <PanelRightOpen className="size-4 text-[#303030]" />
                                Edit Jawaban
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    );
}

function PariwisataAnswerDetailModal({
    question,
    open,
    onOpenChange,
}: {
    question: PariwisataSurveyQuestion | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    if (!question) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-[#303030]">
                        Detail Jawaban Survey ISTC
                    </DialogTitle>
                    <DialogDescription>
                        Pertanyaan, opsi jawaban, skor terpilih, catatan, dan
                        file pendukung.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">
                    <section className="rounded-xl bg-[#F8FBFF] p-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#0066AE]">
                            {question.criteria_code && (
                                <span>{question.criteria_code}</span>
                            )}
                            {question.indicator_code && (
                                <span> {question.indicator_code}</span>
                            )}
                        </div>
                        <h3 className="mt-2 text-base leading-6 font-bold text-[#303030]">
                            {question.indicator_name ??
                                question.criteria_name ??
                                '-'}
                        </h3>
                        {question.indicator_description && (
                            <p className="mt-2 text-sm font-semibold text-[#7C7C7C]">
                                {question.indicator_description}
                            </p>
                        )}
                        {question.document_hint && (
                            <p className="mt-2 text-sm font-semibold text-[#7C7C7C]">
                                {question.document_hint}
                            </p>
                        )}
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Opsi Jawaban
                        </h4>
                        <div className="mt-2 divide-y divide-[#EFEFEF] rounded-xl border border-[#EFEFEF]">
                            {question.options.map((option) => {
                                const selected =
                                    option.id ===
                                    question.answer?.pariwisata_suvey_option_id;

                                return (
                                    <div
                                        key={option.id}
                                        className={classNames(
                                            'grid gap-3 px-4 py-3 text-sm sm:grid-cols-[72px_1fr]',
                                            selected && 'bg-[#EAF3FF]',
                                        )}
                                    >
                                        <span className="font-bold text-[#0066AE]">
                                            Skor {option.score}
                                        </span>
                                        <div>
                                            <span className="font-semibold text-[#303030]">
                                                {option.label}
                                            </span>
                                            {option.description && (
                                                <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                                    {option.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Metadata Jawaban
                        </h4>
                        <div className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
                            <div className="rounded-xl bg-[#F7F7F7] px-4 py-3">
                                <p className="text-xs font-bold text-[#7C7C7C]">
                                    Dijawab oleh
                                </p>
                                <p className="mt-1 font-semibold text-[#303030]">
                                    {question.answer?.answered_by.name ?? '-'}
                                </p>
                            </div>
                            <div className="rounded-xl bg-[#F7F7F7] px-4 py-3">
                                <p className="text-xs font-bold text-[#7C7C7C]">
                                    Dijawab pada
                                </p>
                                <p className="mt-1 font-semibold text-[#303030]">
                                    {question.answer?.answered_at ?? '-'}
                                </p>
                            </div>
                            <div className="rounded-xl bg-[#F7F7F7] px-4 py-3">
                                <p className="text-xs font-bold text-[#7C7C7C]">
                                    Terakhir diedit oleh
                                </p>
                                <p className="mt-1 font-semibold text-[#303030]">
                                    {question.answer?.last_edited_by.name ??
                                        '-'}
                                </p>
                            </div>
                            <div className="rounded-xl bg-[#F7F7F7] px-4 py-3">
                                <p className="text-xs font-bold text-[#7C7C7C]">
                                    Terakhir diedit pada
                                </p>
                                <p className="mt-1 font-semibold text-[#303030]">
                                    {question.answer?.last_edited_at ?? '-'}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Catatan Jawaban
                        </h4>
                        <div className="mt-2 rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm font-semibold text-[#303030]">
                            {question.answer?.notes || 'Tidak ada catatan.'}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Catatan Jawaban
                        </h4>
                        <div className="mt-2 rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm font-semibold text-[#303030]">
                            {question.answer?.notes || 'Tidak ada catatan.'}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            File Pendukung
                        </h4>
                        <div className="mt-2 space-y-2">
                            {question.answer?.documents.map((document) => (
                                <DocumentBadge
                                    key={document.id}
                                    document={document}
                                />
                            ))}
                            {(question.answer?.documents.length ?? 0) === 0 && (
                                <p className="rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm font-semibold text-[#7C7C7C]">
                                    Belum ada file pendukung.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function PariwisataAnswerEditModal({
    assignmentCode,
    question,
    open,
    onOpenChange,
}: {
    assignmentCode: string;
    question: PariwisataSurveyQuestion | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<PariwisataAnswerEditForm>({
            answers: [
                {
                    question_id: question?.id ?? 0,
                    pariwisata_suvey_option_id: question?.answer
                        ? String(question.answer.pariwisata_suvey_option_id)
                        : '',
                    notes: question?.answer?.notes ?? '',
                    documents: [],
                },
            ],
        });

    useEffect(() => {
        if (!open || !question) {
            return;
        }

        setData({
            answers: [
                {
                    question_id: question.id,
                    pariwisata_suvey_option_id: question.answer
                        ? String(question.answer.pariwisata_suvey_option_id)
                        : '',
                    notes: question.answer?.notes ?? '',
                    documents: [],
                },
            ],
        });
        clearErrors();
    }, [clearErrors, open, question, setData]);

    if (!question) {
        return null;
    }

    const currentAnswer = data.answers[0] ?? {
        question_id: question.id,
        pariwisata_suvey_option_id: '',
        notes: '',
        documents: [],
    };

    function updateAnswerField(
        key:
            | 'question_id'
            | 'pariwisata_suvey_option_id'
            | 'notes'
            | 'documents',
        value: number | string | File[],
    ) {
        setData('answers', [
            {
                ...currentAnswer,
                [key]: value,
            },
        ]);
    }

    const errorBag = errors as Record<string, string | undefined>;
    const selectedOptionError =
        errorBag['answers.0.pariwisata_suvey_option_id'] ??
        errorBag.pariwisata_suvey_option_id;
    const notesError = errorBag['answers.0.notes'] ?? errorBag.notes;
    const documentsError =
        Object.entries(errorBag).find(
            ([key]) =>
                key.startsWith('answers.0.documents') || key === 'documents',
        )?.[1] ?? undefined;

    function handleFilesChange(fileList: FileList | null) {
        if (!fileList) {
            return;
        }

        updateAnswerField('documents', [
            ...currentAnswer.documents,
            ...Array.from(fileList),
        ]);
    }

    function removePendingFile(fileIndex: number) {
        updateAnswerField(
            'documents',
            currentAnswer.documents.filter((_, index) => index !== fileIndex),
        );
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post(storePariwisataSurveyDraft.url({ assignment: assignmentCode }), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onOpenChange(false);
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-[#303030]">
                        Edit Jawaban Survey ISTC
                    </DialogTitle>
                    <DialogDescription>
                        Ubah jawaban, catatan, atau tambahkan dokumen pendukung
                        untuk pertanyaan ini.
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <section className="rounded-xl bg-[#F8FBFF] p-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#0066AE]">
                            {question.criteria_code && (
                                <span>{question.criteria_code}</span>
                            )}
                            {question.indicator_code && (
                                <span>{question.indicator_code}</span>
                            )}
                        </div>
                        <h3 className="mt-2 text-base leading-6 font-bold text-[#303030]">
                            {question.indicator_name ??
                                question.criteria_name ??
                                '-'}
                        </h3>
                        {question.indicator_description && (
                            <p className="mt-2 text-sm font-semibold text-[#7C7C7C]">
                                {question.indicator_description}
                            </p>
                        )}
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Pilih Opsi Jawaban
                        </h4>
                        <div className="mt-2 divide-y divide-[#EFEFEF] rounded-xl border border-[#EFEFEF]">
                            {question.options.map((option) => {
                                const selected =
                                    String(option.id) ===
                                    currentAnswer.pariwisata_suvey_option_id;

                                return (
                                    <label
                                        key={option.id}
                                        className={classNames(
                                            'flex cursor-pointer gap-3 px-4 py-3 text-sm',
                                            selected && 'bg-[#EAF3FF]',
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name={`pariwisata-option-${question.id}`}
                                            value={option.id}
                                            checked={selected}
                                            onChange={(event) =>
                                                updateAnswerField(
                                                    'pariwisata_suvey_option_id',
                                                    event.target.value,
                                                )
                                            }
                                            className="mt-1"
                                        />
                                        <div className="min-w-0">
                                            <p className="font-bold text-[#0066AE]">
                                                Skor {option.score} ·{' '}
                                                {option.label}
                                            </p>
                                            {option.description && (
                                                <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                                    {option.description}
                                                </p>
                                            )}
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                        <FieldError message={selectedOptionError} />
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Catatan Jawaban
                        </h4>
                        <textarea
                            value={currentAnswer.notes}
                            onChange={(event) =>
                                updateAnswerField('notes', event.target.value)
                            }
                            rows={4}
                            className="mt-2 w-full rounded-xl border border-[#DDE4EC] bg-white px-4 py-3 text-sm font-medium text-[#303030] transition outline-none focus:border-[#0066AE] focus:ring-2 focus:ring-[#0066AE]/10"
                            placeholder="Tambahkan catatan jawaban bila diperlukan"
                        />
                        <FieldError message={notesError} />
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Dokumen Existing
                        </h4>
                        <div className="mt-2 space-y-2">
                            {question.answer?.documents.map((document) => (
                                <DocumentBadge
                                    key={document.id}
                                    document={document}
                                />
                            ))}
                            {(question.answer?.documents.length ?? 0) === 0 && (
                                <p className="rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm font-semibold text-[#7C7C7C]">
                                    Belum ada file pendukung.
                                </p>
                            )}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Tambah Dokumen Baru
                        </h4>
                        <div className="mt-2 rounded-xl border border-dashed border-[#D7E8F8] bg-[#F8FBFE] p-4">
                            <input
                                type="file"
                                multiple
                                accept="image/jpeg,image/png,image/webp,application/pdf"
                                onChange={(event) =>
                                    handleFilesChange(event.target.files)
                                }
                                className="block w-full text-sm font-medium text-[#303030] file:mr-3 file:rounded-lg file:border-0 file:bg-[#0066AE] file:px-3 file:py-2 file:text-sm file:font-bold file:text-white"
                            />
                            <p className="mt-2 text-xs font-semibold text-[#7C7C7C]">
                                JPG, PNG, WEBP, atau PDF. Maksimal 50 MB per
                                file.
                            </p>
                        </div>
                        <FieldError message={documentsError} />
                        {currentAnswer.documents.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {currentAnswer.documents.map((file, index) => (
                                    <div
                                        key={`${file.name}-${file.lastModified}-${index}`}
                                        className="flex items-center justify-between gap-3 rounded-xl border border-[#EFEFEF] bg-white px-3 py-2"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-[#303030]">
                                                {file.name}
                                            </p>
                                            <p className="text-xs font-semibold text-[#7C7C7C]">
                                                {(
                                                    file.size /
                                                    (1024 * 1024)
                                                ).toFixed(2)}{' '}
                                                MB
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removePendingFile(index)
                                            }
                                            className="inline-flex items-center gap-1 rounded-lg border border-[#F2D6D6] bg-[#FFF7F7] px-3 py-2 text-xs font-bold text-[#D81313]"
                                        >
                                            <Trash2 size={14} />
                                            Hapus
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                        >
                            <Button>Batal</Button>
                        </button>
                        <button type="submit" disabled={processing}>
                            <Button variant="primary">
                                <Save size={16} />
                                {processing ? 'Menyimpan...' : 'Simpan Jawaban'}
                            </Button>
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function SidebarCard({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <Card className="overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[#EFEFEF] px-4 py-3">
                <span className="text-[#0066AE]">{icon}</span>
                <h3 className="text-sm font-bold text-[#303030]">{title}</h3>
            </div>
            <div className="p-4">{children}</div>
        </Card>
    );
}

function TabButton({
    active,
    label,
    count,
    icon,
    href,
}: {
    active: boolean;
    label: string;
    count: number | string;
    icon: React.ReactNode;
    href: string;
}) {
    return (
        <Link
            href={href}
            preserveScroll
            className={classNames(
                'inline-flex h-11 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-bold transition',
                active
                    ? 'bg-[#0066AE] text-white shadow-[0_10px_22px_rgba(0,102,174,0.18)]'
                    : 'border border-[#DDE4EC] bg-white text-[#303030] hover:bg-[#F1F5F8]',
            )}
        >
            {icon}
            <span>{label}</span>
            <span
                className={classNames(
                    'rounded-full px-2 py-0.5 text-[11px] font-black',
                    active
                        ? 'bg-white/20 text-white'
                        : 'bg-[#EAF3FF] text-[#0066AE]',
                )}
            >
                {count}
            </span>
        </Link>
    );
}

function EmptyState({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <Card className="px-4 py-12 text-center">
            <p className="text-sm font-bold text-[#303030]">{title}</p>
            <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                {description}
            </p>
        </Card>
    );
}

function DetailPair({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="min-w-0">
            <p className="text-[11px] font-black tracking-[0.06em] text-[#7C7C7C] uppercase">
                {label}
            </p>
            <p className="mt-1 text-sm font-bold break-words text-[#303030]">
                {value || '-'}
            </p>
        </div>
    );
}

function UmkmTab({
    umkms,
    assignmentCode,
    isViewer,
}: {
    umkms: UmkmData[];
    assignmentCode: string;
    isViewer: boolean;
}) {
    const averageScore = umkms.length
        ? Math.round(
              (umkms.reduce(
                  (total, umkm) => total + umkm.survey_summary.average_score,
                  0,
              ) /
                  umkms.length) *
                  10,
          ) / 10
        : 0;
    const rankedUmkms = [...umkms].sort(
        (first, second) =>
            second.survey_summary.weighted_score -
            first.survey_summary.weighted_score,
    );
    const highestUmkm = rankedUmkms[0] ?? null;
    const lowestUmkm = rankedUmkms[rankedUmkms.length - 1] ?? null;

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-xl border border-[#D7E8F8] bg-[#F8FBFE] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-base font-bold text-[#303030]">
                        Data UMKM dan Assessment
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-[#7C7C7C]">
                        Master UMKM ditampilkan bersama ringkasan dan jawaban
                        assessment 0-100.
                    </p>
                </div>
                {!isViewer && (
                    <Link href={createUmkm.url(assignmentCode)}>
                        <Button variant="primary">
                            <ClipboardCheck size={16} />
                            Tambah UMKM
                        </Button>
                    </Link>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                    label="Total UMKM"
                    value={String(umkms.length)}
                    helper="Master terdata"
                    icon={<Folder size={22} />}
                />
                <MetricCard
                    label="Rata-rata Skor"
                    value={String(averageScore)}
                    helper="Skala 0-100"
                    icon={<Star size={22} />}
                />
                <MetricCard
                    label="UMKM Skor Tertinggi"
                    value={
                        highestUmkm
                            ? String(highestUmkm.survey_summary.weighted_score)
                            : '-'
                    }
                    helper={highestUmkm?.name ?? 'Belum ada data'}
                    icon={<ClipboardCheck size={22} />}
                />
                <MetricCard
                    label="UMKM Skor Terendah"
                    value={
                        lowestUmkm
                            ? String(lowestUmkm.survey_summary.weighted_score)
                            : '-'
                    }
                    helper={lowestUmkm?.name ?? 'Belum ada data'}
                    icon={<CheckCircle2 size={22} />}
                    tone={umkms.length ? 'green' : 'orange'}
                />
            </div>

            {umkms.length === 0 ? (
                <EmptyState
                    title="Belum ada UMKM"
                    description="Tambahkan UMKM dari tombol Tambah UMKM untuk mulai assessment."
                />
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {umkms.map((umkm) => (
                        <UmkmCard
                            key={umkm.id}
                            umkm={umkm}
                            assignmentCode={assignmentCode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function UmkmCard({
    umkm,
    assignmentCode,
}: {
    umkm: UmkmData;
    assignmentCode: string;
}) {
    return (
        <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(9,57,103,0.10)]">
            <div className="p-4">
                {umkm.product_photo_url ? (
                    <img
                        src={umkm.product_photo_url}
                        alt={umkm.name}
                        className="h-40 w-full rounded-xl object-cover"
                    />
                ) : (
                    <div className="flex h-40 items-center justify-center rounded-xl bg-[#EAF3FF] px-4 text-center text-sm font-bold text-[#0066AE]">
                        {umkm.name}
                    </div>
                )}

                <div className="mt-4 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <span className="inline-flex rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[11px] font-bold text-[#0066AE]">
                                {umkm.product_category ?? 'Tanpa kategori'}
                            </span>
                            <h3 className="mt-2 line-clamp-1 text-base font-bold text-[#303030]">
                                {umkm.name}
                            </h3>
                            <p className="mt-1 line-clamp-1 text-sm font-semibold text-[#7C7C7C]">
                                {umkm.business_owner_name ??
                                    'Pemilik belum diisi'}
                            </p>
                        </div>
                        <div className="shrink-0 rounded-xl bg-[#F8FBFE] px-3 py-2 text-right">
                            <p className="text-[10px] font-black tracking-[0.06em] text-[#7C7C7C] uppercase">
                                Skor
                            </p>
                            <p className="text-lg font-bold text-[#093967]">
                                {umkm.survey_summary.weighted_score}
                            </p>
                        </div>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-5 font-semibold text-[#7C7C7C]">
                        {umkm.production_address ??
                            'Alamat produksi belum diisi'}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-lg bg-[#F7F7F7] px-3 py-2">
                            <p className="font-semibold text-[#7C7C7C]">
                                Brand
                            </p>
                            <p className="mt-0.5 truncate font-bold text-[#303030]">
                                {umkm.brand_name ?? '-'}
                            </p>
                        </div>
                        <div className="rounded-lg bg-[#F7F7F7] px-3 py-2">
                            <p className="font-semibold text-[#7C7C7C]">
                                Jawaban
                            </p>
                            <p className="mt-0.5 font-bold text-[#303030]">
                                {umkm.survey_summary.answered_questions}
                            </p>
                        </div>
                    </div>

                    <Link
                        href={showUmkm.url({
                            assignment: assignmentCode,
                            umkm: umkm.id,
                        })}
                        className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                    >
                        <Eye size={14} />
                        Lihat Survey UMKM
                    </Link>
                </div>
            </div>
        </Card>
    );
}

function PariwisataTab({
    pariwisata,
    assignmentCode,
    surveySummary,
    surveyGroups,
    isViewer,
}: {
    pariwisata: PariwisataData[];
    assignmentCode: string;
    surveySummary: SurveyAssignmentShowProps['pariwisata_survey_summary'];
    surveyGroups: SurveyAssignmentShowProps['pariwisata_survey_groups'];
    isViewer: boolean;
}) {
    const [search, setSearch] = useState('');
    const [aspectFilter, setAspectFilter] = useState('all');
    const [detailQuestion, setDetailQuestion] =
        useState<PariwisataSurveyQuestion | null>(null);
    const [editingQuestion, setEditingQuestion] =
        useState<PariwisataSurveyQuestion | null>(null);
    const [closedAspects, setClosedAspects] = useState<Record<string, boolean>>(
        {},
    );
    const filteredGroups = useMemo(
        () =>
            surveyGroups
                .filter(
                    (group) =>
                        aspectFilter === 'all' ||
                        group.category_name === aspectFilter,
                )
                .map((group) => ({
                    ...group,
                    questions: group.questions.filter((question) => {
                        const value = search.toLowerCase();
                        const haystacks = [
                            group.category_name,
                            question.criteria_code,
                            question.criteria_name,
                            question.indicator_code,
                            question.indicator_name,
                            question.indicator_description,
                            question.answer?.score_label,
                        ]
                            .filter(Boolean)
                            .map((item) => String(item).toLowerCase());

                        return (
                            value === '' ||
                            haystacks.some((item) => item.includes(value))
                        );
                    }),
                }))
                .filter((group) => group.questions.length > 0),
        [aspectFilter, search, surveyGroups],
    );

    function toggleAspect(aspectName: string) {
        setClosedAspects((current) => ({
            ...current,
            [aspectName]: !current[aspectName],
        }));
    }
    const activeCount = pariwisata.filter((item) => item.is_active).length;
    const aspectSummaries: ScoreAspectSummary[] = surveySummary.aspects.map(
        (aspect) => ({
            name: aspect.name,
            score: aspect.score,
            max_score: aspect.max_score,
            score_percent: aspect.score_percent,
        }),
    );
    const highestAspectDetail = surveySummary.highest_aspect
        ? (aspectSummaries.find(
              (aspect) => aspect.name === surveySummary.highest_aspect?.name,
          ) ?? null)
        : null;
    const lowestAspectDetail = surveySummary.lowest_aspect
        ? (aspectSummaries.find(
              (aspect) => aspect.name === surveySummary.lowest_aspect?.name,
          ) ?? null)
        : null;

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-xl border border-[#D7E8F8] bg-[#F8FBFE] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-base font-bold text-[#303030]">
                        Data Master ISTC
                    </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    {!isViewer && (
                        <>
                            <Link
                                href={takePariwisataSurvey.url({
                                    assignment: assignmentCode,
                                })}
                            >
                                <Button variant="primary">
                                    <ClipboardList size={16} />
                                    Isi Survey Pariwisata
                                </Button>
                            </Link>
                            <Link href={createPariwisata.url(assignmentCode)}>
                                <Button>
                                    <MapPin size={16} />
                                    Tambah ISTC
                                </Button>
                            </Link>
                        </>
                    )}
                    <a
                        href={exportPariwisataSurvey.url({
                            assignment: assignmentCode,
                        })}
                    >
                        <Button>
                            <Download size={16} />
                            Export Excel
                        </Button>
                    </a>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                    label="Total Skor"
                    value={String(surveySummary.total_score)}
                    helper={`/ ${surveySummary.max_score}`}
                    icon={
                        <span className="inline-flex items-center justify-center rounded-lg border-2 border-white p-2">
                            <BarChart3 size={22} />
                        </span>
                    }
                    tone="blue"
                    compact
                />
                <MetricCard
                    label="Survey Terjawab"
                    value={`${surveySummary.answered_questions}/${surveySummary.total_questions}`}
                    helper={`survey`}
                    icon={
                        <span className="inline-flex items-center justify-center rounded-lg border-2 border-white p-2">
                            <ClipboardCheck size={22} />
                        </span>
                    }
                    tone="blue"
                    compact
                />
                <MetricCard
                    label="Aspek Tertinggi"
                    value={highestAspectDetail?.name ?? '-'}
                    helper={
                        highestAspectDetail
                            ? formatPointScore(
                                  highestAspectDetail.score,
                                  highestAspectDetail.max_score,
                              )
                            : '-'
                    }
                    icon={<Trophy size={18} />}
                    tone="green"
                    compact
                />
                <MetricCard
                    label="Perlu Perhatian"
                    value={lowestAspectDetail?.name ?? '-'}
                    helper={
                        lowestAspectDetail
                            ? formatPointScore(
                                  lowestAspectDetail.score,
                                  lowestAspectDetail.max_score,
                              )
                            : '-'
                    }
                    icon={<AlertTriangle size={18} />}
                    tone="orange"
                    compact
                />
            </div>

            <VillageStatisticsCards
                aspects={aspectSummaries}
                finalScore={surveySummary.final_score}
            />

            {pariwisata.length === 0 ? (
                <EmptyState
                    title="Belum ada data ISTC"
                    description="Tambahkan master ISTC untuk desa pada assignment ini."
                />
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {pariwisata.map((item) => (
                        <PariwisataCard
                            key={item.id}
                            item={item}
                            assignmentCode={assignmentCode}
                        />
                    ))}
                </div>
            )}

            <Card className="overflow-hidden">
                <div className="border-b border-[#EFEFEF] p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <label className="relative flex-1">
                            <Search
                                size={16}
                                className="absolute top-1/2 left-3 -translate-y-1/2 text-[#7C7C7C]"
                            />
                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                className="h-10 w-full rounded-lg border border-[#DDE4EC] bg-white pr-3 pl-9 text-sm outline-none focus:border-[#0066AE]"
                                placeholder="Cari pertanyaan, aspek, atau kode..."
                            />
                        </label>
                        <select
                            value={aspectFilter}
                            onChange={(event) =>
                                setAspectFilter(event.target.value)
                            }
                            className="h-10 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                        >
                            <option value="all">Semua Aspek</option>
                            {surveyGroups.map((group) => (
                                <option
                                    key={group.category_name}
                                    value={group.category_name}
                                >
                                    {group.category_name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('');
                                setAspectFilter('all');
                            }}
                        >
                            <Button>
                                <RefreshCcw size={16} />
                                Reset
                            </Button>
                        </button>
                    </div>
                </div>

                {filteredGroups.map((group) => {
                    const scorePercent =
                        group.max_score > 0
                            ? Math.round(
                                  (group.score / group.max_score) * 1000,
                              ) / 10
                            : 0;

                    return (
                        <div key={group.category_name}>
                            <button
                                type="button"
                                onClick={() =>
                                    toggleAspect(group.category_name)
                                }
                                className="flex w-full flex-col gap-3 border-b border-[#DDE9F6] bg-[#EAF3FF] px-4 py-3 text-left transition hover:bg-[#DDEFFF] sm:flex-row sm:items-center sm:justify-between"
                                aria-expanded={
                                    !closedAspects[group.category_name]
                                }
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#0066AE]">
                                        <ShieldCheck
                                            size={18}
                                            strokeWidth={2.1}
                                        />
                                    </span>
                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                                        <h3 className="text-sm font-bold text-[#303030]">
                                            {group.category_name}
                                        </h3>
                                        <span className="text-xs font-semibold text-[#303030]">
                                            {group.question_count} pertanyaan
                                        </span>
                                        <span className="text-xs font-semibold text-[#303030]">
                                            {group.answered_count} terjawab
                                        </span>
                                        <span className="text-xs font-semibold text-[#303030]">
                                            {group.documents_count} dokumen
                                        </span>
                                        <span className="text-xs font-semibold text-[#303030]">
                                            {formatPointScore(
                                                group.score,
                                                group.max_score,
                                            )}{' '}
                                            poin
                                        </span>
                                    </div>
                                </div>
                                <div className="grid min-w-[200px] grid-cols-[1fr_76px_20px] items-center gap-3">
                                    <div className="h-2 overflow-hidden rounded-full bg-white">
                                        <div
                                            className="h-full rounded-full bg-[#0066AE]"
                                            style={{
                                                width: `${Math.min(scorePercent, 100)}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-right text-xs font-bold text-[#0066AE]">
                                        {formatPointScore(
                                            group.score,
                                            group.max_score,
                                        )}
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={classNames(
                                            'text-[#0066AE] transition-transform',
                                            closedAspects[
                                                group.category_name
                                            ] && '-rotate-90',
                                        )}
                                    />
                                </div>
                            </button>
                            {!closedAspects[group.category_name] &&
                                group.questions.map((question, index) => (
                                    <PariwisataQuestionRow
                                        key={question.id}
                                        question={question}
                                        number={index + 1}
                                        onViewDetail={setDetailQuestion}
                                        onEditData={setEditingQuestion}
                                        isViewer={isViewer}
                                    />
                                ))}
                        </div>
                    );
                })}

                {filteredGroups.length === 0 && (
                    <div className="px-4 py-12 text-center">
                        <p className="text-sm font-bold text-[#303030]">
                            Data tidak ditemukan
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                            Ubah pencarian atau filter aspek.
                        </p>
                    </div>
                )}
            </Card>

            <PariwisataAnswerDetailModal
                question={detailQuestion}
                open={Boolean(detailQuestion)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDetailQuestion(null);
                    }
                }}
            />
            <PariwisataAnswerEditModal
                assignmentCode={assignmentCode}
                question={editingQuestion}
                open={Boolean(editingQuestion)}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditingQuestion(null);
                    }
                }}
            />
        </div>
    );
}

function PariwisataCard({
    item,
    assignmentCode,
}: {
    item: PariwisataData;
    assignmentCode: string;
}) {
    return (
        <Card className="overflow-hidden p-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(9,57,103,0.10)]">
            <div className="flex flex-col gap-4">
                {item.image_url ? (
                    <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-40 w-full rounded-xl object-cover"
                    />
                ) : (
                    <div className="flex h-40 items-center justify-center rounded-xl bg-[#EAF3FF] px-4 text-center text-sm font-bold text-[#0066AE]">
                        {item.name}
                    </div>
                )}

                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <span
                                className={classNames(
                                    'rounded-full px-2.5 py-1 text-[11px] font-bold',
                                    item.is_active
                                        ? 'bg-[#EAF8F0] text-[#00893D]'
                                        : 'bg-[#F1F5F8] text-[#7C7C7C]',
                                )}
                            >
                                {item.status_label}
                            </span>
                            {item.categories.slice(0, 2).map((category) => (
                                <span
                                    key={category.id}
                                    className="rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[11px] font-bold text-[#0066AE]"
                                >
                                    {category.label}
                                </span>
                            ))}
                            {item.categories.length > 2 && (
                                <span className="rounded-full bg-[#F1F5F8] px-2.5 py-1 text-[11px] font-bold text-[#7C7C7C]">
                                    +{item.categories.length - 2}
                                </span>
                            )}
                        </div>
                        <h3 className="mt-3 line-clamp-1 text-base font-bold text-[#303030]">
                            {item.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-5 font-semibold text-[#7C7C7C]">
                            {item.address ?? '-'}
                        </p>
                    </div>
                    <div className="shrink-0 rounded-2xl bg-[#F8FBFE] px-4 py-3 text-right ring-1 ring-[#E4EAF0]">
                        <p className="text-[10px] font-black tracking-[0.06em] text-[#7C7C7C] uppercase">
                            Status
                        </p>
                        <p className="mt-1 text-lg leading-6 font-bold text-[#093967]">
                            {item.status_label}
                        </p>
                    </div>
                </div>

                <div className="grid gap-2 text-xs sm:grid-cols-2 xl:grid-cols-4">
                    <div className="min-w-0 rounded-lg bg-[#F7F7F7] px-3 py-2">
                        <p className="font-semibold text-[#7C7C7C]">Kategori</p>
                        <p className="mt-0.5 truncate font-bold text-[#303030]">
                            {item.categories.length > 0
                                ? item.categories
                                      .map((category) => category.label)
                                      .join(', ')
                                : '-'}
                        </p>
                    </div>
                    <div className="min-w-0 rounded-lg bg-[#F7F7F7] px-3 py-2">
                        <p className="font-semibold text-[#7C7C7C]">PIC</p>
                        <p className="mt-0.5 truncate font-bold text-[#303030]">
                            {item.person_in_charge_name ?? '-'}
                        </p>
                    </div>
                    <div className="min-w-0 rounded-lg bg-[#F7F7F7] px-3 py-2">
                        <p className="font-semibold text-[#7C7C7C]">Tiket</p>
                        <p className="mt-0.5 truncate font-bold text-[#303030]">
                            {item.entrance_ticket_price}
                        </p>
                    </div>
                    <div className="min-w-0 rounded-lg bg-[#F7F7F7] px-3 py-2">
                        <p className="font-semibold text-[#7C7C7C]">No. PIC</p>
                        <p className="mt-0.5 truncate font-bold text-[#303030]">
                            {item.person_in_charge_phone ?? '-'}
                        </p>
                    </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-1">
                    <Link
                        href={showPariwisata.url({
                            assignment: assignmentCode,
                            pariwisata: item.id,
                        })}
                    >
                        <Button className="w-full">
                            <Eye size={16} />
                            Lihat Detail
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}

function AnswerDetailModal({
    question,
    open,
    onOpenChange,
}: {
    question: SurveyQuestion | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    if (!question) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-[#303030]">
                        Detail Jawaban Survey
                    </DialogTitle>
                    <DialogDescription>
                        Pertanyaan, opsi jawaban, skor terpilih, catatan, dan
                        file pendukung.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">
                    <section className="rounded-xl bg-[#F8FBFF] p-4">
                        <h3 className="text-base leading-6 font-bold text-[#303030]">
                            {question.question_text}
                        </h3>
                        {question.document_hint && (
                            <p className="mt-2 text-sm font-semibold text-[#7C7C7C]">
                                {question.document_hint}
                            </p>
                        )}
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Opsi Jawaban
                        </h4>
                        <div className="mt-2 divide-y divide-[#EFEFEF] rounded-xl border border-[#EFEFEF]">
                            {question.options.map((option) => {
                                const selected =
                                    option.id ===
                                    question.answer?.survey_question_option_id;

                                return (
                                    <div
                                        key={option.id}
                                        className={classNames(
                                            'grid gap-3 px-4 py-3 text-sm sm:grid-cols-[72px_1fr]',
                                            selected && 'bg-[#EAF3FF]',
                                        )}
                                    >
                                        <span className="font-bold text-[#0066AE]">
                                            Skor {option.score}
                                        </span>
                                        <span className="font-semibold text-[#303030]">
                                            {option.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Catatan Jawaban
                        </h4>
                        <div className="mt-2 rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm font-semibold text-[#303030]">
                            {question.answer?.notes || 'Tidak ada catatan.'}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            File Pendukung
                        </h4>
                        <div className="mt-2 space-y-2">
                            {question.answer?.documents.map((document) => (
                                <DocumentBadge
                                    key={document.id}
                                    document={document}
                                />
                            ))}
                            {(question.answer?.documents.length ?? 0) === 0 && (
                                <p className="rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm font-semibold text-[#7C7C7C]">
                                    Belum ada file pendukung.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function SurveyAnswerEditModal({
    assignmentCode,
    question,
    open,
    onOpenChange,
}: {
    assignmentCode: string;
    question: SurveyQuestion | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, processing, errors, reset, clearErrors } =
        useForm<SurveyAnswerEditForm>({
            answers: [
                {
                    question_id: question?.id ?? 0,
                    survey_question_option_id: question?.answer
                        ? String(question.answer.survey_question_option_id)
                        : '',
                    notes: question?.answer?.notes ?? '',
                    documents: [],
                },
            ],
        });

    useEffect(() => {
        if (!open || !question) {
            return;
        }

        setData({
            answers: [
                {
                    question_id: question.id,
                    survey_question_option_id: question.answer
                        ? String(question.answer.survey_question_option_id)
                        : '',
                    notes: question.answer?.notes ?? '',
                    documents: [],
                },
            ],
        });
        clearErrors();
    }, [clearErrors, open, question, setData]);

    if (!question) {
        return null;
    }

    const currentAnswer = data.answers[0] ?? {
        question_id: question.id,
        survey_question_option_id: '',
        notes: '',
        documents: [],
    };

    function updateAnswerField(
        key:
            | 'question_id'
            | 'survey_question_option_id'
            | 'notes'
            | 'documents',
        value: number | string | File[],
    ) {
        setData('answers', [
            {
                ...currentAnswer,
                [key]: value,
            },
        ]);
    }

    function handleFilesChange(fileList: FileList | null) {
        if (!fileList) {
            return;
        }

        updateAnswerField('documents', [
            ...currentAnswer.documents,
            ...Array.from(fileList),
        ]);
    }

    function removePendingFile(fileIndex: number) {
        updateAnswerField(
            'documents',
            currentAnswer.documents.filter((_, index) => index !== fileIndex),
        );
    }

    function deleteStoredDocument(document: SurveyDocument) {
        router.delete(
            destroySurveyDocument.url({
                assignment: assignmentCode,
                document: document.id,
            }),
            {
                preserveScroll: true,
            },
        );
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData();
        formData.append(
            'answers[0][question_id]',
            String(currentAnswer.question_id),
        );
        formData.append(
            'answers[0][survey_question_option_id]',
            currentAnswer.survey_question_option_id,
        );
        formData.append('answers[0][notes]', currentAnswer.notes ?? '');

        currentAnswer.documents.forEach((file) => {
            formData.append('answers[0][documents][]', file);
        });

        setIsSubmitting(true);

        router.post(
            storeSurveyDraft.url({ assignment: assignmentCode }),
            formData,
            {
                forceFormData: true,
                preserveScroll: true,
                onFinish: () => setIsSubmitting(false),
                onSuccess: () => {
                    reset();
                    onOpenChange(false);
                },
            },
        );
    }

    const errorBag = errors as Record<string, string | undefined>;
    const selectedOptionError =
        errorBag['answers.0.survey_question_option_id'] ??
        errorBag.survey_question_option_id;
    const notesError = errorBag['answers.0.notes'] ?? errorBag.notes;
    const documentsError =
        Object.entries(errorBag).find(
            ([key]) =>
                key.startsWith('answers.0.documents') || key === 'documents',
        )?.[1] ?? undefined;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-[#303030]">
                        Edit Jawaban Survey
                    </DialogTitle>
                    <DialogDescription>
                        Ubah opsi jawaban, catatan, dan dokumen pendukung.
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <section className="rounded-xl bg-[#F8FBFF] p-4">
                        <h3 className="text-base leading-6 font-bold text-[#303030]">
                            {question.question_text}
                        </h3>
                        {question.document_hint && (
                            <p className="mt-2 text-sm font-semibold text-[#7C7C7C]">
                                {question.document_hint}
                            </p>
                        )}
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Opsi Jawaban
                        </h4>
                        <div className="mt-2 divide-y divide-[#EFEFEF] rounded-xl border border-[#EFEFEF]">
                            {question.options.map((option) => {
                                const selected =
                                    String(option.id) ===
                                    currentAnswer.survey_question_option_id;

                                return (
                                    <label
                                        key={option.id}
                                        className={classNames(
                                            'flex cursor-pointer items-start gap-3 px-4 py-3 text-sm transition',
                                            selected && 'bg-[#EAF3FF]',
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name={`survey-answer-${question.id}`}
                                            value={option.id}
                                            checked={selected}
                                            onChange={() =>
                                                updateAnswerField(
                                                    'survey_question_option_id',
                                                    String(option.id),
                                                )
                                            }
                                            className="mt-1"
                                        />
                                        <div>
                                            <span className="font-bold text-[#0066AE]">
                                                Skor {option.score}
                                            </span>
                                            <p className="font-semibold text-[#303030]">
                                                {option.label}
                                            </p>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                        <FieldError message={selectedOptionError} />
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Catatan Jawaban
                        </h4>
                        <textarea
                            rows={4}
                            value={currentAnswer.notes}
                            onChange={(event) =>
                                updateAnswerField('notes', event.target.value)
                            }
                            className="mt-2 w-full rounded-xl border border-[#DDE4EC] px-4 py-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                            placeholder="Catatan opsional"
                        />
                        <FieldError message={notesError} />
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Dokumen Existing
                        </h4>
                        <div className="mt-2 space-y-2">
                            {question.answer?.documents.map((document) => (
                                <div
                                    key={document.id}
                                    className="flex items-center gap-3 rounded-xl border border-[#EFEFEF] bg-white px-3 py-2 text-sm font-semibold text-[#303030]"
                                >
                                    <FileText className="size-5 shrink-0 text-[#0066AE]" />
                                    <span className="min-w-0 flex-1 truncate">
                                        {document.file_name}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            window.open(
                                                document.file_url,
                                                '_blank',
                                                'noopener,noreferrer',
                                            )
                                        }
                                        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#EAF3FF]"
                                    >
                                        <Eye className="size-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteStoredDocument(document)
                                        }
                                        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#D81313] transition hover:bg-[#FDECEC]"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            ))}
                            {(question.answer?.documents.length ?? 0) === 0 && (
                                <p className="rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm font-semibold text-[#7C7C7C]">
                                    Belum ada file pendukung.
                                </p>
                            )}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Dokumen Baru
                        </h4>
                        <label className="mt-2 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#F1F5F8] px-4 py-4 text-left transition hover:bg-[#EAF3FF]">
                            <Plus
                                size={20}
                                className="shrink-0 text-[#0066AE]"
                            />
                            <span className="min-w-0 flex-1">
                                <span className="block text-sm font-bold text-[#0066AE]">
                                    Tambah dokumen pendukung
                                </span>
                                <span className="block text-xs font-medium text-[#7C7C7C]">
                                    JPG, PNG, WEBP, atau PDF. Maksimal 50 MB per
                                    file.
                                </span>
                            </span>
                            <input
                                type="file"
                                multiple
                                accept="image/jpeg,image/png,image/webp,application/pdf"
                                onChange={(event) => {
                                    handleFilesChange(event.target.files);
                                    event.target.value = '';
                                }}
                                className="sr-only"
                            />
                        </label>
                        <FieldError message={documentsError} />
                        {currentAnswer.documents.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {currentAnswer.documents.map((file, index) => (
                                    <div
                                        key={`${file.name}-${file.lastModified}-${index}`}
                                        className="flex items-center gap-3 rounded-xl border border-[#AAD2F8] bg-[#F8FBFF] px-3 py-2 text-sm font-semibold text-[#303030]"
                                    >
                                        <FileText className="size-5 shrink-0 text-[#0066AE]" />
                                        <span className="min-w-0 flex-1 truncate">
                                            {file.name}
                                        </span>
                                        <span className="rounded-md bg-[#FFF4EA] px-2 py-1 text-xs font-bold text-[#C9681E]">
                                            Draft lokal
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removePendingFile(index)
                                            }
                                            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#D81313] transition hover:bg-[#FDECEC]"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <div className="flex items-center justify-end gap-2 border-t border-[#EFEFEF] pt-4">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                        >
                            <Button>Batal</Button>
                        </button>
                        <button
                            type="submit"
                            disabled={processing || isSubmitting}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:opacity-60"
                        >
                            <Save size={16} />
                            {processing || isSubmitting
                                ? 'Menyimpan...'
                                : 'Simpan Jawaban'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function AnswerHistoryModal({
    question,
    open,
    onOpenChange,
}: {
    question: SurveyQuestion | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const histories = question?.answer?.histories ?? [];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-[#303030]">
                        Riwayat Jawaban
                    </DialogTitle>
                    <DialogDescription>
                        Perubahan jawaban untuk {question?.code ?? '-'}.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                    {histories.map((history) => (
                        <div
                            key={history.id}
                            className="rounded-xl border border-[#EFEFEF] bg-white p-4"
                        >
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm font-bold text-[#303030]">
                                    {history.action}
                                </p>
                                <p className="text-xs font-semibold text-[#7C7C7C]">
                                    {history.created_at}
                                </p>
                            </div>
                            <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                Oleh {history.actor.name}
                            </p>
                            <div className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
                                <div className="rounded-lg bg-[#F7F7F7] p-3">
                                    <p className="font-bold text-[#7C7C7C]">
                                        Sebelum
                                    </p>
                                    <p className="mt-1 font-semibold text-[#303030]">
                                        Skor {history.old_score ?? '-'}
                                    </p>
                                    <p className="mt-1 leading-5 font-semibold text-[#303030]">
                                        {history.old_option_label ?? '-'}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-[#EAF3FF] p-3">
                                    <p className="font-bold text-[#0066AE]">
                                        Sesudah
                                    </p>
                                    <p className="mt-1 font-semibold text-[#303030]">
                                        Skor {history.new_score ?? '-'}
                                    </p>
                                    <p className="mt-1 leading-5 font-semibold text-[#303030]">
                                        {history.new_option_label ?? '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {histories.length === 0 && (
                        <p className="rounded-xl bg-[#F7F7F7] px-4 py-6 text-center text-sm font-semibold text-[#7C7C7C]">
                            Belum ada riwayat perubahan untuk jawaban ini.
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function SurveyAssignmentShow({
    assignment,
    active_tab,
    summary,
    aspects,
    tab_counts,
    umkms,
    pariwisata,
    pariwisata_survey_groups,
    pariwisata_survey_summary,
    activities,
    edit_options,
    edit_values,
    village_annual_edit_values,
}: SurveyAssignmentShowProps) {
    const activeTab = active_tab;
    const { auth } = usePage().props;
    const isViewer = auth.user?.role === 'viewer';
    const [search, setSearch] = useState('');
    const [aspectFilter, setAspectFilter] = useState('all');
    const [detailQuestion, setDetailQuestion] = useState<SurveyQuestion | null>(
        null,
    );
    const [historyQuestion, setHistoryQuestion] =
        useState<SurveyQuestion | null>(null);
    const [editingQuestion, setEditingQuestion] =
        useState<SurveyQuestion | null>(null);
    const [closedAspects, setClosedAspects] = useState<Record<string, boolean>>(
        {},
    );
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isVillageAnnualOpen, setIsVillageAnnualOpen] = useState(false);
    const { data, setData, patch, processing, errors, clearErrors, reset } =
        useForm<AssignmentEditForm>(edit_values);
    const villageAnnualForm = useForm<VillageAnnualEditForm>(
        cloneVillageAnnualForm(village_annual_edit_values),
    );

    const filteredAspects = useMemo(
        () =>
            aspects
                .filter(
                    (aspect) =>
                        aspectFilter === 'all' || aspect.name === aspectFilter,
                )
                .map((aspect) => ({
                    ...aspect,
                    questions: aspect.questions
                        .filter((question) => {
                            const value = search.toLowerCase();

                            return (
                                value === '' ||
                                aspect.name.toLowerCase().includes(value) ||
                                question.question_text
                                    .toLowerCase()
                                    .includes(value)
                            );
                        })
                        .sort(
                            (first, second) =>
                                first.sort_order - second.sort_order ||
                                first.id - second.id,
                        ),
                }))
                .filter((aspect) => aspect.questions.length > 0),
        [aspectFilter, aspects, search],
    );

    const villageTitle = `${assignment.village.name}`;

    function toggleAspect(aspectName: string) {
        setClosedAspects((current) => ({
            ...current,
            [aspectName]: !current[aspectName],
        }));
    }

    function openEditSidebar() {
        setData({ ...edit_values });
        clearErrors();
        setIsEditOpen(true);
    }

    function closeEditSidebar() {
        setIsEditOpen(false);
        reset();
        clearErrors();
    }

    function openVillageAnnualSidebar() {
        villageAnnualForm.setData(
            cloneVillageAnnualForm(village_annual_edit_values),
        );
        villageAnnualForm.clearErrors();
        setIsVillageAnnualOpen(true);
    }

    function closeVillageAnnualSidebar() {
        setIsVillageAnnualOpen(false);
        villageAnnualForm.reset();
        villageAnnualForm.clearErrors();
    }

    function updatePopulationStat(
        index: number,
        key: keyof VillageAnnualPopulationStatForm,
        value: string,
    ) {
        villageAnnualForm.setData(
            'annual_population_stats',
            villageAnnualForm.data.annual_population_stats.map(
                (row, rowIndex) =>
                    rowIndex === index ? { ...row, [key]: value } : row,
            ),
        );
    }

    function updateVulnerableGroupAnnual(
        index: number,
        key: keyof VillageVulnerableGroupAnnualForm,
        value: string,
    ) {
        villageAnnualForm.setData(
            'vulnerable_group_annuals',
            villageAnnualForm.data.vulnerable_group_annuals.map(
                (row, rowIndex) =>
                    rowIndex === index ? { ...row, [key]: value } : row,
            ),
        );
    }

    function updateActiveGroupAnnual(
        index: number,
        key: keyof VillageActiveGroupAnnualForm,
        value: string,
    ) {
        villageAnnualForm.setData(
            'active_group_annuals',
            villageAnnualForm.data.active_group_annuals.map((row, rowIndex) =>
                rowIndex === index ? { ...row, [key]: value } : row,
            ),
        );
    }

    function submitVillageAnnualData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        villageAnnualForm.patch(updateVillageAnnualData.url(assignment.code), {
            preserveScroll: true,
            onSuccess: () => setIsVillageAnnualOpen(false),
        });
    }

    function submitAssignment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        patch(updateSurveyAssignment.url(assignment.code), {
            preserveScroll: true,
            onSuccess: () => setIsEditOpen(false),
        });
    }

    return (
        <>
            <Head title={villageTitle} />

            <main className="min-h-screen bg-[#F7F7F7] p-4 text-[#303030] sm:p-6">
                <div className="mx-auto max-w-[1440px]">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-bold">
                                <Link
                                    href={dashboard.url()}
                                    className="text-[#0066AE]"
                                >
                                    Dashboard
                                </Link>
                                <span className="text-[#B0B0B0]">/</span>
                                <span className="text-[#7C7C7C]">
                                    Survey Detail
                                </span>
                            </div>
                            <h1 className="mt-2 text-2xl leading-tight font-bold text-[#303030] sm:text-[28px]">
                                Detail Assessment KEMENPAR
                            </h1>
                            <p className="mt-1 text-sm text-[#7C7C7C]">
                                Data assignment, jawaban, skor, dokumen, dan
                                riwayat pengisian langsung dari database.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Link href={surveyAssignments.url()}>
                                <Button>
                                    <ArrowLeft size={16} />
                                    Kembali
                                </Button>
                            </Link>
                            {!isViewer && (
                                <>
                                    <button
                                        type="button"
                                        onClick={openEditSidebar}
                                    >
                                        <Button>
                                            <PanelRightOpen size={16} />
                                            Edit Assignment
                                        </Button>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={openVillageAnnualSidebar}
                                    >
                                        <Button>
                                            <PanelRightOpen size={16} />
                                            Edit Data Desa
                                        </Button>
                                    </button>
                                </>
                            )}
                            <a
                                href={exportSurveyAssignment.url(
                                    assignment.code,
                                )}
                            >
                                <Button>
                                    <Download size={16} />
                                    Export Excel
                                </Button>
                            </a>
                            {!isViewer && (
                                <Link href={takeSurvey.url(assignment.code)}>
                                    <Button variant="primary">
                                        <ClipboardList size={16} />
                                        Take Survey
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 overflow-x-auto pb-1">
                        <div className="flex min-w-max gap-2">
                            <TabButton
                                active={activeTab === 'desa'}
                                label="Kemenpar"
                                count={1}
                                icon={<MapPin size={16} />}
                                href={showSurveyAssignment.url(
                                    { assignment: assignment.code },
                                    { query: { tab: 'desa' } },
                                )}
                            />
                            <TabButton
                                active={activeTab === 'umkm'}
                                label="UMKM"
                                count={tab_counts.umkm}
                                icon={<ClipboardCheck size={16} />}
                                href={showSurveyAssignment.url(
                                    { assignment: assignment.code },
                                    { query: { tab: 'umkm' } },
                                )}
                            />
                            <TabButton
                                active={activeTab === 'pariwisata'}
                                label="ISTC"
                                count={tab_counts.istc}
                                icon={<Flag size={16} />}
                                href={showSurveyAssignment.url(
                                    { assignment: assignment.code },
                                    { query: { tab: 'pariwisata' } },
                                )}
                            />
                        </div>
                    </div>

                    {activeTab === 'desa' && (
                        <div className="mt-5 grid gap-5">
                            <div className="min-w-0 space-y-5">
                                <Card className="overflow-hidden">
                                    <div className="grid gap-4 p-4 lg:grid-cols-[220px_minmax(0,1fr)]">
                                        {assignment.village.cover_url ? (
                                            <img
                                                src={
                                                    assignment.village.cover_url
                                                }
                                                alt={assignment.village.name}
                                                className="h-[210px] w-full rounded-lg object-cover lg:h-full"
                                            />
                                        ) : (
                                            <div className="flex h-[210px] w-full items-center justify-center rounded-lg bg-[#EAF3FF] text-center text-lg font-bold text-[#0066AE] lg:h-full">
                                                {assignment.village.name}
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <h2 className="text-xl font-bold text-[#303030]">
                                                        {villageTitle}
                                                    </h2>
                                                    <p className="mt-1 text-sm text-[#7C7C7C]">
                                                        {
                                                            assignment.template
                                                                .title
                                                        }
                                                    </p>
                                                </div>
                                                {!isViewer && (
                                                    <span
                                                        className={classNames(
                                                            'inline-flex h-8 w-fit items-center rounded-full px-4 text-xs font-bold',
                                                            statusClass(
                                                                assignment.status,
                                                            ),
                                                        )}
                                                    >
                                                        {
                                                            assignment.status_label
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
                                                <InfoItem
                                                    icon={
                                                        <ClipboardCheck
                                                            size={18}
                                                        />
                                                    }
                                                    label="Kode Assignment"
                                                    value={assignment.code}
                                                />
                                                {!isViewer && (
                                                    <InfoItem
                                                        icon={
                                                            <Flag size={18} />
                                                        }
                                                        label="Status"
                                                        value={
                                                            assignment.status_label
                                                        }
                                                    />
                                                )}
                                                <InfoItem
                                                    icon={
                                                        <UserRound size={18} />
                                                    }
                                                    label="Social Impact ID"
                                                    value={
                                                        assignment
                                                            .assigned_by_user
                                                            .name
                                                    }
                                                />
                                                <InfoItem
                                                    icon={<MapPin size={18} />}
                                                    label="Lokasi"
                                                    value={
                                                        assignment.village
                                                            .location
                                                    }
                                                />
                                                {!isViewer && (
                                                    <InfoItem
                                                        icon={
                                                            <CalendarDays
                                                                size={18}
                                                            />
                                                        }
                                                        label="Last Saved"
                                                        value={
                                                            assignment.last_saved_at
                                                        }
                                                    />
                                                )}
                                                <InfoItem
                                                    icon={<Folder size={18} />}
                                                    label="Dokumen Pendukung"
                                                    value={`${summary.total_documents} file`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                    <MetricCard
                                        label="Total Skor"
                                        value={String(summary.total_score)}
                                        helper={`/ ${summary.max_score}`}
                                        icon={
                                            <span className="inline-flex items-center justify-center rounded-lg border-2 border-white p-2">
                                                <BarChart3 size={22} />
                                            </span>
                                        }
                                        tone="blue"
                                        compact
                                    />
                                    {!isViewer && (
                                        <MetricCard
                                            label="Survey Terjawab"
                                            value={`${summary.answered_questions}/${summary.total_questions}`}
                                            helper=""
                                            icon={
                                                <span className="inline-flex items-center justify-center rounded-lg border-2 border-white p-2">
                                                    <ClipboardCheck size={22} />
                                                </span>
                                            }
                                            tone="blue"
                                            compact
                                        />
                                    )}
                                    <MetricCard
                                        label="Aspek Tertinggi"
                                        value={
                                            summary.highest_aspect?.name ?? '-'
                                        }
                                        helper={
                                            summary.highest_aspect
                                                ? formatPointScore(
                                                      summary.highest_aspect
                                                          .score,
                                                      summary.highest_aspect
                                                          .max_score,
                                                  )
                                                : '-'
                                        }
                                        icon={<Trophy size={18} />}
                                        tone="green"
                                        compact
                                    />
                                    <MetricCard
                                        label="Perlu Perhatian"
                                        value={
                                            summary.lowest_aspect?.name ?? '-'
                                        }
                                        helper={
                                            summary.lowest_aspect
                                                ? formatPointScore(
                                                      summary.lowest_aspect
                                                          .score,
                                                      summary.lowest_aspect
                                                          .max_score,
                                                  )
                                                : '-'
                                        }
                                        icon={<AlertTriangle size={18} />}
                                        tone="orange"
                                        compact
                                    />
                                </div>

                                <SurveyStatistics aspects={aspects} />

                                <VillageAnnualMultipleBarChart
                                    values={village_annual_edit_values}
                                />

                                <Card className="overflow-hidden">
                                    <div className="border-b border-[#EFEFEF] p-4">
                                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                                            <label className="relative flex-1">
                                                <Search
                                                    size={16}
                                                    className="absolute top-1/2 left-3 -translate-y-1/2 text-[#7C7C7C]"
                                                />
                                                <input
                                                    value={search}
                                                    onChange={(event) =>
                                                        setSearch(
                                                            event.target.value,
                                                        )
                                                    }
                                                    className="h-10 w-full rounded-lg border border-[#DDE4EC] bg-white pr-3 pl-9 text-sm outline-none focus:border-[#0066AE]"
                                                    placeholder="Cari pertanyaan, aspek, atau kode..."
                                                />
                                            </label>
                                            <select
                                                value={aspectFilter}
                                                onChange={(event) =>
                                                    setAspectFilter(
                                                        event.target.value,
                                                    )
                                                }
                                                className="h-10 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                                            >
                                                <option value="all">
                                                    Semua Aspek
                                                </option>
                                                {aspects.map((aspect) => (
                                                    <option
                                                        key={aspect.name}
                                                        value={aspect.name}
                                                    >
                                                        {aspect.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSearch('');
                                                    setAspectFilter('all');
                                                }}
                                            >
                                                <Button>
                                                    <RefreshCcw size={16} />
                                                    Reset
                                                </Button>
                                            </button>
                                        </div>
                                    </div>

                                    {filteredAspects.map((aspect) => (
                                        <div key={aspect.name}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleAspect(aspect.name)
                                                }
                                                className="flex w-full flex-col gap-3 border-b border-[#DDE9F6] bg-[#EAF3FF] px-4 py-3 text-left transition hover:bg-[#DDEFFF] sm:flex-row sm:items-center sm:justify-between"
                                                aria-expanded={
                                                    !closedAspects[aspect.name]
                                                }
                                            >
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#0066AE]">
                                                        <ShieldCheck
                                                            size={18}
                                                            strokeWidth={2.1}
                                                        />
                                                    </span>
                                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                                                        <h3 className="text-sm font-bold text-[#303030]">
                                                            {aspect.name}
                                                        </h3>
                                                        <span className="text-xs font-semibold text-[#303030]">
                                                            {
                                                                aspect.question_count
                                                            }{' '}
                                                            pertanyaan
                                                        </span>
                                                        <span className="text-xs font-semibold text-[#303030]">
                                                            {
                                                                aspect.answered_count
                                                            }{' '}
                                                            terjawab
                                                        </span>
                                                        <span className="text-xs font-semibold text-[#303030]">
                                                            {
                                                                aspect.documents_count
                                                            }{' '}
                                                            dokumen
                                                        </span>
                                                        <span className="text-xs font-semibold text-[#303030]">
                                                            {formatPointScore(
                                                                aspect.score,
                                                                aspect.max_score,
                                                            )}{' '}
                                                            poin
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="grid min-w-[200px] grid-cols-[1fr_76px_20px] items-center gap-3">
                                                    <div className="h-2 overflow-hidden rounded-full bg-white">
                                                        <div
                                                            className="h-full rounded-full bg-[#0066AE]"
                                                            style={{
                                                                width: `${Math.min(aspect.score_percent, 100)}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-right text-xs font-bold text-[#0066AE]">
                                                        {formatPointScore(
                                                            aspect.score,
                                                            aspect.max_score,
                                                        )}
                                                    </span>
                                                    <ChevronDown
                                                        size={18}
                                                        className={classNames(
                                                            'text-[#0066AE] transition-transform',
                                                            closedAspects[
                                                                aspect.name
                                                            ] && '-rotate-90',
                                                        )}
                                                    />
                                                </div>
                                            </button>
                                            {!closedAspects[aspect.name] &&
                                                aspect.questions.map(
                                                    (question, index) => (
                                                        <QuestionRow
                                                            key={question.id}
                                                            question={question}
                                                            number={index + 1}
                                                            onViewDetail={
                                                                setDetailQuestion
                                                            }
                                                            onViewHistory={
                                                                setHistoryQuestion
                                                            }
                                                            onEditData={
                                                                setEditingQuestion
                                                            }
                                                            isViewer={isViewer}
                                                        />
                                                    ),
                                                )}
                                        </div>
                                    ))}

                                    {filteredAspects.length === 0 && (
                                        <div className="px-4 py-12 text-center">
                                            <p className="text-sm font-bold text-[#303030]">
                                                Data tidak ditemukan
                                            </p>
                                            <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                                Ubah pencarian atau filter
                                                aspek.
                                            </p>
                                        </div>
                                    )}
                                </Card>
                            </div>

                            <aside className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                                <SidebarCard
                                    title="Status Review"
                                    icon={<ClipboardCheck size={16} />}
                                >
                                    <div className="space-y-3 text-xs">
                                        <div className="flex justify-between gap-3">
                                            <span className="font-semibold text-[#7C7C7C]">
                                                Status
                                            </span>
                                            <span
                                                className={classNames(
                                                    'rounded-full px-3 py-1 font-bold',
                                                    statusClass(
                                                        assignment.status,
                                                    ),
                                                )}
                                            >
                                                {assignment.status_label}
                                            </span>
                                        </div>
                                        {[
                                            [
                                                'Submitted by',
                                                assignment.submitted_by_user
                                                    .name,
                                            ],
                                            [
                                                'Submitted at',
                                                assignment.submitted_at,
                                            ],
                                            [
                                                'Reviewer',
                                                assignment.reviewed_by_user
                                                    .name,
                                            ],
                                            [
                                                'Reviewed at',
                                                assignment.reviewed_at,
                                            ],
                                        ].map(([label, value]) => (
                                            <div
                                                key={label}
                                                className="flex justify-between gap-3"
                                            >
                                                <span className="font-semibold text-[#7C7C7C]">
                                                    {label}
                                                </span>
                                                <span className="text-right font-bold text-[#303030]">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </SidebarCard>

                                <SidebarCard
                                    title="Ringkasan Validasi"
                                    icon={<ShieldCheck size={16} />}
                                >
                                    <div className="space-y-3 text-xs">
                                        {[
                                            [
                                                summary.unanswered_questions ===
                                                    0,
                                                'Pertanyaan terjawab',
                                                `${summary.answered_questions} / ${summary.total_questions}`,
                                            ],
                                            [
                                                summary.total_documents > 0,
                                                'Dokumen terupload',
                                                `${summary.total_documents} file`,
                                            ],
                                            [
                                                summary.final_score >= 70,
                                                'Nilai akhir',
                                                String(summary.final_score),
                                            ],
                                        ].map(([ok, label, value]) => (
                                            <div
                                                key={label as string}
                                                className="flex items-center justify-between gap-3"
                                            >
                                                <span className="flex items-center gap-2 font-semibold text-[#303030]">
                                                    {ok ? (
                                                        <CheckCircle2
                                                            size={16}
                                                            className="text-[#00893D]"
                                                        />
                                                    ) : (
                                                        <AlertTriangle
                                                            size={16}
                                                            className="text-[#FF944C]"
                                                        />
                                                    )}
                                                    {label}
                                                </span>
                                                <span className="text-right font-bold text-[#303030]">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </SidebarCard>

                                <SidebarCard
                                    title="Data Desa"
                                    icon={<MapPin size={16} />}
                                >
                                    <div className="space-y-3 text-xs">
                                        {[
                                            [
                                                'Kode',
                                                assignment.village.code ?? '-',
                                            ],
                                            [
                                                'Status',
                                                assignment.village.status ??
                                                    '-',
                                            ],
                                            [
                                                'Manager',
                                                assignment.village
                                                    .manager_name ?? '-',
                                            ],
                                            [
                                                'Telepon',
                                                assignment.village
                                                    .manager_phone ?? '-',
                                            ],
                                            [
                                                'Email',
                                                assignment.village
                                                    .manager_email ?? '-',
                                            ],
                                            [
                                                'Alamat',
                                                assignment.village.address ??
                                                    '-',
                                            ],
                                        ].map(([label, value]) => (
                                            <div
                                                key={label}
                                                className="flex justify-between gap-3"
                                            >
                                                <span className="font-semibold text-[#7C7C7C]">
                                                    {label}
                                                </span>
                                                <span className="text-right font-bold text-[#303030]">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </SidebarCard>

                                <SidebarCard
                                    title="Riwayat Aktivitas"
                                    icon={<Clock3 size={16} />}
                                >
                                    <div className="space-y-0">
                                        {activities.map((activity, index) => (
                                            <div
                                                key={`${activity.date}-${activity.title}-${index}`}
                                                className="relative flex gap-3 pb-4 last:pb-0"
                                            >
                                                {index <
                                                    activities.length - 1 && (
                                                    <span className="absolute top-3 left-[5px] h-full w-px bg-[#AAD2F8]" />
                                                )}
                                                <span className="relative mt-1 size-2.5 shrink-0 rounded-full bg-[#0066AE]" />
                                                <div>
                                                    <p className="text-[11px] font-semibold text-[#7C7C7C]">
                                                        {activity.date} ·{' '}
                                                        {activity.actor}
                                                    </p>
                                                    <p className="mt-0.5 text-xs leading-5 font-bold text-[#303030]">
                                                        {activity.title}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {activities.length === 0 && (
                                            <p className="text-xs font-semibold text-[#7C7C7C]">
                                                Belum ada aktivitas tercatat.
                                            </p>
                                        )}
                                    </div>
                                </SidebarCard>
                            </aside>
                        </div>
                    )}

                    {activeTab === 'umkm' && (
                        <div className="mt-5">
                            <UmkmTab
                                umkms={umkms}
                                assignmentCode={assignment.code}
                                isViewer={isViewer}
                            />
                        </div>
                    )}

                    {activeTab === 'pariwisata' && (
                        <div className="mt-5">
                            <PariwisataTab
                                pariwisata={pariwisata}
                                assignmentCode={assignment.code}
                                surveySummary={pariwisata_survey_summary}
                                surveyGroups={pariwisata_survey_groups}
                                isViewer={isViewer}
                            />
                        </div>
                    )}
                </div>
            </main>

            <div
                className={classNames(
                    'fixed inset-0 z-40 bg-[#031120]/35 transition-opacity',
                    isEditOpen
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0',
                )}
                onClick={closeEditSidebar}
            />
            <aside
                className={classNames(
                    'fixed top-0 right-0 z-50 flex h-dvh w-full max-w-[440px] flex-col border-l border-[#DDE4EC] bg-white shadow-[-18px_0_40px_rgba(3,17,32,0.18)] transition-transform duration-300',
                    isEditOpen ? 'translate-x-0' : 'translate-x-full',
                )}
                aria-hidden={!isEditOpen}
            >
                <div className="flex items-start justify-between gap-4 border-b border-[#EFEFEF] px-5 py-4">
                    <div>
                        <p className="text-xs font-bold text-[#0066AE]">
                            {assignment.code}
                        </p>
                        <h2 className="mt-1 text-lg font-bold text-[#303030]">
                            Edit Survey Assignment
                        </h2>
                        <p className="mt-1 text-xs leading-5 font-semibold text-[#7C7C7C]">
                            Ubah data assignment sesuai tabel database.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={closeEditSidebar}
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#DDE4EC] text-[#303030] transition hover:bg-[#F1F5F8]"
                        aria-label="Tutup edit assignment"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    onSubmit={submitAssignment}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
                        <label className="block space-y-1.5">
                            <span className="text-sm font-bold text-[#303030]">
                                Desa
                            </span>
                            <select
                                value={data.village_id}
                                onChange={(event) =>
                                    setData('village_id', event.target.value)
                                }
                                className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                            >
                                {edit_options.village_options.map((option) => (
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

                        <label className="block space-y-1.5">
                            <span className="text-sm font-bold text-[#303030]">
                                Template Survey
                            </span>
                            <select
                                value={data.survey_template_id}
                                onChange={(event) =>
                                    setData(
                                        'survey_template_id',
                                        event.target.value,
                                    )
                                }
                                className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                            >
                                {edit_options.template_options.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <FieldError message={errors.survey_template_id} />
                        </label>

                        <label className="block space-y-1.5">
                            <span className="text-sm font-bold text-[#303030]">
                                Status
                            </span>
                            <select
                                value={data.status}
                                onChange={(event) =>
                                    setData('status', event.target.value)
                                }
                                className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                            >
                                {edit_options.status_options.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <FieldError message={errors.status} />
                        </label>

                        <label className="block space-y-1.5">
                            <span className="text-sm font-bold text-[#303030]">
                                Assigned By
                            </span>
                            <select
                                value={data.assigned_by}
                                onChange={(event) =>
                                    setData('assigned_by', event.target.value)
                                }
                                className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                            >
                                {edit_options.user_options.map((option) => (
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
                            <FieldError message={errors.assigned_by} />
                        </label>

                        {[
                            ['submitted_by', 'Submitted By'],
                            ['reviewed_by', 'Reviewed By'],
                        ].map(([key, label]) => (
                            <label key={key} className="block space-y-1.5">
                                <span className="text-sm font-bold text-[#303030]">
                                    {label}
                                </span>
                                <select
                                    value={
                                        data[key as keyof AssignmentEditForm]
                                    }
                                    onChange={(event) =>
                                        setData(
                                            key as keyof AssignmentEditForm,
                                            event.target.value,
                                        )
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                                >
                                    <option value="">Tidak Ada</option>
                                    {edit_options.user_options.map((option) => (
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
                                <FieldError
                                    message={
                                        errors[key as keyof AssignmentEditForm]
                                    }
                                />
                            </label>
                        ))}

                        {[
                            ['assigned_at', 'Assigned At'],
                            ['started_at', 'Started At'],
                            ['last_saved_at', 'Last Saved At'],
                            ['submitted_at', 'Submitted At'],
                            ['reviewed_at', 'Reviewed At'],
                        ].map(([key, label]) => (
                            <label key={key} className="block space-y-1.5">
                                <span className="text-sm font-bold text-[#303030]">
                                    {label}
                                </span>
                                <input
                                    type="datetime-local"
                                    value={
                                        data[key as keyof AssignmentEditForm]
                                    }
                                    onChange={(event) =>
                                        setData(
                                            key as keyof AssignmentEditForm,
                                            event.target.value,
                                        )
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                                />
                                <FieldError
                                    message={
                                        errors[key as keyof AssignmentEditForm]
                                    }
                                />
                            </label>
                        ))}
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-[#EFEFEF] px-5 py-4">
                        <button type="button" onClick={closeEditSidebar}>
                            <Button>Batal</Button>
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:opacity-60"
                        >
                            <Save size={16} />
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </aside>

            <div
                className={classNames(
                    'fixed inset-0 z-40 bg-[#031120]/35 transition-opacity',
                    isVillageAnnualOpen
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0',
                )}
                onClick={closeVillageAnnualSidebar}
            />
            <aside
                className={classNames(
                    'fixed top-0 right-0 z-50 flex h-dvh w-full max-w-[560px] flex-col border-l border-[#DDE4EC] bg-white shadow-[-18px_0_40px_rgba(3,17,32,0.18)] transition-transform duration-300',
                    isVillageAnnualOpen ? 'translate-x-0' : 'translate-x-full',
                )}
                aria-hidden={!isVillageAnnualOpen}
            >
                <div className="flex items-start justify-between gap-4 border-b border-[#EFEFEF] px-5 py-4">
                    <div>
                        <p className="text-xs font-bold text-[#0066AE]">
                            {assignment.village.name}
                        </p>
                        <h2 className="mt-1 text-lg font-bold text-[#303030]">
                            Edit Data Tahunan Desa
                        </h2>
                        <p className="mt-1 text-xs leading-5 font-semibold text-[#7C7C7C]">
                            Kelola statistik penduduk, kelompok rentan, dan
                            kelompok aktif sesuai data desa.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={closeVillageAnnualSidebar}
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#DDE4EC] text-[#303030] transition hover:bg-[#F1F5F8]"
                        aria-label="Tutup edit data tahunan desa"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    onSubmit={submitVillageAnnualData}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
                        <section className="rounded-xl border border-[#EFEFEF] bg-[#F8FBFE] p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-bold text-[#303030]">
                                        Statistik Penduduk Tahunan
                                    </h3>
                                    <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                        Tabel village_annual_population_stats.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        villageAnnualForm.setData(
                                            'annual_population_stats',
                                            [
                                                ...villageAnnualForm.data
                                                    .annual_population_stats,
                                                emptyPopulationStat(),
                                            ],
                                        )
                                    }
                                    className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-[#0066AE] px-3 text-xs font-bold text-white"
                                >
                                    <Plus size={14} />
                                    Tambah
                                </button>
                            </div>
                            <FieldError
                                message={
                                    (
                                        villageAnnualForm.errors as Record<
                                            string,
                                            string | undefined
                                        >
                                    ).annual_population_stats
                                }
                            />
                            <div className="mt-4 space-y-3">
                                {villageAnnualForm.data.annual_population_stats
                                    .length === 0 && (
                                    <p className="rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]">
                                        Belum ada data penduduk tahunan.
                                    </p>
                                )}
                                {villageAnnualForm.data.annual_population_stats.map(
                                    (row, index) => {
                                        const formErrors =
                                            villageAnnualForm.errors as Record<
                                                string,
                                                string | undefined
                                            >;

                                        return (
                                            <div
                                                key={index}
                                                className="rounded-xl border border-[#EFEFEF] bg-white p-3"
                                            >
                                                <div className="grid gap-3 sm:grid-cols-3">
                                                    <label className="block space-y-1.5">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Tahun
                                                        </span>
                                                        <input
                                                            type="number"
                                                            value={row.year}
                                                            onChange={(event) =>
                                                                updatePopulationStat(
                                                                    index,
                                                                    'year',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                        />
                                                        <FieldError
                                                            message={
                                                                formErrors[
                                                                    `annual_population_stats.${index}.year`
                                                                ]
                                                            }
                                                        />
                                                    </label>
                                                    <label className="block space-y-1.5 sm:col-span-2">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Kategori
                                                        </span>
                                                        <input
                                                            value={
                                                                row.category_value
                                                            }
                                                            onChange={(event) =>
                                                                updatePopulationStat(
                                                                    index,
                                                                    'category_value',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                            placeholder="Contoh: Laki-laki, Perempuan, Total"
                                                        />
                                                        <FieldError
                                                            message={
                                                                formErrors[
                                                                    `annual_population_stats.${index}.category_value`
                                                                ]
                                                            }
                                                        />
                                                    </label>
                                                    <label className="block space-y-1.5">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Jumlah Orang
                                                        </span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={
                                                                row.total_people
                                                            }
                                                            onChange={(event) =>
                                                                updatePopulationStat(
                                                                    index,
                                                                    'total_people',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                        />
                                                        <FieldError
                                                            message={
                                                                formErrors[
                                                                    `annual_population_stats.${index}.total_people`
                                                                ]
                                                            }
                                                        />
                                                    </label>
                                                    <label className="block space-y-1.5 sm:col-span-2">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Catatan
                                                        </span>
                                                        <input
                                                            value={row.notes}
                                                            onChange={(event) =>
                                                                updatePopulationStat(
                                                                    index,
                                                                    'notes',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                            placeholder="Catatan opsional"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="mt-3 flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            villageAnnualForm.setData(
                                                                'annual_population_stats',
                                                                villageAnnualForm.data.annual_population_stats.filter(
                                                                    (
                                                                        _,
                                                                        rowIndex,
                                                                    ) =>
                                                                        rowIndex !==
                                                                        index,
                                                                ),
                                                            )
                                                        }
                                                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#F3C8C8] px-3 text-xs font-bold text-[#D81313] hover:bg-[#FDECEC]"
                                                    >
                                                        <Trash2 size={14} />
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        </section>

                        <section className="rounded-xl border border-[#EFEFEF] bg-[#F8FBFE] p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-bold text-[#303030]">
                                        Kelompok Rentan Tahunan
                                    </h3>
                                    <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                        Tabel village_vulnerable_group_annuals.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        villageAnnualForm.setData(
                                            'vulnerable_group_annuals',
                                            [
                                                ...villageAnnualForm.data
                                                    .vulnerable_group_annuals,
                                                emptyVulnerableGroupAnnual(),
                                            ],
                                        )
                                    }
                                    className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-[#0066AE] px-3 text-xs font-bold text-white"
                                >
                                    <Plus size={14} />
                                    Tambah
                                </button>
                            </div>
                            <FieldError
                                message={
                                    (
                                        villageAnnualForm.errors as Record<
                                            string,
                                            string | undefined
                                        >
                                    ).vulnerable_group_annuals
                                }
                            />
                            <div className="mt-4 space-y-3">
                                {villageAnnualForm.data.vulnerable_group_annuals
                                    .length === 0 && (
                                    <p className="rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]">
                                        Belum ada data kelompok rentan.
                                    </p>
                                )}
                                {villageAnnualForm.data.vulnerable_group_annuals.map(
                                    (row, index) => {
                                        const formErrors =
                                            villageAnnualForm.errors as Record<
                                                string,
                                                string | undefined
                                            >;

                                        return (
                                            <div
                                                key={index}
                                                className="rounded-xl border border-[#EFEFEF] bg-white p-3"
                                            >
                                                <div className="grid gap-3 sm:grid-cols-3">
                                                    <label className="block space-y-1.5">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Tahun
                                                        </span>
                                                        <input
                                                            type="number"
                                                            value={row.year}
                                                            onChange={(event) =>
                                                                updateVulnerableGroupAnnual(
                                                                    index,
                                                                    'year',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                        />
                                                        <FieldError
                                                            message={
                                                                formErrors[
                                                                    `vulnerable_group_annuals.${index}.year`
                                                                ]
                                                            }
                                                        />
                                                    </label>
                                                    <label className="block space-y-1.5 sm:col-span-2">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Kategori Rentan
                                                        </span>
                                                        <input
                                                            value={
                                                                row.vulnerable_category
                                                            }
                                                            onChange={(event) =>
                                                                updateVulnerableGroupAnnual(
                                                                    index,
                                                                    'vulnerable_category',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                            placeholder="Contoh: Lansia, Disabilitas, Anak"
                                                        />
                                                    </label>
                                                    <label className="block space-y-1.5">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Jumlah Orang
                                                        </span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={
                                                                row.total_people
                                                            }
                                                            onChange={(event) =>
                                                                updateVulnerableGroupAnnual(
                                                                    index,
                                                                    'total_people',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                        />
                                                        <FieldError
                                                            message={
                                                                formErrors[
                                                                    `vulnerable_group_annuals.${index}.total_people`
                                                                ]
                                                            }
                                                        />
                                                    </label>
                                                    <label className="block space-y-1.5 sm:col-span-2">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Catatan
                                                        </span>
                                                        <input
                                                            value={row.notes}
                                                            onChange={(event) =>
                                                                updateVulnerableGroupAnnual(
                                                                    index,
                                                                    'notes',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                            placeholder="Catatan opsional"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="mt-3 flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            villageAnnualForm.setData(
                                                                'vulnerable_group_annuals',
                                                                villageAnnualForm.data.vulnerable_group_annuals.filter(
                                                                    (
                                                                        _,
                                                                        rowIndex,
                                                                    ) =>
                                                                        rowIndex !==
                                                                        index,
                                                                ),
                                                            )
                                                        }
                                                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#F3C8C8] px-3 text-xs font-bold text-[#D81313] hover:bg-[#FDECEC]"
                                                    >
                                                        <Trash2 size={14} />
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        </section>

                        <section className="rounded-xl border border-[#EFEFEF] bg-[#F8FBFE] p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-bold text-[#303030]">
                                        Kelompok Aktif Tahunan
                                    </h3>
                                    <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                        Tabel village_active_group_annuals.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        villageAnnualForm.setData(
                                            'active_group_annuals',
                                            [
                                                ...villageAnnualForm.data
                                                    .active_group_annuals,
                                                emptyActiveGroupAnnual(),
                                            ],
                                        )
                                    }
                                    className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-[#0066AE] px-3 text-xs font-bold text-white"
                                >
                                    <Plus size={14} />
                                    Tambah
                                </button>
                            </div>
                            <FieldError
                                message={
                                    (
                                        villageAnnualForm.errors as Record<
                                            string,
                                            string | undefined
                                        >
                                    ).active_group_annuals
                                }
                            />
                            <div className="mt-4 space-y-3">
                                {villageAnnualForm.data.active_group_annuals
                                    .length === 0 && (
                                    <p className="rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]">
                                        Belum ada data kelompok aktif.
                                    </p>
                                )}
                                {villageAnnualForm.data.active_group_annuals.map(
                                    (row, index) => {
                                        const formErrors =
                                            villageAnnualForm.errors as Record<
                                                string,
                                                string | undefined
                                            >;

                                        return (
                                            <div
                                                key={index}
                                                className="rounded-xl border border-[#EFEFEF] bg-white p-3"
                                            >
                                                <div className="grid gap-3 sm:grid-cols-3">
                                                    <label className="block space-y-1.5">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Tahun
                                                        </span>
                                                        <input
                                                            type="number"
                                                            value={row.year}
                                                            onChange={(event) =>
                                                                updateActiveGroupAnnual(
                                                                    index,
                                                                    'year',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                        />
                                                        <FieldError
                                                            message={
                                                                formErrors[
                                                                    `active_group_annuals.${index}.year`
                                                                ]
                                                            }
                                                        />
                                                    </label>
                                                    <label className="block space-y-1.5 sm:col-span-2">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Kategori Aktif
                                                        </span>
                                                        <input
                                                            value={
                                                                row.active_category
                                                            }
                                                            onChange={(event) =>
                                                                updateActiveGroupAnnual(
                                                                    index,
                                                                    'active_category',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                            placeholder="Contoh: Pokdarwis, Karang Taruna"
                                                        />
                                                    </label>
                                                    <label className="block space-y-1.5">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Nilai
                                                        </span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={row.value}
                                                            onChange={(event) =>
                                                                updateActiveGroupAnnual(
                                                                    index,
                                                                    'value',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                        />
                                                        <FieldError
                                                            message={
                                                                formErrors[
                                                                    `active_group_annuals.${index}.value`
                                                                ]
                                                            }
                                                        />
                                                    </label>
                                                    <label className="block space-y-1.5 sm:col-span-2">
                                                        <span className="text-xs font-bold text-[#303030]">
                                                            Catatan
                                                        </span>
                                                        <input
                                                            value={row.notes}
                                                            onChange={(event) =>
                                                                updateActiveGroupAnnual(
                                                                    index,
                                                                    'notes',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
                                                            placeholder="Catatan opsional"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="mt-3 flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            villageAnnualForm.setData(
                                                                'active_group_annuals',
                                                                villageAnnualForm.data.active_group_annuals.filter(
                                                                    (
                                                                        _,
                                                                        rowIndex,
                                                                    ) =>
                                                                        rowIndex !==
                                                                        index,
                                                                ),
                                                            )
                                                        }
                                                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#F3C8C8] px-3 text-xs font-bold text-[#D81313] hover:bg-[#FDECEC]"
                                                    >
                                                        <Trash2 size={14} />
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-[#EFEFEF] px-5 py-4">
                        <button
                            type="button"
                            onClick={closeVillageAnnualSidebar}
                        >
                            <Button>Batal</Button>
                        </button>
                        <button
                            type="submit"
                            disabled={villageAnnualForm.processing}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:opacity-60"
                        >
                            <Save size={16} />
                            {villageAnnualForm.processing
                                ? 'Menyimpan...'
                                : 'Simpan Data Desa'}
                        </button>
                    </div>
                </form>
            </aside>

            <SurveyAnswerEditModal
                assignmentCode={assignment.code}
                question={editingQuestion}
                open={Boolean(editingQuestion)}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditingQuestion(null);
                    }
                }}
            />
            <AnswerDetailModal
                question={detailQuestion}
                open={Boolean(detailQuestion)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDetailQuestion(null);
                    }
                }}
            />
            <AnswerHistoryModal
                question={historyQuestion}
                open={Boolean(historyQuestion)}
                onOpenChange={(open) => {
                    if (!open) {
                        setHistoryQuestion(null);
                    }
                }}
            />
        </>
    );
}

SurveyAssignmentShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Survey Assignment', href: surveyAssignments() },
        { title: 'Detail', href: '#' },
    ],
};
