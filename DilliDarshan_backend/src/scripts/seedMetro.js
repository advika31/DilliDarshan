import mongoose from "mongoose";
import MetroStation from "../models/MetroStation.js";
import metroData from "../data/delhiMetroStations.json" assert { type: "json" };

import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

await MetroStation.insertMany(metroData);

console.log("✅ Metro stations seeded");
process.exit();
