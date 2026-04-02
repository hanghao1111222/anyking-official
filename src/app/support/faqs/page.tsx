'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'Will Anyking extenders work with my 16-inch MacBook Pro?',
      a: 'Absolutely. Anyking is specifically designed for 13 to 17.3 inch laptops. Our one-cable USB-C solution works perfectly with all MacBook Pro and MacBook Air models since 2016.'
    },
    {
      q: 'Does it require external power?',
      a: 'No, in most cases. Our high-efficiency IPS panels are powered directly from your laptop via the USB-C cable. If your laptop port is low-power, you can connect an optional 5V adapter to the secondary USB-C port.'
    },
    {
      q: 'What is the screen resolution and color accuracy?',
      a: 'We use premium FHD 1080P IPS panels with 100% sRGB color gamut. This ensures that colors look consistent between your main laptop screen and the extenders, which is critical for developers and designers.'
    },
    {
      q: 'Can I use one screen vertically?',
      a: 'Yes. Our 180° rotation hinge allows you to flip one or both screens to a vertical "stack" or "portrait" mode, perfect for reading long files of code or social media feeds.'
    },
    {
      q: 'Do I need drivers or special software?',
      a: 'No. Anyking is a true Plug & Play hardware solution. It utilizes the native display protocols of your OS (Windows, macOS, ChromeOS, or Linux) with zero software to install.'
    }
  ];

  return (
    <InfoLayout title="FAQs" category="Support">
      <div className="space-y-6">
        <p className="text-gray-500 mb-8 italic">Find answers to common questions about your Anyking workstation setup. If you can't find what you're looking for, contact our support team.</p>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl transition-colors">
              <div className="flex gap-4">
                <HelpCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-8 border border-dashed border-gray-200 rounded-3xl text-center">
           <p className="font-bold text-gray-900 mb-4">Still have questions?</p>
           <a href="/support/contact" className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
             Contact Support
           </a>
        </div>
      </div>
    </InfoLayout>
  );
}
