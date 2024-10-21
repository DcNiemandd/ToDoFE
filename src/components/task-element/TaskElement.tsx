// @deno-types="@types/react"
import { FC, MouseEventHandler, useState } from "react";
import { Task } from "../../types.ts";

import "./TaskElement.scss";
import { NewTask } from "../new-task/NewTask.tsx";

export const TaskElement: FC<{
  task: Task;
  mark?: MouseEventHandler;
  delete?: MouseEventHandler;
}> = (props) => {
  const [editing, setEditing] = useState(false);

  return (
    editing
      ? (
        <NewTask
          taskToEdit={props.task}
          onBlur={() => setEditing(false)}
          onSubmit={() => setEditing(false)}
        >
        </NewTask>
      )
      : (
        <div className="task">
          <div
            className={`checkbox ${props.task.marked ? "marked" : ""}`}
            onClick={props.mark}
          >
          </div>
          <div className="texts">
            <h3 className="label">{props.task.label}</h3>
            <p>{props.task.description}</p>
          </div>
          <div className="control">
            <div
              className={`edit`}
              onClick={() => setEditing(true)}
            >
            </div>
            <div
              className={`remove`}
              onClick={props.delete}
            >
            </div>
          </div>
        </div>
      )
  );
};
