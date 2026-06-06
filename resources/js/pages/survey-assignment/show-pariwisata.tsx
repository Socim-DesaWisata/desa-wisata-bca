import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    ClipboardList,
    Download,
    Eye,
    FileText,
    MapPin,
    RefreshCcw,
    Search,
    Ticket,
    UserRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { dashboard, surveyAssignments } from '@/routes';
import { show as showAssignment } from '@/routes/survey-assignments';
import { takeSurvey as takePariwisataSurvey } from '@/routes/survey-assignments/pariwisata';

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

export default function ShowPariwisata({
    assignment,
    pariwisata,
    survey_template,
    survey_summary,
    survey_groups,
}: ShowPariwisataProps) {
    const [search, setSearch] = useState('');
    const [groupFilter, setGroupFilter] = useState('all');
    const [detailQuestion, setDetailQuestion] = useState<SurveyQuestion | null>(
        null,
    );

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
        </>
    );
}
