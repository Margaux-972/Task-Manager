import "./App.css";
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import TaskFilters from "./components/TaskFilter/TaskFilters";
import { getTasks, saveTasks } from "./services/taskStorage";
import type { Task, TaskFilter, TaskStatus } from "./types/task";
import {
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "./utils/taskUtils";

function App() {
  const [tasks, setTasks] = useState<Task[]>(getTasks);
  const [filter, setFilter] = useState<TaskFilter>("all");

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

  const taskCounts = {
    all: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    "in-progress": tasks.filter((task) => task.status === "in-progress").length,
    done: tasks.filter((task) => task.status === "done").length,
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

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
      <TaskFilters
        filter={filter}
        counts={taskCounts}
        onFilterChange={setFilter}
      />

      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
        onUpdate={handleUpdateTask}
      />
    </main>
  );
}

export default App;
