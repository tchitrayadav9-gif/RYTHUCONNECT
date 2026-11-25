import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { ShoppingBag, Truck, CheckCircle2, Clock, MapPin, KeyRound, ArrowRight } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/my-orders')
      .then((res) => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Hello, {user?.name || 'Priya'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">Manage your active farm deliveries, harvest orders, and delivery OTPs</p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-agro-600" />
          My Orders & Delivery Tracking
        </h2>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 animate-pulse h-48"></div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
            <p className="text-sm text-slate-500">You haven't placed any direct farm orders yet.</p>
            <Link to="/products" className="inline-block px-5 py-2.5 bg-agro-700 text-white rounded-xl text-xs font-bold">
              Shop Fresh Harvest
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id || order.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <span className="font-mono text-xs font-bold text-agro-700 block">
                    Order #{order.orderNumber}
                  </span>
                  <span className="text-[11px] text-slate-400">Placed on {new Date(order.placedAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-agro-100 text-agro-800">
                    Status: {order.orderStatus}
                  </span>
                  <span className="text-base font-black text-slate-900">₹{order.totalAmount}</span>
                </div>
              </div>

              {/* Delivery OTP Security Badge (Crucial for Physical Handover) */}
              {order.orderStatus !== 'DELIVERED' && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-900 text-xs">Doorstep Delivery OTP</h4>
                      <p className="text-[11px] text-amber-700">Give this code to the delivery partner upon physical inspection of produce</p>
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <span className="text-2xl font-black font-mono text-amber-950 tracking-widest bg-white px-4 py-1.5 rounded-xl border border-amber-300 shadow-sm">
                      {order.deliveryOtp || '482910'}
                    </span>
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Ordered Items:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-800 block">{item.productName}</span>
                        <span className="text-slate-400">{item.quantity} {item.unit} × ₹{item.pricePerUnit}</span>
                      </div>
                      <span className="font-bold text-slate-900">₹{item.subtotal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="text-xs text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-agro-600 shrink-0" />
                Delivery to: <span className="font-semibold text-slate-700">{order.deliveryAddress?.street}, {order.deliveryAddress?.city} ({order.deliveryAddress?.pincode})</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
