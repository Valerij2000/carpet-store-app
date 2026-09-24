"use client";

import { useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/products";

export default function ProductSlider({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: number) => {
    trackRef.current?.scrollBy({ left: direction * 221, behavior: "smooth" });
  };

  return (
    <div className="product-slider">
      <div className="section-heading__controls slider-controls">
        <button
          className="slider-button"
          onClick={() => handleScroll(-1)}
          aria-label="Предыдущие товары"
        >
          ‹
        </button>
        <button
          className="slider-button"
          onClick={() => handleScroll(1)}
          aria-label="Следующие товары"
        >
          ›
        </button>
      </div>
      <div className="product-track" ref={trackRef}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
