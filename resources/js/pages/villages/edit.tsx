import { update as updateVillage } from '@/actions/App/Http/Controllers/TourismVillageController';
import { dashboard, villages as villagesRoute } from '@/routes';
import { show as showVillage } from '@/routes/villages';
import { Head, Link, useForm } from '@inertiajs/react';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import {
    Archive,
    ArrowLeft,
    BedDouble,
    Box,
    CalendarDays,
    Check,
    ChevronRight,
    CircleAlert,
    Clock3,
    Eye,
    FileImage,
    FileText,
    Gift,
    Image,
    Info,
    Landmark,
    MapPinned,
    MapPin,
    Package,
    Plus,
    Save,
    ShieldCheck,
    Sparkles,
    Store,
    Trash2,
    Upload,
    User,
    Zap,
} from 'lucide-react';
import type { ComponentProps, FormEvent, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

type Option = {
    value?: string;
    label?: string;
    slug?: string;
    name?: string;
};

type MediaForm = {
    id: number | null;
    type: string;
    title: string;
    caption: string;
    file_path: string;
    file: File | null;
    external_url: string;
    mime_type: string;
    is_cover: boolean;
    sort_order: number;
};

type ProfileItemForm = {
    id: number | null;
    category_slug: string;
    category_name: string;
    name: string;
    description: string;
    address: string;
    latitude: string;
    longitude: string;
    maps_url: string;
    price_min: string;
    price_max: string;
    price_text: string;
    opening_hours: string;
    contact_name: string;
    contact_phone: string;
    is_active: boolean;
    sort_order: number;
    media: MediaForm[];
};

type VillageForm = {
    id: number;
    code: string;
    name: string;
    slug: string;
    description: string;
    province: string;
    city: string;
    district: string;
    subdistrict: string;
    address: string;
    postal_code: string;
    latitude: string;
    longitude: string;
    maps_url: string;
    manager_name: string;
    manager_phone: string;
    manager_email: string;
    status: string;
    created_by: string;
    updated_at: string;
    media: MediaForm[];
    profile_items: ProfileItemForm[];
};

type VillagePayload = Omit<VillageForm, 'id' | 'created_by' | 'updated_at'>;

type EditProps = {
    village: VillageForm;
    status_options: Option[];
    profile_category_options: Option[];
    media_type_options: Option[];
};

type SectionState = 'complete' | 'partial' | 'empty';

type LinkHref = ComponentProps<typeof Link>['href'];

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function parseCoordinate(value: string, fallback: number) {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : fallback;
}

function googleMapsUrl(latitude: string, longitude: string) {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

function blankMedia(sortOrder = 0): MediaForm {
    return {
        id: null,
        type: 'image',
        title: '',
        caption: '',
        file_path: '',
        file: null,
        external_url: '',
        mime_type: '',
        is_cover: false,
        sort_order: sortOrder,
    };
}

function blankProfileItem(category: Option, sortOrder = 0): ProfileItemForm {
    return {
        id: null,
        category_slug: category.slug ?? 'fasilitas',
        category_name: category.name ?? category.label ?? 'Fasilitas',
        name: '',
        description: '',
        address: '',
        latitude: '',
        longitude: '',
        maps_url: '',
        price_min: '',
        price_max: '',
        price_text: '',
        opening_hours: '',
        contact_name: '',
        contact_phone: '',
        is_active: true,
        sort_order: sortOrder,
        media: [],
    };
}

function errorText(errors: Partial<Record<string, string>>, key: string) {
    return errors[key] ? (
        <p className="mt-1 text-xs font-semibold text-[#D81313]">
            {errors[key]}
        </p>
    ) : null;
}

function MapClickHandler({
    onPick,
}: {
    onPick: (latitude: number, longitude: number) => void;
}) {
    useMapEvents({
        click(event) {
            onPick(event.latlng.lat, event.latlng.lng);
        },
    });

    return null;
}

function MiniMap({
    latitude,
    longitude,
    onPick,
}: {
    latitude: string;
    longitude: string;
    onPick: (latitude: string, longitude: string) => void;
}) {
    const position = useMemo<LatLngExpression>(
        () => [
            parseCoordinate(latitude, -7.3223551),
            parseCoordinate(longitude, 112.7034573),
        ],
        [latitude, longitude],
    );
    const markerIcon = useMemo(
        () =>
            L.divIcon({
                className: '',
                html: '<div style="width:34px;height:34px;border-radius:999px;background:#0066AE;box-shadow:0 10px 20px rgba(0,102,174,.28);display:flex;align-items:center;justify-content:center;border:4px solid white"><div style="width:9px;height:9px;border-radius:999px;background:white"></div></div>',
                iconSize: [34, 34],
                iconAnchor: [17, 17],
            }),
        [],
    );

    return (
        <div className="h-[168px] overflow-hidden rounded-lg border border-[#AAD2F8] bg-[#EAF4FB]">
            <MapContainer
                center={position}
                zoom={14}
                className="h-full w-full"
                scrollWheelZoom
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler
                    onPick={(lat, lng) =>
                        onPick(lat.toFixed(7), lng.toFixed(7))
                    }
                />
                <Marker
                    draggable
                    icon={markerIcon}
                    position={position}
                    eventHandlers={{
                        dragend(event) {
                            const latLng = event.target.getLatLng();
                            onPick(
                                latLng.lat.toFixed(7),
                                latLng.lng.toFixed(7),
                            );
                        },
                    }}
                />
            </MapContainer>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const label =
        {
            active: 'Aktif',
            verified: 'Terverifikasi',
            review: 'Review',
            archived: 'Arsip',
            draft: 'Draft',
        }[status] ?? status;

    return (
        <span className="inline-flex h-6 items-center rounded-md bg-[#EAF8F0] px-2 text-[11px] font-bold text-[#00893D]">
            {label}
        </span>
    );
}

function Field({
    label,
    value,
    onChange,
    placeholder,
    error,
    icon: Icon,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    icon?: typeof Info;
}) {
    return (
        <label className="block">
            <span className="mb-1 block text-sm font-bold text-[#303030]">
                {label}
            </span>
            <span className="relative block">
                {Icon && (
                    <Icon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#0066AE]" />
                )}
                <input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className={`h-11 w-full rounded-lg border border-[#DDE4EC] bg-white text-sm text-[#303030] transition outline-none placeholder:text-[#7C7C7C] focus:border-[#2FA6FC] focus:ring-2 focus:ring-[#2FA6FC]/15 ${Icon ? 'pr-3 pl-9' : 'px-3'}`}
                    placeholder={placeholder}
                />
            </span>
            {error && (
                <p className="mt-1 text-xs font-semibold text-[#D81313]">
                    {error}
                </p>
            )}
        </label>
    );
}

function SelectField({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
}) {
    return (
        <label className="block">
            <span className="mb-1 block text-sm font-bold text-[#303030]">
                {label}
            </span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#2FA6FC] focus:ring-2 focus:ring-[#2FA6FC]/15"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

function TextAreaField({
    label,
    value,
    onChange,
    placeholder,
    error,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
}) {
    return (
        <label className="block">
            <span className="mb-1 block text-sm font-bold text-[#303030]">
                {label}
            </span>
            <textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="min-h-24 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-sm leading-5 text-[#303030] transition outline-none placeholder:text-[#7C7C7C] focus:border-[#2FA6FC] focus:ring-2 focus:ring-[#2FA6FC]/15"
                placeholder={placeholder}
            />
            {error && (
                <p className="mt-1 text-xs font-semibold text-[#D81313]">
                    {error}
                </p>
            )}
        </label>
    );
}

function CompletionPill({
    label,
    state,
    active,
    onClick,
}: {
    label: string;
    state: SectionState;
    active?: boolean;
    onClick?: () => void;
}) {
    const style =
        state === 'complete'
            ? 'text-[#00893D]'
            : state === 'partial'
              ? 'text-[#FF944C]'
              : 'text-[#B0B0B0]';
    const Dot =
        state === 'complete'
            ? Check
            : state === 'partial'
              ? CircleAlert
              : Clock3;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex min-w-[78px] flex-col items-center gap-1 rounded-lg border px-2 py-1.5 text-center transition ${
                active
                    ? 'border-[#AAD2F8] bg-[#EAF4FB]'
                    : 'border-transparent hover:border-[#DDE4EC] hover:bg-[#F8FBFF]'
            }`}
        >
            <span
                className={`flex size-5 items-center justify-center rounded-full ${style}`}
            >
                <Dot className="size-3.5" />
            </span>
            <span className="text-xs leading-4 font-bold text-[#303030]">
                {label}
            </span>
            <span className={`text-[9px] font-bold ${style}`}>
                {state === 'complete'
                    ? 'Complete'
                    : state === 'partial'
                      ? 'Partial'
                      : 'Empty'}
            </span>
        </button>
    );
}

export default function VillageEdit({
    village,
    status_options,
    profile_category_options,
    media_type_options,
}: EditProps) {
    const [activeSection, setActiveSection] = useState('main');
    const { data, setData, patch, processing, errors, isDirty } =
        useForm<VillagePayload>({
            code: village.code,
            name: village.name,
            slug: village.slug,
            description: village.description,
            province: village.province,
            city: village.city,
            district: village.district,
            subdistrict: village.subdistrict,
            address: village.address,
            postal_code: village.postal_code,
            latitude: village.latitude,
            longitude: village.longitude,
            maps_url: village.maps_url,
            manager_name: village.manager_name,
            manager_phone: village.manager_phone,
            manager_email: village.manager_email,
            status: village.status,
            media: village.media ?? [],
            profile_items: village.profile_items ?? [],
        });

    const formErrors = errors as Partial<Record<string, string>>;
    const profileCount = data.profile_items.length;
    const mediaCount = data.media.length;
    const progress = Math.min(
        100,
        Math.round(
            ([
                data.code,
                data.name,
                data.slug,
                data.description,
                data.province,
                data.city,
                data.district,
                data.subdistrict,
                data.address,
                data.manager_name,
                data.manager_phone,
                data.manager_email,
            ].filter(Boolean).length /
                12) *
                78 +
                (mediaCount > 0 ? 10 : 0) +
                (profileCount > 0 ? 12 : 0),
        ),
    );

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        patch(updateVillage.url(village.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    }

    function updateMedia(index: number, media: MediaForm) {
        setData(
            'media',
            data.media.map((item, itemIndex) =>
                itemIndex === index ? media : item,
            ),
        );
    }

    function removeMedia(index: number) {
        setData(
            'media',
            data.media.filter((_, itemIndex) => itemIndex !== index),
        );
    }

    function updateProfileItem(index: number, item: ProfileItemForm) {
        setData(
            'profile_items',
            data.profile_items.map((profileItem, itemIndex) =>
                itemIndex === index ? item : profileItem,
            ),
        );
    }

    function removeProfileItem(index: number) {
        setData(
            'profile_items',
            data.profile_items.filter((_, itemIndex) => itemIndex !== index),
        );
    }

    function addProfileItem(category: Option) {
        setData('profile_items', [
            ...data.profile_items,
            blankProfileItem(category, data.profile_items.length),
        ]);
    }

    function goToSection(id: string) {
        setActiveSection(id);
    }

    const categoryMeta = [
        {
            slug: 'fasilitas',
            label: 'Fasilitas',
            icon: Store,
            description:
                'Kelola fasilitas pendukung yang tersedia di desa wisata.',
        },
        {
            slug: 'atraksi',
            label: 'Atraksi',
            icon: Sparkles,
            description:
                'Kelola atraksi, aktivitas, dan pengalaman wisata unggulan.',
        },
        {
            slug: 'suvenir',
            label: 'Suvenir',
            icon: Gift,
            description: 'Kelola produk suvenir dan ekonomi kreatif desa.',
        },
        {
            slug: 'homestay',
            label: 'Homestay',
            icon: BedDouble,
            description: 'Kelola akomodasi, homestay, dan informasi kontaknya.',
        },
        {
            slug: 'paket-wisata',
            label: 'Paket Wisata',
            icon: Package,
            description: 'Kelola paket wisata, harga, dan jadwal operasional.',
        },
    ] as const;

    const categories = categoryMeta.map((meta) => {
        const option = profile_category_options.find(
            (category) => category.slug === meta.slug,
        );

        return {
            ...meta,
            option: option ?? { slug: meta.slug, name: meta.label },
            items: data.profile_items
                .map((item, index) => ({ item, index }))
                .filter(({ item }) => item.category_slug === meta.slug),
        };
    });

    const stateForCategory = (slug: string): SectionState => {
        const items = data.profile_items.filter(
            (item) => item.category_slug === slug,
        );

        if (items.length === 0) return 'empty';

        return items.every((item) => item.name && item.description)
            ? 'complete'
            : 'partial';
    };

    const sections = [
        {
            id: 'main',
            label: 'Informasi Utama',
            icon: Info,
            state: 'complete' as SectionState,
        },
        {
            id: 'location',
            label: 'Lokasi',
            icon: MapPin,
            state: 'complete' as SectionState,
        },
        {
            id: 'manager',
            label: 'Kontak Pengelola',
            icon: User,
            state: 'complete' as SectionState,
        },
        {
            id: 'media',
            label: 'Media Desa',
            icon: FileImage,
            state: (mediaCount > 0 ? 'partial' : 'empty') as SectionState,
        },
        ...categoryMeta.map((category) => ({
            id: category.slug,
            label: category.label,
            icon: category.icon,
            state: stateForCategory(category.slug),
        })),
    ];

    const activeCategory = categories.find(
        (category) => category.slug === activeSection,
    );

    const activePanel =
        activeSection === 'location' ? (
            <SectionCard
                id="location"
                icon={MapPin}
                title="Lokasi Desa"
                description="Atur alamat administratif dan titik koordinat desa wisata."
                complete
            >
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_270px]">
                    <div className="grid gap-3 md:grid-cols-3">
                        <Field
                            label="Provinsi"
                            value={data.province}
                            onChange={(value) => setData('province', value)}
                            placeholder="Jawa Timur"
                            error={formErrors.province}
                        />
                        <Field
                            label="Kota/Kabupaten"
                            value={data.city}
                            onChange={(value) => setData('city', value)}
                            placeholder="Surabaya"
                            error={formErrors.city}
                        />
                        <Field
                            label="Kecamatan"
                            value={data.district}
                            onChange={(value) => setData('district', value)}
                            placeholder="Sukolilo"
                            error={formErrors.district}
                        />
                        <Field
                            label="Kelurahan/Desa"
                            value={data.subdistrict}
                            onChange={(value) => setData('subdistrict', value)}
                            placeholder="Keputih"
                            error={formErrors.subdistrict}
                        />
                        <Field
                            label="Kode Pos"
                            value={data.postal_code}
                            onChange={(value) => setData('postal_code', value)}
                            placeholder="60111"
                            error={formErrors.postal_code}
                        />
                        <div className="md:col-span-3">
                            <TextAreaField
                                label="Alamat Lengkap"
                                value={data.address}
                                onChange={(value) => setData('address', value)}
                                placeholder="Jl. Keputih Tegal Timur..."
                                error={formErrors.address}
                            />
                        </div>
                        <Field
                            label="Latitude"
                            value={data.latitude}
                            onChange={(value) => setData('latitude', value)}
                            placeholder="-7.266160"
                            error={formErrors.latitude}
                        />
                        <Field
                            label="Longitude"
                            value={data.longitude}
                            onChange={(value) => setData('longitude', value)}
                            placeholder="112.819123"
                            error={formErrors.longitude}
                        />
                        <Field
                            label="Google Maps URL"
                            value={data.maps_url}
                            onChange={(value) => setData('maps_url', value)}
                            placeholder="https://maps.app.goo.gl/..."
                            error={formErrors.maps_url}
                        />
                    </div>
                    <div className="space-y-2">
                        <MiniMap
                            latitude={data.latitude}
                            longitude={data.longitude}
                            onPick={(latitude, longitude) =>
                                setData((current) => ({
                                    ...current,
                                    latitude,
                                    longitude,
                                    maps_url: googleMapsUrl(
                                        latitude,
                                        longitude,
                                    ),
                                }))
                            }
                        />
                        <a
                            href={data.maps_url || '#'}
                            target="_blank"
                            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white text-sm font-bold text-[#0066AE]"
                        >
                            Buka Google Maps
                            <ChevronRight className="size-3.5" />
                        </a>
                    </div>
                </div>
            </SectionCard>
        ) : activeSection === 'manager' ? (
            <SectionCard
                id="manager"
                icon={User}
                title="Kontak Pengelola"
                description="Informasi kontak pengelola desa wisata untuk kebutuhan koordinasi."
                complete
            >
                <div className="grid gap-3 md:grid-cols-3">
                    <Field
                        icon={User}
                        label="Nama Pengelola"
                        value={data.manager_name}
                        onChange={(value) => setData('manager_name', value)}
                        placeholder="Slamet Widodo"
                        error={formErrors.manager_name}
                    />
                    <Field
                        label="Nomor HP"
                        value={data.manager_phone}
                        onChange={(value) => setData('manager_phone', value)}
                        placeholder="0812-3456-7890"
                        error={formErrors.manager_phone}
                    />
                    <Field
                        label="Email Pengelola"
                        value={data.manager_email}
                        onChange={(value) => setData('manager_email', value)}
                        placeholder="pengelola@keputihasli.id"
                        error={formErrors.manager_email}
                    />
                </div>
            </SectionCard>
        ) : activeSection === 'media' ? (
            <SectionCard
                id="media"
                icon={Image}
                title="Media Desa"
                description="Upload cover image, galeri foto, video, atau tautan eksternal."
            >
                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={() =>
                            setData('media', [
                                ...data.media,
                                blankMedia(data.media.length),
                            ])
                        }
                        className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#AAD2F8] bg-[#F8FBFF] p-5 text-center text-[#0066AE] transition hover:bg-[#EAF4FB]"
                    >
                        <Upload className="size-6" />
                        <span className="mt-2 text-sm font-bold">
                            Tambah Media Desa
                        </span>
                        <span className="text-xs text-[#7C7C7C]">
                            Upload file atau gunakan external URL
                        </span>
                    </button>
                    {data.media.map((media, index) => (
                        <MediaEditor
                            key={index}
                            media={media}
                            index={index}
                            options={media_type_options}
                            errors={formErrors}
                            prefix={`media.${index}`}
                            onChange={(next) => updateMedia(index, next)}
                            onRemove={() => removeMedia(index)}
                        />
                    ))}
                </div>
            </SectionCard>
        ) : activeCategory ? (
            <ProfileItemsSection
                id={activeCategory.slug}
                icon={activeCategory.icon}
                title={activeCategory.label}
                description={activeCategory.description}
                items={activeCategory.items}
                errors={formErrors}
                onAdd={() => addProfileItem(activeCategory.option)}
                onChange={updateProfileItem}
                onRemove={removeProfileItem}
                mediaOptions={media_type_options}
            />
        ) : (
            <SectionCard
                id="main"
                icon={Info}
                title="Informasi Utama"
                description="Informasi dasar desa wisata yang akan menjadi identitas utama di sistem."
                complete
            >
                <div className="grid gap-3 md:grid-cols-3">
                    <Field
                        label="Kode Desa"
                        value={data.code}
                        onChange={(value) => setData('code', value)}
                        placeholder="SBY-0101"
                        error={formErrors.code}
                    />
                    <Field
                        label="Nama Desa"
                        value={data.name}
                        onChange={(value) => {
                            setData('name', value);
                            if (data.slug === '')
                                setData('slug', slugify(value));
                        }}
                        placeholder="Keputih Asli"
                        error={formErrors.name}
                    />
                    <Field
                        label="Slug"
                        value={data.slug}
                        onChange={(value) => setData('slug', value)}
                        placeholder="keputih-asli"
                        error={formErrors.slug}
                    />
                    <SelectField
                        label="Status"
                        value={data.status}
                        onChange={(value) => setData('status', value)}
                        options={status_options}
                    />
                    <div className="md:col-span-2">
                        <TextAreaField
                            label="Deskripsi"
                            value={data.description}
                            onChange={(value) => setData('description', value)}
                            placeholder="Desa Wisata Keputih Asli merupakan desa pesisir..."
                            error={formErrors.description}
                        />
                    </div>
                </div>
            </SectionCard>
        );

    return (
        <>
            <Head title={`Edit ${village.name}`} />
            <main className="min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-4 pb-24 text-[#303030] sm:px-5 lg:px-6">
                <form
                    onSubmit={submit}
                    className="mx-auto max-w-[1500px] space-y-3"
                >
                    <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <nav className="mb-1.5 flex items-center gap-2 text-xs font-bold">
                                <Link
                                    href={villagesRoute()}
                                    className="text-[#0066AE]"
                                >
                                    Desa Wisata
                                </Link>
                                <span className="text-[#7C7C7C]">/</span>
                                <span className="text-[#7C7C7C]">Edit</span>
                            </nav>
                            <h1 className="text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]">
                                Edit Desa Wisata
                            </h1>
                            <p className="mt-1 max-w-3xl text-sm leading-5 text-[#7C7C7C]">
                                Kelola informasi utama, media, fasilitas,
                                atraksi, suvenir, homestay, dan paket wisata
                                desa.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <InfoBadge
                                    icon={Landmark}
                                    label={`Kode: ${data.code || '-'}`}
                                />
                                <InfoBadge
                                    icon={ShieldCheck}
                                    label={`Status: ${data.status || '-'}`}
                                    green
                                />
                                <InfoBadge
                                    icon={CalendarDays}
                                    label={`Terakhir diperbarui: ${village.updated_at}`}
                                />
                                <InfoBadge
                                    icon={Image}
                                    label={`${mediaCount} Media`}
                                />
                                <InfoBadge
                                    icon={Sparkles}
                                    label={`${profileCount} Potensi Desa`}
                                    orange
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <Link
                                href={showVillage(village.id)}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-5 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                            >
                                <ArrowLeft className="size-4" />
                                Kembali ke Detail
                            </Link>
                            <button
                                disabled={processing}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.2)] transition hover:bg-[#093967] disabled:opacity-60"
                            >
                                <Save className="size-4" />
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </header>

                    <section className="overflow-hidden rounded-xl border border-[#DDE4EC] bg-white shadow-[0_8px_24px_rgba(3,17,32,0.07)]">
                        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_1px_minmax(520px,0.9fr)]">
                            <div className="flex gap-4 p-4">
                                <div className="h-[112px] w-[176px] shrink-0 overflow-hidden rounded-lg bg-[#EAF4FB]">
                                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#AAD2F8,#EAF4FB)] text-[#0066AE]">
                                        <MapPinned className="size-10" />
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-xl font-bold text-[#303030]">
                                        {data.name || 'Nama desa belum diisi'}
                                    </h2>
                                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#0066AE]">
                                        <MapPin className="size-3.5" />
                                        {[data.city, data.province]
                                            .filter(Boolean)
                                            .join(', ') || '-'}
                                    </p>
                                    <div className="mt-2">
                                        <StatusBadge status={data.status} />
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-xs font-bold text-[#7C7C7C]">
                                            {progress}% data lengkap
                                        </span>
                                        <span className="h-2 w-[210px] overflow-hidden rounded-full bg-[#E2E8F0]">
                                            <span
                                                className="block h-full rounded-full bg-[#0066AE]"
                                                style={{
                                                    width: `${progress}%`,
                                                }}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden bg-[#E2E8F0] lg:block" />
                            <div className="flex gap-1 overflow-x-auto px-3 py-4 md:grid md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-9">
                                {sections.map((section) => (
                                    <CompletionPill
                                        key={section.id}
                                        label={section.label}
                                        state={section.state}
                                        active={activeSection === section.id}
                                        onClick={() => goToSection(section.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className="grid gap-3 xl:grid-cols-[180px_minmax(0,1fr)_260px]">
                        <aside className="hidden xl:block">
                            <div
                                className="sticky top-4 overflow-hidden rounded-xl border border-[#DDE4EC] bg-white shadow-[0_8px_24px_rgba(3,17,32,0.07)]"
                                role="tablist"
                                aria-label="Navigasi edit desa wisata"
                            >
                                {sections.map((section) => {
                                    const Icon = section.icon;
                                    const active = activeSection === section.id;

                                    return (
                                        <button
                                            key={section.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={active}
                                            onClick={() =>
                                                goToSection(section.id)
                                            }
                                            className={`flex h-11 w-full items-center gap-2 border-l-[3px] px-3 text-left text-sm font-bold transition ${
                                                active
                                                    ? 'border-[#0066AE] bg-[#0066AE] text-white'
                                                    : 'border-transparent text-[#093967] hover:bg-[#F1F5F8]'
                                            }`}
                                        >
                                            <Icon className="size-4" />
                                            <span className="min-w-0 flex-1 truncate">
                                                {section.label}
                                            </span>
                                            <span
                                                className={`size-2 rounded-full ${
                                                    section.state === 'complete'
                                                        ? 'bg-[#00893D]'
                                                        : section.state ===
                                                            'partial'
                                                          ? 'bg-[#FF944C]'
                                                          : 'bg-[#B0B0B0]'
                                                }`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </aside>

                        <div
                            id="village-edit-panel"
                            className="min-w-0 space-y-3"
                            role="tabpanel"
                        >
                            <div
                                className="flex gap-2 overflow-x-auto rounded-xl border border-[#DDE4EC] bg-white p-2 shadow-[0_8px_24px_rgba(3,17,32,0.07)] xl:hidden"
                                role="tablist"
                                aria-label="Tab edit desa wisata"
                            >
                                {sections.map((section) => {
                                    const Icon = section.icon;
                                    const active = activeSection === section.id;

                                    return (
                                        <button
                                            key={section.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={active}
                                            onClick={() =>
                                                goToSection(section.id)
                                            }
                                            className={`flex h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-bold transition ${
                                                active
                                                    ? 'bg-[#0066AE] text-white shadow-[0_6px_14px_rgba(0,102,174,0.18)]'
                                                    : 'bg-[#F8FBFF] text-[#093967] hover:bg-[#EAF4FB]'
                                            }`}
                                        >
                                            <Icon className="size-4" />
                                            {section.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {activePanel}
                        </div>

                        <aside className="hidden xl:block">
                            <div className="sticky top-4 space-y-3">
                                <RightPanel
                                    title="Status Perubahan"
                                    icon={Clock3}
                                >
                                    <p className="text-sm font-bold text-[#FF944C]">
                                        {isDirty
                                            ? 'Ada perubahan belum disimpan'
                                            : 'Tidak ada perubahan baru'}
                                    </p>
                                    <p className="mt-1 text-xs text-[#7C7C7C]">
                                        Last saved: 2 jam lalu
                                    </p>
                                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
                                        <div
                                            className="h-full rounded-full bg-[#0066AE]"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <button className="mt-3 h-9 w-full rounded-lg border border-[#DDE4EC] bg-white text-sm font-bold text-[#303030]">
                                        Simpan Draft
                                    </button>
                                    <button className="mt-2 h-9 w-full rounded-lg bg-[#0066AE] text-sm font-bold text-white">
                                        Simpan Perubahan
                                    </button>
                                </RightPanel>

                                <RightPanel
                                    title="Kelengkapan Data"
                                    icon={FileText}
                                >
                                    <div className="space-y-1">
                                        {sections.slice(0, 7).map((section) => (
                                            <div
                                                key={section.id}
                                                className="flex items-center justify-between text-xs"
                                            >
                                                <span className="font-semibold text-[#303030]">
                                                    {section.label}
                                                </span>
                                                <span
                                                    className={
                                                        section.state ===
                                                        'complete'
                                                            ? 'text-[#00893D]'
                                                            : section.state ===
                                                                'partial'
                                                              ? 'text-[#FF944C]'
                                                              : 'text-[#B0B0B0]'
                                                    }
                                                >
                                                    {section.state ===
                                                    'complete'
                                                        ? 'Complete'
                                                        : section.state ===
                                                            'partial'
                                                          ? 'Partial'
                                                          : 'Empty'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-3 flex w-full items-center justify-center gap-1 text-xs font-bold text-[#0066AE]"
                                    >
                                        Lihat detail kelengkapan
                                        <ChevronRight className="size-3" />
                                    </button>
                                </RightPanel>

                                <RightPanel title="Quick Actions" icon={Zap}>
                                    <QuickAction
                                        icon={Eye}
                                        label="Lihat Detail Desa"
                                        href={showVillage(village.id)}
                                    />
                                    <QuickAction
                                        icon={Image}
                                        label="Tambah Media"
                                        onClick={() => goToSection('media')}
                                    />
                                    <QuickAction
                                        icon={Sparkles}
                                        label="Tambah Potensi Desa"
                                        onClick={() => goToSection('fasilitas')}
                                    />
                                    <button
                                        type="button"
                                        className="flex h-9 w-full items-center justify-between rounded-lg border border-[#F4C8C8] bg-white px-3 text-sm font-bold text-[#D81313]"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Archive className="size-4" />
                                            Arsipkan Desa
                                        </span>
                                        <ChevronRight className="size-4" />
                                    </button>
                                </RightPanel>
                            </div>
                        </aside>
                    </div>
                </form>
            </main>

            <div className="fixed right-0 bottom-0 left-0 z-30 border-t border-[#DDE4EC] bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(3,17,32,0.08)] backdrop-blur lg:left-[232px]">
                <div className="mx-auto flex max-w-[1500px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm font-bold text-[#7C7C7C]">
                        {isDirty
                            ? 'Ada perubahan belum disimpan'
                            : 'Tidak ada perubahan baru'}
                    </span>
                    <button
                        type="button"
                        onClick={() =>
                            document.querySelector('form')?.requestSubmit()
                        }
                        disabled={processing}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white disabled:opacity-60"
                    >
                        <Save className="size-4" />
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>
            </div>
        </>
    );
}

function InfoBadge({
    icon: Icon,
    label,
    green,
    orange,
}: {
    icon: typeof Info;
    label: string;
    green?: boolean;
    orange?: boolean;
}) {
    return (
        <span className="inline-flex h-8 items-center gap-2 rounded-md border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#303030] shadow-[0_4px_10px_rgba(3,17,32,0.04)]">
            <Icon
                className={`size-3.5 ${green ? 'text-[#00893D]' : orange ? 'text-[#FF944C]' : 'text-[#0066AE]'}`}
            />
            {label}
        </span>
    );
}

function SectionCard({
    id,
    icon: Icon,
    title,
    description,
    children,
    complete,
}: {
    id: string;
    icon: typeof Info;
    title: string;
    description: string;
    children: ReactNode;
    complete?: boolean;
}) {
    return (
        <section
            id={id}
            className="rounded-xl border border-[#DDE4EC] bg-white shadow-[0_8px_24px_rgba(3,17,32,0.07)]"
        >
            <div className="flex items-start justify-between gap-4 border-b border-[#EFEFEF] px-5 py-4">
                <div className="flex gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF4FB] text-[#0066AE]">
                        <Icon className="size-5" />
                    </span>
                    <div>
                        <h2 className="text-lg font-bold text-[#303030]">
                            {title}
                        </h2>
                        <p className="mt-0.5 text-sm leading-5 text-[#7C7C7C]">
                            {description}
                        </p>
                    </div>
                </div>
                {complete && (
                    <span className="rounded-md bg-[#EAF8F0] px-2 py-1 text-[11px] font-bold text-[#00893D]">
                        Complete
                    </span>
                )}
            </div>
            <div className="p-5">{children}</div>
        </section>
    );
}

function MediaEditor({
    media,
    index,
    options,
    errors,
    prefix,
    onChange,
    onRemove,
}: {
    media: MediaForm;
    index: number;
    options: Option[];
    errors: Partial<Record<string, string>>;
    prefix: string;
    onChange: (media: MediaForm) => void;
    onRemove: () => void;
}) {
    return (
        <div className="rounded-lg border border-[#DDE4EC] bg-[#FCFDFF] p-4">
            <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-[#303030]">
                    Media #{index + 1}
                </p>
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-[#D81313]"
                >
                    <Trash2 className="size-4" />
                </button>
            </div>
            <div className="grid gap-3 md:grid-cols-4">
                <label>
                    <span className="mb-1 block text-sm font-bold text-[#303030]">
                        Tipe
                    </span>
                    <select
                        value={media.type}
                        onChange={(event) =>
                            onChange({ ...media, type: event.target.value })
                        }
                        className="h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold text-[#303030]"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <Field
                    label="Judul"
                    value={media.title}
                    onChange={(value) => onChange({ ...media, title: value })}
                    placeholder="Foto desa"
                    error={errors[`${prefix}.title`]}
                />
                <label className="md:col-span-2">
                    <span className="mb-1 block text-sm font-bold text-[#303030]">
                        Upload File
                    </span>
                    <input
                        type="file"
                        onChange={(event) =>
                            onChange({
                                ...media,
                                file: event.target.files?.[0] ?? null,
                            })
                        }
                        className="block h-11 w-full rounded-lg border border-[#DDE4EC] px-2 py-2 text-sm file:mr-2 file:rounded file:border-0 file:bg-[#EAF4FB] file:px-2 file:text-xs file:font-bold file:text-[#0066AE]"
                    />
                    {errorText(errors, `${prefix}.file`)}
                </label>
                <Field
                    label="External URL"
                    value={media.external_url}
                    onChange={(value) =>
                        onChange({ ...media, external_url: value })
                    }
                    placeholder="https://..."
                    error={errors[`${prefix}.external_url`]}
                />
                <label className="flex items-center gap-2 pt-5 text-sm font-bold text-[#303030]">
                    <input
                        type="checkbox"
                        checked={media.is_cover}
                        onChange={(event) =>
                            onChange({
                                ...media,
                                is_cover: event.target.checked,
                            })
                        }
                    />
                    Jadikan cover
                </label>
                <div className="md:col-span-4">
                    <TextAreaField
                        label="Caption"
                        value={media.caption}
                        onChange={(value) =>
                            onChange({ ...media, caption: value })
                        }
                        placeholder="Keterangan media..."
                        error={errors[`${prefix}.caption`]}
                    />
                </div>
            </div>
        </div>
    );
}

function ProfileItemsSection({
    id,
    icon: Icon,
    title,
    description,
    items,
    errors,
    onAdd,
    onChange,
    onRemove,
    mediaOptions,
}: {
    id: string;
    icon: typeof Info;
    title: string;
    description: string;
    items: { item: ProfileItemForm; index: number }[];
    errors: Partial<Record<string, string>>;
    onAdd: () => void;
    onChange: (index: number, item: ProfileItemForm) => void;
    onRemove: (index: number) => void;
    mediaOptions: Option[];
}) {
    return (
        <SectionCard
            id={id}
            icon={Icon}
            title={title}
            description={description}
            complete={items.length > 0}
        >
            <div className="space-y-3">
                <button
                    type="button"
                    onClick={onAdd}
                    className="flex w-full items-center justify-between rounded-lg border border-dashed border-[#AAD2F8] bg-[#F8FBFF] px-4 py-3 text-left text-[#0066AE] transition hover:bg-[#EAF4FB]"
                >
                    <span>
                        <span className="block text-sm font-bold">
                            Tambah {title}
                        </span>
                        <span className="text-xs font-semibold text-[#7C7C7C]">
                            Buat item baru dengan detail, harga, kontak, dan
                            lokasi.
                        </span>
                    </span>
                    <Plus className="size-5" />
                </button>

                {items.length === 0 ? (
                    <div className="rounded-lg border border-[#EFEFEF] bg-[#FCFDFF] px-4 py-5 text-center">
                        <p className="text-sm font-bold text-[#303030]">
                            Belum ada data {title.toLowerCase()}
                        </p>
                        <p className="mt-1 text-xs text-[#7C7C7C]">
                            Tambahkan data agar profil desa lebih lengkap.
                        </p>
                    </div>
                ) : (
                    items.map(({ item, index }) => (
                        <ProfileItemEditor
                            key={index}
                            item={item}
                            index={index}
                            errors={errors}
                            prefix={`profile_items.${index}`}
                            onChange={(next) => onChange(index, next)}
                            onRemove={() => onRemove(index)}
                            mediaOptions={mediaOptions}
                        />
                    ))
                )}
            </div>
        </SectionCard>
    );
}

function ProfileItemEditor({
    item,
    index,
    errors,
    prefix,
    onChange,
    onRemove,
    mediaOptions,
}: {
    item: ProfileItemForm;
    index: number;
    errors: Partial<Record<string, string>>;
    prefix: string;
    onChange: (item: ProfileItemForm) => void;
    onRemove: () => void;
    mediaOptions: Option[];
}) {
    function updateItemMedia(mediaIndex: number, media: MediaForm) {
        onChange({
            ...item,
            media: item.media.map((mediaItem, itemIndex) =>
                itemIndex === mediaIndex ? media : mediaItem,
            ),
        });
    }

    function removeItemMedia(mediaIndex: number) {
        onChange({
            ...item,
            media: item.media.filter(
                (_, itemIndex) => itemIndex !== mediaIndex,
            ),
        });
    }

    return (
        <div className="rounded-lg border border-[#DDE4EC] bg-[#FCFDFF] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-bold text-[#303030]">
                        {item.category_name} #{index + 1}
                    </p>
                    <p className="text-xs text-[#7C7C7C]">
                        {item.is_active ? 'Aktif ditampilkan' : 'Disembunyikan'}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onRemove}
                    className="flex size-8 items-center justify-center rounded-md border border-[#F4C8C8] bg-white text-[#D81313]"
                >
                    <Trash2 className="size-4" />
                </button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
                <Field
                    label="Nama"
                    value={item.name}
                    onChange={(value) => onChange({ ...item, name: value })}
                    placeholder="Gazebo tepi sawah"
                    error={errors[`${prefix}.name`]}
                />
                <Field
                    label="Jam Operasional"
                    value={item.opening_hours}
                    onChange={(value) =>
                        onChange({ ...item, opening_hours: value })
                    }
                    placeholder="08.00 - 17.00 WIB"
                    error={errors[`${prefix}.opening_hours`]}
                />
                <Field
                    label="Harga"
                    value={item.price_text}
                    onChange={(value) =>
                        onChange({ ...item, price_text: value })
                    }
                    placeholder="Mulai Rp25.000"
                    error={errors[`${prefix}.price_text`]}
                />
                <div className="md:col-span-3">
                    <TextAreaField
                        label="Deskripsi"
                        value={item.description}
                        onChange={(value) =>
                            onChange({ ...item, description: value })
                        }
                        placeholder="Jelaskan fasilitas, atraksi, produk, atau layanan ini."
                        error={errors[`${prefix}.description`]}
                    />
                </div>
                <div className="md:col-span-3">
                    <TextAreaField
                        label="Alamat"
                        value={item.address}
                        onChange={(value) =>
                            onChange({ ...item, address: value })
                        }
                        placeholder="Lokasi spesifik item di area desa wisata."
                        error={errors[`${prefix}.address`]}
                    />
                </div>
                <div className="grid gap-4 md:col-span-3 lg:grid-cols-[minmax(0,1fr)_270px]">
                    <div className="grid gap-3 md:grid-cols-3">
                        <Field
                            label="Latitude"
                            value={item.latitude}
                            onChange={(value) =>
                                onChange({ ...item, latitude: value })
                            }
                            placeholder="-7.3223551"
                            error={errors[`${prefix}.latitude`]}
                        />
                        <Field
                            label="Longitude"
                            value={item.longitude}
                            onChange={(value) =>
                                onChange({ ...item, longitude: value })
                            }
                            placeholder="112.7034573"
                            error={errors[`${prefix}.longitude`]}
                        />
                        <Field
                            label="Maps URL"
                            value={item.maps_url}
                            onChange={(value) =>
                                onChange({ ...item, maps_url: value })
                            }
                            placeholder="https://maps.app.goo.gl/..."
                            error={errors[`${prefix}.maps_url`]}
                        />
                    </div>
                    <div className="space-y-2">
                        <MiniMap
                            latitude={item.latitude}
                            longitude={item.longitude}
                            onPick={(latitude, longitude) =>
                                onChange({
                                    ...item,
                                    latitude,
                                    longitude,
                                    maps_url: googleMapsUrl(
                                        latitude,
                                        longitude,
                                    ),
                                })
                            }
                        />
                        <a
                            href={item.maps_url || '#'}
                            target="_blank"
                            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white text-sm font-bold text-[#0066AE]"
                        >
                            Buka Google Maps
                            <ChevronRight className="size-3.5" />
                        </a>
                    </div>
                </div>
                <Field
                    label="Nama Kontak"
                    value={item.contact_name}
                    onChange={(value) =>
                        onChange({ ...item, contact_name: value })
                    }
                    placeholder="Budi Santoso"
                    error={errors[`${prefix}.contact_name`]}
                />
                <Field
                    label="Nomor Kontak"
                    value={item.contact_phone}
                    onChange={(value) =>
                        onChange({ ...item, contact_phone: value })
                    }
                    placeholder="0812-3456-7890"
                    error={errors[`${prefix}.contact_phone`]}
                />
                <label className="flex items-center gap-2 pt-5 text-sm font-bold text-[#303030]">
                    <input
                        type="checkbox"
                        checked={item.is_active}
                        onChange={(event) =>
                            onChange({
                                ...item,
                                is_active: event.target.checked,
                            })
                        }
                    />
                    Aktif
                </label>
                <div className="space-y-3 md:col-span-3">
                    <button
                        type="button"
                        onClick={() =>
                            onChange({
                                ...item,
                                media: [
                                    ...item.media,
                                    blankMedia(item.media.length),
                                ],
                            })
                        }
                        className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#AAD2F8] bg-white p-4 text-center text-[#0066AE] transition hover:bg-[#EAF4FB]"
                    >
                        <Upload className="size-5" />
                        <span className="mt-2 text-sm font-bold">
                            Tambah Gambar / Media
                        </span>
                        <span className="text-xs text-[#7C7C7C]">
                            Gunakan upload file untuk gambar, video, atau
                            dokumen pendukung.
                        </span>
                    </button>

                    {item.media.map((media, mediaIndex) => (
                        <MediaEditor
                            key={mediaIndex}
                            media={media}
                            index={mediaIndex}
                            options={mediaOptions}
                            errors={errors}
                            prefix={`${prefix}.media.${mediaIndex}`}
                            onChange={(next) =>
                                updateItemMedia(mediaIndex, next)
                            }
                            onRemove={() => removeItemMedia(mediaIndex)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function RightPanel({
    title,
    icon: Icon,
    children,
}: {
    title: string;
    icon: typeof Info;
    children: ReactNode;
}) {
    return (
        <section className="rounded-xl border border-[#DDE4EC] bg-white p-4 shadow-[0_8px_24px_rgba(3,17,32,0.07)]">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#303030]">
                <Icon className="size-5 text-[#0066AE]" />
                {title}
            </h3>
            {children}
        </section>
    );
}

function QuickAction({
    icon: Icon,
    label,
    href,
    onClick,
}: {
    icon: typeof Info;
    label: string;
    href?: LinkHref;
    onClick?: () => void;
}) {
    const content = (
        <>
            <span className="flex items-center gap-2">
                <Icon className="size-4 text-[#0066AE]" />
                {label}
            </span>
            <ChevronRight className="size-4" />
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className="mb-2 flex h-9 w-full items-center justify-between rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030]"
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className="mb-2 flex h-9 w-full items-center justify-between rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030]"
        >
            {content}
        </button>
    );
}

VillageEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Desa Wisata', href: villagesRoute() },
    ],
};
