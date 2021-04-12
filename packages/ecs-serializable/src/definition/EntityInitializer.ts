import { EntityDefinitionId } from "./EntityDefinition";
import { SystemDefinitionId } from "./SystemDefinition";
import { ComponentInitializer } from "./ComponentInitializer";

export type EntityInitializerId = NominalString<"EntityInitializerId">;

export type EntityInitializer = {
  /**
   * uuid
   */
  id: EntityInitializerId;
  /**
   * uuid
   */
  parentId?: EntityInitializerId;
  /**
   * The sort order among its siblings. Undefined means 0.
   */
  order: number;
  /**
   * Used for presentation
   */
  name: string;
  /**
   * Controls Entity.isActive if set to true or false
   */
  isActive?: boolean;
  /**
   * The entity definition this initializer references
   */
  definitionId?: EntityDefinitionId;
  /**
   * The id of the system this entity belongs to
   */
  systemId: SystemDefinitionId;
  /**
   * Components specific for this entity initializer.
   * If an entity initializer wants to override the components of an entity definition,
   * add a component initializer with identical id and the two component initializers will be merged.
   */
  components: ComponentInitializer[];
};
