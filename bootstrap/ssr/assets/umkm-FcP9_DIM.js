import { i as DropdownMenuItem, n as DropdownMenuContent, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-Dez2j4dN.js";
import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-BrhwLpUM.js";
import { l as umkm, t as dashboard } from "./routes-MVysbYPj.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DKL20tqQ.js";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { CreditCard, Download, Eye, MoreHorizontal, RotateCcw, Search, Send, Store, Tag, Trash2 } from "lucide-react";
//#region resources/js/actions/App/Http/Controllers/UmkmController.ts
/**
* @see \App\Http\Controllers\UmkmController::index
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/umkm"
};
/**
* @see \App\Http\Controllers\UmkmController::index
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\UmkmController::index
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UmkmController::index
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\UmkmController::index
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UmkmController::index
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UmkmController::index
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
indexForm.head = (options) => ({
	action: index.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index.form = indexForm;
/**
* @see \App\Http\Controllers\UmkmController::destroy
* @see app/Http/Controllers/UmkmController.php:19
* @route '/umkm/{umkm}'
*/
var destroy = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
destroy.definition = {
	methods: ["delete"],
	url: "/umkm/{umkm}"
};
/**
* @see \App\Http\Controllers\UmkmController::destroy
* @see app/Http/Controllers/UmkmController.php:19
* @route '/umkm/{umkm}'
*/
destroy.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { umkm: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { umkm: args.id };
	if (Array.isArray(args)) args = { umkm: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { umkm: typeof args.umkm === "object" ? args.umkm.id : args.umkm };
	return destroy.definition.url.replace("{umkm}", parsedArgs.umkm.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\UmkmController::destroy
* @see app/Http/Controllers/UmkmController.php:19
* @route '/umkm/{umkm}'
*/
destroy.delete = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\UmkmController::destroy
* @see app/Http/Controllers/UmkmController.php:19
* @route '/umkm/{umkm}'
*/
var destroyForm = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\UmkmController::destroy
* @see app/Http/Controllers/UmkmController.php:19
* @route '/umkm/{umkm}'
*/
destroyForm.delete = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy.form = destroyForm;
/**
* @see \App\Http\Controllers\UmkmController::restore
* @see app/Http/Controllers/UmkmController.php:26
* @route '/umkm/{umkm}/restore'
*/
var restore = (args, options) => ({
	url: restore.url(args, options),
	method: "patch"
});
restore.definition = {
	methods: ["patch"],
	url: "/umkm/{umkm}/restore"
};
/**
* @see \App\Http\Controllers\UmkmController::restore
* @see app/Http/Controllers/UmkmController.php:26
* @route '/umkm/{umkm}/restore'
*/
restore.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { umkm: args };
	if (Array.isArray(args)) args = { umkm: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { umkm: args.umkm };
	return restore.definition.url.replace("{umkm}", parsedArgs.umkm.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\UmkmController::restore
* @see app/Http/Controllers/UmkmController.php:26
* @route '/umkm/{umkm}/restore'
*/
restore.patch = (args, options) => ({
	url: restore.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\UmkmController::restore
* @see app/Http/Controllers/UmkmController.php:26
* @route '/umkm/{umkm}/restore'
*/
var restoreForm = (args, options) => ({
	action: restore.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\UmkmController::restore
* @see app/Http/Controllers/UmkmController.php:26
* @route '/umkm/{umkm}/restore'
*/
restoreForm.patch = (args, options) => ({
	action: restore.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
restore.form = restoreForm;
//#endregion
//#region resources/js/pages/umkm/index.tsx
var statIcons = {
	store: Store,
	tag: Tag,
	send: Send,
	"credit-card": CreditCard
};
function Badge({ children, className }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex h-6 items-center rounded-md px-2 text-[11px] font-bold ${className}`,
		children
	});
}
function exportClass(value) {
	return value ? "bg-[#EAF8F0] text-[#00893D]" : "bg-[#F1F5F8] text-[#7C7C7C]";
}
function paginationLabel(label) {
	return label.replace("&laquo; Previous", "Previous").replace("Next &raquo;", "Next");
}
function UmkmIndex({ stats, umkms, filters, category_options, export_options, per_page_options }) {
	const [search, setSearch] = useState(filters.search ?? "");
	const [category, setCategory] = useState(filters.product_category ?? "");
	const [hasExported, setHasExported] = useState(filters.has_exported ?? "");
	const [view, setView] = useState(filters.view ?? "active");
	const [perPage, setPerPage] = useState(String(filters.per_page ?? 10));
	function visitWithFilters(overrides = {}) {
		router.get(index.url({ query: {
			search: (overrides.search ?? search) || void 0,
			product_category: (overrides.product_category ?? category) || void 0,
			has_exported: (overrides.has_exported ?? hasExported) || void 0,
			view: overrides.view ?? view,
			per_page: overrides.per_page ?? Number(perPage)
		} }), {}, { preserveState: true });
	}
	function submitFilters(event) {
		event.preventDefault();
		visitWithFilters();
	}
	function resetFilters() {
		setSearch("");
		setCategory("");
		setHasExported("");
		setView("active");
		setPerPage("10");
		router.get(index.url(), {}, { preserveState: true });
	}
	function changeView(nextView) {
		setView(nextView);
		visitWithFilters({ view: nextView });
	}
	function handleDelete(umkmId) {
		if (!window.confirm("Pindahkan data UMKM ini ke trash?")) return;
		router.delete(destroy.url(umkmId), { preserveScroll: true });
	}
	function handleRestore(umkmId) {
		if (!window.confirm("Pulihkan data UMKM ini dari trash?")) return;
		router.patch(restore.url(umkmId), {}, { preserveScroll: true });
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Manajemen UMKM" }), /* @__PURE__ */ jsx("main", {
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
									children: "UMKM"
								})
							]
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]",
							children: "Manajemen UMKM"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm leading-5 text-[#7C7C7C]",
							children: "Pantau data pelaku UMKM, kategori produk, pembayaran digital, dokumen, dan progress assessment."
						})
					] }), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "inline-flex rounded-lg border border-[#DDE4EC] bg-white p-1",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => changeView("active"),
								className: `rounded-md px-4 py-2 text-sm font-bold ${view === "active" ? "bg-[#0066AE] text-white" : "text-[#0066AE]"}`,
								children: "Data Aktif"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => changeView("trash"),
								className: `rounded-md px-4 py-2 text-sm font-bold ${view === "trash" ? "bg-[#093967] text-white" : "text-[#7C7C7C]"}`,
								children: "Trash"
							})]
						}), /* @__PURE__ */ jsxs("button", {
							type: "button",
							className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-5 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
							children: [/* @__PURE__ */ jsx(Download, { className: "size-4" }), "Export Data"]
						})]
					})]
				}),
				/* @__PURE__ */ jsx("section", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
					children: stats.map((stat) => {
						return /* @__PURE__ */ jsxs("article", {
							className: "flex min-h-[116px] items-center gap-4 rounded-xl border border-[#EFEFEF] bg-white p-5 shadow-[0_4px_12px_rgba(3,17,32,0.06)]",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex size-[58px] shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0066AE]",
								children: /* @__PURE__ */ jsx(statIcons[stat.icon] ?? Store, {
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
				/* @__PURE__ */ jsx("section", {
					className: "rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_12px_rgba(3,17,32,0.05)]",
					children: /* @__PURE__ */ jsxs("form", {
						onSubmit: submitFilters,
						className: "grid items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(300px,1fr)_190px_170px_auto_auto]",
						children: [
							/* @__PURE__ */ jsxs("label", {
								className: "flex h-11 min-w-0 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-[#7C7C7C]",
								children: [/* @__PURE__ */ jsx(Search, { className: "size-4" }), /* @__PURE__ */ jsx("input", {
									value: search,
									onChange: (event) => setSearch(event.target.value),
									className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7C7C7C]",
									placeholder: "Cari UMKM, pemilik, brand, kategori, atau desa..."
								})]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "block text-[11px] font-semibold text-[#7C7C7C]",
									children: "Kategori"
								}), /* @__PURE__ */ jsxs(Select, {
									value: category || "all",
									onValueChange: (value) => setCategory(value === "all" ? "" : value),
									children: [/* @__PURE__ */ jsx(SelectTrigger, {
										className: "h-11 w-full rounded-lg border-[#DDE4EC] bg-white text-sm font-semibold text-[#303030]",
										children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Semua Kategori" })
									}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
										value: "all",
										children: "Semua Kategori"
									}), category_options.map((option) => /* @__PURE__ */ jsx(SelectItem, {
										value: option.value,
										children: option.label
									}, option.value))] })]
								})]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "block text-[11px] font-semibold text-[#7C7C7C]",
									children: "Export"
								}), /* @__PURE__ */ jsxs(Select, {
									value: hasExported || "all",
									onValueChange: (value) => setHasExported(value === "all" ? "" : value),
									children: [/* @__PURE__ */ jsx(SelectTrigger, {
										className: "h-11 w-full rounded-lg border-[#DDE4EC] bg-white text-sm font-semibold text-[#303030]",
										children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Semua Status" })
									}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
										value: "all",
										children: "Semua Status"
									}), export_options.map((option) => /* @__PURE__ */ jsx(SelectItem, {
										value: option.value,
										children: option.label
									}, option.value))] })]
								})]
							}),
							/* @__PURE__ */ jsx("button", {
								className: "h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_5px_12px_rgba(0,102,174,0.16)]",
								children: "Terapkan Filter"
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
				/* @__PURE__ */ jsxs("section", {
					className: "overflow-hidden rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_12px_rgba(3,17,32,0.06)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "border-b border-[#EFEFEF] px-5 py-4",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-lg font-bold text-[#303030]",
								children: "Daftar UMKM"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-0.5 text-sm text-[#7C7C7C]",
								children: "Data UMKM desa wisata dan status kelengkapan assessment."
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ jsxs("table", {
								className: "w-full min-w-[1100px] border-collapse text-left text-sm",
								children: [/* @__PURE__ */ jsx("thead", {
									className: "bg-[#F8FBFF] text-[12px] text-[#093967]",
									children: /* @__PURE__ */ jsx("tr", { children: [
										"UMKM",
										"Desa",
										"Kategori / Brand",
										"Total Skor",
										"Payment",
										"Export",
										"Dokumen",
										"Updated At",
										"Aksi"
									].map((head) => /* @__PURE__ */ jsx("th", {
										className: head === "Total Skor" ? "px-5 py-4 font-bold whitespace-nowrap bg-[#EAF3FF] text-[#0066AE] text-sm text-center" : "px-3 py-3 font-bold whitespace-nowrap",
										children: head
									}, head)) })
								}), /* @__PURE__ */ jsx("tbody", {
									className: "divide-y divide-[#EFEFEF]",
									children: umkms.data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
										colSpan: 9,
										className: "px-4 py-10 text-center text-sm font-semibold text-[#7C7C7C]",
										children: "Belum ada UMKM yang sesuai filter."
									}) }) : umkms.data.map((umkm) => /* @__PURE__ */ jsxs("tr", {
										className: "hover:bg-[#FAFCFF]",
										children: [
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3",
												children: /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ jsx("span", {
														className: "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#EAF3FF] text-[#0066AE]",
														children: umkm.photo_url ? /* @__PURE__ */ jsx("img", {
															src: umkm.photo_url,
															alt: umkm.name,
															className: "size-full object-cover"
														}) : /* @__PURE__ */ jsx(Store, { className: "size-5" })
													}), /* @__PURE__ */ jsxs("span", {
														className: "min-w-0",
														children: [
															/* @__PURE__ */ jsx("span", {
																className: "block font-bold text-[#303030]",
																children: umkm.name
															}),
															/* @__PURE__ */ jsxs("span", {
																className: "block text-[12px] text-[#7C7C7C]",
																children: [
																	"Pemilik:",
																	" ",
																	umkm.business_owner_name
																]
															}),
															/* @__PURE__ */ jsxs("span", {
																className: "block text-[12px] text-[#7C7C7C]",
																children: [
																	"Collector:",
																	" ",
																	umkm.collector_name
																]
															})
														]
													})]
												})
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-3 py-3",
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "block font-bold text-[#303030]",
														children: umkm.village_name
													}),
													/* @__PURE__ */ jsx("span", {
														className: "block text-[12px] text-[#093967]",
														children: umkm.village_code
													}),
													/* @__PURE__ */ jsx("span", {
														className: "block text-[12px] text-[#7C7C7C]",
														children: umkm.village_location
													})
												]
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-3 py-3",
												children: [/* @__PURE__ */ jsx("span", {
													className: "block font-bold text-[#303030]",
													children: umkm.product_category
												}), /* @__PURE__ */ jsxs("span", {
													className: "block text-[12px] text-[#7C7C7C]",
													children: ["Brand: ", umkm.brand_name]
												})]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "bg-[#F8FBFE] px-5 py-4 text-center text-sm font-black text-[#0066AE]",
												children: umkm.total_score.toLocaleString("id-ID", { maximumFractionDigits: 2 })
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3 text-xs font-semibold text-[#303030]",
												children: umkm.payment_label
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3",
												children: /* @__PURE__ */ jsx(Badge, {
													className: exportClass(umkm.has_exported),
													children: umkm.export_label
												})
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "px-3 py-3 text-xs font-semibold text-[#303030]",
												children: [
													umkm.documents_count,
													" ",
													"dokumen",
													/* @__PURE__ */ jsx("br", {}),
													umkm.survey_answers_count,
													" ",
													"jawaban"
												]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3 text-xs font-semibold text-[#7C7C7C]",
												children: umkm.updated_at
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-3",
												children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
													className: "inline-flex size-8 items-center justify-center rounded-lg border border-[#DDE4EC] bg-white text-[#303030] hover:bg-[#F1F5F8]",
													children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "size-4" })
												}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
													align: "end",
													className: "w-44 rounded-lg",
													children: [umkm.detail_url ? /* @__PURE__ */ jsx(DropdownMenuItem, {
														asChild: true,
														className: "gap-2 text-xs",
														children: /* @__PURE__ */ jsxs(Link, {
															href: umkm.detail_url,
															children: [/* @__PURE__ */ jsx(Eye, { className: "size-4" }), "Lihat Detail"]
														})
													}) : /* @__PURE__ */ jsxs(DropdownMenuItem, {
														disabled: true,
														className: "gap-2 text-xs",
														children: [/* @__PURE__ */ jsx(Eye, { className: "size-4" }), "Lihat Detail"]
													}), umkm.is_trashed ? /* @__PURE__ */ jsxs(DropdownMenuItem, {
														className: "gap-2 text-xs font-bold text-[#00893D]",
														onSelect: (event) => {
															event.preventDefault();
															handleRestore(umkm.id);
														},
														children: [/* @__PURE__ */ jsx(RotateCcw, { className: "size-4 text-[#00893D]" }), "Pulihkan"]
													}) : /* @__PURE__ */ jsxs(DropdownMenuItem, {
														className: "gap-2 text-xs font-bold text-[#D81313]",
														onSelect: (event) => {
															event.preventDefault();
															handleDelete(umkm.id);
														},
														children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4 text-[#D81313]" }), "Hapus"]
													})]
												})] })
											})
										]
									}, umkm.id))
								})]
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3 border-t border-[#EFEFEF] px-5 py-4 text-sm text-[#303030] lg:flex-row lg:items-center lg:justify-between",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-3 sm:flex-row sm:items-center",
								children: [/* @__PURE__ */ jsxs("span", { children: [
									"Menampilkan ",
									umkms.from ?? 0,
									"-",
									umkms.to ?? 0,
									" dari ",
									umkms.total,
									" UMKM"
								] }), /* @__PURE__ */ jsxs(Select, {
									value: perPage,
									onValueChange: (value) => {
										setPerPage(value);
										visitWithFilters({ per_page: Number(value) });
									},
									children: [/* @__PURE__ */ jsx(SelectTrigger, {
										className: "h-9 w-[120px] rounded-lg border-[#DDE4EC] bg-white text-xs font-bold",
										children: /* @__PURE__ */ jsx(SelectValue, {})
									}), /* @__PURE__ */ jsx(SelectContent, { children: per_page_options.map((option) => /* @__PURE__ */ jsxs(SelectItem, {
										value: String(option),
										children: [option, " / halaman"]
									}, option)) })]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: umkms.links.map((link, index) => /* @__PURE__ */ jsx("button", {
									type: "button",
									disabled: !link.url,
									onClick: () => link.url && router.get(link.url, {}, { preserveState: true }),
									className: `h-9 rounded-lg border px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${link.active ? "border-[#0066AE] bg-[#0066AE] text-white" : "border-[#DDE4EC] bg-white text-[#303030]"}`,
									children: paginationLabel(link.label)
								}, `${link.label}-${index}`))
							})]
						})
					]
				})
			]
		})
	})] });
}
UmkmIndex.layout = { breadcrumbs: [{
	title: "Dashboard",
	href: dashboard()
}, {
	title: "UMKM",
	href: umkm()
}] };
//#endregion
export { UmkmIndex as default };

//# sourceMappingURL=umkm-FcP9_DIM.js.map