import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import TraceabilityModal from '../components/common/TraceabilityModal';
import {
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Truck,
  Plus,
  Minus,
  ShoppingBag,
  QrCode,
  ArrowLeft,
  CheckCircle2,
  Share2
} from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [traceModalOpen, setTraceModalOpen] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-8 bg-slate-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-96 bg-slate-200 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="h-10 bg-slate-200 rounded w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            <div className="h-32 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Produce Not Found</h2>
        <p className="text-sm text-slate-500">This agricultural listing may have expired or sold out.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 bg-agro-700 text-white rounded-xl text-sm font-bold">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const image = (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80';
  const farmerName = (product.farmer && product.farmer.name) || (product.farmerId && product.farmerId.name) || 'Ramesh Naidu';
  const district = (product.farmer && product.farmer.district) || 'Guntur';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-agro-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery & Traceability Trigger */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setTraceModalOpen(true)}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold text-agro-800 shadow-lg flex items-center gap-1.5 hover:bg-white transition-all border border-agro-100"
            >
              <QrCode className="w-4 h-4 text-agro-600" />
              View Batch QR Traceability
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <ShieldCheck className="w-5 h-5 text-agro-600 mx-auto mb-1" />
              <span className="text-[11px] font-bold text-slate-700 block">{product.farmingPractice || 'ORGANIC'}</span>
              <span className="text-[9px] text-slate-400">Chemical-Free</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <Calendar className="w-5 h-5 text-agro-600 mx-auto mb-1" />
              <span className="text-[11px] font-bold text-slate-700 block">Fresh Harvest</span>
              <span className="text-[9px] text-slate-400">Within 24 Hours</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <Truck className="w-5 h-5 text-agro-600 mx-auto mb-1" />
              <span className="text-[11px] font-bold text-slate-700 block">Doorstep Drop</span>
              <span className="text-[9px] text-slate-400">OTP Verified</span>
            </div>
          </div>
        </div>

        {/* Right: Produce Details & Action Card */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-agro-100 text-agro-800">
                {product.category || 'Agricultural Produce'}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-emerald-700">
                In Stock: {product.availableStock} {product.unit}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400 mr-1" />
                {product.averageRating || 4.8}
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">
                {product.numReviews || 24} Verified Buyer Ratings
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 bg-agro-50/50 rounded-2xl border border-agro-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-semibold block">Direct Farm Gate Price</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-3xl font-black text-agro-900">₹{product.pricePerUnit}</span>
                <span className="text-sm font-bold text-slate-600">/ {product.unit || 'KG'}</span>
              </div>
            </div>
            <div className="text-right text-xs text-agro-700 font-medium">
              <span className="block font-bold">100% Goes to Farmer</span>
              <span className="text-[10px] text-slate-400">Zero middleman commission</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">About This Crop Batch</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Farmer Contact & Origin Card */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-agro-100 flex items-center justify-center text-xl font-bold text-agro-800 shrink-0">
              👨‍🌾
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-slate-900 truncate">{farmerName}</h4>
                <ShieldCheck className="w-4 h-4 text-agro-600 shrink-0" />
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-agro-600 shrink-0" />
                {district}, Andhra Pradesh
              </p>
            </div>
            <Link
              to="/farmers"
              className="text-xs font-bold text-agro-700 hover:text-agro-800 px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-slate-200"
            >
              View Farm
            </Link>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-700">Quantity ({product.unit}):</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.availableStock || 99, quantity + 1))}
                  className="p-2.5 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-slate-400">
                Subtotal: <span className="font-bold text-slate-800">₹{product.pricePerUnit * quantity}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3 px-6 rounded-xl bg-agro-700 hover:bg-agro-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {added ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                Instant Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <TraceabilityModal
        product={product}
        isOpen={traceModalOpen}
        onClose={() => setTraceModalOpen(false)}
      />
    </div>
  );
};

export default ProductDetailsPage;
