import { EditorStateReducer } from "../types/EditorStateReducer";
import {
  SceneDefinition,
  SceneDefinitionId,
} from "../../ecs-serializable/types/SceneDefinition";
import { get, set } from "../../nominal";

export const updateSceneReducer: EditorStateReducer<{
  sceneId: SceneDefinitionId;
  update: Partial<SceneDefinition>;
}> = ({ ecs: { scenes } }, { payload: { sceneId, update } }) => {
  const scene = get(scenes, sceneId);
  if (!scene) {
    throw new Error("Scene not found");
  }

  set(scenes, sceneId, { ...scene, ...update });
};
