import type { TaskFilter, TaskPriorityFilter } from "../../types/task";

interface TaskFilterProps {
  filter: TaskFilter;
  priorityFilter: TaskPriorityFilter;
  counts: {
    all: number;
    todo: number;
    "in-progress": number;
    done: number;
  };
  onFilterChange: (filter: TaskFilter) => void;
  onPriorityFilterChange: (filter: TaskPriorityFilter) => void;
}

function TaskFilters({
  filter,
  priorityFilter,
  counts,
  onFilterChange,
  onPriorityFilterChange,
}: TaskFilterProps) {
  return (
    <section className="task-filters">
      <div className="task-filters__header">
        <p className="task-filters__eyebrow">Organisation</p>
        <h2>Afficher les tâches</h2>
      </div>

      <div className="task-filters__group">
        <span className="task-filters__label">Statut</span>

        <div className="task-filters__options">
          <button
            className={`task-filter ${
              filter === "all" ? "task-filter--active" : ""
            }`}
            onClick={() => onFilterChange("all")}
            aria-pressed={filter === "all"}
          >
            Toutes
            <span>{counts.all}</span>
          </button>

          <button
            className={`task-filter ${
              filter === "todo" ? "task-filter--active" : ""
            }`}
            onClick={() => onFilterChange("todo")}
            aria-pressed={filter === "todo"}
          >
            À faire
            <span>{counts.todo}</span>
          </button>

          <button
            className={`task-filter ${
              filter === "in-progress" ? "task-filter--active" : ""
            }`}
            onClick={() => onFilterChange("in-progress")}
            aria-pressed={filter === "in-progress"}
          >
            En cours
            <span>{counts["in-progress"]}</span>
          </button>

          <button
            className={`task-filter ${
              filter === "done" ? "task-filter--active" : ""
            }`}
            onClick={() => onFilterChange("done")}
            aria-pressed={filter === "done"}
          >
            Terminées
            <span>{counts.done}</span>
          </button>
        </div>
      </div>

      <div className="task-filters__group">
        <span className="task-filters__label">Priorité</span>

        <div className="task-filters__options">
          <button
            className={`task-filter ${
              priorityFilter === "all" ? "task-filter--active" : ""
            }`}
            onClick={() => onPriorityFilterChange("all")}
            aria-pressed={priorityFilter === "all"}
          >
            Toutes
          </button>

          <button
            className={`task-filter ${
              priorityFilter === "low" ? "task-filter--active" : ""
            }`}
            onClick={() => onPriorityFilterChange("low")}
            aria-pressed={priorityFilter === "low"}
          >
            Faible
          </button>

          <button
            className={`task-filter ${
              priorityFilter === "medium" ? "task-filter--active" : ""
            }`}
            onClick={() => onPriorityFilterChange("medium")}
            aria-pressed={priorityFilter === "medium"}
          >
            Moyenne
          </button>

          <button
            className={`task-filter ${
              priorityFilter === "high" ? "task-filter--active" : ""
            }`}
            onClick={() => onPriorityFilterChange("high")}
            aria-pressed={priorityFilter === "high"}
          >
            Haute
          </button>
        </div>
      </div>
    </section>
  );
}

export default TaskFilters;
