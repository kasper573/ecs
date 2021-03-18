import { ComponentDefinitionId } from "./ComponentDefinition";
import { ComponentOptionsDefinition } from "./ComponentOptionsDefinition";

export type ComponentInitializerId = Nominal<string, "ComponentInitializerId">;

export type ComponentInitializer = {
  /**
   * Automatically generated id (unique within parent System).
   */
  id: ComponentInitializerId;
  definitionId: ComponentDefinitionId;
  options: ComponentOptionsDefinition;
};
