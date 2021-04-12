import { ECSDefinition } from "../definition/ECSDefinition";
import {
  ComponentDefinition,
  ComponentDefinitionId,
} from "../definition/ComponentDefinition";
import { LibraryFolder, LibraryFolderId } from "../definition/LibraryFolder";
import {
  SystemDefinition,
  SystemDefinitionId,
} from "../definition/SystemDefinition";
import {
  EntityDefinition,
  EntityDefinitionId,
} from "../definition/EntityDefinition";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../definition/EntityInitializer";

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
});

type ECSDefinitionDefaults = {
  [K in keyof ECSDefinition]?: ECSDefinition[K] | {};
};
