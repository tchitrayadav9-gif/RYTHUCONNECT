import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  ShieldCheck,
  Plus,
  Trash2,
  FileDown,
  CheckCircle2,
  Clock,
  Upload,
  AlertCircle
} from 'lucide-react';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('catalog');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Add Product Form State
  const [newCrop, setNewCrop] = useState({
    name: '',
    description: '',
    pricePerUnit: '',
    unit: 'KG',
    availableStock: '',
    category: 'Vegetables',
    farmingPractice: 'ORGANIC',
    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80']
  });

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.get('/products'),
      api.get('/orders/farmer-orders').catch(() => ({ data: [] }))
    ]).then(([prodRes, ordRes]) => {
      setProducts(prodRes.data || []);
      setOrders(ordRes.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', newCrop);
      setShowAddModal(false);
      setNewCrop({
        name: '',
        description: '',
        pricePerUnit: '',
        unit: 'KG',
        availableStock: '',
        category: 'Vegetables',
        farmingPractice: 'ORGANIC',
        images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80']
      });
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to list product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this crop listing?')) return;
    try {
      await api.delete(`/products/${id}`);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to delete');
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status });
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to update order status');
    }
  };

  // Trigger Node.js Stream-based CSV Export (Module 7)
  const handleExportCsv = () => {
    window.open('http://localhost:5000/api/v1/streams/sales-csv', '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Welcome, {user?.name || 'Farmer Ramesh'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-agro-100 text-agro-800 border border-agro-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-agro-600" />
              Verified Farmer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Farm: Naidu Organic Farm • Guntur District</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
            title="Download sales report streamed via Node.js Transform Stream (Module 7)"
          >
            <FileDown className="w-4 h-4 text-agro-600" />
            Export Sales (Stream CSV)
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-agro-700 hover:bg-agro-800 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Crop
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Net Sales Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹24,850</div>
          <span className="text-[11px] text-emerald-700 font-bold block">100% direct escrow payout</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Active Listings</span>
            <Package className="w-4 h-4 text-agro-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{products.length} Crops</div>
          <span className="text-[11px] text-slate-400 block">Published in marketplace</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Pending Orders</span>
            <ShoppingBag className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{orders.length}</div>
          <span className="text-[11px] text-amber-700 font-bold block">Awaiting packaging</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>KYC Verification</span>
            <ShieldCheck className="w-4 h-4 text-agro-600" />
          </div>
          <div className="text-lg font-black text-emerald-600">APPROVED</div>
          <span className="text-[11px] text-slate-400 block">Pattadar Passbook: AP-PPB-892144</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'catalog'
              ? 'bg-agro-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          My Listed Produce ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-agro-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Incoming Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('kyc')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'kyc'
              ? 'bg-agro-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Land & KYC Document
        </button>
      </div>

      {/* Tab 1: Product Catalog Table */}
      {activeTab === 'catalog' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Produce</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price / Unit</th>
                  <th className="py-3.5 px-4">Available Stock</th>
                  <th className="py-3.5 px-4">Practice</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((prod) => (
                  <tr key={prod._id || prod.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-3">
                      <img
                        src={(prod.images && prod.images[0]) || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=100&q=80'}
                        alt={prod.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="truncate max-w-[200px]">{prod.name}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">{prod.category || 'Vegetables'}</td>
                    <td className="py-3 px-4 font-black text-agro-800 text-sm">₹{prod.pricePerUnit} / {prod.unit}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">{prod.availableStock} {prod.unit}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-agro-50 text-agro-800 border border-agro-200">
                        {prod.farmingPractice || 'ORGANIC'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(prod._id || prod.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Incoming Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No pending orders currently. Check back after morning harvest!
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id || order.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Order #{order.orderNumber}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-agro-100 text-agro-800">
                      {order.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Customer: <span className="font-semibold text-slate-700">{order.customerName}</span> ({order.customerPhone})
                  </p>
                  <p className="text-xs text-slate-600 font-medium">
                    Items: {order.items.map((i) => `${i.quantity} ${i.unit} ${i.productName}`).join(', ')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right mr-3">
                    <span className="text-[10px] text-slate-400 block font-semibold">Total Revenue</span>
                    <span className="text-base font-black text-agro-900">₹{order.totalAmount}</span>
                  </div>

                  {order.orderStatus === 'CONFIRMED' && (
                    <button
                      onClick={() => handleUpdateOrderStatus(order._id || order.id, 'PACKED')}
                      className="px-3.5 py-1.5 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      Mark Packed for Pickup
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Land KYC Document Status */}
      {activeTab === 'kyc' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-agro-100 text-agro-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Land Title & KYC Verification</h3>
              <p className="text-xs text-emerald-600 font-semibold">Status: Admin Verified & Approved</p>
            </div>
          </div>

          <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-500">Document Type</span>
              <span className="font-bold text-slate-800">Pattadar Passbook</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Passbook Reference No.</span>
              <span className="font-mono font-bold text-slate-800">AP-PPB-892144</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Registered Acreage</span>
              <span className="font-bold text-slate-800">4.5 Acres</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Soil Condition</span>
              <span className="font-bold text-slate-800">Red Loamy Alluvial</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>You have full selling authority to publish crops on RythuConnect.</span>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-agro-800 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-base">List New Crop Produce</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Crop / Produce Name</label>
                <input
                  type="text"
                  required
                  value={newCrop.name}
                  onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                  placeholder="e.g. Organic Country Tomatoes (నాటు టమాటాలు)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-agro-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Direct Farm Price (₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newCrop.pricePerUnit}
                    onChange={(e) => setNewCrop({ ...newCrop, pricePerUnit: e.target.value })}
                    placeholder="35"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-agro-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Measurement Unit</label>
                  <select
                    value={newCrop.unit}
                    onChange={(e) => setNewCrop({ ...newCrop, unit: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
                  >
                    <option value="KG">Kilogram (KG)</option>
                    <option value="QUINTAL">Quintal</option>
                    <option value="BUNCH">Bunch (కట్ట)</option>
                    <option value="LITRE">Litre</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Available Stock</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newCrop.availableStock}
                    onChange={(e) => setNewCrop({ ...newCrop, availableStock: e.target.value })}
                    placeholder="250"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCrop.category}
                    onChange={(e) => setNewCrop({ ...newCrop, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains & Pulses</option>
                    <option value="Spices">Spices</option>
                    <option value="Dairy">Dairy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Crop Description & Soil Details</label>
                <textarea
                  rows="3"
                  required
                  value={newCrop.description}
                  onChange={(e) => setNewCrop({ ...newCrop, description: e.target.value })}
                  placeholder="Naturally grown using cow-dung manure without chemical urea..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-agro-700 hover:bg-agro-800 text-white font-bold rounded-xl shadow-md"
                >
                  Publish Crop to Market
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
