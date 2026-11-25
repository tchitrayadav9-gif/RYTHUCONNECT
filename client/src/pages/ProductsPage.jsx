import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/common/ProductCard';
import { Search, Filter, SlidersHorizontal, RefreshCcw, ArrowUpDown } from 'lucide-react';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState('latest');
  const [organicOnly, setOrganicOnly] = useState(false);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Spices', 'Dairy'];

  const fetchProducts = () => {
    setLoading(true);
    let url = `/products?maxPrice=${maxPrice}&sort=${sortBy}`;
    if (selectedCategory && selectedCategory !== 'All') {
      url += `&category=${selectedCategory}`;
    }
    if (searchTerm) {
      url += `&search=${encodeURIComponent(searchTerm)}`;
    }

    api.get(url)
      .then((res) => {
        let items = res.data || [];
        if (organicOnly) {
          items = items.filter((p) => p.farmingPractice === 'ORGANIC');
        }
        setProducts(items);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, maxPrice, sortBy, organicOnly]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setMaxPrice(500);
    setSortBy('latest');
    setOrganicOnly(false);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Agricultural Marketplace</h1>
        <p className="text-sm text-slate-500">
          Direct from farm produce with verified organic origins and transparent farmer pricing.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by crop name, farmer, or variety (e.g., Tomato, Mango)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-agro-600 focus:ring-1 focus:ring-agro-600"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-sm font-bold transition-all shrink-0"
          >
            Search
          </button>
        </form>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-agro-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
          {/* Price Range Slider */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-600">Max Price: ₹{maxPrice}</span>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-agro-700 cursor-pointer w-28 sm:w-36"
            />
          </div>

          {/* Organic Only Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 select-none">
            <input
              type="checkbox"
              checked={organicOnly}
              onChange={(e) => setOrganicOnly(e.target.checked)}
              className="rounded accent-agro-700 w-4 h-4 cursor-pointer"
            />
            Certified Organic Only
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-semibold text-slate-700 focus:outline-none"
            >
              <option value="latest">Latest Harvest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <button
              onClick={handleResetFilters}
              title="Reset all filters"
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors ml-2"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse h-80"></div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto text-2xl">
            🌾
          </div>
          <h3 className="font-bold text-lg text-slate-900">No Produce Found</h3>
          <p className="text-xs text-slate-500">
            No crops matched your selected filters or search terms. Try adjusting the price range or category.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-agro-700 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-agro-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
