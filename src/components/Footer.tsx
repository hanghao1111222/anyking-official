'use client';

import Link from 'next/link';
import { Mail, Facebook, Youtube, ChevronUp } from 'lucide-react';
import catalogData from '@/data/catalog.json';
import { getSiteLanguage } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';
import type { Product } from '@/types/product';

export default function Footer() {
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);
  const storeName = catalogData.siteConfig?.storeName || 'Store';
  const supportEmail = catalogData.siteConfig?.supportEmail || 'support@store.com';
  const products = (catalogData.products as unknown as Product[]) || [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-100 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">
              {t('ショップ', 'Shop the Store', '店铺导航')}
            </h3>
            <ul className="space-y-4 text-sm font-medium text-gray-500 uppercase tracking-widest text-[10px]">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">{t('全商品', 'All Products', '全部商品')}</Link></li>
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/product/${p.slug}`} className="hover:text-blue-600 transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">
              {t('サポート', 'Support', '支持')}
            </h3>
            <ul className="space-y-4 text-sm font-medium text-gray-500 uppercase tracking-widest text-[10px]">
              <li><Link href="/support/contact" className="hover:text-blue-600 transition-colors">{t('お問い合わせ', 'Contact Us', '联系我们')}</Link></li>
              <li><Link href="/support/faqs" className="hover:text-blue-600 transition-colors">FAQs</Link></li>
              <li><Link href="/support/shipping" className="hover:text-blue-600 transition-colors">{t('配送', 'Shipping', '物流')}</Link></li>
              <li><Link href="/support/faqs" className="hover:text-blue-600 transition-colors">{t('保証', 'Warranty', '售后保障')}</Link></li>
              <li><Link href="/support/returns" className="hover:text-blue-600 transition-colors">{t('返品・返金', 'Return & Refund', '退货与退款')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">
              {t('情報', 'Information', '信息')}
            </h3>
            <ul className="space-y-4 text-sm font-medium text-gray-500 uppercase tracking-widest text-[10px]">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">{t('私たちについて', 'About Us', '关于我们')}</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-blue-600 transition-colors">{t('プライバシーポリシー', 'Privacy Policy', '隐私政策')}</Link></li>
              <li><Link href="/legal/terms" className="hover:text-blue-600 transition-colors">{t('利用規約', 'Terms of Service', '服务条款')}</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">
                {t('お問い合わせ先', 'Get in touch', '联系方式')}
              </h3>
              <a href={`mailto:${supportEmail}`} className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
                <span>{supportEmail}</span>
              </a>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">
                {t('公式SNS', 'Follow us', '关注我们')}
              </h3>
              <div className="flex items-center gap-4">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-all hover:scale-110">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-all hover:scale-110">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                </Link>
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-all hover:scale-110">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="font-bold text-gray-900 mb-6 text-sm">
            {t('ご利用可能な決済方法', 'We accept', '支持的支付方式')}
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: 'American Express', src: '/payment-logos/american-express.png' },
              { name: 'Mastercard', src: '/payment-logos/mastercard.webp' },
              { name: 'PayPal', src: '/payment-logos/paypal.png' },
              { name: 'Visa', src: '/payment-logos/visa.png' },
            ].map((logo) => (
              <div key={logo.name} className="bg-white border border-gray-200 px-3 py-1.5 rounded-md shadow-sm h-14 flex items-center justify-center">
                <img src={logo.src} alt={logo.name} className="max-h-8 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-center items-center gap-4 relative">
          <p className="text-center text-xs font-medium text-gray-500">
            © {new Date().getFullYear()} {storeName}
          </p>

          <button
            onClick={scrollToTop}
            className="absolute right-0 bottom-0 p-3 bg-gray-300/50 hover:bg-gray-400/50 text-white rounded-md transition-colors shadow-sm"
            aria-label={t('ページ上部へ戻る', 'Back to top', '返回顶部')}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
