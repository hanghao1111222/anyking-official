'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';
import { Globe, Clock, Package } from 'lucide-react';

export default function ShippingPage() {
  const zones = [
    { zone: 'United States', time: '3-7 Business Days', courier: 'UPS / FedEx' },
    { zone: 'Canada', time: '5-9 Business Days', courier: 'DHL Express' },
    { zone: 'Europe', time: '7-12 Business Days', courier: 'DHL / DPD' },
    { zone: 'Asia / Pacific', time: '6-10 Business Days', courier: 'FedEx' },
  ];

  return (
    <InfoLayout title="Shipping Policy" category="Support">
      <div className="space-y-12">
        <section className="space-y-4">
          <p className="text-gray-600">Anyking is committed to delivering your high-performance workstation as quickly and securely as possible. All orders are processed at our central distribution hub within 1-2 business days.</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Estimated Delivery Times
          </h2>
          <div className="overflow-hidden border border-gray-100 rounded-3xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 uppercase tracking-widest text-xs font-bold text-gray-400">
                <tr>
                  <th className="px-6 py-4">Shipment Zone</th>
                  <th className="px-6 py-4">Estimated Time</th>
                  <th className="px-6 py-4">Courier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 italic">
                {zones.map((zone, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{zone.zone}</td>
                    <td className="px-6 py-4 text-gray-600">{zone.time}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{zone.courier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
           <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100/50">
             <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6">
               <Package className="w-6 h-6" />
             </div>
             <h3 className="font-bold mb-2">Secure Packaging</h3>
             <p className="text-sm text-gray-600">
               Each Anyking monitor extender is packed in a triple-layered, anti-static shock-absorbent container to ensure it arrives in the same refined condition it left our facility.
             </p>
           </div>
           
           <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
             <div className="w-12 h-12 bg-gray-100 text-gray-700 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
             </div>
             <h3 className="font-bold mb-2">Tracking Your Order</h3>
             <p className="text-sm text-gray-600">
               As soon as your Anyking ships, you will receive an email with a tracking number. All shipments are insured for their full value during transit.
             </p>
           </div>
        </section>

        <section>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Questions about customs or duties?</p>
          <p className="text-sm text-gray-600 mt-2">
            Import duties and taxes are not included in the purchase price. These charges are the responsibility of the recipient and are generally collected by the courier upon delivery.
          </p>
        </section>
      </div>
    </InfoLayout>
  );
}
