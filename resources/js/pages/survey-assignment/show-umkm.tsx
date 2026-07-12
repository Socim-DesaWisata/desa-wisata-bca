import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    BadgeDollarSign,
    Banknote,
    CalendarDays,
    Camera,
    CheckCircle2,
    ChevronDown,
    Download,
    Eye,
    FileText,
    ImageIcon,
    MapPin,
    Pencil,
    Plus,
    RefreshCcw,
    Save,
    Search,
    Star,
    Store,
    Trash2,
    UserRound,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { ReactNode } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
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

import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { dashboard, surveyAssignments } from '@/routes';
import { show as showAssignment } from '@/routes/survey-assignments';
import {
    destroy as destroyUmkmDocument,
    store as storeUmkmDocument,
    update as updateUmkmDocument,
} from '@/routes/survey-assignments/umkm/documents';
import {
    exportMethod as exportUmkm,
    update as updateUmkm,
} from '@/routes/survey-assignments/umkm';
import { update as updateUmkmAnswer } from '@/routes/survey-assignments/umkm/answers';

type UserSummary = {
    id: string | null;
    name: string;
    email: string | null;
};

type UmkmDocument = {
    id: number;
    document_name: string;
    file_path: string;
    file_url: string;
    mime_type: string | null;
    file_size: number | null;
    file_size_label: string;
    uploaded_by: UserSummary;
    created_at: string;
    updated_at: string;
};

type Assignment = {
    id: number;
    code: string;
    status_label: string;
    village: {
        id: number | null;
        code: string | null;
        name: string;
        status: string | null;
        address: string | null;
        location: string;
    };
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
    village_name: string | null;
    collector_name: string | null;
    legal_business_name: string | null;
    established_year: number | null;
    company_website_url: string | null;
    production_address: string | null;
    product_category: string | null;
    categories: CategoryOption[];
    category_labels: string | null;
    brand_name: string | null;
    annual_revenue: string;
    monthly_production_capacity: string | null;
    annual_production_capacity: string | null;
    factory_location_feasibility: string | null;
    certifications: string | null;
    current_obstacles: string | null;
    has_business_legality_and_certification: string | null;
    is_umkm_participant: string | null;
    is_production_capacity_participant: string | null;
    instagram_url: string | null;
    facebook_url: string | null;
    twitter_url: string | null;
    marketing_website_url: string | null;
    ecommerce_profile_url: string | null;
    marketing_notes: string | null;
    sustainability_notes: string | null;
    bank_name: string | null;
    bank_account_number: string | null;
    has_qris: string;
    qris_provider: string | null;
    has_edc: string;
    edc_provider: string | null;
    has_credit_card: string;
    banking_notes: string | null;
    has_exported: string;
    export_destination_countries: string | null;
    collector: UserSummary;
    creator: UserSummary;
    product_photo_url: string | null;
    documents: UmkmDocument[];
    created_at: string;
    updated_at: string;
    survey_summary: SurveySummary;
};

type SurveySummary = {
    answered_questions: number;
    average_score: number;
    weighted_score: number;
    last_answered_at: string;
};

type ShowUmkmProps = {
    assignment: Assignment;
    umkm: UmkmData;
    survey_summary: SurveySummary;
    survey_groups: UmkmSurveyGroup[];
    edit_values: UmkmEditValues;
};

type UmkmEditValues = {
    business_owner_name: string;
    name: string;
    legal_business_name: string;
    established_year: string;
    company_website_url: string;
    production_address: string;
    product_category: string;
    categories: string[];
    brand_name: string;
    annual_revenue: string;
    monthly_production_capacity: string;
    current_obstacles: string;
    certifications: string;
    has_business_legality_and_certification: string;
    is_umkm_participant: string;
    is_production_capacity_participant: string;
    annual_production_capacity: string;
    factory_location_feasibility: string;
    instagram_url: string;
    facebook_url: string;
    twitter_url: string;
    marketing_website_url: string;
    ecommerce_profile_url: string;
    marketing_notes: string;
    sustainability_notes: string;
    bank_name: string;
    bank_account_number: string;
    has_qris: string;
    qris_provider: string;
    has_edc: string;
    edc_provider: string;
    has_credit_card: string;
    banking_notes: string;
    has_exported: string;
    export_destination_countries: string;
    annual_turnovers: AnnualTurnoverForm[];
    annual_worker_stats: AnnualWorkerStatForm[];
    annual_worker_training_stats: AnnualWorkerTrainingStatForm[];
};

type UmkmEditForm = UmkmEditValues & {
    _method: 'patch';
    product_photo: File | null;
};

type AnnualTurnoverForm = {
    year: string;
    value: string;
    notes: string;
};

type AnnualWorkerStatForm = {
    year: string;
    dimension: string;
    category_value: string;
    total_people: string;
    notes: string;
};

type AnnualWorkerTrainingStatForm = {
    year: string;
    training_name: string;
    total_people: string;
    notes: string;
};

type UmkmAnswerEditForm = {
    score: string;
};

type UmkmDocumentForm = {
    _method?: 'patch';
    document_name: string;
    file: File | null;
};

type ErrorBag = Record<string, string | undefined>;

type Option = {
    value: string;
    label: string;
};

type CategoryOption = Option;

const booleanOptions: Option[] = [
    { value: '1', label: 'Ya' },
    { value: '0', label: 'Tidak' },
];

function digitsOnly(value: string) {
    const normalized = value.replace(',', '.').trim();
    const integerPart = normalized.split('.')[0] ?? '';

    return integerPart.replace(/\D/g, '');
}

function formatThousands(value: string) {
    const digits = digitsOnly(value);

    return digits ? new Intl.NumberFormat('id-ID').format(Number(digits)) : '';
}

function emptyAnnualTurnover(): AnnualTurnoverForm {
    return {
        year: String(new Date().getFullYear()),
        value: '',
        notes: '',
    };
}

function emptyAnnualWorkerStat(): AnnualWorkerStatForm {
    return {
        year: String(new Date().getFullYear()),
        dimension: 'age',
        category_value: '',
        total_people: '',
        notes: '',
    };
}

function emptyAnnualWorkerTrainingStat(): AnnualWorkerTrainingStatForm {
    return {
        year: String(new Date().getFullYear()),
        training_name: '',
        total_people: '',
        notes: '',
    };
}

const legalBusinessOptions: Option[] = [
    { value: 'UD', label: 'UD' },
    { value: 'CV', label: 'CV' },
    { value: 'PT', label: 'PT' },
    { value: 'Perorangan', label: 'Perorangan' },
];

const umkmCategoryOptions: CategoryOption[] = [
    { value: 'kuliner', label: 'Kuliner' },
    { value: 'tekstil_dan_kerajinan', label: 'Tekstil dan Kerajinan' },
    { value: 'fashion_dan_aksesoris', label: 'Fashion dan Aksesoris' },
    { value: 'kecantikan_dan_kesehatan', label: 'Kecantikan dan Kesehatan' },
    { value: 'jasa', label: 'Jasa' },
    { value: 'pertanian', label: 'Pertanian' },
    { value: 'peternakan', label: 'Peternakan' },
    { value: 'perikanan', label: 'Perikanan' },
    {
        value: 'produk_digital_dan_kreatif',
        label: 'Produk Digital dan Kreatif',
    },
];

function initialEditForm(values: UmkmEditValues): UmkmEditForm {
    return {
        _method: 'patch',
        ...values,
        product_photo: null,
    };
}

function fieldError(errors: Partial<Record<string, string>>, name: string) {
    return (errors as ErrorBag)[name];
}

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function criteriaLabel(criteriaCode: string, criteriaName: string) {
    return criteriaCode + '. ' + criteriaName;
}

function Card({
    children,
    className,
}: {
    children: ReactNode;
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
    icon: ReactNode;
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
                                'truncate text-[11px] font-semibold',
                                tone === 'blue'
                                    ? 'text-white/80'
                                    : 'text-[#667085]',
                            )}
                        >
                            {label}
                        </p>
                        <div className="mt-0.5 flex min-w-0 items-baseline gap-1.5">
                            <p
                                className={classNames(
                                    'truncate text-lg leading-6 font-black tabular-nums',
                                    tone === 'blue'
                                        ? 'text-white'
                                        : 'text-[#111827]',
                                )}
                            >
                                {value}
                            </p>
                            <p
                                className={classNames(
                                    'shrink-0 text-xs leading-4 font-bold tabular-nums',
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
                    <p className="text-xs font-bold text-[#7C7C7C]">{label}</p>
                    <p className="mt-2 text-2xl leading-7 font-bold text-[#303030]">
                        {value}
                    </p>
                    <p
                        className={classNames(
                            'mt-1 text-xs font-bold',
                            tone === 'blue' && 'text-[#0066AE]',
                            tone === 'green' && 'text-[#00893D]',
                            tone === 'orange' && 'text-[#F97316]',
                        )}
                    >
                        {helper}
                    </p>
                </div>
                <span
                    className={classNames(
                        'flex size-10 shrink-0 items-center justify-center rounded-full',
                        tone === 'blue' && 'bg-[#EAF3FF] text-[#0066AE]',
                        tone === 'green' && 'bg-[#EAF8F0] text-[#00893D]',
                        tone === 'orange' && 'bg-[#FFF4EA] text-[#F97316]',
                    )}
                >
                    {icon}
                </span>
            </div>
        </Card>
    );
}
type ScoreBucket = {
    key: string;
    label: string;
    min: number;
    max: number;
    color: string;
    textColor: string;
};

const scoreBuckets: ScoreBucket[] = [
    {
        key: '0-20',
        label: '0-20',
        min: 0,
        max: 20,
        color: '#EF4444',
        textColor: 'text-[#EF4444]',
    },
    {
        key: '21-40',
        label: '21-40',
        min: 21,
        max: 40,
        color: '#F97316',
        textColor: 'text-[#F97316]',
    },
    {
        key: '41-60',
        label: '41-60',
        min: 41,
        max: 60,
        color: '#FACC15',
        textColor: 'text-[#CA8A04]',
    },
    {
        key: '61-80',
        label: '61-80',
        min: 61,
        max: 80,
        color: '#22C55E',
        textColor: 'text-[#16A34A]',
    },
    {
        key: '81-100',
        label: '81-100',
        min: 81,
        max: 100,
        color: '#2563EB',
        textColor: 'text-[#2563EB]',
    },
];

const performanceLegends = [
    { label: 'Rendah (0-40)', color: '#EF4444' },
    { label: 'Cukup (41-60)', color: '#FACC15' },
    { label: 'Baik (61-80)', color: '#22C55E' },
    { label: 'Sangat Baik (81-100)', color: '#2563EB' },
];

function clampScore(value: number) {
    if (!Number.isFinite(value)) {
        return 0;
    }

    return Math.min(100, Math.max(0, value));
}

function answerScorePercent(answer: UmkmSurveyAnswer) {
    if (answer.max_score <= 0) {
        return 0;
    }

    return clampScore((answer.score / answer.max_score) * 100);
}

function criteriaPerformanceScore(group: UmkmSurveyGroup) {
    if (group.criteria_weight_percent > 0) {
        return clampScore(
            (group.weighted_score / group.criteria_weight_percent) * 100,
        );
    }

    if (group.answers.length === 0) {
        return 0;
    }

    return clampScore(
        group.answers.reduce(
            (total, answer) => total + answerScorePercent(answer),
            0,
        ) / group.answers.length,
    );
}

function scoreBucketFor(value: number) {
    const rounded = Math.round(clampScore(value));

    return (
        scoreBuckets.find(
            (bucket) => rounded >= bucket.min && rounded <= bucket.max,
        ) ?? scoreBuckets[0]
    );
}

function formatStatScore(value: number) {
    return clampScore(value).toLocaleString('id-ID', {
        maximumFractionDigits: 1,
    });
}

type AnnualChartDatum = {
    year: string;
    value: number;
};

function numericValue(value: string) {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : 0;
}

function aggregateByYear<T extends { year: string }>(
    rows: T[],
    valueResolver: (row: T) => number,
): AnnualChartDatum[] {
    const totals = rows.reduce<Record<string, number>>((result, row) => {
        const year = row.year?.trim();

        if (!year) {
            return result;
        }

        result[year] = (result[year] ?? 0) + valueResolver(row);

        return result;
    }, {});

    return Object.entries(totals)
        .map(([year, value]) => ({ year, value }))
        .sort((first, second) => Number(first.year) - Number(second.year));
}

function formatCompactNumber(value: number) {
    return new Intl.NumberFormat('id-ID', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(value);
}

function AnnualBarChartCard({
    title,
    description,
    data,
    barColor,
    valuePrefix = '',
}: {
    title: string;
    description: string;
    data: AnnualChartDatum[];
    barColor: string;
    valuePrefix?: string;
}) {
    return (
        <div className="min-w-0 rounded-xl border border-[#E7ECF2] bg-white p-4">
            <div>
                <h3 className="text-sm font-bold text-[#303030]">{title}</h3>
                <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                    {description}
                </p>
            </div>

            <div className="mt-4 h-56 w-full">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 22, right: 8, left: -18, bottom: 0 }}
                            accessibilityLayer
                        >
                            <CartesianGrid
                                vertical={false}
                                stroke="#E7ECF2"
                                strokeDasharray="3 3"
                            />
                            <XAxis
                                dataKey="year"
                                axisLine={false}
                                tickLine={false}
                                tickMargin={8}
                                tick={{
                                    fill: '#64748B',
                                    fontSize: 11,
                                    fontWeight: 700,
                                }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tickMargin={8}
                                tickFormatter={formatCompactNumber}
                                tick={{
                                    fill: '#94A3B8',
                                    fontSize: 11,
                                    fontWeight: 700,
                                }}
                            />
                            <Bar
                                dataKey="value"
                                fill={barColor}
                                radius={[8, 8, 0, 0]}
                            >
                                <LabelList
                                    dataKey="value"
                                    position="top"
                                    offset={8}
                                    formatter={(value: any) =>
                                        `${valuePrefix}${formatCompactNumber(Number(value ?? 0))}`
                                    }
                                    fill="#303030"
                                    fontSize={11}
                                    fontWeight={800}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-[#DDE4EC] bg-[#F8FBFE] px-4 text-center text-xs font-semibold text-[#7C7C7C]">
                        Belum ada data tahunan.
                    </div>
                )}
            </div>
        </div>
    );
}

function UmkmAnnualCharts({ values }: { values: UmkmEditValues }) {
    const turnoverData = aggregateByYear(values.annual_turnovers, (row) =>
        numericValue(row.value),
    );
    const workerData = aggregateByYear(values.annual_worker_stats, (row) =>
        numericValue(row.total_people),
    );
    const trainingData = aggregateByYear(
        values.annual_worker_training_stats,
        (row) => numericValue(row.total_people),
    );

    return (
        <Card className="p-5">
            <div className="grid gap-4 xl:grid-cols-3">
                <AnnualBarChartCard
                    title="Omset Tahunan"
                    description="Total annual_turnovers per tahun"
                    data={turnoverData}
                    barColor="#0066AE"
                    valuePrefix="Rp"
                />
                <AnnualBarChartCard
                    title="Statistik Pekerja"
                    description="Total annual_worker_stats per tahun"
                    data={workerData}
                    barColor="#22C55E"
                />
                <AnnualBarChartCard
                    title="Pelatihan Pekerja"
                    description="Total annual_worker_training_stats per tahun"
                    data={trainingData}
                    barColor="#F97316"
                />
            </div>
        </Card>
    );
}

type CriteriaScoreSummary = {
    code: string;
    name: string;
    score: number;
    max_score: number;
    score_percent: number;
};

function formatPointScore(score: number, maxScore: number) {
    return `${score.toLocaleString('id-ID')}/${maxScore.toLocaleString('id-ID')}`;
}

function UmkmFinalScoreGauge({ score }: { score: number }) {
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

function UmkmCriteriaScoreBars({
    criteria,
}: {
    criteria: CriteriaScoreSummary[];
}) {
    return (
        <Card className="min-h-[360px] rounded-2xl border border-[#E5EDF6] bg-white p-6 shadow-none">
            <h2 className="text-base font-bold text-[#111827]">
                Performa per Kriteria
            </h2>
            <p className="mt-1 text-sm font-medium text-[#8A97A8]">
                Total skor per kriteria
            </p>

            <div className="mt-6 space-y-4">
                {criteria.length === 0 ? (
                    <div className="flex h-52 items-center justify-center rounded-xl bg-[#F8FBFE] text-sm font-semibold text-[#8A97A8]">
                        Belum ada data kriteria
                    </div>
                ) : (
                    criteria.map((criterion) => (
                        <div
                            key={criterion.code}
                            className="grid gap-2 md:grid-cols-[160px_minmax(0,1fr)_72px] md:items-center"
                        >
                            <p className="truncate text-xs font-semibold text-[#344256]">
                                {criterion.name}
                            </p>
                            <div className="relative h-4 overflow-hidden rounded-full bg-[#EAF0F7]">
                                <div
                                    className="h-full rounded-full bg-[#0066AE]"
                                    style={{
                                        width: `${clampScore(criterion.score_percent)}%`,
                                    }}
                                />
                            </div>
                            <p className="text-right text-xs font-black text-[#111827] tabular-nums">
                                {formatPointScore(
                                    criterion.score,
                                    criterion.max_score,
                                )}
                            </p>
                        </div>
                    ))
                )}
            </div>

            <p className="mt-5 text-[11px] font-bold text-[#9AA7B6] md:ml-[160px]">
                Total skor aktual / skor maksimal per kriteria
            </p>
        </Card>
    );
}

function UmkmCriteriaRadarComparison({
    criteria,
}: {
    criteria: CriteriaScoreSummary[];
}) {
    const chartData = criteria.map((criterion) => ({
        criteria:
            criterion.name.length > 18
                ? `${criterion.name.slice(0, 18)}…`
                : criterion.name,
        fullCriteria: criterion.name,
        score: Number(clampScore(criterion.score_percent).toFixed(1)),
    }));

    if (chartData.length === 1) {
        chartData.push({ criteria: ' ', fullCriteria: ' ', score: 0 });
        chartData.push({ criteria: '  ', fullCriteria: '  ', score: 0 });
    } else if (chartData.length === 2) {
        chartData.push({ criteria: ' ', fullCriteria: ' ', score: 0 });
    }

    return (
        <Card className="min-h-[360px] rounded-2xl border border-[#E5EDF6] bg-white p-6 shadow-none">
            <h2 className="text-base font-bold text-[#111827]">
                Perbandingan Kriteria (Radar)
            </h2>
            <p className="mt-1 text-sm font-medium text-[#8A97A8]">
                Visualisasi nilai antar kriteria
            </p>

            <div className="mt-4 h-[265px]">
                {criteria.length === 0 ? (
                    <div className="flex h-full items-center justify-center rounded-xl bg-[#F8FBFE] text-sm font-semibold text-[#8A97A8]">
                        Belum ada data kriteria
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
                                dataKey="criteria"
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
                                        (data) => data.criteria === label,
                                    );

                                    return item?.fullCriteria ?? label;
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

function UmkmStatisticsCards({
    criteria,
    finalScore,
}: {
    criteria: CriteriaScoreSummary[];
    finalScore: number;
}) {
    return (
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.25fr_1fr]">
            <UmkmFinalScoreGauge score={finalScore} />
            <UmkmCriteriaScoreBars criteria={criteria} />
            <UmkmCriteriaRadarComparison criteria={criteria} />
        </div>
    );
}

function UmkmSurveyStatistics({ groups }: { groups: UmkmSurveyGroup[] }) {
    const criteria = groups.map((group) => ({
        code: group.criteria_code,
        name: criteriaLabel(group.criteria_code, group.criteria_name),
        score: group.weighted_score,
        max_score: group.criteria_weight_percent,
        score_percent: criteriaPerformanceScore(group),
    }));
    const totalScore = criteria.reduce(
        (total, criterion) => total + criterion.score,
        0,
    );
    const maxScore = criteria.reduce(
        (total, criterion) => total + criterion.max_score,
        0,
    );
    const finalScore = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    return <UmkmStatisticsCards criteria={criteria} finalScore={finalScore} />;
}
function DetailPair({ label, value }: { label: string; value: ReactNode }) {
    return (
        <div className="min-w-0 rounded-lg bg-[#F8FBFE] px-3 py-2">
            <p className="text-[11px] font-black tracking-[0.06em] text-[#7C7C7C] uppercase">
                {label}
            </p>
            <p className="mt-1 text-sm font-bold break-words text-[#303030]">
                {value || '-'}
            </p>
        </div>
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

function TextInput({
    label,
    value,
    onChange,
    error,
    placeholder,
    type = 'text',
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
}) {
    return (
        <label className="block min-w-0">
            <span className="text-xs font-bold text-[#344256]">
                {label} {required && <span className="text-[#D81313]">*</span>}
            </span>
            <input
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="mt-2 h-10 w-full rounded-xl border border-[#DCE3EA] bg-white px-3 text-sm text-[#172033] transition outline-none placeholder:text-[#9AA7B5] focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15"
            />
            <FieldError message={error} />
        </label>
    );
}

function TextArea({
    label,
    value,
    onChange,
    error,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
}) {
    return (
        <label className="block min-w-0">
            <span className="text-xs font-bold text-[#344256]">{label}</span>
            <textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                rows={3}
                className="mt-2 w-full resize-y rounded-xl border border-[#DCE3EA] bg-white px-3 py-2 text-sm leading-6 text-[#172033] transition outline-none placeholder:text-[#9AA7B5] focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15"
            />
            <FieldError message={error} />
        </label>
    );
}

function SelectInput({
    label,
    value,
    onChange,
    options,
    error,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    error?: string;
}) {
    return (
        <label className="block min-w-0">
            <span className="text-xs font-bold text-[#344256]">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="mt-2 h-10 w-full rounded-xl border border-[#DCE3EA] bg-white px-3 text-sm text-[#172033] transition outline-none focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15"
            >
                <option value="">Pilih data</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <FieldError message={error} />
        </label>
    );
}

function EditSection({
    icon,
    title,
    description,
    children,
}: {
    icon?: ReactNode;
    title: string;
    description?: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-xl border border-[#EFEFEF] bg-[#F8FBFE] p-4">
            <div className="mb-4">
                <div className="flex items-center gap-2">
                    {icon && <span className="text-[#0066AE]">{icon}</span>}
                    <h3 className="text-sm font-bold text-[#303030]">
                        {title}
                    </h3>
                </div>
                {description && (
                    <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                        {description}
                    </p>
                )}
            </div>
            {children}
        </section>
    );
}

function QuestionRow({
    answer,
    number,
    onViewDetail,
    onEditAnswer,
    isViewer,
}: {
    answer: UmkmSurveyAnswer;
    number: number;
    onViewDetail: (answer: UmkmSurveyAnswer) => void;
    onEditAnswer: (answer: UmkmSurveyAnswer) => void;
    isViewer: boolean;
}) {
    return (
        <div className={classNames(
            'grid gap-3 border-b border-[#EFEFEF] px-4 py-4 last:border-b-0',
            isViewer
                ? 'xl:grid-cols-[38px_minmax(260px,1fr)_104px_78px]'
                : 'xl:grid-cols-[38px_minmax(260px,1fr)_104px_78px_118px_180px]',
        )}>
            <div className="flex size-8 items-center justify-center rounded-full border border-[#CAD7E6] text-xs font-bold text-[#7C7C7C]">
                {String(number).padStart(2, '0')}
            </div>
            <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#0066AE]">
                    Pertanyaan {answer.question_number ?? '-'}
                </p>
                <p className="mt-1 text-sm leading-5 font-semibold text-[#303030]">
                    {answer.question_text}
                </p>
            </div>
            <div className="flex items-center">
                <div className="w-full rounded-lg bg-[#0066AE] px-2.5 py-2.5 text-center text-white shadow-[0_6px_12px_rgba(0,102,174,0.10)]">
                    <p className="text-sm font-bold">
                        {answer.score} / {answer.max_score}
                    </p>
                    <p className="text-[11px] font-semibold opacity-80">Skor</p>
                </div>
            </div>
            <div className="flex items-center text-xs">
                <div>
                    <p className="font-semibold text-[#7C7C7C]">Bobot</p>
                    <p className="mt-1 font-bold text-[#303030]">
                        {answer.question_weight_percent}%
                    </p>
                </div>
            </div>
            {!isViewer && <div className="flex items-center text-xs">
                <div>
                    <p className="font-semibold text-[#7C7C7C]">
                        Terakhir diedit
                    </p>
                    <p className="mt-1 font-bold text-[#303030]">
                        {answer.last_edited_at}
                    </p>
                </div>
            </div>}
            {!isViewer && <div className="flex items-center justify-end gap-2">
                <button
                    type="button"
                    onClick={() => onViewDetail(answer)}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                >
                    <Eye size={14} />
                    Detail
                </button>
                <button
                    type="button"
                    onClick={() => onEditAnswer(answer)}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-3 text-xs font-bold text-white transition hover:bg-[#093967]"
                >
                    <Pencil size={14} />
                    Edit
                </button>
            </div>}
        </div>
    );
}

function AnswerDetailModal({
    answer,
    open,
    onOpenChange,
}: {
    answer: UmkmSurveyAnswer | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    if (!answer) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-[#303030]">
                        Detail Jawaban UMKM
                    </DialogTitle>
                    <DialogDescription>
                        Pertanyaan, skor 0-100, bobot, dan informasi pengisian.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <section className="rounded-xl bg-[#F8FBFF] p-4">
                        <p className="text-xs font-bold text-[#0066AE]">
                            Pertanyaan {answer.question_number ?? '-'}
                        </p>
                        <h3 className="mt-2 text-base leading-6 font-bold text-[#303030]">
                            {answer.question_text}
                        </h3>
                    </section>
                    <section className="grid gap-3 sm:grid-cols-3">
                        <DetailPair
                            label="Skor"
                            value={`${answer.score} / ${answer.max_score}`}
                        />
                        <DetailPair
                            label="Bobot"
                            value={`${answer.question_weight_percent}%`}
                        />
                        <DetailPair
                            label="Weighted"
                            value={answer.weighted_score}
                        />
                    </section>
                    <section className="grid gap-3 sm:grid-cols-2">
                        <DetailPair
                            label="Dijawab oleh"
                            value={answer.answered_by.name}
                        />
                        <DetailPair
                            label="Dijawab pada"
                            value={answer.answered_at}
                        />
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function AnswerEditModal({
    answer,
    open,
    form,
    onSubmit,
    onOpenChange,
}: {
    answer: UmkmSurveyAnswer | null;
    open: boolean;
    form: ReturnType<typeof useForm<UmkmAnswerEditForm>>;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onOpenChange: (open: boolean) => void;
}) {
    const { data, setData, processing, errors } = form;
    const score = Number(data.score || 0);
    const previewWeighted = answer
        ? Math.round(
              ((score / (answer.max_score || 100)) *
                  answer.question_weight_percent +
                  Number.EPSILON) *
                  100,
          ) / 100
        : 0;

    if (!answer) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-[#303030]">
                        Edit Jawaban UMKM
                    </DialogTitle>
                    <DialogDescription>
                        Ubah skor jawaban pada rentang 0 sampai 100.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <section className="rounded-xl bg-[#F8FBFF] p-4">
                        <p className="text-xs font-bold text-[#0066AE]">
                            Pertanyaan {answer.question_number ?? '-'}
                        </p>
                        <h3 className="mt-2 text-base leading-6 font-bold text-[#303030]">
                            {answer.question_text}
                        </h3>
                    </section>

                    <div className="grid gap-3 sm:grid-cols-3">
                        <DetailPair
                            label="Skor Saat Ini"
                            value={`${answer.score} / ${answer.max_score}`}
                        />
                        <DetailPair
                            label="Bobot"
                            value={`${answer.question_weight_percent}%`}
                        />
                        <DetailPair
                            label="Preview Weighted"
                            value={previewWeighted}
                        />
                    </div>

                    <label className="block min-w-0">
                        <span className="text-xs font-bold text-[#344256]">
                            Skor Baru <span className="text-[#D81313]">*</span>
                        </span>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={data.score}
                            onChange={(event) =>
                                setData('score', event.target.value)
                            }
                            placeholder="Masukkan skor 0-100"
                            className="mt-2 h-11 w-full rounded-xl border border-[#DCE3EA] bg-white px-3 text-sm text-[#172033] transition outline-none placeholder:text-[#9AA7B5] focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15"
                        />
                        <FieldError message={fieldError(errors, 'score')} />
                    </label>

                    <div className="flex items-center justify-end gap-2 border-t border-[#EFEFEF] pt-4">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]"
                        >
                            Batal
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
            </DialogContent>
        </Dialog>
    );
}

function DocumentModal({
    document,
    open,
    form,
    onSubmit,
    onOpenChange,
}: {
    document: UmkmDocument | null;
    open: boolean;
    form: ReturnType<typeof useForm<UmkmDocumentForm>>;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onOpenChange: (open: boolean) => void;
}) {
    const { data, setData, processing, errors } = form;
    const isEdit = Boolean(document);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-[#303030]">
                        {isEdit ? 'Edit Dokumen UMKM' : 'Tambah Dokumen UMKM'}
                    </DialogTitle>
                    <DialogDescription>
                        Isi nama dokumen dan unggah file PDF atau gambar.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <TextInput
                        label="Nama Dokumen"
                        value={data.document_name}
                        onChange={(value) => setData('document_name', value)}
                        error={fieldError(errors, 'document_name')}
                        placeholder="Contoh: NIB, Sertifikat Halal, Katalog Produk"
                        required
                    />
                    <label className="block min-w-0">
                        <span className="text-xs font-bold text-[#344256]">
                            File Dokumen{' '}
                            {!isEdit && (
                                <span className="text-[#D81313]">*</span>
                            )}
                        </span>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(event) =>
                                setData('file', event.target.files?.[0] ?? null)
                            }
                            className="mt-2 block w-full text-sm text-[#64748B] file:mr-3 file:h-9 file:rounded-lg file:border-0 file:bg-[#0066AE] file:px-3 file:text-sm file:font-bold file:text-white"
                        />
                        <p className="mt-1 truncate text-xs text-[#64748B]">
                            {data.file?.name ??
                                (isEdit
                                    ? 'Kosongkan jika tidak ingin mengganti file.'
                                    : 'PDF atau gambar, maksimal 50 MB.')}
                        </p>
                        <FieldError message={fieldError(errors, 'file')} />
                    </label>
                    {document && (
                        <a
                            href={document.file_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                        >
                            <Download size={15} />
                            Lihat file saat ini
                        </a>
                    )}
                    <div className="flex justify-end gap-2 border-t border-[#E2E8F0] pt-4">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white transition hover:bg-[#093967] disabled:opacity-60"
                        >
                            <Save size={16} />
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function UmkmEditSidebar({
    open,
    onClose,
    assignment,
    umkm,
    form,
    photoPreview,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    assignment: Assignment;
    umkm: UmkmData;
    form: ReturnType<typeof useForm<UmkmEditForm>>;
    photoPreview: string | null;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
    const { data, setData, processing, errors } = form;

    function toggleCategory(value: string) {
        setData(
            'categories',
            data.categories.includes(value)
                ? data.categories.filter((category) => category !== value)
                : [...data.categories, value],
        );
    }

    function updateArrayField<K extends keyof UmkmEditForm>(
        field: K,
        updater: (
            rows: UmkmEditForm[K] extends any[] ? UmkmEditForm[K] : never,
        ) => UmkmEditForm[K],
    ) {
        setData(field, updater(data[field] as any) as any);
    }

    return (
        <>
            <div
                className={classNames(
                    'fixed inset-0 z-40 bg-[#031120]/35 transition-opacity',
                    open
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0',
                )}
                onClick={onClose}
            />
            <aside
                className={classNames(
                    'fixed top-0 right-0 z-50 flex h-dvh w-full max-w-[540px] flex-col border-l border-[#DDE4EC] bg-[#F7F7F7] shadow-[-18px_0_40px_rgba(3,17,32,0.18)] transition-transform duration-300',
                    open ? 'translate-x-0' : 'translate-x-full',
                )}
                aria-hidden={!open}
            >
                <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] bg-white px-5 py-4">
                    <div className="min-w-0">
                        <p className="text-xs font-bold text-[#0066AE]">
                            {assignment.village.name}
                        </p>
                        <h2 className="mt-1 text-lg font-bold text-[#172033]">
                            Edit Data UMKM
                        </h2>
                        <p className="mt-1 text-xs leading-5 font-semibold text-[#64748B]">
                            Ubah profil usaha.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white text-[#303030] transition hover:bg-[#F1F5F8]"
                        aria-label="Tutup edit UMKM"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
                        <EditSection title="Foto Produk">
                            <div className="grid gap-4 sm:grid-cols-[150px_minmax(0,1fr)]">
                                {photoPreview ? (
                                    <img
                                        src={photoPreview}
                                        alt={umkm.name}
                                        className="h-36 w-full rounded-xl object-cover"
                                    />
                                ) : (
                                    <div className="flex h-36 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0066AE]">
                                        <ImageIcon size={30} />
                                    </div>
                                )}
                                <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#BBD5EC] bg-[#F8FBFE] px-4 text-center transition hover:border-[#0066AE]">
                                    <Camera className="size-6 text-[#0066AE]" />
                                    <span className="mt-2 text-sm font-bold text-[#172033]">
                                        Upload Foto Baru
                                    </span>
                                    <span className="mt-1 text-xs font-semibold text-[#64748B]">
                                        JPG/PNG maksimal 5MB
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        onChange={(event) =>
                                            setData(
                                                'product_photo',
                                                event.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                </label>
                            </div>
                            <FieldError
                                message={fieldError(errors, 'product_photo')}
                            />
                        </EditSection>

                        <EditSection title="Identitas UMKM">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <TextInput
                                    label="Nama Pelaku UMKM"
                                    value={data.business_owner_name}
                                    onChange={(value) =>
                                        setData('business_owner_name', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'business_owner_name',
                                    )}
                                    placeholder="Nama pemilik/pelaku usaha"
                                />
                                <TextInput
                                    label="Nama UMKM"
                                    value={data.name}
                                    onChange={(value) => setData('name', value)}
                                    error={fieldError(errors, 'name')}
                                    placeholder="Nama usaha"
                                    required
                                />
                                <SelectInput
                                    label="Nama Lengkap Badan Usaha"
                                    value={data.legal_business_name}
                                    onChange={(value) =>
                                        setData('legal_business_name', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'legal_business_name',
                                    )}
                                    options={legalBusinessOptions}
                                />
                                <TextInput
                                    label="Tahun Berdiri"
                                    value={data.established_year}
                                    onChange={(value) =>
                                        setData('established_year', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'established_year',
                                    )}
                                    placeholder="2020"
                                    type="number"
                                />
                                <div className="min-w-0 lg:col-span-2">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-xs font-bold text-[#344256]">
                                            Kategori UMKM{' '}
                                            <span className="text-[#D81313]">
                                                *
                                            </span>
                                        </span>
                                        <span className="text-[11px] font-semibold text-[#7C7C7C]">
                                            Bisa pilih lebih dari satu
                                        </span>
                                    </div>
                                    <div className="mt-2 grid grid-cols-1 gap-2 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2">
                                        {umkmCategoryOptions.map((option) => {
                                            const checked =
                                                data.categories.includes(
                                                    option.value,
                                                );

                                            return (
                                                <label
                                                    key={option.value}
                                                    className="flex min-w-0 cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#303030] ring-1 ring-[#E6ECF2] transition hover:ring-[#AAD2F8]"
                                                >
                                                    <Checkbox
                                                        checked={checked}
                                                        onCheckedChange={() =>
                                                            toggleCategory(
                                                                option.value,
                                                            )
                                                        }
                                                        className="border-[#AAD2F8] data-[state=checked]:border-[#0066AE] data-[state=checked]:bg-[#0066AE]"
                                                    />
                                                    <span className="truncate">
                                                        {option.label}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    <FieldError
                                        message={fieldError(
                                            errors,
                                            'categories',
                                        )}
                                    />
                                </div>
                                <TextInput
                                    label="Merk Dagang"
                                    value={data.brand_name}
                                    onChange={(value) =>
                                        setData('brand_name', value)
                                    }
                                    error={fieldError(errors, 'brand_name')}
                                    placeholder="Nama brand"
                                />
                                <TextInput
                                    label="Omset per Tahun"
                                    value={formatThousands(data.annual_revenue)}
                                    onChange={(value) =>
                                        setData(
                                            'annual_revenue',
                                            digitsOnly(value),
                                        )
                                    }
                                    error={fieldError(errors, 'annual_revenue')}
                                    placeholder="Nominal rupiah"
                                />
                                <TextInput
                                    label="Website Perusahaan"
                                    value={data.company_website_url}
                                    onChange={(value) =>
                                        setData('company_website_url', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'company_website_url',
                                    )}
                                    placeholder="https://contoh.com"
                                />
                            </div>
                            <TextArea
                                label="Alamat Produksi"
                                value={data.production_address}
                                onChange={(value) =>
                                    setData('production_address', value)
                                }
                                error={fieldError(errors, 'production_address')}
                                placeholder="Alamat lengkap tempat produksi"
                            />
                        </EditSection>

                        <EditSection title="Produksi dan Legalitas">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <TextInput
                                    label="Kapasitas Produksi Bulanan"
                                    value={data.monthly_production_capacity}
                                    onChange={(value) =>
                                        setData(
                                            'monthly_production_capacity',
                                            value,
                                        )
                                    }
                                    error={fieldError(
                                        errors,
                                        'monthly_production_capacity',
                                    )}
                                    placeholder="500 pcs/bulan"
                                />
                                <TextInput
                                    label="Kapasitas Produksi Tahunan"
                                    value={data.annual_production_capacity}
                                    onChange={(value) =>
                                        setData(
                                            'annual_production_capacity',
                                            value,
                                        )
                                    }
                                    error={fieldError(
                                        errors,
                                        'annual_production_capacity',
                                    )}
                                    placeholder="6000 pcs/tahun"
                                />
                                <TextInput
                                    label="Sertifikasi"
                                    value={data.certifications}
                                    onChange={(value) =>
                                        setData('certifications', value)
                                    }
                                    error={fieldError(errors, 'certifications')}
                                    placeholder="Halal, PIRT, BPOM"
                                />
                                <TextInput
                                    label="Legalitas dan Sertifikasi"
                                    value={
                                        data.has_business_legality_and_certification
                                    }
                                    onChange={(value) =>
                                        setData(
                                            'has_business_legality_and_certification',
                                            value,
                                        )
                                    }
                                    error={fieldError(
                                        errors,
                                        'has_business_legality_and_certification',
                                    )}
                                    placeholder="Status legalitas"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <TextArea
                                    label="Kelayakan Lokasi Produksi"
                                    value={data.factory_location_feasibility}
                                    onChange={(value) =>
                                        setData(
                                            'factory_location_feasibility',
                                            value,
                                        )
                                    }
                                    error={fieldError(
                                        errors,
                                        'factory_location_feasibility',
                                    )}
                                    placeholder="Catatan kelayakan lokasi produksi"
                                />
                                <TextArea
                                    label="Kendala"
                                    value={data.current_obstacles}
                                    onChange={(value) =>
                                        setData('current_obstacles', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'current_obstacles',
                                    )}
                                    placeholder="Kendala produksi, pemasaran, bahan baku"
                                />
                            </div>
                        </EditSection>

                        <EditSection title="Marketing">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <TextInput
                                    label="Instagram"
                                    value={data.instagram_url}
                                    onChange={(value) =>
                                        setData('instagram_url', value)
                                    }
                                    error={fieldError(errors, 'instagram_url')}
                                    placeholder="https://instagram.com/..."
                                />
                                <TextInput
                                    label="Facebook"
                                    value={data.facebook_url}
                                    onChange={(value) =>
                                        setData('facebook_url', value)
                                    }
                                    error={fieldError(errors, 'facebook_url')}
                                    placeholder="https://facebook.com/..."
                                />
                                <TextInput
                                    label="Twitter/X"
                                    value={data.twitter_url}
                                    onChange={(value) =>
                                        setData('twitter_url', value)
                                    }
                                    error={fieldError(errors, 'twitter_url')}
                                    placeholder="https://x.com/..."
                                />
                                <TextInput
                                    label="Website Marketing"
                                    value={data.marketing_website_url}
                                    onChange={(value) =>
                                        setData('marketing_website_url', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'marketing_website_url',
                                    )}
                                    placeholder="https://contoh.com"
                                />
                                <TextInput
                                    label="Profil E-commerce"
                                    value={data.ecommerce_profile_url}
                                    onChange={(value) =>
                                        setData('ecommerce_profile_url', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'ecommerce_profile_url',
                                    )}
                                    placeholder="https://marketplace.com/toko"
                                />
                                <TextInput
                                    label="Peserta UMKM"
                                    value={data.is_umkm_participant}
                                    onChange={(value) =>
                                        setData('is_umkm_participant', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'is_umkm_participant',
                                    )}
                                    placeholder="Status peserta"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <TextArea
                                    label="Catatan Marketing"
                                    value={data.marketing_notes}
                                    onChange={(value) =>
                                        setData('marketing_notes', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'marketing_notes',
                                    )}
                                    placeholder="Catatan pemasaran"
                                />
                                <TextArea
                                    label="Catatan Keberlanjutan"
                                    value={data.sustainability_notes}
                                    onChange={(value) =>
                                        setData('sustainability_notes', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'sustainability_notes',
                                    )}
                                    placeholder="Catatan sustainability"
                                />
                            </div>
                        </EditSection>

                        <EditSection title="Banking dan Ekspor">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <TextInput
                                    label="Nama Bank"
                                    value={data.bank_name}
                                    onChange={(value) =>
                                        setData('bank_name', value)
                                    }
                                    error={fieldError(errors, 'bank_name')}
                                    placeholder="BCA, BRI, Mandiri"
                                />
                                <TextInput
                                    label="Nomor Rekening"
                                    value={data.bank_account_number}
                                    onChange={(value) =>
                                        setData('bank_account_number', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'bank_account_number',
                                    )}
                                    placeholder="Nomor rekening"
                                />
                                <SelectInput
                                    label="Memiliki QRIS"
                                    value={data.has_qris}
                                    onChange={(value) =>
                                        setData('has_qris', value)
                                    }
                                    options={booleanOptions}
                                    error={fieldError(errors, 'has_qris')}
                                />
                                <TextInput
                                    label="Provider QRIS"
                                    value={data.qris_provider}
                                    onChange={(value) =>
                                        setData('qris_provider', value)
                                    }
                                    error={fieldError(errors, 'qris_provider')}
                                    placeholder="Provider QRIS"
                                />
                                <SelectInput
                                    label="Memiliki EDC"
                                    value={data.has_edc}
                                    onChange={(value) =>
                                        setData('has_edc', value)
                                    }
                                    options={booleanOptions}
                                    error={fieldError(errors, 'has_edc')}
                                />
                                <TextInput
                                    label="Provider EDC"
                                    value={data.edc_provider}
                                    onChange={(value) =>
                                        setData('edc_provider', value)
                                    }
                                    error={fieldError(errors, 'edc_provider')}
                                    placeholder="Provider EDC"
                                />
                                <SelectInput
                                    label="Kartu Kredit"
                                    value={data.has_credit_card}
                                    onChange={(value) =>
                                        setData('has_credit_card', value)
                                    }
                                    options={booleanOptions}
                                    error={fieldError(
                                        errors,
                                        'has_credit_card',
                                    )}
                                />
                                <SelectInput
                                    label="Pernah Ekspor"
                                    value={data.has_exported}
                                    onChange={(value) =>
                                        setData('has_exported', value)
                                    }
                                    options={booleanOptions}
                                    error={fieldError(errors, 'has_exported')}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <TextArea
                                    label="Catatan Banking"
                                    value={data.banking_notes}
                                    onChange={(value) =>
                                        setData('banking_notes', value)
                                    }
                                    error={fieldError(errors, 'banking_notes')}
                                    placeholder="Catatan pembayaran dan perbankan"
                                />
                                <TextArea
                                    label="Negara Tujuan Ekspor"
                                    value={data.export_destination_countries}
                                    onChange={(value) =>
                                        setData(
                                            'export_destination_countries',
                                            value,
                                        )
                                    }
                                    error={fieldError(
                                        errors,
                                        'export_destination_countries',
                                    )}
                                    placeholder="Jika ya, sebutkan negaranya"
                                />
                            </div>
                        </EditSection>

                        <EditSection
                            icon={<Banknote size={16} />}
                            title="Omset Tahunan"
                            description="Tabel annual_turnovers."
                        >
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateArrayField(
                                            'annual_turnovers',
                                            (rows) => [
                                                ...rows,
                                                emptyAnnualTurnover(),
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
                                    fieldError(errors, 'annual_turnovers') as
                                        | string
                                        | undefined
                                }
                            />
                            <div className="mt-4 space-y-3">
                                {data.annual_turnovers.length === 0 && (
                                    <p className="rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]">
                                        Belum ada data omset tahunan.
                                    </p>
                                )}
                                {data.annual_turnovers.map((row, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-[#EFEFEF] bg-white p-3"
                                        >
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                <TextInput
                                                    label="Tahun"
                                                    value={row.year}
                                                    onChange={(value) =>
                                                        updateArrayField(
                                                            'annual_turnovers',
                                                            (rows) =>
                                                                rows.map(
                                                                    (r, i) =>
                                                                        i ===
                                                                        index
                                                                            ? {
                                                                                  ...r,
                                                                                  year: value,
                                                                              }
                                                                            : r,
                                                                ),
                                                        )
                                                    }
                                                    error={
                                                        fieldError(
                                                            errors,
                                                            `annual_turnovers.${index}.year` as any,
                                                        ) as string | undefined
                                                    }
                                                    type="number"
                                                />
                                                <TextInput
                                                    label="Nilai Omset (Rp)"
                                                    value={formatThousands(
                                                        row.value,
                                                    )}
                                                    onChange={(value) =>
                                                        updateArrayField(
                                                            'annual_turnovers',
                                                            (rows) =>
                                                                rows.map(
                                                                    (r, i) =>
                                                                        i ===
                                                                        index
                                                                            ? {
                                                                                  ...r,
                                                                                  value: digitsOnly(
                                                                                      value,
                                                                                  ),
                                                                              }
                                                                            : r,
                                                                ),
                                                        )
                                                    }
                                                    error={
                                                        fieldError(
                                                            errors,
                                                            `annual_turnovers.${index}.value` as any,
                                                        ) as string | undefined
                                                    }
                                                />
                                                <div className="sm:col-span-2">
                                                    <TextInput
                                                        label="Catatan"
                                                        value={row.notes}
                                                        onChange={(value) =>
                                                            updateArrayField(
                                                                'annual_turnovers',
                                                                (rows) =>
                                                                    rows.map(
                                                                        (
                                                                            r,
                                                                            i,
                                                                        ) =>
                                                                            i ===
                                                                            index
                                                                                ? {
                                                                                      ...r,
                                                                                      notes: value,
                                                                                  }
                                                                                : r,
                                                                    ),
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-3 flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateArrayField(
                                                            'annual_turnovers',
                                                            (rows) =>
                                                                rows.filter(
                                                                    (_, i) =>
                                                                        i !==
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
                                })}
                            </div>
                        </EditSection>

                        <EditSection
                            icon={<UserRound size={16} />}
                            title="Statistik Tenaga Kerja"
                            description="Tabel annual_worker_stats."
                        >
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateArrayField(
                                            'annual_worker_stats',
                                            (rows) => [
                                                ...rows,
                                                emptyAnnualWorkerStat(),
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
                                    fieldError(
                                        errors,
                                        'annual_worker_stats',
                                    ) as string | undefined
                                }
                            />
                            <div className="mt-4 space-y-3">
                                {data.annual_worker_stats.length === 0 && (
                                    <p className="rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]">
                                        Belum ada data tenaga kerja.
                                    </p>
                                )}
                                {data.annual_worker_stats.map((row, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-[#EFEFEF] bg-white p-3"
                                        >
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                <TextInput
                                                    label="Tahun"
                                                    value={row.year}
                                                    onChange={(value) =>
                                                        updateArrayField(
                                                            'annual_worker_stats',
                                                            (rows) =>
                                                                rows.map(
                                                                    (r, i) =>
                                                                        i ===
                                                                        index
                                                                            ? {
                                                                                  ...r,
                                                                                  year: value,
                                                                              }
                                                                            : r,
                                                                ),
                                                        )
                                                    }
                                                    error={
                                                        fieldError(
                                                            errors,
                                                            `annual_worker_stats.${index}.year` as any,
                                                        ) as string | undefined
                                                    }
                                                    type="number"
                                                />
                                                <SelectInput
                                                    label="Dimensi"
                                                    value={row.dimension}
                                                    onChange={(value) =>
                                                        updateArrayField(
                                                            'annual_worker_stats',
                                                            (rows) =>
                                                                rows.map(
                                                                    (r, i) =>
                                                                        i ===
                                                                        index
                                                                            ? {
                                                                                  ...r,
                                                                                  dimension:
                                                                                      value,
                                                                              }
                                                                            : r,
                                                                ),
                                                        )
                                                    }
                                                    options={[
                                                        {
                                                            value: 'age',
                                                            label: 'Usia',
                                                        },
                                                        {
                                                            value: 'gender',
                                                            label: 'Gender',
                                                        },
                                                        {
                                                            value: 'education',
                                                            label: 'Pendidikan',
                                                        },
                                                    ]}
                                                    error={
                                                        fieldError(
                                                            errors,
                                                            `annual_worker_stats.${index}.dimension` as any,
                                                        ) as string | undefined
                                                    }
                                                />
                                                <TextInput
                                                    label="Kategori / Rentang"
                                                    value={row.category_value}
                                                    onChange={(value) =>
                                                        updateArrayField(
                                                            'annual_worker_stats',
                                                            (rows) =>
                                                                rows.map(
                                                                    (r, i) =>
                                                                        i ===
                                                                        index
                                                                            ? {
                                                                                  ...r,
                                                                                  category_value:
                                                                                      value,
                                                                              }
                                                                            : r,
                                                                ),
                                                        )
                                                    }
                                                    error={
                                                        fieldError(
                                                            errors,
                                                            `annual_worker_stats.${index}.category_value` as any,
                                                        ) as string | undefined
                                                    }
                                                />
                                                <TextInput
                                                    label="Jumlah Orang"
                                                    value={row.total_people}
                                                    onChange={(value) =>
                                                        updateArrayField(
                                                            'annual_worker_stats',
                                                            (rows) =>
                                                                rows.map(
                                                                    (r, i) =>
                                                                        i ===
                                                                        index
                                                                            ? {
                                                                                  ...r,
                                                                                  total_people:
                                                                                      value,
                                                                              }
                                                                            : r,
                                                                ),
                                                        )
                                                    }
                                                    error={
                                                        fieldError(
                                                            errors,
                                                            `annual_worker_stats.${index}.total_people` as any,
                                                        ) as string | undefined
                                                    }
                                                    type="number"
                                                />
                                                <div className="sm:col-span-2">
                                                    <TextInput
                                                        label="Catatan"
                                                        value={row.notes}
                                                        onChange={(value) =>
                                                            updateArrayField(
                                                                'annual_worker_stats',
                                                                (rows) =>
                                                                    rows.map(
                                                                        (
                                                                            r,
                                                                            i,
                                                                        ) =>
                                                                            i ===
                                                                            index
                                                                                ? {
                                                                                      ...r,
                                                                                      notes: value,
                                                                                  }
                                                                                : r,
                                                                    ),
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-3 flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateArrayField(
                                                            'annual_worker_stats',
                                                            (rows) =>
                                                                rows.filter(
                                                                    (_, i) =>
                                                                        i !==
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
                                })}
                            </div>
                        </EditSection>

                        <EditSection
                            icon={<CheckCircle2 size={16} />}
                            title="Pelatihan Pekerja"
                            description="Tabel annual_worker_training_stats."
                        >
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateArrayField(
                                            'annual_worker_training_stats',
                                            (rows) => [
                                                ...rows,
                                                emptyAnnualWorkerTrainingStat(),
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
                                    fieldError(
                                        errors,
                                        'annual_worker_training_stats',
                                    ) as string | undefined
                                }
                            />
                            <div className="mt-4 space-y-3">
                                {data.annual_worker_training_stats.length ===
                                    0 && (
                                    <p className="rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]">
                                        Belum ada data pelatihan.
                                    </p>
                                )}
                                {data.annual_worker_training_stats.map(
                                    (row, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="rounded-xl border border-[#EFEFEF] bg-white p-3"
                                            >
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    <TextInput
                                                        label="Tahun"
                                                        value={row.year}
                                                        onChange={(value) =>
                                                            updateArrayField(
                                                                'annual_worker_training_stats',
                                                                (rows) =>
                                                                    rows.map(
                                                                        (
                                                                            r,
                                                                            i,
                                                                        ) =>
                                                                            i ===
                                                                            index
                                                                                ? {
                                                                                      ...r,
                                                                                      year: value,
                                                                                  }
                                                                                : r,
                                                                    ),
                                                            )
                                                        }
                                                        error={
                                                            fieldError(
                                                                errors,
                                                                `annual_worker_training_stats.${index}.year` as any,
                                                            ) as
                                                                | string
                                                                | undefined
                                                        }
                                                        type="number"
                                                    />
                                                    <TextInput
                                                        label="Nama Pelatihan"
                                                        value={
                                                            row.training_name
                                                        }
                                                        onChange={(value) =>
                                                            updateArrayField(
                                                                'annual_worker_training_stats',
                                                                (rows) =>
                                                                    rows.map(
                                                                        (
                                                                            r,
                                                                            i,
                                                                        ) =>
                                                                            i ===
                                                                            index
                                                                                ? {
                                                                                      ...r,
                                                                                      training_name:
                                                                                          value,
                                                                                  }
                                                                                : r,
                                                                    ),
                                                            )
                                                        }
                                                        error={
                                                            fieldError(
                                                                errors,
                                                                `annual_worker_training_stats.${index}.training_name` as any,
                                                            ) as
                                                                | string
                                                                | undefined
                                                        }
                                                    />
                                                    <TextInput
                                                        label="Jumlah Peserta"
                                                        value={row.total_people}
                                                        onChange={(value) =>
                                                            updateArrayField(
                                                                'annual_worker_training_stats',
                                                                (rows) =>
                                                                    rows.map(
                                                                        (
                                                                            r,
                                                                            i,
                                                                        ) =>
                                                                            i ===
                                                                            index
                                                                                ? {
                                                                                      ...r,
                                                                                      total_people:
                                                                                          value,
                                                                                  }
                                                                                : r,
                                                                    ),
                                                            )
                                                        }
                                                        error={
                                                            fieldError(
                                                                errors,
                                                                `annual_worker_training_stats.${index}.total_people` as any,
                                                            ) as
                                                                | string
                                                                | undefined
                                                        }
                                                        type="number"
                                                    />
                                                    <div className="sm:col-span-2">
                                                        <TextInput
                                                            label="Catatan"
                                                            value={row.notes}
                                                            onChange={(value) =>
                                                                updateArrayField(
                                                                    'annual_worker_training_stats',
                                                                    (rows) =>
                                                                        rows.map(
                                                                            (
                                                                                r,
                                                                                i,
                                                                            ) =>
                                                                                i ===
                                                                                index
                                                                                    ? {
                                                                                          ...r,
                                                                                          notes: value,
                                                                                      }
                                                                                    : r,
                                                                        ),
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateArrayField(
                                                                'annual_worker_training_stats',
                                                                (rows) =>
                                                                    rows.filter(
                                                                        (
                                                                            _,
                                                                            i,
                                                                        ) =>
                                                                            i !==
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
                        </EditSection>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-[#E2E8F0] bg-white px-5 py-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:opacity-60"
                        >
                            <Save size={16} />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </aside>
        </>
    );
}

export default function ShowUmkm({
    assignment,
    umkm,
    survey_summary,
    survey_groups,
    edit_values,
}: ShowUmkmProps) {
    const { auth } = usePage().props;
    const isViewer = auth.user?.role === 'viewer';
    const [search, setSearch] = useState('');
    const [groupFilter, setGroupFilter] = useState('all');
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(
            survey_groups.map((group) => [group.criteria_code, true]),
        ),
    );
    const [detailAnswer, setDetailAnswer] = useState<UmkmSurveyAnswer | null>(
        null,
    );
    const [editAnswer, setEditAnswer] = useState<UmkmSurveyAnswer | null>(null);
    const [editDocument, setEditDocument] = useState<UmkmDocument | null>(null);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const editForm = useForm<UmkmEditForm>(initialEditForm(edit_values));
    const answerEditForm = useForm<UmkmAnswerEditForm>({ score: '' });
    const documentForm = useForm<UmkmDocumentForm>({
        document_name: '',
        file: null,
    });
    const documentDeleteForm = useForm({});

    const photoPreview = useMemo(() => {
        if (editForm.data.product_photo) {
            return URL.createObjectURL(editForm.data.product_photo);
        }

        return umkm.product_photo_url;
    }, [editForm.data.product_photo, umkm.product_photo_url]);

    function closeEditSidebar() {
        setIsEditOpen(false);
        editForm.clearErrors();
    }

    function submitEdit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        editForm.post(
            updateUmkm.url({ assignment: assignment.code, umkm: umkm.id }),
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: closeEditSidebar,
            },
        );
    }

    function openAnswerEdit(answer: UmkmSurveyAnswer) {
        setEditAnswer(answer);
        answerEditForm.clearErrors();
        answerEditForm.setData('score', String(answer.score));
    }

    function closeAnswerEdit() {
        setEditAnswer(null);
        answerEditForm.clearErrors();
    }

    function submitAnswerEdit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!editAnswer) {
            return;
        }

        answerEditForm.patch(
            updateUmkmAnswer.url({
                assignment: assignment.code,
                umkm: umkm.id,
                answer: editAnswer.id,
            }),
            {
                preserveScroll: true,
                onSuccess: closeAnswerEdit,
            },
        );
    }

    function openCreateDocument() {
        setEditDocument(null);
        documentForm.clearErrors();
        documentForm.setData({ document_name: '', file: null });
        setIsDocumentModalOpen(true);
    }

    function openEditDocument(document: UmkmDocument) {
        setEditDocument(document);
        documentForm.clearErrors();
        documentForm.setData({
            _method: 'patch',
            document_name: document.document_name,
            file: null,
        });
        setIsDocumentModalOpen(true);
    }

    function closeDocumentModal() {
        setIsDocumentModalOpen(false);
        setEditDocument(null);
        documentForm.clearErrors();
        documentForm.setData({ document_name: '', file: null });
    }

    function submitDocument(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (editDocument) {
            documentForm.post(
                updateUmkmDocument.url({
                    assignment: assignment.code,
                    umkm: umkm.id,
                    document: editDocument.id,
                }),
                {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: closeDocumentModal,
                },
            );

            return;
        }

        documentForm.post(
            storeUmkmDocument.url({
                assignment: assignment.code,
                umkm: umkm.id,
            }),
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: closeDocumentModal,
            },
        );
    }

    function deleteDocument(document: UmkmDocument) {
        if (!window.confirm('Hapus dokumen pendukung ini?')) {
            return;
        }

        documentDeleteForm.delete(
            destroyUmkmDocument.url({
                assignment: assignment.code,
                umkm: umkm.id,
                document: document.id,
            }),
            { preserveScroll: true },
        );
    }

    const filteredGroups = useMemo(
        () =>
            survey_groups
                .filter(
                    (group) =>
                        groupFilter === 'all' ||
                        group.criteria_code === groupFilter,
                )
                .map((group) => ({
                    ...group,
                    answers: group.answers.filter((answer) => {
                        const keyword = search.toLowerCase();

                        return (
                            keyword === '' ||
                            group.criteria_code
                                .toLowerCase()
                                .includes(keyword) ||
                            group.criteria_name
                                .toLowerCase()
                                .includes(keyword) ||
                            answer.question_text.toLowerCase().includes(keyword)
                        );
                    }),
                }))
                .filter((group) => group.answers.length > 0),
        [groupFilter, search, survey_groups],
    );

    const groupStartNumbers = useMemo(
        () =>
            filteredGroups.reduce<{
                positions: Record<string, number>;
                total: number;
            }>(
                (state, group) => ({
                    positions: {
                        ...state.positions,
                        [group.criteria_code]: state.total,
                    },
                    total: state.total + group.answers.length,
                }),
                { positions: {}, total: 0 },
            ).positions,
        [filteredGroups],
    );

    return (
        <>
            <Head title={`Detail UMKM - ${umkm.name}`} />

            <main className="min-h-screen bg-[#F7F7F7] p-4 text-[#303030] sm:p-6">
                <div className="mx-auto max-w-[1280px] space-y-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                                <Link
                                    href={dashboard.url()}
                                    className="text-[#0066AE]"
                                >
                                    Dashboard
                                </Link>
                                <span className="text-[#B0B0B0]">/</span>
                                <Link
                                    href={surveyAssignments.url()}
                                    className="text-[#0066AE]"
                                >
                                    Survey Assignment
                                </Link>
                                <span className="text-[#B0B0B0]">/</span>
                                <Link
                                    href={showAssignment.url(assignment.code)}
                                    className="text-[#0066AE]"
                                >
                                    Detail Assignment
                                </Link>
                                <span className="text-[#B0B0B0]">/</span>
                                <span className="text-[#7C7C7C]">UMKM</span>
                            </div>
                            <h1 className="mt-2 text-2xl leading-tight font-bold text-[#303030] sm:text-[28px]">
                                Detail UMKM
                            </h1>
                            <p className="mt-1 max-w-3xl text-sm leading-6 font-semibold text-[#7C7C7C]">
                                Master UMKM dan tabel jawaban assessment skala
                                0-100.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <a
                                href={exportUmkm.url({
                                    assignment: assignment.code,
                                    umkm: umkm.id,
                                })}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]"
                            >
                                <Download size={16} />
                                Export Excel
                            </a>
                            {!isViewer && (
                                <button
                                    type="button"
                                    onClick={() => setIsEditOpen(true)}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967]"
                                >
                                    <Pencil size={16} />
                                    Edit Data UMKM
                                </button>
                            )}
                            <Link href={showAssignment.url(assignment.code)}>
                                <span className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]">
                                    <ArrowLeft size={16} />
                                    Kembali
                                </span>
                            </Link>
                        </div>
                    </div>

                    <Card className="overflow-hidden">
                        <div className="grid gap-5 p-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:p-5">
                            {umkm.product_photo_url ? (
                                <img
                                    src={umkm.product_photo_url}
                                    alt={umkm.name}
                                    className="h-52 w-full rounded-xl object-cover lg:h-full"
                                />
                            ) : (
                                <div className="flex h-52 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0066AE]">
                                    <ImageIcon size={36} />
                                </div>
                            )}
                            <div className="min-w-0 space-y-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-[#0066AE]">
                                            {assignment.village.name} ·{' '}
                                            {assignment.village.location}
                                        </p>
                                        <h2 className="mt-1 text-xl font-bold text-[#303030]">
                                            {umkm.name}
                                        </h2>
                                        <p className="mt-1 text-sm font-semibold text-[#7C7C7C]">
                                            {umkm.business_owner_name ?? '-'}
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {umkm.categories.length > 0 ? (
                                                umkm.categories.map(
                                                    (category) => (
                                                        <span
                                                            key={category.value}
                                                            className="inline-flex rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[11px] font-bold text-[#0066AE]"
                                                        >
                                                            {category.label}
                                                        </span>
                                                    ),
                                                )
                                            ) : (
                                                <span className="inline-flex rounded-full bg-[#F1F5F8] px-2.5 py-1 text-[11px] font-bold text-[#7C7C7C]">
                                                    {umkm.product_category ??
                                                        '-'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <span className="inline-flex rounded-full bg-[#EAF8F0] px-3 py-1.5 text-xs font-bold text-[#00893D]">
                                        Master UMKM
                                    </span>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                    <DetailPair
                                        label="Brand"
                                        value={umkm.brand_name}
                                    />
                                    <DetailPair
                                        label="Badan Usaha"
                                        value={umkm.legal_business_name}
                                    />
                                    <DetailPair
                                        label="Tahun Berdiri"
                                        value={umkm.established_year ?? '-'}
                                    />
                                    <DetailPair
                                        label="Omzet"
                                        value={umkm.annual_revenue}
                                    />
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                    <DetailPair
                                        label="QRIS"
                                        value={umkm.has_qris}
                                    />
                                    <DetailPair
                                        label="EDC"
                                        value={umkm.has_edc}
                                    />
                                    <DetailPair
                                        label="Kartu Kredit"
                                        value={umkm.has_credit_card}
                                    />
                                    <DetailPair
                                        label="Ekspor"
                                        value={umkm.has_exported}
                                    />
                                </div>
                                <DetailPair
                                    label="Alamat Produksi"
                                    value={
                                        umkm.production_address ??
                                        assignment.village.address
                                    }
                                />
                            </div>
                        </div>
                    </Card>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <MetricCard
                            label="Jawaban"
                            value={String(survey_summary.answered_questions)}
                            helper="Total assessment"
                            icon={<CheckCircle2 size={18} />}
                            compact
                        />
                        <MetricCard
                            label="Rata-rata"
                            value={String(survey_summary.average_score)}
                            helper="/ 100"
                            icon={<Star size={18} />}
                            compact
                        />
                        <MetricCard
                            label="Weighted Score"
                            value={String(survey_summary.weighted_score)}
                            helper="/ 100"
                            icon={<BadgeDollarSign size={18} />}
                            compact
                        />
                        <MetricCard
                            label="Update Survey"
                            value={survey_summary.last_answered_at}
                            helper="Terakhir diedit"
                            icon={<CalendarDays size={18} />}
                            compact
                        />
                    </div>

                    <UmkmAnnualCharts values={edit_values} />

                    <UmkmSurveyStatistics groups={survey_groups} />

                    <div className="grid gap-4 xl:grid-cols-4">
                        <Card className="p-4 xl:col-span-2">
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="flex items-center gap-2 text-sm font-bold text-[#303030]">
                                    <FileText
                                        size={16}
                                        className="text-[#0066AE]"
                                    />
                                    Dokumen Pendukung
                                </h2>
                                {!isViewer && (
                                    <button
                                        type="button"
                                        onClick={openCreateDocument}
                                        className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-[#0066AE] px-2.5 text-xs font-bold text-white transition hover:bg-[#093967]"
                                    >
                                        <Plus size={14} />
                                        Tambah
                                    </button>
                                )}
                            </div>

                            <div className="mt-4 space-y-3">
                                {umkm.documents.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] px-3 py-5 text-center">
                                        <FileText className="mx-auto size-7 text-[#0066AE]" />
                                        <p className="mt-2 text-sm font-bold text-[#303030]">
                                            Belum ada dokumen
                                        </p>
                                        <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                            Tambahkan dokumen pendukung UMKM.
                                        </p>
                                    </div>
                                )}

                                {umkm.documents.map((document) => (
                                    <div
                                        key={document.id}
                                        className="rounded-xl border border-[#E6EDF4] bg-[#F8FBFE] p-3"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#0066AE] ring-1 ring-[#DDE8F2]">
                                                <FileText size={16} />
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-bold text-[#303030]">
                                                    {document.document_name}
                                                </p>
                                                <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                                    {document.file_size_label} ·{' '}
                                                    {document.uploaded_by.name}
                                                </p>
                                                <p className="mt-1 text-[11px] font-semibold text-[#9AA7B5]">
                                                    {document.created_at}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-3 grid grid-cols-3 gap-2">
                                            <a
                                                href={document.file_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#DDE4EC] bg-white px-2 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                                            >
                                                <Download size={13} />
                                                Lihat
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openEditDocument(document)
                                                }
                                                className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#DDE4EC] bg-white px-2 text-xs font-bold text-[#303030] transition hover:bg-[#F1F5F8]"
                                            >
                                                <Pencil size={13} />
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteDocument(document)
                                                }
                                                disabled={
                                                    documentDeleteForm.processing
                                                }
                                                className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#F2C7C7] bg-white px-2 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6] disabled:opacity-60"
                                            >
                                                <Trash2 size={13} />
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-4">
                            <h2 className="flex items-center gap-2 text-sm font-bold text-[#303030]">
                                <Store size={16} className="text-[#0066AE]" />
                                Data Ringkas
                            </h2>
                            <div className="mt-4 space-y-3">
                                <DetailPair
                                    label="Collector"
                                    value={umkm.collector.name}
                                />
                                <DetailPair
                                    label="Dibuat Oleh"
                                    value={umkm.creator.name}
                                />
                                <DetailPair
                                    label="Kapasitas Bulanan"
                                    value={umkm.monthly_production_capacity}
                                />
                                <DetailPair
                                    label="Sertifikasi"
                                    value={umkm.certifications}
                                />
                            </div>
                        </Card>

                        <Card className="p-4">
                            <h2 className="flex items-center gap-2 text-sm font-bold text-[#303030]">
                                <MapPin size={16} className="text-[#0066AE]" />
                                Marketing dan Bank
                            </h2>
                            <div className="mt-4 space-y-3">
                                <DetailPair
                                    label="Website"
                                    value={umkm.company_website_url}
                                />
                                <DetailPair
                                    label="E-commerce"
                                    value={umkm.ecommerce_profile_url}
                                />
                                <DetailPair
                                    label="Bank"
                                    value={umkm.bank_name}
                                />
                                <DetailPair
                                    label="Provider QRIS"
                                    value={umkm.qris_provider}
                                />
                            </div>
                        </Card>

                        <Card className="p-4 xl:col-span-4">
                            <h2 className="flex items-center gap-2 text-sm font-bold text-[#303030]">
                                <UserRound
                                    size={16}
                                    className="text-[#0066AE]"
                                />
                                Catatan
                            </h2>
                            <div className="mt-4 grid gap-3 md:grid-cols-3">
                                <DetailPair
                                    label="Kendala"
                                    value={umkm.current_obstacles}
                                />
                                <DetailPair
                                    label="Marketing"
                                    value={umkm.marketing_notes}
                                />
                                <DetailPair
                                    label="Keberlanjutan"
                                    value={umkm.sustainability_notes}
                                />
                            </div>
                        </Card>
                    </div>

                    <Card className="overflow-hidden">
                        <div className="flex flex-col gap-3 border-b border-[#EFEFEF] p-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-base font-bold text-[#303030]">
                                    Jawaban Survey UMKM
                                </h2>
                                <p className="mt-1 text-sm font-semibold text-[#7C7C7C]">
                                    Tabel jawaban dikelompokkan berdasarkan
                                    kriteria assessment.
                                </p>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-[minmax(180px,1fr)_180px_auto]">
                                <label className="relative min-w-0">
                                    <Search
                                        size={16}
                                        className="absolute top-1/2 left-3 -translate-y-1/2 text-[#7C7C7C]"
                                    />
                                    <input
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Cari pertanyaan..."
                                        className="h-10 w-full rounded-lg border border-[#DDE4EC] bg-white pr-3 pl-9 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                                    />
                                </label>
                                <select
                                    value={groupFilter}
                                    onChange={(event) =>
                                        setGroupFilter(event.target.value)
                                    }
                                    className="h-10 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                                >
                                    <option value="all">Semua kriteria</option>
                                    {survey_groups.map((group) => (
                                        <option
                                            key={group.criteria_code}
                                            value={group.criteria_code}
                                        >
                                            {criteriaLabel(
                                                group.criteria_code,
                                                group.criteria_name,
                                            )}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        setGroupFilter('all');
                                    }}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]"
                                >
                                    <RefreshCcw size={15} />
                                    Reset
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="min-w-[780px]">
                                {filteredGroups.map((group) => {
                                    const isOpen =
                                        openGroups[group.criteria_code] ?? true;

                                    return (
                                        <section key={group.criteria_code}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenGroups(
                                                        (current) => ({
                                                            ...current,
                                                            [group.criteria_code]:
                                                                !isOpen,
                                                        }),
                                                    )
                                                }
                                                className="flex w-full items-center justify-between gap-3 border-b border-[#DDE9F6] bg-[#F8FBFE] px-4 py-3 text-left transition hover:bg-[#F1F7FD]"
                                            >
                                                <div>
                                                    <h3 className="text-sm font-bold text-[#303030]">
                                                        {criteriaLabel(
                                                            group.criteria_code,
                                                            group.criteria_name,
                                                        )}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <p className="text-xs font-bold text-[#7C7C7C]">
                                                        {
                                                            group.answered_questions
                                                        }{' '}
                                                        jawaban · Pembobotan:{' '}
                                                        {group.weighted_score}
                                                    </p>
                                                    <span className="flex size-8 items-center justify-center rounded-full border border-[#D6E4F2] bg-white text-[#0066AE]">
                                                        <ChevronDown
                                                            size={16}
                                                            className={classNames(
                                                                'transition-transform duration-200',
                                                                isOpen &&
                                                                    'rotate-180',
                                                            )}
                                                        />
                                                    </span>
                                                </div>
                                            </button>
                                            {isOpen &&
                                                group.answers.map(
                                                    (answer, index) => (
                                                        <QuestionRow
                                                            key={answer.id}
                                                            answer={answer}
                                                            number={
                                                                (groupStartNumbers[
                                                                    group
                                                                        .criteria_code
                                                                ] ?? 0) +
                                                                index +
                                                                1
                                                            }
                                                            onViewDetail={
                                                                setDetailAnswer
                                                            }
                                                            onEditAnswer={
                                                                openAnswerEdit
                                                            }
                                                            isViewer={isViewer}
                                                        />
                                                    ),
                                                )}
                                        </section>
                                    );
                                })}
                                {filteredGroups.length === 0 && (
                                    <div className="px-4 py-10 text-center text-sm font-semibold text-[#7C7C7C]">
                                        Tidak ada jawaban sesuai filter.
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </main>

            <AnswerDetailModal
                answer={detailAnswer}
                open={Boolean(detailAnswer)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDetailAnswer(null);
                    }
                }}
            />
            <AnswerEditModal
                answer={editAnswer}
                open={Boolean(editAnswer)}
                form={answerEditForm}
                onSubmit={submitAnswerEdit}
                onOpenChange={(open) => {
                    if (!open) {
                        closeAnswerEdit();
                    }
                }}
            />
            <DocumentModal
                document={editDocument}
                open={isDocumentModalOpen}
                form={documentForm}
                onSubmit={submitDocument}
                onOpenChange={(open) => {
                    if (!open) {
                        closeDocumentModal();
                    } else {
                        setIsDocumentModalOpen(true);
                    }
                }}
            />
            <UmkmEditSidebar
                open={isEditOpen}
                onClose={closeEditSidebar}
                assignment={assignment}
                umkm={umkm}
                form={editForm}
                photoPreview={photoPreview}
                onSubmit={submitEdit}
            />
        </>
    );
}

ShowUmkm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Survey Assignment', href: surveyAssignments() },
        { title: 'Detail UMKM', href: '#' },
    ],
};
