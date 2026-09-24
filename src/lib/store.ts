import { Product } from '@/lib/products'

export type CartItem = {
  id: number
  quantity: number
}

export type OrderStatus = 'Принят' | 'Собирается' | 'Передан в доставку' | 'Доставлен'

export type Order = {
  id: string
  createdAt: string
  total: number
  items: CartItem[]
  status: OrderStatus
}

export const CART_KEY = 'bayan-cart'
export const ORDERS_KEY = 'bayan-orders'

export const readCart = (): CartItem[] => {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export const saveCart = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event('bayan-store-update'))
}

export const addToCart = (product: Product, quantity = 1) => {
  const cart = readCart()
  const item = cart.find((entry) => entry.id === product.id)
  if (item) item.quantity += quantity
  else cart.push({ id: product.id, quantity })
  saveCart(cart)
  window.dispatchEvent(
    new CustomEvent('bayan-cart-added', {
      detail: { name: product.name, quantity },
    }),
  )
}

export const readOrders = (): Order[] => {
  try {
    const value = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
    if (!Array.isArray(value)) return []
    const activeOrders = value.filter(
      (order): order is Order => order?.status !== 'Доставлен',
    )
    if (activeOrders.length !== value.length) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(activeOrders))
    }
    return activeOrders
  } catch {
    return []
  }
}

export const createOrder = (items: CartItem[], total: number): Order => {
  const order: Order = {
    id: `BS-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    total,
    items,
    status: 'Принят',
  }
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...readOrders()]))
  return order
}
