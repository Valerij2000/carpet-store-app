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

export type UserProfile = {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
}

export type Address = {
  id: string
  street: string
  city: string
  region: string
  postalCode: string
}

export type PaymentMethod = {
  id: string
  type: 'card'
  last4: string
  holder: string
}

export const CART_KEY = 'bayan-cart'
export const ORDERS_KEY = 'bayan-orders'
export const PROFILE_KEY = 'bayan-profile'
export const ADDRESSES_KEY = 'bayan-addresses'
export const PAYMENTS_KEY = 'bayan-payments'

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

const readJson = <T>(key: string, fallback: T): T => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '')
    return value ?? fallback
  } catch {
    return fallback
  }
}

export const readProfile = (): UserProfile => readJson(PROFILE_KEY, {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
})

export const saveProfile = (profile: UserProfile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  window.dispatchEvent(new Event('bayan-store-update'))
}

export const readAddresses = (): Address[] => {
  const addresses = readJson<unknown>(ADDRESSES_KEY, [])
  return Array.isArray(addresses) ? addresses as Address[] : []
}

export const saveAddress = (address: Omit<Address, 'id'>) => {
  const nextAddress = { ...address, id: `address-${Date.now()}` }
  localStorage.setItem(ADDRESSES_KEY, JSON.stringify([...readAddresses(), nextAddress]))
  window.dispatchEvent(new Event('bayan-store-update'))
}

export const readPayments = (): PaymentMethod[] => {
  const payments = readJson<unknown>(PAYMENTS_KEY, [])
  return Array.isArray(payments) ? payments as PaymentMethod[] : []
}

export const savePayment = (payment: Omit<PaymentMethod, 'id'>) => {
  const nextPayment = { ...payment, id: `payment-${Date.now()}` }
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify([...readPayments(), nextPayment]))
  window.dispatchEvent(new Event('bayan-store-update'))
}
