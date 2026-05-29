import { Head } from '@inertiajs/react';
import {
    ArrowLeft,
    Building2,
    Check,
    ChevronRight,
    ClipboardList,
    CloudUpload,
    FileText,
    MapPin,
    MoreVertical,
    Save,
    UserRound,
} from 'lucide-react';
import { useState } from 'react';

const colors = {
    primary: '#0066AE',
    primaryDark: '#093967',
    primaryLight: '#F1F5F8',
    accent: '#2FA6FC',
    background: '#F7F7F7',
    surface: '#FFFFFF',
    border: '#EFEFEF',
    text: '#303030',
    muted: '#7C7C7C',
    success: '#00893D',
    danger: '#D81313',
};

const scoreOptions = [
    {
        value: 1,
        title: 'Sangat Kurang',
        description: 'Fasilitas hampir tidak tersedia atau tidak layak',
    },
    {
        value: 2,
        title: 'Kurang',
        description: 'Fasilitas tersedia sangat terbatas',
    },
    {
        value: 3,
        title: 'Cukup',
        description: 'Fasilitas dasar tersedia namun belum optimal',
    },
    {
        value: 4,
        title: 'Baik',
        description: 'Fasilitas cukup lengkap dan berfungsi baik',
    },
    {
        value: 5,
        title: 'Sangat Baik',
        description:
            'Fasilitas lengkap, layak, dan mendukung kenyamanan wisatawan',
    },
];

const answerInfo = [
    { label: 'Dijawab oleh', value: 'Rani', icon: UserRound },
    { label: 'Terakhir diedit', value: 'Hari ini, 10:24', icon: null },
    { label: 'Versi template', value: 'v2.0', icon: FileText },
];

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center text-[#0066AE]">
                {icon}
            </span>
            <span className="min-w-0">
                <span className="block text-[11px] font-medium text-[#7C7C7C]">
                    {label}
                </span>
                <span className="block truncate text-sm font-semibold text-[#303030]">
                    {value}
                </span>
            </span>
        </div>
    );
}

function SectionTitle({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <div>
            <h2 className="text-base font-bold text-[#0066AE]">{title}</h2>
            {subtitle && (
                <p className="mt-1 text-xs font-medium text-[#7C7C7C]">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default function TakeSurvey() {
    const [selectedScore, setSelectedScore] = useState(4);

    return (
        <>
            <Head title="Isi Survey" />

            <div
                className="min-h-[100dvh] font-sans text-[#303030]"
                style={{ backgroundColor: colors.background }}
            >
                <header className="bg-white">
                    <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-4 sm:px-6">
                        <div className="flex min-w-0 items-center gap-3">
                            <button
                                type="button"
                                aria-label="Kembali"
                                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-95"
                            >
                                <ArrowLeft size={23} strokeWidth={2.2} />
                            </button>
                            <div className="min-w-0">
                                <h1 className="truncate text-xl leading-tight font-bold text-[#303030]">
                                    Isi Survey
                                </h1>
                                <p className="truncate text-sm font-medium text-[#7C7C7C]">
                                    Desa Wisata BCA
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-[#0066AE]">
                            <button
                                type="button"
                                aria-label="Simpan"
                                className="flex size-9 items-center justify-center rounded-lg transition hover:bg-[#F1F5F8] active:scale-95"
                            >
                                <Save size={22} strokeWidth={2.1} />
                            </button>
                            <button
                                type="button"
                                aria-label="Menu"
                                className="flex size-9 items-center justify-center rounded-lg transition hover:bg-[#F1F5F8] active:scale-95"
                            >
                                <MoreVertical size={22} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-4xl px-4 pt-4 pb-6 sm:px-6 sm:pt-6">
                    <nav
                        aria-label="Breadcrumb"
                        className="mb-4 flex items-center gap-2 text-sm font-semibold"
                    >
                        <span className="text-[#0066AE]">Survey</span>
                        <ChevronRight
                            size={16}
                            strokeWidth={2.4}
                            className="text-[#B0B0B0]"
                        />
                        <span className="text-[#303030]">Amenitas</span>
                    </nav>

                    <section className="rounded-t-3xl bg-white px-4 pt-5 pb-4 sm:px-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex min-w-0 gap-3">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#F1F5F8] text-[#0066AE]">
                                    <Building2 size={26} strokeWidth={2.1} />
                                </span>
                                <div className="min-w-0">
                                    <h2 className="truncate text-lg leading-tight font-bold text-[#303030] sm:text-xl">
                                        Desa Wisata Penglipuran
                                    </h2>
                                    <p className="mt-1 text-sm font-medium text-[#7C7C7C]">
                                        Assessment Desa Wisata 2026
                                    </p>
                                </div>
                            </div>

                            <span className="inline-flex h-8 w-fit items-center gap-2 rounded-full bg-[#F1F5F8] px-3 text-sm font-bold text-[#0066AE]">
                                <span className="size-2.5 rounded-full bg-[#2FA6FC]" />
                                In Progress
                            </span>
                        </div>

                        <div className="mt-5 grid gap-3 border-t border-[#EFEFEF] pt-4 sm:grid-cols-3">
                            <InfoRow
                                icon={
                                    <ClipboardList
                                        size={20}
                                        strokeWidth={2.1}
                                    />
                                }
                                label="Kode Assignment"
                                value="ASG-2026-024"
                            />
                            <InfoRow
                                icon={<UserRound size={20} strokeWidth={2.1} />}
                                label="Enumerator"
                                value="Rani"
                            />
                            <InfoRow
                                icon={<MapPin size={20} strokeWidth={2.1} />}
                                label="Lokasi"
                                value="Bangli, Bali"
                            />
                        </div>
                    </section>

                    <section className="bg-white px-4 pb-5 sm:px-6">
                        <div className="flex flex-col gap-3 border-t border-[#EFEFEF] pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-bold text-[#303030]">
                                    Pertanyaan 12 dari 48
                                </p>
                                <p className="mt-0.5 text-xs font-medium text-[#7C7C7C]">
                                    Progress pengisian 25%
                                </p>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F5F8] sm:w-72">
                                <div className="h-full w-1/4 rounded-full bg-[#0066AE]" />
                            </div>
                        </div>
                    </section>

                    <article className="bg-white px-4 pb-5 sm:px-6">
                        <div className="border-t border-[#EFEFEF] pt-5">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-md bg-[#F1F5F8] px-2.5 py-1 text-xs font-bold text-[#0066AE]">
                                    Amenitas
                                </span>
                                <span className="rounded-md bg-[#F1F5F8] px-2.5 py-1 text-xs font-semibold text-[#093967]">
                                    Q-012
                                </span>
                                <span className="rounded-md bg-[#FDECEC] px-2.5 py-1 text-xs font-bold text-[#D81313]">
                                    Wajib isi
                                </span>
                            </div>

                            <p className="mt-5 text-sm font-semibold text-[#0066AE]">
                                Pertanyaan survey
                            </p>
                            <h2 className="mt-2 max-w-3xl text-2xl leading-tight font-bold text-[#303030] sm:text-[26px]">
                                Bagaimana ketersediaan fasilitas umum bagi
                                wisatawan di desa wisata ini?
                            </h2>
                            <p className="mt-3 max-w-2xl text-sm leading-6 font-medium text-[#7C7C7C] sm:text-[15px]">
                                Penilaian meliputi toilet, tempat parkir, papan
                                informasi, area istirahat, dan akses dasar lain
                                untuk pengunjung.
                            </p>
                        </div>
                    </article>

                    <section className="bg-white px-4 pb-5 sm:px-6">
                        <div className="border-t border-[#EFEFEF] pt-5">
                            <SectionTitle
                                title="Pilih skor"
                                subtitle="Pilih satu nilai yang paling sesuai kondisi lapangan."
                            />

                            <div className="mt-3 divide-y divide-[#EFEFEF]">
                                {scoreOptions.map((option) => {
                                    const selected =
                                        selectedScore === option.value;

                                    return (
                                        <label
                                            key={option.value}
                                            className={classNames(
                                                'flex cursor-pointer items-start gap-3 py-3 transition active:scale-[0.995]',
                                                selected &&
                                                    'rounded-xl bg-[#F1F5F8] px-3',
                                            )}
                                        >
                                            <input
                                                type="radio"
                                                name="score"
                                                value={option.value}
                                                checked={selected}
                                                onChange={() =>
                                                    setSelectedScore(
                                                        option.value,
                                                    )
                                                }
                                                className="sr-only"
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2',
                                                    selected
                                                        ? 'border-[#0066AE]'
                                                        : 'border-[#D1D8E0]',
                                                )}
                                            >
                                                {selected && (
                                                    <span className="size-3 rounded-full bg-[#0066AE]" />
                                                )}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span
                                                    className={classNames(
                                                        'block text-sm leading-5 font-bold',
                                                        selected
                                                            ? 'text-[#0066AE]'
                                                            : 'text-[#303030]',
                                                    )}
                                                >
                                                    {option.value} -{' '}
                                                    {option.title}
                                                </span>
                                                <span className="block text-xs leading-5 font-medium text-[#7C7C7C] sm:text-sm">
                                                    {option.description}
                                                </span>
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white px-4 pb-5 sm:px-6">
                        <div className="border-t border-[#EFEFEF] pt-5">
                            <SectionTitle
                                title="Dokumen pendukung"
                                subtitle="Opsional, gunakan jika ada bukti visual di lokasi."
                            />

                            <button
                                type="button"
                                className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-[#F1F5F8] px-4 py-4 text-left transition hover:bg-[#EAF3FF] active:scale-[0.995]"
                            >
                                <CloudUpload
                                    size={32}
                                    strokeWidth={2.1}
                                    className="shrink-0 text-[#0066AE]"
                                />
                                <span>
                                    <span className="block text-sm font-bold text-[#0066AE]">
                                        Unggah foto atau dokumen
                                    </span>
                                    <span className="block text-xs font-medium text-[#7C7C7C]">
                                        JPG, PNG, atau PDF
                                    </span>
                                </span>
                            </button>

                            <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white py-2">
                                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-[#D7E9D8] sm:h-16 sm:w-24">
                                    <div className="h-full w-full bg-[linear-gradient(135deg,#7FB079_0%,#D9EBD1_42%,#ECE4D4_43%,#ECE4D4_63%,#7F9F6D_64%,#4B7C4D_100%)]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-[#303030] sm:text-base">
                                        foto-fasilitas-umum.jpg
                                    </p>
                                    <p className="mt-0.5 text-xs font-medium text-[#7C7C7C]">
                                        1.8 MB
                                    </p>
                                </div>
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#00893D] text-white">
                                    <Check size={18} strokeWidth={3} />
                                </span>
                                <button
                                    type="button"
                                    aria-label="Menu dokumen"
                                    className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#7C7C7C] transition hover:bg-[#F1F5F8] active:scale-95"
                                >
                                    <MoreVertical size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-b-3xl bg-white px-4 pb-5 sm:px-6">
                        <div className="border-t border-[#EFEFEF] pt-5">
                            <SectionTitle title="Informasi jawaban" />

                            <div className="mt-3 grid gap-2.5 text-sm">
                                {answerInfo.map(
                                    ({ label, value, icon: Icon }) => (
                                        <div
                                            key={label}
                                            className="grid grid-cols-[28px_1fr_auto] items-center gap-2.5"
                                        >
                                            <span className="flex size-7 items-center justify-center text-[#0066AE]">
                                                {Icon ? (
                                                    <Icon
                                                        size={20}
                                                        strokeWidth={2.1}
                                                    />
                                                ) : (
                                                    <span className="relative size-5 rounded-full border-2 border-[#0066AE]">
                                                        <span className="absolute top-1/2 left-1/2 h-2.5 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066AE]" />
                                                        <span className="absolute top-[4px] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#0066AE]" />
                                                    </span>
                                                )}
                                            </span>
                                            <span className="font-medium text-[#7C7C7C]">
                                                {label}
                                            </span>
                                            <span className="text-right font-semibold text-[#303030]">
                                                {value}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </section>

                    <footer className="mt-4 grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center">
                        <button
                            type="button"
                            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-[0.98]"
                        >
                            <ArrowLeft size={20} strokeWidth={2.2} />
                            Sebelumnya
                        </button>

                        <button
                            type="button"
                            className="h-11 rounded-xl px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-[0.98]"
                        >
                            Simpan Draft
                        </button>

                        <button
                            type="button"
                            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.16)] transition hover:bg-[#093967] active:scale-[0.98]"
                        >
                            Simpan &amp; Lanjut
                            <ChevronRight size={20} strokeWidth={2.3} />
                        </button>
                    </footer>
                </main>
            </div>
        </>
    );
}

TakeSurvey.layout = null;
