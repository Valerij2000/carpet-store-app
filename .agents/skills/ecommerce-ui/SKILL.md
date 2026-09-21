---
name: ecommerce-ui
description: Implement ecommerce functionality for CarpetStore including product cards, catalog filters, product pages, cart, favorites, checkout UI, quantity controls and responsive shopping interactions.
---

# Ecommerce UI Skill

## Product

Every product should use the shared Product type.

Never duplicate product object structures across components.

Product cards must support:

- image
- name
- dimensions
- manufacturer
- rating
- reviews
- current price
- old price
- sale badge
- new badge
- favorite action

## Product page

Product pages must use:

/product/[slug]

The page should contain:

- breadcrumbs
- gallery
- product information
- price
- dimensions
- quantity
- favorite action
- add-to-cart action
- characteristics
- description
- related products

## Cart

Current implementation uses localStorage.

Cart operations:

- add
- remove
- increment
- decrement
- clear
- calculate subtotal
- calculate total quantity

Do not reload the page for cart operations.

## Favorites

Favorites use localStorage.

Favorite actions must update the UI immediately.

Do not reload the page.

## Catalog

Catalog filters should update visible products without full page reload when implemented as client-side filtering.

Keep filtering logic separate from presentation.

## UX

Shopping interactions must feel immediate.

After:

- adding to cart
- removing from cart
- changing quantity
- adding/removing favorite

the UI should update immediately.

## Design

Follow the Bayan Sulu visual language.

Do not introduce unrelated colors, cards, typography or UI patterns.

Preserve:

- green brand colors
- red CTA
- white background
- rounded product UI
- large imagery
- spacious layout