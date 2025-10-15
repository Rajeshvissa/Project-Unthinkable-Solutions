import { Router } from "express";
import {
  listGoals, getGoalTasks, updateTask, deleteGoal
} from "../controllers/goals.controller.js";

const r = Router();

r.get("/goals", listGoals);
r.get("/goals/:goalId/tasks", getGoalTasks);
r.patch("/tasks/:taskId", updateTask);
r.delete("/goals/:goalId", deleteGoal);

export default r;
