import { EditorStateReducer } from "../types/EditorStateReducer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { remove } from "../../nominal";

export const deleteSceneDefinitionReducer: EditorStateReducer<SceneDefinitionId> = (
  { ecs: { scenes } },
  { payload: id }
) => {
  if (!remove(scenes, id)) {
    throw new Error("Could not remove scene");
  }
};
