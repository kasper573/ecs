import * as zod from "zod";
import { NativeComponentName } from "../types/NativeComponents";
import { NominalString } from "../../../ecs-common/src/NominalString";
import { genericString } from "../../../zod-extensions/genericString";
import { libraryNodeSchema } from "./LibraryNode";
import { ecsScriptSchema } from "./ECSScript";

export type ComponentDefinitionId = NominalString<"ComponentDefinitionId">;

export type ComponentDefinition = zod.infer<typeof componentDefinitionSchema>;

export const componentDefinitionIdSchema = genericString<ComponentDefinitionId>();

export const componentDefinitionSchema = libraryNodeSchema.merge(
  zod.object({
    /**
     * Automatically generated id (unique within parent System).
     */
    id: componentDefinitionIdSchema,
    /**
     * The native component that will be used
     */
    nativeComponent: genericString<NativeComponentName>(),
    /**
     * The script defining the component
     */
    script: ecsScriptSchema.optional(),
  })
);
