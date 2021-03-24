import { SystemDefinition } from "../types/SystemDefinition";

export const createSystemDefinition = (
  props: SystemDefinition
): SystemDefinition => ({
  ...props,
});
