import { EntityDefinitionId } from "./EntityDefinition";

export type EntityInitializerId = Nominal<string, "EntityInitializerId">;

export type EntityInitializer = {
  /**
   * Automatically generated locally unique id (within parent Scene).
   */
  id: EntityInitializerId;
  /**
   * User specified name
   */
  name: string;
  definitionId: EntityDefinitionId;
};
