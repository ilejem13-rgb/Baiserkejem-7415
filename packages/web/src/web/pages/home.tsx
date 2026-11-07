import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Wheat,
  Sprout,
  Fish,
  ShieldCheck,
  Truck,
  Quote,
} from "lucide-react";
import { useShop, whatsapp } from "../lib/store";
import { products } from "../lib/products";
import { ProductCard, CTA } from "../components/shop-layout";
export default function Home() {
  const { t, lang } = useShop();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % 3), 8000);
    return () => clearInterval(id);
  }, [paused]);
  const slides = [
    { image: "hero", title: t("heroTitle"), description: t("heroDesc"), url: "/catalog" },
    { image: "hen", title: t("hero2"), description: t("hero2desc"), url: "/feed" },
    { image: "sunflower", title: t("hero3"), description: t("hero3desc"), url: "/food" },
  ];
  const cards = [
    { id: "food", image: "flour", icon: Wheat, count: "05", desc: t("foodDesc") },
    { id: "feed", image: "feed", icon: Sprout, count: "07", desc: t("feedDesc") },
    { id: "fish", image: "fish", icon: Fish, count: "09", desc: t("fishDesc") },
  ] as const;
  return (
    <>
      <section className="hero" aria-roledescription="carousel" aria-label={t("ourProducts")}>
        <div className="hero-images">
          {slides.map((s, i) => (
            <img
              key={s.image}
              className={i === slide ? "active" : ""}
              src={"/images/" + s.image + ".jpg"}
              alt=""
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          ))}
        </div>
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-eyebrow">
            <span />
            {t("tagline")}
            <i />
            {t("since")}
          </div>
          <div key={slide} className="hero-copy">
            <h1>
              {slide === 0 ? (
                <>
                  <span className="hero-brand">BAISERKE JEM</span>
                  <span>
                    {lang === "ru" ? "Качество," : lang === "kz" ? "Уақытпен" : "Quality that"}
                  </span>
                  <span>
                    {lang === "ru" ? "проверенное" : lang === "kz" ? "дәлелденген" : "stands the"}
                  </span>
                  <span className="hero-emphasis">
                    {lang === "ru" ? "временем." : lang === "kz" ? "сапа." : "test of time."}
                  </span>
                </>
              ) : (
                slides[slide].title
              )}
            </h1>
            <p>{slides[slide].description}</p>
            <div className="hero-actions">
              <Link className="btn btn-orange" href={slides[slide].url}>
                {t("openCatalog")}
                <ArrowUpRight size={20} />
              </Link>
              <a className="btn btn-outline" href={whatsapp()} target="_blank" rel="noreferrer">
                {t("contactUs")}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-side-label">BAISERKE JEM · KAZAKHSTAN</div>
        <div className="container hero-bottom">
          <div className="slide-indicators">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setSlide(i);
                  setPaused(true);
                }}
                className={slide === i ? "active" : ""}
                aria-label={`${i + 1}. ${slides[i].title}`}
                aria-pressed={slide === i}
              >
                <span>0{i + 1}</span>
                <i />
              </button>
            ))}
          </div>
          <div className="hero-controls">
            <button
              onClick={() => {
                setSlide((slide + 2) % 3);
                setPaused(true);
              }}
              aria-label={t("previous")}
            >
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => setPaused(!paused)} aria-label={t(paused ? "play" : "pause")}>
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button
              onClick={() => {
                setSlide((slide + 1) % 3);
                setPaused(true);
              }}
              aria-label={t("next")}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
      <div className="trust-strip">
        <div className="container trust-inner">
          <span>
            <Wheat size={22} />
            {t("producer")}
          </span>
          <span>
            <ShieldCheck size={22} />
            {t("since")}
          </span>
          <span>
            <Truck size={22} />
            {t("deliveryKz")}
          </span>
          <span className="trust-last">
            {t("productCount")}
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
      <section className="section container">
        <div className="section-heading reveal">
          <div>
            <div className="eyebrow">01 / {t("ourProducts")}</div>
            <h2>{t("directions")}</h2>
          </div>
          <p>{t("directionDesc")}</p>
        </div>
        <div className="directions">
          {cards.map((c, i) => (
            <Link
              key={c.id}
              href={"/" + c.id}
              className={`direction-card reveal direction-${c.id}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <img src={"/images/" + c.image + ".jpg"} alt={t(c.id)} loading="lazy" />
              <div className="direction-shade" />
              <div className="direction-top">
                <span>
                  <c.icon size={22} />
                </span>
                <small>{c.count} / BAISERKE JEM</small>
              </div>
              <div className="direction-bottom">
                <h3>{t(c.id)}</h3>
                <p>{c.desc}</p>
                <span className="circle-link">
                  <ArrowUpRight size={22} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section popular-section">
        <div className="container">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">02 / BAISERKE JEM</div>
              <h2>{t("popular")}</h2>
            </div>
            <Link href="/catalog" className="text-link">
              {t("allProducts")}
              <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="product-grid">
            {["flour", "buckwheat", "oil", "layer-feed"].map((id) => (
              <div key={id} className="reveal">
                <ProductCard product={products.find((p) => p.id === id)!} />
              </div>
            ))}
          </div>
          <p className="source-note">{t("priceNote")}</p>
        </div>
      </section>
      <section className="section container">
        <div className="about-split reveal">
          <div className="about-image">
            <img src="/images/field.jpg" alt={t("tagline")} loading="lazy" />
            <div className="image-caption">
              BAISERKE JEM<span>{t("tagline")}</span>
            </div>
          </div>
          <div className="about-copy">
            <div className="eyebrow">03 / {t("about")}</div>
            <h2>{t("aboutTitle")}</h2>
            <p>{t("aboutDesc")}</p>
            <Link href="/about" className="text-link">
              {t("details")}
              <ArrowUpRight size={19} />
            </Link>
            <div className="mini-benefits">
              <span>
                <ShieldCheck size={20} />
                {t("directTitle")}
              </span>
              <span>
                <Truck size={20} />
                {t("deliveryKz")}
              </span>
            </div>
          </div>
        </div>
        <div className="stat-grid reveal">
          <div>
            <strong>
              2014<span>↗</span>
            </strong>
            <p>{t("experience")}</p>
          </div>
          <div>
            <strong>
              200<span>+</span>
            </strong>
            <p>{t("tonnes")}</p>
          </div>
          <div>
            <strong>
              03<span>↗</span>
            </strong>
            <p>{t("categories")}</p>
          </div>
        </div>
        <p className="source-note">{t("archiveNote")}</p>
      </section>
      <section className="review-section">
        <div className="container review-inner reveal">
          <div>
            <div className="eyebrow">04 / {t("reviews")}</div>
            <h2>{t("reviewTitle")}</h2>
            <Link href="/reviews" className="text-link">
              {t("details")}
              <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="review-preview">
            <Quote size={37} />
            <h3>{t("reviewEmpty")}</h3>
            <p>{t("reviewDesc")}</p>
            <a
              href={whatsapp(t("reviewMessage"))}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {t("leaveReview")}
              <ArrowUpRight size={19} />
            </a>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
