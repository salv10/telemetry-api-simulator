import { Router } from "express";
import { getTelemetry, getTelemetrySummary } from "../controllers/telemetry.controller";
const router = Router();

router.get('/telemetry/:carId', getTelemetry);

router.get('/telemetry/:carId/summary', getTelemetrySummary);

export default router;