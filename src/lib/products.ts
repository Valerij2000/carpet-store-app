export type Product = {
  id: number;
  name: string;
  size: string;
  country: string;
  price: number;
  oldPrice: number | null;
  image: string;
  tag: string;
  material: string;
  category: string;
};

export const productSlug = (product: Product) =>
  `${product.id}-${product.name.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, "-").replace(/(^-|-$)/g, "")}`;

export const findProductBySlug = (slug: string | null) =>
  PRODUCTS.find((product) => productSlug(product) === slug);

export const PRODUCTS: Product[] = [
  { id: 1, name: "Aster Q893A LVIZON", size: "60x100", country: "Казахстан", price: 160000, oldPrice: null, image: "/assets/rug-blue.svg", tag: "Новинка", material: "Полипропилен", category: "Ковры" },
  { id: 2, name: "Venetta Q983A CREAM LVIZON", size: "60x100", country: "Казахстан", price: 100000, oldPrice: 160000, image: "/assets/rug-cream.svg", tag: "-20%", material: "Полипропилен", category: "Ковры" },
  { id: 3, name: "Venetta F059B CREAM NAVY", size: "60x100", country: "Казахстан", price: 100000, oldPrice: 160000, image: "/assets/rug-navy.svg", tag: "-20%", material: "Полипропилен", category: "Ковры" },
  { id: 4, name: "Venetta Q983B GREY", size: "80x150", country: "Казахстан", price: 125000, oldPrice: 155000, image: "/assets/rug-venetta.svg", tag: "-20%", material: "Полипропилен", category: "Ковры" },
  { id: 5, name: "Aster Classic BLUE", size: "80x150", country: "Турция", price: 185000, oldPrice: null, image: "/assets/rug-blue.svg", tag: "Новинка", material: "Полиэстер", category: "Коврики" },
  { id: 6, name: "Royal Cream Ornament", size: "100x150", country: "Турция", price: 220000, oldPrice: null, image: "/assets/rug-cream.svg", tag: "Новинка", material: "Вискоза", category: "Особенные ковры" },
  { id: 7, name: "Venetta F059B NAVY", size: "120x180", country: "Узбекистан", price: 195000, oldPrice: null, image: "/assets/rug-navy.svg", tag: "Новинка", material: "Полипропилен", category: "Ковры" },
  { id: 8, name: "Aster Vintage GREY", size: "120x180", country: "Иран", price: 175000, oldPrice: 210000, image: "/assets/rug-venetta.svg", tag: "-20%", material: "Шерсть", category: "Особенные ковры" },
];

export const money = (value: number) =>
  `${new Intl.NumberFormat("ru-RU").format(value)} ₸`;

export const findProduct = (id: string | number | null) =>
  PRODUCTS.find((product) => product.id === Number(id));
