import { z } from 'zod';
import { normalizeSiteLanguage } from '@/lib/site-language';
import type { FAQItem, Product, ProductSiteContent, SiteConfig } from '@/types/product';

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const siteContentSchema = z.object({
  heroHeadline: z.string().optional(),
  heroSubheadline: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  shippingSummary: z.string().optional(),
  returnSummary: z.string().optional(),
  contactSummary: z.string().optional(),
  faqs: z.array(faqSchema).optional(),
});

const submissionSchema = z.object({
  slug: z.string().min(1, '请填写商品 slug'),
  name: z.string().min(1, '请填写商品名称'),
  subtitle: z.string().optional().default(''),
  price: z.string().min(1, '请填写售价'),
  originalPrice: z.string().optional().default(''),
  discount: z.string().optional().default(''),
  description: z.string().min(1, '请填写商品描述'),
  features: z.array(z.string()).min(1, '请至少填写一条卖点'),
  specs: z.record(z.string(), z.string()).default({}),
  best: z.string().optional().default(''),
  amazonUrl: z.string().optional().default(''),
  highlightMessage: z.string().optional().default(''),
  storeName: z.string().min(1, '请填写店铺名称'),
  supportEmail: z.string().email('客服邮箱格式不正确'),
  supportPhone: z.string().optional().default(''),
  supportAddress: z.string().optional().default(''),
  supportResponseTime: z.string().optional().default(''),
  market: z.string().optional().default('JP'),
  language: z.string().optional().default(''),
  siteContent: siteContentSchema.optional().default({}),
});

export type AdminSubmissionInput = z.infer<typeof submissionSchema>;

export function slugifyProductName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

export function parseLines(value: string): string[] {
  return value
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
}

export function parseSpecs(value: string): Record<string, string> {
  return parseLines(value).reduce<Record<string, string>>((accumulator, line) => {
    const [label, ...rest] = line.split(':');
    const key = label?.trim();
    const detail = rest.join(':').trim();

    if (key && detail) {
      accumulator[key] = detail;
    }

    return accumulator;
  }, {});
}

export function parseFaqEntries(value: string): FAQItem[] {
  return value
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .filter(Boolean)
    .map(block => {
      const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
      const questionLine = lines.find(line => line.toLowerCase().startsWith('q:'));
      const answerLine = lines.find(line => line.toLowerCase().startsWith('a:'));

      if (!questionLine || !answerLine) {
        return null;
      }

      return {
        question: questionLine.slice(2).trim(),
        answer: answerLine.slice(2).trim(),
      };
    })
    .filter((entry): entry is FAQItem => Boolean(entry));
}

export function serializeFaqEntries(entries: FAQItem[]): string {
  return entries
    .map(entry => `Q: ${entry.question}\nA: ${entry.answer}`)
    .join('\n\n');
}

export function normalizeSubmission(input: {
  slug: string;
  name: string;
  subtitle?: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  best?: string;
  amazonUrl?: string;
  highlightMessage?: string;
  storeName: string;
  supportEmail: string;
  supportPhone?: string;
  supportAddress?: string;
  supportResponseTime?: string;
  market?: string;
  language?: string;
  siteContent?: {
    heroHeadline?: string;
    heroSubheadline?: string;
    seoTitle?: string;
    seoDescription?: string;
    shippingSummary?: string;
    returnSummary?: string;
    contactSummary?: string;
    faqs?: FAQItem[];
  };
}) {
  return submissionSchema.parse(input);
}

export function buildSiteContentOverrides(
  input: AdminSubmissionInput,
): ProductSiteContent | undefined {
  const faq = input.siteContent?.faqs?.filter(entry => entry.question && entry.answer) || [];
  const siteContent: ProductSiteContent = {
    hero: {
      headline: input.siteContent?.heroHeadline?.trim(),
      subheadline: input.siteContent?.heroSubheadline?.trim(),
    },
    seo: {
      title: input.siteContent?.seoTitle?.trim(),
      description: input.siteContent?.seoDescription?.trim(),
      keywords: input.features.slice(0, 5),
    },
    faq,
    support: {
      shippingSummary: input.siteContent?.shippingSummary?.trim(),
      returnSummary: input.siteContent?.returnSummary?.trim(),
      contactSummary: input.siteContent?.contactSummary?.trim(),
    },
  };

  const hasContent = Boolean(
    siteContent.hero?.headline ||
      siteContent.hero?.subheadline ||
      siteContent.seo?.title ||
      siteContent.seo?.description ||
      siteContent.support?.shippingSummary ||
      siteContent.support?.returnSummary ||
      siteContent.support?.contactSummary ||
      siteContent.faq?.length,
  );

  return hasContent ? siteContent : undefined;
}

export function buildProductRecord(
  input: AdminSubmissionInput,
  assetPaths: {
    thumbnail: string;
    gallery: string[];
    aplus: string[];
  },
): Product {
  const productId = input.slug;

  return {
    slug: input.slug,
    id: productId,
    name: input.name,
    subtitle: input.subtitle,
    price: input.price,
    originalPrice: input.originalPrice,
    discount: input.discount,
    rating: 4.8,
    reviews: '0',
    soldBadge: 'New arrival',
    viewingNow: 18,
    highlightMessage: input.highlightMessage || input.subtitle || input.name,
    description: input.description,
    features: input.features,
    specs: input.specs,
    best: input.best,
    amazonUrl: input.amazonUrl,
    images: {
      thumbnail: assetPaths.thumbnail,
      gallery: assetPaths.gallery,
      aplusContent: assetPaths.aplus,
    },
    hasVideo: false,
    siteContent: buildSiteContentOverrides(input),
  };
}

export function buildSiteConfigUpdate(input: AdminSubmissionInput): Partial<SiteConfig> {
  return {
    storeName: input.storeName,
    supportEmail: input.supportEmail,
    supportPhone: input.supportPhone || undefined,
    supportAddress: input.supportAddress || undefined,
    supportResponseTime: input.supportResponseTime || undefined,
    featuredProductSlug: input.slug,
    market: input.market || 'JP',
    language: normalizeSiteLanguage(input.language, input.market),
  };
}

export function validateSubmission(input: AdminSubmissionInput): string[] {
  const warnings: string[] = [];

  if (input.features.length < 3) {
    warnings.push('建议至少填写 3 条卖点，商品页展示效果会更完整。');
  }

  if (Object.keys(input.specs).length < 2) {
    warnings.push('建议补充更多规格参数，方便对比页和支持页展示。');
  }

  if (!input.siteContent?.seoTitle || !input.siteContent?.seoDescription) {
    warnings.push('SEO 标题或描述为空，系统将自动生成兜底文案。');
  }

  if (!input.siteContent?.faqs?.length) {
    warnings.push('未填写 FAQ，系统将自动生成 FAQ 草稿。');
  }

  if (!input.supportPhone || !input.supportAddress) {
    warnings.push('客服电话或地址未填写，联系页会使用默认兜底信息。');
  }

  return warnings;
}
