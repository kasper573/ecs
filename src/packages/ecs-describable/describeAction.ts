import { Action } from "../ecs-interactive/Action";

export const describeAction = (action: Action, index: number) =>
  `- ${action.name}`;
