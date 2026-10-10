# 🛡️ InfraGuard AI — Smart City Infrastructure Inspection Command Center

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Deployment-00F2FE?style=for-the-badge&logo=vercel)](https://abc-eta-six-63.vercel.app)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-3B82F6?style=for-the-badge&logo=mongodb)](https://github.com/ramyamaguluri287-code/infraguard-ai)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet GIS](https://img.shields.io/badge/GIS-Leaflet%201.9-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)

**InfraGuard AI** is an advanced AI infrastructure inspection and predictive maintenance command center that synthesizes **computer vision defect detection**, **multimodal IoT sensor telemetry**, **geospatial GIS mapping**, and **resource-constrained maintenance optimization algorithms** to help civil engineers, city authorities, and infrastructure operators preempt structural failures.

---

## 🚀 Live Demo

- **Production Deployment:** [https://abc-eta-six-63.vercel.app](https://abc-eta-six-63.vercel.app)

---

## 📐 System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        INFRAGUARD AI COMMAND CENTER                    │
└────────────────────────────────────────────────────────────────────────┘
          │                                  │
    [Client App - React + Vite]         [REST API - Express + Node]
          │                                  │
  ┌───────┴───────────────┐                  ├─► /api/assets
  │ 9 Core Modules:       │                  ├─► /api/complaints
  │ 1. Command Overview   │                  ├─► /api/maintenance
  │ 2. AI Vision Studio   │                  └─► /api/analytics
  │ 3. Leaflet GIS Map    │                          │
  │ 4. Degradation Model  │                   [MongoDB Database]
  │ 5. Drone UAV Fleet    │                  (Asset, Complaint, Log)
  │ 6. Multimodal Fusion  │
  │ 7. Asset MTBF History │
  │ 8. Knapsack Optimizer │
  │ 9. Analytics & SLA    │
  └───────────────────────┘
```

---

## 🌟 Key Modules & Capabilities

1. **📊 Command Overview**  
   Real-time network health metrics: total assets monitored, critical hazards under 48h SLA windows, average composite risk index, and total repair backlog tally.

2. **👁️ AI Computer Vision Inspection Studio**  
   Interactive HTML5 defect bounding box canvas with confidence scoring (e.g. *Rebar Exposure: 96%*, *Concrete Spalling: 91%*), custom field image uploader, and instant engineering work order generation.

3. **🗺️ Leaflet Spatial Intelligence GIS**  
   High-precision municipal infrastructure map with animated pulsating severity markers, layer switching between **Cyber Dark**, **Satellite Imagery**, and **Topographic Terrain**, and category filtering (*Bridges*, *Roads & Highways*, *Public Buildings*, *Stormwater & Drainage*).

4. **📈 Predictive Degradation & Cost of Inaction**  
   Interactive 0-24 month deterioration forecaster simulating fissure expansion ($3.2\text{ mm} \rightarrow 24\text{ mm}$) and compounding capital losses ($4.8\times$) if maintenance is delayed.

5. **🛸 Autonomous Drone & Robotic Fleet Management**  
   Real-time multi-vehicle telemetry simulation:
   - **SkyScout-Alpha**: LiDAR UAV (Aerial bridge scanning)
   - **AeroScan-Beta**: Thermal Imaging UAV (Highway thermal stress)
   - **HydroDrone-Sub**: Sonar Crawler (Submerged stormwater trunk culverts)

6. **🔀 Multimodal Data Stream Fusion**  
   Fuses visual defect data with real-time IoT sensor telemetry ($\mu\varepsilon$ strain gauges, moisture %, vibration $\text{Hz}$) and 311 citizen logs into a weighted composite risk index.

7. **📜 Asset Lifecycle & MTBF History**  
   Historical audit trail of prior rehabilitation work orders, contractor accountability ratings, and durability tracking.

8. **⚖️ Resource-Constrained Maintenance Prioritizer**  
   Greedy Knapsack optimization engine that optimizes crew dispatch under finite fiscal budgets to maximize network-wide risk reduction and calculate deferred maintenance losses avoided.

9. **📉 Executive Analytics & SLA Compliance**  
   Category breakdowns, emergency response queue monitors, and printable official civil engineering work orders.

---

## 💻 Tech Stack

### Frontend (`client/`)
- **React 18** with **Vite**
- **Tailwind CSS** (Dark glassmorphic "Cyber Dark" UI)
- **Leaflet 1.9** for geospatial mapping
- **Recharts** for deterioration curves and risk analysis
- **Lucide React** icons

### Backend (`server/`)
- **Node.js** & **Express**
- **MongoDB** & **Mongoose** (Asset, Complaint, and MaintenanceLog schemas)
- **CORS**, **Morgan**, and **Dotenv**

---

## ⚙️ Quickstart Guide

### 1. Clone Repository
```bash
git clone https://github.com/ramyamaguluri287-code/infraguard-ai.git
cd infraguard-ai
```

### 2. Install Dependencies
```bash
# Install root orchestrator dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
cd ..
```

### 3. Seed MongoDB (Optional)
```bash
# Configure MongoDB URI in server/.env
npm run seed
```

### 4. Run Locally
```bash
# Runs both Frontend (5173) and Backend (5000) concurrently
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/assets` | Retrieve all geotagged infrastructure assets |
| `GET` | `/api/assets/:id` | Retrieve single asset with telemetry and history |
| `POST` | `/api/assets/:id/inspection` | Submit visual bounding box detections and notes |
| `GET` | `/api/complaints` | Retrieve citizen and field technician complaints |
| `POST` | `/api/complaints` | File new technician note or citizen report |
| `GET` | `/api/maintenance` | Retrieve historical maintenance records |
| `POST` | `/api/maintenance` | Log newly completed rehabilitation project |
| `GET` | `/api/analytics/summary` | Portfolio risk and backlog statistics |
| `GET` | `/api/health` | Service liveness healthcheck |

---

## 📄 License

MIT © [ramyamaguluri287-code](https://github.com/ramyamaguluri287-code)
