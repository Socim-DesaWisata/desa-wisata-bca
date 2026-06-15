import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/survey-assignments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::index
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:35
* @route '/survey-assignments'
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:42
* @route '/survey-assignments'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/survey-assignments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:42
* @route '/survey-assignments'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:42
* @route '/survey-assignments'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:42
* @route '/survey-assignments'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:42
* @route '/survey-assignments'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:51
* @route '/survey-assignments/{assignment}'
*/
export const destroy = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/survey-assignments/{assignment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:51
* @route '/survey-assignments/{assignment}'
*/
destroy.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return destroy.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:51
* @route '/survey-assignments/{assignment}'
*/
destroy.delete = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:51
* @route '/survey-assignments/{assignment}'
*/
const destroyForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:51
* @route '/survey-assignments/{assignment}'
*/
destroyForm.delete = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::restore
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:60
* @route '/survey-assignments/{assignment}/restore'
*/
export const restore = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: restore.url(args, options),
    method: 'patch',
})

restore.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}/restore',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::restore
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:60
* @route '/survey-assignments/{assignment}/restore'
*/
restore.url = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: args.assignment,
    }

    return restore.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::restore
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:60
* @route '/survey-assignments/{assignment}/restore'
*/
restore.patch = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: restore.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::restore
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:60
* @route '/survey-assignments/{assignment}/restore'
*/
const restoreForm = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::restore
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:60
* @route '/survey-assignments/{assignment}/restore'
*/
restoreForm.patch = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

restore.form = restoreForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
export const createUmkm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createUmkm.url(args, options),
    method: 'get',
})

createUmkm.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/create/umkm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkm.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return createUmkm.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createUmkm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkm.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createUmkm.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
const createUmkmForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createUmkm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkmForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createUmkm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:71
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkmForm.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createUmkm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

createUmkm.form = createUmkmForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
export const storeUmkm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUmkm.url(args, options),
    method: 'post',
})

storeUmkm.definition = {
    methods: ["post"],
    url: '/survey-assignments/{assignment}/create/umkm',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
storeUmkm.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return storeUmkm.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
storeUmkm.post = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUmkm.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
const storeUmkmForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeUmkm.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:78
* @route '/survey-assignments/{assignment}/create/umkm'
*/
storeUmkmForm.post = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeUmkm.url(args, options),
    method: 'post',
})

storeUmkm.form = storeUmkmForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
export const createPariwisata = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createPariwisata.url(args, options),
    method: 'get',
})

createPariwisata.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/create/pariwisata',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisata.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return createPariwisata.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisata.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisata.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createPariwisata.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
const createPariwisataForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisataForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:90
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisataForm.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createPariwisata.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

createPariwisata.form = createPariwisataForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
export const storePariwisata = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePariwisata.url(args, options),
    method: 'post',
})

storePariwisata.definition = {
    methods: ["post"],
    url: '/survey-assignments/{assignment}/create/pariwisata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
storePariwisata.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return storePariwisata.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
storePariwisata.post = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePariwisata.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
const storePariwisataForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePariwisata.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:97
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
storePariwisataForm.post = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePariwisata.url(args, options),
    method: 'post',
})

storePariwisata.form = storePariwisataForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
export const takePariwisataSurvey = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: takePariwisataSurvey.url(args, options),
    method: 'get',
})

takePariwisataSurvey.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/pariwisata/take-survey',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takePariwisataSurvey.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return takePariwisataSurvey.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takePariwisataSurvey.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: takePariwisataSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takePariwisataSurvey.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: takePariwisataSurvey.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
const takePariwisataSurveyForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: takePariwisataSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takePariwisataSurveyForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: takePariwisataSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takePariwisataSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takePariwisataSurveyForm.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: takePariwisataSurvey.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

takePariwisataSurvey.form = takePariwisataSurveyForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisataSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
export const storePariwisataSurveyDraft = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePariwisataSurveyDraft.url(args, options),
    method: 'post',
})

storePariwisataSurveyDraft.definition = {
    methods: ["post"],
    url: '/survey-assignments/{assignment}/pariwisata/take-survey',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisataSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
storePariwisataSurveyDraft.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return storePariwisataSurveyDraft.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisataSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
storePariwisataSurveyDraft.post = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePariwisataSurveyDraft.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisataSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
const storePariwisataSurveyDraftForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePariwisataSurveyDraft.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storePariwisataSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
storePariwisataSurveyDraftForm.post = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePariwisataSurveyDraft.url(args, options),
    method: 'post',
})

storePariwisataSurveyDraft.form = storePariwisataSurveyDraftForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyPariwisataSurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
export const destroyPariwisataSurveyDocument = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPariwisataSurveyDocument.url(args, options),
    method: 'delete',
})

destroyPariwisataSurveyDocument.definition = {
    methods: ["delete"],
    url: '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyPariwisataSurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroyPariwisataSurveyDocument.url = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
            document: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
        document: typeof args.document === 'object'
        ? args.document.id
        : args.document,
    }

    return destroyPariwisataSurveyDocument.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyPariwisataSurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroyPariwisataSurveyDocument.delete = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPariwisataSurveyDocument.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyPariwisataSurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
const destroyPariwisataSurveyDocumentForm = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyPariwisataSurveyDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyPariwisataSurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:236
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroyPariwisataSurveyDocumentForm.delete = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyPariwisataSurveyDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyPariwisataSurveyDocument.form = destroyPariwisataSurveyDocumentForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
export const showPariwisata = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPariwisata.url(args, options),
    method: 'get',
})

showPariwisata.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/pariwisata/{pariwisata}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showPariwisata.url = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
            pariwisata: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
        pariwisata: typeof args.pariwisata === 'object'
        ? args.pariwisata.id
        : args.pariwisata,
    }

    return showPariwisata.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{pariwisata}', parsedArgs.pariwisata.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showPariwisata.get = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showPariwisata.head = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showPariwisata.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
const showPariwisataForm = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showPariwisataForm.get = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showPariwisataForm.head = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showPariwisata.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showPariwisata.form = showPariwisataForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
export const exportPariwisata = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPariwisata.url(args, options),
    method: 'get',
})

exportPariwisata.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportPariwisata.url = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
            pariwisata: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
        pariwisata: typeof args.pariwisata === 'object'
        ? args.pariwisata.id
        : args.pariwisata,
    }

    return exportPariwisata.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{pariwisata}', parsedArgs.pariwisata.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportPariwisata.get = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportPariwisata.head = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPariwisata.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
const exportPariwisataForm = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportPariwisataForm.get = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportPariwisataForm.head = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportPariwisata.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportPariwisata.form = exportPariwisataForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updatePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
export const updatePariwisata = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePariwisata.url(args, options),
    method: 'patch',
})

updatePariwisata.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}/pariwisata/{pariwisata}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updatePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
updatePariwisata.url = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
            pariwisata: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
        pariwisata: typeof args.pariwisata === 'object'
        ? args.pariwisata.id
        : args.pariwisata,
    }

    return updatePariwisata.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{pariwisata}', parsedArgs.pariwisata.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updatePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
updatePariwisata.patch = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePariwisata.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updatePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
const updatePariwisataForm = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePariwisata.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updatePariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
updatePariwisataForm.patch = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePariwisata.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatePariwisata.form = updatePariwisataForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
export const showUmkm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showUmkm.url(args, options),
    method: 'get',
})

showUmkm.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showUmkm.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
            umkm: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
        umkm: typeof args.umkm === 'object'
        ? args.umkm.id
        : args.umkm,
    }

    return showUmkm.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showUmkm.get = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showUmkm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showUmkm.head = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showUmkm.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
const showUmkmForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showUmkm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showUmkmForm.get = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showUmkm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::showUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showUmkmForm.head = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showUmkm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showUmkm.form = showUmkmForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
export const updateUmkm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateUmkm.url(args, options),
    method: 'patch',
})

updateUmkm.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
updateUmkm.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
            umkm: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
        umkm: typeof args.umkm === 'object'
        ? args.umkm.id
        : args.umkm,
    }

    return updateUmkm.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
updateUmkm.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateUmkm.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
const updateUmkmForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateUmkm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
updateUmkmForm.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateUmkm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateUmkm.form = updateUmkmForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmSurveyAnswer
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
export const updateUmkmSurveyAnswer = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateUmkmSurveyAnswer.url(args, options),
    method: 'patch',
})

updateUmkmSurveyAnswer.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmSurveyAnswer
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
updateUmkmSurveyAnswer.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
            umkm: args[1],
            answer: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
        umkm: typeof args.umkm === 'object'
        ? args.umkm.id
        : args.umkm,
        answer: typeof args.answer === 'object'
        ? args.answer.id
        : args.answer,
    }

    return updateUmkmSurveyAnswer.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace('{answer}', parsedArgs.answer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmSurveyAnswer
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
updateUmkmSurveyAnswer.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateUmkmSurveyAnswer.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmSurveyAnswer
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
const updateUmkmSurveyAnswerForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateUmkmSurveyAnswer.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmSurveyAnswer
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
updateUmkmSurveyAnswerForm.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateUmkmSurveyAnswer.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateUmkmSurveyAnswer.form = updateUmkmSurveyAnswerForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
export const storeUmkmDocument = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUmkmDocument.url(args, options),
    method: 'post',
})

storeUmkmDocument.definition = {
    methods: ["post"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
storeUmkmDocument.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
            umkm: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
        umkm: typeof args.umkm === 'object'
        ? args.umkm.id
        : args.umkm,
    }

    return storeUmkmDocument.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
storeUmkmDocument.post = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUmkmDocument.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
const storeUmkmDocumentForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeUmkmDocument.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:185
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
storeUmkmDocumentForm.post = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeUmkmDocument.url(args, options),
    method: 'post',
})

storeUmkmDocument.form = storeUmkmDocumentForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
export const updateUmkmDocument = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateUmkmDocument.url(args, options),
    method: 'patch',
})

updateUmkmDocument.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
updateUmkmDocument.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
            umkm: args[1],
            document: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
        umkm: typeof args.umkm === 'object'
        ? args.umkm.id
        : args.umkm,
        document: typeof args.document === 'object'
        ? args.document.id
        : args.document,
    }

    return updateUmkmDocument.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
updateUmkmDocument.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateUmkmDocument.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
const updateUmkmDocumentForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateUmkmDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:196
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
updateUmkmDocumentForm.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateUmkmDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateUmkmDocument.form = updateUmkmDocumentForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
export const destroyUmkmDocument = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyUmkmDocument.url(args, options),
    method: 'delete',
})

destroyUmkmDocument.definition = {
    methods: ["delete"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroyUmkmDocument.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
            umkm: args[1],
            document: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
        umkm: typeof args.umkm === 'object'
        ? args.umkm.id
        : args.umkm,
        document: typeof args.document === 'object'
        ? args.document.id
        : args.document,
    }

    return destroyUmkmDocument.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroyUmkmDocument.delete = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyUmkmDocument.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
const destroyUmkmDocumentForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyUmkmDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroyUmkmDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:208
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroyUmkmDocumentForm.delete = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyUmkmDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyUmkmDocument.form = destroyUmkmDocumentForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
export const exportMethod = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
exportMethod.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return exportMethod.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
exportMethod.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
exportMethod.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
const exportMethodForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
exportMethodForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:116
* @route '/survey-assignments/{assignment}/export'
*/
exportMethodForm.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateVillageAnnualData
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
export const updateVillageAnnualData = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateVillageAnnualData.url(args, options),
    method: 'patch',
})

updateVillageAnnualData.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}/village-annual-data',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateVillageAnnualData
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
updateVillageAnnualData.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return updateVillageAnnualData.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateVillageAnnualData
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
updateVillageAnnualData.patch = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateVillageAnnualData.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateVillageAnnualData
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
const updateVillageAnnualDataForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateVillageAnnualData.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::updateVillageAnnualData
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:256
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
updateVillageAnnualDataForm.patch = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateVillageAnnualData.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateVillageAnnualData.form = updateVillageAnnualDataForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
export const show = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
show.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return show.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
show.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
show.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
const showForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
showForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:109
* @route '/survey-assignments/{assignment}'
*/
showForm.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:246
* @route '/survey-assignments/{assignment}'
*/
export const update = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:246
* @route '/survey-assignments/{assignment}'
*/
update.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return update.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:246
* @route '/survey-assignments/{assignment}'
*/
update.patch = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:246
* @route '/survey-assignments/{assignment}'
*/
const updateForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:246
* @route '/survey-assignments/{assignment}'
*/
updateForm.patch = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
export const takeSurvey = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: takeSurvey.url(args, options),
    method: 'get',
})

takeSurvey.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/take-survey',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurvey.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return takeSurvey.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurvey.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: takeSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurvey.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: takeSurvey.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
const takeSurveyForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: takeSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurveyForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: takeSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurveyForm.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: takeSurvey.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

takeSurvey.form = takeSurveyForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
export const storeSurveyDraft = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSurveyDraft.url(args, options),
    method: 'post',
})

storeSurveyDraft.definition = {
    methods: ["post"],
    url: '/survey-assignments/{assignment}/take-survey',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
storeSurveyDraft.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { assignment: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
    }

    return storeSurveyDraft.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
storeSurveyDraft.post = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSurveyDraft.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
const storeSurveyDraftForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeSurveyDraft.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::storeSurveyDraft
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:273
* @route '/survey-assignments/{assignment}/take-survey'
*/
storeSurveyDraftForm.post = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeSurveyDraft.url(args, options),
    method: 'post',
})

storeSurveyDraft.form = storeSurveyDraftForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroySurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
export const destroySurveyDocument = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySurveyDocument.url(args, options),
    method: 'delete',
})

destroySurveyDocument.definition = {
    methods: ["delete"],
    url: '/survey-assignments/{assignment}/take-survey/documents/{document}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroySurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
destroySurveyDocument.url = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
            document: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: typeof args.assignment === 'object'
        ? args.assignment.code
        : args.assignment,
        document: typeof args.document === 'object'
        ? args.document.id
        : args.document,
    }

    return destroySurveyDocument.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroySurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
destroySurveyDocument.delete = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySurveyDocument.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroySurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
const destroySurveyDocumentForm = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroySurveyDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroySurveyDocument
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:283
* @route '/survey-assignments/{assignment}/take-survey/documents/{document}'
*/
destroySurveyDocumentForm.delete = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroySurveyDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroySurveyDocument.form = destroySurveyDocumentForm

const VillageSurveyAssignmentController = { index, store, destroy, restore, createUmkm, storeUmkm, createPariwisata, storePariwisata, takePariwisataSurvey, storePariwisataSurveyDraft, destroyPariwisataSurveyDocument, showPariwisata, exportPariwisata, updatePariwisata, showUmkm, updateUmkm, updateUmkmSurveyAnswer, storeUmkmDocument, updateUmkmDocument, destroyUmkmDocument, exportMethod, updateVillageAnnualData, show, update, takeSurvey, storeSurveyDraft, destroySurveyDocument, export: exportMethod }

export default VillageSurveyAssignmentController