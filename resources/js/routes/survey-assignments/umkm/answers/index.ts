import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
export const update = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
update.url = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{umkm}', parsedArgs.umkm.toString())
            .replace('{answer}', parsedArgs.answer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
update.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::update
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
const updateForm = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:173
* @route '/survey-assignments/{assignment}/umkm/{umkm}/answers/{answer}'
*/
updateForm.patch = (args: { assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, umkm: string | number | { id: string | number }, answer: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const answers = {
    update: Object.assign(update, update),
}

export default answers