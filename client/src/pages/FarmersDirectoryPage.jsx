import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Award, Star, Sprout, ArrowRight } from 'lucide-react';

const farmersList = [
  {
    id: 'farmer_001',
    name: 'Ramesh Naidu',
    village: 'Tenali Rural',
    district: 'Guntur',
    acres: 4.5,
    farmingType: 'ORGANIC',
    crops: ['Country Tomatoes', 'Guntur Red Chillies', 'Brinjal', 'Palak'],
    rating: 4.9,
    experienceYears: 18,
    avatar: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=400&q=80',
    bio: 'Pioneered cow-based natural farming in Guntur without synthetic urea or organophosphate pesticides.'
  },
  {
    id: 'farmer_002',
    name: 'Saraswathi Devi',
    village: 'Nuzvid',
    district: 'Krishna',
    acres: 6.0,
    farmingType: 'ORGANIC',
    crops: ['Banganapalli Mangoes', 'Desi A2 Milk', 'Country Guava'],
    rating: 5.0,
    experienceYears: 12,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Recognized for preserving traditional Banganapalli mango groves and Gir cow indigenous dairy breeding.'
  },
  {
    id: 'farmer_003',
    name: 'Venkatesh Rao',
    village: 'Bhimavaram',
    district: 'West Godavari',
    acres: 8.0,
    farmingType: 'NATURAL',
    crops: ['Sona Masoori Rice', 'Black Gram', 'Bengal Gram'],
    rating: 4.8,
    experienceYears: 24,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Delta farmer utilizing SRI (System of Rice Intensification) sustainable water conservation practices.'
  },
  {
    id: 'farmer_004',
    name: 'Anji Reddy',
    village: 'Kadapa Rural',
    district: 'YSR Kadapa',
    acres: 7.5,
    farmingType: 'NATURAL',
    crops: ['Foxtail Millets', 'Ragi', 'Groundnut'],
    rating: 4.7,
    experienceYears: 15,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Specialist in dryland climate-resilient millets and cold-pressed pure groundnut oil.'
  }
];

const FarmersDirectoryPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-agro-100 text-agro-800 mb-2">
          <ShieldCheck className="w-4 h-4 text-agro-600" />
          100% KYC & Land Deed Verified Farmers
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Verified Farmer Directory</h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Get to know the hands cultivating your food. Every farmer is physically audited by platform agronomy specialists before publishing products.
        </p>
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {farmersList.map((farmer) => (
          <div
            key={farmer.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={farmer.avatar}
                  alt={farmer.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-agro-600 shadow-sm shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-slate-900 truncate">{farmer.name}</h3>
                    <span className="p-1 rounded-full bg-agro-100 text-agro-700" title="Admin Verified KYC">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-agro-600 shrink-0" />
                    {farmer.village}, {farmer.district}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className="font-semibold text-agro-800 bg-agro-50 px-2 py-0.5 rounded-md border border-agro-200">
                      {farmer.farmingType}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 font-medium">{farmer.acres} Acres</span>
                    <span className="text-slate-400">•</span>
                    <div className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 mr-0.5" />
                      {farmer.rating}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{farmer.bio}"
              </p>

              {/* Crops Cultivated */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Primary Crops Cultivated:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {farmer.crops.map((crop) => (
                    <span
                      key={crop}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400 font-medium">
                {farmer.experienceYears} Years Farming Experience
              </span>
              <Link
                to={`/products?search=${encodeURIComponent(farmer.name)}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-agro-700 hover:text-agro-800"
              >
                Browse Harvest <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmersDirectoryPage;
