import { useReducer, useState } from "react";
import { System } from "../ecs/System";
import { performCommand } from "../ecs-interactive/performCommand";
import { Effect } from "../ecs-interactive/Effect";

export const useSystem = (system: System) => {
  const [lastEffect, setLastEffect] = useState<Effect | undefined>();
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const performAndSaveEffect = (command: string) => {
    const effect = performCommand(system, command);
    setLastEffect(effect);
    forceRender();
  };
  return {
    perform: performAndSaveEffect,
    lastEffect,
  };
};
