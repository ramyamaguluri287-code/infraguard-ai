import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  assetId: { type: String, required: true },
  complaintText: { type: String, required: true },
  sentiment: { type: String, default: 'High Concern (User Logged)' },
  source: { type: String, default: 'Field Technician Mobile App' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

export const Complaint = mongoose.model('Complaint', ComplaintSchema);
