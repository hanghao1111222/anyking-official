'use client';

import Link from 'next/link';
import { Minus, Package, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatStorePrice, getSiteLanguage, getStoreName } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="group flex cursor-pointer items-center gap-2">
                <Package className="h-8 w-8 text-gray-900 transition-transform group-hover:scale-110" />
                <span className="text-xl font-bold text-gray-900">{storeName}</span>
              </Link>

              <div className="flex items-center gap-6">
                <Link href="/" className="font-medium text-gray-600 transition-colors hover:text-gray-900">
                  {t('商品一覧', 'Shop', '商店')}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">{t('カートは空です', 'Your cart is empty', '购物车为空')}</h1>
            <p className="mb-8 text-gray-600">
              {t('まだ商品が追加されていません。', `Looks like you haven't added anything to your cart yet.`, '你还没有将任何商品加入购物车。')}
            </p>
            <Link href="/">
              <Button className="h-auto bg-gray-900 px-8 py-6 text-lg font-semibold text-white hover:bg-gray-800">
                {t('買い物を続ける', 'Continue Shopping', '继续购物')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="group flex cursor-pointer items-center gap-2">
              <Package className="h-8 w-8 text-gray-900 transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold text-gray-900">{storeName}</span>
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/" className="font-medium text-gray-600 transition-colors hover:text-gray-900">
                {t('商品一覧', 'Shop', '商店')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900">{t('ショッピングカート', 'Cart', '购物车')}</h1>
            <Link href="/" className="text-sm font-medium text-gray-600 underline underline-offset-4 hover:text-gray-900">
              {t('買い物を続ける', 'Continue shopping', '继续购物')}
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="hidden grid-cols-4 border-b border-gray-200 pb-4 text-xs font-bold uppercase tracking-wider text-gray-400 md:grid">
                <div className="col-span-2">{t('商品情報', 'Product Info', '商品信息')}</div>
                <div className="text-center">{t('数量', 'Quantity', '数量')}</div>
                <div className="text-right">{t('価格', 'Price', '价格')}</div>
              </div>

              {items.map(item => (
                <div key={item.id} className="grid items-center gap-6 border-b border-gray-100 pb-8 md:grid-cols-4">
                  <div className="col-span-2 flex gap-6">
                    <Link href={`/product/${item.id}`} className="w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 transition-colors hover:border-blue-300">
                      <img src={item.image} alt={item.name} className="h-24 w-full object-cover" />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="mb-1 line-clamp-2 text-sm font-bold uppercase leading-tight text-gray-900 transition-colors hover:text-blue-600">
                          {item.name}
                        </h3>
                      </Link>
                      <button onClick={() => removeItem(item.id)} className="w-fit text-gray-400 transition-colors hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex h-10 items-center overflow-hidden rounded-lg border border-gray-200">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 text-gray-600 transition-colors hover:bg-gray-50">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[3rem] px-4 text-center font-mono text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 text-gray-600 transition-colors hover:bg-gray-50">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center text-right">
                    <p className="text-sm font-bold text-orange-600">{formatStorePrice(item.price * item.quantity)}</p>
                    {item.originalPrice && (
                      <p className="text-xs text-gray-400 line-through">{formatStorePrice(item.originalPrice * item.quantity)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-gray-100 bg-gray-50 p-8">
                <div className="space-y-6">
                  <div>
                    <input type="text" placeholder={t('クーポンコード', 'Discount code', '优惠码')} className="mb-2 w-full rounded-lg border border-gray-200 bg-white p-3 text-sm" />
                    <Button variant="outline" className="w-full border-gray-200 bg-white py-3 font-bold text-gray-900 hover:bg-gray-50">
                      {t('適用', 'Apply', '应用')}
                    </Button>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-lg font-bold uppercase tracking-wide text-gray-900">{t('合計', 'Total', '合计')}</span>
                      <span className="text-2xl font-bold text-gray-900">{formatStorePrice(subtotal)}</span>
                    </div>

                    <Link href="/checkout">
                      <Button className="h-auto w-full rounded-xl bg-gray-900 py-6 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-gray-800 active:scale-[0.98]">
                        {t('レジへ進む', 'Check out', '去结账')}
                      </Button>
                    </Link>
                    <p className="mt-4 text-center text-[10px] text-gray-500">
                      {t('送料と税金はチェックアウト時に計算されます', 'Taxes and shipping calculated at checkout', '运费和税费将在结账时计算')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
