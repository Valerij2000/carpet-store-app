---
name: nextjs-frontend
description: Build and refactor frontend features in the CarpetStore Next.js application using App Router, React, TypeScript and SCSS. Use when implementing pages, components, routing, client interactions, frontend state or UI architecture.
---

# Next.js Frontend Skill

## Before implementation

Inspect:

- package.json
- src/app
- src/components
- src/types
- src/data
- existing styles
- existing routing

Reuse existing architecture whenever possible.

Do not introduce a new architectural pattern without a reason.

## Server vs Client Components

Default to Server Components.

Use Client Components only for:

- event handlers
- browser APIs
- localStorage
- interactive state
- client-only libraries

Keep the client boundary as small as possible.

Prefer:

Server Component
  ↓
Client interactive component

over:

Client page
  ↓
everything client-side

## Routing

Use App Router conventions.

Dynamic product pages:

/product/[slug]

Catalog:

/catalog

Do not create duplicate routing systems.

## Components

A component should have one clear responsibility.

Prefer:

<ProductCard />

<ProductGrid />

<ProductSlider />

over one component containing all ecommerce UI.

## Data

Use typed mock data while backend is unavailable.

Do not put large datasets directly inside page components.

## Interactivity

Use React state for local UI state.

Use localStorage for temporary frontend persistence.

Do not introduce Redux unless requested.

## Forms

Use controlled inputs where state is required.

Validate user input before submitting.

Keep form components focused.

## Accessibility

Interactive elements must use:

- button for actions
- a for navigation
- labels for inputs
- meaningful aria-label where necessary
- keyboard-accessible interactions

Never use clickable divs for primary actions.

## Images

Use next/image.

Provide meaningful alt text.

Use responsive image dimensions.

## Implementation standard

Code must be production-quality.

Do not leave TODOs.

Do not leave placeholders such as:

// implement later

or:

// TODO

If a requested feature cannot be completed because a backend does not exist, implement the frontend state/mock boundary cleanly instead.

## Validation

After implementation:

npm run lint

Then:

npx tsc --noEmit

For significant changes:

npm run build