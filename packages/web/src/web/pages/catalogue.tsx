import { useState } from "react";
import { Link, useParams, useSearch, useLocation } from "wouter";
import { Search, ArrowUpRight, ShoppingBag, Truck } from "lucide-react";
import { products, findProduct, money, type Category } from "../lib/products";
import { text } from "../lib/i18n";
import { useShop, whatsapp, makeOrder } from "../lib/store";
import { PageIntro, ProductCard, Quantity, CTA } from "../components/shop-layout";
export function Catalogue({ division }: { division?: "food" | "feed" | "fish" }) {
  const { t, lang } = useShop();
  const search = useSearch();
  const [, navigate] = useLocation();
  const getCategory = () => {
    const initial = new URLSearchParams(search).get("category");
    const allowed =
      division === "feed"
        ? ["feed", "cake"]
        : division
          ? [division]
          : ["all", "food", "feed", "fish", "cake"];
    return initial && allowed.includes(initial) ? initial : division || "all";
  };
  const category = getCategory();
  const selectCategory = (c: string) => {
    navigate(`${division ? "/" + division : "/catalog"}${c === "all" ? "" : "?category=" + c}`);
  };
  const [query, setQuery] = useState("");
  const base = products.filter(
    (p) => !division || p.category === division || (division === "feed" && p.category === "cake"),
  );
  const visible = base.filter(
    (p) =>
      (category === "all" ||
        p.category === category ||
        (category === "feed" && division === "feed" && p.category === "cake")) &&
      text(p.name, lang).toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  return (
    <>
      <PageIntro
        title={t(division || "catalog")}
        kicker={t("ourProducts")}
        description={t(
          division
            ? division === "food"
              ? "foodDesc"
              : division === "feed"
                ? "feedDesc"
                : "fishDesc"
            : "directionDesc",
        )}
      />
      <section className="container catalogue-section">
        <div className="catalogue-tools">
          <div className="filter-tabs">
            {(division === "food" || division === "fish"
              ? [division]
              : division === "feed"
                ? ["feed", "cake"]
                : ["all", "food", "feed", "cake", "fish"]
            ).map((c) => (
              <button
                key={c}
                onClick={() => selectCategory(c)}
                className={c === category ? "active" : ""}
              >
                {t(c as "all" | Category)}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={19} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search")}
              aria-label={t("search")}
            />
          </label>
        </div>
        <div className="result-count">
          {String(visible.length).padStart(2, "0")} / {t("results")}
          <span>{t("priceNote")}</span>
        </div>
        {visible.length ? (
          <div className="product-grid catalogue-grid">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={44} />
            <h2>{t("noResults")}</h2>
            <button
              className="btn btn-orange"
              onClick={() => {
                setQuery("");
                selectCategory(division || "all");
              }}
            >
              {t("reset")}
            </button>
          </div>
        )}
      </section>
      <CTA />
    </>
  );
}
export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const p = findProduct(id);
  const { t, lang, add } = useShop();
  const [variantId, setVariantId] = useState(p?.variants[0].id || "");
  const [n, setN] = useState(1);
  if (!p) return <PageIntro title={t("notFound")} />;
  const variant = p.variants.find((v) => v.id === variantId) || p.variants[0];
  return (
    <>
      <div className="container product-page">
        <div className="breadcrumbs">
          <Link href="/catalog">{t("catalog")}</Link>
          <span>/</span>
          <Link href={"/" + (p.category === "cake" ? "feed" : p.category)}>{t(p.category)}</Link>
          <span>/</span>
          <span>{text(p.name, lang)}</span>
        </div>
        <div className="product-detail">
          <div className="detail-photo">
            <img src={p.image} alt={text(p.name, lang)} />
            <span>{t(p.category)}</span>
            <p>{t("illustration")}</p>
          </div>
          <div className="detail-content">
            <div className="eyebrow">BAISERKE JEM / {t(p.category)}</div>
            <h1>{text(p.name, lang)}</h1>
            <p className="detail-description">{text(p.description, lang)}</p>
            <div className="detail-price">
              {variant.price === null ? t("askPrice") : money(variant.price)}
              <small>{t("packUnit")}</small>
            </div>
            <label className="field">
              <span>{t("packaging")}</span>
              <select value={variant.id} onChange={(e) => setVariantId(e.target.value)}>
                {p.variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {text(v.label, lang)}
                    {v.price === null ? "" : ` — ${money(v.price)}`}
                  </option>
                ))}
              </select>
            </label>
            {p.category === "fish" && <p className="source-note">{t("freshness")}</p>}
            <div className="product-order">
              <div>
                <label>{t("quantity")}</label>
                <Quantity value={n} onChange={setN} />
              </div>
              <button className="btn btn-orange" onClick={() => add(p.id, variant.id, n)}>
                <ShoppingBag size={19} />
                {t("add")}
              </button>
            </div>
            <a
              className="btn btn-whatsapp"
              href={whatsapp(
                makeOrder([{ productId: p.id, variantId: variant.id, quantity: n }], lang),
              )}
              target="_blank"
              rel="noreferrer"
            >
              {t("orderWa")}
              <ArrowUpRight size={19} />
            </a>
            <div className="delivery-callout">
              <Truck size={23} />
              <div>
                <b>{t("deliveryKz")}</b>
                <p>{t("deliveryDesc")}</p>
              </div>
            </div>
            <p className="source-note">
              {t("priceNote")} {t("availability")}
            </p>
          </div>
        </div>
      </div>
      <section className="section container">
        <div className="section-heading">
          <h2>{t("related")}</h2>
          <Link href="/catalog" className="text-link">
            {t("allProducts")}
            <ArrowUpRight size={19} />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((x) => x.category === p.category && x.id !== p.id)
            .slice(0, 4)
            .map((x) => (
              <ProductCard key={x.id} product={x} />
            ))}
        </div>
      </section>
    </>
  );
}
