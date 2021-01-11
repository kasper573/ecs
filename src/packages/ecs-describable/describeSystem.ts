import { System } from "../ecs/System";
import { createActions } from "../ecs-interactive/createActions";
import { InteractionMemory } from "../ecs-interactive/InteractionMemory";
import { describeAction } from "./describeAction";
import { describeEntities } from "./describeEntities";

export const describeSystem = (system: System) => {
  const parts: string[] = [];
  const memory = system.modules.findType(InteractionMemory);
  const lastResult = memory && memory[memory.length - 1];
  if (lastResult) {
    parts.push(lastResult);
  }
  const entitiesDescribed = describeEntities(system.entities);
  if (entitiesDescribed) {
    parts.push(entitiesDescribed);
  }
  const actions = createActions(system);
  if (actions.length) {
    const actionsDescribed = actions
      .map((action) => `- ${describeAction(action)}`)
      .join("\n");
    parts.push(`Actions:\n${actionsDescribed}`);
  }
  return parts.join("\n");
};
