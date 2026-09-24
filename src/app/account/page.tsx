"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import OrderProgress from "@/components/OrderProgress";
import { findProduct, money } from "@/lib/products";
import { Order, readOrders } from "@/lib/store";

export default function Account() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const updateOrder = () => setOrder(readOrders()[0] || null);
    updateOrder();
    window.addEventListener("bayan-store-update", updateOrder);
    window.addEventListener("storage", updateOrder);
    return () => {
      window.removeEventListener("bayan-store-update", updateOrder);
      window.removeEventListener("storage", updateOrder);
    };
  }, []);

  return (
    <main>
      <PageHero title="Личный кабинет" crumbs="Главная / Личный кабинет" />
      <div className="container account-layout">
        <aside className="account-sidebar">
          <div className="account-profile">
            <div className="account-profile__avatar">ДС</div>
            <div>
              <span>Здравствуйте,</span>
              <strong>Дмитрий Бондарчук</strong>
            </div>
          </div>
          <nav className="account-menu" aria-label="Разделы личного кабинета">
            <Link className="account-menu__link is-active" href="/account">Мои заказы</Link>
            <Link className="account-menu__link" href="/account">Моя информация</Link>
            <Link className="account-menu__link" href="/account">Адресная книга</Link>
            <Link className="account-menu__link" href="/account">Способы оплаты</Link>
          </nav>
        </aside>
        <section className="account-orders">
          <h1>Мои заказы</h1>
          {order ? (
            <article className="account-order">
              <header className="account-order__header">
                <div>
                  <strong>Заказ от {new Date(order.createdAt).toLocaleDateString("ru-RU")}</strong>
                  <span>{order.id}</span>
                </div>
                <strong>{money(order.total)}</strong>
              </header>
              <div className="account-order__status">
                <span>Статус заказа:</span>
                <b>{order.status}</b>
              </div>
              <OrderProgress status={order.status} />
              <div className="account-order__items">
                {order.items.map((item) => {
                  const product = findProduct(item.id);
                  return product ? (
                    <div className="account-order__item" key={item.id}>
                      <img src={product.image} alt={product.name} />
                      <span>{product.name} × {item.quantity}</span>
                    </div>
                  ) : null;
                })}
              </div>
              <Link className="btn btn--primary account-order__link" href={`/order/${order.id}`}>
                Отследить заказ
              </Link>
            </article>
          ) : (
            <div className="empty">
              <h2>Активных заказов нет</h2>
              <p>После оформления здесь появится текущий заказ и его статус.</p>
              <Link className="btn btn--primary" href="/catalog">Перейти в каталог</Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
