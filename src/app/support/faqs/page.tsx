'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';
import { HelpCircle } from 'lucide-react';
import { getFeaturedProduct, getProductSiteContent, getSiteLanguage, getStoreName } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

export default function FAQPage() {
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);
  const product = getFeaturedProduct();
  const content = getProductSiteContent(product);

  return (
    <InfoLayout title="FAQs" category={t('サポート', 'Support', '支持')}>
      <div className="space-y-6">
        <p className="mb-8 italic text-gray-500">
          {t(
            `これらの回答は、現在の注力商品と ${storeName} のサポート体制に合わせて生成されています。`,
            `These answers are aligned with the current featured product and support setup for ${storeName}.`,
            `这些问答内容会根据当前主推商品和 ${storeName} 的支持设置自动生成。`,
          )}
        </p>

        <div className="space-y-4">
          {content.faq.map(faq => (
            <div key={faq.question} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 transition-colors hover:bg-gray-50">
              <div className="flex gap-4">
                <HelpCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="space-y-4">
                  <h3 className="text-lg font-bold leading-tight text-gray-900">{faq.question}</h3>
                  <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-dashed border-gray-200 p-8 text-center">
          <p className="mb-4 font-bold text-gray-900">{t('ほかにもご不明点がありますか？', 'Need more help?', '还有其他问题吗？')}</p>
          <a href="/support/contact" className="inline-block rounded-full bg-blue-600 px-8 py-3 font-bold text-white transition-colors hover:bg-blue-700">
            {t('サポートへ連絡', 'Contact Support', '联系支持团队')}
          </a>
        </div>
      </div>
    </InfoLayout>
  );
}
