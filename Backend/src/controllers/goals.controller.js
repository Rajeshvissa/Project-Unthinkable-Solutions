import Goal from "../models/Goal.js";
import Task from "../models/Task.js";
import mongoose from "mongoose";

export async function listGoals(req, res, next) {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 }).lean();
    res.json(goals);
  } catch (e) { next(e); }
}

export async function getGoalTasks(req, res, next) {
  try {
    const { goalId } = req.params;
    const tasks = await Task.find({ goalId }).lean();
    res.json(tasks);
  } catch (e) { next(e); }
}

export async function updateTask(req, res, next) {
  try {
    const { taskId } = req.params;
    const patch = req.body || {};
    if (patch.dependsOn) {
      // make sure they're ObjectIds
      patch.dependsOn = patch.dependsOn
        .map(id => new mongoose.Types.ObjectId(id));
    }
    await Task.updateOne({ _id: taskId }, { $set: patch });
    const updated = await Task.findById(taskId).lean();
    res.json(updated);
  } catch (e) { next(e); }
}

export async function deleteGoal(req, res, next) {
  try {
    const { goalId } = req.params;
    await Task.deleteMany({ goalId });
    await Goal.deleteOne({ _id: goalId });
    res.json({ ok: true });
  } catch (e) { next(e); }
}
