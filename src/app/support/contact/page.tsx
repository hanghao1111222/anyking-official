'use client';

import React, { useState } from 'react';
import InfoLayout from '@/components/InfoLayout';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getFeaturedProduct,
  getProductSiteContent,
  getSiteLanguage,
  getStoreName,
  getSupportAddress,
  getSupportEmail,
  getSupportPhone,
  getSupportResponseTime,
} from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);
  const product = getFeaturedProduct();
  const content = getProductSiteContent(product);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <InfoLayout title={t('お問い合わせ', 'Contact Us', '联系我们')} category={t('サポート', 'Support', '支持')}>
      <div className="space-y-12">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            {submitted ? (
              <div className="rounded-3xl border border-green-100 bg-green-50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Send className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-green-900">{t('送信完了', 'Message Sent', '提交成功')}</h3>
                <p className="text-green-700">
                  {t(
                    `${storeName} へお問い合わせいただきありがとうございます。通常 ${getSupportResponseTime()} に返信します。`,
                    `Thank you for contacting ${storeName}. A reply is usually sent ${getSupportResponseTime()}.`,
                    `感谢联系 ${storeName}。我们通常会在 ${getSupportResponseTime()} 内回复。`,
                  )}
                </p>
                <Button variant="outline" className="mt-6 border-green-200 text-green-700 hover:bg-green-100" onClick={() => setSubmitted(false)}>
                  {t('もう一度送信する', 'Send another message', '再次发送')}
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('名', 'First Name', '名字')}</label>
                    <input type="text" required className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm outline-none focus:ring-2 focus:ring-blue-600" placeholder={t('太郎', 'John', '小明')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('姓', 'Last Name', '姓氏')}</label>
                    <input type="text" required className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm outline-none focus:ring-2 focus:ring-blue-600" placeholder={t('山田', 'Doe', '张')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('メールアドレス', 'Email Address', '邮箱地址')}</label>
                  <input type="email" required className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm outline-none focus:ring-2 focus:ring-blue-600" placeholder="name@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('お問い合わせ内容', 'Message', '留言内容')}</label>
                  <textarea required rows={5} className="w-full resize-none rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm outline-none focus:ring-2 focus:ring-blue-600" placeholder={t(`${product?.name || 'ご注文'}、配送、アフターサポートについてご記入ください。`, `Ask about ${product?.name || 'your order'}, shipping, or after-sales support.`, `请填写关于 ${product?.name || '订单'}、物流或售后支持的问题。`)} />
                </div>
                <Button className="h-auto w-full rounded-2xl bg-blue-600 py-6 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-blue-700">
                  {t('送信する', 'Send Message', '提交信息')}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-blue-100/50 bg-blue-50/50 p-8">
              <h3 className="mb-6 font-bold">{t('お問い合わせ窓口', 'Direct Channels', '联系渠道')}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">{t('メール', 'Email', '邮箱')}</p>
                    <a href={`mailto:${getSupportEmail()}`} className="font-bold text-gray-900 transition-colors hover:text-blue-600">{getSupportEmail()}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">{t('電話', 'Call', '电话')}</p>
                    <p className="font-bold text-gray-900">{getSupportPhone()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">{t('サポート住所', 'Support Address', '客服地址')}</p>
                    <p className="font-bold text-gray-900">{getSupportAddress()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8">
              <h3 className="mb-2 font-bold">{t('サポートポリシー', 'Support promise', '服务说明')}</h3>
              <p className="text-sm text-gray-600">{content.support.contactSummary}</p>
            </div>
          </div>
        </div>
      </div>
    </InfoLayout>
  );
}
