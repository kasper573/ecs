import { InteractionResult } from "./InteractionResult";

export const createUnknownCommandResult = (
  command: string
): InteractionResult => `Could not "${command}"`;
