"use client";
import Link from "next/link";
import { Product, money } from "@/lib/products";
import { useEffect, useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    try {
      setActive(
        JSON.parse(localStorage.getItem("bayan-favorites") || "[]").includes(
          product.id,
        ),
      );
    } catch {}
  }, [product.id]);
  const favorite = () => {
    const favorites: number[] = JSON.parse(
      localStorage.getItem("bayan-favorites") || "[]",
    );
    const next = favorites.includes(product.id)
      ? favorites.filter((id) => id !== product.id)
      : [...favorites, product.id];
    localStorage.setItem("bayan-favorites", JSON.stringify(next));
    setActive(!active);
    window.dispatchEvent(new Event("bayan-store-update"));
  };
  return (
    <article className="product-card">
      <span className="product-card__tag">{product.tag}</span>
      <button
        className={`product-card__favorite ${active ? "is-active" : ""}`}
        onClick={favorite}
        aria-label="Добавить в избранное"
      >
        {active ? "♥" : "♡"}
      </button>
      <Link href={`/product?id=${product.id}`} className="product-card__image">
        <img src={product.image} alt={product.name} />
      </Link>
      <Link href={`/product?id=${product.id}`} className="product-card__name">
        {product.name}
      </Link>
      <div className="product-card__meta">Размер: {product.size}</div>
      <div className="product-card__meta">Производитель: {product.country}</div>
      <div className="product-card__rating">
        <span className="stars">★ ★ ★ ★ ★</span>
        <span className="reviews">0 отзывов</span>
      </div>
      {product.oldPrice ? (
        <>
          <div className="product-card__price-label">
            Старая цена &nbsp;&nbsp;&nbsp; Новая цена
          </div>
          <div className="product-card__prices">
            <span className="product-card__old">{money(product.oldPrice)}</span>
            <span className="product-card__new">{money(product.price)}</span>
          </div>
        </>
      ) : (
        <>
          <div className="product-card__price-label">
            Цена &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; В рассрочку
          </div>
          <div className="product-card__prices">
            <span>{money(product.price)}</span>
            <span className="product-card__installment">
              <strong>{money(Math.round(product.price / 12))}</strong> × 12 мес
            </span>
          </div>
        </>
      )}
    </article>
  );
}
