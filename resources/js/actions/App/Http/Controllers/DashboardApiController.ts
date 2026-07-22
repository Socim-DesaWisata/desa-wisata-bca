import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardApiController::getDesa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
export const getDesa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDesa.url(options),
    method: 'get',
})

getDesa.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/desa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardApiController::getDesa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
getDesa.url = (options?: RouteQueryOptions) => {
    return getDesa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardApiController::getDesa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
getDesa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDesa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::getDesa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
getDesa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDesa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardApiController::getDesa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
const getDesaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getDesa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::getDesa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
getDesaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getDesa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::getDesa
* @see app/Http/Controllers/DashboardApiController.php:12
* @route '/api/dashboard/desa'
*/
getDesaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getDesa.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getDesa.form = getDesaForm

/**
* @see \App\Http\Controllers\DashboardApiController::getPariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
export const getPariwisata = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPariwisata.url(args, options),
    method: 'get',
})

getPariwisata.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/desa/{code}/pariwisata',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardApiController::getPariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
getPariwisata.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getPariwisata.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardApiController::getPariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
getPariwisata.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::getPariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
getPariwisata.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPariwisata.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardApiController::getPariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
const getPariwisataForm = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::getPariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
getPariwisataForm.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardApiController::getPariwisata
* @see app/Http/Controllers/DashboardApiController.php:31
* @route '/api/dashboard/desa/{code}/pariwisata'
*/
getPariwisataForm.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getPariwisata.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getPariwisata.form = getPariwisataForm

const DashboardApiController = { getDesa, getPariwisata }

export default DashboardApiController