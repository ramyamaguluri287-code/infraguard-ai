import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Asset } from '../models/Asset.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const initialAssets = [
  {
    id: 'INF-BR-01',
    name: 'Golden Bay Suspension Bridge - Pier 4 Load Support',
    category: 'Bridges',
    subCategory: 'Cable-Stayed Bridge Support',
    location: {
      address: 'North Span Approach, Pier 4, Highway Corridor 101',
      lat: 37.7983,
      lng: -122.3778,
      district: 'Harbor Maritime District'
    },
    riskScore: 92,
    severity: 'Critical',
    vulnerabilityIndex: 88,
    trafficImpactScore: 95,
    recurrenceFactor: 85,
    defectTypes: ['Rebar Exposure', 'Concrete Spalling', 'Saltwater Corrosion'],
    affectedAreaSqm: 18.4,
    estimatedRepairCost: 68000,
    urgencyDays: 2,
    status: 'Pending Maintenance Dispatch',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80',
    fallbackColor: '#EF4444',
    boundingBoxes: [
      {
        id: 'b1',
        x: 18,
        y: 25,
        width: 34,
        height: 28,
        label: 'Rebar Exposure & Deep Corrosion',
        confidence: 96,
        severity: 'Critical',
        color: '#FF4D4D'
      },
      {
        id: 'b2',
        x: 58,
        y: 40,
        width: 22,
        height: 30,
        label: 'Shear Stress Concrete Spalling',
        confidence: 91,
        severity: 'High',
        color: '#FFB800'
      }
    ],
    inspectionNotes:
      'Inspector Engineer Marcus Vance (PE #48291): Visual inspection revealed progressive chloride penetration along the primary support pier pedestal. Exposed steel reinforcements show >30% cross-sectional loss due to marine environment exposure. Recommended hydro-demolition and marine-grade epoxy patch.',
    citizenComplaints: [
      {
        id: 'c1',
        date: '2026-08-18',
        text: 'Reported loud thumping and metallic vibration sound when heavy freight trucks pass Pier 4 span.',
        sentiment: 'Severe Warning',
        source: '311 Citizen Portal'
      },
      {
        id: 'c2',
        date: '2026-08-10',
        text: 'Rust staining dripping onto harbor bike path under pier.',
        sentiment: 'Moderate Concern',
        source: 'Maritime Authority'
      }
    ],
    sensorData: {
      strainGaugeMicrostrain: 640,
      moisturePercentage: 84,
      vibrationHz: 18.5,
      structuralIntegrityPct: 58,
      lastTelemetrySync: '2026-08-21 12:15:00'
    },
    maintenanceHistory: [
      {
        id: 'm1',
        date: '2024-05-12',
        repairType: 'Surface Acrylic Coating',
        cost: 14500,
        contractor: 'Pacific Coating Corp',
        durabilityRating: 'Failed (Degraded in 14 mos)',
        status: 'Re-opened',
        notes: 'Coating peeled due to internal moisture pressure.'
      },
      {
        id: 'm2',
        date: '2021-09-30',
        repairType: 'Concrete Patching & Expansion Joint Replacement',
        cost: 42000,
        contractor: 'Apex Infrastructure Group',
        durabilityRating: 'Satisfactory',
        status: 'Closed',
        notes: 'Standard scheduled maintenance.'
      }
    ],
    recommendedAction:
      'Immediate emergency structural shoring, concrete hydro-demolition, anti-corrosive primer, and fiber-reinforced polymer jacket installation.',
    requiredEquipment: [
      'Hydro-demolition Rig',
      'Suspended Scaffolding',
      'Marine Epoxy Injectors',
      'Ultrasonic Thickness Gauge'
    ],
    assignedCrew: 'Maritime Structural Specialist Team',
    slaTargetHours: 48
  },
  {
    id: 'INF-HW-04',
    name: 'Interstate-95 Express Highway - Mile Marker 42.5',
    category: 'Roads & Highways',
    subCategory: 'High-Volume Arterial Freeway',
    location: {
      address: 'I-95 Southbound Corridor, Mile Marker 42.5',
      lat: 37.7542,
      lng: -122.4055,
      district: 'South Highway Corridor'
    },
    riskScore: 78,
    severity: 'High',
    vulnerabilityIndex: 74,
    trafficImpactScore: 92,
    recurrenceFactor: 70,
    defectTypes: ['Severe Alligator Cracking', 'Sub-base Pothole Cavity'],
    affectedAreaSqm: 42.6,
    estimatedRepairCost: 45000,
    urgencyDays: 5,
    status: 'Scheduled Maintenance',
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
    fallbackColor: '#F59E0B',
    boundingBoxes: [
      {
        id: 'b3',
        x: 20,
        y: 35,
        width: 60,
        height: 45,
        label: 'Severe Alligator Fatigue Cracking',
        confidence: 93,
        severity: 'High',
        color: '#FFB800'
      }
    ],
    inspectionNotes:
      'High traffic load has compromised sub-base pavement layers. Alligator cracking pattern indicates moisture penetration and subgrade pumping.',
    citizenComplaints: [
      {
        id: 'c3',
        date: '2026-08-19',
        text: 'Multiple drivers reported tire damage from expanding road pothole.',
        sentiment: 'Urgent Hazard',
        source: 'DOT Highway Patrol'
      }
    ],
    sensorData: {
      strainGaugeMicrostrain: 380,
      moisturePercentage: 62,
      vibrationHz: 28.4,
      structuralIntegrityPct: 68,
      lastTelemetrySync: '2026-08-21 11:30:00'
    },
    maintenanceHistory: [
      {
        id: 'm3',
        date: '2023-03-15',
        repairType: 'Cold Patch Asphalt Fill',
        cost: 8500,
        contractor: 'City Highway Roadworks',
        durabilityRating: 'Failed (Degraded in 14 mos)',
        status: 'Closed',
        notes: 'Temporary pothole fill deteriorated during winter freeze.'
      }
    ],
    recommendedAction:
      'Full-depth milling of affected 450m travel lane, subgrade compaction, geo-grid reinforcement, and hot-mix asphalt overlay.',
    requiredEquipment: [
      'Asphalt Cold Milling Machine',
      'Heavy Vibratory Roller',
      'Asphalt Paver'
    ],
    assignedCrew: 'Rapid Arterial Paving Crew',
    slaTargetHours: 72
  },
  {
    id: 'INF-BL-09',
    name: 'Central Municipal Hospital - East Wing Support Column',
    category: 'Public Buildings',
    subCategory: 'Critical Care Healthcare Facility',
    location: {
      address: '742 Healthcare Parkway, Basement Level B2',
      lat: 37.7712,
      lng: -122.4285,
      district: 'Central Metro Medical District'
    },
    riskScore: 84,
    severity: 'Critical',
    vulnerabilityIndex: 90,
    trafficImpactScore: 80,
    recurrenceFactor: 60,
    defectTypes: ['Diagonal Shear Crack', 'Water Seepage Efflorescence'],
    affectedAreaSqm: 8.2,
    estimatedRepairCost: 52000,
    urgencyDays: 2,
    status: 'Pending Maintenance Dispatch',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80',
    fallbackColor: '#EF4444',
    boundingBoxes: [
      {
        id: 'b4',
        x: 30,
        y: 20,
        width: 35,
        height: 60,
        label: 'Diagonal Shear Crack (3.2mm)',
        confidence: 95,
        severity: 'Critical',
        color: '#FF4D4D'
      }
    ],
    inspectionNotes:
      'Basement Level B2 column exhibits diagonal shear crack. Efflorescence stains indicate ongoing groundwater ingress from adjacent retention wall.',
    citizenComplaints: [
      {
        id: 'c4',
        date: '2026-08-16',
        text: 'Hospital facilities manager reported hairline crack widened over 3 months.',
        sentiment: 'High Priority Facility Warning',
        source: 'Hospital Engineering Dept'
      }
    ],
    sensorData: {
      strainGaugeMicrostrain: 720,
      moisturePercentage: 92,
      vibrationHz: 9.8,
      structuralIntegrityPct: 61,
      lastTelemetrySync: '2026-08-21 13:00:00'
    },
    maintenanceHistory: [],
    recommendedAction:
      'High-pressure structural polyurethane injection, carbon-fiber reinforced polymer (CFRP) composite jacket wrap, and perimeter waterproofing.',
    requiredEquipment: [
      'High-Pressure Polyurethane Pump',
      'CFRP Composite Wrap System'
    ],
    assignedCrew: 'Specialized Structural Retrofit Unit',
    slaTargetHours: 48
  },
  {
    id: 'INF-DR-02',
    name: 'Metropolitan Outfall Storm Tunnel #3 - Joint Failure',
    category: 'Stormwater & Drainage',
    subCategory: 'Heavy Stormwater Trunk Culvert',
    location: {
      address: 'Harbor Drainage Outfall Canal, Junction 14',
      lat: 37.8055,
      lng: -122.3995,
      district: 'Bayside Watershed Basin'
    },
    riskScore: 65,
    severity: 'Medium',
    vulnerabilityIndex: 70,
    trafficImpactScore: 50,
    recurrenceFactor: 75,
    defectTypes: ['Joint Seam Separation', 'Debris & Silt Blockage'],
    affectedAreaSqm: 32.0,
    estimatedRepairCost: 28000,
    urgencyDays: 14,
    status: 'Routine Inspection',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?auto=format&fit=crop&w=1200&q=80',
    fallbackColor: '#3B82F6',
    boundingBoxes: [
      {
        id: 'b5',
        x: 15,
        y: 40,
        width: 70,
        height: 40,
        label: 'Joint Seam Separation (45mm gap)',
        confidence: 89,
        severity: 'Medium',
        color: '#3B82F6'
      }
    ],
    inspectionNotes:
      'Culvert joint seam separated under tidal hydrostatic pressure. Sediment accumulation has diminished drainage flow capacity by ~40%.',
    citizenComplaints: [
      {
        id: 'c5',
        date: '2026-08-05',
        text: 'Flooding in nearby parking lot during high tide and rainstorm.',
        sentiment: 'Drainage Hazard',
        source: 'Harbor Commercial Tenants'
      }
    ],
    sensorData: {
      strainGaugeMicrostrain: 240,
      moisturePercentage: 99,
      vibrationHz: 4.1,
      structuralIntegrityPct: 78,
      lastTelemetrySync: '2026-08-21 09:45:00'
    },
    maintenanceHistory: [
      {
        id: 'm4',
        date: '2022-11-10',
        repairType: 'Hydro-Jet Silt Descaling',
        cost: 11000,
        contractor: 'Metro Drainage Solutions',
        durabilityRating: 'Satisfactory',
        status: 'Closed',
        notes: 'Routine debris removal.'
      }
    ],
    recommendedAction:
      'Execute robotically-installed trenchless cured-in-place pipe (CIPP) structural liner and hydro-jet silt clearance.',
    requiredEquipment: [
      'Robot CCTV & Inversion Unit',
      'CIPP Steam Boiler Rig',
      'High-CFM Vacuum Jetter Truck'
    ],
    assignedCrew: 'Trenchless Pipe Rehabilitation Crew',
    slaTargetHours: 120
  }
];

async function seed() {
  await connectDB();
  console.log('[Seed] Clearing existing assets...');
  await Asset.deleteMany({});
  console.log('[Seed] Inserting initial assets...');
  await Asset.insertMany(initialAssets);
  console.log('[Seed] Database successfully seeded with 4 critical assets!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('[Seed Error]', err);
  process.exit(1);
});
