import { System } from "../ecs/System";
import { createActions } from "../ecs-interactive/createActions";
import { InteractionResult } from "../ecs-interactive/InteractionResult";
import { describeAction } from "./describeAction";
import { describeEntities } from "./describeEntities";

export const describeSystem = <SystemState>(
  system: System<SystemState>,
  lastResult?: InteractionResult
) => {
  const parts: string[] = [];
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
