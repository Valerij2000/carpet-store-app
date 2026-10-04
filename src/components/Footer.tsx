"use client";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { phones } from "@/data/contacts";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="footer-col__title">Каталог товаров</div>
          {["Ковры", "Коврики", "Дорожки", "Для ванной", "Особенные ковры"].map(
            (x) => (
              <Link href="/catalog" key={x}>
                {x}
              </Link>
            ),
          )}
        </div>
        <div className="footer-col">
          <div className="footer-col__title">Личный кабинет</div>
          <Link href="/account">Личный кабинет</Link>
          <Link href="/cart">Мои заказы</Link>
          <Link href="/favorites">Избранное</Link>
        </div>
        <div className="footer-col">
          <div className="footer-col__title">Центр поддержки</div>
          <Link href="/contacts">Контакты</Link>
          <Link href="/contacts">Доставка</Link>
          <Link href="/contacts">Возвраты</Link>
        </div>
        <div className="footer-col">
          <div className="footer-col__title">Помощь и контакты</div>
          {phones.map(({ label, number, href }) => (
            <a href={href} key={label}>
              ☎ &nbsp; {number}
            </a>
          ))}
          <p>✉ &nbsp; kovry.makeevka@mail.ru</p>
          <SocialLinks />
        </div>
        <div className="footer-col">
          <div className="footer-col__title">Рассылка</div>
          <p>
            Подпишитесь, чтобы всегда
            <br />
            быть в курсе наших новинок
          </p>
          <form
            className="subscribe"
            onSubmit={(event) => {
              event.preventDefault();
              event.currentTarget.reset();
              alert("Спасибо! Подписка оформлена.");
            }}
          >
            <input type="email" required placeholder="Ваш email" />
            <button>➤</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
