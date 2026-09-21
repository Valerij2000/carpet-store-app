export function Icon({ name }: { name: "search" | "user" | "heart" | "cart" | "pin" }) {
  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.8" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m16 16 5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>,
    user: <><circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.5" /></>,
    heart: <path d="M20.8 8.6c0 5.2-8.8 10.3-8.8 10.3S3.2 13.8 3.2 8.6C3.2 5.8 5.2 4 7.8 4c1.7 0 3.3.9 4.2 2.3C12.9 4.9 14.5 4 16.2 4c2.6 0 4.6 1.8 4.6 4.6Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
    cart: <><path d="M3 4h2l2.1 11.2h10.8L20 7H6.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.2" fill="currentColor" /><circle cx="17" cy="20" r="1.2" fill="currentColor" /></>,
    pin: <><path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11Z" fill="none" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="1.7" /></>,
  }[name];
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths}</svg>;
}
