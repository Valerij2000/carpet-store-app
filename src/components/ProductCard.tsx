"use client";
import Link from "next/link";
import { Product, money, productSlug } from "@/lib/products";
import { addToCart } from "@/lib/store";
import { useEffect, useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    try {
      const favorites: unknown = JSON.parse(
        localStorage.getItem("bayan-favorites") || "[]",
      );
      setActive(
        Array.isArray(favorites) &&
          favorites.some((id) => String(id) === product.id),
      );
    } catch {}
  }, [product.id]);
  const favorite = () => {
    const storedFavorites: unknown = JSON.parse(
      localStorage.getItem("bayan-favorites") || "[]",
    );
    const favorites = Array.isArray(storedFavorites)
      ? storedFavorites.map(String)
      : [];
    const next = favorites.includes(product.id)
      ? favorites.filter((id) => id !== product.id)
      : [...favorites, product.id];
    localStorage.setItem("bayan-favorites", JSON.stringify(next));
    setActive(!active);
    window.dispatchEvent(new Event("bayan-store-update"));
  };
  const handleAddToCart = () => {
    addToCart(product);
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
      <Link
        href={`/product/${productSlug(product)}`}
        className="product-card__image"
      >
        <img src={product.image} alt={product.name} />
      </Link>
      <Link
        href={`/product/${productSlug(product)}`}
        className="product-card__name"
      >
        {product.name}
      </Link>
      {product.size && (
        <div className="product-card__meta">Размер: {product.size}</div>
      )}
      {(product.manufacturer || product.country || product.material) && (
        <div className="product-card__meta">
          {product.manufacturer
            ? `Производитель: ${product.manufacturer}`
            : product.country
              ? `Страна: ${product.country}`
              : `Материал: ${product.material}`}
        </div>
      )}
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
            <span className="product-card__old">
              {money(product.oldPrice, product.currency)}
            </span>
            <span className="product-card__new">
              {money(product.price, product.currency)}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="product-card__price-label">Цена</div>
          <div className="product-card__prices">
            <span>{money(product.price, product.currency)}</span>
            <span className="product-card__installment">
              <strong>
                {money(Math.round(product.price / 12), product.currency)}
              </strong>{" "}
              × 12 мес
            </span>
          </div>
        </>
      )}
      <button
        className="product-card__add"
        onClick={handleAddToCart}
        disabled={product.inStock === false}
      >
        {product.inStock === false ? "Нет в наличии" : "В корзину"}
      </button>
    </article>
  );
}
