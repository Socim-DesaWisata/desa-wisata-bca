import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:102
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
export const store = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/survey-assignments/{assignment}/create/pariwisata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:102
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
store.url = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:102
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
store.post = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:102
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
const storeForm = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VillageSurveyAssignmentController::store
* @see app/Http/Controllers/VillageSurveyAssignmentController.php:102
* @route '/survey-assignments/{assignment}/create/pariwisata'
*/
storeForm.post = (args: { assignment: string | number | { code: string | number } } | [assignment: string | number | { code: string | number } ] | string | number | { code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const createPariwisata = {
    store: Object.assign(store, store),
}

export default createPariwisata