import React from 'react';
import { X, QrCode, ShieldCheck, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const TraceabilityModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const batchNo = (product.traceability && product.traceability.harvestBatchNumber) || 'BATCH-AP-2026';
  const district = (product.traceability && product.traceability.farmDistrict) || (product.farmer && product.farmer.district) || 'Guntur';
  const soilType = (product.traceability && product.traceability.soilType) || 'Red Loamy Fertile Delta Soil';

  // Generate QR representation link
  const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    `RythuConnect Farm-to-Fork Traceability\nCrop: ${product.name}\nBatch: ${batchNo}\nOrigin: ${district}\nPractice: ${product.farmingPractice || 'ORGANIC'}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-agro-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10">
              <QrCode className="w-5 h-5 text-agro-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Farm-to-Fork Traceability</h3>
              <p className="text-xs text-agro-200">100% Verified Direct Agricultural Origin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Produce Summary */}
          <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <img
              src={(product.images && product.images[0]) || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80'}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <span className="text-xs font-bold text-agro-700 uppercase tracking-wider">{product.category || 'Produce'}</span>
              <h4 className="font-bold text-slate-900">{product.name}</h4>
              <p className="text-xs text-slate-500">
                Farmer: <span className="font-semibold text-slate-700">{(product.farmer && product.farmer.name) || 'Ramesh Naidu'}</span>
              </p>
            </div>
          </div>

          {/* QR Code & Batch Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="flex flex-col items-center justify-center p-4 bg-agro-50/50 rounded-xl border border-agro-100">
              <img
                src={qrDataUrl}
                alt="Product Batch QR Code"
                className="w-36 h-36 rounded-lg border border-white shadow-sm"
              />
              <span className="text-[10px] text-slate-500 font-medium mt-2">Scan with camera to verify</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Batch Number</span>
                <span className="font-mono font-bold text-slate-800 text-sm">{batchNo}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Farm District & Village</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-agro-600" />
                  {district}, Andhra Pradesh
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Soil & Cultivation</span>
                <span className="font-semibold text-slate-800">{soilType}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Harvest Timing</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-agro-600" />
                  Direct Fresh Harvest (Day 0)
                </span>
              </div>
            </div>
          </div>

          {/* Verification Guarantee */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">RythuConnect Quality Assurance</p>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                This crop batch was grown under strict organic or natural bio-pesticide protocols without chemical wax coating or artificial accelerators.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close Traceability
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraceabilityModal;
