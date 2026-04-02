'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';

export default function TermsPage() {
  return (
    <InfoLayout title="Terms of Service" category="Legal">
      <div className="space-y-8">
        <section className="space-y-4">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Effective Date: April 2, 2026</p>
          <p className="text-gray-600">By accessing or using the Anyking website and purchasing our hardware products, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, you may not access the service or purchase Anyking products.</p>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">01. Terms of Sale</h2>
          <p className="text-gray-600 font-normal">Anyking ("we", "our") reserves the right to refuse or cancel any order for any reason, including product availability, errors in pricing, or suspected fraudulent activity.</p>
          <ul className="list-disc pl-5 text-gray-600 font-normal space-y-2 text-sm italic">
            <li>Payments are processed at the time of order via one of our secure payment gateways (PayPal, Apple Pay, etc.).</li>
            <li>In the event of a price error, we will notify you and offer the option to refactor the order at the correct price or cancel it for a full refund.</li>
          </ul>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">02. Intellectual Property</h2>
          <p className="text-gray-600 font-normal">All content on this website, including but not limited to the Anyking logo, product designs, graphics, and computer code, is the exclusive property of Anyking and is protected by international copyright and trademark laws.</p>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">03. Limitation of Liability</h2>
          <p className="text-gray-600 font-normal">To the maximum extent permitted by law, Anyking shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services.</p>
        </section>

        <section className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
           <h3 className="font-bold mb-2 uppercase tracking-tighter">Governing Law</h3>
           <p className="text-sm text-gray-600 font-medium italic">These Terms shall be governed and construed in accordance with the laws of the State of Washington, USA, without regard to its conflict of law provisions. Any dispute arising from these terms will be subject to the exclusive jurisdiction of the state and federal courts located in King County, Washington.</p>
        </section>

        <section>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>Anyking Legal Dept</span>
            <span className="w-8 h-px bg-gray-200"></span>
            <span>Ref: 2026-TERMS-001</span>
          </div>
        </section>
      </div>
    </InfoLayout>
  );
}
