import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, MapPin, Save, Ticket, UserRound } from 'lucide-react';
import type { FormEvent } from 'react';

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
};

type CreatePariwisataProps = {
    assignment: AssignmentSummary;
    category_options: Option[];
};

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
};

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
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
    const { data, setData, post, processing, errors, reset, clearErrors } =
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

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post(storePariwisata.url(assignment.code), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
            },
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
                                assignment ini. Data desa otomatis mengikuti
                                survey assignment.
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
                                        <TextInput
                                            label="Hari Operasional"
                                            value={data.operational_days}
                                            onChange={(value) =>
                                                setField(
                                                    'operational_days',
                                                    value,
                                                )
                                            }
                                            error={errors.operational_days}
                                            placeholder="Senin - Minggu"
                                        />
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
                                            value={data.entrance_ticket_price}
                                            onChange={(value) =>
                                                setField(
                                                    'entrance_ticket_price',
                                                    value,
                                                )
                                            }
                                            error={errors.entrance_ticket_price}
                                            type="number"
                                            placeholder="25000"
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
                                            />
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
