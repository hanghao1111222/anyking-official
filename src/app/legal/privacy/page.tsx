'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';
import { getSiteLanguage, getStoreName, getSupportEmail } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

export default function PrivacyPage() {
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);

  return (
    <InfoLayout title={t('プライバシーポリシー', 'Privacy Policy', '隐私政策')} category={t('法務', 'Legal', '法务')}>
      <div className="space-y-8">
        <section className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">{t('施行日: 2026年4月3日', 'Effective Date: April 3, 2026', '生效日期：2026年4月3日')}</p>
          <p className="text-gray-600">
            {t(
              `${storeName} はお客様のプライバシーを尊重し、個人情報を注文処理・カスタマーサポート・不正防止・法令順守の目的でのみ利用します。`,
              `${storeName} respects your privacy and handles personal information only for order fulfilment, customer service, fraud prevention, and lawful business operations.`,
              `${storeName} 尊重你的隐私，并仅会将个人信息用于订单处理、客户支持、风险防范和合规经营。`,
            )}
          </p>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">{t('01. 取得する情報', '01. Data We Collect', '01. 我们收集的信息')}</h2>
          <p className="font-normal text-gray-600">{t('本ストア利用時に、以下の情報を取得する場合があります。', 'When you use this storefront, we may collect:', '当你使用本店铺时，我们可能会收集以下信息：')}</p>
          <ul className="list-disc space-y-2 pl-5 text-sm italic text-gray-600">
            <li><span className="font-bold text-gray-900">{t('本人情報:', 'Identity data:', '身份信息：')}</span> {t('氏名、アカウント識別子。', 'name or account identifier.', '姓名、账户标识信息。')}</li>
            <li><span className="font-bold text-gray-900">{t('連絡先情報:', 'Contact data:', '联系信息：')}</span> {t('メール、電話番号、請求先住所、配送先住所。', 'email address, phone number, billing address, and delivery address.', '邮箱、电话号码、账单地址和收货地址。')}</li>
            <li><span className="font-bold text-gray-900">{t('取引情報:', 'Transaction data:', '交易信息：')}</span> {t('注文内容、決済状況、返金、配送状況。', 'order details, payment status, refunds, and shipment updates.', '订单详情、支付状态、退款信息和物流状态。')}</li>
            <li><span className="font-bold text-gray-900">{t('技術情報:', 'Technical data:', '技术信息：')}</span> {t('サービス保護のための基本的なアクセス解析や端末情報。', 'basic analytics and device information used to secure the service.', '用于保障服务安全的基础访问分析和设备信息。')}</li>
          </ul>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">{t('02. 利用目的', '02. How We Use Your Data', '02. 使用目的')}</h2>
          <p className="font-normal text-gray-600">{t('個人情報は、購入処理、サポート提供、サービス改善、法令順守のために利用します。', 'We use personal data to process purchases, provide support, improve service quality, and comply with legal obligations.', '个人信息将用于完成购买、提供支持、改进服务体验以及履行法定义务。')}</p>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">{t('03. 情報セキュリティ', '03. Data Security', '03. 信息安全')}</h2>
          <p className="font-normal text-gray-600">
            {t(
              '不正アクセス・不正利用・情報漏えいを防ぐため、合理的な管理的・技術的対策を実施しています。',
              'Reasonable administrative and technical controls are used to protect data from unauthorized access, misuse, or disclosure.',
              '我们会采取合理的管理和技术措施，以防止未经授权的访问、滥用或信息泄露。',
            )}
          </p>
        </section>

        <section className="rounded-3xl border border-blue-100/50 bg-blue-50/50 p-8">
          <h3 className="mb-2 font-bold">{t('個人情報に関する請求', 'Privacy Requests', '隐私请求')}</h3>
          <p className="text-sm font-medium text-gray-600">
            {t('開示・訂正・削除のご請求は ', 'To request access, correction, or deletion of your personal data, contact ', '如需申请访问、更正或删除个人信息，请联系 ')}
            <a href={`mailto:${getSupportEmail()}`} className="font-bold underline">{getSupportEmail()}</a>
            {t(' までご連絡ください。', '.', '。')}
          </p>
        </section>

        <section>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>{t(`${storeName} 法務窓口`, `${storeName} Legal Desk`, `${storeName} 法务窗口`)}</span>
            <span className="h-px w-8 bg-gray-200" />
            <span>Ref: 2026-PRIV-001</span>
          </div>
        </section>
      </div>
    </InfoLayout>
  );
}
