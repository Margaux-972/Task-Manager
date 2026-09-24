import type { Task } from "../types/task";

const STORAGE_KEY = "tasks";

export function getTasks(): Task[] {
  const value = localStorage.getItem(STORAGE_KEY);

  if (value === null) {
    return [];
  }

  try {
    return JSON.parse(value) as Task[];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
