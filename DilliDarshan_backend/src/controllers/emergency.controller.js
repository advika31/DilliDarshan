import emergencyService from "../services/emergency.service.js";

export const getNearbyEmergencyPlaces = async (req, res) => {
  try {
    const { lat, lng, type, radius } = req.query;

    if (!lat || !lng || !type) {
      return res.status(400).json({
        message: "lat, lng and type are required"
      });
    }

    const places = await emergencyService.findNearby({
      lat: Number(lat),
      lng: Number(lng),
      type,
      radius: Number(radius)
    });

    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
