import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:286
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
export const update = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}/village-annual-data',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:286
* @route '/survey-assignments/{assignment}/village-annual-data'
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:286
* @route '/survey-assignments/{assignment}/village-annual-data'
*/
update.patch = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:286
* @route '/survey-assignments/{assignment}/village-annual-data'
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:286
* @route '/survey-assignments/{assignment}/village-annual-data'
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

const villageAnnualData = {
    update: Object.assign(update, update),
}

export default villageAnnualData