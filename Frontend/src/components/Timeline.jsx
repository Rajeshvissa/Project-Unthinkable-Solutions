import { differenceInCalendarDays, format } from "date-fns";

export default function Timeline({ tasks, min, spanDays }) {
  return (
    <div className="card glass">
      <div className="card-body">
        <h6 className="card-title mb-3">Timeline</h6>
        <div className="d-flex flex-column gap-2">
          {tasks.map((t, i) => {
            const start = new Date(t.startDate);
            const end = new Date(t.endDate);
            const leftPct = (differenceInCalendarDays(start, min) / spanDays) * 100;
            const widthPct = Math.max(1.5, (differenceInCalendarDays(end, start) / spanDays) * 100);

            return (
              <div key={t._id || `${t.title}-${i}`} className="d-flex align-items-center gap-3">
                <div className="text-truncate" style={{width: 240, fontSize: ".92rem"}}>
                  {t.title}
                </div>
                <div className="flex-grow-1 position-relative" style={{height: 10, background: "rgba(255,255,255,.15)", borderRadius: 6}}>
                  <div
                    className="position-absolute"
                    style={{
                      top: 0, bottom: 0, left: `${leftPct}%`,
                      width: `${widthPct}%`,
                      background: "rgba(255,255,255,.9)",
                      borderRadius: 6
                    }}
                    title={`${t.title}: ${format(start,"MM/dd")} → ${format(end,"MM/dd")}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
