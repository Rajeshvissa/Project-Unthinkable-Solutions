
export function scheduleTasks(tasks, targetDate) {
  const titleToTask = new Map(tasks.map(t => [t.title, { ...t }]));
  const indeg = new Map();
  const adj = new Map();
  for (const t of tasks) {
    indeg.set(t.title, 0);
    adj.set(t.title, []);
  }
  for (const t of tasks) {
    for (const d of (t.dependsOn || [])) {
      indeg.set(t.title, (indeg.get(t.title) || 0) + 1);
      adj.get(d)?.push(t.title);
    }
  }

  const q = [...Array.from(indeg.keys())].filter(k => (indeg.get(k) || 0) === 0);
  const order = [];
  while (q.length) {
    const u = q.shift();
    order.push(u);
    for (const v of adj.get(u) || []) {
      indeg.set(v, (indeg.get(v) || 0) - 1);
      if ((indeg.get(v) || 0) === 0) q.push(v);
    }
  }
  if (order.length !== tasks.length) {
    const err = new Error("Cyclic dependencies detected");
    err.status = 400;
    throw err;
  }

  const now = new Date();
  const info = new Map();
  for (const name of order) {
    const t = titleToTask.get(name);
    const depEnds = (t.dependsOn || []).map(d => info.get(d).end.getTime());
    const startMs = depEnds.length ? Math.max(...depEnds) : now.getTime();
    const start = new Date(startMs);
    const end = new Date(start.getTime() + t.estimateDays * 24 * 3600 * 1000);
    info.set(name, { start, end });
  }

  if (targetDate) {
    const plannedEnd = new Date(Math.max(...Array.from(info.values()).map(i => i.end.getTime())));
    const delta = plannedEnd.getTime() - targetDate.getTime();
    if (delta > 0) {
      for (const k of info.keys()) {
        const { start, end } = info.get(k);
        info.set(k, {
          start: new Date(start.getTime() - delta),
          end: new Date(end.getTime() - delta)
        });
      }
    }
  }

  return tasks.map(t => ({
    ...t,
    startDate: info.get(t.title).start,
    endDate: info.get(t.title).end
  }));
}

