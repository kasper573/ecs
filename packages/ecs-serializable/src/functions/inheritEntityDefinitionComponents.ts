import { EntityInitializer } from "../definition/EntityInitializer";
import { EntityDefinition } from "../definition/EntityDefinition";
import { inheritComponentInitializer } from "./inheritComponentInitializer";

export const inheritEntityDefinitionComponents = (
  entityInitializer: EntityInitializer,
  entityDefinition: EntityDefinition
): EntityInitializer => ({
  ...entityInitializer,
  components: [
    ...entityInitializer.components,
    ...entityDefinition.components.map(inheritComponentInitializer),
  ],
});
