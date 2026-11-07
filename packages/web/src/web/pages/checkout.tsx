import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import {
  ShoppingBag,
  ArrowUpRight,
  Trash2,
  Truck,
  Check,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { useShop, whatsapp, makeOrder, type Customer } from "../lib/store";
import { findProduct, money } from "../lib/products";
import { text } from "../lib/i18n";
import { PageIntro, Quantity } from "../components/shop-layout";
// Kept only in memory; no customer data is persisted to browser storage.
let latestDraft = "";
export function Cart() {
  const { t, lang, cart, update } = useShop();
  const [, navigate] = useLocation();
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    city: "",
    comment: "",
    method: "delivery",
  });
  const entries = cart.map((i) => {
    const p = findProduct(i.productId)!;
    const v = p.variants.find((v) => v.id === i.variantId)!;
    return { i, p, v };
  });
  const subtotal = entries.reduce(
    (sum, { i, v }) => sum + (v.price === null ? 0 : v.price * i.quantity),
    0,
  );
  const unknown = entries.some(({ v }) => v.price === null);
  const field = (key: keyof Customer, value: string) =>
    setCustomer((c) => ({ ...c, [key]: value }));
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    latestDraft = makeOrder(cart, lang, customer);
    window.open(whatsapp(latestDraft), "_blank", "noopener,noreferrer");
    navigate("/success");
  }
  if (!cart.length)
    return (
      <>
        <PageIntro title={t("cart")} />
        <section className="container empty-state">
          <ShoppingBag size={55} />
          <h2>{t("emptyCart")}</h2>
          <p>{t("emptyCartDesc")}</p>
          <Link href="/catalog" className="btn btn-orange">
            {t("openCatalog")}
            <ArrowUpRight size={19} />
          </Link>
        </section>
      </>
    );
  return (
    <>
      <PageIntro title={t("cart")} kicker="BAISERKE JEM" />
      <section className="container checkout-layout">
        <div className="cart-products">
          {entries.map(({ i, p, v }) => (
            <article className="cart-item" key={p.id + v.id}>
              <Link href={"/product/" + p.id}>
                <img src={p.image} alt={text(p.name, lang)} />
              </Link>
              <div className="cart-item-content">
                <Link href={"/product/" + p.id}>
                  <h3>{text(p.name, lang)}</h3>
                </Link>
                <small>{text(v.label, lang)}</small>
                <div className="cart-item-actions">
                  <Quantity value={i.quantity} onChange={(n) => update(p.id, v.id, n)} />
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`${t("remove")}: ${text(p.name, lang)}`}
                    onClick={() => update(p.id, v.id, 0)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="cart-item-price">
                {v.price === null ? t("askPrice") : money(v.price * i.quantity)}
                {v.price !== null && (
                  <small>
                    {money(v.price)} × {i.quantity}
                  </small>
                )}
              </div>
            </article>
          ))}
          <div className="cart-summary">
            <span>{t("subtotal")}</span>
            <strong>{subtotal ? money(subtotal) : t("quoteOnly")}</strong>
          </div>
          {unknown && <div className="notice">{t("unknownNote")}</div>}
          <div className="delivery-callout">
            <Truck size={24} />
            <div>
              <b>{t("deliveryKz")}</b>
              <p>{t("deliveryDesc")}</p>
            </div>
          </div>
          <Link className="text-link" href="/catalog">
            {t("continue")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <form className="checkout-form" onSubmit={submit}>
          <div className="eyebrow">{t("checkout")}</div>
          <h2>{t("contactUs")}</h2>
          <fieldset className="delivery-options">
            <legend>{t("delivery")}</legend>
            {(["delivery", "pickup"] as const).map((m) => (
              <label key={m} className={customer.method === m ? "selected" : ""}>
                <input
                  aria-label={t(m)}
                  type="radio"
                  name="method"
                  value={m}
                  checked={customer.method === m}
                  onChange={() => field("method", m)}
                />
                {t(m)}
              </label>
            ))}
          </fieldset>
          <label className="field">
            <span>{t("name")} *</span>
            <input
              aria-label={t("name")}
              required
              value={customer.name}
              maxLength={100}
              onChange={(e) => field("name", e.target.value)}
              autoComplete="name"
            />
          </label>
          <label className="field">
            <span>{t("phone")} *</span>
            <input
              aria-label={t("phone")}
              required
              type="tel"
              pattern={"\\+?[0-9](?:[0-9]| |\\(|\\)|-){5,24}"}
              value={customer.phone}
              maxLength={25}
              placeholder="+7 ___ ___ __ __"
              onChange={(e) => field("phone", e.target.value)}
              autoComplete="tel"
            />
          </label>
          {customer.method === "delivery" && (
            <label className="field">
              <span>{t("city")} *</span>
              <input
                aria-label={t("city")}
                required
                value={customer.city}
                maxLength={250}
                onChange={(e) => field("city", e.target.value)}
                autoComplete="street-address"
              />
            </label>
          )}
          <label className="field">
            <span>{t("comment")}</span>
            <textarea
              aria-label={t("comment")}
              value={customer.comment}
              rows={3}
              maxLength={1000}
              onChange={(e) => field("comment", e.target.value)}
            />
          </label>
          <label className="consent">
            <input type="checkbox" required aria-label={`${t("consent")} ${t("privacy")}`} />
            <span>
              {t("consent")}{" "}
              <Link href="/privacy" target="_blank">
                {t("privacy")}
              </Link>{" "}
              *
            </span>
          </label>
          <button className="btn btn-orange" type="submit">
            {t("submit")}
            <ArrowUpRight size={19} />
          </button>
          <p className="source-note">
            <ShieldCheck size={16} />
            {t("waNote")}
          </p>
        </form>
      </section>
    </>
  );
}
export function Success() {
  const { t } = useShop();
  if (!latestDraft)
    return (
      <section className="container success-page">
        <div className="success-icon">
          <ShoppingBag size={40} />
        </div>
        <h1>{t("checkout")}</h1>
        <p>{t("draftExpired")}</p>
        <Link className="btn btn-orange" href="/cart" style={{ marginTop: 28 }}>
          {t("cart")}
          <ArrowUpRight size={19} />
        </Link>
      </section>
    );
  return (
    <section className="container success-page">
      <div className="success-icon">
        <Check size={44} />
      </div>
      <div className="eyebrow">BAISERKE JEM / WHATSAPP</div>
      <h1>{t("success")}</h1>
      <p>{t("successDesc")}</p>
      <div className="success-steps">
        <div>
          <span>01</span>
          <MessageCircle size={25} />
          <b>{t("reopen")}</b>
        </div>
        <div>
          <span>02</span>
          <Check size={25} />
          <b>{t("waNote")}</b>
        </div>
      </div>
      <a className="btn btn-orange" href={whatsapp(latestDraft)} target="_blank" rel="noreferrer">
        {t("reopen")}
        <ArrowUpRight size={19} />
      </a>
      <Link className="text-link" href="/catalog">
        {t("continue")}
        <ArrowUpRight size={19} />
      </Link>
    </section>
  );
}
