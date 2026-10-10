import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CommandOverview from './components/CommandOverview';
import VisionStudio from './components/VisionStudio';
import GISMap from './components/GISMap';
import DegradationForecaster from './components/DegradationForecaster';
import DroneFleet from './components/DroneFleet';
import MultimodalFusion from './components/MultimodalFusion';
import AssetHistory from './components/AssetHistory';
import ResourcePrioritizer from './components/ResourcePrioritizer';
import AnalyticsSLA from './components/AnalyticsSLA';
import WorkOrderModal from './components/WorkOrderModal';
import { mockAssets } from './data/mockAssets';
import { fetchAssets } from './utils/prioritizer';

export default function App() {
  const [assets, setAssets] = useState(mockAssets);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAsset, setSelectedAsset] = useState(mockAssets[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportAsset, setReportAsset] = useState(null);

  useEffect(() => {
    async function loadData() {
      const liveData = await fetchAssets(mockAssets);
      if (liveData && liveData.length > 0) {
        setAssets(liveData);
        setSelectedAsset(liveData[0]);
      }
    }
    loadData();
  }, []);

  const filteredAssets = assets.filter((asset) => {
    const q = searchTerm.toLowerCase();
    return (
      asset.name.toLowerCase().includes(q) ||
      asset.category.toLowerCase().includes(q) ||
      asset.location.address.toLowerCase().includes(q) ||
      asset.id.toLowerCase().includes(q)
    );
  });

  const criticalCount = assets.filter((a) => a.severity === 'Critical').length;

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenUploadModal={() => setActiveTab('vision')}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          criticalCount={criticalCount}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          {activeTab === 'overview' && (
            <CommandOverview
              assets={filteredAssets}
              onSelectAsset={(asset) => {
                setSelectedAsset(asset);
                setActiveTab('vision');
              }}
              onOpenReport={(asset) => setReportAsset(asset)}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'vision' && (
            <VisionStudio
              selectedAsset={selectedAsset}
              onOpenReport={(asset) => setReportAsset(asset)}
            />
          )}

          {activeTab === 'gis' && (
            <GISMap
              assets={filteredAssets}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onOpenReport={(asset) => setReportAsset(asset)}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'forecaster' && (
            <DegradationForecaster
              assets={assets}
              selectedAsset={selectedAsset}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
            />
          )}

          {activeTab === 'drone' && <DroneFleet assets={assets} />}

          {activeTab === 'multimodal' && (
            <MultimodalFusion
              assets={assets}
              selectedAsset={selectedAsset}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
            />
          )}

          {activeTab === 'history' && (
            <AssetHistory
              assets={assets}
              selectedAsset={selectedAsset}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
            />
          )}

          {activeTab === 'resource' && (
            <ResourcePrioritizer
              assets={assets}
              onOpenReport={(asset) => setReportAsset(asset)}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsSLA assets={assets} />}
        </main>
      </div>

      {reportAsset && (
        <WorkOrderModal
          asset={reportAsset}
          onClose={() => setReportAsset(null)}
        />
      )}
    </div>
  );
}
