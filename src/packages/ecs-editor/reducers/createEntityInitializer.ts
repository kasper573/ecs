import { inheritEntityDefinitionComponents } from "../../ecs-serializable/functions/inheritEntityDefinitionComponents";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const createEntityInitializer = createEditorStateReducer<EntityInitializer>(
  (
    { ecs: { entityInitializers, entityDefinitions } },
    { payload: initializer }
  ) => {
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
  }
);
