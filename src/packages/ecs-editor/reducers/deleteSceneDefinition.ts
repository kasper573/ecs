import { remove } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { core } from "../core";
import { deleteEntityInitializer } from "./deleteEntityInitializer";

export const deleteSceneDefinition = createEditorStateReducer<SceneDefinitionId>(
  (state, { payload: id }) => {
    if (!remove(state.ecs.scenes, id)) {
      throw new Error("Could not remove scene");
    }
    for (const entity of Object.values(state.ecs.entityInitializers).filter(
      (def) => def.sceneId === id
    )) {
      deleteEntityInitializer(
        state,
        core.actions.deleteEntityInitializer(entity.id)
      );
    }
  }
);
