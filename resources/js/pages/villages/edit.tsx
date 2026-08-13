import { update as updateVillage } from '@/actions/App/Http/Controllers/TourismVillageController';
import { RichTextField } from '@/components/ui/rich-text-field';
import IndependentPersonnelStats, {
    WorkerTypeForm,
    WorkerGenderForm,
    WorkerAgeForm,
    WorkerEducationForm,
} from '@/components/independent-personnel-stats';
import { dashboard, villages as villagesRoute } from '@/routes';
import { show as showVillage } from '@/routes/villages';
import { Head, Link, useForm } from '@inertiajs/react';
import type { LatLngExpression } from 'leaflet';
import {
    Archive,
    ArrowLeft,
    CalendarDays,
    Check,
    ChevronRight,
    CircleAlert,
    Clock3,
    Loader2,
    Eye,
    FileImage,
    FileText,
    Image,
    Info,
    Landmark,
    Languages,
    MapPinned,
    MapPin,
    Save,
    Search,
    ShieldCheck,
    Trash2,
    Upload,
    User,
    Zap,
} from 'lucide-react';
import type { ComponentProps, FormEvent, ReactNode } from 'react';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';

const VillageLocationPicker = lazy(
    () => import('@/components/VillageLocationPicker'),
);

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
    file_size: number | null;
    url: string | null;
    is_cover: boolean;
    sort_order: number;
};

type WorkerForm = {
    id: number | null;
    type: 'full-time' | 'part-time';
    gender: 'male' | 'female' | 'unspecified';
    age_min: number | null;
    age_max: number | null;
    amount: number;
    notes: string;
};

type AdministratorForm = {
    id: number | null;
    education: string;
    amount: number;
};

type InstitutionalForm = {
    id: number | null;
    title: string;
    description: string;
};

type AdministratorLanguageForm = {
    id: number | null;
    language_name: string;
    proficiency_level: 'basic' | 'intermediate' | 'advanced' | 'fluent';
    amount: number;
    notes: string;
};

type StakeholderForm = {
    id: number | null;
    name: string;
    position: string;
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
    total_personnel: number;
    worker_types: WorkerTypeForm[];
    worker_genders: WorkerGenderForm[];
    worker_ages: WorkerAgeForm[];
    worker_educations: WorkerEducationForm[];
    administrator_languages: AdministratorLanguageForm[];
    stakeholders: StakeholderForm[];
    institutionals: InstitutionalForm[];
};

type VillagePayload = Omit<VillageForm, 'id' | 'created_by' | 'updated_at'>;

type EditProps = {
    village: VillageForm;
    status_options: Option[];
    media_type_options: Option[];
};

type ReverseGeocodeAddress = {
    state?: string;
    province?: string;
    region?: string;
    state_district?: string;
    city?: string;
    town?: string;
    regency?: string;
    county?: string;
    city_district?: string;
    district?: string;
    municipality?: string;
    village?: string;
    suburb?: string;
    hamlet?: string;
    neighbourhood?: string;
    postcode?: string;
};

type ReverseGeocodeResponse = {
    address?: ReverseGeocodeAddress;
    display_name?: string;
};

type SectionState = 'complete' | 'partial' | 'empty';

type LinkHref = ComponentProps<typeof Link>['href'];

const defaultLatitude = '-7.2965549';
const defaultLongitude = '112.7927000';

const defaultMapCenter: LatLngExpression = [
    Number(defaultLatitude),
    Number(defaultLongitude),
];
const defaultMapZoom = 14;
const selectedMapZoom = 14;

const provinceTranslations: Record<string, string> = {
    Aceh: 'Aceh',
    Bali: 'Bali',
    'Bangka Belitung': 'Kepulauan Bangka Belitung',
    'Bangka Belitung Islands': 'Kepulauan Bangka Belitung',
    Banten: 'Banten',
    Bengkulu: 'Bengkulu',
    'Central Java': 'Jawa Tengah',
    'Central Kalimantan': 'Kalimantan Tengah',
    'Central Sulawesi': 'Sulawesi Tengah',
    'East Java': 'Jawa Timur',
    'East Kalimantan': 'Kalimantan Timur',
    'East Nusa Tenggara': 'Nusa Tenggara Timur',
    Gorontalo: 'Gorontalo',
    Jakarta: 'DKI Jakarta',
    Jambi: 'Jambi',
    Lampung: 'Lampung',
    Maluku: 'Maluku',
    'North Kalimantan': 'Kalimantan Utara',
    'North Maluku': 'Maluku Utara',
    'North Sulawesi': 'Sulawesi Utara',
    'North Sumatra': 'Sumatera Utara',
    Papua: 'Papua',
    Riau: 'Riau',
    'Riau Islands': 'Kepulauan Riau',
    'South Kalimantan': 'Kalimantan Selatan',
    'South Sulawesi': 'Sulawesi Selatan',
    'South Sumatra': 'Sumatera Selatan',
    'Southeast Sulawesi': 'Sulawesi Tenggara',
    'Special Region of Yogyakarta': 'DI Yogyakarta',
    'Daerah Istimewa Yogyakarta': 'DI Yogyakarta',
    Yogyakarta: 'DI Yogyakarta',
    'West Java': 'Jawa Barat',
    'West Kalimantan': 'Kalimantan Barat',
    'West Nusa Tenggara': 'Nusa Tenggara Barat',
    'West Papua': 'Papua Barat',
    'West Sulawesi': 'Sulawesi Barat',
    'West Sumatra': 'Sumatera Barat',
    'Central Papua': 'Papua Tengah',
    'Highland Papua': 'Papua Pegunungan',
    'South Papua': 'Papua Selatan',
    'Southwest Papua': 'Papua Barat Daya',
};

const provinceAliases = Object.entries(provinceTranslations).reduce(
    (aliases, [alias, province]) => ({
        ...aliases,
        [alias.toLowerCase()]: province,
        [province.toLowerCase()]: province,
    }),
    {} as Record<string, string>,
);

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function hasZeroCoordinates(latitude: string, longitude: string) {
    return Number(latitude) === 0 && Number(longitude) === 0;
}

function normalizeLatitude(latitude: string, longitude: string) {
    return !latitude || hasZeroCoordinates(latitude, longitude)
        ? defaultLatitude
        : latitude;
}

function normalizeLongitude(latitude: string, longitude: string) {
    return !longitude || hasZeroCoordinates(latitude, longitude)
        ? defaultLongitude
        : longitude;
}

function googleMapsUrl(latitude: string, longitude: string) {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

function coordinateValue(value: number) {
    return value.toFixed(7);
}

function cleanProvinceName(value: string) {
    return value
        .trim()
        .replace(/^province of\s+/i, '')
        .replace(/^provinsi\s+/i, '')
        .replace(/^daerah istimewa\s+/i, 'DI ')
        .replace(/^daerah khusus ibukota\s+/i, 'DKI ')
        .replace(/\s+/g, ' ');
}

function provinceName(value?: string) {
    if (!value) {
        return undefined;
    }

    const cleaned = cleanProvinceName(value);

    return provinceAliases[cleaned.toLowerCase()] ?? cleaned;
}

function resolveProvinceName(
    address: ReverseGeocodeAddress,
    displayName?: string,
) {
    const knownProvinces = new Set(Object.values(provinceAliases));
    const directProvince = [address.state, address.province]
        .map(provinceName)
        .find(Boolean);

    if (directProvince) {
        return directProvince;
    }

    const fallbackProvince = [address.region, address.state_district]
        .map(provinceName)
        .find((segment) => segment && knownProvinces.has(segment));

    if (fallbackProvince) {
        return fallbackProvince;
    }

    return displayName
        ?.split(',')
        .map(provinceName)
        .find((segment) => segment && knownProvinces.has(segment));
}

function parseCoordinates(latitude: string, longitude: string) {
    const lat = Number(latitude);
    const lng = Number(longitude);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return null;
    }

    return { lat, lng };
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
        file_size: null,
        url: null,
        is_cover: false,
        sort_order: sortOrder,
    };
}

function errorText(errors: Partial<Record<string, string>>, key: string) {
    return errors[key] ? (
        <p className="mt-1 text-xs font-semibold text-[#D81313]">
            {errors[key]}
        </p>
    ) : null;
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
    type = 'text',
    min,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    icon?: typeof Info;
    type?: string;
    min?: string;
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
                    type={type}
                    min={min}
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
            latitude: normalizeLatitude(village.latitude, village.longitude),
            longitude: normalizeLongitude(village.latitude, village.longitude),
            maps_url:
                village.maps_url ||
                googleMapsUrl(
                    normalizeLatitude(village.latitude, village.longitude),
                    normalizeLongitude(village.latitude, village.longitude),
                ),
            manager_name: village.manager_name,
            manager_phone: village.manager_phone,
            manager_email: village.manager_email,
            status: village.status,
            media: village.media ?? [],
            total_personnel: village.total_personnel ?? 0,
            worker_types: village.worker_types ?? [],
            worker_genders: village.worker_genders ?? [],
            worker_ages: village.worker_ages ?? [],
            worker_educations: village.worker_educations ?? [],
            administrator_languages: village.administrator_languages ?? [],
            stakeholders: village.stakeholders ?? [],
            institutionals: village.institutionals ?? [],
        });
    const [isResolvingAddress, setIsResolvingAddress] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [locationPickVersion, setLocationPickVersion] = useState(0);

    const formErrors = errors as Partial<Record<string, string>>;
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
                90 +
                (mediaCount > 0 ? 10 : 0),
        ),
    );

    useEffect(() => {
        if (locationPickVersion === 0) {
            return;
        }

        const coordinates = parseCoordinates(data.latitude, data.longitude);

        if (!coordinates) {
            return;
        }

        const abortController = new AbortController();
        const timeout = window.setTimeout(async () => {
            setIsResolvingAddress(true);
            setLocationError(null);

            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates.lat}&lon=${coordinates.lng}&addressdetails=1`,
                    {
                        headers: {
                            Accept: 'application/json',
                        },
                        signal: abortController.signal,
                    },
                );

                if (!response.ok) {
                    throw new Error('Reverse geocode failed.');
                }

                const payload =
                    (await response.json()) as ReverseGeocodeResponse;
                const address = payload.address ?? {};

                setData((current) => ({
                    ...current,
                    province:
                        resolveProvinceName(address, payload.display_name) ??
                        current.province,
                    city:
                        address.city ??
                        address.town ??
                        address.regency ??
                        address.county ??
                        current.city,
                    district:
                        address.city_district ??
                        address.district ??
                        address.municipality ??
                        address.county ??
                        current.district,
                    subdistrict:
                        address.village ??
                        address.suburb ??
                        address.hamlet ??
                        address.neighbourhood ??
                        current.subdistrict,
                    postal_code: address.postcode ?? current.postal_code,
                }));
            } catch (error) {
                if (!abortController.signal.aborted) {
                    setLocationError(
                        'Alamat tidak bisa diisi otomatis. Field tetap bisa diisi manual.',
                    );
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setIsResolvingAddress(false);
                }
            }
        }, 600);

        return () => {
            abortController.abort();
            window.clearTimeout(timeout);
        };
    }, [data.latitude, data.longitude, locationPickVersion, setData]);

    function handleLocationPick(latitude: number, longitude: number) {
        const lat = coordinateValue(latitude);
        const lng = coordinateValue(longitude);

        setLocationPickVersion((current) => current + 1);
        setData((current) => ({
            ...current,
            latitude: lat,
            longitude: lng,
            maps_url: googleMapsUrl(lat, lng),
        }));
    }

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

    function goToSection(id: string) {
        setActiveSection(id);
    }

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
        {
            id: 'personnel',
            label: 'Tenaga Kerja & Pengurus',
            icon: User,
            state: (data.worker_types.length > 0
                ? 'partial'
                : 'empty') as SectionState,
        },
        {
            id: 'stakeholders',
            label: 'Stakeholder',
            icon: User,
            state: (data.stakeholders.length > 0
                ? 'partial'
                : 'empty') as SectionState,
        },
        {
            id: 'institutionals',
            label: 'Kelembagaan',
            icon: Landmark,
            state: (data.institutionals.length > 0
                ? 'partial'
                : 'empty') as SectionState,
        },
    ];

    const activePanel =
        activeSection === 'location' ? (
            <SectionCard
                id="location"
                icon={MapPin}
                title="Lokasi Desa"
                description="Atur alamat administratif dan titik koordinat desa wisata."
                complete
            >
                <div className="space-y-4">
                    <Suspense
                        fallback={
                            <div className="h-[320px] w-full animate-pulse rounded-xl bg-[#F1F5F8]" />
                        }
                    >
                        <VillageLocationPicker
                            latitude={data.latitude}
                            longitude={data.longitude}
                            active={activeSection === 'location'}
                            isResolvingAddress={isResolvingAddress}
                            locationError={locationError}
                            onPick={handleLocationPick}
                        />
                    </Suspense>
                    <div className="grid gap-4 md:grid-cols-2">
                        {errorText(formErrors, 'latitude')}
                        {errorText(formErrors, 'longitude')}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Field
                            label="Provinsi"
                            value={data.province}
                            onChange={(value) => setData('province', value)}
                            placeholder="Contoh: Jawa Timur"
                            error={formErrors.province}
                        />
                        <Field
                            label="Kota / Kabupaten"
                            value={data.city}
                            onChange={(value) => setData('city', value)}
                            placeholder="Contoh: Surabaya"
                            error={formErrors.city}
                        />
                        <Field
                            label="Kecamatan"
                            value={data.district}
                            onChange={(value) => setData('district', value)}
                            placeholder="Contoh: Gayungan"
                            error={formErrors.district}
                        />
                        <Field
                            label="Kelurahan / Desa"
                            value={data.subdistrict}
                            onChange={(value) => setData('subdistrict', value)}
                            placeholder="Contoh: Ketintang"
                            error={formErrors.subdistrict}
                        />
                        <Field
                            label="Kode Pos"
                            value={data.postal_code}
                            onChange={(value) => setData('postal_code', value)}
                            placeholder="Contoh: 60231"
                            error={formErrors.postal_code}
                        />
                        <Field
                            label="URL Google Maps"
                            value={data.maps_url}
                            onChange={(value) => setData('maps_url', value)}
                            placeholder="https://www.google.com/maps?q=-7.3223551,112.7034573"
                            error={formErrors.maps_url}
                        />
                        <div className="md:col-span-2">
                            <TextAreaField
                                label="Alamat"
                                value={data.address}
                                onChange={(value) => setData('address', value)}
                                placeholder="Contoh: Jl. Ketintang Madya, Surabaya, Jawa Timur"
                                error={formErrors.address}
                            />
                        </div>
                    </div>
                    <a
                        href={data.maps_url || '#'}
                        target="_blank"
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-4 text-sm font-bold text-[#0066AE]"
                    >
                        Buka Google Maps
                        <ChevronRight className="size-3.5" />
                    </a>
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
                description="Upload cover image, galeri foto, atau video desa."
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
                            Upload file gambar atau video desa
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
        ) : ['personnel', 'stakeholders', 'institutionals'].includes(
              activeSection,
          ) ? (
            <SupportingDataEditor
                section={activeSection as SupportingDataSection}
                totalPersonnel={data.total_personnel}
                workerTypes={data.worker_types}
                workerGenders={data.worker_genders}
                workerAges={data.worker_ages}
                workerEducations={data.worker_educations}
                administratorLanguages={data.administrator_languages}
                stakeholders={data.stakeholders}
                institutionals={data.institutionals}
                errors={formErrors}
                onTotalPersonnelChange={(val) =>
                    setData('total_personnel', val)
                }
                onWorkerTypesChange={(items) => setData('worker_types', items)}
                onWorkerGendersChange={(items) =>
                    setData('worker_genders', items)
                }
                onWorkerAgesChange={(items) => setData('worker_ages', items)}
                onWorkerEducationsChange={(items) =>
                    setData('worker_educations', items)
                }
                onAdministratorLanguagesChange={(administratorLanguages) =>
                    setData('administrator_languages', administratorLanguages)
                }
                onStakeholdersChange={(stakeholders) =>
                    setData('stakeholders', stakeholders)
                }
                onInstitutionalsChange={(institutionals) =>
                    setData('institutionals', institutionals)
                }
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
                        <RichTextField
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
                                Kelola informasi utama, lokasi, kontak
                                pengelola, dan media desa.
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
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <Link
                                href={showVillage(village.id)}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-5 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]"
                            >
                                <ArrowLeft className="size-4" />
                                Lihat Detail
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
                            <div className="flex gap-1 overflow-x-auto px-3 py-4 md:grid md:grid-cols-4">
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
                                        {sections.map((section) => (
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

type SupportingDataSection = 'personnel' | 'stakeholders' | 'institutionals';

function SupportingDataEditor({
    section,
    totalPersonnel,
    workerTypes,
    workerGenders,
    workerAges,
    workerEducations,
    administratorLanguages,
    stakeholders,
    institutionals,
    errors,
    onTotalPersonnelChange,
    onWorkerTypesChange,
    onWorkerGendersChange,
    onWorkerAgesChange,
    onWorkerEducationsChange,
    onAdministratorLanguagesChange,
    onStakeholdersChange,
    onInstitutionalsChange,
}: {
    section: SupportingDataSection;
    totalPersonnel: number;
    workerTypes: WorkerTypeForm[];
    workerGenders: WorkerGenderForm[];
    workerAges: WorkerAgeForm[];
    workerEducations: WorkerEducationForm[];
    administratorLanguages: AdministratorLanguageForm[];
    stakeholders: StakeholderForm[];
    institutionals: InstitutionalForm[];
    errors: Partial<Record<string, string>>;
    onTotalPersonnelChange: (val: number) => void;
    onWorkerTypesChange: (items: WorkerTypeForm[]) => void;
    onWorkerGendersChange: (items: WorkerGenderForm[]) => void;
    onWorkerAgesChange: (items: WorkerAgeForm[]) => void;
    onWorkerEducationsChange: (items: WorkerEducationForm[]) => void;
    onAdministratorLanguagesChange: (
        items: AdministratorLanguageForm[],
    ) => void;
    onStakeholdersChange: (items: StakeholderForm[]) => void;
    onInstitutionalsChange: (institutionals: InstitutionalForm[]) => void;
}) {
    return (
        <div className="space-y-4">
            {section === 'personnel' && (
                <>
                    <SectionCard
                        id="personnel"
                        icon={User}
                        title="Tenaga Kerja & Pengurus Desa"
                        description="Data statistik jumlah tenaga kerja dan pengurus desa berdasarkan berbagai kategori."
                    >
                        <IndependentPersonnelStats
                            totalPersonnel={totalPersonnel}
                            onTotalChange={onTotalPersonnelChange}
                            workerTypes={workerTypes}
                            onWorkerTypesChange={onWorkerTypesChange}
                            workerGenders={workerGenders}
                            onWorkerGendersChange={onWorkerGendersChange}
                            workerAges={workerAges}
                            onWorkerAgesChange={onWorkerAgesChange}
                            workerEducations={workerEducations}
                            onWorkerEducationsChange={onWorkerEducationsChange}
                            errors={errors}
                        />
                    </SectionCard>

                    <SectionCard
                        id="languages"
                        icon={Languages}
                        title="Penguasaan Bahasa Asing"
                        description="Data kemampuan bahasa asing yang dikuasai oleh pengurus atau tenaga kerja desa wisata."
                    >
                        <div className="space-y-3">
                            {administratorLanguages.map((lang, index) => (
                                <div
                                    key={lang.id ?? `lang-${index}`}
                                    className="rounded-lg border border-[#DDE4EC] bg-[#F8FBFF] p-4"
                                >
                                    <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.5fr_1fr_40px]">
                                        <Field
                                            label="Nama Bahasa"
                                            value={lang.language_name}
                                            onChange={(val) =>
                                                onAdministratorLanguagesChange(
                                                    administratorLanguages.map(
                                                        (item, i) =>
                                                            i === index
                                                                ? {
                                                                      ...item,
                                                                      language_name:
                                                                          val,
                                                                  }
                                                                : item,
                                                    ),
                                                )
                                            }
                                            placeholder="Contoh: Inggris, Mandarin, Jepang"
                                            error={
                                                errors[
                                                    `administrator_languages.${index}.language_name`
                                                ]
                                            }
                                        />
                                        <div>
                                            <span className="mb-1 block text-sm font-bold text-[#303030]">
                                                Tingkat Kemampuan
                                            </span>
                                            <select
                                                value={lang.proficiency_level}
                                                onChange={(e) =>
                                                    onAdministratorLanguagesChange(
                                                        administratorLanguages.map(
                                                            (item, i) =>
                                                                i === index
                                                                    ? {
                                                                          ...item,
                                                                          proficiency_level:
                                                                              e
                                                                                  .target
                                                                                  .value as AdministratorLanguageForm['proficiency_level'],
                                                                      }
                                                                    : item,
                                                        ),
                                                    )
                                                }
                                                className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#2FA6FC] focus:ring-2 focus:ring-[#2FA6FC]/15"
                                            >
                                                <option value="basic">
                                                    Pemula (Basic)
                                                </option>
                                                <option value="intermediate">
                                                    Menengah (Intermediate)
                                                </option>
                                                <option value="advanced">
                                                    Mahir (Advanced)
                                                </option>
                                                <option value="fluent">
                                                    Fasih (Fluent)
                                                </option>
                                            </select>
                                            {errors[
                                                `administrator_languages.${index}.proficiency_level`
                                            ] && (
                                                <p className="mt-1 text-xs font-semibold text-[#D81313]">
                                                    {
                                                        errors[
                                                            `administrator_languages.${index}.proficiency_level`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <Field
                                            label="Jumlah Orang"
                                            type="number"
                                            min="0"
                                            value={
                                                lang.amount
                                                    ? String(lang.amount)
                                                    : ''
                                            }
                                            onChange={(val) =>
                                                onAdministratorLanguagesChange(
                                                    administratorLanguages.map(
                                                        (item, i) =>
                                                            i === index
                                                                ? {
                                                                      ...item,
                                                                      amount:
                                                                          parseInt(
                                                                              val,
                                                                              10,
                                                                          ) ||
                                                                          0,
                                                                  }
                                                                : item,
                                                    ),
                                                )
                                            }
                                            placeholder="0"
                                            error={
                                                errors[
                                                    `administrator_languages.${index}.amount`
                                                ]
                                            }
                                        />
                                        <button
                                            type="button"
                                            aria-label="Hapus bahasa"
                                            onClick={() =>
                                                onAdministratorLanguagesChange(
                                                    administratorLanguages.filter(
                                                        (_, i) => i !== index,
                                                    ),
                                                )
                                            }
                                            className="mt-6 self-start rounded-lg border border-[#F4B7B7] p-2.5 text-[#D81313] transition hover:bg-[#FDE8E8]"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                    <div className="mt-3">
                                        <Field
                                            label="Catatan (Opsional)"
                                            value={lang.notes ?? ''}
                                            onChange={(val) =>
                                                onAdministratorLanguagesChange(
                                                    administratorLanguages.map(
                                                        (item, i) =>
                                                            i === index
                                                                ? {
                                                                      ...item,
                                                                      notes: val,
                                                                  }
                                                                : item,
                                                    ),
                                                )
                                            }
                                            placeholder="Contoh: Pemandu tamu mancanegara, sertifikasi TOEFL, dll."
                                            error={
                                                errors[
                                                    `administrator_languages.${index}.notes`
                                                ]
                                            }
                                        />
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() =>
                                    onAdministratorLanguagesChange([
                                        ...administratorLanguages,
                                        {
                                            id: null,
                                            language_name: '',
                                            proficiency_level: 'basic',
                                            amount: 1,
                                            notes: '',
                                        },
                                    ])
                                }
                                className="w-full rounded-lg border border-dashed border-[#AAD2F8] py-2.5 text-sm font-bold text-[#0066AE] transition hover:bg-[#F0F7FF]"
                            >
                                + Tambah Bahasa Asing
                            </button>
                        </div>
                    </SectionCard>
                </>
            )}

            {section === 'stakeholders' && (
                <SectionCard
                    id="stakeholders"
                    icon={User}
                    title="Stakeholder Desa"
                    description="Nama dan jabatan stakeholder desa."
                >
                    <div className="space-y-3">
                        {stakeholders.map((stakeholder, index) => (
                            <div
                                key={stakeholder.id ?? `stakeholder-${index}`}
                                className="grid gap-3 rounded-lg border border-[#DDE4EC] bg-[#F8FBFF] p-3 md:grid-cols-[1fr_1fr_40px]"
                            >
                                <Field
                                    label="Nama"
                                    value={stakeholder.name}
                                    onChange={(name) =>
                                        onStakeholdersChange(
                                            stakeholders.map(
                                                (item, itemIndex) =>
                                                    itemIndex === index
                                                        ? { ...item, name }
                                                        : item,
                                            ),
                                        )
                                    }
                                    placeholder="Nama stakeholder"
                                    error={errors[`stakeholders.${index}.name`]}
                                />
                                <Field
                                    label="Jabatan"
                                    value={stakeholder.position}
                                    onChange={(position) =>
                                        onStakeholdersChange(
                                            stakeholders.map(
                                                (item, itemIndex) =>
                                                    itemIndex === index
                                                        ? { ...item, position }
                                                        : item,
                                            ),
                                        )
                                    }
                                    placeholder="Jabatan"
                                    error={
                                        errors[`stakeholders.${index}.position`]
                                    }
                                />
                                <button
                                    type="button"
                                    aria-label="Hapus stakeholder"
                                    onClick={() =>
                                        onStakeholdersChange(
                                            stakeholders.filter(
                                                (_, itemIndex) =>
                                                    itemIndex !== index,
                                            ),
                                        )
                                    }
                                    className="self-end rounded-lg border border-[#F4B7B7] p-2 text-[#D81313]"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                onStakeholdersChange([
                                    ...stakeholders,
                                    {
                                        id: null,
                                        name: '',
                                        position: '',
                                    },
                                ])
                            }
                            className="w-full rounded-lg border border-dashed border-[#AAD2F8] py-2 text-sm font-bold text-[#0066AE]"
                        >
                            Tambah Stakeholder
                        </button>
                    </div>
                </SectionCard>
            )}

            {section === 'institutionals' && (
                <SectionCard
                    id="institutionals"
                    icon={Landmark}
                    title="Kelembagaan Desa"
                    description="Lembaga yang mendukung pengelolaan desa wisata."
                >
                    <div className="space-y-3">
                        {institutionals.map((institutional, index) => (
                            <div
                                key={
                                    institutional.id ?? `institutional-${index}`
                                }
                                className="rounded-lg border border-[#DDE4EC] bg-[#F8FBFF] p-3"
                            >
                                <div className="grid gap-3 md:grid-cols-[1fr_40px]">
                                    <Field
                                        label="Nama Lembaga"
                                        value={institutional.title}
                                        onChange={(title) =>
                                            onInstitutionalsChange(
                                                institutionals.map(
                                                    (item, itemIndex) =>
                                                        itemIndex === index
                                                            ? { ...item, title }
                                                            : item,
                                                ),
                                            )
                                        }
                                        placeholder="Pokdarwis"
                                        error={
                                            errors[
                                                `institutionals.${index}.title`
                                            ]
                                        }
                                    />
                                    <button
                                        type="button"
                                        aria-label="Hapus kelembagaan"
                                        onClick={() =>
                                            onInstitutionalsChange(
                                                institutionals.filter(
                                                    (_, itemIndex) =>
                                                        itemIndex !== index,
                                                ),
                                            )
                                        }
                                        className="self-end rounded-lg border border-[#F4B7B7] p-2 text-[#D81313]"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                                <div className="mt-3">
                                    <TextAreaField
                                        label="Deskripsi"
                                        value={institutional.description}
                                        onChange={(description) =>
                                            onInstitutionalsChange(
                                                institutionals.map(
                                                    (item, itemIndex) =>
                                                        itemIndex === index
                                                            ? {
                                                                  ...item,
                                                                  description,
                                                              }
                                                            : item,
                                                ),
                                            )
                                        }
                                        placeholder="Peran lembaga"
                                        error={
                                            errors[
                                                `institutionals.${index}.description`
                                            ]
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                onInstitutionalsChange([
                                    ...institutionals,
                                    { id: null, title: '', description: '' },
                                ])
                            }
                            className="w-full rounded-lg border border-dashed border-[#AAD2F8] py-2 text-sm font-bold text-[#0066AE]"
                        >
                            Tambah Kelembagaan
                        </button>
                    </div>
                </SectionCard>
            )}
        </div>
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
                <div className="min-w-0">
                    <p className="text-sm font-bold text-[#303030]">
                        Media #{index + 1}
                    </p>
                </div>
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
                        accept={media.type === 'video' ? 'video/*' : 'image/*'}
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
                {media.url && media.type === 'image' && (
                    <div className="md:col-span-4">
                        <img
                            src={media.url}
                            alt={media.title || `Media ${index + 1}`}
                            className="h-36 w-full rounded-lg border border-[#DDE4EC] object-cover"
                        />
                    </div>
                )}
                <Field
                    label="Urutan"
                    value={String(media.sort_order ?? 0)}
                    onChange={(value) =>
                        onChange({ ...media, sort_order: Number(value) || 0 })
                    }
                    placeholder="0"
                    error={errors[`${prefix}.sort_order`]}
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
