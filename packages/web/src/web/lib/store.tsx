import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { messages, text, type Lang, type Key } from "./i18n";
import { findProduct, money } from "./products";
export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}
const read = <T,>(key: string, fallback: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
};
const save = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Private mode storage can be unavailable. */
  }
};
const validCart = () => {
  const raw = read<unknown>("bj-cart", []);
  return Array.isArray(raw)
    ? raw.filter(
        (i): i is CartItem =>
          i &&
          typeof i.productId === "string" &&
          findProduct(i.productId)?.variants.some((v) => v.id === i.variantId) &&
          Number.isInteger(i.quantity) &&
          i.quantity > 0 &&
          i.quantity <= 9999,
      )
    : [];
};
type Store = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: string;
  toggleTheme: () => void;
  t: (k: Key) => string;
  cart: CartItem[];
  add: (p: string, v: string, n: number) => void;
  update: (p: string, v: string, n: number) => void;
  toast: string;
  setToast: (s: string) => void;
  count: number;
};
const Context = createContext<Store | null>(null);
export function ShopProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const l = read<Lang>("bj-lang", "ru");
    return ["ru", "kz", "en"].includes(l) ? l : "ru";
  });
  const [theme, setTheme] = useState(() => read<string>("bj-theme", "light"));
  const [cart, setCart] = useState<CartItem[]>(validCart);
  const [toast, setToast] = useState("");
  const t = (k: Key) => text(messages[k], lang);
  useEffect(() => {
    save("bj-lang", lang);
    document.documentElement.lang = lang === "kz" ? "kk" : lang;
  }, [lang]);
  useEffect(() => {
    save("bj-theme", theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  useEffect(() => save("bj-cart", cart), [cart]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(timer);
  }, [toast]);
  function add(productId: string, variantId: string, quantity: number) {
    if (!findProduct(productId)?.variants.some((v) => v.id === variantId)) return;
    setCart((old) => {
      const existing = old.find((i) => i.productId === productId && i.variantId === variantId);
      return existing
        ? old.map((i) =>
            i === existing ? { ...i, quantity: Math.min(9999, i.quantity + quantity) } : i,
          )
        : [...old, { productId, variantId, quantity: Math.max(1, Math.min(9999, quantity)) }];
    });
    setToast(t("added"));
  }
  const update = (p: string, v: string, n: number) =>
    setCart((old) =>
      old.flatMap((i) =>
        i.productId === p && i.variantId === v
          ? n <= 0
            ? []
            : [{ ...i, quantity: Math.max(1, Math.min(9999, Math.round(n) || 1)) }]
          : [i],
      ),
    );
  return (
    <Context.Provider
      value={{
        lang,
        setLang,
        theme,
        toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
        t,
        cart,
        add,
        update,
        toast,
        setToast,
        count: cart.reduce((n, i) => n + i.quantity, 0),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useShop() {
  const store = useContext(Context);
  if (!store) throw new Error("Missing ShopProvider");
  return store;
}
export const whatsapp = (message = "") =>
  "https://wa.me/77778233371" + (message ? "?text=" + encodeURIComponent(message) : "");
export interface Customer {
  name: string;
  phone: string;
  city: string;
  comment: string;
  method: "delivery" | "pickup";
}
export function makeOrder(items: CartItem[], lang: Lang, customer?: Customer) {
  const t = (k: Key) => text(messages[k], lang);
  let total = 0,
    unknown = false;
  const lines = items.map((item, index) => {
    const p = findProduct(item.productId)!;
    const v = p.variants.find((v) => v.id === item.variantId)!;
    if (v.price !== null) total += v.price * item.quantity;
    else unknown = true;
    return `${index + 1}. ${text(p.name, lang)}\n   ${text(v.label, lang)} × ${item.quantity}\n   ${v.price === null ? t("askPrice") : `${money(v.price)} × ${item.quantity} = ${money(v.price * item.quantity)}`}`;
  });
  return [
    t("order"),
    "",
    ...lines,
    "",
    `${t("subtotal")}: ${total > 0 ? money(total) : t("quoteOnly")}`,
    unknown ? t("unknownNote") : "",
    t("deliveryDesc"),
    ...(customer
      ? [
          "",
          `${t("name")}: ${customer.name}`,
          `${t("phone")}: ${customer.phone}`,
          `${t("delivery")}: ${t(customer.method)}`,
          customer.method === "delivery" ? `${t("address")}: ${customer.city}` : "",
          customer.comment ? `${t("comment")}: ${customer.comment}` : "",
        ]
      : []),
    "",
    t("confirmFinal"),
  ]
    .filter((x, i, a) => x !== "" || a[i - 1] !== "")
    .join("\n");
}
