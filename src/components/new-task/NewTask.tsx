// @deno-types="@types/react"
import { FC } from "react";
import "./NewTask.scss";
import type { Task } from "../../types.ts";

export const NewTask: FC<{
  onSubmit: (task: Task) => void;
}> = (props) => {
  // TODO: Form for adding task
  return (
    <div className="new-task-container">
    </div>
  );
};
