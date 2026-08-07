import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import templates from './templates'
import umkm from './umkm'
import pariwisata from './pariwisata'
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
export const exportMethod = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/questions/{template}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethod.url = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return exportMethod.definition.url
            .replace('{template}', parsedArgs.template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethod.get = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethod.head = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
const exportMethodForm = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethodForm.get = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethodForm.head = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
export const show = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/questions/{template}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
show.url = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{template}', parsedArgs.template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
show.get = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
show.head = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
const showForm = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
showForm.get = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
showForm.head = (args: { template: string | number | { id: string | number } } | [template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
export const update = (args: { question: string | number | { id: string | number } } | [question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/questions/{question}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
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
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
update.patch = (args: { question: string | number | { id: string | number } } | [question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
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
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
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

const questions = {
    templates: Object.assign(templates, templates),
    export: Object.assign(exportMethod, exportMethod),
    show: Object.assign(show, show),
    umkm: Object.assign(umkm, umkm),
    pariwisata: Object.assign(pariwisata, pariwisata),
    update: Object.assign(update, update),
}

export default questions