import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
import { updateSystemReducer } from "./updateSystemReducer";

export const deleteSceneReducer: EditorStateReducer<SceneDefinition> = (
  state,
  scene
) => {
  const system = selectSelectedSystem(state);
  if (system) {
    const deletedState = updateSystemReducer(state, {
      system,
      update: {
        scenes: without(system.scenes, scene),
      },
    });
    return reactToDeleteReducer(deletedState, {
      previousState: state,
      objectName: "scene",
      didDelete: (selectedScene) => selectedScene === scene,
    });
  }
  return state;
};
