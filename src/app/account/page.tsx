'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { useSearchParams } from 'next/navigation'
import PageHero from '@/components/PageHero'
import OrderProgress from '@/components/OrderProgress'
import { findProduct, money } from '@/lib/products'
import {
  Address,
  Order,
  PaymentMethod,
  readAddresses,
  readOrders,
  readPayments,
  readProfile,
  saveAddress,
  savePayment,
  saveProfile,
  UserProfile,
} from '@/lib/store'

const sections = [
  ['orders', 'Мои заказы'],
  ['info', 'Моя информация'],
  ['addresses', 'Адресная книга'],
  ['payments', 'Способы оплаты'],
] as const

export default function Account() {
  const section = useSearchParams().get('section') || 'orders'
  const [order, setOrder] = useState<Order | null>(null)
  const [profile, setProfile] = useState<UserProfile>({ firstName: '', lastName: '', email: '', phone: '', birthDate: '' })
  const [addresses, setAddresses] = useState<Address[]>([])
  const [payments, setPayments] = useState<PaymentMethod[]>([])

  useEffect(() => {
    const refresh = () => {
      setOrder(readOrders()[0] || null)
      setProfile(readProfile())
      setAddresses(readAddresses())
      setPayments(readPayments())
    }
    refresh()
    window.addEventListener('bayan-store-update', refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener('bayan-store-update', refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Гость'
  const initials = fullName === 'Гость' ? 'Г' : fullName.split(' ').map((name) => name[0]).join('').slice(0, 2)

  return (
    <main>
      <PageHero title="Личный кабинет" crumbs="Главная / Личный кабинет" />
      <div className="container account-layout">
        <aside className="account-sidebar">
          <div className="account-profile">
            <div className="account-profile__avatar">{initials}</div>
            <div><span>Здравствуйте,</span><strong>{fullName}</strong></div>
          </div>
          <nav className="account-menu" aria-label="Разделы личного кабинета">
            {sections.map(([id, label]) => (
              <Link className={`account-menu__link ${section === id ? 'is-active' : ''}`} href={`/account?section=${id}`} key={id}>{label}</Link>
            ))}
          </nav>
        </aside>
        <section className="account-orders">
          {section === 'info' && <InfoForm profile={profile} onSave={saveProfile} />}
          {section === 'addresses' && <AddressBook addresses={addresses} />}
          {section === 'payments' && <Payments payments={payments} />}
          {section === 'orders' && <Orders order={order} />}
        </section>
      </div>
    </main>
  )
}

function Orders({ order }: { order: Order | null }) {
  return <>
    <h1>Мои заказы</h1>
    {order ? <article className="account-order">
      <header className="account-order__header"><div><strong>Заказ от {new Date(order.createdAt).toLocaleDateString('ru-RU')}</strong><span>{order.id}</span></div><strong>{money(order.total)}</strong></header>
      <div className="account-order__status"><span>Статус заказа:</span><b>{order.status}</b></div>
      <OrderProgress status={order.status} />
      <div className="account-order__items">{order.items.map((item) => {
        const product = findProduct(item.id)
        return product ? <div className="account-order__item" key={item.id}><img src={product.image} alt={product.name} /><span>{product.name} × {item.quantity}</span></div> : null
      })}</div>
      <Link className="btn btn--primary account-order__link" href={`/order/${order.id}`}>Отследить заказ</Link>
    </article> : <div className="empty"><h2>Активных заказов нет</h2><p>После оформления здесь появится текущий заказ и его статус.</p><Link className="btn btn--primary" href="/catalog">Перейти в каталог</Link></div>}
  </>
}

function InfoForm({ profile, onSave }: { profile: UserProfile; onSave: (profile: UserProfile) => void }) {
  const [form, setForm] = useState(profile)
  const update = (key: keyof UserProfile, value: string) => setForm({ ...form, [key]: value })
  return <form className="account-form" onSubmit={(event) => { event.preventDefault(); onSave(form) }}>
    <h1>Моя информация</h1>
    <div className="form-grid"><AccountField label="Имя" value={form.firstName} onChange={(value) => update('firstName', value)} required />
      <AccountField label="Фамилия" value={form.lastName} onChange={(value) => update('lastName', value)} />
      <AccountField label="Адрес электронной почты" type="email" value={form.email} onChange={(value) => update('email', value)} />
      <AccountField label="Номер телефона" value={form.phone} onChange={(value) => update('phone', value)} />
      <AccountField label="Дата рождения" type="date" value={form.birthDate} onChange={(value) => update('birthDate', value)} />
    </div><button className="btn btn--primary" type="submit">Сохранить изменения</button>
  </form>
}

function AddressBook({ addresses }: { addresses: Address[] }) {
  const [form, setForm] = useState({ street: '', city: '', region: '', postalCode: '' })
  const update = (key: keyof typeof form, value: string) => setForm({ ...form, [key]: value })
  return <div className="account-form"><h1>Адресная книга</h1>
    {addresses.length > 0 && <div className="saved-items">{addresses.map((address) => <div className="saved-item" key={address.id}><strong>{address.city}</strong><span>{address.street}, {address.region}, {address.postalCode}</span></div>)}</div>}
    <form onSubmit={(event) => { event.preventDefault(); saveAddress(form); setForm({ street: '', city: '', region: '', postalCode: '' }) }}>
      <div className="form-grid"><AccountField label="Улица, номер дома, квартира" value={form.street} onChange={(value) => update('street', value)} required /><AccountField label="Город" value={form.city} onChange={(value) => update('city', value)} required /><AccountField label="Регион" value={form.region} onChange={(value) => update('region', value)} /><AccountField label="Почтовый индекс" value={form.postalCode} onChange={(value) => update('postalCode', value)} /></div>
      <button className="btn btn--primary" type="submit">Сохранить адрес</button>
    </form>
  </div>
}

function Payments({ payments }: { payments: PaymentMethod[] }) {
  const [form, setForm] = useState({ last4: '', holder: '' })
  return <div className="account-form"><h1>Способы оплаты</h1>
    {payments.length > 0 && <div className="saved-items">{payments.map((payment) => <div className="saved-item" key={payment.id}><strong>Банковская карта •••• {payment.last4}</strong><span>{payment.holder}</span></div>)}</div>}
    <form onSubmit={(event) => { event.preventDefault(); savePayment({ ...form, type: 'card' }); setForm({ last4: '', holder: '' }) }}><div className="form-grid"><AccountField label="Последние 4 цифры карты" value={form.last4} maxLength={4} inputMode="numeric" onChange={(value) => setForm({ ...form, last4: value.replace(/\D/g, '').slice(0, 4) })} required /><AccountField label="Имя держателя карты" value={form.holder} onChange={(value) => setForm({ ...form, holder: value })} required /></div><button className="btn btn--primary" type="submit">Сохранить карту</button></form>
  </div>
}

function AccountField({ label, value, onChange, ...props }: { label: string; value: string; onChange: (value: string) => void } & InputHTMLAttributes<HTMLInputElement>) {
  return <div className="form-field"><label>{label}</label><input {...props} value={value} onChange={(event) => onChange(event.target.value)} /></div>
}
