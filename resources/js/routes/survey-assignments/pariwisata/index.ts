import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import takeSurvey34f39d from './take-survey'
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
export const takeSurvey = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: takeSurvey.url(args, options),
    method: 'get',
})

takeSurvey.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/pariwisata/take-survey',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takeSurvey.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: takeSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takeSurvey.head = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: takeSurvey.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
const takeSurveyForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: takeSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
*/
takeSurveyForm.get = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: takeSurvey.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::takeSurvey
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:219
* @route '/survey-assignments/{assignment}/pariwisata/take-survey'
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
export const show = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/pariwisata/{pariwisata}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
show.url = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{pariwisata}', parsedArgs.pariwisata.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
show.get = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
show.head = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
const showForm = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showForm.get = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::show
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:125
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
showForm.head = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
export const exportMethod = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportMethod.url = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return exportMethod.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{pariwisata}', parsedArgs.pariwisata.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportMethod.get = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportMethod.head = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
const exportMethodForm = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportMethodForm.get = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::exportMethod
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:133
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}/export'
*/
exportMethodForm.head = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
export const update = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}/pariwisata/{pariwisata}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
update.url = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{pariwisata}', parsedArgs.pariwisata.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
update.patch = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
const updateForm = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:143
* @route '/survey-assignments/{assignment}/pariwisata/{pariwisata}'
*/
updateForm.patch = (args: { assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, pariwisata: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const pariwisata = {
    takeSurvey: Object.assign(takeSurvey, takeSurvey34f39d),
    show: Object.assign(show, show),
    export: Object.assign(exportMethod, exportMethod),
    update: Object.assign(update, update),
}

export default pariwisata