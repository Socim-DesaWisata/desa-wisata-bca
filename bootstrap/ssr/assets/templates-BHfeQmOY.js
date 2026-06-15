import { t as dashboard } from "./routes-D0B6ewM7.js";
import { n as show } from "./questions-WXr_SZfd.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, CalendarDays, ClipboardList, FileText, Layers3 } from "lucide-react";
//#region resources/js/pages/questions/templates.tsx
function statusClass(status) {
	return status === "published" ? "bg-[#EAF8F0] text-[#00893D]" : "bg-[#F1F5F8] text-[#303030]";
}
function QuestionTemplates({ templates, summary }) {
	const stats = [
		{
			label: "Total Template",
			value: summary.total_templates
		},
		{
			label: "Published",
			value: summary.published_templates
		},
		{
			label: "Draft",
			value: summary.draft_templates
		},
		{
			label: "Total Pertanyaan",
			value: summary.total_questions
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Template Survey" }), /* @__PURE__ */ jsx("main", {
		className: "min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-5 text-[#303030] sm:px-5 lg:px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1500px] space-y-4",
			children: [
				/* @__PURE__ */ jsx("header", {
					className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
					children: /* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ jsxs("nav", {
								className: "mb-2 flex items-center gap-2 text-xs font-bold text-[#0066AE]",
								children: [
									/* @__PURE__ */ jsx("span", { children: "Dashboard" }),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#7C7C7C]",
										children: "/"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#7C7C7C]",
										children: "Template Survey"
									})
								]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-[26px] leading-8 font-bold tracking-[-0.01em] text-[#303030] md:text-[30px] md:leading-9",
								children: "Template Survey"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 max-w-3xl text-sm leading-6 text-[#7C7C7C]",
								children: "Pilih template survey untuk melihat dan mengelola daftar pertanyaan assessment."
							})
						]
					})
				}),
				/* @__PURE__ */ jsx("section", {
					className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
					children: stats.map((stat) => /* @__PURE__ */ jsxs("article", {
						className: "rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_14px_rgba(3,17,32,0.05)]",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold text-[#7C7C7C]",
							children: stat.label
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2 text-2xl font-bold text-[#0066AE]",
							children: stat.value
						})]
					}, stat.label))
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.06)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "border-b border-[#EFEFEF] px-5 py-4",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-xl leading-7 font-bold text-[#303030]",
								children: "Daftar Template Survey"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm leading-5 text-[#7C7C7C]",
								children: "Semua template survey yang tersedia di database."
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid gap-3 p-4 lg:grid-cols-2 xl:grid-cols-3",
							children: templates.map((template) => /* @__PURE__ */ jsxs("article", {
								className: "flex min-h-[220px] flex-col rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_12px_rgba(3,17,32,0.04)]",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F8] text-[#0066AE]",
											children: /* @__PURE__ */ jsx(ClipboardList, { className: "size-5" })
										}), /* @__PURE__ */ jsxs("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [
													/* @__PURE__ */ jsx("h3", {
														className: "line-clamp-2 text-base leading-6 font-bold text-[#303030]",
														children: template.title
													}),
													/* @__PURE__ */ jsx("span", {
														className: `inline-flex h-6 items-center rounded-md px-2 text-[11px] font-semibold ${statusClass(template.status)}`,
														children: template.status
													}),
													/* @__PURE__ */ jsx("span", {
														className: "inline-flex h-6 items-center rounded-md bg-[#EAF3FF] px-2 text-[11px] font-bold text-[#0066AE]",
														children: template.type_label
													})
												]
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-2 line-clamp-2 text-xs leading-5 text-[#7C7C7C]",
												children: template.description ?? "Tidak ada deskripsi template."
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-4 grid grid-cols-3 gap-2",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "rounded-lg bg-[#F7F7F7] px-3 py-2",
												children: [
													/* @__PURE__ */ jsx(FileText, { className: "mb-1 size-4 text-[#0066AE]" }),
													/* @__PURE__ */ jsx("p", {
														className: "text-xs font-bold text-[#303030]",
														children: template.questions_count
													}),
													/* @__PURE__ */ jsx("p", {
														className: "text-[10px] font-semibold text-[#7C7C7C]",
														children: "Pertanyaan"
													})
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "rounded-lg bg-[#F7F7F7] px-3 py-2",
												children: [
													/* @__PURE__ */ jsx(Layers3, { className: "mb-1 size-4 text-[#0066AE]" }),
													/* @__PURE__ */ jsx("p", {
														className: "text-xs font-bold text-[#303030]",
														children: template.aspects_count
													}),
													/* @__PURE__ */ jsx("p", {
														className: "text-[10px] font-semibold text-[#7C7C7C]",
														children: "Aspek"
													})
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "rounded-lg bg-[#F7F7F7] px-3 py-2",
												children: [
													/* @__PURE__ */ jsx(CalendarDays, { className: "mb-1 size-4 text-[#0066AE]" }),
													/* @__PURE__ */ jsx("p", {
														className: "truncate text-xs font-bold text-[#303030]",
														children: template.updated_at ?? "-"
													}),
													/* @__PURE__ */ jsx("p", {
														className: "text-[10px] font-semibold text-[#7C7C7C]",
														children: "Update"
													})
												]
											})
										]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-auto pt-4",
										children: /* @__PURE__ */ jsxs(Link, {
											href: show.url(template.id),
											className: "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white transition hover:bg-[#093967]",
											children: ["Lihat Detail", /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
										})
									})
								]
							}, template.id))
						}),
						templates.length === 0 && /* @__PURE__ */ jsxs("div", {
							className: "px-6 py-14 text-center",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-bold text-[#303030]",
								children: "Belum ada template survey."
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-[#7C7C7C]",
								children: "Data template survey akan muncul setelah seeder atau input data tersedia."
							})]
						})
					]
				})
			]
		})
	})] });
}
QuestionTemplates.layout = { breadcrumbs: [{
	title: "Dashboard",
	href: dashboard()
}, {
	title: "Template Survey",
	href: "/questions"
}] };
//#endregion
export { QuestionTemplates as default };

//# sourceMappingURL=templates-BHfeQmOY.js.map