import { Action } from "./Action";

export const interpretCommand = (command: string, actions: Action[]) =>
  actions.find((action) => action.name.toLowerCase() === command.toLowerCase());
