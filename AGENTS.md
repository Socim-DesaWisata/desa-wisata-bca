# Repository Guidelines

## Project Structure & Module Organization

This repository is a Laravel 13 application with Inertia React.

- `app/` contains Laravel models, controllers, services, requests, and application logic.
- `routes/web.php` defines web routes used by Inertia pages and Wayfinder.
- `resources/js/` contains React TypeScript pages, layouts, components, generated `actions/`, and generated `routes/`.
- `resources/css/app.css` contains global Tailwind/CSS styling.
- `database/migrations/`, `database/seeders/`, and `database/factories/` contain database schema and seed data.
- `tests/Feature` and `tests/Unit` contain Pest tests.
- `public/` stores built frontend assets and public files.

## Build, Test, and Development Commands

- `composer run dev` starts Laravel server, queue listener, and Vite together.
- `npm run dev` starts only Vite for frontend development.
- `npm run build` builds production frontend assets.
- `npm run types:check` runs TypeScript checks without emitting files.
- `npm run lint:check` checks ESLint rules.
- `npm run format:check` checks Prettier formatting for `resources/`.
- `composer test` clears config, checks Pint, then runs Laravel tests.
- `php artisan test` runs the test suite directly.
- `php artisan wayfinder:generate --with-form --no-interaction` regenerates typed frontend route/action helpers after route changes.

## Coding Style & Naming Conventions

Use Laravel conventions for PHP classes: controllers in `App\Http\Controllers`, form requests in `App\Http\Requests`, services in `App\Services`, and models in `App\Models`. Keep controllers thin and place query/business logic in services.

Format PHP with Pint: `vendor/bin/pint`. Format frontend files with Prettier: `npm run format`. Use TypeScript for React pages. Components use PascalCase, hooks use `use*`, and page files live under `resources/js/pages` using lowercase route-style folders.

## Testing Guidelines

Tests use Pest with Laravel. Add feature tests for routes, controllers, services, and user-facing workflows. Name tests by behavior, for example:

```php
it('creates a user from the admin page');
```

Run `composer test` before submitting broad backend changes. Run `npm run types:check` and `npm run build` for frontend or Inertia changes.

## Commit & Pull Request Guidelines

Recent commits are short and direct, for example `migration model` and `layout oke`. Prefer concise imperative messages such as `add user service` or `fix sidebar routes`.

Pull requests should include a short summary, affected pages/routes, migration or seeder notes, verification commands, and screenshots for UI changes. Link related issues when available.

## Security & Configuration Tips

Do not commit `.env` secrets. Use form requests for validation, policies/gates where authorization is needed, and Wayfinder helpers instead of hardcoded frontend URLs when calling Laravel routes.
