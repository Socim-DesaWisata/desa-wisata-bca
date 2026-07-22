import { t as cn } from "./utils-DAgvUY2L.js";
import { i as DropdownMenuItem, n as DropdownMenuContent, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-Dez2j4dN.js";
import { c as surveyAssignments, t as dashboard } from "./routes-Bnxj77BR.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DKL20tqQ.js";
import { t as Checkbox } from "./checkbox-BbMatyE1.js";
import { i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-UyX6Ddfj.js";
import { C as store, S as update$1, T as update, i as show } from "./survey-assignments-CVUcelPC.js";
import { t as EditableFileName } from "./editable-filename-3OzKOi9L.js";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, CalendarDays, ChevronDown, Clock3, Download, Eye, FileText, ImagePlus, MapPin, Pencil, Plus, Save, ShieldCheck, Ticket, Trash2, UserRound, X } from "lucide-react";
import { cva } from "class-variance-authority";
import * as RechartsPrimitive from "recharts";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart as PieChart$1, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
//#region resources/js/components/ui/chart.tsx
var ChartContext = React.createContext(null);
function useChart() {
	const context = React.useContext(ChartContext);
	if (!context) throw new Error("useChart must be used within a <ChartContainer />");
	return context;
}
function ChartContainer({ id, className, children, config }) {
	const chartId = React.useId().replace(/:/g, "");
	const resolvedId = `chart-${id ?? chartId}`;
	return /* @__PURE__ */ jsx(ChartContext.Provider, {
		value: { config },
		children: /* @__PURE__ */ jsxs("div", {
			"data-slot": "chart",
			"data-chart": resolvedId,
			className: cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-[#8A97A8] [&_.recharts-cartesian-grid_line[stroke=\"#ccc\"]]:stroke-[#E7ECF2] [&_.recharts-curve.recharts-tooltip-cursor]:stroke-[#DDE4EC] [&_.recharts-polar-grid_[stroke=\"#ccc\"]]:stroke-[#E7ECF2] [&_.recharts-reference-line_[stroke=\"#ccc\"]]:stroke-[#DDE4EC]", className),
			children: [/* @__PURE__ */ jsx(ChartStyle, {
				id: resolvedId,
				config
			}), /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })]
		})
	});
}
function ChartStyle({ id, config }) {
	const colorConfig = Object.entries(config).filter(([, value]) => value.color);
	if (colorConfig.length === 0) return null;
	return /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `[data-chart=${id}] {${colorConfig.map(([key, value]) => `--color-${key}: ${value.color};`).join("")}}` } });
}
var ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({ active, payload, label, hideLabel = false, valueFormatter, labelFormatter, className }) {
	const { config } = useChart();
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: cn("rounded-xl border border-[#E7ECF2] bg-white px-3 py-2.5 shadow-[0_10px_25px_rgba(15,23,42,0.08)]", className),
		children: [!hideLabel && label !== void 0 && /* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs font-bold text-[#344256]",
			children: labelFormatter ? labelFormatter(label, payload) : label
		}), /* @__PURE__ */ jsx("div", {
			className: "space-y-1.5",
			children: payload.map((item) => {
				const key = String(item.dataKey ?? item.name ?? "value");
				const color = item.color ?? `var(--color-${key})`;
				const labelValue = config[key]?.label ?? item.name ?? key;
				return /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2 text-xs font-semibold text-[#566579]",
						children: [/* @__PURE__ */ jsx("span", {
							className: "size-2.5 rounded-full",
							style: { backgroundColor: color }
						}), labelValue]
					}), /* @__PURE__ */ jsx("span", {
						className: "text-xs font-bold text-[#172033]",
						children: valueFormatter ? valueFormatter(Number(item.value ?? 0), key) : item.value
					})]
				}, key);
			})
		})]
	});
}
var ChartLegend = RechartsPrimitive.Legend;
function ChartLegendContent({ payload, className }) {
	const { config } = useChart();
	if (!payload?.length) return null;
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex flex-wrap items-center gap-4", className),
		children: payload.map((item) => {
			const key = String(item.dataKey ?? item.value ?? "value");
			const color = item.color ?? `var(--color-${key})`;
			const labelValue = config[key]?.label ?? item.value ?? key;
			return /* @__PURE__ */ jsxs("div", {
				className: "inline-flex items-center gap-2 text-xs font-bold text-[#566579]",
				children: [/* @__PURE__ */ jsx("span", {
					className: "size-2.5 rounded-full",
					style: { backgroundColor: color }
				}), labelValue]
			}, key);
		})
	});
}
//#endregion
//#region resources/js/components/ui/toggle.tsx
var toggleVariants = cva("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
		},
		size: {
			default: "h-9 px-2 min-w-9",
			sm: "h-8 px-1.5 min-w-8",
			lg: "h-10 px-2.5 min-w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
//#endregion
//#region resources/js/components/ui/toggle-group.tsx
var ToggleGroupContext = React.createContext({
	size: "default",
	variant: "default"
});
function ToggleGroup({ className, variant, size, children, ...props }) {
	return /* @__PURE__ */ jsx(ToggleGroupPrimitive.Root, {
		"data-slot": "toggle-group",
		"data-variant": variant,
		"data-size": size,
		className: cn("group/toggle-group flex items-center rounded-md data-[variant=outline]:shadow-xs", className),
		...props,
		children: /* @__PURE__ */ jsx(ToggleGroupContext.Provider, {
			value: {
				variant,
				size
			},
			children
		})
	});
}
function ToggleGroupItem({ className, children, variant, size, ...props }) {
	const context = React.useContext(ToggleGroupContext);
	return /* @__PURE__ */ jsx(ToggleGroupPrimitive.Item, {
		"data-slot": "toggle-group-item",
		"data-variant": context.variant || variant,
		"data-size": context.size || size,
		className: cn(toggleVariants({
			variant: context.variant || variant,
			size: context.size || size
		}), "min-w-0 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l", className),
		...props,
		children
	});
}
//#endregion
//#region resources/js/pages/survey-assignment/show-pariwisata.tsx
var operationalDayOptions = [
	"Senin",
	"Selasa",
	"Rabu",
	"Kamis",
	"Jumat",
	"Sabtu",
	"Minggu"
];
var visitorTypeOptions = [
	{
		value: "domestik",
		label: "Domestik"
	},
	{
		value: "mancanegara",
		label: "Mancanegara"
	},
	{
		value: "pelajar",
		label: "Pelajar"
	},
	{
		value: "rombongan",
		label: "Rombongan"
	}
];
var workerDimensionOptions = [
	{
		value: "age",
		label: "Usia"
	},
	{
		value: "gender",
		label: "Gender"
	},
	{
		value: "education",
		label: "Pendidikan"
	}
];
function initialEditForm(values) {
	return {
		_method: "patch",
		image: null,
		...values
	};
}
function fieldError(errors, name) {
	return errors[name];
}
function digitsOnly(value) {
	return value.replace(/\D/g, "");
}
function formatThousands(value) {
	const digits = digitsOnly(value);
	return digits ? new Intl.NumberFormat("id-ID").format(Number(digits)) : "";
}
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
var visitorTypeColors = {
	domestik: "#0066AE",
	mancanegara: "#22C55E",
	pelajar: "#F59E0B",
	rombongan: "#8B5CF6"
};
function toNumber(value) {
	const normalized = Number.parseFloat(value);
	return Number.isFinite(normalized) ? normalized : 0;
}
function formatCompactRupiah(value) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		notation: value >= 1e6 ? "compact" : "standard",
		maximumFractionDigits: value >= 1e6 ? 1 : 0
	}).format(value);
}
function formatVisitorCount(value) {
	return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(value);
}
function visitorTypeLabel(type) {
	return visitorTypeOptions.find((option) => option.value === type)?.label ?? type.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
function buildTrendChartData(values) {
	const years = /* @__PURE__ */ new Set();
	values.annual_turnovers.forEach((row) => {
		if (row.year) years.add(row.year);
	});
	values.annual_visitors.forEach((row) => {
		if (row.year) years.add(row.year);
	});
	return Array.from(years).sort((left, right) => Number(left) - Number(right)).map((year) => ({
		year,
		omset: values.annual_turnovers.filter((row) => row.year === year).reduce((total, row) => total + toNumber(row.value), 0),
		pengunjung: values.annual_visitors.filter((row) => row.year === year).reduce((total, row) => total + toNumber(row.value), 0)
	}));
}
function buildVisitorPieData(values, selectedYear) {
	const totals = /* @__PURE__ */ new Map();
	values.visitor_type_annuals.filter((row) => row.year === selectedYear).forEach((row) => {
		const currentTotal = totals.get(row.visitor_type) ?? 0;
		totals.set(row.visitor_type, currentTotal + toNumber(row.value));
	});
	return Array.from(totals.entries()).map(([type, value]) => ({
		type,
		label: visitorTypeLabel(type),
		value,
		fill: visitorTypeColors[type] ?? "#94A3B8"
	})).sort((left, right) => right.value - left.value);
}
function Card({ children, className }) {
	return /* @__PURE__ */ jsx("section", {
		className: classNames("rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_16px_rgba(9,57,103,0.06)]", className),
		children
	});
}
function InfoItem({ icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-w-0 gap-3",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0066AE]",
			children: icon
		}), /* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-xs font-semibold text-[#7C7C7C]",
				children: label
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm font-bold break-words text-[#303030]",
				children: value || "-"
			})]
		})]
	});
}
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "mt-1 text-xs font-semibold text-[#D81313]",
		children: message
	});
}
function TextInput({ label, value, onChange, error, type = "text", placeholder, required = false }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [
			/* @__PURE__ */ jsxs("span", {
				className: "text-xs font-bold text-[#344256]",
				children: [
					label,
					" ",
					required && /* @__PURE__ */ jsx("span", {
						className: "text-[#D81313]",
						children: "*"
					})
				]
			}),
			/* @__PURE__ */ jsx("input", {
				type,
				value,
				onChange: (event) => onChange(event.target.value),
				placeholder,
				className: "mt-2 h-10 w-full rounded-xl border border-[#DCE3EA] bg-white px-3 text-sm font-semibold text-[#172033] transition outline-none focus:border-[#0066AE] focus:ring-2 focus:ring-[#AAD2F8]/35"
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function TextArea({ label, value, onChange, error, placeholder, rows = 3 }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-xs font-bold text-[#344256]",
				children: label
			}),
			/* @__PURE__ */ jsx("textarea", {
				value,
				onChange: (event) => onChange(event.target.value),
				placeholder,
				rows,
				className: "mt-2 w-full resize-y rounded-xl border border-[#DCE3EA] bg-white px-3 py-2 text-sm font-semibold text-[#172033] transition outline-none focus:border-[#0066AE] focus:ring-2 focus:ring-[#AAD2F8]/35"
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function EditSection({ title, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_22px_rgba(15,23,42,0.05)]",
		children: [/* @__PURE__ */ jsx("h3", {
			className: "text-sm font-bold text-[#172033]",
			children: title
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-4 space-y-4",
			children
		})]
	});
}
function DocumentBadge({ document }) {
	const { assignment } = usePage().props;
	const isPdf = document.mime_type?.includes("pdf");
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-w-0 items-center gap-3",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: classNames("flex size-8 shrink-0 items-center justify-center rounded", isPdf ? "bg-[#FDECEC] text-[#D81313]" : "bg-[#EAF8F0] text-[#00893D]"),
				children: /* @__PURE__ */ jsx(FileText, {
					size: 16,
					strokeWidth: 2.2
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ jsx(EditableFileName, {
					fileName: document.file_name,
					updateUrl: update.url({
						assignment: assignment.id,
						document: document.id
					}),
					className: "text-xs font-bold text-[#303030]"
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-[11px] font-semibold text-[#7C7C7C]",
					children: [
						document.file_size_label,
						" · ",
						document.uploaded_by.name
					]
				})]
			}),
			/* @__PURE__ */ jsx("a", {
				href: document.file_url,
				target: "_blank",
				rel: "noreferrer",
				className: "flex size-7 shrink-0 items-center justify-center rounded border border-[#DDE4EC] text-[#0066AE]",
				children: /* @__PURE__ */ jsx(Eye, { size: 14 })
			}),
			/* @__PURE__ */ jsx("a", {
				href: document.file_url,
				download: true,
				className: "flex size-7 shrink-0 items-center justify-center rounded border border-[#DDE4EC] text-[#0066AE]",
				children: /* @__PURE__ */ jsx(Download, { size: 14 })
			})
		]
	});
}
function AnswerDetailModal({ question, open, onOpenChange }) {
	if (!question) return null;
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-3xl",
			children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
				className: "text-[#303030]",
				children: "Detail Jawaban Survey Pariwisata"
			}), /* @__PURE__ */ jsx(DialogDescription, { children: "Indikator, opsi jawaban, skor terpilih, catatan, dan file pendukung." })] }), /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "rounded-xl bg-[#F8FBFF] p-4",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs font-bold text-[#0066AE]",
								children: [
									question.indicator_code,
									" ·",
									" ",
									question.criteria_code ?? "-"
								]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-2 text-base leading-6 font-bold text-[#303030]",
								children: question.indicator_name
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-2 text-xs font-semibold text-[#7C7C7C]",
								children: [
									question.category_name ?? "-",
									" ·",
									" ",
									question.sub_category_name ?? "-",
									" ·",
									" ",
									question.criteria_name ?? "-"
								]
							}),
							question.indicator_description && /* @__PURE__ */ jsx("p", {
								className: "mt-3 text-sm leading-6 font-semibold text-[#7C7C7C]",
								children: question.indicator_description
							}),
							(question.document_hint || question.supporting_evidence) && /* @__PURE__ */ jsx("p", {
								className: "mt-3 rounded-lg bg-white px-3 py-2 text-xs leading-5 font-semibold text-[#7C7C7C]",
								children: question.document_hint ?? question.supporting_evidence
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "rounded-xl border border-[#EFEFEF] bg-white p-4",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-xs font-bold text-[#7C7C7C]",
									children: "Skor Terpilih"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-2xl font-bold text-[#0066AE]",
									children: question.answer ? `${question.answer.score} / ${question.max_score}` : "-"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm font-bold text-[#303030]",
									children: question.answer?.score_label ?? "Belum dijawab"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "rounded-xl border border-[#EFEFEF] bg-white p-4",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-xs font-bold text-[#7C7C7C]",
									children: "Pengisian"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm font-bold text-[#303030]",
									children: question.answer?.answered_by.name ?? "-"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
									children: question.answer?.last_edited_at ?? "-"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h4", {
						className: "text-sm font-bold text-[#303030]",
						children: "Opsi Jawaban"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-2 divide-y divide-[#EFEFEF] rounded-xl border border-[#EFEFEF]",
						children: question.options.map((option) => {
							return /* @__PURE__ */ jsxs("div", {
								className: classNames("grid gap-3 px-4 py-3 text-sm sm:grid-cols-[72px_1fr]", option.id === question.answer?.pariwisata_suvey_option_id && "bg-[#EAF3FF]"),
								children: [/* @__PURE__ */ jsxs("span", {
									className: "font-bold text-[#0066AE]",
									children: ["Skor ", option.score]
								}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
									className: "block font-semibold text-[#303030]",
									children: option.label
								}), /* @__PURE__ */ jsx("span", {
									className: "mt-1 block text-xs leading-5 font-semibold text-[#7C7C7C]",
									children: option.description
								})] })]
							}, option.id);
						})
					})] }),
					/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h4", {
						className: "text-sm font-bold text-[#303030]",
						children: "Catatan"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm leading-6 font-semibold text-[#7C7C7C]",
						children: question.answer?.notes ?? "Belum ada catatan."
					})] }),
					/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h4", {
						className: "text-sm font-bold text-[#303030]",
						children: "File Pendukung"
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-2 space-y-2",
						children: [question.answer?.documents.map((document) => /* @__PURE__ */ jsx(DocumentBadge, { document }, document.id)), (question.answer?.documents.length ?? 0) === 0 && /* @__PURE__ */ jsx("p", {
							className: "rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm font-semibold text-[#7C7C7C]",
							children: "Belum ada file pendukung."
						})]
					})] })
				]
			})]
		})
	});
}
function IstcQuestionRow({ question, number, isViewer, onViewDetail, onEditData }) {
	const answered = Boolean(question.answer);
	return /* @__PURE__ */ jsxs("div", {
		className: classNames("grid gap-3 border-b border-[#EFEFEF] px-4 py-4 last:border-b-0", isViewer ? "xl:grid-cols-[38px_minmax(220px,1.25fr)_170px_minmax(240px,.95fr)]" : "xl:grid-cols-[38px_minmax(220px,1.25fr)_170px_minmax(240px,.95fr)_130px_130px_112px]"),
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex size-8 items-center justify-center rounded-full border border-[#CAD7E6] text-xs font-bold text-[#7C7C7C]",
				children: String(number).padStart(2, "0")
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-sm leading-5 font-semibold text-[#303030]",
						children: question.indicator_name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs font-semibold text-[#0066AE]",
						children: [
							question.criteria_code,
							question.criteria_name,
							question.indicator_code
						].filter(Boolean).join(" · ")
					}),
					(question.indicator_description || question.document_hint) && /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-xs font-semibold text-[#7C7C7C]",
						children: question.indicator_description ?? question.document_hint
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center",
				children: /* @__PURE__ */ jsxs("div", {
					className: classNames("w-full rounded-lg px-4 py-3 text-center shadow-[0_6px_12px_rgba(0,102,174,0.10)]", answered ? "bg-[#0066AE] text-white" : "bg-[#F1F5F8] text-[#7C7C7C]"),
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-sm font-bold",
						children: [
							"Skor ",
							question.answer?.score ?? "-",
							" /",
							" ",
							question.max_score || "-"
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "line-clamp-2 text-[11px] font-semibold opacity-80",
						children: question.answer?.score_label ?? "Belum dijawab"
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex min-w-0 flex-col justify-center text-center",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "mb-2 text-xs font-bold text-[#303030]",
					children: [
						"Dokumen Pendukung (",
						question.answer?.documents.length ?? 0,
						")"
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [question.answer?.documents.map((document) => /* @__PURE__ */ jsx(DocumentBadge, { document }, document.id)), (question.answer?.documents.length ?? 0) === 0 && /* @__PURE__ */ jsx("p", {
						className: "rounded-lg bg-[#F7F7F7] px-3 py-2 text-xs font-semibold text-[#7C7C7C]",
						children: "Tidak ada dokumen"
					})]
				})]
			}),
			!isViewer && /* @__PURE__ */ jsxs("div", {
				className: "flex min-w-0 flex-col justify-center text-center text-xs",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "flex items-center justify-center gap-2 font-semibold text-[#7C7C7C]",
					children: [
						/* @__PURE__ */ jsx(UserRound, {
							size: 14,
							className: "text-[#0066AE]"
						}),
						" ",
						"Dijawab oleh"
					]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 font-bold text-[#303030]",
					children: question.answer?.answered_by.name ?? "-"
				})]
			}),
			!isViewer && /* @__PURE__ */ jsxs("div", {
				className: "flex min-w-0 flex-col justify-center text-center text-xs",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "flex items-center justify-center gap-2 font-semibold text-[#7C7C7C]",
					children: [/* @__PURE__ */ jsx(Clock3, {
						size: 14,
						className: "text-[#0066AE]"
					}), " Terakhir diedit"]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 font-bold text-[#303030]",
					children: question.answer?.last_edited_at ?? "-"
				})]
			}),
			!isViewer && /* @__PURE__ */ jsx("div", {
				className: "flex items-center justify-center",
				children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
						children: ["Action ", /* @__PURE__ */ jsx(ChevronDown, { size: 14 })]
					})
				}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
					align: "end",
					className: "w-44 rounded-lg border-[#EFEFEF] bg-white text-xs",
					children: [/* @__PURE__ */ jsxs(DropdownMenuItem, {
						className: "gap-2 text-xs",
						onClick: () => onViewDetail(question),
						children: [/* @__PURE__ */ jsx(Eye, { className: "size-4" }), " Lihat Detail"]
					}), /* @__PURE__ */ jsxs(DropdownMenuItem, {
						className: "gap-2 text-xs",
						onClick: () => onEditData(question),
						children: [/* @__PURE__ */ jsx(Pencil, { className: "size-4" }), " Edit Data"]
					})]
				})] })
			})
		]
	});
}
function IstcAnswerEditModal({ assignmentCode, question, open, onOpenChange }) {
	const { data, setData, post, processing, errors, clearErrors } = useForm({ answers: [] });
	useEffect(() => {
		if (!open || !question) return;
		setData("answers", [{
			question_id: question.id,
			pariwisata_suvey_option_id: question.answer ? String(question.answer.pariwisata_suvey_option_id) : "",
			notes: question.answer?.notes ?? "",
			documents: []
		}]);
		clearErrors();
	}, [
		clearErrors,
		open,
		question,
		setData
	]);
	if (!question) return null;
	const answer = data.answers[0];
	const errorBag = errors;
	function submit(event) {
		event.preventDefault();
		post(store.url({ assignment: assignmentCode }), {
			forceFormData: true,
			preserveScroll: true,
			onSuccess: () => onOpenChange(false)
		});
	}
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-3xl",
			children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Edit Jawaban Survey ISTC" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Ubah jawaban, catatan, atau tambahkan dokumen pendukung." })] }), /* @__PURE__ */ jsxs("form", {
				className: "space-y-5",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-xl bg-[#F8FBFF] p-4",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs font-bold text-[#0066AE]",
							children: question.indicator_code
						}), /* @__PURE__ */ jsx("h3", {
							className: "mt-2 text-base font-bold text-[#303030]",
							children: question.indicator_name
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-bold text-[#303030]",
								children: "Opsi Jawaban"
							}),
							question.options.map((option) => /* @__PURE__ */ jsxs("label", {
								className: classNames("flex cursor-pointer gap-3 rounded-xl border p-3", answer?.pariwisata_suvey_option_id === String(option.id) ? "border-[#0066AE] bg-[#EAF3FF]" : "border-[#E5E7EB]"),
								children: [/* @__PURE__ */ jsx("input", {
									type: "radio",
									name: "option",
									checked: answer?.pariwisata_suvey_option_id === String(option.id),
									onChange: () => setData("answers", [{
										...answer,
										question_id: question.id,
										pariwisata_suvey_option_id: String(option.id),
										notes: answer?.notes ?? "",
										documents: answer?.documents ?? []
									}])
								}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsxs("span", {
									className: "block text-sm font-bold text-[#303030]",
									children: [
										"Skor ",
										option.score,
										" · ",
										option.label
									]
								}), /* @__PURE__ */ jsx("span", {
									className: "mt-1 block text-xs text-[#7C7C7C]",
									children: option.description
								})] })]
							}, option.id)),
							errorBag["answers.0.pariwisata_suvey_option_id"] && /* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold text-red-600",
								children: errorBag["answers.0.pariwisata_suvey_option_id"]
							})
						]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm font-bold text-[#303030]",
						children: ["Catatan", /* @__PURE__ */ jsx("textarea", {
							value: answer?.notes ?? "",
							onChange: (event) => setData("answers", [{
								...answer,
								question_id: question.id,
								pariwisata_suvey_option_id: answer?.pariwisata_suvey_option_id ?? "",
								notes: event.target.value,
								documents: answer?.documents ?? []
							}]),
							className: "mt-2 min-h-24 w-full rounded-xl border border-[#DCE3EA] p-3 text-sm font-medium"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm font-bold text-[#303030]",
						children: ["Dokumen Pendukung", /* @__PURE__ */ jsx("input", {
							type: "file",
							multiple: true,
							onChange: (event) => setData("answers", [{
								...answer,
								question_id: question.id,
								pariwisata_suvey_option_id: answer?.pariwisata_suvey_option_id ?? "",
								notes: answer?.notes ?? "",
								documents: [...answer?.documents ?? [], ...Array.from(event.target.files ?? [])]
							}]),
							className: "mt-2 block w-full text-sm"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => onOpenChange(false),
							className: "h-10 rounded-lg border border-[#DDE4EC] px-4 text-sm font-bold",
							children: "Batal"
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "h-10 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white disabled:opacity-60",
							children: "Simpan Jawaban"
						})]
					})
				]
			})]
		})
	});
}
function IstcSurveyTable({ assignmentCode, groups, isViewer }) {
	const [search, setSearch] = useState("");
	const [aspect, setAspect] = useState("all");
	const [closed, setClosed] = useState({});
	const [detailQuestion, setDetailQuestion] = useState(null);
	const [editingQuestion, setEditingQuestion] = useState(null);
	const filteredGroups = useMemo(() => groups.filter((group) => aspect === "all" || group.category_name === aspect).map((group) => ({
		...group,
		questions: group.questions.filter((question) => [
			group.category_name,
			question.criteria_name,
			question.indicator_code,
			question.indicator_name,
			question.answer?.score_label
		].filter(Boolean).some((value) => String(value).toLowerCase().includes(search.toLowerCase())))
	})).filter((group) => group.questions.length > 0), [
		aspect,
		groups,
		search
	]);
	return /* @__PURE__ */ jsxs(Card, {
		className: "overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "border-b border-[#EFEFEF] p-5",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "text-base font-bold text-[#303030]",
						children: "Jawaban Survey ISTC"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm font-semibold text-[#7C7C7C]",
						children: "Pertanyaan, skor, catatan, dan dokumen pendukung survey pariwisata."
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ jsx("input", {
							value: search,
							onChange: (event) => setSearch(event.target.value),
							placeholder: "Cari pertanyaan...",
							className: "h-10 rounded-lg border border-[#DDE4EC] px-3 text-sm"
						}), /* @__PURE__ */ jsxs("select", {
							value: aspect,
							onChange: (event) => setAspect(event.target.value),
							className: "h-10 rounded-lg border border-[#DDE4EC] px-3 text-sm",
							children: [/* @__PURE__ */ jsx("option", {
								value: "all",
								children: "Semua Aspek"
							}), groups.map((group) => /* @__PURE__ */ jsx("option", {
								value: group.category_name,
								children: group.category_name
							}, group.category_name))]
						})]
					})]
				})
			}),
			filteredGroups.map((group) => {
				const percent = group.max_score > 0 ? group.score / group.max_score * 100 : 0;
				return /* @__PURE__ */ jsxs("div", {
					className: "border-b border-[#EFEFEF] last:border-b-0",
					children: [/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setClosed((current) => ({
							...current,
							[group.category_name]: !current[group.category_name]
						})),
						className: "flex w-full flex-col gap-3 bg-[#F8FBFE] p-4 text-left lg:flex-row lg:items-center lg:justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "flex size-8 items-center justify-center rounded-lg bg-white text-[#0066AE]",
								children: /* @__PURE__ */ jsx(ShieldCheck, { size: 18 })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-bold text-[#303030]",
								children: group.category_name
							}), /* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
								children: [
									group.question_count,
									" pertanyaan ·",
									" ",
									group.answered_count,
									" terjawab ·",
									" ",
									group.documents_count,
									" dokumen ·",
									" ",
									group.score,
									" / ",
									group.max_score,
									" poin"
								]
							})] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-[220px] items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-2 flex-1 overflow-hidden rounded-full bg-white",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full bg-[#0066AE]",
									style: { width: `${Math.min(percent, 100)}%` }
								})
							}), /* @__PURE__ */ jsx(ChevronDown, {
								size: 18,
								className: classNames("text-[#0066AE] transition-transform", closed[group.category_name] && "-rotate-90")
							})]
						})]
					}), !closed[group.category_name] && group.questions.map((question, index) => /* @__PURE__ */ jsx(IstcQuestionRow, {
						question,
						number: index + 1,
						isViewer,
						onViewDetail: setDetailQuestion,
						onEditData: setEditingQuestion
					}, question.id))]
				}, group.category_name);
			}),
			filteredGroups.length === 0 && /* @__PURE__ */ jsxs("div", {
				className: "p-12 text-center",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-bold text-[#303030]",
					children: "Data tidak ditemukan"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
					children: "Ubah pencarian atau filter aspek."
				})]
			}),
			/* @__PURE__ */ jsx(AnswerDetailModal, {
				question: detailQuestion,
				open: Boolean(detailQuestion),
				onOpenChange: (open) => {
					if (!open) setDetailQuestion(null);
				}
			}),
			!isViewer && /* @__PURE__ */ jsx(IstcAnswerEditModal, {
				assignmentCode,
				question: editingQuestion,
				open: Boolean(editingQuestion),
				onOpenChange: (open) => {
					if (!open) setEditingQuestion(null);
				}
			})
		]
	});
}
function SelectInput({ label, value, onChange, error, options, placeholder = "Pilih opsi" }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-xs font-bold text-[#303030]",
				children: label
			}),
			/* @__PURE__ */ jsxs("select", {
				value,
				onChange: (event) => onChange(event.target.value),
				className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm text-[#303030] transition outline-none focus:border-[#0066AE]",
				children: [/* @__PURE__ */ jsx("option", {
					value: "",
					children: placeholder
				}), options.map((option) => /* @__PURE__ */ jsx("option", {
					value: option.value,
					children: option.label
				}, option.value))]
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function PariwisataEditSidebar({ open, onClose, assignment, form, categoryOptions, imageUrl, onSubmit }) {
	const { data, setData, processing, errors } = form;
	function selectedOperationalDays() {
		return data.operational_days.split(",").map((day) => day.trim()).filter(Boolean);
	}
	function toggleCategory(value) {
		setData("categories", data.categories.includes(value) ? data.categories.filter((category) => category !== value) : [...data.categories, value]);
	}
	function toggleOperationalDay(day) {
		const selectedDays = selectedOperationalDays();
		setData("operational_days", (selectedDays.includes(day) ? selectedDays.filter((selectedDay) => selectedDay !== day) : operationalDayOptions.filter((option) => selectedDays.includes(option) || option === day)).join(", "));
	}
	function updateArrayField(field, updater) {
		setData(field, updater(data[field]));
	}
	function addAnnualTurnover() {
		updateArrayField("annual_turnovers", (rows) => [...rows, {
			year: "",
			value: "",
			notes: ""
		}]);
	}
	function updateAnnualTurnover(index, values) {
		updateArrayField("annual_turnovers", (rows) => rows.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removeAnnualTurnover(index) {
		updateArrayField("annual_turnovers", (rows) => rows.filter((_, rowIndex) => rowIndex !== index));
	}
	function addAnnualVisitor() {
		updateArrayField("annual_visitors", (rows) => [...rows, {
			year: "",
			value: "",
			notes: ""
		}]);
	}
	function updateAnnualVisitor(index, values) {
		updateArrayField("annual_visitors", (rows) => rows.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removeAnnualVisitor(index) {
		updateArrayField("annual_visitors", (rows) => rows.filter((_, rowIndex) => rowIndex !== index));
	}
	function addVisitorTypeAnnual() {
		updateArrayField("visitor_type_annuals", (rows) => [...rows, {
			year: "",
			visitor_type: "",
			value: "",
			notes: ""
		}]);
	}
	function updateVisitorTypeAnnual(index, values) {
		updateArrayField("visitor_type_annuals", (rows) => rows.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removeVisitorTypeAnnual(index) {
		updateArrayField("visitor_type_annuals", (rows) => rows.filter((_, rowIndex) => rowIndex !== index));
	}
	function addPackage() {
		updateArrayField("packages", (rows) => [...rows, {
			name: "",
			package_type: "",
			duration: "",
			facilities: "",
			description: "",
			price: "",
			is_active: true
		}]);
	}
	function updatePackage(index, values) {
		updateArrayField("packages", (rows) => rows.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removePackage(index) {
		updateArrayField("packages", (rows) => rows.filter((_, rowIndex) => rowIndex !== index));
	}
	function addAnnualWorkerStat() {
		updateArrayField("annual_worker_stats", (rows) => [...rows, {
			year: "",
			dimension: "",
			category_value: "",
			total_people: "",
			notes: ""
		}]);
	}
	function updateAnnualWorkerStat(index, values) {
		updateArrayField("annual_worker_stats", (rows) => rows.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removeAnnualWorkerStat(index) {
		updateArrayField("annual_worker_stats", (rows) => rows.filter((_, rowIndex) => rowIndex !== index));
	}
	function addAnnualWorkerTrainingStat() {
		updateArrayField("annual_worker_training_stats", (rows) => [...rows, {
			year: "",
			training_name: "",
			total_people: "",
			notes: ""
		}]);
	}
	function updateAnnualWorkerTrainingStat(index, values) {
		updateArrayField("annual_worker_training_stats", (rows) => rows.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removeAnnualWorkerTrainingStat(index) {
		updateArrayField("annual_worker_training_stats", (rows) => rows.filter((_, rowIndex) => rowIndex !== index));
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		className: classNames("fixed inset-0 z-40 bg-[#031120]/35 transition-opacity", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"),
		onClick: onClose
	}), /* @__PURE__ */ jsxs("aside", {
		className: classNames("fixed top-0 right-0 z-50 flex h-dvh w-full max-w-[540px] flex-col border-l border-[#DDE4EC] bg-[#F7F7F7] shadow-[-18px_0_40px_rgba(3,17,32,0.18)] transition-transform duration-300", open ? "translate-x-0" : "translate-x-full"),
		"aria-hidden": !open,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-start justify-between gap-4 border-b border-[#E2E8F0] bg-white px-5 py-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-bold text-[#0066AE]",
						children: assignment.village.name
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-1 text-lg font-bold text-[#172033]",
						children: "Edit Data Pariwisata"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs leading-5 font-semibold text-[#64748B]",
						children: "Ubah profil destinasi pariwisata."
					})
				]
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onClose,
				className: "flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white text-[#303030] transition hover:bg-[#F1F5F8]",
				"aria-label": "Tutup edit pariwisata",
				children: /* @__PURE__ */ jsx(X, { size: 18 })
			})]
		}), /* @__PURE__ */ jsxs("form", {
			onSubmit,
			className: "flex min-h-0 flex-1 flex-col",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5",
				children: [
					/* @__PURE__ */ jsxs(EditSection, {
						title: "Identitas Destinasi",
						children: [
							/* @__PURE__ */ jsx(TextInput, {
								label: "Nama Destinasi Wisata",
								value: data.name,
								onChange: (value) => setData("name", value),
								error: fieldError(errors, "name"),
								placeholder: "Nama destinasi",
								required: true
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "block space-y-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#344256]",
										children: "Gambar Pariwisata"
									}),
									imageUrl && !data.image && /* @__PURE__ */ jsx("img", {
										src: imageUrl,
										alt: data.name || "Gambar pariwisata",
										className: "h-32 w-full rounded-xl border border-[#DCE3EA] object-cover"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 rounded-xl border border-dashed border-[#AAD2F8] bg-[#F8FBFE] px-3 py-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#0066AE]",
											children: /* @__PURE__ */ jsx(ImagePlus, { className: "size-5" })
										}), /* @__PURE__ */ jsxs("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ jsx("input", {
												type: "file",
												accept: "image/jpeg,image/png,image/webp",
												onChange: (event) => setData("image", event.target.files?.[0] ?? null),
												className: "w-full text-sm font-semibold text-[#303030] file:mr-3 file:rounded-lg file:border-0 file:bg-[#0066AE] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-1 truncate text-[11px] font-semibold text-[#7C7C7C]",
												children: data.image?.name ?? "Kosongkan jika tidak ingin mengganti gambar"
											})]
										})]
									}),
									/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "image") })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "text-xs font-bold text-[#344256]",
											children: [
												"Kategori Destinasi",
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-[#D81313]",
													children: "*"
												})
											]
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[11px] font-semibold text-[#7C7C7C]",
											children: "Bisa pilih lebih dari satu"
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-2 grid grid-cols-1 gap-2 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2",
										children: categoryOptions.map((option) => {
											return /* @__PURE__ */ jsxs("label", {
												className: "flex min-w-0 cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#303030] ring-1 ring-[#E6ECF2] transition hover:ring-[#AAD2F8]",
												children: [/* @__PURE__ */ jsx(Checkbox, {
													checked: data.categories.includes(option.value),
													onCheckedChange: () => toggleCategory(option.value),
													className: "border-[#AAD2F8] data-[state=checked]:border-[#0066AE] data-[state=checked]:bg-[#0066AE]"
												}), /* @__PURE__ */ jsx("span", {
													className: "truncate",
													children: option.label
												})]
											}, option.value);
										})
									}),
									/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "categories") })
								]
							}),
							/* @__PURE__ */ jsx(TextArea, {
								label: "Alamat Destinasi",
								value: data.address,
								onChange: (value) => setData("address", value),
								error: fieldError(errors, "address"),
								placeholder: "Alamat lengkap destinasi"
							})
						]
					}),
					/* @__PURE__ */ jsxs(EditSection, {
						title: "Operasional dan Tiket",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#344256]",
										children: "Hari Operasional"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-2 grid grid-cols-1 gap-2 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2",
										children: operationalDayOptions.map((day) => {
											return /* @__PURE__ */ jsxs("label", {
												className: "flex min-w-0 cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#303030] ring-1 ring-[#E6ECF2] transition hover:ring-[#AAD2F8]",
												children: [/* @__PURE__ */ jsx(Checkbox, {
													checked: selectedOperationalDays().includes(day),
													onCheckedChange: () => toggleOperationalDay(day),
													className: "border-[#AAD2F8] data-[state=checked]:border-[#0066AE] data-[state=checked]:bg-[#0066AE]"
												}), /* @__PURE__ */ jsx("span", { children: day })]
											}, day);
										})
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "mt-1 text-[11px] font-semibold text-[#7C7C7C]",
										children: [
											"Tersimpan sebagai:",
											" ",
											data.operational_days || "-"
										]
									}),
									/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "operational_days") })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ jsx(TextInput, {
									label: "Jam Operasional",
									value: data.operational_hours,
									onChange: (value) => setData("operational_hours", value),
									error: fieldError(errors, "operational_hours"),
									placeholder: "08.00 - 17.00"
								}), /* @__PURE__ */ jsx(TextInput, {
									label: "Harga Tiket",
									value: data.entrance_ticket_price,
									onChange: (value) => setData("entrance_ticket_price", value),
									error: fieldError(errors, "entrance_ticket_price"),
									placeholder: "25000",
									type: "number"
								})]
							}),
							/* @__PURE__ */ jsx(TextInput, {
								label: "Keterangan Tiket",
								value: data.entrance_ticket_description,
								onChange: (value) => setData("entrance_ticket_description", value),
								error: fieldError(errors, "entrance_ticket_description"),
								placeholder: "Termasuk parkir"
							}),
							/* @__PURE__ */ jsx(TextArea, {
								label: "Catatan Jadwal Operasional",
								value: data.operational_schedule_notes,
								onChange: (value) => setData("operational_schedule_notes", value),
								error: fieldError(errors, "operational_schedule_notes"),
								placeholder: "Catatan libur atau jadwal khusus"
							})
						]
					}),
					/* @__PURE__ */ jsxs(EditSection, {
						title: "Penanggung Jawab",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ jsx(TextInput, {
									label: "Nama PIC",
									value: data.person_in_charge_name,
									onChange: (value) => setData("person_in_charge_name", value),
									error: fieldError(errors, "person_in_charge_name"),
									placeholder: "Nama penanggung jawab"
								}), /* @__PURE__ */ jsx(TextInput, {
									label: "Telepon PIC",
									value: data.person_in_charge_phone,
									onChange: (value) => setData("person_in_charge_phone", value),
									error: fieldError(errors, "person_in_charge_phone"),
									placeholder: "08xxxxxxxxxx"
								})]
							}),
							/* @__PURE__ */ jsx(TextArea, {
								label: "Alamat PIC",
								value: data.person_in_charge_address,
								onChange: (value) => setData("person_in_charge_address", value),
								error: fieldError(errors, "person_in_charge_address"),
								placeholder: "Alamat penanggung jawab"
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "flex items-center justify-between gap-3 rounded-xl border border-[#DCE3EA] bg-white px-3 py-2 text-sm font-bold text-[#303030]",
								children: ["Status Aktif", /* @__PURE__ */ jsx(Checkbox, {
									checked: data.is_active,
									onCheckedChange: (checked) => setData("is_active", Boolean(checked)),
									className: "border-[#AAD2F8] data-[state=checked]:border-[#0066AE] data-[state=checked]:bg-[#0066AE]"
								})]
							}),
							/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "is_active") })
						]
					}),
					/* @__PURE__ */ jsx(EditSection, {
						title: "Omset Tahunan",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								data.annual_turnovers.length === 0 && /* @__PURE__ */ jsx("div", {
									className: "rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-xs font-semibold text-[#64748B]",
										children: "Belum ada omset tahunan"
									})
								}),
								data.annual_turnovers.map((row, index) => /* @__PURE__ */ jsxs("div", {
									className: "grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 sm:col-span-2 sm:grid-cols-2",
										children: [/* @__PURE__ */ jsx(TextInput, {
											label: "Tahun",
											value: row.year,
											onChange: (value) => updateAnnualTurnover(index, { year: digitsOnly(value) }),
											error: fieldError(errors, `annual_turnovers.${index}.year`),
											placeholder: "2024"
										}), /* @__PURE__ */ jsx(TextInput, {
											label: "Nilai Omset",
											value: formatThousands(row.value),
											onChange: (value) => updateAnnualTurnover(index, { value: digitsOnly(value) }),
											error: fieldError(errors, `annual_turnovers.${index}.value`),
											placeholder: "Nominal rupiah"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3 sm:col-span-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "flex-1",
											children: /* @__PURE__ */ jsx(TextInput, {
												label: "Catatan",
												value: row.notes,
												onChange: (value) => updateAnnualTurnover(index, { notes: value }),
												error: fieldError(errors, `annual_turnovers.${index}.notes`),
												placeholder: "Opsional"
											})
										}), /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => removeAnnualTurnover(index),
											className: "mt-[22px] inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-3 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]",
											children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4" }), "Hapus"]
										})]
									})]
								}, index)),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: addAnnualTurnover,
									className: "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
									children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Omset Tahunan"]
								}),
								/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "annual_turnovers") })
							]
						})
					}),
					/* @__PURE__ */ jsx(EditSection, {
						title: "Pengunjung Tahunan",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								data.annual_visitors.length === 0 && /* @__PURE__ */ jsx("div", {
									className: "rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-xs font-semibold text-[#64748B]",
										children: "Belum ada pengunjung tahunan"
									})
								}),
								data.annual_visitors.map((row, index) => /* @__PURE__ */ jsxs("div", {
									className: "grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 sm:col-span-2 sm:grid-cols-2",
										children: [/* @__PURE__ */ jsx(TextInput, {
											label: "Tahun",
											value: row.year,
											onChange: (value) => updateAnnualVisitor(index, { year: digitsOnly(value) }),
											error: fieldError(errors, `annual_visitors.${index}.year`),
											placeholder: "2024"
										}), /* @__PURE__ */ jsx(TextInput, {
											label: "Total Pengunjung",
											value: row.value,
											onChange: (value) => updateAnnualVisitor(index, { value: digitsOnly(value) }),
											error: fieldError(errors, `annual_visitors.${index}.value`),
											placeholder: "1250"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3 sm:col-span-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "flex-1",
											children: /* @__PURE__ */ jsx(TextInput, {
												label: "Catatan",
												value: row.notes,
												onChange: (value) => updateAnnualVisitor(index, { notes: value }),
												error: fieldError(errors, `annual_visitors.${index}.notes`),
												placeholder: "Opsional"
											})
										}), /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => removeAnnualVisitor(index),
											className: "mt-[22px] inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-3 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]",
											children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4" }), "Hapus"]
										})]
									})]
								}, index)),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: addAnnualVisitor,
									className: "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
									children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Pengunjung Tahunan"]
								}),
								/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "annual_visitors") })
							]
						})
					}),
					/* @__PURE__ */ jsx(EditSection, {
						title: "Jenis Pengunjung Tahunan",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								data.visitor_type_annuals.length === 0 && /* @__PURE__ */ jsx("div", {
									className: "rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-xs font-semibold text-[#64748B]",
										children: "Belum ada jenis pengunjung"
									})
								}),
								data.visitor_type_annuals.map((row, index) => /* @__PURE__ */ jsxs("div", {
									className: "grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 sm:col-span-2 sm:grid-cols-3",
										children: [
											/* @__PURE__ */ jsx(TextInput, {
												label: "Tahun",
												value: row.year,
												onChange: (value) => updateVisitorTypeAnnual(index, { year: digitsOnly(value) }),
												error: fieldError(errors, `visitor_type_annuals.${index}.year`),
												placeholder: "2024"
											}),
											/* @__PURE__ */ jsx(SelectInput, {
												label: "Jenis Pengunjung",
												value: row.visitor_type,
												onChange: (value) => updateVisitorTypeAnnual(index, { visitor_type: value }),
												error: fieldError(errors, `visitor_type_annuals.${index}.visitor_type`),
												options: visitorTypeOptions
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Jumlah",
												value: row.value,
												onChange: (value) => updateVisitorTypeAnnual(index, { value: digitsOnly(value) }),
												error: fieldError(errors, `visitor_type_annuals.${index}.value`),
												placeholder: "500"
											})
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3 sm:col-span-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "flex-1",
											children: /* @__PURE__ */ jsx(TextInput, {
												label: "Catatan",
												value: row.notes,
												onChange: (value) => updateVisitorTypeAnnual(index, { notes: value }),
												error: fieldError(errors, `visitor_type_annuals.${index}.notes`),
												placeholder: "Opsional"
											})
										}), /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => removeVisitorTypeAnnual(index),
											className: "mt-[22px] inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-3 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]",
											children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4" }), "Hapus"]
										})]
									})]
								}, index)),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: addVisitorTypeAnnual,
									className: "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
									children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Jenis Pengunjung"]
								}),
								/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "visitor_type_annuals") })
							]
						})
					}),
					/* @__PURE__ */ jsx(EditSection, {
						title: "Paket Wisata",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								data.packages.length === 0 && /* @__PURE__ */ jsx("div", {
									className: "rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-xs font-semibold text-[#64748B]",
										children: "Belum ada paket wisata"
									})
								}),
								data.packages.map((row, index) => /* @__PURE__ */ jsxs("div", {
									className: "space-y-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
											children: [
												/* @__PURE__ */ jsx(TextInput, {
													label: "Nama Paket",
													value: row.name,
													onChange: (value) => updatePackage(index, { name: value }),
													error: fieldError(errors, `packages.${index}.name`),
													placeholder: "Contoh: Paket Jelajah Desa"
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Tipe Paket",
													value: row.package_type,
													onChange: (value) => updatePackage(index, { package_type: value }),
													error: fieldError(errors, `packages.${index}.package_type`),
													placeholder: "Family / Adventure"
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Durasi",
													value: row.duration,
													onChange: (value) => updatePackage(index, { duration: value }),
													error: fieldError(errors, `packages.${index}.duration`),
													placeholder: "2 Hari 1 Malam"
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Harga",
													value: formatThousands(row.price),
													onChange: (value) => updatePackage(index, { price: digitsOnly(value) }),
													error: fieldError(errors, `packages.${index}.price`),
													placeholder: "250.000"
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ jsx(TextArea, {
												label: "Fasilitas",
												value: row.facilities,
												onChange: (value) => updatePackage(index, { facilities: value }),
												error: fieldError(errors, `packages.${index}.facilities`),
												rows: 2,
												placeholder: "Daftar fasilitas paket"
											}), /* @__PURE__ */ jsx(TextArea, {
												label: "Deskripsi",
												value: row.description,
												onChange: (value) => updatePackage(index, { description: value }),
												error: fieldError(errors, `packages.${index}.description`),
												rows: 2,
												placeholder: "Deskripsi singkat paket wisata"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
											children: [/* @__PURE__ */ jsxs("label", {
												className: "flex items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-xs font-semibold text-[#303030]",
												children: [/* @__PURE__ */ jsx(Checkbox, {
													checked: row.is_active,
													onCheckedChange: (checked) => updatePackage(index, { is_active: !!checked }),
													className: "border-[#AAD2F8] data-[state=checked]:border-[#0066AE] data-[state=checked]:bg-[#0066AE]"
												}), "Paket aktif"]
											}), /* @__PURE__ */ jsxs("button", {
												type: "button",
												onClick: () => removePackage(index),
												className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-4 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]",
												children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4" }), "Hapus Paket"]
											})]
										})
									]
								}, index)),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: addPackage,
									className: "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
									children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Paket Wisata"]
								})
							]
						})
					}),
					/* @__PURE__ */ jsx(EditSection, {
						title: "Data Pekerja Tahunan",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								data.annual_worker_stats.length === 0 && /* @__PURE__ */ jsx("div", {
									className: "rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-xs font-semibold text-[#64748B]",
										children: "Belum ada data pekerja"
									})
								}),
								data.annual_worker_stats.map((row, index) => /* @__PURE__ */ jsxs("div", {
									className: "grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 sm:col-span-2 sm:grid-cols-2 lg:grid-cols-4",
										children: [
											/* @__PURE__ */ jsx(TextInput, {
												label: "Tahun",
												value: row.year,
												onChange: (value) => updateAnnualWorkerStat(index, { year: digitsOnly(value) }),
												error: fieldError(errors, `annual_worker_stats.${index}.year`),
												placeholder: "2024"
											}),
											/* @__PURE__ */ jsx(SelectInput, {
												label: "Dimensi",
												value: row.dimension,
												onChange: (value) => updateAnnualWorkerStat(index, { dimension: value }),
												error: fieldError(errors, `annual_worker_stats.${index}.dimension`),
												options: workerDimensionOptions
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Kategori",
												value: row.category_value,
												onChange: (value) => updateAnnualWorkerStat(index, { category_value: value }),
												error: fieldError(errors, `annual_worker_stats.${index}.category_value`),
												placeholder: "Contoh: 18-25 tahun"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Total Orang",
												value: row.total_people,
												onChange: (value) => updateAnnualWorkerStat(index, { total_people: digitsOnly(value) }),
												error: fieldError(errors, `annual_worker_stats.${index}.total_people`),
												placeholder: "10"
											})
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3 sm:col-span-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "flex-1",
											children: /* @__PURE__ */ jsx(TextInput, {
												label: "Catatan",
												value: row.notes,
												onChange: (value) => updateAnnualWorkerStat(index, { notes: value }),
												error: fieldError(errors, `annual_worker_stats.${index}.notes`),
												placeholder: "Opsional"
											})
										}), /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => removeAnnualWorkerStat(index),
											className: "mt-[22px] inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-3 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]",
											children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4" }), "Hapus"]
										})]
									})]
								}, index)),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: addAnnualWorkerStat,
									className: "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
									children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Data Pekerja"]
								}),
								/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "annual_worker_stats") })
							]
						})
					}),
					/* @__PURE__ */ jsx(EditSection, {
						title: "Pelatihan Pekerja Tahunan",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								data.annual_worker_training_stats.length === 0 && /* @__PURE__ */ jsx("div", {
									className: "rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4 text-center",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-xs font-semibold text-[#64748B]",
										children: "Belum ada data pelatihan"
									})
								}),
								data.annual_worker_training_stats.map((row, index) => /* @__PURE__ */ jsxs("div", {
									className: "grid gap-3 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 sm:col-span-2 sm:grid-cols-3",
										children: [
											/* @__PURE__ */ jsx(TextInput, {
												label: "Tahun",
												value: row.year,
												onChange: (value) => updateAnnualWorkerTrainingStat(index, { year: digitsOnly(value) }),
												error: fieldError(errors, `annual_worker_training_stats.${index}.year`),
												placeholder: "2024"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Nama Pelatihan",
												value: row.training_name,
												onChange: (value) => updateAnnualWorkerTrainingStat(index, { training_name: value }),
												error: fieldError(errors, `annual_worker_training_stats.${index}.training_name`),
												placeholder: "Pelatihan hospitality"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Total Peserta",
												value: row.total_people,
												onChange: (value) => updateAnnualWorkerTrainingStat(index, { total_people: digitsOnly(value) }),
												error: fieldError(errors, `annual_worker_training_stats.${index}.total_people`),
												placeholder: "15"
											})
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3 sm:col-span-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "flex-1",
											children: /* @__PURE__ */ jsx(TextInput, {
												label: "Catatan",
												value: row.notes,
												onChange: (value) => updateAnnualWorkerTrainingStat(index, { notes: value }),
												error: fieldError(errors, `annual_worker_training_stats.${index}.notes`),
												placeholder: "Opsional"
											})
										}), /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => removeAnnualWorkerTrainingStat(index),
											className: "mt-[22px] inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#F2C7C7] bg-white px-3 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6]",
											children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4" }), "Hapus"]
										})]
									})]
								}, index)),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: addAnnualWorkerTrainingStat,
									className: "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BFD6EA] bg-white px-4 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
									children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Pelatihan Pekerja"]
								})
							]
						})
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-end gap-2 border-t border-[#E2E8F0] bg-white px-5 py-4",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: onClose,
					className: "inline-flex h-10 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]",
					children: "Batal"
				}), /* @__PURE__ */ jsxs("button", {
					type: "submit",
					disabled: processing,
					className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white transition hover:bg-[#093967] disabled:opacity-60",
					children: [/* @__PURE__ */ jsx(Save, { size: 16 }), processing ? "Menyimpan..." : "Simpan"]
				})]
			})]
		})]
	})] });
}
function clampScore(value) {
	if (!Number.isFinite(value)) return 0;
	return Math.min(100, Math.max(0, value));
}
function formatStatScore(value) {
	return clampScore(value).toLocaleString("id-ID", { maximumFractionDigits: 1 });
}
function PariwisataTrendCharts({ values }) {
	const [selectedVisitorYear, setSelectedVisitorYear] = useState("");
	const [visibleSeries, setVisibleSeries] = useState("all");
	const trendChartData = useMemo(() => buildTrendChartData(values), [values]);
	const visitorYears = useMemo(() => Array.from(new Set(values.visitor_type_annuals.map((row) => row.year).filter(Boolean))).sort((left, right) => Number(right) - Number(left)), [values.visitor_type_annuals]);
	const activeVisitorYear = selectedVisitorYear || visitorYears[0] || "";
	const pieChartData = useMemo(() => activeVisitorYear ? buildVisitorPieData(values, activeVisitorYear) : [], [activeVisitorYear, values]);
	const trendChartConfig = {
		omset: {
			label: "Omset Tahunan",
			color: "#0066AE"
		},
		pengunjung: {
			label: "Pengunjung Tahunan",
			color: "#22C55E"
		}
	};
	const pieChartConfig = pieChartData.reduce((config, row) => {
		config[row.type] = {
			label: row.label,
			color: row.fill
		};
		return config;
	}, {});
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]",
		children: [/* @__PURE__ */ jsxs(Card, {
			className: "overflow-hidden p-5",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-4 border-b border-[#E7ECF2] pb-4 lg:flex-row lg:items-start lg:justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-base font-bold text-[#303030]",
					children: "Omset & Pengunjung Tahunan"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm font-semibold text-[#7C7C7C]",
					children: "Perbandingan performa bisnis dan trafik pengunjung per tahun."
				})] }), /* @__PURE__ */ jsxs(ToggleGroup, {
					type: "single",
					value: visibleSeries,
					onValueChange: (value) => {
						if (value) setVisibleSeries(value);
					},
					variant: "outline",
					size: "sm",
					className: "w-fit",
					children: [
						/* @__PURE__ */ jsx(ToggleGroupItem, {
							value: "all",
							children: "Semua"
						}),
						/* @__PURE__ */ jsx(ToggleGroupItem, {
							value: "omset",
							children: "Omset"
						}),
						/* @__PURE__ */ jsx(ToggleGroupItem, {
							value: "pengunjung",
							children: "Pengunjung"
						})
					]
				})]
			}), trendChartData.length > 0 ? /* @__PURE__ */ jsx("div", {
				className: "pt-5",
				children: /* @__PURE__ */ jsx(ChartContainer, {
					config: trendChartConfig,
					className: "h-[320px] w-full",
					children: /* @__PURE__ */ jsxs(AreaChart, {
						data: trendChartData,
						margin: {
							left: 12,
							right: 12,
							top: 8
						},
						children: [
							/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsxs("linearGradient", {
								id: "fillOmset",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ jsx("stop", {
									offset: "5%",
									stopColor: "var(--color-omset)",
									stopOpacity: .32
								}), /* @__PURE__ */ jsx("stop", {
									offset: "95%",
									stopColor: "var(--color-omset)",
									stopOpacity: .04
								})]
							}), /* @__PURE__ */ jsxs("linearGradient", {
								id: "fillPengunjung",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ jsx("stop", {
									offset: "5%",
									stopColor: "var(--color-pengunjung)",
									stopOpacity: .28
								}), /* @__PURE__ */ jsx("stop", {
									offset: "95%",
									stopColor: "var(--color-pengunjung)",
									stopOpacity: .04
								})]
							})] }),
							/* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
							/* @__PURE__ */ jsx(XAxis, {
								dataKey: "year",
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ jsx(YAxis, {
								tickLine: false,
								axisLine: false,
								width: 72,
								tickFormatter: (value) => visibleSeries === "pengunjung" ? formatVisitorCount(Number(value)) : formatCompactRupiah(Number(value))
							}),
							/* @__PURE__ */ jsx(ChartTooltip, {
								cursor: false,
								content: /* @__PURE__ */ jsx(ChartTooltipContent, {
									labelFormatter: (label) => `Tahun ${label}`,
									valueFormatter: (value, key) => key === "pengunjung" ? formatVisitorCount(value) : formatCompactRupiah(value)
								})
							}),
							/* @__PURE__ */ jsx(ChartLegend, { content: /* @__PURE__ */ jsx(ChartLegendContent, {}) }),
							visibleSeries !== "pengunjung" && /* @__PURE__ */ jsx(Area, {
								type: "monotone",
								dataKey: "omset",
								stroke: "var(--color-omset)",
								fill: "url(#fillOmset)",
								strokeWidth: 2.5,
								activeDot: { r: 5 }
							}),
							visibleSeries !== "omset" && /* @__PURE__ */ jsx(Area, {
								type: "monotone",
								dataKey: "pengunjung",
								stroke: "var(--color-pengunjung)",
								fill: "url(#fillPengunjung)",
								strokeWidth: 2.5,
								activeDot: { r: 5 }
							})
						]
					})
				})
			}) : /* @__PURE__ */ jsx("div", {
				className: "flex min-h-[320px] items-center justify-center rounded-xl bg-[#F8FBFE] text-center",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-bold text-[#303030]",
					children: "Belum ada data omset atau pengunjung tahunan"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
					children: "Isi data tahunan pada form pariwisata untuk menampilkan grafik ini."
				})] })
			})]
		}), /* @__PURE__ */ jsxs(Card, {
			className: "overflow-hidden p-5",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-4 border-b border-[#E7ECF2] pb-4 sm:flex-row sm:items-start sm:justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-base font-bold text-[#303030]",
					children: "Jenis Pengunjung Tahunan"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm font-semibold text-[#7C7C7C]",
					children: "Komposisi pengunjung berdasarkan tahun terpilih."
				})] }), /* @__PURE__ */ jsx("div", {
					className: "w-full sm:w-[170px]",
					children: /* @__PURE__ */ jsxs(Select, {
						value: activeVisitorYear,
						onValueChange: setSelectedVisitorYear,
						disabled: visitorYears.length === 0,
						children: [/* @__PURE__ */ jsx(SelectTrigger, {
							className: "w-full",
							children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih tahun" })
						}), /* @__PURE__ */ jsx(SelectContent, { children: visitorYears.map((year) => /* @__PURE__ */ jsx(SelectItem, {
							value: year,
							children: year
						}, year)) })]
					})
				})]
			}), pieChartData.length > 0 ? /* @__PURE__ */ jsx("div", {
				className: "pt-5",
				children: /* @__PURE__ */ jsx(ChartContainer, {
					config: pieChartConfig,
					className: "mx-auto h-[320px] max-w-[360px]",
					children: /* @__PURE__ */ jsxs(PieChart$1, { children: [
						/* @__PURE__ */ jsx(ChartTooltip, {
							cursor: false,
							content: /* @__PURE__ */ jsx(ChartTooltipContent, {
								hideLabel: true,
								valueFormatter: (value) => formatVisitorCount(value)
							})
						}),
						/* @__PURE__ */ jsx(Pie, {
							data: pieChartData,
							dataKey: "value",
							nameKey: "label",
							innerRadius: 52,
							outerRadius: 96,
							paddingAngle: 3,
							labelLine: false,
							label: ({ cx, cy, midAngle, outerRadius, percent, payload }) => {
								const RADIAN = Math.PI / 180;
								const safeMidAngle = midAngle ?? 0;
								const safePercent = percent ?? 0;
								const radius = Number(outerRadius ?? 0) + 22;
								const x = Number(cx ?? 0) + radius * Math.cos(-safeMidAngle * RADIAN);
								return /* @__PURE__ */ jsx("text", {
									x,
									y: Number(cy ?? 0) + radius * Math.sin(-safeMidAngle * RADIAN),
									fill: payload.fill,
									textAnchor: x > Number(cx ?? 0) ? "start" : "end",
									dominantBaseline: "central",
									className: "text-[11px] font-bold",
									children: `${payload.label} ${(safePercent * 100).toFixed(0)}%`
								});
							},
							children: pieChartData.map((entry) => /* @__PURE__ */ jsx(Cell, { fill: entry.fill }, entry.type))
						}),
						/* @__PURE__ */ jsx(ChartLegend, {
							verticalAlign: "bottom",
							align: "center",
							content: /* @__PURE__ */ jsx(ChartLegendContent, { className: "justify-center pt-4" })
						})
					] })
				})
			}) : /* @__PURE__ */ jsx("div", {
				className: "flex min-h-[320px] items-center justify-center rounded-xl bg-[#F8FBFE] text-center",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-bold text-[#303030]",
					children: "Belum ada data jenis pengunjung"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
					children: "Pilih tahun lain atau isi data jenis pengunjung tahunan terlebih dahulu."
				})] })
			})]
		})]
	});
}
function PariwisataSurveyScoreCharts({ summary }) {
	const aspects = summary.aspects;
	const radarData = aspects.map((aspect) => ({
		name: aspect.name.length > 18 ? aspect.name.slice(0, 18) + "..." : aspect.name,
		fullName: aspect.name,
		score: aspect.score_percent
	}));
	if (radarData.length === 1) {
		radarData.push({
			name: " ",
			fullName: " ",
			score: 0
		});
		radarData.push({
			name: "  ",
			fullName: "  ",
			score: 0
		});
	} else if (radarData.length === 2) radarData.push({
		name: " ",
		fullName: " ",
		score: 0
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5 xl:grid-cols-[0.9fr_1.25fr_1fr]",
		children: [
			/* @__PURE__ */ jsxs(Card, {
				className: "min-h-[360px] p-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-base font-bold text-[#111827]",
						children: "Skor Akhir Survey"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm font-medium text-[#8A97A8]",
						children: "Nilai kesiapan keseluruhan"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-9 flex flex-col items-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "grid size-48 place-items-center rounded-full",
							style: { background: "conic-gradient(#0066AE " + clampScore(summary.final_score) + "%, #EAF3FF 0)" },
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid size-40 place-items-center rounded-full bg-white text-center",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-4xl font-black text-[#093967]",
									children: formatStatScore(summary.final_score)
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs font-bold text-[#7C7C7C]",
									children: "dari 100"
								})]
							})
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-5 text-sm font-bold text-[#303030]",
							children: [
								summary.total_score,
								" / ",
								summary.max_score,
								" poin"
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "min-h-[360px] p-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-base font-bold text-[#111827]",
						children: "Skor per Aspek"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm font-medium text-[#8A97A8]",
						children: "Total skor per aspek"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 h-[260px]",
						children: aspects.length === 0 ? /* @__PURE__ */ jsx("div", {
							className: "grid h-full place-items-center rounded-xl bg-[#F8FBFE] text-sm font-semibold text-[#8A97A8]",
							children: "Belum ada data aspek"
						}) : /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ jsxs(BarChart, {
								data: aspects,
								layout: "vertical",
								margin: {
									left: 8,
									right: 24
								},
								children: [
									/* @__PURE__ */ jsx(CartesianGrid, {
										horizontal: false,
										stroke: "#EAF0F6"
									}),
									/* @__PURE__ */ jsx(XAxis, {
										type: "number",
										domain: [0, 100],
										hide: true
									}),
									/* @__PURE__ */ jsx(YAxis, {
										dataKey: "name",
										type: "category",
										width: 110,
										tick: {
											fill: "#667085",
											fontSize: 11,
											fontWeight: 700
										}
									}),
									/* @__PURE__ */ jsx(Tooltip, {
										formatter: (value, _name, item) => [Number(value).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + "% (" + item.payload.score + "/" + item.payload.max_score + ")", "Skor"],
										contentStyle: {
											border: "1px solid #E5EDF6",
											borderRadius: "12px",
											fontSize: "12px"
										}
									}),
									/* @__PURE__ */ jsx(Bar, {
										dataKey: "score_percent",
										fill: "#0066AE",
										radius: [
											0,
											6,
											6,
											0
										]
									})
								]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "min-h-[360px] p-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-base font-bold text-[#111827]",
						children: "Perbandingan Aspek (Radar)"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm font-medium text-[#8A97A8]",
						children: "Visualisasi nilai antar aspek"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-5 h-[260px]",
						children: aspects.length === 0 ? /* @__PURE__ */ jsx("div", {
							className: "grid h-full place-items-center rounded-xl bg-[#F8FBFE] text-sm font-semibold text-[#8A97A8]",
							children: "Belum ada data aspek"
						}) : /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ jsxs(RadarChart, {
								data: radarData,
								outerRadius: "66%",
								children: [
									/* @__PURE__ */ jsx(PolarGrid, { stroke: "#E4EAF2" }),
									/* @__PURE__ */ jsx(PolarAngleAxis, {
										dataKey: "name",
										tick: {
											fill: "#667085",
											fontSize: 10,
											fontWeight: 700
										}
									}),
									/* @__PURE__ */ jsx(PolarRadiusAxis, {
										domain: [0, 100],
										tick: {
											fill: "#98A2B3",
											fontSize: 9
										},
										axisLine: false
									}),
									/* @__PURE__ */ jsx(Radar, {
										dataKey: "score",
										stroke: "#0066AE",
										strokeWidth: 2,
										fill: "#0066AE",
										fillOpacity: .22
									}),
									/* @__PURE__ */ jsx(Tooltip, {
										formatter: (value) => [formatStatScore(Number(value)) + "%", "Skor"],
										labelFormatter: (label) => radarData.find((item) => item.name === label)?.fullName ?? label,
										contentStyle: {
											border: "1px solid #E5EDF6",
											borderRadius: "12px",
											fontSize: "12px"
										}
									})
								]
							})
						})
					})
				]
			})
		]
	});
}
function ShowPariwisata({ assignment, pariwisata, category_options, pariwisata_survey_summary, pariwisata_survey_groups, edit_values }) {
	const { auth } = usePage().props;
	const isViewer = auth.user?.role === "viewer";
	const [isEditOpen, setIsEditOpen] = useState(false);
	const editForm = useForm(initialEditForm(edit_values));
	function closeEditSidebar() {
		setIsEditOpen(false);
		editForm.clearErrors();
	}
	function submitEdit(event) {
		event.preventDefault();
		editForm.post(update$1.url({
			assignment: assignment.code,
			pariwisata: pariwisata.id
		}), {
			forceFormData: true,
			preserveScroll: true,
			onSuccess: closeEditSidebar
		});
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: `Detail Pariwisata - ${pariwisata.name}` }),
		/* @__PURE__ */ jsx("main", {
			className: "min-h-screen bg-[#F7F7F7] p-4 text-[#303030] sm:p-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[1280px] space-y-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-2 text-xs font-bold",
									children: [
										/* @__PURE__ */ jsx(Link, {
											href: dashboard.url(),
											className: "text-[#0066AE]",
											children: "Dashboard"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-[#B0B0B0]",
											children: "/"
										}),
										/* @__PURE__ */ jsx(Link, {
											href: surveyAssignments.url(),
											className: "text-[#0066AE]",
											children: "Survey Assignment"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-[#B0B0B0]",
											children: "/"
										}),
										/* @__PURE__ */ jsx(Link, {
											href: show.url(assignment.code),
											className: "text-[#0066AE]",
											children: "Detail Assignment"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-[#B0B0B0]",
											children: "/"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-[#7C7C7C]",
											children: "Pariwisata"
										})
									]
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "mt-2 text-2xl leading-tight font-bold text-[#303030] sm:text-[28px]",
									children: "Detail Pariwisata"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 max-w-3xl text-sm leading-6 font-semibold text-[#7C7C7C]",
									children: "Halaman ini hanya menampilkan master data pariwisata. Survey pariwisata dikerjakan dari detail assignment."
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ jsx(Link, {
								href: show.url(assignment.code),
								children: /* @__PURE__ */ jsxs("span", {
									className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]",
									children: [/* @__PURE__ */ jsx(ArrowLeft, { size: 16 }), "Kembali"]
								})
							}), /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setIsEditOpen(true),
								className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967]",
								children: [/* @__PURE__ */ jsx(Pencil, { size: 16 }), "Edit Data"]
							})]
						})]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "overflow-hidden",
						children: [/* @__PURE__ */ jsx("div", {
							className: "border-b border-[#EFEFEF] bg-[#F8FBFE] p-5",
							children: /* @__PURE__ */ jsx("div", {
								className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex min-w-0 gap-4",
									children: [pariwisata.image_url && /* @__PURE__ */ jsx("img", {
										src: pariwisata.image_url,
										alt: pariwisata.name,
										className: "hidden h-24 w-32 shrink-0 rounded-xl border border-[#DDE4EC] object-cover sm:block"
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex flex-wrap gap-2",
												children: [/* @__PURE__ */ jsx("span", {
													className: classNames("rounded-full px-3 py-1 text-xs font-bold", pariwisata.is_active ? "bg-[#EAF8F0] text-[#00893D]" : "bg-[#F1F5F8] text-[#7C7C7C]"),
													children: pariwisata.status_label
												}), pariwisata.categories.map((category) => /* @__PURE__ */ jsx("span", {
													className: "rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-bold text-[#0066AE]",
													children: category.label
												}, category.id))]
											}),
											/* @__PURE__ */ jsx("h2", {
												className: "mt-3 text-xl font-bold text-[#303030]",
												children: pariwisata.name
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "mt-1 text-sm font-semibold text-[#7C7C7C]",
												children: [
													assignment.village.name,
													" ·",
													" ",
													assignment.village.location
												]
											})
										]
									})]
								})
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3",
							children: [
								/* @__PURE__ */ jsx(InfoItem, {
									icon: /* @__PURE__ */ jsx(MapPin, { size: 17 }),
									label: "Alamat",
									value: pariwisata.address
								}),
								/* @__PURE__ */ jsx(InfoItem, {
									icon: /* @__PURE__ */ jsx(CalendarDays, { size: 17 }),
									label: "Hari Operasional",
									value: pariwisata.operational_days
								}),
								/* @__PURE__ */ jsx(InfoItem, {
									icon: /* @__PURE__ */ jsx(CalendarDays, { size: 17 }),
									label: "Jam Operasional",
									value: pariwisata.operational_hours
								}),
								/* @__PURE__ */ jsx(InfoItem, {
									icon: /* @__PURE__ */ jsx(Ticket, { size: 17 }),
									label: "Harga Tiket",
									value: pariwisata.entrance_ticket_price
								}),
								/* @__PURE__ */ jsx(InfoItem, {
									icon: /* @__PURE__ */ jsx(UserRound, { size: 17 }),
									label: "PIC",
									value: pariwisata.person_in_charge_name
								}),
								/* @__PURE__ */ jsx(InfoItem, {
									icon: /* @__PURE__ */ jsx(UserRound, { size: 17 }),
									label: "Telepon PIC",
									value: pariwisata.person_in_charge_phone
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							["Total Skor", pariwisata_survey_summary.total_score + " / " + pariwisata_survey_summary.max_score],
							["Aspek Tertinggi", pariwisata_survey_summary.highest_aspect?.name ?? "-"],
							["Aspek Terendah", pariwisata_survey_summary.lowest_aspect?.name ?? "-"]
						].map(([label, value]) => /* @__PURE__ */ jsxs(Card, {
							className: "p-4",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-bold text-[#7C7C7C]",
								children: label
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-2xl font-bold text-[#303030]",
								children: value
							})]
						}, label))
					}),
					/* @__PURE__ */ jsx(PariwisataSurveyScoreCharts, { summary: pariwisata_survey_summary }),
					/* @__PURE__ */ jsx(PariwisataTrendCharts, { values: edit_values }),
					/* @__PURE__ */ jsx(IstcSurveyTable, {
						assignmentCode: assignment.code,
						groups: pariwisata_survey_groups,
						isViewer
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "overflow-hidden",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "border-b border-[#EFEFEF] p-4",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-base font-bold text-[#303030]",
								children: "Ringkasan Master Data"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm font-semibold text-[#7C7C7C]",
								children: "Paket, data pekerja, dan kontak utama destinasi."
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 p-4 lg:grid-cols-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl border border-[#E2E8F0] bg-[#F8FBFE] p-4",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-bold text-[#303030]",
									children: "Paket Wisata"
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-3 space-y-3",
									children: [(edit_values.packages || []).length === 0 && /* @__PURE__ */ jsx("p", {
										className: "text-sm font-semibold text-[#7C7C7C]",
										children: "Belum ada paket wisata."
									}), (edit_values.packages || []).map((pkg, index) => /* @__PURE__ */ jsxs("div", {
										className: "rounded-xl bg-white px-4 py-3 ring-1 ring-[#E4EAF0]",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-start justify-between gap-3",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ jsx("p", {
														className: "font-bold text-[#303030]",
														children: pkg.name || "-"
													}), /* @__PURE__ */ jsxs("p", {
														className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
														children: [
															pkg.package_type || "Tanpa tipe",
															" ",
															"·",
															" ",
															pkg.duration || "Durasi belum diisi"
														]
													})]
												}), /* @__PURE__ */ jsx("span", {
													className: classNames("rounded-full px-2.5 py-1 text-[11px] font-bold", pkg.is_active ? "bg-[#EAF8F0] text-[#00893D]" : "bg-[#F1F5F8] text-[#7C7C7C]"),
													children: pkg.is_active ? "Aktif" : "Nonaktif"
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-2 text-sm font-semibold text-[#344256]",
												children: pkg.description || "Deskripsi belum diisi"
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "mt-2 text-xs font-bold text-[#0066AE]",
												children: [
													"Harga:",
													" ",
													pkg.price ? `Rp ${formatThousands(pkg.price)}` : "-"
												]
											})
										]
									}, `${pkg.name}-${index}`))]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl border border-[#E2E8F0] bg-[#F8FBFE] p-4",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-bold text-[#303030]",
									children: "Data Pekerja & Pelatihan"
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-3 grid gap-3 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-xl bg-white px-4 py-3 ring-1 ring-[#E4EAF0]",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-xs font-semibold text-[#7C7C7C]",
												children: "Statistik pekerja"
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-1 text-2xl font-bold text-[#303030]",
												children: (edit_values.annual_worker_stats || []).length
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-xl bg-white px-4 py-3 ring-1 ring-[#E4EAF0]",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-xs font-semibold text-[#7C7C7C]",
												children: "Statistik pelatihan"
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-1 text-2xl font-bold text-[#303030]",
												children: (edit_values.annual_worker_training_stats || []).length
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-xl bg-white px-4 py-3 ring-1 ring-[#E4EAF0] sm:col-span-2",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-xs font-semibold text-[#7C7C7C]",
												children: "Alamat PIC"
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-1 text-sm font-bold text-[#303030]",
												children: pariwisata.person_in_charge_address ?? "-"
											})]
										})
									]
								})]
							})]
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(PariwisataEditSidebar, {
			open: isEditOpen,
			onClose: closeEditSidebar,
			assignment,
			form: editForm,
			categoryOptions: category_options,
			imageUrl: pariwisata.image_url,
			onSubmit: submitEdit
		})
	] });
}
//#endregion
export { ShowPariwisata as default };

//# sourceMappingURL=show-pariwisata-CbZs__8K.js.map