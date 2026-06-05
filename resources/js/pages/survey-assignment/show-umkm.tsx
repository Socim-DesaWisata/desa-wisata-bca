import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    BadgeDollarSign,
    CalendarDays,
    Camera,
    CheckCircle2,
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
import { update as updateUmkm } from '@/routes/survey-assignments/umkm';
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
};

type UmkmEditForm = UmkmEditValues & {
    _method: 'patch';
    product_photo: File | null;
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
}: {
    label: string;
    value: string;
    helper: string;
    icon: ReactNode;
}) {
    return (
        <Card className="p-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-bold text-[#7C7C7C]">{label}</p>
                    <p className="mt-2 text-2xl leading-7 font-bold text-[#303030]">
                        {value}
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#0066AE]">
                        {helper}
                    </p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]">
                    {icon}
                </span>
            </div>
        </Card>
    );
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
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="space-y-4 rounded-2xl border border-[#E6EDF4] bg-white p-4">
            <h3 className="text-sm font-bold text-[#172033]">{title}</h3>
            {children}
        </section>
    );
}

function QuestionRow({
    answer,
    number,
    onViewDetail,
    onEditAnswer,
}: {
    answer: UmkmSurveyAnswer;
    number: number;
    onViewDetail: (answer: UmkmSurveyAnswer) => void;
    onEditAnswer: (answer: UmkmSurveyAnswer) => void;
}) {
    return (
        <div className="grid gap-3 border-b border-[#EFEFEF] px-4 py-4 last:border-b-0 xl:grid-cols-[38px_minmax(260px,1fr)_104px_78px_118px_180px]">
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
            <div className="flex items-center text-xs">
                <div>
                    <p className="font-semibold text-[#7C7C7C]">
                        Terakhir diedit
                    </p>
                    <p className="mt-1 font-bold text-[#303030]">
                        {answer.last_edited_at}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-end gap-2">
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
            </div>
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
                            File Dokumen {!isEdit && <span className="text-[#D81313]">*</span>}
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
                                    : 'PDF atau gambar, maksimal 5 MB.')}
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
                                    value={data.annual_revenue}
                                    onChange={(value) =>
                                        setData('annual_revenue', value)
                                    }
                                    error={fieldError(errors, 'annual_revenue')}
                                    placeholder="Nominal rupiah"
                                    type="number"
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
                                    placeholder="Malaysia, Singapura, Jepang"
                                />
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
    const [search, setSearch] = useState('');
    const [groupFilter, setGroupFilter] = useState('all');
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
            updateUmkm.url({ assignment: assignment.id, umkm: umkm.id }),
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
                assignment: assignment.id,
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
                    assignment: assignment.id,
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
            storeUmkmDocument.url({ assignment: assignment.id, umkm: umkm.id }),
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
                assignment: assignment.id,
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
                                    href={showAssignment.url(assignment.id)}
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
                            <button
                                type="button"
                                onClick={() => setIsEditOpen(true)}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967]"
                            >
                                <Pencil size={16} />
                                Edit Data UMKM
                            </button>
                            <Link href={showAssignment.url(assignment.id)}>
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
                                                            key={
                                                                category.value
                                                            }
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
                            icon={<CheckCircle2 size={22} />}
                        />
                        <MetricCard
                            label="Rata-rata"
                            value={String(survey_summary.average_score)}
                            helper="Skala 0-100"
                            icon={<Star size={22} />}
                        />
                        <MetricCard
                            label="Weighted Score"
                            value={String(survey_summary.weighted_score)}
                            helper="Akumulasi bobot"
                            icon={<BadgeDollarSign size={22} />}
                        />
                        <MetricCard
                            label="Update Survey"
                            value={survey_summary.last_answered_at}
                            helper="Terakhir diedit"
                            icon={<CalendarDays size={22} />}
                        />
                    </div>

                    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
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
                                        <option value="all">
                                            Semua kriteria
                                        </option>
                                        {survey_groups.map((group) => (
                                            <option
                                                key={group.criteria_code}
                                                value={group.criteria_code}
                                            >
                                                {group.criteria_code}
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
                                    {filteredGroups.map((group) => (
                                        <section key={group.criteria_code}>
                                            <div className="border-b border-[#DDE9F6] bg-[#F8FBFE] px-4 py-3">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div>
                                                        <p className="text-xs font-bold text-[#0066AE]">
                                                            {
                                                                group.criteria_code
                                                            }
                                                        </p>
                                                        <h3 className="text-sm font-bold text-[#303030]">
                                                            {
                                                                group.criteria_name
                                                            }
                                                        </h3>
                                                    </div>
                                                    <p className="text-xs font-bold text-[#7C7C7C]">
                                                        {
                                                            group.answered_questions
                                                        }{' '}
                                                        jawaban · weighted{' '}
                                                        {group.weighted_score}
                                                    </p>
                                                </div>
                                            </div>
                                            {group.answers.map(
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
                                                    />
                                                ),
                                            )}
                                        </section>
                                    ))}
                                    {filteredGroups.length === 0 && (
                                        <div className="px-4 py-10 text-center text-sm font-semibold text-[#7C7C7C]">
                                            Tidak ada jawaban sesuai filter.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        <aside className="space-y-4">
                            <Card className="p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="flex items-center gap-2 text-sm font-bold text-[#303030]">
                                        <FileText
                                            size={16}
                                            className="text-[#0066AE]"
                                        />
                                        Dokumen Pendukung
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={openCreateDocument}
                                        className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-[#0066AE] px-2.5 text-xs font-bold text-white transition hover:bg-[#093967]"
                                    >
                                        <Plus size={14} />
                                        Tambah
                                    </button>
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
                                    <Store
                                        size={16}
                                        className="text-[#0066AE]"
                                    />
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
                                    <MapPin
                                        size={16}
                                        className="text-[#0066AE]"
                                    />
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
                            <Card className="p-4">
                                <h2 className="flex items-center gap-2 text-sm font-bold text-[#303030]">
                                    <UserRound
                                        size={16}
                                        className="text-[#0066AE]"
                                    />
                                    Catatan
                                </h2>
                                <div className="mt-4 space-y-3">
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
                        </aside>
                    </div>
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
