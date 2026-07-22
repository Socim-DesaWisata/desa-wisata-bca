import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardApiController::desa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
export const desa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: desa.url(options),
    method: 'get',
})

desa.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/desa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardApiController::desa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
desa.url = (options?: RouteQueryOptions) => {
    return desa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardApiController::desa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
desa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: desa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::desa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
desa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: desa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardApiController::desa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
const desaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: desa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::desa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
desaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: desa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::desa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
desaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: desa.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

desa.form = desaForm

/**
* @see \App\Http\Controllers\DashboardApiController::pariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
export const pariwisata = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pariwisata.url(args, options),
    method: 'get',
})

pariwisata.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/desa/{code}/pariwisata',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardApiController::pariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
pariwisata.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    if (Array.isArray(args)) {
        args = {
            code: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        code: args.code,
    }

    return pariwisata.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardApiController::pariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
pariwisata.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::pariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
pariwisata.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pariwisata.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardApiController::pariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
const pariwisataForm = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::pariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
pariwisataForm.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::pariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
pariwisataForm.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pariwisata.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pariwisata.form = pariwisataForm

const dashboard = {
    desa: Object.assign(desa, desa),
    pariwisata: Object.assign(pariwisata, pariwisata),
}

export default dashboard