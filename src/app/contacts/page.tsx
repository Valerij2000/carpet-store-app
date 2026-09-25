"use client";
import PageHero from "@/components/PageHero";
export default function Contacts() {
  return (
    <main>
      <PageHero title="Контакты и поддержка" crumbs="Главная / Контакты" />
      <div className="container product-detail contacts-layout">
        <div>
          <h2>Поможем подобрать ковер</h2>
          <p style={{ color: "#777", lineHeight: 1.8 }}>
            Позвоните нам или оставьте сообщение. Подскажем размер, материал,
            цвет и варианты доставки.
          </p>
          <div className="product-detail__info">
            <Row n="Телефон (осн)" v="+7 949 407 44 80" />
            <Row n="Телефон (доп)" v="+7 949 407 44 81" />
            <Row n="Email" v="kovry.makeevka@mail.ru" />
            <Row n="Город" v="Макеевка" />
            <Row n="Доставка" v="По РФ" />
          </div>
        </div>
        <form
          className="form-grid"
          onSubmit={(e) => {
            e.preventDefault();
            e.currentTarget.reset();
          }}
        >
          <Field label="Имя" />
          <Field label="Телефон" />
          <Field label="Сообщение" full area />
          <div className="form-field form-field--full">
            <button className="btn btn--primary">Отправить</button>
          </div>
        </form>
      </div>
    </main>
  );
}
function Row({ n, v }: { n: string; v: string }) {
  return (
    <div className="product-detail__row">
      <span>{n}</span>
      <span>{v}</span>
    </div>
  );
}
function Field({
  label,
  full,
  area,
}: {
  label: string;
  full?: boolean;
  area?: boolean;
}) {
  return (
    <div className={`form-field ${full ? "form-field--full" : ""}`}>
      <label>{label}</label>
      {area ? <textarea required /> : <input required />}
    </div>
  );
}
