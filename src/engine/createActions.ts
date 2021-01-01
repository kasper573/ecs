import { Entity } from "./types/Entity";
import { Action } from "./types/Action";
import { Context } from "./types/Context";

export const createActions = (entities: Entity[], context: Context) => {
  const actions: Action[] = [];
  for (const entity of entities) {
    for (const trait of entity.getTraits(context)) {
      if (!trait.isActive(entity, context)) {
        continue;
      }
      const name = trait.action(entity, context);
      if (name) {
        actions.push({
          name,
          perform: (context: Context) =>
            trait.apply(entity, context) || undefined,
        });
      }
    }
  }
  return actions;
};
