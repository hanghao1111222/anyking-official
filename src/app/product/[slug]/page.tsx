import type { Metadata } from 'next';
import ProductPageClient from './ProductPageClient';
import {
  getFeaturedProduct,
  getProductBySlug,
  getProductSiteContent,
  getSiteLanguage,
  getSiteLocale,
  getStoreName,
} from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

function resolveProduct(slug: string) {
  return getProductBySlug(slug) ?? getFeaturedProduct();
}

export async function generateMetadata(
  { params }: ProductPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const product = resolveProduct(slug);
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const locale = getSiteLocale();
  const t = createSiteTranslator(language);

  if (!product) {
    return {
      title: { absolute: storeName },
      description: t(
        `${storeName} 公式ストアの商品ページです。`,
        `${storeName} official product page.`,
        `${storeName} 官方商品页面。`,
      ),
    };
  }

  const siteContent = getProductSiteContent(product);

  return {
    title: { absolute: siteContent.seo.title },
    description: siteContent.seo.description,
    keywords: siteContent.seo.keywords,
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title: siteContent.seo.title,
      description: siteContent.seo.description,
      url: `/product/${product.slug}`,
      siteName: storeName,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteContent.seo.title,
      description: siteContent.seo.description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  await params;
  return <ProductPageClient />;
}
