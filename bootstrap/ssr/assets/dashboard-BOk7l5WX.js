import { i as DropdownMenuItem, n as DropdownMenuContent, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-Dez2j4dN.js";
import { c as surveyAssignments, d as villages, l as umkm, t as dashboard } from "./routes-MVysbYPj.js";
import { i as show } from "./survey-assignments-CULhP1Eb.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DKL20tqQ.js";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, ArrowUpRight, Building2, ChevronDown, ChevronRight, ClipboardCheck, Eye, FileSearch, Info, LocateFixed, MapPin, MapPinned, Store, Ticket, Timer, TrendingDown, TrendingUp, X } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart as PieChart$1, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region resources/js/components/dashboard-village-map.tsx
var INDONESIA_CENTER = [-2.5, 118];
var INDONESIA_BOUNDS = [[-12.5, 93], [8.5, 142]];
var mapThemes = {
	default: {
		label: "Standar",
		url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		attribution: "&copy; OpenStreetMap contributors"
	},
	minimal: {
		label: "Minimal",
		url: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
		attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
	}
};
function markerHtml(isSelected) {
	return `
        <div class="relative flex items-center justify-center">
            <span class="absolute size-8 rounded-full ${isSelected ? "bg-[#D81313]/18" : "bg-[#FF6B6B]/18"} blur-[1px]"></span>
            <span class="relative flex size-6 items-center justify-center rounded-full border-3 border-white ${isSelected ? "bg-[#D81313]" : "bg-[#F04E4E]"} shadow-[0_8px_16px_rgba(3,17,32,0.22)]">
                <span class="block size-2 rounded-full bg-white"></span>
            </span>
            <span class="absolute top-[18px] h-2.5 w-2.5 rotate-45 rounded-[2px] ${isSelected ? "bg-[#D81313]" : "bg-[#F04E4E]"} shadow-[0_6px_12px_rgba(3,17,32,0.16)]"></span>
        </div>
    `;
}
function formatCount(value) {
	return new Intl.NumberFormat("id-ID").format(value);
}
function MapStatCard({ icon: Icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-2xl border border-[#EFEFEF] bg-white/90 p-3 shadow-[0_10px_25px_rgba(3,17,32,0.08)] backdrop-blur-sm",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 text-xs font-semibold text-[#7C7C7C]",
			children: [/* @__PURE__ */ jsx("span", {
				className: "flex size-8 items-center justify-center rounded-xl bg-[#F1F5F8] text-[#0066AE]",
				children: /* @__PURE__ */ jsx(Icon, {
					className: "size-4",
					strokeWidth: 2
				})
			}), /* @__PURE__ */ jsx("span", { children: label })]
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-2 truncate text-lg font-bold tracking-[-0.02em] text-[#303030]",
			children: value
		})]
	});
}
function DashboardVillageMap({ points }) {
	const [modules, setModules] = useState(null);
	const [mapTheme, setMapTheme] = useState("default");
	const [selectedVillageId, setSelectedVillageId] = useState(points[0]?.id ?? null);
	useEffect(() => {
		let isMounted = true;
		async function loadMapModules() {
			const [leaflet, reactLeaflet] = await Promise.all([import("leaflet"), import("react-leaflet")]);
			if (!isMounted) return;
			setModules({
				...reactLeaflet,
				leaflet
			});
		}
		loadMapModules();
		return () => {
			isMounted = false;
		};
	}, []);
	useEffect(() => {
		if (selectedVillageId || points.length === 0) return;
		setSelectedVillageId(points[0].id);
	}, [points, selectedVillageId]);
	const validPoints = useMemo(() => points.filter((point) => Number.isFinite(point.latitude) && Number.isFinite(point.longitude)), [points]);
	const selectedVillage = useMemo(() => validPoints.find((point) => point.id === selectedVillageId) ?? validPoints[0] ?? null, [selectedVillageId, validPoints]);
	const markerIcons = useMemo(() => {
		if (!modules) return /* @__PURE__ */ new Map();
		return new Map(validPoints.map((point) => [point.id, modules.leaflet.divIcon({
			className: "dashboard-map-marker",
			html: markerHtml(point.id === selectedVillage?.id),
			iconSize: [28, 32],
			iconAnchor: [14, 28],
			popupAnchor: [0, -26]
		})]));
	}, [
		modules,
		selectedVillage?.id,
		validPoints
	]);
	useMemo(() => validPoints.reduce((accumulator, point) => {
		accumulator.umkm += point.umkm_count;
		accumulator.pariwisata += point.pariwisata_count;
		return accumulator;
	}, {
		umkm: 0,
		pariwisata: 0
	}), [validPoints]);
	if (validPoints.length === 0) return /* @__PURE__ */ jsxs("section", {
		className: "overflow-hidden rounded-3xl border border-[#EFEFEF] bg-white shadow-[0_10px_30px_rgba(3,17,32,0.08)]",
		children: [/* @__PURE__ */ jsx("div", {
			className: "border-b border-[#EFEFEF] bg-gradient-to-r from-[#F7FBFF] to-white p-5 sm:p-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold tracking-[0.24em] text-[#0066AE] uppercase",
						children: "Peta Desa"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-2 text-[22px] leading-8 font-bold tracking-[-0.02em] text-[#303030]",
						children: "Map desa belum bisa ditampilkan"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 max-w-3xl text-sm leading-6 text-[#7C7C7C]",
						children: "Belum ada desa dengan koordinat latitude dan longitude yang valid di database."
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(MapStatCard, {
							icon: MapPinned,
							label: "Titik",
							value: "0"
						}),
						/* @__PURE__ */ jsx(MapStatCard, {
							icon: Store,
							label: "UMKM",
							value: "0"
						}),
						/* @__PURE__ */ jsx(MapStatCard, {
							icon: Ticket,
							label: "Pariwisata",
							value: "0"
						}),
						/* @__PURE__ */ jsx(MapStatCard, {
							icon: Building2,
							label: "Aktif",
							value: "0"
						})
					]
				})]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "flex min-h-[460px] items-center justify-center bg-[#F7F7F7] px-6 py-12 text-center",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-md",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "mx-auto flex size-14 items-center justify-center rounded-2xl bg-white text-[#0066AE] shadow-[0_8px_18px_rgba(3,17,32,0.08)]",
						children: /* @__PURE__ */ jsx(LocateFixed, {
							className: "size-6",
							strokeWidth: 2
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-base font-semibold text-[#303030]",
						children: "Koordinat desa belum tersedia"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm leading-6 text-[#7C7C7C]",
						children: "Isi latitude dan longitude pada data desa agar pin muncul di map dashboard."
					})
				]
			})
		})]
	});
	if (!modules) return /* @__PURE__ */ jsxs("section", {
		className: "overflow-hidden rounded-3xl border border-[#EFEFEF] bg-white shadow-[0_10px_30px_rgba(3,17,32,0.08)]",
		children: [/* @__PURE__ */ jsx("div", {
			className: "border-b border-[#EFEFEF] bg-gradient-to-r from-[#F7FBFF] to-white p-5 sm:p-6",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between",
				children: /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold tracking-[0.24em] text-[#0066AE] uppercase",
						children: "Peta Desa"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-2 text-[22px] leading-8 font-bold tracking-[-0.02em] text-[#303030]",
						children: "Memuat map desa"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 max-w-3xl text-sm leading-6 text-[#7C7C7C]",
						children: "Menyiapkan layer peta dan pin desa dari database."
					})
				] })
			})
		}), /* @__PURE__ */ jsx("div", { className: "h-[520px] animate-pulse bg-[#EEF4F8]" })]
	});
	const { MapContainer, Marker, TileLayer } = modules;
	return /* @__PURE__ */ jsxs("section", {
		className: "overflow-hidden rounded-3xl border border-[#EFEFEF] bg-white shadow-[0_10px_30px_rgba(3,17,32,0.08)]",
		children: [/* @__PURE__ */ jsx("div", {
			className: "border-b border-[#EFEFEF] bg-gradient-to-r from-[#F7FBFF] to-white p-5 sm:p-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold tracking-[0.24em] text-[#0066AE] uppercase",
							children: "Peta Desa"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-2 text-[22px] leading-8 font-bold tracking-[-0.02em] text-[#303030] sm:text-[26px]",
							children: "Peta Lokasi Desa Binaan"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 max-w-3xl text-sm leading-6 text-[#7C7C7C]",
							children: "Tampilan awal menampilkan keseluruhan wilayah Indonesia. Ubah gaya map lalu klik pin untuk melihat ringkasan desa."
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "w-full sm:w-[190px]",
					children: /* @__PURE__ */ jsxs(Select, {
						value: mapTheme,
						onValueChange: (value) => setMapTheme(value),
						children: [/* @__PURE__ */ jsx(SelectTrigger, {
							className: "h-10 w-full rounded-full border-[#DCE7F1] bg-white text-xs font-semibold text-[#303030] shadow-none",
							children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih style map" })
						}), /* @__PURE__ */ jsx(SelectContent, { children: Object.entries(mapThemes).map(([key, theme]) => /* @__PURE__ */ jsx(SelectItem, {
							value: key,
							children: theme.label
						}, key)) })]
					})
				})]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-0 xl:grid-cols-[minmax(0,1fr)_320px]",
			children: [/* @__PURE__ */ jsx("div", {
				className: "relative min-h-[560px] bg-[#EAF2F7]",
				children: /* @__PURE__ */ jsxs(MapContainer, {
					center: INDONESIA_CENTER,
					zoom: 5,
					minZoom: 5,
					maxBounds: INDONESIA_BOUNDS,
					maxBoundsViscosity: 1,
					scrollWheelZoom: true,
					className: "dashboard-village-map h-[560px] w-full",
					children: [/* @__PURE__ */ jsx(TileLayer, {
						attribution: mapThemes[mapTheme].attribution,
						url: mapThemes[mapTheme].url
					}), validPoints.map((point) => /* @__PURE__ */ jsx(Marker, {
						position: [point.latitude, point.longitude],
						icon: markerIcons.get(point.id),
						eventHandlers: { click: () => setSelectedVillageId(point.id) }
					}, point.id))]
				})
			}), /* @__PURE__ */ jsxs("aside", {
				className: "border-t border-[#EFEFEF] bg-[#FAFCFE] p-5 xl:border-t-0 xl:border-l xl:p-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "text-base font-bold text-[#303030]",
						children: "Ringkasan titik map"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm leading-6 text-[#7C7C7C]",
						children: "Klik pin merah untuk melihat detail desa di panel ini."
					})] }), /* @__PURE__ */ jsx("span", {
						className: "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0066AE] shadow-[0_8px_18px_rgba(3,17,32,0.06)]",
						children: /* @__PURE__ */ jsx(MapPin, { className: "size-5" })
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-5 space-y-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl border border-[#EFEFEF] bg-white p-4",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase",
									children: "Desa dipilih"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-lg font-bold text-[#303030]",
									children: selectedVillage?.name ?? "-"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm leading-6 text-[#7C7C7C]",
									children: selectedVillage?.location ?? "Klik pin untuk lihat detail desa."
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl border border-[#EFEFEF] bg-white p-4",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs font-semibold text-[#7C7C7C]",
									children: "UMKM"
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-2 text-2xl font-bold tracking-[-0.02em] text-[#0066AE]",
									children: selectedVillage ? formatCount(selectedVillage.umkm_count) : "0"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl border border-[#EFEFEF] bg-white p-4",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs font-semibold text-[#7C7C7C]",
									children: "Pariwisata"
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-2 text-2xl font-bold tracking-[-0.02em] text-[#0066AE]",
									children: selectedVillage ? formatCount(selectedVillage.pariwisata_count) : "0"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl border border-[#EFEFEF] bg-white p-4",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase",
									children: "Pengelola Desa"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-sm font-semibold text-[#303030]",
									children: selectedVillage?.manager_name ?? "-"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-xs leading-5 text-[#7C7C7C]",
									children: selectedVillage?.manager_phone ?? "Telepon belum tersedia"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs leading-5 text-[#7C7C7C]",
									children: selectedVillage?.manager_email ?? "Email belum tersedia"
								})
							]
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
//#region resources/js/components/dashboard-charts.tsx
function Panel$2({ children, className = "" }) {
	return /* @__PURE__ */ jsx("section", {
		className: `rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.06)] ${className}`,
		children
	});
}
function DashboardCharts() {
	const { props } = usePage();
	const generalReport = props.general_report || {};
	const aktivitasSurvey = props.aktivitas_survey || {};
	const statusSurvey = props.status_survey || {};
	const filters = props.filters || {};
	const [generalReportFilter, setGeneralReportFilter] = useState(filters.general_report_filter || "Bulan Ini");
	const [programTypeFilter, setProgramTypeFilter] = useState(filters.program_type || "Semua Program");
	const [activityFilter, setActivityFilter] = useState(filters.activity_filter || "30 Hari Terakhir");
	const [statusFilter, setStatusFilter] = useState(filters.status_filter || "Tahun Ini");
	useEffect(() => {
		setGeneralReportFilter(filters.general_report_filter || "Bulan Ini");
		setProgramTypeFilter(filters.program_type || "Semua Program");
		setActivityFilter(filters.activity_filter || "30 Hari Terakhir");
		setStatusFilter(filters.status_filter || "Tahun Ini");
	}, [
		filters.activity_filter,
		filters.general_report_filter,
		filters.program_type,
		filters.status_filter
	]);
	const updateFilter = (key, value) => {
		if (key === "general_report_filter") setGeneralReportFilter(value);
		if (key === "program_type") setProgramTypeFilter(value);
		if (key === "activity_filter") setActivityFilter(value);
		if (key === "status_filter") setStatusFilter(value);
		router.get(route("dashboard"), {
			...filters,
			[key]: value
		}, {
			preserveState: true,
			preserveScroll: true,
			only: [
				"general_report",
				"aktivitas_survey",
				"status_survey",
				"filters"
			]
		});
	};
	const areaData = generalReport.area_data || [];
	const barData = aktivitasSurvey.bar_data || [];
	const pieData = statusSurvey.pie_data || [];
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-2 grid grid-cols-1 gap-4 lg:grid-cols-3",
		children: [
			/* @__PURE__ */ jsxs(Panel$2, {
				className: "flex flex-col p-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-bold text-[#303030]",
						children: "General Report"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsxs("button", {
								className: "flex cursor-pointer items-center gap-1 rounded-md border border-[#0066AE] bg-[#0066AE] px-2 py-1 text-xs font-semibold text-white outline-none hover:bg-[#005a9c]",
								children: [
									programTypeFilter,
									" ",
									/* @__PURE__ */ jsx(ChevronDown, { className: "size-3" })
								]
							})
						}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
							align: "end",
							className: "w-[140px]",
							children: [
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("program_type", "Semua Program"),
									children: "Semua Program"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("program_type", "KEMENPAR"),
									children: "KEMENPAR"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("program_type", "UMKM"),
									children: "UMKM"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("program_type", "ISTC"),
									children: "ISTC"
								})
							]
						})] }), /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsxs("button", {
								className: "flex cursor-pointer items-center gap-1 rounded-md border border-[#0066AE] bg-[#0066AE] px-2 py-1 text-xs font-semibold text-white outline-none hover:bg-[#005a9c]",
								children: [
									generalReportFilter,
									" ",
									/* @__PURE__ */ jsx(ChevronDown, { className: "size-3" })
								]
							})
						}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
							align: "end",
							className: "w-[130px]",
							children: [
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("general_report_filter", "Hari Ini"),
									children: "Hari Ini"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("general_report_filter", "Bulan Ini"),
									children: "Bulan Ini"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("general_report_filter", "Tahun Ini"),
									children: "Tahun Ini"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("general_report_filter", "2025"),
									children: "2025"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("general_report_filter", "2024"),
									children: "2024"
								})
							]
						})] })]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-1 gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-1 flex-col justify-between",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("p", {
									className: "mb-1 text-xs font-semibold text-[#303030]",
									children: "Ringkasan Assessment"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-[10px] text-[#7C7C7C]",
									children: "Rata-rata Total Skor"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-1 flex items-end gap-2",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-3xl leading-none font-bold text-[#303030]",
											children: generalReport.average_score ?? 0
										}),
										/* @__PURE__ */ jsx("span", {
											className: "pb-0.5 text-xs font-semibold text-[#7C7C7C]",
											children: "/ 100"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "ml-1 rounded bg-[#EAF8F0] px-1.5 py-0.5 text-[10px] font-bold text-[#00893D]",
											children: "Baik"
										})
									]
								})
							] }),
							/* @__PURE__ */ jsx("div", {
								className: "mt-2 h-24 w-full",
								children: /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ jsxs(AreaChart, {
										data: areaData,
										margin: {
											top: 5,
											right: 0,
											left: 0,
											bottom: 0
										},
										children: [/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
											id: "colorScore",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ jsx("stop", {
												offset: "5%",
												stopColor: "#0066AE",
												stopOpacity: .3
											}), /* @__PURE__ */ jsx("stop", {
												offset: "95%",
												stopColor: "#0066AE",
												stopOpacity: 0
											})]
										}) }), /* @__PURE__ */ jsx(Area, {
											type: "monotone",
											dataKey: "score",
											stroke: "#0066AE",
											strokeWidth: 2,
											fillOpacity: 1,
											fill: "url(#colorScore)"
										})]
									})
								})
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-2 flex items-center gap-1 text-[10px] font-semibold text-[#00893D]",
								children: [
									/* @__PURE__ */ jsx(ArrowUpRight, { className: "size-3" }),
									" ",
									generalReport.trend ?? "+0%",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "font-medium text-[#7C7C7C]",
										children: "dibanding bulan lalu"
									})
								]
							}),
							/* @__PURE__ */ jsxs(Link, {
								href: surveyAssignments.url(),
								className: "mt-4 flex justify-center w-full rounded-lg border border-[#0066AE] py-2 text-xs font-bold text-[#0066AE] transition hover:bg-[#F8FBFE]",
								children: ["Lihat Detail Laporan ", /* @__PURE__ */ jsx(ChevronRight, { className: "inline size-3 ml-1" })]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex w-[130px] flex-col justify-between border-l border-[#EFEFEF] py-1 pl-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] text-[#7C7C7C]",
								children: "Total Assessment"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-bold text-[#303030]",
									children: generalReport.total_assessment ?? 0
								}), /* @__PURE__ */ jsxs("span", {
									className: "flex items-center text-[10px] font-bold text-[#00893D]",
									children: [/* @__PURE__ */ jsx(ArrowUpRight, { className: "size-2.5" }), " 2"]
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] text-[#7C7C7C]",
								children: "Selesai"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-bold text-[#303030]",
									children: generalReport.selesai ?? 0
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-[10px] font-semibold text-[#7C7C7C]",
									children: [generalReport.total_assessment > 0 ? Math.round(generalReport.selesai / generalReport.total_assessment * 100) : 0, "%"]
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] text-[#7C7C7C]",
								children: "Dalam Proses"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-bold text-[#303030]",
									children: generalReport.dalam_proses ?? 0
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-[10px] font-semibold text-[#7C7C7C]",
									children: [generalReport.total_assessment > 0 ? Math.round(generalReport.dalam_proses / generalReport.total_assessment * 100) : 0, "%"]
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] text-[#7C7C7C]",
								children: "Belum Dimulai"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-bold text-[#303030]",
									children: generalReport.belum_dimulai ?? 0
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-[10px] font-semibold text-[#7C7C7C]",
									children: [generalReport.total_assessment > 0 ? Math.round(generalReport.belum_dimulai / generalReport.total_assessment * 100) : 0, "%"]
								})]
							})] }),
							/* @__PURE__ */ jsxs("div", {
								className: "border-t border-[#EFEFEF] pt-2",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[10px] text-[#7C7C7C]",
									children: "Total Program CSR"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-bold text-[#303030]",
										children: generalReport.total_program_csr ?? 0
									}), /* @__PURE__ */ jsxs("span", {
										className: "flex items-center text-[10px] font-bold text-[#00893D]",
										children: [/* @__PURE__ */ jsx(ArrowUpRight, { className: "size-2.5" }), " 1"]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-[10px] text-[#7C7C7C]",
									children: "Total Anggaran"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex items-center justify-between",
									children: /* @__PURE__ */ jsxs("p", {
										className: "text-xs font-bold text-[#303030]",
										children: ["Rp", (generalReport.total_anggaran ?? 0).toLocaleString("id-ID")]
									})
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "mt-0.5 flex items-center text-[10px] font-bold text-[#00893D]",
									children: [/* @__PURE__ */ jsx(ArrowUpRight, { className: "size-2.5" }), " 15%"]
								})
							] })
						]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs(Panel$2, {
				className: "flex flex-col p-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-sm font-bold text-[#303030]",
							children: "Aktivitas Survey"
						}), /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsxs("button", {
								className: "flex cursor-pointer items-center gap-1 rounded-md border border-[#0066AE] bg-[#0066AE] px-2 py-1 text-xs font-semibold text-white outline-none hover:bg-[#005a9c]",
								children: [
									activityFilter,
									" ",
									/* @__PURE__ */ jsx(ChevronDown, { className: "size-3" })
								]
							})
						}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
							align: "end",
							className: "w-[140px]",
							children: [
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("activity_filter", "7 Hari Terakhir"),
									children: "7 Hari Terakhir"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("activity_filter", "30 Hari Terakhir"),
									children: "30 Hari Terakhir"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("activity_filter", "Tahun Ini"),
									children: "Tahun Ini"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("activity_filter", "2025"),
									children: "2025"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("activity_filter", "2024"),
									children: "2024"
								})
							]
						})] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-center gap-4 text-[10px] font-semibold text-[#7C7C7C]",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-[#0066AE]" }),
									" ",
									"Selesai"
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-[#2FA6FC]" }),
									" ",
									"Dalam Proses"
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-[#DCE3EA]" }),
									" ",
									"Belum Dimulai"
								]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "min-h-[180px] flex-1",
						children: /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ jsxs(BarChart, {
								data: barData,
								margin: {
									top: 0,
									right: 0,
									left: -25,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ jsx(CartesianGrid, {
										strokeDasharray: "3 3",
										vertical: false,
										stroke: "#EFEFEF"
									}),
									/* @__PURE__ */ jsx(XAxis, {
										dataKey: "name",
										axisLine: false,
										tickLine: false,
										tick: {
											fontSize: 10,
											fill: "#7C7C7C"
										},
										dy: 10
									}),
									/* @__PURE__ */ jsx(YAxis, {
										axisLine: false,
										tickLine: false,
										tick: {
											fontSize: 10,
											fill: "#7C7C7C"
										}
									}),
									/* @__PURE__ */ jsx(Tooltip, {
										cursor: { fill: "#F8FBFE" },
										contentStyle: {
											borderRadius: "8px",
											border: "none",
											boxShadow: "0 4px 14px rgba(3,17,32,0.08)",
											fontSize: "12px"
										}
									}),
									/* @__PURE__ */ jsx(Bar, {
										dataKey: "selesai",
										fill: "#0066AE",
										radius: [
											2,
											2,
											0,
											0
										],
										barSize: 8
									}),
									/* @__PURE__ */ jsx(Bar, {
										dataKey: "proses",
										fill: "#2FA6FC",
										radius: [
											2,
											2,
											0,
											0
										],
										barSize: 8
									}),
									/* @__PURE__ */ jsx(Bar, {
										dataKey: "belum",
										fill: "#DCE3EA",
										radius: [
											2,
											2,
											0,
											0
										],
										barSize: 8
									})
								]
							})
						})
					}),
					/* @__PURE__ */ jsxs(Link, {
						href: surveyAssignments.url(),
						className: "mt-4 flex justify-center w-full rounded-lg border border-[#EFEFEF] py-2 text-xs font-bold text-[#0066AE] transition hover:bg-[#F8FBFE]",
						children: [
							"Lihat Semua Aktivitas",
							" ",
							/* @__PURE__ */ jsx(ChevronRight, { className: "inline size-3 ml-1" })
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs(Panel$2, {
				className: "flex flex-col p-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-sm font-bold text-[#303030]",
							children: "Status Survey"
						}), /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsxs("button", {
								className: "flex cursor-pointer items-center gap-1 rounded-md border border-[#0066AE] bg-[#0066AE] px-2 py-1 text-xs font-semibold text-white outline-none hover:bg-[#005a9c]",
								children: [
									statusFilter,
									" ",
									/* @__PURE__ */ jsx(ChevronDown, { className: "size-3" })
								]
							})
						}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
							align: "end",
							className: "w-[140px]",
							children: [
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("status_filter", "Bulan Ini"),
									children: "Bulan Ini"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("status_filter", "Tahun Ini"),
									children: "Tahun Ini"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("status_filter", "2025"),
									children: "2025"
								}),
								/* @__PURE__ */ jsx(DropdownMenuItem, {
									className: "cursor-pointer text-xs",
									onSelect: () => updateFilter("status_filter", "2024"),
									children: "2024"
								})
							]
						})] })]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "relative flex flex-1 flex-col items-center justify-center",
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative flex h-[140px] w-[140px] items-center justify-center",
							children: [/* @__PURE__ */ jsx(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ jsx(PieChart$1, { children: /* @__PURE__ */ jsx(Pie, {
									data: pieData,
									innerRadius: 50,
									outerRadius: 70,
									paddingAngle: 2,
									dataKey: "value",
									stroke: "none",
									children: pieData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, `cell-${index}`))
								}) })
							}), /* @__PURE__ */ jsxs("div", {
								className: "absolute inset-0 flex flex-col items-center justify-center",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[10px] font-semibold text-[#7C7C7C]",
									children: "Total"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-2xl font-bold text-[#303030]",
									children: statusSurvey.total ?? 0
								})]
							})]
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 space-y-3",
						children: pieData.map((item) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "size-2.5 rounded-full",
									style: { backgroundColor: item.color }
								}), /* @__PURE__ */ jsx("span", {
									className: "font-semibold text-[#7C7C7C]",
									children: item.name
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "font-bold text-[#303030]",
								children: [
									item.value,
									" ",
									/* @__PURE__ */ jsxs("span", {
										className: "font-medium text-[#7C7C7C]",
										children: [
											"(",
											statusSurvey.total > 0 ? item.value / statusSurvey.total * 100 : 0,
											"%)"
										]
									})
								]
							})]
						}, item.name))
					}),
					/* @__PURE__ */ jsxs(Link, {
						href: surveyAssignments.url(),
						className: "mt-6 flex w-full items-center justify-between border-t border-[#EFEFEF] pt-3 text-xs font-bold text-[#0066AE] transition hover:text-[#093967]",
						children: ["Lihat Detail ", /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" })]
					})
				]
			})
		]
	});
}
//#endregion
//#region resources/js/components/dashboard-omset-charts.tsx
function Panel$1({ children, className = "" }) {
	return /* @__PURE__ */ jsx("section", {
		className: `rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.06)] ${className}`,
		children
	});
}
var emptyChart = {
	data: [],
	trend: "+0%",
	total: 0
};
function formatTotal(value) {
	if (value >= 1e9) return `Rp${(value / 1e9).toFixed(2)} Miliar`;
	if (value >= 1e6) return `Rp${(value / 1e6).toFixed(2)} Juta`;
	return `Rp${value.toLocaleString("id-ID")}`;
}
function formatAxis(value) {
	if (value === 0) return "Rp0";
	if (value >= 1e9) return `Rp${(value / 1e9).toFixed(0)}M`;
	if (value >= 1e6) return `Rp${(value / 1e6).toFixed(0)}Jt`;
	if (value >= 1e3) return `Rp${(value / 1e3).toFixed(0)}Rb`;
	return `Rp${value}`;
}
function formatTooltip(value) {
	if (value >= 1e9) return [`Rp${(value / 1e9).toFixed(2)} Miliar`, "Omset"];
	if (value >= 1e6) return [`Rp${(value / 1e6).toFixed(2)} Juta`, "Omset"];
	return [`Rp${value.toLocaleString("id-ID")}`, "Omset"];
}
function OmsetChartPanel({ title, description, chart, color, gradientId }) {
	const TrendIcon = chart.trend.startsWith("-") ? TrendingDown : TrendingUp;
	return /* @__PURE__ */ jsxs(Panel$1, {
		className: "flex flex-col p-4",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "mb-4 flex items-center justify-between",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-sm font-bold text-[#303030]",
					children: title
				}), /* @__PURE__ */ jsx("p", {
					className: "text-[10px] text-[#7C7C7C]",
					children: description
				})] })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-2 flex items-end gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-2xl leading-none font-bold text-[#303030]",
					children: formatTotal(chart.total)
				}), /* @__PURE__ */ jsxs("span", {
					className: `flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold ${chart.trend.startsWith("-") ? "bg-[#FDECEC] text-[#D81313]" : "bg-[#EAF8F0] text-[#00893D]"}`,
					children: [
						/* @__PURE__ */ jsx(TrendIcon, { className: "size-2.5" }),
						" ",
						chart.trend
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-2 h-64 w-full",
				children: /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ jsxs(AreaChart, {
						data: chart.data,
						margin: {
							top: 10,
							right: 0,
							left: -20,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
								id: gradientId,
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ jsx("stop", {
									offset: "5%",
									stopColor: color,
									stopOpacity: .3
								}), /* @__PURE__ */ jsx("stop", {
									offset: "95%",
									stopColor: color,
									stopOpacity: 0
								})]
							}) }),
							/* @__PURE__ */ jsx(CartesianGrid, {
								strokeDasharray: "3 3",
								vertical: false,
								stroke: "#EFEFEF"
							}),
							/* @__PURE__ */ jsx(XAxis, {
								dataKey: "year",
								axisLine: false,
								tickLine: false,
								tick: {
									fontSize: 10,
									fill: "#7C7C7C"
								},
								dy: 10
							}),
							/* @__PURE__ */ jsx(YAxis, {
								axisLine: false,
								tickLine: false,
								tick: {
									fontSize: 10,
									fill: "#7C7C7C"
								},
								tickFormatter: formatAxis
							}),
							/* @__PURE__ */ jsx(Tooltip, {
								formatter: formatTooltip,
								cursor: {
									stroke: color,
									strokeWidth: 1,
									strokeDasharray: "3 3",
									fill: "transparent"
								},
								contentStyle: {
									borderRadius: "8px",
									border: "none",
									boxShadow: "0 4px 14px rgba(3,17,32,0.08)",
									fontSize: "12px"
								}
							}),
							/* @__PURE__ */ jsx(Area, {
								type: "monotone",
								dataKey: "omset",
								stroke: color,
								strokeWidth: 2,
								fillOpacity: 1,
								fill: `url(#${gradientId})`,
								activeDot: {
									r: 4,
									fill: color,
									stroke: "#fff",
									strokeWidth: 2
								}
							})
						]
					})
				})
			})
		]
	});
}
function DashboardOmsetCharts() {
	const { props } = usePage();
	const omsetCharts = props.omset_charts || {
		umkm: emptyChart,
		wisata: emptyChart
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-1 gap-4 lg:grid-cols-2",
		children: [/* @__PURE__ */ jsx(OmsetChartPanel, {
			title: "Omset UMKM",
			description: "Pertumbuhan total omset UMKM desa per tahun",
			chart: omsetCharts.umkm || emptyChart,
			color: "#FF944C",
			gradientId: "colorUmkm"
		}), /* @__PURE__ */ jsx(OmsetChartPanel, {
			title: "Omset Pariwisata",
			description: "Pertumbuhan total pendapatan tiket & layanan wisata per tahun",
			chart: omsetCharts.wisata || emptyChart,
			color: "#0066AE",
			gradientId: "colorWisata"
		})]
	});
}
//#endregion
//#region resources/js/pages/dashboard.tsx
var kpiIcons = {
	map: MapPin,
	clipboard: ClipboardCheck,
	search: FileSearch,
	trending: TrendingUp,
	store: Store,
	ticket: Ticket
};
function statusClass(status) {
	if (status === "submitted" || status === "Submitted") return "bg-[#EAF7FF] text-[#0066AE]";
	if (status === "approved" || status === "Approved") return "bg-[#EAF8F0] text-[#00893D]";
	if (status === "need_revision" || status === "Need Revision") return "bg-[#FFF4EA] text-[#C9681E]";
	if (status === "rejected" || status === "Rejected") return "bg-[#FDECEC] text-[#D81313]";
	if (status === "assigned" || status === "Draft") return "bg-[#F7F7F7] text-[#7C7C7C]";
	return "bg-[#F1F5F8] text-[#0066AE]";
}
function CurrentTimeCard() {
	const [mounted, setMounted] = useState(false);
	const [now, setNow] = useState(() => /* @__PURE__ */ new Date());
	useEffect(() => {
		setMounted(true);
		const timer = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(timer);
	}, []);
	const time = new Intl.DateTimeFormat("id-ID", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false
	}).format(mounted ? now : /* @__PURE__ */ new Date("2026-06-10T09:17:49"));
	const date = new Intl.DateTimeFormat("id-ID", {
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "numeric"
	}).format(mounted ? now : /* @__PURE__ */ new Date("2026-06-10T09:17:49"));
	return /* @__PURE__ */ jsx("section", {
		className: "rounded-xl border border-[#0066AE] bg-[#0066AE] p-3.5 shadow-[0_4px_14px_rgba(0,102,174,0.3)] sm:p-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-sm leading-5 font-semibold text-[#AAD2F8]",
						children: "Jam Sekarang"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 font-tight text-[22px] leading-7 font-bold tracking-[-0.02em] text-white sm:text-[28px] sm:leading-8",
						children: time
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs leading-5 text-[#EAF3FF]",
						children: date
					})
				]
			}), /* @__PURE__ */ jsx("span", {
				className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white shadow-inner sm:size-11",
				children: /* @__PURE__ */ jsx(Timer, {
					className: "size-6",
					strokeWidth: 1.9
				})
			})]
		})
	});
}
function Panel({ children, className = "", style }) {
	return /* @__PURE__ */ jsx("section", {
		className: `rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.06)] ${className}`,
		style,
		children
	});
}
function TopStatisticList({ title, icon: Icon, data, linkHref, linkLabel }) {
	return /* @__PURE__ */ jsxs(Panel, {
		className: "flex h-full flex-col p-4",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "mb-4 flex items-center justify-between gap-3",
				children: /* @__PURE__ */ jsx("h2", {
					className: "text-sm leading-6 font-bold text-[#303030]",
					children: title
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-1 flex-col space-y-3",
				children: data.length > 0 ? data.map((item, index) => /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "w-4 text-left text-xs font-bold text-[#303030]",
								children: index + 1
							}),
							/* @__PURE__ */ jsx("span", {
								className: "flex size-8 items-center justify-center rounded-full bg-[#F1F5F8] text-[#0066AE]",
								children: /* @__PURE__ */ jsx(Icon, {
									className: "size-4",
									strokeWidth: 2
								})
							}),
							/* @__PURE__ */ jsx("span", {
								className: "line-clamp-1 max-w-[120px] text-sm font-semibold text-[#303030]",
								children: item.label
							})
						]
					}), /* @__PURE__ */ jsx("span", {
						className: "text-sm font-bold text-[#303030]",
						children: item.value
					})]
				}, index)) : /* @__PURE__ */ jsx("div", {
					className: "rounded-xl border border-dashed border-[#DCE3EA] bg-[#F8FBFE] px-3 py-6 text-center text-sm font-semibold text-[#7C7C7C]",
					children: "Belum ada data."
				})
			}),
			/* @__PURE__ */ jsxs(Link, {
				href: linkHref,
				className: "mt-4 flex w-full justify-between rounded-lg bg-[#F8FBFE] px-4 py-2.5 text-xs font-bold text-[#0066AE] transition hover:bg-[#EAF3FF]",
				children: [
					linkLabel,
					" ",
					/* @__PURE__ */ jsx(ChevronRight, { className: "size-4" })
				]
			})
		]
	});
}
function TopVillageSurveyTable({ rows }) {
	return /* @__PURE__ */ jsxs(Panel, {
		className: "p-3.5 sm:p-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex items-center justify-between gap-4",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-base leading-6 font-bold text-[#303030]",
				children: "Top Desa dengan Skor Survey Tertinggi"
			}), /* @__PURE__ */ jsx("span", {
				className: "rounded-lg bg-[#F8FBFE] px-3 py-2 text-xs font-bold text-[#0066AE]",
				children: "Top 5"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[920px] border-collapse text-left text-sm",
				children: [/* @__PURE__ */ jsx("thead", {
					className: "border-b border-[#EFEFEF] text-[11px] font-bold tracking-wider text-[#7C7C7C] uppercase",
					children: /* @__PURE__ */ jsx("tr", { children: [
						"Peringkat",
						"Desa Wisata",
						"Lokasi",
						"Total Skor",
						"Jawaban",
						"Status",
						"Aksi"
					].map((head) => /* @__PURE__ */ jsx("th", {
						className: "h-10 px-2 font-bold whitespace-nowrap first:pl-0 last:pr-0",
						children: head
					}, head)) })
				}), /* @__PURE__ */ jsx("tbody", {
					className: "divide-y divide-[#EFEFEF] bg-white",
					children: rows.length > 0 ? rows.map((row, index) => /* @__PURE__ */ jsxs("tr", {
						className: "h-14 transition-colors hover:bg-[#F8FBFE]",
						children: [
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-2 whitespace-nowrap first:pl-0",
								children: /* @__PURE__ */ jsx("span", {
									className: "inline-flex size-8 items-center justify-center rounded-lg bg-[#EAF3FF] text-xs font-black text-[#0066AE]",
									children: index + 1
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-2 whitespace-nowrap",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "size-8 shrink-0 overflow-hidden rounded-lg bg-gray-200",
										children: /* @__PURE__ */ jsx("img", {
											src: `https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=random`,
											alt: row.name,
											className: "h-full w-full object-cover"
										})
									}), /* @__PURE__ */ jsx("span", {
										className: "font-bold text-[#303030]",
										children: row.name
									})]
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-2 whitespace-nowrap",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-xs text-[#303030]",
									children: row.meta
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-2 whitespace-nowrap",
								children: /* @__PURE__ */ jsx("span", {
									className: "font-black text-[#303030] tabular-nums",
									children: Number(row.score).toLocaleString("id-ID")
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-2 text-xs whitespace-nowrap text-[#303030]",
								children: row.answers
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-2",
								children: /* @__PURE__ */ jsx("span", {
									className: `inline-flex h-6 min-w-20 items-center justify-center rounded-md px-2 text-[10px] font-bold ${statusClass(row.status)}`,
									children: row.status_label ?? row.status
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-2 text-center last:pr-0",
								children: row.url ? /* @__PURE__ */ jsx(Link, {
									href: row.url,
									className: "inline-flex size-8 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#F1F5F8]",
									"aria-label": `Detail ${row.name}`,
									children: /* @__PURE__ */ jsx(Eye, { className: "size-4" })
								}) : /* @__PURE__ */ jsx("span", {
									className: "inline-flex size-8 items-center justify-center rounded-lg text-[#B0B0B0]",
									children: /* @__PURE__ */ jsx(Eye, { className: "size-4" })
								})
							})
						]
					}, row.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 7,
						className: "px-2 py-8 text-center text-sm font-semibold text-[#7C7C7C]",
						children: "Belum ada data skor survey desa."
					}) })
				})]
			})
		})]
	});
}
function Dashboard({ dashboard_mode = "admin", kpis = [], village_map_points = [], top_village_surveys = [], top_umkm_surveys = [], top_pariwisata_surveys = [], top_umkm_turnovers = [], top_pariwisata_turnovers = [], top_umkm_categories = [], recent_assignments = [], filters = {} }) {
	const { auth } = usePage().props;
	filters.program_type;
	if (dashboard_mode === "enumerator") return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Dashboard Enumerator" }), /* @__PURE__ */ jsx("div", {
		className: "min-w-0 bg-[#F7F7F7] px-4 py-4 text-[#303030] sm:px-5 lg:px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex max-w-[1500px] flex-col gap-4",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "rounded-xl border border-[#EFEFEF] bg-white p-5 shadow-[0_4px_14px_rgba(3,17,32,0.06)] sm:p-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-2 flex items-center gap-2 text-xs font-semibold text-[#7C7C7C]",
					children: [
						/* @__PURE__ */ jsx("span", { children: "Dashboard" }),
						/* @__PURE__ */ jsx(ChevronRight, {
							className: "size-3.5",
							strokeWidth: 2
						}),
						/* @__PURE__ */ jsx("span", { children: "Enumerator" })
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-semibold text-[#0066AE]",
								children: "Selamat datang,"
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "mt-1 text-[24px] leading-8 font-bold tracking-[-0.01em] text-[#303030] sm:text-[30px] sm:leading-9",
								children: auth.user.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 max-w-2xl text-sm leading-6 text-[#7C7C7C]",
								children: "Anda masuk sebagai enumerator. Gunakan menu Survey Assignment untuk melihat dan mengisi data assessment yang ditugaskan."
							})
						]
					}), /* @__PURE__ */ jsxs(Link, {
						href: surveyAssignments.url(),
						className: "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] sm:w-auto",
						children: [/* @__PURE__ */ jsx(ClipboardCheck, {
							className: "size-4",
							strokeWidth: 2
						}), "Lihat Assignment"]
					})]
				})]
			}), /* @__PURE__ */ jsx(Panel, {
				className: "p-5 sm:p-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-start",
					children: [/* @__PURE__ */ jsx("span", {
						className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F8] text-[#0066AE]",
						children: /* @__PURE__ */ jsx(Info, {
							className: "size-5",
							strokeWidth: 2
						})
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "text-base leading-6 font-bold text-[#303030]",
						children: "Akses Enumerator"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm leading-6 text-[#7C7C7C]",
						children: "Menu dashboard admin, template survey, dan manajemen user dibatasi untuk admin. Jika membutuhkan akses tambahan, hubungi admin platform."
					})] })]
				})
			})]
		})
	})] });
	const [showBanner, setShowBanner] = useState(true);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Dashboard Admin" }), /* @__PURE__ */ jsx("div", {
		className: "min-w-0 bg-[#F7F7F7] px-4 py-4 text-[#303030] sm:px-5 lg:px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex max-w-[1500px] flex-col gap-4",
			children: [
				/* @__PURE__ */ jsxs("header", {
					className: "mb-2 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ jsx("div", {
						className: "min-w-0",
						children: /* @__PURE__ */ jsxs("div", {
							className: "mb-1 flex items-center gap-2 text-xs font-semibold text-[#7C7C7C]",
							children: [
								/* @__PURE__ */ jsx("span", { children: "Dashboard" }),
								/* @__PURE__ */ jsx(ChevronRight, {
									className: "size-3.5",
									strokeWidth: 2
								}),
								/* @__PURE__ */ jsx("span", { children: "Admin" })
							]
						})
					}), /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:shrink-0" })]
				}),
				showBanner && /* @__PURE__ */ jsxs("div", {
					className: "mb-2 flex items-center justify-between rounded-lg bg-[#0066AE] px-4 py-3 text-sm font-semibold text-white shadow-sm",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Info, { className: "size-5" }), /* @__PURE__ */ jsx("span", { children: "Pantau assessment desa wisata dan program CSR BCA secara real-time dalam satu platform." })]
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setShowBanner(false),
						className: "text-white hover:text-gray-200",
						children: /* @__PURE__ */ jsx(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ jsx("section", {
					className: "mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
					children: [{ type: "time" }, ...kpis.slice(0, 3).map((kpi) => ({
						type: "kpi",
						data: kpi
					}))].map((item, index) => {
						if (item.type === "time") return /* @__PURE__ */ jsx(CurrentTimeCard, {}, "time");
						if (!("data" in item) || !item.data) return null;
						const kpi = item.data;
						const Icon = kpiIcons[kpi.icon];
						if (!Icon) return null;
						const trendColor = kpi.tone === "success" ? "text-[#00893D]" : "text-[#FF944C]";
						return /* @__PURE__ */ jsxs(Panel, {
							className: "p-3.5 sm:p-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex items-start justify-between gap-3",
								children: /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsxs("p", {
										className: "flex items-center gap-2 text-sm leading-5 font-bold text-[#303030]",
										children: [/* @__PURE__ */ jsx("span", {
											className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0066AE] text-white",
											children: /* @__PURE__ */ jsx(Icon, {
												className: "size-4",
												strokeWidth: 2
											})
										}), kpi.title]
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-3 text-[28px] leading-7 font-bold tracking-[-0.02em] text-[#303030] sm:text-[32px] sm:leading-8",
										children: kpi.value
									})]
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-4 flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-medium text-[#7C7C7C]",
									children: kpi.desc
								}), /* @__PURE__ */ jsxs("p", {
									className: `flex items-center gap-1 font-bold ${trendColor}`,
									children: [/* @__PURE__ */ jsx(ArrowUpRight, {
										className: "size-3.5",
										strokeWidth: 2.2
									}), kpi.trend]
								})]
							})]
						}, kpi.title);
					})
				}),
				/* @__PURE__ */ jsx(DashboardCharts, {}),
				/* @__PURE__ */ jsx("div", {
					className: "mb-2",
					children: /* @__PURE__ */ jsx(DashboardVillageMap, { points: village_map_points })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs(Panel, {
						className: "flex items-center overflow-hidden border-none p-0",
						style: { backgroundColor: "#EAF2FE" },
						children: [/* @__PURE__ */ jsxs("div", {
							className: "z-10 flex-[1.5] p-5 pl-6",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "mb-1 text-[17px] font-bold text-[#0039A6]",
									children: "Dukung Desa Wisata, Dukung Indonesia"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mb-4 text-xs font-medium text-[#4D6B99]",
									children: "Kelola program CSR BCA dan bantu desa wisata tumbuh berkelanjutan."
								}),
								/* @__PURE__ */ jsxs(Link, {
									href: surveyAssignments.url(),
									className: "inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#0039A6] pr-1 pl-4 text-xs font-bold text-white transition hover:bg-[#002B7F]",
									children: ["Kelola Program CSR", /* @__PURE__ */ jsx("span", {
										className: "flex size-7 items-center justify-center rounded-full bg-white text-[#0039A6]",
										children: /* @__PURE__ */ jsx(ArrowRight, {
											className: "size-3.5",
											strokeWidth: 3
										})
									})]
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "flex-1 shrink-0 bg-[#EAF2FE]",
							children: /* @__PURE__ */ jsx("img", {
								src: "/images/desa-wisata-illustration.png",
								className: "h-[140px] w-full object-cover object-left mix-blend-multiply",
								alt: "CSR"
							})
						})]
					}), /* @__PURE__ */ jsxs(Panel, {
						className: "flex items-center overflow-hidden border-none p-0",
						style: { backgroundColor: "#E8F5E9" },
						children: [/* @__PURE__ */ jsxs("div", {
							className: "z-10 flex-[1.5] p-5 pl-6",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "mb-1 text-[17px] font-bold text-[#1B5E20]",
									children: "Buat Assignment Survey Baru"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mb-4 text-xs font-medium text-[#4CAF50]",
									children: "Undang enumerator dan mulai assessment dengan mudah dan terstruktur."
								}),
								/* @__PURE__ */ jsxs(Link, {
									href: surveyAssignments.url(),
									className: "inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#4CAF50] pr-1 pl-4 text-xs font-bold text-white transition hover:bg-[#388E3C]",
									children: ["Buat Assignment", /* @__PURE__ */ jsx("span", {
										className: "flex size-7 items-center justify-center rounded-full bg-white text-[#4CAF50]",
										children: /* @__PURE__ */ jsx(ArrowRight, {
											className: "size-3.5",
											strokeWidth: 3
										})
									})]
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "flex-1 shrink-0 bg-[#E8F5E9]",
							children: /* @__PURE__ */ jsx("img", {
								src: "/images/survey-clipboard-illustration.png",
								className: "h-[140px] w-full object-cover object-left mix-blend-multiply",
								alt: "Survey"
							})
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-4 space-y-4",
					children: [
						/* @__PURE__ */ jsxs(Panel, {
							className: "p-3.5 sm:p-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-3 flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-base leading-6 font-bold text-[#303030]",
									children: "Assignment Survey Terbaru"
								}), /* @__PURE__ */ jsx(Link, {
									href: surveyAssignments.url(),
									className: "inline-flex h-8 items-center justify-center rounded-lg bg-[#F8FBFE] px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#EAF3FF]",
									children: "Lihat Semua"
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full min-w-[880px] border-collapse text-left text-sm",
									children: [/* @__PURE__ */ jsx("thead", {
										className: "border-b border-[#EFEFEF] text-[11px] font-bold tracking-wider text-[#7C7C7C] uppercase",
										children: /* @__PURE__ */ jsx("tr", { children: [
											"Desa Wisata",
											"Lokasi",
											"Status",
											"Update Terakhir",
											"Aksi"
										].map((head) => /* @__PURE__ */ jsx("th", {
											className: "h-10 px-2 font-bold whitespace-nowrap first:pl-0 last:pr-0",
											children: head
										}, head)) })
									}), /* @__PURE__ */ jsx("tbody", {
										className: "divide-y divide-[#EFEFEF] bg-white",
										children: recent_assignments.map((row) => /* @__PURE__ */ jsxs("tr", {
											className: "h-14 transition-colors hover:bg-[#F8FBFE]",
											children: [
												/* @__PURE__ */ jsx("td", {
													className: "px-2 py-2 whitespace-nowrap first:pl-0",
													children: /* @__PURE__ */ jsxs("div", {
														className: "flex items-center gap-3",
														children: [/* @__PURE__ */ jsx("div", {
															className: "size-8 shrink-0 overflow-hidden rounded-lg bg-gray-200",
															children: /* @__PURE__ */ jsx("img", {
																src: `https://ui-avatars.com/api/?name=${encodeURIComponent(row.village)}&background=random`,
																alt: row.village,
																className: "h-full w-full object-cover"
															})
														}), /* @__PURE__ */ jsx("span", {
															className: "font-bold text-[#303030]",
															children: row.village
														})]
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-2 py-2 whitespace-nowrap",
													children: /* @__PURE__ */ jsx("p", {
														className: "text-xs text-[#303030]",
														children: row.location
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-2 py-2",
													children: /* @__PURE__ */ jsx("span", {
														className: `inline-flex h-6 min-w-20 items-center justify-center rounded-md px-2 text-[10px] font-bold ${statusClass(row.status)}`,
														children: row.status_label
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-2 py-2 text-xs whitespace-nowrap text-[#303030]",
													children: row.updated_at
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-2 py-2 text-center last:pr-0",
													children: /* @__PURE__ */ jsx(Link, {
														href: show.url(row.code),
														className: "inline-flex size-8 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#F1F5F8]",
														"aria-label": `Detail ${row.village}`,
														children: /* @__PURE__ */ jsx(Eye, { className: "size-4" })
													})
												})
											]
										}, row.id))
									})]
								})
							})]
						}),
						/* @__PURE__ */ jsx(TopVillageSurveyTable, { rows: top_village_surveys.slice(0, 5) }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-4 xl:grid-cols-3",
							children: [
								/* @__PURE__ */ jsx(TopStatisticList, {
									title: "Top 3 Omset UMKM",
									icon: Store,
									data: top_umkm_turnovers.slice(0, 3).map((item) => ({
										label: item.name,
										value: `Rp${Number(item.score).toLocaleString("id-ID")}`
									})),
									linkHref: umkm.url(),
									linkLabel: "Lihat Semua UMKM"
								}),
								/* @__PURE__ */ jsx(TopStatisticList, {
									title: "Top 3 Omset Wisata",
									icon: MapPin,
									data: top_pariwisata_turnovers.slice(0, 3).map((item) => ({
										label: item.name,
										value: `Rp${Number(item.score).toLocaleString("id-ID")}`
									})),
									linkHref: villages.url(),
									linkLabel: "Lihat Semua Wisata"
								}),
								/* @__PURE__ */ jsx(TopStatisticList, {
									title: "Top 3 Kategori UMKM",
									icon: Store,
									data: top_umkm_categories.slice(0, 3).map((c) => ({
										label: c.label,
										value: c.total
									})),
									linkHref: umkm.url(),
									linkLabel: "Lihat Semua Kategori"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-2 mb-4",
					children: /* @__PURE__ */ jsx(DashboardOmsetCharts, {})
				})
			]
		})
	})] });
}
Dashboard.layout = { breadcrumbs: [{
	title: "Dashboard",
	href: dashboard()
}] };
//#endregion
export { Dashboard as default };

//# sourceMappingURL=dashboard-BOk7l5WX.js.map