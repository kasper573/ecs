import { get, set } from "../../ecs-common/nominal";
import { inheritEntityDefinitionComponents } from "../../ecs-serializable/factories/inheritEntityDefinitionComponents";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const createEntityInitializer = createEditorStateReducer<EntityInitializer>(
  (
    { ecs: { entityInitializers, entityDefinitions } },
    { payload: initializer }
  ) => {
    const definition = get(entityDefinitions, initializer.definitionId);
    if (!definition) {
      throw new Error(`Referenced entity definition not found`);
    }
    set(
      entityInitializers,
      initializer.id,
      inheritEntityDefinitionComponents(initializer, definition)
    );
  }
);
