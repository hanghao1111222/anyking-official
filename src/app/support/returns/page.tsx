'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';
import { ShieldCheck, HelpCircle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <InfoLayout title="Return & Refund" category="Support">
      <div className="space-y-12">
        <section className="p-8 bg-orange-50 border border-orange-100 rounded-3xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold italic tracking-tight">30-Day Money-Back Guarantee</h2>
          </div>
          <p className="text-orange-900 font-medium">We want you to be completely satisfied with your Anyking monitor extender. If it doesn't transform your productivity as expected, we offer a hassle-free 30-day return policy.</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold uppercase tracking-tight italic">Eligibility for Returns</h2>
          <ul className="space-y-4 list-disc pl-5 text-gray-600">
            <li>Items must be returned in their original packaging with all included cables and accessories.</li>
            <li>Devices must be in "like new" condition without visible scratches or physical damage.</li>
            <li>The return must be initiated within 30 days from the date of delivery.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold uppercase tracking-tight italic">Process</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Step 01</span>
               <h3 className="font-bold underline italic underline-offset-4 decoration-blue-200">Initiate</h3>
               <p className="text-sm text-gray-600">Contact our support team at <a href="mailto:support@anyking.official.com" className="font-bold hover:text-blue-600 transition-colors underline">support@anyking.official.com</a> with your order number to request a Return Merchandise Authorization (RMA) number.</p>

            </div>
            <div className="space-y-2">
               <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Step 02</span>
               <h3 className="font-bold underline italic underline-offset-4 decoration-blue-200">Ship</h3>
               <p className="text-sm text-gray-600">Once approved, pack your device securely and ship it to the address provided by our support team. We recommend using a trackable shipping service.</p>
            </div>
            <div className="space-y-2">
               <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Step 03</span>
               <h3 className="font-bold underline italic underline-offset-4 decoration-blue-200">Inspect</h3>
               <p className="text-sm text-gray-600">Our quality control team will inspect the item within 3 business days of arrival to verify its condition.</p>
            </div>
            <div className="space-y-2">
               <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Step 04</span>
               <h3 className="font-bold underline italic underline-offset-4 decoration-blue-200">Refund</h3>
               <p className="text-sm text-gray-600">Approved refunds are processed back to your original payment method (PayPal, Apple Pay, etc.) within 5-7 business days.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 p-8 bg-gray-50 rounded-3xl border border-gray-100">
            <HelpCircle className="w-10 h-10 text-gray-400" />
            <p className="text-sm text-gray-500 italic">Have a defect or technical issue? Check out our <a href="/support/warranty" className="underline font-bold text-gray-900">Warranty Policy</a> for free replacements or repairs.</p>
          </div>
        </section>
      </div>
    </InfoLayout>
  );
}
