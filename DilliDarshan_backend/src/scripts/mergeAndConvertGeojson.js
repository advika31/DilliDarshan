import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read GeoJSON files
const hospitalsPath = path.join(__dirname, "../data/delhiHospitals.geojson");
const policePath = path.join(__dirname, "../data/delhiPolice.geojson");

const hospitals = JSON.parse(fs.readFileSync(hospitalsPath, "utf-8"));
const police = JSON.parse(fs.readFileSync(policePath, "utf-8"));

function convert(features, type) {
  return features
    .filter(f => f.geometry && f.geometry.type === "Point")
    .map(f => {
      const [lng, lat] = f.geometry.coordinates;

      return {
        name: f.properties?.name || "Unknown",
        type,
        lat,
        lng,
        address:
          f.properties?.["addr:full"] ||
          f.properties?.["addr:street"] ||
          "Delhi"
      };
    });
}

const merged = [
  ...convert(hospitals.features, "hospital"),
  ...convert(police.features, "police")
];

const outputPath = path.join(
  __dirname,
  "../data/delhiEmergencyPlaces.json"
);

fs.writeFileSync(
  outputPath,
  JSON.stringify(merged, null, 2)
);

console.log("Merged & converted successfully ✅");
