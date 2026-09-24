import { useState, type FormEvent } from "react";

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAddTask(title.trim(), description.trim());

    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__header">
        <h2>Créer une tâche</h2>
        <p>Ajoute une nouvelle tâche à ton espace de travail.</p>
      </div>

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

      <button className="task-form__submit" type="submit">
        Créer la tâche
      </button>
    </form>
  );
}

export default TaskForm;
