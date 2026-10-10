import React from 'react';
import {
  X,
  Printer,
  FileCheck,
  AlertTriangle,
  Wrench,
  Truck,
  Users,
  ShieldCheck
} from 'lucide-react';

export default function WorkOrderModal({ asset, onClose }) {
  if (!asset) return null;

  const isCrit = asset.severity === 'Critical';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel p-6 lg:p-8 space-y-6 border border-cyan-500/40 shadow-2xl animate-scaleUp my-8 bg-[#0F172A]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono font-bold text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                OFFICIAL WORK ORDER #{asset.id}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded font-mono font-bold text-[10px] border ${
                  isCrit
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                }`}
              >
                {asset.severity} PRIORITY
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white">{asset.name}</h2>
            <p className="text-xs text-slate-400">{asset.location.address}</p>
          </div>

          <div className="text-right sm:pr-8">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">
              ESTIMATED COST
            </span>
            <span className="text-2xl font-mono font-extrabold text-emerald-400">
              ${asset.estimatedRepairCost.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Diagnostic Sections */}
        <div className="space-y-4 text-xs">
          {/* 1. Visual Defect Diagnostics */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              1. Visual Defect Diagnostics & Computer Vision Detection
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {asset.inspectionNotes}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {asset.defectTypes.map((d, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* 2. Engineering Repair Plan */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <Wrench className="w-4 h-4 text-amber-400" />
              2. Recommended Engineering Work Order & Repair Plan
            </h4>
            <p className="text-slate-200 leading-relaxed font-medium">
              {asset.recommendedAction}
            </p>
          </div>

          {/* 3. Logistics & Crew */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <Truck className="w-4 h-4 text-purple-400" />
                Required Equipment & Rigging
              </h4>
              <ul className="space-y-1 text-slate-400 list-disc list-inside">
                {(asset.requiredEquipment || ['Standard Rigging Kit']).map(
                  (eq, i) => (
                    <li key={i}>{eq}</li>
                  )
                )}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <Users className="w-4 h-4 text-emerald-400" />
                Assigned Specialty Crew
              </h4>
              <p className="text-slate-200 font-semibold mt-1">
                {asset.assignedCrew || 'Municipal Infrastructure Response Unit'}
              </p>
              <p className="text-[11px] text-slate-500">
                SLA Mobilization Window: Within {asset.urgencyDays} Days
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <span className="text-[11px] font-mono text-slate-500">
            Authorized by Smart City Civil Works Command
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Work Order</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
