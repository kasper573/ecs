import { interpretCommand } from "./interpretCommand";
import { createUnknownCommandEffect } from "./createUnknownCommandEffect";
import { World } from "./World";

export const performCommand = (world: World, command: string) => {
  const action = interpretCommand(command, world.actions);
  return (world.effect = action
    ? action.perform(world)
    : createUnknownCommandEffect(command));
};
