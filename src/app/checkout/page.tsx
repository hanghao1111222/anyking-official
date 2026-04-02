'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* Left Column - Forms */}
        <div className="space-y-12">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-3xl font-black text-blue-900 tracking-tighter uppercase italic">
              Anyking
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 border-b border-gray-100 pb-4 uppercase tracking-widest">
            <span className="text-gray-900 font-bold">Information</span>
            <span>&gt;</span>
            <span>Shipping</span>
            <span>&gt;</span>
            <span>Payment</span>
          </div>

          {/* Express Checkout */}
          <div className="space-y-4">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Express checkout</p>
            <div className="bg-yellow-400 p-4 rounded-xl flex items-center justify-center cursor-pointer hover:bg-yellow-500 transition-colors">
              <span className="text-blue-700 italic font-black text-xl">PayPal</span>
            </div>
            <p className="text-center text-gray-400 text-sm py-4">OR</p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Contact</h2>
              <p className="text-xs">Already have an account? <span className="text-blue-600 underline cursor-pointer">Login</span></p>
            </div>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="news" className="w-4 h-4 rounded border-gray-300" defaultChecked />
              <label htmlFor="news" className="text-xs text-gray-600">Email me with news and offers</label>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Shipping address</h2>
            <div className="space-y-4">
              <select className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm outline-none">
                <option>United States</option>
                <option>China</option>
                <option>United Kingdom</option>
                <option>Germany</option>
              </select>

              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name (optional)" className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                <input type="text" placeholder="Last Name" className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>

              <input type="text" placeholder="Street address & house number" className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
              
              <input type="text" placeholder="City/Town" className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none" />

              <div className="grid md:grid-cols-2 gap-4">
                <select className="w-full p-4 border border-gray-200 rounded-xl text-sm outline-none">
                  <option>State</option>
                  <option>California</option>
                  <option>New York</option>
                  <option>Texas</option>
                </select>
                <input type="text" placeholder="ZIP code (optional)" className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>

              <input type="tel" placeholder="Phone" className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="save" className="w-4 h-4 rounded border-gray-300" defaultChecked />
              <label htmlFor="save" className="text-xs text-gray-600">Save this information for next time.</label>
            </div>
          </div>

          <div className="pt-8">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 h-auto text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]">
              Continue to shipping
            </Button>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="bg-gray-50 p-12 rounded-3xl border border-gray-100 h-fit space-y-8 sticky top-32">
          {/* Item List */}
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-6 group">
                <div className="relative">
                  <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-6 h-6 bg-gray-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight uppercase tracking-tight">
                    {item.name}
                  </h3>
                </div>
                <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="flex gap-4 border-y border-gray-200 py-8">
            <input 
              type="text" 
              placeholder="Gift Card / Coupon Code" 
              className="flex-1 p-4 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <Button className="bg-blue-400 hover:bg-blue-500 text-white font-bold px-8 py-4 h-auto rounded-xl shadow-sm">
              Apply
            </Button>
          </div>

          {/* Totals */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium text-gray-600 uppercase tracking-widest">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium text-gray-600 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span>Shipping</span>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">Standard</span>
              </div>
              <span className="font-bold text-gray-900">Calculate later</span>
            </div>
            <div className="pt-8 flex justify-between items-end border-t border-gray-200">
              <div>
                <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">Total</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Inclusive of taxes</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-gray-400 font-bold">USD</span>
                <span className="text-3xl font-black text-gray-900 tracking-tighter">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
