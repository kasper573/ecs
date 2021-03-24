import { EditorStateReducer } from "../types/EditorStateReducer";
import {
  SceneDefinition,
  SceneDefinitionId,
} from "../../ecs-serializable/types/SceneDefinition";
import { get, set } from "../../nominal";

export const renameSceneDefinitionReducer: EditorStateReducer<{
  sceneId: SceneDefinitionId;
  name: SceneDefinition["name"];
}> = ({ ecs: { scenes } }, { payload: { sceneId, name } }) => {
  const scene = get(scenes, sceneId);
  if (!scene) {
    throw new Error("Scene not found");
  }

  set(scenes, sceneId, { ...scene, name });
};
