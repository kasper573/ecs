import { useReducer, useState } from "react";
import { World } from "../ecs/World";
import { performCommand } from "../ecs/performCommand";
import { Effect } from "../ecs/Effect";

export const useWorld = (world: World) => {
  const [lastEffect, setLastEffect] = useState<Effect | undefined>();
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const performAndSaveEffect = (command: string) => {
    const effect = performCommand(world, command);
    setLastEffect(effect);
    forceRender();
  };
  return {
    perform: performAndSaveEffect,
    lastEffect,
  };
};
