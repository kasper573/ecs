import { Effect } from "./Effect";

export const createUnknownCommandEffect = (command: string): Effect => ({
  description: `Could not "${command}"`,
});
