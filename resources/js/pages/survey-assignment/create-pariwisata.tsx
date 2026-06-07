import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Banknote,
    BarChart3,
    GraduationCap,
    MapPin,
    Package,
    Plus,
    Save,
    Ticket,
    Trash2,
    UserRound,
    Users,
} from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';

import { dashboard, surveyAssignments } from '@/routes';
import { show as showSurveyAssignment } from '@/routes/survey-assignments';
import { store as storePariwisata } from '@/routes/survey-assignments/create-pariwisata';

type Option = {
    value: string;
    label: string;
};

type AssignmentSummary = {
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

type AnnualTurnoverForm = {
    year: string;
    value: string;
    notes: string;
};

type AnnualVisitorForm = {
    year: string;
    value: string;
    notes: string;
};

type VisitorTypeAnnualForm = {
    year: string;
    visitor_type: string;
    value: string;
    notes: string;
};

type PackageForm = {
    name: string;
    package_type: string;
    duration: string;
    facilities: string;
    description: string;
    price: string;
    is_active: boolean;
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

type PariwisataForm = {
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
    annual_turnovers: AnnualTurnoverForm[];
    annual_visitors: AnnualVisitorForm[];
    visitor_type_annuals: VisitorTypeAnnualForm[];
    packages: PackageForm[];
    annual_worker_stats: AnnualWorkerStatForm[];
    annual_worker_training_stats: AnnualWorkerTrainingStatForm[];
};

type CreatePariwisataProps = {
    assignment: AssignmentSummary;
    category_options: Option[];
};

type ErrorBag = Record<string, string | undefined>;

const defaultForm: PariwisataForm = {
    name: '',
    categories: [],
    operational_days: '',
    operational_hours: '',
    operational_schedule_notes: '',
    entrance_ticket_price: '',
    entrance_ticket_description: '',
    address: '',
    person_in_charge_name: '',
    person_in_charge_phone: '',
    person_in_charge_address: '',
    is_active: true,
    annual_turnovers: [],
    annual_visitors: [],
    visitor_type_annuals: [],
    packages: [],
    annual_worker_stats: [],
    annual_worker_training_stats: [],
};

const operationalDayOptions = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
];

const visitorTypeOptions: Option[] = [
    { value: 'domestik', label: 'Domestik' },
    { value: 'mancanegara', label: 'Mancanegara' },
    { value: 'pelajar', label: 'Pelajar' },
    { value: 'rombongan', label: 'Rombongan' },
];

const workerDimensionOptions: Option[] = [
    { value: 'age', label: 'Usia' },
    { value: 'gender', label: 'Gender' },
    { value: 'education', label: 'Pendidikan' },
];

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function digitsOnly(value: string) {
    return value.replace(/\D/g, '');
}

function formatThousands(value: string) {
    const digits = digitsOnly(value);

    return digits ? new Intl.NumberFormat('id-ID').format(Number(digits)) : '';
}

function fieldError(errors: Partial<ErrorBag>, name: string) {
    return errors[name];
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
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    type?: string;
    placeholder?: string;
}) {
    return (
        <label className="space-y-1.5">
            <span className="text-xs font-bold text-[#303030]">{label}</span>
            <input
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm text-[#303030] transition outline-none focus:border-[#0066AE]"
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
    rows = 3,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    rows?: number;
    placeholder?: string;
}) {
    return (
        <label className="space-y-1.5">
            <span className="text-xs font-bold text-[#303030]">{label}</span>
            <textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                rows={rows}
                placeholder={placeholder}
                className="w-full resize-none rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-sm text-[#303030] transition outline-none focus:border-[#0066AE]"
            />
            <FieldError message={error} />
        </label>
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
    options: Option[];
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

function SectionCard({
    icon: Icon,
    title,
    description,
    children,
}: {
    icon: typeof MapPin;
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#E4EAF0] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
            <div className="flex items-start gap-3 border-b border-[#EEF2F6] px-4 py-4 sm:px-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FB] text-[#0066AE]">
                    <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-[15px] font-bold text-[#172033]">
                        {title}
                    </h2>
                    <p className="mt-0.5 text-sm leading-5 text-[#64748B]">
                        {description}
                    </p>
                </div>
            </div>
            <div className="p-4 sm:p-5">{children}</div>
        </section>
    );
}

function EmptyState({
    icon: Icon,
    title,
    description,
}: {
    icon: typeof MapPin;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] px-4 py-6 text-center">
            <Icon className="mx-auto size-8 text-[#0066AE]" />
            <p className="mt-2 text-sm font-bold text-[#172033]">{title}</p>
            <p className="mt-1 text-xs text-[#64748B]">{description}</p>
        </div>
    );
}

function InfoTile({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: string;
    icon: typeof MapPin;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-[#EFEFEF] bg-white px-4 py-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0066AE]">
                <Icon className="size-5" />
            </span>
            <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#7C7C7C]">
                    {label}
                </p>
                <p className="truncate text-sm font-bold text-[#303030]">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default function CreatePariwisata({
    assignment,
    category_options,
}: CreatePariwisataProps) {
    const { data, setData, post, processing, errors } =
        useForm<PariwisataForm>(defaultForm);

    function setField<K extends keyof PariwisataForm>(
        field: K,
        value: PariwisataForm[K],
    ) {
        setData((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function toggleCategory(category: string) {
        setData(
            'categories',
            data.categories.includes(category)
                ? data.categories.filter((current) => current !== category)
                : [...data.categories, category],
        );
    }

    function getSelectedOperationalDays() {
        return data.operational_days
            .split(',')
            .map((day) => day.trim())
            .filter(Boolean);
    }

    function toggleOperationalDay(day: string) {
        const selectedDays = getSelectedOperationalDays();
        const nextDays = selectedDays.includes(day)
            ? selectedDays.filter((selectedDay) => selectedDay !== day)
            : operationalDayOptions.filter(
                  (option) => selectedDays.includes(option) || option === day,
              );

        setField('operational_days', nextDays.join(', '));
    }

    function addAnnualTurnover() {
        setData('annual_turnovers', [
            ...data.annual_turnovers,
            { year: '', value: '', notes: '' },
        ]);
    }

    function updateAnnualTurnover(
        index: number,
        values: Partial<AnnualTurnoverForm>,
    ) {
        setData(
            'annual_turnovers',
            data.annual_turnovers.map((row, rowIndex) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removeAnnualTurnover(index: number) {
        setData(
            'annual_turnovers',
            data.annual_turnovers.filter((_, rowIndex) => rowIndex !== index),
        );
    }

    function addAnnualVisitor() {
        setData('annual_visitors', [
            ...data.annual_visitors,
            { year: '', value: '', notes: '' },
        ]);
    }

    function updateAnnualVisitor(
        index: number,
        values: Partial<AnnualVisitorForm>,
    ) {
        setData(
            'annual_visitors',
            data.annual_visitors.map((row, rowIndex) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removeAnnualVisitor(index: number) {
        setData(
            'annual_visitors',
            data.annual_visitors.filter((_, rowIndex) => rowIndex !== index),
        );
    }

    function addVisitorTypeAnnual() {
        setData('visitor_type_annuals', [
            ...data.visitor_type_annuals,
            { year: '', visitor_type: '', value: '', notes: '' },
        ]);
    }

    function updateVisitorTypeAnnual(
        index: number,
        values: Partial<VisitorTypeAnnualForm>,
    ) {
        setData(
            'visitor_type_annuals',
            data.visitor_type_annuals.map((row, rowIndex) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removeVisitorTypeAnnual(index: number) {
        setData(
            'visitor_type_annuals',
            data.visitor_type_annuals.filter(
                (_, rowIndex) => rowIndex !== index,
            ),
        );
    }

    function addPackage() {
        setData('packages', [
            ...data.packages,
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

    function updatePackage(index: number, values: Partial<PackageForm>) {
        setData(
            'packages',
            data.packages.map((row, rowIndex) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removePackage(index: number) {
        setData(
            'packages',
            data.packages.filter((_, rowIndex) => rowIndex !== index),
        );
    }

    function addAnnualWorkerStat() {
        setData('annual_worker_stats', [
            ...data.annual_worker_stats,
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
        values: Partial<AnnualWorkerStatForm>,
    ) {
        setData(
            'annual_worker_stats',
            data.annual_worker_stats.map((row, rowIndex) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removeAnnualWorkerStat(index: number) {
        setData(
            'annual_worker_stats',
            data.annual_worker_stats.filter(
                (_, rowIndex) => rowIndex !== index,
            ),
        );
    }

    function addAnnualWorkerTrainingStat() {
        setData('annual_worker_training_stats', [
            ...data.annual_worker_training_stats,
            { year: '', training_name: '', total_people: '', notes: '' },
        ]);
    }

    function updateAnnualWorkerTrainingStat(
        index: number,
        values: Partial<AnnualWorkerTrainingStatForm>,
    ) {
        setData(
            'annual_worker_training_stats',
            data.annual_worker_training_stats.map((row, rowIndex) =>
                rowIndex === index ? { ...row, ...values } : row,
            ),
        );
    }

    function removeAnnualWorkerTrainingStat(index: number) {
        setData(
            'annual_worker_training_stats',
            data.annual_worker_training_stats.filter(
                (_, rowIndex) => rowIndex !== index,
            ),
        );
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post(storePariwisata.url(assignment.code), {
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title="Tambah Data Pariwisata" />
            <main className="min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-5 text-[#303030] sm:px-5 lg:px-6">
                <div className="mx-auto max-w-[1500px] space-y-4">
                    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0">
                            <nav className="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold">
                                <span className="text-[#0066AE]">
                                    Dashboard
                                </span>
                                <span className="text-[#7C7C7C]">/</span>
                                <span className="text-[#0066AE]">
                                    Survey Assignment
                                </span>
                                <span className="text-[#7C7C7C]">/</span>
                                <span className="text-[#7C7C7C]">
                                    Pariwisata
                                </span>
                            </nav>
                            <h1 className="text-[28px] leading-9 font-bold tracking-[-0.01em] text-[#303030] md:text-[30px]">
                                Tambah Data Pariwisata
                            </h1>
                            <p className="mt-1 max-w-3xl text-sm leading-6 text-[#7C7C7C]">
                                Input destinasi wisata untuk desa pada
                                assignment ini. Lengkapi juga data tahunan,
                                paket wisata, dan profil tenaga kerja.
                            </p>
                        </div>

                        <Link
                            href={showSurveyAssignment.url(assignment.code)}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]"
                        >
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </header>

                    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        <InfoTile
                            icon={Ticket}
                            label="Kode Assignment"
                            value={assignment.code}
                        />
                        <InfoTile
                            icon={MapPin}
                            label="Desa Wisata"
                            value={`${assignment.village.name} (${assignment.village.code ?? '-'})`}
                        />
                        <InfoTile
                            icon={MapPin}
                            label="Lokasi"
                            value={assignment.village.location}
                        />
                        <InfoTile
                            icon={UserRound}
                            label="Enumerator"
                            value={assignment.assigned_by.name}
                        />
                    </section>

                    <form onSubmit={submit} className="space-y-4">
                        <section className="overflow-hidden rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.05)]">
                            <div className="flex items-start gap-3 border-b border-[#EFEFEF] px-5 py-4">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0066AE]">
                                    <MapPin className="size-5" />
                                </span>
                                <div className="min-w-0">
                                    <h2 className="text-lg font-bold text-[#303030]">
                                        Input Pariwisata
                                    </h2>
                                    <p className="mt-0.5 text-sm leading-5 text-[#7C7C7C]">
                                        Data disimpan ke tabel pariwisata desa
                                        dan kategori pariwisata.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_360px]">
                                <div className="space-y-4">
                                    <TextInput
                                        label="Nama Destinasi Wisata"
                                        value={data.name}
                                        onChange={(value) =>
                                            setField('name', value)
                                        }
                                        error={errors.name}
                                        placeholder="Contoh: Air Terjun Tirta"
                                    />

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-bold text-[#303030]">
                                                Hari Operasional
                                            </span>
                                            <div className="grid gap-2 rounded-lg border border-[#DDE4EC] bg-white p-3 sm:grid-cols-2">
                                                {operationalDayOptions.map(
                                                    (day) => {
                                                        const isChecked =
                                                            getSelectedOperationalDays().includes(
                                                                day,
                                                            );

                                                        return (
                                                            <label
                                                                key={day}
                                                                className={classNames(
                                                                    'flex h-9 items-center gap-2 rounded-md border px-2 text-sm font-semibold transition',
                                                                    isChecked
                                                                        ? 'border-[#0066AE] bg-[#EAF3FF] text-[#0066AE]'
                                                                        : 'border-[#DDE4EC] bg-white text-[#303030]',
                                                                )}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        isChecked
                                                                    }
                                                                    onChange={() =>
                                                                        toggleOperationalDay(
                                                                            day,
                                                                        )
                                                                    }
                                                                    className="size-4 accent-[#0066AE]"
                                                                />
                                                                {day}
                                                            </label>
                                                        );
                                                    },
                                                )}
                                            </div>
                                            <p className="text-[11px] font-semibold text-[#7C7C7C]">
                                                Tersimpan sebagai:{' '}
                                                {data.operational_days || '-'}
                                            </p>
                                            <FieldError
                                                message={
                                                    errors.operational_days
                                                }
                                            />
                                        </div>
                                        <TextInput
                                            label="Jam Operasional"
                                            value={data.operational_hours}
                                            onChange={(value) =>
                                                setField(
                                                    'operational_hours',
                                                    value,
                                                )
                                            }
                                            error={errors.operational_hours}
                                            placeholder="08.00 - 17.00"
                                        />
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <TextInput
                                            label="Harga Tiket Masuk"
                                            value={formatThousands(
                                                data.entrance_ticket_price,
                                            )}
                                            onChange={(value) =>
                                                setField(
                                                    'entrance_ticket_price',
                                                    digitsOnly(value),
                                                )
                                            }
                                            error={errors.entrance_ticket_price}
                                            placeholder="25.000"
                                        />
                                        <TextInput
                                            label="Keterangan Tiket"
                                            value={
                                                data.entrance_ticket_description
                                            }
                                            onChange={(value) =>
                                                setField(
                                                    'entrance_ticket_description',
                                                    value,
                                                )
                                            }
                                            error={
                                                errors.entrance_ticket_description
                                            }
                                            placeholder="Termasuk parkir"
                                        />
                                    </div>

                                    <TextArea
                                        label="Alamat Destinasi"
                                        value={data.address}
                                        onChange={(value) =>
                                            setField('address', value)
                                        }
                                        error={errors.address}
                                        rows={3}
                                        placeholder="Alamat lengkap destinasi wisata"
                                    />

                                    <TextArea
                                        label="Catatan Jadwal Operasional"
                                        value={data.operational_schedule_notes}
                                        onChange={(value) =>
                                            setField(
                                                'operational_schedule_notes',
                                                value,
                                            )
                                        }
                                        error={
                                            errors.operational_schedule_notes
                                        }
                                        rows={3}
                                        placeholder="Catatan jadwal khusus, libur, atau perubahan jam operasional."
                                    />
                                </div>

                                <aside className="space-y-4 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-10 items-center justify-center rounded-lg bg-white text-[#0066AE]">
                                            <Ticket className="size-5" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-bold text-[#303030]">
                                                Kategori Destinasi
                                            </p>
                                            <p className="text-xs text-[#7C7C7C]">
                                                Pilih satu atau lebih kategori.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                                        {category_options.map((category) => (
                                            <label
                                                key={category.value}
                                                className={classNames(
                                                    'flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold transition',
                                                    data.categories.includes(
                                                        category.value,
                                                    )
                                                        ? 'border-[#0066AE] bg-[#EAF3FF] text-[#0066AE]'
                                                        : 'border-[#DDE4EC] bg-white text-[#303030]',
                                                )}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={data.categories.includes(
                                                        category.value,
                                                    )}
                                                    onChange={() =>
                                                        toggleCategory(
                                                            category.value,
                                                        )
                                                    }
                                                    className="size-4 accent-[#0066AE]"
                                                />
                                                {category.label}
                                            </label>
                                        ))}
                                    </div>
                                    <FieldError message={errors.categories} />

                                    <div className="border-t border-[#DDE4EC] pt-4">
                                        <div className="mb-3 flex items-center gap-3">
                                            <span className="flex size-10 items-center justify-center rounded-lg bg-white text-[#0066AE]">
                                                <UserRound className="size-5" />
                                            </span>
                                            <p className="text-sm font-bold text-[#303030]">
                                                Penanggung Jawab
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            <TextInput
                                                label="Nama PIC"
                                                value={
                                                    data.person_in_charge_name
                                                }
                                                onChange={(value) =>
                                                    setField(
                                                        'person_in_charge_name',
                                                        value,
                                                    )
                                                }
                                                error={
                                                    errors.person_in_charge_name
                                                }
                                                placeholder="Nama penanggung jawab"
                                            />
                                            <TextInput
                                                label="Telepon PIC"
                                                value={
                                                    data.person_in_charge_phone
                                                }
                                                onChange={(value) =>
                                                    setField(
                                                        'person_in_charge_phone',
                                                        value,
                                                    )
                                                }
                                                error={
                                                    errors.person_in_charge_phone
                                                }
                                                placeholder="08xxxxxxxxxx"
                                            />
                                            <TextArea
                                                label="Alamat PIC"
                                                value={
                                                    data.person_in_charge_address
                                                }
                                                onChange={(value) =>
                                                    setField(
                                                        'person_in_charge_address',
                                                        value,
                                                    )
                                                }
                                                error={
                                                    errors.person_in_charge_address
                                                }
                                                rows={3}
                                                placeholder="Alamat penanggung jawab"
                                            />
                                        </div>
                                    </div>

                                    <div className="border-t border-[#DDE4EC] pt-4">
                                        <p className="mb-3 text-sm font-bold text-[#303030]">
                                            Ringkasan Data Tambahan
                                        </p>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                                                <span>Omset Tahunan</span>
                                                <span className="font-bold">
                                                    {
                                                        data.annual_turnovers
                                                            .length
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                                                <span>Pengunjung Tahunan</span>
                                                <span className="font-bold">
                                                    {
                                                        data.annual_visitors
                                                            .length
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                                                <span>Jenis Pengunjung</span>
                                                <span className="font-bold">
                                                    {
                                                        data
                                                            .visitor_type_annuals
                                                            .length
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                                                <span>Paket Wisata</span>
                                                <span className="font-bold">
                                                    {data.packages.length}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                                                <span>Data Pekerja</span>
                                                <span className="font-bold">
                                                    {
                                                        data.annual_worker_stats
                                                            .length
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                                                <span>Pelatihan Pekerja</span>
                                                <span className="font-bold">
                                                    {
                                                        data
                                                            .annual_worker_training_stats
                                                            .length
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <label className="flex items-center justify-between gap-3 rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-sm font-bold text-[#303030]">
                                        Status Aktif
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={(event) =>
                                                setField(
                                                    'is_active',
                                                    event.target.checked,
                                                )
                                            }
                                            className="size-4 accent-[#0066AE]"
                                        />
                                    </label>
                                </aside>
                            </div>
                        </section>

                        <SectionCard
                            icon={Banknote}
                            title="Omset Tahunan"
                            description="Tambahkan riwayat omset tahunan untuk destinasi wisata ini."
                        >
                            <div className="space-y-3">
                                {data.annual_turnovers.length === 0 && (
                                    <EmptyState
                                        icon={Banknote}
                                        title="Belum ada omset tahunan"
                                        description="Tambahkan data omset per tahun jika tersedia."
                                    />
                                )}

                                {data.annual_turnovers.map((row, index) => (
                                    <div
                                        key={index}
                                        className="grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 lg:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)_44px] lg:items-start"
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
                                            className="inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] lg:mt-6"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addAnnualTurnover}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
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
                        </SectionCard>

                        <SectionCard
                            icon={BarChart3}
                            title="Pengunjung Tahunan"
                            description="Catat total jumlah pengunjung per tahun."
                        >
                            <div className="space-y-3">
                                {data.annual_visitors.length === 0 && (
                                    <EmptyState
                                        icon={BarChart3}
                                        title="Belum ada pengunjung tahunan"
                                        description="Tambahkan total pengunjung per tahun jika tersedia."
                                    />
                                )}

                                {data.annual_visitors.map((row, index) => (
                                    <div
                                        key={index}
                                        className="grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 lg:grid-cols-[140px_200px_minmax(0,1fr)_44px] lg:items-start"
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
                                            className="inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] lg:mt-6"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addAnnualVisitor}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
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
                        </SectionCard>

                        <SectionCard
                            icon={Users}
                            title="Jenis Pengunjung Tahunan"
                            description="Pisahkan jumlah pengunjung tahunan berdasarkan jenis pengunjung."
                        >
                            <div className="space-y-3">
                                {data.visitor_type_annuals.length === 0 && (
                                    <EmptyState
                                        icon={Users}
                                        title="Belum ada jenis pengunjung"
                                        description="Tambahkan data jenis pengunjung per tahun."
                                    />
                                )}

                                {data.visitor_type_annuals.map((row, index) => (
                                    <div
                                        key={index}
                                        className="grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 xl:grid-cols-[140px_220px_180px_minmax(0,1fr)_44px] xl:items-start"
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
                                            className="inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] xl:mt-6"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addVisitorTypeAnnual}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
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
                        </SectionCard>

                        <SectionCard
                            icon={Package}
                            title="Paket Wisata"
                            description="Kelola paket wisata yang tersedia pada destinasi ini."
                        >
                            <div className="space-y-3">
                                {data.packages.length === 0 && (
                                    <EmptyState
                                        icon={Package}
                                        title="Belum ada paket wisata"
                                        description="Tambahkan paket jika destinasi memiliki paket wisata khusus."
                                    />
                                )}

                                {data.packages.map((row, index) => (
                                    <div
                                        key={index}
                                        className="space-y-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3"
                                    >
                                        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_220px_180px_180px]">
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
                                        <div className="grid gap-3 xl:grid-cols-2">
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
                                                rows={3}
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
                                                rows={3}
                                                placeholder="Deskripsi singkat paket wisata"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <label className="flex items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-sm font-semibold text-[#303030]">
                                                <input
                                                    type="checkbox"
                                                    checked={row.is_active}
                                                    onChange={(event) =>
                                                        updatePackage(index, {
                                                            is_active:
                                                                event.target
                                                                    .checked,
                                                        })
                                                    }
                                                    className="size-4 accent-[#0066AE]"
                                                />
                                                Paket aktif
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removePackage(index)
                                                }
                                                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#F2C7C7] bg-white px-4 text-sm font-bold text-[#D81313] transition hover:bg-[#FFF6F6]"
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
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
                                >
                                    <Plus className="size-4" />
                                    Tambah Paket Wisata
                                </button>
                            </div>
                        </SectionCard>

                        <SectionCard
                            icon={Users}
                            title="Data Pekerja Tahunan"
                            description="Catat jumlah pekerja berdasarkan dimensi dan kategori pada setiap tahun."
                        >
                            <div className="space-y-3">
                                {data.annual_worker_stats.length === 0 && (
                                    <EmptyState
                                        icon={Users}
                                        title="Belum ada data pekerja"
                                        description="Tambahkan jumlah pekerja berdasarkan usia, gender, atau pendidikan."
                                    />
                                )}

                                {data.annual_worker_stats.map((row, index) => (
                                    <div
                                        key={index}
                                        className="grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 xl:grid-cols-[140px_180px_minmax(0,1fr)_180px_minmax(0,1fr)_44px] xl:items-start"
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
                                            className="inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] xl:mt-6"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addAnnualWorkerStat}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
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
                        </SectionCard>

                        <SectionCard
                            icon={GraduationCap}
                            title="Pelatihan Pekerja Tahunan"
                            description="Catat program pelatihan pekerja beserta jumlah pesertanya per tahun."
                        >
                            <div className="space-y-3">
                                {data.annual_worker_training_stats.length ===
                                    0 && (
                                    <EmptyState
                                        icon={GraduationCap}
                                        title="Belum ada data pelatihan"
                                        description="Tambahkan program pelatihan pekerja jika tersedia."
                                    />
                                )}

                                {data.annual_worker_training_stats.map(
                                    (row, index) => (
                                        <div
                                            key={index}
                                            className="grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 xl:grid-cols-[140px_minmax(0,1fr)_180px_minmax(0,1fr)_44px] xl:items-start"
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
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeAnnualWorkerTrainingStat(
                                                        index,
                                                    )
                                                }
                                                className="inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] xl:mt-6"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    ),
                                )}

                                <button
                                    type="button"
                                    onClick={addAnnualWorkerTrainingStat}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]"
                                >
                                    <Plus className="size-4" />
                                    Tambah Pelatihan Pekerja
                                </button>
                            </div>
                        </SectionCard>

                        <div className="sticky bottom-0 z-10 -mx-4 border-t border-[#DDE4EC] bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(3,17,32,0.08)] backdrop-blur sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6">
                            <div className="mx-auto flex max-w-[1500px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs font-semibold text-[#7C7C7C]">
                                    Village ID otomatis dari assignment:{' '}
                                    {assignment.village.id ?? '-'}
                                </p>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save className="size-4" />
                                    {processing
                                        ? 'Menyimpan...'
                                        : 'Simpan Pariwisata'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

CreatePariwisata.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Survey Assignment', href: surveyAssignments() },
        { title: 'Tambah Pariwisata', href: surveyAssignments() },
    ],
};
