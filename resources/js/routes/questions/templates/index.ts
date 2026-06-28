import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
export const update = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/questions/templates/{template}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
update.url = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { template: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { template: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        template: typeof args.template === 'object'
        ? args.template.id
        : args.template,
    }

    return update.definition.url
            .replace('{template}', parsedArgs.template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
update.patch = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
const updateForm = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
updateForm.patch = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const templates = {
    update: Object.assign(update, update),
}

export default templates