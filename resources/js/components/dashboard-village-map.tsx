import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    Building2,
    LocateFixed,
    MapPin,
    MapPinned,
    Store,
    Ticket,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';

type VillageMapPoint = {
    id: number;
    code: string;
    name: string;
    city: string | null;
    province: string | null;
    district: string | null;
    subdistrict: string | null;
    latitude: number;
    longitude: number;
    status: string;
    manager_name: string | null;
    manager_phone: string | null;
    manager_email: string | null;
    umkm_count: number;
    pariwisata_count: number;
    location: string;
    url: string;
};

type LeafletModules = {
    MapContainer: React.ComponentType<any>;
    TileLayer: React.ComponentType<any>;
    Marker: React.ComponentType<any>;
    leaflet: typeof import('leaflet');
};

type MapThemeKey = 'default' | 'minimal';

const INDONESIA_CENTER: [number, number] = [-2.5, 118];
const INDONESIA_BOUNDS: [[number, number], [number, number]] = [
    [-12.5, 93],
    [8.5, 142],
];

const mapThemes: Record<
    MapThemeKey,
    { label: string; url: string; attribution: string }
> = {
    default: {
        label: 'Standar',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; OpenStreetMap contributors',
    },
    minimal: {
        label: 'Minimal',
        url: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    },
};

function markerHtml(isSelected: boolean): string {
    return `
        <div class="relative flex items-center justify-center">
            <span class="absolute size-8 rounded-full ${isSelected ? 'bg-[#D81313]/18' : 'bg-[#FF6B6B]/18'} blur-[1px]"></span>
            <span class="relative flex size-6 items-center justify-center rounded-full border-3 border-white ${isSelected ? 'bg-[#D81313]' : 'bg-[#F04E4E]'} shadow-[0_8px_16px_rgba(3,17,32,0.22)]">
                <span class="block size-2 rounded-full bg-white"></span>
            </span>
            <span class="absolute top-[18px] h-2.5 w-2.5 rotate-45 rounded-[2px] ${isSelected ? 'bg-[#D81313]' : 'bg-[#F04E4E]'} shadow-[0_6px_12px_rgba(3,17,32,0.16)]"></span>
        </div>
    `;
}

function formatCount(value: number): string {
    return new Intl.NumberFormat('id-ID').format(value);
}

function MapStatCard({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-[#EFEFEF] bg-white/90 p-3 shadow-[0_10px_25px_rgba(3,17,32,0.08)] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7C7C7C]">
                <span className="flex size-8 items-center justify-center rounded-xl bg-[#F1F5F8] text-[#0066AE]">
                    <Icon className="size-4" strokeWidth={2} />
                </span>
                <span>{label}</span>
            </div>
            <div className="mt-2 truncate text-lg font-bold tracking-[-0.02em] text-[#303030]">
                {value}
            </div>
        </div>
    );
}

export default function DashboardVillageMap({
    points,
}: {
    points: VillageMapPoint[];
}) {
    const [modules, setModules] = useState<LeafletModules | null>(null);
    const [mapTheme, setMapTheme] = useState<MapThemeKey>('default');
    const [selectedVillageId, setSelectedVillageId] = useState<number | null>(
        points[0]?.id ?? null,
    );

    useEffect(() => {
        let isMounted = true;

        async function loadMapModules() {
            const [leaflet, reactLeaflet] = await Promise.all([
                import('leaflet'),
                import('react-leaflet'),
            ]);

            if (!isMounted) {
                return;
            }

            setModules({
                ...reactLeaflet,
                leaflet,
            });
        }

        void loadMapModules();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (selectedVillageId || points.length === 0) {
            return;
        }

        setSelectedVillageId(points[0].id);
    }, [points, selectedVillageId]);

    const validPoints = useMemo(
        () =>
            points.filter(
                (point) =>
                    Number.isFinite(point.latitude) &&
                    Number.isFinite(point.longitude),
            ),
        [points],
    );

    const selectedVillage = useMemo(
        () =>
            validPoints.find((point) => point.id === selectedVillageId) ??
            validPoints[0] ??
            null,
        [selectedVillageId, validPoints],
    );

    const markerIcons = useMemo(() => {
        if (!modules) {
            return new Map<
                number,
                ReturnType<typeof import('leaflet').divIcon>
            >();
        }

        return new Map(
            validPoints.map((point) => [
                point.id,
                modules.leaflet.divIcon({
                    className: 'dashboard-map-marker',
                    html: markerHtml(point.id === selectedVillage?.id),
                    iconSize: [28, 32],
                    iconAnchor: [14, 28],
                    popupAnchor: [0, -26],
                }),
            ]),
        );
    }, [modules, selectedVillage?.id, validPoints]);

    const totals = useMemo(
        () =>
            validPoints.reduce(
                (accumulator, point) => {
                    accumulator.umkm += point.umkm_count;
                    accumulator.pariwisata += point.pariwisata_count;

                    return accumulator;
                },
                {
                    umkm: 0,
                    pariwisata: 0,
                },
            ),
        [validPoints],
    );

    if (validPoints.length === 0) {
        return (
            <section className="overflow-hidden rounded-3xl border border-[#EFEFEF] bg-white shadow-[0_10px_30px_rgba(3,17,32,0.08)]">
                <div className="border-b border-[#EFEFEF] bg-gradient-to-r from-[#F7FBFF] to-white p-5 sm:p-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.24em] text-[#0066AE] uppercase">
                                Peta Desa
                            </p>
                            <h2 className="mt-2 text-[22px] leading-8 font-bold tracking-[-0.02em] text-[#303030]">
                                Map desa belum bisa ditampilkan
                            </h2>
                            <p className="mt-1 max-w-3xl text-sm leading-6 text-[#7C7C7C]">
                                Belum ada desa dengan koordinat latitude dan
                                longitude yang valid di database.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <MapStatCard
                                icon={MapPinned}
                                label="Titik"
                                value="0"
                            />
                            <MapStatCard icon={Store} label="UMKM" value="0" />
                            <MapStatCard
                                icon={Ticket}
                                label="Pariwisata"
                                value="0"
                            />
                            <MapStatCard
                                icon={Building2}
                                label="Aktif"
                                value="0"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex min-h-[460px] items-center justify-center bg-[#F7F7F7] px-6 py-12 text-center">
                    <div className="max-w-md">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white text-[#0066AE] shadow-[0_8px_18px_rgba(3,17,32,0.08)]">
                            <LocateFixed className="size-6" strokeWidth={2} />
                        </div>
                        <p className="mt-4 text-base font-semibold text-[#303030]">
                            Koordinat desa belum tersedia
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#7C7C7C]">
                            Isi latitude dan longitude pada data desa agar pin
                            muncul di map dashboard.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (!modules) {
        return (
            <section className="overflow-hidden rounded-3xl border border-[#EFEFEF] bg-white shadow-[0_10px_30px_rgba(3,17,32,0.08)]">
                <div className="border-b border-[#EFEFEF] bg-gradient-to-r from-[#F7FBFF] to-white p-5 sm:p-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.24em] text-[#0066AE] uppercase">
                                Peta Desa
                            </p>
                            <h2 className="mt-2 text-[22px] leading-8 font-bold tracking-[-0.02em] text-[#303030]">
                                Memuat map desa
                            </h2>
                            <p className="mt-1 max-w-3xl text-sm leading-6 text-[#7C7C7C]">
                                Menyiapkan layer peta dan pin desa dari
                                database.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="h-[520px] animate-pulse bg-[#EEF4F8]" />
            </section>
        );
    }

    const { MapContainer, Marker, TileLayer } = modules;

    return (
        <section className="overflow-hidden rounded-3xl border border-[#EFEFEF] bg-white shadow-[0_10px_30px_rgba(3,17,32,0.08)]">
            <div className="border-b border-[#EFEFEF] bg-gradient-to-r from-[#F7FBFF] to-white p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold tracking-[0.24em] text-[#0066AE] uppercase">
                            Peta Desa
                        </p>
                        <h2 className="mt-2 text-[22px] leading-8 font-bold tracking-[-0.02em] text-[#303030] sm:text-[26px]">
                            Peta Lokasi Desa Binaan
                        </h2>
                        <p className="mt-1 max-w-3xl text-sm leading-6 text-[#7C7C7C]">
                            Tampilan awal menampilkan keseluruhan wilayah
                            Indonesia. Ubah gaya map lalu klik pin untuk melihat
                            ringkasan desa.
                        </p>
                    </div>

                    <div className="w-full sm:w-[190px]">
                        <Select
                            value={mapTheme}
                            onValueChange={(value) =>
                                setMapTheme(value as MapThemeKey)
                            }
                        >
                            <SelectTrigger className="h-10 w-full rounded-full border-[#DCE7F1] bg-white text-xs font-semibold text-[#303030] shadow-none">
                                <SelectValue placeholder="Pilih style map" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(mapThemes).map(
                                    ([key, theme]) => (
                                        <SelectItem key={key} value={key}>
                                            {theme.label}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div className="relative min-h-[560px] bg-[#EAF2F7]">
                    <MapContainer
                        center={INDONESIA_CENTER}
                        zoom={5}
                        minZoom={5}
                        maxBounds={INDONESIA_BOUNDS}
                        maxBoundsViscosity={1}
                        scrollWheelZoom
                        className="dashboard-village-map h-[560px] w-full"
                    >
                        <TileLayer
                            attribution={mapThemes[mapTheme].attribution}
                            url={mapThemes[mapTheme].url}
                        />
                        {validPoints.map((point) => (
                            <Marker
                                key={point.id}
                                position={[point.latitude, point.longitude]}
                                icon={markerIcons.get(point.id)}
                                eventHandlers={{
                                    click: () => setSelectedVillageId(point.id),
                                }}
                            />
                        ))}
                    </MapContainer>
                </div>

                <aside className="border-t border-[#EFEFEF] bg-[#FAFCFE] p-5 xl:border-t-0 xl:border-l xl:p-6">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="text-base font-bold text-[#303030]">
                                Ringkasan titik map
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-[#7C7C7C]">
                                Klik pin merah untuk melihat detail desa di
                                panel ini.
                            </p>
                        </div>
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0066AE] shadow-[0_8px_18px_rgba(3,17,32,0.06)]">
                            <MapPin className="size-5" />
                        </span>
                    </div>

                    <div className="mt-5 space-y-3">
                        <div className="rounded-2xl border border-[#EFEFEF] bg-white p-4">
                            <p className="text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase">
                                Desa dipilih
                            </p>
                            <p className="mt-2 text-lg font-bold text-[#303030]">
                                {selectedVillage?.name ?? '-'}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-[#7C7C7C]">
                                {selectedVillage?.location ??
                                    'Klik pin untuk lihat detail desa.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-2xl border border-[#EFEFEF] bg-white p-4">
                                <p className="text-xs font-semibold text-[#7C7C7C]">
                                    UMKM
                                </p>
                                <p className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#0066AE]">
                                    {selectedVillage
                                        ? formatCount(
                                              selectedVillage.umkm_count,
                                          )
                                        : '0'}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#EFEFEF] bg-white p-4">
                            <p className="text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase">
                                Pengelola Desa
                            </p>
                            <p className="mt-2 text-sm font-semibold text-[#303030]">
                                {selectedVillage?.manager_name ?? '-'}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-[#7C7C7C]">
                                {selectedVillage?.manager_phone ??
                                    'Telepon belum tersedia'}
                            </p>
                            <p className="text-xs leading-5 text-[#7C7C7C]">
                                {selectedVillage?.manager_email ??
                                    'Email belum tersedia'}
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}
