import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/villages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::index
* @see app/Http/Controllers/TourismVillageController.php:18
* @route '/villages'
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
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/villages/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::exportMethod
* @see app/Http/Controllers/TourismVillageController.php:23
* @route '/villages/export'
*/
exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:30
* @route '/villages'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/villages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:30
* @route '/villages'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:30
* @route '/villages'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:30
* @route '/villages'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TourismVillageController::store
* @see app/Http/Controllers/TourismVillageController.php:30
* @route '/villages'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
* @route '/villages/{village}'
*/
export const show = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/villages/{village}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
* @route '/villages/{village}'
*/
show.url = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { village: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { village: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            village: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        village: typeof args.village === 'object'
        ? args.village.id
        : args.village,
    }

    return show.definition.url
            .replace('{village}', parsedArgs.village.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
* @route '/villages/{village}'
*/
show.get = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
* @route '/villages/{village}'
*/
show.head = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
* @route '/villages/{village}'
*/
const showForm = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
* @route '/villages/{village}'
*/
showForm.get = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::show
* @see app/Http/Controllers/TourismVillageController.php:37
* @route '/villages/{village}'
*/
showForm.head = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:42
* @route '/villages/{village}/edit'
*/
export const edit = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/villages/{village}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:42
* @route '/villages/{village}/edit'
*/
edit.url = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { village: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { village: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            village: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        village: typeof args.village === 'object'
        ? args.village.id
        : args.village,
    }

    return edit.definition.url
            .replace('{village}', parsedArgs.village.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:42
* @route '/villages/{village}/edit'
*/
edit.get = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:42
* @route '/villages/{village}/edit'
*/
edit.head = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:42
* @route '/villages/{village}/edit'
*/
const editForm = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:42
* @route '/villages/{village}/edit'
*/
editForm.get = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TourismVillageController::edit
* @see app/Http/Controllers/TourismVillageController.php:42
* @route '/villages/{village}/edit'
*/
editForm.head = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\TourismVillageController::update
* @see app/Http/Controllers/TourismVillageController.php:47
* @route '/villages/{village}'
*/
export const update = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/villages/{village}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\TourismVillageController::update
* @see app/Http/Controllers/TourismVillageController.php:47
* @route '/villages/{village}'
*/
update.url = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { village: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { village: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            village: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        village: typeof args.village === 'object'
        ? args.village.id
        : args.village,
    }

    return update.definition.url
            .replace('{village}', parsedArgs.village.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismVillageController::update
* @see app/Http/Controllers/TourismVillageController.php:47
* @route '/villages/{village}'
*/
update.patch = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TourismVillageController::update
* @see app/Http/Controllers/TourismVillageController.php:47
* @route '/villages/{village}'
*/
const updateForm = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TourismVillageController::update
* @see app/Http/Controllers/TourismVillageController.php:47
* @route '/villages/{village}'
*/
updateForm.patch = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\TourismVillageController::destroy
* @see app/Http/Controllers/TourismVillageController.php:57
* @route '/villages/{village}'
*/
export const destroy = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/villages/{village}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TourismVillageController::destroy
* @see app/Http/Controllers/TourismVillageController.php:57
* @route '/villages/{village}'
*/
destroy.url = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { village: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { village: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            village: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        village: typeof args.village === 'object'
        ? args.village.id
        : args.village,
    }

    return destroy.definition.url
            .replace('{village}', parsedArgs.village.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismVillageController::destroy
* @see app/Http/Controllers/TourismVillageController.php:57
* @route '/villages/{village}'
*/
destroy.delete = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TourismVillageController::destroy
* @see app/Http/Controllers/TourismVillageController.php:57
* @route '/villages/{village}'
*/
const destroyForm = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TourismVillageController::destroy
* @see app/Http/Controllers/TourismVillageController.php:57
* @route '/villages/{village}'
*/
destroyForm.delete = (args: { village: string | number | { id: string | number } } | [village: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TourismVillageController::restore
* @see app/Http/Controllers/TourismVillageController.php:66
* @route '/villages/{village}/restore'
*/
export const restore = (args: { village: string | number } | [village: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: restore.url(args, options),
    method: 'patch',
})

restore.definition = {
    methods: ["patch"],
    url: '/villages/{village}/restore',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\TourismVillageController::restore
* @see app/Http/Controllers/TourismVillageController.php:66
* @route '/villages/{village}/restore'
*/
restore.url = (args: { village: string | number } | [village: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { village: args }
    }

    if (Array.isArray(args)) {
        args = {
            village: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        village: args.village,
    }

    return restore.definition.url
            .replace('{village}', parsedArgs.village.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismVillageController::restore
* @see app/Http/Controllers/TourismVillageController.php:66
* @route '/villages/{village}/restore'
*/
restore.patch = (args: { village: string | number } | [village: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: restore.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TourismVillageController::restore
* @see app/Http/Controllers/TourismVillageController.php:66
* @route '/villages/{village}/restore'
*/
const restoreForm = (args: { village: string | number } | [village: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TourismVillageController::restore
* @see app/Http/Controllers/TourismVillageController.php:66
* @route '/villages/{village}/restore'
*/
restoreForm.patch = (args: { village: string | number } | [village: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

restore.form = restoreForm

const TourismVillageController = { index, exportMethod, store, show, edit, update, destroy, restore, export: exportMethod }

export default TourismVillageController