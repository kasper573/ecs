import { EditorState } from "../types/EditorState";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { requireSystem } from "./requireSystem";

export const requireScene = (
  state: EditorState,
  systemId: SystemDefinitionId,
  sceneId: SceneDefinitionId
) => {
  const scene = requireSystem(state, systemId).scenes.find(
    ({ id }) => id === sceneId
  );
  if (!scene) {
    throw new Error(`Scene not found in state`);
  }
  return scene;
};
