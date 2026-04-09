import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { getSiteLanguage, getSiteLocale, getStoreName } from '@/lib/catalog';
import { getSiteMetadataBase, getSiteUrl } from '@/lib/site-config';
import { createSiteTranslator, getSiteLangTag } from '@/lib/site-language';
import './globals.css';

const SITE_URL = getSiteUrl();
const storeName = getStoreName();
const language = getSiteLanguage();
const locale = getSiteLocale();
const t = createSiteTranslator(language);
const defaultDescription = t(
  `${storeName} 公式ストア。厳選した商品をわかりやすく紹介し、安心して購入できるショッピング体験を提供します。`,
  `${storeName} official store for curated products, clear product details, and a streamlined shopping experience.`,
  `${storeName} 官方商店，提供清晰的商品信息与顺畅的购物体验。`,
);

export const metadata: Metadata = {
  metadataBase: getSiteMetadataBase(),
  title: {
    default: storeName,
    template: `%s | ${storeName}`,
  },
  description: defaultDescription,
  keywords: [storeName, t('公式ストア', 'official store', '官方商店')],
  authors: [{ name: storeName, url: SITE_URL }],
  generator: 'Next.js',
  openGraph: {
    title: storeName,
    description: defaultDescription,
    url: SITE_URL,
    siteName: storeName,
    locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: storeName,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <html lang={getSiteLangTag(language)}>
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        <CartProvider>
          {children}
          <Footer />
        </CartProvider>
      </body>


    </html>
  );
}
