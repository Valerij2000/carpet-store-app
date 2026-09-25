'use client';

import Image from 'next/image';
import Link from 'next/link';
import { KeyboardEvent, PointerEvent, useEffect, useRef, useState } from 'react';
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const startX = useRef<number | null>(null);
  const product = products[activeIndex];
  const count = products.length;

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, Math.max(count - 1, 0)));
  }, [count]);

  const handleSelect = (index: number) => setActiveIndex(index);
  const handlePrevious = () => setActiveIndex((index) => (index - 1 + count) % count);
  const handleNext = () => setActiveIndex((index) => (index + 1) % count);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - bounds.top) / bounds.height - 0.5) * -4,
      y: ((event.clientX - bounds.left) / bounds.width - 0.5) * 5,
    });
  };

  const handlePointerLeave = () => setTilt({ x: 0, y: 0 });
  const handleTouchStart = (event: PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX;
  };
  const handleTouchEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const distance = event.clientX - startX.current;
    if (Math.abs(distance) > 45) (distance > 0 ? handlePrevious : handleNext)();
    startX.current = null;
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') handlePrevious();
    if (event.key === 'ArrowRight') handleNext();
  };

  if (status === 'loading') {
    return <section className={styles.hero} aria-label="Хиты сезона"><div className={styles.state}>Загрузка коллекции…</div></section>;
  }
  if (status === 'error') {
    return <section className={styles.hero} aria-label="Хиты сезона"><div className={styles.state}>Не удалось загрузить коллекцию</div></section>;
  }
  if (status === 'empty' || !product) {
    return <section className={styles.hero} aria-label="Хиты сезона"><div className={styles.state}>Нет товаров сезона</div></section>;
  }

  return (
    <section className={styles.hero} aria-labelledby="season-hero-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}><span /> Хит сезона <b>{product.season}</b></p>
          <h1 className={styles.title} id="season-hero-title">ТОП-10 ковров<br /><em>и дорожек</em> сезона</h1>
          <p className={styles.subtitle}>Текстиль, который меняет пространство</p>
          <p className={styles.description}>Собрали вещи, в которые влюбляются с первого взгляда. Листайте подборку и найдите свой идеальный фактурный акцент.</p>
          <div className={styles.actions}>
            <Link className={styles.primaryButton} href="/catalog">Смотреть коллекцию <span>↗</span></Link>
            <Link className={styles.secondaryButton} href="/catalog">Все ковры</Link>
          </div>
          <p className={styles.meta}><span>{count} моделей</span><i /> Новая коллекция <i /> В наличии</p>
          <div className={styles.services} aria-label="Услуги">
            <Link href="/contacts"><strong>Оверлок</strong><span>идеальный край за 1 день&nbsp; →</span></Link>
            <Link href="/contacts"><strong>Реставрация</strong><span>вернём ковру характер&nbsp; →</span></Link>
          </div>
        </div>

        <div
          className={styles.showcase}
          tabIndex={0}
          role="region"
          aria-label="Карусель хитов сезона"
          onKeyDown={handleKeyDown}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handleTouchStart}
          onPointerUp={handleTouchEnd}
        >
          <div className={styles.showcaseTop}><span>SEASON EDIT</span><span>01 — {String(count).padStart(2, '0')}</span></div>
          <div className={styles.object} style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
            <div className={`${styles.floatLabel} ${styles.rank}`}>#{String(product.rank).padStart(2, '0')}<small>ТОП ПРОДАЖ</small></div>
            <div className={`${styles.floatLabel} ${styles.quality}`}>ТУРЕЦКОЕ<br />КАЧЕСТВО</div>
            <div className={styles.rugFrame}>
              <Image key={product.id} className={styles.rug} src={product.image} alt={`${product.title} — ${product.category}, ${product.size}`} width={580} height={420} priority={activeIndex === 0} />
              <span className={styles.reflection} />
            </div>
            <div className={`${styles.floatLabel} ${styles.size}`}>{product.size}</div>
          </div>
          <div className={styles.productInfo}>
            <div><p>{product.category} · {product.material}</p><h2>{product.title}</h2><span>{product.available ? 'В наличии' : 'Под заказ'}</span></div>
            <div className={styles.price}><strong>{formatSeasonPrice(product.price)}</strong><del>{formatSeasonPrice(product.oldPrice)}</del></div>
            <Link className={styles.detailButton} href={`/product/${product.slug}`} aria-label={`Подробнее о ковре ${product.title}`}>Подробнее <span>→</span></Link>
          </div>
          <div className={styles.controls}>
            <button type="button" onClick={handlePrevious} aria-label="Предыдущий товар">←</button>
            <div className={styles.progress} aria-hidden="true"><span style={{ width: `${((activeIndex + 1) / count) * 100}%` }} /></div>
            <button type="button" onClick={handleNext} aria-label="Следующий товар">→</button>
            <span className={styles.counter}>{String(activeIndex + 1).padStart(2, '0')} <i>/</i> {String(count).padStart(2, '0')}</span>
          </div>
          <div className={styles.dots} role="tablist" aria-label="Выбор товара">
            {products.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`Товар ${index + 1}: ${item.title}`} className={index === activeIndex ? styles.dotActive : ''} onClick={() => handleSelect(index)} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
