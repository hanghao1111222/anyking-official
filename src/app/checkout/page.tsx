'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { Monitor } from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleContinue = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.email || !formData.email.includes('@')) newErrors.email = true;
    if (!formData.lastName) newErrors.lastName = true;
    if (!formData.address) newErrors.address = true;
    if (!formData.city) newErrors.city = true;
    if (!formData.phone) newErrors.phone = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Proceeding to shipping...', formData);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Forms */}
          <div className="space-y-12">
            {/* Logo/Brand */}
            <div className="flex items-center gap-2 mb-8">
              <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                <Monitor className="w-8 h-8 text-gray-900 group-hover:scale-110 transition-transform" />
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  Anyking
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 border-b border-gray-100 pb-4 uppercase tracking-widest">
              <Link href="/cart" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">Cart</Link>
              <span className="text-gray-300">&gt;</span>
              <span className="text-gray-900 font-bold">Information</span>
              <span className="text-gray-300">&gt;</span>
              <span>Shipping</span>
              <span className="text-gray-300">&gt;</span>
              <span>Payment</span>
            </div>

            {/* Express Checkout */}
            <div className="space-y-4">
              <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Express checkout</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg flex items-center justify-center cursor-not-allowed h-12 shadow-sm">
                  <span className="text-[#0070CD] font-bold text-[10px] tracking-widest">AMEX</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg flex items-center justify-center cursor-not-allowed h-12 shadow-sm">
                  <span className="text-black font-bold text-sm">Apple Pay</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg flex items-center justify-center cursor-not-allowed h-12 shadow-sm">
                  <span className="text-[#EB001B] font-bold text-[10px]">MasterCard</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg flex items-center justify-center cursor-not-allowed h-12 shadow-sm">
                  <span className="text-[#003087] italic font-black text-xs">PayPal</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg flex items-center justify-center cursor-not-allowed h-12 shadow-sm">
                  <span className="text-[#1A1F71] italic font-black text-xs">VISA</span>
                </div>
              </div>
              <p className="text-center text-gray-400 text-sm py-4">OR</p>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Contact</h2>
                <p className="text-xs">Already have an account? <Link href="/signin" className="text-blue-600 underline cursor-pointer">Login</Link></p>
              </div>
              <input 
                name="email"
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-4 bg-white border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all`}
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
                  <input 
                    name="firstName"
                    type="text" 
                    placeholder="First Name (optional)" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none" 
                  />
                  <input 
                    name="lastName"
                    type="text" 
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full p-4 border ${errors.lastName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none`} 
                  />
                </div>

                <input 
                  name="address"
                  type="text" 
                  placeholder="Street address & house number" 
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full p-4 border ${errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none`} 
                />
                
                <input 
                  name="city"
                  type="text" 
                  placeholder="City/Town" 
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full p-4 border ${errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none`} 
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <select className="w-full p-4 border border-gray-200 rounded-xl text-sm outline-none">
                    <option>State</option>
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                  </select>
                  <input 
                    name="zip"
                    type="text" 
                    placeholder="ZIP code (optional)" 
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none" 
                  />
                </div>

                <input 
                  name="phone"
                  type="tel" 
                  placeholder="Phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-4 border ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none`} 
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="save" className="w-4 h-4 rounded border-gray-300" defaultChecked />
                <label htmlFor="save" className="text-xs text-gray-600">Save this information for next time.</label>
              </div>
            </div>

            <div className="pt-8">
              <Button 
                onClick={handleContinue}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 h-auto text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]"
              >
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

            {/* Totals */}
            <div className="space-y-4 pt-8 border-t border-gray-200">
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

        {/* Checkout Footer */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-gray-500 font-medium uppercase tracking-widest">
            <Link href="/legal/privacy" className="hover:text-blue-600 underline underline-offset-4">Refund policy</Link>
            <Link href="/support/shipping" className="hover:text-blue-600 underline underline-offset-4">Shipping policy</Link>
            <Link href="/legal/privacy" className="hover:text-blue-600 underline underline-offset-4">Privacy policy</Link>
            <Link href="/legal/terms" className="hover:text-blue-600 underline underline-offset-4">Terms of service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
