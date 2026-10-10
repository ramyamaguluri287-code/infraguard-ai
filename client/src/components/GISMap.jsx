import React, { useState, useEffect } from 'react';
import { Map, Layers, MapPin, Scan, FileText, Filter, Eye } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TILE_LAYERS = {
  dark: {
    name: 'Cyber Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; CartoDB &copy; OpenStreetMap'
  },
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri &copy; OpenStreetMap'
  },
  topo: {
    name: 'Topo Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap'
  }
};

const CATEGORIES = [
  'All',
  'Bridges',
  'Roads & Highways',
  'Public Buildings',
  'Stormwater & Drainage'
];

export default function GISMap({
  assets,
  onSelectAsset,
  onOpenReport,
  setActiveTab
}) {
  const [activeLayer, setActiveLayer] = useState('dark');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mapSearch, setMapSearch] = useState('');
  const [selectedPin, setSelectedPin] = useState(null);

  const filteredAssets = assets.filter((a) => {
    const matchesCat =
      selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch =
      a.name.toLowerCase().includes(mapSearch.toLowerCase()) ||
      a.location.address.toLowerCase().includes(mapSearch.toLowerCase()) ||
      a.id.toLowerCase().includes(mapSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  useEffect(() => {
    // Check if map container already initialized
    const container = L.DomUtil.get('leaflet-gis-map');
    if (container != null) {
      container._leaflet_id = null;
    }

    const map = L.map('leaflet-gis-map', {
      center: [37.78, -122.41],
      zoom: 11,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const layerConfig = TILE_LAYERS[activeLayer];
    const tileLayer = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: 18
    }).addTo(map);

    const markers = [];

    filteredAssets.forEach((asset) => {
      const isCrit = asset.severity === 'Critical';
      const color = isCrit ? '#FF4D4D' : '#FFB800';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background: #0B0F17;
            border: 2px solid ${color};
            color: ${color};
            box-shadow: 0 0 14px ${color}80;
            padding: 4px 8px;
            border-radius: 8px;
            font-size: 10px;
            font-family: monospace;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 4px;
            white-space: nowrap;
          ">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: ${color}; display: inline-block;"></span>
            ${asset.id} (${asset.riskScore})
          </div>
        `,
        iconSize: [80, 26],
        iconAnchor: [40, 13]
      });

      const marker = L.marker([asset.location.lat, asset.location.lng], {
        icon: customIcon
      }).addTo(map);

      marker.on('click', () => {
        setSelectedPin(asset);
      });

      markers.push(marker);
    });

    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.3));
    }

    return () => {
      map.remove();
    };
  }, [activeLayer, selectedCategory, mapSearch, filteredAssets.length]);

  return (
    <div className="space-y-6">
      {/* Control Header */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Leaflet Spatial Intelligence GIS
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              LEAFLET v1.9 ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Geotagged infrastructure markers, satellite imagery, and municipal risk corridors.
          </p>
        </div>

        {/* Tile Selector */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {Object.entries(TILE_LAYERS).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setActiveLayer(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeLayer === key
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {config.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={mapSearch}
          onChange={(e) => setMapSearch(e.target.value)}
          placeholder="Filter map by name or street..."
          className="px-3 py-1 bg-slate-900 border border-slate-700/60 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Map + Drawer */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-[580px]">
        <div id="leaflet-gis-map" className="w-full h-full z-0" />

        {/* Selected Pin Drawer */}
        {selectedPin && (
          <div className="absolute top-4 right-4 z-10 w-80 glass-panel p-4 rounded-xl border border-cyan-500/40 shadow-2xl animate-scaleUp space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-mono font-bold text-xs text-cyan-400">
                {selectedPin.id}
              </span>
              <button
                onClick={() => setSelectedPin(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-white">{selectedPin.name}</h4>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>{selectedPin.location.address}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 block">RISK SCORE</span>
                <span className="font-mono font-bold text-red-400">
                  {selectedPin.riskScore} / 100
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">EST. REPAIR</span>
                <span className="font-mono font-bold text-emerald-400">
                  ${selectedPin.estimatedRepairCost.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  onSelectAsset(selectedPin);
                  setActiveTab('vision');
                }}
                className="flex-1 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 text-xs font-bold transition-all flex items-center justify-center gap-1"
              >
                <Scan className="w-3 h-3" />
                <span>Vision Studio</span>
              </button>
              <button
                onClick={() => onOpenReport(selectedPin)}
                className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1"
              >
                <FileText className="w-3 h-3 text-cyan-400" />
                <span>Report</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
