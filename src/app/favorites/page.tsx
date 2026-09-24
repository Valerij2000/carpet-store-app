"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

export default function Favorites() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    const updateFavorites = () => {
      try {
        const value = JSON.parse(localStorage.getItem("bayan-favorites") || "[]");
        setIds(Array.isArray(value) ? value : []);
      } catch {
        setIds([]);
      }
    };

    updateFavorites();
    window.addEventListener("bayan-store-update", updateFavorites);
    window.addEventListener("storage", updateFavorites);
    return () => {
      window.removeEventListener("bayan-store-update", updateFavorites);
      window.removeEventListener("storage", updateFavorites);
    };
  }, []);

  const products = ids
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  return (
    <main>
      <PageHero title="Избранное" crumbs="Главная / Избранное" />
      <section className="section" style={{ paddingBottom: 80 }}>
        <div className="container">
          <div className="catalog-grid">
            {products.length ? products.map((product) => (
              <ProductCard product={product} key={product.id} />
            )) : (
              <div className="empty" style={{ gridColumn: "1/-1" }}>
                <div className="empty__icon">♡</div>
                <h2>Избранное пусто</h2>
                <p>Сохраняйте понравившиеся ковры, чтобы вернуться к ним позже.</p>
                <Link className="btn btn--primary" href="/catalog">Перейти в каталог</Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
