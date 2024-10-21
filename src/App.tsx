// @deno-types="@types/react"
import "./App.scss";
import { NewTask } from "./components/new-task/NewTask.tsx";
import { TaskElement } from "./components/task-element/TaskElement.tsx";
import { useInjector } from "./hooks/useInjector.tsx";

function App() {
  const { state } = useInjector();

  return (
    <>
      <h1>Your tasks</h1>
      <div className="tasks">
        {state.tasks.map((task) => (
          <TaskElement
            task={task}
            key={task.id}
            mark={() => state.markTask(task.id, !task.marked)}
            delete={() => state.removeTask(task.id)}
          >
          </TaskElement>
        ))}
      </div>
      <h2>Add new task</h2>
      <NewTask />
    </>
  );
}

export default App;
