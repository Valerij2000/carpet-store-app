import heroProductRanks from '@/data/hero_products.json'
import { PRODUCTS, Product } from '@/lib/products'

const productsById = new Map(PRODUCTS.map((product) => [product.id, product]))

export const HERO_PRODUCTS: Product[] = heroProductRanks
  .sort((first, second) => first.rank - second.rank)
  .map(({ id }) => {
    const product = productsById.get(id)

    if (!product) {
      throw new Error(`Товар ${id} из hero_products.json отсутствует в каталоге`)
    }

    return product
  })

if (HERO_PRODUCTS.length !== 10) {
  throw new Error('В hero_products.json должно быть ровно 10 товаров')
}
