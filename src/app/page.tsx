'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Star, Zap, Users, Briefcase, Package, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import catalogData from '@/data/catalog.json';
import { getSiteLanguage, getStoreName } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';
import type { Product } from '@/types/product';

export default function HomePage() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);
  const catalogProducts = catalogData.products as unknown as Product[];

  const products = catalogProducts.filter(product => product.slug && product.name).map(product => ({
    id: product.slug,
    name: product.name,
    subtitle: product.subtitle,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    rating: product.rating || 4.9,
    reviews: product.reviews || '0',
    description: product.description,
    features: product.features || [],
    image: product.images?.thumbnail || product.images?.gallery?.[0] || '/product-1.jpg',
    best: product.best || '',
    amazonUrl: product.amazonUrl || '#',
    href: `/product/${product.slug}`,
  }));

  const gridCols = products.length === 1 ? 'md:grid-cols-1 max-w-xl mx-auto'
    : products.length === 2 ? 'md:grid-cols-2'
      : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <Package className="w-8 h-8 text-gray-900 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold text-gray-900">
                {storeName}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <a href="#products" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">{t('商品一覧', 'Products', '商品列表')}</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">{t('ブランドについて', 'About', '品牌介绍')}</a>
            </div>

            <Link href={products[0]?.href || '/'}>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                {t('今すぐ購入', 'Shop Now', '立即购买')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t(`${storeName} 公式ストアへようこそ`, `Welcome to ${storeName}`, `欢迎来到 ${storeName}`)}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t(
              `${products.length} 点の商品をご用意しています。あなたに合う商品を見つけてください。`,
              `Browse our collection of ${products.length} premium products. Find exactly what you need.`,
              `这里有 ${products.length} 款精选商品，找到最适合你的那一款。`,
            )}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">{t('スピード配送', 'Fast Shipping', '快速发货')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">{t('10,000+ ユーザー', '10,000+ Users', '10,000+ 用户')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Briefcase className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">{t('品質保証', 'Quality Guaranteed', '品质保障')}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('商品一覧', 'Our Products', '商品列表')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t(
                `${products.length} 点の商品`,
                `${products.length} product${products.length !== 1 ? 's' : ''} available`,
                `当前共有 ${products.length} 款商品`,
              )}
            </p>
          </div>

          <div className={`grid ${gridCols} gap-8`}>
            {products.map(product => (
              <Link key={product.id} href={product.href}>
                <Card
                  className={`bg-white border-2 transition-all cursor-pointer h-full ${hoveredProduct === product.id
                    ? 'border-gray-900 shadow-2xl scale-105'
                    : 'border-gray-200 hover:border-gray-400 hover:shadow-xl'
                  }`}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.discount && product.discount !== '0%' && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {t(`${product.discount} オフ`, `${product.discount} OFF`, `${product.discount} 折扣`)}
                          </span>
                        </div>
                      )}
                      {product.best && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {product.best}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-1">{product.subtitle}</p>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i: number) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-orange-400 fill-current' : 'text-gray-300 fill-current'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                        <span className="text-sm text-gray-500">
                          {t(`(${product.reviews} 件のレビュー)`, `(${product.reviews} reviews)`, `(${product.reviews} 条评价)`)}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                        {product.originalPrice && product.originalPrice !== product.price && (
                          <span className="text-base text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {product.features.slice(0, 3).map((feature: string, index: number) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white">
                          {t('詳細を見る', 'View Details', '查看详情')}
                        </Button>
                        {product.amazonUrl && product.amazonUrl !== '#' && (
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-900 text-gray-900 hover:bg-gray-100"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(product.amazonUrl, '_blank');
                            }}
                          >
                            {t('Amazonで購入', 'Buy on Amazon', '去 Amazon 购买')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            {t(`${storeName} が選ばれる理由`, `Why Choose ${storeName}?`, `为什么选择 ${storeName}？`)}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: t('スピード配送', 'Fast Shipping', '快速发货'),
                description: t('追跡付きで迅速にお届けします。', 'Quick delivery right to your doorstep. We ship worldwide with tracking.', '提供可追踪的快速配送服务。'),
                color: 'text-orange-500',
              },
              {
                icon: Monitor,
                title: t('高品質', 'Premium Quality', '高品质'),
                description: t('全商品を品質チェックしてから発送します。', 'Every product is carefully selected and quality-tested before shipping.', '所有商品发出前都会经过质量检查。'),
                color: 'text-blue-500',
              },
              {
                icon: Briefcase,
                title: t('満足保証', 'Satisfaction Guaranteed', '满意保障'),
                description: t('30日間の返金保証。ご満足いただけない場合はサポートが対応します。', `30-day money-back guarantee. If you're not happy, we'll make it right.`, '提供 30 天退款保障，如有问题支持团队会协助处理。'),
                color: 'text-green-500',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t('準備はできましたか？', 'Ready to Get Started?', '准备好开始了吗？')}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {t(
              '商品一覧から、あなたにぴったりの商品を見つけてください。',
              'Browse our complete collection and find the perfect product for your needs.',
              '从商品列表中找到最适合你的那一款。',
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#products">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                {t('商品を見る', 'Browse Products', '浏览商品')}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
