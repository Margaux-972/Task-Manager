import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "./types/task";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { getTasks, saveTasks } from "./services/taskStorage";
import { deleteTask } from "./utils/taskUtils";

function App() {
  const [tasks, setTasks] = useState<Task[]>(getTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "todo",
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((currentTasks) => deleteTask(currentTasks, taskId));
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status,
          };
        }

        return task;
      }),
    );
  };

  const updateTask = (taskId: string, title: string, description: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            title,
            description,
          };
        }

        return task;
      }),
    );
  };

  return (
    <main>
      <h1>Gestionnaire de tâches</h1>

      <TaskForm onAddTask={addTask} />

      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onStatusChange={updateTaskStatus}
        onUpdate={updateTask}
      />
    </main>
  );
}

export default App;
