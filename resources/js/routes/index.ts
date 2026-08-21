import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

login.form = loginForm

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

logout.form = logoutForm

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

register.form = registerForm

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: home.url(options),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: home.url(options),
    method: 'put',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: home.url(options),
    method: 'patch',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: home.url(options),
    method: 'delete',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
home.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: home.url(options),
    method: 'options',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: home.url(options),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/'
*/
homeForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'OPTIONS',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::__invoke
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: '/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: users.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: users.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserController::users
* @see app/Http/Controllers/UserController.php:17
* @route '/users'
*/
usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: users.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

users.form = usersForm

/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
export const questions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: questions.url(options),
    method: 'get',
})

questions.definition = {
    methods: ["get","head"],
    url: '/questions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
questions.url = (options?: RouteQueryOptions) => {
    return questions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
questions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: questions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
questions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: questions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
const questionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: questions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
questionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: questions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
questionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: questions.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

questions.form = questionsForm

/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
export const villages = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: villages.url(options),
    method: 'get',
})

villages.definition = {
    methods: ["get","head"],
    url: '/villages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
villages.url = (options?: RouteQueryOptions) => {
    return villages.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
villages.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: villages.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
villages.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: villages.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
const villagesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: villages.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
villagesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: villages.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::villages
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
villagesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: villages.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

villages.form = villagesForm

/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
export const umkm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: umkm.url(options),
    method: 'get',
})

umkm.definition = {
    methods: ["get","head"],
    url: '/umkm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
umkm.url = (options?: RouteQueryOptions) => {
    return umkm.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
umkm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: umkm.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
umkm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: umkm.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
const umkmForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: umkm.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
umkmForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: umkm.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UmkmController::umkm
* @see app/Http/Controllers/UmkmController.php:14
* @route '/umkm'
*/
umkmForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: umkm.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

umkm.form = umkmForm

/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
export const pariwisata = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pariwisata.url(options),
    method: 'get',
})

pariwisata.definition = {
    methods: ["get","head"],
    url: '/pariwisata',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
pariwisata.url = (options?: RouteQueryOptions) => {
    return pariwisata.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
pariwisata.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pariwisata.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
pariwisata.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pariwisata.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
const pariwisataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pariwisata.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
pariwisataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pariwisata.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PariwisataController::pariwisata
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
pariwisataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pariwisata.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pariwisata.form = pariwisataForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:43
* @route '/survey-assignments'
*/
export const surveyAssignments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: surveyAssignments.url(options),
    method: 'get',
})

surveyAssignments.definition = {
    methods: ["get","head"],
    url: '/survey-assignments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:43
* @route '/survey-assignments'
*/
surveyAssignments.url = (options?: RouteQueryOptions) => {
    return surveyAssignments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:43
* @route '/survey-assignments'
*/
surveyAssignments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: surveyAssignments.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:43
* @route '/survey-assignments'
*/
surveyAssignments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: surveyAssignments.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:43
* @route '/survey-assignments'
*/
const surveyAssignmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: surveyAssignments.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:43
* @route '/survey-assignments'
*/
surveyAssignmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: surveyAssignments.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::surveyAssignments
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:43
* @route '/survey-assignments'
*/
surveyAssignmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: surveyAssignments.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

surveyAssignments.form = surveyAssignmentsForm

/**
* @see routes/web.php:144
* @route '/chatbot'
*/
export const chatbot = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: chatbot.url(options),
    method: 'get',
})

chatbot.definition = {
    methods: ["get","head"],
    url: '/chatbot',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:144
* @route '/chatbot'
*/
chatbot.url = (options?: RouteQueryOptions) => {
    return chatbot.definition.url + queryParams(options)
}

/**
* @see routes/web.php:144
* @route '/chatbot'
*/
chatbot.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: chatbot.url(options),
    method: 'get',
})

/**
* @see routes/web.php:144
* @route '/chatbot'
*/
chatbot.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: chatbot.url(options),
    method: 'head',
})

/**
* @see routes/web.php:144
* @route '/chatbot'
*/
const chatbotForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: chatbot.url(options),
    method: 'get',
})

/**
* @see routes/web.php:144
* @route '/chatbot'
*/
chatbotForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: chatbot.url(options),
    method: 'get',
})

/**
* @see routes/web.php:144
* @route '/chatbot'
*/
chatbotForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: chatbot.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

chatbot.form = chatbotForm
