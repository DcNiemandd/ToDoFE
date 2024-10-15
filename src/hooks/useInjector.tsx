// @deno-types="@types/react"
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { useApi } from "./useApi.ts";

const InjectorContext = createContext<
  {
    api: ReturnType<typeof useApi>;
  }
> // deno-lint-ignore no-explicit-any
({} as any);

export const InjectorProvider: FC<PropsWithChildren> = (
  { children },
) => {
  const api = useApi("api");

  const value = {
    api,
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
