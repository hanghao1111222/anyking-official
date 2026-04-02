'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Speaker, 
  Zap, 
  Menu,
  X,
  ShoppingCart,
  Heart,
  Share2,
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
  Play,
  Maximize,
  Volume2,
  User
} from 'lucide-react';

interface ProductInfo {
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  images: string[];
}

const defaultProduct: ProductInfo = {
  name: 'Laptop Screen Extender, 14" FHD 1080P Portable Monitor for Laptop with 100% sRGB',
  price: '$196.99',
  originalPrice: '$359.99',
  discount: '-50%',
  description: 'Dual Screen Extender for Laptop 13–17.3". Plug & Play External Monitor with 14-inch FHD 1080P IPS Display, 100% sRGB color accuracy. Perfect for Business Travel & Home Office, Software Developers, Data Analysts, Stock Traders.',
  features: [
    '14" FHD 1080P',
    '100% sRGB',
    '300 Nits Brightness',
    'Plug & Play',
    '180° Rotation',
    'AI Copilot Ready'
  ],
  specs: {
    'Screen Size': '14 inches',
    'Resolution': '1920 x 1080P (FHD)',
    'Color Gamut': '100% sRGB',
    'Brightness': '300 nits',
    'Refresh Rate': '60Hz',
    'Contrast Ratio': '1000:1',
    'Panel': 'IPS Panel',
    'Aspect Ratio': '16:9',
    'Weight': '1.9 lbs',
    'Rotation': '180° Left & Right',
    'Tilt Angle': '90° Adjustable',
    'Fit Laptops': '13-17.3 inches',
    'Compatibility': 'macOS, Windows, Linux, Chrome',
    'Interface': 'USB-C (One-cable solution)',
    'Eye Care': 'Anti-Glare & Low Blue Light',
    'Cooling': 'Rear Hollowed Structure'
  },
  images: [
    '/product-1.jpg',
    '/product-2.jpg',
    '/product-3.jpg',
    '/product-4.jpg',
    '/product-5.jpg',
    '/product-6.jpg',
    '/product-7.jpg',
    '/product-8.jpg'
  ]
};

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductInfo>(defaultProduct);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [viewersCount, setViewersCount] = useState(59);
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [imageRef, setImageRef] = useState<HTMLDivElement | null>(null);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const fetchUrlContent = async () => {
    if (!url) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const data = await response.json();
      
      if (data.content) {
        const textContent = data.content
          .filter((item: { type: string; text?: string }) => item.type === 'text')
          .map((item: { type: string; text?: string }) => item.text)
          .join('\n');
        
        const images = data.content
          .filter((item: { type: string; image?: { display_url?: string } }) => item.type === 'image' && item.image?.display_url)
          .map((item: { type: string; image?: { display_url?: string } }) => item.image?.display_url || '');
        
        if (data.title) {
          setProduct(prev => ({
            ...prev,
            name: data.title,
            description: textContent.slice(0, 300),
            images: images.length > 0 ? images : prev.images
          }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const variation = Math.floor(Math.random() * 10) - 5;
      setViewersCount(prev => Math.max(40, Math.min(80, prev + variation)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featureIcons = [Monitor, Speaker, Zap, Monitor, Speaker, Zap];

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
                <Monitor className="w-6 h-6 text-gray-700" />
                <span className="text-lg font-semibold text-gray-900">
                  Anyking
                </span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                ← All Products
              </Link>
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Features</a>
              <a href="#specs" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Specifications</a>
              <a href="#reviews" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Reviews</a>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white text-sm">
                Sign In
              </Button>
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
              <a href="#features" className="block text-gray-600 hover:text-gray-900">Features</a>
              <a href="#specs" className="block text-gray-600 hover:text-gray-900">Specifications</a>
              <a href="#reviews" className="block text-gray-600 hover:text-gray-900">Reviews</a>
            </div>
          </div>
        )}
      </nav>

      {/* Breadcrumb */}
      <div className="pt-20 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-500">
            <span>Electronics</span>
            <span className="mx-2">/</span>
            <span>Monitors</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Portable Monitors</span>
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
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 lg:w-20 lg:h-20 rounded-lg border-2 flex-shrink-0 overflow-hidden transition-all ${
                        selectedImage === index 
                          ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {product.images[index] ? (
                        <img 
                          src={product.images[index]} 
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <Monitor className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
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
                    {product.images[selectedImage] ? (
                      <>
                        <img 
                          src={product.images[selectedImage]} 
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
                        <p className="text-gray-400">Product Image</p>
                      </div>
                    )}
                  </div>

                  {/* Zoom Preview Panel - Amazon Style */}
                  {zoomActive && product.images[selectedImage] && (
                    <div 
                      className="hidden lg:block absolute left-full top-0 ml-4 w-[400px] h-[400px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xl z-50"
                    >
                      <div className="relative w-full h-full">
                        <img 
                          src={product.images[selectedImage]} 
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
                  Spring Sale
                </Badge>
                <Badge className="bg-green-500 hover:bg-green-600 text-white font-medium px-3 py-1">
                  New Customer Discount
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
                <span className="text-orange-700 font-bold">Highlight!</span>
                <span className="text-orange-600 ml-2">14" FHD 1080P IPS with 100% sRGB, LED Ambient Ring Light, AI Copilot Ready</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">4.9 (2,847 reviews)</span>
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
                <p className="text-sm text-gray-500">Price includes VAT. Free shipping.</p>
              </div>

              {/* Social Proof - Real-time Viewers */}
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-4 py-2 rounded-lg">
                <Eye className="w-5 h-5" />
                <span className="font-medium">{viewersCount} people are viewing this right now</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Feature Icons */}
              <div className="grid grid-cols-2 gap-3">
                {product.features.slice(0, 6).map((feature, index) => {
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
                <a 
                  href="https://www.amazon.com/dp/B0GJS4XGDJ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white text-lg py-6 h-auto font-semibold"
                  >
                    Buy now
                  </Button>
                </a>
                <a 
                  href="https://www.amazon.com/dp/B0GJS4XGDJ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg py-6 h-auto font-semibold"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to cart
                  </Button>
                </a>
              </div>

              {/* Trust Icons */}
              <div className="grid grid-cols-4 gap-4 pt-4">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">Free Shipping</span>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">30-Day Returns</span>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">1-Year Warranty</span>
                </div>
                <div className="text-center">
                  <Lock className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-2">Product Details</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Dual Screen, Double Productivity
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Transform your workspace with our laptop screen extender. Experience stunning visuals on a 14-inch FHD 1080P IPS display with 100% sRGB color accuracy. 
                  Simply plug and play via USB-C connection for quick setup, maximizing your productivity with seamless multitasking capabilities.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dual Screen Efficiency</h4>
                    <p className="text-gray-600 text-sm">Perfect for code comparison, AI dashboard monitoring, and real-time data analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">One-Cable Solution</h4>
                    <p className="text-gray-600 text-sm">USB-C plug and play, works seamlessly with macOS and Windows</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Copilot Ready</h4>
                    <p className="text-gray-600 text-sm">Optimized for multi-threaded workspace, works with AI assistants</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Specs Card */}
            <div className="flex justify-center">
              <Card className="bg-white border border-gray-200 shadow-lg w-full max-w-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Specifications</h3>
                  <div className="space-y-4">
                    {/* Always visible specs */}
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Size</span>
                      <span className="font-medium text-gray-900">14 inches</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Compatible Laptop Sizes</span>
                      <span className="font-medium text-gray-900">13"-17.3"</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Aspect Ratio</span>
                      <span className="font-medium text-gray-900">16:9</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Display Resolution</span>
                      <span className="font-medium text-gray-900">1920 x 1080 pixels</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Color Gamut</span>
                      <span className="font-medium text-gray-900">100% sRGB</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Weight</span>
                      <span className="font-medium text-gray-900">1.9 lbs</span>
                    </div>

                    {/* Expandable specs */}
                    {showAllSpecs && (
                      <>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <span className="text-gray-600">Panel Type</span>
                          <span className="font-medium text-gray-900">IPS Panel</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <span className="text-gray-600">Brightness</span>
                          <span className="font-medium text-gray-900">300 nits</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <span className="text-gray-600">Refresh Rate</span>
                          <span className="font-medium text-gray-900">60Hz</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <span className="text-gray-600">Contrast Ratio</span>
                          <span className="font-medium text-gray-900">1000:1</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <span className="text-gray-600">Rotation</span>
                          <span className="font-medium text-gray-900">180° Left & Right</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <span className="text-gray-600">Tilt Angle</span>
                          <span className="font-medium text-gray-900">90° Adjustable</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <span className="text-gray-600">Interface</span>
                          <span className="font-medium text-gray-900">USB-C (One-cable)</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <span className="text-gray-600">Compatibility</span>
                          <span className="font-medium text-gray-900 text-right text-sm">macOS, Windows, Linux, Chrome</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <span className="text-gray-600">Eye Care</span>
                          <span className="font-medium text-gray-900 text-right text-sm">Anti-Glare & Low Blue Light</span>
                        </div>
                        <div className="flex justify-between items-center pb-3">
                          <span className="text-gray-600">Cooling</span>
                          <span className="font-medium text-gray-900 text-right text-sm">Rear Hollowed Structure</span>
                        </div>
                      </>
                    )}
                  </div>
                  <button 
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                    className="w-full mt-6 text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    {showAllSpecs ? 'View Less' : 'View More'}
                    <ChevronRight className={`w-4 h-4 transition-transform ${showAllSpecs ? 'rotate-90' : ''}`} />
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="/aplus-1.jpg" 
              alt="ANYKING 14 inch Laptop Screen Extender"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="/aplus-2.jpg" 
              alt="One display. Many systems."
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Rotation & Support Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/aplus-4.jpg" 
                alt="0-180° Rotation"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/aplus-5.jpg" 
                alt="Rear Support System"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Adaptive Fit Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="/aplus-3.jpg" 
              alt="Adaptive Fit. Secure Hold."
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Connection Methods Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Easy Connection Methods
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/aplus-8.jpg" 
                alt="One Cable for All"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/aplus-9.jpg" 
                alt="Dual Cable Connection"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Usage Scenarios Section - Horizontal Scroll */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Perfect for Any Scenario
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            From office collaboration to creative work, from business travel to home office
          </p>
          
          {/* Horizontal Scroll Container */}
          <div className="relative">
            {/* Scroll Indicator */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none flex items-center justify-end pr-4">
              <div className="flex flex-col gap-1">
                <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-1 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Scrollable Container */}
            <div 
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {[
                { src: '/aplus-10.jpg', alt: 'Team Collaboration', title: 'Team Collaboration' },
                { src: '/aplus-11.jpg', alt: 'Creative Work', title: 'Creative Work' },
                { src: '/aplus-12.jpg', alt: 'Portable Design', title: 'Portable Design' },
                { src: '/aplus-14.jpg', alt: 'Business Professional', title: 'Business Professional' },
                { src: '/brand-banner.jpg', alt: 'Business Travel', title: 'Business Travel' },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] rounded-2xl overflow-hidden shadow-lg bg-white"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="relative group">
                    <img 
                      src={item.src} 
                      alt={item.alt}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Extra space for scroll hint */}
              <div className="flex-shrink-0 w-8"></div>
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="flex justify-center items-center gap-2 mt-8 text-gray-500">
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="text-sm">Swipe to see more</span>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Package List Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="/aplus-6.jpg" 
              alt="Package List"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* URL Fetcher Tool */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Import Product Information from URL
              </h3>
              <div className="flex gap-3">
                <Input
                  type="url"
                  placeholder="Enter product page URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-white border-gray-300"
                />
                <Button 
                  onClick={fetchUrlContent}
                  disabled={loading}
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                >
                  {loading ? 'Loading...' : 'Import'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Detail Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Key Features
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Engineered for professionals who demand precision and productivity
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Layers, 
                title: 'Dual Screen Efficiency', 
                desc: '14-inch FHD 1080P IPS Display with 100% sRGB color accuracy, 300 nits brightness. Perfect for code comparison, AI dashboard monitoring, and real-time data analysis.' 
              },
              { 
                icon: Zap, 
                title: 'Seamless Compatibility', 
                desc: 'USB-C plug and play, supports 13–17.3 inch laptops. Works seamlessly with macOS and Windows. One-cable power and video transmission simplifies setup.' 
              },
              { 
                icon: Sparkles, 
                title: 'Tech-Forward Aesthetic', 
                desc: 'Carbon-fiber-inspired finish with integrated LED Ambient Ring Light. Serves as AI processing status indicator for modern workstation identity.' 
              },
              { 
                icon: Wind, 
                title: 'Thermal Stability', 
                desc: 'Rear hollowed structure supports continuous airflow for enhanced cooling. Maintains performance stability during intensive tasks and extended sessions.' 
              },
              { 
                icon: Cpu, 
                title: 'AI Copilot Canvas', 
                desc: 'Optimized for 2026 multi-threaded workspace. Works seamlessly with Openclaw and background AI agents. Dedicate your main screen to deep work.' 
              },
              { 
                icon: Shield, 
                title: 'Eye Care Technology', 
                desc: 'Anti-Glare Eye-Care Screen with Low Blue Light Technology. Reduces visual fatigue and supports sustained focus in data-heavy environments.' 
              },
            ].map((feature, index) => (
              <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 mb-6 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specs" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Technical Specifications
          </h2>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {Object.entries(product.specs).map(([key, value], index) => (
                  <div key={index} className="flex justify-between items-center px-8 py-4 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-600 font-medium">{key}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Product Videos Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Video Player */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <img 
                  src="/product-1.jpg" 
                  alt="Product Video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all hover:scale-110">
                    <Play className="w-7 h-7 text-gray-900 ml-1" fill="currentColor" />
                  </button>
                </div>
                {/* Video Info Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">O</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Orville</p>
                    <p className="text-white/80 text-xs">My Anyking A6 Laptop Screen Extender Review</p>
                  </div>
                </div>
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-3">
                    <button className="text-white hover:text-gray-200">
                      <Play className="w-5 h-5" />
                    </button>
                    <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 w-0"></div>
                    </div>
                    <span className="text-white text-xs">2:26</span>
                    <button className="text-white hover:text-gray-200">
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button className="text-white hover:text-gray-200">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Card Below Video */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img 
                  src="/product-1.jpg" 
                  alt="Product"
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 line-clamp-2">
                    Anyking Laptop Screen Extender, 14" FHD 1080P Portable Monitor for...
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">44</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Videos for this product</h3>
              <div className="space-y-3">
                {[
                  { 
                    title: 'My Anyking A6 Laptop Screen Extender Review', 
                    author: 'Orville',
                    duration: '2:26',
                    current: true,
                    badge: null
                  },
                  { 
                    title: 'How to Connect A6 Laptop Screen Extender', 
                    author: 'Seller',
                    duration: '1:20',
                    current: false,
                    badge: 'Seller Video'
                  },
                  { 
                    title: "Stop Working On One Screen! Anyking Laptop Extender Review", 
                    author: 'Nidia',
                    duration: '2:56',
                    current: false,
                    badge: null
                  },
                  { 
                    title: 'Testing it out, does it work?', 
                    author: 'Eric the Coffee Guy',
                    duration: '3:31',
                    current: false,
                    badge: null
                  },
                ].map((video, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      video.current 
                        ? 'bg-orange-50 border-2 border-orange-400' 
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={`/product-${index + 1}.jpg`}
                          alt={video.title}
                          className="w-24 h-14 object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded">
                          <Play className="w-4 h-4 text-white" fill="currentColor" />
                        </div>
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">{video.author}</p>
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{video.title}</p>
                        {video.badge && (
                          <span className="inline-block mt-1 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                            {video.badge}
                          </span>
                        )}
                        {video.current && (
                          <span className="inline-block mt-1 text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                            Now Playing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Rating Summary */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h3>
              
              {/* Overall Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-orange-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">5.0 out of 5</span>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2 mb-6">
                {[
                  { stars: 5, percent: 100, count: 44 },
                  { stars: 4, percent: 0, count: 0 },
                  { stars: 3, percent: 0, count: 0 },
                  { stars: 2, percent: 0, count: 0 },
                  { stars: 1, percent: 0, count: 0 },
                ].map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-16">{rating.stars} star</span>
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

              <p className="text-sm text-gray-600 mb-4">44 global ratings</p>

              {/* Translate Button */}
              <button className="w-full py-2 px-4 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                Translate all reviews to English
              </button>

              <p className="text-xs text-gray-500 mt-3">
                Reviews from: <span className="font-medium">United States</span>
              </p>
            </div>

            {/* Featured Reviews */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="font-semibold text-gray-900">Top Reviews</h4>
              
              {[
                {
                  name: 'Marlon Molina',
                  rating: 5,
                  title: 'Highly recommended!',
                  date: 'February 28, 2026',
                  location: 'United States',
                  content: 'This laptop screen extender has been a game-changer for my workflow. The 14" FHD display is crystal clear, and the 100% sRGB color accuracy makes it perfect for both coding and design work. Setup was incredibly easy - just plug and play with the USB-C cable. The build quality is solid, and it\'s lightweight enough to carry in my laptop bag.',
                  verified: true,
                  helpful: 24,
                  avatar: 'M'
                },
                {
                  name: 'Sarah Chen',
                  rating: 5,
                  title: 'Perfect for remote work!',
                  date: 'February 15, 2026',
                  location: 'United States',
                  content: 'As someone who works from coffee shops and co-working spaces, this portable monitor has been amazing. The dual-screen setup lets me keep my main work on the laptop while having my communication apps, notes, or reference materials on the extender. The 180° rotation is super useful for presentations.',
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
                  content: 'I was skeptical at first, but this extender delivers on its promises. The picture quality is excellent, and it works flawlessly with my MacBook Pro. The cooling design actually helps - no overheating even after hours of use. Highly recommend for developers and analysts.',
                  verified: true,
                  helpful: 12,
                  avatar: 'D'
                },
              ].map((review, index) => (
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
                          Verified Purchase
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
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* See All Reviews Button */}
              <button className="w-full py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                See all 44 reviews
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <Monitor className="w-6 h-6 text-white" />
                <span className="font-bold">Anyking</span>
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Anyking. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
