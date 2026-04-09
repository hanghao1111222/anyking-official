'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';
import { getSiteLanguage, getStoreName, getSupportEmail } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

export default function TermsPage() {
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);

  return (
    <InfoLayout title={t('利用規約', 'Terms of Service', '服务条款')} category={t('法務', 'Legal', '法务')}>
      <div className="space-y-8">
        <section className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">{t('施行日: 2026年4月3日', 'Effective Date: April 3, 2026', '生效日期：2026年4月3日')}</p>
          <p className="text-gray-600">
            {t(
              `${storeName} のサイトを利用・購入することで、本規約および関連する配送・返品・プライバシーポリシーに同意したものとみなされます。`,
              `By accessing or purchasing through ${storeName}, you agree to these terms and the related shipping, return, and privacy policies published on this website.`,
              `访问或通过 ${storeName} 完成购买，即表示你同意本条款以及站内相关的物流、退货和隐私政策。`,
            )}
          </p>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">{t('01. 注文と決済', '01. Orders and Payment', '01. 订单与支付')}</h2>
          <p className="font-normal text-gray-600">
            {t(
              '価格誤記、在庫不足、不正の疑いがある場合、注文を拒否または取消する場合があります。',
              'Orders may be refused or cancelled if pricing is incorrect, inventory is unavailable, or activity appears fraudulent.',
              '若出现价格错误、库存不足或疑似异常交易，我们可能拒绝或取消订单。',
            )}
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm italic text-gray-600">
            <li>{t('決済はチェックアウト画面に表示される方法で行われます。', 'Payment is captured using the payment methods shown during checkout.', '支付将按照结账页面展示的方式进行。')}</li>
            <li>{t('重大な価格誤記がある場合は、出荷前にご連絡します。', 'If a material pricing error occurs, the customer will be contacted before fulfilment.', '若存在明显价格错误，我们会在发货前联系你确认。')}</li>
          </ul>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">{t('02. 知的財産権', '02. Intellectual Property', '02. 知识产权')}</h2>
          <p className="font-normal text-gray-600">
            {t(
              `サイト上の画像、文言、ソフトウェア等の権利は、別途記載がない限り ${storeName} または権利者に帰属します。`,
              `Storefront content, visual assets, product copy, and software remain the property of ${storeName} or its licensors unless stated otherwise.`,
              `除非另有说明，站内图片、文案、软件及其他内容的权利均归 ${storeName} 或其授权方所有。`,
            )}
          </p>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">{t('03. 免責事項', '03. Limitation of Liability', '03. 责任限制')}</h2>
          <p className="font-normal text-gray-600">
            {t(
              `法令で認められる範囲内で、サイト利用または購入商品に起因する間接的・特別損害について ${storeName} は責任を負いません。`,
              `To the maximum extent permitted by law, ${storeName} is not liable for indirect or consequential damages related to the use of the website or purchased goods.`,
              `在法律允许的最大范围内，${storeName} 不对因使用网站或购买商品而产生的间接性或后果性损失承担责任。`,
            )}
          </p>
        </section>

        <section className="rounded-3xl border border-gray-100 bg-gray-50 p-8">
          <h3 className="mb-2 font-bold uppercase tracking-tighter">{t('規約に関するお問い合わせ', 'Questions About These Terms', '条款咨询')}</h3>
          <p className="text-sm font-medium italic text-gray-600">
            {t('ご購入前の確認事項は ', 'Reach out to ', '如需在购买前确认相关条款，请联系 ')}
            <a href={`mailto:${getSupportEmail()}`} className="font-bold underline">{getSupportEmail()}</a>
            {t(' までご連絡ください。', ' if you need clarification before purchasing.', '。')}
          </p>
        </section>

        <section>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>{t(`${storeName} 法務窓口`, `${storeName} Legal Desk`, `${storeName} 法务窗口`)}</span>
            <span className="h-px w-8 bg-gray-200" />
            <span>Ref: 2026-TERMS-001</span>
          </div>
        </section>
      </div>
    </InfoLayout>
  );
}
