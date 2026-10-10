import React, { useState } from 'react';
import {
  Plane,
  Radio,
  Battery,
  Wind,
  Compass,
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';

const FLEET = [
  {
    id: 'drone-1',
    name: 'SkyScout-Alpha (LiDAR UAV)',
    status: 'In Flight',
    battery: 84,
    altitude: 45,
    wind: '12 km/h',
    target: 'Golden Bay Suspension Bridge Pier 4'
  },
  {
    id: 'drone-2',
    name: 'AeroScan-Beta (Thermal Imaging)',
    status: 'Standby',
    battery: 98,
    altitude: 0,
    wind: '8 km/h',
    target: 'Interstate-95 Highway Corridor'
  },
  {
    id: 'drone-3',
    name: 'HydroDrone-Sub (Sonar Crawler)',
    status: 'In Flight',
    battery: 62,
    altitude: -12,
    wind: '0 km/h',
    target: 'Stormwater Outfall Tunnel #3'
  }
];

export default function DroneFleet({ assets }) {
  const [activeDroneId, setActiveDroneId] = useState('drone-1');
  const [feedLogs, setFeedLogs] = useState([
    {
      id: 'f1',
      time: '12:42:10',
      asset: 'Golden Bay Bridge Pier 4',
      defect: 'Rebar Corrosion',
      confidence: 96
    },
    {
      id: 'f2',
      time: '12:38:05',
      asset: 'I-95 Mile Marker 42',
      defect: 'Pothole Cavity',
      confidence: 92
    }
  ]);

  const activeDrone = FLEET.find((d) => d.id === activeDroneId) || FLEET[0];

  const handleSimulateDetection = () => {
    const newLog = {
      id: `f-${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      asset: activeDrone.target,
      defect: 'Sub-surface Micro-Fracture Acoustic Anomaly',
      confidence: 91
    };
    setFeedLogs([newLog, ...feedLogs]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Autonomous Drone & Robotic Inspection Fleet
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              3 UNITS ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Real-time telemetry, automated structural sweeps, LiDAR point-cloud captures, and sonar crawlers.
          </p>
        </div>

        <button
          onClick={handleSimulateDetection}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 text-xs font-bold transition-all"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Simulate Telemetry Ping</span>
        </button>
      </div>

      {/* Fleet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FLEET.map((drone) => {
          const isSelected = activeDroneId === drone.id;
          const isInFlight = drone.status === 'In Flight';
          return (
            <div
              key={drone.id}
              onClick={() => setActiveDroneId(drone.id)}
              className={`glass-panel p-5 rounded-2xl border cursor-pointer transition-all space-y-4 ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-950/20 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-cyan-400">
                  {drone.id.toUpperCase()}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isInFlight
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 animate-pulse'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {drone.status}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-white">{drone.name}</h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  Target: {drone.target}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-800">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block flex items-center justify-center gap-1">
                    <Battery className="w-3 h-3" /> BAT
                  </span>
                  <span className="font-mono font-bold text-slate-200">
                    {drone.battery}%
                  </span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block flex items-center justify-center gap-1">
                    <Compass className="w-3 h-3" /> ALT
                  </span>
                  <span className="font-mono font-bold text-slate-200">
                    {drone.altitude}m
                  </span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block flex items-center justify-center gap-1">
                    <Wind className="w-3 h-3" /> WIND
                  </span>
                  <span className="font-mono font-bold text-slate-200">
                    {drone.wind}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Stream Logs */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            Live Robotic Telemetry Event Stream
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {feedLogs.length} events logged
          </span>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {feedLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-500">{log.time}</span>
                <span className="font-bold text-white">{log.asset}</span>
                <span className="text-slate-400">→</span>
                <span className="text-amber-400 font-semibold">{log.defect}</span>
              </div>
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {log.confidence}% Conf
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
