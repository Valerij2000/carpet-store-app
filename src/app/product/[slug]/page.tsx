"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { findProductBySlug, money, PRODUCTS } from "@/lib/products";
import { addToCart } from "@/lib/store";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = findProductBySlug(params.slug) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = [product.image];

  const handleFavorite = () => {
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
    setIsFavorite(next.includes(product.id));
    window.dispatchEvent(new Event("bayan-store-update"));
  };

  return (
    <main>
      <PageHero crumbs={`Главная / Ковры / ${product.name}`} />
      <div className="container product-page">
        <div className="product-page__heading">
          <h1>{product.name}</h1>
          <div className="product-page__rating">
            <span>★ ★ ★ ★ ★</span> 0 отзывов
          </div>
        </div>
        <div className="product-page__sku">Код товара: BAL733</div>
        <div className="product-gallery">
          <div className="product-gallery__thumbs">
            {images.map((image, index) => (
              <button
                className={`product-gallery__thumb ${selectedImageIndex === index ? "is-active" : ""}`}
                key={`${image}-${index}`}
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`Показать вид ${index + 1}`}
                aria-pressed={selectedImageIndex === index}
              >
                <img src={image} alt={`${product.name}, вид ${index + 1}`} />
              </button>
            ))}
          </div>
          <div className="product-gallery__main">
            <span className="product-gallery__tag">{product.tag}</span>
            <img
              src={images[selectedImageIndex]}
              alt={`${product.name}, вид ${selectedImageIndex + 1}`}
            />
          </div>
          <aside className="product-buy">
            <div className="product-buy__prices">
              <span>Цена:</span>
              <strong>{money(product.price, product.currency)}</strong>
              <em>
                Старая цена{" "}
                <b>
                  {money(Math.round(product.price * 1.2), product.currency)}
                </b>
              </em>
            </div>
            {product.size && (
              <div className="product-buy__size">
                <span>Размер:</span>
                <strong>{product.size}</strong>
              </div>
            )}
            <div className="product-buy__stock">
              {product.inStock === false ? "Нет в наличии" : "✓ В наличии"}
            </div>
            <div className="product-buy__actions">
              <div className="quantity">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Уменьшить количество"
                >
                  −
                </button>
                <input value={quantity} readOnly aria-label="Количество" />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Увеличить количество"
                >
                  +
                </button>
              </div>
              <button
                className="btn btn--primary"
                onClick={() => addToCart(product, quantity)}
                disabled={product.inStock === false}
              >
                В корзину
              </button>
              <button
                className="btn btn--light product-buy__favorite"
                onClick={handleFavorite}
                aria-label="Добавить в избранное"
              >
                {isFavorite ? "♥" : "♡"}
              </button>
            </div>
            <div className="product-buy__delivery">
              <p>↪ Возврат в течение 14 дней</p>
              <p>▣ Среднее время доставки 2–5 дня</p>
              <Link href="/contacts">Подробнее</Link>
            </div>
            <p className="product-buy__help">
              Нужна помощь с выбором? Просто напишите нам в WhatsApp и мы
              обязательно вам поможем!
            </p>
            <Link className="btn btn--green" href="/contacts">
              ◉ Написать
            </Link>
          </aside>
        </div>
        <section className="product-tabs">
          <div className="product-tabs__nav">
            <strong>Характеристики</strong>
            <span>Отзывы</span>
            <span>Написать отзыв</span>
          </div>
          <div className="product-tabs__content">
            {product.size && <Row name="Размер" value={product.size} />}
            {product.material && (
              <Row name="Материал" value={product.material} />
            )}
            {product.manufacturer && (
              <Row name="Производитель" value={product.manufacturer} />
            )}
            {product.country && <Row name="Страна" value={product.country} />}
            <Row
              name="Наличие"
              value={product.inStock === false ? "Нет в наличии" : "В наличии"}
            />
            {product.description && (
              <div className="product-detail__row">
                <strong>Описание</strong>
                <span style={{ whiteSpace: "pre-line" }}>
                  {product.description}
                </span>
              </div>
            )}
          </div>
        </section>
        <section className="section product-recommendations">
          <div className="section-heading">
            <h2 className="section-heading__title">Вам может понравиться</h2>
          </div>
          <div className="product-track">
            {PRODUCTS.filter((item) => item.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Row({ name, value }: { name: string; value: string }) {
  return (
    <div className="product-detail__row">
      <strong>{name}</strong>
      <span>{value}</span>
    </div>
  );
}
