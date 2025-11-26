export interface WorkoutSubmission {
  date: string; // YYYY-MM-DD
  tasks: string[]; // completed workout task ids or titles
  timestamp: number;
  userName?: string;
}
export interface MealSubmission {
  date: string; // YYYY-MM-DD
  tasks: string[]; // completed meal task ids or titles
  timestamp: number;
  userName?: string;
}

const WORKOUT_KEY = "submittedWorkouts";
const MEAL_KEY = "submittedMeals";

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function getWorkoutSubmissions(): WorkoutSubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WORKOUT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function getMealSubmissions(): MealSubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MEAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function hasSubmittedWorkoutToday(): boolean {
  const key = todayKey();
  return getWorkoutSubmissions().some(s => s.date === key);
}

export function hasSubmittedMealToday(): boolean {
  const key = todayKey();
  return getMealSubmissions().some(s => s.date === key);
}

export function submitWorkout(tasks: string[]): WorkoutSubmission {
  let userName: string | undefined
  try {
    const profile = localStorage.getItem("profileData")
    if (profile) {
      const p = JSON.parse(profile)
      userName = p?.name || p?.fullName
    }
  } catch {}
  const sub: WorkoutSubmission = { date: todayKey(), tasks, timestamp: Date.now(), userName };
  const list = getWorkoutSubmissions();
  const existingIndex = list.findIndex(s => s.date === sub.date);
  if (existingIndex >= 0) list[existingIndex] = sub; else list.push(sub);
  try { localStorage.setItem(WORKOUT_KEY, JSON.stringify(list)); } catch {}
  return sub;
}

export function submitMeal(tasks: string[]): MealSubmission {
  let userName: string | undefined
  try {
    const profile = localStorage.getItem("profileData")
    if (profile) {
      const p = JSON.parse(profile)
      userName = p?.name || p?.fullName
    }
  } catch {}
  const sub: MealSubmission = { date: todayKey(), tasks, timestamp: Date.now(), userName };
  const list = getMealSubmissions();
  const existingIndex = list.findIndex(s => s.date === sub.date);
  if (existingIndex >= 0) list[existingIndex] = sub; else list.push(sub);
  try { localStorage.setItem(MEAL_KEY, JSON.stringify(list)); } catch {}
  return sub;
}
