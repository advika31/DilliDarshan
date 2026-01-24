// src/services/metro.service.js
import { snapToRoad } from "./maps.service.js";

const DELHI_CENTER = { lat: 28.6139, lng: 77.2090 };

const scoreResult = (result) => {
  let score = 0;

  // Prefer educational institutions
  if (result.type === "university" || result.class === "amenity") {
    score += 5;
  }

  // Importance (OSM confidence)
  if (result.importance) {
    score += result.importance * 10;
  }

  // Penalize far-away results
  const dLat = result.lat - DELHI_CENTER.lat;
  const dLng = result.lon - DELHI_CENTER.lng;
  const distanceFromDelhiCenter = Math.sqrt(dLat * dLat + dLng * dLng);

  score -= distanceFromDelhiCenter * 10;

  return score;
};





import MetroStation from "../models/MetroStation.js";
import { getWalkingDistance } from "./maps.service.js";
import { haversineDistance } from "../utils/haversine.js";

export const findNearestMetro = async (placeCoords) => {
  const stations = await MetroStation.find();

  // STEP 1: calculate straight-line distance for all stations
  const stationsWithAirDistance = stations.map(station => ({
    ...station.toObject(),
    airDistance: haversineDistance(
      placeCoords.lat,
      placeCoords.lng,
      station.lat,
      station.lng
    )
  }));

  // STEP 2: sort by straight-line distance
  stationsWithAirDistance.sort(
    (a, b) => a.airDistance - b.airDistance
  );

  // STEP 3: take top 3 closest stations
  const candidates = stationsWithAirDistance.slice(0, 3);

  // STEP 4: compute real walking distance ONLY for these
  let bestStation = null;
  let minWalkingDistance = Infinity;

  for (const station of candidates) {
    // 🔥 Snap origin to nearest walkable road
const snappedOrigin = await snapToRoad(placeCoords);

const walk = await getWalkingDistance(
  snappedOrigin,
  { lat: station.lat, lng: station.lng }
);


      // 🚨 SANITY CHECK (ADD THIS HERE)
  // Ignore unrealistically small distances for large POIs
  if (walk.distance < 400) {
    continue;
  }

    if (walk.distance < minWalkingDistance) {
      minWalkingDistance = walk.distance;
      bestStation = {
        ...station,
        walkingTime: walk.duration,
        walkingDistance: walk.distance
      };
    }
  }

  return bestStation;
};
