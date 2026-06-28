import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\UmkmController::destroy
* @see app/Http/Controllers/UmkmController.php:19
* @route '/umkm/{umkm}'
*/
export const destroy = (args: { umkm: string | number | { id: string | number } } | [umkm: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/umkm/{umkm}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UmkmController::destroy
* @see app/Http/Controllers/UmkmController.php:19
* @route '/umkm/{umkm}'
*/
destroy.url = (args: { umkm: string | number | { id: string | number } } | [umkm: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { umkm: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { umkm: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            umkm: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        umkm: typeof args.umkm === 'object'
        ? args.umkm.id
        : args.umkm,
    }

    return destroy.definition.url
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UmkmController::destroy
* @see app/Http/Controllers/UmkmController.php:19
* @route '/umkm/{umkm}'
*/
destroy.delete = (args: { umkm: string | number | { id: string | number } } | [umkm: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UmkmController::destroy
* @see app/Http/Controllers/UmkmController.php:19
* @route '/umkm/{umkm}'
*/
const destroyForm = (args: { umkm: string | number | { id: string | number } } | [umkm: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UmkmController::destroy
* @see app/Http/Controllers/UmkmController.php:19
* @route '/umkm/{umkm}'
*/
destroyForm.delete = (args: { umkm: string | number | { id: string | number } } | [umkm: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\UmkmController::restore
* @see app/Http/Controllers/UmkmController.php:26
* @route '/umkm/{umkm}/restore'
*/
export const restore = (args: { umkm: string | number } | [umkm: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: restore.url(args, options),
    method: 'patch',
})

restore.definition = {
    methods: ["patch"],
    url: '/umkm/{umkm}/restore',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\UmkmController::restore
* @see app/Http/Controllers/UmkmController.php:26
* @route '/umkm/{umkm}/restore'
*/
restore.url = (args: { umkm: string | number } | [umkm: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { umkm: args }
    }

    if (Array.isArray(args)) {
        args = {
            umkm: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        umkm: args.umkm,
    }

    return restore.definition.url
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UmkmController::restore
* @see app/Http/Controllers/UmkmController.php:26
* @route '/umkm/{umkm}/restore'
*/
restore.patch = (args: { umkm: string | number } | [umkm: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: restore.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\UmkmController::restore
* @see app/Http/Controllers/UmkmController.php:26
* @route '/umkm/{umkm}/restore'
*/
const restoreForm = (args: { umkm: string | number } | [umkm: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UmkmController::restore
* @see app/Http/Controllers/UmkmController.php:26
* @route '/umkm/{umkm}/restore'
*/
restoreForm.patch = (args: { umkm: string | number } | [umkm: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

restore.form = restoreForm

const umkm = {
    destroy: Object.assign(destroy, destroy),
    restore: Object.assign(restore, restore),
}

export default umkm