import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, ShieldCheck, MapPin, ShoppingBag, LogOut, CheckCircle2 } from 'lucide-react';

const CustomerProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Account Profile</h1>
        <p className="text-xs text-slate-500 mt-1">Verified Customer Identity on RythuConnect</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-agro-100 shadow-md"
          />
          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-slate-900">{user?.name || 'Customer'}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Google Account
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {user?.email}
            </p>
            <p className="text-[11px] text-slate-400">Account Role: Consumer / Household Buyer</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
          <Link
            to="/my-orders"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-agro-50 text-slate-800 hover:text-agro-800 border border-slate-200 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-agro-600" />
              <span>Track Orders & History</span>
            </div>
            <span>→</span>
          </Link>

          <Link
            to="/addresses"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-agro-50 text-slate-800 hover:text-agro-800 border border-slate-200 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-agro-600" />
              <span>Manage Delivery Addresses</span>
            </div>
            <span>→</span>
          </Link>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-5 py-2.5 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold border border-red-200 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out from Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
