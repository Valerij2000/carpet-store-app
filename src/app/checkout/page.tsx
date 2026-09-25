"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { findProduct, money } from "@/lib/products";
import { createOrder, readCart, readProfile, saveCart, saveProfile } from "@/lib/store";
export default function Checkout() {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
  });
  useEffect(() => {
    setProfile(readProfile());
    const cart = readCart();
    setTotal(
      cart.reduce(
        (sum, item) => sum + (findProduct(item.id)?.price || 0) * item.quantity,
        0,
      ),
    );
  }, []);
  if (done)
    return (
      <main>
        <PageHero
          title="Оформление заказа"
          crumbs="Главная / Корзина / Оформление"
        />
        <div className="container">
          <div className="empty">
            <div className="empty__icon">✓</div>
            <h2>Заказ оформлен</h2>
            <p>Спасибо! Мы свяжемся с вами для подтверждения.</p>
            <Link className="btn btn--green" href={`/order/${orderId}`}>
              Отследить заказ
            </Link>
            <Link className="btn btn--light" href="/">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </main>
    );
  return (
    <main>
      <PageHero
        title="Оформление заказа"
        crumbs="Главная / Корзина / Оформление"
      />
      <div className="container checkout">
        <form
          className="form-page"
          onSubmit={(e) => {
            e.preventDefault();
            saveProfile(profile);
            const order = createOrder(readCart(), total);
            saveCart([]);
            setOrderId(order.id);
            setDone(true);
          }}
        >
          <h2>Контактные данные</h2>
          <div className="form-grid">
            <Field label="Имя" value={profile.firstName} onChange={(value) => setProfile({ ...profile, firstName: value })} />
            <Field label="Телефон" value={profile.phone} onChange={(value) => setProfile({ ...profile, phone: value })} />
            <Field label="Email" type="email" value={profile.email} onChange={(value) => setProfile({ ...profile, email: value })} />
            <Field label="Город" value="Макеевка" readOnly />
            <div className="form-field form-field--full">
              <label>Выберите способ получения товара</label>
              <div className="delivery-options">
                <button
                  type="button"
                  className={
                    deliveryMethod === "delivery"
                      ? "delivery-option is-active"
                      : "delivery-option"
                  }
                  onClick={() => setDeliveryMethod("delivery")}
                >
                  <strong>Доставка</strong>
                  <span>Курьером по адресу</span>
                </button>
                <button
                  type="button"
                  className={
                    deliveryMethod === "pickup"
                      ? "delivery-option is-active"
                      : "delivery-option"
                  }
                  onClick={() => setDeliveryMethod("pickup")}
                >
                  <strong>Самовывоз</strong>
                  <span>Из пункта выдачи</span>
                </button>
              </div>
            </div>
            {deliveryMethod === "delivery" && <Field label="Адрес доставки" full />}
            <div className="form-field form-field--full">
              <label>Способ оплаты</label>
              <select>
                <option>Картой онлайн</option>
                <option>При получении</option>
              </select>
            </div>
            <div className="form-field form-field--full">
              <button className="btn btn--primary">Подтвердить заказ</button>
            </div>
          </div>
        </form>
        <aside className="summary">
          <div className="summary__title">Ваш заказ</div>
          <div className="summary__total">
            <span>Итого</span>
            <span>{money(total)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
function Field({
  label,
  full,
  type = "text",
  value,
  onChange,
  readOnly,
}: {
  label: string;
  full?: boolean;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <div className={`form-field ${full ? "form-field--full" : ""}`}>
      <label>{label}</label>
      {value !== undefined ? (
        <input required type={type} value={value} readOnly={readOnly} onChange={(event) => onChange?.(event.target.value)} />
      ) : (
        <input required type={type} />
      )}
    </div>
  );
}
