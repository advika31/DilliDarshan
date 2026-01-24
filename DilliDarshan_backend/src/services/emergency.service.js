import EmergencyPlace from "../models/EmergencyPlace.js";

const findNearby = async ({ lat, lng, type, radius = 3000 }) => {
  return EmergencyPlace.find({
    type,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: radius
      }
    }
  }).limit(5);
};

export default { findNearby };
