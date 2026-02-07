import express from "express";
import cors from "cors";

import metroRoutes from "./routes/metro.routes.js";
import emergencyRoutes from "./routes/emergency.routes.js";
import connectDB from "./config/db.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 Connect MongoDB
await connectDB();

// Routes
app.use("/api/emergency", emergencyRoutes);
app.use("/api", metroRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
