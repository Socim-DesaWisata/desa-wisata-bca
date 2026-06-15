import { useSyncExternalStore } from "react";
//#region resources/js/hooks/use-appearance.tsx
var listeners = /* @__PURE__ */ new Set();
var currentAppearance = "light";
var setCookie = (name, value, days = 365) => {
	if (typeof document === "undefined") return;
	const maxAge = days * 24 * 60 * 60;
	document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};
var applyTheme = () => {
	if (typeof document === "undefined") return;
	document.documentElement.classList.remove("dark");
	document.documentElement.style.colorScheme = "light";
};
var subscribe = (callback) => {
	listeners.add(callback);
	return () => listeners.delete(callback);
};
var notify = () => listeners.forEach((listener) => listener());
function initializeTheme() {
	if (typeof window === "undefined") return;
	localStorage.setItem("appearance", "light");
	setCookie("appearance", "light");
	currentAppearance = "light";
	applyTheme();
}
function useAppearance() {
	const appearance = useSyncExternalStore(subscribe, () => currentAppearance, () => "light");
	const resolvedAppearance = "light";
	const updateAppearance = (_mode) => {
		currentAppearance = "light";
		localStorage.setItem("appearance", "light");
		setCookie("appearance", "light");
		applyTheme();
		notify();
	};
	return {
		appearance,
		resolvedAppearance,
		updateAppearance
	};
}
//#endregion
export { useAppearance as n, initializeTheme as t };

//# sourceMappingURL=use-appearance-BhoKbWiF.js.map