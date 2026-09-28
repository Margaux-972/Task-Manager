import { useState, type ChangeEvent } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onUpdate: (
    taskId: string,
    title: string,
    description: string,
    priority: TaskPriority,
  ) => void;
}

const taskStatuses: TaskStatus[] = ["todo", "in-progress", "done"];

function isTaskStatus(value: string): value is TaskStatus {
  return taskStatuses.includes(value as TaskStatus);
}

function TaskItem({ task, onDelete, onStatusChange, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority);

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

    onUpdate(task.id, title, description, editedPriority);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedPriority(task.priority);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article className="task-item task-item--editing">
        <div className="task-item__field">
          <label htmlFor={`title-${task.id}`}>Titre</label>

          <input
            id={`title-${task.id}`}
            type="text"
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
          />
        </div>

        <div className="task-item__field">
          <label htmlFor={`description-${task.id}`}>Description</label>

          <textarea
            id={`description-${task.id}`}
            value={editedDescription}
            onChange={(event) => setEditedDescription(event.target.value)}
          />
        </div>
        <div className="task-item__field">
          <label htmlFor={`priority-${task.id}`}>Priorité</label>

          <select
            id={`priority-${task.id}`}
            value={editedPriority}
            onChange={(event) =>
              setEditedPriority(event.target.value as TaskPriority)
            }
          >
            <option value="low">Faible</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </div>

        <div className="task-item__actions">
          <button className="task-item__save" onClick={handleSave}>
            Enregistrer
          </button>

          <button className="task-item__cancel" onClick={handleCancel}>
            Annuler
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className={`task-item task-item--${task.status}`}>
      <div className="task-item__content">
        <div className="task-item__header">
          <h2 className="task-item__title">{task.title}</h2>

          <div className="task-item__meta">
            <span className={`task-status task-status--${task.status}`}>
              {task.status === "todo" && "À faire"}
              {task.status === "in-progress" && "En cours"}
              {task.status === "done" && "Terminée"}
            </span>

            <span className="task-item__separator">•</span>

            <span className={`task-priority task-priority--${task.priority}`}>
              {task.priority === "low" && "Faible"}
              {task.priority === "medium" && "Moyenne"}
              {task.priority === "high" && "Haute"}
            </span>
          </div>
        </div>

        {task.description && (
          <p className="task-item__description">{task.description}</p>
        )}
      </div>

      <div className="task-item__footer">
        <div className="task-item__status">
          <label htmlFor={`status-${task.id}`}>Statut</label>

          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={handleStatusChange}
          >
            <option value="todo">À faire</option>
            <option value="in-progress">En cours</option>
            <option value="done">Terminée</option>
          </select>
        </div>

        <div className="task-item__actions">
          <button
            type="button"
            className="task-item__button task-item__button--edit"
            onClick={() => setIsEditing(true)}
          >
            Modifier
          </button>

          <button
            type="button"
            className="task-item__button task-item__button--delete"
            onClick={() => onDelete(task.id)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskItem;
