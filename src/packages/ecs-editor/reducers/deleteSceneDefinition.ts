import { remove } from "../../nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";

export const deleteSceneDefinition = createEditorStateReducer<SceneDefinitionId>(
  ({ ecs: { scenes } }, { payload: id }) => {
    if (!remove(scenes, id)) {
      throw new Error("Could not remove scene");
    }
  }
);
