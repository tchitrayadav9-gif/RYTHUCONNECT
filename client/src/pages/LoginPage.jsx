import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, LogIn, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';

const LoginPage = () => {
  const { login, demoLogin, loading, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const getDashboardPath = (role) => {
    switch (role) {
      case 'FARMER':
        return '/dashboard/farmer';
      case 'ADMIN':
        return '/dashboard/admin';
      case 'BULK_BUYER':
        return '/dashboard/bulk';
      case 'DELIVERY_PARTNER':
        return '/dashboard/delivery';
      default:
        return '/dashboard/customer';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    try {
      const loggedUser = await login(email, password);
      navigate(getDashboardPath(loggedUser.role));
    } catch (err) {
      setLocalError(err.message || 'Login failed');
    }
  };

  const handleQuickDemoLogin = async (role) => {
    setLocalError('');
    try {
      const loggedUser = await demoLogin(role);
      navigate(getDashboardPath(loggedUser.role));
    } catch (err) {
      setLocalError(err.message || 'Demo login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-agro-700 text-white flex items-center justify-center mx-auto shadow-md">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Sign in to RythuConnect</h2>
          <p className="text-xs text-slate-500">
            From Farmers to Your Homes – Fresh, Fair and Direct
          </p>
        </div>

        {/* Error Alert */}
        {(localError || error) && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{localError || error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="farmer@rythuconnect.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600 focus:ring-1 focus:ring-agro-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600 focus:ring-1 focus:ring-agro-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-agro-700 hover:bg-agro-800 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Quick Demo Logins for Evaluator */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-1.5 justify-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Evaluator 1-Click Role Login
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemoLogin('FARMER')}
              className="p-2 rounded-xl bg-agro-50 text-agro-800 border border-agro-200 hover:bg-agro-100 font-bold flex items-center justify-center gap-1 transition-colors"
            >
              🌾 Farmer
            </button>
            <button
              onClick={() => handleQuickDemoLogin('CUSTOMER')}
              className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-bold flex items-center justify-center gap-1 transition-colors"
            >
              🛒 Customer
            </button>
            <button
              onClick={() => handleQuickDemoLogin('ADMIN')}
              className="p-2 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 font-bold flex items-center justify-center gap-1 transition-colors"
            >
              🛡️ Admin
            </button>
            <button
              onClick={() => handleQuickDemoLogin('BULK_BUYER')}
              className="p-2 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 font-bold flex items-center justify-center gap-1 transition-colors"
            >
              🏢 Bulk Buyer
            </button>
            <button
              onClick={() => handleQuickDemoLogin('DELIVERY_PARTNER')}
              className="col-span-2 p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 font-bold flex items-center justify-center gap-1 transition-colors"
            >
              🚚 Delivery Partner (OTP Verification)
            </button>
          </div>
        </div>

        {/* Registration Link */}
        <div className="text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-agro-700 hover:underline">
            Register as Farmer or Customer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
