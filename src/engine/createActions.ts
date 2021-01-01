import { Entity } from "./types/Entity";
import { Action } from "./types/Action";
import { World } from "./types/World";

export const createActions = (entities: Entity[], world: World) => {
  const actions: Action[] = [];
  for (const entity of entities) {
    for (const trait of entity.getTraits(world)) {
      if (!trait.isActive(entity, world)) {
        continue;
      }
      const name = trait.action(entity, world);
      if (name) {
        actions.push({
          name,
          perform: (world: World) => trait.apply(entity, world) || undefined,
        });
      }
    }
  }
  return actions;
};
