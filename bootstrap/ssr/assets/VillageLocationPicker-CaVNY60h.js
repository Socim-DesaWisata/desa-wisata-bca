import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2, Search } from "lucide-react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
//#region resources/js/components/VillageLocationPicker.tsx
var defaultMapCenter = [-7.2965549, 112.7927];
var defaultMapZoom = 14;
var selectedMapZoom = 14;
function parseCoordinates(latitude, longitude) {
	const lat = Number(latitude);
	const lng = Number(longitude);
	if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
	return {
		lat,
		lng
	};
}
function coordinateValue(value) {
	return value.toFixed(7);
}
function MapClickHandler({ onPick }) {
	useMapEvents({ click(event) {
		onPick(event.latlng.lat, event.latlng.lng);
	} });
	return null;
}
function MapResizer({ active }) {
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
function MapRecenter({ position }) {
	const map = useMap();
	useEffect(() => {
		if (position) map.setView([position.lat, position.lng], selectedMapZoom);
	}, [map, position]);
	return null;
}
function VillageLocationPicker({ latitude, longitude, active, isResolvingAddress, locationError, onPick }) {
	const position = useMemo(() => parseCoordinates(latitude, longitude), [latitude, longitude]);
	const markerIcon = useMemo(() => {
		if (typeof window === "undefined" || !L) return void 0;
		return L.divIcon({
			className: "",
			html: "<div class=\"size-5 rounded-full border-[3px] border-white bg-[#0066AE] shadow-[0_8px_18px_rgba(3,17,32,0.25)]\"></div>",
			iconSize: [20, 20],
			iconAnchor: [10, 10]
		});
	}, []);
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	async function handleSearch() {
		if (!searchQuery.trim()) return;
		setIsSearching(true);
		try {
			const payload = await (await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`)).json();
			setSearchResults(payload);
		} catch (error) {
			setSearchResults([]);
		} finally {
			setIsSearching(false);
		}
	}
	function selectResult(result) {
		onPick(Number(result.lat), Number(result.lon));
		setSearchResults([]);
		setSearchQuery(result.display_name);
	}
	return /* @__PURE__ */ jsxs("section", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-bold text-[#303030]",
					children: "Lokasi Pin Desa"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs leading-5 text-[#7C7C7C]",
					children: "Klik peta, geser pin, atau cari lokasi untuk mengisi koordinat dan alamat administratif otomatis."
				})] }), isResolvingAddress && /* @__PURE__ */ jsx("span", {
					className: "rounded-full bg-[#EAF3FF] px-2 py-1 text-[11px] font-bold text-[#0066AE]",
					children: "Membaca alamat..."
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative overflow-hidden rounded-xl border border-[#DDE4EC]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "absolute top-2 right-2 z-[1000] w-[280px] max-w-[calc(100%-16px)]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative flex items-center",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "text",
								placeholder: "Cari lokasi desa...",
								value: searchQuery,
								onChange: (event) => setSearchQuery(event.target.value),
								onKeyDown: (event) => {
									if (event.key === "Enter") {
										event.preventDefault();
										handleSearch();
									}
								},
								className: "h-10 w-full rounded-lg border-none bg-white/95 pr-10 pl-10 text-xs font-semibold text-[#303030] shadow-[0_4px_12px_rgba(3,17,32,0.12)] backdrop-blur outline-none placeholder:font-medium placeholder:text-[#7C7C7C] focus:bg-white focus:ring-2 focus:ring-[#0066AE]"
							}),
							/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 size-4 text-[#7C7C7C]" }),
							isSearching && /* @__PURE__ */ jsx(Loader2, { className: "absolute right-3.5 size-4 animate-spin text-[#0066AE]" })
						]
					}), searchResults.length > 0 && /* @__PURE__ */ jsx("div", {
						className: "mt-1 max-h-48 overflow-y-auto rounded-lg bg-white shadow-[0_6px_16px_rgba(3,17,32,0.12)]",
						children: searchResults.map((result, index) => /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => selectResult(result),
							className: "w-full border-b border-[#EFEFEF] px-3 py-2 text-left text-[11px] leading-4 text-[#303030] transition last:border-0 hover:bg-[#F1F5F8]",
							children: result.display_name
						}, `${result.lat}-${result.lon}-${index}`))
					})]
				}), /* @__PURE__ */ jsxs(MapContainer, {
					center: position ?? defaultMapCenter,
					zoom: position ? selectedMapZoom : defaultMapZoom,
					className: "h-[320px] w-full",
					scrollWheelZoom: true,
					children: [
						/* @__PURE__ */ jsx(TileLayer, {
							attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
							url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						}),
						/* @__PURE__ */ jsx(MapResizer, { active }),
						/* @__PURE__ */ jsx(MapRecenter, { position }),
						/* @__PURE__ */ jsx(MapClickHandler, { onPick: (lat, lng) => {
							setSearchResults([]);
							onPick(lat, lng);
						} }),
						position && markerIcon && /* @__PURE__ */ jsx(Marker, {
							draggable: true,
							icon: markerIcon,
							position: [position.lat, position.lng],
							eventHandlers: { dragend(event) {
								const latLng = event.target.getLatLng();
								onPick(latLng.lat, latLng.lng);
							} }
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1 text-xs leading-5 text-[#7C7C7C] sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ jsxs("span", { children: [
					"Koordinat:",
					" ",
					/* @__PURE__ */ jsx("strong", {
						className: "text-[#303030]",
						children: position ? `${coordinateValue(position.lat)}, ${coordinateValue(position.lng)}` : "Belum dipilih"
					})
				] }), locationError && /* @__PURE__ */ jsx("span", {
					className: "font-semibold text-[#D81313]",
					children: locationError
				})]
			})
		]
	});
}
//#endregion
export { VillageLocationPicker as default };

//# sourceMappingURL=VillageLocationPicker-CaVNY60h.js.map