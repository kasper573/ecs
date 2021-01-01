import { Game } from "../types/Game";
import { describeEffect } from "./describeEffect";
import { describeAction } from "./describeAction";
import { describeEntities } from "./describeEntities";
import { createActions } from "../createActions";

export const describeGame = ({ effect, entities, context }: Game) => {
  let str = "";
  if (effect) {
    str += describeEffect(effect) + "\n";
  }
  if (entities.length) {
    str += describeEntities(entities, context) + "\n";
  }
  const actions = createActions(entities, context);
  if (actions.length) {
    str += `Actions:\n${actions
      .map((action) => `- ${describeAction(action)}`)
      .join("\n")}`;
  }
  return str;
};
