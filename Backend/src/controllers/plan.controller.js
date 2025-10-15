import Goal from "../models/Goal.js";
import Task from "../models/Task.js";
import { generatePlan } from "../services/planner.service.js";
import { scheduleTasks } from "../services/timeline.service.js";



export async function createPlan(req, res, next) {
  try {
    const { goalTitle, targetDate } = req.body;
    if (!goalTitle) return res.status(400).json({ error: "goalTitle required" });

    const draft = await generatePlan(goalTitle, targetDate);
    const scheduled = scheduleTasks(draft.tasks, targetDate ? new Date(targetDate) : undefined);

    const goal = await Goal.create({
      title: goalTitle,
      targetDate: targetDate ? new Date(targetDate) : undefined
    });

    // Insert tasks and map titles → _id
    const idByTitle = new Map();
    for (const t of scheduled) {
      const created = await Task.create({
        goalId: goal._id,
        title: t.title,
        description: t.description,
        estimateDays: t.estimateDays,
        startDate: t.startDate,
        endDate: t.endDate,
        dependsOn: []
      });
      idByTitle.set(t.title, created._id);
    }

    // Resolve dependsOn to ObjectIds
    for (const t of scheduled) {
      const depIds = (t.dependsOn || []).map(d => idByTitle.get(d)).filter(Boolean);
      await Task.updateOne({ goalId: goal._id, title: t.title }, { $set: { dependsOn: depIds } });
    }

    const tasks = await Task.find({ goalId: goal._id }).lean();
    res.json({ goal, tasks });
  } catch (err) {
    next(err);
  }
}
