import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-BrhwLpUM.js";
//#region resources/js/routes/villages/index.ts
/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
var exportMethod = (options) => ({
	url: exportMethod.url(options),
	method: "get"
});
exportMethod.definition = {
	methods: ["get", "head"],
	url: "/villages/export"
};
/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
exportMethod.url = (options) => {
	return exportMethod.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
exportMethod.get = (options) => ({
	url: exportMethod.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
exportMethod.head = (options) => ({
	url: exportMethod.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
var exportMethodForm = (options) => ({
	action: exportMethod.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
exportMethodForm.get = (options) => ({
	action: exportMethod.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
exportMethodForm.head = (options) => ({
	action: exportMethod.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
exportMethod.form = exportMethodForm;
/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:30
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
* @see app/Http/Controllers/TourismVillageController.php:30
* @route '/villages'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:30
* @route '/villages'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:30
* @route '/villages'
*/
var storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:30
* @route '/villages'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
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
* @see app/Http/Controllers/TourismVillageController.php:37
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
* @see app/Http/Controllers/TourismVillageController.php:37
* @route '/villages/{village}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
* @route '/villages/{village}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
* @route '/villages/{village}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
* @route '/villages/{village}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
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
* @see app/Http/Controllers/TourismVillageController.php:42
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
* @see app/Http/Controllers/TourismVillageController.php:42
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
* @see app/Http/Controllers/TourismVillageController.php:42
* @route '/villages/{village}/edit'
*/
edit.get = (args, options) => ({
	url: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:42
* @route '/villages/{village}/edit'
*/
edit.head = (args, options) => ({
	url: edit.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:42
* @route '/villages/{village}/edit'
*/
var editForm = (args, options) => ({
	action: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:42
* @route '/villages/{village}/edit'
*/
editForm.get = (args, options) => ({
	action: edit.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:42
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
* @see app/Http/Controllers/TourismVillageController.php:47
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
* @see app/Http/Controllers/TourismVillageController.php:47
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
* @see app/Http/Controllers/TourismVillageController.php:47
* @route '/villages/{village}'
*/
update.patch = (args, options) => ({
	url: update.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\TourismVillageController::update
* @see app/Http/Controllers/TourismVillageController.php:47
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
* @see app/Http/Controllers/TourismVillageController.php:47
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
* @see app/Http/Controllers/TourismVillageController.php:57
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
* @see app/Http/Controllers/TourismVillageController.php:57
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
* @see app/Http/Controllers/TourismVillageController.php:57
* @route '/villages/{village}'
*/
destroy.delete = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\TourismVillageController::destroy
* @see app/Http/Controllers/TourismVillageController.php:57
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
* @see app/Http/Controllers/TourismVillageController.php:57
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
* @see app/Http/Controllers/TourismVillageController.php:66
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
* @see app/Http/Controllers/TourismVillageController.php:66
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
* @see app/Http/Controllers/TourismVillageController.php:66
* @route '/villages/{village}/restore'
*/
restore.patch = (args, options) => ({
	url: restore.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\TourismVillageController::restore
* @see app/Http/Controllers/TourismVillageController.php:66
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
* @see app/Http/Controllers/TourismVillageController.php:66
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
Object.assign(exportMethod, exportMethod), Object.assign(store, store), Object.assign(show, show), Object.assign(edit, edit), Object.assign(update, update), Object.assign(destroy, destroy), Object.assign(restore, restore);
//#endregion
export { show as a, restore as i, edit as n, exportMethod as r, destroy as t };

//# sourceMappingURL=villages-rJA_ttRN.js.map