import { SystemDefinition, SystemDefinitionId } from "./SystemDefinition";
import { EntityInitializer, EntityInitializerId } from "./EntityInitializer";
import { LibraryNode, LibraryNodeId } from "./LibraryNode";
import { SceneDefinition, SceneDefinitionId } from "./SceneDefinition";

/**
 * An easily serializable entity component system.
 * (The entire data structure supports JSON.stringify and JSON.parse)
 */
export type SerializableECS = {
  systems: Record<SystemDefinitionId, SystemDefinition>;
  scenes: Record<SceneDefinitionId, SceneDefinition>;
  entities: Record<EntityInitializerId, EntityInitializer>;
  library: Record<LibraryNodeId, LibraryNode>;
};
