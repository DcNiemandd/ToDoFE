// @deno-types="@types/react"
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { useApi } from "./useApi.ts";
import { useTasksState } from "./useTasksState.ts";

const InjectorContext = createContext<
  {
    state: ReturnType<typeof useTasksState>;
  }
> // deno-lint-ignore no-explicit-any
({} as any);

export const InjectorProvider: FC<PropsWithChildren> = (
  { children },
) => {
  const state = useTasksState();
  const value = {
    state,
  };

  return (
    <InjectorContext.Provider value={value}>
      {children}
    </InjectorContext.Provider>
  );
};

export const useInjector = () => {
  const context = useContext(InjectorContext);

  if (!context) {
    throw new Error("useInjector must be used within a InjectorProvider");
  }

  return context;
};
