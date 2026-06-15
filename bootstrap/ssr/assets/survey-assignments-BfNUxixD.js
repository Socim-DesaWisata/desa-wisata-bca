import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-BrhwLpUM.js";
//#region resources/js/routes/survey-assignments/create-umkm/index.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
var store$5 = (args, options) => ({
	url: store$5.url(args, options),
	method: "post"
});
store$5.definition = {
	methods: ["post"],
	url: "/survey-assignments/{assignment}/create/umkm"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
store$5.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return store$5.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
store$5.post = (args, options) => ({
	url: store$5.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
var storeForm$5 = (args, options) => ({
	action: store$5.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
storeForm$5.post = (args, options) => ({
	action: store$5.url(args, options),
	method: "post"
});
store$5.form = storeForm$5;
var createUmkm$1 = { store: Object.assign(store$5, store$5) };
//#endregion
//#region resources/js/routes/survey-assignments/create-pariwisata/index.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
var store$4 = (args, options) => ({
	url: store$4.url(args, options),
	method: "post"
});
store$4.definition = {
	methods: ["post"],
	url: "/survey-assignments/{assignment}/create/pariwisata"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
store$4.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return store$4.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
store$4.post = (args, options) => ({
	url: store$4.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
var storeForm$4 = (args, options) => ({
	action: store$4.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
storeForm$4.post = (args, options) => ({
	action: store$4.url(args, options),
	method: "post"
});
store$4.form = storeForm$4;
var createPariwisata$1 = { store: Object.assign(store$4, store$4) };
//#endregion
//#region resources/js/routes/survey-assignments/pariwisata/take-survey/documents/index.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
var destroy$3 = (args, options) => ({
	url: destroy$3.url(args, options),
	method: "delete"
});
destroy$3.definition = {
	methods: ["delete"],
	url: "/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroy$3.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		document: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		document: typeof args.document === "object" ? args.document.id : args.document
	};
	return destroy$3.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{document}", parsedArgs.document.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroy$3.delete = (args, options) => ({
	url: destroy$3.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
var destroyForm$3 = (args, options) => ({
	action: destroy$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroyForm$3.delete = (args, options) => ({
	action: destroy$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$3.form = destroyForm$3;
var documents$2 = { destroy: Object.assign(destroy$3, destroy$3) };
//#endregion
//#region resources/js/routes/survey-assignments/pariwisata/take-survey/index.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
var store$3 = (args, options) => ({
	url: store$3.url(args, options),
	method: "post"
});
store$3.definition = {
	methods: ["post"],
	url: "/survey-assignments/{assignment}/pariwisata/take-survey"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
store$3.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return store$3.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
store$3.post = (args, options) => ({
	url: store$3.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
var storeForm$3 = (args, options) => ({
	action: store$3.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
storeForm$3.post = (args, options) => ({
	action: store$3.url(args, options),
	method: "post"
});
store$3.form = storeForm$3;
var takeSurvey$3 = {
	store: Object.assign(store$3, store$3),
	documents: Object.assign(documents$2, documents$2)
};
//#endregion
//#region resources/js/routes/survey-assignments/pariwisata/index.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
var takeSurvey$2 = (args, options) => ({
	url: takeSurvey$2.url(args, options),
	method: "get"
});
takeSurvey$2.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/pariwisata/take-survey"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takeSurvey$2.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return takeSurvey$2.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takeSurvey$2.get = (args, options) => ({
	url: takeSurvey$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takeSurvey$2.head = (args, options) => ({
	url: takeSurvey$2.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
var takeSurveyForm$1 = (args, options) => ({
	action: takeSurvey$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takeSurveyForm$1.get = (args, options) => ({
	action: takeSurvey$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takeSurveyForm$1.head = (args, options) => ({
	action: takeSurvey$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
takeSurvey$2.form = takeSurveyForm$1;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
var show$2 = (args, options) => ({
	url: show$2.url(args, options),
	method: "get"
});
show$2.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/pariwisata/{pariwisata}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
show$2.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		pariwisata: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		pariwisata: typeof args.pariwisata === "object" ? args.pariwisata.id : args.pariwisata
	};
	return show$2.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{pariwisata}", parsedArgs.pariwisata.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
show$2.get = (args, options) => ({
	url: show$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
show$2.head = (args, options) => ({
	url: show$2.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
var showForm$2 = (args, options) => ({
	action: show$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showForm$2.get = (args, options) => ({
	action: show$2.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showForm$2.head = (args, options) => ({
	action: show$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show$2.form = showForm$2;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
var exportMethod$1 = (args, options) => ({
	url: exportMethod$1.url(args, options),
	method: "get"
});
exportMethod$1.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/pariwisata/{pariwisata}/export"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportMethod$1.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		pariwisata: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		pariwisata: typeof args.pariwisata === "object" ? args.pariwisata.id : args.pariwisata
	};
	return exportMethod$1.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{pariwisata}", parsedArgs.pariwisata.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportMethod$1.get = (args, options) => ({
	url: exportMethod$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportMethod$1.head = (args, options) => ({
	url: exportMethod$1.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
var exportMethodForm$1 = (args, options) => ({
	action: exportMethod$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportMethodForm$1.get = (args, options) => ({
	action: exportMethod$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportMethodForm$1.head = (args, options) => ({
	action: exportMethod$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
exportMethod$1.form = exportMethodForm$1;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
var update$5 = (args, options) => ({
	url: update$5.url(args, options),
	method: "patch"
});
update$5.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}/pariwisata/{pariwisata}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
update$5.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		pariwisata: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		pariwisata: typeof args.pariwisata === "object" ? args.pariwisata.id : args.pariwisata
	};
	return update$5.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{pariwisata}", parsedArgs.pariwisata.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
update$5.patch = (args, options) => ({
	url: update$5.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
var updateForm$5 = (args, options) => ({
	action: update$5.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
updateForm$5.patch = (args, options) => ({
	action: update$5.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$5.form = updateForm$5;
var pariwisata = {
	takeSurvey: Object.assign(takeSurvey$2, takeSurvey$3),
	show: Object.assign(show$2, show$2),
	export: Object.assign(exportMethod$1, exportMethod$1),
	update: Object.assign(update$5, update$5)
};
//#endregion
//#region resources/js/routes/survey-assignments/umkm/answers/index.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
var update$4 = (args, options) => ({
	url: update$4.url(args, options),
	method: "patch"
});
update$4.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
update$4.url = (args, options) => {
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
	return update$4.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace("{answer}", parsedArgs.answer.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
update$4.patch = (args, options) => ({
	url: update$4.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
var updateForm$4 = (args, options) => ({
	action: update$4.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
updateForm$4.patch = (args, options) => ({
	action: update$4.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$4.form = updateForm$4;
var answers = { update: Object.assign(update$4, update$4) };
//#endregion
//#region resources/js/routes/survey-assignments/umkm/documents/index.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
var store$2 = (args, options) => ({
	url: store$2.url(args, options),
	method: "post"
});
store$2.definition = {
	methods: ["post"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}/documents"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
store$2.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		umkm: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		umkm: typeof args.umkm === "object" ? args.umkm.id : args.umkm
	};
	return store$2.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
store$2.post = (args, options) => ({
	url: store$2.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
var storeForm$2 = (args, options) => ({
	action: store$2.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
storeForm$2.post = (args, options) => ({
	action: store$2.url(args, options),
	method: "post"
});
store$2.form = storeForm$2;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
var update$3 = (args, options) => ({
	url: update$3.url(args, options),
	method: "patch"
});
update$3.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
update$3.url = (args, options) => {
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
	return update$3.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace("{document}", parsedArgs.document.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
update$3.patch = (args, options) => ({
	url: update$3.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
var updateForm$3 = (args, options) => ({
	action: update$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
updateForm$3.patch = (args, options) => ({
	action: update$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$3.form = updateForm$3;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
var destroy$2 = (args, options) => ({
	url: destroy$2.url(args, options),
	method: "delete"
});
destroy$2.definition = {
	methods: ["delete"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroy$2.url = (args, options) => {
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
	return destroy$2.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace("{document}", parsedArgs.document.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroy$2.delete = (args, options) => ({
	url: destroy$2.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
var destroyForm$2 = (args, options) => ({
	action: destroy$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroyForm$2.delete = (args, options) => ({
	action: destroy$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$2.form = destroyForm$2;
var documents$1 = {
	store: Object.assign(store$2, store$2),
	update: Object.assign(update$3, update$3),
	destroy: Object.assign(destroy$2, destroy$2)
};
//#endregion
//#region resources/js/routes/survey-assignments/umkm/index.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
var show$1 = (args, options) => ({
	url: show$1.url(args, options),
	method: "get"
});
show$1.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
show$1.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		umkm: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		umkm: typeof args.umkm === "object" ? args.umkm.id : args.umkm
	};
	return show$1.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
show$1.get = (args, options) => ({
	url: show$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
show$1.head = (args, options) => ({
	url: show$1.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
var showForm$1 = (args, options) => ({
	action: show$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showForm$1.get = (args, options) => ({
	action: show$1.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showForm$1.head = (args, options) => ({
	action: show$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show$1.form = showForm$1;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
var update$2 = (args, options) => ({
	url: update$2.url(args, options),
	method: "patch"
});
update$2.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}/umkm/{umkm}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
update$2.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		umkm: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		umkm: typeof args.umkm === "object" ? args.umkm.id : args.umkm
	};
	return update$2.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{umkm}", parsedArgs.umkm.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
update$2.patch = (args, options) => ({
	url: update$2.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
var updateForm$2 = (args, options) => ({
	action: update$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
updateForm$2.patch = (args, options) => ({
	action: update$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$2.form = updateForm$2;
var umkm = {
	show: Object.assign(show$1, show$1),
	update: Object.assign(update$2, update$2),
	answers: Object.assign(answers, answers),
	documents: Object.assign(documents$1, documents$1)
};
//#endregion
//#region resources/js/routes/survey-assignments/village-annual-data/index.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
var update$1 = (args, options) => ({
	url: update$1.url(args, options),
	method: "patch"
});
update$1.definition = {
	methods: ["patch"],
	url: "/survey-assignments/{assignment}/village-annual-data"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
update$1.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return update$1.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
update$1.patch = (args, options) => ({
	url: update$1.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
var updateForm$1 = (args, options) => ({
	action: update$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
updateForm$1.patch = (args, options) => ({
	action: update$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$1.form = updateForm$1;
var villageAnnualData = { update: Object.assign(update$1, update$1) };
//#endregion
//#region resources/js/routes/survey-assignments/take-survey/documents/index.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
var destroy$1 = (args, options) => ({
	url: destroy$1.url(args, options),
	method: "delete"
});
destroy$1.definition = {
	methods: ["delete"],
	url: "/survey-assignments/{assignment}/take-survey/documents/{document}"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
destroy$1.url = (args, options) => {
	if (Array.isArray(args)) args = {
		assignment: args[0],
		document: args[1]
	};
	args = applyUrlDefaults(args);
	const parsedArgs = {
		assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment,
		document: typeof args.document === "object" ? args.document.id : args.document
	};
	return destroy$1.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace("{document}", parsedArgs.document.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
destroy$1.delete = (args, options) => ({
	url: destroy$1.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
var destroyForm$1 = (args, options) => ({
	action: destroy$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
destroyForm$1.delete = (args, options) => ({
	action: destroy$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy$1.form = destroyForm$1;
var documents = { destroy: Object.assign(destroy$1, destroy$1) };
//#endregion
//#region resources/js/routes/survey-assignments/take-survey/index.ts
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
var store$1 = (args, options) => ({
	url: store$1.url(args, options),
	method: "post"
});
store$1.definition = {
	methods: ["post"],
	url: "/survey-assignments/{assignment}/take-survey"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
store$1.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { assignment: args };
	if (typeof args === "object" && !Array.isArray(args) && "code" in args) args = { assignment: args.code };
	if (Array.isArray(args)) args = { assignment: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { assignment: typeof args.assignment === "object" ? args.assignment.code : args.assignment };
	return store$1.definition.url.replace("{assignment}", parsedArgs.assignment.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
store$1.post = (args, options) => ({
	url: store$1.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
var storeForm$1 = (args, options) => ({
	action: store$1.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
storeForm$1.post = (args, options) => ({
	action: store$1.url(args, options),
	method: "post"
});
store$1.form = storeForm$1;
var takeSurvey$1 = {
	store: Object.assign(store$1, store$1),
	documents: Object.assign(documents, documents)
};
//#endregion
//#region resources/js/routes/survey-assignments/index.ts
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
Object.assign(store, store), Object.assign(destroy, destroy), Object.assign(restore, restore), Object.assign(createUmkm, createUmkm$1), Object.assign(createPariwisata, createPariwisata$1), Object.assign(pariwisata, pariwisata), Object.assign(umkm, umkm), Object.assign(exportMethod, exportMethod), Object.assign(villageAnnualData, villageAnnualData), Object.assign(show, show), Object.assign(update, update), Object.assign(takeSurvey, takeSurvey$1);
//#endregion
export { store$5 as C, store$4 as S, show$2 as _, store as a, store$3 as b, store$1 as c, show$1 as d, update$2 as f, update$4 as g, update$3 as h, show as i, destroy$1 as l, store$2 as m, createUmkm as n, takeSurvey as o, destroy$2 as p, exportMethod as r, update as s, createPariwisata as t, update$1 as u, takeSurvey$2 as v, destroy$3 as x, update$5 as y };

//# sourceMappingURL=survey-assignments-BfNUxixD.js.map