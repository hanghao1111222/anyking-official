'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';
import { Cpu, Settings, Sparkles } from 'lucide-react';
import { buildAboutStory, getFeaturedProduct, getSiteLanguage, getStoreName } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

export default function AboutPage() {
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);
  const featuredProduct = getFeaturedProduct();
  const story = buildAboutStory(featuredProduct);

  return (
    <InfoLayout title={t('私たちについて', 'About Us', '关于我们')} category={t('会社情報', 'Company', '品牌')}>
      <div className="space-y-12">
        <section>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Cpu className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold">{t('私たちのミッション', 'Our Mission', '我们的使命')}</h2>
          </div>
          <p className="mb-6 text-lg leading-relaxed">{story.mission}</p>
          <p>
            {t(
              `${storeName} は、構造化された商品素材を、商品カードからチェックアウトまで一貫したストア体験へ変換するために設計されています。`,
              `${storeName} is designed to turn structured product assets into a polished storefront that feels complete from the first product card to the final checkout step.`,
              `${storeName} 被设计成能把结构化商品素材转化为从商品卡片到结账流程都一致完整的独立站体验。`,
            )}
          </p>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
              <Settings className="h-6 w-6 text-gray-700" />
            </div>
            <h2 className="text-xl font-bold">{t('一貫性のある体験設計', 'Built for Consistency', '一致性的体验设计')}</h2>
          </div>
          <p className="mb-4">{story.craftsmanship}</p>
          <p>
            {t(
              '公開ページ全体で商品情報・サポート導線・販売メッセージを統一し、未完成なテンプレート感をなくします。',
              'Every public page is expected to match the current catalog, support channels, and merchandising message so customers never feel like they landed on an unfinished template.',
              '我们会统一公开页面里的商品信息、支持路径和销售表达，避免用户感受到“模板还没做完”的割裂感。',
            )}
          </p>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
              <Sparkles className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold">{t('私たちが重視すること', 'What We Prioritize', '我们重视什么')}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {story.values.map(value => (
              <div key={value} className="rounded-2xl bg-gray-50 p-6">
                <h3 className="mb-2 font-bold">{value}</h3>
                <p className="text-sm text-gray-600">
                  {featuredProduct?.name
                    ? t(
                      `${featuredProduct.name} の商品ページ・サポート・チェックアウト全体で「${value}」を明確に伝えます。`,
                      `${value} is surfaced clearly across ${featuredProduct.name} landing, support, and checkout flows.`,
                      `我们会在 ${featuredProduct.name} 的商品页、支持页和结账流程中清晰传达「${value}」。`,
                    )
                    : t(
                      `${value} をストア全体で一貫して伝えます。`,
                      `${value} stays visible across the storefront and support experience.`,
                      `我们会在整个站点与支持体验中持续传达「${value}」。`,
                    )}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </InfoLayout>
  );
}
