import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Truck, MapPin, KeyRound, CheckCircle2, ShieldAlert } from 'lucide-react';

const DeliveryPartnerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otpInputs, setOtpInputs] = useState({});
  const [messages, setMessages] = useState({});

  const loadDeliveries = () => {
    setLoading(true);
    // Uses farmer-orders or regular orders list
    api.get('/orders/farmer-orders')
      .then((res) => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  const handleVerifyOtp = async (orderId) => {
    const enteredOtp = otpInputs[orderId];
    if (!enteredOtp) {
      alert('Please enter customer 6-digit OTP');
      return;
    }

    try {
      await api.post(`/orders/${orderId}/verify-otp`, { otp: enteredOtp });
      setMessages({ ...messages, [orderId]: { success: true, text: 'OTP Verified! Order marked as DELIVERED.' } });
      loadDeliveries();
    } catch (err) {
      setMessages({ ...messages, [orderId]: { success: false, text: err.message || 'Incorrect OTP' } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Delivery Logistics & Physical OTP Handover
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pick up harvested produce from rural farms and verify customer OTP upon physical delivery
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-agro-600" />
          Assigned Dispatch Routes ({orders.length})
        </h2>

        {orders.map((order) => (
          <div
            key={order._id || order.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <span className="font-mono text-xs font-bold text-agro-700">Order #{order.orderNumber}</span>
                <p className="text-xs text-slate-500 mt-0.5">Customer: <span className="font-semibold text-slate-800">{order.customerName}</span> ({order.customerPhone})</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.orderStatus === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {order.orderStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider block">1. Farm Collection Point</span>
                <p className="font-bold text-slate-800">Naidu Organic Farm (Farmer Ramesh Naidu)</p>
                <p className="text-slate-500">Tenali Rural, Guntur District</p>
                <p className="text-emerald-700 font-semibold pt-1">Status: Packed & Ready for Morning Transit</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider block">2. Customer Drop Destination</span>
                <p className="font-bold text-slate-800">{order.deliveryAddress?.recipientName}</p>
                <p className="text-slate-500">{order.deliveryAddress?.street}, {order.deliveryAddress?.city} ({order.deliveryAddress?.pincode})</p>
                <p className="text-slate-500">Phone: {order.deliveryAddress?.phone}</p>
              </div>
            </div>

            {/* OTP Verification Form */}
            {order.orderStatus !== 'DELIVERED' ? (
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <KeyRound className="w-6 h-6 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-amber-900 text-xs">Physical Delivery OTP Verification</h4>
                    <p className="text-[11px] text-amber-700">Ask the customer for their 6-digit delivery code upon produce handover</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="e.g. 482910"
                    value={otpInputs[order._id || order.id] || ''}
                    onChange={(e) => setOtpInputs({ ...otpInputs, [order._id || order.id]: e.target.value })}
                    className="w-28 px-3 py-2 text-center font-mono font-bold text-base rounded-xl border border-amber-300 focus:outline-none bg-white"
                  />
                  <button
                    onClick={() => handleVerifyOtp(order._id || order.id)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors whitespace-nowrap"
                  >
                    Verify & Deliver
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-semibold">Successfully delivered and verified via customer OTP! Escrow released.</span>
              </div>
            )}

            {messages[order._id || order.id] && (
              <div className={`text-xs font-semibold ${messages[order._id || order.id].success ? 'text-emerald-700' : 'text-red-600'}`}>
                {messages[order._id || order.id].text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryPartnerDashboard;
