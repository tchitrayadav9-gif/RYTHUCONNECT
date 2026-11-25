import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import FarmersDirectoryPage from './pages/FarmersDirectoryPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AcademicShowcasePage from './pages/AcademicShowcasePage';

// Dashboards
import FarmerDashboard from './dashboards/FarmerDashboard';
import CustomerDashboard from './dashboards/CustomerDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import BulkBuyerDashboard from './dashboards/BulkBuyerDashboard';
import DeliveryPartnerDashboard from './dashboards/DeliveryPartnerDashboard';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/farmers" element={<FarmersDirectoryPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/academic-showcase" element={<AcademicShowcasePage />} />

                {/* Role Dashboards */}
                <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
                <Route path="/dashboard/customer" element={<CustomerDashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route path="/dashboard/bulk" element={<BulkBuyerDashboard />} />
                <Route path="/dashboard/delivery" element={<DeliveryPartnerDashboard />} />

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
