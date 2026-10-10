# ⚙️ InfraGuard AI — Backend REST API Server

Express + Node.js + MongoDB API server powering the **InfraGuard AI Command Center**.

## 📡 Endpoints

- `GET /api/assets` - Retrieve all geotagged infrastructure assets.
- `GET /api/assets/:id` - Retrieve single asset with telemetry, sensor readings, and maintenance history.
- `POST /api/assets/:id/inspection` - Save new bounding boxes and inspector notes.
- `GET /api/complaints` - Retrieve citizen reports and field logs.
- `POST /api/complaints` - Log a citizen complaint or field technician observation.
- `GET /api/maintenance` - Retrieve maintenance history logs.
- `POST /api/maintenance` - Record newly completed maintenance work orders.
- `GET /api/analytics/summary` - Aggregate metrics (total assets, critical hazards, average risk index, repair backlog).
- `GET /api/health` - Liveness healthcheck.

## 🛠️ Setup & Running

```bash
# Install dependencies
npm install

# Seed initial database
npm run seed

# Run with nodemon on port 5000
npm run dev
```
