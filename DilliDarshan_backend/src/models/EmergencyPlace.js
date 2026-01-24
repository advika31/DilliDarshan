import mongoose from "mongoose";

const emergencyPlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["hospital", "police"],
    required: true
  },
  address: String,

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  }
});

// 🔑 Geospatial index
emergencyPlaceSchema.index({ location: "2dsphere" });

export default mongoose.model("EmergencyPlace", emergencyPlaceSchema);
