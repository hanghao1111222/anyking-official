'use client';

import React from 'react';
import InfoLayout from '@/components/InfoLayout';

export default function PrivacyPage() {
  return (
    <InfoLayout title="Privacy Policy" category="Legal">
      <div className="space-y-8">
        <section className="space-y-4">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Effective Date: April 2, 2026</p>
          <p className="text-gray-600">Anyking ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tells you about your privacy rights.</p>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">01. Data We Collect</h2>
          <p className="text-gray-600 font-normal">When you use Anyking, we may collect, use, store, and transfer different kinds of personal data about you:</p>
          <ul className="list-disc pl-5 text-gray-600 font-normal space-y-2 text-sm italic">
            <li><span className="font-bold underline text-gray-900 underline-offset-4 decoration-blue-100">Identity Data:</span> includes first name, last name, username or similar identifier.</li>
            <li><span className="font-bold underline text-gray-900 underline-offset-4 decoration-blue-100">Contact Data:</span> includes billing address, delivery address, email address, and telephone numbers.</li>
            <li><span className="font-bold underline text-gray-900 underline-offset-4 decoration-blue-100">Financial Data:</span> includes payment card details (processed securely via PayPal/Apple Pay).</li>
            <li><span className="font-bold underline text-gray-900 underline-offset-4 decoration-blue-100">Transaction Data:</span> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
          </ul>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">02. How We Use Your Data</h2>
          <p className="text-gray-600 font-normal">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-decimal pl-5 text-gray-600 font-normal space-y-2 text-sm">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., shipping your Anyking extender).</li>
            <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
          </ul>
        </section>

        <section className="space-y-4 font-bold">
          <h2 className="text-xl uppercase italic">03. Data Security</h2>
          <p className="text-gray-600 font-normal">We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We use enterprise-grade encryption (SSL/TLS) for all data transmission.</p>
        </section>

        <section className="p-8 bg-blue-50/50 border border-blue-100/50 rounded-3xl">
           <h3 className="font-bold mb-2">GDPR & CCPA Compliance</h3>
           <p className="text-sm text-gray-600 font-medium">As a global hardware provider, Anyking is fully compliant with the European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). You have the right to access, rectify, or erase your data at any time by contacting our privacy officer.</p>
        </section>

        <section>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>Anyking Legal Dept</span>
            <span className="w-8 h-px bg-gray-200"></span>
            <span>Ref: 2026-PRIV-001</span>
          </div>
        </section>
      </div>
    </InfoLayout>
  );
}
