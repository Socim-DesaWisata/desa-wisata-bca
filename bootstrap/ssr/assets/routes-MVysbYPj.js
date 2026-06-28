import { n as queryParams } from "./wayfinder-BrhwLpUM.js";
//#region resources/js/routes/index.ts
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
var login = (options) => ({
	url: login.url(options),
	method: "get"
});
login.definition = {
	methods: ["get", "head"],
	url: "/login"
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.url = (options) => {
	return login.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.get = (options) => ({
	url: login.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.head = (options) => ({
	url: login.url(options),
	method: "head"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
var loginForm = (options) => ({
	action: login.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
loginForm.get = (options) => ({
	action: login.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
loginForm.head = (options) => ({
	action: login.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
login.form = loginForm;
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
var logout = (options) => ({
	url: logout.url(options),
	method: "post"
});
logout.definition = {
	methods: ["post"],
	url: "/logout"
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.url = (options) => {
	return logout.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.post = (options) => ({
	url: logout.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
var logoutForm = (options) => ({
	action: logout.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logoutForm.post = (options) => ({
	action: logout.url(options),
	method: "post"
});
logout.form = logoutForm;
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
var register = (options) => ({
	url: register.url(options),
	method: "get"
});
register.definition = {
	methods: ["get", "head"],
	url: "/register"
};
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.url = (options) => {
	return register.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.get = (options) => ({
	url: register.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.head = (options) => ({
	url: register.url(options),
	method: "head"
});
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
var registerForm = (options) => ({
	action: register.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
registerForm.get = (options) => ({
	action: register.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
registerForm.head = (options) => ({
	action: register.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
register.form = registerForm;
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
var home = (options) => ({
	url: home.url(options),
	method: "get"
});
home.definition = {
	methods: [
		"get",
		"head",
		"post",
		"put",
		"patch",
		"delete",
		"options"
	],
	url: "/"
};
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.url = (options) => {
	return home.definition.url + queryParams(options);
};
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.get = (options) => ({
	url: home.url(options),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.head = (options) => ({
	url: home.url(options),
	method: "head"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.post = (options) => ({
	url: home.url(options),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.put = (options) => ({
	url: home.url(options),
	method: "put"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.patch = (options) => ({
	url: home.url(options),
	method: "patch"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.delete = (options) => ({
	url: home.url(options),
	method: "delete"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.options = (options) => ({
	url: home.url(options),
	method: "options"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
var homeForm = (options) => ({
	action: home.url(options),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.get = (options) => ({
	action: home.url(options),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.head = (options) => ({
	action: home.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.post = (options) => ({
	action: home.url(options),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.put = (options) => ({
	action: home.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.patch = (options) => ({
	action: home.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.delete = (options) => ({
	action: home.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.options = (options) => ({
	action: home.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "OPTIONS",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
home.form = homeForm;
/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
var dashboard = (options) => ({
	url: dashboard.url(options),
	method: "get"
});
dashboard.definition = {
	methods: ["get", "head"],
	url: "/dashboard"
};
/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
dashboard.url = (options) => {
	return dashboard.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
dashboard.get = (options) => ({
	url: dashboard.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
dashboard.head = (options) => ({
	url: dashboard.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
var dashboardForm = (options) => ({
	action: dashboard.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
dashboardForm.get = (options) => ({
	action: dashboard.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
dashboardForm.head = (options) => ({
	action: dashboard.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
dashboard.form = dashboardForm;
/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
var users = (options) => ({
	url: users.url(options),
	method: "get"
});
users.definition = {
	methods: ["get", "head"],
	url: "/users"
};
/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
users.url = (options) => {
	return users.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
users.get = (options) => ({
	url: users.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
users.head = (options) => ({
	url: users.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
var usersForm = (options) => ({
	action: users.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
usersForm.get = (options) => ({
	action: users.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
usersForm.head = (options) => ({
	action: users.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
users.form = usersForm;
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
var questions = (options) => ({
	url: questions.url(options),
	method: "get"
});
questions.definition = {
	methods: ["get", "head"],
	url: "/questions"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
questions.url = (options) => {
	return questions.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
questions.get = (options) => ({
	url: questions.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
questions.head = (options) => ({
	url: questions.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
var questionsForm = (options) => ({
	action: questions.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
questionsForm.get = (options) => ({
	action: questions.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
questionsForm.head = (options) => ({
	action: questions.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
questions.form = questionsForm;
/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
var villages = (options) => ({
	url: villages.url(options),
	method: "get"
});
villages.definition = {
	methods: ["get", "head"],
	url: "/villages"
};
/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
villages.url = (options) => {
	return villages.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
villages.get = (options) => ({
	url: villages.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
villages.head = (options) => ({
	url: villages.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
var villagesForm = (options) => ({
	action: villages.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
villagesForm.get = (options) => ({
	action: villages.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:16
* @route '/villages'
*/
villagesForm.head = (options) => ({
	action: villages.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
villages.form = villagesForm;
/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
var umkm = (options) => ({
	url: umkm.url(options),
	method: "get"
});
umkm.definition = {
	methods: ["get", "head"],
	url: "/umkm"
};
/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
umkm.url = (options) => {
	return umkm.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
umkm.get = (options) => ({
	url: umkm.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
umkm.head = (options) => ({
	url: umkm.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
var umkmForm = (options) => ({
	action: umkm.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
umkmForm.get = (options) => ({
	action: umkm.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
umkmForm.head = (options) => ({
	action: umkm.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
umkm.form = umkmForm;
/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
var pariwisata = (options) => ({
	url: pariwisata.url(options),
	method: "get"
});
pariwisata.definition = {
	methods: ["get", "head"],
	url: "/pariwisata"
};
/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
pariwisata.url = (options) => {
	return pariwisata.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
pariwisata.get = (options) => ({
	url: pariwisata.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
pariwisata.head = (options) => ({
	url: pariwisata.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
var pariwisataForm = (options) => ({
	action: pariwisata.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
pariwisataForm.get = (options) => ({
	action: pariwisata.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
pariwisataForm.head = (options) => ({
	action: pariwisata.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
pariwisata.form = pariwisataForm;
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:40
* @route '/survey-assignments'
*/
var surveyAssignments = (options) => ({
	url: surveyAssignments.url(options),
	method: "get"
});
surveyAssignments.definition = {
	methods: ["get", "head"],
	url: "/survey-assignments"
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:40
* @route '/survey-assignments'
*/
surveyAssignments.url = (options) => {
	return surveyAssignments.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:40
* @route '/survey-assignments'
*/
surveyAssignments.get = (options) => ({
	url: surveyAssignments.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:40
* @route '/survey-assignments'
*/
surveyAssignments.head = (options) => ({
	url: surveyAssignments.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:40
* @route '/survey-assignments'
*/
var surveyAssignmentsForm = (options) => ({
	action: surveyAssignments.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:40
* @route '/survey-assignments'
*/
surveyAssignmentsForm.get = (options) => ({
	action: surveyAssignments.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:40
* @route '/survey-assignments'
*/
surveyAssignmentsForm.head = (options) => ({
	action: surveyAssignments.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
surveyAssignments.form = surveyAssignmentsForm;
/**
* @see routes/web.php:111
* @route '/chatbot'
*/
var chatbot = (options) => ({
	url: chatbot.url(options),
	method: "get"
});
chatbot.definition = {
	methods: ["get", "head"],
	url: "/chatbot"
};
/**
* @see routes/web.php:111
* @route '/chatbot'
*/
chatbot.url = (options) => {
	return chatbot.definition.url + queryParams(options);
};
/**
* @see routes/web.php:111
* @route '/chatbot'
*/
chatbot.get = (options) => ({
	url: chatbot.url(options),
	method: "get"
});
/**
* @see routes/web.php:111
* @route '/chatbot'
*/
chatbot.head = (options) => ({
	url: chatbot.url(options),
	method: "head"
});
/**
* @see routes/web.php:111
* @route '/chatbot'
*/
var chatbotForm = (options) => ({
	action: chatbot.url(options),
	method: "get"
});
/**
* @see routes/web.php:111
* @route '/chatbot'
*/
chatbotForm.get = (options) => ({
	action: chatbot.url(options),
	method: "get"
});
/**
* @see routes/web.php:111
* @route '/chatbot'
*/
chatbotForm.head = (options) => ({
	action: chatbot.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
chatbot.form = chatbotForm;
//#endregion
export { pariwisata as a, surveyAssignments as c, villages as d, logout as i, umkm as l, home as n, questions as o, login as r, register as s, dashboard as t, users as u };

//# sourceMappingURL=routes-MVysbYPj.js.map