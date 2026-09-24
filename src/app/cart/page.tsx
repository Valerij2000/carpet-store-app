"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { findProduct, money, Product, productSlug } from "@/lib/products";
type Item = { id: number; quantity: number };
export default function Cart() {
  const [cart, setCart] = useState<Item[]>([]);
  useEffect(() => setCart(JSON.parse(localStorage.getItem("bayan-cart") || "[]")), []);
  const update = (next: Item[]) => { setCart(next); localStorage.setItem("bayan-cart", JSON.stringify(next)); window.dispatchEvent(new Event("bayan-store-update")); };
  const total = cart.reduce((sum, item) => sum + (findProduct(item.id)?.price || 0) * item.quantity, 0);
  return <main><PageHero title="Корзина" crumbs="Главная / Корзина" />{cart.length ? <div className="container cart-layout"><section><div className="cart-list">{cart.map((item) => { const product = findProduct(item.id) as Product; return <article className="cart-item" key={item.id}><Link href={`/product/${productSlug(product)}`} className="cart-item__image"><img src={product.image} alt={product.name} /></Link><div><Link href={`/product/${productSlug(product)}`} className="cart-item__name">{product.name}</Link><div className="cart-item__meta">{product.size} · {product.material}</div><div className="quantity" style={{ marginTop: 12 }}><button onClick={() => update(item.quantity > 1 ? cart.map((x) => x.id === item.id ? { ...x, quantity: x.quantity - 1 } : x) : cart.filter((x) => x.id !== item.id))}>−</button><input value={item.quantity} readOnly aria-label="Количество" /><button onClick={() => update(cart.map((x) => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x))}>+</button></div></div><div className="cart-item__price">{money(product.price * item.quantity)}</div><button className="cart-item__remove" onClick={() => update(cart.filter((x) => x.id !== item.id))} aria-label="Удалить">✕</button></article>; })}</div></section><aside className="summary"><div className="summary__title">Ваш заказ</div><div className="summary__row"><span>Товары</span><span>{money(total)}</span></div><div className="summary__row"><span>Доставка</span><span>Бесплатно</span></div><div className="summary__total"><span>Итого</span><span>{money(total)}</span></div><Link className="btn btn--primary" href="/checkout">Оформить заказ</Link></aside></div> : <div className="container"><div className="empty"><div className="empty__icon">🛒</div><h2>Корзина пуста</h2><p>Добавьте товары из каталога.</p><Link className="btn btn--primary" href="/catalog">Перейти в каталог</Link></div></div>}</main>;
}
