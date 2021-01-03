import { World } from "../ecs/World";
import { Action } from "./Action";
import { Interactive } from "./Interactive";

export const createActions = (world: World) => {
  const actions: Action[] = [];
  for (const entity of world.entities) {
    for (const component of entity
      .getComponents(world)
      .filterType(Interactive)) {
      if (!component.isActive(entity, world)) {
        continue;
      }
      const name = component.action(entity, world);
      if (name) {
        actions.push({
          name,
          perform: (world: World) =>
            component.apply(entity, world) || undefined,
        });
      }
    }
  }
  return actions;
};
