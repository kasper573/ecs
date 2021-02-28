import { NativeComponents } from "./NativeComponents";
import { EntityDefinition } from "./EntityDefinition";
import { ComponentDefinition } from "./ComponentDefinition";

export type DefinitionLibrary<
  AvailableComponents extends NativeComponents = {}
> = {
  entities: EntityDefinition[];
  components: ComponentDefinition<
    AvailableComponents,
    keyof AvailableComponents
  >[];
};
