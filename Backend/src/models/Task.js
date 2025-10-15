import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const TaskSchema = new Schema({
  goalId: { type: Types.ObjectId, ref: "Goal", index: true, required: true },
  title: { type: String, required: true },
  description: String,
  estimateDays: { type: Number, required: true, min: 0 },
  dependsOn: [{ type: Types.ObjectId, ref: "Task" }],
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ["todo","in_progress","done"], default: "todo" }
});

export default model("Task", TaskSchema);
