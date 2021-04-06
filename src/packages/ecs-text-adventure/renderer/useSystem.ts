import { useReducer } from "react";
import { System } from "../../ecs/System";
import { useSystemUpdate } from "./useSystemUpdate";

/**
 * Updates component whenever the specified system changes or updates.
 */
export const useSystem = (system: System) => {
  const [, refresh] = useReducer(inc, 0);
  useSystemUpdate(system, refresh);
};

const inc = (n: number) => n + 1;
