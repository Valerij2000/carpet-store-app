"use client";

import Image from "next/image";
import Link from "next/link";
import { KeyboardEvent, PointerEvent, useRef, useState } from "react";
import { HERO_PRODUCTS } from "@/data/heroProducts";
import { money, Product, productSlug } from "@/lib/products";
import styles from "./PremiumHero.module.css";

type PremiumHeroProps = {
  products?: Product[];
};

type HeroSlide = { type: "service" } | { type: "product"; product: Product };

const OVERLOCK_PRICE = "200 ₽ за пог. м";

export default function PremiumHero({
  products = HERO_PRODUCTS,
}: PremiumHeroProps) {
  const slides: HeroSlide[] = [
    { type: "service" },
    ...products.map((product) => ({ type: "product" as const, product })),
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const count = slides.length;
  const activeSlide = slides[activeIndex];

  const handlePrevious = () =>
    setActiveIndex((index) => (index - 1 + count) % count);
  const handleNext = () => setActiveIndex((index) => (index + 1) % count);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") handlePrevious();
    if (event.key === "ArrowRight") handleNext();
  };
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    didSwipe.current = false;
    startX.current = event.pointerType === "touch" ? event.clientX : null;
  };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const distance = event.clientX - startX.current;
    if (Math.abs(distance) > 45) {
      didSwipe.current = true;
      if (distance > 0) handlePrevious();
      else handleNext();
    }
    startX.current = null;
  };

  const getSlideProduct = (slide: HeroSlide) =>
    slide.type === "product" ? slide.product : null;

  const nextProduct = getSlideProduct(slides[(activeIndex + 1) % count]);
  const currentProduct = getSlideProduct(activeSlide);
  const overlokInfoHero = (
    <div>
      <ul>
        <li>Обрезка ковров и дорожек под нужные размеры;</li>
        <li>Обработка ковровых изделий;</li>
        <li>Реставрация старых ковровых изделий.</li>
      </ul>
      <b>
        <sup>*</sup>Качество гарантируется.
      </b>
    </div>
  );

  return (
    <section className={styles.hero} aria-labelledby="season-hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            {activeSlide.type === "service"
              ? "Услуги мастерской"
              : 'Выбор "Ковры Дорожки Ковролин"'}
          </p>
          <h1 className={styles.title} id="season-hero-title">
            {activeSlide.type === "service"
              ? "Оверлок ковров"
              : "Топ-10 ковров и дорожек"}
          </h1>
        </div>

        <div
          className={styles.showcase}
          tabIndex={0}
          role="region"
          aria-label="Слайдер услуг и товаров"
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div className={styles.rugs}>
            <div className={`${styles.rugFrame} ${styles.activeRug}`}>
              {activeSlide.type === "service" ? (
                <Image
                  className={styles.rug}
                  src="/assets/overlock-service.svg"
                  alt="Аккуратная обработка края ковра оверлоком"
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 900px) 50vw, 55vw"
                />
              ) : (
                <Link
                  className={styles.slideLink}
                  href={`/product/${productSlug(activeSlide.product)}`}
                  aria-label={`Подробнее: ${activeSlide.product.name}`}
                  onClick={(event) => {
                    if (didSwipe.current && event.detail > 0) {
                      event.preventDefault();
                      didSwipe.current = false;
                    }
                  }}
                >
                  <Image
                    key={activeSlide.product.id}
                    className={styles.rug}
                    src={activeSlide.product.image}
                    alt={activeSlide.product.name}
                    fill
                    priority={activeIndex === 0}
                    sizes="(max-width: 640px) 90vw, (max-width: 900px) 50vw, 55vw"
                  />
                </Link>
              )}
              <span className={styles.price}>
                {activeSlide.type === "service"
                  ? OVERLOCK_PRICE
                  : money(
                      activeSlide.product.price,
                      activeSlide.product.currency,
                    )}
              </span>
            </div>
            {nextProduct && (
              <Link
                className={`${styles.rugFrame} ${styles.nextRug}`}
                href={`/product/${productSlug(nextProduct)}`}
                aria-label={`Следующий товар: ${nextProduct.name}`}
                tabIndex={-1}
              >
                <Image
                  key={nextProduct.id}
                  className={styles.rug}
                  src={nextProduct.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 20vw, 24vw"
                />
              </Link>
            )}
          </div>
          <div className={styles.dots} role="tablist" aria-label="Выбор слайда">
            {slides.map((slide, index) => {
              const product = getSlideProduct(slide);
              const label = product ? product.name : "Оверлок ковров";

              return (
                <button
                  key={product?.id ?? "overlock"}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Слайд ${index + 1}: ${label}`}
                  className={index === activeIndex ? styles.dotActive : ""}
                  onClick={() => setActiveIndex(index)}
                />
              );
            })}
          </div>
          <div className={styles.productInfo} aria-live="polite">
            {currentProduct ? (
              <>
                <strong>{currentProduct.name}</strong>
                {currentProduct.size && <span>{currentProduct.size}</span>}
              </>
            ) : null}{" "}
            {/* Renders absolutely nothing if there is no current product */}
          </div>
        </div>

        <div className={styles.supporting}>
          <div className={styles.meta}>
            {activeSlide.type === "service" ? overlokInfoHero : null}
          </div>
        </div>

        <div className={styles.actions}>
          <Link
            className={styles.primaryButton}
            href={activeSlide.type === "service" ? "/contacts" : "/catalog"}
          >
            {activeSlide.type === "service"
              ? "Заказать оверлок"
              : "Смотреть каталог"}
          </Link>
          <div className={styles.controls}>
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Предыдущий слайд"
            >
              ‹
            </button>
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Следующий слайд"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
