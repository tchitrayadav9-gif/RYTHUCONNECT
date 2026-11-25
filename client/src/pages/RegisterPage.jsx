import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, UserPlus, ShieldCheck, ShieldAlert } from 'lucide-react';

const RegisterPage = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('FARMER');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    // Farmer specific
    farmName: '',
    village: '',
    district: 'Guntur',
    acres: '3.5',
    farmingType: 'ORGANIC',
    crops: 'Tomatoes, Chillies',
    // Bulk Buyer specific
    businessName: ''
  });
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role,
        farmDetails: role === 'FARMER' ? {
          farmName: formData.farmName || `${formData.name}'s Farm`,
          village: formData.village || 'Tenali Rural',
          district: formData.district || 'Guntur',
          acres: Number(formData.acres) || 3.5,
          farmingType: formData.farmingType,
          crops: formData.crops.split(',').map((c) => c.trim())
        } : undefined
      };

      const registeredUser = await register(payload);
      if (registeredUser.role === 'FARMER') navigate('/dashboard/farmer');
      else if (registeredUser.role === 'ADMIN') navigate('/dashboard/admin');
      else if (registeredUser.role === 'BULK_BUYER') navigate('/dashboard/bulk');
      else if (registeredUser.role === 'DELIVERY_PARTNER') navigate('/dashboard/delivery');
      else navigate('/dashboard/customer');
    } catch (err) {
      setLocalError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-agro-700 text-white flex items-center justify-center mx-auto shadow-md">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create RythuConnect Account</h2>
          <p className="text-xs text-slate-500">
            Join thousands of farmers & direct buyers on India's transparent AgriMarket
          </p>
        </div>

        {/* Role Selector Pills */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('FARMER')}
            className={`py-2 rounded-xl transition-all ${
              role === 'FARMER' ? 'bg-agro-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌾 Farmer
          </button>
          <button
            type="button"
            onClick={() => setRole('CUSTOMER')}
            className={`py-2 rounded-xl transition-all ${
              role === 'CUSTOMER' ? 'bg-agro-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🛒 Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('BULK_BUYER')}
            className={`py-2 rounded-xl transition-all ${
              role === 'BULK_BUYER' ? 'bg-agro-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏢 Bulk Buyer
          </button>
        </div>

        {/* Error Alert */}
        {(localError || error) && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{localError || error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ramesh Naidu"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ramesh@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="9876543210"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
            <input
              type="password"
              required
              minLength="6"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600"
            />
          </div>

          {/* Conditional Farmer Fields */}
          {role === 'FARMER' && (
            <div className="p-4 bg-agro-50/60 rounded-2xl border border-agro-200 space-y-3">
              <span className="text-xs font-bold text-agro-800 uppercase tracking-wider block">
                🌾 Farm KYC Details
              </span>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Farm / Estate Name</label>
                <input
                  type="text"
                  required
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  placeholder="e.g. Naidu Organic Farm"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Village / Mandal</label>
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="Tenali Rural"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">District</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none"
                  >
                    <option value="Guntur">Guntur</option>
                    <option value="Krishna">Krishna</option>
                    <option value="West Godavari">West Godavari</option>
                    <option value="East Godavari">East Godavari</option>
                    <option value="Chittoor">Chittoor</option>
                    <option value="Kurnool">Kurnool</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Land Size (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.acres}
                    onChange={(e) => setFormData({ ...formData, acres: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Farming Type</label>
                  <select
                    value={formData.farmingType}
                    onChange={(e) => setFormData({ ...formData, farmingType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none"
                  >
                    <option value="ORGANIC">Certified Organic</option>
                    <option value="NATURAL">Cow-based Natural</option>
                    <option value="CONVENTIONAL">Conventional</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-agro-700 hover:bg-agro-800 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? 'Creating Account...' : `Register as ${role}`}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-agro-700 hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
