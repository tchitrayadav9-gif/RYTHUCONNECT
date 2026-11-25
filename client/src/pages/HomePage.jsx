import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/common/ProductCard';
import {
  Sprout,
  ShieldCheck,
  TrendingUp,
  Truck,
  ArrowRight,
  Search,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.get('/products?limit=6')
      .then((res) => {
        setFeaturedProducts(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const categories = [
    { name: 'Vegetables', telugu: 'కూరగాయలు', icon: '🥬', count: '18 varieties', slug: 'Vegetables', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=400&q=80' },
    { name: 'Fruits', telugu: 'పండ్లు', icon: '🍎', count: '12 varieties', slug: 'Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80' },
    { name: 'Grains & Pulses', telugu: 'ధాన్యాలు & పప్పులు', icon: '🌾', count: '9 types', slug: 'Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80' },
    { name: 'Spices', telugu: 'మసాలాలు', icon: '🌶️', count: '15 items', slug: 'Spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80' },
    { name: 'A2 Dairy & Ghee', telugu: 'దేశీ ఆవు పాలు', icon: '🥛', count: 'Daily Fresh', slug: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-agro-900 via-agro-800 to-agro-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mission Headline & Search */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-agro-200">
                <Sparkles className="w-4 h-4 text-amber-300" />
                International Year of the Woman Farmer 2026 Initiative
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                From Farmers to Your Homes – <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-300 to-emerald-200">
                  Fresh, Fair and Direct.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Empowering Andhra & Telangana farmers with 100% pricing control while giving your family access to naturally cultivated, pesticide-free harvest within 24 hours of cutting.
              </p>

              {/* Direct Search Bar */}
              <div className="max-w-lg mx-auto lg:mx-0 bg-white p-2 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
                <div className="pl-3 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search organic tomatoes, mangoes, Sona Masoori..."
                  className="w-full text-slate-900 text-sm focus:outline-none placeholder:text-slate-400"
                />
                <Link
                  to={`/products?search=${encodeURIComponent(searchQuery)}`}
                  className="px-5 py-2.5 rounded-xl bg-agro-700 hover:bg-agro-800 text-white text-sm font-bold shadow-md transition-all shrink-0"
                >
                  Explore
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-agro-400" />
                  0% Intermediary Cuts
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-agro-400" />
                  Verified Pattadar Land Titles
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-agro-400" />
                  Same-Day Harvest Dispatch
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                  <img
                    src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                    alt="Indian Farmer in field"
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-agro-500 text-white w-max mb-2">
                      Farmer Story Spotlight
                    </span>
                    <h3 className="text-xl font-bold">Ramesh Naidu (Guntur)</h3>
                    <p className="text-xs text-slate-300 mt-1">
                      "With RythuConnect, I received ₹35/KG for my tomatoes instead of ₹12 from the middleman broker. My entire village is switching."
                    </p>
                  </div>
                </div>

                {/* Floating Metric Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-agro-100 text-agro-700 flex items-center justify-center font-bold">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block">Direct Farmer Earnings</span>
                    <span className="text-lg font-extrabold text-agro-800">+180% More Revenue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produce Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-agro-700 uppercase tracking-wider block">Crop Classification</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Browse Fresh Harvest</h2>
          </div>
          <Link to="/products" className="text-sm font-bold text-agro-700 hover:text-agro-800 flex items-center gap-1">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.slug}`}
              className="group bg-white rounded-2xl p-4 border border-slate-200 hover:border-agro-400 hover:shadow-lg transition-all flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-agro-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform mb-3 border border-agro-100">
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-agro-700 transition-colors text-sm sm:text-base">
                {cat.name}
              </h3>
              <span className="text-xs text-agro-700 font-medium">{cat.telugu}</span>
              <span className="text-[11px] text-slate-400 mt-1">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Farm Produce */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2">
              <Award className="w-3.5 h-3.5" />
              Harvested Today
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Featured Direct Listings</h2>
          </div>
          <Link to="/products" className="text-sm font-bold text-agro-700 hover:text-agro-800 flex items-center gap-1">
            See All Products ({featuredProducts.length}) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse h-80"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Fair Price Transparency Comparison Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-agro-400">Social Impact & Economics</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Where does your ₹100 go when buying tomatoes?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              In conventional mandi supply chains, middlemen brokers, commission agents, and wholesale cartels pocket up to 65% of the consumer's payment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {/* Traditional Mandi */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-bold text-red-400 uppercase">Traditional Mandi Broker System</span>
                <div className="text-2xl font-black text-white">Farmer gets ₹25 - ₹35</div>
                <p className="text-xs text-slate-400">
                  Broker Commission: ₹25 • Transportation Markup: ₹20 • Wholesale Cut: ₹20.
                </p>
              </div>

              {/* RythuConnect */}
              <div className="p-5 rounded-2xl bg-agro-900/60 border border-agro-500/40 space-y-2">
                <span className="text-xs font-bold text-agro-400 uppercase">RythuConnect Direct Platform</span>
                <div className="text-2xl font-black text-agro-300">Farmer gets ₹88 - ₹92</div>
                <p className="text-xs text-agro-200">
                  Direct Farmer Payout: 90% • Cold Route Logistics: ₹8 • Platform Maintenance: ₹2.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How RythuConnect Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-agro-700 uppercase tracking-wider">Simple Process</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Farm to Table in 3 Easy Steps</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-agro-100 text-agro-800 font-black text-xl flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="font-bold text-lg text-slate-900">Farmer Sets Price & Lists</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Verified farmers add harvest estimates, determine their fair price per KG, and register crop batch details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-agro-100 text-agro-800 font-black text-xl flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="font-bold text-lg text-slate-900">Customer or Bulk Buyer Orders</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Household customers and bulk restaurants place orders. Stock is decremented in real-time with anti-tamper pricing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-agro-100 text-agro-800 font-black text-xl flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="font-bold text-lg text-slate-900">OTP Handover & Instant Escrow</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Delivery partner validates customer 6-digit OTP upon doorstep drop. Escrow payment is released immediately to the farmer's bank account.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-agro-800 to-agro-700 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Are you a Farmer or Agricultural FPO?</h2>
            <p className="text-sm text-agro-100 max-w-xl">
              Register in under 2 minutes. Submit your Pattadar passbook, list your standing crops, and reach thousands of direct urban consumers today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-white text-agro-800 font-bold text-sm shadow-md hover:bg-slate-100 transition-colors text-center"
            >
              Register as Farmer
            </Link>
            <Link
              to="/academic-showcase"
              className="px-6 py-3 rounded-xl bg-agro-900/40 border border-white/30 text-white font-bold text-sm hover:bg-agro-900/60 transition-colors text-center"
            >
              Academic Lab Showcase
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
