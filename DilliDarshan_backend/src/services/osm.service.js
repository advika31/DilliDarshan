import axios from "axios";

export const fetchLiveOSM = async (lat, lng, radius = 3000, type) => {
  
  const amenity = type === "hospital" ? "hospital" : "police";

  const query = `
    [out:json];
    node["amenity"="${amenity}"](around:${radius},${lat},${lng});
    out;
  `;

  const url = "https://overpass-api.de/api/interpreter";

  const res = await axios.post(url, query, {
    headers: { "Content-Type": "text/plain" }
  });



return res.data.elements
  .filter(e => e.tags?.name && e.tags.name.trim().length > 0)   
  .map(e => ({
    name: e.tags.name,
    type,
    lat: e.lat,
    lng: e.lon,
    source: "osm_live"
  }));
};