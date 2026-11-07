import type { Localized } from "./i18n";
export type Category = "food" | "feed" | "fish" | "cake";
export interface Variant {
  id: string;
  label: Localized;
  price: number | null;
}
export interface Product {
  id: string;
  name: Localized;
  description: Localized;
  category: Category;
  image: string;
  variants: Variant[];
}
const kg = (n: number): Localized => [`${n} кг`, `${n} кг`, `${n} kg`];
const v = (id: string, label: Localized, price: number | null): Variant => ({ id, label, price });
const request = [v("request", ["По согласованию", "Келісім бойынша", "To be agreed"], null)];
const base = "/images/";
// All prices live here. null means price must be confirmed, never a free product.
export const products: Product[] = [
  {
    id: "flour",
    name: ["Пшеничная мука BAISERKE", "BAISERKE бидай ұны", "BAISERKE wheat flour"],
    description: [
      "Пшеничная мука для выпечки. Высший, первый и второй сорт. Фасовки 5 и 10 кг из исходного каталога.",
      "Пісіруге арналған бидай ұны. Жоғары, бірінші және екінші сұрып. Бастапқы каталогта 5 және 10 кг қаптамалар берілген.",
      "Wheat flour for baking. Premium, first and second grades, in 5 kg and 10 kg packages listed in the original catalogue.",
    ],
    category: "food",
    image: base + "flour.jpg",
    variants: [
      v("premium5", ["Высший сорт · 5 кг", "Жоғары сұрып · 5 кг", "Premium grade · 5 kg"], 1450),
      v(
        "premium10",
        ["Высший сорт · 10 кг", "Жоғары сұрып · 10 кг", "Premium grade · 10 kg"],
        2900,
      ),
      v("first5", ["Первый сорт · 5 кг", "Бірінші сұрып · 5 кг", "First grade · 5 kg"], 1100),
      v("first10", ["Первый сорт · 10 кг", "Бірінші сұрып · 10 кг", "First grade · 10 kg"], 2200),
      v("second5", ["Второй сорт · 5 кг", "Екінші сұрып · 5 кг", "Second grade · 5 kg"], 750),
      v("second10", ["Второй сорт · 10 кг", "Екінші сұрып · 10 кг", "Second grade · 10 kg"], 1500),
    ],
  },
  {
    id: "buckwheat",
    name: ["Гречневая крупа BAISERKE", "BAISERKE қарақұмық жармасы", "BAISERKE buckwheat"],
    description: [
      "Натуральная гречневая крупа ядрица. Фасовка 5 кг. В старых материалах указаны разные цены, поэтому актуальную стоимость необходимо уточнить.",
      "Табиғи тұтас қарақұмық жармасы. Қаптамасы 5 кг. Бұрынғы материалдарда әртүрлі бағалар көрсетілген, сондықтан өзекті құнын нақтылау қажет.",
      "Natural whole buckwheat groats in a 5 kg package. The original materials list conflicting prices, so the current price must be confirmed.",
    ],
    category: "food",
    image: base + "buckwheat.jpg",
    variants: [v("5kg", kg(5), null)],
  },
  {
    id: "honey",
    name: ["Натуральный мёд", "Табиғи бал", "Natural honey"],
    description: [
      "Натуральный мёд. Происхождение, фасовку и стоимость уточняйте у менеджера.",
      "Табиғи бал. Шыққан жерін, қаптамасын және құнын менеджерден нақтылаңыз.",
      "Natural honey. Ask the manager about origin, packaging and price.",
    ],
    category: "food",
    image: base + "honey.jpg",
    variants: request,
  },
  {
    id: "oil",
    name: ["Подсолнечное масло", "Күнбағыс майы", "Sunflower oil"],
    description: [
      "Натуральное нерафинированное подсолнечное масло прямого отжима. Фасовка 5 литров.",
      "Тікелей сығылған табиғи тазартылмаған күнбағыс майы. Қаптамасы 5 литр.",
      "Natural unrefined, directly pressed sunflower oil. Available in 5 litre packaging.",
    ],
    category: "food",
    image: base + "oil.jpg",
    variants: [v("5l", ["5 литров", "5 литр", "5 litres"], 3800)],
  },
  {
    id: "eggs",
    name: ["Куриные яйца", "Тауық жұмыртқасы", "Chicken eggs"],
    description: [
      "Куриные яйца. В исходном каталоге указаны крупные свежие яйца от кур свободного выгула. Цена за 10 штук.",
      "Тауық жұмыртқасы. Бастапқы каталогта еркін жайылатын тауықтардың ірі балғын жұмыртқалары көрсетілген. Баға 10 данаға.",
      "Chicken eggs. The original catalogue describes large fresh eggs from free-range hens. Price is per 10 eggs.",
    ],
    category: "food",
    image: base + "eggs.jpg",
    variants: [v("10", ["10 штук", "10 дана", "10 eggs"], 700)],
  },
  {
    id: "sunflower-cake",
    name: ["Подсолнечный жмых", "Күнбағыс күнжарасы", "Sunflower oilcake"],
    description: [
      "Кормовой продукт отжима подсолнечника для рациона КРС и птицы. Фасовку согласуйте с менеджером.",
      "Ірі қара мен құстың рационына арналған күнбағысты сығу өнімі. Қаптаманы менеджермен келісіңіз.",
      "A sunflower pressing product for cattle and poultry diets. Agree packaging with the manager.",
    ],
    category: "cake",
    image: base + "meal.jpg",
    variants: [v("1kg", kg(1), 120)],
  },
  {
    id: "rapeseed-cake",
    name: ["Рапсовый жмых", "Рапс күнжарасы", "Rapeseed oilcake"],
    description: [
      "Рапсовый жмых для кормового рациона. Состав, фасовку и условия поставки уточняйте у менеджера.",
      "Жем рационына арналған рапс күнжарасы. Құрамын, қаптамасын және жеткізу шарттарын менеджерден нақтылаңыз.",
      "Rapeseed oilcake for feed use. Contact the manager for composition, packaging and supply terms.",
    ],
    category: "cake",
    image: base + "meal.jpg",
    variants: request,
  },
  {
    id: "sunflower-meal",
    name: ["Подсолнечный шрот", "Күнбағыс шроты", "Sunflower meal"],
    description: [
      "Подсолнечный шрот для кормления птицы и сельскохозяйственных животных. Наличие и фасовка по согласованию.",
      "Құс пен ауыл шаруашылығы жануарларына арналған күнбағыс шроты. Қолжетімділік пен қаптама келісім бойынша.",
      "Sunflower meal for poultry and farm animal feed. Availability and packaging by agreement.",
    ],
    category: "cake",
    image: base + "meal.jpg",
    variants: request,
  },
  {
    id: "rapeseed-meal",
    name: ["Рапсовый шрот", "Рапс шроты", "Rapeseed meal"],
    description: [
      "Рапсовый шрот. Характеристики, фасовку и цену уточняйте у менеджера.",
      "Рапс шроты. Сипаттамаларын, қаптамасын және бағасын менеджерден нақтылаңыз.",
      "Rapeseed meal. Ask the manager for specifications, packaging and price.",
    ],
    category: "cake",
    image: base + "meal.jpg",
    variants: request,
  },
  {
    id: "layer-feed",
    name: [
      "Комбикорм для кур-несушек",
      "Мекиен тауықтарға арналған құрама жем",
      "Compound feed for laying hens",
    ],
    description: [
      "Сбалансированный рацион для кур-несушек. В исходных материалах описан кальций для прочной скорлупы. Цена 175 ₸ за кг; мешки 25 и 40 кг.",
      "Мекиен тауықтарға арналған теңгерімді рацион. Бастапқы материалдарда берік қабық үшін кальций сипатталған. Баға кг үшін 175 ₸; 25 және 40 кг қаптар.",
      "A balanced ration for laying hens. The original materials describe calcium for strong eggshells. 175 ₸ per kg; bags of 25 kg and 40 kg.",
    ],
    category: "feed",
    image: base + "feed.jpg",
    variants: [v("25kg", kg(25), 175 * 25), v("40kg", kg(40), 175 * 40)],
  },
  {
    id: "bran",
    name: ["Пшеничные отруби", "Бидай кебегі", "Wheat bran"],
    description: [
      "Пшеничные отруби для повышения питательности кормового рациона. Цена за 1 кг; фасовка по согласованию.",
      "Жем рационының қоректілігін арттыруға арналған бидай кебегі. Баға 1 кг үшін; қаптама келісім бойынша.",
      "Wheat bran to enrich feed rations. Price per 1 kg; packaging by agreement.",
    ],
    category: "feed",
    image: base + "bran.jpg",
    variants: [v("1kg", kg(1), 110)],
  },
  {
    id: "tricalcium-phosphate",
    name: ["Трикальцийфосфат", "Үшкальцийфосфат", "Tricalcium phosphate"],
    description: [
      "Кормовая минеральная добавка с кальцием и фосфором. Состав и рекомендации по применению уточняйте у менеджера.",
      "Кальций мен фосфор бар жемге арналған минералдық қоспа. Құрамын және қолдану ұсыныстарын менеджерден нақтылаңыз.",
      "A feed mineral supplement containing calcium and phosphorus. Ask the manager for composition and usage guidance.",
    ],
    category: "feed",
    image: base + "mineral.jpg",
    variants: request,
  },
];
const fishNames: [string, Localized, string][] = [
  ["trout", ["Форель", "Бақтақ", "Trout"], "trout"],
  ["burbot", ["Налим", "Нәлім", "Burbot"], "fish"],
  ["peled", ["Пелядь", "Пелядь", "Peled"], "fish"],
  ["whitefish", ["Сиг", "Сиг", "Whitefish"], "fish"],
  ["ripus", ["Рипус", "Рипус", "Ripus"], "ripus"],
  ["catfish", ["Сом", "Жайын", "Catfish"], "catfish"],
  ["bream", ["Лещ", "Табан", "Bream"], "fish"],
  ["zander", ["Судак", "Көксерке", "Zander"], "fish"],
  ["fish-assortment", ["Рыбное ассорти", "Балық ассортиі", "Fish assortment"], "fish"],
];
const fishVariants = [
  v("fresh", ["Свежая", "Балғын", "Fresh"], null),
  v("chilled", ["Охлаждённая", "Салқындатылған", "Chilled"], null),
  v("frozen", ["Замороженная", "Мұздатылған", "Frozen"], null),
  v("smoked", ["Копчёная", "Ысталған", "Smoked"], null),
];
products.push(
  ...fishNames.map(
    ([id, name, image]): Product => ({
      id,
      name,
      category: "fish",
      image: base + image + ".jpg",
      description: [
        "Рыбная продукция. Возможна поставка в свежем, охлаждённом, замороженном или копчёном виде. Доступные варианты, вес и цену подтвердит менеджер.",
        "Балық өнімі. Балғын, салқындатылған, мұздатылған немесе ысталған түрде жеткізілуі мүмкін. Қолжетімді нұсқаларды, салмақты және бағаны менеджер растайды.",
        "Fish products may be supplied fresh, chilled, frozen or smoked. The manager will confirm available preparations, weight and price.",
      ],
      variants: fishVariants,
    }),
  ),
);
export const findProduct = (id: string) => products.find((p) => p.id === id);
export const minimumPrice = (p: Product) => {
  const prices = p.variants.map((v) => v.price).filter((n): n is number => n !== null);
  return prices.length ? Math.min(...prices) : null;
};
export const money = (n: number) => new Intl.NumberFormat("ru-RU").format(n) + " ₸";
