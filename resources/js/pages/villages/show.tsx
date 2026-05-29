import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    Bath,
    Bike,
    Building2,
    Camera,
    Check,
    ChevronDown,
    CircleCheck,
    Clock3,
    Facebook,
    Gift,
    Globe2,
    Home,
    House,
    Instagram,
    Leaf,
    Mail,
    Map,
    MapPin,
    MessageCircle,
    Navigation,
    ParkingCircle,
    Phone,
    Search,
    ShieldCheck,
    ShoppingBag,
    Star,
    Ticket,
    Utensils,
    Wifi,
    Youtube,
} from 'lucide-react';

const villageImages = {
    hero: 'https://picsum.photos/seed/penglipuran-bali-village-hero/1800/980',
    temple: 'https://picsum.photos/seed/penglipuran-temple-gate/680/920',
    valley: 'https://picsum.photos/seed/bali-green-valley/520/340',
    home: 'https://picsum.photos/seed/bali-traditional-house/520/340',
    dance: 'https://picsum.photos/seed/bali-cultural-dance/520/340',
    waterfall: 'https://picsum.photos/seed/bali-hidden-waterfall/520/340',
    bamboo: 'https://picsum.photos/seed/bali-bamboo-craft/520/340',
    coffee: 'https://picsum.photos/seed/bali-coffee-products/520/340',
    textile: 'https://picsum.photos/seed/bali-traditional-fabric/520/340',
    snack: 'https://picsum.photos/seed/bali-local-food/520/340',
    carving: 'https://picsum.photos/seed/bali-wood-carving/520/340',
    nglanggeran:
        'https://picsum.photos/seed/nglanggeran-mountain-village/820/280',
    sade: 'https://picsum.photos/seed/sade-traditional-village/820/280',
    wae: 'https://picsum.photos/seed/wae-rebo-village/820/280',
};

const stats = [
    {
        icon: Star,
        value: '4.8/5',
        label: 'Rating Pengunjung',
        sub: '(1.236 ulasan)',
    },
    { icon: Camera, value: '12+', label: 'Total Atraksi', sub: 'Menarik' },
    { icon: Home, value: '25+', label: 'Total Homestay', sub: 'Tersedia' },
    {
        icon: UsersIcon,
        value: '10K+',
        label: 'Pengunjung/Tahun',
        sub: '(Rata-rata)',
    },
];

const quickFacts = [
    { icon: MapPin, title: 'Lokasi', value: 'Bangli, Bali' },
    { icon: Leaf, title: 'Kategori', value: 'Budaya & Alam' },
    { icon: Clock3, title: 'Jam Kunjungan', value: '08.00 - 17.00 WITA' },
    { icon: Clock3, title: 'Estimasi Durasi', value: '3 - 5 jam' },
    { icon: Ticket, title: 'Harga Mulai', value: 'Rp75.000' },
    { icon: CircleCheck, title: 'Status Desa', value: 'Aktif', success: true },
];

const tabs = [
    'Overview',
    'Fasilitas',
    'Atraksi',
    'Homestay',
    'Paket Wisata',
    'Souvenir',
    'Statistik',
    'Lokasi & Kontak',
];

const facilities = [
    { icon: ParkingCircle, label: 'Area Parkir' },
    { icon: Bath, label: 'Toilet' },
    { icon: Building2, label: 'Mushola' },
    { icon: Search, label: 'Pusat Informasi' },
    { icon: Utensils, label: 'Restoran/Kuliner' },
    { icon: Wifi, label: 'Wi-Fi' },
    { icon: ArmchairIcon, label: 'Area Istirahat' },
    { icon: Camera, label: 'Spot Foto' },
];

const attractions = [
    {
        title: 'Lorong Rumah Tradisional',
        desc: 'Menjelajahi lorong-lorong desa dengan rumah adat seragam yang unik dan rapi.',
        image: villageImages.home,
        rating: '4.8',
        reviews: '786 ulasan',
    },
    {
        title: 'Pertunjukan Budaya',
        desc: 'Saksikan tarian dan upacara adat Bali yang memukau dan penuh makna.',
        image: villageImages.dance,
        rating: '4.7',
        reviews: '524 ulasan',
    },
    {
        title: 'Jalur Jalan Kaki & Lanskap Hijau',
        desc: 'Nikmati suasana tenang dengan lanskap hijau dan udara yang segar.',
        image: villageImages.waterfall,
        rating: '4.6',
        reviews: '412 ulasan',
    },
];

const homestays = [
    {
        name: 'Homestay Penglipuran 1',
        image: villageImages.home,
        rating: '4.9',
        price: 'Rp250.000',
    },
    {
        name: 'Homestay Lestari',
        image: villageImages.temple,
        rating: '4.8',
        price: 'Rp275.000',
    },
    {
        name: 'Rumah Tamu Adat',
        image: villageImages.hero,
        rating: '4.7',
        price: 'Rp300.000',
    },
];

const souvenirs = [
    { name: 'Kerajinan Bambu', image: villageImages.bamboo, price: 'Rp45.000' },
    {
        name: 'Kopi Kintamani Premium',
        image: villageImages.coffee,
        price: 'Rp85.000',
    },
    {
        name: 'Kain Tradisional Bali',
        image: villageImages.textile,
        price: 'Rp120.000',
    },
    {
        name: 'Camilan Khas Penglipuran',
        image: villageImages.snack,
        price: 'Rp35.000',
    },
    {
        name: 'Ukiran Kayu Bali',
        image: villageImages.carving,
        price: 'Rp150.000',
    },
];

const packages = [
    {
        name: 'Paket Penglipuran Heritage Walk',
        duration: '3 Jam',
        price: 'Rp150.000',
        items: ['Guide Lokal', 'Tiket Masuk', 'Air Mineral', 'Snack Lokal'],
    },
    {
        name: 'Paket Budaya & Kerajinan',
        duration: '5 Jam',
        price: 'Rp250.000',
        items: [
            'Workshop Kerajinan',
            'Pertunjukan Budaya',
            'Makan Siang',
            'Guide Lokal',
        ],
    },
    {
        name: 'Paket Full Day Penglipuran',
        duration: '8 Hari',
        price: 'Rp350.000',
        items: [
            'Semua Tiket Masuk',
            'Makan Siang',
            'Workshop',
            'Transport Lokal',
        ],
    },
];

const relatedVillages = [
    {
        name: 'Desa Wisata Nglanggeran',
        location: 'Gunungkidul, Yogyakarta',
        image: villageImages.nglanggeran,
        rating: '4.7',
    },
    {
        name: 'Desa Wisata Sade',
        location: 'Lombok, Nusa Tenggara Barat',
        image: villageImages.sade,
        rating: '4.6',
    },
    {
        name: 'Desa Wisata Wae Rebo',
        location: 'Manggarai, Nusa Tenggara Timur',
        image: villageImages.wae,
        rating: '4.8',
    },
];

function UsersIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.9"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20a4 4 0 0 0-8 0"
            />
            <circle cx="13" cy="7" r="4" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.5 18.5a3.5 3.5 0 0 1 4.2-3.4M7 10.5a3 3 0 1 1 2.4-4.8"
            />
        </svg>
    );
}

function ArmchairIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.9"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 11V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 11h14a2 2 0 0 1 2 2v4H3v-4a2 2 0 0 1 2-2Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 17v3M19 17v3"
            />
        </svg>
    );
}

function LogoMark() {
    return (
        <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#EAF3FF] text-[#0066AE]">
                <svg className="size-7" fill="none" viewBox="0 0 40 40">
                    <path
                        d="M20 5 7 15l4 3 9-7 9 7 4-3L20 5Z"
                        fill="currentColor"
                    />
                    <path
                        d="m20 15-13 10 4 3 9-7 9 7 4-3-13-10Z"
                        fill="currentColor"
                        opacity=".82"
                    />
                    <path
                        d="m20 25-10 8h20l-10-8Z"
                        fill="currentColor"
                        opacity=".68"
                    />
                </svg>
            </div>
            <span className="truncate text-lg font-extrabold text-[#0066AE] sm:text-[22px]">
                Desa Wisata BCA
            </span>
        </div>
    );
}

function NavBar() {
    return (
        <header className="sticky top-0 z-30 border-b border-[#E9EEF5] bg-white/95 shadow-[0_2px_14px_rgba(3,17,32,0.06)] backdrop-blur">
            <div className="mx-auto flex h-[70px] max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-5">
                <LogoMark />
                <nav className="hidden items-center gap-10 text-[13px] font-bold text-[#071B3D] lg:flex">
                    <a href="#">Beranda</a>
                    <a className="inline-flex items-center gap-1" href="#">
                        Jelajahi Desa <ChevronDown className="size-3.5" />
                    </a>
                    <a className="inline-flex items-center gap-1" href="#">
                        Program CSR <ChevronDown className="size-3.5" />
                    </a>
                    <a href="#">Tentang</a>
                    <a href="#">Kontak</a>
                </nav>
                <div className="flex items-center gap-3">
                    <a
                        className="hidden px-4 text-sm font-extrabold text-[#0066AE] sm:inline-flex"
                        href="#"
                    >
                        Masuk
                    </a>
                    <a
                        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[#0066D9] px-4 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(0,102,217,0.18)] transition hover:bg-[#093967] sm:h-11 sm:px-6"
                        href="#"
                    >
                        <span className="hidden sm:inline">Jelajahi Desa</span>
                        <ArrowRight className="size-4" />
                    </a>
                </div>
            </div>
        </header>
    );
}

function Hero() {
    return (
        <section className="relative overflow-hidden">
            <img
                className="absolute inset-0 size-full object-cover"
                src={villageImages.hero}
                alt="Desa Wisata Penglipuran"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,17,32,0.20),rgba(3,17,32,0.02)_42%,rgba(3,17,32,0.24))]" />

            <div className="relative mx-auto grid max-w-[1320px] gap-8 px-4 py-8 sm:px-5 sm:py-10 lg:min-h-[500px] lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
                <div className="max-w-[520px] rounded-2xl bg-white/95 p-5 shadow-[0_16px_40px_rgba(3,17,32,0.14)] ring-1 ring-white/80 backdrop-blur sm:p-7">
                    <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#406080]">
                        <MapPin className="size-5 text-[#0066D9]" />
                        Bangli, Bali
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex h-8 items-center gap-2 rounded-lg bg-[#0066D9] px-3 text-xs font-extrabold text-white sm:text-sm">
                            <ShieldCheck className="size-4" /> Desa Wisata
                            Unggulan
                        </span>
                        <span className="inline-flex h-8 items-center gap-2 rounded-lg bg-[#0C8C34] px-3 text-xs font-extrabold text-white sm:text-sm">
                            <Leaf className="size-4" /> Binaan CSR
                        </span>
                    </div>
                    <h1 className="mt-5 text-[34px] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#071B3D] sm:text-[44px] lg:text-[52px]">
                        Desa Wisata Penglipuran
                    </h1>
                    <p className="mt-4 max-w-[52ch] text-sm leading-6 font-medium text-[#3C4A5E] sm:text-[16px] sm:leading-7">
                        Desa adat yang terjaga keasliannya selama ratusan tahun.
                        Terkenal dengan kebersihan, arsitektur tradisional, dan
                        budaya yang lestari serta komitmen pada pariwisata
                        berkelanjutan.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <a
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066D9] px-5 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(0,102,217,0.18)]"
                            href="#"
                        >
                            Lihat Paket Wisata <ArrowRight className="size-4" />
                        </a>
                        <a
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#B8D4F7] bg-white px-5 text-sm font-extrabold text-[#0066D9]"
                            href="#"
                        >
                            <MessageCircle className="size-4" /> Hubungi
                            Pengelola
                        </a>
                    </div>
                </div>

                <div className="hidden min-w-0 grid-cols-[1.1fr_.9fr] gap-4 lg:grid">
                    <div className="relative h-[320px] overflow-hidden rounded-[18px] border-[6px] border-white shadow-[0_16px_40px_rgba(3,17,32,0.20)]">
                        <img
                            className="size-full object-cover"
                            src={villageImages.temple}
                            alt="Gerbang tradisional Penglipuran"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#031120]/60 via-transparent" />
                        <p className="absolute bottom-8 left-6 max-w-[180px] text-2xl leading-7 font-extrabold text-white">
                            Desa Wisata Penglipuran
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <img
                            className="h-[152px] w-full rounded-[18px] border-[6px] border-white object-cover shadow-[0_16px_40px_rgba(3,17,32,0.18)]"
                            src={villageImages.valley}
                            alt="Lanskap hijau Bali"
                        />
                        <img
                            className="h-[152px] w-full rounded-[18px] border-[6px] border-white object-cover shadow-[0_16px_40px_rgba(3,17,32,0.18)]"
                            src={villageImages.home}
                            alt="Rumah adat Bali"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatsBar() {
    return (
        <section className="relative z-20 mx-4 mt-4 max-w-[900px] rounded-xl border border-[#E3EAF3] bg-white shadow-[0_8px_24px_rgba(3,17,32,0.10)] sm:mx-5 lg:mx-auto lg:-mt-10">
            <div className="grid grid-cols-2 divide-x-0 divide-y divide-[#E3EAF3] md:grid-cols-4 md:divide-x md:divide-y-0">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="flex min-w-0 items-center gap-3 px-4 py-4 sm:px-5"
                        >
                            <Icon className="size-7 shrink-0 text-[#0066D9]" />
                            <div className="min-w-0">
                                <p className="text-[20px] leading-6 font-extrabold text-[#071B3D]">
                                    {item.value}
                                </p>
                                <p className="mt-1 text-[11px] font-bold text-[#374B63]">
                                    {item.label}
                                </p>
                                <p className="text-[11px] font-medium text-[#66788F]">
                                    {item.sub}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function QuickFacts() {
    return (
        <section className="mx-auto mt-5 grid max-w-[1320px] grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-3 xl:grid-cols-6">
            {quickFacts.map((fact) => {
                const Icon = fact.icon;

                return (
                    <article
                        key={fact.title}
                        className="flex min-h-[70px] min-w-0 items-center gap-3 rounded-lg border border-[#E3EAF3] bg-white px-4 shadow-[0_4px_12px_rgba(3,17,32,0.05)]"
                    >
                        <Icon
                            className={`size-7 shrink-0 ${fact.success ? 'text-[#0C8C34]' : 'text-[#0066D9]'}`}
                        />
                        <div className="min-w-0">
                            <p className="text-[11px] font-bold text-[#7A8BA0]">
                                {fact.title}
                            </p>
                            <p
                                className={`truncate text-sm font-extrabold ${fact.success ? 'text-[#0C8C34]' : 'text-[#071B3D]'}`}
                            >
                                {fact.value}
                            </p>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}

function Tabs() {
    return (
        <div className="mx-auto mt-5 max-w-[1320px] px-4 sm:px-5">
            <div className="flex overflow-x-auto rounded-lg border border-[#E3EAF3] bg-white shadow-[0_4px_12px_rgba(3,17,32,0.05)]">
                {tabs.map((tab, index) => (
                    <a
                        key={tab}
                        className={`relative flex h-12 min-w-max flex-1 items-center justify-center px-4 text-sm font-extrabold ${index === 0 ? 'text-[#0066D9]' : 'text-[#34465C]'}`}
                        href="#"
                    >
                        {tab}
                        {index === 0 && (
                            <span className="absolute bottom-0 h-[3px] w-[72%] rounded-t-full bg-[#0066D9]" />
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}

function Card({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`min-w-0 rounded-xl border border-[#E3EAF3] bg-white shadow-[0_4px_12px_rgba(3,17,32,0.05)] ${className}`}
        >
            {children}
        </section>
    );
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
    return (
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-extrabold text-[#071B3D]">{title}</h2>
            {action && (
                <a
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0066D9]"
                    href="#"
                >
                    {action} <ArrowRight className="size-3.5" />
                </a>
            )}
        </div>
    );
}

function InfoGrid() {
    const panels = [
        {
            icon: Gift,
            title: 'Keunikan Desa',
            items: [
                'Tata ruang tradisional unik & tertata',
                'Rumah adat seragam & harmonis',
                'Kebersihan & lingkungan terjaga',
                'Tradisi & budaya yang lestari',
            ],
        },
        {
            icon: Bike,
            title: 'Aktivitas Favorit',
            items: [
                'Menyusuri lorong desa adat',
                'Belajar budaya & upacara adat',
                'Workshop kerajinan tradisional',
                'Fotografi & berinteraksi warga',
            ],
        },
        {
            icon: CalendarIcon,
            title: 'Waktu Terbaik Berkunjung',
            items: [
                'April - Oktober (musim kemarau)',
                'Pagi hari: 08.00 - 10.00 WITA',
                'Sore hari: 15.00 - 17.00 WITA',
                'Hindari hari raya keagamaan',
            ],
        },
    ];

    return (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-[1.35fr_1fr_1fr_1fr]">
            <Card className="p-6">
                <h2 className="text-xl font-extrabold text-[#071B3D]">
                    Profil Desa
                </h2>
                <div className="mt-4 space-y-5 text-[14px] leading-7 font-medium text-[#314158]">
                    <p>
                        Penglipuran adalah desa adat di Bali yang dikenal
                        sebagai salah satu desa terbersih di dunia. Tata ruang
                        desa yang rapi, arsitektur rumah tradisional yang
                        seragam, serta tradisi dan budaya yang masih terjaga
                        membuat Penglipuran menjadi destinasi wisata budaya yang
                        istimewa.
                    </p>
                    <p>
                        Homestay yang dikelola masyarakat, kerajinan tangan,
                        serta lingkungan alami yang asri menjadikan Penglipuran
                        pilihan tepat untuk wisata yang bermakna dan
                        berkelanjutan.
                    </p>
                </div>
            </Card>
            {panels.map((panel) => {
                const Icon = panel.icon;

                return (
                    <Card key={panel.title} className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="grid size-10 place-items-center rounded-full bg-[#EAF3FF] text-[#0066D9]">
                                <Icon className="size-6" />
                            </span>
                            <h3 className="font-extrabold text-[#071B3D]">
                                {panel.title}
                            </h3>
                        </div>
                        <ul className="space-y-3 text-[13px] leading-5 font-medium text-[#314158]">
                            {panel.items.map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span className="mt-2 size-1 rounded-full bg-[#0066D9]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Card>
                );
            })}
        </div>
    );
}

function CalendarIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.9"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 3v4M17 3v4M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 13h3v3H8zM14 13h2"
            />
        </svg>
    );
}

function Facilities() {
    return (
        <Card className="p-5">
            <SectionTitle title="Fasilitas" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8">
                {facilities.map((facility) => {
                    const Icon = facility.icon;

                    return (
                        <div
                            key={facility.label}
                            className="grid min-h-[92px] place-items-center gap-2 rounded-xl border border-[#E3EAF3] bg-white p-3 text-center"
                        >
                            <Icon className="size-8 text-[#0066D9]" />
                            <p className="text-[11px] leading-4 font-extrabold text-[#071B3D]">
                                {facility.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

function AttractionCards() {
    return (
        <Card className="p-5">
            <SectionTitle
                title="Atraksi Unggulan"
                action="Lihat Semua Atraksi"
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {attractions.map((item) => (
                    <article
                        key={item.title}
                        className="overflow-hidden rounded-xl border border-[#E3EAF3] bg-white"
                    >
                        <img
                            className="h-32 w-full object-cover"
                            src={item.image}
                            alt={item.title}
                        />
                        <div className="p-4">
                            <h3 className="leading-5 font-extrabold text-[#071B3D]">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-xs leading-5 font-medium text-[#53657B]">
                                {item.desc}
                            </p>
                            <p className="mt-3 flex items-center gap-1 text-xs font-bold text-[#53657B]">
                                <Star className="size-4 fill-[#F7B500] text-[#F7B500]" />{' '}
                                {item.rating} <span>({item.reviews})</span>
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </Card>
    );
}

function HomestayCards() {
    return (
        <Card className="p-5">
            <SectionTitle
                title="Homestay Populer"
                action="Lihat Semua Homestay"
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {homestays.map((item) => (
                    <article
                        key={item.name}
                        className="overflow-hidden rounded-xl border border-[#E3EAF3] bg-white"
                    >
                        <img
                            className="h-32 w-full object-cover"
                            src={item.image}
                            alt={item.name}
                        />
                        <div className="p-4">
                            <h3 className="leading-5 font-extrabold text-[#071B3D]">
                                {item.name}
                            </h3>
                            <p className="mt-2 flex items-center gap-1 text-xs font-bold text-[#53657B]">
                                <Star className="size-4 fill-[#F7B500] text-[#F7B500]" />{' '}
                                {item.rating} (216)
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-[#53657B]">
                                <span>AC</span>
                                <span>Wi-Fi</span>
                                <span>Sarapan</span>
                            </div>
                            <p className="mt-4 text-lg font-extrabold text-[#071B3D]">
                                {item.price}
                                <span className="text-xs font-semibold text-[#53657B]">
                                    {' '}
                                    /malam
                                </span>
                            </p>
                            <button className="mt-4 h-10 w-full rounded-lg border-2 border-[#B8D4F7] text-sm font-extrabold text-[#0066D9]">
                                Lihat Detail
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </Card>
    );
}

function Packages() {
    return (
        <Card className="p-5">
            <SectionTitle
                title="Paket Wisata Pilihan"
                action="Lihat Semua Paket"
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {packages.map((item) => (
                    <article
                        key={item.name}
                        className="rounded-xl border border-[#E3EAF3] p-5"
                    >
                        <h3 className="leading-5 font-extrabold text-[#071B3D]">
                            {item.name}
                        </h3>
                        <p className="mt-1 text-sm font-extrabold text-[#0066D9]">
                            {item.duration}
                        </p>
                        <ul className="mt-4 space-y-2">
                            {item.items.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-2 text-xs font-semibold text-[#314158]"
                                >
                                    <Check className="size-4 text-[#0C8C34]" />{' '}
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 text-lg font-extrabold text-[#071B3D]">
                            {item.price}
                            <span className="text-xs font-semibold">
                                {' '}
                                /orang
                            </span>
                        </p>
                        <button className="mt-4 h-10 w-full rounded-lg bg-[#0066D9] text-sm font-extrabold text-white">
                            Detail Paket
                        </button>
                    </article>
                ))}
            </div>
        </Card>
    );
}

function Souvenirs() {
    return (
        <Card className="p-5">
            <SectionTitle
                title="Souvenir Khas Penglipuran"
                action="Lihat Semua Souvenir"
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {souvenirs.map((item) => (
                    <article
                        key={item.name}
                        className="overflow-hidden rounded-xl border border-[#E3EAF3] bg-white"
                    >
                        <img
                            className="h-32 w-full object-cover"
                            src={item.image}
                            alt={item.name}
                        />
                        <div className="p-4">
                            <h3 className="text-sm leading-5 font-extrabold text-[#071B3D]">
                                {item.name}
                            </h3>
                            <p className="mt-3 text-lg font-extrabold text-[#071B3D]">
                                {item.price}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </Card>
    );
}

function Statistics() {
    const topStats = [
        { icon: Camera, value: '12+', label: 'Total Atraksi' },
        { icon: Home, value: '25+', label: 'Total Homestay' },
        { icon: House, value: '8+', label: 'Paket Wisata' },
        { icon: Globe2, value: '40+', label: 'UMKM Aktif' },
        { icon: Star, value: '4.8/5', label: 'Rating Pengunjung' },
    ];
    const details = [
        [
            'Desa Adat',
            'Desa adat Bali yang masih menjaga tradisi turun-temurun.',
        ],
        ['Tahun Berdiri', 'Abad ke-9'],
        ['Luas Wilayah', '112 hektar'],
        ['Mata Pencaharian', 'Pariwisata, Kerajinan, Pertanian'],
        ['Jumlah Penduduk', '1.250 jiwa'],
        ['Komitmen', 'Pariwisata Berkelanjutan & Bersih'],
        ['Bahasa', 'Bahasa Indonesia, Bahasa Bali'],
    ];

    return (
        <Card className="p-5">
            <SectionTitle title="Statistik & Informasi Desa" />
            <div className="grid gap-4 rounded-xl border border-[#E3EAF3] p-5 sm:grid-cols-2 lg:grid-cols-5">
                {topStats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div key={item.label} className="text-center">
                            <Icon className="mx-auto size-8 text-[#0066D9]" />
                            <p className="mt-2 text-xl font-extrabold text-[#071B3D]">
                                {item.value}
                            </p>
                            <p className="text-[11px] font-bold text-[#53657B]">
                                {item.label}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className="mt-5 grid gap-4 text-sm md:grid-cols-2">
                {details.map(([label, value]) => (
                    <div key={label} className="flex items-start gap-3">
                        <span className="mt-1 grid size-7 place-items-center rounded-full bg-[#EAF3FF] text-[#0066D9]">
                            <Check className="size-4" />
                        </span>
                        <div>
                            <p className="font-extrabold text-[#071B3D]">
                                {label}
                            </p>
                            <p className="text-xs font-medium text-[#53657B]">
                                {value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function Contact() {
    return (
        <Card className="p-5">
            <SectionTitle title="Lokasi & Kontak" />
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)]">
                <div className="relative min-h-[280px] overflow-hidden rounded-xl bg-[#EAF3E8]">
                    <div className="absolute inset-0 [background-image:linear-gradient(#C6D9C9_1px,transparent_1px),linear-gradient(90deg,#C6D9C9_1px,transparent_1px)] [background-size:36px_36px] opacity-80" />
                    <div className="absolute top-[18%] left-[18%] h-3 w-[50%] rotate-[-12deg] rounded-full bg-[#F2D49B]" />
                    <div className="absolute top-[36%] left-[36%] h-3 w-[46%] rotate-[28deg] rounded-full bg-[#F2D49B]" />
                    <div className="absolute top-[60%] left-[22%] h-3 w-[60%] rotate-[-6deg] rounded-full bg-[#F2D49B]" />
                    <div className="absolute top-[43%] left-1/2 -translate-x-1/2 text-center">
                        <MapPin className="mx-auto size-12 fill-[#E13535] text-[#E13535]" />
                        <p className="mt-1 text-lg leading-5 font-extrabold text-[#071B3D]">
                            Desa Wisata
                            <br />
                            Penglipuran
                        </p>
                    </div>
                    <button className="absolute bottom-6 left-1/2 inline-flex h-11 -translate-x-1/2 items-center gap-3 rounded-lg bg-[#0066D9] px-8 text-sm font-extrabold whitespace-nowrap text-white">
                        Lihat Rute <Navigation className="size-4" />
                    </button>
                </div>
                <div className="min-w-0 rounded-xl border border-[#E3EAF3] p-5 sm:p-6">
                    <h3 className="text-lg font-extrabold text-[#071B3D]">
                        Kontak Pengelola
                    </h3>
                    <div className="mt-5 space-y-4 text-sm font-semibold text-[#314158]">
                        <p className="flex min-w-0 gap-3">
                            <Phone className="size-5 text-[#0066D9]" /> +62
                            812-3456-7890
                        </p>
                        <p className="flex min-w-0 gap-3 break-all">
                            <Mail className="size-5 text-[#0066D9]" />{' '}
                            info@penglipuran.desa.id
                        </p>
                        <p className="flex min-w-0 gap-3">
                            <MapPin className="size-5 text-[#0066D9]" /> Desa
                            Penglipuran, Kec. Bangli, Kab. Bangli, Bali 80613
                        </p>
                        <p className="flex min-w-0 gap-3 break-all">
                            <Globe2 className="size-5 text-[#0066D9]" />{' '}
                            www.penglipuran.desa.id
                        </p>
                    </div>
                    <div className="mt-5 flex gap-3">
                        {[Instagram, Facebook, Youtube, MusicIcon].map(
                            (Icon, index) => (
                                <span
                                    key={index}
                                    className="grid size-8 place-items-center rounded-full bg-[#EAF3FF] text-[#0066D9]"
                                >
                                    <Icon className="size-4" />
                                </span>
                            ),
                        )}
                    </div>
                    <button className="mt-5 inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#0066D9] text-sm font-extrabold text-white">
                        <MessageCircle className="size-5" /> Hubungi Sekarang
                    </button>
                </div>
            </div>
        </Card>
    );
}

function MusicIcon({ className }: { className?: string }) {
    return <ShoppingBag className={className} />;
}

function RelatedVillages() {
    return (
        <Card className="p-5">
            <SectionTitle
                title="Jelajahi Desa Wisata Lainnya"
                action="Lihat Semua Desa"
            />
            <div className="grid gap-5 md:grid-cols-3">
                {relatedVillages.map((item) => (
                    <article
                        key={item.name}
                        className="relative min-h-[170px] overflow-hidden rounded-xl"
                    >
                        <img
                            className="size-full object-cover"
                            src={item.image}
                            alt={item.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#031120]/75 via-[#031120]/10" />
                        <div className="absolute right-4 bottom-4 left-5 text-white">
                            <h3 className="text-lg leading-6 font-extrabold">
                                {item.name}
                            </h3>
                            <p className="text-sm font-semibold">
                                {item.location}
                            </p>
                            <p className="mt-1 flex items-center gap-1 text-sm font-bold">
                                <Star className="size-4 fill-white" />{' '}
                                {item.rating}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </Card>
    );
}

function Footer() {
    return (
        <footer className="mt-8 bg-gradient-to-r from-[#093967] to-[#0066AE] text-white">
            <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-11 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="grid size-11 place-items-center rounded-xl text-white ring-1 ring-white/30">
                            <Map className="size-7" />
                        </div>
                        <h3 className="text-xl font-extrabold">
                            Desa Wisata BCA
                        </h3>
                    </div>
                    <p className="mt-5 max-w-[290px] text-sm leading-6 font-medium text-white/80">
                        Platform resmi yang mendukung pengembangan desa wisata
                        berkelanjutan di seluruh Indonesia melalui kolaborasi
                        dan pemberdayaan masyarakat.
                    </p>
                    <div className="mt-5 flex gap-3">
                        {[Instagram, Facebook, Youtube, ShoppingBag].map(
                            (Icon, index) => (
                                <span
                                    key={index}
                                    className="grid size-8 place-items-center rounded-full bg-white/10"
                                >
                                    <Icon className="size-4" />
                                </span>
                            ),
                        )}
                    </div>
                </div>
                {[
                    [
                        'Navigasi',
                        'Beranda',
                        'Jelajahi Desa',
                        'Program CSR',
                        'Tentang Kami',
                        'Kontak',
                    ],
                    [
                        'Informasi',
                        'Cara Kerja',
                        'Syarat & Ketentuan',
                        'Kebijakan Privasi',
                        'FAQ',
                        'Berita & Artikel',
                    ],
                    [
                        'Dukungan',
                        'Pusat Bantuan',
                        'Panduan Pengguna',
                        'Hubungi Kami',
                    ],
                ].map(([title, ...links]) => (
                    <div key={title}>
                        <h3 className="font-extrabold">{title}</h3>
                        <div className="mt-4 space-y-3 text-sm font-medium text-white/82">
                            {links.map((link) => (
                                <p key={link}>{link}</p>
                            ))}
                        </div>
                    </div>
                ))}
                <div>
                    <h3 className="font-extrabold">Kontak Kami</h3>
                    <div className="mt-4 space-y-4 text-sm font-medium text-white/82">
                        <p className="flex gap-3">
                            <Phone className="size-4" /> Halo BCA 1500888
                            <br />
                            (Senin - Jumat, 08.00 - 17.00 WIB)
                        </p>
                        <p className="flex gap-3">
                            <Mail className="size-4" /> desawisata@bca.co.id
                        </p>
                    </div>
                </div>
            </div>
            <div className="mx-auto flex max-w-[1320px] flex-col gap-3 border-t border-white/20 px-5 py-5 text-xs font-medium text-white/80 md:flex-row md:items-center md:justify-between">
                <p>© 2025 Desa Wisata BCA. All rights reserved.</p>
                <p>Bagian dari komitmen BCA untuk Indonesia yang lebih baik.</p>
            </div>
        </footer>
    );
}

export default function VillageShow() {
    return (
        <>
            <Head title="Desa Wisata Penglipuran" />
            <div
                className="min-h-screen bg-[#F7FAFD] text-[#071B3D]"
                style={{
                    fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
                }}
            >
                <NavBar />
                <Hero />
                <StatsBar />
                <QuickFacts />
                <Tabs />

                <main className="mx-auto mt-6 max-w-[1320px] space-y-6 px-4 sm:px-5">
                    <InfoGrid />
                    <Facilities />
                    <AttractionCards />
                    <HomestayCards />
                    <Packages />
                    <Souvenirs />
                    <Statistics />
                    <Contact />
                    <RelatedVillages />
                </main>
                <Footer />
            </div>
        </>
    );
}

VillageShow.layout = null;
