import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import createUmkmE4c111 from './create-umkm'
import createPariwisata40b8f1 from './create-pariwisata'
import pariwisata from './pariwisata'
import umkm from './umkm'
import villageAnnualData from './village-annual-data'
import takeSurvey34f39d from './take-survey'
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:47
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:47
* @route '/survey-assignments'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:47
* @route '/survey-assignments'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:47
* @route '/survey-assignments'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:47
* @route '/survey-assignments'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:56
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:56
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:56
* @route '/survey-assignments/{assignment}'
*/
destroy.delete = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:56
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:56
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:65
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:65
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:65
* @route '/survey-assignments/{assignment}/restore'
*/
restore.patch = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: restore.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::restore
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:65
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:65
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:76
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:76
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:76
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createUmkm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:76
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkm.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createUmkm.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:76
* @route '/survey-assignments/{assignment}/create/umkm'
*/
const createUmkmForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createUmkm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:76
* @route '/survey-assignments/{assignment}/create/umkm'
*/
createUmkmForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createUmkm.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createUmkm
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:76
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:95
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:95
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:95
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisata.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:95
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisata.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createPariwisata.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:95
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
const createPariwisataForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:95
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
createPariwisataForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createPariwisata.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::createPariwisata
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:95
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:127
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:127
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:127
* @route '/survey-assignments/{assignment}/export'
*/
exportMethod.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:127
* @route '/survey-assignments/{assignment}/export'
*/
exportMethod.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:127
* @route '/survey-assignments/{assignment}/export'
*/
const exportMethodForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:127
* @route '/survey-assignments/{assignment}/export'
*/
exportMethodForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:127
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:114
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:114
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:114
* @route '/survey-assignments/{assignment}'
*/
show.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:114
* @route '/survey-assignments/{assignment}'
*/
show.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:114
* @route '/survey-assignments/{assignment}'
*/
const showForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:114
* @route '/survey-assignments/{assignment}'
*/
showForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:114
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:276
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:276
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:276
* @route '/survey-assignments/{assignment}'
*/
update.patch = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:276
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:276
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:296
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:296
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:296
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurvey.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: takeSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:296
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurvey.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: takeSurvey.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:296
* @route '/survey-assignments/{assignment}/take-survey'
*/
const takeSurveyForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: takeSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:296
* @route '/survey-assignments/{assignment}/take-survey'
*/
takeSurveyForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: takeSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:296
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

const surveyAssignments = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
    restore: Object.assign(restore, restore),
    createUmkm: Object.assign(createUmkm, createUmkmE4c111),
    createPariwisata: Object.assign(createPariwisata, createPariwisata40b8f1),
    pariwisata: Object.assign(pariwisata, pariwisata),
    umkm: Object.assign(umkm, umkm),
    export: Object.assign(exportMethod, exportMethod),
    villageAnnualData: Object.assign(villageAnnualData, villageAnnualData),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    takeSurvey: Object.assign(takeSurvey, takeSurvey34f39d),
}

export default surveyAssignments