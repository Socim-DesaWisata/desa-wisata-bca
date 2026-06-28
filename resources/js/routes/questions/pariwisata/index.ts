import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
export const update = (args: { question: string | number | { id: string | number } } | [question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/questions/pariwisata/{question}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
update.url = (args: { question: string | number | { id: string | number } } | [question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { question: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { question: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            question: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        question: typeof args.question === 'object'
        ? args.question.id
        : args.question,
    }

    return update.definition.url
            .replace('{question}', parsedArgs.question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
update.patch = (args: { question: string | number | { id: string | number } } | [question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
const updateForm = (args: { question: string | number | { id: string | number } } | [question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
updateForm.patch = (args: { question: string | number | { id: string | number } } | [question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
    update: Object.assign(update, update),
}

export default pariwisata