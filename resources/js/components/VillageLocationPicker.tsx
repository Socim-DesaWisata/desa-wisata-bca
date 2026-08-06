import React, { useEffect, useMemo, useState } from 'react';
import {
    MapContainer,
    Marker,
    TileLayer,
    useMap,
    useMapEvents,
} from 'react-leaflet';
import { Search, Loader2 } from 'lucide-react';
import type { LatLngExpression } from 'leaflet';

const defaultLatitude = '-7.2965549';
const defaultLongitude = '112.7927000';
const defaultMapCenter: LatLngExpression = [Number(defaultLatitude), Number(defaultLongitude)];
const defaultMapZoom = 14;
const selectedMapZoom = 14;

function parseCoordinates(latitude: string, longitude: string) {
    const lat = Number(latitude);
    const lng = Number(longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { lat, lng };
}

function coordinateValue(value: number) {
    return value.toFixed(7);
}

function MapClickHandler({ onPick }: { onPick: (latitude: number, longitude: number) => void }) {
    useMapEvents({
        click(event) {
            onPick(event.latlng.lat, event.latlng.lng);
        },
    });
    return null;
}

function MapResizer({ active }: { active: boolean }) {
    const map = useMap();
    useEffect(() => {
        if (!active) return;
        const timeout = window.setTimeout(() => {
            map.invalidateSize();
        }, 150);
        return () => window.clearTimeout(timeout);
    }, [active, map]);
    return null;
}

function MapRecenter({ position }: { position: { lat: number; lng: number } | null }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView([position.lat, position.lng], selectedMapZoom);
        }
    }, [map, position]);
    return null;
}

export default function VillageLocationPicker({
    latitude,
    longitude,
    active,
    isResolvingAddress,
    locationError,
    onPick,
}: {
    latitude: string;
    longitude: string;
    active: boolean;
    isResolvingAddress: boolean;
    locationError: string | null;
    onPick: (latitude: number, longitude: number) => void;
}) {
    const position = useMemo(
        () => parseCoordinates(latitude, longitude),
        [latitude, longitude],
    );
    const [markerIcon, setMarkerIcon] = useState<any>(null);
    
    useEffect(() => {
        import('leaflet').then((leafletModule) => {
            setMarkerIcon(
                // @ts-ignore
                leafletModule.divIcon({
                    className: '',
                    html: '<div class="size-5 rounded-full border-[3px] border-white bg-[#0066AE] shadow-[0_8px_18px_rgba(3,17,32,0.25)]"></div>',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                })
            );
        });
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<
        Array<{ display_name: string; lat: string; lon: string }>
    >([]);

    async function handleSearch() {
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
            );
            const payload = (await response.json()) as Array<{
                display_name: string;
                lat: string;
                lon: string;
            }>;
            setSearchResults(payload);
        } catch (error) {
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }

    function selectResult(result: { display_name: string; lat: string; lon: string }) {
        onPick(Number(result.lat), Number(result.lon));
        setSearchResults([]);
        setSearchQuery(result.display_name);
    }

    return (
        <section className="space-y-2">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-bold text-[#303030]">
                        Lokasi Pin Desa
                    </p>
                    <p className="text-xs leading-5 text-[#7C7C7C]">
                        Klik peta, geser pin, atau cari lokasi untuk mengisi
                        koordinat dan alamat administratif otomatis.
                    </p>
                </div>
                {isResolvingAddress && (
                    <span className="rounded-full bg-[#EAF3FF] px-2 py-1 text-[11px] font-bold text-[#0066AE]">
                        Membaca alamat...
                    </span>
                )}
            </div>
            <div className="relative overflow-hidden rounded-xl border border-[#DDE4EC]">
                <div className="absolute top-2 right-2 z-[1000] w-[280px] max-w-[calc(100%-16px)]">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Cari lokasi desa..."
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    void handleSearch();
                                }
                            }}
                            className="h-10 w-full rounded-lg border-none bg-white/95 pr-10 pl-10 text-xs font-semibold text-[#303030] shadow-[0_4px_12px_rgba(3,17,32,0.12)] backdrop-blur outline-none placeholder:font-medium placeholder:text-[#7C7C7C] focus:bg-white focus:ring-2 focus:ring-[#0066AE]"
                        />
                        <Search className="absolute left-3.5 size-4 text-[#7C7C7C]" />
                        {isSearching && (
                            <Loader2 className="absolute right-3.5 size-4 animate-spin text-[#0066AE]" />
                        )}
                    </div>
                    {searchResults.length > 0 && (
                        <div className="mt-1 max-h-48 overflow-y-auto rounded-lg bg-white shadow-[0_6px_16px_rgba(3,17,32,0.12)]">
                            {searchResults.map((result, index) => (
                                <button
                                    key={`${result.lat}-${result.lon}-${index}`}
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
                    <MapResizer active={active} />
                    <MapRecenter position={position} />
                    <MapClickHandler
                        onPick={(lat, lng) => {
                            setSearchResults([]);
                            onPick(lat, lng);
                        }}
                    />
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
