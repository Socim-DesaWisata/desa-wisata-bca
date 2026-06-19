import { Head, Link, router, useForm } from '@inertiajs/react';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import {
    Building2,
    CheckCircle2,
    ChevronDown,
    ClipboardCheck,
    Download,
    Eye,
    FileText,
    Info,
    Loader2,
    MapPinned,
    MoreHorizontal,
    Pencil,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
    MapContainer,
    Marker,
    TileLayer,
    useMap,
    useMapEvents,
} from 'react-leaflet';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { dashboard, villages as villagesRoute } from '@/routes';
import {
    destroy as destroyVillage,
    edit as editVillage,
    restore as restoreVillage,
    show as showVillage,
} from '@/routes/villages';

type StatCard = {
    label: string;
    value: string;
    description: string;
    icon: 'map' | 'clipboard' | 'check' | 'file';
};

type VillageRow = {
    id: number;
    code: string;
    name: string;
    slug: string;
    description: string | null;
    location: string;
    province: string | null;
    city: string | null;
    district: string | null;
    subdistrict: string | null;
    address: string | null;
    postal_code: string | null;
    latitude: string | null;
    longitude: string | null;
    maps_url: string | null;
    manager_name: string;
    manager_phone: string | null;
    manager_email: string | null;
    status: string;
    status_label: string;
    total_score: number;
    is_trashed: boolean;
    deleted_at: string;
    created_by: string;
    updated_at: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedVillages = {
    data: VillageRow[];
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
};

type Option = {
    value: string;
    label: string;
};

type VillageFilters = {
    search: string;
    status: string | null;
    province: string | null;
    view?: 'active' | 'trash' | null;
    per_page: number;
};

type VillageForm = {
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
};

type ReverseGeocodeAddress = {
    state?: string;
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
};

type VillagesIndexProps = {
    stats: StatCard[];
    villages: PaginatedVillages;
    filters: VillageFilters;
    status_options: Option[];
    province_options: string[];
    per_page_options: number[];
};

const statIcons = {
    map: MapPinned,
    clipboard: ClipboardCheck,
    check: CheckCircle2,
    file: FileText,
};

const initialLatitude = '-7.3223551';
const initialLongitude = '112.7034573';

const defaultForm: VillageForm = {
    code: '',
    name: '',
    slug: '',
    description: '',
    province: '',
    city: '',
    district: '',
    subdistrict: '',
    address: '',
    postal_code: '',
    latitude: initialLatitude,
    longitude: initialLongitude,
    maps_url: `https://www.google.com/maps?q=${initialLatitude},${initialLongitude}`,
    manager_name: '',
    manager_phone: '',
    manager_email: '',
    status: 'draft',
};

const defaultMapCenter: LatLngExpression = [
    Number(initialLatitude),
    Number(initialLongitude),
];
const defaultMapZoom = 14;
const selectedMapZoom = 14;

const provinceTranslations: Record<string, string> = {
    Aceh: 'Aceh',
    Bali: 'Bali',
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
    'West Java': 'Jawa Barat',
    'West Kalimantan': 'Kalimantan Barat',
    'West Nusa Tenggara': 'Nusa Tenggara Barat',
    'West Papua': 'Papua Barat',
    'West Sulawesi': 'Sulawesi Barat',
    'West Sumatra': 'Sumatera Barat',
};

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function statusClass(status: string) {
    return (
        {
            draft: 'bg-[#F1F5F8] text-[#7C7C7C]',
            active: 'bg-[#EAF8F0] text-[#00893D]',
            verified: 'bg-[#EAF8F0] text-[#00893D]',
            review: 'bg-[#FFF4EA] text-[#C9681E]',
            archived: 'bg-[#F1F5F8] text-[#7C7C7C]',
        }[status] ?? 'bg-[#F1F5F8] text-[#7C7C7C]'
    );
}

function paginationLabel(label: string) {
    return label
        .replace('&laquo; Previous', 'Previous')
        .replace('Next &raquo;', 'Next');
}

function Badge({
    children,
    className,
}: {
    children: string;
    className: string;
}) {
    return (
        <span
            className={`inline-flex h-6 items-center rounded-md px-2 text-[11px] font-bold ${className}`}
        >
            {children}
        </span>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return (
        <p className="mt-1 text-xs font-semibold text-[#D81313]">{message}</p>
    );
}

function coordinateValue(value: number) {
    return value.toFixed(7);
}

function googleMapsUrl(latitude: string, longitude: string) {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

function provinceName(value?: string) {
    if (!value) {
        return undefined;
    }

    return provinceTranslations[value] ?? value;
}

function parseCoordinates(latitude: string, longitude: string) {
    const lat = Number(latitude);
    const lng = Number(longitude);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return null;
    }

    return { lat, lng };
}

function MapResizer({ isOpen }: { isOpen: boolean }) {
    const map = useMap();

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const timeout = window.setTimeout(() => {
            map.invalidateSize();
        }, 150);

        return () => window.clearTimeout(timeout);
    }, [isOpen, map]);

    return null;
}

function MapRecenter({
    position,
}: {
    position: { lat: number; lng: number } | null;
}) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.setView([position.lat, position.lng], selectedMapZoom);
        }
    }, [map, position]);

    return null;
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

function VillageLocationPicker({
    latitude,
    longitude,
    isOpen,
    isResolvingAddress,
    locationError,
    onPick,
}: {
    latitude: string;
    longitude: string;
    isOpen: boolean;
    isResolvingAddress: boolean;
    locationError: string | null;
    onPick: (latitude: number, longitude: number) => void;
}) {
    const position = useMemo(
        () => parseCoordinates(latitude, longitude),
        [latitude, longitude],
    );
    const markerIcon = useMemo(
        () =>
            L.divIcon({
                className: '',
                html: '<div class="size-5 rounded-full border-[3px] border-white bg-[#0066AE] shadow-[0_8px_18px_rgba(3,17,32,0.25)]"></div>',
                iconSize: [20, 20],
                iconAnchor: [10, 10],
            }),
        [],
    );

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const selectResult = (result: any) => {
        onPick(Number(result.lat), Number(result.lon));
        setSearchResults([]);
        setSearchQuery(result.display_name);
    };

    return (
        <section className="space-y-2">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-bold text-[#303030]">
                        Lokasi Pin Desa
                    </p>
                    <p className="text-xs leading-5 text-[#7C7C7C]">
                        Klik peta atau geser pin untuk mengisi koordinat dan
                        alamat administratif otomatis.
                    </p>
                </div>
                {isResolvingAddress && (
                    <span className="rounded-full bg-[#EAF3FF] px-2 py-1 text-[11px] font-bold text-[#0066AE]">
                        Membaca alamat...
                    </span>
                )}
            </div>
            <div className="relative overflow-hidden rounded-xl border border-[#DDE4EC]">
                <div className="absolute left-2 top-2 z-[1000] w-[280px] max-w-[calc(100%-16px)]">
                    <form onSubmit={handleSearch} className="relative flex items-center">
                        <input 
                            type="text" 
                            placeholder="Cari lokasi desa..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 w-full rounded-lg border-none bg-white/95 pl-10 pr-4 text-xs font-semibold text-[#303030] shadow-[0_4px_12px_rgba(3,17,32,0.12)] outline-none backdrop-blur placeholder:font-medium placeholder:text-[#7C7C7C] focus:bg-white focus:ring-2 focus:ring-[#0066AE]"
                        />
                        <Search className="absolute left-3.5 size-4 text-[#7C7C7C]" />
                        {isSearching && <Loader2 className="absolute right-3.5 size-4 animate-spin text-[#0066AE]" />}
                    </form>
                    {searchResults.length > 0 && (
                        <div className="mt-1 max-h-48 overflow-y-auto rounded-lg bg-white shadow-[0_6px_16px_rgba(3,17,32,0.12)]">
                            {searchResults.map((result, i) => (
                                <button 
                                    key={i} 
                                    type="button" 
                                    onClick={() => selectResult(result)}
                                    className="w-full border-b border-[#EFEFEF] px-3 py-2 text-left text-[11px] leading-4 text-[#303030] transition last:border-0 hover:bg-[#F1F5F8]"
                                >
                                    {result.display_name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <MapContainer
                    center={position ?? defaultMapCenter}
                    zoom={position ? selectedMapZoom : defaultMapZoom}
                    className="h-[320px] w-full"
                    scrollWheelZoom
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapResizer isOpen={isOpen} />
                    <MapRecenter position={position} />
                    <MapClickHandler onPick={(lat, lng) => {
                        setSearchResults([]);
                        onPick(lat, lng);
                    }} />
                    {position && (
                        <Marker
                            draggable
                            icon={markerIcon}
                            position={[position.lat, position.lng]}
                            eventHandlers={{
                                dragend(event) {
                                    const latLng = event.target.getLatLng();
                                    onPick(latLng.lat, latLng.lng);
                                },
                            }}
                        />
                    )}
                </MapContainer>
            </div>
            <div className="flex flex-col gap-1 text-xs leading-5 text-[#7C7C7C] sm:flex-row sm:items-center sm:justify-between">
                <span>
                    Koordinat:{' '}
                    <strong className="text-[#303030]">
                        {position
                            ? `${coordinateValue(position.lat)}, ${coordinateValue(position.lng)}`
                            : 'Belum dipilih'}
                    </strong>
                </span>
                {locationError && (
                    <span className="font-semibold text-[#D81313]">
                        {locationError}
                    </span>
                )}
            </div>
        </section>
    );
}

export default function VillagesIndex({
    stats,
    villages,
    filters,
    status_options,
    province_options,
    per_page_options,
}: VillagesIndexProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [filterForm, setFilterForm] = useState({
        search: filters.search ?? '',
        status: filters.status ?? '',
        province: filters.province ?? '',
        view: filters.view ?? 'active',
        per_page: String(filters.per_page ?? 10),
    });
    const [isResolvingAddress, setIsResolvingAddress] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<VillageForm>(defaultForm);

    useEffect(() => {
        if (!isCreateOpen || data.latitude === '' || data.longitude === '') {
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
                    province: provinceName(address.state) ?? current.province,
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
    }, [data.latitude, data.longitude, isCreateOpen, setData]);

    function submitFilters(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        router.get(
            villagesRoute.url(),
            {
                search: filterForm.search || undefined,
                status: filterForm.status || undefined,
                province: filterForm.province || undefined,
                view: filterForm.view || undefined,
                per_page: filterForm.per_page || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    function resetFilters() {
        setFilterForm({
            search: '',
            status: '',
            province: '',
            view: 'active',
            per_page: '10',
        });

        router.get(villagesRoute.url(), {}, { preserveScroll: true });
    }

    function submitVillage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post(villagesRoute.url(), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
                setIsCreateOpen(false);
            },
        });
    }

    function changeView(view: 'active' | 'trash') {
        setFilterForm((current) => ({
            ...current,
            view,
        }));

        router.get(
            villagesRoute.url(),
            {
                search: filterForm.search || undefined,
                status: filterForm.status || undefined,
                province: filterForm.province || undefined,
                view,
                per_page: filterForm.per_page || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    function handleDelete(village: VillageRow) {
        if (!window.confirm('Pindahkan desa wisata ini ke trash?')) {
            return;
        }

        router.delete(destroyVillage.url(village.id), {
            preserveScroll: true,
        });
    }

    function handleRestore(village: VillageRow) {
        if (!window.confirm('Pulihkan desa wisata ini dari trash?')) {
            return;
        }

        router.patch(
            restoreVillage.url(village.id),
            {},
            {
                preserveScroll: true,
            },
        );
    }

    function openCreateModal() {
        reset();
        clearErrors();
        setLocationError(null);
        setIsResolvingAddress(false);
        setIsCreateOpen(true);
    }

    function handleLocationPick(latitude: number, longitude: number) {
        const lat = coordinateValue(latitude);
        const lng = coordinateValue(longitude);

        setData((current) => ({
            ...current,
            latitude: lat,
            longitude: lng,
            maps_url: googleMapsUrl(lat, lng),
        }));
    }

    return (
        <>
            <Head title="Manajemen Desa Wisata" />
            <main className="min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-4 text-[#303030] sm:px-5 lg:px-6">
                <div className="mx-auto max-w-[1500px] space-y-4">
                    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <nav className="mb-1.5 flex items-center gap-2 text-xs font-bold">
                                <span className="text-[#0066AE]">
                                    Dashboard
                                </span>
                                <span className="text-[#7C7C7C]">/</span>
                                <span className="text-[#7C7C7C]">
                                    Desa Wisata
                                </span>
                            </nav>
                            <h1 className="text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]">
                                Manajemen Desa Wisata
                            </h1>
                            <p className="mt-1 text-sm leading-5 text-[#7C7C7C]">
                                Kelola data desa wisata binaan, status
                                assessment, enumerator, dan dokumen pendukung
                                program CSR.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="inline-flex rounded-lg border border-[#DDE4EC] bg-white p-1">
                                <button
                                    type="button"
                                    onClick={() => changeView('active')}
                                    className={`rounded-md px-4 py-2 text-sm font-bold ${filterForm.view === 'active' ? 'bg-[#0066AE] text-white' : 'text-[#0066AE]'}`}
                                >
                                    Data Aktif
                                </button>
                                <button
                                    type="button"
                                    onClick={() => changeView('trash')}
                                    className={`rounded-md px-4 py-2 text-sm font-bold ${filterForm.view === 'trash' ? 'bg-[#093967] text-white' : 'text-[#7C7C7C]'}`}
                                >
                                    Trash
                                </button>
                            </div>
                            {filterForm.view !== 'trash' && (
                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.2)] transition hover:bg-[#093967]"
                                >
                                    <Plus className="size-4" />
                                    Tambah Desa
                                </button>
                            )}
                            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-5 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]">
                                <Download className="size-4" />
                                Export Data
                            </button>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = statIcons[stat.icon];

                            return (
                                <article
                                    key={stat.label}
                                    className="flex min-h-[116px] items-center gap-4 rounded-xl border border-[#EFEFEF] bg-white p-5 shadow-[0_4px_12px_rgba(3,17,32,0.06)]"
                                >
                                    <div className="flex size-[58px] shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0066AE]">
                                        <Icon
                                            className="size-8"
                                            strokeWidth={1.9}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#303030]">
                                            {stat.label}
                                        </p>
                                        <p className="text-[32px] leading-9 font-bold text-[#0066AE]">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs leading-4 text-[#7C7C7C]">
                                            {stat.description}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </section>

                    <form
                        onSubmit={submitFilters}
                        className="rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_12px_rgba(3,17,32,0.05)]"
                    >
                        <div className="grid items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(300px,1fr)_170px_170px_auto_auto]">
                            <label className="flex h-11 min-w-0 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-[#7C7C7C]">
                                <Search className="size-4" />
                                <input
                                    value={filterForm.search}
                                    onChange={(event) =>
                                        setFilterForm((current) => ({
                                            ...current,
                                            search: event.target.value,
                                        }))
                                    }
                                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7C7C7C]"
                                    placeholder="Cari nama desa, lokasi, pengelola, atau kode desa..."
                                />
                            </label>

                            <label className="space-y-1">
                                <span className="block text-[11px] font-semibold text-[#7C7C7C]">
                                    Status
                                </span>
                                <select
                                    value={filterForm.status}
                                    onChange={(event) =>
                                        setFilterForm((current) => ({
                                            ...current,
                                            status: event.target.value,
                                        }))
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none"
                                >
                                    <option value="">Semua Status</option>
                                    {status_options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="space-y-1">
                                <span className="block text-[11px] font-semibold text-[#7C7C7C]">
                                    Provinsi
                                </span>
                                <select
                                    value={filterForm.province}
                                    onChange={(event) =>
                                        setFilterForm((current) => ({
                                            ...current,
                                            province: event.target.value,
                                        }))
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none"
                                >
                                    <option value="">Semua Provinsi</option>
                                    {province_options.map((province) => (
                                        <option key={province} value={province}>
                                            {province}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <button className="h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_5px_12px_rgba(0,102,174,0.16)]">
                                Terapkan
                            </button>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="h-11 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#0066AE]"
                            >
                                Reset
                            </button>
                        </div>
                    </form>

                    <div className="grid grid-cols-1 gap-4">
                        <section className="overflow-hidden rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_12px_rgba(3,17,32,0.06)]">
                            <div className="border-b border-[#EFEFEF] px-5 py-4">
                                <h2 className="text-lg font-bold text-[#303030]">
                                    Daftar Desa Wisata
                                </h2>
                                <p className="mt-0.5 text-sm text-[#7C7C7C]">
                                    Pantau status desa, progres kelengkapan
                                    profil, dan metadata desa terbaru.
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[780px] border-collapse text-left text-sm">
                                    <thead className="bg-[#F8FBFF] text-[12px] text-[#093967]">
                                        <tr>
                                            {[
                                                'Desa Wisata',
                                                'Pengelola',
                                                'Status',
                                                'Skor Survey',
                                                'Dibuat Oleh',
                                                'Diperbarui',
                                                'Aksi',
                                            ].map((head) => (
                                                <th
                                                    key={head}
                                                    className="px-3 py-3 font-bold whitespace-nowrap"
                                                >
                                                    {head}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#EFEFEF]">
                                        {villages.data.map((village) => (
                                            <tr
                                                key={village.id}
                                                className="hover:bg-[#FAFCFF]"
                                            >
                                                <td className="px-3 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex size-10 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]">
                                                            <Building2 className="size-5" />
                                                        </span>
                                                        <span>
                                                            <span className="block font-bold text-[#303030]">
                                                                {village.name}
                                                            </span>
                                                            <span className="block text-[12px] leading-4 text-[#093967]">
                                                                {village.code}
                                                            </span>
                                                            <span className="block text-[12px] leading-4 text-[#7C7C7C]">
                                                                {
                                                                    village.location
                                                                }
                                                            </span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span className="block font-medium text-[#303030]">
                                                        {village.manager_name}
                                                    </span>
                                                    <span className="block text-[12px] leading-4 text-[#7C7C7C]">
                                                        {village.manager_email ??
                                                            village.manager_phone ??
                                                            '-'}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <Badge
                                                        className={statusClass(
                                                            village.status,
                                                        )}
                                                    >
                                                        {village.status_label}
                                                    </Badge>
                                                </td>
                                                <td className="px-3 py-3 font-medium text-[#303030]">
                                                    {village.total_score}
                                                </td>
                                                <td className="px-3 py-3 font-medium text-[#303030]">
                                                    {village.created_by}
                                                </td>
                                                <td className="px-3 py-3 font-medium text-[#303030]">
                                                    {village.updated_at}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <button className="flex size-8 items-center justify-center rounded-md border border-[#DDE4EC] bg-[#F1F5F8] text-[#093967]">
                                                                <MoreHorizontal className="size-4" />
                                                            </button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            align="end"
                                                            className="w-48 rounded-lg border-[#EFEFEF] bg-white text-xs shadow-[0_12px_30px_rgba(3,17,32,0.14)]"
                                                        >
                                                            {filterForm.view ===
                                                            'trash' ? (
                                                                <DropdownMenuItem
                                                                    className="gap-2 text-xs font-bold text-[#00893D]"
                                                                    onSelect={(
                                                                        event,
                                                                    ) => {
                                                                        event.preventDefault();
                                                                        handleRestore(
                                                                            village,
                                                                        );
                                                                    }}
                                                                >
                                                                    <ClipboardCheck className="size-4 text-[#00893D]" />
                                                                    Pulihkan
                                                                    Desa
                                                                </DropdownMenuItem>
                                                            ) : (
                                                                <>
                                                                    <DropdownMenuItem
                                                                        asChild
                                                                        className="gap-2 text-xs"
                                                                    >
                                                                        <Link
                                                                            href={showVillage(
                                                                                village.id,
                                                                            )}
                                                                        >
                                                                            <Eye className="size-4 text-[#303030]" />
                                                                            Lihat
                                                                            Detail
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        asChild
                                                                        className="gap-2 text-xs"
                                                                    >
                                                                        <Link
                                                                            href={editVillage(
                                                                                village.id,
                                                                            )}
                                                                        >
                                                                            <Pencil className="size-4 text-[#303030]" />
                                                                            Edit
                                                                            Desa
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem
                                                                        className="gap-2 text-xs font-bold text-[#D81313]"
                                                                        onSelect={(
                                                                            event,
                                                                        ) => {
                                                                            event.preventDefault();
                                                                            handleDelete(
                                                                                village,
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Trash2 className="size-4 text-[#D81313]" />
                                                                        Hapus
                                                                        Desa
                                                                    </DropdownMenuItem>
                                                                </>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {villages.data.length === 0 && (
                                <div className="flex flex-col items-center px-6 py-14 text-center">
                                    <span className="flex size-14 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]">
                                        <MapPinned className="size-7" />
                                    </span>
                                    <h3 className="mt-4 text-lg font-bold text-[#303030]">
                                        {filterForm.view === 'trash'
                                            ? 'Trash desa wisata kosong'
                                            : 'Belum ada desa wisata'}
                                    </h3>
                                    <p className="mt-1 max-w-md text-sm leading-5 text-[#7C7C7C]">
                                        {filterForm.view === 'trash'
                                            ? 'Desa wisata yang dipindahkan ke trash akan muncul di sini.'
                                            : 'Tambahkan desa wisata pertama untuk mulai mengelola program CSR dan survey assessment.'}
                                    </p>
                                    {filterForm.view !== 'trash' && (
                                        <button
                                            type="button"
                                            onClick={openCreateModal}
                                            className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white"
                                        >
                                            <Plus className="size-4" />
                                            Tambah Desa
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className="flex flex-col gap-3 border-t border-[#EFEFEF] px-5 py-4 text-sm text-[#303030] lg:flex-row lg:items-center lg:justify-between">
                                <span>
                                    Menampilkan {villages.from ?? 0}-
                                    {villages.to ?? 0} dari {villages.total}{' '}
                                    {filterForm.view === 'trash'
                                        ? 'desa di trash'
                                        : 'desa'}
                                </span>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-[#303030]">
                                        <span>Per page</span>
                                        <select
                                            value={filterForm.per_page}
                                            onChange={(event) => {
                                                const perPage =
                                                    event.target.value;

                                                setFilterForm((current) => ({
                                                    ...current,
                                                    per_page: perPage,
                                                }));

                                                router.get(
                                                    villagesRoute.url(),
                                                    {
                                                        search:
                                                            filterForm.search ||
                                                            undefined,
                                                        status:
                                                            filterForm.status ||
                                                            undefined,
                                                        province:
                                                            filterForm.province ||
                                                            undefined,
                                                        view:
                                                            filterForm.view ||
                                                            undefined,
                                                        per_page: perPage,
                                                    },
                                                    {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    },
                                                );
                                            }}
                                            className="h-9 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030] outline-none"
                                        >
                                            {per_page_options.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {villages.links.map((link, index) => (
                                            <button
                                                key={`${link.label}-${index}`}
                                                type="button"
                                                disabled={!link.url}
                                                onClick={() =>
                                                    link.url &&
                                                    router.visit(link.url, {
                                                        preserveScroll: true,
                                                        preserveState: true,
                                                    })
                                                }
                                                className={classNames(
                                                    'h-9 rounded-lg border px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45',
                                                    link.active
                                                        ? 'border-[#0066AE] bg-[#0066AE] text-white'
                                                        : 'border-[#DDE4EC] bg-white text-[#303030]',
                                                )}
                                            >
                                                {paginationLabel(link.label)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl sm:max-w-[860px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Desa Wisata</DialogTitle>
                        <DialogDescription>
                            Lengkapi data sesuai kolom utama pada database desa
                            wisata. Field pembuat data diisi otomatis dari user
                            login.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submitVillage} className="space-y-5">
                        <div className="grid gap-4 md:grid-cols-3">
                            <label className="space-y-1.5">
                                <span className="text-sm font-bold text-[#303030]">
                                    Kode Desa
                                </span>
                                <input
                                    value={data.code}
                                    onChange={(event) =>
                                        setData('code', event.target.value)
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                    placeholder="DW-DIY-001"
                                />
                                <FieldError message={errors.code} />
                            </label>
                            <label className="space-y-1.5 md:col-span-2">
                                <span className="text-sm font-bold text-[#303030]">
                                    Nama Desa
                                </span>
                                <input
                                    value={data.name}
                                    onChange={(event) => {
                                        const name = event.target.value;
                                        setData('name', name);

                                        if (data.slug === '') {
                                            setData('slug', slugify(name));
                                        }
                                    }}
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                    placeholder="Desa Wisata Nglanggeran"
                                />
                                <FieldError message={errors.name} />
                            </label>
                            <label className="space-y-1.5 md:col-span-2">
                                <span className="text-sm font-bold text-[#303030]">
                                    Slug
                                </span>
                                <input
                                    value={data.slug}
                                    onChange={(event) =>
                                        setData('slug', event.target.value)
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                    placeholder="desa-wisata-nglanggeran"
                                />
                                <FieldError message={errors.slug} />
                            </label>
                            <label className="space-y-1.5">
                                <span className="text-sm font-bold text-[#303030]">
                                    Status
                                </span>
                                <select
                                    value={data.status}
                                    onChange={(event) =>
                                        setData('status', event.target.value)
                                    }
                                    className="h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                >
                                    {status_options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <FieldError message={errors.status} />
                            </label>
                            <label className="space-y-1.5 md:col-span-3">
                                <span className="text-sm font-bold text-[#303030]">
                                    Deskripsi
                                </span>
                                <textarea
                                    value={data.description}
                                    onChange={(event) =>
                                        setData(
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    className="min-h-24 w-full rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#2FA6FC]"
                                    placeholder="Ringkasan profil dan potensi desa wisata..."
                                />
                                <FieldError message={errors.description} />
                            </label>
                        </div>

                        <VillageLocationPicker
                            latitude={data.latitude}
                            longitude={data.longitude}
                            isOpen={isCreateOpen}
                            isResolvingAddress={isResolvingAddress}
                            locationError={locationError}
                            onPick={handleLocationPick}
                        />
                        <div className="grid gap-4 md:grid-cols-2">
                            <FieldError message={errors.latitude} />
                            <FieldError message={errors.longitude} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {[
                                ['province', 'Provinsi', 'Contoh: Jawa Timur'],
                                [
                                    'city',
                                    'Kota / Kabupaten',
                                    'Contoh: Surabaya',
                                ],
                                ['district', 'Kecamatan', 'Contoh: Gayungan'],
                                [
                                    'subdistrict',
                                    'Kelurahan / Desa',
                                    'Contoh: Ketintang',
                                ],
                                ['postal_code', 'Kode Pos', 'Contoh: 60231'],
                                [
                                    'maps_url',
                                    'URL Google Maps',
                                    'https://www.google.com/maps?q=-7.3223551,112.7034573',
                                ],
                            ].map(([key, label, placeholder]) => (
                                <label key={key} className="space-y-1.5">
                                    <span className="text-sm font-bold text-[#303030]">
                                        {label}
                                    </span>
                                    <input
                                        value={data[key as keyof VillageForm]}
                                        onChange={(event) =>
                                            setData(
                                                key as keyof VillageForm,
                                                event.target.value,
                                            )
                                        }
                                        className="h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                        placeholder={placeholder}
                                    />
                                    <FieldError
                                        message={
                                            errors[key as keyof VillageForm]
                                        }
                                    />
                                </label>
                            ))}
                            <label className="space-y-1.5 md:col-span-2">
                                <span className="text-sm font-bold text-[#303030]">
                                    Alamat
                                </span>
                                <textarea
                                    value={data.address}
                                    onChange={(event) =>
                                        setData('address', event.target.value)
                                    }
                                    className="min-h-20 w-full rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#2FA6FC]"
                                    placeholder="Contoh: Jl. Ketintang Madya, Surabaya, Jawa Timur"
                                />
                                <FieldError message={errors.address} />
                            </label>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {[
                                [
                                    'manager_name',
                                    'Nama Pengelola',
                                    'Contoh: Budi Santoso',
                                ],
                                [
                                    'manager_phone',
                                    'Telepon Pengelola',
                                    'Contoh: 081234567890',
                                ],
                                [
                                    'manager_email',
                                    'Email Pengelola',
                                    'Contoh: pengelola@desawisata.id',
                                ],
                            ].map(([key, label, placeholder]) => (
                                <label key={key} className="space-y-1.5">
                                    <span className="text-sm font-bold text-[#303030]">
                                        {label}
                                    </span>
                                    <input
                                        value={data[key as keyof VillageForm]}
                                        onChange={(event) =>
                                            setData(
                                                key as keyof VillageForm,
                                                event.target.value,
                                            )
                                        }
                                        className="h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]"
                                        placeholder={placeholder}
                                    />
                                    <FieldError
                                        message={
                                            errors[key as keyof VillageForm]
                                        }
                                    />
                                </label>
                            ))}
                        </div>

                        <DialogFooter>
                            <button
                                type="button"
                                onClick={() => setIsCreateOpen(false)}
                                className="h-11 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#303030]"
                            >
                                Batal
                            </button>
                            <button
                                disabled={processing}
                                className="h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white disabled:opacity-60"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Desa'}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

VillagesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Desa Wisata', href: villagesRoute() },
    ],
};
