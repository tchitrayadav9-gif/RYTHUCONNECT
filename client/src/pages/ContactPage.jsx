import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', userType: 'Customer', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Contact RythuConnect</h1>
        <p className="text-sm text-slate-500">
          Have questions about onboarding your farm, bulk restaurant orders, or delivery support? Reach out to our agrarian support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-agro-100 text-agro-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Kisan Toll-Free Helpline</h3>
            <p className="text-xs text-slate-500">Available 6:00 AM - 9:00 PM in Telugu and English.</p>
            <p className="text-sm font-bold text-agro-700">1800-RYTHU-AP (1800-798-4827)</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-agro-100 text-agro-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Direct Email</h3>
            <p className="text-xs text-slate-500">For partnerships, institutional bulk procurement & media.</p>
            <p className="text-sm font-bold text-agro-700">support@rythuconnect.in</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-agro-100 text-agro-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Andhra AgriTech Innovation Hub</h3>
            <p className="text-xs text-slate-500">
              Tech Park Road, Near Seed Access Corridor, Amaravati, Andhra Pradesh 522503.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Delivered</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you, {formData.name}. Our regional farmer relations officer will get in touch with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Send Us an Inquiry</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600"
                    placeholder="e.g. Ramesh Naidu"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">I am a</label>
                  <select
                    value={formData.userType}
                    onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600 bg-white"
                  >
                    <option value="Farmer">Farmer / Producer</option>
                    <option value="Customer">Household Consumer</option>
                    <option value="Bulk Buyer">Restaurant / Bulk Buyer</option>
                    <option value="Delivery Partner">Logistics / Delivery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Message or Query</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600"
                  placeholder="How can we assist you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-agro-700 hover:bg-agro-800 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
