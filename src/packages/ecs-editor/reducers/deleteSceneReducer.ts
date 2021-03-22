import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { requireSystem } from "../selectors/requireSystem";
import { requireScene } from "../selectors/requireScene";
import { updateSystemReducer } from "./updateSystemReducer";

export const deleteSceneReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  sceneId: SceneDefinitionId;
}> = (state, { systemId, sceneId }) => {
  const scenes = requireSystem(state, systemId).scenes;
  const scene = requireScene(state, systemId, sceneId);
  return updateSystemReducer(state, {
    systemId,
    update: {
      scenes: without(scenes, scene),
    },
  });
};
