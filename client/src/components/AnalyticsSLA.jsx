import React from 'react';
import {
  BarChart3,
  Clock,
  PieChart as PieIcon,
  ShieldCheck,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#00F2FE', '#3B82F6', '#FFB800', '#9D4EDD'];

export default function AnalyticsSLA({ assets }) {
  // Category Breakdown
  const catCounts = {};
  assets.forEach((a) => {
    catCounts[a.category] = (catCounts[a.category] || 0) + 1;
  });
  const categoryData = Object.keys(catCounts).map((k) => ({
    name: k,
    count: catCounts[k]
  }));

  // Risk vs Cost
  const riskCostData = assets.map((a) => ({
    name: a.id,
    risk: a.riskScore,
    cost: Math.round(a.estimatedRepairCost / 1000)
  }));

  const urgentCount = assets.filter((a) => a.urgencyDays <= 2).length;
  const slaCompliancePct = Math.round(
    ((assets.length - urgentCount) / (assets.length || 1)) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Inspection & Maintenance Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            Executive oversight dashboard tracking hazard SLA compliance, category risk distribution, and preventive ROI.
          </p>
        </div>
      </div>

      {/* SLA Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Overall SLA Compliance Rate
          </span>
          <p className="text-3xl font-mono font-extrabold text-emerald-400">
            {slaCompliancePct}%
          </p>
          <p className="text-[11px] text-slate-400">Target response window met</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Critical 48h Resolution Queue
          </span>
          <p className="text-3xl font-mono font-extrabold text-red-400">
            {urgentCount} Assets
          </p>
          <p className="text-[11px] text-slate-400">Active emergency work orders</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Infrastructure Asset Classes
          </span>
          <p className="text-3xl font-mono font-extrabold text-cyan-400">
            {categoryData.length}
          </p>
          <p className="text-[11px] text-slate-400">Bridges, Highways, Public, Drainage</p>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Score vs Repair Cost Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Asset Risk Score vs Estimated Repair Cost ($k)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px'
                  }}
                  formatter={(val, name) => [
                    name === 'cost' ? `$${val}k` : `${val} / 100`,
                    name === 'cost' ? 'Repair Cost' : 'Risk Score'
                  ]}
                />
                <Bar dataKey="risk" fill="#FF4D4D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" fill="#00F2FE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Portfolio Distribution by Asset Class
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            {categoryData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-slate-300 font-medium">{entry.name}</span>
                <span className="font-mono text-slate-500">({entry.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
