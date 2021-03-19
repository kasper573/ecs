import { without } from "lodash";
import { System } from "../ecs/System";
import { createActions } from "../ecs-interactive/createActions";
import { InteractionMemory } from "../ecs-interactive/InteractionMemory";
import { Inventory } from "../ecs-collectable/Inventory";
import { describeAction } from "./describeAction";
import { describeEntities } from "./describeEntities";

export const describeSystem = (
  system: System,
  customDescribers: SystemDescribers = {}
) => {
  const { describeAction, describeEntities } = {
    ...defaultDescribers,
    ...customDescribers,
  };
  const parts: string[] = [];
  const memory = system.modules.findType(InteractionMemory);
  const lastResult = memory && memory[memory.length - 1];
  if (lastResult) {
    parts.push(lastResult);
  }
  const entitiesDescribed = describeEntities(getVisibleEntities(system));
  if (entitiesDescribed) {
    parts.push(entitiesDescribed);
  }
  const actions = createActions(system);
  if (actions.length) {
    const actionsDescribed = actions.map(describeAction).join("\n");
    parts.push(`Actions:\n${actionsDescribed}`);
  }
  return parts.join("\n");
};

const getVisibleEntities = (system: System) => {
  const inventory = system.modules.findType(Inventory);
  return inventory ? without(system.entities, ...inventory) : system.entities;
};

const defaultDescribers = { describeAction, describeEntities };

export type SystemDescribers = Partial<typeof defaultDescribers>;
