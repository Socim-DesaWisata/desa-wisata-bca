import { Head } from '@inertiajs/react';
import {
    Bed,
    Buildings,
    Camera,
    Car,
    ChatsCircle,
    Clock,
    Copy,
    EnvelopeSimple,
    FacebookLogo,
    ForkKnife,
    Gift,
    House,
    Info,
    InstagramLogo,
    Leaf,
    MapPin,
    MapTrifold,
    Package,
    Palette,
    Park,
    Phone,
    QrCode,
    ShareFat,
    ShoppingBagOpen,
    SignIn,
    SquaresFour,
    Star,
    Storefront,
    TiktokLogo,
    Toilet,
    Trophy,
    User,
    UsersThree,
    VideoCamera,
    WifiHigh,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

type Product = {
    title: string;
    image: string;
    desc?: string;
    price?: string;
    meta?: string;
    badge?: string;
    tone?: string;
};

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
    product_photo_url: string | null;
    categories: BadgeItem[];
};
type PariwisataItem = {
    id: number;
    name: string;
    image_url: string | null;
    operational_days: string | null;
    operational_hours: string | null;
    entrance_ticket_price: string | null;
    entrance_ticket_description: string | null;
    address: string | null;
    person_in_charge_name: string | null;
    person_in_charge_phone: string | null;
    status_label: string;
    categories: BadgeItem[];
};
type VillageShowProps = {
    village: {
        id: number;
        code: string;
        name: string;
        description: string | null;
        location: string;
        address: string;
        postal_code: string;
        province: string | null;
        city: string | null;
        district: string | null;
        subdistrict: string | null;
        maps_url: string | null;
        manager_name: string;
        manager_phone: string;
        manager_email: string;
        status_label: string;
        category_label: string;
        media: MediaItem[];
        cover: MediaItem | null;
        profile_items: ProfileGroup[];
        umkms: UmkmItem[];
        pariwisata: PariwisataItem[];
    };
};
type Row = { label: string; value: string; icon: Icon };
type FacilityItem = readonly [Icon, string, string];
const img = (s: string, z = '900/600') =>
    `https://picsum.photos/seed/dewi-ngubalan-${s}/${z}`;
const cx = (...c: Array<string | false | undefined>) =>
    c.filter(Boolean).join(' ');

const textOrFallback = (value: string | null | undefined, fallback: string) =>
    value && value !== '-' && value.trim() !== '' ? value : fallback;
const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, '-');
const firstMediaUrl = (media: MediaItem[] | undefined, fallback: string) =>
    media?.find((item) => item.is_cover)?.url || media?.[0]?.url || fallback;
const groupItems = (
    groups: ProfileGroup[] | undefined,
    matcher: (category: string) => boolean,
) => groups?.find((group) => matcher(normalize(group.category)))?.items ?? [];
const profileProducts = (
    items: ProfileItem[],
    fallback: Product[],
    badge?: string,
    tone?: string,
) =>
    items.length
        ? items.map((item, index) => ({
              title: item.name,
              image: firstMediaUrl(item.media, img(`profile-${item.id}-${index}`)),
              desc: item.description ?? item.address ?? undefined,
              price: item.price_text ?? undefined,
              meta: item.opening_hours ?? undefined,
              badge,
              tone,
          }))
        : fallback;

const nav = [
    [House, 'Home'],
    [MapTrifold, 'Map Distribution'],
    [SquaresFour, 'Category', 'v'],
    [ShoppingBagOpen, 'Tourism Products', 'v'],
    [Info, 'Information', 'v'],
    [ChatsCircle, 'Forum'],
] as const;
const tabs = [
    [User, 'Profile', true],
    [Buildings, 'Facilities'],
    [VideoCamera, 'Video'],
    [Star, 'Attractions'],
    [Bed, 'Homestay'],
    [Package, 'Tour Packages'],
    [Gift, 'UMKM'],
] as const;
const facilities: FacilityItem[] = [
    [Car, 'Parking Area', 'text-[#006A73]'],
    [UsersThree, 'Meeting Hall', 'text-[#f57914]'],
    [Toilet, 'Public Toilet', 'text-[#0E8A4A]'],
    [ForkKnife, 'Culinary', 'text-[#6d4aff]'],
    [Camera, 'Photo Spot', 'text-[#ff3366]'],
    [ForkKnife, 'Dining Area', 'text-[#ff7a1a]'],
    [ForkKnife, 'Dining Area', 'text-[#ff7a1a]'],
    [WifiHigh, 'Wi-Fi Area', 'text-[#007da7]'],
];
const attractions: Product[] = [
    {
        title: 'Sedekah Bumi Experience',
        image: img('ritual'),
        desc: 'Experience the local harvest ritual and Javanese village culture.',
        price: 'Rp 20.000',
        meta: '/ village culture',
        badge: 'Nature Attraction',
        tone: 'bg-[#0D8F55]',
    },
    {
        title: 'Rice Field Introduction Tour',
        image: img('rice-field'),
        desc: 'Explore and learn about the beautiful village scenery and rice fields.',
        price: 'Rp 10.000',
        meta: '/ landscape',
        badge: 'Nature Attraction',
        tone: 'bg-[#0D8F55]',
    },
    {
        title: 'Wood Craft Workshop',
        image: img('wood-workshop'),
        desc: 'Learn to make teak handicrafts using traditional tools and create your own creation.',
        price: 'Rp 250.000',
        badge: 'Creative Attraction',
        tone: 'bg-[#B96B1C]',
    },
    {
        title: 'UMKM Product Exhibition',
        image: img('gallery-shop'),
        desc: 'Discover local MSME products and village gallery displays.',
        price: 'Free',
        badge: 'Village Showcase',
        tone: 'bg-[#047C8F]',
    },
];
const homestays: Product[] = [
    {
        title: 'ANIA Homestay',
        image: img('room'),
        desc: 'Comfortable room with friendly village atmosphere.',
        price: 'Rp 200.000',
        meta: '/ night',
    },
    {
        title: 'Rihlah Homestay',
        image: img('homestay-yard'),
        desc: 'Clean rooms and authentic rural experience.',
        price: 'Rp 230.000',
        meta: '/ night',
    },
    {
        title: 'Ngubalan Homestay',
        image: img('homestay-wide'),
        desc: 'Traditional house with full village hospitality.',
        price: 'Rp 220.000',
        meta: '/ night',
    },
    {
        title: 'Kartasari Homestay',
        image: img('homestay-lodge'),
        desc: 'Quiet and cozy village atmosphere.',
        price: 'Rp 180.000',
        meta: '/ night',
    },
];
const packages: Product[] = [
    {
        title: 'Craft & Rural Life Exploration Package',
        image: img('craft-package'),
        desc: 'Learn the teak wood craft process from experts and explore village life.',
        price: 'Rp 200.000',
        meta: '1 Day  Min. 5 Pax',
    },
    {
        title: 'Meeting Hall & Craft Gallery Package',
        image: img('meeting'),
        desc: 'Use the meeting hall and explore the village craft gallery.',
        price: 'Rp 160.000',
        meta: 'Half Day  Min. 10 Pax',
    },
    {
        title: 'Cultural Immersion Package',
        image: img('culture-package'),
        desc: 'Join cultural activities, traditional cuisine, and local experiences.',
        price: 'Rp 350.000',
        meta: '2 Days  Min. 5 Pax',
    },
];
const souvenirs: Product[] = [
    'Decorative Table Ornament|ornament|Rp 30.000',
    'Teak Wall Decor|wall-decor|Rp 75.000',
    'Mini Wood Sculpture|sculpture|Rp 120.000',
    'Teak Wooden Box|wooden-box|Rp 85.000',
].map((v) => {
    const [title, seed, price] = v.split('|');
    return { title, image: img(seed, '700/420'), price };
});
const nearby: Product[] = [
    {
        title: 'Sugihan Tourism Village',
        image: img('nearby-sugihan'),
        desc: 'Rural charm and organic farming experience.',
        meta: '6.5 km',
    },
    {
        title: 'Kartasari Village',
        image: img('nearby-kartasari'),
        desc: 'Wood craft and digital village innovation.',
        meta: '9.5 km',
    },
    {
        title: 'Dempel Village',
        image: img('nearby-dempel'),
        desc: 'Cultural heritage and traditional arts.',
        meta: '11 km',
    },
    {
        title: 'Karangtengah Village',
        image: img('nearby-karang'),
        desc: 'Agrotourism and local culinary.',
        meta: '13.2 km',
    },
];
const villageRows: Row[] = [
    { icon: User, label: 'Village ID', value: '#126049' },
    { icon: Trophy, label: 'ADWI History', value: '2024 - Top 500' },
    { icon: Park, label: 'Tourism Village Category', value: 'Pioneer' },
];
const stats: Row[] = [
    {
        icon: Trophy,
        label: 'Visitor Statistics (2023)',
        value: '12.450 Visitors',
    },
    { icon: Storefront, label: 'MSME Count', value: '96 MSMEs' },
    { icon: UsersThree, label: 'Workforce Count', value: '312 People' },
    { icon: Buildings, label: 'Revenue Summary (2023)', value: 'Rp 1,48 M' },
];
const footerCols = [
    [
        'Explore',
        'Why Rural Tourism, Tourism Villages, Attraction Packages, Activities, Travel Inspiration, Partner Villages',
    ],
    [
        'Categories',
        'Nature & Adventure, Culture & Heritage, Culinary & Gastronomy, Creative Economy, Wellness & Relaxation, Educational Tourism',
    ],
    [
        'Information',
        'News & Articles, Event Calendar, Village Awards, Download Center, Gallery, FAQ',
    ],
    ['Help & Support', 'Help Center, Contact Us, Privacy Policy, Terms of Use'],
];

function Logo() {
    return (
        <div className="flex items-center gap-3">
            <div className="relative grid size-14 place-items-center overflow-hidden rounded-[18px] bg-[#e8f7f8] ring-1 ring-[#cfe3e4]">
                <span className="absolute bottom-2 h-5 w-10 rounded-t-full bg-[#006A73]" />
                <span className="absolute bottom-2.5 h-3 w-12 rounded-t-full bg-[#f8a42c]" />
                <span className="absolute top-2 h-7 w-7 rotate-45 rounded-sm bg-[#0E8A4A]" />
                <span className="absolute bottom-3 h-1.5 w-9 rounded-full bg-white" />
            </div>
            <div className="leading-tight">
                <p className="text-[18px] font-extrabold text-[#0f172a]">
                    Village Tourism Portal
                </p>
                <p className="text-[12px] font-semibold text-[#6B7C83]">
                    Explore Authentic Villages
                </p>
            </div>
        </div>
    );
}
function TopNav() {
    return (
        <header className="border-b border-[#dde7e7] bg-white">
            <div className="mx-auto flex h-20 max-w-[1360px] items-center justify-between gap-8 px-8">
                <Logo />
                <nav className="hidden items-center gap-7 lg:flex">
                    {nav.map(([Icon, label, dd]) => (
                        <a
                            key={label}
                            href="#"
                            className="group inline-flex h-11 items-center gap-2 text-[13px] font-bold text-[#263238] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#006A73] active:scale-[0.98]"
                        >
                            <Icon className="size-5" />
                            {label}
                            {dd ? (
                                <span className="text-[11px] transition group-hover:translate-y-0.5">
                                    v
                                </span>
                            ) : null}
                        </a>
                    ))}
                </nav>
                <a
                    href="#"
                    className="group inline-flex h-12 items-center gap-2 rounded-lg bg-[#004F5A] px-5 text-[13px] font-extrabold text-white shadow-[0_12px_24px_rgba(0,79,90,0.18)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                    <SignIn className="size-5 transition group-hover:translate-x-0.5" />
                    Login
                </a>
            </div>
        </header>
    );
}
function Hero({
    village,
    heroImage,
}: {
    village: VillageShowProps['village'];
    heroImage: string;
}) {
    const location = textOrFallback(
        village.address !== '-' ? village.address : village.location,
        'Banjarbanggi, Pitu, Ngawi Regency, East Java',
    );

    return (
        <section className="relative h-[260px] overflow-hidden bg-[#004F5A] md:h-[286px]">
            <img
                src={heroImage}
                alt={`${village.name} landscape`}
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,20,14,0.78)_0%,rgba(0,38,30,0.58)_42%,rgba(0,38,30,0.16)_100%)]" />
            <div className="relative mx-auto flex h-full max-w-[1360px] items-center px-8">
                <div className="max-w-[860px] translate-y-1 text-white">
                    <h1 className="text-[34px] leading-[1.1] font-extrabold tracking-[-0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:text-[40px]">
                        {textOrFallback(village.name, 'Dewi Ngubalah Tourism Village')}
                    </h1>
                    <div className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-[#F8D75A] px-4 text-[15px] font-extrabold text-[#4A3600] shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
                        <Star className="size-5" weight="bold" />
                        {textOrFallback(village.category_label, 'Top 500 ADWI 2024')}
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-[15px] font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                        <MapPin className="size-5" weight="fill" />
                        {location}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        {[
                            [village.status_label || 'Wood Craft', Palette, 'bg-[#0B7A67]'],
                            [village.location || 'Rural Experience', Leaf, 'bg-[#117A5D]'],
                            [`${village.umkms.length} UMKM`, Buildings, 'bg-[#33845A]'],
                        ].map(([label, Icon, tone]) => (
                            <span
                                key={label as string}
                                className={cx(
                                    'inline-flex h-9 items-center gap-2 rounded-lg px-4 text-[13px] font-extrabold text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)]',
                                    tone as string,
                                )}
                            >
                                <Icon className="size-4.5" weight="bold" />
                                {label as string}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
function Tabs() {
    return (
        <div className="border-b border-[#dde7e7] bg-white">
            <div className="mx-auto flex h-16 max-w-[1360px] overflow-x-auto px-8">
                {tabs.map(([Icon, label, active]) => (
                    <a
                        key={label}
                        href="#"
                        className={cx(
                            'relative inline-flex min-w-max items-center gap-2 px-7 text-[13px] font-extrabold transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                            active ? 'text-[#006A73]' : 'text-[#263238]',
                        )}
                    >
                        <Icon
                            className="size-5"
                            weight={active ? 'fill' : 'regular'}
                        />
                        {label}
                        {active ? (
                            <span className="absolute right-5 bottom-0 left-5 h-[3px] rounded-full bg-[#006A73]" />
                        ) : null}
                    </a>
                ))}
            </div>
        </div>
    );
}
function Heading({
    icon: Icon,
    children,
}: {
    icon: Icon;
    children: ReactNode;
}) {
    return (
        <h2 className="mb-4 flex items-center gap-2 text-[18px] font-extrabold text-[#006A73]">
            <Icon className="size-5" weight="fill" />
            <span className="text-[#004F5A]">{children}</span>
        </h2>
    );
}
function Panel({ children }: { children: ReactNode }) {
    return (
        <section className="rounded-[18px] border border-[#DDE7E7] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
            {children}
        </section>
    );
}
function FacilityGrid({ items = facilities }: { items?: FacilityItem[] }) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            {items.map(([Icon, label, color], i) => (
                <div
                    key={`${label}-${i}`}
                    className="grid min-h-[92px] place-items-center rounded-[14px] border border-[#EAF0F0] bg-[#F2F7F7] p-3 text-center transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#C8D8D8]"
                >
                    <Icon className={cx('size-6', color)} weight="fill" />
                    <p className="mt-2 text-[11px] leading-tight font-extrabold text-[#263238]">
                        {label}
                    </p>
                </div>
            ))}
        </div>
    );
}
function ProductCard({
    p,
    centered = false,
}: {
    p: Product;
    centered?: boolean;
}) {
    return (
        <article className="overflow-hidden rounded-[14px] border border-[#DDE7E7] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#EDF3F3]">
                <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
                />
                {p.badge ? (
                    <span
                        className={cx(
                            'absolute top-2 left-2 rounded-md px-2.5 py-1 text-[10px] font-extrabold text-white',
                            p.tone,
                        )}
                    >
                        {p.badge}
                    </span>
                ) : null}
            </div>
            <div className={cx('p-4', centered && 'text-center')}>
                <h3 className="text-[13px] leading-snug font-extrabold text-[#0F172A]">
                    {p.title}
                </h3>
                {p.desc ? (
                    <p className="mt-2 min-h-[48px] text-[11px] leading-[1.55] font-semibold text-[#3F4F56]">
                        {p.desc}
                    </p>
                ) : null}
                {p.meta && !p.price ? (
                    <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#263238]">
                        <MapPin
                            className="size-3.5 text-[#006A73]"
                            weight="fill"
                        />
                        {p.meta}
                    </p>
                ) : null}
                {p.price ? (
                    <p className="mt-3 text-[13px] font-extrabold text-[#0E8A4A]">
                        {p.price}{' '}
                        {p.meta ? (
                            <span className="font-bold text-[#6B7C83]">
                                {p.meta}
                            </span>
                        ) : null}
                    </p>
                ) : null}
            </div>
        </article>
    );
}
function ShowcaseProductCard({
    p,
    variant,
}: {
    p: Product;
    variant: 'pariwisata' | 'umkm';
}) {
    const isUmkm = variant === 'umkm';
    const accent = isUmkm ? '#047C8F' : '#0D8F55';
    const soft = isUmkm ? '#E8F6F8' : '#EAF7EF';
    const Icon = isUmkm ? Storefront : Leaf;

    return (
        <article className="group overflow-hidden rounded-[20px] border border-[#DDE7E7] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)]">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#EDF3F3]">
                <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
                {p.badge ? (
                    <span
                        className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                        style={{ backgroundColor: accent }}
                    >
                        <Icon className="size-3.5" weight="fill" />
                        {p.badge}
                    </span>
                ) : null}
            </div>
            <div className="space-y-2.5 p-4">
                <div>
                    <h3 className="text-[13px] leading-tight font-extrabold text-[#0F172A]">
                        {p.title}
                    </h3>
                    {p.desc ? (
                        <p className="mt-1 line-clamp-2 text-[11px] leading-[1.65] font-semibold text-[#506169]">
                            {p.desc}
                        </p>
                    ) : null}
                </div>
                <div
                    className="rounded-[14px] p-3"
                    style={{ backgroundColor: soft }}
                >
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <p className="truncate whitespace-nowrap text-[9px] font-extrabold tracking-[0.06em] text-[#6B7C83] uppercase">
                                {isUmkm ? 'Omset Tahunan' : 'Harga Tiket'}
                            </p>
                            <p
                                className="mt-0.5 truncate whitespace-nowrap text-[11px] leading-tight font-extrabold"
                                style={{ color: accent }}
                            >
                                {p.price || (isUmkm ? 'Data belum tersedia' : 'Gratis / Hubungi Pengelola')}
                            </p>
                        </div>
                        <div>
                            <p className="truncate whitespace-nowrap text-[9px] font-extrabold tracking-[0.06em] text-[#6B7C83] uppercase">
                                {isUmkm ? 'Kategori' : 'Jam Operasional'}
                            </p>
                            <p className="mt-0.5 inline-flex max-w-full items-center gap-1 overflow-hidden text-[10px] leading-tight font-extrabold text-[#263238]">
                                {isUmkm ? (
                                    <ShoppingBagOpen
                                        className="size-4"
                                        weight="fill"
                                        style={{ color: accent }}
                                    />
                                ) : (
                                    <Clock
                                        className="size-4"
                                        weight="fill"
                                        style={{ color: accent }}
                                    />
                                )}
                                <span className="truncate">{isUmkm ? p.desc || p.badge || 'UMKM Lokal' : p.meta || 'Jadwal fleksibel'}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-[#EAF0F0] pt-2.5">
                    <p className="inline-flex min-w-0 items-center gap-1.5 truncate text-[11px] font-extrabold text-[#506169]">
                        {isUmkm ? (
                            <Storefront className="size-3.5 shrink-0" weight="fill" />
                        ) : (
                            <MapPin className="size-3.5 shrink-0" weight="fill" />
                        )}
                        <span className="truncate">{isUmkm ? 'Produk Unggulan Desa' : p.desc || 'Destinasi Wisata'}</span>
                    </p>
                    <span
                        className="grid size-7 shrink-0 place-items-center rounded-full text-white"
                        style={{ backgroundColor: accent }}
                    >
                        <Star className="size-3" weight="fill" />
                    </span>
                </div>
            </div>
        </article>
    );
}
function PackageCard({ p }: { p: Product }) {
    return (
        <article className="grid gap-3 rounded-[14px] border border-[#DDE7E7] bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 sm:grid-cols-[88px_1fr]">
            <img
                src={p.image}
                alt={p.title}
                className="aspect-[4/3] w-full rounded-[10px] object-cover sm:h-full"
            />
            <div>
                <h3 className="text-[13px] leading-snug font-extrabold text-[#0F172A]">
                    {p.title}
                </h3>
                <p className="mt-1.5 text-[10px] leading-[1.55] font-semibold text-[#3F4F56]">
                    {p.desc}
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-bold text-[#6B7C83]">
                    <Clock className="size-3.5" />
                    {p.meta}
                </p>
                <p className="mt-2 text-[13px] font-extrabold text-[#0E8A4A]">
                    {p.price}
                </p>
            </div>
        </article>
    );
}
function SidebarCard({
    title,
    icon: Icon,
    children,
}: {
    title: string;
    icon: Icon;
    children: ReactNode;
}) {
    return (
        <aside className="rounded-[18px] border border-[#DDE7E7] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
            <h3 className="mb-4 flex items-center gap-2 text-[15px] font-extrabold text-[#0F172A]">
                <Icon className="size-5 text-[#006A73]" weight="fill" />
                {title}
            </h3>
            {children}
        </aside>
    );
}
function Rows({ rows }: { rows: Row[] }) {
    return (
        <div className="space-y-3">
            {rows.map(({ label, value, icon: Icon }) => (
                <div
                    key={label}
                    className="flex items-center gap-3 text-[12px]"
                >
                    <Icon
                        className="size-4.5 shrink-0 text-[#006A73]"
                        weight="fill"
                    />
                    <span className="font-bold text-[#3F4F56]">{label}</span>
                    <span className="ml-auto text-right font-extrabold text-[#0F172A]">
                        {value}
                    </span>
                </div>
            ))}
        </div>
    );
}
function QrBlock({ rows, villageName }: { rows: Row[]; villageName: string }) {
    return (
        <SidebarCard title="Village QR Code" icon={QrCode}>
            <div className="mb-5 grid grid-cols-[112px_1fr] items-center gap-4 rounded-[14px] bg-[#F2F7F7] p-4">
                <div className="grid aspect-square place-items-center rounded-lg bg-white p-2">
                    <div className="grid size-full grid-cols-5 gap-1">
                        {Array.from({ length: 25 }).map((_, i) => (
                            <span
                                key={i}
                                className={cx(
                                    'rounded-[1px]',
                                    [
                                        0, 1, 3, 4, 5, 8, 10, 12, 14, 16, 18,
                                        19, 20, 22, 24,
                                    ].includes(i)
                                        ? 'bg-[#0F172A]'
                                        : 'bg-white',
                                )}
                            />
                        ))}
                    </div>
                </div>
                <p className="text-[12px] leading-5 font-bold text-[#263238]">
                    Scan to view {villageName}
                </p>
            </div>
            <Rows rows={rows} />
        </SidebarCard>
    );
}
function MapPreview({ villageName }: { villageName: string }) {
    return (
        <div className="relative mt-4 h-40 overflow-hidden rounded-[12px] bg-[#EAF8EF]">
            <div className="absolute inset-0 [background-image:linear-gradient(35deg,transparent_42%,rgba(27,166,201,0.22)_43%,rgba(27,166,201,0.22)_45%,transparent_46%),linear-gradient(140deg,transparent_46%,rgba(14,138,74,0.18)_47%,rgba(14,138,74,0.18)_49%,transparent_50%)] opacity-80" />
            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
                <MapPin
                    className="mx-auto size-9 text-[#E64848]"
                    weight="fill"
                />
                <p className="mt-1 text-[10px] font-extrabold text-[#3F4F56]">
                    {villageName}
                </p>
            </div>
            <span className="absolute bottom-2 left-2 text-[11px] font-extrabold text-[#1877F2]">
                Google
            </span>
        </div>
    );
}
function Social({
    children,
    label,
    className,
}: {
    children: ReactNode;
    label: string;
    className: string;
}) {
    return (
        <a
            href="#"
            aria-label={label}
            className={cx(
                'grid size-10 place-items-center rounded-full bg-white text-white shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.98]',
                className,
            )}
        >
            {children}
        </a>
    );
}
function Footer() {
    return (
        <footer className="mx-auto mt-8 max-w-[1360px] overflow-hidden rounded-t-[24px] bg-[#EDF3F3]">
            <div className="grid gap-9 px-10 py-10 lg:grid-cols-[1.35fr_repeat(5,1fr)]">
                <div>
                    <Logo />
                    <p className="mt-4 max-w-[260px] text-[12px] leading-6 font-semibold text-[#3F4F56]">
                        Explore authentic villages, empower local communities,
                        and preserve Indonesia's cultural heritage.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Social label="Facebook" className="bg-[#1877F2]">
                            <FacebookLogo className="size-5" weight="fill" />
                        </Social>
                        <Social label="Instagram" className="bg-[#E4405F]">
                            <InstagramLogo className="size-5" weight="fill" />
                        </Social>
                        <Social label="Video channel" className="bg-[#e62117]">
                            <VideoCamera className="size-5" weight="fill" />
                        </Social>
                        <Social label="TikTok" className="bg-[#111827]">
                            <TiktokLogo className="size-5" weight="fill" />
                        </Social>
                    </div>
                </div>
                {footerCols.map(([title, links]) => (
                    <div key={title}>
                        <h3 className="text-[13px] font-extrabold text-[#004F5A]">
                            {title}
                        </h3>
                        <div className="mt-4 space-y-2.5">
                            {links.split(', ').map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="block text-[11px] font-semibold text-[#3F4F56] hover:text-[#006A73]"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
                <div>
                    <h3 className="text-[13px] font-extrabold text-[#004F5A]">
                        Contact Us
                    </h3>
                    <div className="mt-4 space-y-4 text-[12px] leading-5 font-semibold text-[#3F4F56]">
                        <p className="flex gap-2">
                            <MapPin
                                className="mt-0.5 size-4 shrink-0 text-[#006A73]"
                                weight="fill"
                            />
                            Jl. Nusantara No. 66 Jakarta, Indonesia
                        </p>
                        <p className="flex gap-2">
                            <Phone
                                className="mt-0.5 size-4 shrink-0 text-[#006A73]"
                                weight="fill"
                            />
                            +62 21 1234 5678
                        </p>
                        <p className="flex gap-2">
                            <EnvelopeSimple
                                className="mt-0.5 size-4 shrink-0 text-[#006A73]"
                                weight="fill"
                            />
                            info@villagetourism.id
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid gap-3 bg-[#004F5A] px-10 py-4 text-[11px] font-bold text-white md:grid-cols-3">
                <p>© 2024 Village Tourism Portal. All rights reserved.</p>
                <p className="text-center">
                    Promoting Village Tourism, Empowering Local Communities
                </p>
                <p className="text-right">Made with care in Indonesia</p>
            </div>
        </footer>
    );
}

export default function VillageDetail({ village }: VillageShowProps) {
    const villageName = textOrFallback(
        village.name,
        'Dewi Ngubalah Tourism Village',
    );
    const locationText = textOrFallback(
        village.address !== '-' ? village.address : village.location,
        'Dusun Ngubalan, Desa Banjarbanggi, Kecamatan Pitu, Ngawi, East Java',
    );
    const heroImage = village.cover?.url || village.media[0]?.url || img('hero-village', '1800/650');
    const profileImage = village.media[1]?.url || heroImage || img('profile-craft', '760/430');
    const facilityProfiles = groupItems(village.profile_items, (category) =>
        category.includes('fasilitas'),
    );
    const attractionProfiles = groupItems(village.profile_items, (category) =>
        category.includes('atraksi'),
    );
    const homestayProfiles = groupItems(village.profile_items, (category) =>
        category.includes('homestay'),
    );
    const packageProfiles = groupItems(village.profile_items, (category) =>
        category.includes('paket'),
    );
    const souvenirProfiles = groupItems(village.profile_items, (category) =>
        category.includes('suvenir') || category.includes('souvenir'),
    );
    const facilityIconPool = [
        Car,
        UsersThree,
        Toilet,
        ForkKnife,
        Camera,
        WifiHigh,
        Storefront,
        Park,
    ] as const;
    const facilityColors = [
        'text-[#006A73]',
        'text-[#f57914]',
        'text-[#0E8A4A]',
        'text-[#6d4aff]',
        'text-[#ff3366]',
        'text-[#007da7]',
        'text-[#B96B1C]',
        'text-[#0D8F55]',
    ];
    const facilityItems = facilityProfiles.length
        ? facilityProfiles.map((item, index) => [
              facilityIconPool[index % facilityIconPool.length],
              item.name,
              facilityColors[index % facilityColors.length],
          ] as const)
        : facilities;
    const attractionItems = village.pariwisata.length
        ? village.pariwisata.map((item, index) => ({
              title: item.name,
              image: item.image_url || img(`pariwisata-${item.id}-${index}`),
              desc: item.address || item.entrance_ticket_description || undefined,
              price: item.entrance_ticket_price || undefined,
              meta: item.operational_hours || item.operational_days || undefined,
              badge: item.categories[0]?.label || item.status_label,
              tone: 'bg-[#0D8F55]',
          }))
        : profileProducts(attractionProfiles, attractions, 'Nature Attraction', 'bg-[#0D8F55]');
    const homestayItems = profileProducts(homestayProfiles, homestays);
    const packageItems = packageProfiles.length
        ? packageProfiles.map((item, index) => ({
              title: item.name,
              image: firstMediaUrl(item.media, img(`package-${item.id}-${index}`)),
              desc: item.description || item.address || 'Informasi paket wisata desa.',
              price: item.price_text || 'Hubungi Pengelola',
              meta: item.opening_hours || 'Jadwal fleksibel',
          }))
        : packages;
    const souvenirItems = village.umkms.length
        ? village.umkms.map((item, index) => ({
              title: item.brand_name || item.name,
              image: item.product_photo_url || img(`umkm-${item.id}-${index}`, '700/420'),
              desc: item.product_category || item.business_owner_name || undefined,
              price: item.annual_revenue || undefined,
              badge: item.categories[0]?.label,
              tone: 'bg-[#047C8F]',
          }))
        : profileProducts(souvenirProfiles, souvenirs, 'UMKM Lokal', 'bg-[#047C8F]');
    const villageInfoRows: Row[] = [
        { icon: User, label: 'Village ID', value: village.code || '#126049' },
        { icon: Trophy, label: 'Status', value: village.status_label || '2024 - Top 500' },
        { icon: Park, label: 'Tourism Village Category', value: village.category_label || 'Pioneer' },
    ];
    const statisticRows: Row[] = [
        {
            icon: Trophy,
            label: 'Media Gallery',
            value: `${village.media.length || 12} Media`,
        },
        { icon: Storefront, label: 'MSME Count', value: `${village.umkms.length || 96} MSMEs` },
        { icon: UsersThree, label: 'Tourism Product Count', value: `${village.pariwisata.length || 312} Produk` },
        { icon: Buildings, label: 'Village Category', value: village.category_label || 'Rp 1,48 M' },
    ];
    const managerName = textOrFallback(
        village.manager_name,
        'Tourism Awareness Group Ngubalan',
    );
    const managerPhone = textOrFallback(village.manager_phone, '0833 4582 7689');
    const managerEmail = textOrFallback(village.manager_email, 'ngubalandw@gmail.com');

    return (
        <>
            <Head title={villageName} />
            <main className="min-h-[100dvh] bg-[#F7FAFA] font-sans text-[#0F172A]">
                <TopNav />
                <Hero village={village} heroImage={heroImage} />
                <Tabs />
                <div className="mx-auto grid max-w-[1360px] gap-8 px-8 py-8 lg:grid-cols-[minmax(0,8fr)_minmax(320px,4fr)]">
                    <div className="space-y-8">
                        <Panel>
                            <Heading icon={User}>Profile</Heading>
                            <div className="grid gap-6 md:grid-cols-[340px_1fr]">
                                <img
                                    src={profileImage}
                                    alt={`${villageName} profile`}
                                    className="aspect-[16/9] w-full rounded-[12px] object-cover shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
                                />
                                <div className="space-y-5 text-[14px] leading-[1.65] font-semibold text-[#0F172A]">
                                    <p>
                                        {textOrFallback(
                                            village.description,
                                            'Dewi Ngubalan Tourism Village is a rural tourism destination in Ngawi Regency, famous for its teak wood craft made from reclaimed teak wood. Managed by local residents, this village turns traditional skills into local pride and offers a peaceful rural atmosphere with strong traditions and warm hospitality.',
                                        )}
                                    </p>
                                    <p>
                                        {village.description
                                            ? `Desa ini berlokasi di ${locationText}. Pengunjung dapat melihat potensi desa, UMKM, fasilitas, atraksi, dan kontak pengelola dari data profil yang tersedia.`
                                            : 'Visitors can taste the authentic local cuisine, join cultural activities every Friday and Saturday, enjoy a comfortable homestay experience, taste local culinary delights, and join cultural activities during the harvest season that celebrate the rich traditions of the village community.'}
                                    </p>
                                </div>
                            </div>
                        </Panel>
                        <section>
                            <Heading icon={Buildings}>Facilities</Heading>
                            <FacilityGrid items={facilityItems} />
                        </section>
                        <section>
                            <Heading icon={Star}>Tourist Attractions</Heading>
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {attractionItems.map((p) => (
                                    <ShowcaseProductCard
                                        key={p.title}
                                        p={p}
                                        variant="pariwisata"
                                    />
                                ))}
                            </div>
                        </section>
                        <section>
                            <Heading icon={Gift}>UMKM</Heading>
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {souvenirItems.map((p) => (
                                    <ShowcaseProductCard
                                        key={p.title}
                                        p={p}
                                        variant="umkm"
                                    />
                                ))}
                            </div>
                        </section>
                        <section>
                            <Heading icon={MapPin}>
                                Nearby Tourism Villages
                            </Heading>
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {nearby.map((p) => (
                                    <ProductCard key={p.title} p={p} />
                                ))}
                            </div>
                        </section>
                    </div>
                    <div className="space-y-8 lg:sticky lg:top-6 lg:self-start">
                        <QrBlock rows={villageInfoRows} villageName={villageName} />
                        <SidebarCard title="Location Address" icon={MapPin}>
                            <p className="text-[12px] leading-6 font-semibold text-[#263238]">
                                {locationText}
                            </p>
                            {village.maps_url ? (
                                <a
                                    href={village.maps_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-flex text-[12px] font-extrabold text-[#006A73]"
                                >
                                    Buka Google Maps
                                </a>
                            ) : null}
                            <MapPreview villageName={villageName} />
                        </SidebarCard>
                        <SidebarCard title="Contact Person" icon={User}>
                            <div className="flex items-center gap-4">
                                <div className="grid size-16 shrink-0 place-items-center rounded-full bg-[#F2F7F7] ring-1 ring-[#DDE7E7]">
                                    <User className="size-10 text-[#6B7C83]" />
                                </div>
                                <p className="text-[15px] leading-5 font-extrabold text-[#0F172A]">
                                    {managerName}
                                </p>
                            </div>
                            <div className="mt-5 space-y-3 text-[12px] font-bold text-[#263238]">
                                <p className="flex items-center gap-3">
                                    <Phone
                                        className="size-4.5 text-[#006A73]"
                                        weight="fill"
                                    />
                                    {managerPhone}
                                </p>
                                <p className="flex items-center gap-3">
                                    <EnvelopeSimple
                                        className="size-4.5 text-[#006A73]"
                                        weight="fill"
                                    />
                                    {managerEmail}
                                </p>
                                <p className="flex items-center gap-3">
                                    <InstagramLogo
                                        className="size-4.5 text-[#006A73]"
                                        weight="fill"
                                    />
                                    @officialdewi_ngubalan
                                </p>
                            </div>
                        </SidebarCard>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    );
}

VillageDetail.layout = null;