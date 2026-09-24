'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import PageHero from '@/components/PageHero'
import OrderProgress from '@/components/OrderProgress'
import { Order, readOrders } from '@/lib/store'
import { findProduct, money } from '@/lib/products'

export default function OrderPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    setOrder(readOrders().find((item) => item.id === params.id) || null)
  }, [params.id])

  if (!order) {
    return <main><PageHero title="Заказ не найден" crumbs="Главная / Заказ" /><div className="container"><div className="empty"><h2>Такого заказа нет</h2><Link className="btn btn--primary" href="/catalog">Перейти в каталог</Link></div></div></main>
  }

  return (
    <main>
      <PageHero title={`Заказ ${order.id}`} crumbs="Главная / Отслеживание заказа" />
      <div className="container order-page">
        <div className="order-page__header"><div><h2>Статус заказа: {order.status}</h2><p>Оформлен {new Date(order.createdAt).toLocaleDateString('ru-RU')}</p></div><strong>{money(order.total)}</strong></div>
        <OrderProgress status={order.status} />
        <section className="order-items"><h2>Состав заказа</h2>{order.items.map((item) => { const product = findProduct(item.id); return product ? <div className="order-item" key={item.id}><span>{product.name} × {item.quantity}</span><strong>{money(product.price * item.quantity)}</strong></div> : null })}</section>
      </div>
    </main>
  )
}
