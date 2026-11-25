import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { MapPin, Plus, CheckCircle2, ShieldCheck } from 'lucide-react';

const SavedAddressesPage = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState(user?.savedAddresses || [
    {
      _id: 'addr_01',
      recipientName: user?.name || 'Priya Sharma',
      phone: user?.phone || '9123456780',
      street: 'Flat 402, Green Acres Apt, MG Road',
      city: 'Vijayawada',
      district: 'Krishna',
      pincode: '520008',
      isDefault: true
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: user?.name || '',
    phone: '',
    street: '',
    city: 'Vijayawada',
    district: 'Krishna',
    pincode: ''
  });

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/addresses', formData);
      const newAddr = { ...formData, _id: 'addr_' + Date.now(), isDefault: false };
      setAddresses([...addresses, newAddr]);
      setShowModal(false);
      setFormData({
        recipientName: user?.name || '',
        phone: '',
        street: '',
        city: 'Vijayawada',
        district: 'Krishna',
        pincode: ''
      });
    } catch (err) {
      alert(err.message || 'Failed to save address');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Delivery Addresses</h1>
          <p className="text-xs text-slate-500 mt-1">Manage where your farm produce orders are delivered</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 relative"
          >
            {addr.isDefault && (
              <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-agro-100 text-agro-800 border border-agro-200">
                Default Address
              </span>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-agro-600 shrink-0" />
              <h3 className="font-bold text-slate-900 text-base">{addr.recipientName}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {addr.street}, {addr.city}, {addr.district} - {addr.pincode}
            </p>
            <p className="text-xs text-slate-400 font-medium">Contact: {addr.phone}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
            <h3 className="font-bold text-lg text-slate-900">Add New Delivery Address</h3>
            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-agro-600"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-agro-600"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Flat 201, Shanti Enclave"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-agro-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-agro-700 hover:bg-agro-800 text-white font-bold rounded-xl shadow-md"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedAddressesPage;
