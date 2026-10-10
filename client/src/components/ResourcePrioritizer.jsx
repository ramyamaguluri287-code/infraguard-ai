import React, { useState } from 'react';
import {
  SlidersHorizontal,
  DollarSign,
  Users,
  ShieldCheck,
  AlertTriangle,
  FileText,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import {
  optimizeResourceAllocation,
  calculateCostOfInactionAvoided
} from '../utils/prioritizer';

export default function ResourcePrioritizer({ assets, onOpenReport }) {
  const [budget, setBudget] = useState(120000);
  const [crewLimit, setCrewLimit] = useState(4);

  const optimization = optimizeResourceAllocation(assets, budget, crewLimit);
  const costAvoided = calculateCostOfInactionAvoided(optimization.scheduledAssets);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Resource-Constrained Maintenance Prioritizer
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              KNAPSACK OPTIMIZATION
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Dynamically solves optimal work order dispatch within strict fiscal capital boundaries and crew availability limits.
          </p>
        </div>
      </div>

      {/* Constraints Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Budget Slider */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Total Maintenance Budget
            </label>
            <span className="font-mono text-lg font-extrabold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-800">
              ${budget.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="30000"
            max="300000"
            step="10000"
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>$30k</span>
            <span>$150k</span>
            <span>$300k</span>
          </div>
        </div>

        {/* Crew Limit Slider */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              Available Dispatch Crews
            </label>
            <span className="font-mono text-lg font-extrabold text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-800">
              {crewLimit} Crews
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={crewLimit}
            onChange={(e) => setCrewLimit(parseInt(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>1 Crew</span>
            <span>4 Crews</span>
            <span>8 Crews</span>
          </div>
        </div>
      </div>

      {/* KPI Optimization Output */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Network Risk Reduction
          </span>
          <p className="text-3xl font-extrabold text-cyan-400 font-mono">
            {optimization.networkRiskReductionPct}%
          </p>
          <p className="text-[11px] text-slate-400">Total hazard score abated</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Allocated Expenditure
          </span>
          <p className="text-3xl font-extrabold text-white font-mono">
            ${optimization.totalSpent.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400">
            Remaining: ${optimization.remainingBudget.toLocaleString()}
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Approved Work Orders
          </span>
          <p className="text-3xl font-extrabold text-emerald-400 font-mono">
            {optimization.scheduledAssets.length} <span className="text-sm text-slate-400 font-normal">/ {assets.length}</span>
          </p>
          <p className="text-[11px] text-slate-400">Immediate mobilization</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-900/40 bg-purple-950/20 space-y-1">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
            Cost of Inaction Avoided
          </span>
          <p className="text-3xl font-extrabold text-purple-400 font-mono">
            ${costAvoided.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400">Compounded 3.8x savings</p>
        </div>
      </div>

      {/* Scheduled vs Deferred Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled */}
        <div className="glass-panel p-6 rounded-2xl border border-emerald-900/40 bg-emerald-950/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Approved Dispatch Schedule ({optimization.scheduledAssets.length})
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              OPTIMIZED
            </span>
          </div>

          <div className="space-y-3">
            {optimization.scheduledAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-500/20 text-emerald-400">
                      PRIORITY #{asset.dispatchPriority}
                    </span>
                    <span className="font-extrabold text-white">{asset.name}</span>
                  </div>
                  <p className="text-slate-400 mt-1">
                    Risk: <span className="text-red-400 font-bold">{asset.riskScore}</span> •
                    Cost: <span className="font-mono text-emerald-400 font-bold">${asset.estimatedRepairCost.toLocaleString()}</span> •
                    Efficiency: <span className="font-mono text-cyan-400">{asset.efficiencyScore}</span>
                  </p>
                </div>

                <button
                  onClick={() => onOpenReport(asset)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Deferred */}
        <div className="glass-panel p-6 rounded-2xl border border-amber-900/40 bg-amber-950/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Deferred Under Constraints ({optimization.deferredAssets.length})
            </h3>
            <span className="text-xs font-mono text-amber-400 font-bold">
              BUDGET LIMIT
            </span>
          </div>

          <div className="space-y-3">
            {optimization.deferredAssets.length === 0 ? (
              <p className="text-xs text-slate-500 p-4 text-center">
                All network assets accommodated within current budget and crew limit!
              </p>
            ) : (
              optimization.deferredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-extrabold text-white">{asset.name}</span>
                    <p className="text-slate-400 mt-1">
                      Required Cost: <span className="font-mono text-amber-400 font-bold">${asset.estimatedRepairCost.toLocaleString()}</span> •
                      Shortfall: <span className="font-mono text-red-400">${asset.shortfall.toLocaleString()}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                    DEFERRED
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
