import { Entity } from "./types/Entity";
import { Action } from "./types/Action";
import { World } from "./types/World";

export const createActions = (entities: Entity[], world: World) => {
  const actions: Action[] = [];
  for (const entity of entities) {
    for (const component of entity.getComponents(world)) {
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
