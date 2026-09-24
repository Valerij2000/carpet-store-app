"use client";
import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { findProduct, money, PRODUCTS } from "@/lib/products";
import { addToCart } from "@/lib/store";
export default function ProductPage() {
  const [productId, setProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const product = findProduct(productId) || PRODUCTS[0];

  useEffect(() => {
    setProductId(new URLSearchParams(window.location.search).get("id"));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites: number[] = JSON.parse(
        localStorage.getItem("bayan-favorites") || "[]",
      );
      setIsFavorite(favorites.includes(product.id));
    }
  }, [product.id]);

  const add = () => {
    addToCart(product, quantity);
    alert("Товар добавлен в корзину");
  };
  const favorite = () => {
    const favorites: number[] = JSON.parse(
      localStorage.getItem("bayan-favorites") || "[]",
    );
    const next = favorites.includes(product.id)
      ? favorites.filter((id) => id !== product.id)
      : [...favorites, product.id];
    localStorage.setItem("bayan-favorites", JSON.stringify(next));
    setIsFavorite(next.includes(product.id));
    window.dispatchEvent(new Event("bayan-store-update"));
  };
  return (
    <main>
      <PageHero crumbs="Главная / Каталог / Карточка товара" />
      <div className="container product-detail">
        <div className="product-detail__visual">
          <img key={product.id} src={product.image} alt={product.name} />
        </div>
        <div>
          <h1 className="product-detail__title">{product.name}</h1>
          <div className="product-detail__sku">Артикул: Q893A</div>
          <div className="product-detail__rating">
            ★ ★ ★ ★ ★ &nbsp; <span style={{ color: "#aaa" }}>0 отзывов</span>
          </div>
          <div className="product-detail__price">{money(product.price)}</div>
          <div className="product-detail__info">
            <Row name="Размер" value={product.size} />
            <Row name="Производитель" value={product.country} />
            <Row name="Материал" value={product.material} />
            <Row name="Доставка" value="по Алматы и Казахстану" />
          </div>
          <div className="buy-row">
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                −
              </button>
              <input value={quantity} readOnly aria-label="Количество" />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="btn btn--primary" onClick={add}>
              Добавить в корзину
            </button>
            <button
              className="btn btn--light"
              onClick={favorite}
              aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
              title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            >
              <span className={isFavorite ? "favorite-heart is-active" : "favorite-heart"}>♥</span>
            </button>
          </div>
          <p style={{ color: "#888", lineHeight: 1.7, marginTop: 25 }}>
            Классический орнамент, спокойная палитра и универсальный размер.
            Подходит для гостиной, спальни и небольших зон отдыха.
          </p>
        </div>
      </div>
    </main>
  );
}
function Row({ name, value }: { name: string; value: string }) {
  return (
    <div className="product-detail__row">
      <span>{name}</span>
      <span>{value}</span>
    </div>
  );
}
