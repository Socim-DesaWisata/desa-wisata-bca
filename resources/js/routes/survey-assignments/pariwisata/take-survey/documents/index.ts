import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
export const destroy = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroy.url = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroy.delete = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::destroy
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
const destroyForm = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:266
* @route '/survey-assignments/{assignment}/pariwisata/take-survey/documents/{document}'
*/
destroyForm.delete = (args: { assignment: string | number | { code: string | number }, document: string | number | { id: string | number } } | [assignment: string | number | { code: string | number }, document: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
    destroy: Object.assign(destroy, destroy),
}

export default documents