import re

file_path = 'e:/laragon/www/DesaWisataBCA/resources/js/pages/villages/show.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
content = content.replace(
    '''import { Head } from '@inertiajs/react';\nimport { show as showVillage } from '@/routes/villages';''',
    '''import { Head } from '@inertiajs/react';
import { show as showVillage } from '@/routes/villages';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);'''
)

# 2. Hero Component
hero_old = '''function Hero({
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
        <section className=\"relative h-[260px] overflow-hidden bg-[#093967] md:h-[286px]\">
            {heroImage ? (
                <img
                    src={heroImage}
                    alt={`${village.name} landscape`}
                    className=\"absolute inset-0 h-full w-full object-cover\"
                />
            ) : (
                <ImagePlaceholder
                    label=\"hero desa\"
                    className=\"absolute inset-0 bg-[#EAF3FF]\"
                />
            )}
            <div className=\"absolute inset-0 bg-[linear-gradient(90deg,rgba(0,34,68,0.78)_0%,rgba(0,68,120,0.58)_42%,rgba(0,102,174,0.16)_100%)]\" />
            <div className=\"relative mx-auto flex h-full max-w-[1360px] items-center px-8\">
                <div className=\"max-w-[860px] translate-y-1 text-white\">
                    <h1 className=\"text-[34px] leading-[1.1] font-extrabold tracking-[-0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:text-[40px]\">
                        {textOrFallback(village.name, 'Tidak ada data')}
                    </h1>
                    <div className=\"mt-5 flex items-center gap-2 text-[15px] font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]\">
                        <MapPin className=\"size-5\" weight=\"fill\" />
                        {location}
                    </div>
                </div>
            </div>
        </section>
    );
}'''

hero_new = '''function Hero({
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
    const heroRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (bgRef.current) {
            gsap.to(bgRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    }, { scope: heroRef });

    return (
        <section ref={heroRef} className=\"relative h-[260px] overflow-hidden bg-[#093967] md:h-[340px] perspective-1000\">
            {heroImage ? (
                <img
                    ref={bgRef}
                    src={heroImage}
                    alt={`${village.name} landscape`}
                    className=\"absolute inset-0 h-[130%] w-full object-cover -top-[15%]\"
                />
            ) : (
                <ImagePlaceholder
                    label=\"hero desa\"
                    className=\"absolute inset-0 bg-[#EAF3FF]\"
                />
            )}
            <div className=\"absolute inset-0 bg-black/20 backdrop-blur-[2px]\" />
            <div className=\"absolute inset-0 bg-[linear-gradient(90deg,rgba(0,34,68,0.85)_0%,rgba(0,68,120,0.4)_50%,transparent_100%)]\" />
            <div className=\"relative mx-auto flex h-full max-w-[1360px] items-center px-8 z-10\">
                <div className=\"max-w-[860px] translate-y-2 rounded-[24px] bg-white/10 p-6 md:p-8 backdrop-blur-md border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.15)]\">
                    <h1 className=\"text-[34px] leading-[1.1] font-extrabold tracking-[-0.01em] text-white drop-shadow-md md:text-[46px]\">
                        {textOrFallback(village.name, 'Tidak ada data')}
                    </h1>
                    <div className=\"mt-4 flex items-center gap-2 text-[15px] font-bold text-white/90\">
                        <MapPin className=\"size-5\" weight=\"fill\" />
                        {location}
                    </div>
                </div>
            </div>
        </section>
    );
}'''
content = content.replace(hero_old, hero_new)


# 3. Panel
panel_old = '''function Panel({ children }: { children: ReactNode }) {
    return (
        <section className=\"rounded-[18px] border border-[#EFEFEF] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]\">
            {children}
        </section>
    );
}'''
panel_new = '''function Panel({ children }: { children: ReactNode }) {
    return (
        <section className=\"rounded-[24px] bg-white/60 p-6 backdrop-blur-xl shadow-[0_20px_40px_rgba(15,23,42,0.03)] border border-white/80 transition-all duration-300 hover:shadow-[0_24px_48px_rgba(15,23,42,0.05)]\">
            {children}
        </section>
    );
}'''
content = content.replace(panel_old, panel_new)


# 4. SidebarCard
sidebar_old = '''function SidebarCard({
    title,
    icon: Icon,
    children,
}: {
    title: string;
    icon: Icon;
    children: ReactNode;
}) {
    return (
        <aside className=\"rounded-[18px] border border-[#EFEFEF] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]\">
            <h3 className=\"mb-4 flex items-center gap-2 text-[15px] font-extrabold text-[#303030]\">
                <Icon className=\"size-5 text-[#0066AE]\" weight=\"fill\" />
                {title}
            </h3>
            {children}
        </aside>
    );
}'''
sidebar_new = '''function SidebarCard({
    title,
    icon: Icon,
    children,
}: {
    title: string;
    icon: Icon;
    children: ReactNode;
}) {
    return (
        <aside className=\"rounded-[24px] bg-white/60 p-6 backdrop-blur-xl shadow-[0_20px_40px_rgba(15,23,42,0.03)] border border-white/80 transition-all duration-300 hover:shadow-[0_24px_48px_rgba(15,23,42,0.05)]\">
            <h3 className=\"mb-5 flex items-center gap-3 text-[16px] font-extrabold text-[#303030]\">
                <div className=\"grid size-9 place-items-center rounded-[12px] bg-[#EAF3FF] text-[#0066AE]\">
                    <Icon className=\"size-5\" weight=\"fill\" />
                </div>
                {title}
            </h3>
            {children}
        </aside>
    );
}'''
content = content.replace(sidebar_old, sidebar_new)

# 5. Heading 
heading_old = '''function Heading({
    icon: Icon,
    children,
}: {
    icon: Icon;
    children: ReactNode;
}) {
    return (
        <h2 className=\"mb-4 flex items-center gap-2 text-[18px] font-extrabold text-[#0066AE]\">
            <Icon className=\"size-5\" weight=\"fill\" />
            <span className=\"text-[#093967]\">{children}</span>
        </h2>
    );
}'''
heading_new = '''function Heading({
    icon: Icon,
    children,
    className
}: {
    icon: Icon;
    children: ReactNode;
    className?: string;
}) {
    return (
        <h2 className={`mb-6 flex items-center gap-3 text-[20px] font-extrabold text-[#0066AE] ${className || ''}`}>
            <div className=\"grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-[#0066AE] to-[#004488] text-white shadow-[0_8px_16px_rgba(0,102,174,0.25)]\">
                <Icon className=\"size-5\" weight=\"fill\" />
            </div>
            <span className=\"text-[#093967]\">{children}</span>
        </h2>
    );
}'''
content = content.replace(heading_old, heading_new)

# 6. ProductCard 
pcard_old = '''function ProductCard({
    p,
    centered = false,
}: {
    p: Product;
    centered?: boolean;
}) {
    const card = (
        <article className=\"overflow-hidden rounded-[14px] border border-[#EFEFEF] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]\">
            <div className=\"relative aspect-[16/9] overflow-hidden bg-[#F1F5F8]\">
                {p.image ? (
                    <img
                        src={p.image}
                        alt={p.title}
                        className=\"h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]\"
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
            <div className={cx('p-4', centered && 'text-center')}>
                <h3 className=\"text-[13px] leading-snug font-extrabold text-[#303030]\">
                    {p.title}
                </h3>
                {p.desc ? (
                    <p className=\"mt-2 min-h-[48px] text-[11px] leading-[1.55] font-semibold text-[#303030]\">
                        {p.desc}
                    </p>
                ) : null}
                {p.meta && !p.price ? (
                    <p className=\"mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#303030]\">
                        <MapPin
                            className=\"size-3.5 text-[#0066AE]\"
                            weight=\"fill\"
                        />
                        {p.meta}
                    </p>
                ) : null}
                {p.price ? (
                    <p className=\"mt-3 text-[13px] font-extrabold text-[#0066AE]\">
                        {p.price}{' '}
                        {p.meta ? (
                            <span className=\"font-bold text-[#7C7C7C]\">
                                {p.meta}
                            </span>
                        ) : null}
                    </p>
                ) : null}
            </div>
        </article>
    );

    return p.href ? (
        <a href={p.href} className=\"block\">
            {card}
        </a>
    ) : (
        card
    );
}'''
pcard_new = '''function ProductCard({
    p,
    centered = false,
}: {
    p: Product;
    centered?: boolean;
}) {
    const card = (
        <article className=\"group relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#F1F5F8] shadow-[0_12px_24px_rgba(15,23,42,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(15,23,42,0.12)]\">
            {p.image ? (
                <img
                    src={p.image}
                    alt={p.title}
                    className=\"absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110\"
                />
            ) : (
                <ImagePlaceholder label={p.title} />
            )}
            <div className=\"absolute inset-0 bg-gradient-to-t from-[#093967]/95 via-[#093967]/40 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100\" />
            
            <div className=\"absolute inset-0 flex flex-col justify-end p-5 text-white\">
                {p.badge ? (
                    <span
                        className={cx(
                            'mb-3 inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-extrabold tracking-wide uppercase shadow-lg backdrop-blur-md border border-white/20',
                            p.tone || 'bg-white/20',
                        )}
                    >
                        {p.badge}
                    </span>
                ) : null}
                <h3 className=\"text-[16px] leading-tight font-extrabold drop-shadow-md\">
                    {p.title}
                </h3>
                {p.desc ? (
                    <div className=\"grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100\">
                        <p className=\"mt-2 line-clamp-3 text-[12px] leading-relaxed font-medium text-white/80 overflow-hidden\">
                            {p.desc}
                        </p>
                    </div>
                ) : null}
                {p.meta && !p.price ? (
                    <p className=\"mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-white/90\">
                        <MapPin
                            className=\"size-4 text-[#f8a42c]\"
                            weight=\"fill\"
                        />
                        {p.meta}
                    </p>
                ) : null}
                {p.price ? (
                    <p className=\"mt-3 text-[14px] font-extrabold text-[#f8a42c]\">
                        {p.price}{' '}
                        {p.meta ? (
                            <span className=\"font-bold text-white/70\">
                                {p.meta}
                            </span>
                        ) : null}
                    </p>
                ) : null}
            </div>
        </article>
    );

    return p.href ? (
        <a href={p.href} className=\"block\">
            {card}
        </a>
    ) : (
        card
    );
}'''
content = content.replace(pcard_old, pcard_new)


# 7. ShowcaseProductCard
scard_old = '''function ShowcaseProductCard({
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
        <article className=\"group overflow-hidden rounded-[20px] border border-[#EFEFEF] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)]\">
            <div className=\"relative aspect-[16/9] overflow-hidden bg-[#F1F5F8]\">
                {p.image ? (
                    <img
                        src={p.image}
                        alt={p.title}
                        className=\"h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]\"
                    />
                ) : (
                    <ImagePlaceholder label={p.title} />
                )}
                <div className=\"absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent\" />
                {p.badge ? (
                    <span
                        className=\"absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]\"
                        style={{ backgroundColor: accent }}
                    >
                        <Icon className=\"size-3.5\" weight=\"fill\" />
                        {p.badge}
                    </span>
                ) : null}
            </div>
            <div className=\"space-y-2.5 p-4\">
                <div>
                    <h3 className=\"text-[13px] leading-tight font-extrabold text-[#303030]\">
                        {p.title}
                    </h3>
                    {p.desc ? (
                        <p className=\"mt-1 line-clamp-2 text-[11px] leading-[1.65] font-semibold text-[#506169]\">
                            {p.desc}
                        </p>
                    ) : null}
                </div>
                <div
                    className=\"rounded-[14px] p-3\"
                    style={{ backgroundColor: soft }}
                >
                    <div className=\"grid grid-cols-2 gap-2\">
                        <div>
                            <p className=\"truncate whitespace-nowrap text-[9px] font-extrabold tracking-[0.06em] text-[#7C7C7C] uppercase\">
                                {isUmkm ? 'Omset Tahunan' : 'Harga Tiket'}
                            </p>
                            <p
                                className=\"mt-0.5 truncate whitespace-nowrap text-[11px] leading-tight font-extrabold\"
                                style={{ color: accent }}
                            >
                                {p.price || 'Tidak ada data'}
                            </p>
                        </div>
                        <div>
                            <p className=\"truncate whitespace-nowrap text-[9px] font-extrabold tracking-[0.06em] text-[#7C7C7C] uppercase\">
                                {isUmkm ? 'Kategori' : 'Jam Operasional'}
                            </p>
                            <p className=\"mt-0.5 inline-flex max-w-full items-center gap-1 overflow-hidden text-[10px] leading-tight font-extrabold text-[#303030]\">
                                {isUmkm ? (
                                    <ShoppingBagOpen
                                        className=\"size-4\"
                                        weight=\"fill\"
                                        style={{ color: accent }}
                                    />
                                ) : (
                                    <Clock
                                        className=\"size-4\"
                                        weight=\"fill\"
                                        style={{ color: accent }}
                                    />
                                )}
                                <span className=\"truncate\">{isUmkm ? p.desc || p.badge || 'Tidak ada data' : p.meta || 'Tidak ada data'}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className=\"flex items-center justify-between gap-2 border-t border-[#EFEFEF] pt-2.5\">
                    <p className=\"inline-flex min-w-0 items-center gap-1.5 truncate text-[11px] font-extrabold text-[#506169]\">
                        {isUmkm ? (
                            <Storefront className=\"size-3.5 shrink-0\" weight=\"fill\" />
                        ) : (
                            <MapPin className=\"size-3.5 shrink-0\" weight=\"fill\" />
                        )}
                        <span className=\"truncate\">{isUmkm ? p.desc || 'Tidak ada data' : p.desc || 'Tidak ada data'}</span>
                    </p>
                    <span
                        className=\"grid size-7 shrink-0 place-items-center rounded-full text-white\"
                        style={{ backgroundColor: accent }}
                    >
                        <Star className=\"size-3\" weight=\"fill\" />
                    </span>
                </div>
            </div>
        </article>
    );
}'''

scard_new = '''function ShowcaseProductCard({
    p,
    variant,
}: {
    p: Product;
    variant: 'pariwisata' | 'umkm';
}) {
    const isUmkm = variant === 'umkm';
    const accent = isUmkm ? '#f8a42c' : '#0066AE';
    const Icon = isUmkm ? Storefront : Leaf;

    return (
        <article className=\"group relative overflow-hidden rounded-[24px] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(15,23,42,0.08)]\">
            <div className=\"relative aspect-[4/3] overflow-hidden m-2 rounded-[20px]\">
                {p.image ? (
                    <img
                        src={p.image}
                        alt={p.title}
                        className=\"h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]\"
                    />
                ) : (
                    <ImagePlaceholder label={p.title} className=\"rounded-[20px]\" />
                )}
                <div className=\"absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100\" />
                {p.badge ? (
                    <div className=\"absolute top-3 left-3\">
                        <span
                            className=\"inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-extrabold text-white shadow-[0_8px_16px_rgba(0,0,0,0.15)] backdrop-blur-md\"
                            style={{ backgroundColor: `${accent}E6` }}
                        >
                            <Icon className=\"size-3.5\" weight=\"fill\" />
                            {p.badge}
                        </span>
                    </div>
                ) : null}
            </div>
            <div className=\"relative p-5 pt-3\">
                <h3 className=\"text-[15px] leading-tight font-extrabold text-[#093967]\">
                    {p.title}
                </h3>
                {p.desc ? (
                    <p className=\"mt-2 line-clamp-2 text-[12px] leading-relaxed font-medium text-[#506169]\">
                        {p.desc}
                    </p>
                ) : null}
                
                <div className=\"mt-4 flex items-center justify-between border-t border-[#093967]/10 pt-4\">
                    <div>
                        <p className=\"text-[9px] font-extrabold tracking-widest text-[#7C7C7C] uppercase\">
                            {isUmkm ? 'Omset' : 'Tiket'}
                        </p>
                        <p className=\"mt-1 text-[12px] font-extrabold\" style={{ color: accent }}>
                            {p.price || 'Tidak ada data'}
                        </p>
                    </div>
                    <div className=\"text-right\">
                        <p className=\"text-[9px] font-extrabold tracking-widest text-[#7C7C7C] uppercase\">
                            {isUmkm ? 'Kategori' : 'Jam Ops'}
                        </p>
                        <p className=\"mt-1 text-[11px] font-bold text-[#303030]\">
                            <span className=\"truncate max-w-[120px] inline-block\">{isUmkm ? p.desc || p.badge || 'Tidak ada data' : p.meta || 'Tidak ada data'}</span>
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}'''
content = content.replace(scard_old, scard_new)


# 8. Main layout & GSAP
main_old = '''            <main className=\"min-h-[100dvh] bg-[#F7F7F7] font-sans text-[#303030]\">
                <TopNav villages={village_options} />
                <div id=\"home\">
                    <Hero village={village} heroImage={heroImage} />
                </div>
                <div className=\"mx-auto grid max-w-[1360px] gap-8 px-8 py-8 lg:grid-cols-[minmax(0,8fr)_minmax(320px,4fr)]\">
                    <div className=\"space-y-8\">
                        <section id=\"profil\">
                            <Panel>
                            <Heading icon={User}>Profile</Heading>
                            <div className=\"grid gap-6 md:grid-cols-[340px_1fr]\">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt={`${villageName} profile`}
                                        className=\"aspect-[16/9] w-full rounded-[12px] object-cover shadow-[0_8px_24px_rgba(15,23,42,0.08)]\"
                                    />
                                ) : (
                                    <ImagePlaceholder
                                        label=\"profil desa\"
                                        className=\"aspect-[16/9] rounded-[12px] shadow-[0_8px_24px_rgba(15,23,42,0.08)]\"
                                    />
                                )}
                                <div className=\"space-y-5 text-[14px] leading-[1.65] font-semibold text-[#303030]\">
                                    {village.description ? (
                                        <>
                                            <p>{village.description}</p>
                                            {locationText !== 'Tidak ada data' ? (
                                                <p>Desa ini berlokasi di {locationText}.</p>
                                            ) : null}
                                        </>
                                    ) : (
                                        <EmptyState title=\"Tidak ada data profil\" />
                                    )}
                                </div>
                            </div>
                            </Panel>
                        </section>
                        <section id=\"pariwisata\">
                            <Heading icon={Star}>Tourist Attractions</Heading>
                            {attractionItems.length ? (
                                <div className=\"grid gap-4 sm:grid-cols-2 xl:grid-cols-3\">
                                    {attractionItems.map((p) => (
                                        <ShowcaseProductCard
                                            key={p.title}
                                            p={p}
                                            variant=\"pariwisata\"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState title=\"Tidak ada data pariwisata\" />
                            )}
                        </section>
                        <section id=\"umkm\">
                            <Heading icon={Gift}>UMKM</Heading>
                            {souvenirItems.length ? (
                                <div className=\"grid gap-4 sm:grid-cols-2 xl:grid-cols-3\">
                                    {souvenirItems.map((p) => (
                                        <ShowcaseProductCard
                                            key={p.title}
                                            p={p}
                                            variant=\"umkm\"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState title=\"Tidak ada data UMKM\" />
                            )}
                        </section>
                        <section>
                            <Heading icon={MapPin}>
                                Nearby Tourism Villages
                            </Heading>
                            {nearbyItems.length ? (
                                <div className=\"grid gap-4 sm:grid-cols-2 xl:grid-cols-4\">
                                    {nearbyItems.map((p) => (
                                        <ProductCard key={p.title} p={p} />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState title=\"Tidak ada data desa lainnya\" />
                            )}
                        </section>
                    </div>
                    <div className=\"space-y-8 lg:sticky lg:top-6 lg:self-start\">
                        <QrBlock rows={villageInfoRows} villageName={villageName} />
                        <KemenparAspectScoreCard aspects={village.kemenpar_aspect_scores} />
                        <SidebarCard title=\"Location Address\" icon={MapPin}>
                            <p className=\"text-[12px] leading-6 font-semibold text-[#303030]\">
                                {locationText}
                            </p>
                            {village.maps_url ? (
                                <a
                                    href={village.maps_url}
                                    target=\"_blank\"
                                    rel=\"noreferrer\"
                                    className=\"mt-3 inline-flex text-[12px] font-extrabold text-[#0066AE]\"
                                >
                                    Buka Google Maps
                                </a>
                            ) : null}
                            <MapPreview villageName={villageName} />
                        </SidebarCard>
                        <SidebarCard title=\"Contact Person\" icon={User}>
                            <div className=\"flex items-center gap-4\">
                                <div className=\"grid size-16 shrink-0 place-items-center rounded-full bg-[#F8FBFE] ring-1 ring-[#EFEFEF]\">
                                    <User className=\"size-10 text-[#7C7C7C]\" />
                                </div>
                                <p className=\"text-[15px] leading-5 font-extrabold text-[#303030]\">
                                    {managerName}
                                </p>
                            </div>
                            <div className=\"mt-5 space-y-3 text-[12px] font-bold text-[#303030]\">
                                <p className=\"flex items-center gap-3\">
                                    <Phone
                                        className=\"size-4.5 text-[#0066AE]\"
                                        weight=\"fill\"
                                    />
                                    {managerPhone}
                                </p>
                                <p className=\"flex items-center gap-3\">
                                    <EnvelopeSimple
                                        className=\"size-4.5 text-[#0066AE]\"
                                        weight=\"fill\"
                                    />
                                    {managerEmail}
                                </p>

                            </div>
                        </SidebarCard>
                    </div>
                </div>
                <Footer />
            </main>'''

main_new = '''            <main className=\"relative min-h-[100dvh] bg-[#F4F8FB] font-sans text-[#303030] overflow-hidden\">
                <div className=\"fixed top-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-[#0066AE]/10 blur-[120px] pointer-events-none\" />
                <div className=\"fixed bottom-[-10%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-[#f8a42c]/10 blur-[100px] pointer-events-none\" />
                
                <div className=\"relative z-10\">
                    <TopNav villages={village_options} />
                    <div id=\"home\">
                        <Hero village={village} heroImage={heroImage} />
                    </div>
                    <div className=\"mx-auto grid max-w-[1360px] gap-8 px-8 py-10 lg:grid-cols-[minmax(0,8fr)_minmax(320px,4fr)]\">
                        <div className=\"space-y-12\">
                            <section id=\"profil\" className=\"stagger-section\">
                                <Panel>
                                <Heading icon={User} className=\"stagger-item\">Profile</Heading>
                                <div className=\"grid gap-8 md:grid-cols-[360px_1fr] stagger-item\">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt={`${villageName} profile`}
                                            className=\"aspect-[4/3] w-full rounded-[20px] object-cover shadow-[0_12px_32px_rgba(15,23,42,0.08)]\"
                                        />
                                    ) : (
                                        <ImagePlaceholder
                                            label=\"profil desa\"
                                            className=\"aspect-[4/3] rounded-[20px] shadow-[0_12px_32px_rgba(15,23,42,0.08)]\"
                                        />
                                    )}
                                    <div className=\"space-y-5 text-[15px] leading-[1.8] font-medium text-[#404a54]\">
                                        {village.description ? (
                                            <>
                                                <p>{village.description}</p>
                                                {locationText !== 'Tidak ada data' ? (
                                                    <p>Desa ini berlokasi di {locationText}.</p>
                                                ) : null}
                                            </>
                                        ) : (
                                            <EmptyState title=\"Tidak ada data profil\" />
                                        )}
                                    </div>
                                </div>
                                </Panel>
                            </section>
                            <section id=\"pariwisata\" className=\"stagger-section\">
                                <Heading icon={Star} className=\"stagger-item\">Tourist Attractions</Heading>
                                {attractionItems.length ? (
                                    <div className=\"grid gap-6 sm:grid-cols-2 xl:grid-cols-3\">
                                        {attractionItems.map((p) => (
                                            <div key={p.title} className=\"stagger-item\">
                                                <ShowcaseProductCard p={p} variant=\"pariwisata\" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState title=\"Tidak ada data pariwisata\" />
                                )}
                            </section>
                            <section id=\"umkm\" className=\"stagger-section\">
                                <Heading icon={Gift} className=\"stagger-item\">UMKM</Heading>
                                {souvenirItems.length ? (
                                    <div className=\"grid gap-6 sm:grid-cols-2 xl:grid-cols-3\">
                                        {souvenirItems.map((p) => (
                                            <div key={p.title} className=\"stagger-item\">
                                                <ShowcaseProductCard p={p} variant=\"umkm\" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState title=\"Tidak ada data UMKM\" />
                                )}
                            </section>
                            <section className=\"stagger-section\">
                                <Heading icon={MapPin} className=\"stagger-item\">
                                    Nearby Tourism Villages
                                </Heading>
                                {nearbyItems.length ? (
                                    <div className=\"grid gap-5 sm:grid-cols-2 xl:grid-cols-4\">
                                        {nearbyItems.map((p) => (
                                            <div key={p.title} className=\"stagger-item\">
                                                <ProductCard p={p} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState title=\"Tidak ada data desa lainnya\" />
                                )}
                            </section>
                        </div>
                        <div className=\"space-y-8 lg:sticky lg:top-6 lg:self-start stagger-section\">
                            <div className=\"stagger-item\">
                                <QrBlock rows={villageInfoRows} villageName={villageName} />
                            </div>
                            <div className=\"stagger-item\">
                                <KemenparAspectScoreCard aspects={village.kemenpar_aspect_scores} />
                            </div>
                            <div className=\"stagger-item\">
                                <SidebarCard title=\"Location Address\" icon={MapPin}>
                                    <p className=\"text-[13px] leading-6 font-semibold text-[#506169]\">
                                        {locationText}
                                    </p>
                                    {village.maps_url ? (
                                        <a
                                            href={village.maps_url}
                                            target=\"_blank\"
                                            rel=\"noreferrer\"
                                            className=\"mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#EAF3FF] px-4 py-2 text-[12px] font-extrabold text-[#0066AE] transition-colors hover:bg-[#0066AE] hover:text-white\"
                                        >
                                            Buka Google Maps
                                        </a>
                                    ) : null}
                                    <MapPreview villageName={villageName} />
                                </SidebarCard>
                            </div>
                            <div className=\"stagger-item\">
                                <SidebarCard title=\"Contact Person\" icon={User}>
                                    <div className=\"flex items-center gap-4\">
                                        <div className=\"grid size-16 shrink-0 place-items-center rounded-full bg-[#EAF3FF] ring-2 ring-white shadow-inner\">
                                            <User className=\"size-8 text-[#0066AE]\" />
                                        </div>
                                        <p className=\"text-[16px] leading-5 font-extrabold text-[#303030]\">
                                            {managerName}
                                        </p>
                                    </div>
                                    <div className=\"mt-6 space-y-4 text-[13px] font-bold text-[#506169]\">
                                        <p className=\"flex items-center gap-3\">
                                            <Phone
                                                className=\"size-5 text-[#f8a42c]\"
                                                weight=\"fill\"
                                            />
                                            {managerPhone}
                                        </p>
                                        <p className=\"flex items-center gap-3\">
                                            <EnvelopeSimple
                                                className=\"size-5 text-[#f8a42c]\"
                                                weight=\"fill\"
                                            />
                                            {managerEmail}
                                        </p>
                                    </div>
                                </SidebarCard>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </main>'''

content = content.replace(main_old, main_new)

# 9. Add useGSAP hook inside VillageDetail component
village_detail_old = '''export default function VillageDetail({
    village,
    village_options,
    nearby_villages,
}: VillageShowProps) {
    const villageName = textOrFallback(village.name, 'Tidak ada data');'''

village_detail_new = '''export default function VillageDetail({
    village,
    village_options,
    nearby_villages,
}: VillageShowProps) {
    const mainRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray('.stagger-section');
        sections.forEach((section: any) => {
            const elements = section.querySelectorAll('.stagger-item');
            if (elements.length) {
                gsap.fromTo(elements, 
                    { y: 50, opacity: 0 }, 
                    {
                        y: 0, 
                        opacity: 1, 
                        duration: 0.8, 
                        stagger: 0.1, 
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                        }
                    }
                );
            }
        });
    }, { scope: mainRef });

    const villageName = textOrFallback(village.name, 'Tidak ada data');'''
content = content.replace(village_detail_old, village_detail_new)

# 10. we need to wrap the whole VillageDetail return content in <div ref={mainRef}> to give GSAP a scope.
content = content.replace('<main className=\"relative min-h-[100dvh]', '<main ref={mainRef} className=\"relative min-h-[100dvh]')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
