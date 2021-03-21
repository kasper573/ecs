import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
import { updateSystemReducer } from "./updateSystemReducer";

export const deleteSceneReducer: EditorStateReducer<{
  system?: SystemDefinition;
  scene: SceneDefinition;
}> = (state, { system = selectSelectedSystem(state), scene }) => {
  if (!system) {
    throw new Error(`System must be specified`);
  }
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
};
