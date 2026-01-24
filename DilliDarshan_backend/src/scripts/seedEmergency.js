import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import EmergencyPlace from "../models/EmergencyPlace.js";

// Fix __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 FORCE dotenv to load from backend root
dotenv.config({
  path: path.resolve(__dirname, "../../.env")
});

console.log("MONGO_URI =", process.env.MONGO_URI);

// Read merged JSON data
const dataPath = path.join(
  __dirname,
  "../data/delhiEmergencyPlaces.json"
);

const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

async function seed() {
  try {
    // Connect DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear old data
    await EmergencyPlace.deleteMany();

    // Prepare documents
    const docs = data.map(p => ({
      name: p.name,
      type: p.type,
      address: p.address,
      location: {
        type: "Point",
        coordinates: [p.lng, p.lat] // ⚠️ lng first
      }
    }));

    // Insert
    await EmergencyPlace.insertMany(docs);

    console.log("Emergency places seeded successfully ✅");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed ❌", err);
    process.exit(1);
  }
}

seed();
