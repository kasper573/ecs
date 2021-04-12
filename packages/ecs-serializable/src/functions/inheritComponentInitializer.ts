import { ComponentInitializer } from "../definition/ComponentInitializer";

export const inheritComponentInitializer = ({
  id,
  definitionId,
}: ComponentInitializer) => ({
  id,
  definitionId,
  // Reset properties since initializer properties
  // are only used to override definition properties
  properties: {},
});
