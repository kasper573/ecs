import { EditorStateReducer } from "../types/EditorStateReducer";
import { createSceneDefinition } from "../../ecs-serializable/factories/createSceneDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { updateSystemReducer } from "./updateSystemReducer";

export const createSceneReducer: EditorStateReducer<SceneDefinition> = (
  state,
  scene
) => {
  const system = selectSelectedSystem(state);
  if (system) {
    return updateSystemReducer(state, {
      system,
      update: {
        scenes: [...system.scenes, createSceneDefinition(scene)],
      },
    });
  }
  return state;
};
