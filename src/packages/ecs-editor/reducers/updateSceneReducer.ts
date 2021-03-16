import { EditorStateReducer } from "../types/EditorStateReducer";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { selectSelectedObjects } from "../selectors/selectSelectedObjects";
import { updateSystemReducer } from "./updateSystemReducer";

export const updateSceneReducer: EditorStateReducer<{
  scene: SceneDefinition;
  update: Partial<SceneDefinition>;
}> = (state, { scene, update }) => {
  const { system } = selectSelectedObjects(state);
  if (!system) {
    return state;
  }
  const updatedScenes = system.scenes.slice();
  const index = updatedScenes.indexOf(scene);
  updatedScenes[index] = { ...scene, ...update };
  return updateSystemReducer(state, {
    system,
    update: {
      scenes: updatedScenes,
    },
  });
};
