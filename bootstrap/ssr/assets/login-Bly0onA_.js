import { t as Input } from "./input-BKaRA9ml.js";
import { n as queryParams } from "./wayfinder-BrhwLpUM.js";
import { t as InputError } from "./input-error-kjOtsSWi.js";
import { t as Spinner } from "./spinner-Bs9t3kFL.js";
import { t as Label } from "./label-3LcUKzgf.js";
import { n as request } from "./password-DZxdSfmm.js";
import { t as Checkbox } from "./checkbox-BbMatyE1.js";
import { Form, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
//#region resources/js/routes/login/index.ts
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
* @route '/login'
*/
var store = (options) => ({
	url: store.url(options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/login"
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
* @route '/login'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
* @route '/login'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
* @route '/login'
*/
var storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
* @route '/login'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
Object.assign(store, store);
//#endregion
//#region resources/js/assets/auth-login-logo.png
var auth_login_logo_default = "/build/assets/auth-login-logo-LZYC4hy_.png";
//#endregion
//#region design/login-bg.png
var login_bg_default = "/build/assets/login-bg-BDMWHmNx.png";
//#endregion
//#region resources/js/pages/auth/login.tsx
function Login({ status, canResetPassword }) {
	const [showPassword, setShowPassword] = useState(false);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Log in" }), /* @__PURE__ */ jsx("main", {
		className: "relative min-h-svh overflow-hidden bg-cover bg-center font-bca text-[#0a2246]",
		style: { backgroundImage: `url(${login_bg_default})` },
		children: /* @__PURE__ */ jsx("section", {
			className: "relative z-10 flex min-h-svh items-center justify-end px-4 py-5 sm:px-6 lg:px-14 xl:px-20",
			children: /* @__PURE__ */ jsx("div", {
				className: "w-full max-w-[520px] rounded-3xl border border-white/70 bg-white/96 px-6 py-7 shadow-[0_22px_70px_rgba(17,55,99,0.18)] backdrop-blur-sm sm:px-8 lg:px-10 lg:py-9",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-[420px] flex-col items-center",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: auth_login_logo_default,
							alt: "Desa Wisata BCA",
							className: "h-auto w-[220px] max-w-full object-contain sm:w-[250px]"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 space-y-2 text-center",
							children: [/* @__PURE__ */ jsx("h1", {
								className: "text-2xl leading-tight font-extrabold tracking-normal text-[#081d3e] sm:text-[30px]",
								children: "Masuk ke Dashboard"
							}), /* @__PURE__ */ jsx("p", {
								className: "mx-auto max-w-[390px] text-sm leading-6 font-medium text-[#6d7890] sm:text-[15px]",
								children: "Kelola data desa wisata, survey, UMKM, dan laporan program secara terpusat."
							})]
						}),
						status && /* @__PURE__ */ jsx("div", {
							className: "mt-6 w-full rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700",
							children: status
						}),
						/* @__PURE__ */ jsx(Form, {
							...store.form(),
							resetOnSuccess: ["password"],
							className: "mt-6 w-full",
							children: ({ processing, errors }) => /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ jsx(Label, {
												htmlFor: "email",
												className: "sr-only",
												children: "Email"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "relative",
												children: [/* @__PURE__ */ jsx(Mail, { className: "pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#687793]" }), /* @__PURE__ */ jsx(Input, {
													id: "email",
													type: "email",
													name: "email",
													required: true,
													autoFocus: true,
													tabIndex: 1,
													autoComplete: "email",
													placeholder: "Email",
													"aria-invalid": Boolean(errors.email),
													className: "h-12 rounded-xl border-[#bcc7d8] bg-white/80 pr-4 pl-12 text-sm font-medium text-[#10264a] shadow-none placeholder:text-[#8a96ad] focus-visible:border-[#0b65d8] focus-visible:ring-[#0b65d8]/15"
												})]
											}),
											/* @__PURE__ */ jsx(InputError, { message: errors.email })
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ jsx(Label, {
												htmlFor: "password",
												className: "sr-only",
												children: "Password"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "relative",
												children: [
													/* @__PURE__ */ jsx(LockKeyhole, { className: "pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#687793]" }),
													/* @__PURE__ */ jsx(Input, {
														id: "password",
														type: showPassword ? "text" : "password",
														name: "password",
														required: true,
														tabIndex: 2,
														autoComplete: "current-password",
														placeholder: "Password",
														"aria-invalid": Boolean(errors.password),
														className: "h-12 rounded-xl border-[#bcc7d8] bg-white/80 pr-12 pl-12 text-sm font-medium text-[#10264a] shadow-none placeholder:text-[#8a96ad] focus-visible:border-[#0b65d8] focus-visible:ring-[#0b65d8]/15"
													}),
													/* @__PURE__ */ jsx("button", {
														type: "button",
														"aria-label": showPassword ? "Hide password" : "Show password",
														className: "absolute top-1/2 right-4 -translate-y-1/2 rounded-md p-1 text-[#687793] transition hover:text-[#0b65d8] focus-visible:ring-2 focus-visible:ring-[#0b65d8]/30 focus-visible:outline-none",
														onClick: () => setShowPassword((current) => !current),
														tabIndex: -1,
														children: showPassword ? /* @__PURE__ */ jsx(Eye, { className: "size-5" }) : /* @__PURE__ */ jsx(EyeOff, { className: "size-5" })
													})
												]
											}),
											/* @__PURE__ */ jsx(InputError, { message: errors.password })
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center justify-between gap-3 pt-1 text-sm font-semibold",
										children: [/* @__PURE__ */ jsxs(Label, {
											htmlFor: "remember",
											className: "flex cursor-pointer items-center gap-2.5 text-[#263853]",
											children: [/* @__PURE__ */ jsx(Checkbox, {
												id: "remember",
												name: "remember",
												defaultChecked: true,
												tabIndex: 3,
												className: "size-5 rounded-[5px] border-[#0b65d8] data-[state=checked]:border-[#0b65d8] data-[state=checked]:bg-[#0b65d8]"
											}), "Remember me"]
										}), canResetPassword && /* @__PURE__ */ jsx(Link, {
											href: request(),
											tabIndex: 5,
											className: "font-semibold text-[#006be6] transition hover:text-[#004fb3]",
											children: "Forgot password?"
										})]
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "submit",
										className: "mt-2 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#0063d8] text-sm font-bold text-white shadow-[0_10px_22px_rgba(0,99,216,0.20)] transition hover:bg-[#005bc8] focus-visible:ring-4 focus-visible:ring-[#0063d8]/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70",
										tabIndex: 4,
										disabled: processing,
										"data-test": "login-button",
										children: [
											processing ? /* @__PURE__ */ jsx(Spinner, {}) : null,
											"Masuk ke Dashboard",
											/* @__PURE__ */ jsx(ArrowRight, { className: "size-5" })
										]
									})
								]
							})
						}),
						/* @__PURE__ */ jsx("div", { className: "mt-6 h-px w-full bg-[#c7d0df]" }),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-center text-xs font-medium text-[#7d8aa0] sm:text-sm",
							children: "© 2026 All rights reserved."
						})
					]
				})
			})
		})
	})] });
}
Login.layout = { fullScreen: true };
//#endregion
export { Login as default };

//# sourceMappingURL=login-Bly0onA_.js.map