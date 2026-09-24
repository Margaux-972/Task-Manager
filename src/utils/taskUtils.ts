import type { Task, TaskStatus } from "../types/task";

export function createTask(title: string, description: string): Task {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    status: "todo",
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
): Task[] {
  return tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        title,
        description,
      };
    }

    return task;
  });
}
