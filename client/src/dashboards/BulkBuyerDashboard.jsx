import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Building2, Send, Clock, CheckCircle2, PackageCheck } from 'lucide-react';

const BulkBuyerDashboard = () => {
  const [bulkOrders, setBulkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    businessName: 'Hotel Amaravathi Grand (Vijayawada)',
    productName: '',
    category: 'Vegetables',
    requestedQuantityKg: '50',
    targetPricePerKg: '',
    deliveryCadence: 'WEEKLY',
    notes: ''
  });
  const [statusMsg, setStatusMsg] = useState('');

  const loadOrders = () => {
    api.get('/bulk-orders')
      .then((res) => {
        setBulkOrders(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bulk-orders', formData);
      setStatusMsg('Quotation request submitted to farmer cooperatives!');
      setFormData({
        businessName: formData.businessName,
        productName: '',
        category: 'Vegetables',
        requestedQuantityKg: '50',
        targetPricePerKg: '',
        deliveryCadence: 'WEEKLY',
        notes: ''
      });
      loadOrders();
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      alert(err.message || 'Submission failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          B2B Institutional Bulk Procurement Hub
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Direct wholesale procurement for restaurants, hotels, supermarkets and institutional canteens
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Request Quotation Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-agro-600" />
            Request Bulk Harvest Quotation
          </h3>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{statusMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Business / Entity Name</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Crops Required</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tomatoes"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains & Pulses</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Quantity (KG, Min 20)</label>
                <input
                  type="number"
                  min="20"
                  required
                  value={formData.requestedQuantityKg}
                  onChange={(e) => setFormData({ ...formData, requestedQuantityKg: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Price / KG (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="28"
                  value={formData.targetPricePerKg}
                  onChange={(e) => setFormData({ ...formData, targetPricePerKg: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Delivery Cadence</label>
              <select
                value={formData.deliveryCadence}
                onChange={(e) => setFormData({ ...formData, deliveryCadence: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none"
              >
                <option value="ONE_TIME">One-Time Bulk Lot</option>
                <option value="WEEKLY">Weekly Recurring Delivery</option>
                <option value="MONTHLY">Monthly Contract Delivery</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Quality Specifications</label>
              <textarea
                rows="2"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Grade A, uniform size, delivery at 6 AM..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-agro-700 hover:bg-agro-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Bulk Quotation
            </button>
          </form>
        </div>

        {/* Existing Quotations Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900">Procurement Contracts & Quotes</h3>

          <div className="space-y-3">
            {bulkOrders.map((bo) => (
              <div key={bo._id || bo.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{bo.productName}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-agro-100 text-agro-800">
                      {bo.status}
                    </span>
                  </div>
                  <p className="text-slate-500">
                    Volume: <span className="font-bold text-slate-800">{bo.requestedQuantityKg} KG</span> • Target: ₹{bo.targetPricePerKg}/KG
                  </p>
                  <p className="text-slate-400 italic">Cadence: {bo.deliveryCadence}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-semibold">Farmer Offered Rate</span>
                  <span className="text-base font-black text-agro-900">
                    {bo.offeredPricePerKg ? `₹${bo.offeredPricePerKg}/KG` : 'Awaiting Quote'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkBuyerDashboard;
