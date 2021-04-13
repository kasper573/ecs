import { inheritEntityDefinitionComponents } from "../../../ecs-serializable/src/functions/inheritEntityDefinitionComponents";
import { EntityInitializer } from "../../../ecs-serializable/src/definition/EntityInitializer";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { reorderEntityInitializers } from "../functions/reorderEntityInitializers";
import { PartialFor } from "../../../ecs-common/PartialFor";

export const createEntityInitializer = createEditorStateReducer<
  PartialFor<EntityInitializer, "order">
>(
  (
    { ecs: { entityInitializers, entityDefinitions } },
    { payload: { order: desiredOrder, ...initializerWithoutOrder } }
  ) => {
    // Assign a temporary order that will be overwritten by the reorder function
    const initializer: EntityInitializer = {
      ...initializerWithoutOrder,
      order: 0,
    };

    try {
      if (!initializer.definitionId) {
        // Entity without definition
        entityInitializers[initializer.id] = initializer;
        return;
      }

      // Entity with definition
      const definition = entityDefinitions[initializer.definitionId];
      if (!definition) {
        throw new Error(`Referenced entity definition not found`);
      }
      entityInitializers[initializer.id] = inheritEntityDefinitionComponents(
        initializer,
        definition
      );
    } finally {
      reorderEntityInitializers(
        Object.values(entityInitializers),
        entityInitializers[initializer.id],
        desiredOrder
      );
    }
  }
);
