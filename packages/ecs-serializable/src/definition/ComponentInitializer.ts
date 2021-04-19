import * as zod from "zod";
import { NominalString } from "../../../ecs-common/src/NominalString";
import { genericNonStrictObject } from "../../../zod-extensions/genericNonStrictObject";
import { genericString } from "../../../zod-extensions/genericString";
import { componentDefinitionIdSchema } from "./ComponentDefinition";
import { ComponentPropertiesDefinition } from "./ComponentPropertiesDefinition";

export type ComponentInitializerId = NominalString<"ComponentInitializerId">;

export type ComponentInitializer = zod.infer<typeof componentInitializerSchema>;

export const componentInitializerIdSchema = genericString<ComponentInitializerId>();

export const componentInitializerSchema = zod.object({
  /**
   * Locally unique id.
   * Almost universally unique, but is reused across entity instances.
   * Example: Two EntityInitializers referencing the same
   * EntityDefinition will have ComponentInitializers that share ids.
   */
  id: componentInitializerIdSchema,
  /**
   * The definition this initializer should reference
   */
  definitionId: componentDefinitionIdSchema,
  /**
   * The properties to override with
   * (should be empty object to fall back to definition properties)
   */
  properties: genericNonStrictObject<ComponentPropertiesDefinition>(),
});
