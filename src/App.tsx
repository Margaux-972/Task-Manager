import "./App.css";
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import TaskFilters from "./components/TaskFilter/TaskFilters";
import { getTasks, saveTasks } from "./services/taskStorage";
import type {
  Task,
  TaskFilter,
  TaskPriority,
  TaskPriorityFilter,
  TaskStatus,
} from "./types/task";

import {
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "./utils/taskUtils";

function App() {
  const [tasks, setTasks] = useState<Task[]>(getTasks);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [priorityFilter, setPriorityFilter] =
    useState<TaskPriorityFilter>("all");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (
    title: string,
    description: string,
    priority: TaskPriority,
  ) => {
    const newTask = createTask(title, description, priority);

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
    priority: TaskPriority,
  ) => {
    setTasks((currentTasks) =>
      updateTask(currentTasks, taskId, title, description, priority),
    );
  };

  const taskCounts = {
    all: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    "in-progress": tasks.filter((task) => task.status === "in-progress").length,
    done: tasks.filter((task) => task.status === "done").length,
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filter === "all" || task.status === filter;

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

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
        priorityFilter={priorityFilter}
        counts={taskCounts}
        onFilterChange={setFilter}
        onPriorityFilterChange={setPriorityFilter}
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
