import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GoalSchema = new Schema({
  title: { type: String, required: true },
  targetDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default model("Goal", GoalSchema);
