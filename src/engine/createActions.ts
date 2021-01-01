import { Entity } from "./types/Entity";
import { Action } from "./types/Action";
import { Context } from "./types/Context";

export const createActions = (entities: Entity[]) => {
  const actions: Action[] = [];
  for (const entity of entities) {
    for (const trait of entity.traits) {
      const name = trait.createActionName(entity);
      if (name) {
        actions.push({
          name,
          perform: (context: Context) => trait.apply(context, entity),
        });
      }
    }
  }
  return actions;
};
