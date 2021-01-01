import { Game } from "../types/Game";
import { describeEffect } from "./describeEffect";
import { describeAction } from "./describeAction";
import { describeEntity } from "./describeEntity";
import { createActions } from "../createActions";

export const describeGame = ({ effect, entities }: Game) => {
  let str = "";
  if (effect) {
    str += describeEffect(effect) + "\n";
  }
  if (entities.length) {
    str += entities.map(describeEntity).join("\n") + "\n";
  }
  const actions = createActions(entities);
  if (actions.length) {
    str += `Actions:\n${actions
      .map((action) => `- ${describeAction(action)}`)
      .join("\n")}`;
  }
  return str;
};
