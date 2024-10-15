// @deno-types="@types/react"
import { FC, MouseEventHandler } from "react";
import { Task } from "../../types.ts";

import "./TaskElement.scss";

export const TaskElement: FC<{
  task: Task;
  mark?: MouseEventHandler;
  delete?: MouseEventHandler;
}> = (props) => {
  return (
    <div className="task">
      <div className="texts">
        <h3 className="label">{props.task.label}</h3>
        <p>{props.task.description}</p>
      </div>
      <div className="control">
        <div
          className={`checkbox ${props.task.marked ? "marked" : ""}`}
          onClick={props.mark}
        >
        </div>
        <div
          className={`remove`}
          onClick={props.delete}
        >
        </div>
      </div>
    </div>
  );
};
