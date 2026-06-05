import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Banknote,
    Camera,
    CheckCircle2,
    ClipboardCheck,
    Factory,
    FileText,
    Globe2,
    PackageCheck,
    Plus,
    Save,
    Store,
    Trash2,
} from 'lucide-react';
import type { FormEvent } from 'react';
import type { ReactNode } from 'react';

import { surveyAssignments } from '@/routes';
import { store as storeUmkmSurvey } from '@/routes/survey-assignments/create-umkm';

type Option = {
    value: string;
    label: string;
    description?: string;
};

type UmkmQuestion = {
    id: number;
    question_number: number;
    question_text: string;
    question_weight_percent: number;
    max_score: number;
    help_text: string | null;
};

type CriteriaGroup = {
    criteria_code: string;
    criteria_name: string;
    criteria_weight_percent: number;
    question_count: number;
    questions: UmkmQuestion[];
};

type CreateUmkmProps = {
    assignment: {
        id: number;
        code: string;
        status: string;
        village: {
            id: number | null;
            code: string | null;
            name: string;
            location: string;
        };
        assigned_by: {
            id: number | null;
            name: string;
            email: string | null;
        };
    };
    template: {
        id: number;
        title: string;
        description: string | null;
        question_count: number;
        total_weight: number;
    } | null;
    criteria_groups: CriteriaGroup[];
    boolean_options: Option[];
};

type AnswerForm = {
    question_id: number;
    score: string;
};

type DocumentForm = {
    document_name: string;
    file: File | null;
};

type UmkmForm = {
    business_owner_name: string;
    name: string;
    legal_business_name: string;
    established_year: string;
    company_website_url: string;
    production_address: string;
    product_category: string;
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
    product_photo: File | null;
    documents: DocumentForm[];
    answers: AnswerForm[];
};

type ErrorBag = Record<string, string | undefined>;

function fieldError(
    errors: Partial<Record<keyof UmkmForm, string>>,
    name: string,
) {
    return (errors as ErrorBag)[name];
}

function initialForm(criteriaGroups: CriteriaGroup[]): UmkmForm {
    return {
        business_owner_name: '',
        name: '',
        legal_business_name: '',
        established_year: '',
        company_website_url: '',
        production_address: '',
        product_category: '',
        brand_name: '',
        annual_revenue: '',
        monthly_production_capacity: '',
        current_obstacles: '',
        certifications: '',
        has_business_legality_and_certification: '',
        is_umkm_participant: '',
        is_production_capacity_participant: '',
        annual_production_capacity: '',
        factory_location_feasibility: '',
        instagram_url: '',
        facebook_url: '',
        twitter_url: '',
        marketing_website_url: '',
        ecommerce_profile_url: '',
        marketing_notes: '',
        sustainability_notes: '',
        bank_name: '',
        bank_account_number: '',
        has_qris: '',
        qris_provider: '',
        has_edc: '',
        edc_provider: '',
        has_credit_card: '',
        banking_notes: '',
        has_exported: '',
        export_destination_countries: '',
        product_photo: null,
        documents: [],
        answers: criteriaGroups.flatMap((group) =>
            group.questions.map((question) => ({
                question_id: question.id,
                score: '',
            })),
        ),
    };
}

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return (
        <p className="mt-1 text-xs font-semibold text-[#D81313]">{message}</p>
    );
}

function SectionCard({
    icon: Icon,
    title,
    description,
    children,
}: {
    icon: typeof Store;
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-[#E4EAF0] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
            <div className="flex items-start gap-3 border-b border-[#EEF2F6] px-4 py-4 sm:px-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FB] text-[#0066AE]">
                    <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-[15px] font-bold text-[#172033]">
                        {title}
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-[#64748B]">
                        {description}
                    </p>
                </div>
            </div>
            <div className="p-4 sm:p-5">{children}</div>
        </section>
    );
}

function TextInput({
    label,
    value,
    onChange,
    error,
    placeholder,
    type = 'text',
    min,
    max,
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    type?: string;
    min?: string;
    max?: string;
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
                min={min}
                max={max}
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
                rows={4}
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
    placeholder = 'Pilih data',
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    error?: string;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <label className="block min-w-0">
            <span className="text-xs font-bold text-[#344256]">
                {label} {required && <span className="text-[#D81313]">*</span>}
            </span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="mt-2 h-10 w-full rounded-xl border border-[#DCE3EA] bg-white px-3 text-sm text-[#172033] transition outline-none focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15"
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.description
                            ? `${option.label} - ${option.description}`
                            : option.label}
                    </option>
                ))}
            </select>
            <FieldError message={error} />
        </label>
    );
}

export default function CreateUmkmSurveyAssignment({
    assignment,
    template,
    criteria_groups,
    boolean_options,
}: CreateUmkmProps) {
    const { data, setData, post, processing, errors, reset } =
        useForm<UmkmForm>(initialForm(criteria_groups));

    function setAnswerScore(questionId: number, score: string) {
        setData(
            'answers',
            data.answers.map((answer) =>
                answer.question_id === questionId
                    ? { ...answer, score }
                    : answer,
            ),
        );
    }

    function answerScore(questionId: number) {
        return (
            data.answers.find((answer) => answer.question_id === questionId)
                ?.score ?? ''
        );
    }

    function addDocument() {
        setData('documents', [
            ...data.documents,
            { document_name: '', file: null },
        ]);
    }

    function removeDocument(index: number) {
        setData(
            'documents',
            data.documents.filter((_, documentIndex) => documentIndex !== index),
        );
    }

    function updateDocument(index: number, values: Partial<DocumentForm>) {
        setData(
            'documents',
            data.documents.map((document, documentIndex) =>
                documentIndex === index
                    ? { ...document, ...values }
                    : document,
            ),
        );
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post(storeUmkmSurvey.url(assignment.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    const answeredCount = data.answers.filter(
        (answer) => answer.score !== '',
    ).length;
    const totalQuestions = data.answers.length;

    return (
        <>
            <Head title="Tambah UMKM dan Assessment" />

            <div className="min-h-screen bg-[#F7F7F7] px-4 py-5 text-[#303030] sm:px-5 lg:px-6">
                <div className="mx-auto max-w-7xl space-y-4">
                    <div className="flex flex-col gap-4 rounded-2xl border border-[#E4EAF0] bg-white px-4 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)] sm:px-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#64748B]">
                                <Link
                                    href={surveyAssignments.url()}
                                    className="inline-flex items-center gap-1 text-[#0066AE]"
                                >
                                    <ArrowLeft className="size-3.5" />{' '}
                                    Assignment Survey
                                </Link>
                                <span>/</span>
                                <span>Tambah UMKM</span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-[28px]">
                                Tambah Data UMKM dan Assessment
                            </h1>
                            <p className="mt-1 max-w-3xl text-sm leading-6 text-[#64748B]">
                                Input profil UMKM berdasarkan tabel database,
                                lalu isi nilai assessment pelaku UMKM dalam satu
                                alur.
                            </p>
                            <div className="mt-3 inline-flex max-w-full items-center rounded-full bg-[#F1F5F8] px-3 py-1.5 text-xs font-bold text-[#344256]">
                                <span className="truncate">
                                    {assignment.village.name}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#F1F5F8] p-2 text-center sm:min-w-[360px]">
                            <div className="rounded-xl bg-white px-3 py-2">
                                <p className="text-lg font-bold text-[#0066AE]">
                                    {template?.question_count ?? 0}
                                </p>
                                <p className="text-[11px] font-semibold text-[#64748B]">
                                    Pertanyaan
                                </p>
                            </div>
                            <div className="rounded-xl bg-white px-3 py-2">
                                <p className="text-lg font-bold text-[#00893D]">
                                    {answeredCount}/{totalQuestions}
                                </p>
                                <p className="text-[11px] font-semibold text-[#64748B]">
                                    Terisi
                                </p>
                            </div>
                            <div className="rounded-xl bg-white px-3 py-2">
                                <p className="text-lg font-bold text-[#093967]">
                                    {template?.total_weight ?? 0}%
                                </p>
                                <p className="text-[11px] font-semibold text-[#64748B]">
                                    Bobot
                                </p>
                            </div>
                        </div>
                    </div>

                    {!template && (
                        <div className="rounded-2xl border border-[#F2C7C7] bg-[#FFF6F6] px-4 py-3 text-sm font-semibold text-[#D81313]">
                            Template assessment UMKM aktif belum tersedia.
                            Jalankan seeder UMKMSurveySeeder terlebih dahulu.
                        </div>
                    )}

                    <form
                        onSubmit={submit}
                        className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]"
                    >
                        <div className="min-w-0 space-y-4">
                            <SectionCard
                                icon={Store}
                                title="Identitas UMKM"
                                description="Data dasar pelaku dan usaha UMKM. Desa mengikuti data assignment dan pengumpul data disimpan otomatis oleh backend."
                            >
                                <div className="mb-4 rounded-xl border border-[#DDE8F2] bg-[#F8FBFE] px-3 py-3">
                                    <p className="text-[11px] font-black tracking-[0.08em] text-[#64748B] uppercase">
                                        Desa Wisata
                                    </p>
                                    <p className="mt-1 text-sm font-bold text-[#172033]">
                                        {assignment.village.name}
                                    </p>
                                    <p className="mt-1 text-xs text-[#64748B]">
                                        {assignment.village.location}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    <TextInput
                                        label="Nama Pelaku UMKM"
                                        value={data.business_owner_name}
                                        onChange={(value) =>
                                            setData(
                                                'business_owner_name',
                                                value,
                                            )
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
                                        onChange={(value) =>
                                            setData('name', value)
                                        }
                                        error={fieldError(errors, 'name')}
                                        placeholder="Contoh: Batik Sumber Rejeki"
                                        required
                                    />
                                    <TextInput
                                        label="Nama Lengkap Badan Usaha"
                                        value={data.legal_business_name}
                                        onChange={(value) =>
                                            setData(
                                                'legal_business_name',
                                                value,
                                            )
                                        }
                                        error={fieldError(
                                            errors,
                                            'legal_business_name',
                                        )}
                                        placeholder="UD/CV/PT/Perorangan"
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
                                        placeholder="Contoh: 2018"
                                        type="number"
                                    />
                                    <TextInput
                                        label="Website Perusahaan"
                                        value={data.company_website_url}
                                        onChange={(value) =>
                                            setData(
                                                'company_website_url',
                                                value,
                                            )
                                        }
                                        error={fieldError(
                                            errors,
                                            'company_website_url',
                                        )}
                                        placeholder="https://contoh.com"
                                    />
                                    <TextInput
                                        label="Kategori Produk"
                                        value={data.product_category}
                                        onChange={(value) =>
                                            setData('product_category', value)
                                        }
                                        error={fieldError(
                                            errors,
                                            'product_category',
                                        )}
                                        placeholder="Makanan, kriya, fashion"
                                    />
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
                                        error={fieldError(
                                            errors,
                                            'annual_revenue',
                                        )}
                                        placeholder="Nominal rupiah"
                                        type="number"
                                    />
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <TextArea
                                        label="Alamat Tempat Produksi"
                                        value={data.production_address}
                                        onChange={(value) =>
                                            setData('production_address', value)
                                        }
                                        error={fieldError(
                                            errors,
                                            'production_address',
                                        )}
                                        placeholder="Alamat lengkap tempat produksi"
                                    />
                                    <TextArea
                                        label="Kendala yang Sedang Dihadapi"
                                        value={data.current_obstacles}
                                        onChange={(value) =>
                                            setData('current_obstacles', value)
                                        }
                                        error={fieldError(
                                            errors,
                                            'current_obstacles',
                                        )}
                                        placeholder="Kendala produksi, pemasaran, bahan baku, legalitas"
                                    />
                                </div>
                            </SectionCard>

                            <SectionCard
                                icon={PackageCheck}
                                title="Produksi dan Legalitas"
                                description="Lengkapi kapasitas produksi, sertifikasi, dan kelayakan lokasi pabrik."
                            >
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    <TextInput
                                        label="Kapasitas Produksi Rata-rata per Bulan"
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
                                        placeholder="Contoh: 500 pcs/bulan"
                                    />
                                    <TextInput
                                        label="Sertifikasi yang Dimiliki"
                                        value={data.certifications}
                                        onChange={(value) =>
                                            setData('certifications', value)
                                        }
                                        error={fieldError(
                                            errors,
                                            'certifications',
                                        )}
                                        placeholder="Halal, PIRT, BPOM, ISO"
                                    />
                                    <TextInput
                                        label="Legalitas Usaha dan Sertifikasi"
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
                                        placeholder="Contoh: NIB, SKU, Halal"
                                    />
                                    <TextInput
                                        label="Peserta UMKM"
                                        value={data.is_umkm_participant}
                                        onChange={(value) =>
                                            setData(
                                                'is_umkm_participant',
                                                value,
                                            )
                                        }
                                        error={fieldError(
                                            errors,
                                            'is_umkm_participant',
                                        )}
                                        placeholder="Status peserta/program"
                                    />
                                    <TextInput
                                        label="Peserta Kapasitas Produksi"
                                        value={
                                            data.is_production_capacity_participant
                                        }
                                        onChange={(value) =>
                                            setData(
                                                'is_production_capacity_participant',
                                                value,
                                            )
                                        }
                                        error={fieldError(
                                            errors,
                                            'is_production_capacity_participant',
                                        )}
                                        placeholder="Status kapasitas produksi"
                                    />
                                    <TextInput
                                        label="Kapasitas Produksi per Tahun"
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
                                        placeholder="Contoh: 6.000 pcs/tahun"
                                    />
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <TextArea
                                        label="Kelayakan Lokasi Pabrik"
                                        value={
                                            data.factory_location_feasibility
                                        }
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
                                        placeholder="Catatan kelayakan lokasi, keamanan, kebersihan, akses"
                                    />
                                    <label className="block rounded-2xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4">
                                        <span className="flex items-center gap-2 text-xs font-bold text-[#344256]">
                                            <Camera className="size-4 text-[#0066AE]" />{' '}
                                            Foto Produk
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) =>
                                                setData(
                                                    'product_photo',
                                                    event.target.files?.[0] ??
                                                        null,
                                                )
                                            }
                                            className="mt-3 block w-full text-sm text-[#64748B] file:mr-3 file:h-9 file:rounded-lg file:border-0 file:bg-[#0066AE] file:px-3 file:text-sm file:font-bold file:text-white"
                                        />
                                        <p className="mt-2 text-xs text-[#64748B]">
                                            Format gambar, maksimal 5 MB.
                                        </p>
                                        <FieldError
                                            message={fieldError(
                                                errors,
                                                'product_photo',
                                            )}
                                        />
                                    </label>
                                </div>
                            </SectionCard>

                            <SectionCard
                                icon={FileText}
                                title="Dokumen Pendukung"
                                description="Unggah dokumen legalitas, sertifikasi, katalog, atau dokumen pendukung lain milik UMKM."
                            >
                                <div className="space-y-3">
                                    {data.documents.length === 0 && (
                                        <div className="rounded-2xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] px-4 py-6 text-center">
                                            <FileText className="mx-auto size-8 text-[#0066AE]" />
                                            <p className="mt-2 text-sm font-bold text-[#172033]">
                                                Belum ada dokumen pendukung
                                            </p>
                                            <p className="mt-1 text-xs text-[#64748B]">
                                                Tambahkan dokumen jika tersedia.
                                            </p>
                                        </div>
                                    )}

                                    {data.documents.map((document, index) => (
                                        <div
                                            key={index}
                                            className="grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_44px] lg:items-start"
                                        >
                                            <TextInput
                                                label="Nama Dokumen"
                                                value={document.document_name}
                                                onChange={(value) =>
                                                    updateDocument(index, {
                                                        document_name: value,
                                                    })
                                                }
                                                error={fieldError(
                                                    errors,
                                                    `documents.${index}.document_name`,
                                                )}
                                                placeholder="Contoh: NIB, Sertifikat Halal, Katalog Produk"
                                            />
                                            <label className="block min-w-0">
                                                <span className="text-xs font-bold text-[#344256]">
                                                    File Dokumen
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={(event) =>
                                                        updateDocument(index, {
                                                            file:
                                                                event.target
                                                                    .files?.[0] ??
                                                                null,
                                                        })
                                                    }
                                                    className="mt-2 block w-full text-sm text-[#64748B] file:mr-3 file:h-9 file:rounded-lg file:border-0 file:bg-[#0066AE] file:px-3 file:text-sm file:font-bold file:text-white"
                                                />
                                                <p className="mt-1 truncate text-xs text-[#64748B]">
                                                    {document.file?.name ??
                                                        'PDF atau gambar, maksimal 5 MB.'}
                                                </p>
                                                <FieldError
                                                    message={fieldError(
                                                        errors,
                                                        `documents.${index}.file`,
                                                    )}
                                                />
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeDocument(index)
                                                }
                                                className="inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] lg:mt-6"
                                                aria-label="Hapus dokumen"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={addDocument}
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
                                    >
                                        <Plus className="size-4" />
                                        Tambah Dokumen
                                    </button>
                                </div>
                            </SectionCard>

                            <SectionCard
                                icon={Globe2}
                                title="Pemasaran dan Ekspor"
                                description="Kanal digital, catatan pemasaran, sustainability, dan status ekspor."
                            >
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    <TextInput
                                        label="Instagram"
                                        value={data.instagram_url}
                                        onChange={(value) =>
                                            setData('instagram_url', value)
                                        }
                                        error={fieldError(
                                            errors,
                                            'instagram_url',
                                        )}
                                        placeholder="https://instagram.com/brand"
                                    />
                                    <TextInput
                                        label="Facebook"
                                        value={data.facebook_url}
                                        onChange={(value) =>
                                            setData('facebook_url', value)
                                        }
                                        error={fieldError(
                                            errors,
                                            'facebook_url',
                                        )}
                                        placeholder="https://facebook.com/brand"
                                    />
                                    <TextInput
                                        label="Twitter/X"
                                        value={data.twitter_url}
                                        onChange={(value) =>
                                            setData('twitter_url', value)
                                        }
                                        error={fieldError(
                                            errors,
                                            'twitter_url',
                                        )}
                                        placeholder="https://x.com/brand"
                                    />
                                    <TextInput
                                        label="Website Marketing"
                                        value={data.marketing_website_url}
                                        onChange={(value) =>
                                            setData(
                                                'marketing_website_url',
                                                value,
                                            )
                                        }
                                        error={fieldError(
                                            errors,
                                            'marketing_website_url',
                                        )}
                                        placeholder="https://brand.com"
                                    />
                                    <TextInput
                                        label="Profil E-Commerce"
                                        value={data.ecommerce_profile_url}
                                        onChange={(value) =>
                                            setData(
                                                'ecommerce_profile_url',
                                                value,
                                            )
                                        }
                                        error={fieldError(
                                            errors,
                                            'ecommerce_profile_url',
                                        )}
                                        placeholder="https://marketplace.com/toko"
                                    />
                                    <SelectInput
                                        label="Pernah Ekspor"
                                        value={data.has_exported}
                                        onChange={(value) =>
                                            setData('has_exported', value)
                                        }
                                        options={boolean_options}
                                        error={fieldError(
                                            errors,
                                            'has_exported',
                                        )}
                                        placeholder="Pilih status"
                                    />
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                                    <TextArea
                                        label="Catatan Pemasaran"
                                        value={data.marketing_notes}
                                        onChange={(value) =>
                                            setData('marketing_notes', value)
                                        }
                                        error={fieldError(
                                            errors,
                                            'marketing_notes',
                                        )}
                                        placeholder="Strategi, kanal, atau performa pemasaran"
                                    />
                                    <TextArea
                                        label="Catatan Sustainability"
                                        value={data.sustainability_notes}
                                        onChange={(value) =>
                                            setData(
                                                'sustainability_notes',
                                                value,
                                            )
                                        }
                                        error={fieldError(
                                            errors,
                                            'sustainability_notes',
                                        )}
                                        placeholder="Material ramah lingkungan, limbah, pemberdayaan"
                                    />
                                    <TextArea
                                        label="Negara Tujuan Ekspor"
                                        value={
                                            data.export_destination_countries
                                        }
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
                                        placeholder="Sebutkan negara jika sudah ekspor"
                                    />
                                </div>
                            </SectionCard>

                            <SectionCard
                                icon={Banknote}
                                title="Solusi Perbankan"
                                description="Data rekening dan fasilitas transaksi yang digunakan UMKM."
                            >
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    <TextInput
                                        label="Bank yang Digunakan"
                                        value={data.bank_name}
                                        onChange={(value) =>
                                            setData('bank_name', value)
                                        }
                                        error={fieldError(errors, 'bank_name')}
                                        placeholder="Contoh: BCA"
                                    />
                                    <TextInput
                                        label="Nomor Rekening"
                                        value={data.bank_account_number}
                                        onChange={(value) =>
                                            setData(
                                                'bank_account_number',
                                                value,
                                            )
                                        }
                                        error={fieldError(
                                            errors,
                                            'bank_account_number',
                                        )}
                                        placeholder="Nomor rekening usaha"
                                    />
                                    <SelectInput
                                        label="Memiliki QRIS"
                                        value={data.has_qris}
                                        onChange={(value) =>
                                            setData('has_qris', value)
                                        }
                                        options={boolean_options}
                                        error={fieldError(errors, 'has_qris')}
                                        placeholder="Pilih status"
                                    />
                                    <TextInput
                                        label="Provider QRIS"
                                        value={data.qris_provider}
                                        onChange={(value) =>
                                            setData('qris_provider', value)
                                        }
                                        error={fieldError(
                                            errors,
                                            'qris_provider',
                                        )}
                                        placeholder="Nama provider QRIS"
                                    />
                                    <SelectInput
                                        label="Memiliki EDC"
                                        value={data.has_edc}
                                        onChange={(value) =>
                                            setData('has_edc', value)
                                        }
                                        options={boolean_options}
                                        error={fieldError(errors, 'has_edc')}
                                        placeholder="Pilih status"
                                    />
                                    <TextInput
                                        label="Provider EDC"
                                        value={data.edc_provider}
                                        onChange={(value) =>
                                            setData('edc_provider', value)
                                        }
                                        error={fieldError(
                                            errors,
                                            'edc_provider',
                                        )}
                                        placeholder="Nama provider EDC"
                                    />
                                    <SelectInput
                                        label="Memiliki Kartu Kredit"
                                        value={data.has_credit_card}
                                        onChange={(value) =>
                                            setData('has_credit_card', value)
                                        }
                                        options={boolean_options}
                                        error={fieldError(
                                            errors,
                                            'has_credit_card',
                                        )}
                                        placeholder="Pilih status"
                                    />
                                </div>
                                <div className="mt-4">
                                    <TextArea
                                        label="Catatan Perbankan"
                                        value={data.banking_notes}
                                        onChange={(value) =>
                                            setData('banking_notes', value)
                                        }
                                        error={fieldError(
                                            errors,
                                            'banking_notes',
                                        )}
                                        placeholder="Kebutuhan atau solusi perbankan tambahan"
                                    />
                                </div>
                            </SectionCard>

                            <SectionCard
                                icon={ClipboardCheck}
                                title="Assessment Pelaku UMKM"
                                description="Isi nilai 1 sampai 4 untuk semua pertanyaan assessment."
                            >
                                <div className="space-y-4">
                                    <FieldError
                                        message={fieldError(errors, 'answers')}
                                    />
                                    {criteria_groups.map((group) => (
                                        <div
                                            key={group.criteria_code}
                                            className="rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE]"
                                        >
                                            <div className="flex flex-col gap-2 border-b border-[#E8EEF5] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-xs font-black tracking-[0.08em] text-[#0066AE] uppercase">
                                                        Kriteria{' '}
                                                        {group.criteria_code}
                                                    </p>
                                                    <h3 className="text-sm font-bold text-[#172033]">
                                                        {group.criteria_name}
                                                    </h3>
                                                </div>
                                                <span className="inline-flex h-7 w-fit items-center rounded-full bg-[#EAF4FB] px-3 text-xs font-bold text-[#0066AE]">
                                                    Bobot{' '}
                                                    {
                                                        group.criteria_weight_percent
                                                    }
                                                    %
                                                </span>
                                            </div>
                                            <div className="divide-y divide-[#E8EEF5]">
                                                {group.questions.map(
                                                    (question) => (
                                                        <div
                                                            key={question.id}
                                                            className="grid grid-cols-1 gap-3 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start"
                                                        >
                                                            <div className="min-w-0">
                                                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                                                    <span className="inline-flex size-7 items-center justify-center rounded-lg bg-white text-xs font-black text-[#0066AE] ring-1 ring-[#DDE8F2]">
                                                                        {
                                                                            question.question_number
                                                                        }
                                                                    </span>
                                                                    <span className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-[#64748B] ring-1 ring-[#E4EAF0]">
                                                                        Bobot{' '}
                                                                        {
                                                                            question.question_weight_percent
                                                                        }
                                                                        %
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm leading-6 font-semibold text-[#1F2937]">
                                                                    {
                                                                        question.question_text
                                                                    }
                                                                </p>
                                                                {question.help_text && (
                                                                    <p className="mt-2 text-xs leading-5 text-[#64748B]">
                                                                        {
                                                                            question.help_text
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <TextInput
                                                                label="Nilai"
                                                                value={answerScore(
                                                                    question.id,
                                                                )}
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    setAnswerScore(
                                                                        question.id,
                                                                        value,
                                                                    )
                                                                }
                                                                error={fieldError(
                                                                    errors,
                                                                    `answers.${data.answers.findIndex((answer) => answer.question_id === question.id)}.score`,
                                                                )}
                                                                placeholder="0 - 100"
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                required
                                                            />
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        </div>

                        <aside className="space-y-4 xl:sticky xl:top-4 xl:self-start">
                            <div className="rounded-2xl border border-[#E4EAF0] bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#0066AE] text-white">
                                        <Factory className="size-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-[#172033]">
                                            Ringkasan Input
                                        </h2>
                                        <p className="text-xs text-[#64748B]">
                                            UMKM + assessment
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-3 text-sm">
                                    <div className="flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2">
                                        <span className="text-[#64748B]">
                                            Template
                                        </span>
                                        <span className="font-bold text-[#172033]">
                                            {template?.title ?? '-'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2">
                                        <span className="text-[#64748B]">
                                            Kriteria
                                        </span>
                                        <span className="font-bold text-[#172033]">
                                            {criteria_groups.length}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2">
                                        <span className="text-[#64748B]">
                                            Progress Nilai
                                        </span>
                                        <span className="font-bold text-[#172033]">
                                            {answeredCount}/{totalQuestions}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E8EEF5]">
                                    <div
                                        className="h-full rounded-full bg-[#0066AE] transition-all"
                                        style={{
                                            width: `${totalQuestions ? (answeredCount / totalQuestions) * 100 : 0}%`,
                                        }}
                                    />
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-2">
                                    <button
                                        type="submit"
                                        disabled={processing || !template}
                                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_10px_20px_rgba(0,102,174,0.18)] transition hover:bg-[#00518A] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <Save className="size-4" />
                                        {processing
                                            ? 'Menyimpan...'
                                            : 'Simpan UMKM'}
                                    </button>
                                    <Link
                                        href={surveyAssignments.url()}
                                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#093967] transition hover:bg-[#F1F5F8]"
                                    >
                                        <ArrowLeft className="size-4" />
                                        Kembali
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#D7E8F8] bg-[#F1F8FF] p-4">
                                <div className="flex gap-3">
                                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#0066AE]" />
                                    <div className="text-xs leading-5 text-[#35506B]">
                                        <p className="font-bold text-[#093967]">
                                            Skoring otomatis
                                        </p>
                                        <p>
                                            Nilai UMKM memakai skala 0-100.
                                            Backend menghitung weighted score
                                            dari bobot pertanyaan dan menyimpan
                                            snapshot otomatis dari data asli.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </form>
                </div>
            </div>
        </>
    );
}
