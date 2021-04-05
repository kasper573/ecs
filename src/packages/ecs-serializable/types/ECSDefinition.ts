import { SystemDefinition, SystemDefinitionId } from "./SystemDefinition";
import { EntityInitializer, EntityInitializerId } from "./EntityInitializer";
import { EntityDefinition, EntityDefinitionId } from "./EntityDefinition";
import { LibraryFolder, LibraryFolderId } from "./LibraryFolder";
import {
  ComponentDefinition,
  ComponentDefinitionId,
} from "./ComponentDefinition";

/**
 * An easily serializable entity component system.
 * (The entire data structure supports JSON.stringify and JSON.parse)
 */
export type ECSDefinition = {
  systems: Record<SystemDefinitionId, SystemDefinition>;
  entityInitializers: Record<EntityInitializerId, EntityInitializer>;
  entityDefinitions: Record<EntityDefinitionId, EntityDefinition>;
  componentDefinitions: Record<ComponentDefinitionId, ComponentDefinition>;
  libraryFolders: Record<LibraryFolderId, LibraryFolder>;
};
