import { useState } from "react";

export default function GoalForm({ loading, onSubmit }) {
  const [goalTitle, setGoalTitle] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!goalTitle.trim()) return;
    onSubmit({ goalTitle });
  }

  return (
    <form onSubmit={submit}>
      <div className="mb-4">
        <label className="form-label fw-semibold">Goal</label>
        <input
          className="form-control"
          placeholder="Enter the goal"
          value={goalTitle}
          onChange={(e) => setGoalTitle(e.target.value)}
          autoFocus
        />
      </div>

      <button className="btn btn-elevate w-100" disabled={loading}>
        {loading ? "Generating…" : "Generate Plan"}
      </button>
    </form>
  );
}
