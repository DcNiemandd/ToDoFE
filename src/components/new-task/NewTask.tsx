// @deno-types="@types/react"
import {
  FC,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
} from "react";
import "./NewTask.scss";
import type { Task } from "../../types.ts";
import { useInjector } from "../../hooks/useInjector.tsx";
import { useClickOutside } from "../../hooks/useClickOutside.ts";

export const NewTask: FC<{
  taskToEdit?: Task;
  onBlur?: () => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}> = (props) => {
  const { state } = useInjector();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (props.onSubmit && props.onSubmit(e)) {
      return;
    }

    e.preventDefault();
    const description = e.currentTarget.description.value;
    const label = e.currentTarget.label.value;

    const newTask: Task = {
      description,
      label,
      marked: props.taskToEdit?.marked ?? false,
      id: props.taskToEdit?.id ?? -1,
    };

    state.setNewTask(newTask);

    e.currentTarget.description.value = "";
    e.currentTarget.label.value = "";
  };

  useEffect(() => {
    if (props.taskToEdit && formRef.current) {
      formRef.current.label.value = props.taskToEdit.label;
      formRef.current.description.value = props.taskToEdit.description;
      formRef.current.focus();
    }
  }, [props]);

  useClickOutside(formRef, () => {
    props.onBlur && props.onBlur();
  }, !props.taskToEdit);

  return (
    <form
      ref={formRef}
      className="new-task-container"
      onSubmit={onSubmit}
    >
      <div className="form-item task-label">
        <label htmlFor="label">Label</label>
        <input type="text" name="label" minLength={1} />
      </div>
      <div className="form-item task-description">
        <label htmlFor="description">Description</label>
        <input type="text" name="description" minLength={1} />
      </div>
      <button type="submit" className="task-submit">
        {props.taskToEdit ? "Save" : "Add task"}
      </button>
    </form>
  );
};
