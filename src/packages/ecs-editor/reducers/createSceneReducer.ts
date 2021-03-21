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
    console.warn(`Could not create create scene: System must be specified`, {
      system,
      scene,
    });
    return state;
  }
  return updateSystemReducer(state, {
    system,
    update: {
      scenes: [...system.scenes, createSceneDefinition(scene)],
    },
  });
};
