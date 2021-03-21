import { EditorStateReducer } from "../types/EditorStateReducer";
import { createSceneDefinition } from "../../ecs-serializable/factories/createSceneDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { updateSystemReducer } from "./updateSystemReducer";

export const createSceneReducer: EditorStateReducer<{
  system?: SystemDefinition;
  scene: SceneDefinition;
}> = (state, { system = selectSelectedSystem(state), scene }) => {
  if (!system) {
    throw new Error(`System must be specified`);
  }
  return updateSystemReducer(state, {
    system,
    update: {
      scenes: [...system.scenes, createSceneDefinition(scene)],
    },
  });
};
