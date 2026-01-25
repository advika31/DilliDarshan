const axios = require("axios");

const getNearbyPlaces = async (lat, lon) => {
  const query = `
    [out:json];
    (
      node["tourism"~"attraction|artwork|gallery|museum|theme_park|zoo|viewpoint"](around:5000,${lat},${lon});
      node["historic"~"monument|memorial|archaeological_site|castle|ruins|heritage|building|fort|palace|tomb"](around:5000,${lat},${lon});
      node["amenity"~"place_of_worship|arts_centre|theatre|conference_centre"](around:5000,${lat},${lon});
      node["leisure"~"park|garden|stadium|sports_centre|water_park"](around:5000,${lat},${lon});
      node["shop"~"mall|department_store"](around:5000,${lat},${lon});
      node["building"~"public|government|civic|train_station|airport"](around:5000,${lat},${lon});
      node["boundary"="protected_area"](around:5000,${lat},${lon});
      node["natural"~"beach|cliff|peak|volcano|cave|spring|waterfall"](around:5000,${lat},${lon});
      node["man_made"~"lighthouse|tower|obelisk|statue|memorial|bridge|viaduct"](around:5000,${lat},${lon});
      node["highway"~"pedestrian|footway"]["name"](around:3000,${lat},${lon});
      node["railway"~"station"]["name"](around:3000,${lat},${lon});
      way["tourism"~"attraction|artwork|gallery|museum"](around:5000,${lat},${lon});
      relation["tourism"~"attraction|artwork|gallery|museum"](around:5000,${lat},${lon});
    );
    out geom;
  `;

  const response = await axios.post(
    "https://overpass-api.de/api/interpreter",
    query,
    {
      headers: {
        "Content-Type": "text/plain"
      }
    }
  );

  // Enhanced filtering for quality places
  return response.data.elements.filter(place => {
    if (!place.tags || !place.tags.name) return false;

    const name = place.tags.name.trim();
    if (name === "" || name.toLowerCase().includes("unnamed")) return false;

    // Filter out generic names
    const genericNames = [
      "park", "garden", "temple", "church", "mosque", "school", "hospital",
      "bank", "atm", "restaurant", "shop", "store", "office", "building"
    ];

    const nameLower = name.toLowerCase();
    if (genericNames.some(generic => nameLower === generic)) return false;

    // Prioritize places with Wikipedia links or tourism ratings
    if (place.tags.wikipedia || place.tags.wikidata) return true;

    // Prioritize places with detailed tags
    const hasDetailedTags = (
      place.tags.historic ||
      place.tags.tourism ||
      place.tags.architecture ||
      place.tags.built_year ||
      place.tags.designer ||
      place.tags.artist
    );

    return hasDetailedTags || name.length > 3;
  });
};

module.exports = { getNearbyPlaces };
