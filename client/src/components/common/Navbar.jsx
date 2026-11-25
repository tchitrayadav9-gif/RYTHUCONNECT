import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import {
  Sprout,
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
  Store,
  Users,
  ShieldCheck,
  ChevronDown,
  MapPin
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-agro-700 flex items-center justify-center text-white shadow-md shadow-agro-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-agro-700 transition-colors">
                Rythu<span className="text-agro-600">Connect</span>
              </span>
              <span className="block text-[10px] font-semibold text-agro-700 tracking-wider uppercase -mt-1">
                రైతు కనెక్ట్ • Direct Farm Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm font-semibold text-slate-700 hover:text-agro-700 flex items-center gap-1.5 transition-colors">
              <Store className="w-4 h-4 text-agro-600" />
              Marketplace
            </Link>
            <Link to="/farmers" className="text-sm font-semibold text-slate-700 hover:text-agro-700 flex items-center gap-1.5 transition-colors">
              <Users className="w-4 h-4 text-agro-600" />
              Farmers
            </Link>
            <Link to="/how-it-works" className="text-sm font-semibold text-slate-700 hover:text-agro-700 transition-colors">
              How It Works
            </Link>
            <Link to="/about" className="text-sm font-semibold text-slate-700 hover:text-agro-700 transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-sm font-semibold text-slate-700 hover:text-agro-700 transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Action Icons: Cart & Google Auth */}
          <div className="hidden md:flex items-center gap-4">
            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-xl text-slate-700 hover:text-agro-700 hover:bg-slate-100 transition-colors"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-agro-600 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Authenticated Customer Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-agro-300 hover:bg-agro-50/50 transition-all"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user?.name}
                    className="w-7 h-7 rounded-full object-cover border border-agro-600"
                  />
                  <div className="text-left text-xs">
                    <span className="font-bold text-slate-800 block truncate max-w-[120px]">{user?.name}</span>
                    <span className="text-[10px] font-bold text-emerald-700">Verified Customer</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Signed in with Google</p>
                      <p className="text-xs font-semibold text-slate-900 truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/my-orders"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-agro-50 hover:text-agro-800"
                    >
                      <ShoppingBag className="w-4 h-4 text-agro-600" />
                      My Orders & Tracking
                    </Link>

                    <Link
                      to="/addresses"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-agro-50 hover:text-agro-800"
                    >
                      <MapPin className="w-4 h-4 text-agro-600" />
                      Delivery Addresses
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-agro-50 hover:text-agro-800"
                    >
                      <User className="w-4 h-4 text-agro-600" />
                      Customer Profile
                    </Link>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-bold text-white bg-agro-700 hover:bg-agro-800 px-4 py-2 rounded-xl shadow-sm shadow-agro-700/20 transition-all flex items-center gap-1.5"
              >
                <User className="w-4 h-4" /> Sign In with Google
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link to="/cart" className="relative p-1.5 text-slate-700">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-agro-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-agro-700"
          >
            Marketplace
          </Link>
          <Link
            to="/farmers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-agro-700"
          >
            Verified Farmers
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-agro-700"
          >
            How It Works
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-agro-700"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-agro-700"
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/my-orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-agro-700 rounded-xl"
                >
                  My Orders & Deliveries
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="block w-full py-2 text-center text-sm font-semibold text-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-center text-sm font-semibold text-white bg-agro-700 rounded-xl shadow-md"
              >
                Sign In with Google
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
