import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    BedDouble,
    ChevronDown,
    ChevronRight,
    Clock3,
    Facebook,
    HeartHandshake,
    Instagram,
    Leaf,
    Mail,
    MapPin,
    Menu,
    Mountain,
    Phone,
    PlayCircle,
    ScrollText,
    Search,
    ShieldCheck,
    Star,
    TreePine,
    Users,
    UtensilsCrossed,
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';

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

type IconCardItem = {
    icon: LucideIcon;
    title: string;
    description: string;
};

type PackageItem = {
    title: string;
    image: string;
    duration: string;
    price: string;
    rating: string;
};

type AttractionItem = {
    title: string;
    image: string;
};

type TestimonialItem = {
    name: string;
    role: string;
    avatar: string;
};

type ArticleItem = {
    title: string;
    image: string;
    date: string;
};


const images = {
    hero: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80',
    about: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    packageVillage: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
    packageCulture: 'https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?auto=format&fit=crop&w=900&q=80',
    packageAdventure: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=900&q=80',
    packageStay: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
    attraction1: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80',
    attraction2: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80',
    attraction3: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=80',
    attraction4: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=700&q=80',
    attraction5: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=700&q=80',
    attraction6: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=700&q=80',
    gallery1: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80',
    gallery2: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=700&q=80',
    gallery3: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=700&q=80',
    gallery4: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=700&q=80',
    gallery5: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=80',
    article1: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=700&q=80',
    article2: 'https://images.unsplash.com/photo-1459666644539-a9755287d6b0?auto=format&fit=crop&w=700&q=80',
    article3: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80',
    avatar1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80',
    avatar2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80',
    cta: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80',
};

const stats = [
    { icon: MapPin, value: '28+', label: 'Paket Wisata' },
    { icon: TreePine, value: '15+', label: 'Atraksi Lokal' },
    { icon: Users, value: '10.000+', label: 'Pengunjung' },
    { icon: HeartHandshake, value: '100%', label: 'Berbasis Masyarakat' },
];

const aboutHighlights: IconCardItem[] = [
    { icon: Leaf, title: 'Alami Cepat', description: 'Menyatu dengan suasana hijau dan pengalaman yang menenangkan.' },
    { icon: ScrollText, title: 'Pengalaman Edukasi', description: 'Cocok untuk sekolah, komunitas, sekaligus wisata keluarga.' },
    { icon: ShieldCheck, title: 'Kegiatan & Keluarga', description: 'Ramah untuk rombongan, keluarga, dan semua usia.' },
];

const whyChooseUs: IconCardItem[] = [
    { icon: Users, title: 'Berbasis Masyarakat', description: 'Dikelola warga lokal agar manfaat wisata tersebar berkelanjutan.' },
    { icon: Mountain, title: 'Otentik & Bermakna', description: 'Pengalaman asri yang mendalam dan penuh nilai kehidupan desa.' },
    { icon: Leaf, title: 'Ramah Lingkungan', description: 'Mendukung wisata hijau, kebersihan, dan harmoni alam.' },
    { icon: BedDouble, title: 'Akomodasi Nyaman', description: 'Homestay hangat, bersih, dan dekat aktivitas utama.' },
    { icon: UtensilsCrossed, title: 'Kuliner Lokal', description: 'Cita rasa khas desa yang hangat, lezat, dan tradisional.' },
];

const packages: PackageItem[] = [
    { title: 'Paket Jelajah Desa', image: images.packageVillage, duration: '1 Hari', price: 'Rp150.000', rating: '4.8' },
    { title: 'Paket Edukasi & Budaya', image: images.packageCulture, duration: '1 Hari', price: 'Rp350.000', rating: '4.9' },
    { title: 'Paket Alam & Petualangan', image: images.packageAdventure, duration: '2 Hari 1 Malam', price: 'Rp375.000', rating: '4.8' },
    { title: 'Paket Homestay', image: images.packageStay, duration: '1 Malam', price: 'Rp200.000', rating: '4.9' },
];

const attractions: AttractionItem[] = [
    { title: 'Persawahan & Pemandangan Merapi', image: images.attraction1 },
    { title: 'Upacara & Kesenian Tradisional', image: images.attraction2 },
    { title: 'Belajar Membatik & Kerajinan', image: images.attraction3 },
    { title: 'Agrowisata & Kebun Organik', image: images.attraction4 },
    { title: 'Jelajah Sungai & Susur Alam', image: images.attraction5 },
    { title: 'Pasar & Produk UMKM', image: images.attraction6 },
];
const testimonials: TestimonialItem[] = [
    {
        name: 'Rina K.',
        role: 'Pengalaman luar biasa! Masyarakatnya ramah, alamnya indah, dan kegiatannya seru.',
        avatar: images.avatar1,
    },
    {
        name: 'Budi S.',
        role: 'Anak-anak belajar banyak tentang budaya dan alam. Homestay-nya nyaman dan makanannya lezat.',
        avatar: images.avatar2,
    },
];

const faqs = [
    'Bagaimana cara menuju Desa Wisata Pentingsari?',
    'Apakah ada fasilitas homestay?',
    'Apakah cocok untuk anak-anak dan lansia?',
    'Apakah bisa rombongan sekolah atau komunitas?',
];

const articles: ArticleItem[] = [
    { title: 'Mengenal Tradisi Welcoming Desa Pentingsari', image: images.article1, date: '10 Mei 2024' },
    { title: 'Manfaat Bertani Organik untuk Masa Depan', image: images.article2, date: '15 Mei 2024' },
    { title: 'UMKM Desa Pentingsari: Karya Lokal, Bangga Lokal', image: images.article3, date: '20 Mei 2024' },
];

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function SectionHeading({ title, action }: { title: string; action?: string }) {
    return (
        <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-[30px] leading-[1.12] font-bold text-[#26311f] md:text-[36px]">
                {title}
            </h2>
            {action ? (
                <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066AE] transition hover:text-[#093967]">
                    {action}
                    <ArrowRight className="size-4" />
                </button>
            ) : null}
        </div>
    );
}

function NavLink({ children, active }: { children: ReactNode; active?: boolean }) {
    return (
        <a
            href="#"
            className={classNames(
                'relative text-[13px] font-semibold text-[#26311f] transition hover:text-[#0066AE]',
                active && 'text-[#0066AE]',
            )}
        >
            {children}
            {active ? <span className="absolute -bottom-2 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#0066AE]" /> : null}
        </a>
    );
}

function PrimaryButton({ children }: { children: ReactNode }) {
    return (
        <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0066AE] px-5 text-[13px] font-bold text-white shadow-[0_12px_24px_rgba(0,102,174,0.22)] transition hover:bg-[#093967]">
            {children}
        </button>
    );
}

function SecondaryButton({ children }: { children: ReactNode }) {
    return (
        <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#d0c2ac] bg-white px-5 text-[13px] font-bold text-[#26311f] transition hover:bg-[#faf8f3]">
            {children}
        </button>
    );
}

function StatCard({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
    return (
        <div className="flex items-center gap-3 rounded-[16px] border border-[#DCE3EA] bg-white px-5 py-4 shadow-[0_10px_28px_rgba(0,102,174,0.07)]">
            <div className="flex size-11 items-center justify-center rounded-[12px] bg-[#F1F5F8] text-[#0066AE]">
                <Icon className="size-5" />
            </div>
            <div>
                <p className="text-[24px] leading-none font-extrabold text-[#0066AE]">{value}</p>
                <p className="mt-1 text-[12px] font-medium text-[#8a8577]">{label}</p>
            </div>
        </div>
    );
}

function AboutHighlight({ icon: Icon, title, description }: IconCardItem) {
    return (
        <div className="rounded-[16px] border border-[#DCE3EA] bg-white p-4 shadow-[0_10px_24px_rgba(0,102,174,0.04)]">
            <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]">
                <Icon className="size-4.5" />
            </div>
            <h3 className="text-[14px] font-bold text-[#26311f]">{title}</h3>
            <p className="mt-1.5 text-[12px] leading-5 text-[#59564c]">{description}</p>
        </div>
    );
}

function PackageCard({ item }: { item: PackageItem }) {
    return (
        <article className="overflow-hidden rounded-[16px] border border-[#DCE3EA] bg-white shadow-[0_12px_30px_rgba(0,102,174,0.05)]">
            <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-[14px] font-bold text-[#26311f]">{item.title}</h3>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-[#8a8577]">
                    <span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" />{item.duration}</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[11px] text-[#8a8577]">Mulai dari</p>
                        <p className="text-[16px] font-bold text-[#0066AE]">{item.price}</p>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#093967]">
                        <Star className="size-3.5 fill-[#f4b44f] text-[#f4b44f]" />
                        {item.rating}
                    </div>
                </div>
            </div>
        </article>
    );
}
function WhyItem({ icon: Icon, title, description }: IconCardItem) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2FA6FC]">
                <Icon className="size-4.5" />
            </div>
            <div>
                <h3 className="text-[14px] font-bold text-[#26311f]">{title}</h3>
                <p className="mt-1 text-[12px] leading-5 text-[#59564c]">{description}</p>
            </div>
        </div>
    );
}

function AttractionCard({ item }: { item: AttractionItem }) {
    return (
        <article className="overflow-hidden rounded-[14px] border border-[#DCE3EA] bg-white shadow-[0_8px_22px_rgba(0,102,174,0.04)]">
            <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-3.5">
                <h3 className="text-[13px] leading-5 font-semibold text-[#26311f]">{item.title}</h3>
            </div>
        </article>
    );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
    return (
        <article className="rounded-[16px] border border-[#DCE3EA] bg-white p-4 shadow-[0_10px_24px_rgba(0,102,174,0.04)]">
            <div className="flex items-start gap-3">
                <img src={item.avatar} alt={item.name} className="size-11 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-[14px] font-bold text-[#26311f]">{item.name}</p>
                            <p className="mt-1 text-[12px] leading-5 text-[#59564c]">{item.role}</p>
                        </div>
                        <ChevronRight className="mt-0.5 size-4 shrink-0 text-[#8a8577]" />
                    </div>
                    <div className="mt-2 flex items-center gap-0.5 text-[#f4b44f]">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star key={index} className="size-3.5 fill-current" />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}

function FaqItem({ question, open, onClick }: { question: string; open: boolean; onClick: () => void }) {
    return (
        <div className="overflow-hidden rounded-[12px] border border-[#DCE3EA] bg-white">
            <button type="button" onClick={onClick} className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left">
                <span className="text-[13px] font-semibold text-[#26311f]">{question}</span>
                <ChevronDown className={classNames('size-4 shrink-0 text-[#8a8577] transition', open && 'rotate-180')} />
            </button>
            {open ? (
                <div className="border-t border-[#DCE3EA] px-4 py-3 text-[12px] leading-6 text-[#59564c]">
                    Wisatawan dapat menghubungi pengelola untuk reservasi, jadwal kegiatan, homestay, dan kebutuhan rombongan sebelum kunjungan.
                </div>
            ) : null}
        </div>
    );
}

function ArticleCard({ item }: { item: ArticleItem }) {
    return (
        <article className="overflow-hidden rounded-[14px] border border-[#DCE3EA] bg-white shadow-[0_8px_22px_rgba(0,102,174,0.04)]">
            <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-3.5">
                <p className="text-[11px] text-[#8a8577]">{item.date}</p>
                <h3 className="mt-2 text-[13px] leading-5 font-semibold text-[#26311f]">{item.title}</h3>
            </div>
        </article>
    );
}

export default function VillageShow({ village }: VillageShowProps) {
    const [openFaq, setOpenFaq] = useState<number>(0);

    return (
        <>
            <Head title={`${village.name || 'Desa Wisata Pentingsari'} - Desa Wisata BCA`} />

                <section className="">
                    <div className="mx-auto overflow-hidden rounded-[28px] border border-[#DCE3EA] bg-white shadow-[0_16px_40px_rgba(0,102,174,0.06)]">
                        <header className="border-b border-[#DCE3EA] bg-[#F8FBFE]">
                            <div className="mx-auto flex max-w-[1180px] items-center gap-4 px-4 py-4 md:px-6 lg:px-8">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]">
                                        <Mountain className="size-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-[15px] font-bold text-[#0066AE]">Desa Wisata</p>
                                        <p className="truncate text-[11px] text-[#8a8577]">Pentingsari</p>
                                    </div>
                                </div>
                                <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
                                    <NavLink active>Beranda</NavLink>
                                    <NavLink>Tentang Desa</NavLink>
                                    <NavLink>Paket Wisata</NavLink>
                                    <NavLink>Atraksi</NavLink>
                                    <NavLink>Galeri</NavLink>
                                    <NavLink>Artikel</NavLink>
                                    <NavLink>Kontak</NavLink>
                                </nav>
                                <div className="ml-auto flex items-center gap-2.5">
                                    <button className="hidden size-10 items-center justify-center rounded-full border border-[#DCE3EA] bg-white text-[#093967] md:inline-flex"><Search className="size-4" /></button>
                                    <PrimaryButton>Reservasi</PrimaryButton>
                                    <button className="inline-flex size-10 items-center justify-center rounded-full border border-[#DCE3EA] bg-white text-[#26311f] lg:hidden"><Menu className="size-4.5" /></button>
                                </div>
                            </div>
                        </header>
                        <section className="relative isolate overflow-hidden bg-[#F8FBFE] px-4 pt-6 pb-0 md:px-6 md:pt-8 lg:px-8 lg:pt-10">
                            <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                                <div className="relative z-10 max-w-[480px] pb-8 lg:pb-24">
                                    <p className="text-[11px] font-semibold tracking-[0.12em] text-[#2FA6FC] uppercase">Desa Wisata Pentingsari</p>
                                    <h1 className="mt-4 text-[38px] leading-[1.05] font-bold text-[#26311f] sm:text-[46px] lg:text-[54px]">
                                        Rasakan Pengalaman Wisata Desa yang Otentik, Asri, dan Berkesan
                                    </h1>
                                    <p className="mt-4 max-w-[440px] text-[14px] leading-7 text-[#59564c]">
                                        Nikmati keindahan alam pedesaan, kehidupan budaya lokal, dan keramahan masyarakat di Desa Wisata Pentingsari. Liburan terbaik menyatu bersama alam untuk pengalaman yang bermakna dan berkelanjutan.
                                    </p>
                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                        <PrimaryButton><PlayCircle className="size-4" />Jelajahi Wisata</PrimaryButton>
                                        <SecondaryButton><Phone className="size-4" />Hubungi Kami</SecondaryButton>
                                    </div>
                                </div>
                                <div className="relative min-h-[320px] self-stretch overflow-hidden rounded-[24px] lg:min-h-[430px]">
                                    <img src={images.hero} alt="Desa wisata" className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0066AE]/20 via-transparent to-[#093967]/18" />
                                </div>
                            </div>
                            <div className="relative z-20 mx-auto max-w-[1180px] translate-y-8 pb-8">
                                <div className="grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-4 lg:p-4">
                                    {stats.map((item) => <StatCard key={item.label} {...item} />)}
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                <section className="px-4 pt-14 pb-6 md:px-6 lg:px-8 lg:pt-18">
                    <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="overflow-hidden rounded-[24px] border border-[#DCE3EA] bg-white shadow-[0_12px_30px_rgba(0,102,174,0.05)]">
                            <img src={images.about} alt="Tentang desa" className="h-full min-h-[300px] w-full object-cover" />
                        </div>
                        <div>
                            <SectionHeading title="Tentang Desa Wisata" />
                            <p className="max-w-[520px] text-[14px] leading-7 text-[#59564c]">
                                Desa Wisata Pentingsari terletak di lereng Merapi, Sleman, Yogyakarta. Dikelilingi alam yang asri, udara sejuk, dan kehidupan desa yang harmonis, kami menghadirkan pengalaman wisata yang otentik melalui kegiatan budaya, edukasi, kuliner, dan keramahan masyarakat lokal.
                            </p>
                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                {aboutHighlights.map((item) => <AboutHighlight key={item.title} {...item} />)}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-4 py-6 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1180px]">
                        <SectionHeading title="Paket Wisata Unggulan" action="Lihat Semua Paket" />
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                            {packages.map((item) => <PackageCard key={item.title} item={item} />)}
                        </div>
                    </div>
                </section>

                <section className="px-4 py-6 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1180px]">
                        <SectionHeading title="Mengapa Memilih Desa Wisata Kami" />
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                            {whyChooseUs.map((item) => <WhyItem key={item.title} {...item} />)}
                        </div>
                    </div>
                </section>

                <section className="px-4 py-6 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1180px]">
                        <SectionHeading title="Atraksi Wisata" action="Lihat Semua Atraksi" />
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                            {attractions.map((item) => <AttractionCard key={item.title} item={item} />)}
                        </div>
                    </div>
                </section>
                <section className="px-4 py-6 md:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-[1180px] gap-7 lg:grid-cols-[1.04fr_0.96fr]">
                        <div>
                            <SectionHeading title="Galeri" action="Lihat Semua Galeri" />
                            <div className="grid grid-cols-3 gap-3 rounded-[20px] border border-[#DCE3EA] bg-white p-3 shadow-[0_10px_24px_rgba(0,102,174,0.04)]">
                                <div className="col-span-2 row-span-2 overflow-hidden rounded-[16px]"><img src={images.gallery1} alt="Galeri desa" className="h-full min-h-[290px] w-full object-cover" /></div>
                                <div className="overflow-hidden rounded-[16px]"><img src={images.gallery2} alt="Galeri desa" className="h-full w-full object-cover" /></div>
                                <div className="overflow-hidden rounded-[16px]"><img src={images.gallery3} alt="Galeri desa" className="h-full w-full object-cover" /></div>
                                <div className="overflow-hidden rounded-[16px]"><img src={images.gallery4} alt="Galeri desa" className="h-full w-full object-cover" /></div>
                                <div className="overflow-hidden rounded-[16px]"><img src={images.gallery5} alt="Galeri desa" className="h-full w-full object-cover" /></div>
                            </div>
                        </div>
                        <div>
                            <SectionHeading title="Pengalaman Pengunjung" />
                            <div className="space-y-4">
                                {testimonials.map((item) => <TestimonialCard key={item.name} item={item} />)}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-4 py-6 md:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-[1180px] gap-7 lg:grid-cols-[0.95fr_1.05fr]">
                        <div>
                            <SectionHeading title="FAQ" />
                            <div className="space-y-3">
                                {faqs.map((question, index) => (
                                    <FaqItem key={question} question={question} open={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <SectionHeading title="Artikel & Cerita Desa" action="Lihat Semua Artikel" />
                            <div className="grid gap-4 md:grid-cols-3">
                                {articles.map((item) => <ArticleCard key={item.title} item={item} />)}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-4 py-8 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[24px] border border-[#BFD6EA]">
                        <div className="relative isolate overflow-hidden px-6 py-10 md:px-8 lg:px-10 lg:py-12">
                            <img src={images.cta} alt="CTA desa wisata" className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-[#093967]/76" />
                            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="max-w-[620px] text-white">
                                    <h2 className="text-[30px] leading-[1.12] font-bold md:text-[36px]">Siap Menjelajahi Keindahan dan Keaslian Desa?</h2>
                                    <p className="mt-3 text-[14px] leading-7 text-white/88">
                                        Rencanakan perjalanan Anda sekarang dan rasakan pengalaman tak terlupakan di Desa Wisata Pentingsari.
                                    </p>
                                </div>
                                <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0066AE] px-5 text-[13px] font-bold text-white shadow-[0_12px_22px_rgba(196,122,44,0.24)] transition hover:bg-[#093967]">
                                    Pesan Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="mt-2 border-t border-[#DCE3EA] bg-[#DCE3EA] px-4 py-10 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1180px]">
                        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.7fr_0.8fr_1fr]">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-full bg-[#0066AE] text-white"><Mountain className="size-5" /></div>
                                    <div>
                                        <p className="text-[18px] font-bold text-[#0066AE]">Desa Wisata</p>
                                        <p className="text-[12px] text-[#8a8577]">Pentingsari</p>
                                    </div>
                                </div>
                                <p className="mt-4 max-w-[280px] text-[12px] leading-6 text-[#59564c]">
                                    Desa wisata berbasis masyarakat di lereng Merapi yang menggabungkan alam, budaya, edukasi, dan hospitality lokal.
                                </p>
                                <div className="mt-4 flex items-center gap-2.5 text-[#0066AE]">
                                    <span className="flex size-9 items-center justify-center rounded-full border border-[#BFD6EA] bg-white"><Instagram className="size-4" /></span>
                                    <span className="flex size-9 items-center justify-center rounded-full border border-[#BFD6EA] bg-white"><Facebook className="size-4" /></span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[13px] font-bold text-[#26311f]">Tautan Cepat</h3>
                                <div className="mt-4 space-y-2.5 text-[12px] text-[#59564c]">
                                    <p>Beranda</p>
                                    <p>Tentang Desa</p>
                                    <p>Paket Wisata</p>
                                    <p>Galeri</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[13px] font-bold text-[#26311f]">Informasi</h3>
                                <div className="mt-4 space-y-3 text-[12px] text-[#59564c]">
                                    <div className="flex gap-2"><MapPin className="mt-0.5 size-3.5 shrink-0 text-[#093967]" /><span>Pentingsari, Umbulharjo, Cangkringan, Sleman</span></div>
                                    <div className="flex gap-2"><Phone className="mt-0.5 size-3.5 shrink-0 text-[#093967]" /><span>(0274) 555 1234</span></div>
                                    <div className="flex gap-2"><Mail className="mt-0.5 size-3.5 shrink-0 text-[#093967]" /><span>info@pentingsari.com</span></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[13px] font-bold text-[#26311f]">Newsletter</h3>
                                <p className="mt-4 text-[12px] leading-6 text-[#59564c]">Dapatkan informasi dan promo terbaru dari Desa Wisata Pentingsari.</p>
                                <div className="mt-4 flex gap-2">
                                    <input type="email" placeholder="Masukkan email Anda" className="min-h-11 flex-1 rounded-full border border-[#BFD6EA] bg-white px-4 text-[12px] text-[#26311f] outline-none placeholder:text-[#8a8577]" />
                                    <button className="min-h-11 rounded-full bg-[#0066AE] px-4 text-[12px] font-semibold text-white">Langganan</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col gap-3 border-t border-[#DCE3EA] pt-5 text-[11px] text-[#8a8577] md:flex-row md:items-center md:justify-between">
                            <p>© 2024 Desa Wisata Pentingsari. Semua Hak Dilindungi.</p>
                            <div className="flex items-center gap-4">
                                <span>Kebijakan Privasi</span>
                                <span>Syarat & Ketentuan</span>
                            </div>
                        </div>
                    </div>
                </footer>
        </>
    );
}

VillageShow.layout = null;



