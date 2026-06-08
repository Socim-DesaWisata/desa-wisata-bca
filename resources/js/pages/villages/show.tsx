import { Head } from '@inertiajs/react';
import {
    Bath,
    BedDouble,
    Building2,
    Bus,
    Camera,
    ChevronRight,
    CircleParking,
    Clock3,
    Coffee,
    Compass,
    Facebook,
    Gift,
    Headphones,
    Home,
    Image as ImageIcon,
    Instagram,
    Landmark,
    Mail,
    Map,
    MapPin,
    Menu,
    MessageCircle,
    Navigation,
    Phone,
    Play,
    Route,
    Search,
    ShieldCheck,
    Sparkles,
    Star,
    Store,
    Sun,
    Twitter,
    Umbrella,
    UsersRound,
    Utensils,
    Wifi,
    Youtube,
} from 'lucide-react';
import type { ReactNode } from 'react';

type MediaItem = {
    id: number;
    title: string | null;
    caption: string | null;
    url: string | null;
    is_cover: boolean;
};

type ProfileGroup = {
    category: string;
    items: Array<{
        id: number;
        name: string;
        description: string | null;
        price_text: string | null;
        media: MediaItem[];
    }>;
};

type VillageShowProps = {
    village: {
        name: string;
        description: string | null;
        location: string;
        address: string;
        manager_phone: string;
        manager_email: string;
        maps_url: string | null;
        media: MediaItem[];
        cover: MediaItem | null;
        profile_items: ProfileGroup[];
    };
};

const images = {
    hero: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2200&q=88',
    rice: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1400&q=88',
    waterfall:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=86',
    lake: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1000&q=86',
    sunset: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=86',
    beach: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=86',
    village:
        'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1000&q=86',
    homestay:
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=86',
    homestay2:
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=86',
    homestay3:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=86',
    woven: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=86',
    coffee: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=700&q=86',
    honey: 'https://images.unsplash.com/photo-1594631661960-34762327295d?auto=format&fit=crop&w=700&q=86',
    textile:
        'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=86',
    culture:
        'https://images.unsplash.com/photo-1555400082-8dd4f02229f6?auto=format&fit=crop&w=900&q=86',
    food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=86',
    rafting:
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86',
};

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function getItems(profileItems: ProfileGroup[], category: string) {
    return (
        profileItems.find((group) =>
            group.category.toLowerCase().includes(category.toLowerCase()),
        )?.items ?? []
    );
}

function SectionHeader({
    eyebrow,
    title,
    description,
    align = 'left',
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: 'left' | 'center';
}) {
    return (
        <div
            className={classNames(
                'mb-9',
                align === 'center' && 'mx-auto max-w-2xl text-center',
            )}
        >
            {eyebrow && (
                <p className="mb-3 text-xs font-extrabold tracking-[0.18em] text-[#0066AE] uppercase">
                    {eyebrow}
                </p>
            )}
            <h2 className="text-3xl leading-tight font-black tracking-[-0.01em] text-[#1E293B] md:text-4xl">
                {title}
            </h2>
            {description && (
                <p className="mt-3 text-base leading-7 font-medium text-[#64748B]">
                    {description}
                </p>
            )}
        </div>
    );
}

function PrimaryButton({ children }: { children: ReactNode }) {
    return (
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0066AE] px-6 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(0,102,174,0.28)] transition hover:bg-[#093967] active:scale-[0.98]">
            {children}
        </button>
    );
}

function SecondaryButton({ children }: { children: ReactNode }) {
    return (
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D7E4F1] bg-white px-6 text-sm font-extrabold text-[#093967] transition hover:bg-[#F4F8FC] active:scale-[0.98]">
            {children}
        </button>
    );
}

function StatTile({ value, label }: { value: string; label: string }) {
    return (
        <div className="rounded-2xl border border-white/20 bg-white/16 p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-md">
            <p className="text-3xl font-black">{value}</p>
            <p className="mt-1 text-sm font-bold text-white/82">{label}</p>
        </div>
    );
}

function InfoCard({
    icon,
    title,
    body,
}: {
    icon: ReactNode;
    title: string;
    body: string;
}) {
    return (
        <article className="rounded-3xl border border-[#EAF0F6] bg-white p-6 shadow-[0_18px_50px_rgba(9,57,103,0.07)]">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#F4F8FC] text-[#0066AE]">
                {icon}
            </div>
            <h3 className="text-base font-black text-[#1E293B]">{title}</h3>
            <p className="mt-2 text-sm leading-6 font-medium text-[#64748B]">
                {body}
            </p>
        </article>
    );
}

function FacilityCard({
    icon,
    title,
    body,
}: {
    icon: ReactNode;
    title: string;
    body: string;
}) {
    return (
        <article className="rounded-2xl border border-[#E2EAF3] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(9,57,103,0.10)]">
            <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-[#EAF6FF] text-[#0066AE]">
                {icon}
            </div>
            <h3 className="text-sm font-black text-[#1E293B]">{title}</h3>
            <p className="mt-2 text-xs leading-5 font-medium text-[#64748B]">
                {body}
            </p>
        </article>
    );
}

function DestinationCard({
    image,
    title,
    tag,
    body,
}: {
    image: string;
    title: string;
    tag: string;
    body: string;
}) {
    return (
        <article className="overflow-hidden rounded-3xl border border-[#EAF0F6] bg-white shadow-[0_18px_50px_rgba(9,57,103,0.08)]">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded-full bg-white/92 px-3 py-1 text-xs font-black text-[#0066AE] backdrop-blur">
                    {tag}
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/92 px-3 py-1 text-xs font-black text-[#1E293B]">
                    <Star className="size-3.5 fill-[#FBBF24] text-[#FBBF24]" />
                    4.8
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-black text-[#1E293B]">{title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 font-medium text-[#64748B]">
                    {body}
                </p>
                <button className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[#F4F8FC] px-4 text-sm font-black text-[#0066AE]">
                    Lihat Detail
                    <ChevronRight className="size-4" />
                </button>
            </div>
        </article>
    );
}

function GalleryTile({
    image,
    label,
    large,
}: {
    image: string;
    label: string;
    large?: boolean;
}) {
    return (
        <article
            className={classNames(
                'group relative overflow-hidden rounded-3xl bg-[#093967]',
                large ? 'md:col-span-2 md:row-span-2' : '',
            )}
        >
            <img
                src={image}
                alt={label}
                className="h-full min-h-[220px] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061D36]/72 via-transparent to-transparent opacity-90" />
            <div className="absolute right-5 bottom-5 left-5">
                <span className="inline-flex rounded-full bg-white/92 px-3 py-1 text-xs font-black text-[#093967]">
                    {label}
                </span>
            </div>
        </article>
    );
}

function ProductCard({
    image,
    name,
    body,
    price,
}: {
    image: string;
    name: string;
    body: string;
    price: string;
}) {
    return (
        <article className="rounded-3xl border border-[#EAF0F6] bg-white p-4 shadow-[0_18px_50px_rgba(9,57,103,0.07)]">
            <div className="h-52 overflow-hidden rounded-2xl bg-[#F4F8FC]">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="p-2 pt-5">
                <h3 className="text-lg font-black text-[#1E293B]">{name}</h3>
                <p className="mt-2 min-h-10 text-sm leading-5 font-medium text-[#64748B]">
                    {body}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="font-black text-[#0066AE]">{price}</p>
                    <button className="rounded-full bg-[#EAF6FF] px-4 py-2 text-xs font-black text-[#0066AE]">
                        Lihat Produk
                    </button>
                </div>
            </div>
        </article>
    );
}

function HomestayCard({
    image,
    name,
    price,
    capacity,
}: {
    image: string;
    name: string;
    price: string;
    capacity: string;
}) {
    return (
        <article className="overflow-hidden rounded-3xl border border-[#EAF0F6] bg-white shadow-[0_18px_50px_rgba(9,57,103,0.08)]">
            <div className="relative h-64">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover"
                />
                <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/92 px-3 py-1 text-xs font-black text-[#1E293B]">
                    <Star className="size-3.5 fill-[#FBBF24] text-[#FBBF24]" />
                    4.9
                </span>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-black text-[#1E293B]">{name}</h3>
                <p className="mt-2 text-sm font-bold text-[#64748B]">
                    {capacity} tamu · Wi-Fi · Sarapan · Kamar mandi
                </p>
                <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold text-[#64748B]">
                            Mulai dari
                        </p>
                        <p className="text-lg font-black text-[#0066AE]">
                            {price}
                        </p>
                    </div>
                    <button className="rounded-full bg-[#0066AE] px-5 py-2.5 text-sm font-black text-white">
                        Booking
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function VillageShow({ village }: VillageShowProps) {
    const cover = village.cover?.url ?? village.media[0]?.url ?? images.hero;
    const attractions = getItems(village.profile_items, 'atraksi');
    const souvenirs = getItems(village.profile_items, 'suvenir');
    const homestays = getItems(village.profile_items, 'homestay');

    const destinationCards = [
        {
            image: images.sunset,
            title: attractions[0]?.name || 'Bukit Panorama',
            tag: 'Alam',
            body: 'Titik terbaik untuk melihat hamparan desa, sawah bertingkat, dan matahari terbenam.',
        },
        {
            image: images.waterfall,
            title: attractions[1]?.name || 'Air Terjun Desa',
            tag: 'Petualangan',
            body: 'Jalur pendek menuju air terjun jernih dengan area istirahat dan pemandu lokal.',
        },
        {
            image: images.beach,
            title: attractions[2]?.name || 'Pantai Tersembunyi',
            tag: 'Bahari',
            body: 'Pantai tenang untuk keluarga, foto perjalanan, dan piknik sore bersama warga.',
        },
        {
            image: images.culture,
            title: attractions[3]?.name || 'Kampung Budaya',
            tag: 'Budaya',
            body: 'Ruang belajar tradisi, tarian, musik, dan cerita lokal dari pelaku budaya desa.',
        },
    ];

    const productCards = [
        {
            image: images.textile,
            name: souvenirs[0]?.name || 'Kain Tenun',
            body: 'Motif lokal dengan pewarna alam dan pengerjaan tangan.',
            price: souvenirs[0]?.price_text || 'Rp250.000',
        },
        {
            image: images.woven,
            name: souvenirs[1]?.name || 'Kerajinan Anyaman',
            body: 'Tas dan dekorasi rumah dari bambu pilihan warga desa.',
            price: souvenirs[1]?.price_text || 'Rp150.000',
        },
        {
            image: images.coffee,
            name: souvenirs[2]?.name || 'Kopi Lokal',
            body: 'Biji kopi pilihan dari kebun sekitar desa wisata.',
            price: souvenirs[2]?.price_text || 'Rp65.000',
        },
        {
            image: images.food,
            name: souvenirs[3]?.name || 'Makanan Tradisional',
            body: 'Camilan khas desa yang cocok untuk buah tangan.',
            price: souvenirs[3]?.price_text || 'Rp45.000',
        },
    ];

    const homestayCards = [
        {
            image: homestays[0]?.media[0]?.url || images.homestay,
            name: homestays[0]?.name || 'Homestay Padi Asri',
            price: homestays[0]?.price_text || 'Rp350.000/malam',
            capacity: '2-3',
        },
        {
            image: homestays[1]?.media[0]?.url || images.homestay2,
            name: homestays[1]?.name || 'Rumah Kayu Lestari',
            price: homestays[1]?.price_text || 'Rp450.000/malam',
            capacity: '4',
        },
        {
            image: homestays[2]?.media[0]?.url || images.homestay3,
            name: homestays[2]?.name || 'Villa Bukit Indah',
            price: homestays[2]?.price_text || 'Rp850.000/malam',
            capacity: '6',
        },
    ];

    return (
        <>
            <Head title={`${village.name} - Desa Wisata BCA`} />

            <main className="min-h-screen bg-[#F7FBFF] font-sans text-[#172033]">
                <section className="relative min-h-[720px] overflow-hidden bg-[#F7FBFF]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_38%_48%,rgba(47,166,252,0.14),transparent_22%),radial-gradient(circle_at_72%_12%,rgba(0,102,174,0.12),transparent_20%)]" />
                    <div className="pointer-events-none absolute right-0 top-28 h-80 w-80 rounded-full border border-[#AAD2F8]/35 opacity-70 [mask-image:radial-gradient(circle,black_45%,transparent_67%)]" />
                    <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-80 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,102,174,0.12),transparent_62%)]" />

                    <header className="relative z-30">
                        <div className="mx-auto flex h-22 max-w-[1400px] items-center gap-7 px-8 2xl:px-12">
                            <a className="flex min-w-fit items-center gap-3">
                                <span className="relative flex size-14 items-center justify-center rounded-full border-2 border-[#0066AE] text-[#0066AE]">
                                    <Home className="size-6" strokeWidth={1.8} />
                                    <span className="absolute -right-1 top-5 size-3 rounded-full bg-[#2FA6FC]" />
                                </span>
                                <span>
                                    <span className="block text-[24px] leading-7 font-bold tracking-[-0.03em] text-[#093967]">
                                        Desa Wisata
                                    </span>
                                    <span className="mt-0.5 block text-[12px] font-medium tracking-[0.32em] text-[#2FA6FC]">
                                        Indonesia
                                    </span>
                                </span>
                            </a>

                            <nav className="hidden flex-1 items-center justify-center gap-7 text-[14px] font-semibold text-[#172033] xl:flex">
                                {[
                                    'Beranda',
                                    'Tentang Desa',
                                    'Destinasi',
                                    'Aktivitas',
                                    'Produk UMKM',
                                    'Galeri',
                                    'Blog',
                                ].map((item, index) => (
                                    <a
                                        key={item}
                                        className={classNames(
                                            'relative transition hover:text-[#0066AE]',
                                            index === 0 && 'text-[#0066AE]',
                                        )}
                                    >
                                        {item}
                                        {index === 0 && (
                                            <span className="absolute left-1/2 top-8 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#0066AE]" />
                                        )}
                                    </a>
                                ))}
                            </nav>

                            <div className="ml-auto hidden items-center gap-6 xl:flex">
                                <button className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#172033]">
                                    <Map className="size-5" strokeWidth={1.8} />
                                    ID
                                    <ChevronRight className="size-3 rotate-90" />
                                </button>
                                <span className="h-7 w-px bg-[#C8DEF0]" />
                                <button className="inline-flex h-11 items-center justify-center gap-3 rounded-full bg-[#0066AE] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(0,102,174,0.24)] transition hover:bg-[#093967] active:scale-[0.98]">
                                    Rencanakan Kunjungan
                                    <Navigation className="size-4" strokeWidth={1.9} />
                                </button>
                            </div>

                            <button className="ml-auto flex size-11 items-center justify-center rounded-full border border-[#C8DEF0] bg-white/70 text-[#0066AE] xl:hidden">
                                <Menu className="size-5" />
                            </button>
                        </div>
                    </header>

                    <div className="relative z-10 mx-auto grid min-h-[600px] max-w-[1400px] grid-cols-1 items-center gap-10 px-8 pb-14 pt-4 lg:grid-cols-[0.84fr_1.16fr] 2xl:px-12">
                        <div className="relative max-w-[540px]">
                            <div className="mb-6 flex items-center gap-3 text-[14px] font-semibold text-[#2FA6FC]">
                                <span className="h-px w-10 bg-[#2FA6FC]" />
                                <Sparkles className="size-4.5" strokeWidth={1.5} />
                                <span>Alam. Budaya. Kearifan Lokal.</span>
                            </div>

                            <h1 className="text-[54px] leading-[0.98] font-extrabold tracking-[-0.04em] text-[#172033] md:text-[66px] xl:text-[72px]">
                                Discover the
                                <br />
                                Beauty of
                                <br />
                                <span className="text-[#0066AE]">
                                    Desa Wisata
                                </span>
                            </h1>

                            <p className="mt-6 max-w-[500px] text-[16px] leading-7 font-medium text-[#45566A]">
                                Jelajahi keindahan alam, budaya yang hidup, dan
                                keramahan warga. Nikmati pengalaman wisata desa
                                yang autentik, dukung UMKM lokal, dan ciptakan
                                kenangan tak terlupakan.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <button className="inline-flex h-13 items-center justify-center gap-7 rounded-full bg-[#0066AE] px-7 text-sm font-bold text-white shadow-[0_16px_32px_rgba(0,102,174,0.22)] transition hover:bg-[#093967] active:scale-[0.98]">
                                    Explore Village
                                    <ChevronRight className="size-4.5" />
                                </button>
                                <button className="inline-flex h-13 items-center justify-center gap-7 rounded-full border border-[#AAD2F8] bg-white/62 px-7 text-sm font-bold text-[#0066AE] transition hover:bg-white active:scale-[0.98]">
                                    Learn More
                                    <ChevronRight className="size-4.5" />
                                </button>
                            </div>

                            <svg
                                className="pointer-events-none absolute -bottom-16 left-40 hidden h-20 w-[300px] text-[#2FA6FC] lg:block"
                                viewBox="0 0 360 96"
                                fill="none"
                            >
                                <path
                                    d="M4 16C78 84 171 86 178 48C183 20 132 23 149 57C170 100 289 84 350 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeDasharray="8 9"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M330 10C342 20 346 34 336 48C323 36 318 24 330 10Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>

                        <div className="relative min-h-[500px] lg:min-h-[560px]">
                            <img
                                src={cover}
                                alt={village.name}
                                className="absolute left-[8%] top-4 h-[430px] w-[58%] rounded-[28px] border border-white/70 object-cover shadow-[0_22px_48px_rgba(0,102,174,0.14)] ring-2 ring-[#D7EAFB]/80"
                            />
                            <img
                                src={images.homestay}
                                alt="Rumah tradisional desa wisata"
                                className="absolute right-[3%] top-18 h-[210px] w-[43%] rounded-[24px] border border-white/75 object-cover shadow-[0_18px_42px_rgba(0,102,174,0.13)] ring-2 ring-[#D7EAFB]/80"
                            />
                            <img
                                src={images.culture}
                                alt="Aktivitas budaya desa"
                                className="absolute bottom-3 right-0 h-[260px] w-[42%] rounded-[24px] border border-white/75 object-cover shadow-[0_18px_42px_rgba(0,102,174,0.13)] ring-2 ring-[#D7EAFB]/80"
                            />
                            <img
                                src={images.food}
                                alt="Kuliner lokal desa wisata"
                                className="absolute bottom-8 left-0 h-[155px] w-[31%] rounded-[20px] border border-white/75 object-cover shadow-[0_16px_34px_rgba(0,102,174,0.12)] ring-2 ring-[#D7EAFB]/80"
                            />
                            <div className="absolute bottom-[140px] right-[36%] flex size-24 items-center justify-center rounded-full border border-white/80 bg-[#EAF3FF] text-center shadow-[0_14px_28px_rgba(0,102,174,0.12)] ring-2 ring-[#D7EAFB]/80">
                                <div className="rounded-full border border-[#AAD2F8] p-3">
                                    <Sparkles className="mx-auto size-5 text-[#0066AE]" />
                                    <p className="mt-1.5 text-[8px] font-bold tracking-[0.28em] text-[#093967]">
                                        WISATA DESA
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-24">
                    <div className="mx-auto max-w-[1180px] px-6">
                        <SectionHeader
                            align="center"
                            eyebrow="Keunggulan"
                            title="Pengalaman wisata yang tertata dari awal"
                            description="Setiap elemen perjalanan disiapkan agar pengunjung merasa aman, mendapat informasi jelas, dan tetap dekat dengan kehidupan warga."
                        />
                        <div className="grid gap-6 md:grid-cols-4">
                            <InfoCard
                                icon={<Building2 className="size-6" />}
                                title="Fasilitas Lengkap"
                                body="Area publik, pusat informasi, parkir, dan fasilitas dasar yang mudah dijangkau."
                            />
                            <InfoCard
                                icon={<Landmark className="size-6" />}
                                title="Budaya & Tradisi"
                                body="Agenda seni, kerajinan, dan cerita lokal yang dikemas dengan hormat."
                            />
                            <InfoCard
                                icon={<Route className="size-6" />}
                                title="Tur & Aktivitas"
                                body="Pemandu lokal membantu wisatawan menikmati rute dan aktivitas desa."
                            />
                            <InfoCard
                                icon={<Headphones className="size-6" />}
                                title="Dukungan 24/7"
                                body="Tim kontak siap membantu pertanyaan reservasi dan kebutuhan perjalanan."
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-[#F4F8FC] py-24">
                    <div className="mx-auto max-w-[1180px] px-6">
                        <SectionHeader
                            eyebrow="Fasilitas"
                            title="Fasilitas Desa"
                            description="Fasilitas dibuat ringkas, bersih, dan mudah ditemukan agar kunjungan terasa nyaman."
                        />
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            <FacilityCard
                                icon={<CircleParking className="size-6" />}
                                title="Area Parkir"
                                body="Parkir motor dan mobil dekat titik kumpul wisata."
                            />
                            <FacilityCard
                                icon={<Bath className="size-6" />}
                                title="Toilet Umum"
                                body="Toilet bersih dengan jadwal perawatan rutin."
                            />
                            <FacilityCard
                                icon={<Umbrella className="size-6" />}
                                title="Mushola"
                                body="Tempat ibadah nyaman untuk pengunjung."
                            />
                            <FacilityCard
                                icon={<Map className="size-6" />}
                                title="Pusat Informasi"
                                body="Titik informasi rute, harga, dan jadwal aktivitas."
                            />
                            <FacilityCard
                                icon={<Utensils className="size-6" />}
                                title="Warung Kuliner"
                                body="Pilihan makanan lokal dari warga desa."
                            />
                            <FacilityCard
                                icon={<Wifi className="size-6" />}
                                title="Wi-Fi Area"
                                body="Akses internet di area publik tertentu."
                            />
                            <FacilityCard
                                icon={<Camera className="size-6" />}
                                title="Spot Foto"
                                body="Titik foto dengan pemandangan sawah dan bukit."
                            />
                            <FacilityCard
                                icon={<Bus className="size-6" />}
                                title="Pemandu Wisata"
                                body="Pemandu lokal untuk tur keluarga dan grup."
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-white py-24">
                    <div className="mx-auto max-w-[1180px] px-6">
                        <SectionHeader
                            eyebrow="Destinasi"
                            title="Wisata Liburan"
                            description="Empat pilihan wisata utama untuk menikmati alam, budaya, dan aktivitas desa dalam ritme yang nyaman."
                        />
                        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
                            {destinationCards.map((card) => (
                                <DestinationCard key={card.title} {...card} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-[#F4F8FC] py-24">
                    <div className="mx-auto max-w-[1180px] px-6">
                        <SectionHeader
                            align="center"
                            eyebrow="Galeri"
                            title="Galeri Desa"
                            description="Cuplikan suasana desa, aktivitas wisata, produk lokal, dan momen budaya yang bisa dinikmati pengunjung."
                        />
                        <div className="grid auto-rows-[220px] gap-5 md:grid-cols-4">
                            <GalleryTile
                                image={cover}
                                label="Pemandangan desa"
                                large
                            />
                            <GalleryTile
                                image={images.culture}
                                label="Budaya lokal"
                            />
                            <GalleryTile image={images.food} label="Kuliner" />
                            <GalleryTile
                                image={images.homestay}
                                label="Homestay"
                            />
                            <GalleryTile
                                image={images.rafting}
                                label="Aktivitas wisata"
                            />
                            <GalleryTile
                                image={images.woven}
                                label="Produk suvenir"
                            />
                            <GalleryTile
                                image={images.rice}
                                label="Sawah terasering"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-white py-24">
                    <div className="mx-auto max-w-[1180px] px-6">
                        <SectionHeader
                            eyebrow="UMKM desa"
                            title="Suvenir Khas Desa"
                            description="Produk lokal dipilih untuk menjadi buah tangan berkualitas sekaligus mendukung usaha warga."
                        />
                        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
                            {productCards.map((product) => (
                                <ProductCard key={product.name} {...product} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-[#F4F8FC] py-24">
                    <div className="mx-auto max-w-[1180px] px-6">
                        <SectionHeader
                            eyebrow="Menginap"
                            title="Pilihan Homestay"
                            description="Homestay warga dengan suasana hangat, fasilitas nyaman, dan akses dekat ke titik wisata."
                        />
                        <div className="grid gap-7 lg:grid-cols-3">
                            {homestayCards.map((homestay) => (
                                <HomestayCard
                                    key={homestay.name}
                                    {...homestay}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-24">
                    <div className="mx-auto max-w-[1180px] px-6">
                        <SectionHeader
                            eyebrow="Lokasi"
                            title="Lokasi & Kontak"
                            description="Gunakan informasi berikut untuk merencanakan rute, reservasi, dan kebutuhan kunjungan."
                        />
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-[#EAF0F6] bg-[#EAF6FF] shadow-[0_18px_50px_rgba(9,57,103,0.08)]">
                                <iframe
                                    title="Lokasi desa"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(village.location || village.name)}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
                                    className="h-full min-h-[420px] w-full border-0"
                                    loading="lazy"
                                />
                                <div className="absolute top-6 left-6 rounded-2xl bg-white p-4 shadow-[0_16px_36px_rgba(9,57,103,0.12)]">
                                    <p className="text-sm font-black text-[#093967]">
                                        Desa Wisata BCA
                                    </p>
                                    <p className="mt-1 max-w-[220px] text-xs font-semibold text-[#64748B]">
                                        {village.location}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-[32px] border border-[#EAF0F6] bg-white p-8 shadow-[0_18px_50px_rgba(9,57,103,0.08)]">
                                <div className="space-y-6">
                                    {[
                                        [
                                            MapPin,
                                            'Alamat lengkap',
                                            `${village.address}, ${village.location}`,
                                        ],
                                        [
                                            Phone,
                                            'Nomor WhatsApp',
                                            village.manager_phone,
                                        ],
                                        [Mail, 'Email', village.manager_email],
                                        [
                                            Clock3,
                                            'Jam operasional',
                                            'Setiap hari, 08.00 - 20.00 WIB',
                                        ],
                                    ].map(([Icon, title, value]) => (
                                        <div
                                            key={title as string}
                                            className="flex gap-4"
                                        >
                                            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#F4F8FC] text-[#0066AE]">
                                                <Icon className="size-5" />
                                            </span>
                                            <div>
                                                <p className="text-sm font-black text-[#1E293B]">
                                                    {title as string}
                                                </p>
                                                <p className="mt-1 text-sm leading-6 font-medium text-[#64748B]">
                                                    {value as string}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    <PrimaryButton>
                                        <Navigation className="size-4" />
                                        Buka Maps
                                    </PrimaryButton>
                                    <SecondaryButton>
                                        <MessageCircle className="size-4" />
                                        Hubungi Kami
                                    </SecondaryButton>
                                </div>
                                <div className="mt-8 flex gap-3">
                                    {[
                                        Instagram,
                                        Facebook,
                                        Youtube,
                                        Twitter,
                                    ].map((Icon, index) => (
                                        <span
                                            key={index}
                                            className={classNames(
                                                'flex size-11 items-center justify-center rounded-full text-white',
                                                index === 0 && 'bg-[#E8487A]',
                                                index === 1 && 'bg-[#1877F2]',
                                                index === 2 && 'bg-[#FF0033]',
                                                index === 3 && 'bg-[#111827]',
                                            )}
                                        >
                                            <Icon className="size-5" />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-[#093967] py-16 text-white">
                    <div className="mx-auto grid max-w-[1180px] gap-10 px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#0066AE]">
                                    <Home className="size-5" />
                                </span>
                                <p className="text-xl font-black">
                                    Desa Wisata BCA
                                </p>
                            </div>
                            <p className="mt-5 max-w-sm text-sm leading-7 font-medium text-white/72">
                                Profil desa wisata modern untuk memperkenalkan
                                destinasi, fasilitas, homestay, dan produk lokal
                                kepada pengunjung.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-black">Quick links</h3>
                            <div className="mt-5 space-y-3 text-sm font-medium text-white/72">
                                <p>Destinasi</p>
                                <p>Fasilitas</p>
                                <p>Galeri</p>
                                <p>Homestay</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-black">Informasi</h3>
                            <div className="mt-5 space-y-3 text-sm font-medium text-white/72">
                                <p>Lokasi</p>
                                <p>Kontak</p>
                                <p>Produk lokal</p>
                                <p>Agenda wisata</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-black">Kontak</h3>
                            <div className="mt-5 space-y-3 text-sm font-medium text-white/72">
                                <p>{village.manager_phone}</p>
                                <p>{village.manager_email}</p>
                                <p>{village.location}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto mt-12 flex max-w-[1180px] items-center justify-between border-t border-white/12 px-6 pt-6 text-sm font-medium text-white/58">
                        <p>Copyright 2026 Desa Wisata BCA</p>
                        <div className="flex gap-4">
                            <ImageIcon className="size-4" />
                            <Store className="size-4" />
                            <Gift className="size-4" />
                            <Coffee className="size-4" />
                            <BedDouble className="size-4" />
                            <Sun className="size-4" />
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}

VillageShow.layout = null;
