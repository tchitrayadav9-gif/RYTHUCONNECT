import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartSubtotal, deliveryFee, platformFee, totalAmount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
        <div className="w-20 h-20 rounded-full bg-agro-50 text-agro-700 flex items-center justify-center mx-auto text-3xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Your Basket is Empty</h2>
        <p className="text-sm text-slate-500">
          Support local farmers by adding freshly harvested organic vegetables, fruits, and grains directly to your cart.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-agro-700 text-white rounded-xl text-sm font-bold shadow-md hover:bg-agro-800 transition-colors"
        >
          Explore Harvested Produce <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Your Harvest Basket</h1>
          <p className="text-xs text-slate-500 mt-1">Direct farm produce awaiting doorstep dispatch</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
        >
          Clear Basket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Farmer: <span className="font-semibold text-slate-700">{item.farmerName}</span></p>
                  <p className="text-xs font-bold text-agro-700 mt-1">
                    ₹{item.pricePerUnit} <span className="text-slate-400 font-normal">/ {item.unit}</span>
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Subtotal */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-l-lg transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-r-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Subtotal</span>
                  <span className="text-base font-extrabold text-slate-900">
                    ₹{item.pricePerUnit * item.quantity}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  title="Remove item"
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900">Order Summary</h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Produce Items Total</span>
              <span className="font-semibold text-slate-900">₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Logistics</span>
              <span className="font-semibold text-slate-900">
                {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE (Above ₹500)</span> : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Platform Maintenance</span>
              <span className="font-semibold text-slate-900">₹{platformFee}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
            <span className="font-bold text-slate-900 text-sm">Total Payable</span>
            <span className="font-black text-2xl text-agro-900">₹{totalAmount}</span>
          </div>

          <button
            onClick={handleCheckoutClick}
            className="w-full py-3.5 bg-agro-700 hover:bg-agro-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 bg-agro-50/50 rounded-xl border border-agro-100 text-[11px] text-agro-800 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-agro-600 shrink-0 mt-0.5" />
            <p>
              Your payment is held in escrow and released directly to the farmer only upon physical OTP confirmation at your doorstep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
