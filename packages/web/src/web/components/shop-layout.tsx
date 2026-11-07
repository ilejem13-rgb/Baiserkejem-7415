import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowUpRight,
  ArrowRight,
  ShoppingBag,
  Sun,
  Moon,
  Menu,
  X,
  Phone,
  MapPin,
  Wheat,
  Fish,
  Sprout,
  MessageCircle,
} from "lucide-react";
import { useShop, whatsapp } from "../lib/store";
import { text, type Key } from "../lib/i18n";
import { type Product, money, minimumPrice, findProduct } from "../lib/products";
export const categoryIcons = { food: Wheat, feed: Sprout, fish: Fish, cake: Sprout };
export function Brand() {
  const { t } = useShop();
  return (
    <Link href="/" className="brand" aria-label="BAISERKE JEM">
      <span className="brand-placeholder">
        BAISERKE<span>JEM</span>
      </span>
      <small>{t("tagline")}</small>
    </Link>
  );
}
const nav: [string, Key][] = [
  ["/catalog", "catalog"],
  ["/about", "about"],
  ["/wholesale", "wholesale"],
  ["/contacts", "contacts"],
];
export function Header() {
  const { t, lang, setLang, theme, toggleTheme, count } = useShop();
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => setOpen(false), [location]);
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            <MapPin size={13} />
            {t("location")}
          </span>
          <span>
            {t("hours")}
            <i />
            <a href="tel:+77778233371">
              <Phone size={13} />
              +7 777 823 33 71
            </a>
          </span>
        </div>
      </div>
      <header>
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav">
            {nav.map(([url, k]) => (
              <Link key={k} href={url} className={location.startsWith(url) ? "active" : ""}>
                {t(k)}
                {k === "catalog" && <span className="nav-caret">⌄</span>}
              </Link>
            ))}
          </nav>
          <div className="header-controls">
            <div className="languages" aria-label="Language">
              {(["ru", "kz", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={l === lang ? "selected" : ""}
                  aria-pressed={l === lang}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="icon-btn theme-btn" onClick={toggleTheme} aria-label={t("theme")}>
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <Link href="/cart" className="cart-btn" aria-label={`${t("cart")} (${count})`}>
              <ShoppingBag size={21} />
              <span>{count}</span>
            </Link>
            <button
              className="icon-btn mobile-toggle"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={t("menu")}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="mobile-nav">
            {[
              ["/", "home"],
              ...nav,
              ["/food", "food"],
              ["/feed", "feed"],
              ["/fish", "fish"],
              ["/reviews", "reviews"],
            ].map(([url, k]) => (
              <Link key={url} href={url}>
                {t(k as Key)}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
export function Footer() {
  const { t } = useShop();
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>{t("heroDesc")}</p>
          <a className="footer-wa" href={whatsapp()} target="_blank" rel="noreferrer">
            <MessageCircle size={19} />
            WhatsApp
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div>
          <h4>{t("nav")}</h4>
          {[["/", "home"], ...nav, ["/reviews", "reviews"]].map(([url, k]) => (
            <Link key={url} href={url}>
              {t(k as Key)}
            </Link>
          ))}
        </div>
        <div>
          <h4>{t("ourProducts")}</h4>
          {(["food", "feed", "fish"] as const).map((c) => (
            <Link key={c} href={"/" + c}>
              {t(c)}
            </Link>
          ))}
          <Link href="/catalog?category=cake">{t("cake")}</Link>
        </div>
        <div>
          <h4>{t("contacts")}</h4>
          <a href="tel:+77778233371">+7 777 823 33 71</a>
          <a href="mailto:ilejem13@gmail.com">ilejem13@gmail.com</a>
          <p>{t("location")}</p>
          <small>{t("hours")}</small>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 BAISERKE JEM. {t("rights")}</span>
        <Link href="/privacy">{t("privacy")}</Link>
        <span>{t("tagline")}</span>
      </div>
    </footer>
  );
}
export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { toast, t, lang } = useShop();
  useEffect(() => {
    const routeKeys: Record<string, Key> = {
      "/": "heroTitle",
      "/catalog": "catalog",
      "/food": "food",
      "/feed": "feed",
      "/fish": "fish",
      "/about": "about",
      "/reviews": "reviews",
      "/wholesale": "wholesale",
      "/contacts": "contacts",
      "/cart": "cart",
      "/success": "checkout",
      "/privacy": "privacyTitle",
    };
    const product = location.startsWith("/product/")
      ? findProduct(location.split("/")[2])
      : undefined;
    const title = product ? text(product.name, lang) : t(routeKeys[location] || "notFound");
    document.title = location === "/" ? title : `${title} — BAISERKE JEM`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", product ? text(product.description, lang) : t("heroDesc"));
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
  }, [location, lang, t]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.07 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location, children]);
  return (
    <>
      <a href="#main" className="skip-link">
        {t("details")}
      </a>
      <Header />
      <main id="main" key={location} className="page-enter">
        {children}
      </main>
      <Footer />
      {toast && (
        <output className="toast" aria-live="polite">
          <ShoppingBag size={20} />
          {toast}
          <Link href="/cart">
            <ArrowRight size={20} />
          </Link>
        </output>
      )}
    </>
  );
}
export function ProductCard({ product: p }: { product: Product }) {
  const { t, lang, add } = useShop();
  const min = minimumPrice(p);
  return (
    <article className="product-card">
      <Link href={"/product/" + p.id} className="product-image">
        <img src={p.image} alt={text(p.name, lang)} loading="lazy" />
        <span className="product-tag">{t(p.category)}</span>
        <span className="image-arrow">
          <ArrowUpRight size={19} />
        </span>
      </Link>
      <div className="product-info">
        <small>{p.id === "flour" ? "BAISERKE" : t(p.category)}</small>
        <Link href={"/product/" + p.id}>
          <h3>{text(p.name, lang)}</h3>
        </Link>
        <div className="product-bottom">
          <div className="price">
            {min === null ? (
              t("askPrice")
            ) : (
              <>
                {p.variants.length > 1 && <small>{t("from")} </small>}
                {money(min)}
              </>
            )}
            <span>{p.variants.length > 1 ? t("packaging") : text(p.variants[0].label, lang)}</span>
          </div>
          <button
            className="add-small"
            onClick={() => add(p.id, p.variants[0].id, 1)}
            aria-label={`${t("add")}: ${text(p.name, lang)}`}
          >
            <ShoppingBag size={18} />
            <span>+</span>
          </button>
        </div>
      </div>
    </article>
  );
}
export function CTA() {
  const { t } = useShop();
  return (
    <section className="cta">
      <div className="container cta-inner">
        <div>
          <small>{t("contactUs")}</small>
          <h2>{t("ctaTitle")}</h2>
          <p>{t("ctaDesc")}</p>
        </div>
        <a className="btn btn-light" href={whatsapp()} target="_blank" rel="noreferrer">
          {t("contactUs")}
          <ArrowUpRight size={20} />
        </a>
      </div>
    </section>
  );
}
export function PageIntro({
  title,
  kicker,
  description,
}: {
  title: string;
  kicker?: string;
  description?: string;
}) {
  const { t } = useShop();
  return (
    <section className="page-intro container">
      <div className="breadcrumbs">
        <Link href="/">{t("home")}</Link>
        <span>/</span>
        <span>{title}</span>
      </div>
      {kicker && <div className="eyebrow">{kicker}</div>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </section>
  );
}
export function Quantity({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const { t } = useShop();
  return (
    <div className="quantity">
      <button
        type="button"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        aria-label={`${t("quantity")} −`}
      >
        −
      </button>
      <input
        aria-label={t("quantity")}
        type="number"
        min="1"
        max="9999"
        value={value}
        onChange={(e) => onChange(Math.max(1, Math.min(9999, parseInt(e.target.value) || 1)))}
      />
      <button
        type="button"
        disabled={value >= 9999}
        onClick={() => onChange(value + 1)}
        aria-label={`${t("quantity")} +`}
      >
        +
      </button>
    </div>
  );
}
