export type SeasonHit = {
  id: number;
  rank: number;
  title: string;
  category: string;
  size: string;
  price: number;
  oldPrice: number;
  image: string;
  material: string;
  badge: string;
  season: string;
  available: boolean;
  slug: string;
};

export const seasonHits: SeasonHit[] = [
  { id: 1, rank: 1, title: 'Royal', category: 'Ковер', size: '2.5 × 3.5 м', price: 24990, oldPrice: 29990, image: '/assets/rug-cream.png', material: 'Войлок', badge: 'ХИТ', season: '2026', available: true, slug: '6-royal-cream-ornament' },
  { id: 2, rank: 2, title: 'Aster Blue', category: 'Ковер', size: '2 × 3 м', price: 21990, oldPrice: 26990, image: '/assets/rug-blue.png', material: 'Полипропилен', badge: 'ХИТ', season: '2026', available: true, slug: '1-aster-q893a-lvizon' },
  { id: 3, rank: 3, title: 'Venetta Navy', category: 'Дорожка', size: '0.8 × 2.5 м', price: 18990, oldPrice: 22990, image: '/assets/rug-navy.png', material: 'Полипропилен', badge: 'ХИТ', season: '2026', available: true, slug: '3-venetta-f059b-cream-navy' },
  { id: 4, rank: 4, title: 'Venetta Grey', category: 'Ковер', size: '1.6 × 2.3 м', price: 27990, oldPrice: 32990, image: '/assets/rug-venetta.png', material: 'Полиэстер', badge: 'ХИТ', season: '2026', available: true, slug: '4-venetta-q983b-grey' },
  { id: 5, rank: 5, title: 'Aster Classic', category: 'Ковер', size: '1.6 × 2.3 м', price: 29990, oldPrice: 34990, image: '/assets/rug-blue.svg', material: 'Полиэстер', badge: 'ХИТ', season: '2026', available: true, slug: '5-aster-classic-blue' },
  { id: 6, rank: 6, title: 'Cream Ornament', category: 'Ковер', size: '2 × 3 м', price: 31990, oldPrice: 37990, image: '/assets/rug-cream.svg', material: 'Вискоза', badge: 'ХИТ', season: '2026', available: true, slug: '6-royal-cream-ornament' },
  { id: 7, rank: 7, title: 'Deep Navy', category: 'Дорожка', size: '0.8 × 3 м', price: 19990, oldPrice: 23990, image: '/assets/rug-navy.svg', material: 'Полипропилен', badge: 'ХИТ', season: '2026', available: true, slug: '7-venetta-f059b-navy' },
  { id: 8, rank: 8, title: 'Vintage Grey', category: 'Ковер', size: '2 × 3 м', price: 28990, oldPrice: 33990, image: '/assets/rug-venetta.svg', material: 'Шерсть', badge: 'ХИТ', season: '2026', available: true, slug: '8-aster-vintage-grey' },
  { id: 9, rank: 9, title: 'Soft Sand', category: 'Ковер', size: '1.6 × 2.3 м', price: 25990, oldPrice: 30990, image: '/assets/rug-cream.png', material: 'Войлок', badge: 'ХИТ', season: '2026', available: true, slug: '2-venetta-q983a-cream-lvizon' },
  { id: 10, rank: 10, title: 'Blue Heritage', category: 'Ковер', size: '2 × 3 м', price: 33990, oldPrice: 39990, image: '/assets/rug-blue.png', material: 'Шерсть', badge: 'ХИТ', season: '2026', available: true, slug: '1-aster-q893a-lvizon' },
];

export const formatSeasonPrice = (value: number) =>
  `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
