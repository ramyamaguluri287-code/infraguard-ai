import express from 'express';
import { Complaint } from '../models/Complaint.js';
import { Asset } from '../models/Asset.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({ success: true, count: complaints.length, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { assetId, complaintText, source } = req.body;
    const complaint = await Complaint.create({
      assetId,
      complaintText,
      source: source || 'Field Technician Mobile App',
      date: new Date().toISOString().split('T')[0]
    });

    // Also push to asset's citizenComplaints array
    await Asset.findOneAndUpdate(
      { id: assetId },
      {
        $push: {
          citizenComplaints: {
            id: complaint._id.toString(),
            date: complaint.date,
            text: complaint.complaintText,
            sentiment: complaint.sentiment,
            source: complaint.source
          }
        }
      }
    );

    res.status(201).json({ success: true, data: complaint });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
