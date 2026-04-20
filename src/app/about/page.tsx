'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';
import { Settings, Cpu } from 'lucide-react';

export default function AboutPage() {
  return (
    <InfoLayout title="About Us" category="Company">
      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-xl">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold">Our Mission</h2>
          </div>
          <p className="text-lg leading-relaxed mb-6">
            Anyking was founded in 2026 with a simple yet ambitious goal: to redefine the modern workstation. In an era where deep work and AI-augmented productivity are the keys to professional success, the single-screen laptop is no longer enough.
          </p>
          <p>
            We specialize in creating ultra-premium portable monitor extenders that seamlessly integrate into the workflow of software developers, stock traders, and data analysts. Our hardware is engineered for those who demand precision, portability, and peak performance.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-xl">
              <Settings className="w-6 h-6 text-gray-700" />
            </div>
            <h2 className="text-xl font-bold">Innovation at the Core</h2>
          </div>
          <p className="mb-4">
            Every Anyking product is the result of thousands of hours of R&D. From our signature 100% sRGB FHD panels up to our unique rear-hollowed thermal stability structures, we don't just build peripherals—我们构建的是未来的生产力画布。
          </p>
          <p>
            With integrated LED Ambient Ring Lights and AI-copilot ready interfaces, our extenders are designed to be the physical manifestation of your digital processing power.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Why Anyking?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h3 className="font-bold mb-2">Unmatched Portability</h3>
              <p className="text-sm">Weighing less than 2lbs, our dual-screen setup fits into any standard laptop bag.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h3 className="font-bold mb-2">Universal Compatibility</h3>
              <p className="text-sm">One-cable USB-C solution for macOS, Windows, and Linux. No drivers needed.</p>
            </div>
             <div className="p-6 bg-gray-50 rounded-2xl">
              <h3 className="font-bold mb-2">Premium Eye Care</h3>
              <p className="text-sm">Anti-glare, low blue light technology designed for sustained focus during 12+ hour sessions.</p>
            </div>
          </div>
        </section>
      </div>
    </InfoLayout>
  );
}
