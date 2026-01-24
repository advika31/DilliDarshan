import express from "express";
import { getNearbyEmergencyPlaces } from "../controllers/emergency.controller.js";

const router = express.Router();

router.get("/nearby", getNearbyEmergencyPlaces);

export default router;
