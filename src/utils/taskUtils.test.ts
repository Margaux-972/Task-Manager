import { describe, expect, it } from "vitest";
import type { Task } from "../types/task";
import {
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "./taskUtils";

const tasks: Task[] = [
  {
    id: "1",
    title: "A",
    description: "",
    status: "todo",
    createdAt: "2026-01-01",
  },
  {
    id: "2",
    title: "B",
    description: "",
    status: "in-progress",
    createdAt: "2026-01-02",
  },
  {
    id: "3",
    title: "C",
    description: "",
    status: "done",
    createdAt: "2026-01-03",
  },
];

describe("deleteTask", () => {
  it("supprime la tâche demandée", () => {
    const result = deleteTask(tasks, "2");

    expect(result.some((task) => task.id === "2")).toBe(false);
  });

  it("conserve les autres tâches", () => {
    const result = deleteTask(tasks, "2");

    expect(result.map((task) => task.id)).toEqual(["1", "3"]);
  });

  it("ne modifie pas le tableau original", () => {
    const result = deleteTask(tasks, "2");

    expect(tasks).toHaveLength(3);
    expect(result).not.toBe(tasks);
  });

  it("ne supprime rien si l'identifiant n'existe pas", () => {
    const result = deleteTask(tasks, "999");

    expect(result).toEqual(tasks);
    expect(result).not.toBe(tasks);
  });
});

describe("createTask", () => {
  it("crée une tâche avec les bonnes informations", () => {
    const task = createTask("Apprendre Vitest", "Écrire mes premiers tests");

    expect(task.title).toBe("Apprendre Vitest");
    expect(task.description).toBe("Écrire mes premiers tests");
    expect(task.id).toBeTruthy();
    expect(task.createdAt).toBeTruthy();
  });

  it("crée une tâche avec le statut todo", () => {
    const task = createTask("Apprendre Vitest", "Écrire mes premiers tests");

    expect(task.status).toBe("todo");
  });

  it("génère un identifiant unique", () => {
    const task1 = createTask("Tâche 1", "");
    const task2 = createTask("Tâche 2", "");

    expect(task1.id).not.toBe(task2.id);
  });
});

describe("updateTaskStatus", () => {
  it("modifie le statut de la tâche demandée", () => {
    const result = updateTaskStatus(tasks, "2", "done");

    const updatedTask = result.find((task) => task.id === "2");

    expect(updatedTask?.status).toBe("done");
  });

  it("conserve les autres propriétés de la tâche", () => {
    const result = updateTaskStatus(tasks, "2", "done");

    const updatedTask = result.find((task) => task.id === "2");

    expect(updatedTask).toEqual({
      id: "2",
      title: "B",
      description: "",
      status: "done",
      createdAt: "2026-01-02",
    });
  });

  it("conserve les autres tâches", () => {
    const result = updateTaskStatus(tasks, "2", "done");

    expect(result.find((task) => task.id === "1")).toEqual(tasks[0]);
    expect(result.find((task) => task.id === "3")).toEqual(tasks[2]);
  });

  it("ne modifie pas le tableau original", () => {
    const result = updateTaskStatus(tasks, "2", "done");

    expect(tasks[1].status).toBe("in-progress");
    expect(result).not.toBe(tasks);
  });
});

describe("updateTask", () => {
  it("modifie le titre et la description", () => {
    const result = updateTask(
      tasks,
      "2",
      "Nouvelle tâche",
      "Nouvelle description",
    );

    const updatedTask = result.find((task) => task.id === "2");

    expect(updatedTask?.title).toBe("Nouvelle tâche");
    expect(updatedTask?.description).toBe("Nouvelle description");
  });

  it("conserve les autres propriétés de la tâche", () => {
    const result = updateTask(
      tasks,
      "2",
      "Nouvelle tâche",
      "Nouvelle description",
    );

    const updatedTask = result.find((task) => task.id === "2");

    expect(updatedTask).toEqual({
      id: "2",
      title: "Nouvelle tâche",
      description: "Nouvelle description",
      status: "in-progress",
      createdAt: "2026-01-02",
    });
  });

  it("conserve les autres tâches", () => {
    const result = updateTask(
      tasks,
      "2",
      "Nouvelle tâche",
      "Nouvelle description",
    );

    expect(result.find((task) => task.id === "1")).toEqual(tasks[0]);
    expect(result.find((task) => task.id === "3")).toEqual(tasks[2]);
  });

  it("ne modifie pas le tableau original", () => {
    const result = updateTask(
      tasks,
      "2",
      "Nouvelle tâche",
      "Nouvelle description",
    );

    expect(tasks[1].title).toBe("B");
    expect(tasks[1].description).toBe("");
    expect(result).not.toBe(tasks);
  });
});
