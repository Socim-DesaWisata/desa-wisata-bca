import { Head, Link, useForm } from '@inertiajs/react';
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
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';

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
    summary: {
        total_questions: number;
        answered_questions: number;
        unanswered_questions: number;
        total_documents: number;
        total_score: number;
        max_score: number;
        final_score: number;
        highest_aspect: { name: string; score_percent: number } | null;
        lowest_aspect: { name: string; score_percent: number } | null;
    };
    aspects: SurveyAspect[];
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
}: {
    label: string;
    value: string;
    helper: string;
    icon: React.ReactNode;
    tone?: 'blue' | 'green' | 'orange';
}) {
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

type ScoreBucket = {
    key: string;
    label: string;
    min: number;
    max: number;
    color: string;
    textColor: string;
};

const aspectScoreBuckets: ScoreBucket[] = [
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

const answerScoreBuckets: ScoreBucket[] = [
    {
        key: '1',
        label: 'Skor 1',
        min: 1,
        max: 1,
        color: '#EF4444',
        textColor: 'text-[#EF4444]',
    },
    {
        key: '2',
        label: 'Skor 2',
        min: 2,
        max: 2,
        color: '#F97316',
        textColor: 'text-[#F97316]',
    },
    {
        key: '3',
        label: 'Skor 3',
        min: 3,
        max: 3,
        color: '#FACC15',
        textColor: 'text-[#CA8A04]',
    },
    {
        key: '4',
        label: 'Skor 4',
        min: 4,
        max: 4,
        color: '#22C55E',
        textColor: 'text-[#16A34A]',
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

function scoreBucketFor(value: number) {
    const rounded = Math.round(clampScore(value));

    return (
        aspectScoreBuckets.find(
            (bucket) => rounded >= bucket.min && rounded <= bucket.max,
        ) ?? aspectScoreBuckets[0]
    );
}

function formatStatScore(value: number) {
    return clampScore(value).toLocaleString('id-ID', {
        maximumFractionDigits: 1,
    });
}

function ScoreBar({ aspect }: { aspect: ScoreAspectSummary }) {
    const bucket = scoreBucketFor(aspect.score_percent);

    return (
        <div className="grid gap-2 md:grid-cols-[180px_minmax(0,1fr)_52px] md:items-center">
            <p className="truncate text-xs font-bold text-[#344256]">
                {aspect.name}
            </p>
            <div className="relative h-7 overflow-hidden rounded-full bg-[#EEF3F8]">
                <div className="absolute inset-y-0 left-0 w-1/5 border-r border-white/90" />
                <div className="absolute inset-y-0 left-[40%] w-px bg-white/90" />
                <div className="absolute inset-y-0 left-[60%] w-px bg-white/90" />
                <div className="absolute inset-y-0 left-[80%] w-px bg-white/90" />
                <div
                    className="h-full rounded-full transition-[width]"
                    style={{
                        width: `${clampScore(aspect.score_percent)}%`,
                        backgroundColor: bucket.color,
                    }}
                />
            </div>
            <p className="text-right text-xs font-black text-[#303030]">
                {formatStatScore(aspect.score_percent)}
            </p>
        </div>
    );
}

function SurveyStatistics({ aspects }: { aspects: SurveyAspect[] }) {
    const answers = aspects.flatMap((aspect) =>
        aspect.questions.map((q) => q.answer).filter(Boolean),
    );
    const totalAnswers = answers.length;
    const distribution = answerScoreBuckets.map((bucket) => {
        const count = answers.filter((answer) => {
            const score = answer ? Math.round(answer.score) : 0;
            return score === bucket.min;
        }).length;

        return {
            ...bucket,
            count,
            percentage: totalAnswers > 0 ? (count / totalAnswers) * 100 : 0,
        };
    });

    return (
        <StatisticsChartCard
            aspects={aspects.map((aspect) => ({
                name: aspect.name,
                score_percent: aspect.score_percent,
            }))}
            distribution={distribution.map((bucket) => ({
                ...bucket,
                score: bucket.min,
            }))}
        />
    );
}

function StatisticsChartCard({
    aspects,
    distribution,
}: {
    aspects: ScoreAspectSummary[];
    distribution: Array<ScoreDistributionSummary & {
        key: string;
        label: string;
        color: string;
        textColor: string;
        percentage?: number;
    }>;
}) {
    const totalAnswers = distribution.reduce(
        (total, bucket) => total + bucket.count,
        0,
    );
    const normalizedDistribution = distribution.map((bucket) => ({
        ...bucket,
        percentage:
            bucket.percentage ??
            (totalAnswers > 0 ? (bucket.count / totalAnswers) * 100 : 0),
    }));
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    let currentOffset = 0;

    return (
        <Card className="overflow-hidden p-5">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
                <div className="min-w-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h2 className="text-base font-bold text-[#303030]">
                                Skor per Aspek
                            </h2>
                            <p className="text-sm font-semibold text-[#7C7C7C]">
                                Skor tertimbang (0-100)
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 space-y-4">
                        {aspects.map((aspect) => (
                            <ScoreBar key={aspect.name} aspect={aspect} />
                        ))}
                    </div>

                    <div className="mt-4 grid grid-cols-6 gap-2 pl-0 text-[11px] font-bold text-[#8A97A8] md:ml-[180px]">
                        {[0, 20, 40, 60, 80, 100].map((value) => (
                            <span
                                key={value}
                                className="text-right first:text-left"
                            >
                                {value}
                            </span>
                        ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-4">
                        {performanceLegends.map((legend) => (
                            <span
                                key={legend.label}
                                className="inline-flex items-center gap-2 text-xs font-bold text-[#566579]"
                            >
                                <span
                                    className="size-2.5 rounded-full"
                                    style={{ backgroundColor: legend.color }}
                                />
                                {legend.label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="min-w-0 border-t border-[#E7ECF2] pt-5 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-6">
                    <h2 className="text-base font-bold text-[#303030]">
                        Distribusi Skor Jawaban
                    </h2>
                    <p className="text-sm font-semibold text-[#7C7C7C]">
                        Total {totalAnswers} jawaban
                    </p>

                    <div className="mt-5 grid gap-5 sm:grid-cols-[180px_minmax(0,1fr)] xl:grid-cols-1">
                        <div className="relative mx-auto size-44">
                            <svg
                                viewBox="0 0 160 160"
                                className="size-full -rotate-90"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="80"
                                    cy="80"
                                    r={radius}
                                    fill="none"
                                    stroke="#EEF3F8"
                                    strokeWidth="22"
                                />
                                {totalAnswers > 0 &&
                                    normalizedDistribution.map((bucket) => {
                                        const length =
                                            ((bucket.percentage ?? 0) / 100) *
                                            circumference;
                                        const dashOffset = -currentOffset;
                                        currentOffset += length;

                                        if (bucket.count === 0) {
                                            return null;
                                        }

                                        return (
                                            <circle
                                                key={bucket.key}
                                                cx="80"
                                                cy="80"
                                                r={radius}
                                                fill="none"
                                                stroke={bucket.color}
                                                strokeWidth="22"
                                                strokeDasharray={`${length} ${circumference - length}`}
                                                strokeDashoffset={dashOffset}
                                            />
                                        );
                                    })}
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <p className="text-3xl font-black text-[#303030]">
                                    {totalAnswers}
                                </p>
                                <p className="text-xs font-bold text-[#7C7C7C]">
                                    Jawaban
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {normalizedDistribution.map((bucket) => (
                                <div
                                    key={bucket.key}
                                    className="flex items-center justify-between gap-3 rounded-lg bg-[#F8FBFE] px-3 py-2"
                                >
                                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#344256]">
                                        <span
                                            className="size-2.5 rounded-full"
                                            style={{
                                                backgroundColor: bucket.color,
                                            }}
                                        />
                                        {bucket.label}
                                    </span>
                                    <span
                                        className={classNames(
                                            'text-sm font-black',
                                            bucket.textColor,
                                        )}
                                    >
                                        {bucket.count} (
                                        {formatStatScore(
                                            bucket.percentage ?? 0,
                                        )}
                                        %)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

function DocumentBadge({ document }: { document: SurveyDocument }) {
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
                <p className="truncate text-xs font-bold text-[#303030]">
                    {document.file_name}
                </p>
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
}: {
    question: SurveyQuestion;
    number: number;
    onViewDetail: (question: SurveyQuestion) => void;
    onViewHistory: (question: SurveyQuestion) => void;
}) {
    const answered = Boolean(question.answer);

    return (
        <div className="grid gap-3 border-b border-[#EFEFEF] px-4 py-4 last:border-b-0 xl:grid-cols-[38px_minmax(220px,1.25fr)_170px_minmax(240px,.95fr)_130px_130px_112px]">
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

            <div className="min-w-0">
                <p className="mb-2 text-xs font-bold text-[#303030]">
                    Dokumen Pendukung ({question.answer?.documents.length ?? 0})
                </p>
                <div className="space-y-2">
                    {question.answer?.documents.map((document) => (
                        <DocumentBadge key={document.id} document={document} />
                    ))}
                    {(question.answer?.documents.length ?? 0) === 0 && (
                        <p className="rounded-lg bg-[#F7F7F7] px-3 py-2 text-xs font-semibold text-[#7C7C7C]">
                            Tidak ada dokumen
                        </p>
                    )}
                </div>
            </div>

            <div className="min-w-0 text-xs">
                <p className="flex items-center gap-2 font-semibold text-[#7C7C7C]">
                    <UserRound size={14} className="text-[#0066AE]" />
                    Dijawab oleh
                </p>
                <p className="mt-1 font-bold text-[#303030]">
                    {question.answer?.answered_by.name ?? '-'}
                </p>
            </div>

            <div className="min-w-0 text-xs">
                <p className="flex items-center gap-2 font-semibold text-[#7C7C7C]">
                    <Clock3 size={14} className="text-[#0066AE]" />
                    Terakhir diedit
                </p>
                <p className="mt-1 font-bold text-[#303030]">
                    {question.answer?.last_edited_at ?? '-'}
                </p>
            </div>

            <div className="flex items-center">
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
                            onClick={() => onViewHistory(question)}
                        >
                            <Clock3 className="size-4 text-[#303030]" />
                            Lihat Riwayat
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}


function PariwisataQuestionRow({
    question,
    number,
    onViewDetail,
    onEditData,
}: {
    question: PariwisataSurveyQuestion;
    number: number;
    onViewDetail: (question: PariwisataSurveyQuestion) => void;
    onEditData: (question: PariwisataSurveyQuestion) => void;
}) {
    const answered = Boolean(question.answer);
    const title = question.indicator_name ?? question.criteria_name ?? '-';
    const meta = [
        question.criteria_code ? `${question.criteria_code}  ${question.criteria_name ?? '-'}` : null,
        question.indicator_code ? `${question.indicator_code}` : null,
    ].filter(Boolean);

    return (
        <div className="grid gap-3 border-b border-[#EFEFEF] px-4 py-4 last:border-b-0 xl:grid-cols-[38px_minmax(220px,1.25fr)_170px_minmax(240px,.95fr)_130px_130px_112px]">
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
                        {question.indicator_description ?? question.document_hint}
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
                        Skor {question.answer?.score ?? '-'} / {question.max_score || '-'}
                    </p>
                    <p className="line-clamp-2 text-[11px] font-semibold opacity-80">
                        {question.answer?.score_label ?? 'Belum dijawab'}
                    </p>
                </div>
            </div>

            <div className="min-w-0">
                <p className="mb-2 text-xs font-bold text-[#303030]">
                    Dokumen Pendukung ({question.answer?.documents.length ?? 0})
                </p>
                <div className="space-y-2">
                    {question.answer?.documents.map((document) => (
                        <DocumentBadge key={document.id} document={document} />
                    ))}
                    {(question.answer?.documents.length ?? 0) === 0 && (
                        <p className="rounded-lg bg-[#F7F7F7] px-3 py-2 text-xs font-semibold text-[#7C7C7C]">
                            Tidak ada dokumen
                        </p>
                    )}
                </div>
            </div>

            <div className="min-w-0 text-xs">
                <p className="flex items-center gap-2 font-semibold text-[#7C7C7C]">
                    <UserRound size={14} className="text-[#0066AE]" />
                    Dijawab oleh
                </p>
                <p className="mt-1 font-bold text-[#303030]">
                    {question.answer?.answered_by.name ?? '-'}
                </p>
            </div>

            <div className="min-w-0 text-xs">
                <p className="flex items-center gap-2 font-semibold text-[#7C7C7C]">
                    <Clock3 size={14} className="text-[#0066AE]" />
                    Terakhir diedit
                </p>
                <p className="mt-1 font-bold text-[#303030]">
                    {question.answer?.last_edited_at ?? '-'}
                </p>
            </div>

            <div className="flex items-center">
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
                            Edit Data
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
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
                        Pertanyaan, opsi jawaban, skor terpilih, catatan, dan file pendukung.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">
                    <section className="rounded-xl bg-[#F8FBFF] p-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#0066AE]">
                            {question.criteria_code && <span>{question.criteria_code}</span>}
                            {question.indicator_code && <span> {question.indicator_code}</span>}
                        </div>
                        <h3 className="mt-2 text-base leading-6 font-bold text-[#303030]">
                            {question.indicator_name ?? question.criteria_name ?? '-'}
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
                                <p className="text-xs font-bold text-[#7C7C7C]">Dijawab oleh</p>
                                <p className="mt-1 font-semibold text-[#303030]">{question.answer?.answered_by.name ?? '-'}</p>
                            </div>
                            <div className="rounded-xl bg-[#F7F7F7] px-4 py-3">
                                <p className="text-xs font-bold text-[#7C7C7C]">Dijawab pada</p>
                                <p className="mt-1 font-semibold text-[#303030]">{question.answer?.answered_at ?? '-'}</p>
                            </div>
                            <div className="rounded-xl bg-[#F7F7F7] px-4 py-3">
                                <p className="text-xs font-bold text-[#7C7C7C]">Terakhir diedit oleh</p>
                                <p className="mt-1 font-semibold text-[#303030]">{question.answer?.last_edited_by.name ?? '-'}</p>
                            </div>
                            <div className="rounded-xl bg-[#F7F7F7] px-4 py-3">
                                <p className="text-xs font-bold text-[#7C7C7C]">Terakhir diedit pada</p>
                                <p className="mt-1 font-semibold text-[#303030]">{question.answer?.last_edited_at ?? '-'}</p>
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
                            File Pendukung
                        </h4>
                        <div className="mt-2 space-y-2">
                            {question.answer?.documents.map((document) => (
                                <DocumentBadge key={document.id} document={document} />
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
        key: 'question_id' | 'pariwisata_suvey_option_id' | 'notes' | 'documents',
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
        Object.entries(errorBag).find(([key]) =>
            key.startsWith('answers.0.documents') || key === 'documents',
        )?.[1] ?? undefined;

    function handleFilesChange(fileList: FileList | null) {
        if (!fileList) {
            return;
        }

        updateAnswerField('documents', [...currentAnswer.documents, ...Array.from(fileList)]);
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
                        Ubah jawaban, catatan, atau tambahkan dokumen pendukung untuk pertanyaan ini.
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <section className="rounded-xl bg-[#F8FBFF] p-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#0066AE]">
                            {question.criteria_code && <span>{question.criteria_code}</span>}
                            {question.indicator_code && <span>{question.indicator_code}</span>}
                        </div>
                        <h3 className="mt-2 text-base leading-6 font-bold text-[#303030]">
                            {question.indicator_name ?? question.criteria_name ?? '-'}
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
                                    String(option.id) === currentAnswer.pariwisata_suvey_option_id;

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
                                                updateAnswerField('pariwisata_suvey_option_id', event.target.value)
                                            }
                                            className="mt-1"
                                        />
                                        <div className="min-w-0">
                                            <p className="font-bold text-[#0066AE]">
                                                Skor {option.score} · {option.label}
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
                            onChange={(event) => updateAnswerField('notes', event.target.value)}
                            rows={4}
                            className="mt-2 w-full rounded-xl border border-[#DDE4EC] bg-white px-4 py-3 text-sm font-medium text-[#303030] outline-none transition focus:border-[#0066AE] focus:ring-2 focus:ring-[#0066AE]/10"
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
                                <DocumentBadge key={document.id} document={document} />
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
                                onChange={(event) => handleFilesChange(event.target.files)}
                                className="block w-full text-sm font-medium text-[#303030] file:mr-3 file:rounded-lg file:border-0 file:bg-[#0066AE] file:px-3 file:py-2 file:text-sm file:font-bold file:text-white"
                            />
                            <p className="mt-2 text-xs font-semibold text-[#7C7C7C]">
                                JPG, PNG, WEBP, atau PDF. Maksimal 50 MB per file.
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
                                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removePendingFile(index)}
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
                        <button type="button" onClick={() => onOpenChange(false)}>
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
    onClick,
}: {
    active: boolean;
    label: string;
    count: number | string;
    icon: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
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
        </button>
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
}: {
    umkms: UmkmData[];
    assignmentCode: string;
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
                <Link href={createUmkm.url(assignmentCode)}>
                    <Button variant="primary">
                        <ClipboardCheck size={16} />
                        Tambah UMKM
                    </Button>
                </Link>
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
}: {
    pariwisata: PariwisataData[];
    assignmentCode: string;
    surveySummary: SurveyAssignmentShowProps['pariwisata_survey_summary'];
    surveyGroups: SurveyAssignmentShowProps['pariwisata_survey_groups'];
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
    const distribution = answerScoreBuckets.map((bucket) => {
        const summary = surveySummary.distribution.find(
            (item) => item.score === bucket.min,
        );

        return {
            ...bucket,
            score: bucket.min,
            count: summary?.count ?? 0,
        };
    });

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-xl border border-[#D7E8F8] bg-[#F8FBFE] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-base font-bold text-[#303030]">
                        Data Master ISTC
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-[#7C7C7C]">
                        Satu assignment memiliki satu survey pariwisata. Kartu
                        di bawah hanya menampilkan master data destinasi.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
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

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                    label="Total Skor"
                    value={`${surveySummary.total_score} / ${surveySummary.max_score}`}
                    helper="Skor kumulatif survey ISTC"
                    icon={<BarChart3 size={22} />}
                />
                <MetricCard
                    label="Nilai Akhir"
                    value={String(surveySummary.final_score)}
                    helper={`${surveySummary.answered_questions} dari ${surveySummary.total_questions} terjawab`}
                    icon={<Star size={22} />}
                />
                <MetricCard
                    label="Aspek Tertinggi"
                    value={surveySummary.highest_aspect?.name ?? '-'}
                    helper={
                        surveySummary.highest_aspect
                            ? String(surveySummary.highest_aspect.score_percent)
                            : '-'
                    }
                    icon={<Trophy size={22} />}
                    tone="green"
                />
                <MetricCard
                    label="Perlu Perhatian"
                    value={surveySummary.lowest_aspect?.name ?? '-'}
                    helper={
                        surveySummary.lowest_aspect
                            ? String(surveySummary.lowest_aspect.score_percent)
                            : '-'
                    }
                    icon={<AlertTriangle size={22} />}
                    tone="orange"
                />
                <MetricCard
                    label="Total ISTC"
                    value={String(pariwisata.length)}
                    helper="Master pariwisata"
                    icon={<Folder size={22} />}
                />
                <MetricCard
                    label="ISTC Aktif"
                    value={String(activeCount)}
                    helper={`Dokumen ${surveySummary.total_documents} file`}
                    icon={<CheckCircle2 size={22} />}
                    tone="green"
                />
            </div>

            <StatisticsChartCard
                aspects={surveySummary.aspects}
                distribution={distribution}
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
                                onChange={(event) => setSearch(event.target.value)}
                                className="h-10 w-full rounded-lg border border-[#DDE4EC] bg-white pr-3 pl-9 text-sm outline-none focus:border-[#0066AE]"
                                placeholder="Cari pertanyaan, aspek, atau kode..."
                            />
                        </label>
                        <select
                            value={aspectFilter}
                            onChange={(event) => setAspectFilter(event.target.value)}
                            className="h-10 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                        >
                            <option value="all">Semua Aspek</option>
                            {surveyGroups.map((group) => (
                                <option key={group.category_name} value={group.category_name}>
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
                            ? Math.round((group.score / group.max_score) * 1000) / 10
                            : 0;

                    return (
                        <div key={group.category_name}>
                            <button
                                type="button"
                                onClick={() => toggleAspect(group.category_name)}
                                className="flex w-full flex-col gap-3 border-b border-[#DDE9F6] bg-[#EAF3FF] px-4 py-3 text-left transition hover:bg-[#DDEFFF] sm:flex-row sm:items-center sm:justify-between"
                                aria-expanded={!closedAspects[group.category_name]}
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#0066AE]">
                                        <ShieldCheck size={18} strokeWidth={2.1} />
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
                                    </div>
                                </div>
                                <div className="grid min-w-[180px] grid-cols-[1fr_58px_20px] items-center gap-3">
                                    <div className="h-2 overflow-hidden rounded-full bg-white">
                                        <div
                                            className="h-full rounded-full bg-[#0066AE]"
                                            style={{ width: `${Math.min(scorePercent, 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-right text-xs font-bold text-[#0066AE]">
                                        {scorePercent}
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={classNames(
                                            'text-[#0066AE] transition-transform',
                                            closedAspects[group.category_name] && '-rotate-90',
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
                        Pertanyaan, opsi jawaban, skor terpilih, dan file
                        pendukung.
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
    summary,
    aspects,
    umkms,
    pariwisata,
    pariwisata_survey_groups,
    pariwisata_survey_summary,
    activities,
    edit_options,
    edit_values,
    village_annual_edit_values,
}: SurveyAssignmentShowProps) {
    const [activeTab, setActiveTab] = useState<'desa' | 'umkm' | 'pariwisata'>(
        'desa',
    );
    const [search, setSearch] = useState('');
    const [aspectFilter, setAspectFilter] = useState('all');
    const [detailQuestion, setDetailQuestion] = useState<SurveyQuestion | null>(
        null,
    );
    const [historyQuestion, setHistoryQuestion] =
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

    const villageTitle = `Assessment ${assignment.village.name}`;

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
                                <Link
                                    href={surveyAssignments.url()}
                                    className="text-[#0066AE]"
                                >
                                    Survey Assignment
                                </Link>
                                <span className="text-[#B0B0B0]">/</span>
                                <span className="text-[#7C7C7C]">Detail</span>
                            </div>
                            <h1 className="mt-2 text-2xl leading-tight font-bold text-[#303030] sm:text-[28px]">
                                Detail Survey Assignment
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
                            <button type="button" onClick={openEditSidebar}>
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
                            <Link href={takeSurvey.url(assignment.code)}>
                                <Button variant="primary">
                                    <ClipboardList size={16} />
                                    Take Survey
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-5 overflow-x-auto pb-1">
                        <div className="flex min-w-max gap-2">
                            <TabButton
                                active={activeTab === 'desa'}
                                label="Kemenpar"
                                count={summary.total_questions}
                                icon={<MapPin size={16} />}
                                onClick={() => setActiveTab('desa')}
                            />
                            <TabButton
                                active={activeTab === 'umkm'}
                                label="UMKM"
                                count={umkms.length}
                                icon={<ClipboardCheck size={16} />}
                                onClick={() => setActiveTab('umkm')}
                            />
                            <TabButton
                                active={activeTab === 'pariwisata'}
                                label="ISTC"
                                count={pariwisata.length}
                                icon={<Flag size={16} />}
                                onClick={() => setActiveTab('pariwisata')}
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
                                                <span
                                                    className={classNames(
                                                        'inline-flex h-8 w-fit items-center rounded-full px-4 text-xs font-bold',
                                                        statusClass(
                                                            assignment.status,
                                                        ),
                                                    )}
                                                >
                                                    {assignment.status_label}
                                                </span>
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
                                                <InfoItem
                                                    icon={<Flag size={18} />}
                                                    label="Status"
                                                    value={
                                                        assignment.status_label
                                                    }
                                                />
                                                <InfoItem
                                                    icon={
                                                        <UserRound size={18} />
                                                    }
                                                    label="Assigned By"
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
                                                <InfoItem
                                                    icon={<Folder size={18} />}
                                                    label="Dokumen Pendukung"
                                                    value={`${summary.total_documents} file`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                    <MetricCard
                                        label="Total Skor"
                                        value={`${summary.total_score} / ${summary.max_score}`}
                                        helper="Skor kumulatif"
                                        icon={<BarChart3 size={22} />}
                                    />
                                    <MetricCard
                                        label="Nilai Akhir"
                                        value={String(summary.final_score)}
                                        helper={`${summary.answered_questions} dari ${summary.total_questions} terjawab`}
                                        icon={<Star size={22} />}
                                    />
                                    <MetricCard
                                        label="Aspek Tertinggi"
                                        value={
                                            summary.highest_aspect?.name ?? '-'
                                        }
                                        helper={
                                            summary.highest_aspect
                                                ? String(
                                                      summary.highest_aspect
                                                          .score_percent,
                                                  )
                                                : '-'
                                        }
                                        icon={<Trophy size={22} />}
                                        tone="green"
                                    />
                                    <MetricCard
                                        label="Perlu Perhatian"
                                        value={
                                            summary.lowest_aspect?.name ?? '-'
                                        }
                                        helper={
                                            summary.lowest_aspect
                                                ? String(
                                                      summary.lowest_aspect
                                                          .score_percent,
                                                  )
                                                : '-'
                                        }
                                        icon={<AlertTriangle size={22} />}
                                        tone="orange"
                                    />
                                </div>

                                <SurveyStatistics aspects={aspects} />

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
                                                    </div>
                                                </div>
                                                <div className="grid min-w-[180px] grid-cols-[1fr_58px_20px] items-center gap-3">
                                                    <div className="h-2 overflow-hidden rounded-full bg-white">
                                                        <div
                                                            className="h-full rounded-full bg-[#0066AE]"
                                                            style={{
                                                                width: `${Math.min(aspect.score_percent, 100)}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-right text-xs font-bold text-[#0066AE]">
                                                        {aspect.score_percent}
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






