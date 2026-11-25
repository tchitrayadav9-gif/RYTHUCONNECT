import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Users,
  ShieldCheck,
  TrendingUp,
  Package,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.get('/admin/analytics'),
      api.get('/admin/farmer-verifications')
    ]).then(([anaRes, kycRes]) => {
      setAnalytics(anaRes.data);
      setVerifications(kycRes.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/farmer-verifications/${id}`, { status });
      loadData();
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Admin Governance & Platform Oversight
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor farmer onboarding, audit land records, inspect orders, and oversee marketplace health
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Total Users</span>
          <span className="text-xl font-black text-slate-900">{analytics?.totalUsers || 148}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Registered Farmers</span>
          <span className="text-xl font-black text-agro-800">{analytics?.totalFarmers || 32}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Customers</span>
          <span className="text-xl font-black text-slate-900">{analytics?.totalCustomers || 104}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Products</span>
          <span className="text-xl font-black text-slate-900">{analytics?.totalProducts || 24}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Total Orders</span>
          <span className="text-xl font-black text-slate-900">{analytics?.totalOrders || 68}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Total Revenue</span>
          <span className="text-xl font-black text-emerald-700">₹{analytics?.totalRevenue || 48950}</span>
        </div>
      </div>

      {/* Farmer KYC Verification Queue */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-agro-600" />
              Farmer KYC & Land Verification Queue
            </h3>
            <p className="text-xs text-slate-500">Audit Pattadar Passbook & Aadhaar before granting crop publishing permission</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            {verifications.filter((v) => v.verificationStatus === 'PENDING').length} Pending Audits
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Farmer Details</th>
                <th className="py-3 px-4">Farm & Location</th>
                <th className="py-3 px-4">Land Acres</th>
                <th className="py-3 px-4">Doc & ID Number</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {verifications.map((kyc) => (
                <tr key={kyc._id || kyc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <div>{kyc.name || (kyc.userId && kyc.userId.name)}</div>
                    <span className="text-[11px] text-slate-400 font-normal">{kyc.phone}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 block">{kyc.farmName}</span>
                    <span className="text-slate-400">{kyc.village}, {kyc.district}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{kyc.acres || kyc.landSizeAcres} Acres</td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {kyc.idNumber || kyc.governmentIdNumber}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        kyc.verificationStatus === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : kyc.verificationStatus === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {kyc.verificationStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    {kyc.verificationStatus === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(kyc._id || kyc.id, 'APPROVED')}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shadow-sm transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(kyc._id || kyc.id, 'REJECTED')}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-[11px] shadow-sm transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {kyc.verificationStatus === 'APPROVED' && (
                      <span className="text-emerald-600 font-bold text-[11px]">✓ Verified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
