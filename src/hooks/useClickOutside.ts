// @deno-types="@types/react"
import { RefObject, useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  blockListening: boolean,
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current && event.target && !ref.current.contains(event.target as Node)
    ) {
      callback();
    }
  };

  useEffect(() => {
    if (!blockListening) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [blockListening]);
};
