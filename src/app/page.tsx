import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <h1 className="hero__title">
              Новая коллекция
              <br />
              ковров Venetta
            </h1>
            <Link className="hero__button" href="/catalog">
              Смотреть все
            </Link>
          </div>
          <div className="hero__visual">
            <div className="hero__price">160.000 ₸</div>
            <img
              className="hero__rug"
              src="/assets/rug-navy.svg"
              alt="Ковер Venetta Navy"
            />
            <img
              className="hero__rug"
              src="/assets/rug-venetta.svg"
              alt="Ковер Venetta Cream"
            />
          </div>
        </div>
      </section>
      <ProductStrip
        title="Новинки"
        link="Все новинки"
        products={PRODUCTS.filter((p) => !p.oldPrice)}
      />
      <ProductStrip
        title="Скидки"
        link="Все скидки"
        products={PRODUCTS.filter((p) => p.oldPrice)}
      />
    </main>
  );
}
function ProductStrip({
  title,
  link,
  products,
}: {
  title: string;
  link: string;
  products: typeof PRODUCTS;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">{title}</h2>
          <Link className="section-heading__link" href="/catalog">
            {link}
          </Link>
          <div className="section-heading__controls">
            <button className="slider-button">‹</button>
            <button className="slider-button">›</button>
          </div>
        </div>
        <div className="product-track">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
