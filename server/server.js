import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import assetRoutes from './routes/assetRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/assets', assetRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'InfraGuard AI Backend Service',
    version: '4.5.0',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`[Server] InfraGuard AI API Server running on port ${PORT}`);
});
