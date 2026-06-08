import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    ClipboardList,
    Download,
    Eye,
    FileText,
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
    takeSurvey as takePariwisataSurvey,
    update as updatePariwisata,
    exportMethod as exportPariwisataSurvey,
} from '@/routes/survey-assignments/pariwisata';

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
    questions: SurveyQuestion[];
};

type ShowPariwisataProps = {
    assignment: Assignment;
    pariwisata: Pariwisata;
    category_options: CategoryOption[];
    edit_values: PariwisataEditValues;
    survey_template: SurveyTemplate | null;
    survey_summary: {
        total_questions: number;
        answered_questions: number;
        unanswered_questions: number;
        total_documents: number;
        total_score: number;
        max_score: number;
        final_score: number;
    };
    survey_groups: SurveyGroup[];
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
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    assignment: Assignment;
    form: ReturnType<typeof useForm<PariwisataEditForm>>;
    categoryOptions: CategoryOption[];
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
                                        className="grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)_40px] sm:items-start"
                                    >
                                        <TextInput
                                            label="Tahun"
                                            value={row.year}
                                            onChange={(value) =>
                                                updateAnnualTurnover(index, {
                                                    year: digitsOnly(value),
                                                })
                                            }
                                            error={fieldError(
                                                errors,
                                                `annual_turnovers.${index}.year`,
                                            )}
                                            placeholder="2024"
                                        />
                                        <TextInput
                                            label="Nilai Omset"
                                            value={formatThousands(row.value)}
                                            onChange={(value) =>
                                                updateAnnualTurnover(index, {
                                                    value: digitsOnly(value),
                                                })
                                            }
                                            error={fieldError(
                                                errors,
                                                `annual_turnovers.${index}.value`,
                                            )}
                                            placeholder="Nominal rupiah"
                                        />
                                        <TextInput
                                            label="Catatan"
                                            value={row.notes}
                                            onChange={(value) =>
                                                updateAnnualTurnover(index, {
                                                    notes: value,
                                                })
                                            }
                                            error={fieldError(
                                                errors,
                                                `annual_turnovers.${index}.notes`,
                                            )}
                                            placeholder="Opsional"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeAnnualTurnover(index)
                                            }
                                            className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] sm:mt-[22px] sm:w-10"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
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
                                        className="grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)_40px] sm:items-start"
                                    >
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
                                                    value: digitsOnly(value),
                                                })
                                            }
                                            error={fieldError(
                                                errors,
                                                `annual_visitors.${index}.value`,
                                            )}
                                            placeholder="1250"
                                        />
                                        <TextInput
                                            label="Catatan"
                                            value={row.notes}
                                            onChange={(value) =>
                                                updateAnnualVisitor(index, {
                                                    notes: value,
                                                })
                                            }
                                            error={fieldError(
                                                errors,
                                                `annual_visitors.${index}.notes`,
                                            )}
                                            placeholder="Opsional"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeAnnualVisitor(index)
                                            }
                                            className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] sm:mt-[22px] sm:w-10"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
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
                                        className="grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)_40px] sm:items-start"
                                    >
                                        <TextInput
                                            label="Tahun"
                                            value={row.year}
                                            onChange={(value) =>
                                                updateVisitorTypeAnnual(index, {
                                                    year: digitsOnly(value),
                                                })
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
                                                updateVisitorTypeAnnual(index, {
                                                    visitor_type: value,
                                                })
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
                                                updateVisitorTypeAnnual(index, {
                                                    value: digitsOnly(value),
                                                })
                                            }
                                            error={fieldError(
                                                errors,
                                                `visitor_type_annuals.${index}.value`,
                                            )}
                                            placeholder="500"
                                        />
                                        <TextInput
                                            label="Catatan"
                                            value={row.notes}
                                            onChange={(value) =>
                                                updateVisitorTypeAnnual(index, {
                                                    notes: value,
                                                })
                                            }
                                            error={fieldError(
                                                errors,
                                                `visitor_type_annuals.${index}.notes`,
                                            )}
                                            placeholder="Opsional"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeVisitorTypeAnnual(index)
                                            }
                                            className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] sm:mt-[22px] sm:w-10"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
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
                                        <div className="grid gap-3 sm:grid-cols-2">
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
                                        className="grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-[140px_160px_minmax(0,1fr)_40px] sm:items-start"
                                    >
                                        <TextInput
                                            label="Tahun"
                                            value={row.year}
                                            onChange={(value) =>
                                                updateAnnualWorkerStat(index, {
                                                    year: digitsOnly(value),
                                                })
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
                                                updateAnnualWorkerStat(index, {
                                                    dimension: value,
                                                })
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
                                                updateAnnualWorkerStat(index, {
                                                    category_value: value,
                                                })
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
                                                updateAnnualWorkerStat(index, {
                                                    total_people:
                                                        digitsOnly(value),
                                                })
                                            }
                                            error={fieldError(
                                                errors,
                                                `annual_worker_stats.${index}.total_people`,
                                            )}
                                            placeholder="10"
                                        />
                                        <TextInput
                                            label="Catatan"
                                            value={row.notes}
                                            onChange={(value) =>
                                                updateAnnualWorkerStat(index, {
                                                    notes: value,
                                                })
                                            }
                                            error={fieldError(
                                                errors,
                                                `annual_worker_stats.${index}.notes`,
                                            )}
                                            placeholder="Opsional"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeAnnualWorkerStat(index)
                                            }
                                            className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] sm:mt-[22px] sm:w-10"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
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
                                            className="grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-[140px_minmax(0,1fr)_160px_40px] sm:items-start"
                                        >
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
                                            <TextInput
                                                label="Catatan"
                                                value={row.notes}
                                                onChange={(value) =>
                                                    updateAnnualWorkerTrainingStat(
                                                        index,
                                                        { notes: value },
                                                    )
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `annual_worker_training_stats.${index}.notes`,
                                                )}
                                                placeholder="Opsional"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeAnnualWorkerTrainingStat(
                                                        index,
                                                    )
                                                }
                                                className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] sm:mt-[22px] sm:w-10"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
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

export default function ShowPariwisata({
    assignment,
    pariwisata,
    category_options,
    edit_values,
    survey_template,
    survey_summary,
    survey_groups,
}: ShowPariwisataProps) {
    const [search, setSearch] = useState('');
    const [groupFilter, setGroupFilter] = useState('all');
    const [detailQuestion, setDetailQuestion] = useState<SurveyQuestion | null>(
        null,
    );
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
                preserveScroll: true,
                onSuccess: closeEditSidebar,
            },
        );
    }

    const filteredGroups = useMemo(
        () =>
            survey_groups
                .filter(
                    (group) =>
                        groupFilter === 'all' ||
                        group.category_name === groupFilter,
                )
                .map((group) => ({
                    ...group,
                    questions: group.questions.filter((question) => {
                        const keyword = search.toLowerCase();

                        return (
                            keyword === '' ||
                            group.category_name
                                .toLowerCase()
                                .includes(keyword) ||
                            question.indicator_code
                                .toLowerCase()
                                .includes(keyword) ||
                            question.indicator_name
                                .toLowerCase()
                                .includes(keyword) ||
                            (question.criteria_name ?? '')
                                .toLowerCase()
                                .includes(keyword) ||
                            (question.answer?.score_label ?? '')
                                .toLowerCase()
                                .includes(keyword)
                        );
                    }),
                }))
                .filter((group) => group.questions.length > 0),
        [groupFilter, search, survey_groups],
    );

    const questionStartNumbers = useMemo(
        () =>
            filteredGroups.reduce<{
                positions: Record<string, number>;
                total: number;
            }>(
                (state, group) => ({
                    positions: {
                        ...state.positions,
                        [group.category_name]: state.total,
                    },
                    total: state.total + group.questions.length,
                }),
                {
                    positions: {},
                    total: 0,
                },
            ).positions,
        [filteredGroups],
    );

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
                                Master pariwisata desa dan struktur pertanyaan
                                survey pariwisata.
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
                            <a
                                href={exportPariwisataSurvey.url({
                                    assignment: assignment.code,
                                    pariwisata: pariwisata.id,
                                })}
                            >
                                <span className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]">
                                    <Download size={16} />
                                    Export Excel
                                </span>
                            </a>
                            <Link
                                href={takePariwisataSurvey.url({
                                    assignment: assignment.code,
                                    pariwisata: pariwisata.id,
                                })}
                            >
                                <span className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967]">
                                    <ClipboardList size={16} />
                                    Isi Survey
                                </span>
                            </Link>
                        </div>
                    </div>

                    <Card className="overflow-hidden">
                        <div className="border-b border-[#EFEFEF] bg-[#F8FBFE] p-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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
                                <div className="rounded-xl bg-white px-4 py-3 text-right shadow-[0_8px_20px_rgba(9,57,103,0.08)]">
                                    <p className="text-[11px] font-black tracking-[0.06em] text-[#0066AE] uppercase">
                                        Pertanyaan Survey
                                    </p>
                                    <p className="text-2xl font-bold text-[#093967]">
                                        {survey_template?.question_count ?? 0}
                                    </p>
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

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                            [
                                'Total Skor',
                                `${survey_summary.total_score} / ${survey_summary.max_score}`,
                            ],
                            ['Nilai Akhir', String(survey_summary.final_score)],
                            [
                                'Terjawab',
                                `${survey_summary.answered_questions} / ${survey_summary.total_questions}`,
                            ],
                            [
                                'Dokumen',
                                `${survey_summary.total_documents} file`,
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
                                        placeholder="Cari indikator, kategori, kriteria, atau jawaban..."
                                    />
                                </label>
                                <select
                                    value={groupFilter}
                                    onChange={(event) =>
                                        setGroupFilter(event.target.value)
                                    }
                                    className="h-10 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
                                >
                                    <option value="all">Semua Kategori</option>
                                    {survey_groups.map((group) => (
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
                                        setGroupFilter('all');
                                    }}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]"
                                >
                                    <RefreshCcw size={16} />
                                    Reset
                                </button>
                            </div>
                        </div>

                        {filteredGroups.map((group) => (
                            <div key={group.category_name}>
                                <div className="flex w-full flex-col gap-3 border-b border-[#DDE9F6] bg-[#EAF3FF] px-4 py-3 text-left sm:flex-row sm:items-center sm:justify-between">
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-bold text-[#303030]">
                                            {group.category_name}
                                        </h3>
                                        <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                            {group.question_count} indikator ·{' '}
                                            {group.answered_count} terjawab ·{' '}
                                            {group.documents_count} dokumen
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0066AE]">
                                        {group.answered_count}/
                                        {group.question_count}
                                    </span>
                                </div>
                                {group.questions.map((question, index) => (
                                    <QuestionRow
                                        key={question.id}
                                        question={question}
                                        number={
                                            (questionStartNumbers[
                                                group.category_name
                                            ] ?? 0) +
                                            index +
                                            1
                                        }
                                        onViewDetail={setDetailQuestion}
                                    />
                                ))}
                            </div>
                        ))}

                        {filteredGroups.length === 0 && (
                            <div className="px-4 py-12 text-center">
                                <p className="text-sm font-bold text-[#303030]">
                                    Data tidak ditemukan
                                </p>
                                <p className="mt-1 text-xs font-semibold text-[#7C7C7C]">
                                    Ubah pencarian atau filter kategori.
                                </p>
                            </div>
                        )}
                    </Card>
                </div>
            </main>
            <AnswerDetailModal
                question={detailQuestion}
                open={Boolean(detailQuestion)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDetailQuestion(null);
                    }
                }}
            />
            <PariwisataEditSidebar
                open={isEditOpen}
                onClose={closeEditSidebar}
                assignment={assignment}
                form={editForm}
                categoryOptions={category_options}
                onSubmit={submitEdit}
            />
        </>
    );
}
