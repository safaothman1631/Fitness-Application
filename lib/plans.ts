export type PlanItem = { id: string; title: string; time?: string };
export type Plan = { userId: string; date: string; workouts: PlanItem[]; meals: PlanItem[] };

const KEY = "trainerPlans";

function readAll(): Plan[] {
  if (typeof window === "undefined") return [];
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
function writeAll(plans: Plan[]) { try { localStorage.setItem(KEY, JSON.stringify(plans)); } catch {} }

export function getPlan(userId: string, date: string): Plan | null {
  return readAll().find(p => p.userId === userId && p.date === date) || null;
}

export function savePlan(plan: Plan) {
  const all = readAll();
  const i = all.findIndex(p => p.userId === plan.userId && p.date === plan.date);
  if (i >= 0) all[i] = plan; else all.push(plan);
  writeAll(all);
}

export function upsertItem(userId: string, date: string, type: "workouts" | "meals", item: PlanItem) {
  const current = getPlan(userId, date) || { userId, date, workouts: [], meals: [] };
  const list = [...current[type].filter(i => i.id !== item.id), item];
  savePlan({ ...current, [type]: list });
}

export function removeItem(userId: string, date: string, type: "workouts" | "meals", id: string) {
  const current = getPlan(userId, date);
  if (!current) return;
  const list = current[type].filter(i => i.id !== id);
  savePlan({ ...current, [type]: list });
}

export function planSummary(userId: string, date: string): { workouts: number; meals: number } {
  const p = getPlan(userId, date);
  return { workouts: p?.workouts.length || 0, meals: p?.meals.length || 0 };
}
