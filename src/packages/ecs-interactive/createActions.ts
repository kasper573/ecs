import { System } from "../ecs/System";
import { Action } from "./Action";
import { Interactive } from "./Interactive";
import { InteractionMemory } from "./InteractionMemory";

export const createActions = (system: System) => {
  const actions: Action[] = [];
  for (const entity of system.entities) {
    for (const component of entity.components.filterType(Interactive)) {
      if (!component.isActive) {
        continue;
      }
      const name = component.action;
      if (name) {
        actions.push(
          wrapAction(system, {
            name,
            perform: () => component.perform() || undefined,
          })
        );
      }
    }
  }
  return actions;
};

/**
 * Wrapped actions can only perform once and will signal a system update once performed.
 */
const wrapAction = (system: System, { name, perform }: Action): Action => {
  let performed = false;
  return {
    name,
    perform: () => {
      if (performed) {
        throw new Error("Actions can only be performed once");
      }
      const result = perform();
      const memory = system.modules.findType(InteractionMemory);
      if (memory) {
        memory.push(result);
      }
      system.update();
      performed = true;
      return result;
    },
  };
};
