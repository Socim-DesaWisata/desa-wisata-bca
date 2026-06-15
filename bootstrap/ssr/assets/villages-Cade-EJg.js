import { i as DropdownMenuItem, n as DropdownMenuContent, o as DropdownMenuSeparator, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-Dez2j4dN.js";
import { d as villages, t as dashboard } from "./routes-D0B6ewM7.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-UyX6Ddfj.js";
import { i as show, n as edit, r as restore, t as destroy } from "./villages-BUT_KeSs.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Building2, CheckCircle2, ClipboardCheck, Download, Eye, FileText, MapPinned, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
//#region resources/js/pages/villages/index.tsx
var statIcons = {
	map: MapPinned,
	clipboard: ClipboardCheck,
	check: CheckCircle2,
	file: FileText
};
var initialLatitude = "-7.3223551";
var initialLongitude = "112.7034573";
var defaultForm = {
	code: "",
	name: "",
	slug: "",
	description: "",
	province: "",
	city: "",
	district: "",
	subdistrict: "",
	address: "",
	postal_code: "",
	latitude: initialLatitude,
	longitude: initialLongitude,
	maps_url: `https://www.google.com/maps?q=${initialLatitude},${initialLongitude}`,
	manager_name: "",
	manager_phone: "",
	manager_email: "",
	status: "draft"
};
var defaultMapCenter = [Number(initialLatitude), Number(initialLongitude)];
var defaultMapZoom = 14;
var selectedMapZoom = 14;
var provinceTranslations = {
	Aceh: "Aceh",
	Bali: "Bali",
	"Bangka Belitung Islands": "Kepulauan Bangka Belitung",
	Banten: "Banten",
	Bengkulu: "Bengkulu",
	"Central Java": "Jawa Tengah",
	"Central Kalimantan": "Kalimantan Tengah",
	"Central Sulawesi": "Sulawesi Tengah",
	"East Java": "Jawa Timur",
	"East Kalimantan": "Kalimantan Timur",
	"East Nusa Tenggara": "Nusa Tenggara Timur",
	Gorontalo: "Gorontalo",
	Jakarta: "DKI Jakarta",
	Jambi: "Jambi",
	Lampung: "Lampung",
	Maluku: "Maluku",
	"North Kalimantan": "Kalimantan Utara",
	"North Maluku": "Maluku Utara",
	"North Sulawesi": "Sulawesi Utara",
	"North Sumatra": "Sumatera Utara",
	Papua: "Papua",
	Riau: "Riau",
	"Riau Islands": "Kepulauan Riau",
	"South Kalimantan": "Kalimantan Selatan",
	"South Sulawesi": "Sulawesi Selatan",
	"South Sumatra": "Sumatera Selatan",
	"Southeast Sulawesi": "Sulawesi Tenggara",
	"Special Region of Yogyakarta": "DI Yogyakarta",
	"West Java": "Jawa Barat",
	"West Kalimantan": "Kalimantan Barat",
	"West Nusa Tenggara": "Nusa Tenggara Barat",
	"West Papua": "Papua Barat",
	"West Sulawesi": "Sulawesi Barat",
	"West Sumatra": "Sumatera Barat"
};
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function statusClass(status) {
	return {
		draft: "bg-[#F1F5F8] text-[#7C7C7C]",
		active: "bg-[#EAF8F0] text-[#00893D]",
		verified: "bg-[#EAF8F0] text-[#00893D]",
		review: "bg-[#FFF4EA] text-[#C9681E]",
		archived: "bg-[#F1F5F8] text-[#7C7C7C]"
	}[status] ?? "bg-[#F1F5F8] text-[#7C7C7C]";
}
function paginationLabel(label) {
	return label.replace("&laquo; Previous", "Previous").replace("Next &raquo;", "Next");
}
function Badge({ children, className }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex h-6 items-center rounded-md px-2 text-[11px] font-bold ${className}`,
		children
	});
}
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "mt-1 text-xs font-semibold text-[#D81313]",
		children: message
	});
}
function coordinateValue(value) {
	return value.toFixed(7);
}
function googleMapsUrl(latitude, longitude) {
	return `https://www.google.com/maps?q=${latitude},${longitude}`;
}
function provinceName(value) {
	if (!value) return;
	return provinceTranslations[value] ?? value;
}
function parseCoordinates(latitude, longitude) {
	const lat = Number(latitude);
	const lng = Number(longitude);
	if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
	return {
		lat,
		lng
	};
}
function MapResizer({ isOpen }) {
	const map = useMap();
	useEffect(() => {
		if (!isOpen) return;
		const timeout = window.setTimeout(() => {
			map.invalidateSize();
		}, 150);
		return () => window.clearTimeout(timeout);
	}, [isOpen, map]);
	return null;
}
function MapRecenter({ position }) {
	const map = useMap();
	useEffect(() => {
		if (position) map.setView([position.lat, position.lng], selectedMapZoom);
	}, [map, position]);
	return null;
}
function MapClickHandler({ onPick }) {
	useMapEvents({ click(event) {
		onPick(event.latlng.lat, event.latlng.lng);
	} });
	return null;
}
function VillageLocationPicker({ latitude, longitude, isOpen, isResolvingAddress, locationError, onPick }) {
	const position = useMemo(() => parseCoordinates(latitude, longitude), [latitude, longitude]);
	const markerIcon = useMemo(() => L.divIcon({
		className: "",
		html: "<div class=\"size-5 rounded-full border-[3px] border-white bg-[#0066AE] shadow-[0_8px_18px_rgba(3,17,32,0.25)]\"></div>",
		iconSize: [20, 20],
		iconAnchor: [10, 10]
	}), []);
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
					children: "Klik peta atau geser pin untuk mengisi koordinat dan alamat administratif otomatis."
				})] }), isResolvingAddress && /* @__PURE__ */ jsx("span", {
					className: "rounded-full bg-[#EAF3FF] px-2 py-1 text-[11px] font-bold text-[#0066AE]",
					children: "Membaca alamat..."
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "overflow-hidden rounded-xl border border-[#DDE4EC]",
				children: /* @__PURE__ */ jsxs(MapContainer, {
					center: position ?? defaultMapCenter,
					zoom: position ? selectedMapZoom : defaultMapZoom,
					className: "h-[320px] w-full",
					scrollWheelZoom: true,
					children: [
						/* @__PURE__ */ jsx(TileLayer, {
							attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
							url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						}),
						/* @__PURE__ */ jsx(MapResizer, { isOpen }),
						/* @__PURE__ */ jsx(MapRecenter, { position }),
						/* @__PURE__ */ jsx(MapClickHandler, { onPick }),
						position && /* @__PURE__ */ jsx(Marker, {
							draggable: true,
							icon: markerIcon,
							position: [position.lat, position.lng],
							eventHandlers: { dragend(event) {
								const latLng = event.target.getLatLng();
								onPick(latLng.lat, latLng.lng);
							} }
						})
					]
				})
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
function VillagesIndex({ stats, villages: villages$1, filters, status_options, province_options, per_page_options }) {
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [filterForm, setFilterForm] = useState({
		search: filters.search ?? "",
		status: filters.status ?? "",
		province: filters.province ?? "",
		view: filters.view ?? "active",
		per_page: String(filters.per_page ?? 10)
	});
	const [isResolvingAddress, setIsResolvingAddress] = useState(false);
	const [locationError, setLocationError] = useState(null);
	const { data, setData, post, processing, errors, reset, clearErrors } = useForm(defaultForm);
	useEffect(() => {
		if (!isCreateOpen || data.latitude === "" || data.longitude === "") return;
		const coordinates = parseCoordinates(data.latitude, data.longitude);
		if (!coordinates) return;
		const abortController = new AbortController();
		const timeout = window.setTimeout(async () => {
			setIsResolvingAddress(true);
			setLocationError(null);
			try {
				const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates.lat}&lon=${coordinates.lng}&addressdetails=1`, {
					headers: { Accept: "application/json" },
					signal: abortController.signal
				});
				if (!response.ok) throw new Error("Reverse geocode failed.");
				const address = (await response.json()).address ?? {};
				setData((current) => ({
					...current,
					province: provinceName(address.state) ?? current.province,
					city: address.city ?? address.town ?? address.regency ?? address.county ?? current.city,
					district: address.city_district ?? address.district ?? address.municipality ?? address.county ?? current.district,
					subdistrict: address.village ?? address.suburb ?? address.hamlet ?? address.neighbourhood ?? current.subdistrict,
					postal_code: address.postcode ?? current.postal_code
				}));
			} catch (error) {
				if (!abortController.signal.aborted) setLocationError("Alamat tidak bisa diisi otomatis. Field tetap bisa diisi manual.");
			} finally {
				if (!abortController.signal.aborted) setIsResolvingAddress(false);
			}
		}, 600);
		return () => {
			abortController.abort();
			window.clearTimeout(timeout);
		};
	}, [
		data.latitude,
		data.longitude,
		isCreateOpen,
		setData
	]);
	function submitFilters(event) {
		event.preventDefault();
		router.get(villages.url(), {
			search: filterForm.search || void 0,
			status: filterForm.status || void 0,
			province: filterForm.province || void 0,
			view: filterForm.view || void 0,
			per_page: filterForm.per_page || void 0
		}, {
			preserveState: true,
			preserveScroll: true
		});
	}
	function resetFilters() {
		setFilterForm({
			search: "",
			status: "",
			province: "",
			view: "active",
			per_page: "10"
		});
		router.get(villages.url(), {}, { preserveScroll: true });
	}
	function submitVillage(event) {
		event.preventDefault();
		post(villages.url(), {
			preserveScroll: true,
			onSuccess: () => {
				reset();
				clearErrors();
				setIsCreateOpen(false);
			}
		});
	}
	function changeView(view) {
		setFilterForm((current) => ({
			...current,
			view
		}));
		router.get(villages.url(), {
			search: filterForm.search || void 0,
			status: filterForm.status || void 0,
			province: filterForm.province || void 0,
			view,
			per_page: filterForm.per_page || void 0
		}, {
			preserveState: true,
			preserveScroll: true
		});
	}
	function handleDelete(village) {
		if (!window.confirm("Pindahkan desa wisata ini ke trash?")) return;
		router.delete(destroy.url(village.id), { preserveScroll: true });
	}
	function handleRestore(village) {
		if (!window.confirm("Pulihkan desa wisata ini dari trash?")) return;
		router.patch(restore.url(village.id), {}, { preserveScroll: true });
	}
	function openCreateModal() {
		reset();
		clearErrors();
		setLocationError(null);
		setIsResolvingAddress(false);
		setIsCreateOpen(true);
	}
	function handleLocationPick(latitude, longitude) {
		const lat = coordinateValue(latitude);
		const lng = coordinateValue(longitude);
		setData((current) => ({
			...current,
			latitude: lat,
			longitude: lng,
			maps_url: googleMapsUrl(lat, lng)
		}));
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Manajemen Desa Wisata" }),
		/* @__PURE__ */ jsx("main", {
			className: "min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-4 text-[#303030] sm:px-5 lg:px-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[1500px] space-y-4",
				children: [
					/* @__PURE__ */ jsxs("header", {
						className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("nav", {
								className: "mb-1.5 flex items-center gap-2 text-xs font-bold",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-[#0066AE]",
										children: "Dashboard"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#7C7C7C]",
										children: "/"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#7C7C7C]",
										children: "Desa Wisata"
									})
								]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]",
								children: "Manajemen Desa Wisata"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm leading-5 text-[#7C7C7C]",
								children: "Kelola data desa wisata binaan, status assessment, enumerator, dan dokumen pendukung program CSR."
							})
						] }), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3 sm:flex-row",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "inline-flex rounded-lg border border-[#DDE4EC] bg-white p-1",
									children: [/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => changeView("active"),
										className: `rounded-md px-4 py-2 text-sm font-bold ${filterForm.view === "active" ? "bg-[#0066AE] text-white" : "text-[#0066AE]"}`,
										children: "Data Aktif"
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => changeView("trash"),
										className: `rounded-md px-4 py-2 text-sm font-bold ${filterForm.view === "trash" ? "bg-[#093967] text-white" : "text-[#7C7C7C]"}`,
										children: "Trash"
									})]
								}),
								filterForm.view !== "trash" && /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: openCreateModal,
									className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.2)] transition hover:bg-[#093967]",
									children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Desa"]
								}),
								/* @__PURE__ */ jsxs("button", {
									className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-5 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
									children: [/* @__PURE__ */ jsx(Download, { className: "size-4" }), "Export Data"]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("section", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
						children: stats.map((stat) => {
							const Icon = statIcons[stat.icon];
							return /* @__PURE__ */ jsxs("article", {
								className: "flex min-h-[116px] items-center gap-4 rounded-xl border border-[#EFEFEF] bg-white p-5 shadow-[0_4px_12px_rgba(3,17,32,0.06)]",
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex size-[58px] shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0066AE]",
									children: /* @__PURE__ */ jsx(Icon, {
										className: "size-8",
										strokeWidth: 1.9
									})
								}), /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-sm font-bold text-[#303030]",
										children: stat.label
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-[32px] leading-9 font-bold text-[#0066AE]",
										children: stat.value
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs leading-4 text-[#7C7C7C]",
										children: stat.description
									})
								] })]
							}, stat.label);
						})
					}),
					/* @__PURE__ */ jsx("form", {
						onSubmit: submitFilters,
						className: "rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_12px_rgba(3,17,32,0.05)]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(300px,1fr)_170px_170px_auto_auto]",
							children: [
								/* @__PURE__ */ jsxs("label", {
									className: "flex h-11 min-w-0 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-[#7C7C7C]",
									children: [/* @__PURE__ */ jsx(Search, { className: "size-4" }), /* @__PURE__ */ jsx("input", {
										value: filterForm.search,
										onChange: (event) => setFilterForm((current) => ({
											...current,
											search: event.target.value
										})),
										className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7C7C7C]",
										placeholder: "Cari nama desa, lokasi, pengelola, atau kode desa..."
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-[11px] font-semibold text-[#7C7C7C]",
										children: "Status"
									}), /* @__PURE__ */ jsxs("select", {
										value: filterForm.status,
										onChange: (event) => setFilterForm((current) => ({
											...current,
											status: event.target.value
										})),
										className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none",
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Semua Status"
										}), status_options.map((option) => /* @__PURE__ */ jsx("option", {
											value: option.value,
											children: option.label
										}, option.value))]
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-[11px] font-semibold text-[#7C7C7C]",
										children: "Provinsi"
									}), /* @__PURE__ */ jsxs("select", {
										value: filterForm.province,
										onChange: (event) => setFilterForm((current) => ({
											...current,
											province: event.target.value
										})),
										className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none",
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Semua Provinsi"
										}), province_options.map((province) => /* @__PURE__ */ jsx("option", {
											value: province,
											children: province
										}, province))]
									})]
								}),
								/* @__PURE__ */ jsx("button", {
									className: "h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_5px_12px_rgba(0,102,174,0.16)]",
									children: "Terapkan"
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: resetFilters,
									className: "h-11 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#0066AE]",
									children: "Reset"
								})
							]
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-4",
						children: /* @__PURE__ */ jsxs("section", {
							className: "overflow-hidden rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_12px_rgba(3,17,32,0.06)]",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "border-b border-[#EFEFEF] px-5 py-4",
									children: [/* @__PURE__ */ jsx("h2", {
										className: "text-lg font-bold text-[#303030]",
										children: "Daftar Desa Wisata"
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-0.5 text-sm text-[#7C7C7C]",
										children: "Pantau status desa, progres kelengkapan profil, dan metadata desa terbaru."
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ jsxs("table", {
										className: "w-full min-w-[780px] border-collapse text-left text-sm",
										children: [/* @__PURE__ */ jsx("thead", {
											className: "bg-[#F8FBFF] text-[12px] text-[#093967]",
											children: /* @__PURE__ */ jsx("tr", { children: [
												"Desa Wisata",
												"Pengelola",
												"Status",
												"Skor Survey",
												"Dibuat Oleh",
												"Diperbarui",
												"Aksi"
											].map((head) => /* @__PURE__ */ jsx("th", {
												className: "px-3 py-3 font-bold whitespace-nowrap",
												children: head
											}, head)) })
										}), /* @__PURE__ */ jsx("tbody", {
											className: "divide-y divide-[#EFEFEF]",
											children: villages$1.data.map((village) => /* @__PURE__ */ jsxs("tr", {
												className: "hover:bg-[#FAFCFF]",
												children: [
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-3",
														children: /* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-3",
															children: [/* @__PURE__ */ jsx("span", {
																className: "flex size-10 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]",
																children: /* @__PURE__ */ jsx(Building2, { className: "size-5" })
															}), /* @__PURE__ */ jsxs("span", { children: [
																/* @__PURE__ */ jsx("span", {
																	className: "block font-bold text-[#303030]",
																	children: village.name
																}),
																/* @__PURE__ */ jsx("span", {
																	className: "block text-[12px] leading-4 text-[#093967]",
																	children: village.code
																}),
																/* @__PURE__ */ jsx("span", {
																	className: "block text-[12px] leading-4 text-[#7C7C7C]",
																	children: village.location
																})
															] })]
														})
													}),
													/* @__PURE__ */ jsxs("td", {
														className: "px-3 py-3",
														children: [/* @__PURE__ */ jsx("span", {
															className: "block font-medium text-[#303030]",
															children: village.manager_name
														}), /* @__PURE__ */ jsx("span", {
															className: "block text-[12px] leading-4 text-[#7C7C7C]",
															children: village.manager_email ?? village.manager_phone ?? "-"
														})]
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-3",
														children: /* @__PURE__ */ jsx(Badge, {
															className: statusClass(village.status),
															children: village.status_label
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-3 font-medium text-[#303030]",
														children: village.total_score
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-3 font-medium text-[#303030]",
														children: village.created_by
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-3 font-medium text-[#303030]",
														children: village.updated_at
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-3",
														children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
															asChild: true,
															children: /* @__PURE__ */ jsx("button", {
																className: "flex size-8 items-center justify-center rounded-md border border-[#DDE4EC] bg-[#F1F5F8] text-[#093967]",
																children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "size-4" })
															})
														}), /* @__PURE__ */ jsx(DropdownMenuContent, {
															align: "end",
															className: "w-48 rounded-lg border-[#EFEFEF] bg-white text-xs shadow-[0_12px_30px_rgba(3,17,32,0.14)]",
															children: filterForm.view === "trash" ? /* @__PURE__ */ jsxs(DropdownMenuItem, {
																className: "gap-2 text-xs font-bold text-[#00893D]",
																onSelect: (event) => {
																	event.preventDefault();
																	handleRestore(village);
																},
																children: [/* @__PURE__ */ jsx(ClipboardCheck, { className: "size-4 text-[#00893D]" }), "Pulihkan Desa"]
															}) : /* @__PURE__ */ jsxs(Fragment, { children: [
																/* @__PURE__ */ jsx(DropdownMenuItem, {
																	asChild: true,
																	className: "gap-2 text-xs",
																	children: /* @__PURE__ */ jsxs(Link, {
																		href: show(village.id),
																		children: [/* @__PURE__ */ jsx(Eye, { className: "size-4 text-[#303030]" }), "Lihat Detail"]
																	})
																}),
																/* @__PURE__ */ jsx(DropdownMenuItem, {
																	asChild: true,
																	className: "gap-2 text-xs",
																	children: /* @__PURE__ */ jsxs(Link, {
																		href: edit(village.id),
																		children: [/* @__PURE__ */ jsx(Pencil, { className: "size-4 text-[#303030]" }), "Edit Desa"]
																	})
																}),
																/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
																/* @__PURE__ */ jsxs(DropdownMenuItem, {
																	className: "gap-2 text-xs font-bold text-[#D81313]",
																	onSelect: (event) => {
																		event.preventDefault();
																		handleDelete(village);
																	},
																	children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4 text-[#D81313]" }), "Hapus Desa"]
																})
															] })
														})] })
													})
												]
											}, village.id))
										})]
									})
								}),
								villages$1.data.length === 0 && /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center px-6 py-14 text-center",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "flex size-14 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]",
											children: /* @__PURE__ */ jsx(MapPinned, { className: "size-7" })
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "mt-4 text-lg font-bold text-[#303030]",
											children: filterForm.view === "trash" ? "Trash desa wisata kosong" : "Belum ada desa wisata"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-1 max-w-md text-sm leading-5 text-[#7C7C7C]",
											children: filterForm.view === "trash" ? "Desa wisata yang dipindahkan ke trash akan muncul di sini." : "Tambahkan desa wisata pertama untuk mulai mengelola program CSR dan survey assessment."
										}),
										filterForm.view !== "trash" && /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: openCreateModal,
											className: "mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white",
											children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Desa"]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-3 border-t border-[#EFEFEF] px-5 py-4 text-sm text-[#303030] lg:flex-row lg:items-center lg:justify-between",
									children: [/* @__PURE__ */ jsxs("span", { children: [
										"Menampilkan ",
										villages$1.from ?? 0,
										"-",
										villages$1.to ?? 0,
										" dari ",
										villages$1.total,
										" ",
										filterForm.view === "trash" ? "desa di trash" : "desa"
									] }), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-3 sm:flex-row sm:items-center",
										children: [/* @__PURE__ */ jsxs("label", {
											className: "flex items-center gap-2 text-sm font-semibold text-[#303030]",
											children: [/* @__PURE__ */ jsx("span", { children: "Per page" }), /* @__PURE__ */ jsx("select", {
												value: filterForm.per_page,
												onChange: (event) => {
													const perPage = event.target.value;
													setFilterForm((current) => ({
														...current,
														per_page: perPage
													}));
													router.get(villages.url(), {
														search: filterForm.search || void 0,
														status: filterForm.status || void 0,
														province: filterForm.province || void 0,
														view: filterForm.view || void 0,
														per_page: perPage
													}, {
														preserveState: true,
														preserveScroll: true
													});
												},
												className: "h-9 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030] outline-none",
												children: per_page_options.map((option) => /* @__PURE__ */ jsx("option", {
													value: option,
													children: option
												}, option))
											})]
										}), /* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap gap-2",
											children: villages$1.links.map((link, index) => /* @__PURE__ */ jsx("button", {
												type: "button",
												disabled: !link.url,
												onClick: () => link.url && router.visit(link.url, {
													preserveScroll: true,
													preserveState: true
												}),
												className: classNames("h-9 rounded-lg border px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45", link.active ? "border-[#0066AE] bg-[#0066AE] text-white" : "border-[#DDE4EC] bg-white text-[#303030]"),
												children: paginationLabel(link.label)
											}, `${link.label}-${index}`))
										})]
									})]
								})
							]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open: isCreateOpen,
			onOpenChange: setIsCreateOpen,
			children: /* @__PURE__ */ jsxs(DialogContent, {
				className: "max-h-[90dvh] overflow-y-auto rounded-2xl sm:max-w-[860px]",
				children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Tambah Desa Wisata" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Lengkapi data sesuai kolom utama pada database desa wisata. Field pembuat data diisi otomatis dari user login." })] }), /* @__PURE__ */ jsxs("form", {
					onSubmit: submitVillage,
					className: "space-y-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 md:grid-cols-3",
							children: [
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-sm font-bold text-[#303030]",
											children: "Kode Desa"
										}),
										/* @__PURE__ */ jsx("input", {
											value: data.code,
											onChange: (event) => setData("code", event.target.value),
											className: "h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]",
											placeholder: "DW-DIY-001"
										}),
										/* @__PURE__ */ jsx(FieldError, { message: errors.code })
									]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5 md:col-span-2",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-sm font-bold text-[#303030]",
											children: "Nama Desa"
										}),
										/* @__PURE__ */ jsx("input", {
											value: data.name,
											onChange: (event) => {
												const name = event.target.value;
												setData("name", name);
												if (data.slug === "") setData("slug", slugify(name));
											},
											className: "h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]",
											placeholder: "Desa Wisata Nglanggeran"
										}),
										/* @__PURE__ */ jsx(FieldError, { message: errors.name })
									]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5 md:col-span-2",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-sm font-bold text-[#303030]",
											children: "Slug"
										}),
										/* @__PURE__ */ jsx("input", {
											value: data.slug,
											onChange: (event) => setData("slug", event.target.value),
											className: "h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]",
											placeholder: "desa-wisata-nglanggeran"
										}),
										/* @__PURE__ */ jsx(FieldError, { message: errors.slug })
									]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-sm font-bold text-[#303030]",
											children: "Status"
										}),
										/* @__PURE__ */ jsx("select", {
											value: data.status,
											onChange: (event) => setData("status", event.target.value),
											className: "h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]",
											children: status_options.map((option) => /* @__PURE__ */ jsx("option", {
												value: option.value,
												children: option.label
											}, option.value))
										}),
										/* @__PURE__ */ jsx(FieldError, { message: errors.status })
									]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5 md:col-span-3",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-sm font-bold text-[#303030]",
											children: "Deskripsi"
										}),
										/* @__PURE__ */ jsx("textarea", {
											value: data.description,
											onChange: (event) => setData("description", event.target.value),
											className: "min-h-24 w-full rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#2FA6FC]",
											placeholder: "Ringkasan profil dan potensi desa wisata..."
										}),
										/* @__PURE__ */ jsx(FieldError, { message: errors.description })
									]
								})
							]
						}),
						/* @__PURE__ */ jsx(VillageLocationPicker, {
							latitude: data.latitude,
							longitude: data.longitude,
							isOpen: isCreateOpen,
							isResolvingAddress,
							locationError,
							onPick: handleLocationPick
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [/* @__PURE__ */ jsx(FieldError, { message: errors.latitude }), /* @__PURE__ */ jsx(FieldError, { message: errors.longitude })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [[
								[
									"province",
									"Provinsi",
									"Contoh: Jawa Timur"
								],
								[
									"city",
									"Kota / Kabupaten",
									"Contoh: Surabaya"
								],
								[
									"district",
									"Kecamatan",
									"Contoh: Gayungan"
								],
								[
									"subdistrict",
									"Kelurahan / Desa",
									"Contoh: Ketintang"
								],
								[
									"postal_code",
									"Kode Pos",
									"Contoh: 60231"
								],
								[
									"maps_url",
									"URL Google Maps",
									"https://www.google.com/maps?q=-7.3223551,112.7034573"
								]
							].map(([key, label, placeholder]) => /* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-bold text-[#303030]",
										children: label
									}),
									/* @__PURE__ */ jsx("input", {
										value: data[key],
										onChange: (event) => setData(key, event.target.value),
										className: "h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]",
										placeholder
									}),
									/* @__PURE__ */ jsx(FieldError, { message: errors[key] })
								]
							}, key)), /* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5 md:col-span-2",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-bold text-[#303030]",
										children: "Alamat"
									}),
									/* @__PURE__ */ jsx("textarea", {
										value: data.address,
										onChange: (event) => setData("address", event.target.value),
										className: "min-h-20 w-full rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#2FA6FC]",
										placeholder: "Contoh: Jl. Ketintang Madya, Surabaya, Jawa Timur"
									}),
									/* @__PURE__ */ jsx(FieldError, { message: errors.address })
								]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid gap-4 md:grid-cols-3",
							children: [
								[
									"manager_name",
									"Nama Pengelola",
									"Contoh: Budi Santoso"
								],
								[
									"manager_phone",
									"Telepon Pengelola",
									"Contoh: 081234567890"
								],
								[
									"manager_email",
									"Email Pengelola",
									"Contoh: pengelola@desawisata.id"
								]
							].map(([key, label, placeholder]) => /* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-bold text-[#303030]",
										children: label
									}),
									/* @__PURE__ */ jsx("input", {
										value: data[key],
										onChange: (event) => setData(key, event.target.value),
										className: "h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]",
										placeholder
									}),
									/* @__PURE__ */ jsx(FieldError, { message: errors[key] })
								]
							}, key))
						}),
						/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setIsCreateOpen(false),
							className: "h-11 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#303030]",
							children: "Batal"
						}), /* @__PURE__ */ jsx("button", {
							disabled: processing,
							className: "h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white disabled:opacity-60",
							children: processing ? "Menyimpan..." : "Simpan Desa"
						})] })
					]
				})]
			})
		})
	] });
}
VillagesIndex.layout = { breadcrumbs: [{
	title: "Dashboard",
	href: dashboard()
}, {
	title: "Desa Wisata",
	href: villages()
}] };
//#endregion
export { VillagesIndex as default };

//# sourceMappingURL=villages-Cade-EJg.js.map