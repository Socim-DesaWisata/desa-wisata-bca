import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-BrhwLpUM.js";
//#region resources/js/routes/questions/templates/index.ts
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
var update$3 = (args, options) => ({
	url: update$3.url(args, options),
	method: "patch"
});
update$3.definition = {
	methods: ["patch"],
	url: "/questions/templates/{template}"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
update$3.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { template: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { template: args.id };
	if (Array.isArray(args)) args = { template: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { template: typeof args.template === "object" ? args.template.id : args.template };
	return update$3.definition.url.replace("{template}", parsedArgs.template.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
update$3.patch = (args, options) => ({
	url: update$3.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
var updateForm$3 = (args, options) => ({
	action: update$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
updateForm$3.patch = (args, options) => ({
	action: update$3.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$3.form = updateForm$3;
var templates = { update: Object.assign(update$3, update$3) };
//#endregion
//#region resources/js/routes/questions/umkm/index.ts
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:79
* @route '/questions/umkm/{question}'
*/
var update$2 = (args, options) => ({
	url: update$2.url(args, options),
	method: "patch"
});
update$2.definition = {
	methods: ["patch"],
	url: "/questions/umkm/{question}"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:79
* @route '/questions/umkm/{question}'
*/
update$2.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { question: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { question: args.id };
	if (Array.isArray(args)) args = { question: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { question: typeof args.question === "object" ? args.question.id : args.question };
	return update$2.definition.url.replace("{question}", parsedArgs.question.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:79
* @route '/questions/umkm/{question}'
*/
update$2.patch = (args, options) => ({
	url: update$2.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:79
* @route '/questions/umkm/{question}'
*/
var updateForm$2 = (args, options) => ({
	action: update$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:79
* @route '/questions/umkm/{question}'
*/
updateForm$2.patch = (args, options) => ({
	action: update$2.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$2.form = updateForm$2;
var umkm = { update: Object.assign(update$2, update$2) };
//#endregion
//#region resources/js/routes/questions/pariwisata/index.ts
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
var update$1 = (args, options) => ({
	url: update$1.url(args, options),
	method: "patch"
});
update$1.definition = {
	methods: ["patch"],
	url: "/questions/pariwisata/{question}"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
update$1.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { question: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { question: args.id };
	if (Array.isArray(args)) args = { question: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { question: typeof args.question === "object" ? args.question.id : args.question };
	return update$1.definition.url.replace("{question}", parsedArgs.question.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
update$1.patch = (args, options) => ({
	url: update$1.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
var updateForm$1 = (args, options) => ({
	action: update$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
updateForm$1.patch = (args, options) => ({
	action: update$1.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update$1.form = updateForm$1;
var pariwisata = { update: Object.assign(update$1, update$1) };
//#endregion
//#region resources/js/routes/questions/index.ts
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
var exportMethod = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "get"
});
exportMethod.definition = {
	methods: ["get", "head"],
	url: "/questions/{template}/export"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethod.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { template: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { template: args.id };
	if (Array.isArray(args)) args = { template: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { template: typeof args.template === "object" ? args.template.id : args.template };
	return exportMethod.definition.url.replace("{template}", parsedArgs.template.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethod.get = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethod.head = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
var exportMethodForm = (args, options) => ({
	action: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethodForm.get = (args, options) => ({
	action: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
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
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
var show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/questions/{template}"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
show.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { template: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { template: args.id };
	if (Array.isArray(args)) args = { template: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { template: typeof args.template === "object" ? args.template.id : args.template };
	return show.definition.url.replace("{template}", parsedArgs.template.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
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
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
var update = (args, options) => ({
	url: update.url(args, options),
	method: "patch"
});
update.definition = {
	methods: ["patch"],
	url: "/questions/{question}"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
update.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { question: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { question: args.id };
	if (Array.isArray(args)) args = { question: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { question: typeof args.question === "object" ? args.question.id : args.question };
	return update.definition.url.replace("{question}", parsedArgs.question.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
update.patch = (args, options) => ({
	url: update.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
var updateForm = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
updateForm.patch = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update.form = updateForm;
Object.assign(templates, templates), Object.assign(exportMethod, exportMethod), Object.assign(show, show), Object.assign(umkm, umkm), Object.assign(pariwisata, pariwisata), Object.assign(update, update);
//#endregion
export { show as n, exportMethod as t };

//# sourceMappingURL=questions-WXr_SZfd.js.map