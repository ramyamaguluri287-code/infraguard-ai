import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Activity,
  DollarSign,
  Scan,
  SlidersHorizontal,
  FileText,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function CommandOverview({
  assets,
  onSelectAsset,
  onOpenReport,
  setActiveTab
}) {
  const criticalAssets = assets.filter((a) => a.severity === 'Critical');
  const highAssets = assets.filter((a) => a.severity === 'High');
  const avgRisk = Math.round(
    assets.reduce((sum, a) => sum + a.riskScore, 0) / (assets.length || 1)
  );
  const totalBacklogCost = assets.reduce(
    (sum, a) => sum + a.estimatedRepairCost,
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-[#121824] via-[#172033] to-[#0F172A] border border-slate-800 shadow-xl">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Real-Time Multimodal AI Defect Synthesis
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Infrastructure Inspection & Maintenance Command Center
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Aggregating computer vision defect detection, field logs, citizen complaints, and sensor telemetry into a prioritized engineering maintenance plan.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('vision')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <Scan className="w-4 h-4 stroke-[2.5]" />
              <span>Launch AI Vision Studio</span>
            </button>
            <button
              onClick={() => setActiveTab('resource')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Optimize Budget</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Assets Monitored</span>
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{assets.length}</p>
          <p className="text-xs text-slate-400">Across Bridges, Roads, Buildings & Drainage</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-red-900/40 bg-red-950/10 space-y-2">
          <div className="flex items-center justify-between text-red-400">
            <span className="text-xs font-bold uppercase tracking-wider">Critical Hazards</span>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-3xl font-extrabold text-red-400 font-mono">{criticalAssets.length}</p>
          <p className="text-xs text-slate-400">SLA Resolution Window &lt; 48 Hours</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Network Risk Index</span>
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-400 font-mono">{avgRisk} <span className="text-sm text-slate-400 font-normal">/ 100</span></p>
          <p className="text-xs text-slate-400">Weighted by structural & traffic impact</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Repair Backlog</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 font-mono">${(totalBacklogCost / 1000).toFixed(0)}k</p>
          <p className="text-xs text-slate-400">Estimated capital rehabilitation</p>
        </div>
      </div>

      {/* Active Infrastructure Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white tracking-tight">Active Infrastructure Risk Cards</h2>
            <p className="text-xs text-slate-400">Click any card to inspect visual bounding boxes, complaints, and generate report.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {assets.map((asset) => {
            const isCrit = asset.severity === 'Critical';
            return (
              <div
                key={asset.id}
                className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={asset.image}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-black/40" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#0B0F17]/90 text-cyan-400 border border-slate-700">
                        {asset.id}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 text-slate-300">
                        {asset.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                          isCrit
                            ? 'bg-red-500/20 text-red-400 border-red-500/40'
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        }`}
                      >
                        {asset.severity} Risk ({asset.riskScore})
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-base font-extrabold text-white truncate drop-shadow-md">
                        {asset.name}
                      </h3>
                      <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{asset.location.address}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {asset.defectTypes.map((d, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800/80">
                      <div>
                        <span className="text-slate-500 block">ESTIMATED REPAIR</span>
                        <span className="font-mono font-bold text-slate-200">
                          ${asset.estimatedRepairCost.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">SLA DISPATCH</span>
                        <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Within {asset.urgencyDays} Days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex gap-2">
                  <button
                    onClick={() => onSelectAsset(asset)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all"
                  >
                    <Scan className="w-3.5 h-3.5" />
                    <span>Vision Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenReport(asset)}
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-all flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Report PDF</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
