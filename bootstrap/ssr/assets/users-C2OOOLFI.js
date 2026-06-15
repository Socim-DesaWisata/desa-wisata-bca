import { i as DropdownMenuItem, n as DropdownMenuContent, o as DropdownMenuSeparator, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-Dez2j4dN.js";
import { t as Input } from "./input-BKaRA9ml.js";
import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-BrhwLpUM.js";
import { t as dashboard } from "./routes-D0B6ewM7.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DKL20tqQ.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-UyX6Ddfj.js";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { BriefcaseBusiness, KeyRound, MoreHorizontal, Plus, Search, Shield, Trash2, UserRound, Users } from "lucide-react";
//#region resources/js/actions/App/Http/Controllers/UserController.ts
/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/users"
};
/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UserController::index
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
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
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:22
* @route '/users'
*/
var store = (options) => ({
	url: store.url(options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/users"
};
/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:22
* @route '/users'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:22
* @route '/users'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:22
* @route '/users'
*/
var storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\UserController::store
* @see app/Http/Controllers/UserController.php:22
* @route '/users'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
/**
* @see \App\Http\Controllers\UserController::resetPassword
* @see app/Http/Controllers/UserController.php:29
* @route '/users/{user}/password'
*/
var resetPassword = (args, options) => ({
	url: resetPassword.url(args, options),
	method: "patch"
});
resetPassword.definition = {
	methods: ["patch"],
	url: "/users/{user}/password"
};
/**
* @see \App\Http\Controllers\UserController::resetPassword
* @see app/Http/Controllers/UserController.php:29
* @route '/users/{user}/password'
*/
resetPassword.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { user: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { user: args.id };
	if (Array.isArray(args)) args = { user: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { user: typeof args.user === "object" ? args.user.id : args.user };
	return resetPassword.definition.url.replace("{user}", parsedArgs.user.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\UserController::resetPassword
* @see app/Http/Controllers/UserController.php:29
* @route '/users/{user}/password'
*/
resetPassword.patch = (args, options) => ({
	url: resetPassword.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\UserController::resetPassword
* @see app/Http/Controllers/UserController.php:29
* @route '/users/{user}/password'
*/
var resetPasswordForm = (args, options) => ({
	action: resetPassword.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\UserController::resetPassword
* @see app/Http/Controllers/UserController.php:29
* @route '/users/{user}/password'
*/
resetPasswordForm.patch = (args, options) => ({
	action: resetPassword.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
resetPassword.form = resetPasswordForm;
/**
* @see \App\Http\Controllers\UserController::updateRole
* @see app/Http/Controllers/UserController.php:39
* @route '/users/{user}/role'
*/
var updateRole = (args, options) => ({
	url: updateRole.url(args, options),
	method: "patch"
});
updateRole.definition = {
	methods: ["patch"],
	url: "/users/{user}/role"
};
/**
* @see \App\Http\Controllers\UserController::updateRole
* @see app/Http/Controllers/UserController.php:39
* @route '/users/{user}/role'
*/
updateRole.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { user: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { user: args.id };
	if (Array.isArray(args)) args = { user: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { user: typeof args.user === "object" ? args.user.id : args.user };
	return updateRole.definition.url.replace("{user}", parsedArgs.user.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\UserController::updateRole
* @see app/Http/Controllers/UserController.php:39
* @route '/users/{user}/role'
*/
updateRole.patch = (args, options) => ({
	url: updateRole.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\UserController::updateRole
* @see app/Http/Controllers/UserController.php:39
* @route '/users/{user}/role'
*/
var updateRoleForm = (args, options) => ({
	action: updateRole.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\UserController::updateRole
* @see app/Http/Controllers/UserController.php:39
* @route '/users/{user}/role'
*/
updateRoleForm.patch = (args, options) => ({
	action: updateRole.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updateRole.form = updateRoleForm;
//#endregion
//#region resources/js/pages/users/index.tsx
var statIcons = {
	users: Users,
	shield: Shield,
	briefcase: BriefcaseBusiness,
	user: UserRound
};
function Badge({ children, className }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex h-6 items-center rounded-md px-2 text-[11px] font-bold ${className}`,
		children
	});
}
function roleClass(role) {
	return role === "admin" ? "bg-[#EAF3FF] text-[#0066AE]" : "bg-[#E8FAFA] text-[#0B7778]";
}
function statusClass(status) {
	return status === "active" ? "bg-[#EAF8F0] text-[#00893D]" : status === "pending" ? "bg-[#FFF4EA] text-[#C9681E]" : "bg-[#F1F5F8] text-[#7C7C7C]";
}
function avatarClass(role) {
	return role === "admin" ? "bg-[#DDEBFF] text-[#0066AE]" : "bg-[#DDF8F9] text-[#0B7778]";
}
function errorText(error) {
	if (!error) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "text-xs font-semibold text-[#D81313]",
		children: error
	});
}
function UsersIndex({ stats, users, filters, role_options, status_options, per_page_options }) {
	const [search, setSearch] = useState(filters.search ?? "");
	const [role, setRole] = useState(filters.role ?? "");
	const [status, setStatus] = useState(filters.status ?? "");
	const [perPage, setPerPage] = useState(String(filters.per_page ?? 10));
	const [createOpen, setCreateOpen] = useState(false);
	const [resetUser, setResetUser] = useState(null);
	const [roleUser, setRoleUser] = useState(null);
	const createForm = useForm({
		name: "",
		email: "",
		phone: "",
		role: "enumerator",
		status: "active",
		password: "",
		password_confirmation: ""
	});
	const resetForm = useForm({
		password: "",
		password_confirmation: ""
	});
	const roleForm = useForm({ role: "" });
	function visitWithFilters(overrides = {}) {
		const query = {
			search: overrides.search ?? search,
			role: overrides.role ?? role,
			status: overrides.status ?? status,
			per_page: overrides.per_page ?? Number(perPage)
		};
		router.get(index.url({ query }), {}, { preserveState: true });
	}
	function submitFilters(event) {
		event.preventDefault();
		visitWithFilters();
	}
	function resetFilters() {
		setSearch("");
		setRole("");
		setStatus("");
		setPerPage("10");
		router.get(index.url(), {}, { preserveState: true });
	}
	function submitCreate(event) {
		event.preventDefault();
		createForm.post(store.url(), {
			preserveScroll: true,
			onSuccess: () => {
				createForm.reset();
				setCreateOpen(false);
			}
		});
	}
	function openResetModal(user) {
		resetForm.reset();
		resetForm.clearErrors();
		setResetUser(user);
	}
	function openRoleModal(user) {
		roleForm.setData("role", user.role);
		roleForm.clearErrors();
		setRoleUser(user);
	}
	function submitResetPassword(event) {
		event.preventDefault();
		if (!resetUser) return;
		resetForm.patch(resetPassword.url(resetUser.id), {
			preserveScroll: true,
			onSuccess: () => {
				resetForm.reset();
				setResetUser(null);
			}
		});
	}
	function submitUpdateRole(event) {
		event.preventDefault();
		if (!roleUser) return;
		roleForm.patch(updateRole.url(roleUser.id), {
			preserveScroll: true,
			onSuccess: () => {
				setRoleUser(null);
			}
		});
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Manajemen User" }),
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
										children: "User Management"
									})
								]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]",
								children: "Manajemen User"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm leading-5 text-[#7C7C7C]",
								children: "Kelola akun admin dan enumerator yang terlibat dalam program assessment desa wisata."
							})
						] }), /* @__PURE__ */ jsx("div", {
							className: "flex flex-col gap-3 sm:flex-row",
							children: /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setCreateOpen(true),
								className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.2)] transition hover:bg-[#093967]",
								children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah User"]
							})
						})]
					}),
					/* @__PURE__ */ jsx("section", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
						children: stats.map((stat) => {
							return /* @__PURE__ */ jsxs("article", {
								className: "flex min-h-[116px] items-center gap-4 rounded-xl border border-[#EFEFEF] bg-white p-5 shadow-[0_4px_12px_rgba(3,17,32,0.06)]",
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex size-[58px] shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0066AE]",
									children: /* @__PURE__ */ jsx(statIcons[stat.icon] ?? Users, {
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
							className: "grid items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(300px,1fr)_170px_170px_auto_auto]",
							children: [
								/* @__PURE__ */ jsxs("label", {
									className: "flex h-11 min-w-0 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-[#7C7C7C]",
									children: [/* @__PURE__ */ jsx(Search, { className: "size-4" }), /* @__PURE__ */ jsx("input", {
										value: search,
										onChange: (event) => setSearch(event.target.value),
										className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7C7C7C]",
										placeholder: "Cari nama user, email, atau nomor telepon..."
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-[11px] font-semibold text-[#7C7C7C]",
										children: "Role"
									}), /* @__PURE__ */ jsxs(Select, {
										value: role || "all",
										onValueChange: (value) => setRole(value === "all" ? "" : value),
										children: [/* @__PURE__ */ jsx(SelectTrigger, {
											className: "h-11 w-full rounded-lg border-[#DDE4EC] bg-white text-sm font-semibold text-[#303030]",
											children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Semua Role" })
										}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
											value: "all",
											children: "Semua Role"
										}), role_options.map((option) => /* @__PURE__ */ jsx(SelectItem, {
											value: option.value,
											children: option.label
										}, option.value))] })]
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-[11px] font-semibold text-[#7C7C7C]",
										children: "Status"
									}), /* @__PURE__ */ jsxs(Select, {
										value: status || "all",
										onValueChange: (value) => setStatus(value === "all" ? "" : value),
										children: [/* @__PURE__ */ jsx(SelectTrigger, {
											className: "h-11 w-full rounded-lg border-[#DDE4EC] bg-white text-sm font-semibold text-[#303030]",
											children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Semua Status" })
										}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
											value: "all",
											children: "Semua Status"
										}), status_options.map((option) => /* @__PURE__ */ jsx(SelectItem, {
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
					/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("section", {
						className: "overflow-hidden rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_12px_rgba(3,17,32,0.06)]",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "border-b border-[#EFEFEF] px-5 py-4",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-lg font-bold text-[#303030]",
									children: "Daftar User"
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-0.5 text-sm text-[#7C7C7C]",
									children: "Kelola akun pengguna yang memiliki akses ke platform CSR dan assessment desa wisata."
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full min-w-[760px] border-collapse text-left text-sm",
									children: [/* @__PURE__ */ jsx("thead", {
										className: "bg-[#F8FBFF] text-[12px] text-[#093967]",
										children: /* @__PURE__ */ jsx("tr", { children: [
											"User",
											"Role",
											"Status",
											"Terakhir Diperbarui",
											"Aksi"
										].map((head) => /* @__PURE__ */ jsx("th", {
											className: "px-3 py-3 font-bold whitespace-nowrap",
											children: head
										}, head)) })
									}), /* @__PURE__ */ jsx("tbody", {
										className: "divide-y divide-[#EFEFEF]",
										children: users.data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
											colSpan: 5,
											className: "px-4 py-10 text-center text-sm font-semibold text-[#7C7C7C]",
											children: "Belum ada user yang sesuai filter."
										}) }) : users.data.map((user) => /* @__PURE__ */ jsxs("tr", {
											className: "hover:bg-[#FAFCFF]",
											children: [
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3",
													children: /* @__PURE__ */ jsxs("div", {
														className: "flex items-center gap-3",
														children: [/* @__PURE__ */ jsx("span", {
															className: `flex size-9 items-center justify-center rounded-full text-sm font-bold ${avatarClass(user.role)}`,
															children: user.initials
														}), /* @__PURE__ */ jsxs("span", { children: [
															/* @__PURE__ */ jsx("span", {
																className: "block font-bold text-[#303030]",
																children: user.name
															}),
															/* @__PURE__ */ jsx("span", {
																className: "block text-[12px] leading-4 text-[#093967]",
																children: user.email
															}),
															/* @__PURE__ */ jsx("span", {
																className: "block text-[12px] leading-4 text-[#7C7C7C]",
																children: user.phone
															})
														] })]
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3",
													children: /* @__PURE__ */ jsx(Badge, {
														className: roleClass(user.role),
														children: user.role_label
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3",
													children: /* @__PURE__ */ jsx(Badge, {
														className: statusClass(user.status),
														children: user.status_label
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3 font-medium text-[#303030]",
													children: user.updated_at
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3",
													children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
														asChild: true,
														children: /* @__PURE__ */ jsx("button", {
															className: "flex size-8 items-center justify-center rounded-md border border-[#DDE4EC] bg-[#F1F5F8] text-[#093967]",
															children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "size-4" })
														})
													}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
														align: "end",
														className: "w-48 rounded-lg border-[#EFEFEF] bg-white text-xs shadow-[0_12px_30px_rgba(3,17,32,0.14)]",
														children: [
															/* @__PURE__ */ jsxs(DropdownMenuItem, {
																onClick: () => openRoleModal(user),
																className: "gap-2 text-xs",
																children: [/* @__PURE__ */ jsx(Shield, { className: "size-4 text-[#303030]" }), "Ubah Role"]
															}),
															/* @__PURE__ */ jsxs(DropdownMenuItem, {
																onClick: () => openResetModal(user),
																className: "gap-2 text-xs",
																children: [/* @__PURE__ */ jsx(KeyRound, { className: "size-4 text-[#303030]" }), "Reset Password"]
															}),
															/* @__PURE__ */ jsxs(DropdownMenuItem, {
																className: "gap-2 text-xs",
																children: [/* @__PURE__ */ jsx(UserRound, { className: "size-4 text-[#303030]" }), "Nonaktifkan User"]
															}),
															/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
															/* @__PURE__ */ jsxs(DropdownMenuItem, {
																className: "gap-2 text-xs font-bold text-[#D81313]",
																children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4 text-[#D81313]" }), "Hapus User"]
															})
														]
													})] })
												})
											]
										}, user.id))
									})]
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-3 border-t border-[#EFEFEF] px-5 py-4 text-sm text-[#303030] lg:flex-row lg:items-center lg:justify-between",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-3 sm:flex-row sm:items-center",
									children: [/* @__PURE__ */ jsxs("span", { children: [
										"Menampilkan ",
										users.from ?? 0,
										"-",
										users.to ?? 0,
										" dari ",
										users.total,
										" user"
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
									children: users.links.map((link, index) => /* @__PURE__ */ jsx("button", {
										type: "button",
										disabled: !link.url,
										onClick: () => link.url && router.get(link.url, {}, { preserveState: true }),
										className: `h-9 rounded-lg border px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${link.active ? "border-[#0066AE] bg-[#0066AE] text-white" : "border-[#DDE4EC] bg-white text-[#303030]"}`,
										dangerouslySetInnerHTML: { __html: link.label }
									}, `${link.label}-${index}`))
								})]
							})
						]
					}) })
				]
			})
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open: createOpen,
			onOpenChange: setCreateOpen,
			children: /* @__PURE__ */ jsx(DialogContent, {
				className: "max-w-[560px] rounded-xl border-[#EFEFEF] bg-white p-0",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: submitCreate,
					children: [
						/* @__PURE__ */ jsxs(DialogHeader, {
							className: "border-b border-[#EFEFEF] px-5 py-4",
							children: [/* @__PURE__ */ jsx(DialogTitle, {
								className: "text-lg font-bold text-[#303030]",
								children: "Tambah User"
							}), /* @__PURE__ */ jsx(DialogDescription, { children: "Buat akun baru untuk admin atau enumerator." })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 px-5 py-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5 sm:col-span-2",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-[#303030]",
											children: "Nama"
										}),
										/* @__PURE__ */ jsx(Input, {
											value: createForm.data.name,
											onChange: (event) => createForm.setData("name", event.target.value),
											className: "h-10 border-[#DDE4EC] text-sm",
											placeholder: "Nama user"
										}),
										errorText(createForm.errors.name)
									]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-[#303030]",
											children: "Email"
										}),
										/* @__PURE__ */ jsx(Input, {
											type: "email",
											value: createForm.data.email,
											onChange: (event) => createForm.setData("email", event.target.value),
											className: "h-10 border-[#DDE4EC] text-sm",
											placeholder: "nama@email.com"
										}),
										errorText(createForm.errors.email)
									]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-[#303030]",
											children: "Telepon"
										}),
										/* @__PURE__ */ jsx(Input, {
											value: createForm.data.phone,
											onChange: (event) => createForm.setData("phone", event.target.value),
											className: "h-10 border-[#DDE4EC] text-sm",
											placeholder: "08xx"
										}),
										errorText(createForm.errors.phone)
									]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-[#303030]",
											children: "Role"
										}),
										/* @__PURE__ */ jsxs(Select, {
											value: createForm.data.role,
											onValueChange: (value) => createForm.setData("role", value),
											children: [/* @__PURE__ */ jsx(SelectTrigger, {
												className: "h-10 w-full border-[#DDE4EC]",
												children: /* @__PURE__ */ jsx(SelectValue, {})
											}), /* @__PURE__ */ jsx(SelectContent, { children: role_options.map((option) => /* @__PURE__ */ jsx(SelectItem, {
												value: option.value,
												children: option.label
											}, option.value)) })]
										}),
										errorText(createForm.errors.role)
									]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-[#303030]",
											children: "Status"
										}),
										/* @__PURE__ */ jsxs(Select, {
											value: createForm.data.status,
											onValueChange: (value) => createForm.setData("status", value),
											children: [/* @__PURE__ */ jsx(SelectTrigger, {
												className: "h-10 w-full border-[#DDE4EC]",
												children: /* @__PURE__ */ jsx(SelectValue, {})
											}), /* @__PURE__ */ jsx(SelectContent, { children: status_options.map((option) => /* @__PURE__ */ jsx(SelectItem, {
												value: option.value,
												children: option.label
											}, option.value)) })]
										}),
										errorText(createForm.errors.status)
									]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-[#303030]",
											children: "Password"
										}),
										/* @__PURE__ */ jsx(Input, {
											type: "password",
											value: createForm.data.password,
											onChange: (event) => createForm.setData("password", event.target.value),
											className: "h-10 border-[#DDE4EC] text-sm"
										}),
										errorText(createForm.errors.password)
									]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#303030]",
										children: "Konfirmasi Password"
									}), /* @__PURE__ */ jsx(Input, {
										type: "password",
										value: createForm.data.password_confirmation,
										onChange: (event) => createForm.setData("password_confirmation", event.target.value),
										className: "h-10 border-[#DDE4EC] text-sm"
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs(DialogFooter, {
							className: "border-t border-[#EFEFEF] px-5 py-4",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setCreateOpen(false),
								className: "h-10 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030]",
								children: "Batal"
							}), /* @__PURE__ */ jsx("button", {
								disabled: createForm.processing,
								className: "h-10 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white disabled:opacity-60",
								children: "Simpan User"
							})]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open: Boolean(resetUser),
			onOpenChange: () => setResetUser(null),
			children: /* @__PURE__ */ jsx(DialogContent, {
				className: "max-w-[460px] rounded-xl border-[#EFEFEF] bg-white p-0",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: submitResetPassword,
					children: [
						/* @__PURE__ */ jsxs(DialogHeader, {
							className: "border-b border-[#EFEFEF] px-5 py-4",
							children: [/* @__PURE__ */ jsx(DialogTitle, {
								className: "text-lg font-bold text-[#303030]",
								children: "Reset Password"
							}), /* @__PURE__ */ jsxs(DialogDescription, { children: [
								"Ubah password untuk ",
								resetUser?.name ?? "user",
								"."
							] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 px-5 py-4",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#303030]",
										children: "Password Baru"
									}),
									/* @__PURE__ */ jsx(Input, {
										type: "password",
										value: resetForm.data.password,
										onChange: (event) => resetForm.setData("password", event.target.value),
										className: "h-10 border-[#DDE4EC] text-sm"
									}),
									errorText(resetForm.errors.password)
								]
							}), /* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-[#303030]",
									children: "Konfirmasi Password"
								}), /* @__PURE__ */ jsx(Input, {
									type: "password",
									value: resetForm.data.password_confirmation,
									onChange: (event) => resetForm.setData("password_confirmation", event.target.value),
									className: "h-10 border-[#DDE4EC] text-sm"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs(DialogFooter, {
							className: "border-t border-[#EFEFEF] px-5 py-4",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setResetUser(null),
								className: "h-10 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030]",
								children: "Batal"
							}), /* @__PURE__ */ jsx("button", {
								disabled: resetForm.processing,
								className: "h-10 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white disabled:opacity-60",
								children: "Reset Password"
							})]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open: Boolean(roleUser),
			onOpenChange: () => setRoleUser(null),
			children: /* @__PURE__ */ jsx(DialogContent, {
				className: "max-w-[460px] rounded-xl border-[#EFEFEF] bg-white p-0",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: submitUpdateRole,
					children: [
						/* @__PURE__ */ jsxs(DialogHeader, {
							className: "border-b border-[#EFEFEF] px-5 py-4",
							children: [/* @__PURE__ */ jsx(DialogTitle, {
								className: "text-lg font-bold text-[#303030]",
								children: "Ubah Role User"
							}), /* @__PURE__ */ jsxs(DialogDescription, { children: [
								"Ubah role untuk ",
								roleUser?.name ?? "user",
								"."
							] })]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid gap-4 px-5 py-4",
							children: /* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#303030]",
										children: "Role"
									}),
									/* @__PURE__ */ jsxs(Select, {
										value: roleForm.data.role,
										onValueChange: (value) => roleForm.setData("role", value),
										children: [/* @__PURE__ */ jsx(SelectTrigger, {
											className: "h-10 w-full border-[#DDE4EC]",
											children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih role" })
										}), /* @__PURE__ */ jsx(SelectContent, { children: role_options.map((option) => /* @__PURE__ */ jsx(SelectItem, {
											value: option.value,
											children: option.label
										}, option.value)) })]
									}),
									errorText(roleForm.errors.role)
								]
							})
						}),
						/* @__PURE__ */ jsxs(DialogFooter, {
							className: "border-t border-[#EFEFEF] px-5 py-4",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setRoleUser(null),
								className: "h-10 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030]",
								children: "Batal"
							}), /* @__PURE__ */ jsx("button", {
								disabled: roleForm.processing,
								className: "h-10 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white disabled:opacity-60",
								children: "Simpan Role"
							})]
						})
					]
				})
			})
		})
	] });
}
UsersIndex.layout = { breadcrumbs: [{
	title: "Dashboard",
	href: dashboard()
}, {
	title: "User Management",
	href: "#"
}] };
//#endregion
export { UsersIndex as default };

//# sourceMappingURL=users-C2OOOLFI.js.map