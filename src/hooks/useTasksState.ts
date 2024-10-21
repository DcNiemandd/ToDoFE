import type { Task } from "../types.ts";
import { useApi } from "./useApi.ts";
// @deno-types="@types/react"
import { useEffect, useState } from "react";

export const useTasksState = (initialTasks?: Task[]) => {
  const api = useApi("api");

  const [tasks, setTasks] = useState<Task[]>(initialTasks ?? []);

  const fetchTasks = () => {
    api.getAllTasks().then((tasks) => setTasks(tasks)).catch(() =>
      setTasks([{ description: "NO TAST", id: 0, label: "", marked: true }])
    );
  };

  const markTask = (id: number, state: boolean) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      const newTask = { ...task, marked: state };
      setTasks(tasks.map((t) => t.id === id ? newTask : t));
      api.updateExistingTask(newTask);
    }
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    api.removeTask(id);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const setNewTask = (task: Task) => {
    console.log(`New task: ${JSON.stringify(task)}`);
    if (task.id > 0) {
      setTasks((prev) => {
        console.log("bef", prev);
        const newTasks = prev.map((t) => t.id === task.id ? task : t);
        console.log("af", newTasks);
        return newTasks;
      });
      api.updateExistingTask(task).then(() => {
        fetchTasks();
      });
    } else {
      setTasks((prev) => [...prev, task]);
      api.setNewTask(task).then(() => {
        fetchTasks();
      });
    }
  };

  return {
    markTask,
    removeTask,
    setNewTask,
    tasks,
  };
};
