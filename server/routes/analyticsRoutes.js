import express from 'express';
import { Asset } from '../models/Asset.js';

const router = express.Router();

router.get('/summary', async (req, res) => {
  try {
    const assets = await Asset.find();
    const totalAssets = assets.length;
    const criticalAssets = assets.filter((a) => a.severity === 'Critical').length;
    const avgRisk = Math.round(
      assets.reduce((sum, a) => sum + a.riskScore, 0) / (totalAssets || 1)
    );
    const totalBacklogCost = assets.reduce(
      (sum, a) => sum + a.estimatedRepairCost,
      0
    );

    res.json({
      success: true,
      data: {
        totalAssets,
        criticalAssets,
        avgRisk,
        totalBacklogCost
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
