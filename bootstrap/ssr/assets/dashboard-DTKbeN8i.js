import { i as DropdownMenuItem, n as DropdownMenuContent, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-Dez2j4dN.js";
import { a as pariwisata, c as surveyAssignments, d as villages, l as umkm, t as dashboard } from "./routes-Bnxj77BR.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DKL20tqQ.js";
import { i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-UyX6Ddfj.js";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowUpRight, Building2, ChevronDown, ChevronRight, ClipboardCheck, FileSearch, Info, LocateFixed, MapPin, MapPinned, Store, Ticket, TrendingUp, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-2 gap-3",
							children: /* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl border border-[#EFEFEF] bg-white p-4",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs font-semibold text-[#7C7C7C]",
									children: "UMKM"
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-2 text-2xl font-bold tracking-[-0.02em] text-[#0066AE]",
									children: selectedVillage ? formatCount(selectedVillage.umkm_count) : "0"
								})]
							})
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
function Panel$1({ children, className = "" }) {
	return /* @__PURE__ */ jsx("section", {
		className: `rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.06)] ${className}`,
		children
	});
}
function VillageScoreBarChart({ title, subtitle, aspects, rows, color, emptyMessage, href }) {
	const [selectedAspect, setSelectedAspect] = useState("Total Skor");
	const data = rows.map((row) => {
		if (selectedAspect === "Total Skor") {
			const score = row.total_score ?? 0;
			const maxScore = row.total_max_score ?? 0;
			return {
				name: row.name,
				score,
				maxScore,
				percentage: maxScore > 0 ? score / maxScore * 100 : 0
			};
		} else {
			const aspectData = row.aspect_scores?.[selectedAspect];
			const score = aspectData?.score ?? 0;
			const maxScore = aspectData?.max_score ?? 0;
			return {
				name: row.name,
				score,
				maxScore,
				percentage: maxScore > 0 ? score / maxScore * 100 : 0
			};
		}
	}).sort((a, b) => b.score - a.score);
	if (data.length === 0) return /* @__PURE__ */ jsxs(Panel$1, {
		className: "flex min-h-[280px] flex-col p-4",
		children: [
			/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-bold text-[#303030]",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
				children: subtitle
			}),
			/* @__PURE__ */ jsx("p", {
				className: "flex flex-1 items-center justify-center text-center text-sm font-semibold text-[#7C7C7C]",
				children: emptyMessage
			})
		]
	});
	return /* @__PURE__ */ jsxs(Panel$1, {
		className: "flex min-w-0 flex-col p-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-bold text-[#303030]",
				children: title
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-[#7C7C7C]",
				children: [/* @__PURE__ */ jsx("span", {
					className: "size-2 rounded-full",
					style: { backgroundColor: color }
				}), subtitle]
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [aspects.length > 0 && /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsxs("button", {
						className: "flex items-center gap-1 rounded-md border border-[#EFEFEF] bg-white px-3 py-1.5 text-xs font-semibold text-[#303030] shadow-sm hover:bg-[#F8FBFE]",
						children: [
							selectedAspect,
							" ",
							/* @__PURE__ */ jsx(ChevronDown, { className: "size-3" })
						]
					})
				}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
					align: "end",
					className: "max-h-[300px] w-[200px] overflow-auto",
					children: [/* @__PURE__ */ jsx(DropdownMenuItem, {
						className: "cursor-pointer text-xs",
						onSelect: () => setSelectedAspect("Total Skor"),
						children: "Total Skor"
					}), aspects.map((aspect) => /* @__PURE__ */ jsx(DropdownMenuItem, {
						className: "cursor-pointer text-xs",
						onSelect: () => setSelectedAspect(aspect),
						children: aspect
					}, aspect))]
				})] }), /* @__PURE__ */ jsxs(Link, {
					href,
					className: "flex items-center gap-1 rounded-md border border-[#EFEFEF] bg-white px-3 py-1.5 text-xs font-bold text-[#0066AE] shadow-sm transition hover:bg-[#F8FBFE]",
					children: [
						"Detail Survey",
						" ",
						/* @__PURE__ */ jsx(ArrowUpRight, {
							className: "size-3",
							strokeWidth: 2.2
						})
					]
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "min-h-[280px] overflow-x-auto",
			children: /* @__PURE__ */ jsx("div", {
				className: "h-[280px] min-w-[480px]",
				style: { height: Math.max(data.length * 40, 280) },
				children: /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ jsxs(BarChart, {
						data,
						layout: "vertical",
						margin: {
							top: 8,
							right: 24,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								strokeDasharray: "3 3",
								horizontal: false,
								stroke: "#EFEFEF"
							}),
							/* @__PURE__ */ jsx(XAxis, {
								type: "number",
								axisLine: false,
								tickLine: false,
								tick: {
									fontSize: 10,
									fill: "#7C7C7C"
								}
							}),
							/* @__PURE__ */ jsx(YAxis, {
								dataKey: "name",
								type: "category",
								axisLine: false,
								tickLine: false,
								tick: {
									fontSize: 10,
									fill: "#7C7C7C"
								},
								width: 120
							}),
							/* @__PURE__ */ jsx(Tooltip, {
								cursor: { fill: "#F8FBFE" },
								formatter: (value, _name, item) => [String(value ?? 0) + "/" + String(item.payload.maxScore ?? 0) + " (" + String(Math.round(item.payload.percentage ?? 0)) + "%)", selectedAspect],
								contentStyle: {
									borderRadius: "8px",
									border: "none",
									boxShadow: "0 4px 14px rgba(3,17,32,0.08)",
									color: "#303030",
									fontSize: "12px"
								}
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "score",
								fill: color,
								radius: [
									0,
									3,
									3,
									0
								],
								barSize: 20,
								children: /* @__PURE__ */ jsx(LabelList, {
									dataKey: "percentage",
									position: "right",
									formatter: (value) => String(Math.round(Number(value ?? 0))) + "%",
									fill: "#303030",
									fontSize: 10,
									fontWeight: 700
								})
							})
						]
					})
				})
			})
		})]
	});
}
function DashboardCharts() {
	const { props } = usePage();
	const generalReport = props.general_report || {};
	const filters = props.filters || {};
	const [generalReportFilter, setGeneralReportFilter] = useState(filters.general_report_filter || "Bulan Ini");
	const [programTypeFilter, setProgramTypeFilter] = useState(filters.program_type || "Semua Program");
	useEffect(() => {
		setGeneralReportFilter(filters.general_report_filter || "Bulan Ini");
		setProgramTypeFilter(filters.program_type || "Semua Program");
	}, [filters.general_report_filter, filters.program_type]);
	generalReport.area_data;
	const showGeneralReport = false;
	const kemenparVillageScores = props.kemenpar_village_scores;
	const istcVillageScores = props.istc_village_scores;
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-2 grid grid-cols-1 gap-4 lg:grid-cols-2",
		children: [
			showGeneralReport,
			/* @__PURE__ */ jsx(VillageScoreBarChart, {
				title: "Assessment KEMENPAR",
				subtitle: "Skor KEMENPAR per desa",
				aspects: kemenparVillageScores?.aspects ?? [],
				rows: kemenparVillageScores?.rows ?? [],
				color: "#0066AE",
				emptyMessage: "Belum ada skor KEMENPAR desa.",
				href: surveyAssignments.url()
			}),
			/* @__PURE__ */ jsx(VillageScoreBarChart, {
				title: "Assessment ISTC",
				subtitle: "Skor ISTC per desa",
				aspects: istcVillageScores?.aspects ?? [],
				rows: istcVillageScores?.rows ?? [],
				color: "#00893D",
				emptyMessage: "Belum ada skor ISTC desa.",
				href: pariwisata.url()
			})
		]
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
function formatCurrency(value) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0
	}).format(value);
}
function TurnoverCard({ title, details, icon: Icon, onClick }) {
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		className: "w-full rounded-xl border border-[#EFEFEF] bg-white p-3.5 text-left shadow-[0_4px_14px_rgba(3,17,32,0.06)] transition hover:-translate-y-0.5 hover:border-[#AAD2F8] hover:shadow-[0_6px_18px_rgba(3,17,32,0.1)] sm:p-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "flex items-center gap-2 text-sm leading-5 font-bold text-[#303030]",
					children: [/* @__PURE__ */ jsx("span", {
						className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0066AE] text-white",
						children: /* @__PURE__ */ jsx(Icon, {
							className: "size-4",
							strokeWidth: 2
						})
					}), title]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-3 text-[24px] leading-7 font-bold tracking-[-0.02em] text-[#303030] sm:text-[28px] sm:leading-8",
					children: formatCurrency(details.total)
				})]
			}), /* @__PURE__ */ jsx(ArrowUpRight, {
				className: "size-4 text-[#0066AE]",
				strokeWidth: 2.2
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-4 flex items-center justify-between text-xs",
			children: [/* @__PURE__ */ jsx("p", {
				className: "font-medium text-[#7C7C7C]",
				children: "Semua tahun"
			}), /* @__PURE__ */ jsx("p", {
				className: "font-bold text-[#0066AE]",
				children: "Lihat detail"
			})]
		})]
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
function VillageScoreTable({ title, data, selectedAspects, onToggleAspect, theme }) {
	const [sortKey, setSortKey] = useState("total");
	const [sortDirection, setSortDirection] = useState("desc");
	const visibleAspects = selectedAspects.length ? data.aspects.filter((aspect) => selectedAspects.includes(aspect)) : data.aspects;
	const activeSortKey = sortKey === "total" || visibleAspects.includes(sortKey) ? sortKey : "total";
	const isKemenpar = theme === "kemenpar";
	const scoreTone = isKemenpar ? "bg-[#EAF3FF] text-[#0066AE]" : "bg-[#EAF8F0] text-[#00893D]";
	const scoreHoverTone = isKemenpar ? "hover:bg-[#DCEEFF]" : "hover:bg-[#DDF3E6]";
	const sortedRows = [...data.rows].sort((left, right) => {
		const leftScore = activeSortKey === "total" ? left.total_score : left.aspect_scores[activeSortKey]?.score ?? 0;
		const rightScore = activeSortKey === "total" ? right.total_score : right.aspect_scores[activeSortKey]?.score ?? 0;
		if (leftScore !== rightScore) return sortDirection === "asc" ? leftScore - rightScore : rightScore - leftScore;
		return left.name.localeCompare(right.name, "id");
	});
	function toggleScoreSort(nextKey) {
		setSortDirection((current) => activeSortKey === nextKey && current === "desc" ? "asc" : "desc");
		setSortKey(nextKey);
	}
	function scoreSortLabel(key) {
		if (activeSortKey !== key) return "↕";
		return sortDirection === "asc" ? "↑" : "↓";
	}
	function ScoreHeader({ label, sortKey: key }) {
		return /* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => toggleScoreSort(key),
			className: "inline-flex items-center gap-1 font-bold",
			children: [label, /* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				children: scoreSortLabel(key)
			})]
		});
	}
	return /* @__PURE__ */ jsxs(Panel, {
		className: "p-3.5 sm:p-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-base leading-6 font-bold text-[#303030]",
				children: title
			}), /* @__PURE__ */ jsxs("details", {
				className: "relative self-start sm:self-auto",
				children: [/* @__PURE__ */ jsxs("summary", {
					className: "cursor-pointer list-none rounded-lg bg-[#F8FBFE] px-3 py-2 text-xs font-bold text-[#0066AE]",
					children: ["Filter Aspek", selectedAspects.length > 0 ? ` (${selectedAspects.length})` : ""]
				}), /* @__PURE__ */ jsx("div", {
					className: "absolute right-0 z-20 mt-2 max-h-64 min-w-56 overflow-y-auto rounded-xl border border-[#DDE4EC] bg-white p-3 shadow-[0_12px_30px_rgba(3,17,32,0.14)]",
					children: data.aspects.length > 0 ? data.aspects.map((aspect) => /* @__PURE__ */ jsxs("label", {
						className: "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-xs font-semibold text-[#303030] hover:bg-[#F8FBFE]",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: selectedAspects.includes(aspect),
							onChange: () => onToggleAspect(aspect),
							className: "size-4 accent-[#0066AE]"
						}), aspect]
					}, aspect)) : /* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold text-[#7C7C7C]",
						children: "Belum ada aspek."
					})
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[720px] border-collapse text-left text-sm",
				children: [/* @__PURE__ */ jsx("thead", {
					className: "border-b border-[#EFEFEF] text-[11px] font-bold tracking-wider text-[#7C7C7C] uppercase",
					children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							className: "h-10 min-w-64 px-2 font-bold whitespace-nowrap first:pl-0 sm:min-w-80",
							children: "Desa Wisata"
						}),
						/* @__PURE__ */ jsx("th", {
							className: `h-10 px-2 font-bold whitespace-nowrap ${scoreTone}`,
							children: /* @__PURE__ */ jsx(ScoreHeader, {
								label: "Total Skor",
								sortKey: "total"
							})
						}),
						visibleAspects.map((aspect) => /* @__PURE__ */ jsx("th", {
							className: "h-10 px-2 font-bold whitespace-nowrap",
							children: /* @__PURE__ */ jsx(ScoreHeader, {
								label: aspect,
								sortKey: aspect
							})
						}, aspect))
					] })
				}), /* @__PURE__ */ jsx("tbody", {
					className: "divide-y divide-[#EFEFEF] bg-white",
					children: sortedRows.length > 0 ? sortedRows.map((row) => /* @__PURE__ */ jsxs("tr", {
						className: "h-14 transition-colors hover:bg-[#F8FBFE]",
						children: [
							/* @__PURE__ */ jsx("td", {
								className: "min-w-64 px-2 py-2 first:pl-0 sm:min-w-80",
								children: /* @__PURE__ */ jsx(Link, {
									href: row.url,
									className: "font-bold text-[#0066AE] hover:text-[#093967]",
									children: row.name
								})
							}),
							/* @__PURE__ */ jsxs("td", {
								className: `px-2 py-2 font-black whitespace-nowrap ${scoreTone} ${scoreHoverTone}`,
								children: [
									row.total_score,
									"/",
									row.total_max_score
								]
							}),
							visibleAspects.map((aspect) => {
								const score = row.aspect_scores[aspect] ?? {
									score: 0,
									max_score: 0
								};
								return /* @__PURE__ */ jsxs("td", {
									className: "px-2 py-2 font-semibold whitespace-nowrap text-[#303030]",
									children: [
										score.score,
										"/",
										score.max_score
									]
								}, aspect);
							})
						]
					}, row.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 2 + visibleAspects.length,
						className: "px-2 py-8 text-center text-sm font-semibold text-[#7C7C7C]",
						children: "Belum ada data desa."
					}) })
				})]
			})
		})]
	});
}
function Dashboard({ dashboard_mode = "admin", kpis = [], village_map_points = [], top_village_surveys = [], kemenpar_village_scores = {
	aspects: [],
	rows: []
}, istc_village_scores = {
	aspects: [],
	rows: []
}, top_umkm_surveys = [], top_pariwisata_surveys = [], top_umkm_turnovers = [], top_pariwisata_turnovers = [], top_umkm_categories = [], village_status_kpis = [], village_status_details = {}, recent_assignments = [], turnover_details = {
	umkm: {
		total: 0,
		rows: []
	},
	pariwisata: {
		total: 0,
		rows: []
	}
}, filters = {} }) {
	const { auth } = usePage().props;
	filters.program_type;
	const [selectedKemenparAspects, setSelectedKemenparAspects] = useState([]);
	const [selectedIstcAspects, setSelectedIstcAspects] = useState([]);
	const [villageStatusModal, setVillageStatusModal] = useState(null);
	function toggleAspect(aspect, selected, setSelected) {
		setSelected(selected.includes(aspect) ? selected.filter((item) => item !== aspect) : [...selected, aspect]);
	}
	if (dashboard_mode === "enumerator") return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Dashboard Enumerator" }), /* @__PURE__ */ jsx("div", {
		className: "min-w-0 bg-[#F7F7F7] px-4 py-4 text-[#303030] sm:px-5 lg:px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex max-w-[1500px] flex-col gap-4",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "rounded-xl border border-[#EFEFEF] bg-white p-5 shadow-[0_4px_14px_rgba(3,17,32,0.06)] sm:p-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-2 flex items-center gap-2 text-xs font-semibold text-[#7C7C7C]",
						children: [
							/* @__PURE__ */ jsx("span", { children: "Dashboard" }),
							/* @__PURE__ */ jsx(ChevronRight, {
								className: "size-3.5",
								strokeWidth: 2
							}),
							/* @__PURE__ */ jsx("span", { children: "Enumerator" })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
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
					}),
					/* @__PURE__ */ jsx("section", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
						children: village_status_kpis.map((kpi) => {
							const Icon = kpiIcons[kpi.icon];
							if (!Icon) return null;
							return /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setVillageStatusModal(kpi.title.replace("Total Desa ", "")),
								className: "group block w-full text-left",
								children: /* @__PURE__ */ jsxs(Panel, {
									className: "h-full p-4 transition group-hover:border-[#0066AE] group-hover:shadow-md",
									children: [/* @__PURE__ */ jsxs("p", {
										className: "flex items-center gap-2 text-sm font-bold text-[#303030]",
										children: [/* @__PURE__ */ jsx("span", {
											className: "flex size-8 items-center justify-center rounded-full bg-[#0066AE] text-white",
											children: /* @__PURE__ */ jsx(Icon, { className: "size-4" })
										}), kpi.title]
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-3 text-3xl font-bold text-[#303030]",
										children: kpi.value
									})]
								})
							}, kpi.title);
						})
					}),
					/* @__PURE__ */ jsx(Dialog, {
						open: villageStatusModal !== null,
						onOpenChange: (open) => !open && setVillageStatusModal(null),
						children: /* @__PURE__ */ jsxs(DialogContent, {
							className: "max-h-[85vh] w-[min(96vw,1200px)] max-w-none overflow-hidden rounded-xl border-[#EFEFEF] bg-white p-0",
							children: [/* @__PURE__ */ jsxs(DialogHeader, {
								className: "border-b border-[#EFEFEF] px-5 py-4",
								children: [/* @__PURE__ */ jsxs(DialogTitle, { children: [
									"Detail Desa",
									" ",
									villageStatusModal ?? ""
								] }), /* @__PURE__ */ jsx(DialogDescription, { children: "Nama desa, skor KEMENPAR, skor ISTC, dan kategori desa." })]
							}), /* @__PURE__ */ jsx("div", {
								className: "max-h-[calc(85vh-100px)] overflow-y-auto px-5 py-4",
								children: (village_status_details[villageStatusModal ?? ""] ?? []).length > 0 ? /* @__PURE__ */ jsxs("table", {
									className: "w-full table-fixed text-left text-sm",
									children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
										className: "border-b",
										children: [
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-3",
												children: "Nama Desa"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-3 text-right",
												children: "Skor KEMENPAR"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-3 text-right",
												children: "Skor ISTC"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-3",
												children: "Kategori Desa"
											})
										]
									}) }), /* @__PURE__ */ jsx("tbody", { children: (village_status_details[villageStatusModal ?? ""] ?? []).map((village) => /* @__PURE__ */ jsxs("tr", {
										className: "border-b",
										children: [
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3 font-semibold",
												children: village.name
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3 text-right font-bold text-[#0066AE]",
												children: village.kemenpar_score
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3 text-right font-bold text-[#00893D]",
												children: village.istc_score
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3",
												children: village.type
											})
										]
									}, village.id)) })]
								}) : /* @__PURE__ */ jsx("div", {
									className: "py-10 text-center text-sm text-[#7C7C7C]",
									children: "Belum ada data desa pada kategori ini."
								})
							})]
						})
					}),
					" "
				]
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
	const [turnoverModal, setTurnoverModal] = useState(null);
	const selectedTurnover = turnoverModal ? turnover_details[turnoverModal] : null;
	const selectedTurnoverTitle = turnoverModal === "umkm" ? "Total Omset UMKM" : "Total Omset Pariwisata";
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
					children: village_status_kpis?.map((kpi) => {
						const Icon = kpiIcons[kpi.icon];
						if (!Icon) return null;
						return /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setVillageStatusModal(kpi.title.replace("Total Desa ", "")),
							className: "group block w-full text-left",
							children: /* @__PURE__ */ jsx(Panel, {
								className: "h-full p-3.5 transition group-hover:border-[#0066AE] group-hover:shadow-md sm:p-4",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ jsxs("div", {
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
									}), /* @__PURE__ */ jsx("div", {
										className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F5F8FA] text-[#7C7C7C] transition-colors group-hover:bg-[#0066AE] group-hover:text-white",
										children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4" })
									})]
								})
							})
						}, kpi.title);
					})
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2",
					children: [/* @__PURE__ */ jsx(TurnoverCard, {
						title: "Total Omset UMKM",
						details: turnover_details.umkm,
						icon: Store,
						onClick: () => setTurnoverModal("umkm")
					}), /* @__PURE__ */ jsx(TurnoverCard, {
						title: "Total Omset Pariwisata",
						details: turnover_details.pariwisata,
						icon: MapPin,
						onClick: () => setTurnoverModal("pariwisata")
					})]
				}),
				/* @__PURE__ */ jsx(Dialog, {
					open: villageStatusModal !== null,
					onOpenChange: (open) => !open && setVillageStatusModal(null),
					children: /* @__PURE__ */ jsxs(DialogContent, {
						className: "max-h-[85vh] w-[95vw] overflow-hidden rounded-xl border-[#EFEFEF] bg-white p-0 sm:max-w-[1200px]",
						children: [/* @__PURE__ */ jsxs(DialogHeader, {
							className: "border-b border-[#EFEFEF] px-5 py-4",
							children: [/* @__PURE__ */ jsxs(DialogTitle, {
								className: "text-lg font-bold text-[#303030]",
								children: ["Detail Desa ", villageStatusModal ?? ""]
							}), /* @__PURE__ */ jsx(DialogDescription, { children: "Nama desa, skor KEMENPAR, skor ISTC, dan kategori desa." })]
						}), /* @__PURE__ */ jsx("div", {
							className: "max-h-[calc(85vh-100px)] overflow-y-auto px-5 py-4 sm:px-6",
							children: (village_status_details[villageStatusModal ?? ""] ?? []).length > 0 ? /* @__PURE__ */ jsxs("table", {
								className: "w-full table-fixed text-left text-sm",
								children: [/* @__PURE__ */ jsx("thead", {
									className: "border-b border-[#EFEFEF] text-xs text-[#7C7C7C]",
									children: /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("th", {
											className: "px-3 py-3 font-semibold",
											children: "Nama Desa"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-3 py-3 text-right font-semibold",
											children: "Skor KEMENPAR"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-3 py-3 text-right font-semibold",
											children: "Skor ISTC"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-3 py-3 font-semibold",
											children: "Kategori Desa"
										})
									] })
								}), /* @__PURE__ */ jsx("tbody", { children: (village_status_details[villageStatusModal ?? ""] ?? []).map((village) => /* @__PURE__ */ jsxs("tr", {
									className: "border-b border-[#F1F1F1] last:border-0",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-3 py-3 font-semibold text-[#303030]",
											children: village.name
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-3 py-3 text-right font-bold text-[#0066AE]",
											children: village.kemenpar_score
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-3 py-3 text-right font-bold text-[#00893D]",
											children: village.istc_score
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-3 py-3 text-[#7C7C7C]",
											children: village.type
										})
									]
								}, village.id)) })]
							}) : /* @__PURE__ */ jsx("div", {
								className: "py-10 text-center text-sm font-semibold text-[#7C7C7C]",
								children: "Belum ada data desa pada kategori ini."
							})
						})]
					})
				}),
				/* @__PURE__ */ jsx(Dialog, {
					open: turnoverModal !== null,
					onOpenChange: (open) => !open && setTurnoverModal(null),
					children: /* @__PURE__ */ jsxs(DialogContent, {
						className: "max-h-[85vh] w-[95vw] overflow-hidden rounded-xl border-[#EFEFEF] bg-white p-0 sm:max-w-[1200px]",
						children: [/* @__PURE__ */ jsxs(DialogHeader, {
							className: "border-b border-[#EFEFEF] px-5 py-4",
							children: [/* @__PURE__ */ jsx(DialogTitle, {
								className: "text-lg font-bold text-[#303030]",
								children: selectedTurnoverTitle
							}), /* @__PURE__ */ jsx(DialogDescription, { children: "Rincian omset dari seluruh tahun yang tersedia." })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "overflow-auto px-5 py-4 sm:px-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-4 rounded-lg bg-[#F1F5F8] p-3",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs font-semibold text-[#7C7C7C]",
									children: "Total seluruh tahun"
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-xl font-bold text-[#0066AE]",
									children: formatCurrency(selectedTurnover?.total ?? 0)
								})]
							}), selectedTurnover?.rows.length ? /* @__PURE__ */ jsx("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full min-w-[560px] text-left text-sm",
									children: [/* @__PURE__ */ jsx("thead", {
										className: "border-b border-[#EFEFEF] text-xs text-[#7C7C7C]",
										children: /* @__PURE__ */ jsxs("tr", { children: [
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-3 font-semibold",
												children: "Nama"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-3 font-semibold",
												children: "Desa"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-3 font-semibold",
												children: "Tahun"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-3 text-right font-semibold",
												children: "Omset"
											})
										] })
									}), /* @__PURE__ */ jsx("tbody", { children: selectedTurnover.rows.map((row) => /* @__PURE__ */ jsxs("tr", {
										className: "border-b border-[#F1F1F1] last:border-0",
										children: [
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3 font-semibold text-[#303030]",
												children: row.name
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3 text-[#7C7C7C]",
												children: row.village
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3 text-[#7C7C7C]",
												children: row.year
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3 text-right font-semibold text-[#303030]",
												children: formatCurrency(row.value)
											})
										]
									}, row.id)) })]
								})
							}) : /* @__PURE__ */ jsx("p", {
								className: "py-8 text-center text-sm font-semibold text-[#7C7C7C]",
								children: "Belum ada data omset."
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsx(DashboardCharts, {}),
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
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-4 space-y-4",
					children: [/* @__PURE__ */ jsx(VillageScoreTable, {
						title: "Skor Desa KEMENPAR",
						data: kemenpar_village_scores,
						selectedAspects: selectedKemenparAspects,
						onToggleAspect: (aspect) => toggleAspect(aspect, selectedKemenparAspects, setSelectedKemenparAspects),
						theme: "kemenpar"
					}), /* @__PURE__ */ jsx(VillageScoreTable, {
						title: "Skor Desa ISTC",
						data: istc_village_scores,
						selectedAspects: selectedIstcAspects,
						onToggleAspect: (aspect) => toggleAspect(aspect, selectedIstcAspects, setSelectedIstcAspects),
						theme: "istc"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mb-2",
					children: /* @__PURE__ */ jsx(DashboardVillageMap, { points: village_map_points })
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

//# sourceMappingURL=dashboard-DTKbeN8i.js.map