---
name: seo
description: Optimize CarpetStore Next.js pages for Google and Yandex SEO, especially product, category and ecommerce landing pages.
---

# SEO Skill

## Core principle

Important ecommerce content must be available to search engines through server-rendered Next.js HTML whenever possible.

## Product pages

Every product page should have:

- unique title
- unique description
- canonical URL
- H1
- meaningful product description
- product characteristics
- image alt text

## Category pages

Category pages should have:

- unique title
- description
- H1
- useful category content
- crawlable product links

## URLs

Prefer stable semantic URLs.

Examples:

/catalog
/catalog/carpets
/catalog/runners
/product/venetta-blue

Avoid unnecessary query parameters for canonical product URLs.

## Metadata

Use Next.js Metadata API.

Do not hardcode identical metadata across all products.

## Structured data

When implementing structured data, prefer Schema.org:

- Product
- Offer
- BreadcrumbList
- Organization
- WebSite

Do not add structured data that does not match visible page content.

## Rendering

Do not convert SEO-critical pages to Client Components without a clear reason.

Interactive elements may remain client-side.

## Images

Use meaningful alt text.

Do not use:

"image"
"photo"
"product"

as the only alt text.

## Migration

Preserve existing URLs whenever possible.

If a URL changes, document the old → new mapping so the backend/server layer can later implement permanent redirects.