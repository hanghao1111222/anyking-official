'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import catalogData from '@/data/catalog.json';
import { Product } from '@/types/product';
import { getSiteLanguage } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Monitor,
  Speaker,
  Zap,
  Menu,
  X,
  ShoppingCart,
  Eye,
  Check,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Lock,
  Layers,
  Sparkles,
  Cpu,
  Wind,
  ChevronRight,
  ShoppingBag,
  Package
} from 'lucide-react';

type ProductReview = {
  name: string;
  rating: number;
  title: string;
  date: string;
  location: string;
  content: string;
  verified: boolean;
  helpful: number;
  avatar: string;
};

type ProductPageData = Omit<Product, 'images'> & {
  images: string[];
  aplusContent?: string[];
  reviewsList?: ProductReview[];
};

export default function ProductPageClient() {
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);
  const params = useParams();
  const slug = params?.slug as string;
  const catalogProduct = catalogData.products.find((p: Product) => p.slug === slug) as unknown as Product | undefined;
  const initialData = catalogProduct || (catalogData.products[0] as unknown as Product);

  const galleryImages = initialData.images?.gallery || [];
  const thumbnail = initialData.images?.thumbnail;
  const mergedImages = thumbnail
    ? [thumbnail, ...galleryImages.filter(imagePath => imagePath !== thumbnail)]
    : galleryImages;

  // Create a merged mapped object to simulate the flat images array expected by the legacy template structure
  const mappedProduct = {
    ...initialData,
    images: mergedImages, // flat array for the main carousel
    aplusContent: initialData.images?.aplusContent || [], // specific A+ images
  };

  const product = mappedProduct as ProductPageData;
  const ratingValue = Number(product.rating || 5);
  const ratingText = ratingValue.toFixed(1);
  const productImages: string[] = (product.images || []).filter((path: string) => Boolean(path));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [viewersCount, setViewersCount] = useState(59);
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [imageRef, setImageRef] = useState<HTMLDivElement | null>(null);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const quantity = 1;

  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id: product.slug || product.id || slug,
      name: product.name,
      price: Number(product.price.replace(/[^\d.-]/g, '')),
      originalPrice: product.originalPrice ? Number(product.originalPrice.replace(/[^\d.-]/g, '')) : undefined,
      image: productImages[0],
      quantity: quantity
    });
    router.push('/cart');
  };

  const handleBuyNow = () => {
    addItem({
      id: product.slug || product.id || slug,
      name: product.name,
      price: Number(product.price.replace(/[^\d.-]/g, '')),
      originalPrice: product.originalPrice ? Number(product.originalPrice.replace(/[^\d.-]/g, '')) : undefined,
      image: productImages[0],
      quantity: quantity
    });
    router.push('/checkout');
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const variation = Math.floor(Math.random() * 10) - 5;
      setViewersCount(prev => Math.max(40, Math.min(80, prev + variation)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedImage >= productImages.length) {
      setSelectedImage(0);
    }
  }, [productImages.length, selectedImage]);

  const featureIcons = [Monitor, Speaker, Zap, Monitor, Speaker, Zap];
  const fallbackReviews: ProductReview[] = language === 'ja' ? [
    {
      name: '田中 一郎',
      rating: 5,
      title: 'とても満足しています',
      date: '2026年2月28日',
      location: '日本',
      content: `${product.name} は使いやすく、毎日のケアにぴったりでした。質感も良く、想像以上に満足しています。`,
      verified: true,
      helpful: 24,
      avatar: '田'
    },
    {
      name: '佐藤 美咲',
      rating: 5,
      title: '日常使いに最適',
      date: '2026年2月15日',
      location: '日本',
      content: `旅行にも持って行きやすく、${product.name} を毎日使っています。機能性と使い心地のバランスが良いです。`,
      verified: true,
      helpful: 18,
      avatar: '佐'
    },
    {
      name: '鈴木 健',
      rating: 5,
      title: '価格に対して高品質',
      date: '2026年1月28日',
      location: '日本',
      content: `${product.name} は期待通りの性能でした。初めてでも使いやすく、コストパフォーマンスが高いです。`,
      verified: true,
      helpful: 12,
      avatar: '鈴'
    }
  ] : language === 'zh' ? [
    {
      name: '王晨',
      rating: 5,
      title: '体验非常好',
      date: '2026年2月28日',
      location: '中国',
      content: `${product.name} 的整体体验很稳定，日常使用很方便，做工也比预期更扎实。`,
      verified: true,
      helpful: 24,
      avatar: '王'
    },
    {
      name: '李婷',
      rating: 5,
      title: '很适合日常使用',
      date: '2026年2月15日',
      location: '中国',
      content: `我经常带着 ${product.name} 出门使用，功能和便携性之间的平衡做得很好。`,
      verified: true,
      helpful: 18,
      avatar: '李'
    },
    {
      name: '陈浩',
      rating: 5,
      title: '性价比不错',
      date: '2026年1月28日',
      location: '中国',
      content: `${product.name} 的表现符合预期，上手容易，整体性价比很不错。`,
      verified: true,
      helpful: 12,
      avatar: '陈'
    }
  ] : [
    {
      name: 'Marlon Molina',
      rating: 5,
      title: 'Highly recommended!',
      date: 'February 28, 2026',
      location: 'United States',
      content: `This ${product.name} has been a game-changer for my workflow. Setup was incredibly easy, and the build quality is extremely solid. It is exactly what I was looking for.`,
      verified: true,
      helpful: 24,
      avatar: 'M'
    },
    {
      name: 'Sarah Chen',
      rating: 5,
      title: 'Perfect for daily use!',
      date: 'February 15, 2026',
      location: 'United States',
      content: `As someone who travels often, this ${product.name} has been amazing. It perfectly fulfills its purpose and is super useful for my productivity and lifestyle.`,
      verified: true,
      helpful: 18,
      avatar: 'S'
    },
    {
      name: 'David Thompson',
      rating: 5,
      title: 'Great value for the price',
      date: 'January 28, 2026',
      location: 'United States',
      content: `I was skeptical at first, but this ${product.name} delivers on all its promises. The quality is excellent and it works flawlessly. Highly recommend for anyone looking.`,
      verified: true,
      helpful: 12,
      avatar: 'D'
    }
  ];

  const handleMouseEnter = () => {
    setZoomActive(true);
  };

  const handleMouseLeave = () => {
    setZoomActive(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef) return;

    const rect = imageRef.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setZoomPosition({
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y))
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <Package className="w-6 h-6 text-gray-700" />
                <span className="text-lg font-semibold text-gray-900">
                  {catalogData.siteConfig?.storeName || 'Store'}
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                ← {t('全商品', 'All Products', '全部商品')}
              </Link>
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">{t('特徴', 'Features', '特点')}</a>
              <a href="#specs" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">{t('仕様', 'Specifications', '规格')}</a>
              <a href="#reviews" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">{t('レビュー', 'Reviews', '评价')}</a>
              <Link href="/signin">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white text-sm">
                  {t('ログイン', 'Sign In', '登录')}
                </Button>
              </Link>
            </div>


            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-gray-900">{t('特徴', 'Features', '特点')}</a>
              <a href="#specs" className="block text-gray-600 hover:text-gray-900">{t('仕様', 'Specifications', '规格')}</a>
              <a href="#reviews" className="block text-gray-600 hover:text-gray-900">{t('レビュー', 'Reviews', '评价')}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Breadcrumb */}
      <div className="pt-20 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-500 font-medium flex items-center">
            <Link href="/" className="hover:text-blue-600 transition-colors">{t('ホーム', 'Home', '首页')}</Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link href="/" className="hover:text-blue-600 transition-colors">{t('商品', 'Products', '商品')}</Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

        </div>
      </div>

      {/* Main Product Section - Split Layout */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left Side - Media Area */}
            <div className="space-y-4">
              {/* Thumbnails - Vertical on Desktop */}
              <div className="flex lg:flex-row flex-col gap-4">
                {/* Thumbnail Strip */}
                <div className="lg:flex-col flex lg:w-auto w-full gap-2 lg:order-1 order-2">
                  {productImages.map((imagePath: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 lg:w-20 lg:h-20 rounded-lg border-2 flex-shrink-0 overflow-hidden transition-all ${selectedImage === index
                          ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2'
                          : 'border-gray-200 hover:border-gray-400'
                        }`}
                    >
                      <img
                        src={imagePath}
                        alt={t(`画像 ${index + 1}`, `View ${index + 1}`, `图片 ${index + 1}`)}
                        className="w-full h-full object-contain bg-white"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image with Zoom */}
                <div className="lg:order-2 order-1 flex-1 relative">
                  <div
                    ref={setImageRef}
                    className="aspect-square bg-gray-50 rounded-2xl p-4 flex items-center justify-center border border-gray-100 cursor-crosshair relative overflow-hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                  >
                    {productImages[selectedImage] ? (
                      <>
                        <img
                          src={productImages[selectedImage]}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain"
                        />

                        {/* Zoom Lens Indicator */}
                        {zoomActive && (
                          <div
                            className="absolute border-2 border-blue-500 bg-white/10 pointer-events-none backdrop-blur-sm"
                            style={{
                              width: '33.33%',
                              height: '33.33%',
                              left: `${zoomPosition.x * 66.67}%`,
                              top: `${zoomPosition.y * 66.67}%`,
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <div className="text-center">
                        <Monitor className="w-40 h-40 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-400">{t('商品画像', 'Product Image', '商品图片')}</p>
                      </div>
                    )}
                  </div>

                  {/* Zoom Preview Panel - Amazon Style */}
                  {zoomActive && productImages[selectedImage] && (
                    <div
                      className="hidden lg:block absolute left-full top-0 ml-4 w-[400px] h-[400px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xl z-50"
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={productImages[selectedImage]}
                          alt={product.name}
                          className="absolute max-w-none"
                          style={{
                            width: '200%',
                            height: '200%',
                            left: `-${zoomPosition.x * 100}%`,
                            top: `-${zoomPosition.y * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Transaction Area */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-3 py-1">
                  {t('春セール', 'Spring Sale', '春季促销')}
                </Badge>
                <Badge className="bg-green-500 hover:bg-green-600 text-white font-medium px-3 py-1">
                  {t('新規顧客割引', 'New Customer Discount', '新客优惠')}
                </Badge>
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-1">
                  {product.discount}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Highlight */}
              <div className="bg-orange-50 border-l-4 border-orange-500 p-3">
                <span className="text-orange-700 font-bold">{t('注目！', 'Highlight!', '亮点！')}</span>
                <span className="text-orange-600 ml-2">{product.highlightMessage}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  {ratingText} {t(`(${product.reviews} 件のレビュー)`, `(${product.reviews} reviews)`, `(${product.reviews} 条评价)`)}
                </span>

              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-red-600">
                    {product.price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                  <span className="text-lg font-semibold text-red-600">
                    {product.discount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">
                    {t('税込価格・送料無料。', 'Price includes VAT. Free shipping.', '价格已含税，且包邮。')}
                  </p>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-wider">{product.soldBadge}</span>
                  </div>
                </div>

              </div>

              {/* Social Proof - Real-time Viewers */}
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-4 py-2 rounded-lg">
                <Eye className="w-5 h-5" />
                <span className="font-medium">
                  {t(`現在 ${viewersCount} 人がこの商品を閲覧中`, `${viewersCount} people are viewing this right now`, `当前有 ${viewersCount} 人正在浏览这个商品`)}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Feature Icons */}
              <div className="grid grid-cols-2 gap-3">
                {product.features.slice(0, 6).map((feature: string, index: number) => {
                  const Icon = featureIcons[index % featureIcons.length];
                  return (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <Icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleBuyNow}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white text-lg py-6 h-auto font-semibold"
                >
                  {t('今すぐ購入', 'Buy now', '立即购买')}
                </Button>

                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg py-6 h-auto font-semibold"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t('カートに追加', 'Add to cart', '加入购物车')}
                </Button>
              </div>


              {/* Trust Icons */}
              <div className="grid grid-cols-4 gap-4 pt-4">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">{t('送料無料', 'Free Shipping', '免费配送')}</span>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">{t('30日返品保証', '30-Day Returns', '30 天退货')}</span>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">{t('1年保証', '1-Year Warranty', '1 年质保')}</span>
                </div>
                <div className="text-center">
                  <Lock className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">{t('安全な決済', 'Secure Payment', '安全支付')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-2">{t('商品詳細', 'Product Details', '商品详情')}</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-4 pt-4">
                {(product.features || []).slice(0, 3).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{feature}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Specs Card */}
            <div className="flex justify-center">
              <Card className="bg-white border border-gray-200 shadow-lg w-full max-w-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('仕様', 'Specifications', '规格参数')}</h3>
                  <div className="space-y-4">
                    {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium text-gray-900 text-right text-sm">{value as string}</span>
                      </div>
                    ))}
                    {showAllSpecs && Object.entries(product.specs).slice(4).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium text-gray-900 text-right text-sm">{value as string}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                    className="w-full mt-6 text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    {showAllSpecs ? t('折りたたむ', 'View Less', '收起') : t('もっと見る', 'View More', '查看更多')}
                    <ChevronRight className={`w-4 h-4 transition-transform ${showAllSpecs ? 'rotate-90' : ''}`} />
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic A+ Content Section */}
      {product.aplusContent && product.aplusContent.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-[970px]">
            {product.aplusContent.map((imgUrl: string, idx: number) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`${product.name} Details ${idx + 1}`}
                className="block w-full h-auto"
              />
            ))}
          </div>
        </section>
      )}



      {/* Features Detail Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            {t('主な特徴', 'Key Features', '核心特点')}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {product.description?.slice(0, 120) || t('精密さと使いやすさを求める方のために設計されています。', 'Engineered for professionals who demand precision and productivity', '为追求精致体验与高效使用的人群而设计。')}...
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(product.features || []).map((feature: string, index: number) => {
              const icons = [Layers, Zap, Sparkles, Wind, Cpu, Shield];
              const FeatureIcon = icons[index % icons.length];
              return (
                <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 mb-6 flex items-center justify-center">
                      <FeatureIcon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specs" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t('技術仕様', 'Technical Specifications', '技术规格')}
          </h2>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {Object.entries(product.specs).map(([key, value], index) => (
                  <div key={index} className="flex justify-between items-center px-8 py-4 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-600 font-medium">{key}</span>
                    <span className="text-gray-900">{value as string}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Rating Summary */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('カスタマーレビュー', 'Customer Reviews', '客户评价')}</h3>

              {/* Overall Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i: number) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.floor(ratingValue) ? 'text-orange-400 fill-current' : 'text-gray-300 fill-current'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {t(`${ratingText} / 5`, `${ratingText} out of 5`, `${ratingText} / 5`)}
                </span>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2 mb-6">
                {[
                  { stars: 5, percent: Math.round(ratingValue >= 4.5 ? 85 : 60) },
                  { stars: 4, percent: Math.round(ratingValue >= 4.5 ? 10 : 25) },
                  { stars: 3, percent: Math.round(ratingValue >= 4.5 ? 3 : 10) },
                  { stars: 2, percent: Math.round(ratingValue >= 4.5 ? 1 : 3) },
                  { stars: 1, percent: Math.round(ratingValue >= 4.5 ? 1 : 2) },
                ].map((rating: { stars: number; percent: number }) => (
                  <div key={rating.stars} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-16">
                      {t(`${rating.stars} 星`, `${rating.stars} star`, `${rating.stars} 星`)}
                    </span>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-400 rounded-full"
                        style={{ width: `${rating.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{rating.percent}%</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {t(`${product.reviews} 件の評価`, `${product.reviews} global ratings`, `${product.reviews} 条评分`)}
              </p>

              {/* Translate Button */}
              <button className="w-full py-2 px-4 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                {t('レビューを日本語に翻訳', 'Translate all reviews to English', '将全部评论翻译成中文')}
              </button>

              <p className="text-xs text-gray-500 mt-3">
                {t('レビュー地域: ', 'Reviews from: ', '评论地区：')}<span className="font-medium">{t('日本', 'United States', '中国')}</span>
              </p>
            </div>

            {/* Featured Reviews */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="font-semibold text-gray-900">{t('注目レビュー', 'Top Reviews', '精选评价')}</h4>

              {(product.reviewsList || fallbackReviews).filter((_, i: number) => showAllReviews || i < 3).map((review: ProductReview, index: number) => (

                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  {/* Reviewer Info */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium">{review.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{review.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{review.title}</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{review.content}</p>

                  {/* Review Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      {review.verified && (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-orange-500" />
                          {t('購入確認済み', 'Verified Purchase', '已验证购买')}
                        </span>
                      )}
                      <span>{review.date}</span>
                      <span>·</span>
                      <span>{review.location}</span>
                    </div>
                  </div>

                  {/* Helpful Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                      <span>👍</span>
                      <span>{t(`参考になった (${review.helpful})`, `Helpful (${review.helpful})`, `有帮助 (${review.helpful})`)}</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* See All Reviews Button */}
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="w-full py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {showAllReviews
                  ? t('表示を減らす', 'Show less', '收起')
                  : t(`${product.reviews} 件のレビューをすべて表示`, `See all ${product.reviews} reviews`, `查看全部 ${product.reviews} 条评价`)}

              </button>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
