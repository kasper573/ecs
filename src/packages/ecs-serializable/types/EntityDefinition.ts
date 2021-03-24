import { ComponentInitializer } from "./ComponentInitializer";

export type EntityDefinitionId = Nominal<string, "EntityDefinitionId">;

export type EntityDefinition = {
  /**
   * uuid
   */
  id: EntityDefinitionId;
  /**
   * Used for presentation
   */
  name: string;
  /**
   * Components that will be inherited by all entity initializers
   */
  components: ComponentInitializer[];
};
