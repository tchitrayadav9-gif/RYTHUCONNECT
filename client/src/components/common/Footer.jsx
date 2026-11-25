import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const adminPortalUrl = import.meta.env.VITE_ADMIN_PORTAL_URL || 'http://localhost:5174';

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-agro-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Rythu<span className="text-agro-400">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              From Farmers to Your Homes – Fresh, Fair and Direct. Eliminating unnecessary middlemen to deliver maximum earnings to hardworking farmers and nutrient-rich harvest to consumers.
            </p>
            <div className="flex items-center gap-2 text-xs text-agro-400 font-semibold bg-agro-950/60 border border-agro-800/60 px-3 py-2 rounded-lg max-w-fit">
              <ShieldCheck className="w-4 h-4" />
              100% Direct Farmer Pricing & Fair Value Trade
            </div>
          </div>

          {/* Marketplace Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products?category=Vegetables" className="hover:text-agro-400 transition-colors">Fresh Vegetables</Link></li>
              <li><Link to="/products?category=Fruits" className="hover:text-agro-400 transition-colors">Seasonal Fruits</Link></li>
              <li><Link to="/products?category=Grains" className="hover:text-agro-400 transition-colors">Traditional Grains</Link></li>
              <li><Link to="/products?category=Spices" className="hover:text-agro-400 transition-colors">Andhra Spices</Link></li>
              <li><Link to="/products?category=Dairy" className="hover:text-agro-400 transition-colors">A2 Cow Dairy</Link></li>
            </ul>
          </div>

          {/* Customer & Portals Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Customer Portal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/my-orders" className="hover:text-agro-400 transition-colors">My Orders & Tracking</Link></li>
              <li><Link to="/addresses" className="hover:text-agro-400 transition-colors">Delivery Addresses</Link></li>
              <li><Link to="/profile" className="hover:text-agro-400 transition-colors">Customer Profile</Link></li>
              <li><Link to="/academic-showcase" className="text-emerald-400 font-semibold hover:underline">Academic 10-Modules Lab</Link></li>
              <li className="pt-2">
                <a
                  href={adminPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-800/50 px-2.5 py-1.5 rounded-lg hover:bg-amber-900/60 transition-colors"
                >
                  <span>Farmer & Admin Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Helpline */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Kisan Helpline</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-agro-500" />
                <span>Toll-Free: 1800-RYTHU-AP</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-agro-500" />
                <span>support@rythuconnect.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-agro-500 shrink-0 mt-0.5" />
                <span>Amaravati AgriTech Hub, Andhra Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 RythuConnect. Customer Marketplace Platform.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-400">About Us</Link>
            <Link to="/how-it-works" className="hover:text-slate-400">How It Works</Link>
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> for Indian Farmers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
