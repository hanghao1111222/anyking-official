'use client';

import Link from 'next/link';
import { Monitor, Mail, Facebook, Youtube, ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-100 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Shop the Store */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Shop the Store</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">New Arrival</Link></li>
              <li><Link href="/product/dual-screen" className="hover:text-blue-600 transition-colors">Extend to Dual Screens</Link></li>
              <li><Link href="/product/triple-screen" className="hover:text-blue-600 transition-colors">Extend to Triple Screens</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Accessories</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Model Comparison</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Shipping</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Warranty</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Return & Refund</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">User Manual</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Information</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Blog & News</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Compatibility</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Payment Notice</Link></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Get in touch</h3>
              <div className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer">
                <Mail className="w-5 h-5" />
                <span>support@anyking.official.com</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Follow us</h3>
              <div className="flex items-center gap-4">
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all hover:scale-110">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all hover:scale-110">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all hover:scale-110">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* We accept section */}
        <div className="mb-12">
          <h3 className="font-bold text-gray-900 mb-6 text-sm">We accept</h3>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-md shadow-sm h-10 flex items-center justify-center">
              <span className="text-[10px] font-bold text-blue-800">AMEX</span>
            </div>
            <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-md shadow-sm h-10 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-900">Apple Pay</span>
            </div>
            <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-md shadow-sm h-10 flex items-center justify-center">
              <span className="text-xs font-bold text-red-600">MasterCard</span>
            </div>
            <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-md shadow-sm h-10 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600 italic font-serif">PayPal</span>
            </div>
            <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-md shadow-sm h-10 flex items-center justify-center">
              <span className="text-sm font-bold text-blue-900 italic">VISA</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-center items-center gap-4 relative">
          <p className="text-center text-xs font-medium text-gray-500">
            © 2026 Anyking | Laptop Monitor Extender
          </p>

          <button 
            onClick={scrollToTop}
            className="absolute right-0 bottom-0 p-3 bg-gray-300/50 hover:bg-gray-400/50 text-white rounded-md transition-colors shadow-sm"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
