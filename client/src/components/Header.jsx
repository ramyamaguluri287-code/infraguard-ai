import React from 'react';
import { ShieldCheck, Search, Plus, Activity, Bell } from 'lucide-react';

export default function Header({ searchTerm, setSearchTerm, onOpenUploadModal }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0B0F17] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                INFRAGUARD
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                AI COMMAND
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Predictive Infrastructure & Defect Intelligence
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assets (e.g. Pier 4, I-95, Hospital, Tunnel)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700/60 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold text-xs shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">New AI Inspection</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px]">GIS & CV ONLINE</span>
          </div>

          <div className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
