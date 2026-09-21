"use client";
import { useEffect, useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
export default function Catalog() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [sort, setSort] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("search") || "");
    setCategories(params.get("category") ? [params.get("category")!] : []);
  }, []);
  const toggle = (value: string, values: string[], set: (value: string[]) => void) => set(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  const products = useMemo(() => {
    const result = PRODUCTS.filter((product) => (!query || `${product.name} ${product.category} ${product.material}`.toLowerCase().includes(query.toLowerCase())) && (!categories.length || categories.includes(product.category)) && (!materials.length || materials.includes(product.material)));
    return [...result].sort((a, b) => sort === "cheap" ? a.price - b.price : sort === "expensive" ? b.price - a.price : sort === "name" ? a.name.localeCompare(b.name) : 0);
  }, [query, categories, materials, sort]);
  return <main><PageHero title="Каталог ковров" crumbs="Главная / Каталог" /><div className="container catalog-layout"><aside className="filters"><Filter title="Категория" values={["Ковры", "Коврики", "Особенные ковры"]} selected={categories} onChange={(v) => toggle(v, categories, setCategories)} /><Filter title="Материал" values={["Полипропилен", "Полиэстер", "Вискоза", "Шерсть"]} selected={materials} onChange={(v) => toggle(v, materials, setMaterials)} /></aside><section><div className="catalog-toolbar"><div className="catalog-toolbar__count">{products.length} товаров</div><div style={{ display: "flex", gap: 10, alignItems: "center" }}><input className="search__input" value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: 210, height: 35, border: "1px solid #ddd", padding: "0 10px" }} placeholder="Поиск в каталоге" /><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Сортировка"><option value="">По популярности</option><option value="cheap">Сначала дешевле</option><option value="expensive">Сначала дороже</option><option value="name">По названию</option></select></div></div><div className="catalog-grid">{products.map((product) => <ProductCard product={product} key={product.id} />)}</div></section></div></main>;
}
function Filter({ title, values, selected, onChange }: { title: string; values: string[]; selected: string[]; onChange: (value: string) => void }) { return <div className="filters__group"><div className="filters__title">{title}</div>{values.map((value) => <label key={value}><input type="checkbox" checked={selected.includes(value)} onChange={() => onChange(value)} /> {value}</label>)}</div>; }
