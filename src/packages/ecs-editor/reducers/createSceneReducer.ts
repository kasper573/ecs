import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectSelectedObjects } from "../selectors/selectSelectedObjects";
import { createSceneDefinition } from "../../ecs-serializable/factories/createSceneDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { updateSystemReducer } from "./updateSystemReducer";

export const createSceneReducer: EditorStateReducer<SceneDefinition> = (
  state,
  scene
) => {
  const { system } = selectSelectedObjects(state);
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
