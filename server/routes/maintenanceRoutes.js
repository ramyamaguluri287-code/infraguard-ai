import express from 'express';
import { MaintenanceLog } from '../models/MaintenanceLog.js';
import { Asset } from '../models/Asset.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const logs = await MaintenanceLog.find().sort({ createdAt: -1 });
    res.json({ success: true, count: logs.length, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { assetId, repairType, cost, contractor, durabilityRating, notes } = req.body;
    const log = await MaintenanceLog.create({
      assetId,
      repairType,
      cost,
      contractor: contractor || 'Municipal Maintenance Division',
      durabilityRating: durabilityRating || 'Good',
      notes: notes || 'Completed maintenance work order.',
      date: new Date().toISOString().split('T')[0]
    });

    // Also push to asset's maintenanceHistory
    await Asset.findOneAndUpdate(
      { id: assetId },
      {
        $push: {
          maintenanceHistory: {
            id: log._id.toString(),
            date: log.date,
            repairType: log.repairType,
            cost: log.cost,
            contractor: log.contractor,
            durabilityRating: log.durabilityRating,
            status: 'Closed',
            notes: log.notes
          }
        }
      }
    );

    res.status(201).json({ success: true, data: log });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
