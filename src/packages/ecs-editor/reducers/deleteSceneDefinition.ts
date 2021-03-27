import { remove } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { selectListOfEntityInitializer } from "../selectors/selectListOfEntityInitializer";
import { core } from "../core";
import { deleteEntityInitializer } from "./deleteEntityInitializer";

export const deleteSceneDefinition = createEditorStateReducer<SceneDefinitionId>(
  (state, { payload: id }) => {
    if (!remove(state.ecs.scenes, id)) {
      throw new Error("Could not remove scene");
    }
    for (const entity of selectListOfEntityInitializer(state, id)) {
      deleteEntityInitializer(
        state,
        core.actions.deleteEntityInitializer(entity.id)
      );
    }
  }
);
