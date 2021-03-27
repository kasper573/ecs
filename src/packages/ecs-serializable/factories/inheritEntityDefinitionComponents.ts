import { EntityInitializer } from "../types/EntityInitializer";
import { EntityDefinition } from "../types/EntityDefinition";
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
