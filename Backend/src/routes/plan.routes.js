import { Router } from "express";
import { createPlan } from "../controllers/plan.controller.js";

const r = Router();
r.post("/plan", createPlan);
export default r;
