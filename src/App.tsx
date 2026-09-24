import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "./types/task";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { getTasks, saveTasks } from "./services/taskStorage";
import {
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "./utils/taskUtils";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>(getTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (title: string, description: string) => {
    const newTask = createTask(title, description);

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((currentTasks) => deleteTask(currentTasks, taskId));
  };

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    setTasks((currentTasks) => updateTaskStatus(currentTasks, taskId, status));
  };

  const handleUpdateTask = (
    taskId: string,
    title: string,
    description: string,
  ) => {
    setTasks((currentTasks) =>
      updateTask(currentTasks, taskId, title, description),
    );
  };

  return (
    <main className="app">
      <header className="app__header">
        <div>
          <p className="app__eyebrow">Organisation personnelle</p>
          <h1>Gestionnaire de tâches</h1>
          <p className="app__subtitle">
            Organise tes tâches, suis leur progression et garde une vue claire
            sur ton travail.
          </p>
        </div>
      </header>

      <section className="app__form">
        <TaskForm onAddTask={handleAddTask} />
      </section>

      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
        onUpdate={handleUpdateTask}
      />
    </main>
  );
}

export default App;
