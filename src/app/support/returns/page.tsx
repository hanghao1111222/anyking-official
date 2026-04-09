'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';
import { HelpCircle, ShieldCheck } from 'lucide-react';
import { getFeaturedProduct, getProductSiteContent, getSiteLanguage, getStoreName, getSupportEmail } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

export default function ReturnsPage() {
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);
  const product = getFeaturedProduct();
  const content = getProductSiteContent(product);

  return (
    <InfoLayout title={t('返品・返金', 'Return & Refund', '退货与退款')} category={t('サポート', 'Support', '支持')}>
      <div className="space-y-12">
        <section className="rounded-3xl border border-orange-100 bg-orange-50 p-8">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold italic tracking-tight">{t('返品ポリシー概要', 'Return Policy Overview', '退货政策概览')}</h2>
          </div>
          <p className="font-medium text-orange-900">{content.support.returnSummary}</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold uppercase tracking-tight italic">{t('返品条件', 'Eligibility for Returns', '退货条件')}</h2>
          <ul className="list-disc space-y-4 pl-5 text-gray-600">
            <li>{t('付属品・同梱品を含め、受領時に近い状態でご返送ください。', 'Items should be returned with all packaged accessories and included components.', '退回商品时请尽量保持与签收时接近的状态，并附带全部配件与包装内容。')}</li>
            <li>{t('初期不良を除き、再販売可能な状態であることが必要です。', 'Products should be in resellable condition unless the return is for a confirmed defect.', '除确认质量问题外，退回商品通常需要保持可再次销售的状态。')}</li>
            <li>{t('返送前に必ずサポートへご連絡ください。', 'Contact support before shipping anything back so the team can confirm the return workflow.', '寄回商品前请先联系支持团队确认退货流程。')}</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold uppercase tracking-tight italic">{t('手続きの流れ', 'Process', '处理流程')}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Step 01</span>
              <h3 className="font-bold italic underline decoration-blue-200 underline-offset-4">{t('サポートへ連絡', 'Contact Support', '联系支持团队')}</h3>
              <p className="text-sm text-gray-600">
                {t('注文番号と返品理由を記載して ', 'Email ', '请将订单号和退货原因发送至 ')}
                <a href={`mailto:${getSupportEmail()}`} className="font-bold underline transition-colors hover:text-blue-600">{getSupportEmail()}</a>
                {t(' までご連絡ください。', ' with your order number and reason for return.', '。')}
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Step 02</span>
              <h3 className="font-bold italic underline decoration-blue-200 underline-offset-4">{t('受付確認', 'Approval', '审核确认')}</h3>
              <p className="text-sm text-gray-600">
                {t(
                  `${storeName} が内容を確認し、返送先・検品手順をご案内します。`,
                  `${storeName} reviews the request and shares the next shipping or inspection instructions.`,
                  `${storeName} 会先审核申请内容，再发送退回地址和后续检查说明。`,
                )}
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Step 03</span>
              <h3 className="font-bold italic underline decoration-blue-200 underline-offset-4">{t('検品', 'Inspection', '检验')}</h3>
              <p className="text-sm text-gray-600">
                {t(
                  '返品商品を注文情報と照合し、返金または交換可否を判断します。',
                  'Returned items are checked against the original order details before a refund or replacement is approved.',
                  '我们会根据原订单信息核对退回商品，再确认是否可以退款或换货。',
                )}
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Step 04</span>
              <h3 className="font-bold italic underline decoration-blue-200 underline-offset-4">{t('返金または交換対応', 'Refund or Resolution', '退款或换货')}</h3>
              <p className="text-sm text-gray-600">
                {t(
                  '承認後、元の決済方法へ返金、または交換手続きをご案内します。',
                  'Approved refunds are sent back to the original payment method, or the support team confirms the replacement path.',
                  '审核通过后，我们会按原支付方式退款，或继续协助你完成换货处理。',
                )}
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-8">
            <HelpCircle className="h-10 w-10 text-gray-400" />
            <p className="text-sm italic text-gray-500">
              {t(
                `破損や付属品不足がある場合は、チャージバック申請前に ${storeName} サポートへご連絡ください。`,
                `Questions about a damaged order or missing accessories? Reach out to ${storeName} support before filing a chargeback so the team can resolve it directly.`,
                `如果收到的商品有破损或缺少配件，请先联系 ${storeName} 支持团队，再决定是否申请拒付。`,
              )}
            </p>
          </div>
        </section>
      </div>
    </InfoLayout>
  );
}
