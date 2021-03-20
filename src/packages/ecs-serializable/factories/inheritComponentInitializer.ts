import { ComponentInitializer } from "../types/ComponentInitializer";
import { createComponentInitializer } from "./createComponentInitializer";
import { createComponentPropertiesDefinition } from "./createComponentPropertiesDefinition";

export const inheritComponentInitializer = ({
  id,
  definitionId,
}: ComponentInitializer) =>
  createComponentInitializer({
    id,
    definitionId,
    // Reset properties since initializer properties
    // are only used to override definition properties
    properties: createComponentPropertiesDefinition({}),
  });
