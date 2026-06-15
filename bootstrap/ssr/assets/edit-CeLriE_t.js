import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-BrhwLpUM.js";
import { d as villages, t as dashboard } from "./routes-D0B6ewM7.js";
import { i as show$1 } from "./villages-BUT_KeSs.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Archive, ArrowLeft, BedDouble, CalendarDays, Check, ChevronRight, CircleAlert, Clock3, Eye, FileImage, FileText, Gift, Image, Info, Landmark, MapPin, MapPinned, Package, Plus, Save, ShieldCheck, Sparkles, Store, Trash2, Upload, User, Zap } from "lucide-react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
//#region resources/js/actions/App/Http/Controllers/TourismVillageController.ts
/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/villages"
};
/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
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
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:21
* @route '/villages'
*/
var store = (options) => ({
	url: store.url(options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/villages"
};
/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:21
* @route '/villages'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:21
* @route '/villages'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:21
* @route '/villages'
*/
var storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:21
* @route '/villages'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:28
* @route '/villages/{village}'
*/
var show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/villages/{village}"
};
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:28
* @route '/villages/{village}'
*/
show.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { village: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { village: args.id };
	if (Array.isArray(args)) args = { village: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { village: typeof args.village === "object" ? args.village.id : args.village };
	return show.definition.url.replace("{village}", parsedArgs.village.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:28
* @route '/villages/{village}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:28
* @route '/villages/{village}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:28
* @route '/villages/{village}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:28
* @route '/villages/{village}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:28
* @route '/villages/{village}'
*/
showForm.head = (args, options) => ({
	action: show.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show.form = showForm;
/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:33
* @route '/villages/{village}/edit'
*/
var edit = (args, options) => ({
	url: edit.url(args, options),
	method: "get"
});
edit.definition = {
	methods: ["get", "head"],
	url: "/villages/{village}/edit"
};
/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:33
* @route '/villages/{village}/edit'
*/
edit.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { village: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { village: args.id };
	if (Array.isArray(args)) args = { village: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { village: typeof args.village === "object" ? args.village.id : args.village };
	return edit.definition.url.replace("{village}", parsedArgs.village.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:33
* @route '/villages/{village}/edit'
*/
edit.get = (args, options) => ({
	url: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:33
* @route '/villages/{village}/edit'
*/
edit.head = (args, options) => ({
	url: edit.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:33
* @route '/villages/{village}/edit'
*/
var editForm = (args, options) => ({
	action: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:33
* @route '/villages/{village}/edit'
*/
editForm.get = (args, options) => ({
	action: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:33
* @route '/villages/{village}/edit'
*/
editForm.head = (args, options) => ({
	action: edit.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
edit.form = editForm;
/**
* @see \App\Http\Controllers\TourismVillageController::update
* @see app/Http/Controllers/TourismVillageController.php:38
* @route '/villages/{village}'
*/
var update = (args, options) => ({
	url: update.url(args, options),
	method: "patch"
});
update.definition = {
	methods: ["patch"],
	url: "/villages/{village}"
};
/**
* @see \App\Http\Controllers\TourismVillageController::update
* @see app/Http/Controllers/TourismVillageController.php:38
* @route '/villages/{village}'
*/
update.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { village: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { village: args.id };
	if (Array.isArray(args)) args = { village: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { village: typeof args.village === "object" ? args.village.id : args.village };
	return update.definition.url.replace("{village}", parsedArgs.village.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\TourismVillageController::update
* @see app/Http/Controllers/TourismVillageController.php:38
* @route '/villages/{village}'
*/
update.patch = (args, options) => ({
	url: update.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\TourismVillageController::update
* @see app/Http/Controllers/TourismVillageController.php:38
* @route '/villages/{village}'
*/
var updateForm = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\TourismVillageController::update
* @see app/Http/Controllers/TourismVillageController.php:38
* @route '/villages/{village}'
*/
updateForm.patch = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update.form = updateForm;
/**
* @see \App\Http\Controllers\TourismVillageController::destroy
* @see app/Http/Controllers/TourismVillageController.php:48
* @route '/villages/{village}'
*/
var destroy = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
destroy.definition = {
	methods: ["delete"],
	url: "/villages/{village}"
};
/**
* @see \App\Http\Controllers\TourismVillageController::destroy
* @see app/Http/Controllers/TourismVillageController.php:48
* @route '/villages/{village}'
*/
destroy.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { village: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { village: args.id };
	if (Array.isArray(args)) args = { village: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { village: typeof args.village === "object" ? args.village.id : args.village };
	return destroy.definition.url.replace("{village}", parsedArgs.village.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\TourismVillageController::destroy
* @see app/Http/Controllers/TourismVillageController.php:48
* @route '/villages/{village}'
*/
destroy.delete = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\TourismVillageController::destroy
* @see app/Http/Controllers/TourismVillageController.php:48
* @route '/villages/{village}'
*/
var destroyForm = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\TourismVillageController::destroy
* @see app/Http/Controllers/TourismVillageController.php:48
* @route '/villages/{village}'
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
* @see \App\Http\Controllers\TourismVillageController::restore
* @see app/Http/Controllers/TourismVillageController.php:57
* @route '/villages/{village}/restore'
*/
var restore = (args, options) => ({
	url: restore.url(args, options),
	method: "patch"
});
restore.definition = {
	methods: ["patch"],
	url: "/villages/{village}/restore"
};
/**
* @see \App\Http\Controllers\TourismVillageController::restore
* @see app/Http/Controllers/TourismVillageController.php:57
* @route '/villages/{village}/restore'
*/
restore.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { village: args };
	if (Array.isArray(args)) args = { village: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { village: args.village };
	return restore.definition.url.replace("{village}", parsedArgs.village.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\TourismVillageController::restore
* @see app/Http/Controllers/TourismVillageController.php:57
* @route '/villages/{village}/restore'
*/
restore.patch = (args, options) => ({
	url: restore.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\TourismVillageController::restore
* @see app/Http/Controllers/TourismVillageController.php:57
* @route '/villages/{village}/restore'
*/
var restoreForm = (args, options) => ({
	action: restore.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\TourismVillageController::restore
* @see app/Http/Controllers/TourismVillageController.php:57
* @route '/villages/{village}/restore'
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
//#region resources/js/pages/villages/edit.tsx
var defaultLatitude = "-7.2965549";
var defaultLongitude = "112.7927000";
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function parseCoordinate(value, fallback) {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
}
function hasZeroCoordinates(latitude, longitude) {
	return Number(latitude) === 0 && Number(longitude) === 0;
}
function normalizeLatitude(latitude, longitude) {
	return !latitude || hasZeroCoordinates(latitude, longitude) ? defaultLatitude : latitude;
}
function normalizeLongitude(latitude, longitude) {
	return !longitude || hasZeroCoordinates(latitude, longitude) ? defaultLongitude : longitude;
}
function googleMapsUrl(latitude, longitude) {
	return `https://www.google.com/maps?q=${latitude},${longitude}`;
}
function formatFileSize(size) {
	if (!size) return "-";
	if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
	return `${(size / 1024 / 1024).toFixed(1)} MB`;
}
function blankMedia(sortOrder = 0) {
	return {
		id: null,
		type: "image",
		title: "",
		caption: "",
		file_path: "",
		file: null,
		external_url: "",
		mime_type: "",
		file_size: null,
		url: null,
		is_cover: false,
		sort_order: sortOrder
	};
}
function blankProfileItem(category, sortOrder = 0, latitude = defaultLatitude, longitude = defaultLongitude) {
	return {
		id: null,
		category_slug: category.slug ?? "fasilitas",
		category_name: category.name ?? category.label ?? "Fasilitas",
		name: "",
		description: "",
		address: "",
		latitude,
		longitude,
		maps_url: googleMapsUrl(latitude, longitude),
		price_min: "",
		price_max: "",
		price_text: "",
		opening_hours: "",
		contact_name: "",
		contact_phone: "",
		metadata: "",
		is_active: true,
		sort_order: sortOrder,
		media: []
	};
}
function errorText(errors, key) {
	return errors[key] ? /* @__PURE__ */ jsx("p", {
		className: "mt-1 text-xs font-semibold text-[#D81313]",
		children: errors[key]
	}) : null;
}
function MapClickHandler({ onPick }) {
	useMapEvents({ click(event) {
		onPick(event.latlng.lat, event.latlng.lng);
	} });
	return null;
}
function MiniMap({ latitude, longitude, fallbackLatitude, fallbackLongitude, onPick }) {
	const position = useMemo(() => {
		const normalizedFallbackLatitude = normalizeLatitude(fallbackLatitude, fallbackLongitude);
		const normalizedFallbackLongitude = normalizeLongitude(fallbackLatitude, fallbackLongitude);
		const normalizedLatitude = normalizeLatitude(latitude, longitude);
		const normalizedLongitude = normalizeLongitude(latitude, longitude);
		return [parseCoordinate(normalizedLatitude, parseCoordinate(normalizedFallbackLatitude, Number(defaultLatitude))), parseCoordinate(normalizedLongitude, parseCoordinate(normalizedFallbackLongitude, Number(defaultLongitude)))];
	}, [
		fallbackLatitude,
		fallbackLongitude,
		latitude,
		longitude
	]);
	const markerIcon = useMemo(() => L.divIcon({
		className: "",
		html: "<div style=\"width:34px;height:34px;border-radius:999px;background:#0066AE;box-shadow:0 10px 20px rgba(0,102,174,.28);display:flex;align-items:center;justify-content:center;border:4px solid white\"><div style=\"width:9px;height:9px;border-radius:999px;background:white\"></div></div>",
		iconSize: [34, 34],
		iconAnchor: [17, 17]
	}), []);
	return /* @__PURE__ */ jsx("div", {
		className: "h-[168px] overflow-hidden rounded-lg border border-[#AAD2F8] bg-[#EAF4FB]",
		children: /* @__PURE__ */ jsxs(MapContainer, {
			center: position,
			zoom: 14,
			className: "h-full w-full",
			scrollWheelZoom: true,
			children: [
				/* @__PURE__ */ jsx(TileLayer, {
					attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
					url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				}),
				/* @__PURE__ */ jsx(MapClickHandler, { onPick: (lat, lng) => onPick(lat.toFixed(7), lng.toFixed(7)) }),
				/* @__PURE__ */ jsx(Marker, {
					draggable: true,
					icon: markerIcon,
					position,
					eventHandlers: { dragend(event) {
						const latLng = event.target.getLatLng();
						onPick(latLng.lat.toFixed(7), latLng.lng.toFixed(7));
					} }
				})
			]
		})
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ jsx("span", {
		className: "inline-flex h-6 items-center rounded-md bg-[#EAF8F0] px-2 text-[11px] font-bold text-[#00893D]",
		children: {
			active: "Aktif",
			verified: "Terverifikasi",
			review: "Review",
			archived: "Arsip",
			draft: "Draft"
		}[status] ?? status
	});
}
function Field({ label, value, onChange, placeholder, error, icon: Icon }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "mb-1 block text-sm font-bold text-[#303030]",
				children: label
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "relative block",
				children: [Icon && /* @__PURE__ */ jsx(Icon, { className: "absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#0066AE]" }), /* @__PURE__ */ jsx("input", {
					value,
					onChange: (event) => onChange(event.target.value),
					className: `h-11 w-full rounded-lg border border-[#DDE4EC] bg-white text-sm text-[#303030] transition outline-none placeholder:text-[#7C7C7C] focus:border-[#2FA6FC] focus:ring-2 focus:ring-[#2FA6FC]/15 ${Icon ? "pr-3 pl-9" : "px-3"}`,
					placeholder
				})]
			}),
			error && /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs font-semibold text-[#D81313]",
				children: error
			})
		]
	});
}
function SelectField({ label, value, onChange, options }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block text-sm font-bold text-[#303030]",
			children: label
		}), /* @__PURE__ */ jsx("select", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#2FA6FC] focus:ring-2 focus:ring-[#2FA6FC]/15",
			children: options.map((option) => /* @__PURE__ */ jsx("option", {
				value: option.value,
				children: option.label
			}, option.value))
		})]
	});
}
function TextAreaField({ label, value, onChange, placeholder, error }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "mb-1 block text-sm font-bold text-[#303030]",
				children: label
			}),
			/* @__PURE__ */ jsx("textarea", {
				value,
				onChange: (event) => onChange(event.target.value),
				className: "min-h-24 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-sm leading-5 text-[#303030] transition outline-none placeholder:text-[#7C7C7C] focus:border-[#2FA6FC] focus:ring-2 focus:ring-[#2FA6FC]/15",
				placeholder
			}),
			error && /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs font-semibold text-[#D81313]",
				children: error
			})
		]
	});
}
function CompletionPill({ label, state, active, onClick }) {
	const style = state === "complete" ? "text-[#00893D]" : state === "partial" ? "text-[#FF944C]" : "text-[#B0B0B0]";
	const Dot = state === "complete" ? Check : state === "partial" ? CircleAlert : Clock3;
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		className: `flex min-w-[78px] flex-col items-center gap-1 rounded-lg border px-2 py-1.5 text-center transition ${active ? "border-[#AAD2F8] bg-[#EAF4FB]" : "border-transparent hover:border-[#DDE4EC] hover:bg-[#F8FBFF]"}`,
		children: [
			/* @__PURE__ */ jsx("span", {
				className: `flex size-5 items-center justify-center rounded-full ${style}`,
				children: /* @__PURE__ */ jsx(Dot, { className: "size-3.5" })
			}),
			/* @__PURE__ */ jsx("span", {
				className: "text-xs leading-4 font-bold text-[#303030]",
				children: label
			}),
			/* @__PURE__ */ jsx("span", {
				className: `text-[9px] font-bold ${style}`,
				children: state === "complete" ? "Complete" : state === "partial" ? "Partial" : "Empty"
			})
		]
	});
}
function VillageEdit({ village, status_options, profile_category_options, media_type_options }) {
	const [activeSection, setActiveSection] = useState("main");
	const { data, setData, patch, processing, errors, isDirty } = useForm({
		code: village.code,
		name: village.name,
		slug: village.slug,
		description: village.description,
		province: village.province,
		city: village.city,
		district: village.district,
		subdistrict: village.subdistrict,
		address: village.address,
		postal_code: village.postal_code,
		latitude: normalizeLatitude(village.latitude, village.longitude),
		longitude: normalizeLongitude(village.latitude, village.longitude),
		maps_url: village.maps_url || googleMapsUrl(normalizeLatitude(village.latitude, village.longitude), normalizeLongitude(village.latitude, village.longitude)),
		manager_name: village.manager_name,
		manager_phone: village.manager_phone,
		manager_email: village.manager_email,
		status: village.status,
		media: village.media ?? [],
		profile_items: (village.profile_items ?? []).map((item) => ({
			...item,
			latitude: normalizeLatitude(item.latitude, item.longitude),
			longitude: normalizeLongitude(item.latitude, item.longitude),
			maps_url: item.maps_url || googleMapsUrl(normalizeLatitude(item.latitude, item.longitude), normalizeLongitude(item.latitude, item.longitude))
		}))
	});
	const formErrors = errors;
	const profileCount = data.profile_items.length;
	const mediaCount = data.media.length;
	const progress = Math.min(100, Math.round([
		data.code,
		data.name,
		data.slug,
		data.description,
		data.province,
		data.city,
		data.district,
		data.subdistrict,
		data.address,
		data.manager_name,
		data.manager_phone,
		data.manager_email
	].filter(Boolean).length / 12 * 78 + (mediaCount > 0 ? 10 : 0) + (profileCount > 0 ? 12 : 0)));
	function submit(event) {
		event.preventDefault();
		patch(update.url(village.id), {
			forceFormData: true,
			preserveScroll: true
		});
	}
	function updateMedia(index, media) {
		setData("media", data.media.map((item, itemIndex) => itemIndex === index ? media : item));
	}
	function removeMedia(index) {
		setData("media", data.media.filter((_, itemIndex) => itemIndex !== index));
	}
	function updateProfileItem(index, item) {
		setData("profile_items", data.profile_items.map((profileItem, itemIndex) => itemIndex === index ? item : profileItem));
	}
	function removeProfileItem(index) {
		setData("profile_items", data.profile_items.filter((_, itemIndex) => itemIndex !== index));
	}
	function addProfileItem(category) {
		const latitude = normalizeLatitude(data.latitude, data.longitude);
		const longitude = normalizeLongitude(data.latitude, data.longitude);
		setData("profile_items", [...data.profile_items, blankProfileItem(category, data.profile_items.length, latitude, longitude)]);
	}
	function goToSection(id) {
		setActiveSection(id);
	}
	const categoryMeta = [
		{
			slug: "fasilitas",
			label: "Fasilitas",
			icon: Store,
			description: "Kelola fasilitas pendukung yang tersedia di desa wisata."
		},
		{
			slug: "atraksi",
			label: "Atraksi",
			icon: Sparkles,
			description: "Kelola atraksi, aktivitas, dan pengalaman wisata unggulan."
		},
		{
			slug: "suvenir",
			label: "Suvenir",
			icon: Gift,
			description: "Kelola produk suvenir dan ekonomi kreatif desa."
		},
		{
			slug: "homestay",
			label: "Homestay",
			icon: BedDouble,
			description: "Kelola akomodasi, homestay, dan informasi kontaknya."
		},
		{
			slug: "paket-wisata",
			label: "Paket Wisata",
			icon: Package,
			description: "Kelola paket wisata, harga, dan jadwal operasional."
		}
	];
	const categories = categoryMeta.map((meta) => {
		const option = profile_category_options.find((category) => category.slug === meta.slug);
		return {
			...meta,
			option: option ?? {
				slug: meta.slug,
				name: meta.label
			},
			items: data.profile_items.map((item, index) => ({
				item,
				index
			})).filter(({ item }) => item.category_slug === meta.slug)
		};
	});
	const stateForCategory = (slug) => {
		const items = data.profile_items.filter((item) => item.category_slug === slug);
		if (items.length === 0) return "empty";
		return items.every((item) => item.name && item.description) ? "complete" : "partial";
	};
	const sections = [
		{
			id: "main",
			label: "Informasi Utama",
			icon: Info,
			state: "complete"
		},
		{
			id: "location",
			label: "Lokasi",
			icon: MapPin,
			state: "complete"
		},
		{
			id: "manager",
			label: "Kontak Pengelola",
			icon: User,
			state: "complete"
		},
		{
			id: "media",
			label: "Media Desa",
			icon: FileImage,
			state: mediaCount > 0 ? "partial" : "empty"
		},
		...categoryMeta.map((category) => ({
			id: category.slug,
			label: category.label,
			icon: category.icon,
			state: stateForCategory(category.slug)
		}))
	];
	const activeCategory = categories.find((category) => category.slug === activeSection);
	const activePanel = activeSection === "location" ? /* @__PURE__ */ jsx(SectionCard, {
		id: "location",
		icon: MapPin,
		title: "Lokasi Desa",
		description: "Atur alamat administratif dan titik koordinat desa wisata.",
		complete: true,
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_270px]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: "Provinsi",
						value: data.province,
						onChange: (value) => setData("province", value),
						placeholder: "Jawa Timur",
						error: formErrors.province
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Kota/Kabupaten",
						value: data.city,
						onChange: (value) => setData("city", value),
						placeholder: "Surabaya",
						error: formErrors.city
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Kecamatan",
						value: data.district,
						onChange: (value) => setData("district", value),
						placeholder: "Sukolilo",
						error: formErrors.district
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Kelurahan/Desa",
						value: data.subdistrict,
						onChange: (value) => setData("subdistrict", value),
						placeholder: "Keputih",
						error: formErrors.subdistrict
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Kode Pos",
						value: data.postal_code,
						onChange: (value) => setData("postal_code", value),
						placeholder: "60111",
						error: formErrors.postal_code
					}),
					/* @__PURE__ */ jsx("div", {
						className: "md:col-span-3",
						children: /* @__PURE__ */ jsx(TextAreaField, {
							label: "Alamat Lengkap",
							value: data.address,
							onChange: (value) => setData("address", value),
							placeholder: "Jl. Keputih Tegal Timur...",
							error: formErrors.address
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Latitude",
						value: data.latitude,
						onChange: (value) => setData("latitude", value),
						placeholder: defaultLatitude,
						error: formErrors.latitude
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Longitude",
						value: data.longitude,
						onChange: (value) => setData("longitude", value),
						placeholder: defaultLongitude,
						error: formErrors.longitude
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Google Maps URL",
						value: data.maps_url,
						onChange: (value) => setData("maps_url", value),
						placeholder: "https://maps.app.goo.gl/...",
						error: formErrors.maps_url
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsx(MiniMap, {
					latitude: data.latitude,
					longitude: data.longitude,
					fallbackLatitude: village.latitude,
					fallbackLongitude: village.longitude,
					onPick: (latitude, longitude) => setData((current) => ({
						...current,
						latitude,
						longitude,
						maps_url: googleMapsUrl(latitude, longitude)
					}))
				}), /* @__PURE__ */ jsxs("a", {
					href: data.maps_url || "#",
					target: "_blank",
					className: "inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white text-sm font-bold text-[#0066AE]",
					children: ["Buka Google Maps", /* @__PURE__ */ jsx(ChevronRight, { className: "size-3.5" })]
				})]
			})]
		})
	}) : activeSection === "manager" ? /* @__PURE__ */ jsx(SectionCard, {
		id: "manager",
		icon: User,
		title: "Kontak Pengelola",
		description: "Informasi kontak pengelola desa wisata untuk kebutuhan koordinasi.",
		complete: true,
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ jsx(Field, {
					icon: User,
					label: "Nama Pengelola",
					value: data.manager_name,
					onChange: (value) => setData("manager_name", value),
					placeholder: "Slamet Widodo",
					error: formErrors.manager_name
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Nomor HP",
					value: data.manager_phone,
					onChange: (value) => setData("manager_phone", value),
					placeholder: "0812-3456-7890",
					error: formErrors.manager_phone
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Email Pengelola",
					value: data.manager_email,
					onChange: (value) => setData("manager_email", value),
					placeholder: "pengelola@keputihasli.id",
					error: formErrors.manager_email
				})
			]
		})
	}) : activeSection === "media" ? /* @__PURE__ */ jsx(SectionCard, {
		id: "media",
		icon: Image,
		title: "Media Desa",
		description: "Upload cover image, galeri foto, video, atau tautan eksternal.",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => setData("media", [...data.media, blankMedia(data.media.length)]),
				className: "flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#AAD2F8] bg-[#F8FBFF] p-5 text-center text-[#0066AE] transition hover:bg-[#EAF4FB]",
				children: [
					/* @__PURE__ */ jsx(Upload, { className: "size-6" }),
					/* @__PURE__ */ jsx("span", {
						className: "mt-2 text-sm font-bold",
						children: "Tambah Media Desa"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-xs text-[#7C7C7C]",
						children: "Upload file atau gunakan external URL"
					})
				]
			}), data.media.map((media, index) => /* @__PURE__ */ jsx(MediaEditor, {
				media,
				index,
				options: media_type_options,
				errors: formErrors,
				prefix: `media.${index}`,
				onChange: (next) => updateMedia(index, next),
				onRemove: () => removeMedia(index)
			}, index))]
		})
	}) : activeCategory ? /* @__PURE__ */ jsx(ProfileItemsSection, {
		id: activeCategory.slug,
		icon: activeCategory.icon,
		title: activeCategory.label,
		description: activeCategory.description,
		items: activeCategory.items,
		errors: formErrors,
		onAdd: () => addProfileItem(activeCategory.option),
		onChange: updateProfileItem,
		onRemove: removeProfileItem,
		mediaOptions: media_type_options,
		villageLatitude: data.latitude,
		villageLongitude: data.longitude
	}) : /* @__PURE__ */ jsx(SectionCard, {
		id: "main",
		icon: Info,
		title: "Informasi Utama",
		description: "Informasi dasar desa wisata yang akan menjadi identitas utama di sistem.",
		complete: true,
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ jsx(Field, {
					label: "Kode Desa",
					value: data.code,
					onChange: (value) => setData("code", value),
					placeholder: "SBY-0101",
					error: formErrors.code
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Nama Desa",
					value: data.name,
					onChange: (value) => {
						setData("name", value);
						if (data.slug === "") setData("slug", slugify(value));
					},
					placeholder: "Keputih Asli",
					error: formErrors.name
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Slug",
					value: data.slug,
					onChange: (value) => setData("slug", value),
					placeholder: "keputih-asli",
					error: formErrors.slug
				}),
				/* @__PURE__ */ jsx(SelectField, {
					label: "Status",
					value: data.status,
					onChange: (value) => setData("status", value),
					options: status_options
				}),
				/* @__PURE__ */ jsx("div", {
					className: "md:col-span-2",
					children: /* @__PURE__ */ jsx(TextAreaField, {
						label: "Deskripsi",
						value: data.description,
						onChange: (value) => setData("description", value),
						placeholder: "Desa Wisata Keputih Asli merupakan desa pesisir...",
						error: formErrors.description
					})
				})
			]
		})
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: `Edit ${village.name}` }),
		/* @__PURE__ */ jsx("main", {
			className: "min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-4 pb-24 text-[#303030] sm:px-5 lg:px-6",
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "mx-auto max-w-[1500px] space-y-3",
				children: [
					/* @__PURE__ */ jsxs("header", {
						className: "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("nav", {
								className: "mb-1.5 flex items-center gap-2 text-xs font-bold",
								children: [
									/* @__PURE__ */ jsx(Link, {
										href: villages(),
										className: "text-[#0066AE]",
										children: "Desa Wisata"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#7C7C7C]",
										children: "/"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#7C7C7C]",
										children: "Edit"
									})
								]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]",
								children: "Edit Desa Wisata"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 max-w-3xl text-sm leading-5 text-[#7C7C7C]",
								children: "Kelola informasi utama, media, fasilitas, atraksi, suvenir, homestay, dan paket wisata desa."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ jsx(InfoBadge, {
										icon: Landmark,
										label: `Kode: ${data.code || "-"}`
									}),
									/* @__PURE__ */ jsx(InfoBadge, {
										icon: ShieldCheck,
										label: `Status: ${data.status || "-"}`,
										green: true
									}),
									/* @__PURE__ */ jsx(InfoBadge, {
										icon: CalendarDays,
										label: `Terakhir diperbarui: ${village.updated_at}`
									}),
									/* @__PURE__ */ jsx(InfoBadge, {
										icon: Image,
										label: `${mediaCount} Media`
									}),
									/* @__PURE__ */ jsx(InfoBadge, {
										icon: Sparkles,
										label: `${profileCount} Potensi Desa`,
										orange: true
									})
								]
							})
						] }), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsxs(Link, {
								href: show$1(village.id),
								className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-5 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
								children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }), "Kembali ke Detail"]
							}), /* @__PURE__ */ jsxs("button", {
								disabled: processing,
								className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.2)] transition hover:bg-[#093967] disabled:opacity-60",
								children: [/* @__PURE__ */ jsx(Save, { className: "size-4" }), processing ? "Menyimpan..." : "Simpan Perubahan"]
							})]
						})]
					}),
					/* @__PURE__ */ jsx("section", {
						className: "overflow-hidden rounded-xl border border-[#DDE4EC] bg-white shadow-[0_8px_24px_rgba(3,17,32,0.07)]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid gap-0 lg:grid-cols-[minmax(0,1fr)_1px_minmax(520px,0.9fr)]",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex gap-4 p-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "h-[112px] w-[176px] shrink-0 overflow-hidden rounded-lg bg-[#EAF4FB]",
										children: /* @__PURE__ */ jsx("div", {
											className: "flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#AAD2F8,#EAF4FB)] text-[#0066AE]",
											children: /* @__PURE__ */ jsx(MapPinned, { className: "size-10" })
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ jsx("h2", {
												className: "text-xl font-bold text-[#303030]",
												children: data.name || "Nama desa belum diisi"
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "mt-1 flex items-center gap-1 text-sm font-semibold text-[#0066AE]",
												children: [/* @__PURE__ */ jsx(MapPin, { className: "size-3.5" }), [data.city, data.province].filter(Boolean).join(", ") || "-"]
											}),
											/* @__PURE__ */ jsx("div", {
												className: "mt-2",
												children: /* @__PURE__ */ jsx(StatusBadge, { status: data.status })
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "mt-2 flex items-center gap-2",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "text-xs font-bold text-[#7C7C7C]",
													children: [progress, "% data lengkap"]
												}), /* @__PURE__ */ jsx("span", {
													className: "h-2 w-[210px] overflow-hidden rounded-full bg-[#E2E8F0]",
													children: /* @__PURE__ */ jsx("span", {
														className: "block h-full rounded-full bg-[#0066AE]",
														style: { width: `${progress}%` }
													})
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ jsx("div", { className: "hidden bg-[#E2E8F0] lg:block" }),
								/* @__PURE__ */ jsx("div", {
									className: "flex gap-1 overflow-x-auto px-3 py-4 md:grid md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-9",
									children: sections.map((section) => /* @__PURE__ */ jsx(CompletionPill, {
										label: section.label,
										state: section.state,
										active: activeSection === section.id,
										onClick: () => goToSection(section.id)
									}, section.id))
								})
							]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 xl:grid-cols-[180px_minmax(0,1fr)_260px]",
						children: [
							/* @__PURE__ */ jsx("aside", {
								className: "hidden xl:block",
								children: /* @__PURE__ */ jsx("div", {
									className: "sticky top-4 overflow-hidden rounded-xl border border-[#DDE4EC] bg-white shadow-[0_8px_24px_rgba(3,17,32,0.07)]",
									role: "tablist",
									"aria-label": "Navigasi edit desa wisata",
									children: sections.map((section) => {
										const Icon = section.icon;
										const active = activeSection === section.id;
										return /* @__PURE__ */ jsxs("button", {
											type: "button",
											role: "tab",
											"aria-selected": active,
											onClick: () => goToSection(section.id),
											className: `flex h-11 w-full items-center gap-2 border-l-[3px] px-3 text-left text-sm font-bold transition ${active ? "border-[#0066AE] bg-[#0066AE] text-white" : "border-transparent text-[#093967] hover:bg-[#F1F5F8]"}`,
											children: [
												/* @__PURE__ */ jsx(Icon, { className: "size-4" }),
												/* @__PURE__ */ jsx("span", {
													className: "min-w-0 flex-1 truncate",
													children: section.label
												}),
												/* @__PURE__ */ jsx("span", { className: `size-2 rounded-full ${section.state === "complete" ? "bg-[#00893D]" : section.state === "partial" ? "bg-[#FF944C]" : "bg-[#B0B0B0]"}` })
											]
										}, section.id);
									})
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								id: "village-edit-panel",
								className: "min-w-0 space-y-3",
								role: "tabpanel",
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex gap-2 overflow-x-auto rounded-xl border border-[#DDE4EC] bg-white p-2 shadow-[0_8px_24px_rgba(3,17,32,0.07)] xl:hidden",
									role: "tablist",
									"aria-label": "Tab edit desa wisata",
									children: sections.map((section) => {
										const Icon = section.icon;
										const active = activeSection === section.id;
										return /* @__PURE__ */ jsxs("button", {
											type: "button",
											role: "tab",
											"aria-selected": active,
											onClick: () => goToSection(section.id),
											className: `flex h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-bold transition ${active ? "bg-[#0066AE] text-white shadow-[0_6px_14px_rgba(0,102,174,0.18)]" : "bg-[#F8FBFF] text-[#093967] hover:bg-[#EAF4FB]"}`,
											children: [/* @__PURE__ */ jsx(Icon, { className: "size-4" }), section.label]
										}, section.id);
									})
								}), activePanel]
							}),
							/* @__PURE__ */ jsx("aside", {
								className: "hidden xl:block",
								children: /* @__PURE__ */ jsxs("div", {
									className: "sticky top-4 space-y-3",
									children: [
										/* @__PURE__ */ jsxs(RightPanel, {
											title: "Status Perubahan",
											icon: Clock3,
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-sm font-bold text-[#FF944C]",
													children: isDirty ? "Ada perubahan belum disimpan" : "Tidak ada perubahan baru"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-1 text-xs text-[#7C7C7C]",
													children: "Last saved: 2 jam lalu"
												}),
												/* @__PURE__ */ jsx("div", {
													className: "mt-3 h-2 overflow-hidden rounded-full bg-[#E2E8F0]",
													children: /* @__PURE__ */ jsx("div", {
														className: "h-full rounded-full bg-[#0066AE]",
														style: { width: `${progress}%` }
													})
												}),
												/* @__PURE__ */ jsx("button", {
													className: "mt-3 h-9 w-full rounded-lg border border-[#DDE4EC] bg-white text-sm font-bold text-[#303030]",
													children: "Simpan Draft"
												}),
												/* @__PURE__ */ jsx("button", {
													className: "mt-2 h-9 w-full rounded-lg bg-[#0066AE] text-sm font-bold text-white",
													children: "Simpan Perubahan"
												})
											]
										}),
										/* @__PURE__ */ jsxs(RightPanel, {
											title: "Kelengkapan Data",
											icon: FileText,
											children: [/* @__PURE__ */ jsx("div", {
												className: "space-y-1",
												children: sections.slice(0, 7).map((section) => /* @__PURE__ */ jsxs("div", {
													className: "flex items-center justify-between text-xs",
													children: [/* @__PURE__ */ jsx("span", {
														className: "font-semibold text-[#303030]",
														children: section.label
													}), /* @__PURE__ */ jsx("span", {
														className: section.state === "complete" ? "text-[#00893D]" : section.state === "partial" ? "text-[#FF944C]" : "text-[#B0B0B0]",
														children: section.state === "complete" ? "Complete" : section.state === "partial" ? "Partial" : "Empty"
													})]
												}, section.id))
											}), /* @__PURE__ */ jsxs("button", {
												type: "button",
												className: "mt-3 flex w-full items-center justify-center gap-1 text-xs font-bold text-[#0066AE]",
												children: ["Lihat detail kelengkapan", /* @__PURE__ */ jsx(ChevronRight, { className: "size-3" })]
											})]
										}),
										/* @__PURE__ */ jsxs(RightPanel, {
											title: "Quick Actions",
											icon: Zap,
											children: [
												/* @__PURE__ */ jsx(QuickAction, {
													icon: Eye,
													label: "Lihat Detail Desa",
													href: show$1(village.id)
												}),
												/* @__PURE__ */ jsx(QuickAction, {
													icon: Image,
													label: "Tambah Media",
													onClick: () => goToSection("media")
												}),
												/* @__PURE__ */ jsx(QuickAction, {
													icon: Sparkles,
													label: "Tambah Potensi Desa",
													onClick: () => goToSection("fasilitas")
												}),
												/* @__PURE__ */ jsxs("button", {
													type: "button",
													className: "flex h-9 w-full items-center justify-between rounded-lg border border-[#F4C8C8] bg-white px-3 text-sm font-bold text-[#D81313]",
													children: [/* @__PURE__ */ jsxs("span", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ jsx(Archive, { className: "size-4" }), "Arsipkan Desa"]
													}), /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" })]
												})
											]
										})
									]
								})
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "fixed right-0 bottom-0 left-0 z-30 border-t border-[#DDE4EC] bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(3,17,32,0.08)] backdrop-blur lg:left-[232px]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-[1500px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-sm font-bold text-[#7C7C7C]",
					children: isDirty ? "Ada perubahan belum disimpan" : "Tidak ada perubahan baru"
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => document.querySelector("form")?.requestSubmit(),
					disabled: processing,
					className: "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white disabled:opacity-60",
					children: [/* @__PURE__ */ jsx(Save, { className: "size-4" }), processing ? "Menyimpan..." : "Simpan Perubahan"]
				})]
			})
		})
	] });
}
function InfoBadge({ icon: Icon, label, green, orange }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "inline-flex h-8 items-center gap-2 rounded-md border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#303030] shadow-[0_4px_10px_rgba(3,17,32,0.04)]",
		children: [/* @__PURE__ */ jsx(Icon, { className: `size-3.5 ${green ? "text-[#00893D]" : orange ? "text-[#FF944C]" : "text-[#0066AE]"}` }), label]
	});
}
function SectionCard({ id, icon: Icon, title, description, children, complete }) {
	return /* @__PURE__ */ jsxs("section", {
		id,
		className: "rounded-xl border border-[#DDE4EC] bg-white shadow-[0_8px_24px_rgba(3,17,32,0.07)]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-start justify-between gap-4 border-b border-[#EFEFEF] px-5 py-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ jsx("span", {
					className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF4FB] text-[#0066AE]",
					children: /* @__PURE__ */ jsx(Icon, { className: "size-5" })
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-lg font-bold text-[#303030]",
					children: title
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-0.5 text-sm leading-5 text-[#7C7C7C]",
					children: description
				})] })]
			}), complete && /* @__PURE__ */ jsx("span", {
				className: "rounded-md bg-[#EAF8F0] px-2 py-1 text-[11px] font-bold text-[#00893D]",
				children: "Complete"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "p-5",
			children
		})]
	});
}
function MediaEditor({ media, index, options, errors, prefix, onChange, onRemove }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-[#DDE4EC] bg-[#FCFDFF] p-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex items-center justify-between",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-sm font-bold text-[#303030]",
					children: ["Media #", index + 1]
				}), media.url && /* @__PURE__ */ jsx("a", {
					href: media.url,
					target: "_blank",
					className: "block truncate text-xs font-semibold text-[#0066AE]",
					children: "Lihat file tersimpan"
				})]
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onRemove,
				className: "text-[#D81313]",
				children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-3 md:grid-cols-4",
			children: [
				media.url && media.type === "image" && /* @__PURE__ */ jsx("div", {
					className: "md:col-span-4",
					children: /* @__PURE__ */ jsx("img", {
						src: media.url,
						alt: media.title || `Media ${index + 1}`,
						className: "h-36 w-full rounded-lg border border-[#DDE4EC] object-cover"
					})
				}),
				/* @__PURE__ */ jsxs("label", { children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block text-sm font-bold text-[#303030]",
					children: "Tipe"
				}), /* @__PURE__ */ jsx("select", {
					value: media.type,
					onChange: (event) => onChange({
						...media,
						type: event.target.value
					}),
					className: "h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm font-semibold text-[#303030]",
					children: options.map((option) => /* @__PURE__ */ jsx("option", {
						value: option.value,
						children: option.label
					}, option.value))
				})] }),
				/* @__PURE__ */ jsx(Field, {
					label: "Judul",
					value: media.title,
					onChange: (value) => onChange({
						...media,
						title: value
					}),
					placeholder: "Foto desa",
					error: errors[`${prefix}.title`]
				}),
				/* @__PURE__ */ jsxs("label", {
					className: "md:col-span-2",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "mb-1 block text-sm font-bold text-[#303030]",
							children: "Upload File"
						}),
						/* @__PURE__ */ jsx("input", {
							type: "file",
							onChange: (event) => onChange({
								...media,
								file: event.target.files?.[0] ?? null
							}),
							className: "block h-11 w-full rounded-lg border border-[#DDE4EC] px-2 py-2 text-sm file:mr-2 file:rounded file:border-0 file:bg-[#EAF4FB] file:px-2 file:text-xs file:font-bold file:text-[#0066AE]"
						}),
						errorText(errors, `${prefix}.file`)
					]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "External URL",
					value: media.external_url,
					onChange: (value) => onChange({
						...media,
						external_url: value
					}),
					placeholder: "https://...",
					error: errors[`${prefix}.external_url`]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Urutan",
					value: String(media.sort_order ?? 0),
					onChange: (value) => onChange({
						...media,
						sort_order: Number(value) || 0
					}),
					placeholder: "0",
					error: errors[`${prefix}.sort_order`]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block text-sm font-bold text-[#303030]",
					children: "File tersimpan"
				}), /* @__PURE__ */ jsxs("div", {
					className: "min-h-11 rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-xs leading-5 text-[#7C7C7C]",
					children: [/* @__PURE__ */ jsx("p", {
						className: "truncate",
						children: media.file_path || "-"
					}), /* @__PURE__ */ jsxs("p", { children: [
						media.mime_type || "-",
						" ·",
						" ",
						formatFileSize(media.file_size)
					] })]
				})] }),
				/* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-2 pt-5 text-sm font-bold text-[#303030]",
					children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: media.is_cover,
						onChange: (event) => onChange({
							...media,
							is_cover: event.target.checked
						})
					}), "Jadikan cover"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "md:col-span-4",
					children: /* @__PURE__ */ jsx(TextAreaField, {
						label: "Caption",
						value: media.caption,
						onChange: (value) => onChange({
							...media,
							caption: value
						}),
						placeholder: "Keterangan media...",
						error: errors[`${prefix}.caption`]
					})
				})
			]
		})]
	});
}
function ProfileItemsSection({ id, icon: Icon, title, description, items, errors, onAdd, onChange, onRemove, mediaOptions, villageLatitude, villageLongitude }) {
	return /* @__PURE__ */ jsx(SectionCard, {
		id,
		icon: Icon,
		title,
		description,
		complete: items.length > 0,
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: onAdd,
				className: "flex w-full items-center justify-between rounded-lg border border-dashed border-[#AAD2F8] bg-[#F8FBFF] px-4 py-3 text-left text-[#0066AE] transition hover:bg-[#EAF4FB]",
				children: [/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsxs("span", {
					className: "block text-sm font-bold",
					children: ["Tambah ", title]
				}), /* @__PURE__ */ jsx("span", {
					className: "text-xs font-semibold text-[#7C7C7C]",
					children: "Buat item baru dengan detail, harga, kontak, dan lokasi."
				})] }), /* @__PURE__ */ jsx(Plus, { className: "size-5" })]
			}), items.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "rounded-lg border border-[#EFEFEF] bg-[#FCFDFF] px-4 py-5 text-center",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-sm font-bold text-[#303030]",
					children: ["Belum ada data ", title.toLowerCase()]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs text-[#7C7C7C]",
					children: "Tambahkan data agar profil desa lebih lengkap."
				})]
			}) : items.map(({ item, index }) => /* @__PURE__ */ jsx(ProfileItemEditor, {
				item,
				index,
				errors,
				prefix: `profile_items.${index}`,
				onChange: (next) => onChange(index, next),
				onRemove: () => onRemove(index),
				mediaOptions,
				villageLatitude,
				villageLongitude
			}, index))]
		})
	});
}
function ProfileItemEditor({ item, index, errors, prefix, onChange, onRemove, mediaOptions, villageLatitude, villageLongitude }) {
	function updateItemMedia(mediaIndex, media) {
		onChange({
			...item,
			media: item.media.map((mediaItem, itemIndex) => itemIndex === mediaIndex ? media : mediaItem)
		});
	}
	function removeItemMedia(mediaIndex) {
		onChange({
			...item,
			media: item.media.filter((_, itemIndex) => itemIndex !== mediaIndex)
		});
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-[#DDE4EC] bg-[#FCFDFF] p-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
				className: "text-sm font-bold text-[#303030]",
				children: [
					item.category_name,
					" #",
					index + 1
				]
			}), /* @__PURE__ */ jsx("p", {
				className: "text-xs text-[#7C7C7C]",
				children: item.is_active ? "Aktif ditampilkan" : "Disembunyikan"
			})] }), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onRemove,
				className: "flex size-8 items-center justify-center rounded-md border border-[#F4C8C8] bg-white text-[#D81313]",
				children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ jsx(Field, {
					label: "Nama",
					value: item.name,
					onChange: (value) => onChange({
						...item,
						name: value
					}),
					placeholder: "Gazebo tepi sawah",
					error: errors[`${prefix}.name`]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Jam Operasional",
					value: item.opening_hours,
					onChange: (value) => onChange({
						...item,
						opening_hours: value
					}),
					placeholder: "08.00 - 17.00 WIB",
					error: errors[`${prefix}.opening_hours`]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Harga",
					value: item.price_text,
					onChange: (value) => onChange({
						...item,
						price_text: value
					}),
					placeholder: "Mulai Rp25.000",
					error: errors[`${prefix}.price_text`]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Harga Minimum",
					value: item.price_min,
					onChange: (value) => onChange({
						...item,
						price_min: value
					}),
					placeholder: "25000",
					error: errors[`${prefix}.price_min`]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Harga Maksimum",
					value: item.price_max,
					onChange: (value) => onChange({
						...item,
						price_max: value
					}),
					placeholder: "150000",
					error: errors[`${prefix}.price_max`]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Urutan",
					value: String(item.sort_order ?? 0),
					onChange: (value) => onChange({
						...item,
						sort_order: Number(value) || 0
					}),
					placeholder: "0",
					error: errors[`${prefix}.sort_order`]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "md:col-span-3",
					children: /* @__PURE__ */ jsx(TextAreaField, {
						label: "Deskripsi",
						value: item.description,
						onChange: (value) => onChange({
							...item,
							description: value
						}),
						placeholder: "Jelaskan fasilitas, atraksi, produk, atau layanan ini.",
						error: errors[`${prefix}.description`]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "md:col-span-3",
					children: /* @__PURE__ */ jsx(TextAreaField, {
						label: "Alamat",
						value: item.address,
						onChange: (value) => onChange({
							...item,
							address: value
						}),
						placeholder: "Lokasi spesifik item di area desa wisata.",
						error: errors[`${prefix}.address`]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-4 md:col-span-3 lg:grid-cols-[minmax(0,1fr)_270px]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 md:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Latitude",
								value: item.latitude,
								onChange: (value) => onChange({
									...item,
									latitude: value
								}),
								placeholder: defaultLatitude,
								error: errors[`${prefix}.latitude`]
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Longitude",
								value: item.longitude,
								onChange: (value) => onChange({
									...item,
									longitude: value
								}),
								placeholder: defaultLongitude,
								error: errors[`${prefix}.longitude`]
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Maps URL",
								value: item.maps_url,
								onChange: (value) => onChange({
									...item,
									maps_url: value
								}),
								placeholder: "https://maps.app.goo.gl/...",
								error: errors[`${prefix}.maps_url`]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(MiniMap, {
							latitude: item.latitude,
							longitude: item.longitude,
							fallbackLatitude: villageLatitude,
							fallbackLongitude: villageLongitude,
							onPick: (latitude, longitude) => onChange({
								...item,
								latitude,
								longitude,
								maps_url: googleMapsUrl(latitude, longitude)
							})
						}), /* @__PURE__ */ jsxs("a", {
							href: item.maps_url || "#",
							target: "_blank",
							className: "inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white text-sm font-bold text-[#0066AE]",
							children: ["Buka Google Maps", /* @__PURE__ */ jsx(ChevronRight, { className: "size-3.5" })]
						})]
					})]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Nama Kontak",
					value: item.contact_name,
					onChange: (value) => onChange({
						...item,
						contact_name: value
					}),
					placeholder: "Budi Santoso",
					error: errors[`${prefix}.contact_name`]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "Nomor Kontak",
					value: item.contact_phone,
					onChange: (value) => onChange({
						...item,
						contact_phone: value
					}),
					placeholder: "0812-3456-7890",
					error: errors[`${prefix}.contact_phone`]
				}),
				/* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-2 pt-5 text-sm font-bold text-[#303030]",
					children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: item.is_active,
						onChange: (event) => onChange({
							...item,
							is_active: event.target.checked
						})
					}), "Aktif"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "md:col-span-3",
					children: /* @__PURE__ */ jsx(TextAreaField, {
						label: "Metadata JSON",
						value: item.metadata,
						onChange: (value) => onChange({
							...item,
							metadata: value
						}),
						placeholder: "{\"kapasitas\": \"20 orang\", \"catatan\": \"Opsional\"}",
						error: errors[`${prefix}.metadata`]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-3 md:col-span-3",
					children: [/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => onChange({
							...item,
							media: [...item.media, blankMedia(item.media.length)]
						}),
						className: "flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#AAD2F8] bg-white p-4 text-center text-[#0066AE] transition hover:bg-[#EAF4FB]",
						children: [
							/* @__PURE__ */ jsx(Upload, { className: "size-5" }),
							/* @__PURE__ */ jsx("span", {
								className: "mt-2 text-sm font-bold",
								children: "Tambah Gambar / Media"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "text-xs text-[#7C7C7C]",
								children: "Gunakan upload file untuk gambar, video, atau dokumen pendukung."
							})
						]
					}), item.media.map((media, mediaIndex) => /* @__PURE__ */ jsx(MediaEditor, {
						media,
						index: mediaIndex,
						options: mediaOptions,
						errors,
						prefix: `${prefix}.media.${mediaIndex}`,
						onChange: (next) => updateItemMedia(mediaIndex, next),
						onRemove: () => removeItemMedia(mediaIndex)
					}, mediaIndex))]
				})
			]
		})]
	});
}
function RightPanel({ title, icon: Icon, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-xl border border-[#DDE4EC] bg-white p-4 shadow-[0_8px_24px_rgba(3,17,32,0.07)]",
		children: [/* @__PURE__ */ jsxs("h3", {
			className: "mb-3 flex items-center gap-2 text-lg font-bold text-[#303030]",
			children: [/* @__PURE__ */ jsx(Icon, { className: "size-5 text-[#0066AE]" }), title]
		}), children]
	});
}
function QuickAction({ icon: Icon, label, href, onClick }) {
	const content = /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("span", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsx(Icon, { className: "size-4 text-[#0066AE]" }), label]
	}), /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" })] });
	if (href) return /* @__PURE__ */ jsx(Link, {
		href,
		className: "mb-2 flex h-9 w-full items-center justify-between rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030]",
		children: content
	});
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick,
		className: "mb-2 flex h-9 w-full items-center justify-between rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030]",
		children: content
	});
}
VillageEdit.layout = { breadcrumbs: [{
	title: "Dashboard",
	href: dashboard()
}, {
	title: "Desa Wisata",
	href: villages()
}] };
//#endregion
export { VillageEdit as default };

//# sourceMappingURL=edit-CeLriE_t.js.map