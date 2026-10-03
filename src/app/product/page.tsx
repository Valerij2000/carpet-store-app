"use client";
import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { findProduct, money, PRODUCTS } from "@/lib/products";
import { addToCart } from "@/lib/store";
export default function ProductPage() {
  const [productId, setProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const product = findProduct(productId) || PRODUCTS[0];
  const images = [product.image];

  useEffect(() => {
    setProductId(new URLSearchParams(window.location.search).get("id"));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites: unknown = JSON.parse(
        localStorage.getItem("bayan-favorites") || "[]",
      );
      setIsFavorite(
        Array.isArray(favorites) &&
          favorites.some((id) => String(id) === product.id),
      );
    }
  }, [product.id]);

  const add = () => {
    addToCart(product, quantity);
  };
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
    setIsFavorite(next.includes(product.id));
    window.dispatchEvent(new Event("bayan-store-update"));
  };
  return (
    <main>
      <PageHero crumbs="Главная / Каталог / Карточка товара" />
      <div className="container product-detail">
        <div className="product-detail__gallery">
          <div className="product-detail__thumbs" aria-label="Фотографии товара">
            {images.map((image, index) => (
              <button
                className={selectedImageIndex === index ? "is-active" : ""}
                key={`${image}-${index}`}
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`Показать вид ${index + 1}`}
                aria-pressed={selectedImageIndex === index}
              >
                <img src={image} alt={`${product.name}, вид ${index + 1}`} />
              </button>
            ))}
          </div>
          <div className="product-detail__visual">
            <img key={`${product.id}-${selectedImageIndex}`} src={images[selectedImageIndex]} alt={`${product.name}, вид ${selectedImageIndex + 1}`} />
          </div>
        </div>
        <div>
          <h1 className="product-detail__title">{product.name}</h1>
          <div className="product-detail__sku">Артикул: Q893A</div>
          <div className="product-detail__rating">
            ★ ★ ★ ★ ★ &nbsp; <span style={{ color: "#aaa" }}>0 отзывов</span>
          </div>
          <div className="product-detail__price">
            {money(product.price, product.currency)}
          </div>
          <div className="product-detail__info">
            {product.size && <Row name="Размер" value={product.size} />}
            {product.manufacturer && (
              <Row name="Производитель" value={product.manufacturer} />
            )}
            {product.country && <Row name="Страна" value={product.country} />}
            {product.material && <Row name="Материал" value={product.material} />}
            <Row
              name="Наличие"
              value={product.inStock === false ? "Нет в наличии" : "В наличии"}
            />
          </div>
          <div className="buy-row">
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                −
              </button>
              <input value={quantity} readOnly aria-label="Количество" />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button
              className="btn btn--primary"
              onClick={add}
              disabled={product.inStock === false}
            >
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
          {product.description && (
            <p
              style={{
                color: "#888",
                lineHeight: 1.7,
                marginTop: 25,
                whiteSpace: "pre-line",
              }}
            >
              {product.description}
            </p>
          )}
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
