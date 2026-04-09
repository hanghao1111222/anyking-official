'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { formatStorePrice, getComparisonRows, getProducts, getSiteLanguage, getStoreName } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

export default function ComparisonPage() {
  const products = getProducts().slice(0, 2);
  const rows = getComparisonRows(products);
  const [left, right] = products;
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);

  if (!left || !right) {
    return (
      <div className="min-h-screen bg-white px-4 pb-20 pt-32 text-gray-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-black uppercase italic tracking-tighter">Comparison</h1>
          <p className="text-gray-500">
            {t(
              `比較ページを表示するには、catalog に最低2商品が必要です（${storeName}）。`,
              `Add at least two products to the catalog to unlock the comparison view for ${storeName}.`,
              `要显示对比页，${storeName} 的 catalog 中至少需要 2 个商品。`,
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 pb-20 pt-32 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-black uppercase italic tracking-tighter text-gray-900 sm:text-6xl">
            {t('商品比較', 'Product Comparison', '商品对比')}
          </h1>
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            {t('公開前に現在の商品を横並びで比較できます', 'Compare the current catalog side by side before you publish', '发布前可并排比较当前商品内容')}
          </p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="col-span-1" />
          {[left, right].map(product => (
            <div key={product.slug} className="space-y-4 text-center">
              <div className="mb-4 aspect-video overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                <img src={product.images.thumbnail || product.images.gallery?.[0]} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <h3 className="text-xl font-black uppercase italic tracking-tight">{product.name}</h3>
              <p className="text-2xl font-bold text-red-600">{product.price || formatStorePrice(0)}</p>
              <Link href={`/product/${product.slug}`}>
                <Button variant={product.slug === right.slug ? 'default' : 'outline'} className="w-full rounded-full text-xs font-bold uppercase tracking-widest">
                  {t('商品を見る', 'View Product', '查看商品')}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="w-1/3 px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">{t('主要スペック', 'Key Specs', '关键规格')}</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-900">{left.name}</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-blue-600">{right.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map(row => (
                <tr key={row.label} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-8 py-5 text-sm font-bold uppercase tracking-tight text-gray-500">{row.label}</td>
                  <td className="px-8 py-5 text-sm font-medium italic text-gray-900">{row.left}</td>
                  <td className="px-8 py-5 text-sm font-black italic text-gray-900">{row.right}</td>
                </tr>
              ))}
              <tr>
                <td className="px-8 py-5 text-sm font-bold uppercase tracking-tight text-gray-500">{t('特徴数', 'Feature count', '卖点数量')}</td>
                <td className="px-8 py-5 text-sm text-gray-900">{left.features.length}</td>
                <td className="px-8 py-5 text-sm text-gray-900">{right.features.length}</td>
              </tr>
              <tr>
                <td className="px-8 py-5 text-sm font-bold uppercase tracking-tight text-gray-500">{t('サポート導線', 'Support ready', '支持页状态')}</td>
                <td className="px-8 py-5 text-green-600">{t('対応済み', 'Yes', '已就绪')}</td>
                <td className="px-8 py-5 text-green-600">{t('対応済み', 'Yes', '已就绪')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 rounded-[40px] border border-gray-200/50 bg-gray-50 p-10">
            <Sparkles className="h-10 w-10 text-yellow-500" />
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">{left.name}</h3>
            <p className="font-medium leading-relaxed text-gray-600">
              {left.best || left.subtitle || left.description}
            </p>
          </div>
          <div className="space-y-4 rounded-[40px] border border-blue-100 bg-blue-50/50 p-10">
            <ShieldCheck className="h-10 w-10 text-blue-600" />
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">{right.name}</h3>
            <p className="font-medium leading-relaxed text-gray-600">
              {right.best || right.subtitle || right.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
