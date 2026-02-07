import express from "express";
import cors from "cors";
import { fetchLiveOSM } from "./services/osm.service.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Emergency API is running" });
});

// Emergency search route
app.get("/api/emergency/nearby", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        error: "lat and lng are required"
      });
    }

    console.log(`🔍 Searching for emergency services near lat: ${lat}, lng: ${lng}`);

    // Fetch hospitals
    const hospitals = await fetchLiveOSM(Number(lat), Number(lng), 3000, "hospital");
    
    // Fetch police stations
    const police = await fetchLiveOSM(Number(lat), Number(lng), 3000, "police");

    const combined = [...hospitals, ...police];

    console.log(`✅ Found ${combined.length} emergency services`);

    res.json({
      count: combined.length,
      results: combined
    });

  } catch (err) {
    console.error("Emergency controller error:", err.message);
    res.status(500).json({ error: "Failed to fetch emergency places" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Emergency API running on port ${PORT}`);
  console.log("📦 MongoDB status: Disabled - Using OSM Live API");
  console.log("🔍 Test: http://localhost:3000/api/emergency/nearby?lat=28.6139&lng=77.2090");
});
