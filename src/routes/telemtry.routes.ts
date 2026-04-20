import { Router } from "express";
import { getTelemetry } from "../controllers/telemetry.controller";
const router = Router();

router.get('/telemetry/:carId', getTelemetry);

export default router;