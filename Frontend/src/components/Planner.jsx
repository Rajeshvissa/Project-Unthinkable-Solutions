import { format, differenceInCalendarDays } from "date-fns";
import TasksTable from "./TasksTable";
import Timeline from "./Timeline";

export default function Planner({ plan, loading }) {
  if (loading) {
    return <div>Generating plan…</div>;
  }

  if (!plan) {
    return <div className="empty-state">Your plan will appear here once generated.</div>;
  }

  const tasks = plan.tasks || [];
  if (!tasks.length) {
    return <div className="empty-state">No tasks generated for this goal.</div>;
  }

  const min = new Date(Math.min(...tasks.map(t => new Date(t.startDate).getTime())));
  const max = new Date(Math.max(...tasks.map(t => new Date(t.endDate).getTime())));
  const spanDays = Math.max(1, differenceInCalendarDays(max, min));

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-1 text-capitalize">{plan.goal?.title || "Plan"}</h5>
        </div>
        <span className="badge-soft">
          {format(min, "yyyy-MM-dd")} → {format(max, "yyyy-MM-dd")}
        </span>
      </div>

      <TasksTable tasks={tasks} />
      <div className="mt-4">
        <Timeline tasks={tasks} min={min} spanDays={spanDays} />
      </div>
    </>
  );
}
