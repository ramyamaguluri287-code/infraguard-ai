import React, { useState } from 'react';
import {
  Clock,
  Plus,
  History,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Building2
} from 'lucide-react';
import { submitMaintenanceRecord } from '../utils/prioritizer';

export default function AssetHistory({
  assets,
  selectedAsset,
  onSelectAsset
}) {
  const asset = selectedAsset || assets[0];
  const [history, setHistory] = useState(asset.maintenanceHistory || []);
  const [showAddForm, setShowAddForm] = useState(false);

  const [repairType, setRepairType] = useState('');
  const [cost, setCost] = useState('');
  const [contractor, setContractor] = useState('');
  const [durability, setDurability] = useState('Good');

  const handleAddRecord = async (e) => {
    e.preventDefault();
    if (!repairType || !cost) return;

    const newRecord = {
      id: `m-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      repairType,
      cost: parseFloat(cost),
      contractor: contractor || 'Municipal Maintenance Division',
      durabilityRating: durability,
      status: 'Closed',
      notes: 'Newly completed repair entry.'
    };

    setHistory([newRecord, ...history]);
    setShowAddForm(false);
    setRepairType('');
    setCost('');
    setContractor('');

    await submitMaintenanceRecord(asset.id, newRecord);
  };

  const totalHistoricalSpend = history.reduce((sum, h) => sum + (h.cost || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Asset Lifecycle & Maintenance History
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            Audit trail of historical rehabilitation projects, contractor accountability ratings, and MTBF recurrence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={asset.id}
            onChange={(e) => {
              const found = assets.find((a) => a.id === e.target.value);
              if (found) {
                onSelectAsset(found);
                setHistory(found.maintenanceHistory || []);
              }
            }}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-bold focus:outline-none focus:border-cyan-500"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} - {a.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Log Repair</span>
          </button>
        </div>
      </div>

      {/* Historical Spend Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase">
            Historical Repairs Logged
          </span>
          <p className="text-2xl font-mono font-extrabold text-white">
            {history.length}
          </p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase">
            Cumulative Maintenance Spend
          </span>
          <p className="text-2xl font-mono font-extrabold text-emerald-400">
            ${totalHistoricalSpend.toLocaleString()}
          </p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase">
            Current Maintenance Status
          </span>
          <p className="text-sm font-bold text-amber-400 mt-1">
            {asset.status || 'Pending Maintenance Dispatch'}
          </p>
        </div>
      </div>

      {/* Add Record Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddRecord}
          className="glass-panel p-5 rounded-2xl border border-cyan-500/40 space-y-4 animate-scaleUp"
        >
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
            Record Completed Infrastructure Maintenance
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Repair Scope / Type</label>
              <input
                type="text"
                placeholder="e.g. Epoxy Crack Injection"
                value={repairType}
                onChange={(e) => setRepairType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-slate-200"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Cost ($USD)</label>
              <input
                type="number"
                placeholder="e.g. 35000"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-slate-200"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Contractor Name</label>
              <input
                type="text"
                placeholder="e.g. Metro Civil Engineering"
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-slate-200"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Durability Rating</label>
              <select
                value={durability}
                onChange={(e) => setDurability(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-slate-200"
              >
                <option value="Satisfactory">Satisfactory</option>
                <option value="Good">Good</option>
                <option value="Failed (Degraded in 14 mos)">Failed Prematurely</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400"
            >
              Save Record
            </button>
          </div>
        </form>
      )}

      {/* History Log Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
            Rehabilitation Log History
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Asset ID: {asset.id}
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {history.map((record) => (
            <div
              key={record.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-slate-900/40 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-500">{record.date}</span>
                  <span className="font-bold text-white text-sm">
                    {record.repairType}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      record.durabilityRating.includes('Failed')
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {record.durabilityRating}
                  </span>
                </div>
                <p className="text-slate-400 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{record.contractor}</span>
                  <span>•</span>
                  <span>{record.notes}</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-emerald-400 text-sm block">
                  ${record.cost.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Status: {record.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
