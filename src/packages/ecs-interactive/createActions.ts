import { System } from "../ecs/System";
import { Action } from "./Action";
import { Interactive } from "./Interactive";

export const createActions = (system: System) => {
  const actions: Action[] = [];
  for (const entity of system.entities) {
    for (const component of entity
      .getComponents(system)
      .filterType(Interactive)) {
      if (!component.isActive(entity, system)) {
        continue;
      }
      const name = component.action(entity, system);
      if (name) {
        actions.push({
          name,
          perform: (system: System) =>
            component.apply(entity, system) || undefined,
        });
      }
    }
  }
  return actions;
};
