import { World } from "../ecs/World";
import { interpretCommand } from "./interpretCommand";
import { createUnknownCommandEffect } from "./createUnknownCommandEffect";
import { createActions } from "./createActions";

export const performCommand = (world: World, command: string) => {
  const action = interpretCommand(command, createActions(world));
  return action ? action.perform(world) : createUnknownCommandEffect(command);
};
