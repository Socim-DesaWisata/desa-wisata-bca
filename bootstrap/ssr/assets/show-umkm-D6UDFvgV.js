import { c as surveyAssignments, t as dashboard } from "./routes-D0B6ewM7.js";
import { t as Checkbox } from "./checkbox-BbMatyE1.js";
import { f as update, g as update$1, h as update$2, i as show, m as store, p as destroy } from "./survey-assignments-BfNUxixD.js";
import { i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-UyX6Ddfj.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, BadgeDollarSign, Banknote, CalendarDays, Camera, CheckCircle2, ChevronDown, Download, Eye, FileText, ImageIcon, MapPin, Pencil, Plus, RefreshCcw, Save, Search, Star, Store, Trash2, UserRound, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
//#region resources/js/pages/survey-assignment/show-umkm.tsx
var booleanOptions = [{
	value: "1",
	label: "Ya"
}, {
	value: "0",
	label: "Tidak"
}];
function digitsOnly(value) {
	return value.replace(/\D/g, "");
}
function formatThousands(value) {
	const digits = digitsOnly(value);
	return digits ? new Intl.NumberFormat("id-ID").format(Number(digits)) : "";
}
function emptyAnnualTurnover() {
	return {
		year: String((/* @__PURE__ */ new Date()).getFullYear()),
		value: "",
		notes: ""
	};
}
function emptyAnnualWorkerStat() {
	return {
		year: String((/* @__PURE__ */ new Date()).getFullYear()),
		dimension: "age",
		category_value: "",
		total_people: "",
		notes: ""
	};
}
function emptyAnnualWorkerTrainingStat() {
	return {
		year: String((/* @__PURE__ */ new Date()).getFullYear()),
		training_name: "",
		total_people: "",
		notes: ""
	};
}
var legalBusinessOptions = [
	{
		value: "UD",
		label: "UD"
	},
	{
		value: "CV",
		label: "CV"
	},
	{
		value: "PT",
		label: "PT"
	},
	{
		value: "Perorangan",
		label: "Perorangan"
	}
];
var umkmCategoryOptions = [
	{
		value: "kuliner",
		label: "Kuliner"
	},
	{
		value: "tekstil_dan_kerajinan",
		label: "Tekstil dan Kerajinan"
	},
	{
		value: "fashion_dan_aksesoris",
		label: "Fashion dan Aksesoris"
	},
	{
		value: "kecantikan_dan_kesehatan",
		label: "Kecantikan dan Kesehatan"
	},
	{
		value: "jasa",
		label: "Jasa"
	},
	{
		value: "pertanian",
		label: "Pertanian"
	},
	{
		value: "peternakan",
		label: "Peternakan"
	},
	{
		value: "perikanan",
		label: "Perikanan"
	},
	{
		value: "produk_digital_dan_kreatif",
		label: "Produk Digital dan Kreatif"
	}
];
function initialEditForm(values) {
	return {
		_method: "patch",
		...values,
		product_photo: null
	};
}
function fieldError(errors, name) {
	return errors[name];
}
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
function criteriaLabel(criteriaCode, criteriaName) {
	return criteriaCode + ". " + criteriaName;
}
function Card({ children, className }) {
	return /* @__PURE__ */ jsx("section", {
		className: classNames("rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_16px_rgba(9,57,103,0.06)]", className),
		children
	});
}
function MetricCard({ label, value, helper, icon }) {
	return /* @__PURE__ */ jsx(Card, {
		className: "p-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-bold text-[#7C7C7C]",
					children: label
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-2xl leading-7 font-bold text-[#303030]",
					children: value
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs font-bold text-[#0066AE]",
					children: helper
				})
			] }), /* @__PURE__ */ jsx("span", {
				className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]",
				children: icon
			})]
		})
	});
}
var scoreBuckets = [
	{
		key: "0-20",
		label: "0-20",
		min: 0,
		max: 20,
		color: "#EF4444",
		textColor: "text-[#EF4444]"
	},
	{
		key: "21-40",
		label: "21-40",
		min: 21,
		max: 40,
		color: "#F97316",
		textColor: "text-[#F97316]"
	},
	{
		key: "41-60",
		label: "41-60",
		min: 41,
		max: 60,
		color: "#FACC15",
		textColor: "text-[#CA8A04]"
	},
	{
		key: "61-80",
		label: "61-80",
		min: 61,
		max: 80,
		color: "#22C55E",
		textColor: "text-[#16A34A]"
	},
	{
		key: "81-100",
		label: "81-100",
		min: 81,
		max: 100,
		color: "#2563EB",
		textColor: "text-[#2563EB]"
	}
];
var performanceLegends = [
	{
		label: "Rendah (0-40)",
		color: "#EF4444"
	},
	{
		label: "Cukup (41-60)",
		color: "#FACC15"
	},
	{
		label: "Baik (61-80)",
		color: "#22C55E"
	},
	{
		label: "Sangat Baik (81-100)",
		color: "#2563EB"
	}
];
function clampScore(value) {
	if (!Number.isFinite(value)) return 0;
	return Math.min(100, Math.max(0, value));
}
function answerScorePercent(answer) {
	if (answer.max_score <= 0) return 0;
	return clampScore(answer.score / answer.max_score * 100);
}
function criteriaPerformanceScore(group) {
	if (group.criteria_weight_percent > 0) return clampScore(group.weighted_score / group.criteria_weight_percent * 100);
	if (group.answers.length === 0) return 0;
	return clampScore(group.answers.reduce((total, answer) => total + answerScorePercent(answer), 0) / group.answers.length);
}
function scoreBucketFor(value) {
	const rounded = Math.round(clampScore(value));
	return scoreBuckets.find((bucket) => rounded >= bucket.min && rounded <= bucket.max) ?? scoreBuckets[0];
}
function formatStatScore(value) {
	return clampScore(value).toLocaleString("id-ID", { maximumFractionDigits: 1 });
}
function numericValue(value) {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : 0;
}
function aggregateByYear(rows, valueResolver) {
	const totals = rows.reduce((result, row) => {
		const year = row.year?.trim();
		if (!year) return result;
		result[year] = (result[year] ?? 0) + valueResolver(row);
		return result;
	}, {});
	return Object.entries(totals).map(([year, value]) => ({
		year,
		value
	})).sort((first, second) => Number(first.year) - Number(second.year));
}
function formatCompactNumber(value) {
	return new Intl.NumberFormat("id-ID", {
		notation: "compact",
		maximumFractionDigits: 1
	}).format(value);
}
function AnnualBarChartCard({ title, description, data, barColor, valuePrefix = "" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-w-0 rounded-xl border border-[#E7ECF2] bg-white p-4",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
			className: "text-sm font-bold text-[#303030]",
			children: title
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
			children: description
		})] }), /* @__PURE__ */ jsx("div", {
			className: "mt-4 h-56 w-full",
			children: data.length > 0 ? /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ jsxs(BarChart, {
					data,
					margin: {
						top: 22,
						right: 8,
						left: -18,
						bottom: 0
					},
					accessibilityLayer: true,
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, {
							vertical: false,
							stroke: "#E7ECF2",
							strokeDasharray: "3 3"
						}),
						/* @__PURE__ */ jsx(XAxis, {
							dataKey: "year",
							axisLine: false,
							tickLine: false,
							tickMargin: 8,
							tick: {
								fill: "#64748B",
								fontSize: 11,
								fontWeight: 700
							}
						}),
						/* @__PURE__ */ jsx(YAxis, {
							axisLine: false,
							tickLine: false,
							tickMargin: 8,
							tickFormatter: formatCompactNumber,
							tick: {
								fill: "#94A3B8",
								fontSize: 11,
								fontWeight: 700
							}
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "value",
							fill: barColor,
							radius: [
								8,
								8,
								0,
								0
							],
							children: /* @__PURE__ */ jsx(LabelList, {
								dataKey: "value",
								position: "top",
								offset: 8,
								formatter: (value) => `${valuePrefix}${formatCompactNumber(Number(value ?? 0))}`,
								fill: "#303030",
								fontSize: 11,
								fontWeight: 800
							})
						})
					]
				})
			}) : /* @__PURE__ */ jsx("div", {
				className: "flex h-full items-center justify-center rounded-xl border border-dashed border-[#DDE4EC] bg-[#F8FBFE] px-4 text-center text-xs font-semibold text-[#7C7C7C]",
				children: "Belum ada data tahunan."
			})
		})]
	});
}
function UmkmAnnualCharts({ values }) {
	const turnoverData = aggregateByYear(values.annual_turnovers, (row) => numericValue(row.value));
	const workerData = aggregateByYear(values.annual_worker_stats, (row) => numericValue(row.total_people));
	const trainingData = aggregateByYear(values.annual_worker_training_stats, (row) => numericValue(row.total_people));
	return /* @__PURE__ */ jsx(Card, {
		className: "p-5",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-4 xl:grid-cols-3",
			children: [
				/* @__PURE__ */ jsx(AnnualBarChartCard, {
					title: "Omset Tahunan",
					description: "Total annual_turnovers per tahun",
					data: turnoverData,
					barColor: "#0066AE",
					valuePrefix: "Rp"
				}),
				/* @__PURE__ */ jsx(AnnualBarChartCard, {
					title: "Statistik Pekerja",
					description: "Total annual_worker_stats per tahun",
					data: workerData,
					barColor: "#22C55E"
				}),
				/* @__PURE__ */ jsx(AnnualBarChartCard, {
					title: "Pelatihan Pekerja",
					description: "Total annual_worker_training_stats per tahun",
					data: trainingData,
					barColor: "#F97316"
				})
			]
		})
	});
}
function UmkmSurveyStatistics({ groups }) {
	const criteriaRows = groups.map((group) => ({
		code: group.criteria_code,
		name: criteriaLabel(group.criteria_code, group.criteria_name),
		score: criteriaPerformanceScore(group)
	}));
	const answers = groups.flatMap((group) => group.answers);
	const totalAnswers = answers.length;
	const distribution = scoreBuckets.map((bucket) => {
		const count = answers.filter((answer) => {
			const score = Math.round(answerScorePercent(answer));
			return score >= bucket.min && score <= bucket.max;
		}).length;
		return {
			...bucket,
			count,
			percentage: totalAnswers > 0 ? count / totalAnswers * 100 : 0
		};
	});
	const radius = 58;
	const circumference = 2 * Math.PI * radius;
	let currentOffset = 0;
	return /* @__PURE__ */ jsx(Card, {
		className: "overflow-hidden p-5",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-base font-bold text-[#303030]",
							children: "Performa per Kriteria"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm font-semibold text-[#7C7C7C]",
							children: "Skor tertimbang (0-100)"
						})] })
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-5 space-y-4",
						children: criteriaRows.length > 0 ? criteriaRows.map((row) => {
							const bucket = scoreBucketFor(row.score);
							return /* @__PURE__ */ jsxs("div", {
								className: "grid gap-2 md:grid-cols-[180px_minmax(0,1fr)_52px] md:items-center",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "truncate text-xs font-bold text-[#344256]",
										children: row.name
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative h-7 overflow-hidden rounded-full bg-[#EEF3F8]",
										children: [
											/* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 w-1/5 border-r border-white/90" }),
											/* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-[40%] w-px bg-white/90" }),
											/* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-[60%] w-px bg-white/90" }),
											/* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-[80%] w-px bg-white/90" }),
											/* @__PURE__ */ jsx("div", {
												className: "h-full rounded-full transition-[width]",
												style: {
													width: `${clampScore(row.score)}%`,
													backgroundColor: bucket.color
												}
											})
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-right text-xs font-black text-[#303030]",
										children: formatStatScore(row.score)
									})
								]
							}, row.code);
						}) : /* @__PURE__ */ jsx("div", {
							className: "rounded-xl border border-dashed border-[#DDE4EC] bg-[#F8FBFE] px-4 py-8 text-center text-sm font-semibold text-[#7C7C7C]",
							children: "Belum ada data survey untuk dihitung."
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-4 grid grid-cols-6 gap-2 pl-0 text-[11px] font-bold text-[#8A97A8] md:ml-[180px]",
						children: [
							0,
							20,
							40,
							60,
							80,
							100
						].map((value) => /* @__PURE__ */ jsx("span", {
							className: "text-right first:text-left",
							children: value
						}, value))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-5 flex flex-wrap gap-4",
						children: performanceLegends.map((legend) => /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2 text-xs font-bold text-[#566579]",
							children: [/* @__PURE__ */ jsx("span", {
								className: "size-2.5 rounded-full",
								style: { backgroundColor: legend.color }
							}), legend.label]
						}, legend.label))
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0 border-t border-[#E7ECF2] pt-5 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-base font-bold text-[#303030]",
						children: "Distribusi Skor Jawaban"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-sm font-semibold text-[#7C7C7C]",
						children: [
							"Total ",
							totalAnswers,
							" jawaban"
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-5 grid gap-5 sm:grid-cols-[180px_minmax(0,1fr)] xl:grid-cols-1",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative mx-auto size-44",
							children: [/* @__PURE__ */ jsxs("svg", {
								viewBox: "0 0 160 160",
								className: "size-full -rotate-90",
								"aria-hidden": "true",
								children: [/* @__PURE__ */ jsx("circle", {
									cx: "80",
									cy: "80",
									r: radius,
									fill: "none",
									stroke: "#EEF3F8",
									strokeWidth: "22"
								}), totalAnswers > 0 && distribution.map((bucket) => {
									const length = bucket.percentage / 100 * circumference;
									const dashOffset = -currentOffset;
									currentOffset += length;
									if (bucket.count === 0) return null;
									return /* @__PURE__ */ jsx("circle", {
										cx: "80",
										cy: "80",
										r: radius,
										fill: "none",
										stroke: bucket.color,
										strokeWidth: "22",
										strokeDasharray: `${length} ${circumference - length}`,
										strokeDashoffset: dashOffset
									}, bucket.key);
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "absolute inset-0 flex flex-col items-center justify-center text-center",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-3xl font-black text-[#303030]",
									children: totalAnswers
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs font-bold text-[#7C7C7C]",
									children: "Jawaban"
								})]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-3",
							children: distribution.map((bucket) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between gap-3 rounded-lg bg-[#F8FBFE] px-3 py-2",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2 text-sm font-bold text-[#344256]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "size-2.5 rounded-full",
										style: { backgroundColor: bucket.color }
									}), bucket.label]
								}), /* @__PURE__ */ jsxs("span", {
									className: classNames("text-sm font-black", bucket.textColor),
									children: [
										bucket.count,
										" (",
										formatStatScore(bucket.percentage),
										"%)"
									]
								})]
							}, bucket.key))
						})]
					})
				]
			})]
		})
	});
}
function DetailPair({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-w-0 rounded-lg bg-[#F8FBFE] px-3 py-2",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-[11px] font-black tracking-[0.06em] text-[#7C7C7C] uppercase",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-sm font-bold break-words text-[#303030]",
			children: value || "-"
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
function TextInput({ label, value, onChange, error, placeholder, type = "text", required = false }) {
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
				className: "mt-2 h-10 w-full rounded-xl border border-[#DCE3EA] bg-white px-3 text-sm text-[#172033] transition outline-none placeholder:text-[#9AA7B5] focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15"
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function TextArea({ label, value, onChange, error, placeholder }) {
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
				rows: 3,
				className: "mt-2 w-full resize-y rounded-xl border border-[#DCE3EA] bg-white px-3 py-2 text-sm leading-6 text-[#172033] transition outline-none placeholder:text-[#9AA7B5] focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15"
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function SelectInput({ label, value, onChange, options, error }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-xs font-bold text-[#344256]",
				children: label
			}),
			/* @__PURE__ */ jsxs("select", {
				value,
				onChange: (event) => onChange(event.target.value),
				className: "mt-2 h-10 w-full rounded-xl border border-[#DCE3EA] bg-white px-3 text-sm text-[#172033] transition outline-none focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15",
				children: [/* @__PURE__ */ jsx("option", {
					value: "",
					children: "Pilih data"
				}), options.map((option) => /* @__PURE__ */ jsx("option", {
					value: option.value,
					children: option.label
				}, option.value))]
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function EditSection({ icon, title, description, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-xl border border-[#EFEFEF] bg-[#F8FBFE] p-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [icon && /* @__PURE__ */ jsx("span", {
					className: "text-[#0066AE]",
					children: icon
				}), /* @__PURE__ */ jsx("h3", {
					className: "text-sm font-bold text-[#303030]",
					children: title
				})]
			}), description && /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
				children: description
			})]
		}), children]
	});
}
function QuestionRow({ answer, number, onViewDetail, onEditAnswer }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-3 border-b border-[#EFEFEF] px-4 py-4 last:border-b-0 xl:grid-cols-[38px_minmax(260px,1fr)_104px_78px_118px_180px]",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex size-8 items-center justify-center rounded-full border border-[#CAD7E6] text-xs font-bold text-[#7C7C7C]",
				children: String(number).padStart(2, "0")
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-[11px] font-bold text-[#0066AE]",
					children: ["Pertanyaan ", answer.question_number ?? "-"]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm leading-5 font-semibold text-[#303030]",
					children: answer.question_text
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center",
				children: /* @__PURE__ */ jsxs("div", {
					className: "w-full rounded-lg bg-[#0066AE] px-2.5 py-2.5 text-center text-white shadow-[0_6px_12px_rgba(0,102,174,0.10)]",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-sm font-bold",
						children: [
							answer.score,
							" / ",
							answer.max_score
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-[11px] font-semibold opacity-80",
						children: "Skor"
					})]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center text-xs",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "font-semibold text-[#7C7C7C]",
					children: "Bobot"
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-1 font-bold text-[#303030]",
					children: [answer.question_weight_percent, "%"]
				})] })
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center text-xs",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "font-semibold text-[#7C7C7C]",
					children: "Terakhir diedit"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 font-bold text-[#303030]",
					children: answer.last_edited_at
				})] })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-end gap-2",
				children: [/* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => onViewDetail(answer),
					className: "inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
					children: [/* @__PURE__ */ jsx(Eye, { size: 14 }), "Detail"]
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => onEditAnswer(answer),
					className: "inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-3 text-xs font-bold text-white transition hover:bg-[#093967]",
					children: [/* @__PURE__ */ jsx(Pencil, { size: 14 }), "Edit"]
				})]
			})
		]
	});
}
function AnswerDetailModal({ answer, open, onOpenChange }) {
	if (!answer) return null;
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-2xl",
			children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
				className: "text-[#303030]",
				children: "Detail Jawaban UMKM"
			}), /* @__PURE__ */ jsx(DialogDescription, { children: "Pertanyaan, skor 0-100, bobot, dan informasi pengisian." })] }), /* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "rounded-xl bg-[#F8FBFF] p-4",
						children: [/* @__PURE__ */ jsxs("p", {
							className: "text-xs font-bold text-[#0066AE]",
							children: ["Pertanyaan ", answer.question_number ?? "-"]
						}), /* @__PURE__ */ jsx("h3", {
							className: "mt-2 text-base leading-6 font-bold text-[#303030]",
							children: answer.question_text
						})]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(DetailPair, {
								label: "Skor",
								value: `${answer.score} / ${answer.max_score}`
							}),
							/* @__PURE__ */ jsx(DetailPair, {
								label: "Bobot",
								value: `${answer.question_weight_percent}%`
							}),
							/* @__PURE__ */ jsx(DetailPair, {
								label: "Weighted",
								value: answer.weighted_score
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(DetailPair, {
							label: "Dijawab oleh",
							value: answer.answered_by.name
						}), /* @__PURE__ */ jsx(DetailPair, {
							label: "Dijawab pada",
							value: answer.answered_at
						})]
					})
				]
			})]
		})
	});
}
function AnswerEditModal({ answer, open, form, onSubmit, onOpenChange }) {
	const { data, setData, processing, errors } = form;
	const score = Number(data.score || 0);
	const previewWeighted = answer ? Math.round((score / (answer.max_score || 100) * answer.question_weight_percent + Number.EPSILON) * 100) / 100 : 0;
	if (!answer) return null;
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-xl",
			children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
				className: "text-[#303030]",
				children: "Edit Jawaban UMKM"
			}), /* @__PURE__ */ jsx(DialogDescription, { children: "Ubah skor jawaban pada rentang 0 sampai 100." })] }), /* @__PURE__ */ jsxs("form", {
				onSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "rounded-xl bg-[#F8FBFF] p-4",
						children: [/* @__PURE__ */ jsxs("p", {
							className: "text-xs font-bold text-[#0066AE]",
							children: ["Pertanyaan ", answer.question_number ?? "-"]
						}), /* @__PURE__ */ jsx("h3", {
							className: "mt-2 text-base leading-6 font-bold text-[#303030]",
							children: answer.question_text
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(DetailPair, {
								label: "Skor Saat Ini",
								value: `${answer.score} / ${answer.max_score}`
							}),
							/* @__PURE__ */ jsx(DetailPair, {
								label: "Bobot",
								value: `${answer.question_weight_percent}%`
							}),
							/* @__PURE__ */ jsx(DetailPair, {
								label: "Preview Weighted",
								value: previewWeighted
							})
						]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block min-w-0",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "text-xs font-bold text-[#344256]",
								children: ["Skor Baru ", /* @__PURE__ */ jsx("span", {
									className: "text-[#D81313]",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								type: "number",
								min: "0",
								max: "100",
								step: "0.01",
								value: data.score,
								onChange: (event) => setData("score", event.target.value),
								placeholder: "Masukkan skor 0-100",
								className: "mt-2 h-11 w-full rounded-xl border border-[#DCE3EA] bg-white px-3 text-sm text-[#172033] transition outline-none placeholder:text-[#9AA7B5] focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15"
							}),
							/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "score") })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-end gap-2 border-t border-[#EFEFEF] pt-4",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => onOpenChange(false),
							className: "inline-flex h-10 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]",
							children: "Batal"
						}), /* @__PURE__ */ jsxs("button", {
							type: "submit",
							disabled: processing,
							className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:opacity-60",
							children: [/* @__PURE__ */ jsx(Save, { size: 16 }), processing ? "Menyimpan..." : "Simpan"]
						})]
					})
				]
			})]
		})
	});
}
function DocumentModal({ document, open, form, onSubmit, onOpenChange }) {
	const { data, setData, processing, errors } = form;
	const isEdit = Boolean(document);
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-lg",
			children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
				className: "text-[#303030]",
				children: isEdit ? "Edit Dokumen UMKM" : "Tambah Dokumen UMKM"
			}), /* @__PURE__ */ jsx(DialogDescription, { children: "Isi nama dokumen dan unggah file PDF atau gambar." })] }), /* @__PURE__ */ jsxs("form", {
				onSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsx(TextInput, {
						label: "Nama Dokumen",
						value: data.document_name,
						onChange: (value) => setData("document_name", value),
						error: fieldError(errors, "document_name"),
						placeholder: "Contoh: NIB, Sertifikat Halal, Katalog Produk",
						required: true
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block min-w-0",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "text-xs font-bold text-[#344256]",
								children: [
									"File Dokumen",
									" ",
									!isEdit && /* @__PURE__ */ jsx("span", {
										className: "text-[#D81313]",
										children: "*"
									})
								]
							}),
							/* @__PURE__ */ jsx("input", {
								type: "file",
								accept: "image/*,.pdf",
								onChange: (event) => setData("file", event.target.files?.[0] ?? null),
								className: "mt-2 block w-full text-sm text-[#64748B] file:mr-3 file:h-9 file:rounded-lg file:border-0 file:bg-[#0066AE] file:px-3 file:text-sm file:font-bold file:text-white"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 truncate text-xs text-[#64748B]",
								children: data.file?.name ?? (isEdit ? "Kosongkan jika tidak ingin mengganti file." : "PDF atau gambar, maksimal 5 MB.")
							}),
							/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "file") })
						]
					}),
					document && /* @__PURE__ */ jsxs("a", {
						href: document.file_url,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex h-10 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
						children: [/* @__PURE__ */ jsx(Download, { size: 15 }), "Lihat file saat ini"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-2 border-t border-[#E2E8F0] pt-4",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => onOpenChange(false),
							className: "inline-flex h-10 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]",
							children: "Batal"
						}), /* @__PURE__ */ jsxs("button", {
							type: "submit",
							disabled: processing,
							className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white transition hover:bg-[#093967] disabled:opacity-60",
							children: [/* @__PURE__ */ jsx(Save, { size: 16 }), processing ? "Menyimpan..." : "Simpan"]
						})]
					})
				]
			})]
		})
	});
}
function UmkmEditSidebar({ open, onClose, assignment, umkm, form, photoPreview, onSubmit }) {
	const { data, setData, processing, errors } = form;
	function toggleCategory(value) {
		setData("categories", data.categories.includes(value) ? data.categories.filter((category) => category !== value) : [...data.categories, value]);
	}
	function updateArrayField(field, updater) {
		setData(field, updater(data[field]));
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
						children: "Edit Data UMKM"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs leading-5 font-semibold text-[#64748B]",
						children: "Ubah profil usaha."
					})
				]
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onClose,
				className: "flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white text-[#303030] transition hover:bg-[#F1F5F8]",
				"aria-label": "Tutup edit UMKM",
				children: /* @__PURE__ */ jsx(X, { size: 18 })
			})]
		}), /* @__PURE__ */ jsxs("form", {
			onSubmit,
			className: "flex min-h-0 flex-1 flex-col",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5",
				children: [
					/* @__PURE__ */ jsxs(EditSection, {
						title: "Foto Produk",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 sm:grid-cols-[150px_minmax(0,1fr)]",
							children: [photoPreview ? /* @__PURE__ */ jsx("img", {
								src: photoPreview,
								alt: umkm.name,
								className: "h-36 w-full rounded-xl object-cover"
							}) : /* @__PURE__ */ jsx("div", {
								className: "flex h-36 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0066AE]",
								children: /* @__PURE__ */ jsx(ImageIcon, { size: 30 })
							}), /* @__PURE__ */ jsxs("label", {
								className: "flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#BBD5EC] bg-[#F8FBFE] px-4 text-center transition hover:border-[#0066AE]",
								children: [
									/* @__PURE__ */ jsx(Camera, { className: "size-6 text-[#0066AE]" }),
									/* @__PURE__ */ jsx("span", {
										className: "mt-2 text-sm font-bold text-[#172033]",
										children: "Upload Foto Baru"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "mt-1 text-xs font-semibold text-[#64748B]",
										children: "JPG/PNG maksimal 5MB"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "file",
										accept: "image/*",
										className: "sr-only",
										onChange: (event) => setData("product_photo", event.target.files?.[0] ?? null)
									})
								]
							})]
						}), /* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "product_photo") })]
					}),
					/* @__PURE__ */ jsxs(EditSection, {
						title: "Identitas UMKM",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ jsx(TextInput, {
									label: "Nama Pelaku UMKM",
									value: data.business_owner_name,
									onChange: (value) => setData("business_owner_name", value),
									error: fieldError(errors, "business_owner_name"),
									placeholder: "Nama pemilik/pelaku usaha"
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Nama UMKM",
									value: data.name,
									onChange: (value) => setData("name", value),
									error: fieldError(errors, "name"),
									placeholder: "Nama usaha",
									required: true
								}),
								/* @__PURE__ */ jsx(SelectInput, {
									label: "Nama Lengkap Badan Usaha",
									value: data.legal_business_name,
									onChange: (value) => setData("legal_business_name", value),
									error: fieldError(errors, "legal_business_name"),
									options: legalBusinessOptions
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Tahun Berdiri",
									value: data.established_year,
									onChange: (value) => setData("established_year", value),
									error: fieldError(errors, "established_year"),
									placeholder: "2020",
									type: "number"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "min-w-0 lg:col-span-2",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "text-xs font-bold text-[#344256]",
												children: [
													"Kategori UMKM",
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
											children: umkmCategoryOptions.map((option) => {
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
								/* @__PURE__ */ jsx(TextInput, {
									label: "Merk Dagang",
									value: data.brand_name,
									onChange: (value) => setData("brand_name", value),
									error: fieldError(errors, "brand_name"),
									placeholder: "Nama brand"
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Omset per Tahun",
									value: formatThousands(data.annual_revenue),
									onChange: (value) => setData("annual_revenue", digitsOnly(value)),
									error: fieldError(errors, "annual_revenue"),
									placeholder: "Nominal rupiah"
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Website Perusahaan",
									value: data.company_website_url,
									onChange: (value) => setData("company_website_url", value),
									error: fieldError(errors, "company_website_url"),
									placeholder: "https://contoh.com"
								})
							]
						}), /* @__PURE__ */ jsx(TextArea, {
							label: "Alamat Produksi",
							value: data.production_address,
							onChange: (value) => setData("production_address", value),
							error: fieldError(errors, "production_address"),
							placeholder: "Alamat lengkap tempat produksi"
						})]
					}),
					/* @__PURE__ */ jsxs(EditSection, {
						title: "Produksi dan Legalitas",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ jsx(TextInput, {
									label: "Kapasitas Produksi Bulanan",
									value: data.monthly_production_capacity,
									onChange: (value) => setData("monthly_production_capacity", value),
									error: fieldError(errors, "monthly_production_capacity"),
									placeholder: "500 pcs/bulan"
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Kapasitas Produksi Tahunan",
									value: data.annual_production_capacity,
									onChange: (value) => setData("annual_production_capacity", value),
									error: fieldError(errors, "annual_production_capacity"),
									placeholder: "6000 pcs/tahun"
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Sertifikasi",
									value: data.certifications,
									onChange: (value) => setData("certifications", value),
									error: fieldError(errors, "certifications"),
									placeholder: "Halal, PIRT, BPOM"
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Legalitas dan Sertifikasi",
									value: data.has_business_legality_and_certification,
									onChange: (value) => setData("has_business_legality_and_certification", value),
									error: fieldError(errors, "has_business_legality_and_certification"),
									placeholder: "Status legalitas"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsx(TextArea, {
								label: "Kelayakan Lokasi Produksi",
								value: data.factory_location_feasibility,
								onChange: (value) => setData("factory_location_feasibility", value),
								error: fieldError(errors, "factory_location_feasibility"),
								placeholder: "Catatan kelayakan lokasi produksi"
							}), /* @__PURE__ */ jsx(TextArea, {
								label: "Kendala",
								value: data.current_obstacles,
								onChange: (value) => setData("current_obstacles", value),
								error: fieldError(errors, "current_obstacles"),
								placeholder: "Kendala produksi, pemasaran, bahan baku"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs(EditSection, {
						title: "Marketing",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ jsx(TextInput, {
									label: "Instagram",
									value: data.instagram_url,
									onChange: (value) => setData("instagram_url", value),
									error: fieldError(errors, "instagram_url"),
									placeholder: "https://instagram.com/..."
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Facebook",
									value: data.facebook_url,
									onChange: (value) => setData("facebook_url", value),
									error: fieldError(errors, "facebook_url"),
									placeholder: "https://facebook.com/..."
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Twitter/X",
									value: data.twitter_url,
									onChange: (value) => setData("twitter_url", value),
									error: fieldError(errors, "twitter_url"),
									placeholder: "https://x.com/..."
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Website Marketing",
									value: data.marketing_website_url,
									onChange: (value) => setData("marketing_website_url", value),
									error: fieldError(errors, "marketing_website_url"),
									placeholder: "https://contoh.com"
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Profil E-commerce",
									value: data.ecommerce_profile_url,
									onChange: (value) => setData("ecommerce_profile_url", value),
									error: fieldError(errors, "ecommerce_profile_url"),
									placeholder: "https://marketplace.com/toko"
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Peserta UMKM",
									value: data.is_umkm_participant,
									onChange: (value) => setData("is_umkm_participant", value),
									error: fieldError(errors, "is_umkm_participant"),
									placeholder: "Status peserta"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsx(TextArea, {
								label: "Catatan Marketing",
								value: data.marketing_notes,
								onChange: (value) => setData("marketing_notes", value),
								error: fieldError(errors, "marketing_notes"),
								placeholder: "Catatan pemasaran"
							}), /* @__PURE__ */ jsx(TextArea, {
								label: "Catatan Keberlanjutan",
								value: data.sustainability_notes,
								onChange: (value) => setData("sustainability_notes", value),
								error: fieldError(errors, "sustainability_notes"),
								placeholder: "Catatan sustainability"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs(EditSection, {
						title: "Banking dan Ekspor",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ jsx(TextInput, {
									label: "Nama Bank",
									value: data.bank_name,
									onChange: (value) => setData("bank_name", value),
									error: fieldError(errors, "bank_name"),
									placeholder: "BCA, BRI, Mandiri"
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Nomor Rekening",
									value: data.bank_account_number,
									onChange: (value) => setData("bank_account_number", value),
									error: fieldError(errors, "bank_account_number"),
									placeholder: "Nomor rekening"
								}),
								/* @__PURE__ */ jsx(SelectInput, {
									label: "Memiliki QRIS",
									value: data.has_qris,
									onChange: (value) => setData("has_qris", value),
									options: booleanOptions,
									error: fieldError(errors, "has_qris")
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Provider QRIS",
									value: data.qris_provider,
									onChange: (value) => setData("qris_provider", value),
									error: fieldError(errors, "qris_provider"),
									placeholder: "Provider QRIS"
								}),
								/* @__PURE__ */ jsx(SelectInput, {
									label: "Memiliki EDC",
									value: data.has_edc,
									onChange: (value) => setData("has_edc", value),
									options: booleanOptions,
									error: fieldError(errors, "has_edc")
								}),
								/* @__PURE__ */ jsx(TextInput, {
									label: "Provider EDC",
									value: data.edc_provider,
									onChange: (value) => setData("edc_provider", value),
									error: fieldError(errors, "edc_provider"),
									placeholder: "Provider EDC"
								}),
								/* @__PURE__ */ jsx(SelectInput, {
									label: "Kartu Kredit",
									value: data.has_credit_card,
									onChange: (value) => setData("has_credit_card", value),
									options: booleanOptions,
									error: fieldError(errors, "has_credit_card")
								}),
								/* @__PURE__ */ jsx(SelectInput, {
									label: "Pernah Ekspor",
									value: data.has_exported,
									onChange: (value) => setData("has_exported", value),
									options: booleanOptions,
									error: fieldError(errors, "has_exported")
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsx(TextArea, {
								label: "Catatan Banking",
								value: data.banking_notes,
								onChange: (value) => setData("banking_notes", value),
								error: fieldError(errors, "banking_notes"),
								placeholder: "Catatan pembayaran dan perbankan"
							}), /* @__PURE__ */ jsx(TextArea, {
								label: "Negara Tujuan Ekspor",
								value: data.export_destination_countries,
								onChange: (value) => setData("export_destination_countries", value),
								error: fieldError(errors, "export_destination_countries"),
								placeholder: "Jika ya, sebutkan negaranya"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs(EditSection, {
						icon: /* @__PURE__ */ jsx(Banknote, { size: 16 }),
						title: "Omset Tahunan",
						description: "Tabel annual_turnovers.",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => updateArrayField("annual_turnovers", (rows) => [...rows, emptyAnnualTurnover()]),
									className: "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-[#0066AE] px-3 text-xs font-bold text-white",
									children: [/* @__PURE__ */ jsx(Plus, { size: 14 }), "Tambah"]
								})
							}),
							/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "annual_turnovers") }),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 space-y-3",
								children: [data.annual_turnovers.length === 0 && /* @__PURE__ */ jsx("p", {
									className: "rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]",
									children: "Belum ada data omset tahunan."
								}), data.annual_turnovers.map((row, index) => {
									return /* @__PURE__ */ jsxs("div", {
										className: "rounded-xl border border-[#EFEFEF] bg-white p-3",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [
												/* @__PURE__ */ jsx(TextInput, {
													label: "Tahun",
													value: row.year,
													onChange: (value) => updateArrayField("annual_turnovers", (rows) => rows.map((r, i) => i === index ? {
														...r,
														year: value
													} : r)),
													error: fieldError(errors, `annual_turnovers.${index}.year`),
													type: "number"
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Nilai Omset (Rp)",
													value: formatThousands(row.value),
													onChange: (value) => updateArrayField("annual_turnovers", (rows) => rows.map((r, i) => i === index ? {
														...r,
														value: digitsOnly(value)
													} : r)),
													error: fieldError(errors, `annual_turnovers.${index}.value`)
												}),
												/* @__PURE__ */ jsx("div", {
													className: "sm:col-span-2",
													children: /* @__PURE__ */ jsx(TextInput, {
														label: "Catatan",
														value: row.notes,
														onChange: (value) => updateArrayField("annual_turnovers", (rows) => rows.map((r, i) => i === index ? {
															...r,
															notes: value
														} : r))
													})
												})
											]
										}), /* @__PURE__ */ jsx("div", {
											className: "mt-3 flex justify-end",
											children: /* @__PURE__ */ jsxs("button", {
												type: "button",
												onClick: () => updateArrayField("annual_turnovers", (rows) => rows.filter((_, i) => i !== index)),
												className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#F3C8C8] px-3 text-xs font-bold text-[#D81313] hover:bg-[#FDECEC]",
												children: [/* @__PURE__ */ jsx(Trash2, { size: 14 }), "Hapus"]
											})
										})]
									}, index);
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs(EditSection, {
						icon: /* @__PURE__ */ jsx(UserRound, { size: 16 }),
						title: "Statistik Tenaga Kerja",
						description: "Tabel annual_worker_stats.",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => updateArrayField("annual_worker_stats", (rows) => [...rows, emptyAnnualWorkerStat()]),
									className: "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-[#0066AE] px-3 text-xs font-bold text-white",
									children: [/* @__PURE__ */ jsx(Plus, { size: 14 }), "Tambah"]
								})
							}),
							/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "annual_worker_stats") }),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 space-y-3",
								children: [data.annual_worker_stats.length === 0 && /* @__PURE__ */ jsx("p", {
									className: "rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]",
									children: "Belum ada data tenaga kerja."
								}), data.annual_worker_stats.map((row, index) => {
									return /* @__PURE__ */ jsxs("div", {
										className: "rounded-xl border border-[#EFEFEF] bg-white p-3",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [
												/* @__PURE__ */ jsx(TextInput, {
													label: "Tahun",
													value: row.year,
													onChange: (value) => updateArrayField("annual_worker_stats", (rows) => rows.map((r, i) => i === index ? {
														...r,
														year: value
													} : r)),
													error: fieldError(errors, `annual_worker_stats.${index}.year`),
													type: "number"
												}),
												/* @__PURE__ */ jsx(SelectInput, {
													label: "Dimensi",
													value: row.dimension,
													onChange: (value) => updateArrayField("annual_worker_stats", (rows) => rows.map((r, i) => i === index ? {
														...r,
														dimension: value
													} : r)),
													options: [
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
													],
													error: fieldError(errors, `annual_worker_stats.${index}.dimension`)
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Kategori / Rentang",
													value: row.category_value,
													onChange: (value) => updateArrayField("annual_worker_stats", (rows) => rows.map((r, i) => i === index ? {
														...r,
														category_value: value
													} : r)),
													error: fieldError(errors, `annual_worker_stats.${index}.category_value`)
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Jumlah Orang",
													value: row.total_people,
													onChange: (value) => updateArrayField("annual_worker_stats", (rows) => rows.map((r, i) => i === index ? {
														...r,
														total_people: value
													} : r)),
													error: fieldError(errors, `annual_worker_stats.${index}.total_people`),
													type: "number"
												}),
												/* @__PURE__ */ jsx("div", {
													className: "sm:col-span-2",
													children: /* @__PURE__ */ jsx(TextInput, {
														label: "Catatan",
														value: row.notes,
														onChange: (value) => updateArrayField("annual_worker_stats", (rows) => rows.map((r, i) => i === index ? {
															...r,
															notes: value
														} : r))
													})
												})
											]
										}), /* @__PURE__ */ jsx("div", {
											className: "mt-3 flex justify-end",
											children: /* @__PURE__ */ jsxs("button", {
												type: "button",
												onClick: () => updateArrayField("annual_worker_stats", (rows) => rows.filter((_, i) => i !== index)),
												className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#F3C8C8] px-3 text-xs font-bold text-[#D81313] hover:bg-[#FDECEC]",
												children: [/* @__PURE__ */ jsx(Trash2, { size: 14 }), "Hapus"]
											})
										})]
									}, index);
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs(EditSection, {
						icon: /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }),
						title: "Pelatihan Pekerja",
						description: "Tabel annual_worker_training_stats.",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => updateArrayField("annual_worker_training_stats", (rows) => [...rows, emptyAnnualWorkerTrainingStat()]),
									className: "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-[#0066AE] px-3 text-xs font-bold text-white",
									children: [/* @__PURE__ */ jsx(Plus, { size: 14 }), "Tambah"]
								})
							}),
							/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "annual_worker_training_stats") }),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 space-y-3",
								children: [data.annual_worker_training_stats.length === 0 && /* @__PURE__ */ jsx("p", {
									className: "rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]",
									children: "Belum ada data pelatihan."
								}), data.annual_worker_training_stats.map((row, index) => {
									return /* @__PURE__ */ jsxs("div", {
										className: "rounded-xl border border-[#EFEFEF] bg-white p-3",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [
												/* @__PURE__ */ jsx(TextInput, {
													label: "Tahun",
													value: row.year,
													onChange: (value) => updateArrayField("annual_worker_training_stats", (rows) => rows.map((r, i) => i === index ? {
														...r,
														year: value
													} : r)),
													error: fieldError(errors, `annual_worker_training_stats.${index}.year`),
													type: "number"
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Nama Pelatihan",
													value: row.training_name,
													onChange: (value) => updateArrayField("annual_worker_training_stats", (rows) => rows.map((r, i) => i === index ? {
														...r,
														training_name: value
													} : r)),
													error: fieldError(errors, `annual_worker_training_stats.${index}.training_name`)
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Jumlah Peserta",
													value: row.total_people,
													onChange: (value) => updateArrayField("annual_worker_training_stats", (rows) => rows.map((r, i) => i === index ? {
														...r,
														total_people: value
													} : r)),
													error: fieldError(errors, `annual_worker_training_stats.${index}.total_people`),
													type: "number"
												}),
												/* @__PURE__ */ jsx("div", {
													className: "sm:col-span-2",
													children: /* @__PURE__ */ jsx(TextInput, {
														label: "Catatan",
														value: row.notes,
														onChange: (value) => updateArrayField("annual_worker_training_stats", (rows) => rows.map((r, i) => i === index ? {
															...r,
															notes: value
														} : r))
													})
												})
											]
										}), /* @__PURE__ */ jsx("div", {
											className: "mt-3 flex justify-end",
											children: /* @__PURE__ */ jsxs("button", {
												type: "button",
												onClick: () => updateArrayField("annual_worker_training_stats", (rows) => rows.filter((_, i) => i !== index)),
												className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#F3C8C8] px-3 text-xs font-bold text-[#D81313] hover:bg-[#FDECEC]",
												children: [/* @__PURE__ */ jsx(Trash2, { size: 14 }), "Hapus"]
											})
										})]
									}, index);
								})]
							})
						]
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
					className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:opacity-60",
					children: [/* @__PURE__ */ jsx(Save, { size: 16 }), processing ? "Menyimpan..." : "Simpan Perubahan"]
				})]
			})]
		})]
	})] });
}
function ShowUmkm({ assignment, umkm, survey_summary, survey_groups, edit_values }) {
	const [search, setSearch] = useState("");
	const [groupFilter, setGroupFilter] = useState("all");
	const [openGroups, setOpenGroups] = useState(() => Object.fromEntries(survey_groups.map((group) => [group.criteria_code, true])));
	const [detailAnswer, setDetailAnswer] = useState(null);
	const [editAnswer, setEditAnswer] = useState(null);
	const [editDocument, setEditDocument] = useState(null);
	const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const editForm = useForm(initialEditForm(edit_values));
	const answerEditForm = useForm({ score: "" });
	const documentForm = useForm({
		document_name: "",
		file: null
	});
	const documentDeleteForm = useForm({});
	const photoPreview = useMemo(() => {
		if (editForm.data.product_photo) return URL.createObjectURL(editForm.data.product_photo);
		return umkm.product_photo_url;
	}, [editForm.data.product_photo, umkm.product_photo_url]);
	function closeEditSidebar() {
		setIsEditOpen(false);
		editForm.clearErrors();
	}
	function submitEdit(event) {
		event.preventDefault();
		editForm.post(update.url({
			assignment: assignment.code,
			umkm: umkm.id
		}), {
			forceFormData: true,
			preserveScroll: true,
			onSuccess: closeEditSidebar
		});
	}
	function openAnswerEdit(answer) {
		setEditAnswer(answer);
		answerEditForm.clearErrors();
		answerEditForm.setData("score", String(answer.score));
	}
	function closeAnswerEdit() {
		setEditAnswer(null);
		answerEditForm.clearErrors();
	}
	function submitAnswerEdit(event) {
		event.preventDefault();
		if (!editAnswer) return;
		answerEditForm.patch(update$1.url({
			assignment: assignment.code,
			umkm: umkm.id,
			answer: editAnswer.id
		}), {
			preserveScroll: true,
			onSuccess: closeAnswerEdit
		});
	}
	function openCreateDocument() {
		setEditDocument(null);
		documentForm.clearErrors();
		documentForm.setData({
			document_name: "",
			file: null
		});
		setIsDocumentModalOpen(true);
	}
	function openEditDocument(document) {
		setEditDocument(document);
		documentForm.clearErrors();
		documentForm.setData({
			_method: "patch",
			document_name: document.document_name,
			file: null
		});
		setIsDocumentModalOpen(true);
	}
	function closeDocumentModal() {
		setIsDocumentModalOpen(false);
		setEditDocument(null);
		documentForm.clearErrors();
		documentForm.setData({
			document_name: "",
			file: null
		});
	}
	function submitDocument(event) {
		event.preventDefault();
		if (editDocument) {
			documentForm.post(update$2.url({
				assignment: assignment.code,
				umkm: umkm.id,
				document: editDocument.id
			}), {
				forceFormData: true,
				preserveScroll: true,
				onSuccess: closeDocumentModal
			});
			return;
		}
		documentForm.post(store.url({
			assignment: assignment.code,
			umkm: umkm.id
		}), {
			forceFormData: true,
			preserveScroll: true,
			onSuccess: closeDocumentModal
		});
	}
	function deleteDocument(document) {
		if (!window.confirm("Hapus dokumen pendukung ini?")) return;
		documentDeleteForm.delete(destroy.url({
			assignment: assignment.code,
			umkm: umkm.id,
			document: document.id
		}), { preserveScroll: true });
	}
	const filteredGroups = useMemo(() => survey_groups.filter((group) => groupFilter === "all" || group.criteria_code === groupFilter).map((group) => ({
		...group,
		answers: group.answers.filter((answer) => {
			const keyword = search.toLowerCase();
			return keyword === "" || group.criteria_code.toLowerCase().includes(keyword) || group.criteria_name.toLowerCase().includes(keyword) || answer.question_text.toLowerCase().includes(keyword);
		})
	})).filter((group) => group.answers.length > 0), [
		groupFilter,
		search,
		survey_groups
	]);
	const groupStartNumbers = useMemo(() => filteredGroups.reduce((state, group) => ({
		positions: {
			...state.positions,
			[group.criteria_code]: state.total
		},
		total: state.total + group.answers.length
	}), {
		positions: {},
		total: 0
	}).positions, [filteredGroups]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: `Detail UMKM - ${umkm.name}` }),
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
											children: "UMKM"
										})
									]
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "mt-2 text-2xl leading-tight font-bold text-[#303030] sm:text-[28px]",
									children: "Detail UMKM"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 max-w-3xl text-sm leading-6 font-semibold text-[#7C7C7C]",
									children: "Master UMKM dan tabel jawaban assessment skala 0-100."
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setIsEditOpen(true),
								className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967]",
								children: [/* @__PURE__ */ jsx(Pencil, { size: 16 }), "Edit Data UMKM"]
							}), /* @__PURE__ */ jsx(Link, {
								href: show.url(assignment.code),
								children: /* @__PURE__ */ jsxs("span", {
									className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]",
									children: [/* @__PURE__ */ jsx(ArrowLeft, { size: 16 }), "Kembali"]
								})
							})]
						})]
					}),
					/* @__PURE__ */ jsx(Card, {
						className: "overflow-hidden",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid gap-5 p-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:p-5",
							children: [umkm.product_photo_url ? /* @__PURE__ */ jsx("img", {
								src: umkm.product_photo_url,
								alt: umkm.name,
								className: "h-52 w-full rounded-xl object-cover lg:h-full"
							}) : /* @__PURE__ */ jsx("div", {
								className: "flex h-52 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0066AE]",
								children: /* @__PURE__ */ jsx(ImageIcon, { size: 36 })
							}), /* @__PURE__ */ jsxs("div", {
								className: "min-w-0 space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "min-w-0",
											children: [
												/* @__PURE__ */ jsxs("p", {
													className: "text-xs font-bold text-[#0066AE]",
													children: [
														assignment.village.name,
														" ·",
														" ",
														assignment.village.location
													]
												}),
												/* @__PURE__ */ jsx("h2", {
													className: "mt-1 text-xl font-bold text-[#303030]",
													children: umkm.name
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-1 text-sm font-semibold text-[#7C7C7C]",
													children: umkm.business_owner_name ?? "-"
												}),
												/* @__PURE__ */ jsx("div", {
													className: "mt-3 flex flex-wrap gap-2",
													children: umkm.categories.length > 0 ? umkm.categories.map((category) => /* @__PURE__ */ jsx("span", {
														className: "inline-flex rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[11px] font-bold text-[#0066AE]",
														children: category.label
													}, category.value)) : /* @__PURE__ */ jsx("span", {
														className: "inline-flex rounded-full bg-[#F1F5F8] px-2.5 py-1 text-[11px] font-bold text-[#7C7C7C]",
														children: umkm.product_category ?? "-"
													})
												})
											]
										}), /* @__PURE__ */ jsx("span", {
											className: "inline-flex rounded-full bg-[#EAF8F0] px-3 py-1.5 text-xs font-bold text-[#00893D]",
											children: "Master UMKM"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
										children: [
											/* @__PURE__ */ jsx(DetailPair, {
												label: "Brand",
												value: umkm.brand_name
											}),
											/* @__PURE__ */ jsx(DetailPair, {
												label: "Badan Usaha",
												value: umkm.legal_business_name
											}),
											/* @__PURE__ */ jsx(DetailPair, {
												label: "Tahun Berdiri",
												value: umkm.established_year ?? "-"
											}),
											/* @__PURE__ */ jsx(DetailPair, {
												label: "Omzet",
												value: umkm.annual_revenue
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
										children: [
											/* @__PURE__ */ jsx(DetailPair, {
												label: "QRIS",
												value: umkm.has_qris
											}),
											/* @__PURE__ */ jsx(DetailPair, {
												label: "EDC",
												value: umkm.has_edc
											}),
											/* @__PURE__ */ jsx(DetailPair, {
												label: "Kartu Kredit",
												value: umkm.has_credit_card
											}),
											/* @__PURE__ */ jsx(DetailPair, {
												label: "Ekspor",
												value: umkm.has_exported
											})
										]
									}),
									/* @__PURE__ */ jsx(DetailPair, {
										label: "Alamat Produksi",
										value: umkm.production_address ?? assignment.village.address
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
						children: [
							/* @__PURE__ */ jsx(MetricCard, {
								label: "Jawaban",
								value: String(survey_summary.answered_questions),
								helper: "Total assessment",
								icon: /* @__PURE__ */ jsx(CheckCircle2, { size: 22 })
							}),
							/* @__PURE__ */ jsx(MetricCard, {
								label: "Rata-rata",
								value: String(survey_summary.average_score),
								helper: "Skala 0-100",
								icon: /* @__PURE__ */ jsx(Star, { size: 22 })
							}),
							/* @__PURE__ */ jsx(MetricCard, {
								label: "Weighted Score",
								value: String(survey_summary.weighted_score),
								helper: "Akumulasi bobot",
								icon: /* @__PURE__ */ jsx(BadgeDollarSign, { size: 22 })
							}),
							/* @__PURE__ */ jsx(MetricCard, {
								label: "Update Survey",
								value: survey_summary.last_answered_at,
								helper: "Terakhir diedit",
								icon: /* @__PURE__ */ jsx(CalendarDays, { size: 22 })
							})
						]
					}),
					/* @__PURE__ */ jsx(UmkmAnnualCharts, { values: edit_values }),
					/* @__PURE__ */ jsx(UmkmSurveyStatistics, { groups: survey_groups }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 xl:grid-cols-4",
						children: [
							/* @__PURE__ */ jsxs(Card, {
								className: "p-4 xl:col-span-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ jsxs("h2", {
										className: "flex items-center gap-2 text-sm font-bold text-[#303030]",
										children: [/* @__PURE__ */ jsx(FileText, {
											size: 16,
											className: "text-[#0066AE]"
										}), "Dokumen Pendukung"]
									}), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: openCreateDocument,
										className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-[#0066AE] px-2.5 text-xs font-bold text-white transition hover:bg-[#093967]",
										children: [/* @__PURE__ */ jsx(Plus, { size: 14 }), "Tambah"]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-4 space-y-3",
									children: [umkm.documents.length === 0 && /* @__PURE__ */ jsxs("div", {
										className: "rounded-xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] px-3 py-5 text-center",
										children: [
											/* @__PURE__ */ jsx(FileText, { className: "mx-auto size-7 text-[#0066AE]" }),
											/* @__PURE__ */ jsx("p", {
												className: "mt-2 text-sm font-bold text-[#303030]",
												children: "Belum ada dokumen"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
												children: "Tambahkan dokumen pendukung UMKM."
											})
										]
									}), umkm.documents.map((document) => /* @__PURE__ */ jsxs("div", {
										className: "rounded-xl border border-[#E6EDF4] bg-[#F8FBFE] p-3",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ jsx("span", {
												className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#0066AE] ring-1 ring-[#DDE8F2]",
												children: /* @__PURE__ */ jsx(FileText, { size: 16 })
											}), /* @__PURE__ */ jsxs("div", {
												className: "min-w-0 flex-1",
												children: [
													/* @__PURE__ */ jsx("p", {
														className: "truncate text-sm font-bold text-[#303030]",
														children: document.document_name
													}),
													/* @__PURE__ */ jsxs("p", {
														className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
														children: [
															document.file_size_label,
															" ·",
															" ",
															document.uploaded_by.name
														]
													}),
													/* @__PURE__ */ jsx("p", {
														className: "mt-1 text-[11px] font-semibold text-[#9AA7B5]",
														children: document.created_at
													})
												]
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "mt-3 grid grid-cols-3 gap-2",
											children: [
												/* @__PURE__ */ jsxs("a", {
													href: document.file_url,
													target: "_blank",
													rel: "noreferrer",
													className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#DDE4EC] bg-white px-2 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
													children: [/* @__PURE__ */ jsx(Download, { size: 13 }), "Lihat"]
												}),
												/* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => openEditDocument(document),
													className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#DDE4EC] bg-white px-2 text-xs font-bold text-[#303030] transition hover:bg-[#F1F5F8]",
													children: [/* @__PURE__ */ jsx(Pencil, { size: 13 }), "Edit"]
												}),
												/* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => deleteDocument(document),
													disabled: documentDeleteForm.processing,
													className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#F2C7C7] bg-white px-2 text-xs font-bold text-[#D81313] transition hover:bg-[#FFF6F6] disabled:opacity-60",
													children: [/* @__PURE__ */ jsx(Trash2, { size: 13 }), "Hapus"]
												})
											]
										})]
									}, document.id))]
								})]
							}),
							/* @__PURE__ */ jsxs(Card, {
								className: "p-4",
								children: [/* @__PURE__ */ jsxs("h2", {
									className: "flex items-center gap-2 text-sm font-bold text-[#303030]",
									children: [/* @__PURE__ */ jsx(Store, {
										size: 16,
										className: "text-[#0066AE]"
									}), "Data Ringkas"]
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-4 space-y-3",
									children: [
										/* @__PURE__ */ jsx(DetailPair, {
											label: "Collector",
											value: umkm.collector.name
										}),
										/* @__PURE__ */ jsx(DetailPair, {
											label: "Dibuat Oleh",
											value: umkm.creator.name
										}),
										/* @__PURE__ */ jsx(DetailPair, {
											label: "Kapasitas Bulanan",
											value: umkm.monthly_production_capacity
										}),
										/* @__PURE__ */ jsx(DetailPair, {
											label: "Sertifikasi",
											value: umkm.certifications
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs(Card, {
								className: "p-4",
								children: [/* @__PURE__ */ jsxs("h2", {
									className: "flex items-center gap-2 text-sm font-bold text-[#303030]",
									children: [/* @__PURE__ */ jsx(MapPin, {
										size: 16,
										className: "text-[#0066AE]"
									}), "Marketing dan Bank"]
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-4 space-y-3",
									children: [
										/* @__PURE__ */ jsx(DetailPair, {
											label: "Website",
											value: umkm.company_website_url
										}),
										/* @__PURE__ */ jsx(DetailPair, {
											label: "E-commerce",
											value: umkm.ecommerce_profile_url
										}),
										/* @__PURE__ */ jsx(DetailPair, {
											label: "Bank",
											value: umkm.bank_name
										}),
										/* @__PURE__ */ jsx(DetailPair, {
											label: "Provider QRIS",
											value: umkm.qris_provider
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs(Card, {
								className: "p-4 xl:col-span-4",
								children: [/* @__PURE__ */ jsxs("h2", {
									className: "flex items-center gap-2 text-sm font-bold text-[#303030]",
									children: [/* @__PURE__ */ jsx(UserRound, {
										size: 16,
										className: "text-[#0066AE]"
									}), "Catatan"]
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-4 grid gap-3 md:grid-cols-3",
									children: [
										/* @__PURE__ */ jsx(DetailPair, {
											label: "Kendala",
											value: umkm.current_obstacles
										}),
										/* @__PURE__ */ jsx(DetailPair, {
											label: "Marketing",
											value: umkm.marketing_notes
										}),
										/* @__PURE__ */ jsx(DetailPair, {
											label: "Keberlanjutan",
											value: umkm.sustainability_notes
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "overflow-hidden",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3 border-b border-[#EFEFEF] p-4 lg:flex-row lg:items-center lg:justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-base font-bold text-[#303030]",
								children: "Jawaban Survey UMKM"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm font-semibold text-[#7C7C7C]",
								children: "Tabel jawaban dikelompokkan berdasarkan kriteria assessment."
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "grid gap-2 sm:grid-cols-[minmax(180px,1fr)_180px_auto]",
								children: [
									/* @__PURE__ */ jsxs("label", {
										className: "relative min-w-0",
										children: [/* @__PURE__ */ jsx(Search, {
											size: 16,
											className: "absolute top-1/2 left-3 -translate-y-1/2 text-[#7C7C7C]"
										}), /* @__PURE__ */ jsx("input", {
											value: search,
											onChange: (event) => setSearch(event.target.value),
											placeholder: "Cari pertanyaan...",
											className: "h-10 w-full rounded-lg border border-[#DDE4EC] bg-white pr-3 pl-9 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
										})]
									}),
									/* @__PURE__ */ jsxs("select", {
										value: groupFilter,
										onChange: (event) => setGroupFilter(event.target.value),
										className: "h-10 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]",
										children: [/* @__PURE__ */ jsx("option", {
											value: "all",
											children: "Semua kriteria"
										}), survey_groups.map((group) => /* @__PURE__ */ jsx("option", {
											value: group.criteria_code,
											children: criteriaLabel(group.criteria_code, group.criteria_name)
										}, group.criteria_code))]
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => {
											setSearch("");
											setGroupFilter("all");
										},
										className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]",
										children: [/* @__PURE__ */ jsx(RefreshCcw, { size: 15 }), "Reset"]
									})
								]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ jsxs("div", {
								className: "min-w-[780px]",
								children: [filteredGroups.map((group) => {
									const isOpen = openGroups[group.criteria_code] ?? true;
									return /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => setOpenGroups((current) => ({
											...current,
											[group.criteria_code]: !isOpen
										})),
										className: "flex w-full items-center justify-between gap-3 border-b border-[#DDE9F6] bg-[#F8FBFE] px-4 py-3 text-left transition hover:bg-[#F1F7FD]",
										children: [/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", {
											className: "text-sm font-bold text-[#303030]",
											children: criteriaLabel(group.criteria_code, group.criteria_name)
										}) }), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsxs("p", {
												className: "text-xs font-bold text-[#7C7C7C]",
												children: [
													group.answered_questions,
													" ",
													"jawaban · Pembobotan:",
													" ",
													group.weighted_score
												]
											}), /* @__PURE__ */ jsx("span", {
												className: "flex size-8 items-center justify-center rounded-full border border-[#D6E4F2] bg-white text-[#0066AE]",
												children: /* @__PURE__ */ jsx(ChevronDown, {
													size: 16,
													className: classNames("transition-transform duration-200", isOpen && "rotate-180")
												})
											})]
										})]
									}), isOpen && group.answers.map((answer, index) => /* @__PURE__ */ jsx(QuestionRow, {
										answer,
										number: (groupStartNumbers[group.criteria_code] ?? 0) + index + 1,
										onViewDetail: setDetailAnswer,
										onEditAnswer: openAnswerEdit
									}, answer.id))] }, group.criteria_code);
								}), filteredGroups.length === 0 && /* @__PURE__ */ jsx("div", {
									className: "px-4 py-10 text-center text-sm font-semibold text-[#7C7C7C]",
									children: "Tidak ada jawaban sesuai filter."
								})]
							})
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(AnswerDetailModal, {
			answer: detailAnswer,
			open: Boolean(detailAnswer),
			onOpenChange: (open) => {
				if (!open) setDetailAnswer(null);
			}
		}),
		/* @__PURE__ */ jsx(AnswerEditModal, {
			answer: editAnswer,
			open: Boolean(editAnswer),
			form: answerEditForm,
			onSubmit: submitAnswerEdit,
			onOpenChange: (open) => {
				if (!open) closeAnswerEdit();
			}
		}),
		/* @__PURE__ */ jsx(DocumentModal, {
			document: editDocument,
			open: isDocumentModalOpen,
			form: documentForm,
			onSubmit: submitDocument,
			onOpenChange: (open) => {
				if (!open) closeDocumentModal();
				else setIsDocumentModalOpen(true);
			}
		}),
		/* @__PURE__ */ jsx(UmkmEditSidebar, {
			open: isEditOpen,
			onClose: closeEditSidebar,
			assignment,
			umkm,
			form: editForm,
			photoPreview,
			onSubmit: submitEdit
		})
	] });
}
ShowUmkm.layout = { breadcrumbs: [
	{
		title: "Dashboard",
		href: dashboard()
	},
	{
		title: "Survey Assignment",
		href: surveyAssignments()
	},
	{
		title: "Detail UMKM",
		href: "#"
	}
] };
//#endregion
export { ShowUmkm as default };

//# sourceMappingURL=show-umkm-D6UDFvgV.js.map