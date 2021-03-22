import { EditorStateReducer } from "../types/EditorStateReducer";
import { createSceneDefinition } from "../../ecs-serializable/factories/createSceneDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { requireSystem } from "../selectors/requireSystem";
import { updateSystemReducer } from "./updateSystemReducer";

export const createSceneReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  scene: SceneDefinition;
}> = (state, { systemId, scene }) => {
  const scenes = requireSystem(state, systemId).scenes;
  return updateSystemReducer(state, {
    systemId,
    update: {
      scenes: [...scenes, createSceneDefinition(scene)],
    },
  });
};
