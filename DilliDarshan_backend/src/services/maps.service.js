import axios from "axios";


// Snap a coordinate to nearest walkable road
export const snapToRoad = async (coords) => {
  const url = `https://router.project-osrm.org/nearest/v1/foot/${coords.lng},${coords.lat}`;

  const response = await axios.get(url);

  if (!response.data.waypoints.length) {
    return coords; // fallback
  }

  const snapped = response.data.waypoints[0].location;

  return {
    lng: snapped[0],
    lat: snapped[1]
  };
};

/**
 * Reference point for Delhi (used to penalize far results)
 */
const DELHI_CENTER = { lat: 28.6139, lng: 77.2090 };

/**
 * Score a geocoding result to decide how plausible it is
 */
const scoreResult = (result) => {
  let score = 0;

  // Prefer important place types (universities, amenities, landmarks)
  if (
    result.type === "university" ||
    result.type === "college" ||
    result.class === "amenity" ||
    result.class === "tourism"
  ) {
    score += 5;
  }

  // Importance score from OSM (higher = more trusted)
  if (result.importance) {
    score += result.importance * 10;
  }

  // Penalize results far from Delhi center
  const dLat = result.lat - DELHI_CENTER.lat;
  const dLng = result.lon - DELHI_CENTER.lng;
  const distancePenalty = Math.sqrt(dLat * dLat + dLng * dLng);

  score -= distancePenalty * 10;

  return score;
};

/**
 * Convert place name → coordinates (OpenStreetMap with smart selection)
 */
export const getPlaceCoordinates = async (placeName) => {
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: placeName,
        format: "json",
        addressdetails: 1,
        limit: 5, // 🔥 fetch multiple candidates
        countrycodes: "in",
        viewbox: "77.0,28.9,77.4,28.4", // Delhi NCR bounding box
        bounded: 1
      },
      headers: {
        "User-Agent": "DilliDarshanApp"
      }
    }
  );

  if (!response.data.length) {
    throw new Error("Place not found");
  }

  // Score each candidate instead of blindly taking the first
  const scoredResults = response.data.map((r) => {
    const lat = parseFloat(r.lat);
    const lon = parseFloat(r.lon);

    return {
      lat,
      lng: lon,
      score: scoreResult({
        ...r,
        lat,
        lon
      })
    };
  });

  // Pick the highest-scoring result
  scoredResults.sort((a, b) => b.score - a.score);
  const best = scoredResults[0];

  return {
    lat: best.lat,
    lng: best.lng
  };
};

/**
 * Walking distance using OSRM (used AFTER filtering)
 */
export const getWalkingDistance = async (origin, destination) => {
  const url = `https://router.project-osrm.org/route/v1/foot/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;

  const response = await axios.get(url, {
    params: { overview: "false" }
  });

  const route = response.data.routes[0];

  return {
    distance: route.distance, // meters
    duration: Math.round(route.duration / 60) + " mins"
  };
};
