import express from "express";
import { getNearestMetro } from "../controllers/metro.controller.js";

const router = express.Router();

router.get("/nearest-metro", getNearestMetro);

export default router;
