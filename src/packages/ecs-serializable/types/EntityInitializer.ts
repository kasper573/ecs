import { EntityDefinitionId } from "./EntityDefinition";
import { SystemDefinitionId } from "./SystemDefinition";
import { SceneDefinitionId } from "./SceneDefinition";
import { ComponentInitializer } from "./ComponentInitializer";

export type EntityInitializerId = Nominal<string, "EntityInitializerId">;

export type EntityInitializer = {
  /**
   * uuid
   */
  id: EntityInitializerId;
  /**
   * Used for presentation
   */
  name: string;
  /**
   * The entity definition this initializer references
   */
  definitionId: EntityDefinitionId;
  /**
   * The id of the system this entity belongs to
   */
  systemId: SystemDefinitionId;
  /**
   * The id of the scene this entity belongs to
   */
  sceneId: SceneDefinitionId;
  /**
   * Components specific for this entity initializer.
   * If an entity initializer wants to override the components of an entity definition,
   * add a component initializer with identical id and the two component initializers will be merged.
   */
  components: ComponentInitializer[];
};
