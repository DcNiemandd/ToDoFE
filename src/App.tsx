// @deno-types="@types/react"
import { useEffect, useState } from "react";
import "./App.scss";
import { useInjector } from "./hooks/useInjector.tsx";
import type { Task } from "./types.ts";
import { TaskElement } from "./components/task-element/TaskElement.tsx";
import { NewTask } from "./components/new-task/NewTask.tsx";

function App() {
  const { api } = useInjector();

  const [tasks, setTasks] = useState<Task[]>([]);

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
    api.setNewTask(task).then(() => {
      fetchTasks();
    });
  };

  return (
    <>
      <h1>Your tasks</h1>
      <div className="tasks">
        {tasks.map((task) => (
          <TaskElement
            task={task}
            key={task.id}
            mark={() => markTask(task.id, !task.marked)}
            delete={() => removeTask(task.id)}
          >
          </TaskElement>
        ))}
      </div>
      <NewTask
        onSubmit={setNewTask}
      >
      </NewTask>
    </>
  );
}

export default App;
