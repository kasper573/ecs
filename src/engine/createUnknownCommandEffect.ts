import { Effect } from "./types/Effect";

export const createUnknownCommandEffect = (command: string): Effect => ({
  description: `Could not "${command}"`,
});
