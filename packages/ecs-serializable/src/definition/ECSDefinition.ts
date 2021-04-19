import * as zod from "zod";
import { genericRecord } from "../../../zod-extensions/genericRecord";
import {
  systemDefinitionIdSchema,
  systemDefinitionSchema,
} from "./SystemDefinition";
import {
  entityInitializerIdSchema,
  entityInitializerSchema,
} from "./EntityInitializer";
import {
  entityDefinitionIdSchema,
  entityDefinitionSchema,
} from "./EntityDefinition";
import { libraryFolderIdSchema, libraryFolderSchema } from "./LibraryFolder";
import {
  componentDefinitionIdSchema,
  componentDefinitionSchema,
} from "./ComponentDefinition";

/**
 * An easily serializable entity component system.
 * (The entire data structure is JSON serializable)
 */
export type ECSDefinition = zod.infer<typeof ecsDefinitionSchema>;

const test = genericRecord(systemDefinitionIdSchema, systemDefinitionSchema);
type Test = typeof test;

export const ecsDefinitionSchema = zod.object({
  systems: genericRecord(systemDefinitionIdSchema, systemDefinitionSchema),
  entityInitializers: genericRecord(
    entityInitializerIdSchema,
    entityInitializerSchema
  ),
  entityDefinitions: genericRecord(
    entityDefinitionIdSchema,
    entityDefinitionSchema
  ),
  componentDefinitions: genericRecord(
    componentDefinitionIdSchema,
    componentDefinitionSchema
  ),
  libraryFolders: genericRecord(libraryFolderIdSchema, libraryFolderSchema),
});
