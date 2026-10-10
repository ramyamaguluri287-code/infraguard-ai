import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign,
  Maximize2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line
} from 'recharts';

export default function DegradationForecaster({
  assets,
  selectedAsset,
  onSelectAsset
}) {
  const asset = selectedAsset || assets[0];
  const [months, setMonths] = useState(12);

  const baseCost = asset.estimatedRepairCost;

  const projectionData = [
    {
      month: 'Month 0 (Now)',
      risk: asset.riskScore,
      cost: baseCost,
      crackMm: 3.2
    },
    {
      month: 'Month 6',
      risk: Math.min(99, Math.round(asset.riskScore * 1.08)),
      cost: Math.round(baseCost * 1.45),
      crackMm: 5.8
    },
    {
      month: 'Month 12',
      risk: Math.min(99, Math.round(asset.riskScore * 1.18)),
      cost: Math.round(baseCost * 2.2),
      crackMm: 9.4
    },
    {
      month: 'Month 18',
      risk: Math.min(99, Math.round(asset.riskScore * 1.26)),
      cost: Math.round(baseCost * 3.4),
      crackMm: 15.1
    },
    {
      month: 'Month 24',
      risk: 99,
      cost: Math.round(baseCost * 4.8),
      crackMm: 24.0
    }
  ];

  const currentProjectedCost = Math.round(baseCost * (1 + (months / 12) * 1.35));
  const costDifference = currentProjectedCost - baseCost;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Degradation & Cost-of-Inaction Forecaster
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            Simulate structural deterioration trajectories and compounding cost escalation over 24-month horizon.
          </p>
        </div>

        {/* Asset Selector */}
        <select
          value={asset.id}
          onChange={(e) => {
            const found = assets.find((a) => a.id === e.target.value);
            if (found) onSelectAsset(found);
          }}
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-bold focus:outline-none focus:border-cyan-500"
        >
          {assets.map((a) => (
            <option key={a.id} value={a.id}>
              {a.id} - {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* Horizon Slider */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            Deferred Maintenance Inaction Horizon
          </label>
          <span className="font-mono text-lg font-extrabold text-purple-400 bg-purple-950/40 px-3 py-1 rounded-lg border border-purple-800">
            {months} Months Delay
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="24"
          step="3"
          value={months}
          onChange={(e) => setMonths(parseInt(e.target.value))}
          className="w-full accent-purple-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>0 Months (Immediate)</span>
          <span>6 Months</span>
          <span>12 Months (1 Year)</span>
          <span>18 Months</span>
          <span>24 Months (Emergency Failure)</span>
        </div>
      </div>

      {/* Projection Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Current Immediate Repair Cost
          </span>
          <p className="text-2xl font-extrabold text-white font-mono">
            ${baseCost.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400">Baseline rehabilitation quote</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-900/40 bg-purple-950/20 space-y-1">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
            Compounded Inaction Cost (+{months} mo)
          </span>
          <p className="text-2xl font-extrabold text-purple-400 font-mono">
            ${currentProjectedCost.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400">
            Escalation multiplier ~{((currentProjectedCost / baseCost) || 1).toFixed(2)}x
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-red-900/40 bg-red-950/20 space-y-1">
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
            Capital Loss Incurred by Delay
          </span>
          <p className="text-2xl font-extrabold text-red-400 font-mono">
            +${costDifference.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400">Avoidable municipal expenditure</p>
        </div>
      </div>

      {/* Recharts Degradation Curve */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
          Compounded Deterioration & Capital Escalation Curve
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData}>
              <defs>
                <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9D4EDD" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#9D4EDD" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '12px'
                }}
                formatter={(val, name) => [
                  name === 'cost' ? `$${val.toLocaleString()}` : `${val} mm`,
                  name === 'cost' ? 'Escalated Cost' : 'Crack Width'
                ]}
              />
              <Area
                type="monotone"
                dataKey="cost"
                stroke="#9D4EDD"
                strokeWidth={3}
                fill="url(#costGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
