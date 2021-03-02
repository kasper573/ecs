import { EntityDefinition } from "./EntityDefinition";
import { ComponentDefinition } from "./ComponentDefinition";

export type DefinitionLibrary = {
  entities: EntityDefinition[];
  components: ComponentDefinition[];
};
