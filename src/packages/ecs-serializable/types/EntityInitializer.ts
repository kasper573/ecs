import { EntityDefinitionId } from "./EntityDefinition";

export type EntityInitializerId = Nominal<string, "EntityInitializerId">;

export type EntityInitializer = {
  /**
   * User specified locally unique id (within parent Scene).
   * Serves as name for presentation as well.
   */
  id: EntityInitializerId;
  definitionId: EntityDefinitionId;
};
