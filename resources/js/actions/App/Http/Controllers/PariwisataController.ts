import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PariwisataController::index
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pariwisata',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PariwisataController::index
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PariwisataController::index
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PariwisataController::index
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PariwisataController::index
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PariwisataController::index
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PariwisataController::index
* @see app/Http/Controllers/PariwisataController.php:14
* @route '/pariwisata'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\PariwisataController::destroy
* @see app/Http/Controllers/PariwisataController.php:19
* @route '/pariwisata/{pariwisata}'
*/
export const destroy = (args: { pariwisata: string | number | { id: string | number } } | [pariwisata: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/pariwisata/{pariwisata}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PariwisataController::destroy
* @see app/Http/Controllers/PariwisataController.php:19
* @route '/pariwisata/{pariwisata}'
*/
destroy.url = (args: { pariwisata: string | number | { id: string | number } } | [pariwisata: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pariwisata: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pariwisata: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pariwisata: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pariwisata: typeof args.pariwisata === 'object'
        ? args.pariwisata.id
        : args.pariwisata,
    }

    return destroy.definition.url
            .replace('{pariwisata}', parsedArgs.pariwisata.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PariwisataController::destroy
* @see app/Http/Controllers/PariwisataController.php:19
* @route '/pariwisata/{pariwisata}'
*/
destroy.delete = (args: { pariwisata: string | number | { id: string | number } } | [pariwisata: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PariwisataController::destroy
* @see app/Http/Controllers/PariwisataController.php:19
* @route '/pariwisata/{pariwisata}'
*/
const destroyForm = (args: { pariwisata: string | number | { id: string | number } } | [pariwisata: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PariwisataController::destroy
* @see app/Http/Controllers/PariwisataController.php:19
* @route '/pariwisata/{pariwisata}'
*/
destroyForm.delete = (args: { pariwisata: string | number | { id: string | number } } | [pariwisata: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\PariwisataController::restore
* @see app/Http/Controllers/PariwisataController.php:26
* @route '/pariwisata/{pariwisata}/restore'
*/
export const restore = (args: { pariwisata: string | number } | [pariwisata: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: restore.url(args, options),
    method: 'patch',
})

restore.definition = {
    methods: ["patch"],
    url: '/pariwisata/{pariwisata}/restore',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PariwisataController::restore
* @see app/Http/Controllers/PariwisataController.php:26
* @route '/pariwisata/{pariwisata}/restore'
*/
restore.url = (args: { pariwisata: string | number } | [pariwisata: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pariwisata: args }
    }

    if (Array.isArray(args)) {
        args = {
            pariwisata: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pariwisata: args.pariwisata,
    }

    return restore.definition.url
            .replace('{pariwisata}', parsedArgs.pariwisata.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PariwisataController::restore
* @see app/Http/Controllers/PariwisataController.php:26
* @route '/pariwisata/{pariwisata}/restore'
*/
restore.patch = (args: { pariwisata: string | number } | [pariwisata: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: restore.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PariwisataController::restore
* @see app/Http/Controllers/PariwisataController.php:26
* @route '/pariwisata/{pariwisata}/restore'
*/
const restoreForm = (args: { pariwisata: string | number } | [pariwisata: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PariwisataController::restore
* @see app/Http/Controllers/PariwisataController.php:26
* @route '/pariwisata/{pariwisata}/restore'
*/
restoreForm.patch = (args: { pariwisata: string | number } | [pariwisata: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

restore.form = restoreForm

const PariwisataController = { index, destroy, restore }

export default PariwisataController