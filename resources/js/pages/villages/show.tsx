import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    BedDouble,
    ChevronDown,
    Clock3,
    Facebook,
    Image as ImageIcon,
    Instagram,
    Mail,
    MapPin,
    Mountain,
    Phone,
    ScrollText,
    Search,
    ShieldCheck,
    ShoppingBag,
    Star,
    Store,
    TreePine,
    Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

type MediaItem = {
    id: number;
    title: string | null;
    caption: string | null;
    url: string | null;
    is_cover: boolean;
};
type ProfileItem = {
    id: number;
    name: string;
    description: string | null;
    address: string | null;
    maps_url: string | null;
    price_text: string | null;
    opening_hours: string | null;
    contact_name: string | null;
    contact_phone: string | null;
    media: MediaItem[];
};
type ProfileGroup = { category: string; items: ProfileItem[] };
type BadgeItem = { id: number; value: string; label: string };
type UmkmItem = {
    id: number;
    name: string;
    brand_name: string | null;
    product_category: string | null;
    business_owner_name: string | null;
    production_address: string | null;
    annual_revenue: string | null;
    current_obstacles: string | null;
    certifications: string | null;
    has_exported: boolean | null;
    export_destination_countries: string | null;
    collector_name: string | null;
    collector_email: string | null;
    product_photo_url: string | null;
    categories: BadgeItem[];
};
type PariwisataItem = {
    id: number;
    name: string;
    operational_days: string | null;
    operational_hours: string | null;
    entrance_ticket_price: string | null;
    entrance_ticket_description: string | null;
    address: string | null;
    person_in_charge_name: string | null;
    person_in_charge_phone: string | null;
    person_in_charge_address: string | null;
    status_label: string;
    categories: BadgeItem[];
};
type VillageShowProps = {
    village: {
        id: number;
        name: string;
        description: string | null;
        location: string;
        address: string;
        postal_code: string;
        manager_name: string;
        manager_phone: string;
        manager_email: string;
        maps_url: string | null;
        media: MediaItem[];
        cover: MediaItem | null;
        profile_items: ProfileGroup[];
        umkms: UmkmItem[];
        pariwisata: PariwisataItem[];
    };
};
type IconCardItem = { icon: LucideIcon; title: string; description: string };
type TestimonialItem = { name: string; role: string; avatar: string };
type ArticleItem = { title: string; image: string; date: string };

const fallbackImages = {
    hero: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80',
    gallery1:
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80',
    gallery2:
        'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=700&q=80',
    gallery3:
        'https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=700&q=80',
    gallery4:
        'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=700&q=80',
    gallery5:
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=80',
    article1:
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=700&q=80',
    article2:
        'https://images.unsplash.com/photo-1459666644539-a9755287d6b0?auto=format&fit=crop&w=700&q=80',
    article3:
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80',
    avatar1:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80',
    avatar2:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80',
};
const galleryFallbacks = [
    fallbackImages.gallery1,
    fallbackImages.gallery2,
    fallbackImages.gallery3,
    fallbackImages.gallery4,
    fallbackImages.gallery5,
];
const aboutHighlights: IconCardItem[] = [
    {
        icon: TreePine,
        title: 'Potensi Alam',
        description:
            'Menampilkan karakter desa melalui lanskap, suasana, dan pengalaman lokal.',
    },
    {
        icon: ScrollText,
        title: 'Pengalaman Terkurasi',
        description:
            'Paket, atraksi, dan homestay ditampilkan dari data profil backend.',
    },
    {
        icon: ShieldCheck,
        title: 'Terhubung Pengelola',
        description:
            'Informasi kontak, alamat, dan titik kunjungan tersedia langsung dari data desa.',
    },
];
const whyChooseUs: IconCardItem[] = [
    {
        icon: Users,
        title: 'Berbasis Komunitas',
        description:
            'Program desa, UMKM, dan layanan wisata terhubung dalam satu halaman.',
    },
    {
        icon: Store,
        title: 'UMKM Lokal',
        description:
            'Produk warga dan kategori usaha tampil dari data UMKM aktual.',
    },
    {
        icon: Mountain,
        title: 'Destinasi Nyata',
        description: 'ISTC/pariwisata aktif ditampilkan langsung dari backend.',
    },
    {
        icon: BedDouble,
        title: 'Akomodasi Desa',
        description: 'Homestay dan fasilitas inap mengikuti data profil item.',
    },
    {
        icon: Search,
        title: 'Informasi Ringkas',
        description:
            'Pengunjung bisa melihat paket, atraksi, galeri, dan kontak tanpa data dummy utama.',
    },
];
const testimonials: TestimonialItem[] = [
    {
        name: 'Rina K.',
        role: 'Pengalaman desa terasa hangat, informatif, dan mudah direncanakan sejak awal.',
        avatar: fallbackImages.avatar1,
    },
    {
        name: 'Budi S.',
        role: 'Informasi paket, atraksi, dan kontak pengelola membantu saat menyusun kunjungan rombongan.',
        avatar: fallbackImages.avatar2,
    },
];
const faqs = [
    'Bagaimana cara menuju lokasi desa wisata?',
    'Apakah tersedia homestay atau akomodasi lokal?',
    'Apakah wisata cocok untuk keluarga dan rombongan?',
    'Siapa yang bisa dihubungi untuk reservasi dan informasi lanjutan?',
];
const articles: ArticleItem[] = [
    {
        title: 'Mengembangkan potensi desa lewat atraksi dan paket wisata',
        image: fallbackImages.article1,
        date: '10 Mei 2024',
    },
    {
        title: 'Peran UMKM dalam ekosistem desa wisata yang berkelanjutan',
        image: fallbackImages.article2,
        date: '15 Mei 2024',
    },
    {
        title: 'Kolaborasi pengelola, masyarakat, dan wisatawan untuk pengalaman otentik',
        image: fallbackImages.article3,
        date: '20 Mei 2024',
    },
];

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}
function normalize(value: string) {
    return value.toLowerCase().replace(/\s+/g, '-');
}
function textOrFallback(value: string | null | undefined, fallback = '-') {
    return value && value.trim() !== '' ? value : fallback;
}
function truncate(value: string | null | undefined, length = 140) {
    return !value
        ? '-'
        : value.length > length
            ? `${value.slice(0, length).trim()}...`
            : value;
}
function mediaUrl(item?: MediaItem | null) {
    return item?.url || fallbackImages.gallery1;
}
function profileMediaUrl(item: ProfileItem, fallbackIndex = 0) {
    return (
        item.media.find((media) => media.is_cover)?.url ||
        item.media[0]?.url ||
        galleryFallbacks[fallbackIndex % galleryFallbacks.length]
    );
}
function findGroup(
    groups: ProfileGroup[],
    matcher: (category: string) => boolean,
) {
    return (
        groups.find((group) => matcher(normalize(group.category)))?.items ?? []
    );
}

function SectionHeading({
    title,
    action,
    href,
}: {
    title: string;
    action?: string;
    href?: string;
}) {
    return (
        <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-[30px] leading-[1.12] font-bold text-[#26311f] md:text-[36px]">
                {title}
            </h2>
            {action ? (
                <a
                    href={href ?? '#'}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066AE] transition hover:text-[#093967]"
                >
                    {action}
                    <ArrowRight className="size-4" />
                </a>
            ) : null}
        </div>
    );
}
function NavLink({
    href,
    children,
    active,
}: {
    href: string;
    children: ReactNode;
    active?: boolean;
}) {
    return (
        <a
            href={href}
            className={classNames(
                'relative text-[13px] font-semibold text-[#26311f] transition hover:text-[#0066AE]',
                active && 'text-[#0066AE]',
            )}
        >
            {children}
            {active ? (
                <span className="absolute -bottom-2 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#0066AE]" />
            ) : null}
        </a>
    );
}
function LinkButton({
    href,
    children,
    primary = true,
}: {
    href: string;
    children: ReactNode;
    primary?: boolean;
}) {
    return (
        <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            className={classNames(
                'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[13px] font-bold transition',
                primary
                    ? 'bg-[#0066AE] text-white shadow-[0_12px_24px_rgba(0,102,174,0.22)] hover:bg-[#093967]'
                    : 'border border-[#DCE3EA] bg-white text-[#26311f] hover:bg-[#F8FBFE]',
            )}
        >
            {children}
        </a>
    );
}
function StatCard({
    icon: Icon,
    value,
    label,
}: {
    icon: LucideIcon;
    value: string;
    label: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-[16px] border border-[#DCE3EA] bg-white px-5 py-4 shadow-[0_10px_28px_rgba(0,102,174,0.07)]">
            <div className="flex size-11 items-center justify-center rounded-[12px] bg-[#F1F5F8] text-[#0066AE]">
                <Icon className="size-5" />
            </div>
            <div>
                <p className="text-[24px] leading-none font-extrabold text-[#0066AE]">
                    {value}
                </p>
                <p className="mt-1 text-[12px] font-medium text-[#8a8577]">
                    {label}
                </p>
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
            <p className="mt-1.5 text-[12px] leading-5 text-[#59564c]">
                {description}
            </p>
        </div>
    );
}
function ProfileCard({ item, index }: { item: ProfileItem; index: number }) {
    return (
        <article className="overflow-hidden rounded-[16px] border border-[#DCE3EA] bg-white shadow-[0_12px_30px_rgba(0,102,174,0.05)]">
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={profileMediaUrl(item, index)}
                    alt={item.name}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-[14px] font-bold text-[#26311f]">
                    {item.name}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-[#8a8577]">
                    {item.opening_hours ? (
                        <span className="inline-flex items-center gap-1">
                            <Clock3 className="size-3.5" />
                            {item.opening_hours}
                        </span>
                    ) : null}
                    {item.price_text ? <span>{item.price_text}</span> : null}
                </div>
                <p className="mt-3 text-[12px] leading-6 text-[#59564c]">
                    {truncate(item.description)}
                </p>
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
                <h3 className="text-[14px] font-bold text-[#26311f]">
                    {title}
                </h3>
                <p className="mt-1 text-[12px] leading-5 text-[#59564c]">
                    {description}
                </p>
            </div>
        </div>
    );
}
function Badge({ label }: { label: string }) {
    return (
        <span className="inline-flex rounded-full bg-[#EAF3FF] px-3 py-1 text-[11px] font-semibold text-[#0066AE]">
            {label}
        </span>
    );
}
function UmkmCard({ item, index }: { item: UmkmItem; index: number }) {
    return (
        <article className="overflow-hidden rounded-[16px] border border-[#DCE3EA] bg-white shadow-[0_12px_30px_rgba(0,102,174,0.05)]">
            <div className="aspect-[4/3] overflow-hidden bg-[#F1F5F8]">
                <img
                    src={
                        item.product_photo_url ||
                        galleryFallbacks[index % galleryFallbacks.length]
                    }
                    alt={item.name}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="space-y-3 p-4">
                <div>
                    <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2FA6FC] uppercase">
                        UMKM
                    </p>
                    <h3 className="mt-1 text-[14px] font-bold text-[#26311f]">
                        {item.name}
                    </h3>
                    <p className="mt-1 text-[12px] text-[#59564c]">
                        {textOrFallback(item.brand_name)}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {item.categories.length > 0 ? (
                        item.categories.map((category) => (
                            <Badge key={category.id} label={category.label} />
                        ))
                    ) : (
                        <Badge
                            label={textOrFallback(
                                item.product_category,
                                'Produk Lokal',
                            )}
                        />
                    )}
                </div>
                <div className="space-y-1.5 text-[12px] leading-6 text-[#59564c]">
                    <p>
                        <span className="font-semibold text-[#26311f]">
                            Pemilik:
                        </span>{' '}
                        {textOrFallback(item.business_owner_name)}
                    </p>
                    <p>
                        <span className="font-semibold text-[#26311f]">
                            Alamat produksi:
                        </span>{' '}
                        {textOrFallback(item.production_address)}
                    </p>
                    <p>
                        <span className="font-semibold text-[#26311f]">
                            Omzet/tahun:
                        </span>{' '}
                        {textOrFallback(item.annual_revenue)}
                    </p>
                    <p>
                        <span className="font-semibold text-[#26311f]">
                            Ekspor:
                        </span>{' '}
                        {item.has_exported
                            ? `Ya${item.export_destination_countries ? ` • ${item.export_destination_countries}` : ''}`
                            : 'Belum'}
                    </p>
                </div>
                <p className="text-[12px] leading-6 text-[#59564c]">
                    {truncate(
                        item.current_obstacles ||
                        item.certifications ||
                        'Belum ada catatan tambahan.',
                        120,
                    )}
                </p>
            </div>
        </article>
    );
}
function PariwisataCard({ item }: { item: PariwisataItem }) {
    return (
        <article className="rounded-[16px] border border-[#DCE3EA] bg-white p-5 shadow-[0_12px_30px_rgba(0,102,174,0.05)]">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2FA6FC] uppercase">
                        ISTC / Pariwisata
                    </p>
                    <h3 className="mt-1 text-[16px] font-bold text-[#26311f]">
                        {item.name}
                    </h3>
                </div>
                <Badge label={item.status_label} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {item.categories.map((category) => (
                    <Badge key={category.id} label={category.label} />
                ))}
            </div>
            <div className="mt-4 grid gap-3 text-[12px] leading-6 text-[#59564c] md:grid-cols-2">
                <p>
                    <span className="font-semibold text-[#26311f]">
                        Hari operasional:
                    </span>{' '}
                    {textOrFallback(item.operational_days)}
                </p>
                <p>
                    <span className="font-semibold text-[#26311f]">
                        Jam operasional:
                    </span>{' '}
                    {textOrFallback(item.operational_hours)}
                </p>
                <p>
                    <span className="font-semibold text-[#26311f]">
                        Tiket masuk:
                    </span>{' '}
                    {textOrFallback(item.entrance_ticket_price)}
                </p>
                <p>
                    <span className="font-semibold text-[#26311f]">PIC:</span>{' '}
                    {textOrFallback(item.person_in_charge_name)}
                </p>
                <p>
                    <span className="font-semibold text-[#26311f]">
                        Telepon PIC:
                    </span>{' '}
                    {textOrFallback(item.person_in_charge_phone)}
                </p>
                <p>
                    <span className="font-semibold text-[#26311f]">
                        Alamat:
                    </span>{' '}
                    {textOrFallback(item.address)}
                </p>
            </div>
            {item.entrance_ticket_description ? (
                <p className="mt-3 text-[12px] leading-6 text-[#59564c]">
                    {item.entrance_ticket_description}
                </p>
            ) : null}
        </article>
    );
}
function TestimonialCard({ item }: { item: TestimonialItem }) {
    return (
        <article className="rounded-[16px] border border-[#DCE3EA] bg-white p-4 shadow-[0_10px_24px_rgba(0,102,174,0.04)]">
            <div className="flex items-start gap-3">
                <img
                    src={item.avatar}
                    alt={item.name}
                    className="size-11 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-bold text-[#26311f]">
                        {item.name}
                    </p>
                    <p className="mt-1 text-[12px] leading-5 text-[#59564c]">
                        {item.role}
                    </p>
                    <div className="mt-2 flex items-center gap-0.5 text-[#f4b44f]">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} className="size-3.5 fill-current" />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
function FaqItem({
    question,
    open,
    onClick,
}: {
    question: string;
    open: boolean;
    onClick: () => void;
}) {
    return (
        <div className="overflow-hidden rounded-[12px] border border-[#DCE3EA] bg-white">
            <button
                type="button"
                onClick={onClick}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
            >
                <span className="text-[13px] font-semibold text-[#26311f]">
                    {question}
                </span>
                <ChevronDown
                    className={classNames(
                        'size-4 shrink-0 text-[#8a8577] transition',
                        open && 'rotate-180',
                    )}
                />
            </button>
            {open ? (
                <div className="border-t border-[#DCE3EA] px-4 py-3 text-[12px] leading-6 text-[#59564c]">
                    Silakan hubungi pengelola desa untuk reservasi, jadwal
                    kegiatan, detail akomodasi, dan kebutuhan kunjungan lainnya.
                </div>
            ) : null}
        </div>
    );
}
function ArticleCard({ item }: { item: ArticleItem }) {
    return (
        <article className="overflow-hidden rounded-[14px] border border-[#DCE3EA] bg-white shadow-[0_8px_22px_rgba(0,102,174,0.04)]">
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="p-3.5">
                <p className="text-[11px] text-[#8a8577]">{item.date}</p>
                <h3 className="mt-2 text-[13px] leading-5 font-semibold text-[#26311f]">
                    {item.title}
                </h3>
            </div>
        </article>
    );
}

export default function VillageShow({ village }: VillageShowProps) {
    const [openFaq, setOpenFaq] = useState(0);
    const packages = useMemo(
        () =>
            findGroup(village.profile_items, (category) =>
                category.includes('paket'),
            ),
        [village.profile_items],
    );
    const attractions = useMemo(
        () =>
            findGroup(village.profile_items, (category) =>
                category.includes('atraksi'),
            ),
        [village.profile_items],
    );
    const homestays = useMemo(
        () =>
            findGroup(village.profile_items, (category) =>
                category.includes('homestay'),
            ),
        [village.profile_items],
    );
    const gallery = useMemo(() => {
        const profileMedia = village.profile_items.flatMap((group) =>
            group.items.flatMap((item) => item.media),
        );
        const merged = [...village.media, ...profileMedia].filter(
            (item) => item.url,
        );
        return merged
            .filter(
                (item, index, array) =>
                    index ===
                    array.findIndex((candidate) => candidate.url === item.url),
            )
            .slice(0, 6);
    }, [village.media, village.profile_items]);
    const stats = [
        {
            icon: ShoppingBag,
            value: String(village.umkms.length),
            label: 'UMKM Desa',
        },
        {
            icon: Mountain,
            value: String(village.pariwisata.length),
            label: 'ISTC / Pariwisata',
        },
    ];
    const heroImage =
        village.cover?.url || gallery[0]?.url || fallbackImages.hero;
    const aboutImage = gallery[1]?.url || heroImage;
    const mapsHref = village.maps_url || '#kontak';
    const phoneHref =
        village.manager_phone && village.manager_phone !== '-'
            ? `tel:${village.manager_phone}`
            : '#kontak';
    const mailHref =
        village.manager_email && village.manager_email !== '-'
            ? `mailto:${village.manager_email}`
            : '#kontak';

    return (
        <>
            <Head
                title={`${village.name || 'Desa Wisata'} - Desa Wisata BCA`}
            />
            <main className="min-h-screen bg-[#F8FBFE] text-[#26311f]">
                <section>
                    <div className="w-full bg-white">
                        <header className="border-b border-[#DCE3EA] bg-[#F8FBFE]">
                            <div className="mx-auto flex max-w-[1180px] items-center gap-4 px-4 py-4 md:px-6 lg:px-8">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]">
                                        <Mountain className="size-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-[15px] font-bold text-[#0066AE]">
                                            Desa Wisata
                                        </p>
                                        <p className="truncate text-[11px] text-[#8a8577]">
                                            {village.name}
                                        </p>
                                    </div>
                                </div>
                                <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
                                    <NavLink href="#hero" active>
                                        Beranda
                                    </NavLink>
                                    <NavLink href="#tentang">
                                        Tentang Desa
                                    </NavLink>
                                    <NavLink href="#paket">
                                        Paket Wisata
                                    </NavLink>
                                    <NavLink href="#atraksi">Atraksi</NavLink>
                                    <NavLink href="#galeri">Galeri</NavLink>
                                    <NavLink href="#umkm">UMKM</NavLink>
                                    <NavLink href="#kontak">Kontak</NavLink>
                                </nav>
                            </div>
                        </header>
                        <section
                            id="hero"
                            className="relative isolate overflow-hidden bg-[#F8FBFE] px-4 pt-6 pb-0 md:px-6 md:pt-8 lg:px-8 lg:pt-10"
                        >
                            <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                                <div className="relative z-10 max-w-[520px] pb-8 lg:pb-24">
                                    <p className="text-[11px] font-semibold tracking-[0.12em] text-[#2FA6FC] uppercase">
                                        {textOrFallback(
                                            village.location,
                                            'Desa Wisata',
                                        )}
                                    </p>
                                    <h1 className="mt-4 text-[38px] leading-[1.05] font-bold text-[#26311f] sm:text-[46px] lg:text-[54px]">
                                        {village.name}
                                    </h1>
                                    <p className="mt-4 max-w-[460px] text-[14px] leading-7 text-[#59564c]">
                                        {textOrFallback(
                                            village.description,
                                            'Profil desa belum memiliki deskripsi detail.',
                                        )}
                                    </p>
                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                        <LinkButton href={mapsHref}>
                                            <MapPin className="size-4" />
                                            Lihat Lokasi
                                        </LinkButton>
                                        <LinkButton
                                            href={phoneHref}
                                            primary={false}
                                        >
                                            <Phone className="size-4" />
                                            Hubungi Kami
                                        </LinkButton>
                                    </div>
                                </div>
                                <div className="relative min-h-[320px] self-stretch overflow-hidden rounded-[24px] lg:min-h-[430px]">
                                    <img
                                        src={heroImage}
                                        alt={village.name}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0066AE]/20 via-transparent to-[#093967]/18" />
                                </div>
                            </div>
                            <div className="relative z-20 mx-auto max-w-[1180px] translate-y-8 pb-8">
                                <div className="grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-4 lg:p-4">
                                    {stats.map((item) => (
                                        <StatCard key={item.label} {...item} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
                <section className="px-4 py-6 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1180px]">
                        <SectionHeading title="Mengapa Memilih Desa Wisata Kami" />
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                            {whyChooseUs.map((item) => (
                                <WhyItem key={item.title} {...item} />
                            ))}
                        </div>
                    </div>
                </section>
                <section id="galeri" className="px-4 py-6 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1180px]">
                        <SectionHeading
                            title="Galeri"
                            action="Lihat Semua Galeri"
                            href="#galeri"
                        />
                        <div className="grid gap-4 rounded-[20px] border border-[#DCE3EA] bg-white p-4 shadow-[0_10px_24px_rgba(0,102,174,0.04)] sm:grid-cols-2 lg:grid-cols-3">
                            {(gallery.length > 0
                                ? gallery
                                : galleryFallbacks.map(
                                    (url, index) =>
                                        ({
                                            id: index,
                                            title: null,
                                            caption: null,
                                            url,
                                            is_cover: index === 0,
                                        }) as MediaItem,
                                )
                            ).map((image, index) => (
                                <div
                                    key={`${image.id}-${index}`}
                                    className="aspect-[16/10] overflow-hidden rounded-[16px] bg-[#F1F5F8]"
                                >
                                    <img
                                        src={mediaUrl(image)}
                                        alt={
                                            image.title || `Galeri ${index + 1}`
                                        }
                                        className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <SectionHeading title="Pengalaman Pengunjung" />
                            <div className="grid gap-4 md:grid-cols-2">
                                {testimonials.map((item) => (
                                    <TestimonialCard
                                        key={item.name}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section id="umkm" className="px-4 py-6 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1180px]">
                        <SectionHeading
                            title="UMKM Desa"
                            action="Lihat Semua UMKM"
                            href="#umkm"
                        />
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {village.umkms.length > 0 ? (
                                village.umkms.map((item, index) => (
                                    <UmkmCard
                                        key={item.id}
                                        item={item}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <div className="rounded-[16px] border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-5 text-[13px] text-[#59564c]">
                                    Belum ada data UMKM dari backend.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <section id="istc" className="px-4 py-6 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1180px]">
                        <SectionHeading
                            title="ISTC / Pariwisata"
                            action="Lihat Semua Destinasi"
                            href="#istc"
                        />
                        <div className="grid gap-5 lg:grid-cols-2">
                            {village.pariwisata.length > 0 ? (
                                village.pariwisata.map((item) => (
                                    <PariwisataCard key={item.id} item={item} />
                                ))
                            ) : (
                                <div className="rounded-[16px] border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-5 text-[13px] text-[#59564c]">
                                    Belum ada data ISTC/pariwisata aktif dari
                                    backend.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <section className="px-4 py-6 md:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-[1180px] gap-7 lg:grid-cols-[0.95fr_1.05fr]">
                        <div>
                            <SectionHeading title="FAQ" />
                            <div className="space-y-3">
                                {faqs.map((question, index) => (
                                    <FaqItem
                                        key={question}
                                        question={question}
                                        open={openFaq === index}
                                        onClick={() =>
                                            setOpenFaq(
                                                openFaq === index ? -1 : index,
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <SectionHeading
                                title="Artikel & Cerita Desa"
                                action="Lihat Semua Artikel"
                                href="#artikel"
                            />
                            <div className="grid gap-4 md:grid-cols-3">
                                {articles.map((item) => (
                                    <ArticleCard key={item.title} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section id="kontak" className="px-4 py-8 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[24px] border border-[#BFD6EA] bg-[#F8FBFE]">
                        <div className="grid gap-6 px-6 py-8 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-10">
                            <div>
                                <p className="text-[11px] font-semibold tracking-[0.12em] text-[#2FA6FC] uppercase">
                                    Kontak & Informasi
                                </p>
                                <h2 className="mt-3 text-[30px] leading-[1.12] font-bold text-[#26311f] md:text-[36px]">
                                    Rencanakan kunjungan ke {village.name}
                                </h2>
                                <p className="mt-3 max-w-[620px] text-[14px] leading-7 text-[#59564c]">
                                    Hubungi pengelola desa untuk reservasi,
                                    koordinasi rombongan, dan informasi
                                    aktivitas yang tersedia.
                                </p>
                                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                    <LinkButton href={phoneHref}>
                                        <Phone className="size-4" />
                                        Hubungi Pengelola
                                    </LinkButton>
                                    <LinkButton href={mapsHref} primary={false}>
                                        <MapPin className="size-4" />
                                        Buka Peta
                                    </LinkButton>
                                </div>
                            </div>
                            <div className="rounded-[20px] border border-[#DCE3EA] bg-white p-5 shadow-[0_10px_24px_rgba(0,102,174,0.04)]">
                                <div className="space-y-4 text-[13px] leading-6 text-[#59564c]">
                                    <div className="flex gap-3">
                                        <MapPin className="mt-0.5 size-4 shrink-0 text-[#0066AE]" />
                                        <div>
                                            <p className="font-semibold text-[#26311f]">
                                                Alamat
                                            </p>
                                            <p>
                                                {textOrFallback(
                                                    village.address,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Users className="mt-0.5 size-4 shrink-0 text-[#0066AE]" />
                                        <div>
                                            <p className="font-semibold text-[#26311f]">
                                                Pengelola
                                            </p>
                                            <p>
                                                {textOrFallback(
                                                    village.manager_name,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Phone className="mt-0.5 size-4 shrink-0 text-[#0066AE]" />
                                        <div>
                                            <p className="font-semibold text-[#26311f]">
                                                Telepon
                                            </p>
                                            <a
                                                href={phoneHref}
                                                className="hover:text-[#0066AE]"
                                            >
                                                {textOrFallback(
                                                    village.manager_phone,
                                                )}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Mail className="mt-0.5 size-4 shrink-0 text-[#0066AE]" />
                                        <div>
                                            <p className="font-semibold text-[#26311f]">
                                                Email
                                            </p>
                                            <a
                                                href={mailHref}
                                                className="hover:text-[#0066AE]"
                                            >
                                                {textOrFallback(
                                                    village.manager_email,
                                                )}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <ImageIcon className="mt-0.5 size-4 shrink-0 text-[#0066AE]" />
                                        <div>
                                            <p className="font-semibold text-[#26311f]">
                                                Media
                                            </p>
                                            <p>
                                                {village.media.length} file
                                                media desa
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="mt-2 border-t border-[#DCE3EA] bg-[#F8FBFE] px-4 py-10 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1180px]">
                        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.7fr_0.8fr_1fr]">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-full bg-[#0066AE] text-white">
                                        <Mountain className="size-5" />
                                    </div>
                                    <div>
                                        <p className="text-[18px] font-bold text-[#0066AE]">
                                            Desa Wisata
                                        </p>
                                        <p className="text-[12px] text-[#8a8577]">
                                            {village.name}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-4 max-w-[280px] text-[12px] leading-6 text-[#59564c]">
                                    Halaman desa memakai data backend untuk
                                    profil, galeri, paket, atraksi, UMKM, dan
                                    ISTC/pariwisata.
                                </p>
                                <div className="mt-4 flex items-center gap-2.5 text-[#0066AE]">
                                    <span className="flex size-9 items-center justify-center rounded-full border border-[#BFD6EA] bg-white">
                                        <Instagram className="size-4" />
                                    </span>
                                    <span className="flex size-9 items-center justify-center rounded-full border border-[#BFD6EA] bg-white">
                                        <Facebook className="size-4" />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[13px] font-bold text-[#26311f]">
                                    Tautan Cepat
                                </h3>
                                <div className="mt-4 space-y-2.5 text-[12px] text-[#59564c]">
                                    <p>Beranda</p>
                                    <p>Tentang Desa</p>
                                    <p>Paket Wisata</p>
                                    <p>Galeri</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[13px] font-bold text-[#26311f]">
                                    Informasi
                                </h3>
                                <div className="mt-4 space-y-3 text-[12px] text-[#59564c]">
                                    <div className="flex gap-2">
                                        <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#093967]" />
                                        <span>
                                            {textOrFallback(village.location)}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Phone className="mt-0.5 size-3.5 shrink-0 text-[#093967]" />
                                        <span>
                                            {textOrFallback(
                                                village.manager_phone,
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Mail className="mt-0.5 size-3.5 shrink-0 text-[#093967]" />
                                        <span>
                                            {textOrFallback(
                                                village.manager_email,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[13px] font-bold text-[#26311f]">
                                    Ringkasan
                                </h3>
                                <div className="mt-4 space-y-2.5 text-[12px] text-[#59564c]">
                                    <p>{packages.length} paket wisata</p>
                                    <p>{attractions.length} atraksi</p>
                                    <p>{village.umkms.length} UMKM</p>
                                    <p>
                                        {village.pariwisata.length} data
                                        ISTC/pariwisata
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col gap-3 border-t border-[#DCE3EA] pt-5 text-[11px] text-[#8a8577] md:flex-row md:items-center md:justify-between">
                            <p>© 2024 {village.name}. Semua Hak Dilindungi.</p>
                            <div className="flex items-center gap-4">
                                <span>Kebijakan Privasi</span>
                                <span>Syarat & Ketentuan</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}

VillageShow.layout = null;
