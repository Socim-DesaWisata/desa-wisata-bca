import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    ClipboardList,
    Download,
    Eye,
    FileText,
    ImagePlus,
    MapPin,
    Pencil,
    RefreshCcw,
    Save,
    Search,
    Ticket,
    UserRound,
    X,
    Plus,
    Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
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
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { dashboard, surveyAssignments } from '@/routes';
import { show as showAssignment } from '@/routes/survey-assignments';
import { update as updatePariwisata } from '@/routes/survey-assignments/pariwisata';

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

type Pariwisata = {
    id: number;
    name: string;
    image_url: string | null;
    operational_days: string | null;
    operational_hours: string | null;
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
};

type SelectOption = {
    value: string;
    label: string;
};

type SurveyTemplate = {
    id: number;
    title: string;
    description: string | null;
    status: string | null;
    published_at: string;
    question_count: number;
};

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
    level: string;
    label: string;
    description: string;
    sort_order: number;
};

type SurveyQuestion = {
    id: number;
    category_code: string | null;
    category_name: string | null;
    sub_category_code: string | null;
    sub_category_name: string | null;
    criteria_code: string | null;
    criteria_name: string | null;
    indicator_code: string;
    indicator_name: string;
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
    options: SurveyOption[];
};

type SurveyGroup = {
    category_name: string;
    question_count: number;
    answered_count: number;
    documents_count: number;
    score: number;
    max_score: number;
    questions: SurveyQuestion[];
};

type ShowPariwisataProps = {
    assignment: Assignment;
    pariwisata: Pariwisata;
    category_options: CategoryOption[];
    pariwisata_survey_summary: PariwisataSurveySummary;
    edit_values: PariwisataEditValues;
};

type PariwisataSurveySummary = {
    total_score: number;
    max_score: number;
    final_score: number;
    highest_aspect: { name: string; score_percent: number } | null;
    lowest_aspect: { name: string; score_percent: number } | null;
    aspects: Array<{
        name: string;
        score: number;
        max_score: number;
        score_percent: number;
    }>;
};

type CategoryOption = {
    value: string;
    label: string;
};

type PariwisataEditValues = {
    name: string;
    categories: string[];
    operational_days: string;
    operational_hours: string;
    operational_schedule_notes: string;
    entrance_ticket_price: string;
    entrance_ticket_description: string;
    address: string;
    person_in_charge_name: string;
    person_in_charge_phone: string;
    person_in_charge_address: string;
    is_active: boolean;
    annual_turnovers: { year: string; value: string; notes: string }[];
    annual_visitors: { year: string; value: string; notes: string }[];
    visitor_type_annuals: {
        year: string;
        visitor_type: string;
        value: string;
        notes: string;
    }[];
    packages: {
        name: string;
        package_type: string;
        duration: string;
        facilities: string;
        description: string;
        price: string;
        is_active: boolean;
    }[];
    annual_worker_stats: {
        year: string;
        dimension: string;
        category_value: string;
        total_people: string;
        notes: string;
    }[];
    annual_worker_training_stats: {
        year: string;
        training_name: string;
        total_people: string;
        notes: string;
    }[];
};

type PariwisataEditForm = PariwisataEditValues & {
    _method: 'patch';
    image: File | null;
};

type ErrorBag = Record<string, string | undefined>;

const operationalDayOptions = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
];

const visitorTypeOptions: SelectOption[] = [
    { value: 'domestik', label: 'Domestik' },
    { value: 'mancanegara', label: 'Mancanegara' },
    { value: 'pelajar', label: 'Pelajar' },
    { value: 'rombongan', label: 'Rombongan' },
];

const workerDimensionOptions: SelectOption[] = [
    { value: 'age', label: 'Usia' },
    { value: 'gender', label: 'Gender' },
    { value: 'education', label: 'Pendidikan' },
];

function initialEditForm(values: PariwisataEditValues): PariwisataEditForm {
    return {
        _method: 'patch',
        image: null,
        ...values,
    };
}

function fieldError(errors: Partial<ErrorBag>, name: string) {
    return errors[name];
}

function digitsOnly(value: string) {
    return value.replace(/\D/g, '');
}

function formatThousands(value: string) {
    const digits = digitsOnly(value);

    return digits ? new Intl.NumberFormat('id-ID').format(Number(digits)) : '';
}

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

type TrendChartRow = {
    year: string;
    omset: number;
    pengunjung: number;
};

type VisitorPieRow = {
    type: string;
    label: string;
    value: number;
    fill: string;
};

const visitorTypeColors: Record<string, string> = {
    domestik: '#0066AE',
    mancanegara: '#22C55E',
    pelajar: '#F59E0B',
    rombongan: '#8B5CF6',
};

function toNumber(value: string) {
    const normalized = Number.parseFloat(value);

    return Number.isFinite(normalized) ? normalized : 0;
}

function formatCompactRupiah(value: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        notation: value >= 1000000 ? 'compact' : 'standard',
        maximumFractionDigits: value >= 1000000 ? 1 : 0,
    }).format(value);
}

function formatVisitorCount(value: number) {
    return new Intl.NumberFormat('id-ID', {
        maximumFractionDigits: 0,
    }).format(value);
}

function visitorTypeLabel(type: string) {
    return (
        visitorTypeOptions.find((option) => option.value === type)?.label ??
        type.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
    );
}

function buildTrendChartData(values: PariwisataEditValues): TrendChartRow[] {
    const years = new Set<string>();

    values.annual_turnovers.forEach((row) => {
        if (row.year) {
            years.add(row.year);
        }
    });

    values.annual_visitors.forEach((row) => {
        if (row.year) {
            years.add(row.year);
        }
    });

    return Array.from(years)
        .sort((left, right) => Number(left) - Number(right))
        .map((year) => ({
            year,
            omset: values.annual_turnovers
                .filter((row) => row.year === year)
                .reduce((total, row) => total + toNumber(row.value), 0),
            pengunjung: values.annual_visitors
                .filter((row) => row.year === year)
                .reduce((total, row) => total + toNumber(row.value), 0),
        }));
}

function buildVisitorPieData(
    values: PariwisataEditValues,
    selectedYear: string,
): VisitorPieRow[] {
    const totals = new Map<string, number>();

    values.visitor_type_annuals
        .filter((row) => row.year === selectedYear)
        .forEach((row) => {
            const currentTotal = totals.get(row.visitor_type) ?? 0;
            totals.set(row.visitor_type, currentTotal + toNumber(row.value));
        });

    return Array.from(totals.entries())
        .map(([type, value]) => ({
            type,
            label: visitorTypeLabel(type),
            value,
            fill: visitorTypeColors[type] ?? '#94A3B8',
        }))
        .sort((left, right) => right.value - left.value);
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

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="flex min-w-0 gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0066AE]">
                {icon}
            </span>
            <div className="min-w-0">
                <p className="text-xs font-semibold text-[#7C7C7C]">{label}</p>
                <p className="mt-1 text-sm font-bold break-words text-[#303030]">
                    {value || '-'}
                </p>
            </div>
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
    type = 'text',
    placeholder,
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    type?: string;
    placeholder?: string;
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
                className="mt-2 h-10 w-full rounded-xl border border-[#DCE3EA] bg-white px-3 text-sm font-semibold text-[#172033] transition outline-none focus:border-[#0066AE] focus:ring-2 focus:ring-[#AAD2F8]/35"
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
    rows = 3,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    rows?: number;
}) {
    return (
        <label className="block min-w-0">
            <span className="text-xs font-bold text-[#344256]">{label}</span>
            <textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="mt-2 w-full resize-y rounded-xl border border-[#DCE3EA] bg-white px-3 py-2 text-sm font-semibold text-[#172033] transition outline-none focus:border-[#0066AE] focus:ring-2 focus:ring-[#AAD2F8]/35"
            />
            <FieldError message={error} />
        </label>
    );
}

function EditSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
            <h3 className="text-sm font-bold text-[#172033]">{title}</h3>
            <div className="mt-4 space-y-4">{children}</div>
        </section>
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
            >
                <Eye size={14} />
            </a>
            <a
                href={document.file_url}
                download
                className="flex size-7 shrink-0 items-center justify-center rounded border border-[#DDE4EC] text-[#0066AE]"
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
}: {
    question: SurveyQuestion;
    number: number;
    onViewDetail: (question: SurveyQuestion) => void;
}) {
    const answered = Boolean(question.answer);

    return (
        <div className="grid gap-3 border-b border-[#EFEFEF] px-4 py-4 last:border-b-0 xl:grid-cols-[38px_minmax(220px,1.25fr)_170px_minmax(240px,.95fr)_130px_130px_112px]">
            <div className="flex size-8 items-center justify-center rounded-full border border-[#CAD7E6] text-xs font-bold text-[#7C7C7C]">
                {String(number).padStart(2, '0')}
            </div>

            <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#7C7C7C]">
                    {question.indicator_code}
                </p>
                <p className="mt-1 text-sm leading-5 font-semibold text-[#303030]">
                    {question.indicator_name}
                </p>
                <p className="mt-2 text-xs font-semibold text-[#7C7C7C]">
                    {question.sub_category_name ??
                        question.category_name ??
                        '-'}
                </p>
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
                    <CalendarDays size={14} className="text-[#0066AE]" />
                    Terakhir diedit
                </p>
                <p className="mt-1 font-bold text-[#303030]">
                    {question.answer?.last_edited_at ?? '-'}
                </p>
            </div>

            <div className="flex items-center">
                <button
                    type="button"
                    onClick={() => onViewDetail(question)}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                >
                    <Eye size={14} />
                    Lihat Detail
                </button>
            </div>
        </div>
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
                        Detail Jawaban Survey Pariwisata
                    </DialogTitle>
                    <DialogDescription>
                        Indikator, opsi jawaban, skor terpilih, catatan, dan
                        file pendukung.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">
                    <section className="rounded-xl bg-[#F8FBFF] p-4">
                        <p className="text-xs font-bold text-[#0066AE]">
                            {question.indicator_code} ·{' '}
                            {question.criteria_code ?? '-'}
                        </p>
                        <h3 className="mt-2 text-base leading-6 font-bold text-[#303030]">
                            {question.indicator_name}
                        </h3>
                        <p className="mt-2 text-xs font-semibold text-[#7C7C7C]">
                            {question.category_name ?? '-'} ·{' '}
                            {question.sub_category_name ?? '-'} ·{' '}
                            {question.criteria_name ?? '-'}
                        </p>
                        {question.indicator_description && (
                            <p className="mt-3 text-sm leading-6 font-semibold text-[#7C7C7C]">
                                {question.indicator_description}
                            </p>
                        )}
                        {(question.document_hint ||
                            question.supporting_evidence) && (
                            <p className="mt-3 rounded-lg bg-white px-3 py-2 text-xs leading-5 font-semibold text-[#7C7C7C]">
                                {question.document_hint ??
                                    question.supporting_evidence}
                            </p>
                        )}
                    </section>

                    <section className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-[#EFEFEF] bg-white p-4">
                            <p className="text-xs font-bold text-[#7C7C7C]">
                                Skor Terpilih
                            </p>
                            <p className="mt-1 text-2xl font-bold text-[#0066AE]">
                                {question.answer
                                    ? `${question.answer.score} / ${question.max_score}`
                                    : '-'}
                            </p>
                            <p className="mt-1 text-sm font-bold text-[#303030]">
                                {question.answer?.score_label ??
                                    'Belum dijawab'}
                            </p>
                        </div>
                        <div className="rounded-xl border border-[#EFEFEF] bg-white p-4">
                            <p className="text-xs font-bold text-[#7C7C7C]">
                                Pengisian
                            </p>
                            <p className="mt-1 text-sm font-bold text-[#303030]">
                                {question.answer?.answered_by.name ?? '-'}
                            </p>
                            <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                {question.answer?.last_edited_at ?? '-'}
                            </p>
                        </div>
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
                                        <span>
                                            <span className="block font-semibold text-[#303030]">
                                                {option.label}
                                            </span>
                                            <span className="mt-1 block text-xs leading-5 font-semibold text-[#7C7C7C]">
                                                {option.description}
                                            </span>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-bold text-[#303030]">
                            Catatan
                        </h4>
                        <p className="mt-2 rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm leading-6 font-semibold text-[#7C7C7C]">
                            {question.answer?.notes ?? 'Belum ada catatan.'}
                        </p>
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

function SelectInput({
    label,
    value,
    onChange,
    error,
    options,
    placeholder = 'Pilih opsi',
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}) {
    return (
        <label className="space-y-1.5">
            <span className="text-xs font-bold text-[#303030]">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm text-[#303030] transition outline-none focus:border-[#0066AE]"
            >
                <option value="">{placeholder}</option>
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

function PariwisataEditSidebar({
    open,
    onClose,
    assignment,
    form,
    categoryOptions,
    imageUrl,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    assignment: Assignment;
    form: ReturnType<typeof useForm<PariwisataEditForm>>;
    categoryOptions: CategoryOption[];
    imageUrl: string | null;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
    const { data, setData, processing, errors } = form;

    function selectedOperationalDays() {
        return data.operational_days
            .split(',')
            .map((day) => day.trim())
            .filter(Boolean);
    }

    function toggleCategory(value: string) {
        setData(
            'categories',
            data.categories.includes(value)
                ? data.categories.filter((category) => category !== value)
                : [...data.categories, value],
        );
    }

    function toggleOperationalDay(day: string) {
        const selectedDays = selectedOperationalDays();
        const nextDays = selectedDays.includes(day)
            ? selectedDays.filter((selectedDay) => selectedDay !== day)
            : operationalDayOptions.filter(
                  (option) => selectedDays.includes(option) || option === day,
              );

        setData('operational_days', nextDays.join(', '));
    }

    function updateArrayField<K extends keyof PariwisataEditForm>(
        field: K,
        updater: (rows: any) => any,
    ) {
        setData(field, updater(data[field]) as any);
    }

    function addAnnualTurnover() {
        updateArrayField('annual_turnovers', (rows) => [
            ...rows,
            { year: '', value: '', notes: '' },
        ]);
    }

    function updateAnnualTurnover(
        index: number,
        values: Partial<{ year: string; value: string; notes: string }>,
    ) {
        updateArrayField('annual_turnovers', (rows) =>
            rows.map((row: any, rowIndex: number) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removeAnnualTurnover(index: number) {
        updateArrayField('annual_turnovers', (rows) =>
            rows.filter((_: any, rowIndex: number) => rowIndex !== index),
        );
    }

    function addAnnualVisitor() {
        updateArrayField('annual_visitors', (rows) => [
            ...rows,
            { year: '', value: '', notes: '' },
        ]);
    }

    function updateAnnualVisitor(
        index: number,
        values: Partial<{ year: string; value: string; notes: string }>,
    ) {
        updateArrayField('annual_visitors', (rows) =>
            rows.map((row: any, rowIndex: number) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removeAnnualVisitor(index: number) {
        updateArrayField('annual_visitors', (rows) =>
            rows.filter((_: any, rowIndex: number) => rowIndex !== index),
        );
    }

    function addVisitorTypeAnnual() {
        updateArrayField('visitor_type_annuals', (rows) => [
            ...rows,
            { year: '', visitor_type: '', value: '', notes: '' },
        ]);
    }

    function updateVisitorTypeAnnual(
        index: number,
        values: Partial<{
            year: string;
            visitor_type: string;
            value: string;
            notes: string;
        }>,
    ) {
        updateArrayField('visitor_type_annuals', (rows) =>
            rows.map((row: any, rowIndex: number) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removeVisitorTypeAnnual(index: number) {
        updateArrayField('visitor_type_annuals', (rows) =>
            rows.filter((_: any, rowIndex: number) => rowIndex !== index),
        );
    }

    function addPackage() {
        updateArrayField('packages', (rows) => [
            ...rows,
            {
                name: '',
                package_type: '',
                duration: '',
                facilities: '',
                description: '',
                price: '',
                is_active: true,
            },
        ]);
    }

    function updatePackage(
        index: number,
        values: Partial<{
            name: string;
            package_type: string;
            duration: string;
            facilities: string;
            description: string;
            price: string;
            is_active: boolean;
        }>,
    ) {
        updateArrayField('packages', (rows) =>
            rows.map((row: any, rowIndex: number) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removePackage(index: number) {
        updateArrayField('packages', (rows) =>
            rows.filter((_: any, rowIndex: number) => rowIndex !== index),
        );
    }

    function addAnnualWorkerStat() {
        updateArrayField('annual_worker_stats', (rows) => [
            ...rows,
            {
                year: '',
                dimension: '',
                category_value: '',
                total_people: '',
                notes: '',
            },
        ]);
    }

    function updateAnnualWorkerStat(
        index: number,
        values: Partial<{
            year: string;
            dimension: string;
            category_value: string;
            total_people: string;
            notes: string;
        }>,
    ) {
        updateArrayField('annual_worker_stats', (rows) =>
            rows.map((row: any, rowIndex: number) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removeAnnualWorkerStat(index: number) {
        updateArrayField('annual_worker_stats', (rows) =>
            rows.filter((_: any, rowIndex: number) => rowIndex !== index),
        );
    }

    function addAnnualWorkerTrainingStat() {
        updateArrayField('annual_worker_training_stats', (rows) => [
            ...rows,
            { year: '', training_name: '', total_people: '', notes: '' },
        ]);
    }

    function updateAnnualWorkerTrainingStat(
        index: number,
        values: Partial<{
            year: string;
            training_name: string;
            total_people: string;
            notes: string;
        }>,
    ) {
        updateArrayField('annual_worker_training_stats', (rows) =>
            rows.map((row: any, rowIndex: number) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removeAnnualWorkerTrainingStat(index: number) {
        updateArrayField('annual_worker_training_stats', (rows) =>
            rows.filter((_: any, rowIndex: number) => rowIndex !== index),
        );
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
                            Edit Data Pariwisata
                        </h2>
                        <p className="mt-1 text-xs leading-5 font-semibold text-[#64748B]">
                            Ubah profil destinasi pariwisata.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white text-[#303030] transition hover:bg-[#F1F5F8]"
                        aria-label="Tutup edit pariwisata"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
                        <EditSection title="Identitas Destinasi">
                            <TextInput
                                label="Nama Destinasi Wisata"
                                value={data.name}
                                onChange={(value) => setData('name', value)}
                                error={fieldError(errors, 'name')}
                                placeholder="Nama destinasi"
                                required
                            />
                            <label className="block space-y-1.5">
                                <span className="text-xs font-bold text-[#344256]">
                                    Gambar Pariwisata
                                </span>
                                {imageUrl && !data.image && (
                                    <img
                                        src={imageUrl}
                                        alt={data.name || 'Gambar pariwisata'}
                                        className="h-32 w-full rounded-xl border border-[#DCE3EA] object-cover"
                                    />
                                )}
                                <div className="flex items-center gap-3 rounded-xl border border-dashed border-[#AAD2F8] bg-[#F8FBFE] px-3 py-3">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#0066AE]">
                                        <ImagePlus className="size-5" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={(event) =>
                                                setData(
                                                    'image',
                                                    event.target.files?.[0] ??
                                                        null,
                                                )
                                            }
                                            className="w-full text-sm font-semibold text-[#303030] file:mr-3 file:rounded-lg file:border-0 file:bg-[#0066AE] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
                                        />
                                        <p className="mt-1 truncate text-[11px] font-semibold text-[#7C7C7C]">
                                            {data.image?.name ??
                                                'Kosongkan jika tidak ingin mengganti gambar'}
                                        </p>
                                    </div>
                                </div>
                                <FieldError
                                    message={fieldError(errors, 'image')}
                                />
                            </label>
                            <div className="min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs font-bold text-[#344256]">
                                        Kategori Destinasi{' '}
                                        <span className="text-[#D81313]">
                                            *
                                        </span>
                                    </span>
                                    <span className="text-[11px] font-semibold text-[#7C7C7C]">
                                        Bisa pilih lebih dari satu
                                    </span>
                                </div>
                                <div className="mt-2 grid grid-cols-1 gap-2 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2">
                                    {categoryOptions.map((option) => {
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
                                    message={fieldError(errors, 'categories')}
                                />
                            </div>
                            <TextArea
                                label="Alamat Destinasi"
                                value={data.address}
                                onChange={(value) => setData('address', value)}
                                error={fieldError(errors, 'address')}
                                placeholder="Alamat lengkap destinasi"
                            />
                        </EditSection>

                        <EditSection title="Operasional dan Tiket">
                            <div className="min-w-0">
                                <span className="text-xs font-bold text-[#344256]">
                                    Hari Operasional
                                </span>
                                <div className="mt-2 grid grid-cols-1 gap-2 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2">
                                    {operationalDayOptions.map((day) => {
                                        const checked =
                                            selectedOperationalDays().includes(
                                                day,
                                            );

                                        return (
                                            <label
                                                key={day}
                                                className="flex min-w-0 cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#303030] ring-1 ring-[#E6ECF2] transition hover:ring-[#AAD2F8]"
                                            >
                                                <Checkbox
                                                    checked={checked}
                                                    onCheckedChange={() =>
                                                        toggleOperationalDay(
                                                            day,
                                                        )
                                                    }
                                                    className="border-[#AAD2F8] data-[state=checked]:border-[#0066AE] data-[state=checked]:bg-[#0066AE]"
                                                />
                                                <span>{day}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                                <p className="mt-1 text-[11px] font-semibold text-[#7C7C7C]">
                                    Tersimpan sebagai:{' '}
                                    {data.operational_days || '-'}
                                </p>
                                <FieldError
                                    message={fieldError(
                                        errors,
                                        'operational_days',
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <TextInput
                                    label="Jam Operasional"
                                    value={data.operational_hours}
                                    onChange={(value) =>
                                        setData('operational_hours', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'operational_hours',
                                    )}
                                    placeholder="08.00 - 17.00"
                                />
                                <TextInput
                                    label="Harga Tiket"
                                    value={data.entrance_ticket_price}
                                    onChange={(value) =>
                                        setData('entrance_ticket_price', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'entrance_ticket_price',
                                    )}
                                    placeholder="25000"
                                    type="number"
                                />
                            </div>
                            <TextInput
                                label="Keterangan Tiket"
                                value={data.entrance_ticket_description}
                                onChange={(value) =>
                                    setData(
                                        'entrance_ticket_description',
                                        value,
                                    )
                                }
                                error={fieldError(
                                    errors,
                                    'entrance_ticket_description',
                                )}
                                placeholder="Termasuk parkir"
                            />
                            <TextArea
                                label="Catatan Jadwal Operasional"
                                value={data.operational_schedule_notes}
                                onChange={(value) =>
                                    setData('operational_schedule_notes', value)
                                }
                                error={fieldError(
                                    errors,
                                    'operational_schedule_notes',
                                )}
                                placeholder="Catatan libur atau jadwal khusus"
                            />
                        </EditSection>

                        <EditSection title="Penanggung Jawab">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <TextInput
                                    label="Nama PIC"
                                    value={data.person_in_charge_name}
                                    onChange={(value) =>
                                        setData('person_in_charge_name', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'person_in_charge_name',
                                    )}
                                    placeholder="Nama penanggung jawab"
                                />
                                <TextInput
                                    label="Telepon PIC"
                                    value={data.person_in_charge_phone}
                                    onChange={(value) =>
                                        setData('person_in_charge_phone', value)
                                    }
                                    error={fieldError(
                                        errors,
                                        'person_in_charge_phone',
                                    )}
                                    placeholder="08xxxxxxxxxx"
                                />
                            </div>
                            <TextArea
                                label="Alamat PIC"
                                value={data.person_in_charge_address}
                                onChange={(value) =>
                                    setData('person_in_charge_address', value)
                                }
                                error={fieldError(
                                    errors,
                                    'person_in_charge_address',
                                )}
                                placeholder="Alamat penanggung jawab"
                            />
                            <label className="flex items-center justify-between gap-3 rounded-xl border border-[#DCE3EA] bg-white px-3 py-2 text-sm font-bold text-[#303030]">
                                Status Aktif
                                <Checkbox
                                    checked={data.is_active}
                                    onCheckedChange={(checked) =>
                                        setData('is_active', Boolean(checked))
                                    }
                                    className="border-[#AAD2F8] data-[state=checked]:border-[#0066AE] data-[state=checked]:bg-[#0066AE]"
                                />
                            </label>
                            <FieldError
                                message={fieldError(errors, 'is_active')}
                            />
                        </EditSection>

                        <EditSection title="Omset Tahunan">
                            <div className="space-y-3">
                                {data.annual_turnovers.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center">
                                        <p className="text-xs font-semibold text-[#64748B]">
                                            Belum ada omset tahunan
                                        </p>
                                    </div>
                                )}
                                {data.annual_turnovers.map((row, index) => (
                                    <div
                                        key={index}
                                        className="grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2"
                                    >
                                        <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
                                            <TextInput
                                                label="Tahun"
                                                value={row.year}
                                                onChange={(value) =>
                                                    updateAnnualTurnover(
                                                        index,
                                                        {
                                                            year: digitsOnly(
                                                                value,
                                                            ),
                                                        },
                                                    )
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `annual_turnovers.${index}.year`,
                                                )}
                                                placeholder="2024"
                                            />
                                            <TextInput
                                                label="Nilai Omset"
                                                value={formatThousands(
                                                    row.value,
                                                )}
                                                onChange={(value) =>
                                                    updateAnnualTurnover(
                                                        index,
                                                        {
                                                            value: digitsOnly(
                                                                value,
                                                            ),
                                                        },
                                                    )
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `annual_turnovers.${index}.value`,
                                                )}
                                                placeholder="Nominal rupiah"
                                            />
                                        </div>
                                        <div className="flex items-start gap-3 sm:col-span-2">
                                            <div className="flex-1">
                                                <TextInput
                                                    label="Catatan"
                                                    value={row.notes}
                                                    onChange={(value) =>
                                                        updateAnnualTurnover(
                                                            index,
                                                            {
                                                                notes: value,
                                                            },
                                                        )
                                                    }
                                                    error={fieldError(
                                                        errors,
                                                        `annual_turnovers.${index}.notes`,
                                                    )}
                                                    placeholder="Opsional"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeAnnualTurnover(index)
                                                }
                                                className="mt-[22px] inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-3 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]"
                                            >
                                                <Trash2 className="size-4" />
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addAnnualTurnover}
                                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
                                >
                                    <Plus className="size-4" />
                                    Tambah Omset Tahunan
                                </button>
                                <FieldError
                                    message={fieldError(
                                        errors,
                                        'annual_turnovers',
                                    )}
                                />
                            </div>
                        </EditSection>

                        <EditSection title="Pengunjung Tahunan">
                            <div className="space-y-3">
                                {data.annual_visitors.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center">
                                        <p className="text-xs font-semibold text-[#64748B]">
                                            Belum ada pengunjung tahunan
                                        </p>
                                    </div>
                                )}
                                {data.annual_visitors.map((row, index) => (
                                    <div
                                        key={index}
                                        className="grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2"
                                    >
                                        <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
                                            <TextInput
                                                label="Tahun"
                                                value={row.year}
                                                onChange={(value) =>
                                                    updateAnnualVisitor(index, {
                                                        year: digitsOnly(value),
                                                    })
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `annual_visitors.${index}.year`,
                                                )}
                                                placeholder="2024"
                                            />
                                            <TextInput
                                                label="Total Pengunjung"
                                                value={row.value}
                                                onChange={(value) =>
                                                    updateAnnualVisitor(index, {
                                                        value: digitsOnly(
                                                            value,
                                                        ),
                                                    })
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `annual_visitors.${index}.value`,
                                                )}
                                                placeholder="1250"
                                            />
                                        </div>
                                        <div className="flex items-start gap-3 sm:col-span-2">
                                            <div className="flex-1">
                                                <TextInput
                                                    label="Catatan"
                                                    value={row.notes}
                                                    onChange={(value) =>
                                                        updateAnnualVisitor(
                                                            index,
                                                            {
                                                                notes: value,
                                                            },
                                                        )
                                                    }
                                                    error={fieldError(
                                                        errors,
                                                        `annual_visitors.${index}.notes`,
                                                    )}
                                                    placeholder="Opsional"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeAnnualVisitor(index)
                                                }
                                                className="mt-[22px] inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-3 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]"
                                            >
                                                <Trash2 className="size-4" />
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addAnnualVisitor}
                                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
                                >
                                    <Plus className="size-4" />
                                    Tambah Pengunjung Tahunan
                                </button>
                                <FieldError
                                    message={fieldError(
                                        errors,
                                        'annual_visitors',
                                    )}
                                />
                            </div>
                        </EditSection>

                        <EditSection title="Jenis Pengunjung Tahunan">
                            <div className="space-y-3">
                                {data.visitor_type_annuals.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center">
                                        <p className="text-xs font-semibold text-[#64748B]">
                                            Belum ada jenis pengunjung
                                        </p>
                                    </div>
                                )}
                                {data.visitor_type_annuals.map((row, index) => (
                                    <div
                                        key={index}
                                        className="grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2"
                                    >
                                        <div className="grid gap-3 sm:col-span-2 sm:grid-cols-3">
                                            <TextInput
                                                label="Tahun"
                                                value={row.year}
                                                onChange={(value) =>
                                                    updateVisitorTypeAnnual(
                                                        index,
                                                        {
                                                            year: digitsOnly(
                                                                value,
                                                            ),
                                                        },
                                                    )
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `visitor_type_annuals.${index}.year`,
                                                )}
                                                placeholder="2024"
                                            />
                                            <SelectInput
                                                label="Jenis Pengunjung"
                                                value={row.visitor_type}
                                                onChange={(value) =>
                                                    updateVisitorTypeAnnual(
                                                        index,
                                                        {
                                                            visitor_type: value,
                                                        },
                                                    )
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `visitor_type_annuals.${index}.visitor_type`,
                                                )}
                                                options={visitorTypeOptions}
                                            />
                                            <TextInput
                                                label="Jumlah"
                                                value={row.value}
                                                onChange={(value) =>
                                                    updateVisitorTypeAnnual(
                                                        index,
                                                        {
                                                            value: digitsOnly(
                                                                value,
                                                            ),
                                                        },
                                                    )
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `visitor_type_annuals.${index}.value`,
                                                )}
                                                placeholder="500"
                                            />
                                        </div>
                                        <div className="flex items-start gap-3 sm:col-span-2">
                                            <div className="flex-1">
                                                <TextInput
                                                    label="Catatan"
                                                    value={row.notes}
                                                    onChange={(value) =>
                                                        updateVisitorTypeAnnual(
                                                            index,
                                                            {
                                                                notes: value,
                                                            },
                                                        )
                                                    }
                                                    error={fieldError(
                                                        errors,
                                                        `visitor_type_annuals.${index}.notes`,
                                                    )}
                                                    placeholder="Opsional"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeVisitorTypeAnnual(
                                                        index,
                                                    )
                                                }
                                                className="mt-[22px] inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-3 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]"
                                            >
                                                <Trash2 className="size-4" />
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addVisitorTypeAnnual}
                                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
                                >
                                    <Plus className="size-4" />
                                    Tambah Jenis Pengunjung
                                </button>
                                <FieldError
                                    message={fieldError(
                                        errors,
                                        'visitor_type_annuals',
                                    )}
                                />
                            </div>
                        </EditSection>

                        <EditSection title="Paket Wisata">
                            <div className="space-y-3">
                                {data.packages.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center">
                                        <p className="text-xs font-semibold text-[#64748B]">
                                            Belum ada paket wisata
                                        </p>
                                    </div>
                                )}
                                {data.packages.map((row, index) => (
                                    <div
                                        key={index}
                                        className="space-y-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3"
                                    >
                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                            <TextInput
                                                label="Nama Paket"
                                                value={row.name}
                                                onChange={(value) =>
                                                    updatePackage(index, {
                                                        name: value,
                                                    })
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `packages.${index}.name`,
                                                )}
                                                placeholder="Contoh: Paket Jelajah Desa"
                                            />
                                            <TextInput
                                                label="Tipe Paket"
                                                value={row.package_type}
                                                onChange={(value) =>
                                                    updatePackage(index, {
                                                        package_type: value,
                                                    })
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `packages.${index}.package_type`,
                                                )}
                                                placeholder="Family / Adventure"
                                            />
                                            <TextInput
                                                label="Durasi"
                                                value={row.duration}
                                                onChange={(value) =>
                                                    updatePackage(index, {
                                                        duration: value,
                                                    })
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `packages.${index}.duration`,
                                                )}
                                                placeholder="2 Hari 1 Malam"
                                            />
                                            <TextInput
                                                label="Harga"
                                                value={formatThousands(
                                                    row.price,
                                                )}
                                                onChange={(value) =>
                                                    updatePackage(index, {
                                                        price: digitsOnly(
                                                            value,
                                                        ),
                                                    })
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `packages.${index}.price`,
                                                )}
                                                placeholder="250.000"
                                            />
                                        </div>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <TextArea
                                                label="Fasilitas"
                                                value={row.facilities}
                                                onChange={(value) =>
                                                    updatePackage(index, {
                                                        facilities: value,
                                                    })
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `packages.${index}.facilities`,
                                                )}
                                                rows={2}
                                                placeholder="Daftar fasilitas paket"
                                            />
                                            <TextArea
                                                label="Deskripsi"
                                                value={row.description}
                                                onChange={(value) =>
                                                    updatePackage(index, {
                                                        description: value,
                                                    })
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `packages.${index}.description`,
                                                )}
                                                rows={2}
                                                placeholder="Deskripsi singkat paket wisata"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <label className="flex items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-xs font-semibold text-[#303030]">
                                                <Checkbox
                                                    checked={row.is_active}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        updatePackage(index, {
                                                            is_active:
                                                                !!checked,
                                                        })
                                                    }
                                                    className="border-[#AAD2F8] data-[state=checked]:border-[#0066AE] data-[state=checked]:bg-[#0066AE]"
                                                />
                                                Paket aktif
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removePackage(index)
                                                }
                                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-4 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]"
                                            >
                                                <Trash2 className="size-4" />
                                                Hapus Paket
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addPackage}
                                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
                                >
                                    <Plus className="size-4" />
                                    Tambah Paket Wisata
                                </button>
                            </div>
                        </EditSection>

                        <EditSection title="Data Pekerja Tahunan">
                            <div className="space-y-3">
                                {data.annual_worker_stats.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center">
                                        <p className="text-xs font-semibold text-[#64748B]">
                                            Belum ada data pekerja
                                        </p>
                                    </div>
                                )}
                                {data.annual_worker_stats.map((row, index) => (
                                    <div
                                        key={index}
                                        className="grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2"
                                    >
                                        <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
                                            <TextInput
                                                label="Tahun"
                                                value={row.year}
                                                onChange={(value) =>
                                                    updateAnnualWorkerStat(
                                                        index,
                                                        {
                                                            year: digitsOnly(
                                                                value,
                                                            ),
                                                        },
                                                    )
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `annual_worker_stats.${index}.year`,
                                                )}
                                                placeholder="2024"
                                            />
                                            <SelectInput
                                                label="Dimensi"
                                                value={row.dimension}
                                                onChange={(value) =>
                                                    updateAnnualWorkerStat(
                                                        index,
                                                        {
                                                            dimension: value,
                                                        },
                                                    )
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `annual_worker_stats.${index}.dimension`,
                                                )}
                                                options={workerDimensionOptions}
                                            />
                                            <TextInput
                                                label="Kategori"
                                                value={row.category_value}
                                                onChange={(value) =>
                                                    updateAnnualWorkerStat(
                                                        index,
                                                        {
                                                            category_value:
                                                                value,
                                                        },
                                                    )
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `annual_worker_stats.${index}.category_value`,
                                                )}
                                                placeholder="Contoh: 18-25 tahun"
                                            />
                                            <TextInput
                                                label="Total Orang"
                                                value={row.total_people}
                                                onChange={(value) =>
                                                    updateAnnualWorkerStat(
                                                        index,
                                                        {
                                                            total_people:
                                                                digitsOnly(
                                                                    value,
                                                                ),
                                                        },
                                                    )
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `annual_worker_stats.${index}.total_people`,
                                                )}
                                                placeholder="10"
                                            />
                                        </div>
                                        <div className="flex items-start gap-3 sm:col-span-2">
                                            <div className="flex-1">
                                                <TextInput
                                                    label="Catatan"
                                                    value={row.notes}
                                                    onChange={(value) =>
                                                        updateAnnualWorkerStat(
                                                            index,
                                                            {
                                                                notes: value,
                                                            },
                                                        )
                                                    }
                                                    error={fieldError(
                                                        errors,
                                                        `annual_worker_stats.${index}.notes`,
                                                    )}
                                                    placeholder="Opsional"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeAnnualWorkerStat(
                                                        index,
                                                    )
                                                }
                                                className="mt-[22px] inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-3 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]"
                                            >
                                                <Trash2 className="size-4" />
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addAnnualWorkerStat}
                                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
                                >
                                    <Plus className="size-4" />
                                    Tambah Data Pekerja
                                </button>
                                <FieldError
                                    message={fieldError(
                                        errors,
                                        'annual_worker_stats',
                                    )}
                                />
                            </div>
                        </EditSection>

                        <EditSection title="Pelatihan Pekerja Tahunan">
                            <div className="space-y-3">
                                {data.annual_worker_training_stats.length ===
                                    0 && (
                                    <div className="rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center">
                                        <p className="text-xs font-semibold text-[#64748B]">
                                            Belum ada data pelatihan
                                        </p>
                                    </div>
                                )}
                                {data.annual_worker_training_stats.map(
                                    (row, index) => (
                                        <div
                                            key={index}
                                            className="grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2"
                                        >
                                            <div className="grid gap-3 sm:col-span-2 sm:grid-cols-3">
                                                <TextInput
                                                    label="Tahun"
                                                    value={row.year}
                                                    onChange={(value) =>
                                                        updateAnnualWorkerTrainingStat(
                                                            index,
                                                            {
                                                                year: digitsOnly(
                                                                    value,
                                                                ),
                                                            },
                                                        )
                                                    }
                                                    error={fieldError(
                                                        errors,
                                                        `annual_worker_training_stats.${index}.year`,
                                                    )}
                                                    placeholder="2024"
                                                />
                                                <TextInput
                                                    label="Nama Pelatihan"
                                                    value={row.training_name}
                                                    onChange={(value) =>
                                                        updateAnnualWorkerTrainingStat(
                                                            index,
                                                            {
                                                                training_name:
                                                                    value,
                                                            },
                                                        )
                                                    }
                                                    error={fieldError(
                                                        errors,
                                                        `annual_worker_training_stats.${index}.training_name`,
                                                    )}
                                                    placeholder="Pelatihan hospitality"
                                                />
                                                <TextInput
                                                    label="Total Peserta"
                                                    value={row.total_people}
                                                    onChange={(value) =>
                                                        updateAnnualWorkerTrainingStat(
                                                            index,
                                                            {
                                                                total_people:
                                                                    digitsOnly(
                                                                        value,
                                                                    ),
                                                            },
                                                        )
                                                    }
                                                    error={fieldError(
                                                        errors,
                                                        `annual_worker_training_stats.${index}.total_people`,
                                                    )}
                                                    placeholder="15"
                                                />
                                            </div>
                                            <div className="flex items-start gap-3 sm:col-span-2">
                                                <div className="flex-1">
                                                    <TextInput
                                                        label="Catatan"
                                                        value={row.notes}
                                                        onChange={(value) =>
                                                            updateAnnualWorkerTrainingStat(
                                                                index,
                                                                {
                                                                    notes: value,
                                                                },
                                                            )
                                                        }
                                                        error={fieldError(
                                                            errors,
                                                            `annual_worker_training_stats.${index}.notes`,
                                                        )}
                                                        placeholder="Opsional"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeAnnualWorkerTrainingStat(
                                                            index,
                                                        )
                                                    }
                                                    className="mt-[22px] inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-3 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]"
                                                >
                                                    <Trash2 className="size-4" />
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    ),
                                )}
                                <button
                                    type="button"
                                    onClick={addAnnualWorkerTrainingStat}
                                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
                                >
                                    <Plus className="size-4" />
                                    Tambah Pelatihan Pekerja
                                </button>
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
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white transition hover:bg-[#093967] disabled:opacity-60"
                        >
                            <Save size={16} />
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </aside>
        </>
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

function PariwisataTrendCharts({ values }: { values: PariwisataEditValues }) {
    const [selectedVisitorYear, setSelectedVisitorYear] = useState('');
    const [visibleSeries, setVisibleSeries] = useState<
        'all' | 'omset' | 'pengunjung'
    >('all');

    const trendChartData = useMemo(() => buildTrendChartData(values), [values]);
    const visitorYears = useMemo(
        () =>
            Array.from(
                new Set(
                    values.visitor_type_annuals
                        .map((row) => row.year)
                        .filter(Boolean),
                ),
            ).sort((left, right) => Number(right) - Number(left)),
        [values.visitor_type_annuals],
    );

    const activeVisitorYear = selectedVisitorYear || visitorYears[0] || '';

    const pieChartData = useMemo(
        () =>
            activeVisitorYear
                ? buildVisitorPieData(values, activeVisitorYear)
                : [],
        [activeVisitorYear, values],
    );

    const trendChartConfig = {
        omset: {
            label: 'Omset Tahunan',
            color: '#0066AE',
        },
        pengunjung: {
            label: 'Pengunjung Tahunan',
            color: '#22C55E',
        },
    } satisfies ChartConfig;

    const pieChartConfig = pieChartData.reduce<ChartConfig>((config, row) => {
        config[row.type] = {
            label: row.label,
            color: row.fill,
        };

        return config;
    }, {});

    return (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
            <Card className="overflow-hidden p-5">
                <div className="flex flex-col gap-4 border-b border-[#E7ECF2] pb-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h2 className="text-base font-bold text-[#303030]">
                            Omset & Pengunjung Tahunan
                        </h2>
                        <p className="text-sm font-semibold text-[#7C7C7C]">
                            Perbandingan performa bisnis dan trafik pengunjung
                            per tahun.
                        </p>
                    </div>
                    <ToggleGroup
                        type="single"
                        value={visibleSeries}
                        onValueChange={(value) => {
                            if (value) {
                                setVisibleSeries(
                                    value as 'all' | 'omset' | 'pengunjung',
                                );
                            }
                        }}
                        variant="outline"
                        size="sm"
                        className="w-fit"
                    >
                        <ToggleGroupItem value="all">Semua</ToggleGroupItem>
                        <ToggleGroupItem value="omset">Omset</ToggleGroupItem>
                        <ToggleGroupItem value="pengunjung">
                            Pengunjung
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>

                {trendChartData.length > 0 ? (
                    <div className="pt-5">
                        <ChartContainer
                            config={trendChartConfig}
                            className="h-[320px] w-full"
                        >
                            <AreaChart
                                data={trendChartData}
                                margin={{ left: 12, right: 12, top: 8 }}
                            >
                                <defs>
                                    <linearGradient
                                        id="fillOmset"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-omset)"
                                            stopOpacity={0.32}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-omset)"
                                            stopOpacity={0.04}
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="fillPengunjung"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-pengunjung)"
                                            stopOpacity={0.28}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-pengunjung)"
                                            stopOpacity={0.04}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="year"
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    width={72}
                                    tickFormatter={(value) =>
                                        visibleSeries === 'pengunjung'
                                            ? formatVisitorCount(Number(value))
                                            : formatCompactRupiah(Number(value))
                                    }
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(label) =>
                                                `Tahun ${label}`
                                            }
                                            valueFormatter={(value, key) =>
                                                key === 'pengunjung'
                                                    ? formatVisitorCount(value)
                                                    : formatCompactRupiah(value)
                                            }
                                        />
                                    }
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                                {visibleSeries !== 'pengunjung' && (
                                    <Area
                                        type="monotone"
                                        dataKey="omset"
                                        stroke="var(--color-omset)"
                                        fill="url(#fillOmset)"
                                        strokeWidth={2.5}
                                        activeDot={{ r: 5 }}
                                    />
                                )}
                                {visibleSeries !== 'omset' && (
                                    <Area
                                        type="monotone"
                                        dataKey="pengunjung"
                                        stroke="var(--color-pengunjung)"
                                        fill="url(#fillPengunjung)"
                                        strokeWidth={2.5}
                                        activeDot={{ r: 5 }}
                                    />
                                )}
                            </AreaChart>
                        </ChartContainer>
                    </div>
                ) : (
                    <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-[#F8FBFE] text-center">
                        <div>
                            <p className="text-sm font-bold text-[#303030]">
                                Belum ada data omset atau pengunjung tahunan
                            </p>
                            <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                Isi data tahunan pada form pariwisata untuk
                                menampilkan grafik ini.
                            </p>
                        </div>
                    </div>
                )}
            </Card>

            <Card className="overflow-hidden p-5">
                <div className="flex flex-col gap-4 border-b border-[#E7ECF2] pb-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="text-base font-bold text-[#303030]">
                            Jenis Pengunjung Tahunan
                        </h2>
                        <p className="text-sm font-semibold text-[#7C7C7C]">
                            Komposisi pengunjung berdasarkan tahun terpilih.
                        </p>
                    </div>
                    <div className="w-full sm:w-[170px]">
                        <Select
                            value={activeVisitorYear}
                            onValueChange={setSelectedVisitorYear}
                            disabled={visitorYears.length === 0}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                {visitorYears.map((year) => (
                                    <SelectItem key={year} value={year}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {pieChartData.length > 0 ? (
                    <div className="pt-5">
                        <ChartContainer
                            config={pieChartConfig}
                            className="mx-auto h-[320px] max-w-[360px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            hideLabel
                                            valueFormatter={(value) =>
                                                formatVisitorCount(value)
                                            }
                                        />
                                    }
                                />
                                <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    nameKey="label"
                                    innerRadius={52}
                                    outerRadius={96}
                                    paddingAngle={3}
                                    labelLine={false}
                                    label={({
                                        cx,
                                        cy,
                                        midAngle,
                                        outerRadius,
                                        percent,
                                        payload,
                                    }) => {
                                        const RADIAN = Math.PI / 180;
                                        const safeMidAngle = midAngle ?? 0;
                                        const safePercent = percent ?? 0;
                                        const radius =
                                            Number(outerRadius ?? 0) + 22;
                                        const x =
                                            Number(cx ?? 0) +
                                            radius *
                                                Math.cos(
                                                    -safeMidAngle * RADIAN,
                                                );
                                        const y =
                                            Number(cy ?? 0) +
                                            radius *
                                                Math.sin(
                                                    -safeMidAngle * RADIAN,
                                                );

                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill={payload.fill}
                                                textAnchor={
                                                    x > Number(cx ?? 0)
                                                        ? 'start'
                                                        : 'end'
                                                }
                                                dominantBaseline="central"
                                                className="text-[11px] font-bold"
                                            >
                                                {`${payload.label} ${(safePercent * 100).toFixed(0)}%`}
                                            </text>
                                        );
                                    }}
                                >
                                    {pieChartData.map((entry) => (
                                        <Cell
                                            key={entry.type}
                                            fill={entry.fill}
                                        />
                                    ))}
                                </Pie>
                                <ChartLegend
                                    verticalAlign="bottom"
                                    align="center"
                                    content={
                                        <ChartLegendContent className="justify-center pt-4" />
                                    }
                                />
                            </PieChart>
                        </ChartContainer>
                    </div>
                ) : (
                    <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-[#F8FBFE] text-center">
                        <div>
                            <p className="text-sm font-bold text-[#303030]">
                                Belum ada data jenis pengunjung
                            </p>
                            <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                Pilih tahun lain atau isi data jenis pengunjung
                                tahunan terlebih dahulu.
                            </p>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}

function SurveyStatistics({ groups }: { groups: SurveyGroup[] }) {
    const answers = groups.flatMap((group) =>
        group.questions.map((q) => q.answer).filter(Boolean),
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
                        {groups.map((group) => {
                            const scorePercent =
                                group.max_score > 0
                                    ? (group.score / group.max_score) * 100
                                    : 0;
                            const bucket = scoreBucketFor(scorePercent);

                            return (
                                <div
                                    key={group.category_name}
                                    className="grid gap-2 md:grid-cols-[180px_minmax(0,1fr)_52px] md:items-center"
                                >
                                    <p
                                        className="truncate text-xs font-bold text-[#344256]"
                                        title={group.category_name}
                                    >
                                        {group.category_name}
                                    </p>
                                    <div className="relative h-7 overflow-hidden rounded-full bg-[#EEF3F8]">
                                        <div className="absolute inset-y-0 left-0 w-1/5 border-r border-white/90" />
                                        <div className="absolute inset-y-0 left-[40%] w-px bg-white/90" />
                                        <div className="absolute inset-y-0 left-[60%] w-px bg-white/90" />
                                        <div className="absolute inset-y-0 left-[80%] w-px bg-white/90" />
                                        <div
                                            className="h-full rounded-full transition-[width]"
                                            style={{
                                                width: `${clampScore(scorePercent)}%`,
                                                backgroundColor: bucket.color,
                                            }}
                                        />
                                    </div>
                                    <p className="text-right text-xs font-black text-[#303030]">
                                        {formatStatScore(scorePercent)}
                                    </p>
                                </div>
                            );
                        })}
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
                                    distribution.map((bucket) => {
                                        const length =
                                            (bucket.percentage / 100) *
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
                            {distribution.map((bucket) => (
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
                                        {formatStatScore(bucket.percentage)}%)
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

function PariwisataSurveyScoreCharts({
    summary,
}: {
    summary: PariwisataSurveySummary;
}) {
    const aspects = summary.aspects;
    const radarData = aspects.map((aspect) => ({
        name:
            aspect.name.length > 18
                ? aspect.name.slice(0, 18) + '...'
                : aspect.name,
        fullName: aspect.name,
        score: aspect.score_percent,
    }));

    if (radarData.length === 1) {
        radarData.push({ name: ' ', fullName: ' ', score: 0 });
        radarData.push({ name: '  ', fullName: '  ', score: 0 });
    } else if (radarData.length === 2) {
        radarData.push({ name: ' ', fullName: ' ', score: 0 });
    }

    return (
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.25fr_1fr]">
            <Card className="min-h-[360px] p-6">
                <h2 className="text-base font-bold text-[#111827]">Skor Akhir Survey</h2>
                <p className="mt-1 text-sm font-medium text-[#8A97A8]">Nilai kesiapan keseluruhan</p>
                <div className="mt-9 flex flex-col items-center">
                    <div
                        className="grid size-48 place-items-center rounded-full"
                        style={{ background: 'conic-gradient(#0066AE ' + clampScore(summary.final_score) + '%, #EAF3FF 0)' }}
                    >
                        <div className="grid size-40 place-items-center rounded-full bg-white text-center">
                            <p className="text-4xl font-black text-[#093967]">{formatStatScore(summary.final_score)}</p>
                            <p className="text-xs font-bold text-[#7C7C7C]">dari 100</p>
                        </div>
                    </div>
                    <p className="mt-5 text-sm font-bold text-[#303030]">
                        {summary.total_score} / {summary.max_score} poin
                    </p>
                </div>
            </Card>

            <Card className="min-h-[360px] p-6">
                <h2 className="text-base font-bold text-[#111827]">Skor per Aspek</h2>
                <p className="mt-1 text-sm font-medium text-[#8A97A8]">Total skor per aspek</p>
                <div className="mt-6 h-[260px]">
                    {aspects.length === 0 ? (
                        <div className="grid h-full place-items-center rounded-xl bg-[#F8FBFE] text-sm font-semibold text-[#8A97A8]">Belum ada data aspek</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={aspects} layout="vertical" margin={{ left: 8, right: 24 }}>
                                <CartesianGrid horizontal={false} stroke="#EAF0F6" />
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis dataKey="name" type="category" width={110} tick={{ fill: '#667085', fontSize: 11, fontWeight: 700 }} />
                                <Tooltip
                                    formatter={(value, _name, item) => [
                                        Number(value).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + '% (' + item.payload.score + '/' + item.payload.max_score + ')',
                                        'Skor',
                                    ]}
                                    contentStyle={{ border: '1px solid #E5EDF6', borderRadius: '12px', fontSize: '12px' }}
                                />
                                <Bar dataKey="score_percent" fill="#0066AE" radius={[0, 6, 6, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </Card>

            <Card className="min-h-[360px] p-6">
                <h2 className="text-base font-bold text-[#111827]">Perbandingan Aspek (Radar)</h2>
                <p className="mt-1 text-sm font-medium text-[#8A97A8]">Visualisasi nilai antar aspek</p>
                <div className="mt-5 h-[260px]">
                    {aspects.length === 0 ? (
                        <div className="grid h-full place-items-center rounded-xl bg-[#F8FBFE] text-sm font-semibold text-[#8A97A8]">Belum ada data aspek</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radarData} outerRadius="66%">
                                <PolarGrid stroke="#E4EAF2" />
                                <PolarAngleAxis dataKey="name" tick={{ fill: '#667085', fontSize: 10, fontWeight: 700 }} />
                                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#98A2B3', fontSize: 9 }} axisLine={false} />
                                <Radar dataKey="score" stroke="#0066AE" strokeWidth={2} fill="#0066AE" fillOpacity={0.22} />
                                <Tooltip
                                    formatter={(value) => [formatStatScore(Number(value)) + '%', 'Skor']}
                                    labelFormatter={(label) => radarData.find((item) => item.name === label)?.fullName ?? label}
                                    contentStyle={{ border: '1px solid #E5EDF6', borderRadius: '12px', fontSize: '12px' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default function ShowPariwisata({
    assignment,
    pariwisata,
    category_options,
    pariwisata_survey_summary,
    edit_values,
}: ShowPariwisataProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const editForm = useForm<PariwisataEditForm>(initialEditForm(edit_values));

    function closeEditSidebar() {
        setIsEditOpen(false);
        editForm.clearErrors();
    }

    function submitEdit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        editForm.post(
            updatePariwisata.url({
                assignment: assignment.code,
                pariwisata: pariwisata.id,
            }),
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: closeEditSidebar,
            },
        );
    }


    return (
        <>
            <Head title={`Detail Pariwisata - ${pariwisata.name}`} />

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
                                <span className="text-[#7C7C7C]">
                                    Pariwisata
                                </span>
                            </div>
                            <h1 className="mt-2 text-2xl leading-tight font-bold text-[#303030] sm:text-[28px]">
                                Detail Pariwisata
                            </h1>
                            <p className="mt-1 max-w-3xl text-sm leading-6 font-semibold text-[#7C7C7C]">
                                Halaman ini hanya menampilkan master data
                                pariwisata. Survey pariwisata dikerjakan dari
                                detail assignment.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Link href={showAssignment.url(assignment.code)}>
                                <span className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]">
                                    <ArrowLeft size={16} />
                                    Kembali
                                </span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => setIsEditOpen(true)}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967]"
                            >
                                <Pencil size={16} />
                                Edit Data
                            </button>
                        </div>
                    </div>

                    <Card className="overflow-hidden">
                        <div className="border-b border-[#EFEFEF] bg-[#F8FBFE] p-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex min-w-0 gap-4">
                                    {pariwisata.image_url && (
                                        <img
                                            src={pariwisata.image_url}
                                            alt={pariwisata.name}
                                            className="hidden h-24 w-32 shrink-0 rounded-xl border border-[#DDE4EC] object-cover sm:block"
                                        />
                                    )}
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap gap-2">
                                            <span
                                                className={classNames(
                                                    'rounded-full px-3 py-1 text-xs font-bold',
                                                    pariwisata.is_active
                                                        ? 'bg-[#EAF8F0] text-[#00893D]'
                                                        : 'bg-[#F1F5F8] text-[#7C7C7C]',
                                                )}
                                            >
                                                {pariwisata.status_label}
                                            </span>
                                            {pariwisata.categories.map(
                                                (category) => (
                                                    <span
                                                        key={category.id}
                                                        className="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-bold text-[#0066AE]"
                                                    >
                                                        {category.label}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                        <h2 className="mt-3 text-xl font-bold text-[#303030]">
                                            {pariwisata.name}
                                        </h2>
                                        <p className="mt-1 text-sm font-semibold text-[#7C7C7C]">
                                            {assignment.village.name} ·{' '}
                                            {assignment.village.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
                            <InfoItem
                                icon={<MapPin size={17} />}
                                label="Alamat"
                                value={pariwisata.address}
                            />
                            <InfoItem
                                icon={<CalendarDays size={17} />}
                                label="Hari Operasional"
                                value={pariwisata.operational_days}
                            />
                            <InfoItem
                                icon={<CalendarDays size={17} />}
                                label="Jam Operasional"
                                value={pariwisata.operational_hours}
                            />
                            <InfoItem
                                icon={<Ticket size={17} />}
                                label="Harga Tiket"
                                value={pariwisata.entrance_ticket_price}
                            />
                            <InfoItem
                                icon={<UserRound size={17} />}
                                label="PIC"
                                value={pariwisata.person_in_charge_name}
                            />
                            <InfoItem
                                icon={<UserRound size={17} />}
                                label="Telepon PIC"
                                value={pariwisata.person_in_charge_phone}
                            />
                        </div>
                    </Card>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            [
                                'Total Skor',
                                pariwisata_survey_summary.total_score +
                                    ' / ' +
                                    pariwisata_survey_summary.max_score,
                            ],
                            [
                                'Aspek Tertinggi',
                                pariwisata_survey_summary.highest_aspect
                                    ?.name ?? '-',
                            ],
                            [
                                'Aspek Terendah',
                                pariwisata_survey_summary.lowest_aspect
                                    ?.name ?? '-',
                            ],
                        ].map(([label, value]) => (
                            <Card key={label} className="p-4">
                                <p className="text-xs font-bold text-[#7C7C7C]">
                                    {label}
                                </p>
                                <p className="mt-2 text-2xl font-bold text-[#303030]">
                                    {value}
                                </p>
                            </Card>
                        ))}
                    </div>

                    <PariwisataSurveyScoreCharts
                        summary={pariwisata_survey_summary}
                    />

                    <PariwisataTrendCharts values={edit_values} />

                    <Card className="overflow-hidden">
                        <div className="border-b border-[#EFEFEF] p-4">
                            <h2 className="text-base font-bold text-[#303030]">
                                Ringkasan Master Data
                            </h2>
                            <p className="mt-1 text-sm font-semibold text-[#7C7C7C]">
                                Paket, data pekerja, dan kontak utama destinasi.
                            </p>
                        </div>

                        <div className="grid gap-4 p-4 lg:grid-cols-2">
                            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FBFE] p-4">
                                <h3 className="text-sm font-bold text-[#303030]">
                                    Paket Wisata
                                </h3>
                                <div className="mt-3 space-y-3">
                                    {(edit_values.packages || []).length ===
                                        0 && (
                                        <p className="text-sm font-semibold text-[#7C7C7C]">
                                            Belum ada paket wisata.
                                        </p>
                                    )}
                                    {(edit_values.packages || []).map(
                                        (pkg, index) => (
                                            <div
                                                key={`${pkg.name}-${index}`}
                                                className="rounded-xl bg-white px-4 py-3 ring-1 ring-[#E4EAF0]"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-[#303030]">
                                                            {pkg.name || '-'}
                                                        </p>
                                                        <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                                            {pkg.package_type ||
                                                                'Tanpa tipe'}{' '}
                                                            ·{' '}
                                                            {pkg.duration ||
                                                                'Durasi belum diisi'}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className={classNames(
                                                            'rounded-full px-2.5 py-1 text-[11px] font-bold',
                                                            pkg.is_active
                                                                ? 'bg-[#EAF8F0] text-[#00893D]'
                                                                : 'bg-[#F1F5F8] text-[#7C7C7C]',
                                                        )}
                                                    >
                                                        {pkg.is_active
                                                            ? 'Aktif'
                                                            : 'Nonaktif'}
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-sm font-semibold text-[#344256]">
                                                    {pkg.description ||
                                                        'Deskripsi belum diisi'}
                                                </p>
                                                <p className="mt-2 text-xs font-bold text-[#0066AE]">
                                                    Harga:{' '}
                                                    {pkg.price
                                                        ? `Rp ${formatThousands(pkg.price)}`
                                                        : '-'}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FBFE] p-4">
                                <h3 className="text-sm font-bold text-[#303030]">
                                    Data Pekerja & Pelatihan
                                </h3>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-[#E4EAF0]">
                                        <p className="text-xs font-semibold text-[#7C7C7C]">
                                            Statistik pekerja
                                        </p>
                                        <p className="mt-1 text-2xl font-bold text-[#303030]">
                                            {
                                                (
                                                    edit_values.annual_worker_stats ||
                                                    []
                                                ).length
                                            }
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-[#E4EAF0]">
                                        <p className="text-xs font-semibold text-[#7C7C7C]">
                                            Statistik pelatihan
                                        </p>
                                        <p className="mt-1 text-2xl font-bold text-[#303030]">
                                            {
                                                (
                                                    edit_values.annual_worker_training_stats ||
                                                    []
                                                ).length
                                            }
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-[#E4EAF0] sm:col-span-2">
                                        <p className="text-xs font-semibold text-[#7C7C7C]">
                                            Alamat PIC
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-[#303030]">
                                            {pariwisata.person_in_charge_address ??
                                                '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
            <PariwisataEditSidebar
                open={isEditOpen}
                onClose={closeEditSidebar}
                assignment={assignment}
                form={editForm}
                categoryOptions={category_options}
                imageUrl={pariwisata.image_url}
                onSubmit={submitEdit}
            />
        </>
    );
}
