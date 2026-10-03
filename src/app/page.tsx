import Link from "next/link";
import PremiumHero from "@/components/PremiumHero";
import ProductSlider from "@/components/ProductSlider";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <PremiumHero />
      <ProductStrip
        title="Товары из каталога"
        link="Все товары"
        products={PRODUCTS}
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
        </div>
        <ProductSlider products={products} />
      </div>
    </section>
  );
}
