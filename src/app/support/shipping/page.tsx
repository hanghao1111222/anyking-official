'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';
import { Clock, Globe, Package } from 'lucide-react';
import { getFeaturedProduct, getProductSiteContent, getShippingZones, getSiteLanguage, getStoreName } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

export default function ShippingPage() {
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);
  const product = getFeaturedProduct();
  const content = getProductSiteContent(product);
  const zones = getShippingZones();

  return (
    <InfoLayout title={t('配送ポリシー', 'Shipping Policy', '物流政策')} category={t('サポート', 'Support', '支持')}>
      <div className="space-y-12">
        <section className="space-y-4">
          <p className="text-gray-600">{content.support.shippingSummary}</p>
        </section>

        <section className="space-y-6">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Clock className="h-5 w-5 text-blue-600" />
            {t('配送目安', 'Estimated Delivery Times', '配送时效')}
          </h2>
          <div className="overflow-hidden rounded-3xl border border-gray-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs font-bold uppercase tracking-widest text-gray-400">
                <tr>
                  <th className="px-6 py-4">{t('配送エリア', 'Shipment Zone', '配送区域')}</th>
                  <th className="px-6 py-4">{t('到着目安', 'Estimated Time', '预计时效')}</th>
                  <th className="px-6 py-4">{t('配送会社', 'Courier', '承运商')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {zones.map(zone => (
                  <tr key={zone.zone} className="transition-colors hover:bg-blue-50/30">
                    <td className="px-6 py-4 font-bold text-gray-900">{zone.zone}</td>
                    <td className="px-6 py-4 text-gray-600">{zone.eta}</td>
                    <td className="px-6 py-4 font-medium text-gray-600">{zone.courier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-blue-100/50 bg-blue-50/50 p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <Package className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-bold">{t('梱包基準', 'Packing standard', '包装标准')}</h3>
            <p className="text-sm text-gray-600">
              {product?.name
                ? t(
                  `${product.name} は輸送中の破損を防ぐ保護梱包で出荷されます。`,
                  `${product.name} is packed with the protective materials required for parcel shipping and normal warehouse handling.`,
                  `${product.name} 会使用适合包裹运输的保护性包装发出，以降低运输损坏风险。`,
                )
                : t(
                  `${storeName} はEC配送に適した保護梱包を採用しています。`,
                  `${storeName} uses protective packaging appropriate for ecommerce fulfilment.`,
                  `${storeName} 采用适合电商配送的保护性包装方案。`,
                )}
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-bold">{t('追跡について', 'Tracking your order', '物流追踪')}</h3>
            <p className="text-sm text-gray-600">
              {t(
                '発送確定後、チェックアウト時のメールアドレスへ追跡番号をお送りします。',
                `As soon as the shipment is confirmed, ${storeName} sends a tracking update to the email used during checkout.`,
                `发货确认后，${storeName} 会把物流追踪信息发送到你下单时填写的邮箱。`,
              )}
            </p>
          </div>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('関税・輸入税', 'Customs and duties', '关税与进口税')}</p>
          <p className="mt-2 text-sm text-gray-600">
            {t(
              '関税・輸入税は配送先国の規定に基づき、特別記載がない限り受取人負担となります。',
              'Local import duties or taxes are charged according to the destination country and are the responsibility of the recipient unless otherwise stated on the checkout page.',
              '关税和进口税将根据收货国家/地区规定收取，除非结账页面另有说明，否则通常由收件人承担。',
            )}
          </p>
        </section>
      </div>
    </InfoLayout>
  );
}
