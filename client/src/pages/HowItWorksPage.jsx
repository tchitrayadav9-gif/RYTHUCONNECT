import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShoppingCart, Truck, ShieldCheck, QrCode, ArrowRight } from 'lucide-react';

const HowItWorksPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-agro-700 uppercase tracking-wider bg-agro-50 px-3 py-1 rounded-full border border-agro-200">
          Transparent Operations
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">How RythuConnect Works</h1>
        <p className="text-sm text-slate-500">
          A seamless digital ecosystem connecting the farmer's soil to the consumer's dining table.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* For Farmers */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-agro-700 text-white flex items-center justify-center font-bold">
              👨‍🌾
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">For Farmers & FPOs</h2>
              <p className="text-xs text-slate-400">Step-by-step selling workflow</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-agro-100 text-agro-800 font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <h4 className="font-bold text-slate-800">Registration & Land Verification</h4>
                <p className="text-slate-500 mt-0.5">Submit your Pattadar passbook or Kisan Credit Card. Platform admins verify land deed within 24 hours.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-agro-100 text-agro-800 font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h4 className="font-bold text-slate-800">List Crop & Set Your Price</h4>
                <p className="text-slate-500 mt-0.5">Specify price per KG, available volume, harvest date, and upload farm crop photos.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-agro-100 text-agro-800 font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h4 className="font-bold text-slate-800">Accept Order & Pack Harvest</h4>
                <p className="text-slate-500 mt-0.5">Receive immediate SMS/app alert. Harvest the required quantity and pack for morning logistics pickup.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-agro-100 text-agro-800 font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h4 className="font-bold text-slate-800">Direct Escrow Bank Payout</h4>
                <p className="text-slate-500 mt-0.5">As soon as the customer validates delivery OTP, 100% of product revenue is credited to your bank.</p>
              </div>
            </div>
          </div>

          <Link to="/register" className="inline-flex items-center gap-2 text-xs font-bold text-agro-700 hover:text-agro-800">
            Register as a Farmer Partner <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* For Customers */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-agro-700 text-white flex items-center justify-center font-bold">
              🛒
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">For Household Consumers</h2>
              <p className="text-xs text-slate-400">Step-by-step purchasing workflow</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-agro-100 text-agro-800 font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <h4 className="font-bold text-slate-800">Browse Verified Produce</h4>
                <p className="text-slate-500 mt-0.5">Explore vegetables, fruits, and dairy filtered by harvest date, district, or organic status.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-agro-100 text-agro-800 font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h4 className="font-bold text-slate-800">Inspect Farm-to-Fork Traceability</h4>
                <p className="text-slate-500 mt-0.5">Click the QR badge to inspect soil details, village origin, and farmer credentials.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-agro-100 text-agro-800 font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h4 className="font-bold text-slate-800">Secure Online Checkout or COD</h4>
                <p className="text-slate-500 mt-0.5">Pay safely via UPI/Razorpay or Cash on Delivery. Order status is tracked live.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-agro-100 text-agro-800 font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h4 className="font-bold text-slate-800">Doorstep OTP Delivery</h4>
                <p className="text-slate-500 mt-0.5">Share your 6-digit OTP with the delivery partner upon inspecting produce freshness at your door.</p>
              </div>
            </div>
          </div>

          <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-agro-700 hover:text-agro-800">
            Start Shopping Fresh Harvest <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
