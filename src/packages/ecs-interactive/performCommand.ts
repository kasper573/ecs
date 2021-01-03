import { System } from "../ecs/System";
import { interpretCommand } from "./interpretCommand";
import { createUnknownCommandEffect } from "./createUnknownCommandEffect";
import { createActions } from "./createActions";

export const performCommand = (system: System, command: string) => {
  const action = interpretCommand(command, createActions(system));
  return action ? action.perform(system) : createUnknownCommandEffect(command);
};
