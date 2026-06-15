import { i as DropdownMenuItem, n as DropdownMenuContent, o as DropdownMenuSeparator, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-Dez2j4dN.js";
import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-BrhwLpUM.js";
import { c as surveyAssignments, t as dashboard } from "./routes-D0B6ewM7.js";
import { a as store$1, i as show$1, o as takeSurvey$1 } from "./survey-assignments-BfNUxixD.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-UyX6Ddfj.js";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Activity, CheckCircle2, ClipboardCheck, ClipboardList, Eye, FileSearch, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
//#region resources/js/actions/App/Http/Controllers/VillageSurveyAssignmentController.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:42
* @route '/survey-assignments'
*/
var store = (options) => ({
	url: store.url(options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/survey-assignments"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:42
* @route '/survey-assignments'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:42
* @route '/survey-assignments'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:42
* @route '/survey-assignments'
*/
var storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:42
* @route '/survey-assignments'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:51
* @route '/survey-assignments/{assignment}'
*/
var destroy = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
destroy.definition = {
	methods: ["delete"],
	url: "/survey-assignments/{assignment}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:51
* @route '/survey-assignments/{assignment}'
*/
destroy.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return destroy.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:51
* @route '/survey-assignments/{assignment}'
*/
destroy.delete = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:51
* @route '/survey-assignments/{assignment}'
*/
var destroyForm = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:51
* @route '/survey-assignments/{assignment}'
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::restore
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:60
* @route '/survey-assignments/{assignment}/restore'
*/
var restore = (args, options) => ({
	url: restore.url(args, options),
	method: "patch"
});
restore.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}/restore"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::restore
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:60
* @route '/survey-assignments/{assignment}/restore'
*/
restore.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: args.assignment };
	return restore.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::restore
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:60
* @route '/survey-assignments/{assignment}/restore'
*/
restore.patch = (args, options) => ({
	url: restore.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::restore
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:60
* @route '/survey-assignments/{assignment}/restore'
*/
var restoreForm = (args, options) => ({
	action: restore.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::restore
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:60
* @route '/survey-assignments/{assignment}/restore'
*/
restoreForm.patch = (args, options) => ({
	action: restore.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
restore.form = restoreForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
var createUmkm = (args, options) => ({
	url: createUmkm.url(args, options),
	method: "get"
});
createUmkm.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/create/umkm"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkm.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return createUmkm.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkm.get = (args, options) => ({
	url: createUmkm.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkm.head = (args, options) => ({
	url: createUmkm.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
var createUmkmForm = (args, options) => ({
	action: createUmkm.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkmForm.get = (args, options) => ({
	action: createUmkm.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkmForm.head = (args, options) => ({
	action: createUmkm.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
createUmkm.form = createUmkmForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
var storeUmkm = (args, options) => ({
	url: storeUmkm.url(args, options),
	method: "post"
});
storeUmkm.definition = {
	methods: ["post"],
	url: "/survey-assignments/{assignment}/create/umkm"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
storeUmkm.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return storeUmkm.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
storeUmkm.post = (args, options) => ({
	url: storeUmkm.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
var storeUmkmForm = (args, options) => ({
	action: storeUmkm.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
storeUmkmForm.post = (args, options) => ({
	action: storeUmkm.url(args, options),
	method: "post"
});
storeUmkm.form = storeUmkmForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
var createPariwisata = (args, options) => ({
	url: createPariwisata.url(args, options),
	method: "get"
});
createPariwisata.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/create/pariwisata"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisata.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return createPariwisata.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisata.get = (args, options) => ({
	url: createPariwisata.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisata.head = (args, options) => ({
	url: createPariwisata.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
var createPariwisataForm = (args, options) => ({
	action: createPariwisata.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisataForm.get = (args, options) => ({
	action: createPariwisata.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisataForm.head = (args, options) => ({
	action: createPariwisata.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
createPariwisata.form = createPariwisataForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
var storePariwisata = (args, options) => ({
	url: storePariwisata.url(args, options),
	method: "post"
});
storePariwisata.definition = {
	methods: ["post"],
	url: "/survey-assignments/{assignment}/create/pariwisata"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
storePariwisata.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return storePariwisata.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
storePariwisata.post = (args, options) => ({
	url: storePariwisata.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
var storePariwisataForm = (args, options) => ({
	action: storePariwisata.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
storePariwisataForm.post = (args, options) => ({
	action: storePariwisata.url(args, options),
	method: "post"
});
storePariwisata.form = storePariwisataForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
var takePariwisataSurvey = (args, options) => ({
	url: takePariwisataSurvey.url(args, options),
	method: "get"
});
takePariwisataSurvey.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/pariwisata/take-survey"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takePariwisataSurvey.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return takePariwisataSurvey.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takePariwisataSurvey.get = (args, options) => ({
	url: takePariwisataSurvey.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takePariwisataSurvey.head = (args, options) => ({
	url: takePariwisataSurvey.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
var takePariwisataSurveyForm = (args, options) => ({
	action: takePariwisataSurvey.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takePariwisataSurveyForm.get = (args, options) => ({
	action: takePariwisataSurvey.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takePariwisataSurveyForm.head = (args, options) => ({
	action: takePariwisataSurvey.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
takePariwisataSurvey.form = takePariwisataSurveyForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisataSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
var storePariwisataSurveyDraft = (args, options) => ({
	url: storePariwisataSurveyDraft.url(args, options),
	method: "post"
});
storePariwisataSurveyDraft.definition = {
	methods: ["post"],
	url: "/survey-assignments/{assignment}/pariwisata/take-survey"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisataSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
storePariwisataSurveyDraft.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return storePariwisataSurveyDraft.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisataSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
storePariwisataSurveyDraft.post = (args, options) => ({
	url: storePariwisataSurveyDraft.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisataSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
var storePariwisataSurveyDraftForm = (args, options) => ({
	action: storePariwisataSurveyDraft.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisataSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
storePariwisataSurveyDraftForm.post = (args, options) => ({
	action: storePariwisataSurveyDraft.url(args, options),
	method: "post"
});
storePariwisataSurveyDraft.form = storePariwisataSurveyDraftForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyPariwisataSurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
var destroyPariwisataSurveyDocument = (args, options) => ({
	url: destroyPariwisataSurveyDocument.url(args, options),
	method: "delete"
});
destroyPariwisataSurveyDocument.definition = {
	methods: ["delete"],
	url: "/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyPariwisataSurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroyPariwisataSurveyDocument.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		document: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		document: typeof args.document === "object" ? args.document.id : args.document
	};
	return destroyPariwisataSurveyDocument.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{document}", parsedArgs.document.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyPariwisataSurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroyPariwisataSurveyDocument.delete = (args, options) => ({
	url: destroyPariwisataSurveyDocument.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyPariwisataSurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
var destroyPariwisataSurveyDocumentForm = (args, options) => ({
	action: destroyPariwisataSurveyDocument.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyPariwisataSurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroyPariwisataSurveyDocumentForm.delete = (args, options) => ({
	action: destroyPariwisataSurveyDocument.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroyPariwisataSurveyDocument.form = destroyPariwisataSurveyDocumentForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
var showPariwisata = (args, options) => ({
	url: showPariwisata.url(args, options),
	method: "get"
});
showPariwisata.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/pariwisata/{pariwisata}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showPariwisata.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		pariwisata: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		pariwisata: typeof args.pariwisata === "object" ? args.pariwisata.id : args.pariwisata
	};
	return showPariwisata.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{pariwisata}", parsedArgs.pariwisata.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showPariwisata.get = (args, options) => ({
	url: showPariwisata.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showPariwisata.head = (args, options) => ({
	url: showPariwisata.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
var showPariwisataForm = (args, options) => ({
	action: showPariwisata.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showPariwisataForm.get = (args, options) => ({
	action: showPariwisata.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showPariwisataForm.head = (args, options) => ({
	action: showPariwisata.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
showPariwisata.form = showPariwisataForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
var exportPariwisata = (args, options) => ({
	url: exportPariwisata.url(args, options),
	method: "get"
});
exportPariwisata.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/pariwisata/{pariwisata}/export"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportPariwisata.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		pariwisata: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		pariwisata: typeof args.pariwisata === "object" ? args.pariwisata.id : args.pariwisata
	};
	return exportPariwisata.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{pariwisata}", parsedArgs.pariwisata.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportPariwisata.get = (args, options) => ({
	url: exportPariwisata.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportPariwisata.head = (args, options) => ({
	url: exportPariwisata.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
var exportPariwisataForm = (args, options) => ({
	action: exportPariwisata.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportPariwisataForm.get = (args, options) => ({
	action: exportPariwisata.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportPariwisataForm.head = (args, options) => ({
	action: exportPariwisata.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
exportPariwisata.form = exportPariwisataForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updatePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
var updatePariwisata = (args, options) => ({
	url: updatePariwisata.url(args, options),
	method: "patch"
});
updatePariwisata.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}/pariwisata/{pariwisata}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updatePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
updatePariwisata.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		pariwisata: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		pariwisata: typeof args.pariwisata === "object" ? args.pariwisata.id : args.pariwisata
	};
	return updatePariwisata.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{pariwisata}", parsedArgs.pariwisata.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updatePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
updatePariwisata.patch = (args, options) => ({
	url: updatePariwisata.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updatePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
var updatePariwisataForm = (args, options) => ({
	action: updatePariwisata.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updatePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
updatePariwisataForm.patch = (args, options) => ({
	action: updatePariwisata.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updatePariwisata.form = updatePariwisataForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
var showUmkm = (args, options) => ({
	url: showUmkm.url(args, options),
	method: "get"
});
showUmkm.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showUmkm.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		umkm: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		umkm: typeof args.umkm === "object" ? args.umkm.id : args.umkm
	};
	return showUmkm.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showUmkm.get = (args, options) => ({
	url: showUmkm.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showUmkm.head = (args, options) => ({
	url: showUmkm.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
var showUmkmForm = (args, options) => ({
	action: showUmkm.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showUmkmForm.get = (args, options) => ({
	action: showUmkm.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showUmkmForm.head = (args, options) => ({
	action: showUmkm.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
showUmkm.form = showUmkmForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
var updateUmkm = (args, options) => ({
	url: updateUmkm.url(args, options),
	method: "patch"
});
updateUmkm.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
updateUmkm.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		umkm: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		umkm: typeof args.umkm === "object" ? args.umkm.id : args.umkm
	};
	return updateUmkm.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
updateUmkm.patch = (args, options) => ({
	url: updateUmkm.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
var updateUmkmForm = (args, options) => ({
	action: updateUmkm.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
updateUmkmForm.patch = (args, options) => ({
	action: updateUmkm.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updateUmkm.form = updateUmkmForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmSurveyAnswer
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
var updateUmkmSurveyAnswer = (args, options) => ({
	url: updateUmkmSurveyAnswer.url(args, options),
	method: "patch"
});
updateUmkmSurveyAnswer.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmSurveyAnswer
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
updateUmkmSurveyAnswer.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		umkm: args[1],
		answer: args[2]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		umkm: typeof args.umkm === "object" ? args.umkm.id : args.umkm,
		answer: typeof args.answer === "object" ? args.answer.id : args.answer
	};
	return updateUmkmSurveyAnswer.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace("{answer}", parsedArgs.answer.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmSurveyAnswer
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
updateUmkmSurveyAnswer.patch = (args, options) => ({
	url: updateUmkmSurveyAnswer.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmSurveyAnswer
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
var updateUmkmSurveyAnswerForm = (args, options) => ({
	action: updateUmkmSurveyAnswer.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmSurveyAnswer
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
updateUmkmSurveyAnswerForm.patch = (args, options) => ({
	action: updateUmkmSurveyAnswer.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updateUmkmSurveyAnswer.form = updateUmkmSurveyAnswerForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
var storeUmkmDocument = (args, options) => ({
	url: storeUmkmDocument.url(args, options),
	method: "post"
});
storeUmkmDocument.definition = {
	methods: ["post"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}/documents"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
storeUmkmDocument.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		umkm: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		umkm: typeof args.umkm === "object" ? args.umkm.id : args.umkm
	};
	return storeUmkmDocument.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
storeUmkmDocument.post = (args, options) => ({
	url: storeUmkmDocument.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
var storeUmkmDocumentForm = (args, options) => ({
	action: storeUmkmDocument.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
storeUmkmDocumentForm.post = (args, options) => ({
	action: storeUmkmDocument.url(args, options),
	method: "post"
});
storeUmkmDocument.form = storeUmkmDocumentForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
var updateUmkmDocument = (args, options) => ({
	url: updateUmkmDocument.url(args, options),
	method: "patch"
});
updateUmkmDocument.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
updateUmkmDocument.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		umkm: args[1],
		document: args[2]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		umkm: typeof args.umkm === "object" ? args.umkm.id : args.umkm,
		document: typeof args.document === "object" ? args.document.id : args.document
	};
	return updateUmkmDocument.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace("{document}", parsedArgs.document.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
updateUmkmDocument.patch = (args, options) => ({
	url: updateUmkmDocument.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
var updateUmkmDocumentForm = (args, options) => ({
	action: updateUmkmDocument.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
updateUmkmDocumentForm.patch = (args, options) => ({
	action: updateUmkmDocument.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updateUmkmDocument.form = updateUmkmDocumentForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
var destroyUmkmDocument = (args, options) => ({
	url: destroyUmkmDocument.url(args, options),
	method: "delete"
});
destroyUmkmDocument.definition = {
	methods: ["delete"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroyUmkmDocument.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		umkm: args[1],
		document: args[2]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		umkm: typeof args.umkm === "object" ? args.umkm.id : args.umkm,
		document: typeof args.document === "object" ? args.document.id : args.document
	};
	return destroyUmkmDocument.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace("{document}", parsedArgs.document.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroyUmkmDocument.delete = (args, options) => ({
	url: destroyUmkmDocument.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
var destroyUmkmDocumentForm = (args, options) => ({
	action: destroyUmkmDocument.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroyUmkmDocumentForm.delete = (args, options) => ({
	action: destroyUmkmDocument.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroyUmkmDocument.form = destroyUmkmDocumentForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
var exportMethod = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "get"
});
exportMethod.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/export"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
exportMethod.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return exportMethod.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
exportMethod.get = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
exportMethod.head = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
var exportMethodForm = (args, options) => ({
	action: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
exportMethodForm.get = (args, options) => ({
	action: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
exportMethodForm.head = (args, options) => ({
	action: exportMethod.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
exportMethod.form = exportMethodForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateVillageAnnualData
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
var updateVillageAnnualData = (args, options) => ({
	url: updateVillageAnnualData.url(args, options),
	method: "patch"
});
updateVillageAnnualData.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}/village-annual-data"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateVillageAnnualData
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
updateVillageAnnualData.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return updateVillageAnnualData.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateVillageAnnualData
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
updateVillageAnnualData.patch = (args, options) => ({
	url: updateVillageAnnualData.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateVillageAnnualData
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
var updateVillageAnnualDataForm = (args, options) => ({
	action: updateVillageAnnualData.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateVillageAnnualData
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
updateVillageAnnualDataForm.patch = (args, options) => ({
	action: updateVillageAnnualData.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updateVillageAnnualData.form = updateVillageAnnualDataForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
var show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
show.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return show.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:246
* @route '/survey-assignments/{assignment}'
*/
var update = (args, options) => ({
	url: update.url(args, options),
	method: "patch"
});
update.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:246
* @route '/survey-assignments/{assignment}'
*/
update.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return update.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:246
* @route '/survey-assignments/{assignment}'
*/
update.patch = (args, options) => ({
	url: update.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:246
* @route '/survey-assignments/{assignment}'
*/
var updateForm = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:246
* @route '/survey-assignments/{assignment}'
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
var takeSurvey = (args, options) => ({
	url: takeSurvey.url(args, options),
	method: "get"
});
takeSurvey.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/take-survey"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurvey.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return takeSurvey.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurvey.get = (args, options) => ({
	url: takeSurvey.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurvey.head = (args, options) => ({
	url: takeSurvey.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
var takeSurveyForm = (args, options) => ({
	action: takeSurvey.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurveyForm.get = (args, options) => ({
	action: takeSurvey.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurveyForm.head = (args, options) => ({
	action: takeSurvey.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
takeSurvey.form = takeSurveyForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
var storeSurveyDraft = (args, options) => ({
	url: storeSurveyDraft.url(args, options),
	method: "post"
});
storeSurveyDraft.definition = {
	methods: ["post"],
	url: "/survey-assignments/{assignment}/take-survey"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
storeSurveyDraft.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return storeSurveyDraft.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
storeSurveyDraft.post = (args, options) => ({
	url: storeSurveyDraft.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
var storeSurveyDraftForm = (args, options) => ({
	action: storeSurveyDraft.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
storeSurveyDraftForm.post = (args, options) => ({
	action: storeSurveyDraft.url(args, options),
	method: "post"
});
storeSurveyDraft.form = storeSurveyDraftForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroySurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
var destroySurveyDocument = (args, options) => ({
	url: destroySurveyDocument.url(args, options),
	method: "delete"
});
destroySurveyDocument.definition = {
	methods: ["delete"],
	url: "/survey-assignments/{assignment}/take-survey/documents/{document}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroySurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
destroySurveyDocument.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		document: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		document: typeof args.document === "object" ? args.document.id : args.document
	};
	return destroySurveyDocument.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{document}", parsedArgs.document.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroySurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
destroySurveyDocument.delete = (args, options) => ({
	url: destroySurveyDocument.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroySurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
var destroySurveyDocumentForm = (args, options) => ({
	action: destroySurveyDocument.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroySurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
destroySurveyDocumentForm.delete = (args, options) => ({
	action: destroySurveyDocument.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroySurveyDocument.form = destroySurveyDocumentForm;
//#endregion
//#region resources/js/pages/survey-assignment/index.tsx
var statIcons = {
	clipboard: ClipboardCheck,
	activity: Activity,
	search: FileSearch,
	check: CheckCircle2
};
var defaultForm = {
	code: "",
	village_id: "",
	started_at: ""
};
function normalizeAssignmentCode(value) {
	return value.trim().toUpperCase();
}
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
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
function paginationLabel(label) {
	return label.replace("&laquo; Previous", "Previous").replace("Next &raquo;", "Next");
}
function Badge({ children, className }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex h-6 items-center rounded-md px-2 text-[11px] font-bold ${className}`,
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
function SurveyAssignmentIndex({ stats, assignments, filters, status_options, template_options, village_options, per_page_options }) {
	const { auth } = usePage().props;
	const isEnumerator = auth.user?.role === "enumerator";
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isAccessOpen, setIsAccessOpen] = useState(false);
	const [selectedAssignment, setSelectedAssignment] = useState(null);
	const [selectedAction, setSelectedAction] = useState("detail");
	const [accessCode, setAccessCode] = useState("");
	const [accessError, setAccessError] = useState("");
	const [filterForm, setFilterForm] = useState({
		search: filters.search ?? "",
		status: filters.status ?? "",
		template_id: filters.template_id ? String(filters.template_id) : "",
		view: filters.view ?? "active",
		per_page: String(filters.per_page ?? 10)
	});
	const { data, setData, post, processing, errors, reset, clearErrors } = useForm(defaultForm);
	function submitFilters(event) {
		event.preventDefault();
		router.get(surveyAssignments.url(), {
			search: filterForm.search || void 0,
			status: filterForm.status || void 0,
			template_id: filterForm.template_id || void 0,
			view: filterForm.view || void 0,
			per_page: filterForm.per_page || void 0
		}, {
			preserveState: true,
			preserveScroll: true
		});
	}
	function resetFilters() {
		setFilterForm({
			search: "",
			status: "",
			template_id: "",
			view: "active",
			per_page: "10"
		});
		router.get(surveyAssignments.url(), {}, { preserveScroll: true });
	}
	function changeView(view) {
		setFilterForm((current) => ({
			...current,
			view
		}));
		router.get(surveyAssignments.url(), {
			search: filterForm.search || void 0,
			status: filterForm.status || void 0,
			template_id: filterForm.template_id || void 0,
			view,
			per_page: filterForm.per_page || void 0
		}, {
			preserveState: true,
			preserveScroll: true
		});
	}
	function handleDelete(assignment) {
		if (!assignment.code || !window.confirm("Pindahkan survey assignment ini ke trash?")) return;
		router.delete(destroy.url(assignment.code), { preserveScroll: true });
	}
	function handleRestore(assignment) {
		if (!assignment.code || !window.confirm("Pulihkan survey assignment ini dari trash?")) return;
		router.patch(restore.url(assignment.code), {}, { preserveScroll: true });
	}
	function openCreateModal() {
		reset();
		clearErrors();
		setIsCreateOpen(true);
	}
	function submitAssignment(event) {
		event.preventDefault();
		post(store$1.url(), {
			preserveScroll: true,
			onSuccess: () => {
				reset();
				clearErrors();
				setIsCreateOpen(false);
			}
		});
	}
	function changePerPage(perPage) {
		setFilterForm((current) => ({
			...current,
			per_page: perPage
		}));
		router.get(surveyAssignments.url(), {
			search: filterForm.search || void 0,
			status: filterForm.status || void 0,
			template_id: filterForm.template_id || void 0,
			view: filterForm.view || void 0,
			per_page: perPage
		}, {
			preserveState: true,
			preserveScroll: true
		});
	}
	function openAccessModal(assignment, action) {
		if (!isEnumerator) {
			if (!assignment.code) {
				setSelectedAssignment(assignment);
				setSelectedAction(action);
				setAccessCode("");
				setAccessError("Kode assignment belum tersedia. Hubungi admin.");
				setIsAccessOpen(true);
				return;
			}
			router.visit(action === "detail" ? show$1.url(assignment.code) : takeSurvey$1.url(assignment.code));
			return;
		}
		setSelectedAssignment(assignment);
		setSelectedAction(action);
		setAccessCode("");
		setAccessError("");
		setIsAccessOpen(true);
	}
	function closeAccessModal(open) {
		setIsAccessOpen(open);
		if (!open) {
			setSelectedAssignment(null);
			setAccessCode("");
			setAccessError("");
		}
	}
	function submitAccess(event) {
		event.preventDefault();
		if (!selectedAssignment?.code) {
			setAccessError("Kode assignment belum tersedia. Hubungi admin.");
			return;
		}
		if (normalizeAssignmentCode(accessCode) !== normalizeAssignmentCode(selectedAssignment.code)) {
			setAccessError("Kode assignment tidak sesuai.");
			return;
		}
		router.visit(selectedAction === "detail" ? show$1.url(selectedAssignment.code) : takeSurvey$1.url(selectedAssignment.code));
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Survey Assignment" }),
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
										children: "Survey KEMENPAR"
									})
								]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-[30px] leading-9 font-bold tracking-[-0.01em] text-[#303030]",
								children: "Manajemen Survey KEMENPAR"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm leading-5 text-[#7C7C7C]",
								children: "Pantau KEMENPAR survey desa wisata, status pengerjaan, reviewer, dan riwayat waktu dari database."
							})
						] }), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "inline-flex rounded-lg border border-[#DDE4EC] bg-white p-1",
								children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => changeView("active"),
									className: `rounded-md px-4 py-2 text-sm font-bold ${filterForm.view === "active" ? "bg-[#0066AE] text-white" : "text-[#0066AE]"}`,
									children: "Data Aktif"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => changeView("trash"),
									className: `rounded-md px-4 py-2 text-sm font-bold ${filterForm.view === "trash" ? "bg-[#093967] text-white" : "text-[#7C7C7C]"}`,
									children: "Trash"
								})]
							}), !isEnumerator && filterForm.view !== "trash" && /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: openCreateModal,
								className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.2)] transition hover:bg-[#093967]",
								children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Assignment"]
							})]
						})]
					}),
					/* @__PURE__ */ jsx("section", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
						children: stats.map((stat) => {
							const Icon = statIcons[stat.icon];
							return /* @__PURE__ */ jsxs("article", {
								className: "flex min-h-[116px] items-center gap-4 rounded-xl border border-[#EFEFEF] bg-white p-5 shadow-[0_4px_12px_rgba(3,17,32,0.06)]",
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex size-[58px] shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0066AE]",
									children: /* @__PURE__ */ jsx(Icon, {
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
					/* @__PURE__ */ jsx("form", {
						onSubmit: submitFilters,
						className: "rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_12px_rgba(3,17,32,0.05)]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(300px,1fr)_180px_minmax(230px,0.8fr)_auto_auto]",
							children: [
								/* @__PURE__ */ jsxs("label", {
									className: "flex h-11 min-w-0 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-[#7C7C7C]",
									children: [/* @__PURE__ */ jsx(Search, { className: "size-4" }), /* @__PURE__ */ jsx("input", {
										value: filterForm.search,
										onChange: (event) => setFilterForm((current) => ({
											...current,
											search: event.target.value
										})),
										className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7C7C7C]",
										placeholder: isEnumerator ? "Cari desa, kode desa, atau template..." : "Cari ID assignment, desa, kode desa, atau template..."
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-[11px] font-semibold text-[#7C7C7C]",
										children: "Status"
									}), /* @__PURE__ */ jsxs("select", {
										value: filterForm.status,
										onChange: (event) => setFilterForm((current) => ({
											...current,
											status: event.target.value
										})),
										className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none",
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Semua Status"
										}), status_options.map((option) => /* @__PURE__ */ jsx("option", {
											value: option.value,
											children: option.label
										}, option.value))]
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-[11px] font-semibold text-[#7C7C7C]",
										children: "Template Survey"
									}), /* @__PURE__ */ jsxs("select", {
										value: filterForm.template_id,
										onChange: (event) => setFilterForm((current) => ({
											...current,
											template_id: event.target.value
										})),
										className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none",
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Semua Template"
										}), template_options.map((option) => /* @__PURE__ */ jsx("option", {
											value: option.value,
											children: option.label
										}, option.value))]
									})]
								}),
								/* @__PURE__ */ jsx("button", {
									className: "h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_5px_12px_rgba(0,102,174,0.16)]",
									children: "Terapkan"
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
									children: "Daftar Survey Assignment"
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-0.5 text-sm text-[#7C7C7C]",
									children: "Ringkasan assignment survey desa wisata dan progress pengisiannya."
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full min-w-[980px] border-collapse text-left text-sm",
									children: [/* @__PURE__ */ jsx("thead", {
										className: "bg-[#F8FBFF] text-[12px] text-[#093967]",
										children: /* @__PURE__ */ jsx("tr", { children: [
											"ID",
											"Desa",
											"Status",
											"Created At",
											"Total Skor",
											"Progress",
											"Aksi"
										].map((head) => /* @__PURE__ */ jsx("th", {
											className: head === "Total Skor" ? "px-5 py-4 font-bold whitespace-nowrap bg-[#EAF3FF] text-[#0066AE] text-sm text-center" : "px-3 py-3 font-bold whitespace-nowrap",
											children: head
										}, head)) })
									}), /* @__PURE__ */ jsx("tbody", {
										className: "divide-y divide-[#EFEFEF]",
										children: assignments.data.map((assignment) => /* @__PURE__ */ jsxs("tr", {
											className: "hover:bg-[#FAFCFF]",
											children: [
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3 font-bold text-[#0066AE]",
													children: isEnumerator ? `#${assignment.id}` : assignment.code ?? `#${assignment.id}`
												}),
												/* @__PURE__ */ jsxs("td", {
													className: "px-3 py-3",
													children: [/* @__PURE__ */ jsx("span", {
														className: "block font-bold text-[#303030]",
														children: assignment.village_name
													}), /* @__PURE__ */ jsx("span", {
														className: "block text-[12px] leading-4 text-[#7C7C7C]",
														children: assignment.village_location
													})]
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3",
													children: /* @__PURE__ */ jsx(Badge, {
														className: statusClass(assignment.status),
														children: assignment.status_label
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3 font-medium text-[#303030]",
													children: assignment.created_at
												}),
												/* @__PURE__ */ jsx("td", {
													className: "bg-[#F8FBFE] px-5 py-4 text-center text-sm font-black text-[#0066AE]",
													children: assignment.total_score.toFixed(1)
												}),
												/* @__PURE__ */ jsxs("td", {
													className: "px-3 py-3",
													children: [/* @__PURE__ */ jsxs("span", {
														className: "block font-bold text-[#0066AE]",
														children: [
															assignment.answers_count,
															" ",
															"jawaban"
														]
													}), /* @__PURE__ */ jsxs("span", {
														className: "block text-[12px] text-[#7C7C7C]",
														children: [
															assignment.documents_count,
															" ",
															"dokumen"
														]
													})]
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
																className: "gap-2 text-xs",
																onSelect: (event) => {
																	event.preventDefault();
																	openAccessModal(assignment, "detail");
																},
																children: [/* @__PURE__ */ jsx(Eye, { className: "size-4 text-[#303030]" }), "Lihat Detail"]
															}),
															/* @__PURE__ */ jsxs(DropdownMenuItem, {
																className: "gap-2 text-xs",
																onSelect: (event) => {
																	event.preventDefault();
																	openAccessModal(assignment, "take-survey");
																},
																children: [/* @__PURE__ */ jsx(ClipboardList, { className: "size-4 text-[#303030]" }), "Take Survey"]
															}),
															!isEnumerator && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(DropdownMenuSeparator, {}), assignment.is_trashed ? /* @__PURE__ */ jsxs(DropdownMenuItem, {
																className: "gap-2 text-xs font-bold text-[#00893D]",
																onSelect: (event) => {
																	event.preventDefault();
																	handleRestore(assignment);
																},
																children: [/* @__PURE__ */ jsx(ClipboardCheck, { className: "size-4 text-[#00893D]" }), "Pulihkan Assignment"]
															}) : /* @__PURE__ */ jsxs(DropdownMenuItem, {
																className: "gap-2 text-xs font-bold text-[#D81313]",
																onSelect: (event) => {
																	event.preventDefault();
																	handleDelete(assignment);
																},
																children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4 text-[#D81313]" }), "Hapus Assignment"]
															})] })
														]
													})] })
												})
											]
										}, assignment.id))
									})]
								})
							}),
							assignments.data.length === 0 && /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center px-6 py-14 text-center",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "flex size-14 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]",
										children: /* @__PURE__ */ jsx(ClipboardCheck, { className: "size-7" })
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "mt-4 text-lg font-bold text-[#303030]",
										children: "Belum ada survey assignment"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1 max-w-md text-sm leading-5 text-[#7C7C7C]",
										children: "Assignment survey desa yang dibuat akan muncul di halaman ini."
									}),
									!isEnumerator && /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: openCreateModal,
										className: "mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white",
										children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Assignment"]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-3 border-t border-[#EFEFEF] px-5 py-4 text-sm text-[#303030] lg:flex-row lg:items-center lg:justify-between",
								children: [/* @__PURE__ */ jsxs("span", { children: [
									"Menampilkan ",
									assignments.from ?? 0,
									"-",
									assignments.to ?? 0,
									" dari ",
									assignments.total,
									" ",
									"assignment"
								] }), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-3 sm:flex-row sm:items-center",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "flex items-center gap-2 text-sm font-semibold text-[#303030]",
										children: [/* @__PURE__ */ jsx("span", { children: "Per page" }), /* @__PURE__ */ jsx("select", {
											value: filterForm.per_page,
											onChange: (event) => changePerPage(event.target.value),
											className: "h-9 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030] outline-none",
											children: per_page_options.map((option) => /* @__PURE__ */ jsx("option", {
												value: option,
												children: option
											}, option))
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-2",
										children: assignments.links.map((link, index) => /* @__PURE__ */ jsx("button", {
											type: "button",
											disabled: !link.url,
											onClick: () => link.url && router.visit(link.url, {
												preserveScroll: true,
												preserveState: true
											}),
											className: classNames("h-9 rounded-lg border px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45", link.active ? "border-[#0066AE] bg-[#0066AE] text-white" : "border-[#DDE4EC] bg-white text-[#303030]"),
											children: paginationLabel(link.label)
										}, `${link.label}-${index}`))
									})]
								})]
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open: isCreateOpen,
			onOpenChange: setIsCreateOpen,
			children: /* @__PURE__ */ jsxs(DialogContent, {
				className: "max-h-[90dvh] overflow-y-auto rounded-2xl sm:max-w-[860px]",
				children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Tambah Survey Assignment" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Isi kode assignment, pilih desa, dan jadwal mulai. Template aktif terbaru, status, assigned by, dan assigned at diisi otomatis oleh sistem." })] }), /* @__PURE__ */ jsxs("form", {
					onSubmit: submitAssignment,
					className: "space-y-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-bold text-[#303030]",
										children: "Kode Assignment"
									}),
									/* @__PURE__ */ jsx("input", {
										value: data.code,
										onChange: (event) => setData("code", event.target.value.toUpperCase()),
										placeholder: "Contoh: ASG-001",
										className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm outline-none focus:border-[#2FA6FC]"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-[11px] font-semibold text-[#7C7C7C]",
										children: "Gunakan huruf kapital, angka, dan tanda hubung."
									}),
									/* @__PURE__ */ jsx(FieldError, { message: errors.code })
								]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-bold text-[#303030]",
										children: "Desa"
									}),
									/* @__PURE__ */ jsxs("select", {
										value: data.village_id,
										onChange: (event) => setData("village_id", event.target.value),
										className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm outline-none focus:border-[#2FA6FC]",
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Pilih Desa"
										}), village_options.map((option) => /* @__PURE__ */ jsx("option", {
											value: option.value,
											children: option.description ? `${option.label} - ${option.description}` : option.label
										}, option.value))]
									}),
									/* @__PURE__ */ jsx(FieldError, { message: errors.village_id })
								]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-bold text-[#303030]",
										children: "Started At"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "datetime-local",
										value: data.started_at,
										onChange: (event) => setData("started_at", event.target.value),
										className: "h-11 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#2FA6FC]"
									}),
									/* @__PURE__ */ jsx(FieldError, { message: errors.started_at })
								]
							})
						]
					}), /* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setIsCreateOpen(false),
						className: "h-11 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#303030]",
						children: "Batal"
					}), /* @__PURE__ */ jsx("button", {
						disabled: processing,
						className: "h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white disabled:opacity-60",
						children: processing ? "Menyimpan..." : "Simpan Assignment"
					})] })]
				})]
			})
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open: isAccessOpen,
			onOpenChange: closeAccessModal,
			children: /* @__PURE__ */ jsxs(DialogContent, {
				className: "rounded-2xl sm:max-w-[460px]",
				children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Verifikasi Kode Assignment" }), /* @__PURE__ */ jsxs(DialogDescription, { children: [
					"Masukkan kode survey assignment untuk mengakses",
					" ",
					selectedAction === "detail" ? "detail assignment" : "halaman take survey",
					"."
				] })] }), /* @__PURE__ */ jsxs("form", {
					onSubmit: submitAccess,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-xl border border-[#EFEFEF] bg-[#F8FBFF] p-4",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-bold text-[#303030]",
								children: selectedAssignment?.village_name ?? "-"
							}), /* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-xs font-semibold text-[#7C7C7C]",
								children: [
									selectedAssignment?.village_code ?? "-",
									" ·",
									" ",
									selectedAssignment?.village_location ?? "-"
								]
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-sm font-bold text-[#303030]",
									children: "Kode Assignment"
								}),
								/* @__PURE__ */ jsx("input", {
									autoFocus: true,
									value: accessCode,
									onChange: (event) => {
										setAccessCode(event.target.value.toUpperCase());
										setAccessError("");
									},
									placeholder: "Contoh: ASG-001",
									className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm outline-none focus:border-[#2FA6FC]"
								}),
								accessError && /* @__PURE__ */ jsx("p", {
									className: "text-xs font-semibold text-[#D81313]",
									children: accessError
								})
							]
						}),
						/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => closeAccessModal(false),
							className: "h-11 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#303030]",
							children: "Batal"
						}), /* @__PURE__ */ jsx("button", {
							disabled: accessCode.trim() === "",
							className: "h-11 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60",
							children: "Masuk"
						})] })
					]
				})]
			})
		})
	] });
}
SurveyAssignmentIndex.layout = { breadcrumbs: [{
	title: "Dashboard",
	href: dashboard()
}, {
	title: "Survey Assignment",
	href: surveyAssignments()
}] };
//#endregion
export { SurveyAssignmentIndex as default };

//# sourceMappingURL=survey-assignment-DB-OCWgV.js.map