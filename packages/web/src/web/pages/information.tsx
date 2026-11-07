import { Link } from "wouter";
import {
  ArrowUpRight,
  Phone,
  MapPin,
  Mail,
  Clock,
  Quote,
  Sprout,
  Handshake,
  Truck,
} from "lucide-react";
import { useShop, whatsapp } from "../lib/store";
import { CTA, PageIntro } from "../components/shop-layout";
export function About() {
  const { t } = useShop();
  return (
    <>
      <PageIntro title={t("about")} kicker="BAISERKE JEM" description={t("aboutTitle")} />
      <section className="container information-section">
        <div className="about-split">
          <div className="about-image">
            <img src="/images/field.jpg" alt={t("tagline")} />
            <div className="image-caption">
              BAISERKE JEM<span>{t("since")}</span>
            </div>
          </div>
          <div className="about-copy">
            <div className="eyebrow">{t("tagline")}</div>
            <h2>{t("advantages")}</h2>
            <p>{t("aboutDesc")}</p>
            <p>{t("directionDesc")}</p>
            <Link className="btn btn-orange" href="/catalog">
              {t("openCatalog")}
              <ArrowUpRight size={19} />
            </Link>
          </div>
        </div>
        <div className="benefit-grid">
          {[
            { icon: Handshake, title: "directTitle", desc: "directDesc" },
            { icon: Sprout, title: "volumeTitle", desc: "volumeDesc" },
            { icon: Truck, title: "deliveryKz", desc: "deliveryDesc" },
          ].map((b) => (
            <div className="benefit" key={b.title}>
              <b.icon size={29} />
              <h3>{t(b.title as "directTitle")}</h3>
              <p>{t(b.desc as "directDesc")}</p>
            </div>
          ))}
        </div>
        <div className="stat-grid">
          <div>
            <strong>2014</strong>
            <p>{t("experience")}</p>
          </div>
          <div>
            <strong>200+</strong>
            <p>{t("tonnes")}</p>
          </div>
          <div>
            <strong>03</strong>
            <p>{t("categories")}</p>
          </div>
        </div>
        <p className="source-note">{t("archiveNote")}</p>
      </section>
      <CTA />
    </>
  );
}
export function Reviews() {
  const { t } = useShop();
  return (
    <>
      <PageIntro title={t("reviews")} kicker="BAISERKE JEM" description={t("reviewTitle")} />
      <section className="container information-section">
        <div className="review-empty">
          <Quote size={64} />
          <h2>{t("reviewEmpty")}</h2>
          <p>{t("reviewDesc")}</p>
          <a
            className="btn btn-orange"
            href={whatsapp(t("reviewMessage"))}
            target="_blank"
            rel="noreferrer"
          >
            {t("leaveReview")}
            <ArrowUpRight size={20} />
          </a>
        </div>
      </section>
      <CTA />
    </>
  );
}
export function Wholesale() {
  const { t } = useShop();
  return (
    <>
      <PageIntro
        title={t("wholesale")}
        kicker="BAISERKE JEM / B2B"
        description={t("wholesaleTitle")}
      />
      <section className="container information-section">
        <div className="wholesale-panel">
          <img src="/images/hero.jpg" alt="" />
          <div>
            <div className="eyebrow">{t("producer")}</div>
            <h2>{t("wholesaleTitle")}</h2>
            <p>{t("wholesaleDesc")}</p>
            <a
              href={whatsapp(t("wholesaleMessage"))}
              target="_blank"
              rel="noreferrer"
              className="btn btn-orange"
            >
              {t("discuss")}
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
        <div className="benefit-grid">
          {[
            { icon: Handshake, title: "directTitle", desc: "directDesc" },
            { icon: Sprout, title: "volumeTitle", desc: "volumeDesc" },
            { icon: Truck, title: "deliveryKz", desc: "deliveryDesc" },
          ].map((b) => (
            <div className="benefit" key={b.title}>
              <b.icon size={29} />
              <h3>{t(b.title as "directTitle")}</h3>
              <p>{t(b.desc as "directDesc")}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
const mapUrl = "https://www.google.com/maps?q=43.54327775971439,77.0481125766345&z=14&output=embed";
export function Contacts() {
  const { t } = useShop();
  return (
    <>
      <PageIntro title={t("contacts")} kicker="BAISERKE JEM" description={t("findUs")} />
      <section className="container information-section">
        <div className="contact-grid">
          <div className="contact-card">
            <Phone size={24} />
            <h3>{t("phone")}</h3>
            <a href="tel:+77778233371">+7 777 823 33 71</a>
            <a className="text-link" href="tel:+77778233371">
              {t("call")}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="contact-card">
            <Mail size={24} />
            <h3>{t("email")}</h3>
            <a href="mailto:ilejem13@gmail.com">ilejem13@gmail.com</a>
          </div>
          <div className="contact-card">
            <MapPin size={24} />
            <h3>{t("address")}</h3>
            <p>{t("location")}</p>
          </div>
          <div className="contact-card">
            <Clock size={24} />
            <h3>{t("schedule")}</h3>
            <p>{t("hours")}</p>
          </div>
        </div>
        <div className="map-panel">
          <iframe
            title={t("mapTitle")}
            src={mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-card">
            <MapPin size={25} />
            <h3>BAISERKE JEM</h3>
            <p>{t("location")}</p>
            <a
              className="btn btn-orange"
              href="https://www.google.com/maps/dir/?api=1&destination=43.54327775971439,77.0481125766345"
              target="_blank"
              rel="noreferrer"
            >
              {t("route")}
              <ArrowUpRight size={19} />
            </a>
          </div>
        </div>
        <p className="source-note">{t("mapNote")}</p>
        <div className="delivery-callout">
          <Truck size={25} />
          <div>
            <b>{t("deliveryKz")}</b>
            <p>{t("deliveryDesc")}</p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
export function Privacy() {
  const { t } = useShop();
  return (
    <>
      <PageIntro title={t("privacyTitle")} kicker="BAISERKE JEM" />
      <article className="container privacy-copy">
        <p>{t("privacyText")}</p>
        <Link href="/contacts" className="text-link">
          {t("contacts")}
          <ArrowUpRight size={19} />
        </Link>
      </article>
    </>
  );
}
export function NotFound() {
  const { t } = useShop();
  return (
    <section className="container empty-state">
      <div className="eyebrow">404</div>
      <h1>{t("notFound")}</h1>
      <Link href="/" className="btn btn-orange">
        {t("home")}
        <ArrowUpRight size={19} />
      </Link>
    </section>
  );
}
