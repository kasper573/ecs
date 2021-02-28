import { ComponentDefinitionId } from "./ComponentDefinition";
import { ComponentOptionsDefinition } from "./ComponentOptionsDefinition";

export type ComponentInitializer = {
  definitionId: ComponentDefinitionId;
  options?: ComponentOptionsDefinition;
};
