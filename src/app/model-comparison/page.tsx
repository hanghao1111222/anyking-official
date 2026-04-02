'use client';

import React from 'react';
import { Check, X, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ComparisonPage() {
  const specs = [
    { name: 'Display Size', dual: '1x 14" IPS', triple: '2x 14" IPS' },
    { name: 'Resolution', dual: '1920 x 1080 (FHD)', triple: '1920 x 1080 (FHD)' },
    { name: 'Color Gamut', dual: '100% sRGB', triple: '100% sRGB' },
    { name: 'Brightness', dual: '300 Nits', triple: '300 Nits' },
    { name: 'Weight', dual: '1.9 lbs (Ultra-Light)', triple: '3.5 lbs (Heavy-Duty)' },
    { name: 'Rotation', dual: '180° Single Hinge', triple: '360° Foldable Dual Hinge' },
    { name: 'Connection', dual: 'One-Cable USB-C', triple: 'One-Cable USB-C' },
    { name: 'Target User', dual: 'Digital Nomads, Travelers', triple: 'Day Traders, Developers, Gamers' },
    { name: 'Total Screens', dual: '2', triple: '3' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter uppercase italic mb-4">
            Model Comparison
          </h1>
          <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">Find the perfect extender for your workflow</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="col-span-1"></div>
          <div className="text-center space-y-4">
            <div className="aspect-video bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden mb-4">
              <img src="/product-1.jpg" alt="Dual Screen" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-black text-xl italic uppercase tracking-tight">Dual Extender</h3>
            <p className="text-2xl font-bold text-red-600">$196.99</p>
            <Link href="/product/dual-screen">
              <Button variant="outline" className="w-full rounded-full font-bold uppercase text-xs tracking-widest">Shop Dual</Button>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <div className="aspect-video bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden mb-4">
              <img src="/triple-1.jpg" alt="Triple Screen" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-black text-xl italic uppercase tracking-tight">Triple Extender</h3>
            <p className="text-2xl font-bold text-red-600">$393.99</p>
            <Link href="/product/triple-screen">
               <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold uppercase text-xs tracking-widest">Shop Triple</Button>
            </Link>
          </div>
        </div>

        <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400 w-1/3">Technical Specs</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-900">Dual Screen</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-blue-600">Triple Screen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {specs.map((spec, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-tight">{spec.name}</td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-900 italic">{spec.dual}</td>
                  <td className="px-8 py-5 text-sm font-black text-gray-900 italic">{spec.triple}</td>
                </tr>
              ))}
              <tr>
                <td className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-tight">Eye Care (Low Blue Light)</td>
                <td className="px-8 py-5 text-green-500"><Check className="w-5 h-5" /></td>
                <td className="px-8 py-5 text-green-500"><Check className="w-5 h-5" /></td>
              </tr>
               <tr>
                <td className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-tight">AI Copilot Ready</td>
                <td className="px-8 py-5 text-green-500"><Check className="w-5 h-5" /></td>
                <td className="px-8 py-5 text-green-500"><Check className="w-5 h-5" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-8">
           <div className="p-10 bg-gray-50 rounded-[40px] border border-gray-200/50 space-y-4">
              <Zap className="w-10 h-10 text-yellow-500" />
              <h3 className="text-2xl font-black italic uppercase tracking-tighter">Why Dual?</h3>
              <p className="text-gray-600 leading-relaxed font-medium">Best for travel. If you move between cafes and airports, the Dual Extender offers the perfect balance of screen real estate and zero weight anxiety.</p>
           </div>
            <div className="p-10 bg-blue-50/50 rounded-[40px] border border-blue-100 space-y-4">
              <ShieldCheck className="w-10 h-10 text-blue-600" />
              <h3 className="text-2xl font-black italic uppercase tracking-tighter">Why Triple?</h3>
              <p className="text-gray-600 leading-relaxed font-medium">The ultimate productivity station. Replace your desktop setup with a foldable solution that gives you three simultaneous windows for data-heavy workflows.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
