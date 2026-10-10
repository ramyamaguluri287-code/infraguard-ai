import React, { useState, useRef } from 'react';
import {
  Scan,
  Upload,
  Plus,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Maximize2,
  Crosshair
} from 'lucide-react';

export default function VisionStudio({ selectedAsset, onOpenReport }) {
  const [image, setImage] = useState(
    selectedAsset?.image ||
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80'
  );
  const [assetName, setAssetName] = useState(
    selectedAsset?.name || 'Custom Field Inspection Image'
  );
  const [boxes, setBoxes] = useState(selectedAsset?.boundingBoxes || []);
  const [activeBox, setActiveBox] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setAssetName(file.name.replace(/\.[^/.]+$/, ''));
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setBoxes([
          {
            id: `box-${Date.now()}`,
            x: 24,
            y: 30,
            width: 42,
            height: 35,
            label: 'Extracted Structural Fissure & Concrete Delamination',
            confidence: 94,
            severity: 'Critical',
            color: '#FF4D4D'
          }
        ]);
      }, 1200);
    }
  };

  const handleAddBox = () => {
    const newBox = {
      id: `box-${Date.now()}`,
      x: 35,
      y: 40,
      width: 25,
      height: 25,
      label: 'Manual Structural Defect Region',
      confidence: 88,
      severity: 'High',
      color: '#FFB800'
    };
    setBoxes([...boxes, newBox]);
  };

  const riskScore = selectedAsset?.riskScore || 85;
  const defectArea = selectedAsset?.affectedAreaSqm || '18.4';
  const recommendation =
    selectedAsset?.recommendedAction ||
    'Execute structural epoxy injection and marine FRP jacket installation.';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              AI Computer Vision Inspection Studio
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            Real-time visual defect detection canvas. Upload field imagery or inspect existing infrastructure assets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Upload Image</span>
          </button>
          <button
            onClick={handleAddBox}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Region</span>
          </button>
          {selectedAsset && (
            <button
              onClick={() => onOpenReport(selectedAsset)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Export Work Order</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas & Bounding Boxes */}
        <div className="lg:col-span-2 glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-mono text-cyan-400">{assetName}</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                CV Model v4.2 Active
              </span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center border border-slate-800">
            <img
              src={image}
              alt="Inspection Canvas"
              className="w-full h-full object-cover select-none"
            />

            {/* Scanning Laser Animation */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[1px] flex flex-col items-center justify-center gap-3">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                <span className="text-xs font-mono font-bold text-cyan-300 bg-slate-950/80 px-3 py-1 rounded-full border border-cyan-500/40">
                  Extracting Structural Fissures & Pixel Contrast Anomalies...
                </span>
              </div>
            )}

            {/* Bounding Boxes */}
            {!isAnalyzing &&
              boxes.map((box) => {
                const isSelected = activeBox === box.id;
                return (
                  <div
                    key={box.id}
                    onClick={() => setActiveBox(isSelected ? null : box.id)}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.width}%`,
                      height: `${box.height}%`,
                      borderColor: box.color
                    }}
                    className={`absolute border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 shadow-2xl bg-cyan-500/20'
                        : 'bg-black/20 hover:bg-black/30'
                    }`}
                  >
                    <div
                      style={{ backgroundColor: box.color }}
                      className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-950 whitespace-nowrap shadow-md"
                    >
                      {box.label} ({box.confidence}%)
                    </div>
                  </div>
                );
              })}
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Click on any defect bounding box to isolate diagnostics. Bounding coordinates normalize against high-res field captures.
          </p>
        </div>

        {/* Diagnostic Panel */}
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-cyan-400" />
              AI Diagnostic Matrix
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Calculated Risk Index
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl font-mono font-extrabold text-red-400">
                    {riskScore}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/ 100</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-red-500"
                    style={{ width: `${riskScore}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Defect Area (Est.)
                </span>
                <p className="text-2xl font-mono font-extrabold text-cyan-400 mt-1">
                  {defectArea} <span className="text-sm text-slate-400 font-normal">m²</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  AI Engineering Recommendation
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Detected Regions */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Detected Defect Regions ({boxes.length})
            </h3>
            <div className="space-y-2">
              {boxes.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setActiveBox(b.id)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    activeBox === b.id
                      ? 'bg-slate-800 border-cyan-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-200">
                    <span>{b.label}</span>
                    <span className="font-mono text-cyan-400">{b.confidence}%</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Severity: {b.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
