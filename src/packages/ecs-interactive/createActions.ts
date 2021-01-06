import { System } from "../ecs/System";
import { Action } from "./Action";
import { Interactive } from "./Interactive";

export const createActions = <SystemState>(system: System<SystemState>) => {
  const actions: Action[] = [];
  for (const entity of system.entities) {
    for (const component of entity.findComponents(Interactive)) {
      if (!component.isActive()) {
        continue;
      }
      const name = component.action;
      if (name) {
        actions.push(
          wrapAction(system, {
            name,
            perform: () => component.apply() || undefined,
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
const wrapAction = <SystemState>(
  system: System<SystemState>,
  { name, perform }: Action
): Action => {
  let performed = false;
  return {
    name,
    perform: () => {
      if (performed) {
        throw new Error("Actions can only be performed once");
      }
      const result = perform();
      system.update();
      performed = true;
      return result;
    },
  };
};
