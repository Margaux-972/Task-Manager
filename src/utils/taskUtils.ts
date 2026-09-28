import type { Task, TaskPriority, TaskStatus } from "../types/task";

export function createTask(
  title: string,
  description: string,
  priority: TaskPriority,
): Task {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    status: "todo",
    priority,
    createdAt: new Date().toISOString(),
  };
}

export function deleteTask(tasks: Task[], taskId: string): Task[] {
  return tasks.filter((task) => task.id !== taskId);
}

export function updateTaskStatus(
  tasks: Task[],
  taskId: string,
  status: TaskStatus,
): Task[] {
  return tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        status,
      };
    }

    return task;
  });
}

export function updateTask(
  tasks: Task[],
  taskId: string,
  title: string,
  description: string,
  priority: TaskPriority,
): Task[] {
  return tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        title,
        description,
        priority,
      };
    }

    return task;
  });
}
