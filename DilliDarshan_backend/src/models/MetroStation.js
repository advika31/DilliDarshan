import mongoose from "mongoose";

const exitSchema = new mongoose.Schema({
  gate: String,
  description: String
});

const metroStationSchema = new mongoose.Schema({
  name: String,
  line: String,
  lat: Number,
  lng: Number,
  exits: [exitSchema]
});

const MetroStation = mongoose.model(
  "MetroStation",
  metroStationSchema
);

export default MetroStation;
