"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { readOrders } from "@/lib/store";
import SocialLinks from "./SocialLinks";
import { phones } from "@/data/contacts";

const nav = [
  ["Ковры", "/catalog"],
  ["Коврики", "/catalog?category=Коврики"],
  ["Для ванной", "/catalog"],
  ["Дорожки", "/catalog"],
  ["Особенные ковры", "/catalog?category=Особенные%20ковры"],
  ["Центр поддержки", "/contacts"],
  ["Контакты", "/contacts"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState({ cart: 0, favorites: 0 });
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const mapUrl = `https://yandex.ru/maps/-/CXQ4vM7t`;
  useEffect(() => {
    const update = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("bayan-cart") || "[]");
        const favorites = JSON.parse(
          localStorage.getItem("bayan-favorites") || "[]",
        );
        setCounts({
          cart: cart.reduce(
            (sum: number, item: { quantity: number }) => sum + item.quantity,
            0,
          ),
          favorites: favorites.length,
        });
        setActiveOrderId(readOrders()[0]?.id || null);
      } catch {
        setCounts({ cart: 0, favorites: 0 });
        setActiveOrderId(null);
      }
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("bayan-store-update", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("bayan-store-update", update);
    };
  }, []);
  return (
    <header className="site-header">
      <div className="container header-main">
        <Link className="logo" href="/">
          <span className="logo__name">Ковры Дорожки</span>
          <span className="logo__sub">ИНТЕРНЕТ-МАГАЗИН КОВРОВ</span>
        </Link>
        <Link
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="location"
        >
          <Icon name="pin" />
          Макеевка
        </Link>
        <form className="search" onSubmit={(event) => event.preventDefault()}>
          <input
            className="search__input"
            placeholder="Поиск по товарам"
            aria-label="Поиск по товарам"
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.currentTarget.value.trim())
                window.location.href = `/catalog?search=${encodeURIComponent(event.currentTarget.value.trim())}`;
            }}
          />
          <button className="search__button" aria-label="Найти">
            <Icon name="search" />
          </button>
        </form>
        <div className="header-actions">
          <Link
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="location-button"
          >
            <Icon name="pin" />
          </Link>
          <Link
            className="icon-button header-account"
            href="/account"
            aria-label="Личный кабинет"
          >
            <Icon name="user" />
          </Link>
          <Link
            className="icon-button"
            href="/favorites"
            aria-label="Избранное"
          >
            <Icon name="heart" />
            {counts.favorites > 0 && (
              <span className="badge">{counts.favorites}</span>
            )}
          </Link>
          <Link className="icon-button" href="/cart" aria-label="Корзина">
            <Icon name="cart" />
            {counts.cart > 0 && <span className="badge">{counts.cart}</span>}
          </Link>
          <Link
            className="icon-button delivery-button"
            href={activeOrderId ? `/order/${activeOrderId}` : "/account"}
            aria-label="Отслеживание заказа"
            title="Отслеживание заказа"
          >
            <Icon name="delivery" />
          </Link>
        </div>
        <button
          className={`icon-button mobile-toggle ${open ? "is-open" : ""}`}
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          title={open ? "Закрыть меню" : "Открыть меню"}
        >
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>
      <nav className="container main-nav" aria-label="Главное меню">
        {nav.map(([label, href]) => (
          <Link className="main-nav__link" href={href} key={label}>
            {label}
          </Link>
        ))}
      </nav>
      <nav
        id="mobile-navigation"
        className={`container mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Мобильное меню"
      >
        {nav.map(([label, href]) => (
          <Link
            className="main-nav__link"
            href={href}
            key={label}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <div className="mobile-menu-contact">
          <span className="mobile-menu-contact__title">Позвоните нам</span>
          {phones.map(({ label, number, href }) => (
            <a className="mobile-menu-contact__phone" href={href} key={label}>
              {number}
            </a>
          ))}
          <SocialLinks />
        </div>
      </nav>
    </header>
  );
}
