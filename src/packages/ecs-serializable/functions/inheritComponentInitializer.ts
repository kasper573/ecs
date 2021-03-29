import { ComponentInitializer } from "../types/ComponentInitializer";
import { createComponentPropertiesDefinition } from "./createComponentPropertiesDefinition";

export const inheritComponentInitializer = ({
  id,
  definitionId,
}: ComponentInitializer) => ({
  id,
  definitionId,
  // Reset properties since initializer properties
  // are only used to override definition properties
  properties: createComponentPropertiesDefinition({}),
});
