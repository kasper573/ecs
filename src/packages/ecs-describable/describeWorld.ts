import { World } from "../ecs/World";
import { createActions } from "../ecs-interactive/createActions";
import { Effect } from "../ecs-interactive/Effect";
import { describeEffect } from "./describeEffect";
import { describeAction } from "./describeAction";
import { describeEntities } from "./describeEntities";

export const describeWorld = (world: World, lastEffect?: Effect) => {
  const parts: string[] = [];
  if (lastEffect) {
    parts.push(describeEffect(lastEffect));
  }
  const entitiesDescribed = describeEntities(world.entities, world);
  if (entitiesDescribed) {
    parts.push(entitiesDescribed);
  }
  const actions = createActions(world);
  if (actions.length) {
    const actionsDescribed = actions
      .map((action) => `- ${describeAction(action)}`)
      .join("\n");
    parts.push(`Actions:\n${actionsDescribed}`);
  }
  return parts.join("\n");
};
