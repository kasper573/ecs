import { ComponentInitializer } from "./ComponentInitializer";
import { LibraryNode } from "./LibraryNode";

export type EntityDefinitionId = Nominal<string, "EntityDefinitionId">;

export type EntityDefinition = LibraryNode & {
  /**
   * uuid
   */
  id: EntityDefinitionId;
  /**
   * Components that will be inherited by all entity initializers
   */
  components: ComponentInitializer[];
};
