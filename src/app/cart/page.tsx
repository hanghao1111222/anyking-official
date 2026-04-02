'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                <Monitor className="w-8 h-8 text-gray-900 group-hover:scale-110 transition-transform" />
                <span className="text-xl font-bold text-gray-900">
                  Anyking
                </span>
              </Link>
              
              <div className="flex items-center gap-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Shop</Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 h-auto text-lg font-semibold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <Monitor className="w-8 h-8 text-gray-900 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold text-gray-900">
                Anyking
              </span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Shop</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Cart</h1>
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-4">
              Continue shopping
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-8">
              <div className="hidden md:grid grid-cols-4 pb-4 border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <div className="col-span-2">Product Info</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Price</div>
              </div>

              {items.map((item) => (
                <div key={item.id} className="grid md:grid-cols-4 items-center gap-6 pb-8 border-b border-gray-100">
                  <div className="col-span-2 flex gap-6">
                    <Link href={item.id.includes('dual') ? '/product/dual-screen' : '/product/triple-screen'} className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 hover:border-blue-300 transition-colors">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link href={item.id.includes('dual') ? '/product/dual-screen' : '/product/triple-screen'}>
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 uppercase leading-tight hover:text-blue-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors w-fit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 hover:bg-gray-50 text-gray-600 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-4 text-sm font-bold font-mono min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 hover:bg-gray-50 text-gray-600 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right flex flex-col justify-center">
                    <p className="text-sm font-bold text-orange-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    {item.originalPrice && (
                      <p className="text-xs text-gray-400 line-through">
                        ${(item.originalPrice * item.quantity).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 sticky top-24">
                <div className="space-y-6">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Discount code" 
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm mb-2"
                    />
                    <Button variant="outline" className="w-full bg-white text-gray-900 font-bold border-gray-200 hover:bg-gray-50 py-3">
                      Apply
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-bold text-gray-900 uppercase tracking-wide">Total:</span>
                      <span className="text-2xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <Link href="/checkout">
                      <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white text-lg py-6 h-auto font-bold rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Check out
                      </Button>
                    </Link>
                    <p className="text-center text-[10px] text-gray-500 mt-4">
                      Taxes and shipping calculated at checkout
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
