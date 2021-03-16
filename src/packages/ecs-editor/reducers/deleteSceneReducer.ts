import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectSelectedObjects } from "../selectors/selectSelectedObjects";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
import { updateSystemReducer } from "./updateSystemReducer";

export const deleteSceneReducer: EditorStateReducer<SceneDefinition> = (
  state,
  scene
) => {
  const selected = selectSelectedObjects(state);
  if (selected.system) {
    const deletedState = updateSystemReducer(state, {
      system: selected.system,
      update: {
        scenes: without(selected.system.scenes, scene),
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
