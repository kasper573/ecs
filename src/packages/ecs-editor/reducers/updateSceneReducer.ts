import { EditorStateReducer } from "../types/EditorStateReducer";
import {
  SceneDefinition,
  SceneDefinitionId,
} from "../../ecs-serializable/types/SceneDefinition";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { requireSystem } from "../selectors/requireSystem";
import { requireScene } from "../selectors/requireScene";
import { updateSystemReducer } from "./updateSystemReducer";

export const updateSceneReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  sceneId: SceneDefinitionId;
  update: Partial<SceneDefinition>;
}> = (state, { systemId, sceneId, update }) => {
  const system = requireSystem(state, systemId);
  const scene = requireScene(state, systemId, sceneId);

  const updatedScenes = system.scenes.slice();
  const index = updatedScenes.indexOf(scene);
  updatedScenes[index] = { ...scene, ...update };

  return updateSystemReducer(state, {
    systemId,
    update: {
      scenes: updatedScenes,
    },
  });
};
