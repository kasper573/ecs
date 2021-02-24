import { useEffect, useReducer } from "react";
import { System } from "../ecs/System";

export const useSystem = (system: System) => {
  const [, refresh] = useReducer((n) => n + 1, 0);
  useEffect(() => {
    const updateModule = {
      update: refresh,
    };
    system.modules.push(updateModule);
    return () => {
      system.modules.remove(updateModule);
    };
  }, [system]);
};
