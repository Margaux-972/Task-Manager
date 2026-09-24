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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <button type="submit">Créer la tâche</button>
    </form>
  );
}

export default TaskForm;
