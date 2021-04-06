import { System } from "../../ecs/System";
import { interpretCommand } from "./interpretCommand";
import { createUnknownCommandResult } from "./createUnknownCommandResult";
import { createActions } from "./createActions";

export const performCommand = (system: System, command: string) => {
  const action = interpretCommand(command, createActions(system));
  return action ? action.perform() : createUnknownCommandResult(command);
};
