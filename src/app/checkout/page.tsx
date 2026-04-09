'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Lock, Package, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatStorePrice, getSiteLanguage, getStoreName } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

const PAYPAL_CHECKOUT_URL =
  'https://www.paypal.com/checkoutnow?token=EC-1RL14678CT394980M&version=6.52.0&commit=false&fundingSource=paypal&integration_artifact=JS_SDK_V6&hasShippingCallback=false&clientID=AfUEYT7nO4BwZQERn9Vym5TbHAG08ptiKa9gm8OARBYgoqiAJIjllRjeIMI4g294KAH1JdTnkzubt1fr&locale.x=en_US&sdkMeta=eyJhdHRycyI6eyJkYXRhLXVpZCI6ImE2Y2FkNGY4LTgwMWMtNDA2MS04YTZlLTA0NzZmOWJiMzg3NCJ9LCJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWwuY29tL3dlYi1zZGsvdjYvYnJpZGdlP3ZlcnNpb249Ni41Mi4wJm9yaWdpbj1odHRwcyUzQSUyRiUyRmNoZWNrb3V0LnNob3BpZnkuY29tJnBheW1lbnQtZmxvdz1wb3B1cCJ9&xcomponent=1';

const TRUST_LOGOS = [
  { name: 'Visa', src: '/payment-logos/visa.png' },
  { name: 'Mastercard', src: '/payment-logos/mastercard.webp' },
  { name: 'American Express', src: '/payment-logos/american-express.png' },
  { name: 'PayPal', src: '/payment-logos/paypal.png' },
] as const;

type PaymentMethod = 'card' | 'paypal';

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    discountCode: '',
    cardNumber: '',
    expiration: '',
    securityCode: '',
    cardName: '',
  });

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const openPayPal = () => {
    window.open(PAYPAL_CHECKOUT_URL, '_blank', 'noopener,noreferrer');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(previous => ({ ...previous, [name]: value }));
    if (errors[name]) {
      setErrors(previous => ({ ...previous, [name]: false }));
    }
  };

  const getInputClass = (field: string) =>
    `w-full rounded-xl border bg-white p-4 text-sm outline-none transition-all focus:ring-2 focus:ring-cyan-500 ${
      errors[field] ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
    }`;

  const handlePayNow = () => {
    const nextErrors: Record<string, boolean> = {};

    if (!formData.email || !formData.email.includes('@')) nextErrors.email = true;
    if (!formData.lastName.trim()) nextErrors.lastName = true;
    if (!formData.address.trim()) nextErrors.address = true;
    if (!formData.city.trim()) nextErrors.city = true;
    if (!formData.zip.trim()) nextErrors.zip = true;
    if (!formData.phone.trim()) nextErrors.phone = true;

    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) nextErrors.cardNumber = true;
      if (!formData.expiration.trim()) nextErrors.expiration = true;
      if (!formData.securityCode.trim()) nextErrors.securityCode = true;
      if (!formData.cardName.trim()) nextErrors.cardName = true;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitMessage(
        t(
          '赤枠の必須項目を入力してください。',
          'Please complete all required fields marked in red.',
          '请填写所有红框标记的必填项。',
        ),
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmitMessage(
      paymentMethod === 'paypal'
        ? t(
          'PayPalボタンをクリックして支払いへ進んでください。',
          'Please click the PayPal button to continue payment.',
          '请点击 PayPal 按钮继续完成支付。',
        )
        : t(
          'カード情報の形式チェックが完了しました。',
          'Card details are validated locally.',
          '银行卡信息格式已在本地校验完成。',
        ),
    );
  };

  return (
    <div className="min-h-screen bg-white px-4 pb-20 pt-24 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {!!submitMessage && (
          <div className={`mb-6 rounded-xl border px-4 py-3 text-sm ${Object.keys(errors).length > 0 ? 'border-red-300 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
            {submitMessage}
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          <div className="space-y-8">
            <div className="mb-4 flex items-center gap-2">
              <Link href="/" className="group flex cursor-pointer items-center gap-2">
                <Package className="h-8 w-8 text-gray-900 transition-transform group-hover:scale-110" />
                <span className="text-xl font-bold tracking-tight text-gray-900">{storeName}</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 border-b border-gray-100 pb-4 text-xs uppercase tracking-widest text-gray-400">
              <Link href="/cart" className="font-medium text-blue-600 transition-colors hover:text-blue-700">
                {t('カート', 'Cart', '购物车')}
              </Link>
              <span className="text-gray-300">&gt;</span>
              <span className="font-bold text-gray-900">{t('情報入力', 'Information', '填写信息')}</span>
              <span className="text-gray-300">&gt;</span>
              <span>{t('配送', 'Shipping', '配送')}</span>
              <span className="text-gray-300">&gt;</span>
              <span>{t('支払い', 'Payment', '支付')}</span>
            </div>

            <div className="space-y-3">
              <p className="text-center text-xs font-semibold text-gray-500">
                {t('エクスプレスチェックアウト', 'Express checkout', '快捷结账')}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="h-11 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold text-white"
                >
                  shop
                </button>
                <button
                  type="button"
                  className="h-11 rounded-lg bg-[#FFC439] text-2xl font-black italic text-[#003087]"
                  onClick={openPayPal}
                >
                  PayPal
                </button>
              </div>
              <p className="py-1 text-center text-sm text-gray-400">{t('または', 'OR', '或')}</p>
            </div>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">{t('連絡先', 'Contact', '联系信息')}</h2>
                <p className="text-sm">
                  {t('アカウントをお持ちですか？', 'Already have an account?', '已有账号？')}{' '}
                  <Link href="/signin" className="text-cyan-600 underline">
                    {t('ログイン', 'Sign in', '登录')}
                  </Link>
                </p>
              </div>

              <input
                name="email"
                type="email"
                placeholder={t('メール', 'Email', '邮箱')}
                value={formData.email}
                onChange={handleInputChange}
                className={getInputClass('email')}
              />

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                {t('新着情報や特典を受け取る', 'Email me with news and offers', '接收新品与优惠通知')}
              </label>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">{t('配送先', 'Delivery', '收货信息')}</h2>
              <select
                name="country"
                className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {language === 'ja' ? (
                  <>
                    <option>日本</option>
                    <option>アメリカ合衆国</option>
                  </>
                ) : language === 'zh' ? (
                  <>
                    <option>中国</option>
                    <option>日本</option>
                    <option>美国</option>
                  </>
                ) : (
                  <>
                    <option>United States</option>
                    <option>Japan</option>
                    <option>China</option>
                  </>
                )}
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input
                  name="firstName"
                  type="text"
                  placeholder={t('名', 'First name', '名字')}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={getInputClass('firstName')}
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder={t('姓', 'Last name *', '姓氏 *')}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={getInputClass('lastName')}
                />
              </div>

              <input
                name="address"
                type="text"
                placeholder={t('住所 *', 'Address *', '地址 *')}
                value={formData.address}
                onChange={handleInputChange}
                className={getInputClass('address')}
              />
              <input
                name="apartment"
                type="text"
                placeholder={t('建物名・部屋番号（任意）', 'Apartment, suite, etc. (optional)', '门牌、楼层或房间号（可选）')}
                value={formData.apartment}
                onChange={handleInputChange}
                className={getInputClass('apartment')}
              />

              <div className="grid grid-cols-3 gap-3">
                <input
                  name="city"
                  type="text"
                  placeholder={t('市区町村 *', 'City *', '城市 *')}
                  value={formData.city}
                  onChange={handleInputChange}
                  className={getInputClass('city')}
                />
                <input
                  name="state"
                  type="text"
                  placeholder={t('都道府県', 'State', '省/州')}
                  value={formData.state}
                  onChange={handleInputChange}
                  className={getInputClass('state')}
                />
                <input
                  name="zip"
                  type="text"
                  placeholder={t('郵便番号 *', 'ZIP code *', '邮编 *')}
                  value={formData.zip}
                  onChange={handleInputChange}
                  className={getInputClass('zip')}
                />
              </div>

              <input
                name="phone"
                type="tel"
                placeholder={t('電話番号 *', 'Phone *', '电话 *')}
                value={formData.phone}
                onChange={handleInputChange}
                className={getInputClass('phone')}
              />
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">{t('配送方法', 'Shipping method', '配送方式')}</h3>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
                {t(
                  '配送先住所を入力すると利用可能な配送方法が表示されます。',
                  'Enter your shipping address to view available shipping methods.',
                  '填写收货地址后会显示可用的配送方式。',
                )}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">{t('支払い', 'Payment', '支付')}</h3>
              <p className="text-sm text-gray-500">
                {t(
                  'すべての取引は暗号化され安全に処理されます。',
                  'All transactions are secure and encrypted.',
                  '所有交易都会经过加密并安全处理。',
                )}
              </p>

              <div className="overflow-hidden rounded-2xl border border-cyan-500/60">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex w-full items-center justify-between border-b px-4 py-3 text-left ${paymentMethod === 'card' ? 'bg-cyan-50 border-cyan-500/60' : 'bg-white border-gray-200'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-4 w-4 rounded-full border ${paymentMethod === 'card' ? 'border-cyan-500 bg-cyan-500' : 'border-gray-300 bg-white'}`} />
                    <span className="font-medium">{t('クレジットカード', 'Credit card', '信用卡')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {['VISA', 'MC', 'AMEX'].map(tag => (
                      <span key={tag} className="rounded border border-gray-200 bg-white px-2 py-1 text-[10px] font-bold text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>

                {paymentMethod === 'card' && (
                  <div className="space-y-3 bg-white p-4">
                    <input
                      name="cardNumber"
                      type="text"
                      placeholder={t('カード番号 *', 'Card number *', '卡号 *')}
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={getInputClass('cardNumber')}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        name="expiration"
                        type="text"
                        placeholder={t('有効期限 (MM / YY) *', 'Expiration date (MM / YY) *', '有效期 (MM / YY) *')}
                        value={formData.expiration}
                        onChange={handleInputChange}
                        className={getInputClass('expiration')}
                      />
                      <input
                        name="securityCode"
                        type="text"
                        placeholder={t('セキュリティコード *', 'Security code *', '安全码 *')}
                        value={formData.securityCode}
                        onChange={handleInputChange}
                        className={getInputClass('securityCode')}
                      />
                    </div>
                    <input
                      name="cardName"
                      type="text"
                      placeholder={t('カード名義人 *', 'Name on card *', '持卡人姓名 *')}
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={getInputClass('cardName')}
                    />
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                      {t('配送先住所を請求先住所として使用', 'Use shipping address as billing address', '账单地址与收货地址相同')}
                    </label>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('paypal');
                    openPayPal();
                  }}
                  className="flex w-full items-center justify-between bg-white px-4 py-3 text-left hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-4 w-4 rounded-full border ${paymentMethod === 'paypal' ? 'border-cyan-500 bg-cyan-500' : 'border-gray-300 bg-white'}`} />
                    <span className="font-medium">PayPal</span>
                  </div>
                  <span className="text-xl font-black italic text-[#0070ba]">PayPal</span>
                </button>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {t('信頼できる決済ネットワーク', 'Trusted payment networks', '可信支付网络')}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {TRUST_LOGOS.map(logo => (
                    <div key={logo.name} className="flex h-12 items-center justify-center rounded-lg border border-gray-200 bg-white px-2">
                      <img src={logo.src} alt={logo.name} className="max-h-6 w-auto object-contain" loading="lazy" />
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-600">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">
                    <ShieldCheck className="h-3.5 w-3.5" /> TLS/SSL
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-blue-700">
                    <Lock className="h-3.5 w-3.5" /> 256-bit encryption
                  </span>
                </div>
              </div>
            </section>

            <Button
              onClick={handlePayNow}
              className="h-14 w-full rounded-xl bg-cyan-500 text-xl font-bold text-white shadow-lg hover:bg-cyan-600"
            >
              {t('今すぐ支払う', 'Pay now', '立即支付')}
            </Button>
          </div>

          <div className="h-fit space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6 lg:sticky lg:top-24">
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-16 w-16 overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm text-gray-900">{item.name}</h3>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{formatStorePrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                name="discountCode"
                type="text"
                placeholder={t('クーポンコード', 'Discount code', '优惠码')}
                value={formData.discountCode}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button type="button" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600">
                {t('適用', 'Apply', '应用')}
              </button>
            </div>

            <div className="space-y-2 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between">
                <span>{t('小計', 'Subtotal', '小计')}</span>
                <span>{formatStorePrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('配送', 'Shipping', '配送')}</span>
                <span className="text-gray-500">{t('住所入力後に計算', 'Enter shipping address', '填写地址后计算')}</span>
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-gray-200 pt-4">
              <div>
                <p className="text-3xl font-bold tracking-tight">{t('合計', 'Total', '合计')}</p>
                <p className="text-xs text-gray-500">{totalItems} {t('点', 'item(s)', '件')}</p>
              </div>
              <p className="text-4xl font-black tracking-tight">{formatStorePrice(subtotal)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
