import mongoose from 'mongoose';

const MaintenanceLogSchema = new mongoose.Schema({
  assetId: { type: String, required: true },
  repairType: { type: String, required: true },
  cost: { type: Number, required: true },
  contractor: { type: String, default: 'Municipal Maintenance Division' },
  durabilityRating: { type: String, default: 'Good' },
  status: { type: String, default: 'Closed' },
  notes: { type: String, default: 'Completed maintenance work order.' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

export const MaintenanceLog = mongoose.model('MaintenanceLog', MaintenanceLogSchema);
