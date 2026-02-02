import { findNearbyHybrid } from "../services/emergency.service.js";

export const getNearbyEmergencyPlaces = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        error: "lat and lng are required"
      });
    }

    const coords = {
      lat: Number(lat),
      lng: Number(lng)
    };

    // ✅ fetch both
    const hospitals = await findNearbyHybrid({
      ...coords,
      type: "hospital"
    });

    const police = await findNearbyHybrid({
      ...coords,
      type: "police"
    });

    const combined = [...hospitals, ...police];

    res.json({
      count: combined.length,
      results: combined
    });

  } catch (err) {
    console.error("Emergency controller error:", err.message);
    res.status(500).json({ error: "Failed to fetch emergency places" });
  }
};