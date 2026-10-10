import React, { useState } from 'react';
import {
  Layers,
  Activity,
  Cpu,
  MessageSquare,
  Send,
  ShieldAlert,
  Gauge,
  Droplets,
  Zap
} from 'lucide-react';
import { calculateCompositeRisk, submitComplaint } from '../utils/prioritizer';

export default function MultimodalFusion({
  assets,
  selectedAsset,
  onSelectAsset
}) {
  const asset = selectedAsset || assets[0];
  const [complaintText, setComplaintText] = useState('');
  const [complaints, setComplaints] = useState(asset.citizenComplaints || []);

  const compositeScore = calculateCompositeRisk(asset);

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    if (!complaintText.trim()) return;

    const newComplaint = {
      id: `c-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      text: complaintText,
      sentiment: 'High Concern (User Logged)',
      source: 'Field Technician Mobile App'
    };

    setComplaints([newComplaint, ...complaints]);
    setComplaintText('');
    await submitComplaint(asset.id, newComplaint.text, newComplaint.source);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Multimodal Data Stream Fusion
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            Synthesizes visual defect computer vision, IoT strain/moisture telemetry, and 311 citizen logs into a unified composite risk index.
          </p>
        </div>

        <select
          value={asset.id}
          onChange={(e) => {
            const found = assets.find((a) => a.id === e.target.value);
            if (found) {
              onSelectAsset(found);
              setComplaints(found.citizenComplaints || []);
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
      </div>

      {/* Composite Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Overall Composite Score */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            Fused Composite Risk
          </h3>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              MULTIMODAL RISK SCORE
            </span>
            <div className="text-5xl font-mono font-extrabold text-cyan-400">
              {compositeScore}
              <span className="text-base text-slate-500 font-normal"> / 100</span>
            </div>
            <p className="text-xs text-slate-400">
              Composite confidence level 94.8%
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Visual Defect Severity (35%)</span>
              <span className="font-mono font-bold text-slate-200">{asset.severity}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">IoT Sensor Anomaly (25%)</span>
              <span className="font-mono font-bold text-emerald-400">
                {asset.sensorData?.structuralIntegrityPct || 65}% Integrity
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Corridor Traffic Impact (20%)</span>
              <span className="font-mono font-bold text-amber-400">
                {asset.trafficImpactScore || 80}/100
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Historical Recurrence (20%)</span>
              <span className="font-mono font-bold text-purple-400">
                {asset.recurrenceFactor || 50}/100
              </span>
            </div>
          </div>
        </div>

        {/* Middle: IoT Telemetry */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            Live IoT Sensor Telemetry
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block flex items-center gap-1 font-bold">
                <Gauge className="w-3 h-3 text-cyan-400" /> STRAIN GAUGE
              </span>
              <span className="font-mono text-xl font-bold text-white">
                {asset.sensorData?.strainGaugeMicrostrain || 450} <span className="text-xs text-slate-400">με</span>
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block flex items-center gap-1 font-bold">
                <Droplets className="w-3 h-3 text-blue-400" /> MOISTURE
              </span>
              <span className="font-mono text-xl font-bold text-white">
                {asset.sensorData?.moisturePercentage || 75}%
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block flex items-center gap-1 font-bold">
                <Zap className="w-3 h-3 text-amber-400" /> VIBRATION
              </span>
              <span className="font-mono text-xl font-bold text-white">
                {asset.sensorData?.vibrationHz || 14.2} <span className="text-xs text-slate-400">Hz</span>
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block flex items-center gap-1 font-bold">
                <Activity className="w-3 h-3 text-emerald-400" /> INTEGRITY
              </span>
              <span className="font-mono text-xl font-bold text-emerald-400">
                {asset.sensorData?.structuralIntegrityPct || 65}%
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            Telemetry sync timestamp:{' '}
            <span className="font-mono text-slate-200">
              {asset.sensorData?.lastTelemetrySync || '2026-08-21 12:15:00'}
            </span>
          </div>
        </div>

        {/* Right: Citizen Complaints & Field Logs */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            Citizen Logs & Field Feedback
          </h3>

          <form onSubmit={handleSubmitComplaint} className="flex gap-2">
            <input
              type="text"
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              placeholder="Log technician observation or 311 report..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{c.date}</span>
                  <span className="font-bold text-amber-400">{c.sentiment}</span>
                </div>
                <p className="text-slate-200">{c.text}</p>
                <span className="text-[10px] text-slate-500 block font-mono">
                  Source: {c.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
