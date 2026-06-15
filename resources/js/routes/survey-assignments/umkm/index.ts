import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import answers from './answers'
import documents from './documents'
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
export const show = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
show.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
show.get = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
show.head = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
const showForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showForm.get = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:154
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
showForm.head = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
export const update = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
update.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
update.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
const updateForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:162
* @route '/survey-assignments/{assignment}/umkm/{umkm}'
*/
updateForm.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const umkm = {
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    answers: Object.assign(answers, answers),
    documents: Object.assign(documents, documents),
}

export default umkm