export default function PageHero({ title, crumbs }: { title?: string; crumbs: string }) {
  return <section className="page-hero"><div className="container">{title && <h1 className="page-hero__title">{title}</h1>}<div className="page-hero__crumbs">{crumbs}</div></div></section>;
}
