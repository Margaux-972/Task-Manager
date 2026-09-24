import type { Task, TaskStatus } from "../../types/task";
import TaskItem from "../TaskItem/TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onUpdate: (taskId: string, title: string, description: string) => void;
}

function TaskList({
  tasks,
  onDelete,
  onStatusChange,
  onUpdate,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <section className="task-list task-list--empty">
        <h2>Aucune tâche</h2>
        <p>Commence par créer ta première tâche.</p>
      </section>
    );
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onUpdate={onUpdate}
        />
      ))}
    </section>
  );
}

export default TaskList;
