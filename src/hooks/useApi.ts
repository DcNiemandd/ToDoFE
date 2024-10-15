import type { Task } from "../types.ts";
import { useFetch } from "./useFetch.ts";

export const useApi = (loc: string) => {
  const [get, put, remove] = useFetch(loc);

  const getAllTasks = () => get("/tasks");
  const getSpecificTask = (id: number) => get("/tasks/" + id);
  const setNewTask = (task: Omit<Task, "id">) => put("/tasks", task);
  const updateExistingTask = (task: Task) => put("/tasks/" + task.id, task);
  const removeTask = (id: number) => remove("/tasks/" + id);

  return {
    getAllTasks,
    getSpecificTask,
    setNewTask,
    updateExistingTask,
    removeTask,
  };
};
