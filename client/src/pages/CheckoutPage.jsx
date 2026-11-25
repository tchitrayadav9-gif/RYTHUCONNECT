import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { CheckCircle2, ShieldCheck, CreditCard, Banknote, ArrowRight, Truck } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, cartSubtotal, deliveryFee, platformFee, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    recipientName: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: 'Vijayawada',
    district: 'Krishna',
    pincode: '520008'
  });

  const [paymentMethod, setPaymentMethod] = useState('ONLINE_RAZORPAY');
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (cartItems.length === 0 && !orderSuccess) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        deliveryAddress: address,
        paymentMethod
      };

      const res = await api.post('/orders', payload);
      setOrderSuccess(res.data);
      clearCart();
      setSubmitting(false);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to place order');
      setSubmitting(false);
    }
  };

  // Order Confirmed Screen
  if (orderSuccess) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-agro-100 text-agro-800">
            Order #{orderSuccess.orderNumber || 'RC-20261125-001'}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Order Placed Successfully!</h2>
          <p className="text-sm text-slate-500">
            The farmer has been notified to harvest and pack your fresh produce.
          </p>
        </div>

        {/* Delivery OTP Badge */}
        <div className="p-6 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-300 max-w-sm mx-auto space-y-1">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
            🔒 Your 6-Digit Delivery OTP
          </span>
          <span className="text-3xl font-black text-amber-950 font-mono tracking-widest block py-1">
            {orderSuccess.deliveryOtp || '482910'}
          </span>
          <p className="text-[11px] text-amber-700">
            Share this code with the delivery partner upon physical doorstep inspection.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/dashboard/customer"
            className="w-full sm:w-auto px-6 py-3 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-sm font-bold shadow-md transition-colors"
          >
            Track in Customer Dashboard
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Secure Direct Checkout</h1>
        <p className="text-xs text-slate-500 mt-1">Anti-tamper backend validated farm transaction</p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 text-xs">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Address & Payment Selection */}
        <div className="lg:col-span-8 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-agro-600" />
              Delivery Address & Recipient
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={address.recipientName}
                  onChange={(e) => setAddress({ ...address, recipientName: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  placeholder="9123456780"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Street Address / House No.</label>
              <input
                type="text"
                required
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                placeholder="Flat 402, Green Acres Apt, MG Road"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">District</label>
                <input
                  type="text"
                  required
                  value={address.district}
                  onChange={(e) => setAddress({ ...address, district: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-agro-600" />
              Select Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`p-4 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'ONLINE_RAZORPAY'
                    ? 'border-agro-600 bg-agro-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ONLINE_RAZORPAY"
                  checked={paymentMethod === 'ONLINE_RAZORPAY'}
                  onChange={() => setPaymentMethod('ONLINE_RAZORPAY')}
                  className="mt-1 accent-agro-700"
                />
                <div>
                  <span className="font-bold text-sm text-slate-900 block">UPI / Razorpay (Escrow)</span>
                  <span className="text-[11px] text-slate-500">
                    Test sandbox payment. Funds are held safely in escrow until delivery.
                  </span>
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-agro-600 bg-agro-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 accent-agro-700"
                />
                <div>
                  <span className="font-bold text-sm text-slate-900 block">Cash on Delivery (COD)</span>
                  <span className="text-[11px] text-slate-500">
                    Pay cash upon door delivery after inspecting product freshness.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Confirmation */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900">Review Basket</h3>

          <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.productId} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 block truncate max-w-[180px]">{item.name}</span>
                  <span className="text-slate-400">{item.quantity} {item.unit} × ₹{item.pricePerUnit}</span>
                </div>
                <span className="font-bold text-slate-900">₹{item.pricePerUnit * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Total</span>
              <span className="font-semibold text-slate-900">₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Charges</span>
              <span className="font-semibold text-slate-900">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Platform Fee</span>
              <span className="font-semibold text-slate-900">₹{platformFee}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
            <span className="font-bold text-slate-900 text-sm">Total Payable</span>
            <span className="font-black text-2xl text-agro-900">₹{totalAmount}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-agro-700 hover:bg-agro-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {submitting ? 'Confirming with Farmer...' : 'Confirm & Place Order'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
