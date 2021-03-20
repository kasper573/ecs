import { EntityInitializer } from "../types/EntityInitializer";
import { EntityDefinition } from "../types/EntityDefinition";
import { updateEntityInitializer } from "./updateEntityInitializer";
import { inheritComponentInitializer } from "./inheritComponentInitializer";

export const inheritEntityDefinitionComponents = (
  entityInitializer: EntityInitializer,
  entityDefinition: EntityDefinition
) =>
  updateEntityInitializer(entityInitializer, {
    components: [
      ...entityInitializer.components,
      ...entityDefinition.components.map(inheritComponentInitializer),
    ],
  });
