import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // For development, use a local MongoDB connection string
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/dillidarshan";

    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB connected");
    console.log("📦 Database:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    // Don't exit the process, just log the error and continue
    console.log("⚠️ Continuing without database connection...");
  }
};

export default connectDB;
