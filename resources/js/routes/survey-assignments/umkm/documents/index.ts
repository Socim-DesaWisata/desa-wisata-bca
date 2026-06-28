import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:215
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
export const store = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:215
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
store.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:215
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
store.post = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:215
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
const storeForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:215
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents'
*/
storeForm.post = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
export const update = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
update.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
update.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
const updateForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:226
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
updateForm.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:238
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
export const destroy = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:238
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroy.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:238
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroy.delete = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:238
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
const destroyForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:238
* @route '/survey-assignments/{assignment}/umkm/{umkm}/documents/{document}'
*/
destroyForm.delete = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const documents = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default documents