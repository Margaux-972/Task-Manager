export type TaskStatus = "todo" | "in-progress" | "done";

export type TaskFilter = "all" | TaskStatus;

export type TaskPriority = "low" | "medium" | "high";

export type TaskPriorityFilter = "all" | TaskPriority;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}
