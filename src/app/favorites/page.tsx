"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
export default function Favorites() { const [ids, setIds] = useState<number[]>([]); useEffect(() => { setIds(JSON.parse(localStorage.getItem("bayan-favorites") || "[]")); }, []); const products = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as typeof PRODUCTS; return <main><PageHero title="Избранное" crumbs="Главная / Избранное" /><section className="section" style={{ paddingBottom: 80 }}><div className="container"><div className="catalog-grid">{products.length ? products.map((p) => <ProductCard product={p} key={p.id} />) : <div className="empty" style={{ gridColumn: "1/-1" }}><div className="empty__icon">♡</div><h2>Избранное пусто</h2><p>Сохраняйте понравившиеся ковры, чтобы вернуться к ним позже.</p><Link className="btn btn--primary" href="/catalog">Перейти в каталог</Link></div>}</div></div></section></main>; }
