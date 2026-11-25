import React from 'react';
import { Sprout, ShieldCheck, HeartHandshake, TrendingUp, Users, Target } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-agro-700 uppercase tracking-wider bg-agro-50 px-3 py-1 rounded-full border border-agro-200">
          Our AgriTech Mission
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Restoring Dignity, Transparency & Profit to the Indian Farmer
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          RythuConnect was founded with a singular conviction: those who feed the nation should never struggle to feed their own families due to opaque intermediary exploitation.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-agro-100 text-agro-700 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Direct Farmer Pricing</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Farmers dictate the selling price of their harvest based on real labor and bio-input costs, not speculative city market brokers.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-agro-100 text-agro-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">100% Origin Traceability</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every batch comes tagged with district, village, and soil metadata. Customers can scan the batch QR code to verify the harvest origin.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-agro-100 text-agro-700 flex items-center justify-center font-bold">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Fair Consumer Rates</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            By eliminating 3 to 4 intermediary tiers, consumers enjoy organic produce up to 25% cheaper than luxury organic retail chains.
          </p>
        </div>
      </div>

      {/* Real Middleman Comparison Table */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Conventional Mandi vs RythuConnect</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4">Feature Metric</th>
                <th className="py-3 px-4 text-red-400">Conventional Wholesale Mandi</th>
                <th className="py-3 px-4 text-agro-400">RythuConnect Direct</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="py-3 px-4 font-semibold">Farmer Revenue Share</td>
                <td className="py-3 px-4 text-slate-300">25% - 35% of Retail Price</td>
                <td className="py-3 px-4 text-agro-300 font-bold">88% - 92% of Retail Price</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Harvest-to-Kitchen Time</td>
                <td className="py-3 px-4 text-slate-300">4 to 7 Days (Cold Storage Aging)</td>
                <td className="py-3 px-4 text-agro-300 font-bold">Under 24 Hours (Direct Cutting)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Pricing Authority</td>
                <td className="py-3 px-4 text-slate-300">Mandi Cartels & Brokers</td>
                <td className="py-3 px-4 text-agro-300 font-bold">The Farmer</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Customer Batch Traceability</td>
                <td className="py-3 px-4 text-slate-300">None (Commingled Batches)</td>
                <td className="py-3 px-4 text-agro-300 font-bold">QR Code Farm-to-Fork Batch Tag</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
