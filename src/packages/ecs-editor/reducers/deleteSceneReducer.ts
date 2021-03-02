import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
import { updateSystemReducer } from "./updateSystemReducer";

export const deleteSceneReducer: EditorStateReducer<SceneDefinition> = (
  state,
  scene
) => {
  const selected = selectEditorObjects(state);
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
      deletedObject: scene,
    });
  }
  return state;
};
