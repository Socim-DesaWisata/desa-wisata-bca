import { i as DropdownMenuItem, n as DropdownMenuContent, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-Dez2j4dN.js";
import { c as surveyAssignments, t as dashboard } from "./routes-D0B6ewM7.js";
import { _ as show$1, d as show, n as createUmkm, o as takeSurvey$1, r as exportMethod, s as update$1, t as createPariwisata, u as update, v as takeSurvey } from "./survey-assignments-BfNUxixD.js";
import { i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-UyX6Ddfj.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ArrowLeft, BarChart3, CalendarDays, CheckCircle2, ChevronDown, ClipboardCheck, ClipboardList, Clock3, Download, Eye, FileText, Flag, Folder, MapPin, PanelRightOpen, Plus, RefreshCcw, Save, Search, ShieldCheck, Star, Trash2, Trophy, UserRound, X } from "lucide-react";
//#region resources/js/pages/survey-assignment/show.tsx
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
function currentYearString() {
	return String((/* @__PURE__ */ new Date()).getFullYear());
}
function cloneVillageAnnualForm(values) {
	return {
		annual_population_stats: values.annual_population_stats.map((row) => ({ ...row })),
		vulnerable_group_annuals: values.vulnerable_group_annuals.map((row) => ({ ...row })),
		active_group_annuals: values.active_group_annuals.map((row) => ({ ...row }))
	};
}
function emptyPopulationStat() {
	return {
		year: currentYearString(),
		category_value: "",
		total_people: "",
		notes: ""
	};
}
function emptyVulnerableGroupAnnual() {
	return {
		vulnerable_category: "",
		year: currentYearString(),
		total_people: "",
		notes: ""
	};
}
function emptyActiveGroupAnnual() {
	return {
		active_category: "",
		year: currentYearString(),
		value: "",
		notes: ""
	};
}
function statusClass(status) {
	return {
		assigned: "bg-[#F1F5F8] text-[#0066AE]",
		in_progress: "bg-[#EAF7FF] text-[#0066AE]",
		submitted: "bg-[#EAF3FF] text-[#093967]",
		approved: "bg-[#EAF8F0] text-[#00893D]",
		need_revision: "bg-[#FFF4EA] text-[#C9681E]",
		rejected: "bg-[#FDECEC] text-[#D81313]"
	}[status] ?? "bg-[#F1F5F8] text-[#7C7C7C]";
}
function Card({ children, className }) {
	return /* @__PURE__ */ jsx("section", {
		className: classNames("rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_16px_rgba(9,57,103,0.06)]", className),
		children
	});
}
function Button({ children, variant = "white", className }) {
	return /* @__PURE__ */ jsx("span", {
		className: classNames("inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition active:scale-[0.98]", variant === "white" && "border border-[#DDE4EC] bg-white text-[#303030] hover:bg-[#F1F5F8]", variant === "primary" && "bg-[#0066AE] text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] hover:bg-[#093967]", className),
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
function InfoItem({ icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-w-0 gap-3",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mt-0.5 flex size-7 shrink-0 items-center justify-center text-[#0066AE]",
			children: icon
		}), /* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-xs font-semibold text-[#7C7C7C]",
				children: label
			}), /* @__PURE__ */ jsx("p", {
				className: "truncate text-sm font-bold text-[#303030]",
				children: value || "-"
			})]
		})]
	});
}
function MetricCard({ label, value, helper, icon, tone = "blue" }) {
	return /* @__PURE__ */ jsx(Card, {
		className: "p-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-bold text-[#303030]",
					children: label
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-2xl leading-7 font-bold text-[#303030]",
					children: value
				}),
				/* @__PURE__ */ jsx("p", {
					className: classNames("mt-1 text-xs font-bold", tone === "blue" && "text-[#0066AE]", tone === "green" && "text-[#00893D]", tone === "orange" && "text-[#FF944C]"),
					children: helper
				})
			] }), /* @__PURE__ */ jsx("span", {
				className: classNames("flex size-10 shrink-0 items-center justify-center rounded-full", tone === "blue" && "bg-[#EAF7FF] text-[#0066AE]", tone === "green" && "bg-[#EAF8F0] text-[#00893D]", tone === "orange" && "bg-[#FFF4EA] text-[#FF944C]"),
				children: icon
			})]
		})
	});
}
var aspectScoreBuckets = [
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
var answerScoreBuckets = [
	{
		key: "1",
		label: "Skor 1",
		min: 1,
		max: 1,
		color: "#EF4444",
		textColor: "text-[#EF4444]"
	},
	{
		key: "2",
		label: "Skor 2",
		min: 2,
		max: 2,
		color: "#F97316",
		textColor: "text-[#F97316]"
	},
	{
		key: "3",
		label: "Skor 3",
		min: 3,
		max: 3,
		color: "#FACC15",
		textColor: "text-[#CA8A04]"
	},
	{
		key: "4",
		label: "Skor 4",
		min: 4,
		max: 4,
		color: "#22C55E",
		textColor: "text-[#16A34A]"
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
function scoreBucketFor(value) {
	const rounded = Math.round(clampScore(value));
	return aspectScoreBuckets.find((bucket) => rounded >= bucket.min && rounded <= bucket.max) ?? aspectScoreBuckets[0];
}
function formatStatScore(value) {
	return clampScore(value).toLocaleString("id-ID", { maximumFractionDigits: 1 });
}
function ScoreBar({ aspect }) {
	const bucket = scoreBucketFor(aspect.score_percent);
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2 md:grid-cols-[180px_minmax(0,1fr)_52px] md:items-center",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "truncate text-xs font-bold text-[#344256]",
				children: aspect.name
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
							width: `${clampScore(aspect.score_percent)}%`,
							backgroundColor: bucket.color
						}
					})
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-right text-xs font-black text-[#303030]",
				children: formatStatScore(aspect.score_percent)
			})
		]
	});
}
function SurveyStatistics({ aspects }) {
	const answers = aspects.flatMap((aspect) => aspect.questions.map((q) => q.answer).filter(Boolean));
	const totalAnswers = answers.length;
	const distribution = answerScoreBuckets.map((bucket) => {
		const count = answers.filter((answer) => {
			return (answer ? Math.round(answer.score) : 0) === bucket.min;
		}).length;
		return {
			...bucket,
			count,
			percentage: totalAnswers > 0 ? count / totalAnswers * 100 : 0
		};
	});
	return /* @__PURE__ */ jsx(StatisticsChartCard, {
		aspects: aspects.map((aspect) => ({
			name: aspect.name,
			score_percent: aspect.score_percent
		})),
		distribution: distribution.map((bucket) => ({
			...bucket,
			score: bucket.min
		}))
	});
}
function StatisticsChartCard({ aspects, distribution }) {
	const totalAnswers = distribution.reduce((total, bucket) => total + bucket.count, 0);
	const normalizedDistribution = distribution.map((bucket) => ({
		...bucket,
		percentage: bucket.percentage ?? (totalAnswers > 0 ? bucket.count / totalAnswers * 100 : 0)
	}));
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
							children: "Skor per Aspek"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm font-semibold text-[#7C7C7C]",
							children: "Skor tertimbang (0-100)"
						})] })
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-5 space-y-4",
						children: aspects.map((aspect) => /* @__PURE__ */ jsx(ScoreBar, { aspect }, aspect.name))
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
								}), totalAnswers > 0 && normalizedDistribution.map((bucket) => {
									const length = (bucket.percentage ?? 0) / 100 * circumference;
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
							children: normalizedDistribution.map((bucket) => /* @__PURE__ */ jsxs("div", {
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
										formatStatScore(bucket.percentage ?? 0),
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
function DocumentBadge({ document }) {
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
				children: [/* @__PURE__ */ jsx("p", {
					className: "truncate text-xs font-bold text-[#303030]",
					children: document.file_name
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
				"aria-label": `Lihat ${document.file_name}`,
				children: /* @__PURE__ */ jsx(Eye, { size: 14 })
			}),
			/* @__PURE__ */ jsx("a", {
				href: document.file_url,
				download: true,
				className: "flex size-7 shrink-0 items-center justify-center rounded border border-[#DDE4EC] text-[#0066AE]",
				"aria-label": `Unduh ${document.file_name}`,
				children: /* @__PURE__ */ jsx(Download, { size: 14 })
			})
		]
	});
}
function QuestionRow({ question, number, onViewDetail, onViewHistory }) {
	const answered = Boolean(question.answer);
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-3 border-b border-[#EFEFEF] px-4 py-4 last:border-b-0 xl:grid-cols-[38px_minmax(220px,1.25fr)_170px_minmax(240px,.95fr)_130px_130px_112px]",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex size-8 items-center justify-center rounded-full border border-[#CAD7E6] text-xs font-bold text-[#7C7C7C]",
				children: String(number).padStart(2, "0")
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm leading-5 font-semibold text-[#303030]",
					children: question.question_text
				}), question.document_hint && /* @__PURE__ */ jsx("p", {
					className: "mt-2 text-xs font-semibold text-[#7C7C7C]",
					children: question.document_hint
				})]
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
				className: "min-w-0",
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
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 text-xs",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "flex items-center gap-2 font-semibold text-[#7C7C7C]",
					children: [/* @__PURE__ */ jsx(UserRound, {
						size: 14,
						className: "text-[#0066AE]"
					}), "Dijawab oleh"]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 font-bold text-[#303030]",
					children: question.answer?.answered_by.name ?? "-"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 text-xs",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "flex items-center gap-2 font-semibold text-[#7C7C7C]",
					children: [/* @__PURE__ */ jsx(Clock3, {
						size: 14,
						className: "text-[#0066AE]"
					}), "Terakhir diedit"]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 font-bold text-[#303030]",
					children: question.answer?.last_edited_at ?? "-"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center",
				children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
						children: ["Action", /* @__PURE__ */ jsx(ChevronDown, { size: 14 })]
					})
				}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
					align: "end",
					className: "w-44 rounded-lg border-[#EFEFEF] bg-white text-xs shadow-[0_12px_30px_rgba(3,17,32,0.14)]",
					children: [/* @__PURE__ */ jsxs(DropdownMenuItem, {
						className: "gap-2 text-xs",
						onClick: () => onViewDetail(question),
						children: [/* @__PURE__ */ jsx(Eye, { className: "size-4 text-[#303030]" }), "Lihat Detail"]
					}), /* @__PURE__ */ jsxs(DropdownMenuItem, {
						className: "gap-2 text-xs",
						onClick: () => onViewHistory(question),
						children: [/* @__PURE__ */ jsx(Clock3, { className: "size-4 text-[#303030]" }), "Lihat Riwayat"]
					})]
				})] })
			})
		]
	});
}
function PariwisataQuestionRow({ question, number, onViewDetail }) {
	const answered = Boolean(question.answer);
	const title = question.indicator_name ?? question.criteria_name ?? "-";
	const meta = [question.criteria_code ? `${question.criteria_code}  ${question.criteria_name ?? "-"}` : null, question.indicator_code ? `${question.indicator_code}` : null].filter(Boolean);
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-3 border-b border-[#EFEFEF] px-4 py-4 last:border-b-0 xl:grid-cols-[38px_minmax(220px,1.25fr)_170px_minmax(240px,.95fr)_130px_130px_112px]",
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
						children: title
					}),
					meta.length > 0 && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs font-semibold text-[#0066AE]",
						children: meta.join("  ")
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
							" / ",
							question.max_score || "-"
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "line-clamp-2 text-[11px] font-semibold opacity-80",
						children: question.answer?.score_label ?? "Belum dijawab"
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
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
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 text-xs",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "flex items-center gap-2 font-semibold text-[#7C7C7C]",
					children: [/* @__PURE__ */ jsx(UserRound, {
						size: 14,
						className: "text-[#0066AE]"
					}), "Dijawab oleh"]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 font-bold text-[#303030]",
					children: question.answer?.answered_by.name ?? "-"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 text-xs",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "flex items-center gap-2 font-semibold text-[#7C7C7C]",
					children: [/* @__PURE__ */ jsx(Clock3, {
						size: 14,
						className: "text-[#0066AE]"
					}), "Terakhir diedit"]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 font-bold text-[#303030]",
					children: question.answer?.last_edited_at ?? "-"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center",
				children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
						children: ["Action", /* @__PURE__ */ jsx(ChevronDown, { size: 14 })]
					})
				}), /* @__PURE__ */ jsx(DropdownMenuContent, {
					align: "end",
					className: "w-44 rounded-lg border-[#EFEFEF] bg-white text-xs shadow-[0_12px_30px_rgba(3,17,32,0.14)]",
					children: /* @__PURE__ */ jsxs(DropdownMenuItem, {
						className: "gap-2 text-xs",
						onClick: () => onViewDetail(question),
						children: [/* @__PURE__ */ jsx(Eye, { className: "size-4 text-[#303030]" }), "Lihat Detail"]
					})
				})] })
			})
		]
	});
}
function PariwisataAnswerDetailModal({ question, open, onOpenChange }) {
	if (!question) return null;
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-3xl",
			children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
				className: "text-[#303030]",
				children: "Detail Jawaban Survey ISTC"
			}), /* @__PURE__ */ jsx(DialogDescription, { children: "Pertanyaan, opsi jawaban, skor terpilih, catatan, dan file pendukung." })] }), /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "rounded-xl bg-[#F8FBFF] p-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-2 text-xs font-bold text-[#0066AE]",
								children: [question.criteria_code && /* @__PURE__ */ jsx("span", { children: question.criteria_code }), question.indicator_code && /* @__PURE__ */ jsxs("span", { children: [" ", question.indicator_code] })]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-2 text-base leading-6 font-bold text-[#303030]",
								children: question.indicator_name ?? question.criteria_name ?? "-"
							}),
							question.indicator_description && /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm font-semibold text-[#7C7C7C]",
								children: question.indicator_description
							}),
							question.document_hint && /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm font-semibold text-[#7C7C7C]",
								children: question.document_hint
							})
						]
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
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "font-semibold text-[#303030]",
									children: option.label
								}), option.description && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
									children: option.description
								})] })]
							}, option.id);
						})
					})] }),
					/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h4", {
						className: "text-sm font-bold text-[#303030]",
						children: "Catatan Jawaban"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-2 rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm font-semibold text-[#303030]",
						children: question.answer?.notes || "Tidak ada catatan."
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
function SidebarCard({ title, icon, children }) {
	return /* @__PURE__ */ jsxs(Card, {
		className: "overflow-hidden",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 border-b border-[#EFEFEF] px-4 py-3",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-[#0066AE]",
				children: icon
			}), /* @__PURE__ */ jsx("h3", {
				className: "text-sm font-bold text-[#303030]",
				children: title
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "p-4",
			children
		})]
	});
}
function TabButton({ active, label, count, icon, onClick }) {
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		className: classNames("inline-flex h-11 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-bold transition", active ? "bg-[#0066AE] text-white shadow-[0_10px_22px_rgba(0,102,174,0.18)]" : "border border-[#DDE4EC] bg-white text-[#303030] hover:bg-[#F1F5F8]"),
		children: [
			icon,
			/* @__PURE__ */ jsx("span", { children: label }),
			/* @__PURE__ */ jsx("span", {
				className: classNames("rounded-full px-2 py-0.5 text-[11px] font-black", active ? "bg-white/20 text-white" : "bg-[#EAF3FF] text-[#0066AE]"),
				children: count
			})
		]
	});
}
function EmptyState({ title, description }) {
	return /* @__PURE__ */ jsxs(Card, {
		className: "px-4 py-12 text-center",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-sm font-bold text-[#303030]",
			children: title
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
			children: description
		})]
	});
}
function UmkmTab({ umkms, assignmentCode }) {
	const averageScore = umkms.length ? Math.round(umkms.reduce((total, umkm) => total + umkm.survey_summary.average_score, 0) / umkms.length * 10) / 10 : 0;
	const rankedUmkms = [...umkms].sort((first, second) => second.survey_summary.weighted_score - first.survey_summary.weighted_score);
	const highestUmkm = rankedUmkms[0] ?? null;
	const lowestUmkm = rankedUmkms[rankedUmkms.length - 1] ?? null;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-3 rounded-xl border border-[#D7E8F8] bg-[#F8FBFE] p-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-base font-bold text-[#303030]",
					children: "Data UMKM dan Assessment"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm font-semibold text-[#7C7C7C]",
					children: "Master UMKM ditampilkan bersama ringkasan dan jawaban assessment 0-100."
				})] }), /* @__PURE__ */ jsx(Link, {
					href: createUmkm.url(assignmentCode),
					children: /* @__PURE__ */ jsxs(Button, {
						variant: "primary",
						children: [/* @__PURE__ */ jsx(ClipboardCheck, { size: 16 }), "Tambah UMKM"]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Total UMKM",
						value: String(umkms.length),
						helper: "Master terdata",
						icon: /* @__PURE__ */ jsx(Folder, { size: 22 })
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Rata-rata Skor",
						value: String(averageScore),
						helper: "Skala 0-100",
						icon: /* @__PURE__ */ jsx(Star, { size: 22 })
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "UMKM Skor Tertinggi",
						value: highestUmkm ? String(highestUmkm.survey_summary.weighted_score) : "-",
						helper: highestUmkm?.name ?? "Belum ada data",
						icon: /* @__PURE__ */ jsx(ClipboardCheck, { size: 22 })
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "UMKM Skor Terendah",
						value: lowestUmkm ? String(lowestUmkm.survey_summary.weighted_score) : "-",
						helper: lowestUmkm?.name ?? "Belum ada data",
						icon: /* @__PURE__ */ jsx(CheckCircle2, { size: 22 }),
						tone: umkms.length ? "green" : "orange"
					})
				]
			}),
			umkms.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
				title: "Belum ada UMKM",
				description: "Tambahkan UMKM dari tombol Tambah UMKM untuk mulai assessment."
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: umkms.map((umkm) => /* @__PURE__ */ jsx(UmkmCard, {
					umkm,
					assignmentCode
				}, umkm.id))
			})
		]
	});
}
function UmkmCard({ umkm, assignmentCode }) {
	return /* @__PURE__ */ jsx(Card, {
		className: "overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(9,57,103,0.10)]",
		children: /* @__PURE__ */ jsxs("div", {
			className: "p-4",
			children: [umkm.product_photo_url ? /* @__PURE__ */ jsx("img", {
				src: umkm.product_photo_url,
				alt: umkm.name,
				className: "h-40 w-full rounded-xl object-cover"
			}) : /* @__PURE__ */ jsx("div", {
				className: "flex h-40 items-center justify-center rounded-xl bg-[#EAF3FF] px-4 text-center text-sm font-bold text-[#0066AE]",
				children: umkm.name
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-4 min-w-0",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "inline-flex rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[11px] font-bold text-[#0066AE]",
									children: umkm.product_category ?? "Tanpa kategori"
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-2 line-clamp-1 text-base font-bold text-[#303030]",
									children: umkm.name
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 line-clamp-1 text-sm font-semibold text-[#7C7C7C]",
									children: umkm.business_owner_name ?? "Pemilik belum diisi"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "shrink-0 rounded-xl bg-[#F8FBFE] px-3 py-2 text-right",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-black tracking-[0.06em] text-[#7C7C7C] uppercase",
								children: "Skor"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-lg font-bold text-[#093967]",
								children: umkm.survey_summary.weighted_score
							})]
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 line-clamp-2 text-sm leading-5 font-semibold text-[#7C7C7C]",
						children: umkm.production_address ?? "Alamat produksi belum diisi"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 grid grid-cols-2 gap-2 text-xs",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "rounded-lg bg-[#F7F7F7] px-3 py-2",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-[#7C7C7C]",
								children: "Brand"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-0.5 truncate font-bold text-[#303030]",
								children: umkm.brand_name ?? "-"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "rounded-lg bg-[#F7F7F7] px-3 py-2",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-[#7C7C7C]",
								children: "Jawaban"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-0.5 font-bold text-[#303030]",
								children: umkm.survey_summary.answered_questions
							})]
						})]
					}),
					/* @__PURE__ */ jsxs(Link, {
						href: show.url({
							assignment: assignmentCode,
							umkm: umkm.id
						}),
						className: "mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
						children: [/* @__PURE__ */ jsx(Eye, { size: 14 }), "Lihat Survey UMKM"]
					})
				]
			})]
		})
	});
}
function PariwisataTab({ pariwisata, assignmentCode, surveySummary, surveyGroups }) {
	const [search, setSearch] = useState("");
	const [aspectFilter, setAspectFilter] = useState("all");
	const [detailQuestion, setDetailQuestion] = useState(null);
	const [closedAspects, setClosedAspects] = useState({});
	const filteredGroups = useMemo(() => surveyGroups.filter((group) => aspectFilter === "all" || group.category_name === aspectFilter).map((group) => ({
		...group,
		questions: group.questions.filter((question) => {
			const value = search.toLowerCase();
			const haystacks = [
				group.category_name,
				question.criteria_code,
				question.criteria_name,
				question.indicator_code,
				question.indicator_name,
				question.indicator_description,
				question.answer?.score_label
			].filter(Boolean).map((item) => String(item).toLowerCase());
			return value === "" || haystacks.some((item) => item.includes(value));
		})
	})).filter((group) => group.questions.length > 0), [
		aspectFilter,
		search,
		surveyGroups
	]);
	function toggleAspect(aspectName) {
		setClosedAspects((current) => ({
			...current,
			[aspectName]: !current[aspectName]
		}));
	}
	const activeCount = pariwisata.filter((item) => item.is_active).length;
	const distribution = answerScoreBuckets.map((bucket) => {
		const summary = surveySummary.distribution.find((item) => item.score === bucket.min);
		return {
			...bucket,
			score: bucket.min,
			count: summary?.count ?? 0
		};
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-3 rounded-xl border border-[#D7E8F8] bg-[#F8FBFE] p-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-base font-bold text-[#303030]",
					children: "Data Master ISTC"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm font-semibold text-[#7C7C7C]",
					children: "Satu assignment memiliki satu survey pariwisata. Kartu di bawah hanya menampilkan master data destinasi."
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ jsx(Link, {
						href: takeSurvey.url({ assignment: assignmentCode }),
						children: /* @__PURE__ */ jsxs(Button, {
							variant: "primary",
							children: [/* @__PURE__ */ jsx(ClipboardList, { size: 16 }), "Isi Survey Pariwisata"]
						})
					}), /* @__PURE__ */ jsx(Link, {
						href: createPariwisata.url(assignmentCode),
						children: /* @__PURE__ */ jsxs(Button, { children: [/* @__PURE__ */ jsx(MapPin, { size: 16 }), "Tambah ISTC"] })
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Total Skor",
						value: `${surveySummary.total_score} / ${surveySummary.max_score}`,
						helper: "Skor kumulatif survey ISTC",
						icon: /* @__PURE__ */ jsx(BarChart3, { size: 22 })
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Nilai Akhir",
						value: String(surveySummary.final_score),
						helper: `${surveySummary.answered_questions} dari ${surveySummary.total_questions} terjawab`,
						icon: /* @__PURE__ */ jsx(Star, { size: 22 })
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Aspek Tertinggi",
						value: surveySummary.highest_aspect?.name ?? "-",
						helper: surveySummary.highest_aspect ? String(surveySummary.highest_aspect.score_percent) : "-",
						icon: /* @__PURE__ */ jsx(Trophy, { size: 22 }),
						tone: "green"
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Perlu Perhatian",
						value: surveySummary.lowest_aspect?.name ?? "-",
						helper: surveySummary.lowest_aspect ? String(surveySummary.lowest_aspect.score_percent) : "-",
						icon: /* @__PURE__ */ jsx(AlertTriangle, { size: 22 }),
						tone: "orange"
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Total ISTC",
						value: String(pariwisata.length),
						helper: "Master pariwisata",
						icon: /* @__PURE__ */ jsx(Folder, { size: 22 })
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "ISTC Aktif",
						value: String(activeCount),
						helper: `Dokumen ${surveySummary.total_documents} file`,
						icon: /* @__PURE__ */ jsx(CheckCircle2, { size: 22 }),
						tone: "green"
					})
				]
			}),
			/* @__PURE__ */ jsx(StatisticsChartCard, {
				aspects: surveySummary.aspects,
				distribution
			}),
			pariwisata.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
				title: "Belum ada data ISTC",
				description: "Tambahkan master ISTC untuk desa pada assignment ini."
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: pariwisata.map((item) => /* @__PURE__ */ jsx(PariwisataCard, {
					item,
					assignmentCode
				}, item.id))
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "overflow-hidden",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "border-b border-[#EFEFEF] p-4",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3 lg:flex-row lg:items-center",
							children: [
								/* @__PURE__ */ jsxs("label", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ jsx(Search, {
										size: 16,
										className: "absolute top-1/2 left-3 -translate-y-1/2 text-[#7C7C7C]"
									}), /* @__PURE__ */ jsx("input", {
										value: search,
										onChange: (event) => setSearch(event.target.value),
										className: "h-10 w-full rounded-lg border border-[#DDE4EC] bg-white pr-3 pl-9 text-sm outline-none focus:border-[#0066AE]",
										placeholder: "Cari pertanyaan, aspek, atau kode..."
									})]
								}),
								/* @__PURE__ */ jsxs("select", {
									value: aspectFilter,
									onChange: (event) => setAspectFilter(event.target.value),
									className: "h-10 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]",
									children: [/* @__PURE__ */ jsx("option", {
										value: "all",
										children: "Semua Aspek"
									}), surveyGroups.map((group) => /* @__PURE__ */ jsx("option", {
										value: group.category_name,
										children: group.category_name
									}, group.category_name))]
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => {
										setSearch("");
										setAspectFilter("all");
									},
									children: /* @__PURE__ */ jsxs(Button, { children: [/* @__PURE__ */ jsx(RefreshCcw, { size: 16 }), "Reset"] })
								})
							]
						})
					}),
					filteredGroups.map((group) => {
						const scorePercent = group.max_score > 0 ? Math.round(group.score / group.max_score * 1e3) / 10 : 0;
						return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => toggleAspect(group.category_name),
							className: "flex w-full flex-col gap-3 border-b border-[#DDE9F6] bg-[#EAF3FF] px-4 py-3 text-left transition hover:bg-[#DDEFFF] sm:flex-row sm:items-center sm:justify-between",
							"aria-expanded": !closedAspects[group.category_name],
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex min-w-0 items-center gap-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#0066AE]",
									children: /* @__PURE__ */ jsx(ShieldCheck, {
										size: 18,
										strokeWidth: 2.1
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-x-5 gap-y-1",
									children: [
										/* @__PURE__ */ jsx("h3", {
											className: "text-sm font-bold text-[#303030]",
											children: group.category_name
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "text-xs font-semibold text-[#303030]",
											children: [group.question_count, " pertanyaan"]
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "text-xs font-semibold text-[#303030]",
											children: [group.answered_count, " terjawab"]
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "text-xs font-semibold text-[#303030]",
											children: [group.documents_count, " dokumen"]
										})
									]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "grid min-w-[180px] grid-cols-[1fr_58px_20px] items-center gap-3",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "h-2 overflow-hidden rounded-full bg-white",
										children: /* @__PURE__ */ jsx("div", {
											className: "h-full rounded-full bg-[#0066AE]",
											style: { width: `${Math.min(scorePercent, 100)}%` }
										})
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-right text-xs font-bold text-[#0066AE]",
										children: scorePercent
									}),
									/* @__PURE__ */ jsx(ChevronDown, {
										size: 18,
										className: classNames("text-[#0066AE] transition-transform", closedAspects[group.category_name] && "-rotate-90")
									})
								]
							})]
						}), !closedAspects[group.category_name] && group.questions.map((question, index) => /* @__PURE__ */ jsx(PariwisataQuestionRow, {
							question,
							number: index + 1,
							onViewDetail: setDetailQuestion
						}, question.id))] }, group.category_name);
					}),
					filteredGroups.length === 0 && /* @__PURE__ */ jsxs("div", {
						className: "px-4 py-12 text-center",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-bold text-[#303030]",
							children: "Data tidak ditemukan"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
							children: "Ubah pencarian atau filter aspek."
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(PariwisataAnswerDetailModal, {
				question: detailQuestion,
				open: Boolean(detailQuestion),
				onOpenChange: (open) => {
					if (!open) setDetailQuestion(null);
				}
			})
		]
	});
}
function PariwisataCard({ item, assignmentCode }) {
	return /* @__PURE__ */ jsx(Card, {
		className: "overflow-hidden p-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(9,57,103,0.10)]",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: classNames("rounded-full px-2.5 py-1 text-[11px] font-bold", item.is_active ? "bg-[#EAF8F0] text-[#00893D]" : "bg-[#F1F5F8] text-[#7C7C7C]"),
										children: item.status_label
									}),
									item.categories.slice(0, 2).map((category) => /* @__PURE__ */ jsx("span", {
										className: "rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[11px] font-bold text-[#0066AE]",
										children: category.label
									}, category.id)),
									item.categories.length > 2 && /* @__PURE__ */ jsxs("span", {
										className: "rounded-full bg-[#F1F5F8] px-2.5 py-1 text-[11px] font-bold text-[#7C7C7C]",
										children: ["+", item.categories.length - 2]
									})
								]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-3 line-clamp-1 text-base font-bold text-[#303030]",
								children: item.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 line-clamp-2 text-sm leading-5 font-semibold text-[#7C7C7C]",
								children: item.address ?? "-"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "shrink-0 rounded-2xl bg-[#F8FBFE] px-4 py-3 text-right ring-1 ring-[#E4EAF0]",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-[10px] font-black tracking-[0.06em] text-[#7C7C7C] uppercase",
							children: "Status"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-lg leading-6 font-bold text-[#093967]",
							children: item.status_label
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-2 text-xs sm:grid-cols-2 xl:grid-cols-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 rounded-lg bg-[#F7F7F7] px-3 py-2",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-[#7C7C7C]",
								children: "Kategori"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-0.5 truncate font-bold text-[#303030]",
								children: item.categories.length > 0 ? item.categories.map((category) => category.label).join(", ") : "-"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 rounded-lg bg-[#F7F7F7] px-3 py-2",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-[#7C7C7C]",
								children: "PIC"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-0.5 truncate font-bold text-[#303030]",
								children: item.person_in_charge_name ?? "-"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 rounded-lg bg-[#F7F7F7] px-3 py-2",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-[#7C7C7C]",
								children: "Tiket"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-0.5 truncate font-bold text-[#303030]",
								children: item.entrance_ticket_price
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 rounded-lg bg-[#F7F7F7] px-3 py-2",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-[#7C7C7C]",
								children: "No. PIC"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-0.5 truncate font-bold text-[#303030]",
								children: item.person_in_charge_phone ?? "-"
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid gap-2 sm:grid-cols-1",
					children: /* @__PURE__ */ jsx(Link, {
						href: show$1.url({
							assignment: assignmentCode,
							pariwisata: item.id
						}),
						children: /* @__PURE__ */ jsxs(Button, {
							className: "w-full",
							children: [/* @__PURE__ */ jsx(Eye, { size: 16 }), "Lihat Detail"]
						})
					})
				})
			]
		})
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
				children: "Detail Jawaban Survey"
			}), /* @__PURE__ */ jsx(DialogDescription, { children: "Pertanyaan, opsi jawaban, skor terpilih, dan file pendukung." })] }), /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "rounded-xl bg-[#F8FBFF] p-4",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-base leading-6 font-bold text-[#303030]",
							children: question.question_text
						}), question.document_hint && /* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm font-semibold text-[#7C7C7C]",
							children: question.document_hint
						})]
					}),
					/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h4", {
						className: "text-sm font-bold text-[#303030]",
						children: "Opsi Jawaban"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-2 divide-y divide-[#EFEFEF] rounded-xl border border-[#EFEFEF]",
						children: question.options.map((option) => {
							return /* @__PURE__ */ jsxs("div", {
								className: classNames("grid gap-3 px-4 py-3 text-sm sm:grid-cols-[72px_1fr]", option.id === question.answer?.survey_question_option_id && "bg-[#EAF3FF]"),
								children: [/* @__PURE__ */ jsxs("span", {
									className: "font-bold text-[#0066AE]",
									children: ["Skor ", option.score]
								}), /* @__PURE__ */ jsx("span", {
									className: "font-semibold text-[#303030]",
									children: option.label
								})]
							}, option.id);
						})
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
function AnswerHistoryModal({ question, open, onOpenChange }) {
	const histories = question?.answer?.histories ?? [];
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-h-[86vh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-2xl",
			children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
				className: "text-[#303030]",
				children: "Riwayat Jawaban"
			}), /* @__PURE__ */ jsxs(DialogDescription, { children: [
				"Perubahan jawaban untuk ",
				question?.code ?? "-",
				"."
			] })] }), /* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [histories.map((history) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-xl border border-[#EFEFEF] bg-white p-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-bold text-[#303030]",
								children: history.action
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold text-[#7C7C7C]",
								children: history.created_at
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
							children: ["Oleh ", history.actor.name]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 grid gap-3 text-xs sm:grid-cols-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "rounded-lg bg-[#F7F7F7] p-3",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "font-bold text-[#7C7C7C]",
										children: "Sebelum"
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "mt-1 font-semibold text-[#303030]",
										children: ["Skor ", history.old_score ?? "-"]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1 leading-5 font-semibold text-[#303030]",
										children: history.old_option_label ?? "-"
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "rounded-lg bg-[#EAF3FF] p-3",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "font-bold text-[#0066AE]",
										children: "Sesudah"
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "mt-1 font-semibold text-[#303030]",
										children: ["Skor ", history.new_score ?? "-"]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1 leading-5 font-semibold text-[#303030]",
										children: history.new_option_label ?? "-"
									})
								]
							})]
						})
					]
				}, history.id)), histories.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "rounded-xl bg-[#F7F7F7] px-4 py-6 text-center text-sm font-semibold text-[#7C7C7C]",
					children: "Belum ada riwayat perubahan untuk jawaban ini."
				})]
			})]
		})
	});
}
function SurveyAssignmentShow({ assignment, summary, aspects, umkms, pariwisata, pariwisata_survey_groups, pariwisata_survey_summary, activities, edit_options, edit_values, village_annual_edit_values }) {
	const [activeTab, setActiveTab] = useState("desa");
	const [search, setSearch] = useState("");
	const [aspectFilter, setAspectFilter] = useState("all");
	const [detailQuestion, setDetailQuestion] = useState(null);
	const [historyQuestion, setHistoryQuestion] = useState(null);
	const [closedAspects, setClosedAspects] = useState({});
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isVillageAnnualOpen, setIsVillageAnnualOpen] = useState(false);
	const { data, setData, patch, processing, errors, clearErrors, reset } = useForm(edit_values);
	const villageAnnualForm = useForm(cloneVillageAnnualForm(village_annual_edit_values));
	const filteredAspects = useMemo(() => aspects.filter((aspect) => aspectFilter === "all" || aspect.name === aspectFilter).map((aspect) => ({
		...aspect,
		questions: aspect.questions.filter((question) => {
			const value = search.toLowerCase();
			return value === "" || aspect.name.toLowerCase().includes(value) || question.question_text.toLowerCase().includes(value);
		}).sort((first, second) => first.sort_order - second.sort_order || first.id - second.id)
	})).filter((aspect) => aspect.questions.length > 0), [
		aspectFilter,
		aspects,
		search
	]);
	const villageTitle = `Assessment ${assignment.village.name}`;
	function toggleAspect(aspectName) {
		setClosedAspects((current) => ({
			...current,
			[aspectName]: !current[aspectName]
		}));
	}
	function openEditSidebar() {
		setData({ ...edit_values });
		clearErrors();
		setIsEditOpen(true);
	}
	function closeEditSidebar() {
		setIsEditOpen(false);
		reset();
		clearErrors();
	}
	function openVillageAnnualSidebar() {
		villageAnnualForm.setData(cloneVillageAnnualForm(village_annual_edit_values));
		villageAnnualForm.clearErrors();
		setIsVillageAnnualOpen(true);
	}
	function closeVillageAnnualSidebar() {
		setIsVillageAnnualOpen(false);
		villageAnnualForm.reset();
		villageAnnualForm.clearErrors();
	}
	function updatePopulationStat(index, key, value) {
		villageAnnualForm.setData("annual_population_stats", villageAnnualForm.data.annual_population_stats.map((row, rowIndex) => rowIndex === index ? {
			...row,
			[key]: value
		} : row));
	}
	function updateVulnerableGroupAnnual(index, key, value) {
		villageAnnualForm.setData("vulnerable_group_annuals", villageAnnualForm.data.vulnerable_group_annuals.map((row, rowIndex) => rowIndex === index ? {
			...row,
			[key]: value
		} : row));
	}
	function updateActiveGroupAnnual(index, key, value) {
		villageAnnualForm.setData("active_group_annuals", villageAnnualForm.data.active_group_annuals.map((row, rowIndex) => rowIndex === index ? {
			...row,
			[key]: value
		} : row));
	}
	function submitVillageAnnualData(event) {
		event.preventDefault();
		villageAnnualForm.patch(update.url(assignment.code), {
			preserveScroll: true,
			onSuccess: () => setIsVillageAnnualOpen(false)
		});
	}
	function submitAssignment(event) {
		event.preventDefault();
		patch(update$1.url(assignment.code), {
			preserveScroll: true,
			onSuccess: () => setIsEditOpen(false)
		});
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: villageTitle }),
		/* @__PURE__ */ jsx("main", {
			className: "min-h-screen bg-[#F7F7F7] p-4 text-[#303030] sm:p-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[1440px]",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-xs font-bold",
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
									/* @__PURE__ */ jsx("span", {
										className: "text-[#7C7C7C]",
										children: "Detail"
									})
								]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "mt-2 text-2xl leading-tight font-bold text-[#303030] sm:text-[28px]",
								children: "Detail Survey Assignment"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-[#7C7C7C]",
								children: "Data assignment, jawaban, skor, dokumen, dan riwayat pengisian langsung dari database."
							})
						] }), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ jsx(Link, {
									href: surveyAssignments.url(),
									children: /* @__PURE__ */ jsxs(Button, { children: [/* @__PURE__ */ jsx(ArrowLeft, { size: 16 }), "Kembali"] })
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: openEditSidebar,
									children: /* @__PURE__ */ jsxs(Button, { children: [/* @__PURE__ */ jsx(PanelRightOpen, { size: 16 }), "Edit Assignment"] })
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: openVillageAnnualSidebar,
									children: /* @__PURE__ */ jsxs(Button, { children: [/* @__PURE__ */ jsx(PanelRightOpen, { size: 16 }), "Edit Data Desa"] })
								}),
								/* @__PURE__ */ jsx("a", {
									href: exportMethod.url(assignment.code),
									children: /* @__PURE__ */ jsxs(Button, { children: [/* @__PURE__ */ jsx(Download, { size: 16 }), "Export Excel"] })
								}),
								/* @__PURE__ */ jsx(Link, {
									href: takeSurvey$1.url(assignment.code),
									children: /* @__PURE__ */ jsxs(Button, {
										variant: "primary",
										children: [/* @__PURE__ */ jsx(ClipboardList, { size: 16 }), "Take Survey"]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-5 overflow-x-auto pb-1",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-max gap-2",
							children: [
								/* @__PURE__ */ jsx(TabButton, {
									active: activeTab === "desa",
									label: "Kemenpar",
									count: summary.total_questions,
									icon: /* @__PURE__ */ jsx(MapPin, { size: 16 }),
									onClick: () => setActiveTab("desa")
								}),
								/* @__PURE__ */ jsx(TabButton, {
									active: activeTab === "umkm",
									label: "UMKM",
									count: umkms.length,
									icon: /* @__PURE__ */ jsx(ClipboardCheck, { size: 16 }),
									onClick: () => setActiveTab("umkm")
								}),
								/* @__PURE__ */ jsx(TabButton, {
									active: activeTab === "pariwisata",
									label: "ISTC",
									count: pariwisata.length,
									icon: /* @__PURE__ */ jsx(Flag, { size: 16 }),
									onClick: () => setActiveTab("pariwisata")
								})
							]
						})
					}),
					activeTab === "desa" && /* @__PURE__ */ jsxs("div", {
						className: "mt-5 grid gap-5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 space-y-5",
							children: [
								/* @__PURE__ */ jsx(Card, {
									className: "overflow-hidden",
									children: /* @__PURE__ */ jsxs("div", {
										className: "grid gap-4 p-4 lg:grid-cols-[220px_minmax(0,1fr)]",
										children: [assignment.village.cover_url ? /* @__PURE__ */ jsx("img", {
											src: assignment.village.cover_url,
											alt: assignment.village.name,
											className: "h-[210px] w-full rounded-lg object-cover lg:h-full"
										}) : /* @__PURE__ */ jsx("div", {
											className: "flex h-[210px] w-full items-center justify-center rounded-lg bg-[#EAF3FF] text-center text-lg font-bold text-[#0066AE] lg:h-full",
											children: assignment.village.name
										}), /* @__PURE__ */ jsxs("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
												children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
													className: "text-xl font-bold text-[#303030]",
													children: villageTitle
												}), /* @__PURE__ */ jsx("p", {
													className: "mt-1 text-sm text-[#7C7C7C]",
													children: assignment.template.title
												})] }), /* @__PURE__ */ jsx("span", {
													className: classNames("inline-flex h-8 w-fit items-center rounded-full px-4 text-xs font-bold", statusClass(assignment.status)),
													children: assignment.status_label
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3",
												children: [
													/* @__PURE__ */ jsx(InfoItem, {
														icon: /* @__PURE__ */ jsx(ClipboardCheck, { size: 18 }),
														label: "Kode Assignment",
														value: assignment.code
													}),
													/* @__PURE__ */ jsx(InfoItem, {
														icon: /* @__PURE__ */ jsx(Flag, { size: 18 }),
														label: "Status",
														value: assignment.status_label
													}),
													/* @__PURE__ */ jsx(InfoItem, {
														icon: /* @__PURE__ */ jsx(UserRound, { size: 18 }),
														label: "Assigned By",
														value: assignment.assigned_by_user.name
													}),
													/* @__PURE__ */ jsx(InfoItem, {
														icon: /* @__PURE__ */ jsx(MapPin, { size: 18 }),
														label: "Lokasi",
														value: assignment.village.location
													}),
													/* @__PURE__ */ jsx(InfoItem, {
														icon: /* @__PURE__ */ jsx(CalendarDays, { size: 18 }),
														label: "Last Saved",
														value: assignment.last_saved_at
													}),
													/* @__PURE__ */ jsx(InfoItem, {
														icon: /* @__PURE__ */ jsx(Folder, { size: 18 }),
														label: "Dokumen Pendukung",
														value: `${summary.total_documents} file`
													})
												]
											})]
										})]
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
									children: [
										/* @__PURE__ */ jsx(MetricCard, {
											label: "Total Skor",
											value: `${summary.total_score} / ${summary.max_score}`,
											helper: "Skor kumulatif",
											icon: /* @__PURE__ */ jsx(BarChart3, { size: 22 })
										}),
										/* @__PURE__ */ jsx(MetricCard, {
											label: "Nilai Akhir",
											value: String(summary.final_score),
											helper: `${summary.answered_questions} dari ${summary.total_questions} terjawab`,
											icon: /* @__PURE__ */ jsx(Star, { size: 22 })
										}),
										/* @__PURE__ */ jsx(MetricCard, {
											label: "Aspek Tertinggi",
											value: summary.highest_aspect?.name ?? "-",
											helper: summary.highest_aspect ? String(summary.highest_aspect.score_percent) : "-",
											icon: /* @__PURE__ */ jsx(Trophy, { size: 22 }),
											tone: "green"
										}),
										/* @__PURE__ */ jsx(MetricCard, {
											label: "Perlu Perhatian",
											value: summary.lowest_aspect?.name ?? "-",
											helper: summary.lowest_aspect ? String(summary.lowest_aspect.score_percent) : "-",
											icon: /* @__PURE__ */ jsx(AlertTriangle, { size: 22 }),
											tone: "orange"
										})
									]
								}),
								/* @__PURE__ */ jsx(SurveyStatistics, { aspects }),
								/* @__PURE__ */ jsxs(Card, {
									className: "overflow-hidden",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "border-b border-[#EFEFEF] p-4",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col gap-3 lg:flex-row lg:items-center",
												children: [
													/* @__PURE__ */ jsxs("label", {
														className: "relative flex-1",
														children: [/* @__PURE__ */ jsx(Search, {
															size: 16,
															className: "absolute top-1/2 left-3 -translate-y-1/2 text-[#7C7C7C]"
														}), /* @__PURE__ */ jsx("input", {
															value: search,
															onChange: (event) => setSearch(event.target.value),
															className: "h-10 w-full rounded-lg border border-[#DDE4EC] bg-white pr-3 pl-9 text-sm outline-none focus:border-[#0066AE]",
															placeholder: "Cari pertanyaan, aspek, atau kode..."
														})]
													}),
													/* @__PURE__ */ jsxs("select", {
														value: aspectFilter,
														onChange: (event) => setAspectFilter(event.target.value),
														className: "h-10 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]",
														children: [/* @__PURE__ */ jsx("option", {
															value: "all",
															children: "Semua Aspek"
														}), aspects.map((aspect) => /* @__PURE__ */ jsx("option", {
															value: aspect.name,
															children: aspect.name
														}, aspect.name))]
													}),
													/* @__PURE__ */ jsx("button", {
														type: "button",
														onClick: () => {
															setSearch("");
															setAspectFilter("all");
														},
														children: /* @__PURE__ */ jsxs(Button, { children: [/* @__PURE__ */ jsx(RefreshCcw, { size: 16 }), "Reset"] })
													})
												]
											})
										}),
										filteredAspects.map((aspect) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => toggleAspect(aspect.name),
											className: "flex w-full flex-col gap-3 border-b border-[#DDE9F6] bg-[#EAF3FF] px-4 py-3 text-left transition hover:bg-[#DDEFFF] sm:flex-row sm:items-center sm:justify-between",
											"aria-expanded": !closedAspects[aspect.name],
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex min-w-0 items-center gap-3",
												children: [/* @__PURE__ */ jsx("span", {
													className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#0066AE]",
													children: /* @__PURE__ */ jsx(ShieldCheck, {
														size: 18,
														strokeWidth: 2.1
													})
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex flex-wrap items-center gap-x-5 gap-y-1",
													children: [
														/* @__PURE__ */ jsx("h3", {
															className: "text-sm font-bold text-[#303030]",
															children: aspect.name
														}),
														/* @__PURE__ */ jsxs("span", {
															className: "text-xs font-semibold text-[#303030]",
															children: [
																aspect.question_count,
																" ",
																"pertanyaan"
															]
														}),
														/* @__PURE__ */ jsxs("span", {
															className: "text-xs font-semibold text-[#303030]",
															children: [
																aspect.answered_count,
																" ",
																"terjawab"
															]
														}),
														/* @__PURE__ */ jsxs("span", {
															className: "text-xs font-semibold text-[#303030]",
															children: [
																aspect.documents_count,
																" ",
																"dokumen"
															]
														})
													]
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "grid min-w-[180px] grid-cols-[1fr_58px_20px] items-center gap-3",
												children: [
													/* @__PURE__ */ jsx("div", {
														className: "h-2 overflow-hidden rounded-full bg-white",
														children: /* @__PURE__ */ jsx("div", {
															className: "h-full rounded-full bg-[#0066AE]",
															style: { width: `${Math.min(aspect.score_percent, 100)}%` }
														})
													}),
													/* @__PURE__ */ jsx("span", {
														className: "text-right text-xs font-bold text-[#0066AE]",
														children: aspect.score_percent
													}),
													/* @__PURE__ */ jsx(ChevronDown, {
														size: 18,
														className: classNames("text-[#0066AE] transition-transform", closedAspects[aspect.name] && "-rotate-90")
													})
												]
											})]
										}), !closedAspects[aspect.name] && aspect.questions.map((question, index) => /* @__PURE__ */ jsx(QuestionRow, {
											question,
											number: index + 1,
											onViewDetail: setDetailQuestion,
											onViewHistory: setHistoryQuestion
										}, question.id))] }, aspect.name)),
										filteredAspects.length === 0 && /* @__PURE__ */ jsxs("div", {
											className: "px-4 py-12 text-center",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-sm font-bold text-[#303030]",
												children: "Data tidak ditemukan"
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
												children: "Ubah pencarian atau filter aspek."
											})]
										})
									]
								})
							]
						}), /* @__PURE__ */ jsxs("aside", {
							className: "grid gap-4 lg:grid-cols-2 xl:grid-cols-4",
							children: [
								/* @__PURE__ */ jsx(SidebarCard, {
									title: "Status Review",
									icon: /* @__PURE__ */ jsx(ClipboardCheck, { size: 16 }),
									children: /* @__PURE__ */ jsxs("div", {
										className: "space-y-3 text-xs",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between gap-3",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-semibold text-[#7C7C7C]",
												children: "Status"
											}), /* @__PURE__ */ jsx("span", {
												className: classNames("rounded-full px-3 py-1 font-bold", statusClass(assignment.status)),
												children: assignment.status_label
											})]
										}), [
											["Submitted by", assignment.submitted_by_user.name],
											["Submitted at", assignment.submitted_at],
											["Reviewer", assignment.reviewed_by_user.name],
											["Reviewed at", assignment.reviewed_at]
										].map(([label, value]) => /* @__PURE__ */ jsxs("div", {
											className: "flex justify-between gap-3",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-semibold text-[#7C7C7C]",
												children: label
											}), /* @__PURE__ */ jsx("span", {
												className: "text-right font-bold text-[#303030]",
												children: value
											})]
										}, label))]
									})
								}),
								/* @__PURE__ */ jsx(SidebarCard, {
									title: "Ringkasan Validasi",
									icon: /* @__PURE__ */ jsx(ShieldCheck, { size: 16 }),
									children: /* @__PURE__ */ jsx("div", {
										className: "space-y-3 text-xs",
										children: [
											[
												summary.unanswered_questions === 0,
												"Pertanyaan terjawab",
												`${summary.answered_questions} / ${summary.total_questions}`
											],
											[
												summary.total_documents > 0,
												"Dokumen terupload",
												`${summary.total_documents} file`
											],
											[
												summary.final_score >= 70,
												"Nilai akhir",
												String(summary.final_score)
											]
										].map(([ok, label, value]) => /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "flex items-center gap-2 font-semibold text-[#303030]",
												children: [ok ? /* @__PURE__ */ jsx(CheckCircle2, {
													size: 16,
													className: "text-[#00893D]"
												}) : /* @__PURE__ */ jsx(AlertTriangle, {
													size: 16,
													className: "text-[#FF944C]"
												}), label]
											}), /* @__PURE__ */ jsx("span", {
												className: "text-right font-bold text-[#303030]",
												children: value
											})]
										}, label))
									})
								}),
								/* @__PURE__ */ jsx(SidebarCard, {
									title: "Data Desa",
									icon: /* @__PURE__ */ jsx(MapPin, { size: 16 }),
									children: /* @__PURE__ */ jsx("div", {
										className: "space-y-3 text-xs",
										children: [
											["Kode", assignment.village.code ?? "-"],
											["Status", assignment.village.status ?? "-"],
											["Manager", assignment.village.manager_name ?? "-"],
											["Telepon", assignment.village.manager_phone ?? "-"],
											["Email", assignment.village.manager_email ?? "-"],
											["Alamat", assignment.village.address ?? "-"]
										].map(([label, value]) => /* @__PURE__ */ jsxs("div", {
											className: "flex justify-between gap-3",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-semibold text-[#7C7C7C]",
												children: label
											}), /* @__PURE__ */ jsx("span", {
												className: "text-right font-bold text-[#303030]",
												children: value
											})]
										}, label))
									})
								}),
								/* @__PURE__ */ jsx(SidebarCard, {
									title: "Riwayat Aktivitas",
									icon: /* @__PURE__ */ jsx(Clock3, { size: 16 }),
									children: /* @__PURE__ */ jsxs("div", {
										className: "space-y-0",
										children: [activities.map((activity, index) => /* @__PURE__ */ jsxs("div", {
											className: "relative flex gap-3 pb-4 last:pb-0",
											children: [
												index < activities.length - 1 && /* @__PURE__ */ jsx("span", { className: "absolute top-3 left-[5px] h-full w-px bg-[#AAD2F8]" }),
												/* @__PURE__ */ jsx("span", { className: "relative mt-1 size-2.5 shrink-0 rounded-full bg-[#0066AE]" }),
												/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
													className: "text-[11px] font-semibold text-[#7C7C7C]",
													children: [
														activity.date,
														" ·",
														" ",
														activity.actor
													]
												}), /* @__PURE__ */ jsx("p", {
													className: "mt-0.5 text-xs leading-5 font-bold text-[#303030]",
													children: activity.title
												})] })
											]
										}, `${activity.date}-${activity.title}-${index}`)), activities.length === 0 && /* @__PURE__ */ jsx("p", {
											className: "text-xs font-semibold text-[#7C7C7C]",
											children: "Belum ada aktivitas tercatat."
										})]
									})
								})
							]
						})]
					}),
					activeTab === "umkm" && /* @__PURE__ */ jsx("div", {
						className: "mt-5",
						children: /* @__PURE__ */ jsx(UmkmTab, {
							umkms,
							assignmentCode: assignment.code
						})
					}),
					activeTab === "pariwisata" && /* @__PURE__ */ jsx("div", {
						className: "mt-5",
						children: /* @__PURE__ */ jsx(PariwisataTab, {
							pariwisata,
							assignmentCode: assignment.code,
							surveySummary: pariwisata_survey_summary,
							surveyGroups: pariwisata_survey_groups
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: classNames("fixed inset-0 z-40 bg-[#031120]/35 transition-opacity", isEditOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"),
			onClick: closeEditSidebar
		}),
		/* @__PURE__ */ jsxs("aside", {
			className: classNames("fixed top-0 right-0 z-50 flex h-dvh w-full max-w-[440px] flex-col border-l border-[#DDE4EC] bg-white shadow-[-18px_0_40px_rgba(3,17,32,0.18)] transition-transform duration-300", isEditOpen ? "translate-x-0" : "translate-x-full"),
			"aria-hidden": !isEditOpen,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between gap-4 border-b border-[#EFEFEF] px-5 py-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-bold text-[#0066AE]",
						children: assignment.code
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-1 text-lg font-bold text-[#303030]",
						children: "Edit Survey Assignment"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs leading-5 font-semibold text-[#7C7C7C]",
						children: "Ubah data assignment sesuai tabel database."
					})
				] }), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: closeEditSidebar,
					className: "flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#DDE4EC] text-[#303030] transition hover:bg-[#F1F5F8]",
					"aria-label": "Tutup edit assignment",
					children: /* @__PURE__ */ jsx(X, { size: 18 })
				})]
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: submitAssignment,
				className: "flex min-h-0 flex-1 flex-col",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4",
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "block space-y-1.5",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-sm font-bold text-[#303030]",
									children: "Desa"
								}),
								/* @__PURE__ */ jsx("select", {
									value: data.village_id,
									onChange: (event) => setData("village_id", event.target.value),
									className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]",
									children: edit_options.village_options.map((option) => /* @__PURE__ */ jsx("option", {
										value: option.value,
										children: option.description ? `${option.label} - ${option.description}` : option.label
									}, option.value))
								}),
								/* @__PURE__ */ jsx(FieldError, { message: errors.village_id })
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block space-y-1.5",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-sm font-bold text-[#303030]",
									children: "Template Survey"
								}),
								/* @__PURE__ */ jsx("select", {
									value: data.survey_template_id,
									onChange: (event) => setData("survey_template_id", event.target.value),
									className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]",
									children: edit_options.template_options.map((option) => /* @__PURE__ */ jsx("option", {
										value: option.value,
										children: option.label
									}, option.value))
								}),
								/* @__PURE__ */ jsx(FieldError, { message: errors.survey_template_id })
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block space-y-1.5",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-sm font-bold text-[#303030]",
									children: "Status"
								}),
								/* @__PURE__ */ jsx("select", {
									value: data.status,
									onChange: (event) => setData("status", event.target.value),
									className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]",
									children: edit_options.status_options.map((option) => /* @__PURE__ */ jsx("option", {
										value: option.value,
										children: option.label
									}, option.value))
								}),
								/* @__PURE__ */ jsx(FieldError, { message: errors.status })
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block space-y-1.5",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-sm font-bold text-[#303030]",
									children: "Assigned By"
								}),
								/* @__PURE__ */ jsx("select", {
									value: data.assigned_by,
									onChange: (event) => setData("assigned_by", event.target.value),
									className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]",
									children: edit_options.user_options.map((option) => /* @__PURE__ */ jsx("option", {
										value: option.value,
										children: option.description ? `${option.label} - ${option.description}` : option.label
									}, option.value))
								}),
								/* @__PURE__ */ jsx(FieldError, { message: errors.assigned_by })
							]
						}),
						[["submitted_by", "Submitted By"], ["reviewed_by", "Reviewed By"]].map(([key, label]) => /* @__PURE__ */ jsxs("label", {
							className: "block space-y-1.5",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-sm font-bold text-[#303030]",
									children: label
								}),
								/* @__PURE__ */ jsxs("select", {
									value: data[key],
									onChange: (event) => setData(key, event.target.value),
									className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]",
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Tidak Ada"
									}), edit_options.user_options.map((option) => /* @__PURE__ */ jsx("option", {
										value: option.value,
										children: option.description ? `${option.label} - ${option.description}` : option.label
									}, option.value))]
								}),
								/* @__PURE__ */ jsx(FieldError, { message: errors[key] })
							]
						}, key)),
						[
							["assigned_at", "Assigned At"],
							["started_at", "Started At"],
							["last_saved_at", "Last Saved At"],
							["submitted_at", "Submitted At"],
							["reviewed_at", "Reviewed At"]
						].map(([key, label]) => /* @__PURE__ */ jsxs("label", {
							className: "block space-y-1.5",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-sm font-bold text-[#303030]",
									children: label
								}),
								/* @__PURE__ */ jsx("input", {
									type: "datetime-local",
									value: data[key],
									onChange: (event) => setData(key, event.target.value),
									className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]"
								}),
								/* @__PURE__ */ jsx(FieldError, { message: errors[key] })
							]
						}, key))
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-end gap-2 border-t border-[#EFEFEF] px-5 py-4",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: closeEditSidebar,
						children: /* @__PURE__ */ jsx(Button, { children: "Batal" })
					}), /* @__PURE__ */ jsxs("button", {
						type: "submit",
						disabled: processing,
						className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:opacity-60",
						children: [/* @__PURE__ */ jsx(Save, { size: 16 }), processing ? "Menyimpan..." : "Simpan"]
					})]
				})]
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: classNames("fixed inset-0 z-40 bg-[#031120]/35 transition-opacity", isVillageAnnualOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"),
			onClick: closeVillageAnnualSidebar
		}),
		/* @__PURE__ */ jsxs("aside", {
			className: classNames("fixed top-0 right-0 z-50 flex h-dvh w-full max-w-[560px] flex-col border-l border-[#DDE4EC] bg-white shadow-[-18px_0_40px_rgba(3,17,32,0.18)] transition-transform duration-300", isVillageAnnualOpen ? "translate-x-0" : "translate-x-full"),
			"aria-hidden": !isVillageAnnualOpen,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between gap-4 border-b border-[#EFEFEF] px-5 py-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-bold text-[#0066AE]",
						children: assignment.village.name
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-1 text-lg font-bold text-[#303030]",
						children: "Edit Data Tahunan Desa"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs leading-5 font-semibold text-[#7C7C7C]",
						children: "Kelola statistik penduduk, kelompok rentan, dan kelompok aktif sesuai data desa."
					})
				] }), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: closeVillageAnnualSidebar,
					className: "flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#DDE4EC] text-[#303030] transition hover:bg-[#F1F5F8]",
					"aria-label": "Tutup edit data tahunan desa",
					children: /* @__PURE__ */ jsx(X, { size: 18 })
				})]
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: submitVillageAnnualData,
				className: "flex min-h-0 flex-1 flex-col",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4",
					children: [
						/* @__PURE__ */ jsxs("section", {
							className: "rounded-xl border border-[#EFEFEF] bg-[#F8FBFE] p-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
										className: "text-sm font-bold text-[#303030]",
										children: "Statistik Penduduk Tahunan"
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
										children: "Tabel village_annual_population_stats."
									})] }), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => villageAnnualForm.setData("annual_population_stats", [...villageAnnualForm.data.annual_population_stats, emptyPopulationStat()]),
										className: "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-[#0066AE] px-3 text-xs font-bold text-white",
										children: [/* @__PURE__ */ jsx(Plus, { size: 14 }), "Tambah"]
									})]
								}),
								/* @__PURE__ */ jsx(FieldError, { message: villageAnnualForm.errors.annual_population_stats }),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 space-y-3",
									children: [villageAnnualForm.data.annual_population_stats.length === 0 && /* @__PURE__ */ jsx("p", {
										className: "rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]",
										children: "Belum ada data penduduk tahunan."
									}), villageAnnualForm.data.annual_population_stats.map((row, index) => {
										const formErrors = villageAnnualForm.errors;
										return /* @__PURE__ */ jsxs("div", {
											className: "rounded-xl border border-[#EFEFEF] bg-white p-3",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "grid gap-3 sm:grid-cols-3",
												children: [
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5",
														children: [
															/* @__PURE__ */ jsx("span", {
																className: "text-xs font-bold text-[#303030]",
																children: "Tahun"
															}),
															/* @__PURE__ */ jsx("input", {
																type: "number",
																value: row.year,
																onChange: (event) => updatePopulationStat(index, "year", event.target.value),
																className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
															}),
															/* @__PURE__ */ jsx(FieldError, { message: formErrors[`annual_population_stats.${index}.year`] })
														]
													}),
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5 sm:col-span-2",
														children: [
															/* @__PURE__ */ jsx("span", {
																className: "text-xs font-bold text-[#303030]",
																children: "Kategori"
															}),
															/* @__PURE__ */ jsx("input", {
																value: row.category_value,
																onChange: (event) => updatePopulationStat(index, "category_value", event.target.value),
																className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]",
																placeholder: "Contoh: Laki-laki, Perempuan, Total"
															}),
															/* @__PURE__ */ jsx(FieldError, { message: formErrors[`annual_population_stats.${index}.category_value`] })
														]
													}),
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5",
														children: [
															/* @__PURE__ */ jsx("span", {
																className: "text-xs font-bold text-[#303030]",
																children: "Jumlah Orang"
															}),
															/* @__PURE__ */ jsx("input", {
																type: "number",
																min: "0",
																value: row.total_people,
																onChange: (event) => updatePopulationStat(index, "total_people", event.target.value),
																className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
															}),
															/* @__PURE__ */ jsx(FieldError, { message: formErrors[`annual_population_stats.${index}.total_people`] })
														]
													}),
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5 sm:col-span-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "text-xs font-bold text-[#303030]",
															children: "Catatan"
														}), /* @__PURE__ */ jsx("input", {
															value: row.notes,
															onChange: (event) => updatePopulationStat(index, "notes", event.target.value),
															className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]",
															placeholder: "Catatan opsional"
														})]
													})
												]
											}), /* @__PURE__ */ jsx("div", {
												className: "mt-3 flex justify-end",
												children: /* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => villageAnnualForm.setData("annual_population_stats", villageAnnualForm.data.annual_population_stats.filter((_, rowIndex) => rowIndex !== index)),
													className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#F3C8C8] px-3 text-xs font-bold text-[#D81313] hover:bg-[#FDECEC]",
													children: [/* @__PURE__ */ jsx(Trash2, { size: 14 }), "Hapus"]
												})
											})]
										}, index);
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("section", {
							className: "rounded-xl border border-[#EFEFEF] bg-[#F8FBFE] p-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
										className: "text-sm font-bold text-[#303030]",
										children: "Kelompok Rentan Tahunan"
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
										children: "Tabel village_vulnerable_group_annuals."
									})] }), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => villageAnnualForm.setData("vulnerable_group_annuals", [...villageAnnualForm.data.vulnerable_group_annuals, emptyVulnerableGroupAnnual()]),
										className: "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-[#0066AE] px-3 text-xs font-bold text-white",
										children: [/* @__PURE__ */ jsx(Plus, { size: 14 }), "Tambah"]
									})]
								}),
								/* @__PURE__ */ jsx(FieldError, { message: villageAnnualForm.errors.vulnerable_group_annuals }),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 space-y-3",
									children: [villageAnnualForm.data.vulnerable_group_annuals.length === 0 && /* @__PURE__ */ jsx("p", {
										className: "rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]",
										children: "Belum ada data kelompok rentan."
									}), villageAnnualForm.data.vulnerable_group_annuals.map((row, index) => {
										const formErrors = villageAnnualForm.errors;
										return /* @__PURE__ */ jsxs("div", {
											className: "rounded-xl border border-[#EFEFEF] bg-white p-3",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "grid gap-3 sm:grid-cols-3",
												children: [
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5",
														children: [
															/* @__PURE__ */ jsx("span", {
																className: "text-xs font-bold text-[#303030]",
																children: "Tahun"
															}),
															/* @__PURE__ */ jsx("input", {
																type: "number",
																value: row.year,
																onChange: (event) => updateVulnerableGroupAnnual(index, "year", event.target.value),
																className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
															}),
															/* @__PURE__ */ jsx(FieldError, { message: formErrors[`vulnerable_group_annuals.${index}.year`] })
														]
													}),
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5 sm:col-span-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "text-xs font-bold text-[#303030]",
															children: "Kategori Rentan"
														}), /* @__PURE__ */ jsx("input", {
															value: row.vulnerable_category,
															onChange: (event) => updateVulnerableGroupAnnual(index, "vulnerable_category", event.target.value),
															className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]",
															placeholder: "Contoh: Lansia, Disabilitas, Anak"
														})]
													}),
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5",
														children: [
															/* @__PURE__ */ jsx("span", {
																className: "text-xs font-bold text-[#303030]",
																children: "Jumlah Orang"
															}),
															/* @__PURE__ */ jsx("input", {
																type: "number",
																min: "0",
																value: row.total_people,
																onChange: (event) => updateVulnerableGroupAnnual(index, "total_people", event.target.value),
																className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
															}),
															/* @__PURE__ */ jsx(FieldError, { message: formErrors[`vulnerable_group_annuals.${index}.total_people`] })
														]
													}),
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5 sm:col-span-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "text-xs font-bold text-[#303030]",
															children: "Catatan"
														}), /* @__PURE__ */ jsx("input", {
															value: row.notes,
															onChange: (event) => updateVulnerableGroupAnnual(index, "notes", event.target.value),
															className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]",
															placeholder: "Catatan opsional"
														})]
													})
												]
											}), /* @__PURE__ */ jsx("div", {
												className: "mt-3 flex justify-end",
												children: /* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => villageAnnualForm.setData("vulnerable_group_annuals", villageAnnualForm.data.vulnerable_group_annuals.filter((_, rowIndex) => rowIndex !== index)),
													className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#F3C8C8] px-3 text-xs font-bold text-[#D81313] hover:bg-[#FDECEC]",
													children: [/* @__PURE__ */ jsx(Trash2, { size: 14 }), "Hapus"]
												})
											})]
										}, index);
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("section", {
							className: "rounded-xl border border-[#EFEFEF] bg-[#F8FBFE] p-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
										className: "text-sm font-bold text-[#303030]",
										children: "Kelompok Aktif Tahunan"
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
										children: "Tabel village_active_group_annuals."
									})] }), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => villageAnnualForm.setData("active_group_annuals", [...villageAnnualForm.data.active_group_annuals, emptyActiveGroupAnnual()]),
										className: "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-[#0066AE] px-3 text-xs font-bold text-white",
										children: [/* @__PURE__ */ jsx(Plus, { size: 14 }), "Tambah"]
									})]
								}),
								/* @__PURE__ */ jsx(FieldError, { message: villageAnnualForm.errors.active_group_annuals }),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 space-y-3",
									children: [villageAnnualForm.data.active_group_annuals.length === 0 && /* @__PURE__ */ jsx("p", {
										className: "rounded-lg bg-white px-3 py-4 text-center text-xs font-semibold text-[#7C7C7C]",
										children: "Belum ada data kelompok aktif."
									}), villageAnnualForm.data.active_group_annuals.map((row, index) => {
										const formErrors = villageAnnualForm.errors;
										return /* @__PURE__ */ jsxs("div", {
											className: "rounded-xl border border-[#EFEFEF] bg-white p-3",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "grid gap-3 sm:grid-cols-3",
												children: [
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5",
														children: [
															/* @__PURE__ */ jsx("span", {
																className: "text-xs font-bold text-[#303030]",
																children: "Tahun"
															}),
															/* @__PURE__ */ jsx("input", {
																type: "number",
																value: row.year,
																onChange: (event) => updateActiveGroupAnnual(index, "year", event.target.value),
																className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
															}),
															/* @__PURE__ */ jsx(FieldError, { message: formErrors[`active_group_annuals.${index}.year`] })
														]
													}),
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5 sm:col-span-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "text-xs font-bold text-[#303030]",
															children: "Kategori Aktif"
														}), /* @__PURE__ */ jsx("input", {
															value: row.active_category,
															onChange: (event) => updateActiveGroupAnnual(index, "active_category", event.target.value),
															className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]",
															placeholder: "Contoh: Pokdarwis, Karang Taruna"
														})]
													}),
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5",
														children: [
															/* @__PURE__ */ jsx("span", {
																className: "text-xs font-bold text-[#303030]",
																children: "Nilai"
															}),
															/* @__PURE__ */ jsx("input", {
																type: "number",
																min: "0",
																value: row.value,
																onChange: (event) => updateActiveGroupAnnual(index, "value", event.target.value),
																className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]"
															}),
															/* @__PURE__ */ jsx(FieldError, { message: formErrors[`active_group_annuals.${index}.value`] })
														]
													}),
													/* @__PURE__ */ jsxs("label", {
														className: "block space-y-1.5 sm:col-span-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "text-xs font-bold text-[#303030]",
															children: "Catatan"
														}), /* @__PURE__ */ jsx("input", {
															value: row.notes,
															onChange: (event) => updateActiveGroupAnnual(index, "notes", event.target.value),
															className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold outline-none focus:border-[#0066AE]",
															placeholder: "Catatan opsional"
														})]
													})
												]
											}), /* @__PURE__ */ jsx("div", {
												className: "mt-3 flex justify-end",
												children: /* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => villageAnnualForm.setData("active_group_annuals", villageAnnualForm.data.active_group_annuals.filter((_, rowIndex) => rowIndex !== index)),
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
					className: "flex items-center justify-end gap-2 border-t border-[#EFEFEF] px-5 py-4",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: closeVillageAnnualSidebar,
						children: /* @__PURE__ */ jsx(Button, { children: "Batal" })
					}), /* @__PURE__ */ jsxs("button", {
						type: "submit",
						disabled: villageAnnualForm.processing,
						className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:opacity-60",
						children: [/* @__PURE__ */ jsx(Save, { size: 16 }), villageAnnualForm.processing ? "Menyimpan..." : "Simpan Data Desa"]
					})]
				})]
			})]
		}),
		/* @__PURE__ */ jsx(AnswerDetailModal, {
			question: detailQuestion,
			open: Boolean(detailQuestion),
			onOpenChange: (open) => {
				if (!open) setDetailQuestion(null);
			}
		}),
		/* @__PURE__ */ jsx(AnswerHistoryModal, {
			question: historyQuestion,
			open: Boolean(historyQuestion),
			onOpenChange: (open) => {
				if (!open) setHistoryQuestion(null);
			}
		})
	] });
}
SurveyAssignmentShow.layout = { breadcrumbs: [
	{
		title: "Dashboard",
		href: dashboard()
	},
	{
		title: "Survey Assignment",
		href: surveyAssignments()
	},
	{
		title: "Detail",
		href: "#"
	}
] };
//#endregion
export { SurveyAssignmentShow as default };

//# sourceMappingURL=show-YgsnY5vJ.js.map