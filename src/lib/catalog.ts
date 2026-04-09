import rawCatalog from '@/data/catalog.json';
import {
  getSiteLocale as resolveSiteLocale,
  normalizeSiteLanguage,
  selectSiteCopy,
} from '@/lib/site-language';
import type {
  Catalog,
  FAQItem,
  Product,
  ProductHeroContent,
  ProductSeoContent,
  ProductSupportContent,
  ShippingZone,
  SiteLanguage,
} from '@/types/product';

const catalog = rawCatalog as unknown as Catalog;

const DEFAULT_PHONE = '+81 50-0000-0000';
const DEFAULT_ADDRESS = 'Customer Support Center';
const DEFAULT_RESPONSE_TIME = 'Within 24 hours';

function copy(language: SiteLanguage, ja: string, en: string, zh: string): string {
  return selectSiteCopy(language, { ja, en, zh });
}

export function getCatalog(): Catalog {
  return catalog;
}

export function getStoreName(): string {
  return catalog.siteConfig?.storeName || 'Store';
}

export function getMarket(): string {
  return catalog.siteConfig?.market || 'JP';
}

export function getSiteLanguage(): SiteLanguage {
  return normalizeSiteLanguage(catalog.siteConfig?.language, getMarket());
}

export function getSiteLocale(): string {
  return resolveSiteLocale(getSiteLanguage());
}

export function getSupportEmail(): string {
  return catalog.siteConfig?.supportEmail || 'support@example.com';
}

export function getSupportPhone(): string {
  return catalog.siteConfig?.supportPhone || DEFAULT_PHONE;
}

export function getSupportAddress(): string {
  return catalog.siteConfig?.supportAddress || DEFAULT_ADDRESS;
}

export function getSupportResponseTime(): string {
  return catalog.siteConfig?.supportResponseTime || DEFAULT_RESPONSE_TIME;
}

export function getProducts(): Product[] {
  return (catalog.products || []).filter(product => product.slug && product.name);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find(product => product.slug === slug);
}

export function getFeaturedProduct(): Product | undefined {
  const products = getProducts();
  const featuredSlug = catalog.siteConfig?.featuredProductSlug;

  if (featuredSlug) {
    const matched = products.find(product => product.slug === featuredSlug);
    if (matched) {
      return matched;
    }
  }

  return products[0];
}

function compactText(value: string, fallback: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function takeKeywords(product: Product): string[] {
  const keywords = [
    product.name,
    product.subtitle,
    product.best,
    ...product.features.slice(0, 3),
  ]
    .map(value => value.trim())
    .filter(Boolean);

  return Array.from(new Set(keywords));
}

function buildDefaultFaqs(product: Product): FAQItem[] {
  const language = getSiteLanguage();
  const storeName = getStoreName();
  const supportEmail = getSupportEmail();
  const listSeparator = language === 'en' ? ', ' : '、';
  const primarySpecs = Object.entries(product.specs || {}).slice(0, 2);
  const specSummary = primarySpecs.length
    ? primarySpecs.map(([label, value]) => `${label}: ${value}`).join(', ')
    : product.features.slice(0, 2).join(listSeparator);

  if (language === 'ja') {
    return [
      {
        question: `${product.name} はどんな方におすすめですか？`,
        answer: compactText(
          product.best,
          `${product.name} は、毎日使いやすく、購入後のサポートまで安心して使いたい方におすすめです。`,
        ),
      },
      {
        question: `${product.name} の主な特徴は何ですか？`,
        answer: product.features.length > 0
          ? `${product.features.slice(0, 4).join('、')}。`
          : compactText(product.highlightMessage, product.description),
      },
      {
        question: '購入前に確認すべき仕様は？',
        answer: compactText(
          specSummary,
          `${product.name} の主要仕様はこのページに掲載されています。ご購入前に仕様欄をご確認ください。`,
        ),
      },
      {
        question: 'サポートへの問い合わせ方法は？',
        answer: `${storeName} サポート（${supportEmail}）までご連絡ください。通常は${getSupportResponseTime()}に返信します。`,
      },
    ];
  }

  if (language === 'zh') {
    return [
      {
        question: `${product.name} 适合哪些人使用？`,
        answer: compactText(
          product.best,
          `${product.name} 适合希望日常稳定使用、同时也重视售后支持体验的用户。`,
        ),
      },
      {
        question: `${product.name} 的核心卖点是什么？`,
        answer: product.features.length > 0
          ? `${product.features.slice(0, 4).join('、')}。`
          : compactText(product.highlightMessage, product.description),
      },
      {
        question: '下单前应该重点查看哪些规格？',
        answer: compactText(
          specSummary,
          `${product.name} 的主要规格已展示在本页中，建议下单前先查看参数信息。`,
        ),
      },
      {
        question: '如果需要帮助，应该怎么联系客服？',
        answer: `你可以通过 ${supportEmail} 联系 ${storeName} 客服，我们通常会在 ${getSupportResponseTime()} 内回复。`,
      },
    ];
  }

  return [
    {
      question: `What is ${product.name} best suited for?`,
      answer: compactText(
        product.best,
        `${product.name} is positioned for customers who want a reliable daily-use product with a polished unboxing and after-sales experience.`,
      ),
    },
    {
      question: `What are the standout features of ${product.name}?`,
      answer: product.features.length > 0
        ? `${product.features.slice(0, 4).join(', ')}.`
        : compactText(product.highlightMessage, product.description),
    },
    {
      question: 'What specifications should I check before ordering?',
      answer: compactText(
        specSummary,
        `${product.name} ships with the core features shown on this page. Please review the product specifications section before purchasing.`,
      ),
    },
    {
      question: 'How can I contact support if I need help?',
      answer: `You can contact ${storeName} support at ${supportEmail}. We usually reply ${getSupportResponseTime()}.`,
    },
  ];
}

function buildHero(product: Product): ProductHeroContent {
  const language = getSiteLanguage();

  return {
    eyebrow: compactText(product.best, copy(language, '注目商品', 'Featured Product', '精选商品')),
    headline: compactText(product.name, copy(language, '注目商品', 'Featured Product', '精选商品')),
    subheadline: compactText(
      product.subtitle,
      product.highlightMessage || product.description,
    ),
  };
}

function buildSeo(product: Product): ProductSeoContent {
  const storeName = getStoreName();
  const language = getSiteLanguage();

  return {
    title: `${compactText(product.name, storeName)} | ${storeName}`,
    description: compactText(
      product.description,
      copy(
        language,
        `${storeName} 公式の ${product.name} 商品ページです。`,
        `${storeName} official product page for ${product.name}.`,
        `${storeName} 的 ${product.name} 官方商品页面。`,
      ),
    ),
    keywords: takeKeywords(product),
  };
}

function buildSupport(product: Product): ProductSupportContent {
  const storeName = getStoreName();
  const language = getSiteLanguage();

  return {
    shippingSummary: copy(
      language,
      `${storeName} では通常、ご注文後1〜2営業日以内に出荷し、配送会社へ引き渡し後に追跡情報をお知らせします。`,
      `${storeName} processes most orders within 1 to 2 business days and shares tracking as soon as the parcel is handed to the carrier.`,
      `${storeName} 通常会在下单后的 1 到 2 个工作日内完成发货，并在包裹交给承运商后提供物流追踪信息。`,
    ),
    returnSummary: copy(
      language,
      `${product.name} がご期待に沿わない場合、商品到着後30日以内にサポートへご連絡いただくと返品受付を開始できます。`,
      `If ${product.name} does not meet expectations, you can contact support within 30 days of delivery to start a return review.`,
      `如果 ${product.name} 未达到你的预期，你可以在收货后 30 天内联系支持团队发起退货审核。`,
    ),
    contactSummary: copy(
      language,
      `${product.name}・配送・アフターサポートに関するお問い合わせは ${getSupportEmail()} までご連絡ください。`,
      `Questions about ${product.name}, shipping, or after-sales service can be sent to ${getSupportEmail()}.`,
      `如需咨询 ${product.name}、物流或售后支持，请发送邮件至 ${getSupportEmail()}。`,
    ),
  };
}

export function getProductSiteContent(product?: Product): {
  hero: ProductHeroContent;
  seo: ProductSeoContent;
  faq: FAQItem[];
  support: ProductSupportContent;
} {
  const fallbackProduct = product || getFeaturedProduct();
  const language = getSiteLanguage();

  if (!fallbackProduct) {
    return {
      hero: {
        eyebrow: copy(language, '公式ストア', 'Official Store', '官方商店'),
        headline: getStoreName(),
        subheadline: copy(
          language,
          '商品カタログが準備できると、ここに商品詳細が表示されます。',
          'Product details will appear here once your catalog is ready.',
          '商品目录准备完成后，这里会显示对应的商品详情。',
        ),
      },
      seo: {
        title: copy(
          language,
          `${getStoreName()} | 公式ストア`,
          `${getStoreName()} | Official Store`,
          `${getStoreName()} | 官方商店`,
        ),
        description: copy(
          language,
          `${getStoreName()} 公式ストア。`,
          `${getStoreName()} official store.`,
          `${getStoreName()} 官方商店。`,
        ),
        keywords: [getStoreName()],
      },
      faq: [],
      support: {
        shippingSummary: copy(
          language,
          `${getStoreName()} では、注目商品の設定後に配送情報を表示します。`,
          `${getStoreName()} will show live shipping details here once a featured product is configured.`,
          `${getStoreName()} 会在设置主推商品后于此显示对应的物流信息。`,
        ),
        returnSummary: copy(
          language,
          '返品・返金情報は、商品ポリシー設定後に表示されます。',
          'Return and refund information will appear here once product policies are configured.',
          '退货和退款信息会在商品政策配置完成后显示在这里。',
        ),
        contactSummary: copy(
          language,
          `ご不明点は ${getSupportEmail()} までお問い合わせください。`,
          `For help, contact ${getSupportEmail()}.`,
          `如需帮助，请联系 ${getSupportEmail()}。`,
        ),
      },
    };
  }

  const overrides = fallbackProduct.siteContent || {};

  return {
    hero: {
      ...buildHero(fallbackProduct),
      ...overrides.hero,
    },
    seo: {
      ...buildSeo(fallbackProduct),
      ...overrides.seo,
      keywords: overrides.seo?.keywords?.length
        ? overrides.seo.keywords
        : buildSeo(fallbackProduct).keywords,
    },
    faq: overrides.faq && overrides.faq.length > 0 ? overrides.faq : buildDefaultFaqs(fallbackProduct),
    support: {
      ...buildSupport(fallbackProduct),
      ...overrides.support,
    },
  };
}

export function getShippingZones(): ShippingZone[] {
  const market = getMarket();
  const language = getSiteLanguage();

  if (market === 'US') {
    return [
      {
        zone: copy(language, 'アメリカ合衆国', 'United States', '美国'),
        eta: copy(language, '3〜5営業日', '3-5 business days', '3-5 个工作日'),
        courier: 'UPS / USPS',
      },
      {
        zone: copy(language, 'カナダ', 'Canada', '加拿大'),
        eta: copy(language, '5〜8営業日', '5-8 business days', '5-8 个工作日'),
        courier: 'DHL Express',
      },
      {
        zone: copy(language, 'ヨーロッパ', 'Europe', '欧洲'),
        eta: copy(language, '6〜10営業日', '6-10 business days', '6-10 个工作日'),
        courier: 'DHL / DPD',
      },
      {
        zone: copy(language, 'アジア太平洋', 'Asia Pacific', '亚太地区'),
        eta: copy(language, '5〜9営業日', '5-9 business days', '5-9 个工作日'),
        courier: 'FedEx',
      },
    ];
  }

  return [
    {
      zone: copy(language, '日本', 'Japan', '日本'),
      eta: copy(language, '2〜4営業日', '2-4 business days', '2-4 个工作日'),
      courier: copy(language, 'ヤマト運輸 / 佐川急便', 'Yamato / Sagawa', '雅玛多 / 佐川急便'),
    },
    {
      zone: copy(language, 'アジア太平洋', 'Asia Pacific', '亚太地区'),
      eta: copy(language, '4〜7営業日', '4-7 business days', '4-7 个工作日'),
      courier: 'FedEx',
    },
    {
      zone: copy(language, '北米', 'North America', '北美'),
      eta: copy(language, '6〜10営業日', '6-10 business days', '6-10 个工作日'),
      courier: 'DHL Express',
    },
    {
      zone: copy(language, 'ヨーロッパ', 'Europe', '欧洲'),
      eta: copy(language, '6〜10営業日', '6-10 business days', '6-10 个工作日'),
      courier: 'DHL / DPD',
    },
  ];
}

export function formatStorePrice(value: number): string {
  if (getMarket() === 'US') {
    return `$${value.toFixed(2)}`;
  }

  return `￥${Math.round(value).toLocaleString()}`;
}

export function buildAboutStory(product?: Product) {
  const featuredProduct = product || getFeaturedProduct();
  const storeName = getStoreName();
  const language = getSiteLanguage();

  if (!featuredProduct) {
    return {
      mission: copy(
        language,
        `${storeName} は、厳選した商品の魅力を伝えるストア体験を構築します。`,
        `${storeName} builds focused ecommerce experiences around carefully curated products.`,
        `${storeName} 致力于围绕精选商品打造更聚焦的电商体验。`,
      ),
      craftsmanship: copy(
        language,
        `商品ページ、サポート情報、チェックアウトまで一貫した体験で、${storeName} を安心して利用できる設計を目指します。`,
        `Every product page, support article, and checkout detail is tuned to make ${storeName} feel trustworthy and easy to buy from.`,
        `从商品页、支持信息到结账流程，${storeName} 都追求一致且可信赖的购买体验。`,
      ),
      values: selectSiteCopy(language, {
        ja: ['わかりやすい商品訴求', '迅速なサポート対応', '一貫した購入体験'],
        en: ['Clear product presentation', 'Fast support response', 'Consistent buying experience'],
        zh: ['清晰的商品表达', '快速的客服响应', '一致的购买体验'],
      }),
    };
  }

  return {
    mission: copy(
      language,
      `${storeName} は、構造化された商品情報を、${featuredProduct.name} の完成度の高いストア体験へ変換することに注力しています。`,
      `${storeName} focuses on turning structured product information into a polished storefront experience for ${featuredProduct.name}.`,
      `${storeName} 专注于把结构化商品资料转化为围绕 ${featuredProduct.name} 的完整独立站体验。`,
    ),
    craftsmanship: copy(
      language,
      `${featuredProduct.name} は、明確な仕様表示・訴求設計・サポート導線を通じて、ランディングからチェックアウトまで一貫した体験を提供します。`,
      `${featuredProduct.name} is presented with clear specifications, strong merchandising, and a support flow that stays consistent from landing page to checkout.`,
      `${featuredProduct.name} 通过清晰的参数展示、卖点组织和支持路径设计，让用户从落地页到结账都获得一致体验。`,
    ),
    values: featuredProduct.features.slice(0, 3),
  };
}

export function getComparisonRows(products: Product[]) {
  if (products.length < 2) {
    return [];
  }

  const [left, right] = products;
  const labels = Array.from(
    new Set([
      ...Object.keys(left.specs || {}),
      ...Object.keys(right.specs || {}),
    ]),
  ).slice(0, 8);

  return labels.map(label => ({
    label,
    left: left.specs?.[label] || '—',
    right: right.specs?.[label] || '—',
  }));
}
