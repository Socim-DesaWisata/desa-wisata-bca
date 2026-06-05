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
    RefreshCcw,
    Save,
    Search,
    ShieldCheck,
    Star,
    Trophy,
    UserRound,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
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
    takeSurvey,
    update as updateSurveyAssignment,
} from '@/routes/survey-assignments';
import {
    show as showPariwisata,
    takeSurvey as takePariwisataSurvey,
} from '@/routes/survey-assignments/pariwisata';
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

type SurveyAssignmentShowProps = {
    assignment: {
        id: number;
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

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
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

function ScoreBar({ aspect }: { aspect: SurveyAspect }) {
    const color =
        aspect.score_percent < 70
            ? '#FF944C'
            : aspect.score_percent >= 85
              ? '#00893D'
              : '#0066AE';

    return (
        <div className="grid grid-cols-[130px_1fr_64px] items-center gap-3">
            <span className="truncate text-xs font-bold text-[#303030]">
                {aspect.name}
            </span>
            <div className="h-2 overflow-hidden rounded-full bg-[#E8ECF2]">
                <div
                    className="h-full rounded-full"
                    style={{
                        width: `${Math.min(aspect.score_percent, 100)}%`,
                        backgroundColor: color,
                    }}
                />
            </div>
            <span className="text-right text-xs font-bold" style={{ color }}>
                {aspect.score_percent}
            </span>
        </div>
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
                <p className="text-[11px] font-bold text-[#7C7C7C]">
                    {question.code}
                </p>
                <p className="mt-1 text-sm leading-5 font-semibold text-[#303030]">
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
    assignmentId,
}: {
    umkms: UmkmData[];
    assignmentId: number;
}) {
    const totalAnswers = umkms.reduce(
        (total, umkm) => total + umkm.survey_summary.answered_questions,
        0,
    );
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
                <Link href={createUmkm.url(assignmentId)}>
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
                    label="Jawaban Survey"
                    value={String(totalAnswers)}
                    helper="Total jawaban"
                    icon={<ClipboardCheck size={22} />}
                />
                <MetricCard
                    label="Status Data"
                    value={umkms.length ? 'Tersedia' : 'Kosong'}
                    helper="UMKM assignment"
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
                            assignmentId={assignmentId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function UmkmCard({
    umkm,
    assignmentId,
}: {
    umkm: UmkmData;
    assignmentId: number;
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
                            assignment: assignmentId,
                            umkm: umkm.id,
                        })}
                        className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                    >
                        <Eye size={14} />
                        Lihat Detail UMKM
                    </Link>
                </div>
            </div>
        </Card>
    );
}

function PariwisataTab({
    pariwisata,
    assignmentId,
}: {
    pariwisata: PariwisataData[];
    assignmentId: number;
}) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-xl border border-[#D7E8F8] bg-[#F8FBFE] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-base font-bold text-[#303030]">
                        Data Master Pariwisata
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-[#7C7C7C]">
                        Tab ini hanya menampilkan master pariwisata. Survey
                        dibuka dari halaman detail pariwisata.
                    </p>
                </div>
                <Link href={createPariwisata.url(assignmentId)}>
                    <Button variant="primary">
                        <MapPin size={16} />
                        Tambah Pariwisata
                    </Button>
                </Link>
            </div>

            {pariwisata.length === 0 ? (
                <EmptyState
                    title="Belum ada data pariwisata"
                    description="Tambahkan master pariwisata untuk desa pada assignment ini."
                />
            ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                    {pariwisata.map((item) => (
                        <PariwisataCard
                            key={item.id}
                            item={item}
                            assignmentId={assignmentId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function PariwisataCard({
    item,
    assignmentId,
}: {
    item: PariwisataData;
    assignmentId: number;
}) {
    return (
        <Card className="p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className={classNames(
                                'rounded-full px-3 py-1 text-xs font-bold',
                                item.is_active
                                    ? 'bg-[#EAF8F0] text-[#00893D]'
                                    : 'bg-[#F1F5F8] text-[#7C7C7C]',
                            )}
                        >
                            {item.status_label}
                        </span>
                        {item.categories.map((category) => (
                            <span
                                key={category.id}
                                className="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-bold text-[#0066AE]"
                            >
                                {category.label}
                            </span>
                        ))}
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-[#303030]">
                        {item.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-[#7C7C7C]">
                        {item.address ?? '-'}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link
                        href={takePariwisataSurvey.url({
                            assignment: assignmentId,
                            pariwisata: item.id,
                        })}
                    >
                        <Button variant="primary">
                            <ClipboardList size={16} />
                            Isi Survey
                        </Button>
                    </Link>
                    <Link
                        href={showPariwisata.url({
                            assignment: assignmentId,
                            pariwisata: item.id,
                        })}
                    >
                        <Button>
                            <Eye size={16} />
                            Lihat Detail
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <DetailPair
                    label="Hari Operasional"
                    value={item.operational_days}
                />
                <DetailPair label="Jam" value={item.operational_hours} />
                <DetailPair
                    label="Harga Tiket"
                    value={item.entrance_ticket_price}
                />
                <DetailPair label="PIC" value={item.person_in_charge_name} />
                <DetailPair
                    label="Telepon PIC"
                    value={item.person_in_charge_phone}
                />
                <DetailPair label="Update" value={item.updated_at} />
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
                        <p className="text-xs font-bold text-[#0066AE]">
                            {question.code}
                        </p>
                        <h3 className="mt-2 text-base leading-6 font-bold text-[#303030]">
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
    activities,
    edit_options,
    edit_values,
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
    const { data, setData, patch, processing, errors, clearErrors, reset } =
        useForm<AssignmentEditForm>(edit_values);

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
                                question.code.toLowerCase().includes(value) ||
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

    function submitAssignment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        patch(updateSurveyAssignment.url(assignment.id), {
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
                            <Link href={takeSurvey.url(assignment.id)}>
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
                                label="Desa"
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
                                label="Pariwisata"
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
                                                    value={`ASG-${String(assignment.id).padStart(3, '0')}`}
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
                                                    label="Enumerator"
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

                                <Card className="p-4">
                                    <h3 className="text-sm font-bold text-[#303030]">
                                        Skor per Aspek
                                    </h3>
                                    <div className="mt-4 grid gap-x-8 gap-y-3 lg:grid-cols-2">
                                        {aspects.map((aspect) => (
                                            <ScoreBar
                                                key={aspect.name}
                                                aspect={aspect}
                                            />
                                        ))}
                                    </div>
                                </Card>

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
                                assignmentId={assignment.id}
                            />
                        </div>
                    )}

                    {activeTab === 'pariwisata' && (
                        <div className="mt-5">
                            <PariwisataTab
                                pariwisata={pariwisata}
                                assignmentId={assignment.id}
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
                            ASG-{String(assignment.id).padStart(3, '0')}
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
