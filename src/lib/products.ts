import productFeed from '@/data/vk_products.json'

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  size?: string
  country?: string
  material?: string
  manufacturer?: string
  price: number
  oldPrice: number | null
  currency: string
  image: string
  tag: string
  category?: string
  vkLink?: string
  inStock?: boolean
}

type ProductFeedItem = {
  id?: unknown
  title?: unknown
  slug?: unknown
  description?: unknown
  price?: unknown
  oldPrice?: unknown
  currency?: unknown
  image?: unknown
  vkLink?: unknown
  inStock?: unknown
  size?: unknown
  country?: unknown
  material?: unknown
  manufacturer?: unknown
  category?: unknown
}

const getText = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined

const getDescriptionField = (description: string, label: string) => {
  const match = description.match(
    new RegExp(
      `(?:^|\\n)\\s*(?:[-*✔✅]\\s*)?(?:${label})\\s*[:：]\\s*([^\\n]+)`,
      'i',
    ),
  )

  return match?.[1]?.trim()
}

const normalizeProduct = (value: unknown, index: number): Product => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Некорректная запись товара в vk_products.json: строка ${index + 1}`)
  }

  const item = value as ProductFeedItem
  const id = getText(item.id)
  const name = getText(item.title)
  const slug = getText(item.slug)
  const image = getText(item.image)
  const price =
    typeof item.price === 'number' && Number.isFinite(item.price)
      ? item.price
      : undefined

  if (!id || !name || !image || price === undefined) {
    throw new Error(
      `В записи товара ${index + 1} в vk_products.json должны быть указаны id, title, image и числовой price`,
    )
  }

  const description = getText(item.description) ?? ''
  const currency = getText(item.currency) ?? 'RUB'

  if (!/^[A-Z]{3}$/.test(currency)) {
    throw new Error(`Некорректная валюта товара ${id}: ${currency}`)
  }

  const size =
    getText(item.size) ?? getDescriptionField(description, 'Размер|Ширина')
  const country =
    getText(item.country) ??
    getDescriptionField(description, 'Страна(?: производства)?')
  const material =
    getText(item.material) ??
    getDescriptionField(description, 'Материал(?:/Качество)?')
  const manufacturer =
    getText(item.manufacturer) ??
    getDescriptionField(description, 'Производитель|Бренд')

  return {
    id,
    name,
    slug: slug ?? name.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/(^-|-$)/g, ''),
    description,
    size,
    country,
    material,
    manufacturer,
    price,
    oldPrice:
      typeof item.oldPrice === 'number' && Number.isFinite(item.oldPrice)
        ? item.oldPrice
        : null,
    currency,
    image,
    tag: item.inStock === false ? 'Нет в наличии' : 'В наличии',
    category: getText(item.category),
    vkLink: getText(item.vkLink),
    inStock: typeof item.inStock === 'boolean' ? item.inStock : undefined,
  }
}

const normalizedProducts = productFeed.map(normalizeProduct)
const productIds = new Set<string>()

for (const product of normalizedProducts) {
  if (productIds.has(product.id)) {
    throw new Error(`Повторяется id товара в vk_products.json: ${product.id}`)
  }
  productIds.add(product.id)
}

export const PRODUCTS: Product[] = normalizedProducts

export const productSlug = (product: Product) => `${product.id}-${product.slug}`

export const findProductBySlug = (slug: string | null) =>
  PRODUCTS.find((product) => productSlug(product) === slug)

export const money = (value: number, currency = 'RUB') =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)

export const findProduct = (id: string | number | null) =>
  PRODUCTS.find((product) => product.id === String(id))
