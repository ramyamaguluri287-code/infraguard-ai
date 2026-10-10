import mongoose from 'mongoose';

const BoundingBoxSchema = new mongoose.Schema({
  id: String,
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  label: String,
  confidence: Number,
  severity: String,
  color: String
});

const MaintenanceHistorySchema = new mongoose.Schema({
  id: String,
  date: String,
  repairType: String,
  cost: Number,
  contractor: String,
  durabilityRating: String,
  status: String,
  notes: String
});

const CitizenComplaintSchema = new mongoose.Schema({
  id: String,
  date: String,
  text: String,
  sentiment: String,
  source: String
});

const AssetSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: String,
  location: {
    address: String,
    lat: Number,
    lng: Number,
    district: String
  },
  riskScore: { type: Number, required: true },
  severity: { type: String, required: true },
  vulnerabilityIndex: Number,
  trafficImpactScore: Number,
  recurrenceFactor: Number,
  defectTypes: [String],
  affectedAreaSqm: Number,
  estimatedRepairCost: Number,
  urgencyDays: Number,
  status: String,
  image: String,
  fallbackColor: String,
  boundingBoxes: [BoundingBoxSchema],
  inspectionNotes: String,
  citizenComplaints: [CitizenComplaintSchema],
  sensorData: {
    strainGaugeMicrostrain: Number,
    moisturePercentage: Number,
    vibrationHz: Number,
    structuralIntegrityPct: Number,
    lastTelemetrySync: String
  },
  maintenanceHistory: [MaintenanceHistorySchema],
  recommendedAction: String,
  requiredEquipment: [String],
  assignedCrew: String,
  slaTargetHours: Number
}, { timestamps: true });

export const Asset = mongoose.model('Asset', AssetSchema);
