import { World } from "../ecs/World";
import { describeEffect } from "./describeEffect";
import { describeAction } from "./describeAction";
import { describeEntities } from "./describeEntities";
import { createActions } from "../ecs/createActions";
import { Effect } from "../ecs/Effect";

export const describeWorld = (world: World, lastEffect?: Effect) => {
  const { entities } = world;
  const parts: string[] = [];
  if (lastEffect) {
    parts.push(describeEffect(lastEffect));
  }
  const entitiesDescribed = describeEntities(entities, world);
  if (entitiesDescribed) {
    parts.push(entitiesDescribed);
  }
  const actions = createActions(entities, world);
  if (actions.length) {
    const actionsDescribed = actions
      .map((action) => `- ${describeAction(action)}`)
      .join("\n");
    parts.push(`Actions:\n${actionsDescribed}`);
  }
  return parts.join("\n");
};
