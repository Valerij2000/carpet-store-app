export const runtime = "nodejs";

const recipient = "valery.shumkov@mail.ru";

type ContactRequest = {
  name: string;
  phone: string;
  message: string;
};

const isContactRequest = (value: unknown): value is ContactRequest => {
  if (typeof value !== "object" || value === null) return false;

  const request = value as Record<string, unknown>;
  return (
    typeof request.name === "string" &&
    typeof request.phone === "string" &&
    typeof request.message === "string"
  );
};

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "Не удалось прочитать заявку. Проверьте данные и попробуйте ещё раз." },
      { status: 400 },
    );
  }

  if (!isContactRequest(body)) {
    return Response.json(
      { message: "Заполните имя, телефон и сообщение." },
      { status: 400 },
    );
  }

  const name = body.name.trim();
  const phone = body.phone.trim();
  const message = body.message.trim();

  if (
    !name ||
    name.length > 100 ||
    !phone ||
    phone.length > 40 ||
    phone.replace(/\D/g, "").length < 5 ||
    !message ||
    message.length > 3000
  ) {
    return Response.json(
      { message: "Проверьте имя, телефон и сообщение. Некоторые поля заполнены неверно." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error("Contact form email is not configured: missing Resend environment variables.");
    return Response.json(
      { message: "Форма временно недоступна. Пожалуйста, позвоните нам." },
      { status: 503 },
    );
  }

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        subject: "Новая заявка с сайта CarpetStore",
        text: `Имя: ${name}\nТелефон: ${phone}\n\nСообщение:\n${message}`,
        html: `<p><strong>Имя:</strong> ${safeName}</p><p><strong>Телефон:</strong> ${safePhone}</p><p><strong>Сообщение:</strong><br>${safeMessage}</p>`,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Resend rejected a contact form email with status:", response.status);
      return Response.json(
        { message: "Не удалось отправить заявку. Попробуйте позже или позвоните нам." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Resend request failed while sending a contact form email:", error);
    return Response.json(
      { message: "Сервис отправки временно недоступен. Попробуйте позже или позвоните нам." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Заявка отправлена. Мы скоро с вами свяжемся." });
}
