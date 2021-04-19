import * as zod from "zod";
import { NominalString } from "../../../ecs-common/src/NominalString";
import { genericString } from "../../../zod-extensions/genericString";
import { entityDefinitionIdSchema } from "./EntityDefinition";
import { systemDefinitionIdSchema } from "./SystemDefinition";
import { componentInitializerSchema } from "./ComponentInitializer";

export type EntityInitializerId = NominalString<"EntityInitializerId">;

export type EntityInitializer = zod.infer<typeof entityInitializerSchema>;

export const entityInitializerIdSchema = genericString<EntityInitializerId>();

export const entityInitializerSchema = zod.object({
  /**
   * uuid
   */
  id: entityInitializerIdSchema,
  /**
   * uuid
   */
  parentId: entityInitializerIdSchema.optional(),
  /**
   * The sort order among its siblings. Undefined means 0.
   */
  order: zod.number(),
  /**
   * Used for presentation
   */
  name: zod.string(),
  /**
   * Controls Entity.isActive if set to true or false
   */
  isActive: zod.boolean().optional(),
  /**
   * The entity definition this initializer references
   */
  definitionId: entityDefinitionIdSchema.optional(),
  /**
   * The id of the system this entity belongs to
   */
  systemId: systemDefinitionIdSchema,
  /**
   * Components specific for this entity initializer.
   * If an entity initializer wants to override the components of an entity definition,
   * add a component initializer with identical id and the two component initializers will be merged.
   */
  components: zod.array(componentInitializerSchema),
});
