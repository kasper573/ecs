import { EntityInitializer } from "../types/EntityInitializer";
import { EntityDefinition } from "../types/EntityDefinition";
import { updateEntityInitializer } from "./updateEntityInitializer";
import { createComponentInitializer } from "./createComponentInitializer";
import { createComponentPropertiesDefinition } from "./createComponentPropertiesDefinition";

export const inheritEntityDefinitionComponents = (
  entityInitializer: EntityInitializer,
  entityDefinition: EntityDefinition
) =>
  updateEntityInitializer(entityInitializer, {
    components: [
      ...entityInitializer.components,
      ...entityDefinition.components.map(({ id, definitionId }) =>
        createComponentInitializer({
          id,
          definitionId,
          // Reset properties since initializer properties
          // are only used to override definition properties
          properties: createComponentPropertiesDefinition({}),
        })
      ),
    ],
  });
