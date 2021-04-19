import * as zod from "zod";
import { NominalString } from "../../../ecs-common/src/NominalString";
import { genericString } from "../../../zod-extensions/genericString";
import { componentInitializerSchema } from "./ComponentInitializer";
import { libraryNodeSchema } from "./LibraryNode";

export type EntityDefinitionId = NominalString<"EntityDefinitionId">;

export type EntityDefinition = zod.infer<typeof entityDefinitionSchema>;

export const entityDefinitionIdSchema = genericString<EntityDefinitionId>();

export const entityDefinitionSchema = libraryNodeSchema.merge(
  zod.object({
    id: entityDefinitionIdSchema,
    components: zod.array(componentInitializerSchema),
  })
);
