'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Star, ChevronRight, Zap, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const products = [
    {
      id: 'dual-screen',
      name: 'Dual Screen Extender',
      subtitle: '14" FHD 1080P',
      price: '$196.99',
      originalPrice: '$393.99',
      discount: '-50%',
      rating: 5,
      reviews: 44,
      description: 'Perfect for professionals who need extra screen space for multitasking, code comparison, and productivity boost.',
      features: [
        '14" FHD 1080P Display',
        '100% sRGB Color Accuracy',
        'USB-C Plug & Play',
        '180° Rotation',
        '1.9 lbs Lightweight'
      ],
      image: '/product-1.jpg',
      best: 'Best for Remote Workers',
      amazonUrl: 'https://www.amazon.com/dp/B0GJSXHDCG',
      href: '/product/dual-screen'
    },
    {
      id: 'triple-screen',
      name: 'Triple Screen Extender',
      subtitle: '2×14" FHD 1080P IPS Extension Screens',
      price: '$393.99',
      originalPrice: '$699.99',
      discount: '-44%',
      rating: 5,
      reviews: 38,
      description: 'Triple screen setup with 2 extension screens for ultimate productivity. Two 14" FHD 1080P IPS displays with 100% sRGB, perfect for multitasking, coding, gaming, and professional work.',
      features: [
        '2×14" FHD 1080P IPS Extension Screens',
        'Total 3 Displays (Laptop + 2 Extensions)',
        '100% sRGB Color Accuracy',
        'Anti-Glare & Low Blue Light',
        'USB-C Plug & Play',
        'Extended, Mirrored, Portrait Modes'
      ],
      image: '/triple-1.jpg',
      best: 'Best for Power Users',
      amazonUrl: 'https://www.amazon.com/dp/B0GJS4XGDJ',
      href: '/product/triple-screen'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Monitor className="w-8 h-8 text-gray-900" />
              <span className="text-xl font-bold text-gray-900">
                Anyking
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#products" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Products</a>
              <a href="#comparison" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Compare</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">About</a>
            </div>

            <Link href="/product/dual-screen">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Expand Your Workspace,<br />
            <span className="text-gray-600">Multiply Your Productivity</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional laptop screen extenders designed for developers, traders, and creators. 
            Choose between dual or triple screen setup to boost your workflow.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Plug & Play</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">10,000+ Users</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Briefcase className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Business Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Setup
            </h2>
            <p className="text-gray-600 text-lg">
              Two powerful options to transform your laptop into a productivity powerhouse
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={product.href}>
                <Card 
                  className={`bg-white border-2 transition-all cursor-pointer ${
                    hoveredProduct === product.id 
                      ? 'border-gray-900 shadow-2xl scale-105' 
                      : 'border-gray-200 hover:border-gray-400 hover:shadow-xl'
                  }`}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {product.discount} OFF
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {product.best}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-500">{product.subtitle}</p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {[...Array(product.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{product.reviews} reviews</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                        <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white">
                          View Details
                        </Button>
                        <Button 
                          variant="outline"
                          className="flex-1 border-gray-900 text-gray-900 hover:bg-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(product.amazonUrl, '_blank');
                          }}
                        >
                          Buy on Amazon
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Compare Models
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">Dual Screen</th>
                  <th className="px-6 py-4 text-center font-semibold">Triple Screen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { feature: 'Number of Screens', dual: '1 Extension Screen', triple: '2 Extension Screens' },
                  { feature: 'Total Displays', dual: '2 (Laptop + 1 Extension)', triple: '3 (Laptop + 2 Extensions)' },
                  { feature: 'Screen Size', dual: '14 inches', triple: '2×14 inches' },
                  { feature: 'Resolution', dual: '1920×1080 FHD', triple: '2×1920×1080 FHD' },
                  { feature: 'Color Accuracy', dual: '100% sRGB', triple: '100% sRGB' },
                  { feature: 'Brightness', dual: '300 nits', triple: '300 nits' },
                  { feature: 'Eye Care', dual: 'Anti-Glare & Low Blue Light', triple: 'Anti-Glare & Low Blue Light' },
                  { feature: 'Weight', dual: '1.9 lbs', triple: '3.5 lbs' },
                  { feature: 'Display Modes', dual: 'Extended, Mirrored', triple: 'Extended, Mirrored, Portrait' },
                  { feature: 'Best For', dual: 'Remote Workers, Developers', triple: 'Traders, Power Users, Creators, Gamers' },
                  { feature: 'Price', dual: '$196.99', triple: '$393.99' },
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{row.dual}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{row.triple}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose Anyking?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant Setup',
                description: 'USB-C plug and play. No drivers needed. Works with macOS, Windows, Linux, and Chrome OS.',
                color: 'text-orange-500'
              },
              {
                icon: Monitor,
                title: 'Premium Display',
                description: '14" FHD 1080P IPS panels with 100% sRGB color accuracy. Perfect for design and content creation.',
                color: 'text-blue-500'
              },
              {
                icon: Briefcase,
                title: 'Portable Design',
                description: 'Lightweight and compact. Take your multi-screen workspace anywhere you go.',
                color: 'text-green-500'
              }
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of professionals who have transformed their workflow with Anyking screen extenders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/product/dual-screen">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Shop Dual Screen
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/product/triple-screen">
              <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                Shop Triple Screen
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

