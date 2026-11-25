import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public & Customer Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import FarmersDirectoryPage from './pages/FarmersDirectoryPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CustomerOrdersPage from './pages/CustomerOrdersPage';
import SavedAddressesPage from './pages/SavedAddressesPage';
import CustomerProfilePage from './pages/CustomerProfilePage';
import AcademicShowcasePage from './pages/AcademicShowcasePage';

// Portal Redirect Component for Farmer & Admin
const ExternalPortalRedirect = ({ title, role }) => {
  const adminUrl = import.meta.env.VITE_ADMIN_PORTAL_URL || 'http://localhost:5174';
  return (
    <div className="max-w-2xl mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 shadow-md text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto text-2xl font-bold">
        🌾
      </div>
      <h2 className="text-2xl font-black text-slate-900">{title} Notice</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        As per the RythuConnect decoupled architecture, the <strong>{role}</strong> is hosted on a dedicated administrative application to ensure strict role isolation and security.
      </p>
      <div className="pt-2">
        <a
          href={adminUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
        >
          Open Farmer & Admin Portal ({adminUrl}) ↗
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public & Customer Marketplace Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/farmers" element={<FarmersDirectoryPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/academic-showcase" element={<AcademicShowcasePage />} />

                {/* Customer Account & Order Tracking */}
                <Route path="/my-orders" element={<CustomerOrdersPage />} />
                <Route path="/orders" element={<CustomerOrdersPage />} />
                <Route path="/dashboard/customer" element={<CustomerOrdersPage />} />
                <Route path="/addresses" element={<SavedAddressesPage />} />
                <Route path="/profile" element={<CustomerProfilePage />} />

                {/* Relocated Portals (Isolated to RYTHU_CONNECT_ADMIN) */}
                <Route
                  path="/dashboard/farmer"
                  element={<ExternalPortalRedirect title="Farmer Hub" role="Farmer Portal" />}
                />
                <Route
                  path="/dashboard/admin"
                  element={<ExternalPortalRedirect title="Administrator Hub" role="Admin Verification Console" />}
                />
                <Route
                  path="/dashboard/delivery"
                  element={<ExternalPortalRedirect title="Delivery Hub" role="Delivery Partner Console" />}
                />
                <Route
                  path="/dashboard/bulk"
                  element={<ExternalPortalRedirect title="Bulk Procurement" role="B2B Procurement Console" />}
                />

                {/* Fallback 404 */}
                <Route
                  path="*"
                  element={
                    <div className="py-24 text-center space-y-4">
                      <h2 className="text-4xl font-extrabold text-slate-900">404 - Page Not Found</h2>
                      <p className="text-slate-500 text-sm">The agricultural page you were searching for does not exist.</p>
                      <a href="/" className="inline-block px-5 py-2.5 bg-agro-700 text-white rounded-xl text-xs font-bold">
                        Return to Marketplace
                      </a>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;