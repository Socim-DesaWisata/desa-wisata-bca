import { Head, Link } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { dashboard } from '@/routes';
import { show as showVillage } from '@/routes/villages';
import { show as showSurveyAssignment } from '@/routes/survey-assignments';
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
type IstcAspectScore = KemenparAspectScore;
type VillageLinkItem = {
    id: number;
    name: string;
    location: string;
    description: string | null;
    cover_url: string | null;
};
type VillageWorker = {
    id: number;
    type: 'full-time' | 'part-time';
    gender: 'male' | 'female' | 'unspecified';
    age_min: number | null;
    age_max: number | null;
    amount: number;
    notes: string | null;
};
type VillageAdministrator = {
    id: number;
    education: string;
    amount: number;
};
type VillageAdministratorLanguage = {
    id: number;
    language_name: string;
    proficiency_level: 'basic' | 'intermediate' | 'advanced' | 'fluent';
    amount: number;
    notes: string | null;
};
type VillageStakeholder = {
    id: number;
    name: string;
    position: string;
};
type VillageInstitutional = {
    id: number;
    title: string;
    description: string;
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
        istc_aspect_scores: IstcAspectScore[];
        survey_assignment: { code: string } | null;
        workers: VillageWorker[];
        administrators: VillageAdministrator[];
        administrator_languages: VillageAdministratorLanguage[];
        stakeholders: VillageStakeholder[];
        institutionals: VillageInstitutional[];
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
const profileDescriptionLimit = 320;
const truncateAtWord = (value: string, maxLength: number) => {
    if (value.length <= maxLength) {
        return value;
    }

    const shortened = value.slice(0, maxLength);
    const lastSpace = shortened.lastIndexOf(' ');

    return `${shortened.slice(0, lastSpace > 0 ? lastSpace : maxLength).trim()}...`;
};
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
                <div className="flex items-center gap-2">
                    <Link
                        href={dashboard.url()}
                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#D5E3F1] bg-white px-4 text-[13px] font-extrabold text-[#093967] shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#F1F7FD] active:scale-[0.98]"
                    >
                        <SquaresFour className="size-5" />
                        Dashboard
                    </Link>
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

function VillageProfileSummary({
    workers,
    stakeholders,
    institutionals,
}: {
    workers: VillageWorker[];
    stakeholders: VillageStakeholder[];
    institutionals: VillageInstitutional[];
}) {
    const totalWorkers = workers.reduce(
        (total, item) => total + item.amount,
        0,
    );
    const partTimeWorkers = workers
        .filter((item) => item.type === 'part-time')
        .reduce((total, item) => total + item.amount, 0);
    const fullTimeWorkers = workers
        .filter((item) => item.type === 'full-time')
        .reduce((total, item) => total + item.amount, 0);
    const summaryStats = [
        {
            value: totalWorkers,
            unit: 'Orang',
            label: 'Total Tenaga Kerja',
            icon: UsersThree,
            iconClass: 'bg-[#EAF3FF] text-[#0066AE]',
        },
        {
            value: partTimeWorkers,
            unit: 'Orang',
            label: 'Pekerja Paruh Waktu',
            icon: Clock,
            iconClass: 'bg-[#EAFBF4] text-[#18A66A]',
        },
        {
            value: fullTimeWorkers,
            unit: 'Orang',
            label: 'Pekerja Penuh Waktu',
            icon: Package,
            iconClass: 'bg-[#F1EDFF] text-[#6D4AFF]',
        },
        {
            value: institutionals.length,
            unit: 'Lembaga',
            label: 'Kelembagaan Terlibat',
            icon: Buildings,
            iconClass: 'bg-[#FFF4E5] text-[#E79A20]',
        },
    ];

    return (
        <section className="md:p-6">
            <Heading icon={UsersThree}>Ringkasan Profil Desa</Heading>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {summaryStats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <article
                            key={stat.label}
                            className="rounded-[14px] border border-[#EDF0F4] bg-white px-3 py-4 text-center shadow-[0_4px_14px_rgba(15,23,42,0.035)]"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <span
                                    className={cx(
                                        'grid size-9 place-items-center rounded-full',
                                        stat.iconClass,
                                    )}
                                >
                                    <Icon className="size-5" weight="fill" />
                                </span>
                                <div className="text-left leading-none">
                                    <p className="text-[22px] font-black tracking-[-0.03em] text-[#0066AE]">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-[10px] font-extrabold text-[#303030]">
                                        {stat.unit}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-3 text-[10px] leading-4 font-extrabold text-[#303030]">
                                {stat.label}
                            </p>
                        </article>
                    );
                })}
            </div>

            <div className="mt-6">
                <h3 className="mb-3 flex items-center gap-2 text-[12px] font-extrabold text-[#093967]">
                    <Buildings
                        className="size-4 text-[#0066AE]"
                        weight="fill"
                    />
                    Kelembagaan yang Terlibat dalam Pengelolaan Desa
                </h3>
                {institutionals.length ? (
                    <div className="grid gap-3 md:grid-cols-3">
                        {institutionals.map((institution) => (
                            <article
                                key={institution.title}
                                className="flex gap-3 rounded-[14px] border border-[#EDF0F4] bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.03)]"
                            >
                                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#EAF3FF] text-[#0066AE]">
                                    <Buildings
                                        className="size-6"
                                        weight="fill"
                                    />
                                </span>
                                <div>
                                    <h4 className="text-[12px] font-black text-[#303030]">
                                        {institution.title}
                                    </h4>
                                    <p className="mt-1 text-[9px] leading-[1.55] font-semibold text-[#5F6B76]">
                                        {institution.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <EmptyState title="Tidak ada data kelembagaan" />
                )}
            </div>

            <div className="bg- mt-5 rounded-[15px] border border-[#E4E8ED] p-4 shadow-[0_7px_20px_rgba(15,23,42,0.08)] md:p-5">
                <h3 className="text-[13px] font-black text-[#0066AE]">
                    Stakeholder Kunci
                </h3>
                {stakeholders.length ? (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {stakeholders.map((stakeholder, index) => (
                            <article
                                key={stakeholder.id}
                                className="text-center"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="relative grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-[#13AAB5] bg-[#EAF3FF] shadow-[0_4px_12px_rgba(0,102,174,0.18)]">
                                        <User
                                            className="size-7 text-[#093967]"
                                            weight="fill"
                                        />
                                        <span className="absolute -right-1 -bottom-1 grid size-4 place-items-center rounded-full bg-[#0066AE] text-[8px] font-black text-white ring-2 ring-white">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-[10px] font-black text-[#303030]">
                                            {stakeholder.position}
                                        </p>
                                        <p className="mt-1 text-[9px] font-semibold text-[#66717C]">
                                            {stakeholder.name}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4">
                        <EmptyState title="Tidak ada data stakeholder" />
                    </div>
                )}
            </div>
        </section>
    );
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

function WorkforceInsight({
    children,
    tone = 'blue',
}: {
    children: ReactNode;
    tone?: 'blue' | 'green' | 'yellow';
}) {
    const styles = {
        blue: 'border-[#D9EAF8] bg-[#F0F8FF] text-[#426075]',
        green: 'border-[#DDF2E5] bg-[#F1FBF5] text-[#3E7656]',
        yellow: 'border-[#F6EAC5] bg-[#FFF9E9] text-[#7D6A35]',
    };

    return (
        <div
            className={cx(
                'mt-4 flex items-start gap-2 rounded-[10px] border px-3 py-2.5 text-[9px] leading-4 font-semibold',
                styles[tone],
            )}
        >
            <Info className="mt-0.5 size-3.5 shrink-0" weight="fill" />
            <p>{children}</p>
        </div>
    );
}

function WorkforceProgress({
    label,
    value,
    percentage,
    color,
    icon: Icon,
}: {
    label: string;
    value: string;
    percentage: number;
    color: string;
    icon: Icon;
}) {
    return (
        <div>
            <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#303030]">
                <Icon
                    className="size-4 shrink-0"
                    weight="fill"
                    style={{ color }}
                />
                <span className="min-w-0 flex-1 truncate">{label}</span>
                <span className="shrink-0 text-[9px] font-black tabular-nums">
                    {value} ({percentage}%)
                </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8EDF2]">
                <div
                    className="h-full rounded-full"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}

function WorkforceSidebarSummary({
    workers,
    administrators,
    administratorLanguages,
}: {
    workers: VillageWorker[];
    administrators: VillageAdministrator[];
    administratorLanguages: VillageAdministratorLanguage[];
}) {
    const totalWorkers = workers.reduce(
        (total, item) => total + item.amount,
        0,
    );
    const percentageOf = (value: number, total: number) =>
        total > 0 ? Math.round((value / total) * 100) : 0;
    const genderRows = [
        {
            value: 'male',
            label: 'Laki-laki',
            color: '#1688CC',
        },
        {
            value: 'female',
            label: 'Perempuan',
            color: '#E95B85',
        },
        {
            value: 'unspecified',
            label: 'Tidak Diketahui',
            color: '#94A3B8',
        },
    ].map((gender) => ({
        ...gender,
        amount: workers
            .filter((item) => item.gender === gender.value)
            .reduce((total, item) => total + item.amount, 0),
    }));
    const malePercent = percentageOf(genderRows[0].amount, totalWorkers);
    const femalePercent = percentageOf(genderRows[1].amount, totalWorkers);
    const genderGradient = `conic-gradient(#1688CC 0 ${malePercent}%, #E95B85 ${malePercent}% ${malePercent + femalePercent}%, #94A3B8 ${malePercent + femalePercent}% 100%)`;
    const dominantGender = [...genderRows].sort(
        (a, b) => b.amount - a.amount,
    )[0];
    const ageRows = Array.from(
        workers
            .reduce(
                (groups, worker) => {
                    const hasCompleteRange =
                        worker.age_min !== null && worker.age_max !== null;
                    const key = hasCompleteRange
                        ? `${worker.age_min}-${worker.age_max}`
                        : 'unknown';
                    const current = groups.get(key) ?? {
                        key,
                        ageMin: hasCompleteRange ? worker.age_min : null,
                        ageMax: hasCompleteRange ? worker.age_max : null,
                        amount: 0,
                        notes: [] as string[],
                    };

                    current.amount += worker.amount;
                    if (worker.notes && !current.notes.includes(worker.notes)) {
                        current.notes.push(worker.notes);
                    }
                    groups.set(key, current);

                    return groups;
                },
                new Map<
                    string,
                    {
                        key: string;
                        ageMin: number | null;
                        ageMax: number | null;
                        amount: number;
                        notes: string[];
                    }
                >(),
            )
            .values(),
    ).sort((a, b) => {
        if (a.ageMin === null) return 1;
        if (b.ageMin === null) return -1;

        return a.ageMin - b.ageMin || (a.ageMax ?? 0) - (b.ageMax ?? 0);
    });
    const totalAdministrators = administrators.reduce(
        (total, item) => total + item.amount,
        0,
    );
    const totalAdministratorLanguages = administratorLanguages.reduce(
        (total, item) => total + item.amount,
        0,
    );
    const educationColors = ['#1688CC', '#16A765', '#F2A900', '#6D4AFF'];
    const proficiencyLabels = {
        basic: 'Dasar',
        intermediate: 'Menengah',
        advanced: 'Mahir',
        fluent: 'Fasih',
    } as const;

    return (
        <div className="space-y-4">
            <SidebarCard
                title="Komposisi Tenaga Kerja (Gender)"
                icon={UsersThree}
            >
                {totalWorkers > 0 ? (
                    <>
                        <div className="grid grid-cols-[112px_1fr] items-center gap-4">
                            <div
                                className="relative mx-auto grid size-24 place-items-center rounded-full"
                                style={{
                                    background: genderGradient,
                                }}
                            >
                                <div className="grid size-[62px] place-items-center rounded-full bg-white text-center shadow-[inset_0_0_0_1px_#EEF1F4]">
                                    <div>
                                        <p className="text-[17px] leading-none font-black text-[#303030]">
                                            {totalWorkers}
                                        </p>
                                        <p className="mt-1 text-[9px] font-extrabold text-[#4B5560]">
                                            Orang
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {genderRows.map((gender) => (
                                    <div
                                        key={gender.value}
                                        className="flex items-start gap-2"
                                    >
                                        <span
                                            className="mt-1 size-2.5 rounded-full"
                                            style={{
                                                backgroundColor: gender.color,
                                            }}
                                        />
                                        <div>
                                            <p className="text-[10px] font-black text-[#303030]">
                                                {gender.label}
                                            </p>
                                            <p className="mt-0.5 text-[9px] font-semibold text-[#596773]">
                                                {gender.amount} Orang (
                                                {percentageOf(
                                                    gender.amount,
                                                    totalWorkers,
                                                )}
                                                %)
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <WorkforceInsight>
                            Komposisi terbesar: {dominantGender.label} (
                            {percentageOf(dominantGender.amount, totalWorkers)}
                            %).
                        </WorkforceInsight>
                    </>
                ) : (
                    <EmptyState title="Tidak ada data tenaga kerja" />
                )}
            </SidebarCard>

            <SidebarCard title="Rentang Umur Tenaga Kerja" icon={Clock}>
                {ageRows.length ? (
                    <div className="space-y-4">
                        {ageRows.map((row, index) => (
                            <div key={row.key}>
                                <WorkforceProgress
                                    label={
                                        row.ageMin === null
                                            ? 'Umur Tidak Diketahui'
                                            : `${row.ageMin}–${row.ageMax} Tahun`
                                    }
                                    value={`${row.amount} Orang`}
                                    percentage={percentageOf(
                                        row.amount,
                                        totalWorkers,
                                    )}
                                    color={
                                        educationColors[
                                            index % educationColors.length
                                        ]
                                    }
                                    icon={Clock}
                                />
                                {row.notes.length > 0 && (
                                    <p className="mt-1 text-[9px] leading-4 font-semibold text-[#596773]">
                                        Catatan: {row.notes.join('; ')}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState title="Tidak ada data rentang umur tenaga kerja" />
                )}
            </SidebarCard>

            <SidebarCard
                title="Status Pengurus menurut Pendidikan"
                icon={Trophy}
            >
                {administrators.length ? (
                    <div className="grid gap-4">
                        <div className="space-y-4">
                            {administrators.map((administrator, index) => (
                                <WorkforceProgress
                                    key={administrator.id}
                                    label={administrator.education.toUpperCase()}
                                    value={`${administrator.amount} Orang`}
                                    percentage={percentageOf(
                                        administrator.amount,
                                        totalAdministrators,
                                    )}
                                    color={
                                        educationColors[
                                            index % educationColors.length
                                        ]
                                    }
                                    icon={Trophy}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <EmptyState title="Tidak ada data pendidikan pengurus" />
                )}
            </SidebarCard>

            <SidebarCard title="Bahasa Asing Pengurus" icon={ChatsCircle}>
                {administratorLanguages.length ? (
                    <div className="space-y-4">
                        {administratorLanguages.map((language, index) => (
                            <div key={language.id}>
                                <WorkforceProgress
                                    label={`${language.language_name} (${proficiencyLabels[language.proficiency_level]})`}
                                    value={`${language.amount} Orang`}
                                    percentage={percentageOf(
                                        language.amount,
                                        totalAdministratorLanguages,
                                    )}
                                    color={
                                        educationColors[
                                            index % educationColors.length
                                        ]
                                    }
                                    icon={ChatsCircle}
                                />
                                {language.notes && (
                                    <p className="mt-1 text-[9px] leading-4 font-semibold text-[#596773]">
                                        Catatan: {language.notes}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState title="Tidak ada data bahasa asing pengurus" />
                )}
            </SidebarCard>
        </div>
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

function AspectScoreCard({
    title,
    emptyLabel,
    aspects = [],
    detailHref,
}: {
    title: string;
    emptyLabel: string;
    aspects?: KemenparAspectScore[];
    detailHref?: string;
}) {
    return (
        <SidebarCard title={title} icon={AspectScoreIcon as unknown as Icon}>
            <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-[12px] leading-5 font-semibold text-[#7C7C7C]">
                    Total skor aktual / skor maksimal per aspek.
                </p>
                {detailHref ? (
                    <Link
                        href={detailHref}
                        className="shrink-0 text-[11px] font-extrabold text-[#0066AE] hover:text-[#093967]"
                    >
                        Lihat Detail
                    </Link>
                ) : null}
            </div>
            {aspects.length === 0 ? (
                <div className="flex h-40 items-center justify-center rounded-[14px] bg-[#F8FBFE] text-center text-[12px] font-bold text-[#7C7C7C]">
                    {emptyLabel}
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
    const villageDescription = village.description ?? '';
    const hasLongDescription =
        villageDescription.length > profileDescriptionLimit;

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
                                        {villageDescription ? (
                                            <>
                                                <div>
                                                    <p>
                                                        {truncateAtWord(
                                                            villageDescription,
                                                            profileDescriptionLimit,
                                                        )}
                                                    </p>
                                                    {hasLongDescription ? (
                                                        <Dialog>
                                                            <DialogTrigger
                                                                asChild
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="mt-3 inline-flex items-center rounded-lg text-[13px] font-extrabold text-[#0066AE] transition hover:text-[#093967] focus-visible:ring-2 focus-visible:ring-[#0066AE] focus-visible:ring-offset-2 focus-visible:outline-none"
                                                                >
                                                                    Lihat
                                                                    Selengkapnya
                                                                </button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-h-[85dvh] overflow-hidden rounded-2xl border-[#DDE7E7] bg-white p-0 sm:max-w-2xl">
                                                                <DialogHeader className="border-b border-[#E5EAF1] px-6 py-5">
                                                                    <DialogTitle className="text-xl font-extrabold text-[#093967]">
                                                                        Deskripsi
                                                                        Profil
                                                                        Desa
                                                                    </DialogTitle>
                                                                    <DialogDescription className="text-sm font-semibold text-[#64748B]">
                                                                        {
                                                                            villageName
                                                                        }
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="max-h-[70dvh] overflow-y-auto px-6 py-5">
                                                                    <p className="text-[14px] leading-7 font-semibold whitespace-pre-wrap text-[#303030]">
                                                                        {
                                                                            villageDescription
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    ) : null}
                                                </div>
                                            </>
                                        ) : (
                                            <EmptyState title="Tidak ada data profil" />
                                        )}
                                    </div>
                                </div>
                            </Panel>
                        </section>
                        <VillageProfileSummary
                            workers={village.workers}
                            stakeholders={village.stakeholders}
                            institutionals={village.institutionals}
                        />
                        <section id="pariwisata">
                            <Heading icon={Star}>Pariwisata</Heading>
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
                            <Heading icon={MapPin}>Desa Wisata Lainnya</Heading>
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
                        <WorkforceSidebarSummary
                            workers={village.workers}
                            administrators={village.administrators}
                            administratorLanguages={
                                village.administrator_languages
                            }
                        />
                        <AspectScoreCard
                            title="Skor Per Aspek (Kemenpar)"
                            emptyLabel="Belum ada data skor Kemenpar"
                            aspects={village.kemenpar_aspect_scores}
                            detailHref={
                                village.survey_assignment
                                    ? showSurveyAssignment.url(
                                          village.survey_assignment.code,
                                      )
                                    : undefined
                            }
                        />
                        <AspectScoreCard
                            title="Skor Per Aspek (ISTC)"
                            emptyLabel="Belum ada data skor ISTC"
                            aspects={village.istc_aspect_scores}
                            detailHref={
                                village.survey_assignment
                                    ? showSurveyAssignment.url(
                                          village.survey_assignment.code,
                                          { query: { tab: 'pariwisata' } },
                                      )
                                    : undefined
                            }
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
