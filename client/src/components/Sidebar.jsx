import React from 'react';
import {
  LayoutDashboard,
  Scan,
  Map,
  TrendingUp,
  Plane,
  Layers,
  Clock,
  SlidersHorizontal,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

const MODULES = [
  { id: 'overview', label: 'Command Overview', icon: LayoutDashboard, badge: null },
  { id: 'vision', label: 'AI Vision Studio', icon: Scan, badge: 'AI CV' },
  { id: 'gis', label: 'Leaflet GIS Map', icon: Map, badge: 'GIS' },
  { id: 'forecaster', label: 'Predictive Degradation', icon: TrendingUp, badge: 'ML AI' },
  { id: 'drone', label: 'Drone Aerial Fleet', icon: Plane, badge: 'UAV' },
  { id: 'multimodal', label: 'Multimodal Fusion', icon: Layers, badge: null },
  { id: 'history', label: 'Asset History & MTBF', icon: Clock, badge: null },
  { id: 'resource', label: 'Resource Prioritizer', icon: SlidersHorizontal, badge: 'Opt' },
  { id: 'analytics', label: 'Analytics & SLA', icon: BarChart3, badge: null }
];

export default function Sidebar({ activeTab, setActiveTab, criticalCount }) {
  return (
    <aside className="w-64 bg-[#0B0F17] border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Main System Modules
          </p>
          <nav className="space-y-1">
            {MODULES.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium text-xs transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/15 text-cyan-400 border border-cyan-500/40 shadow-md shadow-cyan-500/10 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {criticalCount > 0 && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-xs">
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>Critical Hazards</span>
            </div>
            <p className="text-[11px] text-slate-300">
              <span className="font-bold text-red-400">{criticalCount} critical assets</span> require urgent maintenance dispatch within 48h.
            </p>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800/60 text-center">
        <p className="text-[10px] font-mono text-slate-500">
          InfraGuard MERN Engine v4.5
        </p>
        <p className="text-[9px] text-slate-600 mt-0.5">
          Smart City Infrastructure Intelligence
        </p>
      </div>
    </aside>
  );
}
