import { ECSDefinition } from "../types/ECSDefinition";
import {
  ComponentDefinition,
  ComponentDefinitionId,
} from "../types/ComponentDefinition";
import { SceneDefinition, SceneDefinitionId } from "../types/SceneDefinition";
import { LibraryFolder, LibraryFolderId } from "../types/LibraryFolder";
import {
  SystemDefinition,
  SystemDefinitionId,
} from "../types/SystemDefinition";
import {
  EntityDefinition,
  EntityDefinitionId,
} from "../types/EntityDefinition";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../types/EntityInitializer";

/**
 * Convenience factory for initializing an ECSDefinition without having to assert each record.
 * (The type assertion is normally necessary because these records are using a NominalString as key)
 */
export const createECSDefinition = (
  defaults: ECSDefinitionDefaults = {}
): ECSDefinition => ({
  componentDefinitions: (defaults.componentDefinitions ?? {}) as Record<
    ComponentDefinitionId,
    ComponentDefinition
  >,
  entityInitializers: (defaults.entityInitializers ?? {}) as Record<
    EntityInitializerId,
    EntityInitializer
  >,
  entityDefinitions: (defaults.entityDefinitions ?? {}) as Record<
    EntityDefinitionId,
    EntityDefinition
  >,
  systems: (defaults.systems ?? {}) as Record<
    SystemDefinitionId,
    SystemDefinition
  >,
  libraryFolders: (defaults.libraryFolders ?? {}) as Record<
    LibraryFolderId,
    LibraryFolder
  >,
  scenes: (defaults.scenes ?? {}) as Record<SceneDefinitionId, SceneDefinition>,
});

type ECSDefinitionDefaults = {
  [K in keyof ECSDefinition]?: ECSDefinition[K] | {};
};
