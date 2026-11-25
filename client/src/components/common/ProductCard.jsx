import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Star, QrCode, Check, ShieldCheck } from 'lucide-react';
import TraceabilityModal from './TraceabilityModal';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [traceModalOpen, setTraceModalOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const image = (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80';
  const farmerName = (product.farmer && product.farmer.name) || (product.farmerId && product.farmerId.name) || 'Ramesh Naidu';
  const district = (product.farmer && product.farmer.district) || 'Guntur';

  return (
    <>
      <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-agro-300 transition-all flex flex-col justify-between">
        <div>
          {/* Image Container with Badges */}
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Organic/Practice Badge */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-agro-800 shadow-sm border border-agro-100 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-agro-600" />
                {product.farmingPractice || 'ORGANIC'}
              </span>
            </div>

            {/* Traceability QR Trigger */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setTraceModalOpen(true);
              }}
              title="Inspect Farm Traceability & Batch QR"
              className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-700 hover:text-agro-700 hover:bg-white shadow-sm transition-all"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>

          {/* Product Details */}
          <div className="p-4 sm:p-5">
            {/* Farmer & Location Info */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="font-semibold text-slate-700 truncate max-w-[150px]">
                🌾 {farmerName}
              </span>
              <span>{district}</span>
            </div>

            {/* Title */}
            <Link to={`/products/${product._id || product.id}`}>
              <h3 className="font-bold text-slate-900 group-hover:text-agro-700 transition-colors line-clamp-1 text-base">
                {product.name}
              </h3>
            </Link>

            {/* Rating & Stock Status */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex items-center text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 mr-1" />
                {product.averageRating || 4.8}
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">
                {product.availableStock > 0 ? (
                  <span className="text-emerald-700 font-medium">In Stock ({product.availableStock} {product.unit})</span>
                ) : (
                  <span className="text-red-500 font-semibold">Sold Out</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart Bar */}
        <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Direct Farm Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-agro-900">₹{product.pricePerUnit}</span>
              <span className="text-xs font-semibold text-slate-500">/ {product.unit || 'KG'}</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.availableStock <= 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              added
                ? 'bg-emerald-600 text-white'
                : product.availableStock <= 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-agro-700 hover:bg-agro-800 text-white hover:shadow-md hover:shadow-agro-700/20 active:scale-95'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>

      <TraceabilityModal
        product={product}
        isOpen={traceModalOpen}
        onClose={() => setTraceModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
