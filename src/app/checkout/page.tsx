"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { findProduct, money } from "@/lib/products";
import { createOrder, readCart, saveCart } from "@/lib/store";
export default function Checkout() {
  const [total, setTotal] = useState(0); const [done, setDone] = useState(false); const [orderId, setOrderId] = useState("");
  useEffect(() => { const cart = readCart(); setTotal(cart.reduce((sum, item) => sum + (findProduct(item.id)?.price || 0) * item.quantity, 0)); }, []);
  if (done) return <main><PageHero title="Оформление заказа" crumbs="Главная / Корзина / Оформление" /><div className="container"><div className="empty"><div className="empty__icon">✓</div><h2>Заказ оформлен</h2><p>Спасибо! Мы свяжемся с вами для подтверждения.</p><Link className="btn btn--green" href={`/order/${orderId}`}>Отследить заказ</Link><Link className="btn btn--light" href="/">Вернуться на главную</Link></div></div></main>;
  return <main><PageHero title="Оформление заказа" crumbs="Главная / Корзина / Оформление" /><div className="container checkout"><form className="form-page" onSubmit={(e) => { e.preventDefault(); const order = createOrder(readCart(), total); saveCart([]); setOrderId(order.id); setDone(true); }}><h2>Контактные данные</h2><div className="form-grid"><Field label="Имя" /><Field label="Телефон" /><Field label="Email" type="email" /><Field label="Город" value="Алматы" /><Field label="Адрес доставки" full /><div className="form-field form-field--full"><label>Способ оплаты</label><select><option>Картой онлайн</option><option>При получении</option></select></div><div className="form-field form-field--full"><button className="btn btn--primary">Подтвердить заказ</button></div></div></form><aside className="summary"><div className="summary__title">Ваш заказ</div><div className="summary__total"><span>Итого</span><span>{money(total)}</span></div></aside></div></main>;
}
function Field({ label, full, type = "text", value }: { label: string; full?: boolean; type?: string; value?: string }) { return <div className={`form-field ${full ? "form-field--full" : ""}`}><label>{label}</label><input required type={type} defaultValue={value} /></div>; }
