import type { TaskFilter } from "../../types/task";

interface TaskFilterProps {
  filter: TaskFilter;
  counts: {
    all: number;
    todo: number;
    "in-progress": number;
    done: number;
  };
  onFilterChange: (filter: TaskFilter) => void;
}

function TaskFilters({ filter, counts, onFilterChange }: TaskFilterProps) {
  return (
    <div>
      <button
        onClick={() => onFilterChange("all")}
        aria-pressed={filter === "all"}
      >
        Toutes ({counts.all})
      </button>

      <button
        onClick={() => onFilterChange("todo")}
        aria-pressed={filter === "todo"}
      >
        À faire ({counts.todo})
      </button>

      <button
        onClick={() => onFilterChange("in-progress")}
        aria-pressed={filter === "in-progress"}
      >
        En cours ({counts["in-progress"]})
      </button>

      <button
        onClick={() => onFilterChange("done")}
        aria-pressed={filter === "done"}
      >
        Terminées ({counts.done})
      </button>
    </div>
  );
}

export default TaskFilters;
