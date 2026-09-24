import { Order } from "@/lib/store";

export const ORDER_STATUSES: Order["status"][] = [
  "Принят",
  "Собирается",
  "Передан в доставку",
  "Доставлен",
];

export default function OrderProgress({ status }: { status: Order["status"] }) {
  const currentStatus = ORDER_STATUSES.indexOf(status);

  return (
    <ol className="order-timeline">
      {ORDER_STATUSES.map((item, index) => (
        <li className={index <= currentStatus ? "is-complete" : ""} key={item}>
          <span>{index + 1}</span>
          <div>
            <strong>{item}</strong>
            {index === currentStatus && <p>Текущий статус заказа</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
