import { World } from "../ecs/World";
import { describeEffect } from "./describeEffect";
import { describeAction } from "./describeAction";
import { describeEntities } from "./describeEntities";
import { createActions } from "../ecs/createActions";

export const describeWorld = (world: World) => {
  const { effect, entities } = world;
  const parts: string[] = [];
  if (effect) {
    parts.push(describeEffect(effect));
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
