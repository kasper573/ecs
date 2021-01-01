import { Action } from "./types/Action";

export const interpretCommand = (command: string, actions: Action[]) =>
  actions.find((action) => action.name === command);
