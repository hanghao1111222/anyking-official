export interface Feature {
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ShippingZone {
  zone: string;
  eta: string;
  courier: string;
}

export type SiteLanguage = 'ja' | 'en' | 'zh';

export interface ProductHeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
}

export interface ProductSeoContent {
  title: string;
  description: string;
  keywords: string[];
}

export interface ProductSupportContent {
  shippingSummary: string;
  returnSummary: string;
  contactSummary: string;
}

export interface ProductSiteContent {
  hero?: Partial<ProductHeroContent>;
  seo?: Partial<ProductSeoContent>;
  faq?: FAQItem[];
  support?: Partial<ProductSupportContent>;
}

export interface Images {
  thumbnail: string;
  gallery: string[];
  aplusContent: string[];
}

export interface Spec {
  [key: string]: string | undefined;
}

export interface Product {
  slug: string;
  id: string; // for compatibility with older code, usually same as slug
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviews: string; // Keep as string for 'thousands' formatting or convert to number
  soldBadge: string;
  viewingNow: number;
  highlightMessage: string;
  description: string;
  features: string[];
  specs: Spec;
  images: Images;
  best: string; // e.g., Best for Remote Workers
  amazonUrl: string; // Keeping for backward compatibility
  hasVideo?: boolean;
  siteContent?: ProductSiteContent;
}

export interface SiteConfig {
  storeName: string;
  supportEmail: string;
  market?: string;
  language?: SiteLanguage;
  featuredProductSlug?: string;
  supportPhone?: string;
  supportAddress?: string;
  supportResponseTime?: string;
}

export interface Catalog {
  siteConfig: SiteConfig;
  products: Product[];
}
