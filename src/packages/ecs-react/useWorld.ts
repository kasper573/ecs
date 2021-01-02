import { useReducer } from "react";
import { World } from "../ecs/World";
import { performCommand } from "../ecs/performCommand";

export const useWorld = (world: World) => {
  const [, forceRender] = useReducer((s) => s + 1, 0);
  return (command: string) => {
    performCommand(world, command);
    forceRender();
  };
};
