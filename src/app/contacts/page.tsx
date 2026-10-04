"use client";

import { useState, type FormEvent } from "react";
import PageHero from "@/components/PageHero";
import SocialLinks from "@/components/SocialLinks";
import { phones } from "@/data/contacts";

type SubmissionStatus = {
  type: "success" | "error" | "sending";
  message: string;
} | null;

export default function Contacts() {
  const [status, setStatus] = useState<SubmissionStatus>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ type: "sending", message: "Отправляем заявку…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });
      const result: { message: string } = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: result.message });
        return;
      }

      form.reset();
      setStatus({ type: "success", message: result.message });
    } catch {
      setStatus({
        type: "error",
        message: "Не удалось отправить заявку. Проверьте подключение и попробуйте ещё раз.",
      });
    }
  };

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
            {phones.map(({ label, number, href }) => (
              <Row key={label} n={label} v={number} href={href} />
            ))}
            <Row n="Email" v="kovry.makeevka@mail.ru" />
            <Row n="Город" v="Макеевка" />
            <Row n="Доставка" v="По РФ" />
          </div>
          <h3>Мы в социальных сетях</h3>
          <SocialLinks />
        </div>
        <form className="form-grid" onSubmit={handleSubmit}>
          <Field label="Имя" name="name" autoComplete="name" />
          <Field
            label="Телефон"
            name="phone"
            type="tel"
            autoComplete="tel"
          />
          <Field label="Сообщение" name="message" full area />
          <div className="form-field form-field--full">
            <button
              className="btn btn--primary"
              type="submit"
              disabled={status?.type === "sending"}
            >
              {status?.type === "sending" ? "Отправляем…" : "Отправить заявку"}
            </button>
            {status && (
              <p
                className={`contact-form__status contact-form__status--${status.type}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

function Row({ n, v, href }: { n: string; v: string; href?: string }) {
  return (
    <div className="product-detail__row">
      <span>{n}</span>
      {href ? <a href={href}>{v}</a> : <span>{v}</span>}
    </div>
  );
}

function Field({
  label,
  name,
  full,
  area,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  full?: boolean;
  area?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;

  return (
    <div className={`form-field ${full ? "form-field--full" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {area ? (
        <textarea id={id} name={name} required maxLength={3000} />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required
          maxLength={name === "name" ? 100 : 40}
        />
      )}
    </div>
  );
}
