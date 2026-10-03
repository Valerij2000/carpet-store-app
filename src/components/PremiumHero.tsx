'use client';

import Image from 'next/image';
import Link from 'next/link';
import { KeyboardEvent, PointerEvent, useRef, useState } from 'react';
import { formatSeasonPrice, SeasonHit, seasonHits } from '@/data/seasonHits';
import styles from './PremiumHero.module.css';

type PremiumHeroProps = {
  products?: SeasonHit[];
  status?: 'ready' | 'loading' | 'empty' | 'error';
};

export default function PremiumHero({
  products = seasonHits,
  status = 'ready',
}: PremiumHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const count = products.length;
  const product = products[activeIndex];

  const handlePrevious = () =>
    setActiveIndex((index) => (index - 1 + count) % count);
  const handleNext = () => setActiveIndex((index) => (index + 1) % count);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') handlePrevious();
    if (event.key === 'ArrowRight') handleNext();
  };
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    didSwipe.current = false;
    startX.current = event.pointerType === 'touch' ? event.clientX : null;
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

  if (status !== 'ready' || !product) {
    const message =
      status === 'loading'
        ? 'Загрузка коллекции…'
        : status === 'error'
          ? 'Не удалось загрузить коллекцию'
          : 'Нет товаров сезона';

    return (
      <section className={styles.hero} aria-label="Коллекция сезона">
        <div className={styles.state}>{message}</div>
      </section>
    );
  }

  const nextProduct = products[(activeIndex + 1) % count];

  return (
    <section className={styles.hero} aria-labelledby="season-hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>ТОП-10 ковров и дорожек сезона</p>
          <h1 className={styles.title} id="season-hero-title">
            Новая коллекция ковров Venetta
          </h1>
        </div>

        <div
          className={styles.showcase}
          tabIndex={0}
          role="region"
          aria-label="Слайдер новинок сезона"
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div className={styles.rugs}>
            <Link
              className={`${styles.rugFrame} ${styles.activeRug}`}
              href={`/product/${product.slug}`}
              aria-label={`Подробнее: ${product.title}`}
              onClick={(event) => {
                if (didSwipe.current && event.detail > 0) {
                  event.preventDefault();
                  didSwipe.current = false;
                }
              }}
            >
              <Image
                key={product.id}
                className={styles.rug}
                src={product.image}
                alt={`${product.title} — ${product.category}, ${product.size}`}
                width={580}
                height={700}
                priority={activeIndex === 0}
              />
              <span className={styles.price}>
                {formatSeasonPrice(product.price)}
              </span>
            </Link>
            <Link
              className={`${styles.rugFrame} ${styles.nextRug}`}
              href={`/product/${nextProduct.slug}`}
              aria-label={`Следующий товар: ${nextProduct.title}`}
              tabIndex={-1}
            >
              <Image
                key={nextProduct.id}
                className={styles.rug}
                src={nextProduct.image}
                alt=""
                width={580}
                height={700}
              />
            </Link>
          </div>
          <div className={styles.dots} role="tablist" aria-label="Выбор товара">
            {products.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Товар ${index + 1}: ${item.title}`}
                className={index === activeIndex ? styles.dotActive : ''}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <div className={styles.productInfo} aria-live="polite">
            <span>{product.category} · {product.material}</span>
            <strong>{product.title}</strong>
            <span>{product.size}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link className={styles.primaryButton} href="/catalog">
            Смотреть каталог
          </Link>
          <div className={styles.controls}>
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Предыдущий товар"
            >
              ‹
            </button>
            <span>
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(count).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Следующий товар"
            >
              ›
            </button>
          </div>
        </div>

        <div className={styles.supporting}>
          <p className={styles.subtitle}>
            Текстиль, который меняет пространство
          </p>
          <p className={styles.description}>
            Собрали вещи, в которые влюбляются с первого взгляда. Листайте
            подборку и найдите свой идеальный фактурный акцент.
          </p>
          <p className={styles.meta}>
            {count} моделей <span /> Новая коллекция <span /> В наличии
          </p>
        </div>

        <div className={styles.services} aria-label="Услуги">
          <Link href="/contacts">
            <strong>Оверлок</strong>
            <span>Идеальный край за 1 день →</span>
          </Link>
          <Link href="/contacts">
            <strong>Реставрация</strong>
            <span>Вернём ковру характер →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
