import { format } from "date-fns";

export default function TasksTable({ tasks }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            <th>Task</th>
            <th className="d-none d-md-table-cell">Description</th>
            <th>Est (d)</th>
            <th>Start</th>
            <th>End</th>
            <th>Deps</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, i) => (
            <tr key={t._id || `${t.title}-${i}`}>
              <td className="fw-semibold">{t.title}</td>
              <td className="d-none d-md-table-cell text-secondary">
                {t.description || "—"}
              </td>
              <td className="text-center">{t.estimateDays}</td>
              <td className="text-center">{format(new Date(t.startDate), "yyyy-MM-dd")}</td>
              <td className="text-center">{format(new Date(t.endDate), "yyyy-MM-dd")}</td>
              <td className="text-center">{(t.dependsOn || []).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
