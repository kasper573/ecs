import { ComponentInitializer } from "./ComponentInitializer";

export type EntityDefinitionId = Nominal<string, "EntityDefinitionId">;

export type EntityDefinition = {
  /**
   * Automatically generated id (unique within parent System).
   */
  id: EntityDefinitionId;
  /**
   * User specified name (duplicates allowed).
   * Purely presentational.
   */
  name: string;
  components: ComponentInitializer[];
};
