'use client';

import React, { useState } from 'react';
import InfoLayout from '@/components/InfoLayout';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <InfoLayout title="Contact Us" category="Support">
      <div className="space-y-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-green-50 border border-green-100 p-8 rounded-3xl text-center">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h3>
                <p className="text-green-700">Thank you for reaching out. Our support team will get back to you within 24 hours.</p>
                <Button variant="outline" className="mt-6 border-green-200 text-green-700 hover:bg-green-100" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">First Name</label>
                    <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                    <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <input type="email" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none" placeholder="name@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                  <textarea required rows={5} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none resize-none" placeholder="How can we help you today?"></textarea>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 h-auto text-lg rounded-2xl shadow-lg transition-all hover:scale-[1.02]">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100/50">
              <h3 className="font-bold mb-6">Direct Channels</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email</p>
                    <a href="mailto:support@anyking.official.com" className="font-bold text-gray-900 hover:text-blue-600 transition-colors">support@anyking.official.com</a>

                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Call</p>
                    <p className="font-bold text-gray-900">+1 (800) 555-ANYKING</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Office</p>
                    <p className="font-bold text-gray-900">Tech Hub East, Building 4, Level 12, Seattle, WA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
               <h3 className="font-bold mb-2">Our commitment</h3>
               <p className="text-sm text-gray-600">Every inquiry matters to us. Our technical support team are real professionals who understand the productivity needs of modern experts. Expect a response within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </InfoLayout>
  );
}
