import { useState, type ChangeEvent } from "react";
import type { Task, TaskStatus } from "../../types/task";

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onUpdate: (taskId: string, title: string, description: string) => void;
}

const taskStatuses: TaskStatus[] = ["todo", "in-progress", "done"];

function isTaskStatus(value: string): value is TaskStatus {
  return taskStatuses.includes(value as TaskStatus);
}

function TaskItem({ task, onDelete, onStatusChange, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;

    if (isTaskStatus(newStatus)) {
      onStatusChange(task.id, newStatus);
    }
  };

  const handleSave = () => {
    const title = editedTitle.trim();
    const description = editedDescription.trim();

    if (!title) {
      return;
    }

    onUpdate(task.id, title, description);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article>
        <input
          type="text"
          value={editedTitle}
          onChange={(event) => setEditedTitle(event.target.value)}
        />

        <textarea
          value={editedDescription}
          onChange={(event) => setEditedDescription(event.target.value)}
        />

        <button onClick={handleSave}>Enregistrer</button>

        <button onClick={handleCancel}>Annuler</button>
      </article>
    );
  }

  return (
    <article>
      <h2>{task.title}</h2>

      <p>{task.description}</p>

      <label htmlFor={`status-${task.id}`}>Statut :</label>

      <select
        id={`status-${task.id}`}
        value={task.status}
        onChange={handleStatusChange}
      >
        <option value="todo">À faire</option>
        <option value="in-progress">En cours</option>
        <option value="done">Terminée</option>
      </select>

      <button onClick={() => setIsEditing(true)}>Modifier</button>

      <button onClick={() => onDelete(task.id)}>Supprimer</button>
    </article>
  );
}

export default TaskItem;
