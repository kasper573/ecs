import { remove } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { EntityDefinitionId } from "../../ecs-serializable/types/EntityDefinition";
import { core } from "../core";
import { deleteComponentInitializer } from "./deleteComponentInitializer";
import { deleteEntityInitializer } from "./deleteEntityInitializer";

export const deleteEntityDefinition = createEditorStateReducer<EntityDefinitionId>(
  (state, { payload: id }) => {
    const def = state.ecs.entityDefinitions[id];
    if (!def) {
      throw new Error("Could not find entity definition");
    }
    // Delete related entity initializers
    for (const init of Object.values(state.ecs.entityInitializers).filter(
      (init) => init.definitionId === def.id
    )) {
      deleteEntityInitializer(
        state,
        core.actions.deleteEntityInitializer(init.id)
      );
    }

    // Delete components in entity definition
    for (const comp of def.components) {
      deleteComponentInitializer(
        state,
        core.actions.deleteComponentInitializer({
          target: "definition",
          id,
          componentId: comp.id,
        })
      );
    }

    // Delete entity definition
    remove(state.ecs.entityDefinitions, id);
  }
);
