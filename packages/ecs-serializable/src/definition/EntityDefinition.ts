import { NominalString } from "../../../ecs-common/src/NominalString";
import { ComponentInitializer } from "./ComponentInitializer";
import { LibraryNode } from "./LibraryNode";

export type EntityDefinitionId = NominalString<"EntityDefinitionId">;

export type EntityDefinition = LibraryNode & {
  /**
   * uuid
   */
  id: EntityDefinitionId;
  /**
   * Components that will be inherited by all entity initializers
   */
  components: ComponentInitializer[];
};
