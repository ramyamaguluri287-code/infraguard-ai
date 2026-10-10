import express from 'express';
import { Asset } from '../models/Asset.js';

const router = express.Router();

// GET all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json({ success: true, count: assets.length, data: assets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single asset
router.get('/:id', async (req, res) => {
  try {
    const asset = await Asset.findOne({ id: req.params.id });
    if (!asset) {
      return res.status(404).json({ success: false, error: 'Asset not found' });
    }
    res.json({ success: true, data: asset });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new inspection / update bounding boxes
router.post('/:id/inspection', async (req, res) => {
  try {
    const { boundingBoxes, inspectionNotes, riskScore } = req.body;
    const asset = await Asset.findOneAndUpdate(
      { id: req.params.id },
      {
        $push: { boundingBoxes: { $each: boundingBoxes || [] } },
        ...(inspectionNotes && { inspectionNotes }),
        ...(riskScore && { riskScore })
      },
      { new: true }
    );
    res.json({ success: true, data: asset });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
