import { Head } from '@inertiajs/react';
import { show as showVillage } from '@/routes/villages';
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
    YoutubeLogo,
    WifiHigh,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

type Product = {
    title: string;
    image?: string | null;
    href?: string;
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
type KemenparAspectScore = {
    name: string;
    score: number;
    max_score: number;
    score_percent: number;
};
type VillageLinkItem = {
    id: number;
    name: string;
    location: string;
    description: string | null;
    cover_url: string | null;
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
        latitude: string | number | null;
        longitude: string | number | null;
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
        kemenpar_aspect_scores: KemenparAspectScore[];
    };
    village_options: VillageLinkItem[];
    nearby_villages: VillageLinkItem[];
};
type Row = { label: string; value: string; icon: Icon };
type FacilityItem = readonly [Icon, string, string];
const cx = (...c: Array<string | false | undefined>) =>
    c.filter(Boolean).join(' ');

const textOrFallback = (value: string | null | undefined, fallback: string) =>
    value && value !== '-' && value.trim() !== '' ? value : fallback;
const truncateText = (value: string, maxLength = 96) =>
    value.length > maxLength
        ? `${value.slice(0, maxLength).trim()}....`
        : value;
const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, '-');
const firstMediaUrl = (media: MediaItem[] | undefined) =>
    media?.find((item) => item.is_cover)?.url || media?.[0]?.url || null;
const groupItems = (
    groups: ProfileGroup[] | undefined,
    matcher: (category: string) => boolean,
) => groups?.find((group) => matcher(normalize(group.category)))?.items ?? [];
const profileProducts = (items: ProfileItem[], badge?: string, tone?: string) =>
    items.map((item) => ({
        title: item.name,
        image: firstMediaUrl(item.media),
        desc: item.description ?? item.address ?? undefined,
        price: item.price_text ?? undefined,
        meta: item.opening_hours ?? undefined,
        badge,
        tone,
    }));

const nav = [
    [House, 'Home', '#home'],
    [User, 'Profil', '#profil'],
    [Star, 'Pariwisata', '#pariwisata'],
    [Gift, 'UMKM', '#umkm'],
] as const;
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
            <img
                src="/logo/desa-logo-trans.webp"
                alt="Desa Bakti BCA"
                className="size-14 shrink-0 object-contain"
            />
            <div className="leading-tight">
                <p className="text-[18px] font-extrabold text-[#0f172a]">
                    Desa Bakti BCA
                </p>
                <p className="text-[12px] font-semibold text-[#7C7C7C]">
                    Explore Authentic Villages
                </p>
            </div>
        </div>
    );
}
function TopNav({ villages }: { villages: VillageLinkItem[] }) {
    return (
        <header className="border-b border-[#dde7e7] bg-white">
            <div className="mx-auto flex h-20 max-w-[1360px] items-center justify-between gap-8 px-8">
                <Logo />
                <nav className="hidden items-center gap-7 lg:flex">
                    {nav.map(([Icon, label, href]) => (
                        <a
                            key={label}
                            href={href}
                            className="group inline-flex h-11 items-center gap-2 text-[13px] font-bold text-[#303030] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#0066AE] active:scale-[0.98]"
                        >
                            <Icon className="size-5" />
                            {label}
                        </a>
                    ))}
                </nav>
                <details className="group relative">
                    <summary className="inline-flex h-10 cursor-pointer list-none items-center gap-2 rounded-lg bg-[#093967] px-5 text-[13px] font-extrabold text-white shadow-[0_12px_24px_rgba(0,102,174,0.18)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.98] [&::-webkit-details-marker]:hidden">
                        <MapTrifold className="size-5" />
                        List Desa
                        <span className="text-[11px] transition group-open:rotate-180">
                            v
                        </span>
                    </summary>
                    <div className="absolute right-0 z-30 mt-3 w-72 overflow-hidden rounded-2xl border border-[#DDE7E7] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.16)]">
                        <div className="max-h-80 overflow-y-auto p-2">
                            {villages.map((item) => (
                                <a
                                    key={item.id}
                                    href={showVillage.url(item.id)}
                                    className="block rounded-xl px-3 py-2.5 text-left transition hover:bg-[#EAF3FF]"
                                >
                                    <span className="block text-[13px] font-extrabold text-[#093967]">
                                        {item.name}
                                    </span>
                                    <span className="mt-0.5 block text-[11px] font-semibold text-[#64748B]">
                                        {item.location}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </details>
            </div>
        </header>
    );
}
function Hero({
    village,
    heroImage,
}: {
    village: VillageShowProps['village'];
    heroImage: string | null;
}) {
    const location = textOrFallback(
        village.address !== '-' ? village.address : village.location,
        'Banjarbanggi, Pitu, Ngawi Regency, East Java',
    );

    return (
        <section className="relative h-[420px] overflow-hidden bg-[#093967] md:h-[560px]">
            {heroImage ? (
                <img
                    src={heroImage}
                    alt={`${village.name} landscape`}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <ImagePlaceholder
                    label="hero desa"
                    className="absolute inset-0 bg-[#EAF3FF]"
                />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,34,68,0.78)_0%,rgba(0,68,120,0.58)_42%,rgba(0,102,174,0.16)_100%)]" />
            <div className="relative mx-auto flex h-full max-w-[1360px] items-center px-8">
                <div className="max-w-[860px] translate-y-1 text-white">
                    <h1 className="text-[34px] leading-[1.1] font-extrabold tracking-[-0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:text-[40px]">
                        {textOrFallback(village.name, 'Tidak ada data')}
                    </h1>
                    <div className="mt-5 flex items-center gap-2 text-[15px] font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                        <MapPin className="size-5" weight="fill" />
                        {location}
                    </div>
                </div>
            </div>
        </section>
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
        <h2 className="mb-4 flex items-center gap-2 text-[18px] font-extrabold text-[#0066AE]">
            <Icon className="size-5" weight="fill" />
            <span className="text-[#093967]">{children}</span>
        </h2>
    );
}
function Panel({ children }: { children: ReactNode }) {
    return <section className="rounded-[18px] p-5">{children}</section>;
}
function EmptyState({ title }: { title: string }) {
    return (
        <div className="grid min-h-[140px] place-items-center rounded-[16px] border border-dashed border-[#C8D8E8] bg-[#F8FBFE] px-5 text-center text-[13px] font-extrabold text-[#7C7C7C]">
            {title}
        </div>
    );
}
function ImagePlaceholder({
    label,
    className,
}: {
    label: string;
    className?: string;
}) {
    return (
        <div
            className={cx(
                'grid h-full w-full place-items-center bg-[#EAF3FF] p-4 text-center text-[12px] font-extrabold text-[#7C7C7C]',
                className,
            )}
        >
            Tidak ada gambar {label}
        </div>
    );
}
function FacilityGrid({ items }: { items: FacilityItem[] }) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            {items.map(([Icon, label, color], i) => (
                <div
                    key={`${label}-${i}`}
                    className="grid min-h-[92px] place-items-center rounded-[14px] border border-[#EFEFEF] bg-[#F8FBFE] p-3 text-center transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#AAD2F8]"
                >
                    <Icon className={cx('size-6', color)} weight="fill" />
                    <p className="mt-2 text-[11px] leading-tight font-extrabold text-[#303030]">
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
    size = 'default',
}: {
    p: Product;
    centered?: boolean;
    size?: 'default' | 'large';
}) {
    const isLarge = size === 'large';
    const card = (
        <article
            className={cx(
                'overflow-hidden border border-[#EFEFEF] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]',
                isLarge ? 'rounded-[16px]' : 'rounded-[14px]',
            )}
        >
            <div
                className={cx(
                    'relative overflow-hidden bg-[#F1F5F8]',
                    isLarge ? 'aspect-[4/3]' : 'aspect-[16/9]',
                )}
            >
                {p.image ? (
                    <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
                    />
                ) : (
                    <ImagePlaceholder label={p.title} />
                )}
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
            <div
                className={cx(
                    isLarge ? 'p-5' : 'p-4',
                    centered && 'text-center',
                )}
            >
                <h3
                    className={cx(
                        'font-extrabold text-[#303030]',
                        isLarge
                            ? 'text-[15px] leading-snug'
                            : 'text-[13px] leading-snug',
                    )}
                >
                    {p.title}
                </h3>
                {p.desc ? (
                    <p
                        className={cx(
                            'mt-2 line-clamp-2 font-semibold text-[#303030]',
                            isLarge
                                ? 'min-h-[38px] text-[12px] leading-[1.55]'
                                : 'min-h-[34px] text-[11px] leading-[1.55]',
                        )}
                    >
                        {truncateText(p.desc, isLarge ? 86 : 96)}
                    </p>
                ) : null}
                {p.meta && !p.price ? (
                    <p
                        className={cx(
                            'mt-3 inline-flex items-center gap-1 font-bold text-[#303030]',
                            isLarge ? 'text-[12px]' : 'text-[11px]',
                        )}
                    >
                        <MapPin
                            className={
                                isLarge
                                    ? 'size-4 text-[#0066AE]'
                                    : 'size-3.5 text-[#0066AE]'
                            }
                            weight="fill"
                        />
                        {p.meta}
                    </p>
                ) : null}
                {p.price ? (
                    <p
                        className={cx(
                            'mt-3 font-extrabold text-[#0066AE]',
                            isLarge ? 'text-[14px]' : 'text-[13px]',
                        )}
                    >
                        {p.price}{' '}
                        {p.meta ? (
                            <span className="font-bold text-[#7C7C7C]">
                                {p.meta}
                            </span>
                        ) : null}
                    </p>
                ) : null}
            </div>
        </article>
    );

    return p.href ? (
        <a href={p.href} className="block">
            {card}
        </a>
    ) : (
        card
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
    const accent = isUmkm ? '#0066AE' : '#0066AE';
    const soft = isUmkm ? '#EAF3FF' : '#EAF3FF';
    const Icon = isUmkm ? Storefront : Leaf;

    return (
        <article className="group overflow-hidden rounded-[20px] border border-[#EFEFEF] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)]">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#F1F5F8]">
                {p.image ? (
                    <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                ) : (
                    <ImagePlaceholder label={p.title} />
                )}
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
                    <h3 className="text-[13px] leading-tight font-extrabold text-[#303030]">
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
                            <p className="truncate text-[9px] font-extrabold tracking-[0.06em] whitespace-nowrap text-[#7C7C7C] uppercase">
                                {isUmkm ? 'Omset Tahunan' : 'Harga Tiket'}
                            </p>
                            <p
                                className="mt-0.5 truncate text-[11px] leading-tight font-extrabold whitespace-nowrap"
                                style={{ color: accent }}
                            >
                                {p.price || 'Tidak ada data'}
                            </p>
                        </div>
                        <div>
                            <p className="truncate text-[9px] font-extrabold tracking-[0.06em] whitespace-nowrap text-[#7C7C7C] uppercase">
                                {isUmkm ? 'Kategori' : 'Jam Operasional'}
                            </p>
                            <p className="mt-0.5 inline-flex max-w-full items-center gap-1 overflow-hidden text-[10px] leading-tight font-extrabold text-[#303030]">
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
                                <span className="truncate">
                                    {isUmkm
                                        ? p.desc || p.badge || 'Tidak ada data'
                                        : p.meta || 'Tidak ada data'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-[#EFEFEF] pt-2.5">
                    <p className="inline-flex min-w-0 items-center gap-1.5 truncate text-[11px] font-extrabold text-[#506169]">
                        {isUmkm ? (
                            <Storefront
                                className="size-3.5 shrink-0"
                                weight="fill"
                            />
                        ) : (
                            <MapPin
                                className="size-3.5 shrink-0"
                                weight="fill"
                            />
                        )}
                        <span className="truncate">
                            {isUmkm
                                ? p.desc || 'Tidak ada data'
                                : p.desc || 'Tidak ada data'}
                        </span>
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
        <aside className="rounded-[18px] border border-[#EFEFEF] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
            <h3 className="mb-4 flex items-center gap-2 text-[15px] font-extrabold text-[#303030]">
                <Icon className="size-5 text-[#0066AE]" weight="fill" />
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
                        className="size-4.5 shrink-0 text-[#0066AE]"
                        weight="fill"
                    />
                    <span className="font-bold text-[#303030]">{label}</span>
                    <span className="ml-auto text-right font-extrabold text-[#303030]">
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
            <div className="mb-5 grid grid-cols-[112px_1fr] items-center gap-4 rounded-[14px] bg-[#F8FBFE] p-4">
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
                                        ? 'bg-[#303030]'
                                        : 'bg-white',
                                )}
                            />
                        ))}
                    </div>
                </div>
                <p className="text-[12px] leading-5 font-bold text-[#303030]">
                    Scan to view {villageName}
                </p>
            </div>
            <Rows rows={rows} />
        </SidebarCard>
    );
}
const clampPercent = (value: number) => Math.min(Math.max(value, 0), 100);

function AspectScoreIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <path
                d="M4 19V5M4 19H20M8 16V11M12 16V8M16 16V6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function KemenparAspectScoreCard({
    aspects = [],
}: {
    aspects?: KemenparAspectScore[];
}) {
    return (
        <SidebarCard
            title="Skor Per Aspek (Kemenpar)"
            icon={AspectScoreIcon as unknown as Icon}
        >
            <p className="mb-4 text-[12px] leading-5 font-semibold text-[#7C7C7C]">
                Total skor aktual / skor maksimal per aspek.
            </p>
            {aspects.length === 0 ? (
                <div className="flex h-40 items-center justify-center rounded-[14px] bg-[#F8FBFE] text-center text-[12px] font-bold text-[#7C7C7C]">
                    Belum ada data skor Kemenpar
                </div>
            ) : (
                <div className="space-y-2.5">
                    {aspects.map((aspect) => (
                        <div key={aspect.name} className="space-y-1.5">
                            <div className="flex items-center justify-between gap-3">
                                <p className="truncate text-[12px] font-extrabold text-[#303030]">
                                    {aspect.name}
                                </p>
                                <p className="shrink-0 text-[11px] font-black text-[#303030] tabular-nums">
                                    {aspect.score}/{aspect.max_score}
                                </p>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-[#EAF3FF]">
                                <div
                                    className="h-full rounded-full bg-[#0066AE]"
                                    style={{
                                        width: `${clampPercent(aspect.score_percent)}%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </SidebarCard>
    );
}
function GoogleMapPreview({
    villageName,
    location,
    latitude,
    longitude,
}: {
    villageName: string;
    location: string;
    latitude: string | number | null;
    longitude: string | number | null;
}) {
    const coordinateQuery =
        latitude && longitude ? `${latitude},${longitude}` : null;
    const query =
        coordinateQuery || [villageName, location].filter(Boolean).join(', ');
    const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

    return (
        <div className="mt-4 overflow-hidden rounded-[12px] border border-[#E5EAF1] bg-[#F8FBFE]">
            <iframe
                title={`Google Maps ${villageName}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full border-0"
                allowFullScreen
            />
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
                'grid size-10 place-items-center rounded-full bg-white shadow-[0_8px_18px_rgba(15,23,42,0.08)] ring-1 ring-[#E5EAF1] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.98]',
                className,
            )}
        >
            {children}
        </a>
    );
}
function Footer() {
    return (
        <footer className="mx-auto mt-8 max-w-[1360px] overflow-hidden rounded-t-[24px] bg-[#F1F5F8]">
            <div className="grid gap-9 px-10 py-10 lg:grid-cols-[1.35fr_repeat(5,1fr)]">
                <div>
                    <Logo />
                    <p className="mt-4 max-w-[260px] text-[12px] leading-6 font-semibold text-[#303030]">
                        Explore authentic villages, empower local communities,
                        and preserve Indonesia's cultural heritage.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Social label="Facebook" className="text-[#1877F2]">
                            <FacebookLogo className="size-5" weight="fill" />
                        </Social>
                        <Social label="Instagram" className="text-[#E4405F]">
                            <InstagramLogo className="size-5" weight="fill" />
                        </Social>
                        <Social label="YouTube" className="text-[#FF0000]">
                            <YoutubeLogo className="size-5" weight="fill" />
                        </Social>
                        <Social label="TikTok" className="text-[#111827]">
                            <TiktokLogo className="size-5" weight="fill" />
                        </Social>
                    </div>
                </div>
                {footerCols.map(([title, links]) => (
                    <div key={title}>
                        <h3 className="text-[13px] font-extrabold text-[#093967]">
                            {title}
                        </h3>
                        <div className="mt-4 space-y-2.5">
                            {links.split(', ').map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="block text-[11px] font-semibold text-[#303030] hover:text-[#0066AE]"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
                <div>
                    <h3 className="text-[13px] font-extrabold text-[#093967]">
                        Contact Us
                    </h3>
                    <div className="mt-4 space-y-4 text-[12px] leading-5 font-semibold text-[#303030]">
                        <p className="flex gap-2">
                            <MapPin
                                className="mt-0.5 size-4 shrink-0 text-[#0066AE]"
                                weight="fill"
                            />
                            Jl. Nusantara No. 66 Jakarta, Indonesia
                        </p>
                        <p className="flex gap-2">
                            <Phone
                                className="mt-0.5 size-4 shrink-0 text-[#0066AE]"
                                weight="fill"
                            />
                            +62 21 1234 5678
                        </p>
                        <p className="flex gap-2">
                            <EnvelopeSimple
                                className="mt-0.5 size-4 shrink-0 text-[#0066AE]"
                                weight="fill"
                            />
                            info@villagetourism.id
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid gap-3 bg-[#093967] px-10 py-4 text-[11px] font-bold text-white md:grid-cols-3">
                <p>© 2024 Desa Bakti BCA. All rights reserved.</p>
                <p className="text-center">
                    Promoting Village Tourism, Empowering Local Communities
                </p>
                <p className="text-right">Made with care in Indonesia</p>
            </div>
        </footer>
    );
}

export default function VillageDetail({
    village,
    village_options,
    nearby_villages,
}: VillageShowProps) {
    const villageName = textOrFallback(village.name, 'Tidak ada data');
    const locationText = textOrFallback(
        village.address !== '-' ? village.address : village.location,
        'Tidak ada data',
    );
    const heroImage = village.cover?.url || village.media[0]?.url || null;
    const profileImage = village.media[1]?.url || heroImage;
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
    const souvenirProfiles = groupItems(
        village.profile_items,
        (category) =>
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
        'text-[#0066AE]',
        'text-[#f57914]',
        'text-[#0066AE]',
        'text-[#6d4aff]',
        'text-[#ff3366]',
        'text-[#007da7]',
        'text-[#B96B1C]',
        'text-[#0066AE]',
    ];
    const facilityItems = facilityProfiles.map(
        (item, index) =>
            [
                facilityIconPool[index % facilityIconPool.length],
                item.name,
                facilityColors[index % facilityColors.length],
            ] as const,
    );
    const attractionItems = village.pariwisata.length
        ? village.pariwisata.map((item) => ({
              title: item.name,
              image: item.image_url,
              desc:
                  item.address || item.entrance_ticket_description || undefined,
              price: item.entrance_ticket_price || undefined,
              meta:
                  item.operational_hours || item.operational_days || undefined,
              badge: item.categories[0]?.label || item.status_label,
              tone: 'bg-[#0066AE]',
          }))
        : profileProducts(attractionProfiles, undefined, 'bg-[#0066AE]');
    const souvenirItems = village.umkms.length
        ? village.umkms.map((item) => ({
              title: item.brand_name || item.name,
              image: item.product_photo_url,
              desc:
                  item.product_category ||
                  item.business_owner_name ||
                  undefined,
              price: item.annual_revenue || undefined,
              badge: item.categories[0]?.label,
              tone: 'bg-[#0066AE]',
          }))
        : profileProducts(souvenirProfiles, undefined, 'bg-[#0066AE]');
    const nearbyItems = nearby_villages.map((item) => ({
        title: item.name,
        image: item.cover_url,
        desc: item.description || undefined,
        meta: item.location,
        href: showVillage.url(item.id),
    }));
    const villageInfoRows: Row[] = [
        {
            icon: User,
            label: 'Village ID',
            value: village.code || 'Tidak ada data',
        },
        {
            icon: Trophy,
            label: 'Status',
            value: village.status_label || 'Tidak ada data',
        },
    ];
    const statisticRows: Row[] = [
        {
            icon: Trophy,
            label: 'Media Gallery',
            value: `${village.media.length} Media`,
        },
        {
            icon: Storefront,
            label: 'MSME Count',
            value: `${village.umkms.length} MSMEs`,
        },
        {
            icon: UsersThree,
            label: 'Tourism Product Count',
            value: `${village.pariwisata.length} Produk`,
        },
        {
            icon: Buildings,
            label: 'Village Category',
            value: village.category_label || 'Tidak ada data',
        },
    ];
    const managerName = textOrFallback(village.manager_name, 'Tidak ada data');
    const managerPhone = textOrFallback(
        village.manager_phone,
        'Tidak ada data',
    );
    const managerEmail = textOrFallback(
        village.manager_email,
        'Tidak ada data',
    );

    return (
        <>
            <Head title={villageName} />
            <main className="min-h-[100dvh] bg-[#F7F7F7] font-sans text-[#303030]">
                <TopNav villages={village_options} />
                <div id="home">
                    <Hero village={village} heroImage={heroImage} />
                </div>
                <div className="mx-auto grid max-w-[1360px] gap-8 px-8 py-8 lg:grid-cols-[minmax(0,8fr)_minmax(320px,4fr)]">
                    <div className="space-y-8">
                        <section id="profil">
                            <Panel>
                                <Heading icon={User}>Profile</Heading>
                                <div className="grid gap-6 md:grid-cols-[340px_1fr]">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt={`${villageName} profile`}
                                            className="aspect-[16/9] w-full rounded-[12px] object-cover shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
                                        />
                                    ) : (
                                        <ImagePlaceholder
                                            label="profil desa"
                                            className="aspect-[16/9] rounded-[12px] shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
                                        />
                                    )}
                                    <div className="space-y-5 text-[14px] leading-[1.65] font-semibold text-[#303030]">
                                        {village.description ? (
                                            <>
                                                <p>{village.description}</p>
                                                {locationText !==
                                                'Tidak ada data' ? (
                                                    <p>
                                                        Desa ini berlokasi di{' '}
                                                        {locationText}.
                                                    </p>
                                                ) : null}
                                            </>
                                        ) : (
                                            <EmptyState title="Tidak ada data profil" />
                                        )}
                                    </div>
                                </div>
                            </Panel>
                        </section>
                        <section id="pariwisata">
                            <Heading icon={Star}>Tourist Attractions</Heading>
                            {attractionItems.length ? (
                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    {attractionItems.map((p) => (
                                        <ShowcaseProductCard
                                            key={p.title}
                                            p={p}
                                            variant="pariwisata"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState title="Tidak ada data pariwisata" />
                            )}
                        </section>
                        <section id="umkm">
                            <Heading icon={Gift}>UMKM</Heading>
                            {souvenirItems.length ? (
                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    {souvenirItems.map((p) => (
                                        <ShowcaseProductCard
                                            key={p.title}
                                            p={p}
                                            variant="umkm"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState title="Tidak ada data UMKM" />
                            )}
                        </section>
                        <section>
                            <Heading icon={MapPin}>
                                Nearby Tourism Villages
                            </Heading>
                            {nearbyItems.length ? (
                                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                    {nearbyItems.slice(0, 6).map((p) => (
                                        <ProductCard
                                            key={p.title}
                                            p={p}
                                            size="large"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState title="Tidak ada data desa lainnya" />
                            )}
                        </section>
                    </div>
                    <div className="space-y-8 lg:sticky lg:top-6 lg:self-start">
                        {/* <QrBlock rows={villageInfoRows} villageName={villageName} /> */}
                        <KemenparAspectScoreCard
                            aspects={village.kemenpar_aspect_scores}
                        />
                        <SidebarCard title="Location Address" icon={MapPin}>
                            <p className="text-[12px] leading-6 font-semibold text-[#303030]">
                                {locationText}
                            </p>
                            {village.maps_url ? (
                                <a
                                    href={village.maps_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-flex text-[12px] font-extrabold text-[#0066AE]"
                                >
                                    Buka Google Maps
                                </a>
                            ) : null}
                            <GoogleMapPreview
                                villageName={villageName}
                                location={locationText}
                                latitude={village.latitude}
                                longitude={village.longitude}
                            />
                        </SidebarCard>
                        <SidebarCard title="Contact Person" icon={User}>
                            <div className="flex items-center gap-4">
                                <div className="grid size-16 shrink-0 place-items-center rounded-full bg-[#F8FBFE] ring-1 ring-[#EFEFEF]">
                                    <User className="size-10 text-[#7C7C7C]" />
                                </div>
                                <p className="text-[15px] leading-5 font-extrabold text-[#303030]">
                                    {managerName}
                                </p>
                            </div>
                            <div className="mt-5 space-y-3 text-[12px] font-bold text-[#303030]">
                                <p className="flex items-center gap-3">
                                    <Phone
                                        className="size-4.5 text-[#0066AE]"
                                        weight="fill"
                                    />
                                    {managerPhone}
                                </p>
                                <p className="flex items-center gap-3">
                                    <EnvelopeSimple
                                        className="size-4.5 text-[#0066AE]"
                                        weight="fill"
                                    />
                                    {managerEmail}
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
