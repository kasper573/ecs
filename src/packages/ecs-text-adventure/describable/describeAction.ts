import { Action } from "../interactive/Action";

export const describeAction = (action: Action, index: number) =>
  `- ${action.name}`;
