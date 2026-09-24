"use client";

import Link from 'next/link'
import { useEffect, useState } from 'react'

type ToastState = {
  name: string;
  quantity: number;
} | null

export default function CartToast() {
  const [toast, setToast] = useState<ToastState>(null)

  useEffect(() => {
    let timeout: number | undefined
    const handleAdded = (event: Event) => {
      const detail = (event as CustomEvent<ToastState>).detail
      if (!detail) return
      setToast(detail)
      window.clearTimeout(timeout)
      timeout = window.setTimeout(() => setToast(null), 3500)
    }
    window.addEventListener('bayan-cart-added', handleAdded)
    return () => {
      window.removeEventListener('bayan-cart-added', handleAdded)
      window.clearTimeout(timeout)
    }
  }, [])

  if (!toast) return null

  return (
    <div className="cart-toast" role="status" aria-live="polite">
      <div className="cart-toast__icon" aria-hidden="true">✓</div>
      <div className="cart-toast__content">
        <strong>Товар добавлен в корзину</strong>
        <span>
          {toast.name}
          {toast.quantity > 1 ? ` × ${toast.quantity}` : ''}
        </span>
      </div>
      <Link className="cart-toast__link" href="/cart">
        Перейти в корзину
      </Link>
      <button
        className="cart-toast__close"
        onClick={() => setToast(null)}
        aria-label="Закрыть уведомление"
      >
        ×
      </button>
    </div>
  )
}
