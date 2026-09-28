import { useState, type FormEvent } from "react";
import type { TaskPriority } from "../../types/task";

interface TaskFormProps {
  onAddTask: (
    title: string,
    description: string,
    priority: TaskPriority,
  ) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAddTask(title.trim(), description.trim(), priority);

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__header">
        <p className="task-form__eyebrow">Nouvelle tâche</p>

        <h2>Créer une tâche</h2>

        <p className="task-form__description">
          Ajoute une nouvelle tâche à ton espace de travail.
        </p>
      </div>

      <div className="task-form__fields">
        <div className="task-form__field">
          <label htmlFor="title">Titre</label>

          <input
            id="title"
            type="text"
            value={title}
            placeholder="Ex. Préparer la présentation"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="task-form__field">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={description}
            placeholder="Ajoute quelques détails..."
            rows={4}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      </div>

      <div className="task-form__footer">
        <div className="task-form__priority">
          <label htmlFor="priority">Priorité</label>

          <select
            id="priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as TaskPriority)
            }
          >
            <option value="low">Faible</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </div>

        <button className="task-form__submit" type="submit">
          Créer la tâche
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
