# CarpetStore — Codex Project Rules

## Project

This is a frontend-only ecommerce project for CarpetStore.

Current stack:

- Next.js 14
- React 18
- TypeScript
- App Router
- SCSS
- CSS Modules where appropriate
- Next/Image
- ESLint
- npm

Backend is NOT implemented yet.

Do not introduce backend code, API servers, databases, Redis, authentication servers, or payment integrations unless explicitly requested.

## Architecture

Use Next.js App Router.

Prefer Server Components by default.

Use `"use client"` only when client-side interactivity is actually required.

Keep components small and focused.

Do not create giant page components.

Pages belong in:

src/app/

Reusable UI belongs in:

src/components/

Static mock data belongs in:

src/data/

Types belong in:

src/types/

Reusable hooks belong in:

src/hooks/

Pure utility functions belong in:

src/lib/

Styles belong close to their component or in:

src/styles/

## Routing

Use semantic ecommerce URLs.

Examples:

/catalog
/product/[slug]
/cart
/favorites
/checkout
/account
/contacts

Do not use query-string IDs for product pages when a slug route is appropriate.

## Components

Prefer composition over large components.

Examples:

Header
Navigation
Hero
ProductCard
ProductGrid
ProductSlider
ProductGallery
CartItem
CartSummary
Footer

Do not duplicate identical markup.

If the same UI appears more than once, consider extracting a component.

## TypeScript

Use strict TypeScript.

Do not use `any` unless there is a documented technical reason.

Define domain types explicitly.

Prefer:

type Product = {...}

over untyped objects.

## React

Use functional components.

Use const for functions.

Event handlers must use the `handle` prefix.

Examples:

const handleAddToCart = () => {}

const handleSubmit = () => {}

Avoid unnecessary useEffect.

Do not use useEffect for values that can be derived during render.

## Styling

The existing Bayan Sulu design must be preserved.

Do not redesign the UI unless explicitly requested.

Prefer SCSS for the current implementation because the source design was created with SCSS.

Keep styles component-scoped where practical.

Do not introduce Tailwind unless explicitly requested.

Do not introduce a UI framework unless explicitly requested.

## Images

Use next/image for product and content images.

Do not use plain <img> unless there is a specific reason.

All product images must have meaningful alt text.

## Data

The application currently uses mock frontend data.

Do not hardcode repeated product markup.

Use typed data structures in src/data/.

Backend integration will be added later.

Design components so replacing mock data with API data does not require rewriting the UI.

## State

For the current frontend-only version:

- React state for local UI state
- localStorage for cart/favorites persistence

Do not add Redux unless global application state actually requires it.

Do not add a state-management library without explicit justification.

## SEO

SEO is important.

Do not turn catalog/product pages into client-only pages unnecessarily.

Keep important product/category content available to Next.js server rendering.

Use semantic HTML.

Use proper:

- title
- description
- h1
- h2
- canonical URLs where appropriate
- image alt text

Do not add noindex to catalog/product pages.

Cart, checkout, account and other private/non-search pages may be configured appropriately later.

## Performance

Avoid unnecessary client components.

Avoid unnecessary JavaScript.

Use next/image.

Lazy-load content that is not immediately visible when appropriate.

Do not add libraries for functionality that can reasonably be implemented with existing platform capabilities.

## Code Style

No semicolons.

Use single quotes.

Prefer early returns.

Prefer readable code over clever abstractions.

Avoid premature optimization.

Avoid unnecessary comments.

Comments should explain WHY, not WHAT.

## Dependencies

Do not install a new dependency unless:

1. it solves a real problem
2. the existing stack cannot reasonably solve it
3. it is justified in the implementation

Prefer native Next.js/React functionality.

## Validation

After meaningful changes:

1. run ESLint
2. run TypeScript validation
3. run the production build when appropriate

Do not claim that code works without validation.

## Existing Design

The implementation must follow the supplied Bayan Sulu reference design.

Important visual characteristics:

- white header
- green hero section
- red CTA
- product cards
- rounded product labels
- product sliders
- green/dark-green brand palette
- large product photography
- clean ecommerce layout
- responsive mobile layout

Do not replace the design with a generic ecommerce template.

## Working Method

Before making significant changes:

1. inspect the existing project
2. identify affected files
3. understand existing patterns
4. make the smallest coherent change
5. validate the result

Do not rewrite unrelated code.

Do not create duplicate components when an existing component can be extended.

## Backend Boundary

The current task is frontend only.

Do not create:

- NestJS
- PHP
- PostgreSQL
- Redis
- Docker services for backend
- payment providers
- real authentication
- real order processing

unless explicitly requested.

The frontend should nevertheless be structured so these systems can be connected later.