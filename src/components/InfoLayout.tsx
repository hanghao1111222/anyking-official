'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Bookmark, Package } from 'lucide-react';
import { getSiteLanguage, getStoreName } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

interface InfoLayoutProps {
  title: string;
  category: string;
  children: React.ReactNode;
}

export default function InfoLayout({ title, category, children }: InfoLayoutProps) {
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);

  const sidebarLinks = [
    { title: t('私たちについて', 'About Us', '关于我们'), href: '/about' },
    { title: t('お問い合わせ', 'Contact Us', '联系我们'), href: '/support/contact' },
    { title: t('配送ポリシー', 'Shipping Policy', '物流政策'), href: '/support/shipping' },
    { title: t('返品・返金', 'Return & Refund', '退货与退款'), href: '/support/returns' },
    { title: t('プライバシーポリシー', 'Privacy Policy', '隐私政策'), href: '/legal/privacy' },
    { title: t('利用規約', 'Terms of Service', '服务条款'), href: '/legal/terms' },
    { title: 'FAQs', href: '/support/faqs' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <Package className="w-8 h-8 text-gray-900 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold text-gray-900">
                {storeName}
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                {t('ショップ', 'Shop', '商店')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
            <Link href="/" className="hover:text-blue-600 transition-colors">{t('ホーム', 'Home', '首页')}</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900">{title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-16">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                    <Bookmark className="w-3 h-3 text-blue-600" />
                    {t('ページ一覧', 'Resources', '页面导航')}
                  </h3>
                  <ul className="space-y-4">
                    {sidebarLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`text-sm font-bold uppercase tracking-wider transition-all hover:text-blue-600 block ${
                            title === link.title ? 'text-blue-600' : 'text-gray-500'
                          }`}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            <main className="flex-1 max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tighter uppercase italic mb-12 leading-none">
                {title}
              </h1>
              <div className="prose prose-blue max-w-none prose-sm sm:prose-base prose-headings:text-gray-900 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
